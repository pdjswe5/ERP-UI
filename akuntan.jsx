// Akuntan (Accounting) module — dashboard + 3 sub-screens + modals

const AKUN_BB = [
  { name:'Kas Besar',          kode:'100.001', tipe:'K',    grup:'01', subgrup:'01',   ket:'',       aktif:true },
  { name:'Kas Kecil',          kode:'100.002', tipe:'K',    grup:'01', subgrup:'02',   ket:'Balik',  aktif:true },
  { name:'Kas Besar',          kode:'100.003', tipe:'K',    grup:'01', subgrup:'01',   ket:'',       aktif:true },
  { name:'KAS BESAR',          kode:'1000.005', tipe:'KAS', grup:'10', subgrup:'1000', ket:'IMPORT', aktif:true },
  { name:'KAS KECIL 1',        kode:'1000.011', tipe:'KAS', grup:'10', subgrup:'1000', ket:'IMPORT', aktif:true },
  { name:'KAS KECIL 2',        kode:'1000.033', tipe:'KAS', grup:'10', subgrup:'1000', ket:'IMPORT', aktif:true },
  { name:'BANK BCA',           kode:'1005.000', tipe:'BANK',grup:'10', subgrup:'1005', ket:'IMPORT', aktif:true },
  { name:'BRI',                kode:'1005.001', tipe:'BANK',grup:'10', subgrup:'1005', ket:'IMPORT', aktif:true },
  { name:'MANDIRI',            kode:'1005.002', tipe:'BANK',grup:'10', subgrup:'1005', ket:'IMPORT', aktif:true },
  { name:'DEPOSITO BCA',       kode:'1010.000', tipe:'',    grup:'10', subgrup:'1010', ket:'IMPORT', aktif:true },
  { name:'PIUTANG USAHA',      kode:'1015.000', tipe:'',    grup:'10', subgrup:'1015', ket:'IMPORT', aktif:true },
  { name:'PIUTANG USAHA 2',    kode:'1015.001', tipe:'',    grup:'10', subgrup:'1015', ket:'IMPORT', aktif:true },
  { name:'PIUTANG GIRO 1',     kode:'1020.000', tipe:'',    grup:'10', subgrup:'1020', ket:'IMPORT', aktif:true },
  { name:'PIUTANG GIRO 2',     kode:'1020.001', tipe:'',    grup:'10', subgrup:'1020', ket:'IMPORT', aktif:true },
  { name:'PIUTANG KARYAWAN',   kode:'1021.000', tipe:'',    grup:'10', subgrup:'1021', ket:'IMPORT', aktif:true },
  { name:'PIUTANG DIREKSI',    kode:'1021.001', tipe:'',    grup:'10', subgrup:'1021', ket:'IMPORT', aktif:true },
  { name:'CADANGAN KERUGIAN PIUTANG', kode:'1021.002', tipe:'', grup:'10', subgrup:'1021', ket:'IMPORT', aktif:true },
  { name:'UNBILLED DELIVERY',  kode:'1021.003', tipe:'',    grup:'10', subgrup:'1021', ket:'IMPORT', aktif:true },
  { name:'PIUTANG DEVIDEN',    kode:'1021.004', tipe:'',    grup:'10', subgrup:'1021', ket:'IMPORT', aktif:true },
  { name:'PPN MASUKAN',        kode:'1022.000', tipe:'',    grup:'10', subgrup:'1022', ket:'IMPORT', aktif:true },
  { name:'PIUTANG PAJAK PPH 22', kode:'1022.001', tipe:'',  grup:'10', subgrup:'1022', ket:'IMPORT', aktif:true },
  { name:'PERSEDIAAN BARANG',  kode:'1030.000', tipe:'',    grup:'10', subgrup:'1030', ket:'IMPORT', aktif:true },
  { name:'PERSEDIAAN BAHAN',   kode:'1030.001', tipe:'',    grup:'10', subgrup:'1030', ket:'IMPORT', aktif:true },
  { name:'AKTIVA TETAP',       kode:'1500.000', tipe:'',    grup:'15', subgrup:'1500', ket:'IMPORT', aktif:true },
  { name:'AKUMULASI PENYUSUTAN', kode:'1500.099', tipe:'',  grup:'15', subgrup:'1500', ket:'IMPORT', aktif:true },
  { name:'HUTANG USAHA',       kode:'2000.000', tipe:'',    grup:'20', subgrup:'2000', ket:'IMPORT', aktif:true },
  { name:'HUTANG GIRO',        kode:'2010.000', tipe:'',    grup:'20', subgrup:'2010', ket:'IMPORT', aktif:true },
  { name:'PPN KELUARAN',       kode:'2020.000', tipe:'',    grup:'20', subgrup:'2020', ket:'IMPORT', aktif:true },
  { name:'PENJUALAN',          kode:'4000.000', tipe:'',    grup:'40', subgrup:'4000', ket:'IMPORT', aktif:true },
  { name:'HPP',                kode:'5000.000', tipe:'',    grup:'50', subgrup:'5000', ket:'IMPORT', aktif:true },
  { name:'BIAYA OPERASIONAL',  kode:'6000.000', tipe:'',    grup:'60', subgrup:'6000', ket:'IMPORT', aktif:true },
];

const AKTIVA = [
  { kode:'AT-001', nama:'Toyota Avanza B 1234 ABC',    aktif:true,  tglJual:'',           tglBeli:'15-03-2024', noBukti:'BB-2024-0312', noKelompok:'KEND-001', compro:'PT Pacific Data', kategori:'KEND', harga: 215000000, susut:  35833333, nilai:179166667 },
  { kode:'AT-002', nama:'Mitsubishi Pajero B 5678 DEF',aktif:true,  tglJual:'',           tglBeli:'22-06-2024', noBukti:'BB-2024-0612', noKelompok:'KEND-002', compro:'PT Pacific Data', kategori:'KEND', harga: 645000000, susut:  64500000, nilai:580500000 },
  { kode:'AT-003', nama:'Forklift Toyota 3 Ton',        aktif:true,  tglJual:'',           tglBeli:'10-01-2025', noBukti:'BB-2025-0101', noKelompok:'GUDA-001', compro:'PT Pacific Data', kategori:'ALAT', harga: 285000000, susut:  18750000, nilai:266250000 },
  { kode:'AT-004', nama:'Server Dell R740',             aktif:true,  tglJual:'',           tglBeli:'05-02-2025', noBukti:'BB-2025-0203', noKelompok:'IT-001',   compro:'PT Pacific Data', kategori:'IT',   harga:  92000000, susut:   6133333, nilai: 85866667 },
  { kode:'AT-005', nama:'AC Daikin 5PK Showroom',       aktif:true,  tglJual:'',           tglBeli:'20-09-2024', noBukti:'BB-2024-0921', noKelompok:'GD-001',   compro:'PT Pacific Data', kategori:'BANG', harga:  18500000, susut:   2316666, nilai: 16183334 },
  { kode:'AT-006', nama:'Bangunan Showroom Surabaya',   aktif:true,  tglJual:'',           tglBeli:'01-01-2020', noBukti:'BB-2020-0101', noKelompok:'BG-001',   compro:'PT Pacific Data', kategori:'BANG', harga:3800000000, susut:1058333333, nilai:2741666667 },
  { kode:'AT-007', nama:'Honda Brio Service B 2222 GHI',aktif:false, tglJual:'12-02-2026', tglBeli:'05-04-2022', noBukti:'BB-2022-0401', noKelompok:'KEND-003', compro:'PT Pacific Data', kategori:'KEND', harga: 165000000, susut: 110000000, nilai: 55000000 },
  { kode:'AT-008', nama:'Mesin Genset 200kVA',          aktif:true,  tglJual:'',           tglBeli:'18-11-2023', noBukti:'BB-2023-1118', noKelompok:'GEN-001', compro:'PT Pacific Data', kategori:'ALAT', harga: 425000000, susut: 100208333, nilai:324791667 },
  { kode:'AT-009', nama:'Laptop Dell Latitude (5 unit)',aktif:true,  tglJual:'',           tglBeli:'12-03-2025', noBukti:'BB-2025-0312', noKelompok:'IT-002',   compro:'PT Pacific Data', kategori:'IT',   harga:  78000000, susut:   3250000, nilai: 74750000 },
  { kode:'AT-010', nama:'Tools Set Bengkel',            aktif:true,  tglJual:'',           tglBeli:'25-07-2024', noBukti:'BB-2024-0725', noKelompok:'BKL-001', compro:'PT Pacific Data', kategori:'ALAT', harga:  42500000, susut:   7437500, nilai: 35062500 },
];

const JURNAL_MEMO = [
  { tgl:'30-04-2026', no:'JM-2026-0042', desc:'Penyusutan aktiva tetap April 2026',                  total:  21541667, status:'Posted',  pembuat:'Accountant 1' },
  { tgl:'30-04-2026', no:'JM-2026-0041', desc:'Reklasifikasi PPN masukan ke uang muka pajak',         total:  12350000, status:'Posted',  pembuat:'Accountant 1' },
  { tgl:'29-04-2026', no:'JM-2026-0040', desc:'Adjusment piutang ragu-ragu — CKR',                    total:   3200000, status:'Posted',  pembuat:'Accountant 2' },
  { tgl:'28-04-2026', no:'JM-2026-0039', desc:'Pencatatan beban sewa kantor cabang Surabaya',         total:  18000000, status:'Pending', pembuat:'Accountant 2' },
  { tgl:'25-04-2026', no:'JM-2026-0038', desc:'Koreksi pencatatan biaya BBM April',                   total:    850000, status:'Posted',  pembuat:'Accountant 1' },
  { tgl:'22-04-2026', no:'JM-2026-0037', desc:'Pengakuan pendapatan jasa service tahap 1',            total:  14250000, status:'Posted',  pembuat:'Accountant 1' },
  { tgl:'18-04-2026', no:'JM-2026-0036', desc:'Adjusment selisih kas opname',                          total:    150000, status:'Posted',  pembuat:'Accountant 2' },
  { tgl:'15-04-2026', no:'JM-2026-0035', desc:'Reklasifikasi piutang karyawan',                        total:   5500000, status:'Draft',   pembuat:'Accountant 2' },
];

Object.assign(window, { AKUN_BB, AKTIVA, JURNAL_MEMO });

const AK_SUBS = [
  { id:'akun',    label:'Katalog Akun Buku Besar' },
  { id:'aktiva',  label:'Katalog Aktiva' },
  { id:'jurnal',  label:'Jurnal Memorial' },
];

function AkSubNav({ active, onChange }) {
  return (
    <div className="tabs-pills" style={{marginBottom:18, marginTop:-4}}>
      {AK_SUBS.map(s => (
        <button key={s.id} className={active===s.id?'active':''} onClick={()=>onChange(s.id)}>{s.label}</button>
      ))}
    </div>
  );
}

function AkuntanDashboard({ onOpenSub, onNavigate }) {
  const totalAkun = AKUN_BB.length;
  const aktivaAktif = AKTIVA.filter(a=>a.aktif).length;
  const totalAktiva = AKTIVA.reduce((s,a)=>s+a.nilai, 0);
  const jmDraft = JURNAL_MEMO.filter(j=>j.status==='Draft' || j.status==='Pending').length;

  const tiles = [
    { id:'akun',   icon:I.list(20),    title:'Katalog Akun Buku Besar', desc:'Master Chart of Accounts (CoA) — kelola akun K/B/D, grup, dan sub-grup buku besar.', badge:`${totalAkun} akun aktif`, accent:null },
    { id:'aktiva', icon:I.box(20),     title:'Katalog Aktiva',           desc:'Daftar aktiva tetap, harga perolehan, akumulasi penyusutan, dan nilai buku.', badge:`${aktivaAktif} aktiva aktif`, accent:'#7c3aed' },
    { id:'jurnal', icon:I.invoice(20), title:'Jurnal Memorial',          desc:'Jurnal manual untuk pencatatan adjusment, reklasifikasi, dan koreksi.', badge: jmDraft > 0 ? `${jmDraft} draft/pending` : null, badgeKind:'pulse', accent:'#0d9488' },
  ];

  return (
    <div className="page" data-screen-label="05 Akuntan — Dashboard">
      <div className="crumbs"><a onClick={() => onNavigate?.('home')} style={{cursor:'pointer'}}>Home</a><span className="sep">/</span><span className="current">Akuntan</span></div>
      <div className="page-head">
        <div><h1>Akuntan Workspace</h1><div className="sub">Kelola akun buku besar, aktiva tetap, dan jurnal memorial dalam satu workspace.</div></div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn-sm">{I.refresh()} Refresh</button>
          <button className="btn btn-sm btn-primary" onClick={()=>onOpenSub('jurnal')}>{I.plus()} Jurnal Baru</button>
        </div>
      </div>

      <div className="kpi-strip">
        <div className="kpi"><div className="lbl">Total Akun BB</div><div className="val mono">{totalAkun}</div><div className="delta up">{AKUN_BB.filter(a=>a.tipe==='KAS').length} kas · {AKUN_BB.filter(a=>a.tipe==='BANK').length} bank</div></div>
        <div className="kpi"><div className="lbl">Nilai Buku Aktiva</div><div className="val mono">{fmtRp(totalAktiva)}</div><div className="delta up">{aktivaAktif} aktiva tetap aktif</div></div>
        <div className="kpi"><div className="lbl">Penyusutan (YTD)</div><div className="val mono">{fmtRp(AKTIVA.reduce((s,a)=>s+a.susut, 0))}</div><div className="delta down">akumulasi sd. April 2026</div></div>
        <div className="kpi"><div className="lbl">Jurnal Memorial (30d)</div><div className="val mono">{JURNAL_MEMO.length}</div><div className="delta">{jmDraft} perlu review</div></div>
      </div>

      <h3 className="section-title">Modul Akuntan <span className="count">{tiles.length}</span></h3>
      <div className="tile-grid">
        {tiles.map(t => (
          <button key={t.id} className="tile" onClick={()=>onOpenSub(t.id)}>
            <div className="tile-head">
              <div className="tile-icon-wrap" style={t.accent ? { background: t.accent + '14', color: t.accent } : null}>{t.icon}</div>
              {t.badge && <span className={`tile-badge ${t.badgeKind === 'pulse' ? 'pulse' : ''}`}>{t.badge}</span>}
            </div>
            <div><h3>{t.title}</h3><p>{t.desc}</p></div>
          </button>
        ))}
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:16, marginTop:32}}>
        <div className="panel">
          <h3>Komposisi Akun BB per Grup</h3>
          <div style={{display:'flex', flexDirection:'column', gap:10}}>
            {[
              ['10 — Aktiva',   AKUN_BB.filter(a=>a.grup==='10').length, '#0369a1'],
              ['15 — Aktiva Tetap', AKUN_BB.filter(a=>a.grup==='15').length, '#7c3aed'],
              ['20 — Hutang',   AKUN_BB.filter(a=>a.grup==='20').length, '#b45309'],
              ['40 — Pendapatan', AKUN_BB.filter(a=>a.grup==='40').length, '#0d9488'],
              ['50 — HPP',       AKUN_BB.filter(a=>a.grup==='50').length, '#dc2626'],
              ['60 — Beban',     AKUN_BB.filter(a=>a.grup==='60').length, '#9a3412'],
              ['01 — Kas',       AKUN_BB.filter(a=>a.grup==='01').length, '#0d9488'],
            ].map(([nm, cnt, col]) => {
              const pct = (cnt / AKUN_BB.length) * 100;
              return (
                <div key={nm}>
                  <div style={{display:'flex', justifyContent:'space-between', fontSize:12.5, marginBottom:5}}>
                    <span>{nm}</span><span className="mono muted">{cnt} akun</span>
                  </div>
                  <div style={{height:6, background:'var(--bg-sub)', borderRadius:999, overflow:'hidden'}}>
                    <div style={{height:'100%', width:Math.max(8,pct*4)+'%', background:col, borderRadius:999}} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="panel">
          <h3>Aktivitas Akuntansi Terkini</h3>
          <div className="timeline">
            <div className="timeline-item done">
              <div className="ti-when">Hari ini · 16:30</div>
              <div className="ti-what"><b className="ti-who">Accountant 1</b> posting <span className="cell-link mono">JM-2026-0042</span> · Penyusutan April</div>
            </div>
            <div className="timeline-item done">
              <div className="ti-when">Hari ini · 11:08</div>
              <div className="ti-what"><b className="ti-who">Sistem</b> generate jadwal penyusutan untuk 10 aktiva</div>
            </div>
            <div className="timeline-item">
              <div className="ti-when">Kemarin · 14:22</div>
              <div className="ti-what"><b className="ti-who">Accountant 2</b> input adjusment piutang ragu-ragu</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AkHeader({ title, sub, onAdd, addLabel='Tambah' }) {
  return (
    <div className="page-head">
      <div><h1>{title}</h1><div className="sub">{sub}</div></div>
      <div style={{display:'flex', gap:8}}>
        <button className="btn btn-sm">{I.refresh()} Refresh</button>
        <button className="btn btn-sm">{I.download()} Export</button>
        {onAdd && <button className="btn btn-primary" onClick={onAdd}>{I.plus()} {addLabel}</button>}
        <button className="btn btn-sm">Aksi Katalog {I.chev(11)}</button>
      </div>
    </div>
  );
}

function KatalogAkunBB({ onAdd, onEdit }) {
  const [q, setQ] = React.useState('');
  const filtered = AKUN_BB.filter(a => !q || a.name.toLowerCase().includes(q.toLowerCase()) || a.kode.includes(q));
  return (
    <>
      <AkHeader title="Katalog Akun Buku Besar" sub={`Jumlah: ${filtered.length}`} onAdd={onAdd} addLabel="Tambah Item" />
      <div className="filter-bar">
        <div className="filter-grid">
          <div className="field"><label>Kriteria</label><select className="select"><option>Semua</option><option>Kas</option><option>Bank</option><option>Aktiva</option><option>Hutang</option><option>Pendapatan</option><option>Beban</option></select></div>
          <div className="field"><label>Pencarian</label><div className="input-w-icon">{I.search(14)}<input className="input" placeholder="Nama atau kode akun…" value={q} onChange={e=>setQ(e.target.value)}/></div></div>
          <div className="filter-actions"><button className="btn">Pilih Kolom</button></div>
        </div>
      </div>

      <div className="table-card">
        <div className="table-toolbar"><div className="table-toolbar-left"><b>Jumlah: {filtered.length}</b></div></div>
        <div className="table-scroll">
          <table className="data">
            <thead>
              <tr>
                <th style={{width:'30%'}}>Nama Akun</th>
                <th>Kode Akun</th>
                <th>Tipe</th>
                <th>Grup</th>
                <th>Sub Grup</th>
                <th>Keterangan</th>
                <th className="center" style={{width:60}}>Aktif</th>
                <th style={{width:100}}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.kode} onClick={()=>onEdit(a)}>
                  <td><span className="cell-link">{a.name}</span></td>
                  <td className="mono cell-link">{a.kode}</td>
                  <td>{a.tipe || <span className="muted">—</span>}</td>
                  <td className="mono">{a.grup}</td>
                  <td className="mono cell-link">{a.subgrup}</td>
                  <td>{a.ket ? <span className="cell-link">{a.ket}</span> : <span className="muted">—</span>}</td>
                  <td className="center">{a.aktif ? <span>{I.check(14)}</span> : <span className="muted">—</span>}</td>
                  <td onClick={e=>e.stopPropagation()}>
                    <div className="row-actions">
                      <button className="btn btn-icon btn-sm" onClick={()=>onEdit(a)} title="Edit">{I.edit()}</button>
                      <button className="btn btn-icon btn-sm" title="Duplicate">{I.copy()}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pager">
          <div>Jumlah: <b style={{color:'var(--text)'}}>{filtered.length}</b></div>
          <div className="pager-pages"><button className="active">1</button></div>
          <div>Tampilkan <b style={{color:'var(--text)'}}>50</b> per halaman</div>
        </div>
      </div>
    </>
  );
}

function KatalogAktiva({ onAdd, onEdit }) {
  return (
    <>
      <AkHeader title="Katalog Aktiva" sub={`${AKTIVA.length} aktiva · ${AKTIVA.filter(a=>a.aktif).length} aktif`} onAdd={onAdd} addLabel="Tambah Item" />
      <div className="filter-bar">
        <div className="filter-grid">
          <div className="field"><label>Kriteria</label><select className="select"><option>Semua</option><option>Kendaraan</option><option>Bangunan</option><option>Alat</option><option>IT</option></select></div>
          <div className="field"><label>Pencarian</label><div className="input-w-icon">{I.search(14)}<input className="input" placeholder="Kode atau nama aktiva…"/></div></div>
          <div className="filter-actions"><button className="btn">Pilih Kolom</button></div>
        </div>
      </div>

      <div className="table-card">
        <div className="table-toolbar"><div className="table-toolbar-left"><b>Jumlah: {AKTIVA.length}</b></div></div>
        <div className="table-scroll">
          <table className="data">
            <thead>
              <tr>
                <th>Kode Produk</th>
                <th>Nama Produk</th>
                <th className="center" style={{width:60}}>Aktif</th>
                <th>Tgl. Jual</th>
                <th>Tgl. Beli</th>
                <th>No. Bukti</th>
                <th>No. Kelompok</th>
                <th>Compro Nama</th>
                <th>Kode Kategori</th>
                <th className="num">Harga Perolehan</th>
                <th className="num">Akm. Penyusutan</th>
                <th className="num">Nilai Buku</th>
                <th style={{width:100}}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {AKTIVA.map(a => (
                <tr key={a.kode} onClick={()=>onEdit(a)}>
                  <td className="mono cell-link">{a.kode}</td>
                  <td>{a.nama}</td>
                  <td className="center">{a.aktif ? <span>{I.check(14)}</span> : <span className="muted">—</span>}</td>
                  <td className="mono">{a.tglJual || <span className="muted">—</span>}</td>
                  <td className="mono">{a.tglBeli}</td>
                  <td className="mono cell-link">{a.noBukti}</td>
                  <td className="mono">{a.noKelompok}</td>
                  <td>{a.compro}</td>
                  <td className="mono">{a.kategori}</td>
                  <td className="num mono">{fmtRp(a.harga)}</td>
                  <td className="num mono" style={{color:'var(--text-3)'}}>{fmtRp(a.susut)}</td>
                  <td className="num mono" style={{fontWeight:600}}>{fmtRp(a.nilai)}</td>
                  <td onClick={e=>e.stopPropagation()}>
                    <div className="row-actions">
                      <button className="btn btn-icon btn-sm" onClick={()=>onEdit(a)}>{I.edit()}</button>
                      <button className="btn btn-icon btn-sm">{I.print()}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pager">
          <div>Jumlah: <b style={{color:'var(--text)'}}>{AKTIVA.length}</b></div>
          <div className="pager-pages"><button className="active">1</button></div>
          <div>Tampilkan <b style={{color:'var(--text)'}}>25</b> per halaman</div>
        </div>
      </div>
    </>
  );
}

function JurnalMemorial({ onAdd, onEdit }) {
  return (
    <>
      <AkHeader title="Jurnal Memorial" sub={`${JURNAL_MEMO.length} jurnal · ${JURNAL_MEMO.filter(j=>j.status==='Posted').length} posted`} onAdd={onAdd} addLabel="Jurnal Baru" />
      <div className="filter-bar">
        <div className="filter-grid">
          <div className="field"><label>Pencarian</label><div className="input-w-icon">{I.search(14)}<input className="input" placeholder="No. atau deskripsi…"/></div></div>
          <div className="field"><label>Periode</label><input className="input" type="month" defaultValue="2026-04"/></div>
          <div className="field"><label>Status</label><select className="select"><option>Semua</option><option>Draft</option><option>Pending</option><option>Posted</option></select></div>
          <div className="filter-actions"><button className="btn">Reset</button><button className="btn btn-primary">{I.filter()} Cari</button></div>
        </div>
      </div>

      <div className="table-card">
        <div className="table-toolbar"><div className="table-toolbar-left"><b>{JURNAL_MEMO.length}</b> jurnal · Total {fmtRp(JURNAL_MEMO.reduce((s,j)=>s+j.total,0))}</div></div>
        <div className="table-scroll">
          <table className="data">
            <thead>
              <tr>
                <th style={{width:38}}><input type="checkbox" className="cb"/></th>
                <th>Tanggal</th>
                <th>No. Jurnal</th>
                <th>Deskripsi</th>
                <th>Pembuat</th>
                <th className="num">Total Rp</th>
                <th>Status</th>
                <th style={{width:100}}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {JURNAL_MEMO.map(j => (
                <tr key={j.no} onClick={()=>onEdit(j)}>
                  <td onClick={e=>e.stopPropagation()}><input type="checkbox" className="cb"/></td>
                  <td className="mono">{j.tgl}</td>
                  <td><span className="cell-link mono">{j.no}</span></td>
                  <td>{j.desc}</td>
                  <td className="muted">{j.pembuat}</td>
                  <td className="num mono">{fmtRp(j.total)}</td>
                  <td><span className={`pill ${j.status==='Posted'?'realisasi':j.status==='Pending'?'pending':'draft'}`}>{j.status}</span></td>
                  <td onClick={e=>e.stopPropagation()}>
                    <div className="row-actions">
                      <button className="btn btn-icon btn-sm" onClick={()=>onEdit(j)}>{I.edit()}</button>
                      <button className="btn btn-icon btn-sm">{I.print()}</button>
                      <button className="btn btn-icon btn-sm del">{I.trash()}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// ─── Modals ─────────────────────────────────────────────────────────────────

function AkModalShell({ title, sub, onClose, onSave, children, saveLabel='Simpan', wide=false }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()} style={wide?{maxWidth:1100}:{maxWidth:680}}>
        <div className="modal-head">
          <div><h2>{title}</h2>{sub && <div className="sub">{sub}</div>}</div>
          <button className="btn btn-icon" onClick={onClose}>{I.x(16)}</button>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-foot">
          <div className="muted" style={{fontSize:12.5}}><kbd>Esc</kbd> untuk batal</div>
          <div className="right" style={{display:'flex', gap:8}}>
            <button className="btn" onClick={onClose}>Batal</button>
            <button className="btn btn-primary" onClick={onSave}>{I.check()} {saveLabel}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AkunBBModal({ data, onClose, onSave }) {
  const isEdit = !!data;
  const [form, setForm] = React.useState(data || { name:'', kode:'', tipe:'', grup:'', subgrup:'', ket:'', aktif:true });
  const set = (k,v) => setForm(f => ({...f, [k]:v}));
  return (
    <AkModalShell title={isEdit?`Edit Akun — ${data.kode}`:'Tambah Akun Buku Besar'}
      sub={isEdit?data.name:'Buat akun baru di chart of accounts'}
      onClose={onClose} onSave={onSave}
      saveLabel={isEdit?'Simpan Perubahan':'Simpan Akun'}>
      <div className="form-section">
        <div className="form-row">
          <div className="field"><label>Nama Akun *</label><input className="input" value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Contoh: KAS BESAR"/></div>
          <div className="field"><label>Kode Akun *</label><input className="input mono" value={form.kode} onChange={e=>set('kode',e.target.value)} placeholder="0000.000"/></div>
        </div>
        <div className="form-row-3">
          <div className="field"><label>Tipe</label>
            <select className="select" value={form.tipe} onChange={e=>set('tipe',e.target.value)}>
              <option value="">— Pilih —</option>
              <option>K</option><option>KAS</option><option>BANK</option><option>D</option><option>B</option>
            </select>
          </div>
          <div className="field"><label>Grup</label><input className="input mono" value={form.grup} onChange={e=>set('grup',e.target.value)} placeholder="00"/></div>
          <div className="field"><label>Sub Grup</label><input className="input mono" value={form.subgrup} onChange={e=>set('subgrup',e.target.value)} placeholder="0000"/></div>
        </div>
        <div className="field"><label>Keterangan</label><textarea className="textarea" value={form.ket} onChange={e=>set('ket',e.target.value)}/></div>
        <div className="field">
          <label>Status</label>
          <label style={{display:'inline-flex', alignItems:'center', gap:8, fontSize:13, marginTop:6}}>
            <input type="checkbox" className="cb" checked={form.aktif} onChange={e=>set('aktif',e.target.checked)}/> Akun Aktif
          </label>
        </div>
      </div>
    </AkModalShell>
  );
}

function AktivaModal({ data, onClose, onSave }) {
  const isEdit = !!data;
  const [form, setForm] = React.useState(data || { kode:'', nama:'', aktif:true, tglBeli:'', noBukti:'', noKelompok:'', compro:'PT Pacific Data', kategori:'', harga:0, masaManfaat:60 });
  const set = (k,v) => setForm(f => ({...f, [k]:v}));
  return (
    <AkModalShell wide title={isEdit?`Edit Aktiva — ${data.kode}`:'Tambah Aktiva Tetap'}
      sub={isEdit?data.nama:'Daftarkan aktiva tetap baru beserta jadwal penyusutan'}
      onClose={onClose} onSave={onSave}
      saveLabel={isEdit?'Simpan Perubahan':'Simpan Aktiva'}>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:24}}>
        <div className="form-section">
          <h4>Identitas Aktiva</h4>
          <div className="form-row">
            <div className="field"><label>Kode Produk *</label><input className="input mono" value={form.kode} onChange={e=>set('kode',e.target.value)} placeholder="AT-XXX"/></div>
            <div className="field"><label>Kode Kategori</label>
              <select className="select" value={form.kategori} onChange={e=>set('kategori',e.target.value)}>
                <option value="">— Pilih —</option>
                <option>KEND</option><option>BANG</option><option>ALAT</option><option>IT</option><option>FURN</option>
              </select>
            </div>
          </div>
          <div className="field"><label>Nama Produk *</label><input className="input" value={form.nama} onChange={e=>set('nama',e.target.value)}/></div>
          <div className="form-row">
            <div className="field"><label>No. Kelompok</label><input className="input mono" value={form.noKelompok} onChange={e=>set('noKelompok',e.target.value)}/></div>
            <div className="field"><label>Compro Nama</label><input className="input" value={form.compro} onChange={e=>set('compro',e.target.value)}/></div>
          </div>
          <div className="field"><label>Status</label>
            <label style={{display:'inline-flex', alignItems:'center', gap:8, fontSize:13, marginTop:6}}>
              <input type="checkbox" className="cb" checked={form.aktif} onChange={e=>set('aktif',e.target.checked)}/> Aktiva Aktif
            </label>
          </div>
        </div>

        <div className="form-section">
          <h4>Pembelian & Penyusutan</h4>
          <div className="form-row">
            <div className="field"><label>Tgl. Beli *</label><input className="input" type="date" value={form.tglBeli} onChange={e=>set('tglBeli',e.target.value)}/></div>
            <div className="field"><label>No. Bukti</label><input className="input mono" value={form.noBukti} onChange={e=>set('noBukti',e.target.value)}/></div>
          </div>
          <div className="field"><label>Harga Perolehan (Rp) *</label><input className="input mono" type="number" value={form.harga} onChange={e=>set('harga',+e.target.value)}/></div>
          <div className="form-row">
            <div className="field"><label>Masa Manfaat (Bulan)</label><input className="input mono" type="number" value={form.masaManfaat} onChange={e=>set('masaManfaat',+e.target.value)}/></div>
            <div className="field"><label>Metode Penyusutan</label><select className="select"><option>Garis Lurus</option><option>Saldo Menurun</option></select></div>
          </div>
          <div className="form-row">
            <div className="field"><label>Akun Aktiva</label><select className="select"><option>1500.000 — AKTIVA TETAP</option></select></div>
            <div className="field"><label>Akun Akumulasi</label><select className="select"><option>1500.099 — AKM PENYUSUTAN</option></select></div>
          </div>
          <div className="field"><label>Tgl. Jual (jika dilepas)</label><input className="input" type="date" value={form.tglJual||''} onChange={e=>set('tglJual',e.target.value)}/></div>
        </div>
      </div>
    </AkModalShell>
  );
}

function JurnalModal({ data, onClose, onSave }) {
  const isEdit = !!data;
  const [lines, setLines] = React.useState([
    { id:1, akun:'', desc:'', d:0, k:0 },
    { id:2, akun:'', desc:'', d:0, k:0 },
  ]);
  const addLine = () => setLines(ls => [...ls, { id:Date.now(), akun:'', desc:'', d:0, k:0 }]);
  const updLine = (id, p) => setLines(ls => ls.map(l => l.id===id ? {...l, ...p} : l));
  const remLine = id => setLines(ls => ls.filter(l => l.id !== id));
  const totalD = lines.reduce((s,l)=>s+(+l.d||0), 0);
  const totalK = lines.reduce((s,l)=>s+(+l.k||0), 0);
  const balanced = totalD === totalK && totalD > 0;

  return (
    <AkModalShell wide title={isEdit?`Edit Jurnal — ${data.no}`:'Jurnal Memorial'}
      sub={isEdit?data.desc:'Buat jurnal manual untuk adjusment atau koreksi'}
      onClose={onClose} onSave={onSave}
      saveLabel={isEdit?'Simpan Perubahan':'Simpan & Posting'}>
      <div className="form-section">
        <h4>Header Jurnal</h4>
        <div className="form-row-3">
          <div className="field"><label>Tanggal *</label><input className="input" type="date" defaultValue={isEdit?'2026-04-30':'2026-04-30'}/></div>
          <div className="field"><label>No. Jurnal</label><input className="input mono" defaultValue={isEdit?data.no:'JM-2026-0043'} readOnly/></div>
          <div className="field"><label>Status</label><span className={`pill ${isEdit && data.status==='Posted'?'realisasi':'draft'}`} style={{alignSelf:'center'}}>{isEdit?data.status:'Draft'}</span></div>
        </div>
        <div className="field"><label>Deskripsi *</label><textarea className="textarea" defaultValue={isEdit?data.desc:''} placeholder="Penjelasan jurnal — mis. 'Penyusutan aktiva tetap April 2026'"/></div>

        <h4 style={{marginTop:14}}>Detail Jurnal
          <span style={{float:'right', fontWeight:400, fontSize:11.5, textTransform:'none', letterSpacing:0,
            color: balanced ? 'var(--realisasi)' : (totalD || totalK) ? 'var(--danger)' : 'var(--text-3)'}}>
            {balanced ? '✓ Balance' : (totalD || totalK) ? '⚠ Tidak Balance' : `${lines.length} baris`}
          </span>
        </h4>
        <div className="line-items">
          <table>
            <thead>
              <tr>
                <th style={{width:'34%'}}>Akun</th>
                <th>Deskripsi</th>
                <th className="num" style={{width:140}}>Debit Rp</th>
                <th className="num" style={{width:140}}>Kredit Rp</th>
                <th style={{width:38}}></th>
              </tr>
            </thead>
            <tbody>
              {lines.map(l => (
                <tr key={l.id}>
                  <td>
                    <select className="cell" value={l.akun} onChange={e=>updLine(l.id, {akun:e.target.value})}
                      style={{height:28, padding:'0 6px', border:'1px solid transparent', background:'transparent', borderRadius:4, width:'100%', fontSize:13}}>
                      <option value="">— Pilih akun —</option>
                      {AKUN_BB.map(a => <option key={a.kode} value={a.kode}>{a.kode} — {a.name}</option>)}
                    </select>
                  </td>
                  <td><input className="cell" placeholder="Deskripsi…" value={l.desc} onChange={e=>updLine(l.id, {desc:e.target.value})} style={{padding:'0 8px'}}/></td>
                  <td><input className="cell num" type="number" value={l.d} onChange={e=>updLine(l.id, {d:+e.target.value, k:0})}/></td>
                  <td><input className="cell num" type="number" value={l.k} onChange={e=>updLine(l.id, {k:+e.target.value, d:0})}/></td>
                  <td><button className="btn btn-icon btn-sm del" onClick={()=>remLine(l.id)} style={{color:'var(--text-3)'}}>{I.trash()}</button></td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2} style={{padding:'10px 8px', textAlign:'right', fontWeight:600, fontSize:12, textTransform:'uppercase', letterSpacing:'.04em', color:'var(--text-2)'}}>Total</td>
                <td className="num mono" style={{padding:'10px 8px', fontWeight:600, color:'var(--text)'}}>{fmtRp(totalD)}</td>
                <td className="num mono" style={{padding:'10px 8px', fontWeight:600, color:'var(--text)'}}>{fmtRp(totalK)}</td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2} style={{padding:'4px 8px', textAlign:'right', fontSize:11.5, color:'var(--text-3)'}}>Selisih</td>
                <td colSpan={2} className="num mono" style={{padding:'4px 8px', fontSize:12, fontWeight:500, color: balanced?'var(--realisasi)':'var(--danger)'}}>
                  {balanced?'Rp 0 — Balance':fmtRp(Math.abs(totalD-totalK))}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
          <div className="add-row">
            <button className="btn btn-ghost btn-sm" onClick={addLine}>{I.plus()} Tambah Baris</button>
          </div>
        </div>
      </div>
    </AkModalShell>
  );
}

function AkuntanPage({ activeSub, onSubChange, onNavigate }) {
  const [modal, setModal] = React.useState(null);
  const close = () => setModal(null);
  const onSave = () => { setModal(null); window.__erpToast && window.__erpToast('Data berhasil disimpan.'); };
  if (!activeSub) return <AkuntanDashboard onOpenSub={onSubChange} onNavigate={onNavigate} />;
  return (
    <div className="page" data-screen-label={`05 Akuntan — ${activeSub}`}>
      <div className="crumbs">
        <a onClick={() => onNavigate?.('home')} style={{cursor:'pointer'}}>Home</a><span className="sep">/</span>
        <a onClick={()=>onSubChange(null)} style={{cursor:'pointer'}}>Akuntan</a><span className="sep">/</span>
        <span className="current">{AK_SUBS.find(s=>s.id===activeSub)?.label}</span>
      </div>
      {activeSub==='akun'   && <KatalogAkunBB  onAdd={()=>setModal({kind:'akun'})}   onEdit={(d)=>setModal({kind:'akun', data:d})}/>}
      {activeSub==='aktiva' && <KatalogAktiva  onAdd={()=>setModal({kind:'aktiva'})} onEdit={(d)=>setModal({kind:'aktiva', data:d})}/>}
      {activeSub==='jurnal' && <JurnalMemorial onAdd={()=>setModal({kind:'jurnal'})} onEdit={(d)=>setModal({kind:'jurnal', data:d})}/>}
      {modal?.kind==='akun'   && <AkunBBModal  data={modal.data} onClose={close} onSave={onSave}/>}
      {modal?.kind==='aktiva' && <AktivaModal  data={modal.data} onClose={close} onSave={onSave}/>}
      {modal?.kind==='jurnal' && <JurnalModal  data={modal.data} onClose={close} onSave={onSave}/>}
    </div>
  );
}

window.AkuntanPage = AkuntanPage;
