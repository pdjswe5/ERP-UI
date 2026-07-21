// Manufaktur — komponen picker/entry modal bersama, dipakai lintas sub-modul SPK, Hasil Produksi,
// dan Pemakaian/Retur Barang Lain. Dipindah dari manufaktur.jsx, identifier diprefix Mf.

// ─── Shared Picker Shell ─────────────────────────────────────────────────────

function MfPickerShell({ title, zIndex, width, onClose, children }) {
  return (
    <div className="modal-backdrop" style={{zIndex: zIndex || 200}} onClick={onClose}>
      <div className="modal" style={{maxWidth: width || 960, maxHeight:'72vh'}} onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <h2>{title}</h2>
          <button className="btn btn-icon" onClick={onClose}>{I.x(16)}</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function MfPickerTable({ columns, rows, onClose, emptyMsg }) {
  return (
    <div style={{overflowY:'auto', maxHeight:'calc(72vh - 180px)', padding:'0 32px'}}>
      <table className="data" style={{minWidth:'unset'}}>
        <thead>
          <tr>{columns.map(c => <th key={c.key} style={c.style}>{c.label}</th>)}</tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr><td colSpan={columns.length} style={{textAlign:'center', padding:24, color:'var(--text-3)'}}>
              {emptyMsg || 'Tidak ada hasil'}
            </td></tr>
          )}
          {rows}
        </tbody>
      </table>
    </div>
  );
}

// ─── Pilih Barang Modal ───────────────────────────────────────────────────────

// Salinan ItemPickerModal (components.jsx, dipakai Penjualan/Pembelian) supaya UI-nya sama persis
// — checkbox multi-select + qty per baris. Sumber default MF_BARANG, bisa dioverride via `items`.
// Prop `single` (dipakai field Kode Barang di Tambah Barang Jadi SPK — cuma boleh 1 barang per
// baris): sembunyikan checkbox + kolom Jumlah, klik baris langsung memilih & menutup picker.
function MfPilihBarangModal({ title, items, onConfirm, onCancel, zIndex, single }) {
  const data = items || MF_BARANG;
  const [q, setQ] = React.useState('');
  const [selected, setSelected] = React.useState({});
  const [qtyMap, setQtyMap] = React.useState({});

  React.useEffect(() => {
    const h = e => { if (e.key === 'Escape') onCancel(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [onCancel]);

  const filtered = React.useMemo(() => {
    if (!q) return data;
    const ql = q.toLowerCase();
    return data.filter(it => (it.nama||it.name||'').toLowerCase().includes(ql) || (it.kode||it.code||'').toLowerCase().includes(ql));
  }, [data, q]);

  const pickSingle = (it) => onConfirm([{ ...it }]);

  const toggle = (code) => {
    setSelected(prev => {
      const next = { ...prev };
      if (next[code]) { delete next[code]; setQtyMap(qm => { const nqm={...qm}; delete nqm[code]; return nqm; }); }
      else next[code] = true;
      return next;
    });
  };
  const setQty = (code, val) => setQtyMap(prev => ({ ...prev, [code]: Math.max(1, +val || 1) }));
  const selectedCount = Object.keys(selected).length;

  const handleConfirm = () => {
    const picked = Object.keys(selected).map(code => {
      const it = data.find(x => (x.kode||x.code) === code);
      return { ...it, _qty: qtyMap[code] || 1 };
    });
    onConfirm(picked);
  };

  return (
    <div className="modal-backdrop" style={{zIndex: zIndex || 110}} onClick={onCancel}>
      <div className="modal item-picker-modal" onClick={e=>e.stopPropagation()}>
        <div className="modal-head"><h2>{title || 'Pilih Barang'}</h2><button className="btn btn-icon" onClick={onCancel}>{I.x(16)}</button></div>
        <div className="modal-body">
          <div style={{display:'flex', justifyContent:'flex-end', marginBottom:12}}>
            <div className="field" style={{width:'40%', minWidth:200, marginBottom:0}}>
              <div className="input-w-icon">{I.search(14)}<input className="input" placeholder="Cari kode atau nama barang…" value={q} onChange={e=>setQ(e.target.value)}/></div>
            </div>
          </div>
          <div className="line-items picker-table" style={{maxHeight:320, overflowY:'auto'}}>
            <table>
              <thead><tr>{!single && <th style={{width:40}}></th>}<th>Kode</th><th>Nama Barang</th>{!single && <th style={{width:90}}>Jumlah</th>}</tr></thead>
              <tbody>
                {filtered.length === 0 && <tr><td colSpan={single ? 2 : 4} className="empty">Tidak ditemukan.</td></tr>}
                {filtered.map(it => {
                  const code = it.kode || it.code;
                  const name = it.nama || it.name;
                  if (single) {
                    return (
                      <tr key={code} style={{cursor:'pointer'}} onClick={()=>pickSingle(it)}>
                        <td className="mono">{code}</td>
                        <td>{name}</td>
                      </tr>
                    );
                  }
                  const isSel = !!selected[code];
                  return (
                    <tr key={code} className={isSel ? 'selected' : ''} onClick={()=>toggle(code)}>
                      <td><input type="checkbox" checked={isSel} onChange={()=>toggle(code)} onClick={e=>e.stopPropagation()}/></td>
                      <td className="mono">{code}</td>
                      <td>{name}</td>
                      <td>
                        {isSel ? (
                          <input className="cell num" type="number" min={1} value={qtyMap[code]||1} onChange={e=>setQty(code, e.target.value)} onClick={e=>e.stopPropagation()}/>
                        ) : (
                          <span className="muted">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {!single && (
          <div className="modal-foot">
            <div className="muted" style={{fontSize:12.5}}>{selectedCount} barang dipilih</div>
            <div className="right" style={{display:'flex', gap:8}}>
              <button className="btn" onClick={onCancel}>Batal</button>
              <button className="btn btn-primary" onClick={handleConfirm} disabled={selectedCount===0}>{I.plus()} Tambah Item ({selectedCount})</button>
            </div>
          </div>
        )}
        {single && (
          <div className="modal-foot" style={{justifyContent:'flex-end'}}>
            <button className="btn" onClick={onCancel}>Batal</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── SPK Picker Modal ─────────────────────────────────────────────────────────

function MfSpkPickerModal({ onPick, onClose }) {
  const [q, setQ] = React.useState('');
  const inputRef = React.useRef(null);
  React.useEffect(() => {
    inputRef.current?.focus();
    const h = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [onClose]);
  const filtered = MF_SPK_SEED.filter(s => {
    if (!q) return true;
    const ql = q.toLowerCase();
    return s.no.toLowerCase().includes(ql) || s.produk.toLowerCase().includes(ql);
  });
  return (
    <MfPickerShell title="Pilih SPK" zIndex={300} width={800} onClose={onClose}>
      <div style={{padding:'12px 32px', borderBottom:'1px solid var(--border)'}}>
        <div className="input-w-icon">{I.search(14)}
          <input ref={inputRef} className="input" placeholder="Cari No. SPK atau Produk…"
            value={q} onChange={e => setQ(e.target.value)} />
        </div>
      </div>
      <MfPickerTable
        columns={[
          {key:'no', label:'NO. SPK',  style:{width:'22%'}},
          {key:'pr', label:'PRODUK'},
          {key:'gd', label:'GUDANG',   style:{width:'20%'}},
          {key:'st', label:'STATUS',   style:{width:'14%',textAlign:'center'}},
        ]}
        rows={filtered.map(s => (
          <tr key={s.no} style={{cursor:'pointer'}} onClick={() => onPick(s)}>
            <td style={{color:'var(--primary)', fontWeight:500}}>{s.no}</td>
            <td>{s.produk}</td>
            <td>{s.gudang}</td>
            <td style={{textAlign:'center'}}>
              <span className={`pill ${STATUS_CLASS[s.status] || 'draft'}`}>{s.status}</span>
            </td>
          </tr>
        ))}
      />
      <div className="modal-foot" style={{justifyContent:'flex-end', padding:'12px 32px'}}>
        <button className="btn" onClick={onClose}>Batal</button>
      </div>
    </MfPickerShell>
  );
}

// ─── SO Picker Modal ──────────────────────────────────────────────────────────
// Salinan pola picker dokumen milik SO (lihat KoDocPickerModal di salesorder.data.jsx, dipakai
// "Buat SO dari KO") — di sini dipakai SPK untuk mengambil referensi Sales Order (bukan KO).
// Sumber SALES_ORDER_SEED (modul Penjualan, sudah dimuat lebih dulu di erp.html).

function MfSoPickerModal({ onCancel, onConfirm }) {
  const [q, setQ] = React.useState('');
  const filtered = React.useMemo(() => {
    if (!q) return SALES_ORDER_SEED;
    const ql = q.toLowerCase();
    return SALES_ORDER_SEED.filter(s => s.No_Bukti.toLowerCase().includes(ql) || (s.Nama_Cust||'').toLowerCase().includes(ql));
  }, [q]);
  return (
    <div className="modal-backdrop" style={{zIndex:300}} onClick={onCancel}>
      <div className="modal item-picker-modal" onClick={e=>e.stopPropagation()}>
        <div className="modal-head"><h2>Pilih Sales Order</h2><button className="btn btn-icon" onClick={onCancel}>{I.x(16)}</button></div>
        <div className="modal-body">
          <div style={{display:'flex', justifyContent:'flex-end', marginBottom:12}}>
            <div className="field" style={{width:'40%', minWidth:200, marginBottom:0}}>
              <div className="input-w-icon">{I.search(14)}<input className="input" placeholder="Cari no. bukti atau customer…" value={q} onChange={e=>setQ(e.target.value)}/></div>
            </div>
          </div>
          <div className="line-items picker-table" style={{maxHeight:320, overflowY:'auto'}}>
            <table>
              <thead><tr><th>No. Bukti</th><th>Customer</th><th>Tgl. Bukti</th><th>Status</th></tr></thead>
              <tbody>
                {filtered.length === 0 && <tr><td colSpan={4} className="empty">Tidak ditemukan.</td></tr>}
                {filtered.map(s => (
                  <tr key={s.No_Bukti} style={{cursor:'pointer'}} onClick={()=>onConfirm(s)}>
                    <td className="mono">{s.No_Bukti}</td>
                    <td>{s.Nama_Cust}</td>
                    <td>{s.Tgl_Bukti}</td>
                    <td>{soStatusPill(s)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="modal-foot">
          <div className="muted" style={{fontSize:12.5}}>Klik salah satu baris untuk memilih.</div>
          <div className="right" style={{display:'flex', gap:8}}>
            <button className="btn" onClick={onCancel}>Batal</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── COIL Picker Modal ────────────────────────────────────────────────────────

function MfCoilPickerModal({ onPick, onClose }) {
  const [q, setQ] = React.useState('');
  const inputRef = React.useRef(null);
  React.useEffect(() => {
    inputRef.current?.focus();
    const h = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [onClose]);
  const filtered = MF_COIL_LIST.filter(c => {
    if (!q) return true;
    const ql = q.toLowerCase();
    return c.no.toLowerCase().includes(ql) || c.barang.toLowerCase().includes(ql);
  });
  return (
    <MfPickerShell title="Pilih No. Coil" zIndex={300} width={800} onClose={onClose}>
      <div style={{padding:'12px 32px', borderBottom:'1px solid var(--border)'}}>
        <div className="input-w-icon">{I.search(14)}
          <input ref={inputRef} className="input" placeholder="Cari No. Coil atau nama barang…"
            value={q} onChange={e => setQ(e.target.value)} />
        </div>
      </div>
      <MfPickerTable
        columns={[
          {key:'no', label:'NO. COIL',  style:{width:'20%'}},
          {key:'br', label:'BARANG'},
          {key:'gd', label:'GUDANG',    style:{width:'20%'}},
          {key:'si', label:'SISA (MTR)',style:{width:'14%', textAlign:'right'}},
        ]}
        rows={filtered.map(c => (
          <tr key={c.no} style={{cursor:'pointer'}} onClick={() => onPick(c)}>
            <td style={{color:'var(--primary)', fontWeight:500}}>{c.no}</td>
            <td>{c.barang}</td>
            <td>{c.gudang}</td>
            <td style={{textAlign:'right'}}>{fmtNum(c.sisa)}</td>
          </tr>
        ))}
      />
      <div className="modal-foot" style={{justifyContent:'flex-end', padding:'12px 32px'}}>
        <button className="btn" onClick={onClose}>Batal</button>
      </div>
    </MfPickerShell>
  );
}

// ─── Barang Jadi Picker Modal ─────────────────────────────────────────────────

// Salinan pola picker dokumen milik DO/KO/SO (lihat KoDocPickerModal di salesorder.data.jsx,
// DoSoItemPickerModal di deliveryorder.data.jsx, MfSoPickerModal di atas) — sebelumnya
// MfBarangJadiPickerModal pakai gaya MfPickerShell/MfPickerTable yang beda tampilannya sendiri.
function MfBarangJadiPickerModal({ onPick, onClose }) {
  const [q, setQ] = React.useState('');
  const filtered = React.useMemo(() => {
    if (!q) return MF_BARANG_JADI_LIST;
    const ql = q.toLowerCase();
    return MF_BARANG_JADI_LIST.filter(b => b.kode.toLowerCase().includes(ql) || b.nama.toLowerCase().includes(ql));
  }, [q]);

  React.useEffect(() => {
    const h = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [onClose]);

  return (
    <div className="modal-backdrop" style={{zIndex:300}} onClick={onClose}>
      <div className="modal item-picker-modal" onClick={e=>e.stopPropagation()}>
        <div className="modal-head"><h2>Pilih Barang Jadi</h2><button className="btn btn-icon" onClick={onClose}>{I.x(16)}</button></div>
        <div className="modal-body">
          <div style={{display:'flex', justifyContent:'flex-end', marginBottom:12}}>
            <div className="field" style={{width:'40%', minWidth:200, marginBottom:0}}>
              <div className="input-w-icon">{I.search(14)}<input className="input" placeholder="Cari kode atau nama barang jadi…" value={q} onChange={e=>setQ(e.target.value)}/></div>
            </div>
          </div>
          <div className="line-items picker-table" style={{maxHeight:320, overflowY:'auto'}}>
            <table>
              <thead><tr><th>Kode</th><th>Nama Barang</th><th>Kode PU</th><th>No. Coil</th><th>Satuan</th></tr></thead>
              <tbody>
                {filtered.length === 0 && <tr><td colSpan={5} className="empty">Tidak ditemukan.</td></tr>}
                {filtered.map(b => (
                  <tr key={b.kode} style={{cursor:'pointer'}} onClick={()=>onPick(b)}>
                    <td className="mono">{b.kode}</td>
                    <td>{b.nama}</td>
                    <td>{b.kodePU}</td>
                    <td className="mono">{b.noCoil}</td>
                    <td>{b.satuan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="modal-foot">
          <div className="muted" style={{fontSize:12.5}}>Klik salah satu baris untuk memilih.</div>
          <div className="right" style={{display:'flex', gap:8}}>
            <button className="btn" onClick={onClose}>Batal</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Barang Jadi Entry Modal (for SPK) ───────────────────────────────────────

function MfBarangJadiEntryModal({ data, onClose, onSave }) {
  const [kodeBarang,    setKodeBarang]    = React.useState(data?.kodeBarang    || '');
  const [namaBarang,    setNamaBarang]    = React.useState(data?.namaBarang    || '');
  const [qtySPK,        setQtySPK]        = React.useState(data?.qtySPK        || '');
  const [satuan,        setSatuan]        = React.useState(data?.satuan        || 'LBR');
  const [kelompokWarna,     setKelompokWarna]     = React.useState(data?.kelompokWarna     || '');
  const [namaKelompokWarna, setNamaKelompokWarna] = React.useState(data?.namaKelompokWarna || '');
  const [az,     setAz]     = React.useState(data?.az     || '');
  const [namaAz, setNamaAz] = React.useState(data?.namaAz || '');
  const [brand,     setBrand]     = React.useState(data?.brand     || '');
  const [namaBrand, setNamaBrand] = React.useState(data?.namaBrand || '');
  const [merkBarang,     setMerkBarang]     = React.useState(data?.merkBarang     || '');
  const [namaMerkBarang, setNamaMerkBarang] = React.useState(data?.namaMerkBarang || '');
  const [stempel,       setStempel]       = React.useState(data?.stempel       || '');
  const [mesinDipilih,  setMesinDipilih]  = React.useState(data?.mesinDipilih  || []);
  const [showBarangPicker, setShowBarangPicker] = React.useState(false);

  React.useEffect(() => {
    const h = e => { if (e.key === 'Escape' && !showBarangPicker) onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [showBarangPicker, onClose]);

  const onBarangPick = (picked) => {
    const b = picked[0];
    if (b) { setKodeBarang(b.code); setNamaBarang(b.nama); }
    setShowBarangPicker(false);
  };

  const toggleMesin = (nama) => {
    setMesinDipilih(ls => ls.includes(nama) ? ls.filter(m => m !== nama) : [...ls, nama]);
  };

  const handleSave = () => {
    onSave({
      kodeBarang, namaBarang, qtySPK, satuan,
      kelompokWarna, namaKelompokWarna, az, namaAz, brand, namaBrand, merkBarang, namaMerkBarang,
      stempel, mesinDipilih,
    });
  };

  const panelStyle = {
    border:'1px solid var(--border)', borderRadius:'var(--radius)',
    overflowY:'auto', height:190, background:'var(--bg)',
  };
  const panelHeadStyle = {
    padding:'6px 10px', background:'var(--bg-elev)', color:'var(--text)',
    fontSize:11.5, fontWeight:600, letterSpacing:'.04em', textTransform:'uppercase',
    borderBottom:'1px solid var(--border)',
  };

  return (
    <>
      <div className="modal-backdrop" style={{zIndex:200}} onClick={onClose}>
        <div className="modal" style={{maxWidth:1180}} onClick={e => e.stopPropagation()}>
          <div className="modal-head">
            <div>
              <h2>{data ? 'Edit Barang Jadi' : 'Tambah Barang Jadi'}</h2>
              <div className="sub">Pilih barang, isi detail, dan tentukan mesin yang digunakan.</div>
            </div>
            <button className="btn btn-icon" onClick={onClose}>{I.x(16)}</button>
          </div>

          <div className="modal-body">
            <div style={{display:'grid', gridTemplateColumns:'repeat(4, minmax(0,1fr))', gap:12}}>

              {/* Baris 1: Nama Barang, Kode Barang, Satuan, Qty SPK */}
              <div className="field">
                <label>Nama Barang *</label>
                <input className="input" style={{cursor:'pointer', background:'var(--bg-elev)'}} readOnly
                  placeholder="— Pilih Barang —" value={namaBarang}
                  onClick={() => setShowBarangPicker(true)} />
              </div>
              <div className="field">
                <label>Kode Barang</label>
                <input className="input mono" value={kodeBarang} readOnly placeholder="Otomatis" />
              </div>
              <div className="field">
                <label>Satuan</label>
                <select className="select" value={satuan} disabled={!kodeBarang} onChange={e => setSatuan(e.target.value)}>
                  {MF_SATUAN_SPK.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="field">
                <label>Qty SPK *</label>
                <input className="input" type="number" min="0" step="0.01" placeholder="0.00" disabled={!kodeBarang}
                  value={qtySPK} onChange={e => setQtySPK(e.target.value)} />
              </div>

              {/* Baris 2: Kelompok Warna, Kode Kelompok Warna, AZ, Kode AZ */}
              <div className="field">
                <label>Kelompok Warna</label>
                <select className="select" value={namaKelompokWarna} disabled={!kodeBarang}
                  onChange={e => { const w = MF_KELOMPOK_WARNA_LIST.find(x => x.nama === e.target.value); setNamaKelompokWarna(e.target.value); setKelompokWarna(w ? w.kode : ''); }}>
                  <option value="">— Pilih —</option>
                  {MF_KELOMPOK_WARNA_LIST.map(v => <option key={v.kode} value={v.nama}>{v.nama}</option>)}
                </select>
              </div>
              <div className="field">
                <label>Kode Kelompok Warna</label>
                <input className="input mono" value={kelompokWarna} readOnly placeholder="Otomatis" />
              </div>
              <div className="field">
                <label>AZ</label>
                <select className="select" value={namaAz} disabled={!kodeBarang}
                  onChange={e => { const w = MF_AZ_LIST.find(x => x.nama === e.target.value); setNamaAz(e.target.value); setAz(w ? w.kode : ''); }}>
                  <option value="">— Pilih —</option>
                  {MF_AZ_LIST.map(v => <option key={v.kode} value={v.nama}>{v.nama}</option>)}
                </select>
              </div>
              <div className="field">
                <label>Kode AZ</label>
                <input className="input mono" value={az} readOnly placeholder="Otomatis" />
              </div>

              {/* Baris 3: Brand, Kode Brand, Merk Barang, Kode Merk Barang */}
              <div className="field">
                <label>Brand</label>
                <select className="select" value={namaBrand} disabled={!kodeBarang}
                  onChange={e => { const w = MF_BRAND_LIST.find(x => x.nama === e.target.value); setNamaBrand(e.target.value); setBrand(w ? w.kode : ''); }}>
                  <option value="">— Pilih —</option>
                  {MF_BRAND_LIST.map(v => <option key={v.kode} value={v.nama}>{v.nama}</option>)}
                </select>
              </div>
              <div className="field">
                <label>Kode Brand</label>
                <input className="input mono" value={brand} readOnly placeholder="Otomatis" />
              </div>
              <div className="field">
                <label>Merk Barang</label>
                <select className="select" value={namaMerkBarang} disabled={!kodeBarang}
                  onChange={e => { const w = MF_MERK_BARANG_LIST.find(x => x.nama === e.target.value); setNamaMerkBarang(e.target.value); setMerkBarang(w ? w.kode : ''); }}>
                  <option value="">— Pilih —</option>
                  {MF_MERK_BARANG_LIST.map(v => <option key={v.kode} value={v.nama}>{v.nama}</option>)}
                </select>
              </div>
              <div className="field">
                <label>Kode Merk Barang</label>
                <input className="input mono" value={merkBarang} readOnly placeholder="Otomatis" />
              </div>

              {/* Baris 4: Stempel */}
              <div className="field">
                <label>Stempel</label>
                <select className="select" value={stempel} disabled={!kodeBarang} onChange={e => setStempel(e.target.value)}>
                  <option value="">— Pilih —</option>
                  {MF_STEMPEL_LIST.map(v => <option key={v}>{v}</option>)}
                </select>
              </div>

            </div>

            {/* Machine picker dual-panel */}
            <div style={{marginTop:8}}>
              <div style={{fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'.06em',
                color:'var(--text-3)', marginBottom:8}}>Daftar Mesin</div>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
                {/* Left: all machines */}
                <div style={{opacity: kodeBarang ? 1 : .5}}>
                  <div style={panelHeadStyle}>Daftar Mesin — klik untuk pilih</div>
                  <div style={panelStyle}>
                    <table style={{width:'100%', borderCollapse:'collapse'}}>
                      <thead>
                        <tr>
                          <th style={{position:'sticky', top:0, padding:'5px 8px', fontSize:11.5, fontWeight:600, textAlign:'center',
                            background:'var(--bg-elev)', borderBottom:'1px solid var(--border)', width:80}}>Selection</th>
                          <th style={{position:'sticky', top:0, padding:'5px 8px', fontSize:11.5, fontWeight:600,
                            background:'var(--bg-elev)', borderBottom:'1px solid var(--border)'}}>Nama Mesin</th>
                        </tr>
                      </thead>
                      <tbody>
                        {MF_MESIN_LIST.map(m => {
                          const selected = mesinDipilih.includes(m);
                          return (
                            <tr key={m} onClick={() => kodeBarang && toggleMesin(m)} style={{cursor: kodeBarang ? 'pointer' : 'not-allowed',
                              background: selected ? 'var(--primary-soft, #e8f0fe)' : 'transparent'}}>
                              <td style={{padding:'5px 8px', textAlign:'center', borderBottom:'1px solid var(--border)'}}>
                                <input type="checkbox" checked={selected} disabled={!kodeBarang} onChange={() => toggleMesin(m)} onClick={e => e.stopPropagation()} />
                              </td>
                              <td style={{padding:'5px 8px', borderBottom:'1px solid var(--border)', fontSize:13,
                                color: selected ? 'var(--primary)' : 'var(--text)', fontWeight: selected ? 600 : 400}}>{m}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* Right: selected machines */}
                <div>
                  <div style={panelHeadStyle}>Mesin YG Dipakai — klik untuk hapus</div>
                  <div style={panelStyle}>
                    <table style={{width:'100%', borderCollapse:'collapse'}}>
                      <thead>
                        <tr>
                          <th style={{position:'sticky', top:0, padding:'5px 8px', fontSize:11.5, fontWeight:600, textAlign:'center',
                            background:'var(--bg-elev)', borderBottom:'1px solid var(--border)', width:80}}>Selection</th>
                          <th style={{position:'sticky', top:0, padding:'5px 8px', fontSize:11.5, fontWeight:600,
                            background:'var(--bg-elev)', borderBottom:'1px solid var(--border)'}}>Nama Mesin</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mesinDipilih.length === 0 && (
                          <tr><td colSpan={2} style={{padding:'16px 8px', textAlign:'center',
                            color:'var(--text-3)', fontSize:12}}>Belum ada mesin dipilih</td></tr>
                        )}
                        {mesinDipilih.map((m) => (
                          <tr key={m} onClick={() => toggleMesin(m)} style={{cursor:'pointer'}}
                            onMouseEnter={e => e.currentTarget.style.background='#fef2f2'}
                            onMouseLeave={e => e.currentTarget.style.background=''}>
                            <td style={{padding:'5px 8px', textAlign:'center', borderBottom:'1px solid var(--border)'}}>
                              <input type="checkbox" checked onChange={() => toggleMesin(m)} onClick={e => e.stopPropagation()} />
                            </td>
                            <td style={{padding:'5px 8px', borderBottom:'1px solid var(--border)', fontSize:13}}>{m}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="modal-foot">
            <div className="muted"><kbd>Esc</kbd> Untuk Batal</div>
            <div style={{display:'flex', gap:8}}>
              <button className="btn" onClick={onClose}>Tutup</button>
              <button className="btn btn-primary" onClick={handleSave}>{I.check()} Simpan</button>
            </div>
          </div>
        </div>
      </div>
      {showBarangPicker && (
        <MfPilihBarangModal single zIndex={300} onConfirm={onBarangPick} onCancel={() => setShowBarangPicker(false)} />
      )}
    </>
  );
}

// ─── Barang Pakai Entry Modal ─────────────────────────────────────────────────

function MfBarangPakaiEntryModal({ data, onClose, onSave }) {
  const [kodeBarang,     setKodeBarang]     = React.useState(data?.kodeBarang     || '');
  const [namaBarang,     setNamaBarang]     = React.useState(data?.namaBarang     || '');
  const [jumlah,         setJumlah]         = React.useState(data?.jumlah         || '');
  const [satuan,         setSatuan]         = React.useState(data?.satuan         || 'MTR');
  const [sisaSebelumnya, setSisaSebelumnya] = React.useState(data?.sisaSebelumnya || '');
  const [noSpk,          setNoSpk]          = React.useState(data?.noSpk          || '');
  const [showBarangPicker, setShowBarangPicker] = React.useState(false);
  const [showSpkPicker,    setShowSpkPicker]    = React.useState(false);

  React.useEffect(() => {
    const h = e => { if (e.key === 'Escape' && !showBarangPicker && !showSpkPicker) onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [showBarangPicker, showSpkPicker, onClose]);

  const onBarangPick = (picked) => { const b = picked[0]; if (b) { setKodeBarang(b.code); setNamaBarang(b.nama); } setShowBarangPicker(false); };
  const onSpkPick    = (s) => { setNoSpk(s.no); setShowSpkPicker(false); };

  return (
    <>
      <div className="modal-backdrop" style={{zIndex:200}} onClick={onClose}>
        <div className="modal" style={{maxWidth:640}} onClick={e => e.stopPropagation()}>
          <div className="modal-head">
            <div>
              <h2>{data ? 'Edit Barang' : 'Tambah Barang'}</h2>
              <div className="sub">Pilih barang dan isi detail pemakaian.</div>
            </div>
            <button className="btn btn-icon" onClick={onClose}>{I.x(16)}</button>
          </div>
          <div className="modal-body">
            <div style={{display:'flex', flexDirection:'column', gap:14}}>
              <div style={{display:'flex', gap:8, alignItems:'flex-end'}}>
                <div className="field" style={{flex:1}}>
                  <label>Nama Barang *</label>
                  <input className="input" style={{cursor:'pointer', background:'var(--bg-elev)'}} readOnly
                    placeholder="— Pilih Barang —" value={namaBarang}
                    onClick={() => setShowBarangPicker(true)} />
                </div>
                <div className="field" style={{width:220}}>
                  <label>Kode Barang</label>
                  <input className="input mono" value={kodeBarang} readOnly placeholder="Otomatis" />
                </div>
              </div>
              <div style={{display:'grid', gridTemplateColumns:'140px 120px 1fr', gap:10}}>
                <div className="field">
                  <label>Jumlah *</label>
                  <input className="input" type="number" min="0" step="0.01" placeholder="0.00"
                    value={jumlah} onChange={e => setJumlah(e.target.value)} />
                </div>
                <div className="field">
                  <label>Satuan</label>
                  <select className="select" value={satuan} onChange={e => setSatuan(e.target.value)}>
                    {['MTR','PCS','LBR','KG'].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label>Sisa Sebelumnya</label>
                  <input className="input" type="number" min="0" step="0.01" placeholder="0.00"
                    value={sisaSebelumnya} onChange={e => setSisaSebelumnya(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label>No. SPK (Referensi)</label>
                <div style={{display:'flex', gap:4}}>
                  <input className="input mono" style={{flex:1, cursor:'pointer', background:'var(--bg-elev)'}} readOnly
                    placeholder="— Pilih SPK —" value={noSpk}
                    onClick={() => setShowSpkPicker(true)} />
                  {noSpk && <button className="btn btn-icon" title="Hapus" onClick={() => setNoSpk('')}>{I.x(14)}</button>}
                </div>
              </div>
            </div>
          </div>
          <div className="modal-foot">
            <div className="muted"><kbd>Esc</kbd> Untuk Batal</div>
            <div style={{display:'flex', gap:8}}>
              <button className="btn" onClick={onClose}>Tutup</button>
              <button className="btn btn-primary"
                onClick={() => onSave({ kodeBarang, namaBarang, jumlah, satuan, sisaSebelumnya, noSpk })}>
                {I.check()} Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
      {showBarangPicker && (
        <MfPilihBarangModal single zIndex={300} onConfirm={onBarangPick} onCancel={() => setShowBarangPicker(false)} />
      )}
      {showSpkPicker && (
        <MfSpkPickerModal onPick={onSpkPick} onClose={() => setShowSpkPicker(false)} />
      )}
    </>
  );
}
