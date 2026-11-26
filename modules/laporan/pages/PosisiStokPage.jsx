// Laporan — Posisi Stok: snapshot per item pada 1 tanggal, dikelompokkan per Tebal (persis dokumen
// referensi "POSISI STOCK BRG.JADI Per Tgl. ... Lokasi : GJ" — tabel dipecah per grup Tebal, tiap
// grup py subtotal), kolom Stock Real vs Available (Available = Stock Real - qty yg dialokasikan ke
// SO belum terkirim, lapStokReserved). Sumber data dummy LAP_STOK_ITEMS (data/stok.data.jsx).

const LAP_POSISI_COLS = [
  { key:'kode', label:'Kode', width:150 }, { key:'nama', label:'Nama Barang' }, { key:'satuan', label:'Sat', align:'center', width:40 },
  { key:'stockReal', label:'Stok Real', align:'right', width:62 }, { key:'dipesan', label:'Dipesan', align:'right', width:58 },
  { key:'available', label:'Available', align:'right', width:62 }, { key:'min', label:'Min', align:'right', width:40 },
  { key:'status', label:'Status', align:'center', width:78 }, { key:'nilai', label:'Nilai (Rp)', align:'right', width:115 },
];

function lapPosisiStokGroups(asOfIso, kodeLokasi) {
  const rows = lapStokPosisiSemua(asOfIso, kodeLokasi, null).sort((a,b) => a.tebal - b.tebal || a.nama.localeCompare(b.nama))
    .map(r => ({ ...r, dipesan: r.stockReal - r.available, min: lapStokMin(r), nilai: r.stockReal * lapStokHarga(r) }));
  const sum = (arr, k) => arr.reduce((s, r) => s + r[k], 0);
  const byTebal = new Map();
  rows.forEach(r => { if (!byTebal.has(r.tebal)) byTebal.set(r.tebal, []); byTebal.get(r.tebal).push(r); });
  return Array.from(byTebal.entries()).sort((a,b) => a[0]-b[0]).map(([tebal, items]) => ({
    label: `Tebal ${tebal.toFixed(2)} mm`,
    rows: items.map(r => ({
      kode: r.kode, nama: r.nama, satuan: r.satuan, stockReal: lapFmtQty(r.stockReal), dipesan: lapFmtQty(r.dipesan),
      available: lapFmtQty(r.available), min: lapFmtQty(r.min),
      status: r.available < r.min ? 'Di bawah min.' : 'Aman', nilai: lapFmtNum(r.nilai),
    })),
    footerRow: { kode:'', nama:'Subtotal', satuan:'', stockReal: lapFmtQty(sum(items,'stockReal')), dipesan: lapFmtQty(sum(items,'dipesan')), available: lapFmtQty(sum(items,'available')), min:'', status:'', nilai: lapFmtNum(sum(items,'nilai')) },
    _totals: { stockReal: sum(items,'stockReal'), dipesan: sum(items,'dipesan'), available: sum(items,'available'), nilai: sum(items,'nilai'), kurang: items.filter(r => r.available < r.min).length },
  }));
}

function LaporanPosisiStokPage() {
  const [asOf, setAsOf] = React.useState('2026-07-30');
  const [kodeLokasi, setKodeLokasi] = React.useState('GJ');

  const groups = React.useMemo(() => lapPosisiStokGroups(asOf, kodeLokasi), [asOf, kodeLokasi]);
  const grand = groups.reduce((acc, g) => { Object.keys(acc).forEach(k => { acc[k] += g._totals[k]; }); return acc; }, { stockReal:0, dipesan:0, available:0, nilai:0, kurang:0 });
  const grandFooter = { kode:'', nama:'GRAND TOTAL', satuan:'', stockReal: lapFmtQty(grand.stockReal), dipesan: lapFmtQty(grand.dipesan), available: lapFmtQty(grand.available), min:'', status: grand.kurang ? `${grand.kurang} item kurang` : '', nilai: lapFmtNum(grand.nilai) };

  const lokasi = LAP_STOK_LOKASI.find(l => l.kode === kodeLokasi);
  const doCetak = () => { erpPrint(); };

  return (
    <>
      <div className="page-head">
        <div><h1>Posisi Stok</h1><div className="sub">Posisi stok per tanggal & gudang — stok real, dipesan (SO belum kirim), available, stok minimum & nilai persediaan.</div></div>
      </div>
      <LapReportShell
        onCetak={doCetak}
        footNote={`${groups.reduce((s,g)=>s+g.rows.length,0)} item`}
        filterPanel={
          <>
            <h3>Posisi Stok</h3>
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
            docTitle="POSISI STOK"
            metaRight={<>Per tanggal: {lapFmtTgl(asOf)}<br/>Lokasi: {kodeLokasi || 'Semua'}{lokasi ? ` - ${lokasi.nama}` : ''}</>}
            columns={LAP_POSISI_COLS} rows={[]} groupBy={groups} footerRow={groups.length > 0 ? grandFooter : null} roomy
            emptyMsg="Tidak ada item pada filter ini."
          />
        }
      />
    </>
  );
}
