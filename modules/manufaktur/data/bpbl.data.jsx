// Manufaktur — seed data Bukti Pemakaian Barang Lain (BPBL).
//
// Data lengkap: setiap record sekarang punya barangLines terisi (sebelumnya tidak ada field
// barangLines sama sekali — kalau dibuka Edit, tabel Detail Barang selalu kosong walau
// totalBarang di list menunjukkan angka). No. Bukti pakai format F/K + BPBL + YYMM, sama pola
// dengan gerbang F/K yang sekarang dipakai di dialog-nya.

let _bpblRowId = 6000;
function bpblRow(kodeBarang, jumlah, satuan, sisaSebelumnya, noSpk) {
  const b = MF_BARANG.find(x => x.code === kodeBarang);
  return { id: _bpblRowId++, kodeBarang, namaBarang: b ? b.nama : '', jumlah, satuan, sisaSebelumnya, noSpk: noSpk || '' };
}

const MF_BPBL_SEED = [
  { no:'KBPBL26060601', tgl:'20-06-2026', gudang:'GDG-003', namaGudang:'Gudang C', bagian:'Produksi', noOpb:'OPB-2026-007', catatan:'Pemakaian rutin bulanan',
    barangLines: [
      bpblRow('*PCR3120AN120', 20, 'PCS', 80, 'FSPK26060601'),
      bpblRow('*P', 10, 'PCS', 40, ''),
    ] },
  { no:'FBPBL26060602', tgl:'21-06-2026', gudang:'GDG-001', namaGudang:'Gudang Utama', bagian:'Engineering', noOpb:'OPB-2026-008', catatan:'',
    barangLines: [
      bpblRow('*F', 2, 'PCS', 5, 'KSPK26060602'),
    ] },
  { no:'KBPBL26060603', tgl:'22-06-2026', gudang:'GDG-004', namaGudang:'Gudang Produksi', bagian:'Maintenance', noOpb:'OPB-2026-009', catatan:'Perbaikan mesin TRIM 1',
    barangLines: [
      bpblRow('*CO100TRS00020', 15, 'MTR', 60, 'FSPK26060603'),
      bpblRow('*CO AGBESHD', 10, 'MTR', 45, ''),
      bpblRow('AS1023ATBBKW1500', 5, 'MTR', 20, 'KSPK26060604'),
      bpblRow('*P', 8, 'PCS', 30, ''),
    ] },
  { no:'FBPBL26060604', tgl:'23-06-2026', gudang:'GDG-002', namaGudang:'Gudang B', bagian:'QC', noOpb:'OPB-2026-010', catatan:'',
    barangLines: [
      bpblRow('GAL023BRU750', 6, 'MTR', 25, 'FSPK26060605'),
      bpblRow('*F', 1, 'PCS', 3, ''),
    ] },
  { no:'KBPBL26060605', tgl:'24-06-2026', gudang:'GDG-001', namaGudang:'Gudang Utama', bagian:'Produksi', noOpb:'OPB-2026-011', catatan:'Pemakaian untuk SPK batch besar',
    barangLines: [
      bpblRow('CO100TRSL0020', 25, 'MTR', 100, 'KSPK26060606'),
      bpblRow('AS1023ATGAKW1600', 12, 'LBR', 50, ''),
      bpblRow('*PCR3120AN120', 18, 'PCS', 70, 'FSPK26060607'),
    ] },
];
