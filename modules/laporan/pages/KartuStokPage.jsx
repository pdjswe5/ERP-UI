// Laporan — Kartu Stok: ledger per item (satu kartu per item). Header kartu = kode, nama, satuan,
// gudang, harga rata-rata; baris = Saldo Awal + mutasi periode (Masuk/Keluar/Saldo) + nilai saldo (Rp).
// Opname diperlakukan sebagai checkpoint (saldo di-reset ke hasil hitung fisik). Sumber data: dataset
// dummy LAP_STOK_ITEMS/LAP_STOK_TRX (data/stok.data.jsx).

const LAP_KARTU_STOK_COLS = [
  { key:'tanggal', label:'Tanggal', width:80 }, { key:'nomor', label:'No. Bukti', width:120 }, { key:'keterangan', label:'Keterangan' },
  { key:'transaksi', label:'Jenis', width:100 }, { key:'masuk', label:'Masuk', align:'right', width:70 },
  { key:'keluar', label:'Keluar', align:'right', width:70 }, { key:'saldo', label:'Saldo', align:'right', width:70 },
  { key:'nilai', label:'Nilai Saldo (Rp)', align:'right', width:130 },
];

function lapKartuStokGroups(items, tglAwalIso, tglAkhirIso) {
  return items.map(item => {
    const harga = lapStokHarga(item);
    const lokasi = LAP_STOK_LOKASI.find(l => l.kode === item.lokasi);
    const ledger = lapStokRunningBalance(lapBuildStokEvents(item.kode, item.lokasi), tglAwalIso, tglAkhirIso);
    let prev = ledger.saldoAwal;
    const rows = [
      { tanggal: lapFmtTgl(tglAwalIso), nomor:'', keterangan:'Saldo Awal', transaksi:'', masuk:'', keluar:'', saldo: lapFmtQty(ledger.saldoAwal), nilai: lapFmtNum(ledger.saldoAwal * harga) },
      ...ledger.lines.map(l => {
        // Opname: selisih hitung fisik vs saldo buku ditampilkan sebagai masuk/keluar.
        const masuk = l.tipe === 'OPNAME' ? Math.max(0, l.saldo - prev) : l.debet;
        const keluar = l.tipe === 'OPNAME' ? Math.max(0, prev - l.saldo) : l.kredit;
        prev = l.saldo;
        return {
          tanggal: lapFmtTgl(l.tglIso), nomor: l.noBukti || '-', keterangan: l.keterangan, transaksi: LAP_STOK_JENIS_LABEL[l.tipe] || l.tipe,
          masuk: masuk ? lapFmtQty(masuk) : '', keluar: keluar ? lapFmtQty(keluar) : '', saldo: lapFmtQty(l.saldo), nilai: lapFmtNum(l.saldo * harga),
          _m: masuk, _k: keluar,
        };
      }),
    ];
    const totalMasuk = rows.reduce((s, r) => s + (r._m || 0), 0);
    const totalKeluar = rows.reduce((s, r) => s + (r._k || 0), 0);
    return {
      label: `${item.kode} — ${item.nama}  |  Satuan: ${item.satuan}  |  Gudang: ${item.lokasi} - ${lokasi ? lokasi.nama : ''}  |  Harga rata-rata: Rp ${lapFmtNum(harga)}`,
      rows,
      footerRow: { tanggal:'', nomor:'', keterangan:'Total / Saldo Akhir', transaksi:'', masuk: lapFmtQty(totalMasuk), keluar: lapFmtQty(totalKeluar), saldo: lapFmtQty(ledger.saldoAkhir), nilai: lapFmtNum(ledger.saldoAkhir * harga) },
      hasActivity: ledger.lines.length > 0 || ledger.saldoAwal !== 0,
    };
  }).filter(g => g.hasActivity);
}

function LaporanKartuStokPage() {
  const [kodeLokasi, setKodeLokasi] = React.useState('GJ');
  const [kodeItem, setKodeItem] = React.useState('');
  const [tglAwal, setTglAwal] = React.useState('2026-01-01');
  const [tglAkhir, setTglAkhir] = React.useState('2026-07-30');

  const itemOpts = React.useMemo(() => LAP_STOK_ITEMS.filter(it => !kodeLokasi || it.lokasi === kodeLokasi), [kodeLokasi]);
  const items = React.useMemo(() => itemOpts.filter(it => !kodeItem || it.kode === kodeItem), [itemOpts, kodeItem]);
  const groups = React.useMemo(() => lapKartuStokGroups(items, tglAwal, tglAkhir), [items, tglAwal, tglAkhir]);

  const lokasiNama = LAP_STOK_LOKASI.find(l => l.kode === kodeLokasi)?.nama || 'Semua Lokasi';
  const doCetak = () => { erpPrint(); };

  return (
    <>
      <div className="page-head">
        <div><h1>Kartu Stok</h1><div className="sub">Kartu per item — saldo awal, mutasi masuk/keluar, saldo berjalan & nilai persediaan.</div></div>
      </div>
      <LapReportShell
        onCetak={doCetak}
        footNote={`${groups.length} kartu`}
        filterPanel={
          <>
            <h3>Kartu Stok</h3>
            <div className="field"><label>Lokasi</label>
              <select className="select" value={kodeLokasi} onChange={e=>{ setKodeLokasi(e.target.value); setKodeItem(''); }}>
                <option value="">Semua Lokasi</option>
                {LAP_STOK_LOKASI.map(l => <option key={l.kode} value={l.kode}>{l.kode} - {l.nama}</option>)}
              </select>
            </div>
            <div className="field"><label>Item</label>
              <select className="select" value={kodeItem} onChange={e=>setKodeItem(e.target.value)}>
                <option value="">Semua Item</option>
                {itemOpts.map(it => <option key={it.kode} value={it.kode}>{it.nama}</option>)}
              </select>
            </div>
            <LapDateRangeField awal={tglAwal} akhir={tglAkhir} onAwal={setTglAwal} onAkhir={setTglAkhir} />
          </>
        }
        previewChildren={
          <LapCetakPage
            docTitle="KARTU STOK"
            metaRight={<>Periode: {lapFmtTgl(tglAwal)} s/d {lapFmtTgl(tglAkhir)}<br/>Lokasi: {kodeLokasi || 'Semua'}</>}
            columns={LAP_KARTU_STOK_COLS} rows={[]} groupBy={groups} roomy
            emptyMsg={`Tidak ada pergerakan stok di ${lokasiNama} pada periode ini.`}
          />
        }
      />
    </>
  );
}
