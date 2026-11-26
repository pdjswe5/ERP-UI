// Akuntan — data Neraca (posisi keuangan per tanggal, bukan periode — tglAwal & tglAkhir dibuat
// sama-sama tanggal neraca itu sendiri supaya row shape tetap seragam dengan Laba Rugi/Arus Kas,
// lihat LaporanKeuanganPage). Total Aset selalu balance dengan Kewajiban + Ekuitas (selisih=0).
// Ekuitas = Modal 2,5 M + Laba Ditahan 900 jt + akumulasi Laba Bersih LABA_RUGI s/d bulan itu.
const NERACA = [
  { no:'NR-2026-0001', tglAwal:'31-01-2026', tglAkhir:'31-01-2026', keterangan:'Neraca per 31 Januari 2026', status:'Final',
    totalAset:4727000000, totalKewajiban:1200000000, totalEkuitas:3527000000, selisih:0 },
  { no:'NR-2026-0002', tglAwal:'28-02-2026', tglAkhir:'28-02-2026', keterangan:'Neraca per 28 Februari 2026', status:'Final',
    totalAset:4839000000, totalKewajiban:1180000000, totalEkuitas:3659000000, selisih:0 },
  { no:'NR-2026-0003', tglAwal:'31-03-2026', tglAkhir:'31-03-2026', keterangan:'Neraca per 31 Maret 2026', status:'Final',
    totalAset:4990000000, totalKewajiban:1210000000, totalEkuitas:3780000000, selisih:0 },
  { no:'NR-2026-0004', tglAwal:'30-04-2026', tglAkhir:'30-04-2026', keterangan:'Neraca per 30 April 2026', status:'Final',
    totalAset:5109000000, totalKewajiban:1190000000, totalEkuitas:3919000000, selisih:0 },
  { no:'NR-2026-0005', tglAwal:'31-05-2026', tglAkhir:'31-05-2026', keterangan:'Neraca per 31 Mei 2026', status:'Final',
    totalAset:5271000000, totalKewajiban:1220000000, totalEkuitas:4051000000, selisih:0 },
  { no:'NR-2026-0006', tglAwal:'30-06-2026', tglAkhir:'30-06-2026', keterangan:'Neraca per 30 Juni 2026 (belum final)', status:'Draft',
    totalAset:5424000000, totalKewajiban:1230000000, totalEkuitas:4194000000, selisih:0 },
];
