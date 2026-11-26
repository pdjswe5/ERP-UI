// Keuangan — cetakan HTML lengkap Laba Rugi / Arus Kas / Neraca (menggantikan iframe PDF referensi).
// Tidak ada format publik yang baku untuk ketiganya; struktur di sini mengikuti PSAK 1 (penyajian
// laporan keuangan) & PSAK 2 (arus kas, metode langsung), bentuk multi-step yang umum dipakai software
// akuntansi lokal. Data per akun dipecah DETERMINISTIK dari ringkasan per periode (LABA_RUGI/ARUS_KAS/
// NERACA) dengan proporsi tetap; baris terakhir tiap kelompok jadi "penyeimbang" supaya jumlah rincian
// selalu tepat sama dengan total ringkasan yang diinput user.
//
// Keterkaitan antar laporan (periode dengan tanggal akhir yang sama):
//   - Kas & Bank di Neraca      = Kas Akhir di Arus Kas
//   - Laba Periode Berjalan     = akumulasi Laba Bersih Laba Rugi Jan s/d bulan itu (tahun yang sama)
//   - Kas Awal Arus Kas         = Kas Akhir periode sebelumnya (awal tahun = AK_KAS_AWAL_TAHUN)

const AK_KAS_AWAL_TAHUN = 650000000;
const AK_MODAL_DISETOR = 2500000000;

// Pecah `total` sesuai bobot; elemen terakhir = sisa, jadi jumlahnya selalu tepat `total`.
function akSplit(total, weights) {
  const sumW = weights.reduce((s, w) => s + w, 0) || 1;
  const out = weights.slice(0, -1).map(w => Math.round(total * w / sumW));
  out.push(total - out.reduce((s, v) => s + v, 0));
  return out;
}
function akLkFmt(n) {
  if (n === '' || n == null) return '';
  const s = Math.abs(Math.round(n)).toLocaleString('id-ID');
  return n < 0 ? `(${s})` : s;
}
function akLkIso(dmy) { return akToIso(dmy) || ''; }

// ── Laba Rugi (multi-step) ────────────────────────────────────────────────────────────────────
function akLabaRugiLines(r) {
  const P = +r.totalPendapatan || 0, H = +r.totalBebanPokok || 0, O = +r.totalBebanOperasional || 0;
  const bruto = Math.round(P / 0.97);
  const [retur, potongan] = akSplit(bruto - P, [2, 1]);
  const [bb, tkl, bop] = akSplit(H, [62, 18, 20]);
  const labaKotor = P - H;
  const bebanUsaha = Math.round(O * 0.85);
  const [bJual, bAdm] = akSplit(bebanUsaha, [35, 65]);
  const [gSales, iklan, kirim, komisi] = akSplit(bJual, [40, 15, 30, 15]);
  const [gKantor, listrik, sewa, susut, atk, lainAdm] = akSplit(bAdm, [40, 12, 15, 18, 5, 10]);
  const labaUsaha = labaKotor - bebanUsaha;
  const pendLain = Math.round(O * 0.01);
  const bebanLain = Math.round(O * 0.04);
  const lsp = labaUsaha + pendLain - bebanLain;
  const pajak = O - bebanUsaha - bebanLain + pendLain; // penyeimbang: total beban ringkasan = usaha + lain-lain + pajak
  const lb = lsp - pajak;
  return [
    { h:'PENDAPATAN' },
    { k:'bruto', l:'Penjualan', v:bruto, i:1 },
    { k:'retur', l:'Retur Penjualan', v:-retur, i:1 },
    { k:'potongan', l:'Potongan Penjualan', v:-potongan, i:1 },
    { k:'P', l:'Penjualan Bersih', v:P, b:1, t:1 },
    { h:'HARGA POKOK PENJUALAN' },
    { k:'bb', l:'Pemakaian Bahan Baku', v:bb, i:1 },
    { k:'tkl', l:'Tenaga Kerja Langsung', v:tkl, i:1 },
    { k:'bop', l:'Biaya Overhead Pabrik', v:bop, i:1 },
    { k:'H', l:'Total Harga Pokok Penjualan', v:-H, b:1, t:1 },
    { k:'lk', l:'LABA KOTOR', v:labaKotor, b:1, t:1 },
    { h:'BEBAN USAHA' },
    { s:'Beban Penjualan' },
    { k:'gs', l:'Gaji & Tunjangan Bagian Penjualan', v:gSales, i:2 },
    { k:'ik', l:'Iklan & Promosi', v:iklan, i:2 },
    { k:'kr', l:'Pengiriman & Ekspedisi', v:kirim, i:2 },
    { k:'km', l:'Komisi Penjualan', v:komisi, i:2 },
    { k:'bj', l:'Jumlah Beban Penjualan', v:bJual, i:1, b:1, t:1 },
    { s:'Beban Administrasi & Umum' },
    { k:'gk', l:'Gaji & Tunjangan Kantor', v:gKantor, i:2 },
    { k:'li', l:'Listrik, Air & Telepon', v:listrik, i:2 },
    { k:'sw', l:'Sewa Gedung', v:sewa, i:2 },
    { k:'sp', l:'Penyusutan Aset Tetap', v:susut, i:2 },
    { k:'at', l:'Alat Tulis & Perlengkapan Kantor', v:atk, i:2 },
    { k:'la', l:'Beban Umum Lain-lain', v:lainAdm, i:2 },
    { k:'ba', l:'Jumlah Beban Administrasi & Umum', v:bAdm, i:1, b:1, t:1 },
    { k:'bu', l:'Total Beban Usaha', v:-bebanUsaha, b:1, t:1 },
    { k:'lu', l:'LABA USAHA', v:labaUsaha, b:1, t:1 },
    { h:'PENDAPATAN (BEBAN) LAIN-LAIN' },
    { k:'pl', l:'Pendapatan Bunga & Jasa Giro', v:pendLain, i:1 },
    { k:'bl', l:'Beban Bunga & Administrasi Bank', v:-bebanLain, i:1 },
    { k:'ll', l:'Jumlah Pendapatan (Beban) Lain-lain', v:pendLain - bebanLain, b:1, t:1 },
    { k:'lsp', l:'LABA SEBELUM PAJAK PENGHASILAN', v:lsp, b:1, t:1 },
    { k:'pj', l:'Beban Pajak Penghasilan', v:-pajak, i:1 },
    { k:'lb', l:'LABA (RUGI) BERSIH', v:lb, b:1, t:2 },
  ];
}

// ── Arus Kas (metode langsung) ────────────────────────────────────────────────────────────────
function akKasAwal(row, allRows) {
  const iso = akLkIso(row.tglAwal), year = iso.slice(0, 4);
  return AK_KAS_AWAL_TAHUN + allRows
    .filter(x => x.status !== 'Batal' && akLkIso(x.tglAkhir) < iso && akLkIso(x.tglAkhir).slice(0, 4) === year)
    .reduce((s, x) => s + (+x.kenaikanKasBersih || 0), 0);
}
function akArusKasLines(r, allRows) {
  const O = +r.arusOperasi || 0, I = +r.arusInvestasi || 0, F = +r.arusPendanaan || 0;
  const [terima, bayarSupp, gaji, bOps, pajak] = akSplit(O, [2.6, -1.1, -0.3, -0.15, -0.05]);
  const [beliAset, jualAset] = akSplit(I, [1.1, -0.1]);
  const [angsuran, prive] = akSplit(F, [0.7, 0.3]);
  const awal = akKasAwal(r, allRows || []);
  const naik = O + I + F;
  return [
    { h:'ARUS KAS DARI AKTIVITAS OPERASI' },
    { k:'o1', l:'Penerimaan kas dari pelanggan', v:terima, i:1 },
    { k:'o2', l:'Pembayaran kas kepada pemasok', v:bayarSupp, i:1 },
    { k:'o3', l:'Pembayaran gaji & upah karyawan', v:gaji, i:1 },
    { k:'o4', l:'Pembayaran beban operasional', v:bOps, i:1 },
    { k:'o5', l:'Pembayaran pajak', v:pajak, i:1 },
    { k:'O', l:'Kas Bersih dari Aktivitas Operasi', v:O, b:1, t:1 },
    { h:'ARUS KAS DARI AKTIVITAS INVESTASI' },
    { k:'i1', l:'Perolehan aset tetap', v:beliAset, i:1 },
    { k:'i2', l:'Hasil penjualan aset tetap', v:jualAset, i:1 },
    { k:'I', l:'Kas Bersih dari Aktivitas Investasi', v:I, b:1, t:1 },
    { h:'ARUS KAS DARI AKTIVITAS PENDANAAN' },
    { k:'f1', l:'Pembayaran angsuran pinjaman bank', v:angsuran, i:1 },
    { k:'f2', l:'Pembagian dividen / prive', v:prive, i:1 },
    { k:'F', l:'Kas Bersih dari Aktivitas Pendanaan', v:F, b:1, t:1 },
    { k:'nk', l:'KENAIKAN (PENURUNAN) BERSIH KAS', v:naik, b:1, t:1 },
    { k:'ka', l:'Kas & Setara Kas Awal Periode', v:awal, i:1 },
    { k:'kk', l:'KAS & SETARA KAS AKHIR PERIODE', v:awal + naik, b:1, t:2 },
  ];
}

// ── Neraca ────────────────────────────────────────────────────────────────────────────────────
function akNeracaRefs(r) {
  const iso = akLkIso(r.tglAkhir), year = iso.slice(0, 4);
  const ak = (typeof ARUS_KAS !== 'undefined' ? ARUS_KAS : []).find(x => akLkIso(x.tglAkhir) === iso);
  const kas = ak ? akKasAwal(ak, ARUS_KAS) + (+ak.kenaikanKasBersih || 0) : null;
  const labaBerjalan = (typeof LABA_RUGI !== 'undefined' ? LABA_RUGI : [])
    .filter(x => akLkIso(x.tglAkhir) <= iso && akLkIso(x.tglAkhir).slice(0, 4) === year)
    .reduce((s, x) => s + (+x.labaRugiBersih || 0), 0);
  return { kas, labaBerjalan };
}
function akNeracaSides(r) {
  const A = +r.totalAset || 0, L = +r.totalKewajiban || 0, E = +r.totalEkuitas || 0;
  const ref = akNeracaRefs(r);
  const kas = ref.kas != null ? Math.min(ref.kas, Math.round(A * 0.4)) : Math.round(A * 0.15);
  const [piutang, persediaan, um, ppn] = akSplit(Math.round(A * 0.5), [22, 25, 2, 1]);
  const lancar = kas + piutang + persediaan + um + ppn;
  const asetTetapNet = A - lancar;
  const hargaPerolehan = Math.round(asetTetapNet * 1.35);
  const akum = hargaPerolehan - asetTetapNet;
  const [hu, hp, bymh, hbPendek] = akSplit(Math.round(L * 0.6), [45, 8, 7, 0]);
  const pendek = hu + hp + bymh + hbPendek;
  const panjang = L - pendek;
  const modal = Math.min(AK_MODAL_DISETOR, E);
  const labaBerjalan = ref.labaBerjalan;
  const ditahan = E - modal - labaBerjalan;
  const aset = [
    { h:'ASET LANCAR' },
    { k:'kas', l:'Kas & Bank', v:kas, i:1 },
    { k:'pu', l:'Piutang Usaha', v:piutang, i:1 },
    { k:'ps', l:'Persediaan', v:persediaan, i:1 },
    { k:'um', l:'Uang Muka Pembelian', v:um, i:1 },
    { k:'ppn', l:'Pajak Dibayar Dimuka', v:ppn, i:1 },
    { k:'AL', l:'Jumlah Aset Lancar', v:lancar, b:1, t:1 },
    { h:'ASET TIDAK LANCAR' },
    { k:'hp', l:'Aset Tetap — Harga Perolehan', v:hargaPerolehan, i:1 },
    { k:'ap', l:'Akumulasi Penyusutan', v:-akum, i:1 },
    { k:'ATL', l:'Jumlah Aset Tidak Lancar', v:asetTetapNet, b:1, t:1 },
    { k:'A', l:'TOTAL ASET', v:A, b:1, t:2 },
  ];
  const pasiva = [
    { h:'LIABILITAS JANGKA PENDEK' },
    { k:'hu', l:'Hutang Usaha', v:hu, i:1 },
    { k:'hpj', l:'Hutang Pajak', v:hp, i:1 },
    { k:'by', l:'Beban Masih Harus Dibayar', v:bymh, i:1 },
    { k:'LP', l:'Jumlah Liabilitas Jangka Pendek', v:pendek, b:1, t:1 },
    { h:'LIABILITAS JANGKA PANJANG' },
    { k:'hb', l:'Hutang Bank Jangka Panjang', v:panjang, i:1 },
    { k:'L', l:'Jumlah Liabilitas', v:L, b:1, t:1 },
    { h:'EKUITAS' },
    { k:'md', l:'Modal Disetor', v:modal, i:1 },
    { k:'ld', l:'Laba Ditahan', v:ditahan, i:1 },
    { k:'lb', l:'Laba Periode Berjalan', v:labaBerjalan, i:1 },
    { k:'E', l:'Jumlah Ekuitas', v:E, b:1, t:1 },
    { k:'LE', l:'TOTAL LIABILITAS & EKUITAS', v:L + E, b:1, t:2 },
  ];
  return { aset, pasiva, selisih: A - L - E };
}

// ── Renderer ──────────────────────────────────────────────────────────────────────────────────
function akPrevRow(row, allRows) {
  const iso = akLkIso(row.tglAwal);
  return [...allRows].filter(x => x.no !== row.no && x.status !== 'Batal' && akLkIso(x.tglAkhir) < iso)
    .sort((a, b) => akLkIso(b.tglAkhir).localeCompare(akLkIso(a.tglAkhir)))[0] || null;
}
function akPeriodeLabel(r, point) {
  if (!r) return '—';
  return point ? r.tglAkhir : `${r.tglAwal} s/d ${r.tglAkhir}`;
}

function AkLkTable({ lines, prevLines, curLabel, prevLabel }) {
  const prevMap = {};
  (prevLines || []).forEach(x => { if (x.k) prevMap[x.k] = x.v; });
  const cell = (v, ln) => ({
    textAlign:'right', whiteSpace:'nowrap', fontVariantNumeric:'tabular-nums', padding:'2px 6px',
    fontWeight: ln.b ? 700 : 400,
    borderTop: ln.t === 1 ? '1px solid #111' : ln.t === 2 ? '1px solid #111' : 'none',
    borderBottom: ln.t === 2 ? '3px double #111' : 'none',
  });
  return (
    <table style={{width:'100%', borderCollapse:'collapse', fontSize:12}}>
      <thead>
        <tr style={{borderBottom:'1px solid #111'}}>
          <th style={{textAlign:'left', padding:'4px 6px'}}>Keterangan</th>
          <th style={{textAlign:'right', padding:'4px 6px', width:150}}>{curLabel}</th>
          <th style={{textAlign:'right', padding:'4px 6px', width:150}}>{prevLabel}</th>
        </tr>
      </thead>
      <tbody>
        {lines.map((ln, i) => {
          if (ln.h) return <tr key={i}><td colSpan={3} style={{fontWeight:700, padding:'8px 6px 2px'}}>{ln.h}</td></tr>;
          if (ln.s) return <tr key={i}><td colSpan={3} style={{fontWeight:600, fontStyle:'italic', padding:'4px 6px 2px 22px'}}>{ln.s}</td></tr>;
          return (
            <tr key={i}>
              <td style={{padding:`2px 6px 2px ${6 + (ln.i || 0) * 16}px`, fontWeight: ln.b ? 700 : 400}}>{ln.l}</td>
              <td style={cell(ln.v, ln)}>{akLkFmt(ln.v)}</td>
              <td style={cell(prevMap[ln.k], ln)}>{prevLines ? akLkFmt(prevMap[ln.k]) : '—'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function AkLkKop({ orgInfo, title, sub }) {
  return (
    <div style={{textAlign:'center', borderBottom:'3px double #111', paddingBottom:10, marginBottom:14}}>
      <div style={{fontSize:16, fontWeight:700}}>{orgInfo.nama}</div>
      <div style={{fontSize:11.5}}>{[orgInfo.alamat, orgInfo.kota].filter(Boolean).join(', ')}</div>
      <div style={{fontSize:15, fontWeight:700, marginTop:8, letterSpacing:'.06em'}}>{title}</div>
      <div style={{fontSize:12}}>{sub}</div>
      <div style={{fontSize:11, fontStyle:'italic'}}>(dalam Rupiah)</div>
    </div>
  );
}

function AkLkSign() {
  return (
    <div className="cetak-sign" style={{justifyContent:'flex-end', marginTop:28}}>
      {['Dibuat oleh', 'Diperiksa oleh', 'Disetujui oleh'].map(t => (
        <div className="cetak-sign-box" key={t}><div>{t},</div><div className="line" /><div>(..................)</div></div>
      ))}
    </div>
  );
}

// Satu halaman cetak per periode. `reportId` = labarugi | aruskas | neraca; `allRows` = semua periode
// laporan itu (untuk kolom pembanding & kas awal).
function AkLaporanKeuanganPage({ reportId, row, allRows, orgInfo }) {
  const prev = akPrevRow(row, allRows);
  const point = reportId === 'neraca';
  const curLabel = point ? row.tglAkhir : 'Periode Ini';
  const prevLabel = point ? (prev ? prev.tglAkhir : 'Sebelumnya') : 'Periode Lalu';
  const draft = row.status !== 'Final';
  const stamp = `Dicetak pada ${akFmtTglNow()} oleh PDJ Administrator`;

  if (reportId === 'neraca') {
    const cur = akNeracaSides(row), pv = prev ? akNeracaSides(prev) : null;
    return (
      <div className="cetak-page cetak-page-landscape" style={{height:'auto', minHeight:794}}>
        <div className="cetak-doc">
          {draft && <div className="cetak-watermark">DRAFT</div>}
          <AkLkKop orgInfo={orgInfo} title="LAPORAN POSISI KEUANGAN (NERACA)" sub={`Per ${row.tglAkhir}`} />
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:24}}>
            <AkLkTable lines={cur.aset} prevLines={pv && pv.aset} curLabel={curLabel} prevLabel={prevLabel} />
            <AkLkTable lines={cur.pasiva} prevLines={pv && pv.pasiva} curLabel={curLabel} prevLabel={prevLabel} />
          </div>
          <div style={{marginTop:10, fontSize:12, fontWeight:700, color: cur.selisih === 0 ? '#111' : '#b91c1c'}}>
            Cek keseimbangan (Total Aset − Total Liabilitas & Ekuitas): {akLkFmt(cur.selisih)} {cur.selisih === 0 ? '— BALANCE' : '— TIDAK BALANCE'}
          </div>
          <AkLkSign />
          <div className="cetak-timestamp">{row.no} · {row.keterangan} · {stamp}</div>
        </div>
      </div>
    );
  }

  const isLr = reportId === 'labarugi';
  const lines = isLr ? akLabaRugiLines(row) : akArusKasLines(row, allRows);
  const prevLines = prev ? (isLr ? akLabaRugiLines(prev) : akArusKasLines(prev, allRows)) : null;
  return (
    <div className="cetak-page cetak-page-a4-portrait">
      <div className="cetak-doc">
        {draft && <div className="cetak-watermark">DRAFT</div>}
        <AkLkKop orgInfo={orgInfo} title={isLr ? 'LAPORAN LABA RUGI' : 'LAPORAN ARUS KAS'} sub={`Periode ${akPeriodeLabel(row)}`} />
        <AkLkTable lines={lines} prevLines={prevLines} curLabel={curLabel} prevLabel={prevLabel} />
        {prev && <div style={{fontSize:10.5, marginTop:6, fontStyle:'italic'}}>Periode lalu: {akPeriodeLabel(prev)}</div>}
        {!isLr && <div style={{fontSize:10.5, marginTop:2, fontStyle:'italic'}}>Disusun dengan metode langsung (PSAK 2).</div>}
        <AkLkSign />
        <div className="cetak-timestamp">{row.no} · {row.keterangan} · {stamp}</div>
      </div>
    </div>
  );
}
