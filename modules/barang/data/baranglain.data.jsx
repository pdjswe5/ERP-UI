// Barang — seed data Barang Lain.
//
// Shape baru sesuai redesain form: hppStandar & satuan tunggal dihapus, digantikan
// satuanKonversi[] (tiap baris: kodeSatuan dari BRG_SATUAN_KONVERSI_OPTS, isi, hargaJual,
// aktif '1'/'0'). kodeKategori dibatasi ke LAIN/PENOLONG/SPARE/TOOLS, tipeData F/K saja,
// minimQty >= 1, keterangan wajib terisi.

const BARANG_LAIN = [
  { kodeProduk:'LN-001', namaProduk:'Jam Dinding Custom', kodeKategori:'LAIN', tipeData:'F', aktif:true, minimQty:10, keterangan:'Barang non-manufaktur',
    satuanKonversi:[
      { kodeSatuan:'51', isi:1, hargaJual:35000, aktif:'1' },
      { kodeSatuan:'55', isi:12, hargaJual:390000, aktif:'1' },
    ] },
  { kodeProduk:'LN-002', namaProduk:'Kalender Promosi', kodeKategori:'LAIN', tipeData:'F', aktif:true, minimQty:50, keterangan:'Cetak musiman akhir tahun',
    satuanKonversi:[
      { kodeSatuan:'51', isi:1, hargaJual:8000, aktif:'1' },
    ] },
  { kodeProduk:'LN-003', namaProduk:'Sarung Tangan Kerja', kodeKategori:'PENOLONG', tipeData:'F', aktif:true, minimQty:20, keterangan:'Alat pelindung diri operator produksi',
    satuanKonversi:[
      { kodeSatuan:'57', isi:1, hargaJual:12000, aktif:'1' },
    ] },
  { kodeProduk:'LN-004', namaProduk:'Stiker Logo Perusahaan', kodeKategori:'LAIN', tipeData:'F', aktif:false, minimQty:100, keterangan:'Discontinued',
    satuanKonversi:[
      { kodeSatuan:'53', isi:1, hargaJual:1500, aktif:'0' },
    ] },
  { kodeProduk:'LN-005', namaProduk:'Kemasan Dus Kecil', kodeKategori:'LAIN', tipeData:'F', aktif:true, minimQty:200, keterangan:'Kemasan produk jadi ukuran kecil',
    satuanKonversi:[
      { kodeSatuan:'51', isi:1, hargaJual:2500, aktif:'1' },
      { kodeSatuan:'56', isi:50, hargaJual:115000, aktif:'1' },
    ] },
  { kodeProduk:'LN-006', namaProduk:'Tali Pengikat Coil', kodeKategori:'SPARE', tipeData:'K', aktif:true, minimQty:15, keterangan:'Kebutuhan pengikat hasil produksi coil',
    satuanKonversi:[
      { kodeSatuan:'55', isi:1, hargaJual:45000, aktif:'1' },
    ] },
];
