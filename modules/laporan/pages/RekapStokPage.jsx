// Laporan — Rekap Stok: ringkasan mutasi per item dalam satu periode (Saldo Awal + Masuk − Keluar ±
// Opname = Saldo Akhir) plus nilai persediaan akhir. Dihitung dari dataset dummy LAP_STOK_TRX lewat
// mesin yang sama dengan Kartu Stok (lapStokRunningBalance), jadi Saldo Akhir di sini selalu sama
// dengan saldo akhir Kartu Stok untuk filter yang sama. Dikelompokkan per gudang.

const LAP_REKAP_STOK_COLS = [
  { key:'kode', label:'Kode', width:172 }, { key:'nama', label:'Nama Barang' }, { key:'satuan', label:'Sat', align:'center', width:40 },
  { key:'awal', label:'Saldo Awal', align:'right', width:60 },
  { key:'produk', label:'Masuk Produksi', align:'right', width:64 }, { key:'koreksi', label:'Koreksi (+)', align:'right', width:60 },
  { key:'jual', label:'Keluar Jual', align:'right', width:60 }, { key:'pakai', label:'Keluar Pakai', align:'right', width:60 },
  { key:'opname', label:'Selisih Opname', align:'right', width:60 }, { key:'akhir', label:'Saldo Akhir', align:'right', width:60 },
  { key:'nilai', label:'Nilai Akhir (Rp)', align:'right', width:128 },
];
const LAP_REKAP_KEYS = ['awal', 'produk', 'koreksi', 'jual', 'pakai', 'opname', 'akhir', 'nilai'];

function lapRekapStokRow(item, tglAwalIso, tglAkhirIso) {
  const led = lapStokRunningBalance(lapBuildStokEvents(item.kode, item.lokasi), tglAwalIso, tglAkhirIso);
  const r = { awal: led.saldoAwal, produk:0, koreksi:0, jual:0, pakai:0, opname:0, akhir: led.saldoAkhir };
  let prev = led.saldoAwal;
  led.lines.forEach(l => {
    if (l.tipe === 'OPNAME') r.opname += l.saldo - prev;
    else if (l.tipe === 'PRODUK') r.produk += l.debet;
    else if (l.tipe === 'KOREKSI') r.koreksi += l.debet - l.kredit;
    else if (l.tipe === 'JUAL') r.jual += l.kredit;
    else if (l.tipe === 'PAKAI') r.pakai += l.kredit;
    prev = l.saldo;
  });
  r.nilai = r.akhir * lapStokHarga(item);
  return r;
}

function lapRekapFmt(r, extra) {
  const out = { ...extra };
  LAP_REKAP_KEYS.forEach(k => { out[k] = k === 'nilai' ? lapFmtNum(r[k]) : lapFmtQty(r[k]); });
  return out;
}

function LaporanRekapStokPage() {
  const [kodeLokasi, setKodeLokasi] = React.useState('GJ');
  const [tglAwal, setTglAwal] = React.useState('2026-01-01');
  const [tglAkhir, setTglAkhir] = React.useState('2026-07-30');

  const { groups, grand, count } = React.useMemo(() => {
    const zero = () => Object.fromEntries(LAP_REKAP_KEYS.map(k => [k, 0]));
    const grand = zero();
    let count = 0;
    const groups = LAP_STOK_LOKASI.filter(l => !kodeLokasi || l.kode === kodeLokasi).map(lok => {
      const sub = zero();
      const rows = LAP_STOK_ITEMS.filter(it => it.lokasi === lok.kode).sort((a, b) => a.kode.localeCompare(b.kode)).map(it => {
        const r = lapRekapStokRow(it, tglAwal, tglAkhir);
        LAP_REKAP_KEYS.forEach(k => { sub[k] += r[k]; grand[k] += r[k]; });
        count++;
        return lapRekapFmt(r, { kode: it.kode, nama: it.nama, satuan: it.satuan });
      });
      return { label: `Gudang ${lok.kode} - ${lok.nama}`, rows, footerRow: lapRekapFmt(sub, { kode:'', nama:'Subtotal', satuan:'' }) };
    }).filter(g => g.rows.length);
    return { groups, grand, count };
  }, [kodeLokasi, tglAwal, tglAkhir]);

  const doCetak = () => { erpPrint(); };

  return (
    <>
      <div className="page-head">
        <div><h1>Rekap Stok</h1><div className="sub">Ringkasan mutasi per item: saldo awal, masuk, keluar, selisih opname, saldo akhir & nilai persediaan.</div></div>
      </div>
      <LapReportShell
        onCetak={doCetak}
        footNote={`${count} item`}
        filterPanel={
          <>
            <h3>Rekap Stok</h3>
            <LapDateRangeField awal={tglAwal} akhir={tglAkhir} onAwal={setTglAwal} onAkhir={setTglAkhir} />
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
            docTitle="REKAP STOK"
            metaRight={<>Periode: {lapFmtTgl(tglAwal)} s/d {lapFmtTgl(tglAkhir)}<br/>Lokasi: {kodeLokasi || 'Semua'}</>}
            columns={LAP_REKAP_STOK_COLS} rows={[]} groupBy={groups} roomy="md"
            footerRow={groups.length > 1 ? lapRekapFmt(grand, { kode:'', nama:'GRAND TOTAL', satuan:'' }) : null}
            emptyMsg="Tidak ada item pada filter ini."
          />
        }
      />
    </>
  );
}
