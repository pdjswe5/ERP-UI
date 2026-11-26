// Pembelian — dashboard modul (tile per sub-halaman)

function PembelianDashboard({ onOpenSub, data }) {
  // Baca state modul (dokumen yang baru dibuat ikut terhitung); tanpa prop → seed.
  const D = { PO: data?.po || PB_PO, BELI: data?.beli || PB_BELI, RETUR_BELI: data?.retur || PB_RETUR_BELI,
    PR: data?.pr || PB_PR, RFQ: data?.rfq || PB_RFQ, QUOTATION: data?.quotation || PB_QUOTATION, GR: data?.gr || PB_GR, SUPPLIER: data?.pemasok || PB_SUPPLIER };
  const poAktif = D.PO.filter(p => !p.Batal && p.Status !== 'SELESAI');
  const nilaiPoAktif = poAktif.reduce((s, p) => s + (p.Details||[]).reduce((t,d) => t + pbLineTotal(d), 0), 0);
  const poMenungguProses = D.PO.filter(p => !p.Batal && !p.Status).length;
  const nilaiNotaBeli = D.BELI.filter(b => !b.Batal).reduce((s, b) => s + (b.Details||[]).reduce((t,d) => t + pbLineTotal(d), 0), 0);
  const returAktif = D.RETUR_BELI.filter(r => !r.Batal).length;

  // Grafik tren tiap KPI (Spark kumulatif, hover lihat tanggal+nilai per titik) — pola sama Home,
  // gantikan chart ranking/status yang tadi dihapus.
  const poDetailVal = p => (p.Details||[]).reduce((t,d) => t + pbLineTotal(d), 0);
  const kpis = [
    { label:'Nilai PO Aktif', value: fmtRp(nilaiPoAktif), sub:`${poAktif.length} dari ${D.PO.length} PO`,
      trend: cumulativeTrend(poAktif, 'Tgl_Bukti', poDetailVal, { displayFn: fmtRp }), trendColor:'var(--primary)' },
    { label:'PO Menunggu Diproses', value: poMenungguProses, sub: poMenungguProses > 0 ? 'Perlu ditindaklanjuti' : 'Semua PO sudah diproses', color: poMenungguProses > 0 ? 'var(--warn)' : null,
      trend: cumulativeTrend(D.PO.filter(p=>!p.Batal && !p.Status), 'Tgl_Bukti', () => 1, { displayFn: v => `${v} PO` }), trendColor:'var(--warn)' },
    { label:'Nilai Nota Pembelian', value: fmtRp(nilaiNotaBeli), sub:`${D.BELI.filter(b=>!b.Batal).length} nota aktif`,
      trend: cumulativeTrend(D.BELI.filter(b=>!b.Batal), 'Tgl_Bukti', poDetailVal, { displayFn: fmtRp }), trendColor:'var(--realisasi)' },
    { label:'Retur Beli Aktif', value: returAktif, sub:`dari ${D.RETUR_BELI.length} total retur`,
      trend: cumulativeTrend(D.RETUR_BELI.filter(r=>!r.Batal), 'Tgl_Bukti', () => 1, { displayFn: v => `${v} retur` }), trendColor:'#7c3aed' },
  ];

  const sections = [
    {
      title:'Master & Permintaan',
      count:'3',
      tiles:[
        { id:'pemasok', title:'Katalog Pemasok', badge:`${pbSupplier().length} pemasok`, icon:I.users(20) },
        { id:'pr', title:'Purchase Request', badge:`${D.PR.length} PR`, icon:I.invoice(20) },
        { id:'rfq', title:'Request for Quotation', badge:`${D.RFQ.length} RFQ`, icon:I.invoice(20) },
      ]
    },
    {
      title:'Penawaran & Penerimaan',
      count:'2',
      tiles:[
        { id:'quotation', title:'Quotation', badge:`${D.QUOTATION.length} quotation`, icon:I.invoice(20) },
        { id:'gr', title:'Goods Receive', badge:`${D.GR.length} GR`, icon:I.truck(20) },
      ]
    },
    {
      title:'Order & Pembayaran',
      count:'3',
      tiles:[
        { id:'po', title:'Purchase Order', badge:`${D.PO.length} PO`, icon:I.cart(20) },
        { id:'beli', title:'Nota Pembelian', badge:`${D.BELI.length} nota`, icon:I.invoice(20) },
        { id:'retur', title:'Retur Beli', badge:`${D.RETUR_BELI.length} retur`, icon:I.list(20) },
      ]
    },
  ];
  return (
    <ModuleDashboard
      title="Dashboard Pembelian"
      subtitle="Alur pengadaan barang: Purchase Request → RFQ → Quotation → Goods Receive → Purchase Order → Nota Pembelian → Retur Beli."
      kpis={kpis}
      sections={sections}
      activityLog={ACTIVITY_LOG_PEMBELIAN}
      onOpenSub={onOpenSub}
      activityTitle="Log Aktivitas Terbaru"
      activitySub="Operasi sistem yang dideteksi secara real-time"
    />
  );
}
