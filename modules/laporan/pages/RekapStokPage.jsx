// Laporan — Rekap Stok: ringkasan posisi stok dikelompokkan per Lokasi x Tebal, dari data yg sama
// dipakai Posisi Stok (lapStokPosisiSemua, LapShared.jsx) — supaya kedua laporan itu konsisten.
// Kolom Stock Real / Available (bukan "Kategori", krn semua item dummy = Barang Jadi, cocok dgn
// dokumen referensi Kartu/Posisi Stock yg sama-sama "BRG.JADI").

const LAP_REKAP_STOK_COLS = [
  { key:'lokasiNama', label:'Lokasi' }, { key:'tebal', label:'Tebal' },
  { key:'jumlahItem', label:'Jumlah Jenis Item', align:'right' },
  { key:'totalStockReal', label:'Total Stock Real', align:'right' }, { key:'totalAvailable', label:'Total Available', align:'right' },
];

function lapRekapStokRows(asOf, kodeLokasiFilter) {
  const posisi = lapStokPosisiSemua(asOf, kodeLokasiFilter, null);
  const groups = new Map();
  posisi.forEach(p => {
    const key = `${p.lokasi}|${p.tebal}`;
    if (!groups.has(key)) groups.set(key, { lokasiNama:p.lokasiNama, tebal:p.tebal, jumlahItem:0, totalStockReal:0, totalAvailable:0 });
    const g = groups.get(key);
    g.jumlahItem += 1;
    g.totalStockReal += p.stockReal;
    g.totalAvailable += p.available;
  });
  return Array.from(groups.values()).sort((a,b) => a.lokasiNama.localeCompare(b.lokasiNama) || a.tebal - b.tebal);
}

function LaporanRekapStokPage() {
  const [asOf, setAsOf] = React.useState('2026-07-30');
  const [kodeLokasi, setKodeLokasi] = React.useState('');

  const raw = React.useMemo(() => lapRekapStokRows(asOf, kodeLokasi), [asOf, kodeLokasi]);
  const rows = raw.map(r => ({ lokasiNama:r.lokasiNama, tebal:r.tebal.toFixed(2), jumlahItem: lapFmtQty(r.jumlahItem), totalStockReal: lapFmtQty(r.totalStockReal), totalAvailable: lapFmtQty(r.totalAvailable) }));
  const footerRow = { lokasiNama:'', tebal:'TOTAL', jumlahItem: lapFmtQty(raw.reduce((s,r)=>s+r.jumlahItem,0)),
    totalStockReal: lapFmtQty(raw.reduce((s,r)=>s+r.totalStockReal,0)), totalAvailable: lapFmtQty(raw.reduce((s,r)=>s+r.totalAvailable,0)) };

  const doCetak = () => { window.__erpToast && window.__erpToast('Cetak dikirim ke printer.'); };

  return (
    <>
      <div className="page-head">
        <div><h1>Rekap Stok</h1><div className="sub">Ringkasan posisi stok per Lokasi x Tebal.</div></div>
      </div>
      <LapReportShell
        onCetak={doCetak}
        footNote={`${rows.length} baris`}
        filterPanel={
          <>
            <h3>Rekap Stok</h3>
            <div className="field"><label>Per Tanggal</label><input className="input" type="date" value={asOf} onChange={e=>setAsOf(e.target.value)} /></div>
            <div className="field"><label>Lokasi</label>
              <select className="select" value={kodeLokasi} onChange={e=>setKodeLokasi(e.target.value)}>
                <option value="">Semua Lokasi</option>
                {LAP_STOK_LOKASI.map(l => <option key={l.kode} value={l.kode}>{l.kode} - {l.nama}</option>)}
              </select>
            </div>
          </>
        }
        previewChildren={
          <LapCetakPage
            docTitle="REKAP STOCK BRG.JADI" metaRight={lapFmtTglNow()}
            infoLines={[`Per Tanggal : ${lapFmtTgl(asOf)}`]}
            columns={LAP_REKAP_STOK_COLS} rows={rows} footerRow={footerRow}
            emptyMsg="Tidak ada data pada filter ini."
          />
        }
      />
    </>
  );
}
