// Barang — seed data Stock Opname. Dipindah dari root barang.jsx, nilai tidak diubah.

const STOCK_OPNAME = [
  { noBukti:'SO26070001', kodeGudang:'GDG001', namaGudang:'Gudang Utama', tglBukti:'2026-07-01', keterangan:'Opname rutin bulanan', jenis:'BULANAN',
    details:[ { kodeItem:'AA0450914100550', namaItem:'BAHAN ABU ANGKOLA TEBAL 0.45 LEBAR 914 MM AZ 100 G-550', kodeKategori:'BAKU', deskripsi:'Selisih fisik vs sistem', jumlah:-2, satuan:'LBR', konversi:1 } ] },
  { noBukti:'SO26070002', kodeGudang:'GDG002', namaGudang:'Gudang Konjoran', tglBukti:'2026-07-02', keterangan:'Opname per permintaan SPV', jenis:'INSIDENTIL',
    details:[ { kodeItem:'BB040091470550', namaItem:'BAHAGIA BIRU BROMO TEBAL 0.40 LEBAR 914 MM AZ 70 G-550', kodeKategori:'BAKU', deskripsi:'Sesuai fisik', jumlah:0, satuan:'LBR', konversi:1 } ] },
  { noBukti:'SO26070003', kodeGudang:'GDG003', namaGudang:'Gudang Pusat', tglBukti:'2026-07-03', keterangan:'Opname akhir bulan', jenis:'BULANAN',
    details:[ { kodeItem:'PRD001', namaItem:'Plastik Kemasan Premium', kodeKategori:'JADI', deskripsi:'Lebih dari sistem', jumlah:5, satuan:'PCS', konversi:1 } ] },
  { noBukti:'SO26070004', kodeGudang:'GDG001', namaGudang:'Gudang Utama', tglBukti:'2026-07-04', keterangan:'Opname stok lama', jenis:'INSIDENTIL',
    details:[ { kodeItem:'LN-004', namaItem:'Stiker Logo Perusahaan', kodeKategori:'KAT001', deskripsi:'Rusak/kadaluarsa', jumlah:-15, satuan:'LBR', konversi:1 } ] },
];
