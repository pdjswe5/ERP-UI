// Barang — sub-modul Bahan Baku: list, modal, dan halaman. Dipindah dari root barang.jsx, tidak diubah.

function BahanBakuList({ rows, onAdd, onEdit }) {
  const [q, setQ] = React.useState('');
  const filtered = rows.filter(r => !q || r.namaProduk.toLowerCase().includes(q.toLowerCase()) || r.kodeProduk.toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <BrgHeader title="Bahan Baku" sub={`Jumlah: ${filtered.length} bahan baku`} onAdd={onAdd} addLabel="Tambah Bahan Baku" />
      <div className="filter-bar"><div className="filter-grid">
        <div className="field"><label>Pencarian</label><div className="input-w-icon">{I.search(14)}<input className="input" placeholder="Kode atau nama bahan…" value={q} onChange={e=>setQ(e.target.value)}/></div></div>
        <div className="filter-actions"><button className="btn btn-primary">{I.filter()} Cari</button></div>
      </div></div>
      <div className="table-card">
        <div className="table-toolbar"><div className="table-toolbar-left"><b>Jumlah: {filtered.length}</b></div></div>
        <div className="table-scroll">
          <table className="data">
            <thead><tr><th>Kode Produk</th><th>Nama Produk</th><th>Warna</th><th>Tebal</th><th>Lebar</th><th>Satuan</th><th>HPP Standar</th><th>Status</th><th style={{width:90}}>Aksi</th></tr></thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.kodeProduk} onClick={()=>onEdit(r)}>
                  <td className="mono muted">{r.kodeProduk}</td>
                  <td><span className="cell-link">{r.namaProduk}</span></td>
                  <td className="mono">{r.warna}</td>
                  <td className="mono">{r.tebal}</td>
                  <td className="mono">{r.lebar}</td>
                  <td className="mono">{r.satuan}</td>
                  <td className="mono">{fmtRp(r.hppStandar)}</td>
                  <td>{brgAktifPill(r.aktif)}</td>
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

function BahanBakuModal({ data, onClose, onSave }) {
  const isEdit = !!data;
  const empty = { kodeProduk:'', namaProduk:'', kodeKategori:'BAKU', minimQty:0, hppStandar:0, namaProdukSupplier:'', tipeData:'K', warna:'', tebal:0, lebar:0, az:'', yield:'', slow:false, marketing:false, minimBhp:0, minimNon:0, koefisien:0, toleransi:0, margin:0, satuan:'PCS', aktif:true, keterangan:'' };
  const [form, setForm] = React.useState(data ? {...empty, ...data} : empty);
  const set = (k,v) => setForm(f => ({...f, [k]:v}));
  return (
    <BrgModalShell title={isEdit ? `Edit Bahan Baku — ${form.kodeProduk}` : 'Tambah Bahan Baku'} onClose={onClose} onSave={()=>onSave(form)} wide>
      <div className="panel">
        <h3>Informasi Dasar</h3>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, minmax(0,1fr))', gap:12}}>
          <div className="field"><label>Kode Produk <span style={{color:'var(--danger)'}}>*</span></label><input className="input mono" value={form.kodeProduk} onChange={e=>set('kodeProduk',e.target.value)}/></div>
          <div className="field" style={{gridColumn:'span 2'}}><label>Nama Produk <span style={{color:'var(--danger)'}}>*</span></label><input className="input" value={form.namaProduk} onChange={e=>set('namaProduk',e.target.value)}/></div>
          <div className="field"><label>Nama Produk Supplier</label><input className="input" value={form.namaProdukSupplier} onChange={e=>set('namaProdukSupplier',e.target.value)}/></div>
          <div className="field"><label>Satuan</label><select className="select" value={form.satuan} onChange={e=>set('satuan',e.target.value)}>{BRG_SATUAN_OPTS.map(s=><option key={s}>{s}</option>)}</select></div>
          <div className="field"><label>HPP Standar</label><input className="input mono" type="number" value={form.hppStandar} onChange={e=>set('hppStandar',+e.target.value)}/></div>
        </div>
      </div>
      <div className="panel" style={{marginTop:16}}>
        <h3>Spesifikasi Fisik</h3>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, minmax(0,1fr))', gap:12}}>
          <div className="field"><label>Warna</label><input className="input mono" value={form.warna} onChange={e=>set('warna',e.target.value)}/></div>
          <div className="field"><label>Tebal</label><input className="input mono" type="number" value={form.tebal} onChange={e=>set('tebal',+e.target.value)}/></div>
          <div className="field"><label>Lebar</label><input className="input mono" type="number" value={form.lebar} onChange={e=>set('lebar',+e.target.value)}/></div>
          <div className="field"><label>AZ</label><input className="input mono" value={form.az} onChange={e=>set('az',e.target.value)}/></div>
          <div className="field"><label>Yield (G)</label><input className="input mono" value={form.yield} onChange={e=>set('yield',e.target.value)}/></div>
          <div className="field"><label>Slow Moving</label><select className="select" value={form.slow ? '1':'0'} onChange={e=>set('slow', e.target.value==='1')}><option value="0">Tidak</option><option value="1">Ya</option></select></div>
        </div>
      </div>
      <div className="panel" style={{marginTop:16}}>
        <h3>Parameter Produksi</h3>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, minmax(0,1fr))', gap:12}}>
          <div className="field"><label>Minim Qty</label><input className="input mono" type="number" value={form.minimQty} onChange={e=>set('minimQty',+e.target.value)}/></div>
          <div className="field"><label>Minim BHP</label><input className="input mono" type="number" value={form.minimBhp} onChange={e=>set('minimBhp',+e.target.value)}/></div>
          <div className="field"><label>Minim Non</label><input className="input mono" type="number" value={form.minimNon} onChange={e=>set('minimNon',+e.target.value)}/></div>
          <div className="field"><label>Koefisien</label><input className="input mono" type="number" value={form.koefisien} onChange={e=>set('koefisien',+e.target.value)}/></div>
          <div className="field"><label>Toleransi</label><input className="input mono" type="number" value={form.toleransi} onChange={e=>set('toleransi',+e.target.value)}/></div>
          <div className="field"><label>Margin (%)</label><input className="input mono" type="number" value={form.margin} onChange={e=>set('margin',+e.target.value)}/></div>
          <div className="field"><label>Marketing</label><select className="select" value={form.marketing ? '1':'0'} onChange={e=>set('marketing', e.target.value==='1')}><option value="0">Tidak</option><option value="1">Ya</option></select></div>
          <div className="field"><label>Status</label><select className="select" value={form.aktif ? '1':'0'} onChange={e=>set('aktif', e.target.value==='1')}><option value="1">Aktif</option><option value="0">Non-aktif</option></select></div>
          <div className="field"><label>Keterangan</label><input className="input" value={form.keterangan} onChange={e=>set('keterangan',e.target.value)}/></div>
        </div>
      </div>
    </BrgModalShell>
  );
}

function BahanBakuPage() {
  const [rows, setRows] = React.useState(BAHAN_BAKU);
  const [modal, setModal] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const save = (form) => {
    setRows(prev => showModal===2 ? prev.map(r => r.kodeProduk===modal.kodeProduk ? form : r) : [...prev, form]);
    window.__erpToast && window.__erpToast('Bahan baku berhasil disimpan.');
    setShowModal(false); setModal(null);
  };
  return (
    <>
      <BahanBakuList rows={rows} onAdd={()=>{setModal(null); setShowModal(1);}} onEdit={(r)=>{setModal(r); setShowModal(2);}} />
      {showModal && <BahanBakuModal data={modal} onClose={()=>setShowModal(false)} onSave={save} />}
    </>
  );
}
