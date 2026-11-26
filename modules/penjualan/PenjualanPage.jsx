// Penjualan — router top-level modul: mengangkat 6 array dokumen jadi state, merender
// dashboard atau halaman sub-modul sesuai activeSub.

function PenjualanPage({ activeSub, onSubChange, onNavigate }) {
  // Root-cause fix: setiap data pelanggan/transaksi diangkat jadi state nyata di sini,
  // bukan const global — supaya Tambah/Edit/Simpan benar-benar tersimpan dan terlihat di list.
  const [pelanggan, setPelanggan] = React.useState(PJ_PELANGGAN);
  // Dropdown dokumen membaca katalog pelanggan yang sedang diedit (pjPelanggan); dilepas saat keluar modul.
  window.PJ_PELANGGAN_LIVE = pelanggan;
  React.useEffect(() => () => { window.PJ_PELANGGAN_LIVE = null; }, []);
  const [konfirmasi, setKonfirmasi] = React.useState(PJ_KONFIRMASI);
  const [salesOrders, setSalesOrders] = React.useState(SALES_ORDER_SEED);
  const [invoices, setInvoices] = React.useState(INVOICE_SEED);
  const [salesReturns, setSalesReturns] = React.useState(SALES_RETURN_SEED);
  const [deliveryOrders, setDeliveryOrders] = React.useState(DELIVERY_ORDER_SEED);

  // ── Alur referensi antar dokumen (state sudah satu di halaman ini, jadi cukup diturunkan) ──
  const notBatal = (r) => !(r.Batal || String(r.Status || r.status || '').toUpperCase() === 'BATAL');
  // KO yang boleh dijadikan SO: tidak batal/selesai, sudah disetujui, dan belum dipakai SO aktif lain.
  const koTersedia = konfirmasi.filter(k => notBatal(k) && !/SELESAI/i.test(k.status || '') && k.progressApproval === 'DISETUJUI'
    && !salesOrders.some(so => notBatal(so) && so.No_Ko === k.noBukti));
  // SO yang bisa ditagih: tidak batal, sudah ada barang terkirim, dan belum punya Invoice aktif.
  const soUntukInvoice = salesOrders.filter(so => notBatal(so) && (so.Details || []).some(d => (+d.Realisasi || 0) > 0)
    && !invoices.some(inv => notBatal(inv) && inv.No_Bukti_From === so.No_Bukti));
  // Untuk retur: Realisasi dikurangi qty yang sudah diretur sebelumnya, supaya tidak bisa retur dobel.
  const soUntukRetur = salesOrders.map(so => ({
    ...so,
    Details: (so.Details || []).map((d, idx) => {
      const sudah = salesReturns.filter(notBatal).flatMap(rt => rt.Details || [])
        .filter(x => x.No_So === so.No_Bukti && +x.No_So_Id_Det === idx + 1).reduce((s, x) => s + (+x.Jumlah || 0), 0);
      return sudah ? { ...d, Realisasi: Math.max(0, (+d.Realisasi || 0) - sudah) } : d;
    }),
  }));
  // DO disimpan/dibatalkan → Realisasi baris SO sumbernya ikut naik/turun.
  const applyRealisasi = (details, sign) => setSalesOrders(prev => prev.map(so => {
    const mine = (details || []).filter(d => d.No_So === so.No_Bukti);
    if (!mine.length) return so;
    return { ...so, Details: (so.Details || []).map((r, idx) => {
      const q = mine.filter(d => +d.No_So_Id_Det === idx + 1).reduce((s, d) => s + (+d.Jumlah || 0), 0);
      return q ? { ...r, Realisasi: Math.min(+r.Jumlah || 0, Math.max(0, (+r.Realisasi || 0) + sign * q)) } : r;
    }) };
  }));

  if (!activeSub) return (
    <PenjualanDashboard
      onOpenSub={onSubChange} onNavigate={onNavigate}
      pelanggan={pelanggan} konfirmasi={konfirmasi} salesOrders={salesOrders}
      invoices={invoices} salesReturns={salesReturns} deliveryOrders={deliveryOrders}
    />
  );

  return (
    <div className="page" data-screen-label={`04 Penjualan — ${activeSub}`}>
      <div className="crumbs">
        <a onClick={() => onNavigate?.('home')} style={{cursor:'pointer'}}>Home</a><span className="sep">/</span>
        <a onClick={()=>onSubChange(null)} style={{cursor:'pointer'}}>Penjualan</a><span className="sep">/</span>
        <span className="current">{PJ_SUBS.find(s=>s.id===activeSub)?.label}</span>
      </div>
      {activeSub === 'katalog'    && <KatalogPelangganPage rows={pelanggan} setRows={setPelanggan} />}
      {activeSub === 'konfirmasi' && <KonfirmasiPage rows={konfirmasi} setRows={setKonfirmasi} />}
      {activeSub === 'salesorder' && <SalesOrderPage rows={salesOrders} setRows={setSalesOrders} konfirmasiList={koTersedia} />}
      {activeSub === 'delivery'   && <DeliveryOrderPage rows={deliveryOrders} setRows={setDeliveryOrders} salesOrderList={salesOrders} onRealisasi={applyRealisasi} />}
      {activeSub === 'invoice'    && <InvoicePage rows={invoices} setRows={setInvoices} salesOrderList={soUntukInvoice} />}
      {activeSub === 'retur'      && <SalesReturnPage rows={salesReturns} setRows={setSalesReturns} salesOrderList={soUntukRetur} invoiceList={invoices.filter(notBatal)} />}
    </div>
  );
}

window.PenjualanPage = PenjualanPage;
