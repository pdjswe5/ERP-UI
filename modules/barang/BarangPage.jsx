// Barang — router top-level modul: dashboard atau halaman sub-modul sesuai activeSub.
// Dipindah dari root barang.jsx, tidak diubah.

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
