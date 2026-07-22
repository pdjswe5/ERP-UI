// Katalog Lain module

// ---------- Mock data ----------
const KL_SALESMAN = [
  { kodeSales:'SL001', namaSales:'Affan Maulana', alamatSales:'Surabaya', telpon:'081234500001', email:'affan@pdj.co.id', targetSales:50000000, keterangan:'', aktif:true },
  { kodeSales:'SL002', namaSales:'Bobby Santoso', alamatSales:'Surabaya', telpon:'081234500002', email:'bobby@pdj.co.id', targetSales:35000000, keterangan:'', aktif:true },
  { kodeSales:'SL003', namaSales:'Charlie Reynold', alamatSales:'Sidoarjo', telpon:'081234500003', email:'charlie@pdj.co.id', targetSales:40000000, keterangan:'', aktif:true },
  { kodeSales:'SL004', namaSales:'Dewi Kartika', alamatSales:'Gresik', telpon:'081234500004', email:'dewi@pdj.co.id', targetSales:25000000, keterangan:'', aktif:false },
  { kodeSales:'SL005', namaSales:'Kevin Sales Baru', alamatSales:'', telpon:'', email:'', targetSales:0, keterangan:'', aktif:false },
];

const KL_GUDANG = [
  { kodeGudang:'GDG001', namaGudang:'Gudang Utama', jenis:'BAKU', keterangan:'Berisi stok bahan baku', aktif:true },
  { kodeGudang:'GDG002', namaGudang:'Gudang Konjoran', jenis:'JADI', keterangan:'Berisi stok barang jadi', aktif:true },
  { kodeGudang:'GDG003', namaGudang:'Gudang Pusat', jenis:'CAMPURAN', keterangan:'', aktif:true },
  { kodeGudang:'GDG004', namaGudang:'Gudang Cabang Surabaya', jenis:'CAMPURAN', keterangan:'', aktif:true },
  { kodeGudang:'KAF123', namaGudang:'Affan Aktif', jenis:'LAIN', keterangan:'berisi stok Aktif', aktif:false },
];

const KL_KATEGORI = [
  { kodeKategori:'BAKU', namaKategori:'Bahan Baku', keterangan:'', aktif:true },
  { kodeKategori:'JADI', namaKategori:'Barang Jadi', keterangan:'', aktif:true },
  { kodeKategori:'KAT001', namaKategori:'Aksesoris', keterangan:'', aktif:true },
  { kodeKategori:'KAT002', namaKategori:'K3', keterangan:'', aktif:true },
  { kodeKategori:'KAT003', namaKategori:'Kemasan', keterangan:'', aktif:true },
  { kodeKategori:'M002', namaKategori:'Affan', keterangan:'', aktif:false },
];

const KL_SATUAN = [
  { kodeSatuan:'45', namaSatuan:'PCS', keterangan:'Satuan default', aktif:true },
  { kodeSatuan:'50', namaSatuan:'PDJ', keterangan:'', aktif:true },
  { kodeSatuan:'53', namaSatuan:'PACK', keterangan:'', aktif:true },
  { kodeSatuan:'56', namaSatuan:'LBR', keterangan:'', aktif:true },
  { kodeSatuan:'60', namaSatuan:'KG', keterangan:'', aktif:true },
  { kodeSatuan:'70', namaSatuan:'ROLL', keterangan:'', aktif:false },
];

const KL_PELENGKAP = [
  { kodeProduk:'AS1023ATBBKW2075000150', kodeSatuan:'56', isi:1, hrgJual:50000, keterangan:'Baik', aktif:true },
  { kodeProduk:'AA0450914100550', kodeSatuan:'56', isi:1, hrgJual:275000, keterangan:'', aktif:true },
  { kodeProduk:'BB040091470550', kodeSatuan:'60', isi:1, hrgJual:260000, keterangan:'', aktif:true },
  { kodeProduk:'PRD001', kodeSatuan:'45', isi:1, hrgJual:15000, keterangan:'', aktif:true },
  { kodeProduk:'LN-005', kodeSatuan:'53', isi:12, hrgJual:2500, keterangan:'', aktif:false },
];

const KL_AKUN = [
  { kodeAkun:'100.001', namaAkun:'Kas Besar', tipe:'A', grup:'01', subGrup:'01', keterangan:'', aktif:true },
  { kodeAkun:'100.002', namaAkun:'Kas Kecil', tipe:'A', grup:'01', subGrup:'02', keterangan:'Baik', aktif:true },
  { kodeAkun:'200.000', namaAkun:'Aktiva', tipe:'A', grup:'01', subGrup:'01', keterangan:'', aktif:true },
  { kodeAkun:'300.001', namaAkun:'Hutang Dagang', tipe:'H', grup:'02', subGrup:'01', keterangan:'', aktif:true },
  { kodeAkun:'400.001', namaAkun:'Penjualan', tipe:'P', grup:'03', subGrup:'01', keterangan:'', aktif:true },
  { kodeAkun:'MD.015', namaAkun:'Akun Nonaktif', tipe:'A', grup:'01', subGrup:'03', keterangan:'', aktif:false },
];

const KL_AKTIVA = [
  { noAktiva:'AKT001', namaAktiva:'Mesin Cetak Roll Forming', jenis:'Mesin Produksi', jumlah:2, nilai:450000000, tglSusut:'2024-01-01', rateSusut:10, keterangan:'', aktif:true },
  { noAktiva:'AKT002', namaAktiva:'Truk Engkel Pengiriman', jenis:'Kendaraan', jumlah:3, nilai:280000000, tglSusut:'2023-06-01', rateSusut:12.5, keterangan:'', aktif:true },
  { noAktiva:'AKT003', namaAktiva:'Forklift Gudang Utama', jenis:'Alat Berat', jumlah:1, nilai:175000000, tglSusut:'2022-03-01', rateSusut:12.5, keterangan:'', aktif:true },
  { noAktiva:'AKT004', namaAktiva:'AC Kantor Lantai 2', jenis:'Elektronik', jumlah:6, nilai:36000000, tglSusut:'2021-01-01', rateSusut:25, keterangan:'Sudah disusutkan penuh', aktif:false },
  { noAktiva:'AKT005', namaAktiva:'Komputer & Server', jenis:'Elektronik', jumlah:10, nilai:95000000, tglSusut:'2024-08-01', rateSusut:25, keterangan:'', aktif:true },
];

const KL_GRUPUSER = [
  { kodeGrup:'GR01', namaGrup:'Super Admin', keterangan:'Akses penuh seluruh modul', aktif:true },
  { kodeGrup:'GR02', namaGrup:'Akuntan', keterangan:'Akses modul keuangan & akuntansi', aktif:true },
  { kodeGrup:'GR03', namaGrup:'Staff Gudang', keterangan:'Akses modul barang & inventory', aktif:true },
  { kodeGrup:'GR04', namaGrup:'Sales Manager', keterangan:'Akses modul pelanggan & penjualan', aktif:true },
];

const KL_USER = [
  { kodeUser:'pdjsw', namaUser:'PDJ Administrator', grupUser:'GR01', email:'admin@pdj.co.id', password:'••••••••', keterangan:'', aktif:true },
  { kodeUser:'admin', namaUser:'Admin Operasional', grupUser:'GR01', email:'ops@pdj.co.id', password:'••••••••', keterangan:'', aktif:true },
  { kodeUser:'operator_1', namaUser:'Siti Rahayu', grupUser:'GR02', email:'siti@pdj.co.id', password:'••••••••', keterangan:'', aktif:true },
  { kodeUser:'budi.gdg', namaUser:'Budi Santoso', grupUser:'GR03', email:'budi@pdj.co.id', password:'••••••••', keterangan:'', aktif:true },
  { kodeUser:'dewi.sls', namaUser:'Dewi Kartika', grupUser:'GR04', email:'dewi@pdj.co.id', password:'••••••••', keterangan:'', aktif:false },
];

const ACTIVITY_LOG_KATALOG_LAIN = [
  { user:'pdjsw', action:'Melakukan Login:', detail:'Sistem Utama', time:'1 menit yang lalu', color:'var(--realisasi)' },
  { user:'admin', action:'Mengubah Data Pemasok:', detail:'PT. Sinar Jaya', time:'22 menit yang lalu', color:'#f59e0b' },
  { user:'operator_1', action:'Membuat Nota Penjualan:', detail:'INV-2026-4718', time:'1 jam yang lalu', color:'var(--realisasi)' },
  { user:'system', action:'Sinkronisasi Database:', detail:'Server Cloud Utama', time:'3 jam yang lalu', color:'var(--accent)' },
  { user:'admin', action:'Menghapus Batch Produksi:', detail:'PRD-2026-B4', time:'5 jam yang lalu', color:'var(--danger)' },
];

// ---------- Shared UI helpers ----------
function KLHeader({ title, sub, onAdd, addLabel='Tambah' }) {
  return (
    <div className="page-head">
      <div><h1>{title}</h1><div className="sub">{sub}</div></div>
      <div style={{display:'flex', gap:8}}>
        <button className="btn btn-sm">{I.refresh()} Refresh</button>
        <button className="btn btn-sm">{I.download()} Export</button>
        {onAdd && <button className="btn btn-primary" onClick={onAdd}>{I.plus()} {addLabel}</button>}
      </div>
    </div>
  );
}

function klAktifPill(aktif) { return <span className={`pill ${aktif ? 'approved' : 'cancelled'}`}>{aktif ? 'Aktif' : 'Non-aktif'}</span>; }

function KLGenericModal({ moduleTitle, data, fields, formCols=2, onClose, onSave }) {
  const isEdit = !!data;
  const empty = Object.fromEntries(fields.map(f => [f.key, f.type === 'aktif' ? true : f.type === 'number' ? 0 : '']));
  const [form, setForm] = React.useState(data ? {...empty, ...data} : empty);
  const set = (k,v) => setForm(f => ({...f, [k]:v}));
  return (
    <div className="modal-backdrop">
      <div className="modal" onClick={e=>e.stopPropagation()} style={{maxWidth:720}}>
        <div className="modal-head">
          <div><h2>{isEdit ? `Edit ${moduleTitle}` : `Tambah ${moduleTitle}`}</h2><div className="sub">Pastikan semua kolom bertanda (*) terisi.</div></div>
          <button className="btn btn-icon" onClick={onClose}>{I.x(16)}</button>
        </div>
        <div className="modal-body">
          <div style={{display:'grid', gridTemplateColumns:`repeat(${formCols}, minmax(0,1fr))`, gap:12}}>
            {fields.map(f => {
              const spanStyle = f.span ? {gridColumn:`span ${f.span}`} : {};
              if (f.type === 'aktif') {
                return (
                  <div className="field" style={spanStyle} key={f.key}>
                    <label>Status</label>
                    <select className="select" value={form[f.key] ? '1' : '0'} onChange={e=>set(f.key, e.target.value === '1')}>
                      <option value="1">Aktif</option><option value="0">Non-aktif</option>
                    </select>
                  </div>
                );
              }
              if (f.type === 'select') {
                const opts = typeof f.options === 'function' ? f.options() : f.options;
                return (
                  <div className="field" style={spanStyle} key={f.key}>
                    <label>{f.label}{f.required && <span style={{color:'var(--danger)'}}> *</span>}</label>
                    <select className="select" value={form[f.key]} onChange={e=>set(f.key, e.target.value)}>
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
                    <textarea className="textarea" value={form[f.key]} onChange={e=>set(f.key, e.target.value)}/>
                  </div>
                );
              }
              return (
                <div className="field" style={spanStyle} key={f.key}>
                  <label>{f.label}{f.required && <span style={{color:'var(--danger)'}}> *</span>}</label>
                  <input
                    className={`input ${f.mono ? 'mono' : ''}`}
                    type={f.type === 'number' ? 'number' : f.type === 'date' ? 'date' : f.type === 'email' ? 'email' : 'text'}
                    disabled={f.disabled}
                    value={form[f.key]}
                    onChange={e=>set(f.key, f.type === 'number' ? +e.target.value : e.target.value)}
                  />
                </div>
              );
            })}
          </div>
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

function KLSimpleCatalog({ moduleTitle, addLabel='Tambah Data', initialRows, keyField, listColumns, fields, formCols=2, note }) {
  const [rows, setRows] = React.useState(initialRows);
  const [modal, setModal] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [q, setQ] = React.useState('');
  const filtered = rows.filter(r => !q || listColumns.some(c => String(r[c.key] ?? '').toLowerCase().includes(q.toLowerCase())));
  const openAdd = () => { setModal(null); setShowModal(1); };
  const openEdit = (r) => { setModal(r); setShowModal(2); };
  const save = (form) => {
    setRows(prev => showModal === 2 ? prev.map(r => r[keyField] === modal[keyField] ? form : r) : [...prev, form]);
    window.__erpToast && window.__erpToast(`${moduleTitle} berhasil disimpan.`);
    setShowModal(false); setModal(null);
  };
  return (
    <>
      <KLHeader title={moduleTitle} sub={`Jumlah: ${filtered.length} data${note ? ' · ' + note : ''}`} onAdd={openAdd} addLabel={addLabel} />
      <div className="filter-bar"><div className="filter-grid">
        <div className="field"><label>Pencarian</label><div className="input-w-icon">{I.search(14)}<input className="input" placeholder="Cari…" value={q} onChange={e=>setQ(e.target.value)}/></div></div>
        <div className="filter-actions"><button className="btn btn-primary">{I.filter()} Cari</button></div>
      </div></div>
      <div className="table-card">
        <div className="table-toolbar"><div className="table-toolbar-left"><b>Jumlah: {filtered.length}</b></div></div>
        <div className="table-scroll">
          <table className="data">
            <thead><tr>{listColumns.map(c => <th key={c.key}>{c.label}</th>)}<th style={{width:90}}>Aksi</th></tr></thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r[keyField]} onClick={()=>openEdit(r)}>
                  {listColumns.map((c,i) => (
                    <td key={c.key} className={c.mono ? 'mono' : ''}>
                      {c.render ? c.render(r[c.key], r) : i === 0 ? <span className="cell-link">{r[c.key]}</span> : (r[c.key] ?? <span className="muted">—</span>)}
                    </td>
                  ))}
                  <td onClick={e=>e.stopPropagation()}>
                    <div className="row-actions">
                      <button className="btn btn-icon btn-sm" title="Edit" onClick={()=>openEdit(r)}>{I.edit()}</button>
                      <button className="btn btn-icon btn-sm del" title="Hapus">{I.trash()}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pager"><div>Menampilkan <b>1</b>–<b>{filtered.length}</b> dari <b>{filtered.length}</b></div></div>
      </div>
      {showModal && <KLGenericModal moduleTitle={moduleTitle} data={modal} fields={fields} formCols={formCols} onClose={()=>setShowModal(false)} onSave={save} />}
    </>
  );
}

// ─── 1-9. Halaman katalog (nama fungsi di-prefix KL* — lihat catatan rename di plan) ───

function KLSalesmanPage() {
  return (
    <KLSimpleCatalog
      moduleTitle="Katalog Salesman" addLabel="Tambah Salesman" keyField="kodeSales" initialRows={KL_SALESMAN}
      listColumns={[
        { key:'kodeSales', label:'Kode', mono:true },
        { key:'namaSales', label:'Nama' },
        { key:'telpon', label:'Telepon', mono:true },
        { key:'targetSales', label:'Target', render:v => fmtRp(v) },
        { key:'aktif', label:'Status', render:v => klAktifPill(v) },
      ]}
      fields={[
        { key:'kodeSales', label:'Kode Sales', required:true, mono:true },
        { key:'namaSales', label:'Nama Sales', required:true },
        { key:'alamatSales', label:'Alamat Sales', type:'textarea', span:2 },
        { key:'telpon', label:'Telepon', mono:true },
        { key:'email', label:'Email', type:'email' },
        { key:'targetSales', label:'Target Sales', type:'number' },
        { key:'keterangan', label:'Keterangan', type:'textarea', span:2 },
        { key:'aktif', type:'aktif' },
      ]}
    />
  );
}

function KLGudangPage() {
  return (
    <KLSimpleCatalog
      moduleTitle="Katalog Gudang" addLabel="Tambah Gudang" keyField="kodeGudang" initialRows={KL_GUDANG}
      listColumns={[
        { key:'kodeGudang', label:'Kode', mono:true },
        { key:'namaGudang', label:'Nama' },
        { key:'jenis', label:'Jenis' },
        { key:'aktif', label:'Status', render:v => klAktifPill(v) },
      ]}
      fields={[
        { key:'kodeGudang', label:'Kode Gudang', required:true, mono:true },
        { key:'namaGudang', label:'Nama Gudang', required:true },
        { key:'jenis', label:'Jenis' },
        { key:'keterangan', label:'Keterangan', type:'textarea', span:2 },
        { key:'aktif', type:'aktif' },
      ]}
    />
  );
}

function KLKategoriBarangPage() {
  return (
    <KLSimpleCatalog
      moduleTitle="Katalog Kategori Barang" addLabel="Tambah Kategori" keyField="kodeKategori" initialRows={KL_KATEGORI}
      listColumns={[
        { key:'kodeKategori', label:'Kode', mono:true },
        { key:'namaKategori', label:'Nama' },
        { key:'aktif', label:'Status', render:v => klAktifPill(v) },
      ]}
      fields={[
        { key:'kodeKategori', label:'Kode Kategori', required:true, mono:true },
        { key:'namaKategori', label:'Nama Kategori', required:true },
        { key:'keterangan', label:'Keterangan', type:'textarea', span:2 },
        { key:'aktif', type:'aktif' },
      ]}
    />
  );
}

function KLSatuanBarangPage() {
  return (
    <KLSimpleCatalog
      moduleTitle="Katalog Satuan Barang" addLabel="Tambah Satuan" keyField="kodeSatuan" initialRows={KL_SATUAN}
      listColumns={[
        { key:'kodeSatuan', label:'Kode', mono:true },
        { key:'namaSatuan', label:'Nama' },
        { key:'aktif', label:'Status', render:v => klAktifPill(v) },
      ]}
      fields={[
        { key:'namaSatuan', label:'Nama Satuan', required:true },
        { key:'keterangan', label:'Keterangan', type:'textarea', span:2 },
        { key:'aktif', type:'aktif' },
      ]}
    />
  );
}

function KLPelengkapPage() {
  return (
    <KLSimpleCatalog
      moduleTitle="Pelengkap Bahan Baku & Barang Umum" addLabel="Tambah Data" keyField="kodeProduk" initialRows={KL_PELENGKAP}
      note="konversi satuan & harga jual"
      listColumns={[
        { key:'kodeProduk', label:'Kode Produk', mono:true },
        { key:'kodeSatuan', label:'Satuan Konversi', render:v => KL_SATUAN.find(s=>s.kodeSatuan===v)?.namaSatuan || v },
        { key:'isi', label:'Isi' },
        { key:'hrgJual', label:'Harga Jual', render:v => fmtRp(v) },
        { key:'aktif', label:'Status', render:v => klAktifPill(v) },
      ]}
      fields={[
        { key:'kodeProduk', label:'Kode Produk', required:true, mono:true, span:2 },
        { key:'kodeSatuan', label:'Satuan Konversi', type:'select', options:()=>KL_SATUAN.map(s=>({value:s.kodeSatuan, label:s.namaSatuan})) },
        { key:'isi', label:'Isi', type:'number' },
        { key:'hrgJual', label:'Harga Jual', type:'number' },
        { key:'keterangan', label:'Keterangan', type:'textarea', span:2 },
        { key:'aktif', type:'aktif' },
      ]}
    />
  );
}

function KLAkunBukuBesarPage() {
  return (
    <KLSimpleCatalog
      moduleTitle="Katalog Akun Buku Besar" addLabel="Tambah Akun" keyField="kodeAkun" initialRows={KL_AKUN}
      listColumns={[
        { key:'kodeAkun', label:'Kode', mono:true },
        { key:'namaAkun', label:'Nama' },
        { key:'tipe', label:'Tipe' },
        { key:'grup', label:'Grup', mono:true },
        { key:'subGrup', label:'SubGrup', mono:true },
        { key:'aktif', label:'Status', render:v => klAktifPill(v) },
      ]}
      fields={[
        { key:'kodeAkun', label:'Kode Akun', required:true, mono:true },
        { key:'namaAkun', label:'Nama Akun', required:true },
        { key:'tipe', label:'Tipe', type:'select', options:[{value:'A',label:'A — Aktiva'},{value:'H',label:'H — Hutang'},{value:'M',label:'M — Modal'},{value:'P',label:'P — Pendapatan'},{value:'B',label:'B — Beban'}] },
        { key:'grup', label:'Grup', mono:true },
        { key:'subGrup', label:'SubGrup', mono:true },
        { key:'keterangan', label:'Keterangan', type:'textarea', span:2 },
        { key:'aktif', type:'aktif' },
      ]}
    />
  );
}

function KLAktivaPage() {
  return (
    <KLSimpleCatalog
      moduleTitle="Katalog Aktiva" addLabel="Tambah Aktiva (Prototype)" keyField="noAktiva" initialRows={KL_AKTIVA}
      note="API sumber hanya menyediakan READ/UPDATE — tambah data bersifat prototype-only"
      listColumns={[
        { key:'noAktiva', label:'No. Aktiva', mono:true },
        { key:'namaAktiva', label:'Nama' },
        { key:'jenis', label:'Jenis' },
        { key:'jumlah', label:'Jumlah' },
        { key:'nilai', label:'Nilai', render:v => fmtRp(v) },
        { key:'aktif', label:'Status', render:v => klAktifPill(v) },
      ]}
      fields={[
        { key:'namaAktiva', label:'Nama Aktiva', required:true, span:2 },
        { key:'jenis', label:'Jenis' },
        { key:'jumlah', label:'Jumlah', type:'number' },
        { key:'nilai', label:'Nilai', type:'number' },
        { key:'tglSusut', label:'Tgl. Mulai Susut', type:'date' },
        { key:'rateSusut', label:'Rate Susut (%)', type:'number' },
        { key:'keterangan', label:'Keterangan', type:'textarea', span:2 },
        { key:'aktif', type:'aktif' },
      ]}
    />
  );
}

function KLUserPage() {
  return (
    <KLSimpleCatalog
      moduleTitle="Katalog User" addLabel="Tambah User" keyField="kodeUser" initialRows={KL_USER}
      listColumns={[
        { key:'kodeUser', label:'Kode', mono:true },
        { key:'namaUser', label:'Nama' },
        { key:'grupUser', label:'Grup', render:v => KL_GRUPUSER.find(g=>g.kodeGrup===v)?.namaGrup || v },
        { key:'email', label:'Email' },
        { key:'aktif', label:'Status', render:v => klAktifPill(v) },
      ]}
      fields={[
        { key:'kodeUser', label:'Kode User', required:true, mono:true },
        { key:'namaUser', label:'Nama User', required:true },
        { key:'grupUser', label:'Grup User', type:'select', required:true, options:()=>KL_GRUPUSER.map(g=>({value:g.kodeGrup, label:g.namaGrup})) },
        { key:'password', label:'Password', mono:true },
        { key:'email', label:'Email', type:'email' },
        { key:'keterangan', label:'Keterangan', type:'textarea', span:2 },
        { key:'aktif', type:'aktif' },
      ]}
    />
  );
}

function KLGrupUserPage() {
  return (
    <KLSimpleCatalog
      moduleTitle="Katalog Grup User" addLabel="Tambah Grup" keyField="kodeGrup" initialRows={KL_GRUPUSER}
      listColumns={[
        { key:'kodeGrup', label:'Kode', mono:true },
        { key:'namaGrup', label:'Nama' },
        { key:'aktif', label:'Status', render:v => klAktifPill(v) },
      ]}
      fields={[
        { key:'kodeGrup', label:'Kode Grup', required:true, mono:true },
        { key:'namaGrup', label:'Nama Grup', required:true },
        { key:'keterangan', label:'Keterangan', type:'textarea', span:2 },
        { key:'aktif', type:'aktif' },
      ]}
    />
  );
}

// ─── Dashboard & Router (unchanged) ────────────────────────────────────────

function KatalogLainDashboard({ onOpenSub }) {
  const sections = [
    {
      title:'Stock & Penjualan',
      count:'2',
      tiles:[
        { id:'salesman', title:'Katalog Salesman', badge:'8 sales', icon:I.users(20) },
        { id:'gudang',   title:'Katalog Gudang',   badge:'4 gudang', icon:I.box(20) },
      ]
    },
    {
      title:'Kelengkapan Barang',
      count:'3',
      tiles:[
        { id:'kategori',  title:'Katalog Kategori Barang', badge:'12 kategori', icon:I.list(20) },
        { id:'satuan',    title:'Katalog Satuan Barang',   badge:'15 satuan',   icon:I.list(20) },
        { id:'pelengkap', title:'Pelengkap Bahan Baku & Barang Umum', badge:'20 item', icon:I.list(20) },
      ]
    },
    {
      title:'Keuangan & Akuntan',
      count:'2',
      tiles:[
        { id:'akunbukubesar', title:'Katalog Akun Buku Besar', badge:'45 akun', icon:I.bank(20) },
        { id:'aktiva',        title:'Katalog Aktiva',          badge:'12 aktiva', icon:I.list(20) },
      ]
    },
    {
      title:'Konfigurasi Pengguna',
      count:'2',
      tiles:[
        { id:'user',     title:'Katalog User',     badge:'10 user', icon:I.users(20) },
        { id:'grupuser', title:'Katalog Grup User', badge:'4 grup',  icon:I.layers(20) },
      ]
    },
  ];
  return (
    <ModuleDashboard
      title="Dashboard Katalog Lain"
      subtitle="Halaman ini digunakan untuk mengelola data katalog lain, tersedia 9 menu pendukung."
      sections={sections}
      activityLog={ACTIVITY_LOG_KATALOG_LAIN}
      onOpenSub={onOpenSub}
      activityTitle="Log Aktivitas Terbaru"
      activitySub="Operasi sistem yang dideteksi secara real-time"
    />
  );
}

function KatalogLainPage({ activeSub, onSubChange, onNavigate }) {
  if (!activeSub) return <KatalogLainDashboard onOpenSub={onSubChange} />;
  const subLabel = MODULE_SUBS.kataloglain.find(s => s.id === activeSub)?.label ?? activeSub;
  return (
    <div className="page" data-screen-label={`Katalog Lain — ${activeSub}`}>
      <div className="crumbs">
        <a onClick={() => onNavigate?.('home')} style={{cursor:'pointer'}}>Home</a><span className="sep">/</span>
        <a onClick={()=>onSubChange(null)} style={{cursor:'pointer'}}>Katalog Lain</a><span className="sep">/</span>
        <span className="current">{subLabel}</span>
      </div>
      {activeSub === 'salesman'      && <KLSalesmanPage />}
      {activeSub === 'gudang'        && <KLGudangPage />}
      {activeSub === 'kategori'      && <KLKategoriBarangPage />}
      {activeSub === 'satuan'        && <KLSatuanBarangPage />}
      {activeSub === 'pelengkap'     && <KLPelengkapPage />}
      {activeSub === 'akunbukubesar' && <KLAkunBukuBesarPage />}
      {activeSub === 'aktiva'        && <KLAktivaPage />}
      {activeSub === 'user'          && <KLUserPage />}
      {activeSub === 'grupuser'      && <KLGrupUserPage />}
    </div>
  );
}

window.KatalogLainPage = KatalogLainPage;
