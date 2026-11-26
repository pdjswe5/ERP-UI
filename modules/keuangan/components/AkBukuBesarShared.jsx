// Keuangan — mesin cetak & ledger bersama utk 3 laporan baru: Laporan Bank, Buku Besar (Detil),
// Buku Besar (Rekap Total). Dibangun dari data Kas/Bank/Giro/Transfer/Pelunasan/Jurnal Memorial yg
// SUDAH ADA di modul ini (bukan dataset dummy baru) — supaya tetap sinkron kalau user tambah/ubah
// transaksi di menu Kas Masuk/Keluar dkk. Struktur (kop 3-kolom, tabel dipaginasi ke beberapa
// "kertas" A4 landscape, grup per akun + subtotal) SENGAJA meniru pola LapCetakPage/LapReportShell
// (modules/laporan/components/LapShared.jsx) tapi disalin lokal ke sini — konvensi sesi ini tiap
// modul punya salinan komponen cetak sendiri drpd saling bergantung ke modul lain.

// Gaya angka cetakan referensi (uploads/laporan/Laporan Bank.pdf dkk): koma-ribuan + 2 desimal TANPA
// prefix "Rp" (mis. "20,215,500.00") — beda dari fmtRp bawaan app, sama seperti modul Laporan.
function akBbFmtNum(n) {
  return (n || 0).toLocaleString('en-US', { minimumFractionDigits:2, maximumFractionDigits:2 });
}
function akBbOrgInfo() {
  return (typeof PG_ORGANISASI !== 'undefined' && PG_ORGANISASI) || { nama:'PT. Pacific Data Jaya' };
}
function akBbFmtTglNow() {
  const d = new Date();
  return `${String(d.getDate()).padStart(2,'0')}-${String(d.getMonth()+1).padStart(2,'0')}-${d.getFullYear()} / ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}`;
}

// Kas/Bank/Giro/Transfer/Pelunasan simpan nama akun (mis. "KAS BESAR"), bukan kode — beda dari
// Jurnal Memorial yg langsung pakai kode AKUN_BB. Lookup nama->kode lewat KAS_BANK_GIRO (kbgRows).
function akBbKodeByNama(nama, kbgRows) {
  const a = (kbgRows || []).find(k => k.nama === nama);
  return a ? a.kode : null;
}
// Saldo `kbgRows[].saldo` diperlakukan sbg saldo SEBELUM seluruh transaksi dummy Kas/Bank/Transfer/
// Pelunasan (yg semuanya bertanggal dalam periode default laporan) — jadi jadi titik awal ledger yg
// valid selama filter Tgl awal laporan tidak diset sebelum awal data (lihat komentar default period
// di tiap halaman). Akun di luar Kas/Bank/Giro (mis. akun Biaya/Pendapatan di AKUN_BB) tidak py
// saldo tersimpan → default 0, konsisten dgn referensi yg jg banyak menampilkan saldo awal 0.00.
function akBbSaldoAwalBase(kodeAkun, kbgRows) {
  const a = (kbgRows || []).find(k => k.kode === kodeAkun);
  return a ? (a.saldo || 0) : 0;
}

// Ratakan SEMUA sumber transaksi jadi 1 daftar event { kodeAkun, tglIso, tgl, noBukti, uraian,
// transaksi, debet, kredit }. Setiap transaksi diposting DUA SISI (double entry) supaya Grand Total
// Debet = Kredit di Buku Besar Rekap: Kas/Bank Masuk ↔ Piutang Usaha, Kas/Bank Keluar ↔ Hutang Usaha
// (pembayaran pemasok) atau Biaya Operasional, Pelunasan ↔ Piutang/Hutang Usaha, Giro Masuk (Piutang
// Giro ↔ Piutang Usaha) dan Giro Keluar (Hutang Usaha ↔ Hutang Giro). Transfer & Jurnal sudah dua sisi.
const AK_BB_KONTRA = { piutang:'1015.000', hutang:'2000.000', biaya:'6000.000', piutangGiro:'1020.000', hutangGiro:'2010.000' };
function akBbAllEvents({ kbgRows, kasMasukRows, kasKeluarRows, bankMasukRows, bankKeluarRows, transferMasukRows, transferKeluarRows, pelunasanPiutangRows, pelunasanHutangRows, jurnalRows, giroMasukRows, giroKeluarRows }) {
  const kode = (nama) => akBbKodeByNama(nama, kbgRows);
  // Hanya transaksi yang sudah Posted (atau giro Cair) yang masuk buku besar — Draft/Pending/Batal diabaikan.
  const ok = (r) => !r.Batal && !r.batal && (!r.status || ['Posted', 'Cair', 'Final'].includes(r.status));
  const only = (rows) => (rows || []).filter(ok);
  kasMasukRows = only(kasMasukRows); kasKeluarRows = only(kasKeluarRows); bankMasukRows = only(bankMasukRows); bankKeluarRows = only(bankKeluarRows);
  transferMasukRows = only(transferMasukRows); transferKeluarRows = only(transferKeluarRows);
  pelunasanPiutangRows = only(pelunasanPiutangRows); pelunasanHutangRows = only(pelunasanHutangRows); jurnalRows = only(jurnalRows);
  const ev = [];
  const push = (kodeAkun, tgl, noBukti, uraian, transaksi, debet, kredit) => {
    if (!kodeAkun) return;
    ev.push({ kodeAkun, tgl, tglIso: akToIso(tgl), noBukti, uraian, transaksi, debet: debet||0, kredit: kredit||0 });
  };
  const K = AK_BB_KONTRA;
  const kontraKeluar = (untuk) => /pemasok/i.test(untuk || '') ? K.hutang : K.biaya;
  [...(kasMasukRows||[]), ...(bankMasukRows||[])].forEach(r => {
    push(kode(r.akun), r.tgl, r.no, `${r.deskripsi} (${r.dari})`, 'KasBank', r.nominal, 0);
    push(K.piutang, r.tgl, r.no, `${r.deskripsi} (${r.dari})`, 'KasBank', 0, r.nominal);
  });
  [...(kasKeluarRows||[]), ...(bankKeluarRows||[])].forEach(r => {
    push(kode(r.akun), r.tgl, r.no, `${r.deskripsi} (${r.untuk})`, 'KasBank', 0, r.nominal);
    push(kontraKeluar(r.untuk), r.tgl, r.no, `${r.deskripsi} (${r.untuk})`, 'KasBank', r.nominal, 0);
  });
  (transferMasukRows||[]).forEach(r => {
    push(kode(r.ke), r.tgl, r.no, `${r.deskripsi} (dari ${r.dari})`, 'KasBank', r.nominal, 0);
    push(kode(r.dari), r.tgl, r.no, `${r.deskripsi} (ke ${r.ke})`, 'KasBank', 0, r.nominal);
  });
  (transferKeluarRows||[]).forEach(r => {
    push(kode(r.ke), r.tgl, r.no, `${r.deskripsi} (dari ${r.dari})`, 'KasBank', r.nominal, 0);
    push(kode(r.dari), r.tgl, r.no, `${r.deskripsi} (ke ${r.ke})`, 'KasBank', 0, r.nominal);
  });
  (pelunasanPiutangRows||[]).forEach(r => (r.penerimaan||[]).forEach(p => {
    push(p.kodeAkun, r.tgl, r.no, `Pelunasan Piutang ${r.namaCust}`, 'KasBank', p.masuk, p.keluar);
    push(K.piutang, r.tgl, r.no, `Pelunasan Piutang ${r.namaCust}`, 'KasBank', p.keluar, p.masuk);
  }));
  (pelunasanHutangRows||[]).forEach(r => (r.penerimaan||[]).forEach(p => {
    push(p.kodeAkun, r.tgl, r.no, `Pelunasan Hutang ${r.namaSupp}`, 'KasBank', p.keluar, p.masuk);
    push(K.hutang, r.tgl, r.no, `Pelunasan Hutang ${r.namaSupp}`, 'KasBank', p.masuk, p.keluar);
  }));
  // Giro: Outstanding/Cair diposting, Tolak/Batal diabaikan.
  const giroOk = (r) => !r.Batal && !r.batal && !['Tolak', 'Batal'].includes(r.status);
  (giroMasukRows||[]).filter(giroOk).forEach(r => {
    push(K.piutangGiro, r.tgl, r.no, `Giro ${r.noGiro} (${r.dari})`, 'Giro', r.nominal, 0);
    push(K.piutang, r.tgl, r.no, `Giro ${r.noGiro} (${r.dari})`, 'Giro', 0, r.nominal);
  });
  (giroKeluarRows||[]).filter(giroOk).forEach(r => {
    push(K.hutang, r.tgl, r.no, `Giro ${r.noGiro} (${r.untuk})`, 'Giro', r.nominal, 0);
    push(K.hutangGiro, r.tgl, r.no, `Giro ${r.noGiro} (${r.untuk})`, 'Giro', 0, r.nominal);
  });
  (jurnalRows||[]).forEach(r => (r.lines||[]).forEach(l =>
    push(l.akun, r.tgl, r.no, l.desc, 'Jurnal', l.d, l.k)));
  return ev.sort((a,b) => a.tglIso.localeCompare(b.tglIso));
}

// Ledger 1 akun: saldo awal (base + event sebelum periode) + baris berjalan (saldo per baris) +
// saldo akhir — pola sama persis lapBuildArApLedger/lapStokRunningBalance (modul Laporan).
function akBbLedger(kodeAkun, tglAwalIso, tglAkhirIso, allEvents, saldoAwalBase) {
  const events = allEvents.filter(e => e.kodeAkun === kodeAkun);
  let saldo = saldoAwalBase || 0;
  events.filter(e => e.tglIso < tglAwalIso).forEach(e => { saldo += e.debet - e.kredit; });
  const saldoAwal = saldo;
  const lines = events.filter(e => e.tglIso >= tglAwalIso && e.tglIso <= tglAkhirIso).map(e => {
    saldo += e.debet - e.kredit;
    return { ...e, saldo };
  });
  const totalDebet = lines.reduce((s,l)=>s+l.debet,0);
  const totalKredit = lines.reduce((s,l)=>s+l.kredit,0);
  return { saldoAwal, lines, saldoAkhir: saldo, totalDebet, totalKredit };
}

// Berapa "unit" baris (row/header grup/subtotal) muat dalam 1 halaman A4 landscape sebelum lanjut ke
// halaman berikutnya — perkiraan sederhana, sama pola PB_REGISTER_ROWS_PER_PAGE (PbCetakModal.jsx)
// & LAP_ROWS_PER_PAGE (LapShared.jsx).
const AK_BB_ROWS_PER_PAGE = 24;

function akBbBuildLines({ rows, footerRow, groupBy }) {
  const lines = [];
  if (groupBy) {
    groupBy.forEach(g => {
      if (g.label) lines.push({ type:'group', label: g.label });
      g.rows.forEach(r => lines.push({ type:'row', data:r }));
      if (g.footerRow) lines.push({ type:'foot', data: g.footerRow });
    });
    if (footerRow) lines.push({ type:'foot', data: footerRow });
  } else {
    (rows || []).forEach(r => lines.push({ type:'row', data:r }));
    if (footerRow) lines.push({ type:'foot', data: footerRow });
  }
  return lines;
}
function akBbChunkLines(lines, size) {
  const out = [];
  let currentGroup = null;
  for (let i = 0; i < lines.length; i += size) {
    const slice = lines.slice(i, i + size);
    const page = (slice[0] && slice[0].type !== 'group' && currentGroup)
      ? [{ type:'group', label: currentGroup.label, continuation:true }, ...slice]
      : slice;
    slice.forEach(ln => { if (ln.type === 'group') currentGroup = ln; });
    out.push(page);
  }
  return out.length ? out : [[]];
}

// Header 2-baris (mis. "MUTASI" menaungi Debet+Kredit di Buku Besar Detil, "SALDO AWAL"/"MUTASI"/
// "SALDO AKHIR" masing² menaungi Debet+Kredit di Rekap Total) — kolom yg py `group` sama & berurutan
// digabung jadi 1 <th colSpan> di baris judul ke-1; kolom tanpa `group` (mis. Tanggal/Uraian) dapat
// rowSpan=2 supaya tetap 1 baris utuh menaungi kedua baris header. Kalau tidak ada satupun kolom yg
// py `group`, cukup 1 baris header biasa (perilaku lama, dipakai Laporan Bank).
function akBbHeaderGroupRow(columns) {
  const out = [];
  let i = 0;
  while (i < columns.length) {
    const c = columns[i];
    if (!c.group) { out.push({ key: c.key, label: c.label, align: c.align, rowSpan: 2, width: c.width }); i++; continue; }
    let span = 1;
    while (i + span < columns.length && columns[i + span].group === c.group) span++;
    out.push({ key: c.key + '-grp', label: c.group, colSpan: span });
    i += span;
  }
  return out;
}

// Render generik dipakai ketiga laporan baru — sama kontrak dgn LapCetakPage (columns/rows/footerRow/
// groupBy), otomatis dipaginasi ke beberapa "kertas" A4 SEBENARNYA (landscape 1123x794 lewat
// .cetak-page-landscape ATAU potrait 794x1123 lewat .cetak-page-a4-portrait, keduanya di styles.css).
// Varian landscape jg dapat kelas `cetak-bb-roomy` (styles.css) — laporan Keuangan cuma py 7 kolom,
// jauh lebih sedikit drpd laporan terlebar modul Laporan (16 kolom) yg butuh font 9px, jadi dinaikkan
// balik ke ukuran yg nyaman dibaca tanpa mengubah laporan modul Laporan lainnya.
// `landscape` (default true) dipakai Buku Besar Detil/Rekap Total (kolomnya banyak, perlu lebar) —
// Laporan Bank pakai potrait (cuma 5 kolom sempit: Tanggal/No.Bukti/Debet/Kredit/Saldo, persis
// dokumen referensi "Laporan KAS BANK"). Kolom bisa opsional py `group` (lihat akBbHeaderGroupRow)
// utk header 2-baris ala MUTASI/SALDO AWAL/dst.
function AkBbCetakPage({ docTitle, metaRight, infoLines, columns, rows, footerRow, groupBy, emptyMsg, landscape = true }) {
  const org = akBbOrgInfo();
  const renderRow = (r, key, bold) => (
    <tr key={key} style={bold ? {fontWeight:700} : null}>
      {columns.map(c => (
        <td key={c.key} className={c.align === 'right' ? 'num' : ''} style={{textAlign: c.align || 'left'}}>
          {r[c.key] ?? ''}
        </td>
      ))}
    </tr>
  );
  const lines = akBbBuildLines({ rows, footerRow, groupBy });
  const pages = akBbChunkLines(lines, AK_BB_ROWS_PER_PAGE);
  const totalPages = pages.length;
  const isEmpty = lines.length === 0;
  const hasGroups = columns.some(c => c.group);
  const groupRow = hasGroups ? akBbHeaderGroupRow(columns) : null;

  return (
    <>
      {pages.map((pageLines, pi) => (
        <div className={`cetak-page${landscape ? ' cetak-page-landscape cetak-bb-roomy' : ' cetak-page-a4-portrait'}`} key={pi}>
          <div className="cetak-doc">
            <div className="cetak-kop">
              <div className="cetak-kop-left"><b>{org.nama}</b></div>
              <div className="cetak-kop-center">{docTitle}</div>
              <div className="cetak-kop-right">{metaRight}<br/>Hal. {pi + 1} dari {totalPages}</div>
            </div>
            {infoLines && infoLines.length > 0 && (
              <div style={{display:'flex', justifyContent:'space-between', fontSize:12.5, marginBottom:10}}>
                {infoLines.map((line, i) => <div key={i}>{line}</div>)}
              </div>
            )}
            <table className="cetak-table">
              <thead>
                {hasGroups && (
                  <tr>{groupRow.map(h => <th key={h.key} colSpan={h.colSpan} rowSpan={h.rowSpan} style={{textAlign: h.align === 'right' ? 'right' : 'center', width:h.width}}>{h.label}</th>)}</tr>
                )}
                <tr>
                  {columns.filter(c => !hasGroups || c.group).map(c => (
                    <th key={c.key} style={{textAlign: c.align === 'right' ? 'right' : 'center', width: c.width}}>{c.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {isEmpty && pi === 0 && (
                  <tr><td colSpan={columns.length} className="empty">{emptyMsg || 'Tidak ada data.'}</td></tr>
                )}
                {pageLines.map((ln, li) => {
                  if (ln.type === 'group') return (
                    <tr className="cetak-register-group" key={li}>
                      <td colSpan={columns.length}>{ln.label}{ln.continuation && <span className="cetak-lanjutan"> (lanjutan)</span>}</td>
                    </tr>
                  );
                  return renderRow(ln.data, li, ln.type === 'foot');
                })}
              </tbody>
            </table>
            {pi === totalPages - 1 && <div className="cetak-timestamp">Dicetak pada {akBbFmtTglNow()} oleh PDJ Administrator</div>}
          </div>
        </div>
      ))}
    </>
  );
}

// Shell tertanam di halaman (bukan modal) — filter kiri + preview kanan, pola sama LapReportShell.
// Zoom pakai CSS var --lap-zoom (styles.css, rule `.cetak-canvas-scroll .cetak-page-landscape`) —
// var generik dipakai bareng modul Laporan, bukan API privat modul itu (CSS custom property, bukan
// komponen JS), jadi aman dipakai ulang persis drpd duplikasi rule CSS yang identik.
function AkBbReportShell({ filterPanel, previewChildren, onCetak, disabled, footNote }) {
  const [fillRef, fillH] = useFillHeight();
  const [zoom, setZoom] = React.useState(100);
  return (
    <div ref={fillRef} className="table-card" style={{display:'flex', height: fillH ? fillH : 'calc(100vh - 220px)', overflow:'hidden'}}>
      <div className="cetak-filter panel" style={{borderRight:'1px solid var(--border)', padding:16, borderRadius:0}}>{filterPanel}</div>
      <div className="cetak-preview-pane" style={{borderRadius:0}}>
        <div className="cetak-toolbar">
          <span className="cetak-pageof">{footNote || 'Pratinjau'}</span>
          <ErpPaperSelect />
          <div style={{display:'flex', gap:8, alignItems:'center'}}>
            <div style={{display:'flex', gap:4, alignItems:'center'}}>
              <button className="btn btn-icon btn-sm" onClick={()=>setZoom(z=>Math.max(40,z-10))}>−</button>
              <span className="cetak-pageof">{zoom}%</span>
              <button className="btn btn-icon btn-sm" onClick={()=>setZoom(z=>Math.min(120,z+10))}>+</button>
            </div>
            <button className="btn btn-primary btn-sm" onClick={onCetak} disabled={disabled}>{I.print()} Cetak</button>
          </div>
        </div>
        <div className="cetak-canvas cetak-canvas-scroll" style={{'--lap-zoom': zoom/100}}>
          {previewChildren}
        </div>
      </div>
    </div>
  );
}

// Field rentang tanggal (dari-sd) ditumpuk vertikal — panel filter cuma 320px, 2 input sejajar
// horizontal kepotong (bug yg sama pernah diperbaiki di modul Laporan).
function AkBbDateRangeField({ label='Tanggal', awal, akhir, onAwal, onAkhir, note }) {
  return (
    <div className="field">
      <label>{label}</label>
      <input className="input" type="date" value={awal} onChange={e=>onAwal(e.target.value)} />
      <div className="muted" style={{fontSize:11, margin:'3px 0'}}>sd</div>
      <input className="input" type="date" value={akhir} onChange={e=>onAkhir(e.target.value)} />
      {note && <div className="muted" style={{fontSize:11, marginTop:2}}>{note}</div>}
    </div>
  );
}
