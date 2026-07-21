// Barang — seed data Penyesuaian Barang. Dipindah dari root barang.jsx, nilai tidak diubah.

const PENYESUAIAN_BARANG = [
  { noBukti:'PB26070001', tglBukti:'2026-07-03', kodeGudang:'GDG001', namaGudang:'Gudang Utama', jenis:'KOREKSI', keterangan:'Barang rusak saat handling', batal:false, alasanBatal:'',
    details:[ { kodeItem:'AA0450914100550', namaItem:'BAHAN ABU ANGKOLA TEBAL 0.45 LEBAR 914 MM AZ 100 G-550', jumlah:-5, satuan:'LBR', hrgSatPokok:275000, hrgTotPokok:-1375000 } ] },
  { noBukti:'PB26070002', tglBukti:'2026-07-04', kodeGudang:'GDG002', namaGudang:'Gudang Konjoran', jenis:'KOREKSI', keterangan:'Penyesuaian stok minus sistem', batal:false, alasanBatal:'',
    details:[ { kodeItem:'BB040091470550', namaItem:'BAHAGIA BIRU BROMO TEBAL 0.40 LEBAR 914 MM AZ 70 G-550', jumlah:3, satuan:'LBR', hrgSatPokok:260000, hrgTotPokok:780000 } ] },
  { noBukti:'PB26070003', tglBukti:'2026-07-05', kodeGudang:'GDG001', namaGudang:'Gudang Utama', jenis:'KOREKSI', keterangan:'', batal:true, alasanBatal:'Dobel input',
    details:[ { kodeItem:'LN-004', namaItem:'Stiker Logo Perusahaan', jumlah:-20, satuan:'LBR', hrgSatPokok:1500, hrgTotPokok:-30000 } ] },
  { noBukti:'PB26070004', tglBukti:'2026-07-06', kodeGudang:'GDG003', namaGudang:'Gudang Pusat', jenis:'KOREKSI', keterangan:'Temuan opname bulanan', batal:false, alasanBatal:'',
    details:[ { kodeItem:'PRD001', namaItem:'Plastik Kemasan Premium', jumlah:-2, satuan:'PCS', hrgSatPokok:12500.5, hrgTotPokok:-25001 } ] },
];
