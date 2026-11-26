// Barang — router top-level modul: dashboard atau halaman sub-modul sesuai activeSub.
// Dipindah dari root barang.jsx, tidak diubah.

function BarangDashboard({ onOpenSub, data }) {
  // Baca state modul Barang (data baru ikut terhitung); tanpa prop → seed.
  const D = { BARANG_LAIN: data?.lain || BARANG_LAIN, BAHAN_BAKU: data?.baku || BAHAN_BAKU, BARANG_JADI: data?.jadi || BARANG_JADI,
    MUTASI_BARANG: data?.mutasi || MUTASI_BARANG, PENYESUAIAN_BARANG: data?.penyesuaian || PENYESUAIAN_BARANG, STOCK_OPNAME: data?.opname || STOCK_OPNAME, BOM: data?.bom || BRG_BOM_SEED };
  const lainAktif = D.BARANG_LAIN.filter(b => b.aktif).length;
  const bakuAktif = D.BAHAN_BAKU.filter(b => b.aktif).length;
  const jadiAktif = D.BARANG_JADI.filter(b => b.aktif).length;
  const totalAktif = lainAktif + bakuAktif + jadiAktif;
  const totalItem = D.BARANG_LAIN.length + D.BAHAN_BAKU.length + D.BARANG_JADI.length;

  const mutasiAktif = D.MUTASI_BARANG.filter(r => !r.batal).length;
  const penyesuaianAktif = D.PENYESUAIAN_BARANG.filter(r => !r.batal).length;
  const opnameAktif = D.STOCK_OPNAME.filter(r => !r.batal).length;

  // Grafik tren tiap KPI (Spark kumulatif, hover lihat tanggal+nilai per titik) — pola sama Home,
  // gantikan chart ranking/status yang tadi dihapus. Mutasi/Penyesuaian/Opname punya tglBukti
  // (tersebar sebulan penuh); "Total Item Aktif" (katalog master, tidak punya tanggal) pakai
  // proxy gabungan aktivitas gudang (mutasi+penyesuaian+opname per tanggal).
  const mutasiAktifRows = D.MUTASI_BARANG.filter(r => !r.batal);
  const penyesuaianAktifRows = D.PENYESUAIAN_BARANG.filter(r => !r.batal);
  const opnameAktifRows = D.STOCK_OPNAME.filter(r => !r.batal);
  const semuaAktivitasGudang = [...mutasiAktifRows, ...penyesuaianAktifRows, ...opnameAktifRows];

  const kpis = [
    { label:'Total Item Aktif', value: totalAktif, sub:`dari ${totalItem} total item master`,
      trend: cumulativeTrend(semuaAktivitasGudang, 'tglBukti', () => 1, { displayFn: v => `${v} aktivitas` }), trendColor:'var(--realisasi)' },
    { label:'Mutasi Barang Aktif', value: mutasiAktif, sub:`dari ${D.MUTASI_BARANG.length} total mutasi`,
      trend: cumulativeTrend(mutasiAktifRows, 'tglBukti', () => 1, { displayFn: v => `${v} mutasi` }), trendColor:'var(--primary)' },
    { label:'Penyesuaian Barang Aktif', value: penyesuaianAktif, sub:`dari ${D.PENYESUAIAN_BARANG.length} total penyesuaian`,
      trend: cumulativeTrend(penyesuaianAktifRows, 'tglBukti', () => 1, { displayFn: v => `${v} penyesuaian` }), trendColor:'var(--warn)' },
    { label:'Stock Opname Aktif', value: opnameAktif, sub:`dari ${D.STOCK_OPNAME.length} total opname`,
      trend: cumulativeTrend(opnameAktifRows, 'tglBukti', () => 1, { displayFn: v => `${v} opname` }), trendColor:'#7c3aed' },
  ];

  const sections = [
    {
      title:'Barang & Kelengkapan',
      count:'4',
      tiles:[
        { id:'baranglain', title:'Barang Lain',          badge:`${lainAktif} dari ${D.BARANG_LAIN.length} aktif`, icon:I.box(20) },
        { id:'bahankaku',  title:'Bahan Baku',           badge:`${bakuAktif} dari ${D.BAHAN_BAKU.length} aktif`, icon:I.box(20) },
        { id:'barangjadi', title:'Barang Jadi Umum & PU', badge:`${jadiAktif} dari ${D.BARANG_JADI.length} aktif`, icon:I.box(20) },
        { id:'bom',        title:'BOM / Resep Produksi', badge:`${D.BOM.length} resep`, icon:I.list(20) },
      ]
    },
    {
      title:'Stock & Persediaan',
      count:'3',
      tiles:[
        { id:'mutasi',      title:'Mutasi Barang & Konsinyasi', badge:`${mutasiAktif} mutasi aktif`, icon:I.truck(20) },
        { id:'penyesuaian', title:'Penyesuaian Barang',         badge:`${penyesuaianAktif} adj aktif`,    icon:I.list(20) },
        { id:'opname',      title:'Stock Opname',               badge:`${opnameAktif} opname aktif`, icon:I.list(20) },
      ]
    },
  ];
  return (
    <ModuleDashboard
      title="Dashboard Barang"
      subtitle="Halaman ini digunakan untuk mengelola data barang, tersedia 7 menu pendukung."
      kpis={kpis}
      sections={sections}
      activityLog={ACTIVITY_LOG_BARANG}
      onOpenSub={onOpenSub}
      activityTitle="Log Aktivitas Terbaru"
      activitySub="Operasi sistem yang dideteksi secara real-time"
    />
  );
}

// Barang dipakai BOM/SPK tidak boleh dihapus. Kembalikan nama dokumen pemakainya, atau ''.
function brgDipakai(kode, bomRows) {
  const bom = (bomRows || BRG_BOM_SEED).find(b => b.kodeBarangJadi === kode || (b.komponen || []).some(k => k.kodeKomponen === kode));
  if (bom) return `BOM ${bom.kodeBarangJadi}`;
  const spk = (typeof MF_SPK_SEED !== 'undefined' ? MF_SPK_SEED : []).find(s => (s.bjLines || []).some(b => b.kodeBarang === kode) || (s.bahanLines || []).some(b => b.kodeBahan === kode));
  return spk ? `SPK ${spk.no}` : '';
}

function BarangPage({ activeSub, onSubChange, onNavigate }) {
  // State 7 sub-menu diangkat ke sini supaya data tidak hilang saat pindah sub-tab Barang.
  const [lain, setLain] = React.useState(BARANG_LAIN);
  const [baku, setBaku] = React.useState(BAHAN_BAKU);
  const [jadi, setJadi] = React.useState(BARANG_JADI);
  const [bom, setBom] = React.useState(BRG_BOM_SEED);
  const [mutasi, setMutasi] = React.useState(MUTASI_BARANG);
  const [penyesuaian, setPenyesuaian] = React.useState(PENYESUAIAN_BARANG);
  const [opname, setOpname] = React.useState(STOCK_OPNAME);
  if (!activeSub) return <BarangDashboard onOpenSub={onSubChange} data={{ lain, baku, jadi, bom, mutasi, penyesuaian, opname }} />;
  const subLabel = MODULE_SUBS.barang.find(s => s.id === activeSub)?.label ?? activeSub;
  return (
    <div className="page" data-screen-label={`Barang — ${activeSub}`}>
      <div className="crumbs">
        <a onClick={() => onNavigate?.('home')} style={{cursor:'pointer'}}>Home</a><span className="sep">/</span>
        <a onClick={()=>onSubChange(null)} style={{cursor:'pointer'}}>Barang</a><span className="sep">/</span>
        <span className="current">{subLabel}</span>
      </div>
      {activeSub === 'baranglain'   && <BarangLainPage rows={lain} setRows={setLain} bomRows={bom} />}
      {activeSub === 'bahankaku'    && <BahanBakuPage rows={baku} setRows={setBaku} bomRows={bom} />}
      {activeSub === 'barangjadi'   && <BarangJadiPage rows={jadi} setRows={setJadi} bomRows={bom} />}
      {activeSub === 'bom'          && <BomPage rows={bom} setRows={setBom} />}
      {activeSub === 'mutasi'       && <MutasiBarangPage rows={mutasi} setRows={setMutasi} />}
      {activeSub === 'penyesuaian'  && <PenyesuaianBarangPage rows={penyesuaian} setRows={setPenyesuaian} />}
      {activeSub === 'opname'       && <StockOpnamePage rows={opname} setRows={setOpname} />}
    </div>
  );
}

window.BarangPage = BarangPage;
