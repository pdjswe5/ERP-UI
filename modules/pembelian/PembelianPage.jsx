// Pembelian — router top-level modul: mengangkat 8 array dokumen jadi state, merender
// dashboard atau halaman sub-modul sesuai activeSub.

function PembelianPage({ activeSub, onSubChange, onNavigate }) {
  const [pemasok, setPemasok] = React.useState(PB_SUPPLIER);
  // Dropdown dokumen membaca katalog pemasok yang sedang diedit (pbSupplier); dilepas saat keluar modul.
  window.PB_SUPPLIER_LIVE = pemasok;
  React.useEffect(() => () => { window.PB_SUPPLIER_LIVE = null; }, []);
  const [pr, setPr] = React.useState(PB_PR);
  const [rfq, setRfq] = React.useState(PB_RFQ);
  const [quotation, setQuotation] = React.useState(PB_QUOTATION);
  const [gr, setGr] = React.useState(PB_GR);
  const [po, setPo] = React.useState(PB_PO);
  const [beli, setBeli] = React.useState(PB_BELI);
  const [retur, setRetur] = React.useState(PB_RETUR_BELI);

  // Referensi antar dokumen: dokumen tujuan mengambil sisa barang dokumen sebelumnya, lalu
  // Qty_Realisasi baris sumber naik (simpan) / turun (batal).
  const realisasiOn = (setSrc) => (details, sign) => setSrc(prev => prev.map(doc => {
    const mine = (details || []).filter(d => d.No_Bukti_From === doc.No_Bukti);
    if (!mine.length) return doc;
    return { ...doc, Details: (doc.Details || []).map((r, idx) => {
      const q = mine.filter(d => +d.No_Id_From === idx + 1).reduce((s, d) => s + (+(d.Qty ?? d.Jumlah) || 0), 0);
      return q ? { ...r, Qty_Realisasi: Math.min(pbSrcQty(r), Math.max(0, (+r.Qty_Realisasi || 0) + sign * q)) } : r;
    }) };
  }));
  const src = (label, rows, setRows, jenis) => ({ label, rows, jenis, onRealisasi: realisasiOn(setRows) });

  if (!activeSub) return <PembelianDashboard onOpenSub={onSubChange} data={{ pemasok, pr, rfq, quotation, gr, po, beli, retur }} />;
  const subLabel = MODULE_SUBS.pembelian.find(s => s.id === activeSub)?.label ?? activeSub;
  return (
    <div className="page" data-screen-label={`Pembelian — ${activeSub}`}>
      <div className="crumbs">
        <a onClick={() => onNavigate?.('home')} style={{cursor:'pointer'}}>Home</a><span className="sep">/</span>
        <a onClick={()=>onSubChange(null)} style={{cursor:'pointer'}}>Pembelian</a><span className="sep">/</span>
        <span className="current">{subLabel}</span>
      </div>
      {activeSub === 'pemasok'   && <PemasokPage rows={pemasok} setRows={setPemasok} />}
      {activeSub === 'pr'        && <PrPage rows={pr} setRows={setPr} />}
      {activeSub === 'rfq'       && <RfqPage rows={rfq} setRows={setRfq} source={src('Purchase Request', pr, setPr, 'PB')} />}
      {activeSub === 'quotation' && <QuotationPage rows={quotation} setRows={setQuotation} source={src('RFQ', rfq, setRfq, 'PP')} />}
      {activeSub === 'gr'        && <GrPage rows={gr} setRows={setGr} source={src('Purchase Order', po, setPo, 'PO')} />}
      {activeSub === 'po'        && <PoPage rows={po} setRows={setPo} source={src('Quotation', quotation, setQuotation, 'PN')} />}
      {activeSub === 'beli'      && <BeliPage rows={beli} setRows={setBeli} source={src('Goods Receive', gr, setGr, 'GR')} />}
      {activeSub === 'retur'     && <ReturBeliPage rows={retur} setRows={setRetur} source={src('Nota Pembelian', beli, setBeli, 'BL')} />}
    </div>
  );
}

window.PembelianPage = PembelianPage;
