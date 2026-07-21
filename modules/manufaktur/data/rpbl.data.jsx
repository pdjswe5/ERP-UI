// Manufaktur — seed data Retur Pakai Barang Lain (RPBL).
//
// Data lengkap: setiap record sekarang punya barangLines terisi (sebelumnya tidak ada field
// barangLines sama sekali). No. Bukti pakai format F/K + RPBL + YYMM, sama pola dengan gerbang
// F/K yang sekarang dipakai di dialog-nya.

let _rpblRowId = 6500;
function rpblRow(kodeBarang, jumlah, satuan, sisaSebelumnya, noSpk) {
  const b = MF_BARANG.find(x => x.code === kodeBarang);
  return { id: _rpblRowId++, kodeBarang, namaBarang: b ? b.nama : '', jumlah, satuan, sisaSebelumnya, noSpk: noSpk || '' };
}

const MF_RPBL_SEED = [
  { no:'FRPBL26060601', tgl:'21-06-2026', gudang:'GDG-003', namaGudang:'Gudang C', bagian:'Engineering', catatan:'Sisa bahan tidak terpakai',
    barangLines: [
      rpblRow('*CO100TRS00020', 5, 'MTR', 15, 'FSPK26060601'),
    ] },
  { no:'KRPBL26060602', tgl:'22-06-2026', gudang:'GDG-004', namaGudang:'Gudang Produksi', bagian:'Maintenance', catatan:'',
    barangLines: [
      rpblRow('*CO AGBESHD', 4, 'MTR', 12, ''),
      rpblRow('*P', 3, 'PCS', 10, 'KSPK26060604'),
      rpblRow('*F', 1, 'PCS', 2, ''),
    ] },
  { no:'FRPBL26060603', tgl:'23-06-2026', gudang:'GDG-002', namaGudang:'Gudang B', bagian:'QC', catatan:'Retur barang uji tidak jadi dipakai',
    barangLines: [
      rpblRow('GAL023BRU750', 2, 'MTR', 8, 'FSPK26060605'),
    ] },
  { no:'KRPBL26060604', tgl:'24-06-2026', gudang:'GDG-001', namaGudang:'Gudang Utama', bagian:'Produksi', catatan:'Kelebihan alokasi bahan SPK',
    barangLines: [
      rpblRow('CO100TRSL0020', 8, 'MTR', 20, 'KSPK26060606'),
      rpblRow('AS1023ATGAKW1600', 3, 'LBR', 9, ''),
    ] },
];
