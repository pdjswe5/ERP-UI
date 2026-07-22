// Barang module

// ---------- Shared option lists ----------
const BRG_KATEGORI_OPTS = [
  { kode:'BAKU', nama:'Bahan Baku' }, { kode:'JADI', nama:'Barang Jadi' },
  { kode:'KAT001', nama:'Aksesoris' }, { kode:'KAT002', nama:'K3' }, { kode:'KAT003', nama:'Kemasan' },
];
const BRG_SATUAN_OPTS = ['PCS', 'KG', 'LBR', 'MTR', 'ROLL', 'ZAK', 'PSG'];
const BRG_GUDANG_OPTS = [
  { kode:'GDG001', nama:'Gudang Utama' }, { kode:'GDG002', nama:'Gudang Konjoran' },
  { kode:'GDG003', nama:'Gudang Pusat' }, { kode:'GDG004', nama:'Gudang Cabang Surabaya' },
];

// ---------- Mock data ----------
const BARANG_LAIN = [
  { kodeProduk:'LN-001', namaProduk:'Jam Dinding Custom', kodeKategori:'KAT001', satuan:'PCS', minimQty:10, hppStandar:35000, tipeData:'F', aktif:true, keterangan:'Barang non-manufaktur' },
  { kodeProduk:'LN-002', namaProduk:'Kalender Promosi', kodeKategori:'KAT001', satuan:'PCS', minimQty:50, hppStandar:8000, tipeData:'F', aktif:true, keterangan:'' },
  { kodeProduk:'LN-003', namaProduk:'Sarung Tangan Kerja', kodeKategori:'KAT002', satuan:'PSG', minimQty:20, hppStandar:12000, tipeData:'F', aktif:true, keterangan:'' },
  { kodeProduk:'LN-004', namaProduk:'Stiker Logo Perusahaan', kodeKategori:'KAT001', satuan:'LBR', minimQty:100, hppStandar:1500, tipeData:'F', aktif:false, keterangan:'Discontinued' },
  { kodeProduk:'LN-005', namaProduk:'Kemasan Dus Kecil', kodeKategori:'KAT003', satuan:'PCS', minimQty:200, hppStandar:2500, tipeData:'F', aktif:true, keterangan:'' },
  { kodeProduk:'LN-006', namaProduk:'Tali Pengikat Coil', kodeKategori:'KAT003', satuan:'ROLL', minimQty:15, hppStandar:45000, tipeData:'F', aktif:true, keterangan:'' },
];

const BAHAN_BAKU = [
  { kodeProduk:'BBKKAAAA', namaProduk:'BAKU AG TEBAL 1 LEBAR 1 AZ 100 G-400', kodeKategori:'BAKU', warna:'AG', tebal:1, lebar:1, satuan:'PCS', hppStandar:125000, namaProdukSupplier:'AG Steel', tipeData:'K', az:'100', yield:'400', slow:true, marketing:true, minimQty:12, minimBhp:12, minimNon:9, koefisien:12, toleransi:12, margin:0, aktif:true, keterangan:'' },
  { kodeProduk:'AA0450914100550', namaProduk:'BAHAN ABU ANGKOLA TEBAL 0.45 LEBAR 914 MM AZ 100 G-550', kodeKategori:'BAKU', warna:'AA', tebal:0.45, lebar:914, satuan:'LBR', hppStandar:275000, namaProdukSupplier:'PT Sinar Jaya', tipeData:'K', az:'100', yield:'550', slow:false, marketing:true, minimQty:50, minimBhp:20, minimNon:10, koefisien:1.2, toleransi:0.02, margin:5, aktif:true, keterangan:'Bahan produksi utama' },
  { kodeProduk:'BB040091470550', namaProduk:'BAHAGIA BIRU BROMO TEBAL 0.40 LEBAR 914 MM AZ 70 G-550', kodeKategori:'BAKU', warna:'BB', tebal:0.40, lebar:914, satuan:'LBR', hppStandar:260000, namaProdukSupplier:'PT Sinar Jaya', tipeData:'K', az:'70', yield:'550', slow:false, marketing:false, minimQty:30, minimBhp:15, minimNon:8, koefisien:1.1, toleransi:0.03, margin:4, aktif:true, keterangan:'' },
  { kodeProduk:'AS1025ATBONON075000410', namaProduk:'ATAP SALJU 4CM TEBAL 0.25 ATAP BIRU BOGOWONTO NON BSI LEBAR 750 MM PANJANG 4.10 MTR', kodeKategori:'BAKU', warna:'AS', tebal:0.25, lebar:750, satuan:'KG', hppStandar:98000, namaProdukSupplier:'Bogowonto Metal', tipeData:'K', az:'100', yield:'400', slow:true, marketing:false, minimQty:10, minimBhp:5, minimNon:3, koefisien:1.0, toleransi:0.05, margin:3, aktif:true, keterangan:'' },
  { kodeProduk:'BBBA', namaProduk:'Kursi Paling Baru 2025', kodeKategori:'BAKU', warna:'BR', tebal:0.5, lebar:500, satuan:'PCS', hppStandar:1, namaProdukSupplier:'BREAKKKKK', tipeData:'K', az:'100', yield:'400', slow:true, marketing:true, minimQty:1, minimBhp:12, minimNon:9, koefisien:12, toleransi:12, margin:0, aktif:false, keterangan:'Sample data' },
];

const BARANG_JADI = [
  { kodeProduk:'PRD001', namaProduk:'Plastik Kemasan Premium', kodeKategori:'JADI', satuan:'PCS', hppStandar:12500.5, minimQty:10, tipeData:'F', status:'AKTIF', kodeHrg:'HRG001', warna:'AA', tebal:1.08, lebar:25, tebalTop:1.09, tebalBot:1.07, tipe:'CUSTOM', warnaTop:'Merah', warnaBot:'Putih', merk:'AL', panjang:100.21, satPjg:'MTR', berat:12.5, lbrReal:25.0, pjgReal:99.5, ketwarna:'ABU ANGOLA', bahan:3, bmt:5.5, ongkos:2500, jenis:'ROLL', namaCetak:'LOGO PERUSAHAAN', aktif:true, keterangan:'Produk untuk kemasan makanan',
    detailsPU:[
      { lapisKe:1, kodeProdukPU:'PRD001', namaProdukPU:'Plastik Kemasan Premium', kodeProduk:'AS1025ATBONON075000410', namaProduk:'ATAP SALJU 4CM TEBAL 0.25 ATAP BIRU BOGOWONTO NON BSI LEBAR 750 MM PANJANG 4.10 MTR', satuan:'KG' },
      { lapisKe:2, kodeProdukPU:'PRD001', namaProdukPU:'Plastik Kemasan Premium', kodeProduk:'AS1025ATBONON075000600', namaProduk:'ATAP SALJU 4CM TEBAL 0.25 ATAP BIRU BOGOWONTO NON BSI LEBAR 750 MM PANJANG 6 MTR', satuan:'KG' },
    ] },
  { kodeProduk:'*CO ABALAZ00010500', namaProduk:'COIL ATAP FIBERGLASS BURNT ALMOND AZ LEBAR 1 MM PANJANG 5 MTR', kodeKategori:'JADI', satuan:'PCS', hppStandar:100000, minimQty:5, tipeData:'F', status:'AKTIF', kodeHrg:'HRG002', warna:'AL', tebal:0, lebar:1, tebalTop:0, tebalBot:0, tipe:'F', warnaTop:'', warnaBot:'', merk:'AZ', panjang:5, satPjg:'MTR', berat:0, lbrReal:0, pjgReal:0, ketwarna:'', bahan:0, bmt:0, ongkos:0, jenis:'*CO', namaCetak:'CETAK 1', aktif:true, keterangan:'', detailsPU:[] },
  { kodeProduk:'AM11-UM-260630110652', namaProduk:'BT ATAP FIBERGLASS ABU ANGKOLA AZ 100', kodeKategori:'JADI', satuan:'PCS', hppStandar:300000, minimQty:5, tipeData:'F', status:'AKTIF', kodeHrg:'HRG003', warna:'AA', tebal:0, lebar:0, tebalTop:0, tebalBot:0, tipe:'AB', warnaTop:'', warnaBot:'', merk:'AL', panjang:0, satPjg:'', berat:0, lbrReal:0, pjgReal:0, ketwarna:'', bahan:0, bmt:0, ongkos:0, jenis:'BT', namaCetak:'', aktif:true, keterangan:'Jangan ada yang cacat', detailsPU:[] },
  { kodeProduk:'K012', namaProduk:'Barang Kursi', kodeKategori:'JADI', satuan:'PCS', hppStandar:215000, minimQty:40, tipeData:'F', status:'NONAKTIF', kodeHrg:'HRG004', warna:'', tebal:0, lebar:0, tebalTop:0, tebalBot:0, tipe:'', warnaTop:'', warnaBot:'', merk:'', panjang:0, satPjg:'', berat:0, lbrReal:0, pjgReal:0, ketwarna:'', bahan:0, bmt:0, ongkos:0, jenis:'', namaCetak:'', aktif:false, keterangan:'Barang Bagusss', detailsPU:[] },
];

const MUTASI_BARANG = [
  { noBukti:'MB26070001', tglBukti:'2026-07-05', kodeGudangDari:'GDG001', namaGudangDari:'Gudang Utama', kodeGudangKe:'GDG002', namaGudangKe:'Gudang Konjoran', jenis:'MUTASI', keterangan:'Pindah stok cabang', batal:false, alasanBatal:'',
    details:[ { kodeItem:'AA0450914100550', namaItem:'BAHAN ABU ANGKOLA TEBAL 0.45 LEBAR 914 MM AZ 100 G-550', kodeKonversi:1, konversi:1, jumlah:50, satuan:'LBR' } ] },
  { noBukti:'MB26070002', tglBukti:'2026-07-06', kodeGudangDari:'GDG002', namaGudangDari:'Gudang Konjoran', kodeGudangKe:'GDG003', namaGudangKe:'Gudang Pusat', jenis:'KONSINYASI', keterangan:'Titip jual ke gudang pusat', batal:false, alasanBatal:'',
    details:[ { kodeItem:'BB040091470550', namaItem:'BAHAGIA BIRU BROMO TEBAL 0.40 LEBAR 914 MM AZ 70 G-550', kodeKonversi:1, konversi:1, jumlah:20, satuan:'LBR' } ] },
  { noBukti:'MB26070003', tglBukti:'2026-07-07', kodeGudangDari:'GDG001', namaGudangDari:'Gudang Utama', kodeGudangKe:'GDG004', namaGudangKe:'Gudang Cabang Surabaya', jenis:'MUTASI', keterangan:'', batal:true, alasanBatal:'Salah input jumlah',
    details:[ { kodeItem:'LN-001', namaItem:'Jam Dinding Custom', kodeKonversi:1, konversi:1, jumlah:10, satuan:'PCS' } ] },
  { noBukti:'MB26070004', tglBukti:'2026-07-08', kodeGudangDari:'GDG003', namaGudangDari:'Gudang Pusat', kodeGudangKe:'GDG001', namaGudangKe:'Gudang Utama', jenis:'MUTASI', keterangan:'Restock gudang utama', batal:false, alasanBatal:'',
    details:[ { kodeItem:'PRD001', namaItem:'Plastik Kemasan Premium', kodeKonversi:1, konversi:1, jumlah:100, satuan:'PCS' } ] },
];

const PENYESUAIAN_BARANG = [
  { noBukti:'PB26070001', tglBukti:'2026-07-03', kodeGudang:'GDG001', namaGudang:'Gudang Utama', jenis:'KOREKSI', keterangan:'Barang rusak saat handling', batal:false, alasanBatal:'',
    details:[ { kodeItem:'AA0450914100550', namaItem:'BAHAN ABU ANGKOLA TEBAL 0.45 LEBAR 914 MM AZ 100 G-550', jumlah:-5, satuan:'LBR', hrgSatPokok:275000, hrgTotPokok:-1375000 } ] },
  { noBukti:'PB26070002', tglBukti:'2026-07-04', kodeGudang:'GDG002', namaGudang:'Gudang Konjoran', jenis:'KOREKSI', keterangan:'Penyesuaian stok minus sistem', batal:false, alasanBatal:'',
    details:[ { kodeItem:'BB040091470550', namaItem:'BAHAGIA BIRU BROMO TEBAL 0.40 LEBAR 914 MM AZ 70 G-550', jumlah:3, satuan:'LBR', hrgSatPokok:260000, hrgTotPokok:780000 } ] },
  { noBukti:'PB26070003', tglBukti:'2026-07-05', kodeGudang:'GDG001', namaGudang:'Gudang Utama', jenis:'KOREKSI', keterangan:'', batal:true, alasanBatal:'Dobel input',
    details:[ { kodeItem:'LN-004', namaItem:'Stiker Logo Perusahaan', jumlah:-20, satuan:'LBR', hrgSatPokok:1500, hrgTotPokok:-30000 } ] },
  { noBukti:'PB26070004', tglBukti:'2026-07-06', kodeGudang:'GDG003', namaGudang:'Gudang Pusat', jenis:'KOREKSI', keterangan:'Temuan opname bulanan', batal:false, alasanBatal:'',
    details:[ { kodeItem:'PRD001', namaItem:'Plastik Kemasan Premium', jumlah:-2, satuan:'PCS', hrgSatPokok:12500.5, hrgTotPokok:-25001 } ] },
];

const STOCK_OPNAME = [
  { noBukti:'SO26070001', kodeGudang:'GDG001', namaGudang:'Gudang Utama', tglBukti:'2026-07-01', keterangan:'Opname rutin bulanan', jenis:'BULANAN',
    details:[ { kodeItem:'AA0450914100550', namaItem:'BAHAN ABU ANGKOLA TEBAL 0.45 LEBAR 914 MM AZ 100 G-550', kodeKategori:'BAKU', deskripsi:'Selisih fisik vs sistem', jumlah:-2, satuan:'LBR', konversi:1 } ] },
  { noBukti:'SO26070002', kodeGudang:'GDG002', namaGudang:'Gudang Konjoran', tglBukti:'2026-07-02', keterangan:'Opname per permintaan SPV', jenis:'INSIDENTIL',
    details:[ { kodeItem:'BB040091470550', namaItem:'BAHAGIA BIRU BROMO TEBAL 0.40 LEBAR 914 MM AZ 70 G-550', kodeKategori:'BAKU', deskripsi:'Sesuai fisik', jumlah:0, satuan:'LBR', konversi:1 } ] },
  { noBukti:'SO26070003', kodeGudang:'GDG003', namaGudang:'Gudang Pusat', tglBukti:'2026-07-03', keterangan:'Opname akhir bulan', jenis:'BULANAN',
    details:[ { kodeItem:'PRD001', namaItem:'Plastik Kemasan Premium', kodeKategori:'JADI', deskripsi:'Lebih dari sistem', jumlah:5, satuan:'PCS', konversi:1 } ] },
  { noBukti:'SO26070004', kodeGudang:'GDG001', namaGudang:'Gudang Utama', tglBukti:'2026-07-04', keterangan:'Opname stok lama', jenis:'INSIDENTIL',
    details:[ { kodeItem:'LN-004', namaItem:'Stiker Logo Perusahaan', kodeKategori:'KAT001', deskripsi:'Rusak/kadaluarsa', jumlah:-15, satuan:'LBR', konversi:1 } ] },
];

const ACTIVITY_LOG_BARANG = [
  { user:'pdjsw', action:'Melakukan Login:', detail:'Sistem Utama', time:'1 menit yang lalu', color:'var(--realisasi)' },
  { user:'admin', action:'Mengubah Data Pemasok:', detail:'PT. Sinar Jaya', time:'12 menit yang lalu', color:'#f59e0b' },
  { user:'operator_1', action:'Membuat Nota Penjualan:', detail:'INV-2026-9526', time:'1 jam yang lalu', color:'var(--realisasi)' },
  { user:'system', action:'Sinkronisasi Database:', detail:'Server Cloud Utama', time:'3 jam yang lalu', color:'var(--accent)' },
  { user:'admin', action:'Menghapus Batch Produksi:', detail:'PRD-2026-B1', time:'7 jam yang lalu', color:'var(--danger)' },
];

// ---------- Shared UI helpers ----------
function BrgHeader({ title, sub, onAdd, addLabel='Tambah', extra }) {
  return (
    <div className="page-head">
      <div><h1>{title}</h1><div className="sub">{sub}</div></div>
      <div style={{display:'flex', gap:8}}>
        <button className="btn btn-sm">{I.refresh()} Refresh</button>
        <button className="btn btn-sm">{I.download()} Export</button>
        {extra}
        {onAdd && <button className="btn btn-primary" onClick={onAdd}>{I.plus()} {addLabel}</button>}
      </div>
    </div>
  );
}

function BrgModalShell({ title, sub, onClose, onSave, children, saveLabel='Simpan', wide=false, footerExtra }) {
  return (
    <div className="modal-backdrop">
      <div className="modal" onClick={e=>e.stopPropagation()} style={wide ? {maxWidth:1100, maxHeight:'92vh'} : {maxWidth:700}}>
        <div className="modal-head">
          <div><h2>{title}</h2>{sub && <div className="sub">{sub}</div>}</div>
          <button className="btn btn-icon" onClick={onClose}>{I.x(16)}</button>
        </div>
        <div className="modal-body" style={wide ? {overflowY:'auto', maxHeight:'calc(92vh - 180px)'} : {}}>{children}</div>
        <div className="modal-foot">
          <div className="muted" style={{fontSize:12.5}}><kbd>Esc</kbd> untuk batal</div>
          <div className="right" style={{display:'flex', gap:8}}>
            {footerExtra}
            <button className="btn" onClick={onClose}>Batal</button>
            <button className="btn btn-primary" onClick={onSave}>{I.check()} {saveLabel}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BrgInlineTable({ title, columns, rows, setRows, addLabel, shortcut }) {
  const update = (idx, key, value) => { const next = [...rows]; next[idx] = { ...next[idx], [key]: value }; setRows(next); };
  const remove = (idx) => setRows(rows.filter((_, i) => i !== idx));
  const add = () => setRows([...rows, Object.fromEntries(columns.map(c => [c.key, c.type === 'number' ? 0 : '']))]);
  return (
    <div className="inline-table">
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8}}>
        <h3 style={{margin:0}}>{title}</h3>
        <button className="btn btn-primary btn-sm" onClick={add}>{I.plus()} {addLabel}</button>
      </div>
      {shortcut && <div style={{textAlign:'right', fontSize:12, color:'var(--text-3)', marginBottom:8}}>Tambah: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>{shortcut}</kbd></div>}
      <div className="line-items" style={{height:200, overflowY:'auto', overflowX:'auto'}}>
        <table>
          <thead><tr>{columns.map(c => <th key={c.key} style={c.width ? {width:c.width} : {}}>{c.label}</th>)}<th style={{width:40}}></th></tr></thead>
          <tbody>
            {rows.length === 0 && <tr><td colSpan={columns.length + 1} className="empty">Belum ada data.</td></tr>}
            {rows.map((r, idx) => (
              <tr key={idx}>
                {columns.map(c => (
                  <td key={c.key}>
                    <input className={`cell ${c.num ? 'num mono' : c.mono ? 'mono' : ''}`} type={c.type || 'text'} placeholder={c.placeholder || ''}
                      value={r[c.key]} onChange={e => update(idx, c.key, c.type === 'number' ? +e.target.value : e.target.value)} />
                  </td>
                ))}
                <td><button className="btn btn-icon btn-sm del" onClick={() => remove(idx)}>{I.trash()}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function brgAktifPill(aktif) { return <span className={`pill ${aktif ? 'approved' : 'cancelled'}`}>{aktif ? 'Aktif' : 'Non-aktif'}</span>; }
function brgBatalPill(batal) { return <span className={`pill ${batal ? 'cancelled' : 'approved'}`}>{batal ? 'BATAL' : 'AKTIF'}</span>; }
function brgKategoriNama(kode) { return BRG_KATEGORI_OPTS.find(k => k.kode === kode)?.nama || kode; }
function brgGudangNama(kode) { return BRG_GUDANG_OPTS.find(g => g.kode === kode)?.nama || kode; }

// ─── 1. Barang Lain ─────────────────────────────────────────────────────────

function BarangLainList({ rows, onAdd, onEdit }) {
  const [q, setQ] = React.useState('');
  const filtered = rows.filter(r => !q || r.namaProduk.toLowerCase().includes(q.toLowerCase()) || r.kodeProduk.toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <BrgHeader title="Barang Lain" sub={`Jumlah: ${filtered.length} barang`} onAdd={onAdd} addLabel="Tambah Barang Lain" />
      <div className="filter-bar"><div className="filter-grid">
        <div className="field"><label>Pencarian</label><div className="input-w-icon">{I.search(14)}<input className="input" placeholder="Kode atau nama barang…" value={q} onChange={e=>setQ(e.target.value)}/></div></div>
        <div className="filter-actions"><button className="btn btn-primary">{I.filter()} Cari</button></div>
      </div></div>
      <div className="table-card">
        <div className="table-toolbar"><div className="table-toolbar-left"><b>Jumlah: {filtered.length}</b></div></div>
        <div className="table-scroll">
          <table className="data">
            <thead><tr><th>Kode Produk</th><th>Nama Produk</th><th>Kategori</th><th>Satuan</th><th>Minim Qty</th><th>HPP Standar</th><th>Status</th><th style={{width:90}}>Aksi</th></tr></thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.kodeProduk} onClick={()=>onEdit(r)}>
                  <td className="mono muted">{r.kodeProduk}</td>
                  <td><span className="cell-link">{r.namaProduk}</span></td>
                  <td>{brgKategoriNama(r.kodeKategori)}</td>
                  <td className="mono">{r.satuan}</td>
                  <td className="mono">{r.minimQty}</td>
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

function BarangLainModal({ data, onClose, onSave }) {
  const isEdit = !!data;
  const empty = { kodeProduk:'', namaProduk:'', kodeKategori:'KAT001', minimQty:0, hppStandar:0, satuan:'PCS', tipeData:'F', aktif:true, keterangan:'' };
  const [form, setForm] = React.useState(data ? {...empty, ...data} : empty);
  const set = (k,v) => setForm(f => ({...f, [k]:v}));
  return (
    <BrgModalShell title={isEdit ? `Edit Barang Lain — ${form.kodeProduk}` : 'Tambah Barang Lain'} onClose={onClose} onSave={()=>onSave(form)}>
      <div style={{display:'grid', gridTemplateColumns:'repeat(2, minmax(0,1fr))', gap:12}}>
        <div className="field"><label>Kode Produk <span style={{color:'var(--danger)'}}>*</span></label><input className="input mono" value={form.kodeProduk} onChange={e=>set('kodeProduk',e.target.value)}/></div>
        <div className="field"><label>Nama Produk <span style={{color:'var(--danger)'}}>*</span></label><input className="input" value={form.namaProduk} onChange={e=>set('namaProduk',e.target.value)}/></div>
        <div className="field"><label>Kategori</label><select className="select" value={form.kodeKategori} onChange={e=>set('kodeKategori',e.target.value)}>{BRG_KATEGORI_OPTS.map(k=><option key={k.kode} value={k.kode}>{k.nama}</option>)}</select></div>
        <div className="field"><label>Satuan</label><select className="select" value={form.satuan} onChange={e=>set('satuan',e.target.value)}>{BRG_SATUAN_OPTS.map(s=><option key={s}>{s}</option>)}</select></div>
        <div className="field"><label>Minim Qty</label><input className="input mono" type="number" value={form.minimQty} onChange={e=>set('minimQty',+e.target.value)}/></div>
        <div className="field"><label>HPP Standar</label><input className="input mono" type="number" value={form.hppStandar} onChange={e=>set('hppStandar',+e.target.value)}/></div>
        <div className="field"><label>Tipe Data</label><select className="select" value={form.tipeData} onChange={e=>set('tipeData',e.target.value)}><option value="K">K — Baku</option><option value="F">F — Jadi</option><option value="B">B — Lain</option></select></div>
        <div className="field"><label>Status</label><select className="select" value={form.aktif ? '1' : '0'} onChange={e=>set('aktif', e.target.value==='1')}><option value="1">Aktif</option><option value="0">Non-aktif</option></select></div>
        <div className="field" style={{gridColumn:'span 2'}}><label>Keterangan</label><textarea className="textarea" value={form.keterangan} onChange={e=>set('keterangan',e.target.value)}/></div>
      </div>
    </BrgModalShell>
  );
}

function BarangLainPage() {
  const [rows, setRows] = React.useState(BARANG_LAIN);
  const [modal, setModal] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const save = (form) => {
    setRows(prev => showModal===2 ? prev.map(r => r.kodeProduk===modal.kodeProduk ? form : r) : [...prev, form]);
    window.__erpToast && window.__erpToast('Barang lain berhasil disimpan.');
    setShowModal(false); setModal(null);
  };
  return (
    <>
      <BarangLainList rows={rows} onAdd={()=>{setModal(null); setShowModal(1);}} onEdit={(r)=>{setModal(r); setShowModal(2);}} />
      {showModal && <BarangLainModal data={modal} onClose={()=>setShowModal(false)} onSave={save} />}
    </>
  );
}

// ─── 2. Bahan Baku ──────────────────────────────────────────────────────────

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

// ─── 3. Barang Jadi Umum & PU (tabbed, dengan Detail PU) ───────────────────

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
    <div className="modal-backdrop">
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

// ─── 4-6. Transaksi stok: Mutasi, Penyesuaian, Opname ──────────────────────

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
    <div className="modal-backdrop">
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

// ─── Dashboard & Router (unchanged) ────────────────────────────────────────

function BarangDashboard({ onOpenSub }) {
  const sections = [
    {
      title:'Barang & Kelengkapan',
      count:'3',
      tiles:[
        { id:'baranglain', title:'Barang Lain',          badge:'24 item', icon:I.box(20) },
        { id:'bahankaku',  title:'Bahan Baku',           badge:'18 item', icon:I.box(20) },
        { id:'barangjadi', title:'Barang Jadi Umum & PU', badge:'32 item', icon:I.box(20) },
      ]
    },
    {
      title:'Stock & Persediaan',
      count:'3',
      tiles:[
        { id:'mutasi',      title:'Mutasi Barang & Konsinyasi', badge:'6 mutasi', icon:I.truck(20) },
        { id:'penyesuaian', title:'Penyesuaian Barang',         badge:'3 adj',    icon:I.list(20) },
        { id:'opname',      title:'Stock Opname',               badge:'2 opname', icon:I.list(20) },
      ]
    },
  ];
  return (
    <ModuleDashboard
      title="Dashboard Barang"
      subtitle="Halaman ini digunakan untuk mengelola data barang, tersedia 6 menu pendukung."
      sections={sections}
      activityLog={ACTIVITY_LOG_BARANG}
      onOpenSub={onOpenSub}
      activityTitle="Log Aktivitas Terbaru"
      activitySub="Operasi sistem yang dideteksi secara real-time"
    />
  );
}

function BarangPage({ activeSub, onSubChange, onNavigate }) {
  if (!activeSub) return <BarangDashboard onOpenSub={onSubChange} />;
  const subLabel = MODULE_SUBS.barang.find(s => s.id === activeSub)?.label ?? activeSub;
  return (
    <div className="page" data-screen-label={`Barang — ${activeSub}`}>
      <div className="crumbs">
        <a onClick={() => onNavigate?.('home')} style={{cursor:'pointer'}}>Home</a><span className="sep">/</span>
        <a onClick={()=>onSubChange(null)} style={{cursor:'pointer'}}>Barang</a><span className="sep">/</span>
        <span className="current">{subLabel}</span>
      </div>
      {activeSub === 'baranglain'   && <BarangLainPage />}
      {activeSub === 'bahankaku'    && <BahanBakuPage />}
      {activeSub === 'barangjadi'   && <BarangJadiPage />}
      {activeSub === 'mutasi'       && <MutasiBarangPage />}
      {activeSub === 'penyesuaian'  && <PenyesuaianBarangPage />}
      {activeSub === 'opname'       && <StockOpnamePage />}
    </div>
  );
}

window.BarangPage = BarangPage;
