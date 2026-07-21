// Barang — sub-modul Barang Jadi Umum & PU (tabbed, dengan Detail PU). Dipindah dari root
// barang.jsx, tidak diubah.

function BarangJadiList({ rows, onAdd, onEdit }) {
  const [q, setQ] = React.useState('');
  const filtered = rows.filter(r => !q || r.namaProduk.toLowerCase().includes(q.toLowerCase()) || r.kodeProduk.toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <BrgHeader title="Barang Jadi Umum & PU" sub={`Jumlah: ${filtered.length} barang jadi`} onAdd={onAdd} addLabel="Tambah Barang Jadi" />
      <div className="filter-bar"><div className="filter-grid">
        <div className="field"><label>Pencarian</label><div className="input-w-icon">{I.search(14)}<input className="input" placeholder="Kode atau nama barang…" value={q} onChange={e=>setQ(e.target.value)}/></div></div>
        <div className="filter-actions"><button className="btn btn-primary">{I.filter()} Cari</button></div>
      </div></div>
      <div className="table-card">
        <div className="table-toolbar"><div className="table-toolbar-left"><b>Jumlah: {filtered.length}</b></div></div>
        <div className="table-scroll">
          <table className="data">
            <thead><tr><th>Kode Produk</th><th>Nama Produk</th><th>Satuan</th><th>Status</th><th>HPP Standar</th><th>Jml Lapis PU</th><th style={{width:90}}>Aksi</th></tr></thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.kodeProduk} onClick={()=>onEdit(r)}>
                  <td className="mono muted">{r.kodeProduk}</td>
                  <td><span className="cell-link">{r.namaProduk}</span></td>
                  <td className="mono">{r.satuan}</td>
                  <td><span className={`pill ${r.status==='AKTIF' ? 'approved' : 'cancelled'}`}>{r.status}</span></td>
                  <td className="mono">{fmtRp(r.hppStandar)}</td>
                  <td className="mono">{r.detailsPU.length}</td>
                  <td onClick={e=>e.stopPropagation()}><div className="row-actions"><button className="btn btn-icon btn-sm" onClick={()=>onEdit(r)}>{I.edit()}</button><button className="btn btn-icon btn-sm del">{I.trash()}</button></div></td>
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

function BarangJadiModal({ data, onClose, onSave }) {
  const isEdit = !!data;
  const empty = { kodeProduk:'', namaProduk:'', kodeKategori:'JADI', satuan:'PCS', hppStandar:0, minimQty:0, tipeData:'F', status:'AKTIF', kodeHrg:'', warna:'', tebal:0, lebar:0, tebalTop:0, tebalBot:0, tipe:'', warnaTop:'', warnaBot:'', merk:'', panjang:0, satPjg:'MTR', berat:0, lbrReal:0, pjgReal:0, ketwarna:'', bahan:0, bmt:0, ongkos:0, jenis:'', namaCetak:'', aktif:true, keterangan:'', detailsPU:[] };
  const [form, setForm] = React.useState(() => { const base = data ? {...empty, ...data} : {...empty}; if (!Array.isArray(base.detailsPU)) base.detailsPU = []; return base; });
  const [tab, setTab] = React.useState('umum');
  const set = (k,v) => setForm(f => ({...f, [k]:v}));
  const tabs = [ { id:'umum', label:'Informasi Umum' }, { id:'fisik', label:'Spesifikasi Fisik' }, { id:'pu', label:'Detail PU' } ];
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()} style={{maxWidth:1100, maxHeight:'92vh'}}>
        <div className="modal-head">
          <div><h2>{isEdit ? `Edit Barang Jadi — ${form.kodeProduk}` : 'Tambah Barang Jadi Baru'}</h2><div className="sub">{isEdit ? form.namaProduk : 'Pastikan semua kolom bertanda (*) terisi.'}</div></div>
          <button className="btn btn-icon" onClick={onClose}>{I.x(16)}</button>
        </div>
        <div style={{padding:'10px 24px', borderBottom:'1px solid var(--border)', background:'var(--bg-elev)'}}>
          <div className="tabs-pills" style={{marginBottom:0}}>{tabs.map(t => <button key={t.id} className={tab===t.id?'active':''} onClick={()=>setTab(t.id)}>{t.label}</button>)}</div>
        </div>
        <div className="modal-body" style={{overflowY:'auto', maxHeight:'calc(92vh - 180px)', background:'var(--bg)', padding:'16px 24px'}}>
          {tab==='umum' && (
            <div className="panel">
              <div style={{display:'grid', gridTemplateColumns:'repeat(3, minmax(0,1fr))', gap:12}}>
                <div className="field"><label>Kode Produk <span style={{color:'var(--danger)'}}>*</span></label><input className="input mono" value={form.kodeProduk} onChange={e=>set('kodeProduk',e.target.value)}/></div>
                <div className="field" style={{gridColumn:'span 2'}}><label>Nama Produk <span style={{color:'var(--danger)'}}>*</span></label><input className="input" value={form.namaProduk} onChange={e=>set('namaProduk',e.target.value)}/></div>
                <div className="field"><label>Kategori</label><select className="select" value={form.kodeKategori} onChange={e=>set('kodeKategori',e.target.value)}>{BRG_KATEGORI_OPTS.map(k=><option key={k.kode} value={k.kode}>{k.nama}</option>)}</select></div>
                <div className="field"><label>Satuan</label><select className="select" value={form.satuan} onChange={e=>set('satuan',e.target.value)}>{BRG_SATUAN_OPTS.map(s=><option key={s}>{s}</option>)}</select></div>
                <div className="field"><label>Kode Harga</label><input className="input mono" value={form.kodeHrg} onChange={e=>set('kodeHrg',e.target.value)}/></div>
                <div className="field"><label>Minim Qty</label><input className="input mono" type="number" value={form.minimQty} onChange={e=>set('minimQty',+e.target.value)}/></div>
                <div className="field"><label>HPP Standar</label><input className="input mono" type="number" value={form.hppStandar} onChange={e=>set('hppStandar',+e.target.value)}/></div>
                <div className="field"><label>Status</label><select className="select" value={form.status} onChange={e=>set('status',e.target.value)}><option>AKTIF</option><option>NONAKTIF</option></select></div>
                <div className="field" style={{gridColumn:'span 3'}}><label>Keterangan</label><textarea className="textarea" value={form.keterangan} onChange={e=>set('keterangan',e.target.value)}/></div>
              </div>
            </div>
          )}
          {tab==='fisik' && (
            <div className="panel">
              <div style={{display:'grid', gridTemplateColumns:'repeat(3, minmax(0,1fr))', gap:12}}>
                <div className="field"><label>Jenis</label><input className="input" value={form.jenis} onChange={e=>set('jenis',e.target.value)}/></div>
                <div className="field"><label>Nama Cetak</label><input className="input" value={form.namaCetak} onChange={e=>set('namaCetak',e.target.value)}/></div>
                <div className="field"><label>Tipe</label><input className="input" value={form.tipe} onChange={e=>set('tipe',e.target.value)}/></div>
                <div className="field"><label>Warna</label><input className="input mono" value={form.warna} onChange={e=>set('warna',e.target.value)}/></div>
                <div className="field"><label>Warna Top</label><input className="input mono" value={form.warnaTop} onChange={e=>set('warnaTop',e.target.value)}/></div>
                <div className="field"><label>Warna Bot</label><input className="input mono" value={form.warnaBot} onChange={e=>set('warnaBot',e.target.value)}/></div>
                <div className="field"><label>Ket. Warna</label><input className="input" value={form.ketwarna} onChange={e=>set('ketwarna',e.target.value)}/></div>
                <div className="field"><label>Merk</label><input className="input mono" value={form.merk} onChange={e=>set('merk',e.target.value)}/></div>
                <div className="field"><label>Tebal</label><input className="input mono" type="number" value={form.tebal} onChange={e=>set('tebal',+e.target.value)}/></div>
                <div className="field"><label>Tebal Top</label><input className="input mono" type="number" value={form.tebalTop} onChange={e=>set('tebalTop',+e.target.value)}/></div>
                <div className="field"><label>Tebal Bot</label><input className="input mono" type="number" value={form.tebalBot} onChange={e=>set('tebalBot',+e.target.value)}/></div>
                <div className="field"><label>Lebar</label><input className="input mono" type="number" value={form.lebar} onChange={e=>set('lebar',+e.target.value)}/></div>
                <div className="field"><label>Lebar Real</label><input className="input mono" type="number" value={form.lbrReal} onChange={e=>set('lbrReal',+e.target.value)}/></div>
                <div className="field"><label>Panjang</label><input className="input mono" type="number" value={form.panjang} onChange={e=>set('panjang',+e.target.value)}/></div>
                <div className="field"><label>Panjang Real</label><input className="input mono" type="number" value={form.pjgReal} onChange={e=>set('pjgReal',+e.target.value)}/></div>
                <div className="field"><label>Satuan Panjang</label><input className="input mono" value={form.satPjg} onChange={e=>set('satPjg',e.target.value)}/></div>
                <div className="field"><label>Berat</label><input className="input mono" type="number" value={form.berat} onChange={e=>set('berat',+e.target.value)}/></div>
                <div className="field"><label>Bahan</label><input className="input mono" type="number" value={form.bahan} onChange={e=>set('bahan',+e.target.value)}/></div>
                <div className="field"><label>BMT</label><input className="input mono" type="number" value={form.bmt} onChange={e=>set('bmt',+e.target.value)}/></div>
                <div className="field"><label>Ongkos</label><input className="input mono" type="number" value={form.ongkos} onChange={e=>set('ongkos',+e.target.value)}/></div>
              </div>
            </div>
          )}
          {tab==='pu' && (
            <div className="panel">
              <BrgInlineTable
                title="Detail PU (Lapisan)"
                columns={[
                  { key:'lapisKe', label:'Lapis Ke', type:'number', num:true, width:80 },
                  { key:'kodeProdukPU', label:'Kode Produk PU', mono:true },
                  { key:'namaProdukPU', label:'Nama Produk PU' },
                  { key:'kodeProduk', label:'Kode Produk', mono:true },
                  { key:'namaProduk', label:'Nama Produk' },
                  { key:'satuan', label:'Satuan', width:90 },
                ]}
                rows={form.detailsPU}
                setRows={v => set('detailsPU', v)}
                addLabel="Tambah Lapisan"
                shortcut="L"
              />
            </div>
          )}
        </div>
        <div className="modal-foot">
          <div className="muted" style={{fontSize:12.5}}><kbd>Esc</kbd> untuk batal</div>
          <div className="right" style={{display:'flex', gap:8}}>
            <button className="btn" onClick={onClose}>Batal</button>
            <button className="btn btn-primary" onClick={()=>onSave(form)}>{I.check()} Simpan</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BarangJadiPage() {
  const [rows, setRows] = React.useState(BARANG_JADI);
  const [modal, setModal] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const save = (form) => {
    setRows(prev => showModal===2 ? prev.map(r => r.kodeProduk===modal.kodeProduk ? form : r) : [...prev, form]);
    window.__erpToast && window.__erpToast('Barang jadi berhasil disimpan.');
    setShowModal(false); setModal(null);
  };
  return (
    <>
      <BarangJadiList rows={rows} onAdd={()=>{setModal(null); setShowModal(1);}} onEdit={(r)=>{setModal(r); setShowModal(2);}} />
      {showModal && <BarangJadiModal data={modal} onClose={()=>setShowModal(false)} onSave={save} />}
    </>
  );
}
