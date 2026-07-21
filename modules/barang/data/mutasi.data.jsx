// Barang — seed data Mutasi Barang & Konsinyasi. Dipindah dari root barang.jsx, nilai tidak diubah.

const MUTASI_BARANG = [
  { noBukti:'MB26070001', tglBukti:'2026-07-05', kodeGudangDari:'GDG001', namaGudangDari:'Gudang Utama', kodeGudangKe:'GDG002', namaGudangKe:'Gudang Konjoran', jenis:'MUTASI', keterangan:'Pindah stok cabang', batal:false, alasanBatal:'',
    details:[ { kodeItem:'AA0450914100550', namaItem:'BAHAN ABU ANGKOLA TEBAL 0.45 LEBAR 914 MM AZ 100 G-550', kodeKonversi:1, konversi:1, jumlah:50, satuan:'LBR' } ] },
  { noBukti:'MB26070002', tglBukti:'2026-07-06', kodeGudangDari:'GDG002', namaGudangDari:'Gudang Konjoran', kodeGudangKe:'GDG003', namaGudangKe:'Gudang Pusat', jenis:'KONSINYASI', keterangan:'Titip jual ke gudang pusat', batal:false, alasanBatal:'',
    details:[ { kodeItem:'BB040091470550', namaItem:'BAHAGIA BIRU BROMO TEBAL 0.40 LEBAR 914 MM AZ 70 G-550', kodeKonversi:1, konversi:1, jumlah:20, satuan:'LBR' } ] },
  { noBukti:'MB26070003', tglBukti:'2026-07-07', kodeGudangDari:'GDG001', namaGudangDari:'Gudang Utama', kodeGudangKe:'GDG004', namaGudangKe:'Gudang Cabang Surabaya', jenis:'MUTASI', keterangan:'', batal:true, alasanBatal:'Salah input jumlah',
    details:[ { kodeItem:'LN-001', namaItem:'Jam Dinding Custom', kodeKonversi:1, konversi:1, jumlah:10, satuan:'PCS' } ] },
  { noBukti:'MB26070004', tglBukti:'2026-07-08', kodeGudangDari:'GDG003', namaGudangDari:'Gudang Pusat', kodeGudangKe:'GDG001', namaGudangKe:'Gudang Utama', jenis:'MUTASI', keterangan:'Restock gudang utama', batal:false, alasanBatal:'',
    details:[ { kodeItem:'PRD001', namaItem:'Plastik Kemasan Premium', kodeKonversi:1, konversi:1, jumlah:100, satuan:'PCS' } ] },
];
