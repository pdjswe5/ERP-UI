// Pembelian — modal tab generik (CREATE/VIEW/EDIT), dibangun di atas ScrollNavModal/ItemPickerModal/
// ConfirmationModal (primitif bersama dari components.jsx). Dipakai oleh semua halaman dokumen Pembelian.

function PbModalShell({ rows, source, title, data, tabs, docKind, showTotals, prefix, initialFields, initialMode, xwide, onClose, onSave, onCancelDoc, onCompleteDoc }) {
  // mode: CREATE (data=null), VIEW (data exists, initial), EDIT (data exists, editing).
  // initialMode="EDIT" membuka langsung dalam mode edit (dipakai tombol Edit di list), tanpa itu default VIEW.
  const [mode, setMode] = React.useState(data ? (initialMode === 'EDIT' && !erpIsLocked(data) ? 'EDIT' : 'VIEW') : 'CREATE');
  const isCreate = mode === 'CREATE';
  const isView = mode === 'VIEW';
  const isEdit = mode === 'EDIT';

  const emptyShape = () => {
    const base = {};
    tabs.forEach(t => {
      if (t.type === 'fields') t.fields.forEach(f => { base[f.key] = f.default ?? (f.type === 'number' ? 0 : f.key === 'Tgl_Bukti' ? todayLocal() : ''); });
      if (t.type === 'items') base[t.itemsKey] = [];
    });
    if (showTotals) { base.discPct = 0; base.discRp = 0; base.ppnMode = 'Exclude'; }
    return base;
  };

  const buildEmpty = () => {
    const base = emptyShape();
    tabs.forEach(t => { if (t.type === 'items' && !Array.isArray(base[t.itemsKey])) base[t.itemsKey] = []; });
    return base;
  };

  const [form, setForm] = React.useState(() => {
    const base = data ? {...buildEmpty(), ...erpMapSeedTotals(data), ...data} : buildEmpty();
    tabs.forEach(t => { if (t.type === 'items' && !Array.isArray(base[t.itemsKey])) base[t.itemsKey] = []; });
    return base;
  });

  // Snapshot untuk Batal Edit — kalau modal dibuka langsung dalam mode EDIT (initialMode="EDIT"),
  // snapshot-nya adalah data awal itu sendiri, supaya "Batalkan Perubahan" tetap bisa mengembalikan.
  const [snapshotForm, setSnapshotForm] = React.useState(() => {
    if (data && initialMode === 'EDIT') {
      const base = {...buildEmpty(), ...erpMapSeedTotals(data), ...data};
      tabs.forEach(t => { if (t.type === 'items' && !Array.isArray(base[t.itemsKey])) base[t.itemsKey] = []; });
      return base;
    }
    return null;
  });

  // No_Bukti trigger state
  const [noBuktiRaw, setNoBuktiRaw] = React.useState(() => {
    const nb = form.No_Bukti || '';
    if (!nb) return '';
    return nb;
  });
  const [noBuktiError, setNoBuktiError] = React.useState('');
  const noBuktiRef = React.useRef(null);

  React.useEffect(() => {
    if (isCreate && noBuktiRef.current) {
      noBuktiRef.current.focus();
    }
  }, [isCreate]);

  const set = (k,v) => setForm(f => ({...f, [k]:v}));
  const isBatal = !!(form.Batal || form.Status === 'BATAL');
  const isSelesai = form.Status === 'SELESAI';
  const isLocked = isBatal || isSelesai;

  const allItemRows = tabs.filter(t => t.type === 'items').flatMap(t => form[t.itemsKey] || []);
  const subtotal = allItemRows.reduce((s,r) => s + pbLineTotal(r), 0);

  // Item picker
  const [picker, setPicker] = React.useState(null);
  const [confirmModal, setConfirmModal] = React.useState(null);
  const [srcPicker, setSrcPicker] = React.useState(false);
  const itemTab = tabs.find(t => t.type === 'items');
  const applySource = (doc) => {
    setForm(f => {
      const next = { ...f };
      if (doc.Kode_Supp !== undefined && 'Kode_Supp' in f) { next.Kode_Supp = doc.Kode_Supp; next.Nama_Supp = doc.Nama_Supp; }
      if (doc.Kode_PurchasingORG && 'Kode_PurchasingORG' in f) next.Kode_PurchasingORG = doc.Kode_PurchasingORG;
      if (itemTab) next[itemTab.itemsKey] = (doc.Details || []).map((r, i) => pbSrcSisa(r) > 0 ? pbSrcToTarget(doc, r, i, source.jenis, itemTab.columns) : null).filter(Boolean);
      return next;
    });
    setSrcPicker(false);
  };

  const handleNoBuktiChange = (val) => {
    const v = val.toUpperCase();
    setNoBuktiRaw(v);
    if (!v) {
      setNoBuktiError('No. Bukti harus di isi');
    } else if (!['F','K'].includes(v[0])) {
      setNoBuktiError('Format no Bukti salah');
    } else {
      setNoBuktiError('');
    }
  };

  const noBuktiLocked = isCreate && (!noBuktiRaw || !['F','K'].includes(noBuktiRaw[0]));

  // Untuk dokumen tanpa No_Bukti (mis. Katalog Pemasok): field lain terkunci sampai
  // seluruh field di initialFields (mis. Kode_Supp + Nama_Supp) sudah diisi.
  const initialFieldsReady = !initialFields || initialFields.length === 0
    || initialFields.every(k => (form[k] ?? '').toString().trim() !== '');

  const resetToCreate = () => {
    const empty = buildEmpty();
    setForm(empty);
    setNoBuktiRaw('');
    setNoBuktiError('');
    setSnapshotForm(null);
    setMode('CREATE');
  };

  const [saveError, setSaveError] = React.useState('');
  const handleSave = (andClose=false) => {
    if (isCreate && prefix && noBuktiLocked) { setSaveError('Pilih No. Bukti (ketik F atau K) terlebih dahulu.'); return; }
    const err = erpValidateDoc(form, tabs, { discPct: form.discPct });
    if (err) { setSaveError(err); return; }
    setSaveError('');
    let withNo = form;
    if (isCreate && prefix) {
      withNo = { ...form, No_Bukti: erpNextDocNo(noBuktiRaw[0], prefix, form.Tgl_Bukti, rows) };
    }
    if (showTotals) {
      const t = erpCalcTotals(subtotal, form.discPct, form.discRp, form.PPN ?? form.Ppn ?? 11, form.ppnMode);
      withNo = { ...withNo, Sub_Total: subtotal, Total_Disc: t.discAmt, Total_DPP: t.dpp, Total_PPN: t.ppnAmt, Total: t.total };
    }
    // Filter out soft-deleted items from all item arrays
    tabs.filter(t => t.type === 'items').forEach(t => {
      const arr = withNo[t.itemsKey];
      if (Array.isArray(arr)) {
        withNo = { ...withNo, [t.itemsKey]: arr.filter(r => !r._deleted).map(r => { const { _deleted, _added, ...rest } = r; return rest; }) };
      }
    });
    const saveResult = onSave(withNo, mode);
    if (typeof saveResult === 'string') { setSaveError(saveResult); return; }
    if (isCreate && source && source.onRealisasi && itemTab) source.onRealisasi(withNo[itemTab.itemsKey], +1);
    if (andClose) { onClose(); }
    else if (isEdit) { setMode('VIEW'); }
    else { resetToCreate(); }
  };

  const enterEditMode = () => {
    setSnapshotForm({...form});
    setMode('EDIT');
  };

  const handleCancelEdit = () => {
    if (snapshotForm) {
      setForm(snapshotForm);
    }
    setSnapshotForm(null);
    setMode('VIEW');
  };

  const fieldLocked = (f) => {
    if (f.disabledIf && f.disabledIf(form)) return true;
    if (isView) return true;
    if (isEdit) {
      // Fields that stay locked in edit mode
      const lockedKeys = ['No_Bukti','Tgl_Bukti','Kode_Supp','Nama_Supp','Kode_Cust','Kode_Gudang','No_Beli','No_Ref','No_Ko','No_Jual','Kode_PurchasingORG'];
      return lockedKeys.includes(f.key) || f.readOnly || f.lockOnEdit;
    }
    // CREATE
    if (initialFields && initialFields.length > 0) {
      if (initialFields.includes(f.key)) return f.readOnly;
      return !initialFieldsReady || f.readOnly;
    }
    return noBuktiLocked || f.readOnly;
  };

  // Field yang harus otomatis ter-reset (mis. Tempo -> 0 saat Kredit_Tunai = TUNAI)
  React.useEffect(() => {
    const allFields = tabs.filter(t => t.type === 'fields').flatMap(t => t.fields);
    allFields.forEach(f => {
      if (f.disabledIf && f.disabledIf(form) && form[f.key] !== (f.clearValue ?? '')) {
        setForm(prev => ({ ...prev, [f.key]: f.clearValue ?? '' }));
      }
    });
  }, [form]);

  const renderField = (f) => {
    const locked = fieldLocked(f);
    const spanStyle = f.span ? {gridColumn:`span ${f.span}`} : {};

    if (f.key === 'No_Bukti' && isCreate) {
      return (
        <div className="field" style={spanStyle} key={f.key}>
          <label>{f.label}{f.required && <span style={{color:'var(--danger)'}}> *</span>}</label>
          <input
            ref={noBuktiRef}
            className="input mono"
            type="text"
            value={noBuktiRaw}
            onChange={e => handleNoBuktiChange(e.target.value)}
            placeholder="Ketik F atau K"
            maxLength={1}
          />
          {noBuktiError && <div className="no-bukti-alert">{noBuktiError}</div>}
        </div>
      );
    }

    if (locked) {
      return (
        <div className="view-field" style={spanStyle} key={f.key}>
          <label>{f.label}</label>
          <div className={`view-value ${f.mono ? 'mono' : ''}`}>{form[f.key] || <span className="muted">—</span>}</div>
        </div>
      );
    }

    if (f.type === 'select') {
      const opts = typeof f.options === 'function' ? f.options() : f.options;
      return (
        <div className="field" style={spanStyle} key={f.key}>
          <label>{f.label}{f.required && <span style={{color:'var(--danger)'}}> *</span>}</label>
          <select className="select" value={form[f.key]} onChange={e=>{ set(f.key, e.target.value); f.onChange && f.onChange(e.target.value, set); }}>
            <option value="">— Pilih —</option>
            {opts.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      );
    }
    if (f.type === 'textarea') {
      return (
        <div className="field" style={spanStyle} key={f.key}>
          <label>{f.label}</label>
          <textarea className="textarea" value={form[f.key]} onChange={e=>set(f.key, e.target.value)} />
        </div>
      );
    }
    return (
      <div className="field" style={spanStyle} key={f.key}>
        <label>{f.label}{f.required && <span style={{color:'var(--danger)'}}> *</span>}</label>
        <input
          className={`input ${f.mono ? 'mono' : ''}`}
          type={f.type === 'number' ? 'number' : f.type === 'date' ? 'date' : 'text'}
          placeholder={f.readOnly ? 'Otomatis' : ''}
          value={form[f.key]}
          onChange={e=>set(f.key, f.type === 'number' ? +e.target.value : e.target.value)}
        />
      </div>
    );
  };

  const alasanPreContent = isLocked ? (
    <div className="alasan-section">
      <h3>{isBatal ? 'Alasan Batal' : 'Alasan Selesai'}</h3>
      <div className={`alasan-box ${isBatal ? 'batal' : 'selesai'}`}>
        <span className="icon">{isBatal ? I.x(16) : I.check(16)}</span>
        <span>{form.Alasan_Batal || form.Alasan_Status || (isBatal ? 'Transaksi dibatalkan' : 'Transaksi diselesaikan manual')}</span>
      </div>
    </div>
  ) : null;

  const sections = tabs.map(t => {
    if (t.type === 'fields') {
      const banner = isCreate && source && t === tabs.find(x => x.type === 'fields') ? (
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
          <div className="muted" style={{fontSize:12.5}}>Isi manual, atau ambil supplier & barang dari {source.label} yang masih bersisa.</div>
          <button type="button" className="btn btn-primary btn-sm" disabled={noBuktiLocked} title={noBuktiLocked ? 'Pilih No. Bukti (F/K) terlebih dahulu' : ''} onClick={()=>setSrcPicker(true)}>{I.plus()} Ambil dari {source.label}</button>
        </div>
      ) : null;
      return {
        id: t.id,
        label: t.label,
        content: (
          <div className="panel">
            {banner}
            <div style={{display:'grid', gridTemplateColumns:'repeat(3, minmax(0,1fr))', gap:12}}>
              {t.fields.map(renderField)}
            </div>
          </div>
        ),
      };
    }
    return {
      id: t.id,
      label: t.label,
      content: (
        <div className="panel">
          <PbInlineItemTable
            title={t.label}
            columns={isCreate ? t.columns.filter(c => !c.hideOnCreate) : t.columns}
            rows={form[t.itemsKey]}
            setRows={v => set(t.itemsKey, v)}
            addLabel={`Tambah ${t.label}`}
            itemSource={t.itemSource}
            showTotal={t.showTotal}
            disabled={isView}
            onPickItems={!isView && t.itemSource ? () => setPicker(t) : null}
            lockItems={t.lockItems}
            addLocked={noBuktiLocked}
            addLockedMsg="Pilih No. Bukti (Tunai/Kredit) terlebih dahulu."
          />
        </div>
      ),
    };
  });

  const summaryPanel = showTotals ? (
    <PbTotalsCard
      subtotal={subtotal}
      discPct={form.discPct} setDiscPct={v=>set('discPct', v)}
      discRp={form.discRp} setDiscRp={v=>set('discRp', v)}
      ppn={form.PPN ?? form.Ppn ?? 11} setPpn={v=>set(form.PPN !== undefined ? 'PPN' : 'Ppn', v)}
      ppnMode={form.ppnMode} setPpnMode={v=>set('ppnMode', v)}
    />
  ) : null;

  const modalTitle = isCreate ? `${title} Baru` : isEdit ? `Edit ${title} — ${form.No_Bukti || ''}` : `${title} — ${form.No_Bukti || ''}`;

  const fmtTglAudit = (iso) => {
    if (!iso) return '';
    const d = new Date(iso);
    if (isNaN(d.getTime())) return '';
    return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
  };
  const auditSubtitle = !isCreate && (form.Creator || form.Editor) ? (
    <span style={{fontStyle:'italic'}}>
      {form.Creator && `Dibuat : ${form.Creator}, ${fmtTglAudit(form.Jam_Create)}`}
      {form.Editor && form.Jam_Edit && ` | Diedit : ${form.Editor}, ${fmtTglAudit(form.Jam_Edit)}`}
    </span>
  ) : null;

  return (
    <>
      <ScrollNavModal
        title={modalTitle}
        subtitle={auditSubtitle}
        xwide={xwide}
        mode={mode}
        sections={sections}
        summaryPanel={summaryPanel}
        preContent={<>{saveError && <div className="danger-form" style={{marginBottom:12}}>{saveError}</div>}{alasanPreContent}</>}
        statusBadge={isLocked ? <span className={`status-badge ${isBatal ? 'batal' : 'selesai'}`}>{isBatal ? 'BATAL' : 'SELESAI'}</span> : null}
        locked={isLocked}
        onClose={onClose}
        onSave={() => handleSave(false)}
        onSaveAndClose={() => handleSave(true)}
        onCancelDoc={isView && onCancelDoc && !isLocked ? ()=>setConfirmModal({kind:'batal'}) : null}
        onCompleteDoc={isView && onCompleteDoc && !isLocked ? ()=>setConfirmModal({kind:'selesai'}) : null}
        onEditMode={isView && !isLocked ? enterEditMode : null}
        onCancelEdit={isEdit ? handleCancelEdit : null}
        showSelesai={isView && onCompleteDoc && !isLocked && (form.Status === 'OPEN' || form.Status === '' || !form.Status)}
      />
      {srcPicker && source && <PbSourcePickerModal label={source.label} rows={source.rows} onCancel={()=>setSrcPicker(false)} onConfirm={applySource} />}
      {picker && (
        <ItemPickerModal
          title={`Pilih ${picker.label}`}
          items={picker.itemSource?.data || []}
          onCancel={() => setPicker(null)}
          onConfirm={(picked) => {
            const mapped = picked.map(p => {
              const row = Object.fromEntries(picker.columns.map(c => [c.key, c.type === 'number' ? 0 : '']));
              row[picker.itemSource.codeKey] = p.kode || p.code || p.Kode_Item;
              row[picker.itemSource.nameKey] = p.nama || p.name || p.Nama_Item;
              if (picker.itemSource.satuanKey) row[picker.itemSource.satuanKey] = p.satuan || p.Satuan || 'PCS';
              if (picker.itemSource.hargaKey) row[picker.itemSource.hargaKey] = p.harga || p.Harga || p.price || 0;
              row[picker.columns.find(c => c.key === 'Qty' || c.key === 'Jumlah')?.key || 'Qty'] = p._qty || 1;
              row._added = true;
              return row;
            });
            set(picker.itemsKey, [...form[picker.itemsKey], ...mapped]);
            setPicker(null);
          }}
        />
      )}
      {confirmModal && (
        <ConfirmationModal
          title={confirmModal.kind==='batal'?'Batalkan Transaksi':'Selesaikan Manual'}
          message={confirmModal.kind==='batal'?'Masukkan alasan pembatalan transaksi ini.':'Masukkan alasan penyelesaian manual transaksi ini.'}
          confirmLabel={confirmModal.kind==='batal'?'Batalkan':'Selesaikan'}
          confirmKind={confirmModal.kind==='batal'?'danger':'success'}
          onCancel={()=>setConfirmModal(null)}
          onConfirm={(reason)=>{
            if (confirmModal.kind==='batal') {
              const updated = { ...form, Status:'BATAL', Batal:true, Alasan_Batal: reason };
              setForm(updated);
              if (onCancelDoc) onCancelDoc(updated);
              if (source && source.onRealisasi && itemTab) source.onRealisasi(form[itemTab.itemsKey], -1);
            } else {
              const updated = { ...form, Status:'SELESAI', Alasan_Status: reason };
              setForm(updated);
              if (onCompleteDoc) onCompleteDoc(updated);
            }
            setConfirmModal(null);
          }}
        />
      )}
    </>
  );
}

// ── Referensi dokumen sebelumnya (PR→RFQ→Quotation→PO→GR→Nota→Retur) ──────────────────────────
// Sisa qty baris sumber = Qty/Jumlah − Qty_Realisasi. Dokumen sumber yang batal/selesai atau sudah
// habis sisanya tidak ditawarkan.
function pbSrcQty(r) { return +(r.Qty ?? r.Jumlah) || 0; }
function pbSrcSisa(r) { return Math.max(0, pbSrcQty(r) - (+r.Qty_Realisasi || 0)); }
function pbSrcEligible(doc) { return !erpIsLocked(doc) && (doc.Details || []).some(r => pbSrcSisa(r) > 0); }
// Ubah baris sumber jadi baris dokumen tujuan, mengikuti nama kolom tab tujuan (Qty vs Jumlah, Harga vs Hrg_Sat).
function pbSrcToTarget(src, r, idx, jenis, columns) {
  const has = (k) => columns.some(c => c.key === k);
  const qty = pbSrcSisa(r);
  const harga = +(r.Harga ?? r.Hrg_Sat) || 0;
  const d1 = +(r.Disc1 ?? r.DiscPros_Det) || 0;
  const dRp = +(r.DiscRp ?? r.DiscNilai_Det) || 0;
  const out = {
    Kode_Item: r.Kode_Item, Nama_Item: r.Nama_Item, Deskripsi: r.Deskripsi || '', Satuan: r.Satuan || 'PCS',
    Kode_Konversi: 1, Konversi: 1, Qty_Realisasi: 0,
    No_Bukti_From: src.No_Bukti, No_Id_From: idx + 1, Jenis_Dok_From: jenis,
    Kode_PurchasingORG: r.Kode_PurchasingORG || src.Kode_PurchasingORG || '', Ket_PurchasingORG: r.Ket_PurchasingORG || '',
    _added: true,
  };
  if (has('Jumlah')) out.Jumlah = qty; else out.Qty = qty;
  if (has('Hrg_Sat')) out.Hrg_Sat = harga; else if (has('Harga')) out.Harga = harga;
  if (has('DiscPros_Det')) { out.DiscPros_Det = d1; out.DiscNilai_Det = dRp; }
  else if (has('Disc1')) { out.Disc1 = d1; out.Disc2 = 0; out.DiscRp = dRp; }
  return out;
}

function PbSourcePickerModal({ label, rows, onCancel, onConfirm }) {
  useEscape(onCancel);
  const [q, setQ] = React.useState('');
  const list = rows.filter(pbSrcEligible).filter(d => !q || d.No_Bukti.toLowerCase().includes(q.toLowerCase()) || (d.Nama_Supp || '').toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="modal-backdrop" style={{zIndex:110}}>
      <div className="modal item-picker-modal" onClick={e=>e.stopPropagation()}>
        <div className="modal-head"><h2>Pilih {label}</h2><button className="btn btn-icon" onClick={onCancel}>{I.x(16)}</button></div>
        <div className="modal-body">
          <div className="field" style={{marginBottom:12}}><div className="input-w-icon">{I.search(14)}<input className="input" placeholder="Cari no. bukti atau supplier…" value={q} onChange={e=>setQ(e.target.value)}/></div></div>
          <div className="line-items picker-table" style={{maxHeight:320, overflowY:'auto'}}>
            <table>
              <thead><tr><th>No. Bukti</th><th>Tanggal</th><th>Supplier</th><th className="num">Item bersisa</th></tr></thead>
              <tbody>
                {list.length === 0 && <tr><td colSpan={4} className="empty">Tidak ada {label} aktif yang masih bersisa.</td></tr>}
                {list.map(d => (
                  <tr key={d.No_Bukti} style={{cursor:'pointer'}} onClick={()=>onConfirm(d)}>
                    <td className="mono">{d.No_Bukti}</td><td>{d.Tgl_Bukti}</td><td>{d.Nama_Supp || '—'}</td>
                    <td className="num">{(d.Details || []).filter(r => pbSrcSisa(r) > 0).length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="modal-foot"><div className="muted" style={{fontSize:12.5}}>Klik salah satu baris untuk memilih.</div><div className="right"><button className="btn" onClick={onCancel}>Batal</button></div></div>
      </div>
    </div>
  );
}
