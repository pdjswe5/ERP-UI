// Barang — transaksi stok: Mutasi, Penyesuaian, Opname (list & modal bersama, dibedakan lewat
// prop `title`/`isOpname`, sama seperti root barang.jsx asli). Dipindah dari root barang.jsx,
// tidak diubah.

function BrgTransList({ title, rows, onAdd, onView, gudangCol }) {
  const [q, setQ] = React.useState('');
  const filtered = rows.filter(r => !q || r.noBukti.toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <BrgHeader title={title} sub={`${filtered.length} transaksi`} onAdd={onAdd} addLabel="Transaksi Baru" />
      <div className="filter-bar"><div className="filter-grid">
        <div className="field"><label>Pencarian</label><div className="input-w-icon">{I.search(14)}<input className="input" placeholder="No. Bukti…" value={q} onChange={e=>setQ(e.target.value)}/></div></div>
        <div className="filter-actions"><button className="btn btn-primary">{I.filter()} Cari</button></div>
      </div></div>
      <div className="table-card">
        <div className="table-toolbar"><div className="table-toolbar-left"><b>Jumlah: {filtered.length}</b></div></div>
        <div className="table-scroll">
          <table className="data">
            <thead><tr><th>No. Bukti</th><th>Tgl. Bukti</th>{gudangCol}<th>Jenis</th><th>Keterangan</th><th>Jml Item</th><th>Status</th><th style={{width:90}}>Aksi</th></tr></thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.noBukti} onClick={()=>onView(r)}>
                  <td><span className="cell-link mono">{r.noBukti}</span></td>
                  <td>{r.tglBukti}</td>
                  {r.kodeGudangDari !== undefined ? <td>{brgGudangNama(r.kodeGudangDari)} → {brgGudangNama(r.kodeGudangKe)}</td> : <td>{brgGudangNama(r.kodeGudang)}</td>}
                  <td>{r.jenis}</td>
                  <td>{r.keterangan || <span className="muted">—</span>}</td>
                  <td className="mono">{r.details.length}</td>
                  <td>{brgBatalPill(r.batal)}</td>
                  <td onClick={e=>e.stopPropagation()}><div className="row-actions"><button className="btn btn-icon btn-sm" onClick={()=>onView(r)}>{I.edit()}</button><button className="btn btn-icon btn-sm">{I.print()}</button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pager"><div>Menampilkan <b>1</b>–<b>{filtered.length}</b> dari <b>{filtered.length}</b></div></div>
      </div>
    </>
  );
}

function BrgTransModal({ title, data, isOpname, onClose, onSave, onCancel }) {
  const isEdit = !!data;
  const empty = isOpname
    ? { noBukti:'', kodeGudang:'GDG001', tglBukti:'', keterangan:'', jenis:'BULANAN', details:[] }
    : { noBukti:'', tglBukti:'', kodeGudang:'GDG001', kodeGudangDari:undefined, kodeGudangKe:undefined, jenis:'MUTASI', keterangan:'', batal:false, alasanBatal:'', details:[] };
  const [form, setForm] = React.useState(() => { const base = data ? {...empty, ...data} : {...empty}; if (!Array.isArray(base.details)) base.details = []; return base; });
  const [tab, setTab] = React.useState('umum');
  const set = (k,v) => setForm(f => ({...f, [k]:v}));
  const isMutasi = form.kodeGudangDari !== undefined;
  const itemCols = isOpname
    ? [ { key:'kodeItem', label:'Kode Item', mono:true }, { key:'namaItem', label:'Nama Item' }, { key:'deskripsi', label:'Deskripsi' }, { key:'jumlah', label:'Selisih', type:'number', num:true, width:100 }, { key:'satuan', label:'Satuan', width:90 } ]
    : form.hrgSatPokok !== undefined || 'hrgSatPokok' in (form.details[0]||{})
      ? [ { key:'kodeItem', label:'Kode Item', mono:true }, { key:'namaItem', label:'Nama Item' }, { key:'jumlah', label:'Jumlah', type:'number', num:true, width:100 }, { key:'satuan', label:'Satuan', width:90 }, { key:'hrgSatPokok', label:'Hrg Sat. Pokok', type:'number', num:true }, { key:'hrgTotPokok', label:'Hrg Tot. Pokok', type:'number', num:true } ]
      : [ { key:'kodeItem', label:'Kode Item', mono:true }, { key:'namaItem', label:'Nama Item' }, { key:'konversi', label:'Konversi', type:'number', num:true, width:90 }, { key:'jumlah', label:'Jumlah', type:'number', num:true, width:100 }, { key:'satuan', label:'Satuan', width:90 } ];
  const tabs = [ { id:'umum', label:'Informasi Umum' }, { id:'barang', label:'Barang' } ];
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()} style={{maxWidth:1000, maxHeight:'92vh'}}>
        <div className="modal-head">
          <div><h2>{isEdit ? `Edit ${title} — ${form.noBukti}` : `${title} Baru`}</h2>{isEdit && <div className="sub">{brgBatalPill(form.batal)}</div>}</div>
          <button className="btn btn-icon" onClick={onClose}>{I.x(16)}</button>
        </div>
        <div style={{padding:'10px 24px', borderBottom:'1px solid var(--border)', background:'var(--bg-elev)'}}>
          <div className="tabs-pills" style={{marginBottom:0}}>{tabs.map(t => <button key={t.id} className={tab===t.id?'active':''} onClick={()=>setTab(t.id)}>{t.label}</button>)}</div>
        </div>
        <div className="modal-body" style={{overflowY:'auto', maxHeight:'calc(92vh - 180px)', background:'var(--bg)', padding:'16px 24px'}}>
          {tab==='umum' && (
            <div className="panel">
              <div style={{display:'grid', gridTemplateColumns:'repeat(2, minmax(0,1fr))', gap:12}}>
                <div className="field"><label>No. Bukti</label><input className="input mono" placeholder="Otomatis" value={form.noBukti} onChange={e=>set('noBukti',e.target.value)}/></div>
                <div className="field"><label>Tgl. Bukti <span style={{color:'var(--danger)'}}>*</span></label><input className="input" type="date" value={form.tglBukti} onChange={e=>set('tglBukti',e.target.value)}/></div>
                {isMutasi ? (<>
                  <div className="field"><label>Gudang Dari</label><select className="select" value={form.kodeGudangDari} onChange={e=>set('kodeGudangDari',e.target.value)}>{BRG_GUDANG_OPTS.map(g=><option key={g.kode} value={g.kode}>{g.nama}</option>)}</select></div>
                  <div className="field"><label>Gudang Ke</label><select className="select" value={form.kodeGudangKe} onChange={e=>set('kodeGudangKe',e.target.value)}>{BRG_GUDANG_OPTS.map(g=><option key={g.kode} value={g.kode}>{g.nama}</option>)}</select></div>
                </>) : (
                  <div className="field"><label>Gudang</label><select className="select" value={form.kodeGudang} onChange={e=>set('kodeGudang',e.target.value)}>{BRG_GUDANG_OPTS.map(g=><option key={g.kode} value={g.kode}>{g.nama}</option>)}</select></div>
                )}
                <div className="field"><label>Jenis</label><input className="input" value={form.jenis} onChange={e=>set('jenis',e.target.value)}/></div>
                <div className="field" style={{gridColumn:'span 2'}}><label>Keterangan</label><textarea className="textarea" value={form.keterangan} onChange={e=>set('keterangan',e.target.value)}/></div>
                {isEdit && !isOpname && form.batal && <div className="field" style={{gridColumn:'span 2'}}><label>Alasan Batal</label><input className="input" value={form.alasanBatal} onChange={e=>set('alasanBatal',e.target.value)}/></div>}
              </div>
            </div>
          )}
          {tab==='barang' && (
            <div className="panel">
              <BrgInlineTable title="Barang" columns={itemCols} rows={form.details} setRows={v=>set('details', v)} addLabel="Tambah Barang" shortcut="B" />
            </div>
          )}
        </div>
        <div className="modal-foot">
          <div className="muted" style={{fontSize:12.5}}><kbd>Esc</kbd> untuk batal</div>
          <div className="right" style={{display:'flex', gap:8}}>
            {isEdit && !isOpname && !form.batal && <button className="btn btn-danger" onClick={()=>onCancel(form)}>{I.x(14)} Batalkan Transaksi</button>}
            <button className="btn" onClick={onClose}>Tutup</button>
            <button className="btn btn-primary" onClick={()=>onSave(form)}>{I.check()} Simpan</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MutasiBarangPage() {
  const [rows, setRows] = React.useState(MUTASI_BARANG);
  const [modal, setModal] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const save = (form) => {
    setRows(prev => showModal===2 ? prev.map(r => r.noBukti===modal.noBukti ? form : r) : [...prev, {...form, noBukti: form.noBukti || `MB${Date.now()}`}]);
    window.__erpToast && window.__erpToast('Mutasi barang berhasil disimpan.');
    setShowModal(false); setModal(null);
  };
  const cancel = (form) => {
    const updated = {...form, batal:true, alasanBatal: form.alasanBatal || 'Dibatalkan oleh operator'};
    setRows(prev => prev.map(r => r.noBukti===updated.noBukti ? updated : r));
    setModal(updated);
    window.__erpToast && window.__erpToast('Transaksi mutasi dibatalkan.');
  };
  return (
    <>
      <BrgTransList title="Mutasi Barang & Konsinyasi" rows={rows} onAdd={()=>{setModal(null); setShowModal(1);}} onView={(r)=>{setModal(r); setShowModal(2);}} />
      {showModal && <BrgTransModal title="Mutasi Barang" data={modal} onClose={()=>setShowModal(false)} onSave={save} onCancel={cancel} />}
    </>
  );
}

function PenyesuaianBarangPage() {
  const [rows, setRows] = React.useState(PENYESUAIAN_BARANG);
  const [modal, setModal] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const save = (form) => {
    setRows(prev => showModal===2 ? prev.map(r => r.noBukti===modal.noBukti ? form : r) : [...prev, {...form, noBukti: form.noBukti || `PB${Date.now()}`}]);
    window.__erpToast && window.__erpToast('Penyesuaian barang berhasil disimpan.');
    setShowModal(false); setModal(null);
  };
  const cancel = (form) => {
    const updated = {...form, batal:true, alasanBatal: form.alasanBatal || 'Dibatalkan oleh operator'};
    setRows(prev => prev.map(r => r.noBukti===updated.noBukti ? updated : r));
    setModal(updated);
    window.__erpToast && window.__erpToast('Transaksi penyesuaian dibatalkan.');
  };
  return (
    <>
      <BrgTransList title="Penyesuaian Barang" rows={rows} onAdd={()=>{setModal(null); setShowModal(1);}} onView={(r)=>{setModal(r); setShowModal(2);}} />
      {showModal && <BrgTransModal title="Penyesuaian Barang" data={modal} onClose={()=>setShowModal(false)} onSave={save} onCancel={cancel} />}
    </>
  );
}

function StockOpnamePage() {
  const [rows, setRows] = React.useState(STOCK_OPNAME);
  const [modal, setModal] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const save = (form) => {
    setRows(prev => showModal===2 ? prev.map(r => r.noBukti===modal.noBukti ? form : r) : [...prev, {...form, noBukti: form.noBukti || `SO${Date.now()}`}]);
    window.__erpToast && window.__erpToast('Stock opname berhasil disimpan.');
    setShowModal(false); setModal(null);
  };
  return (
    <>
      <BrgTransList title="Stock Opname" rows={rows} onAdd={()=>{setModal(null); setShowModal(1);}} onView={(r)=>{setModal(r); setShowModal(2);}} />
      {showModal && <BrgTransModal title="Stock Opname" data={modal} isOpname onClose={()=>setShowModal(false)} onSave={save} onCancel={()=>{}} />}
    </>
  );
}
