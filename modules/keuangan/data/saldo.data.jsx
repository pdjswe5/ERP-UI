// Keuangan — data "Sisa Nota & Uang Muka" per pelanggan/supplier, dipakai popup SaldoPickerModal
// di form Pelunasan Piutang/Hutang. Data ini MILIK modul Keuangan sendiri (bukan dihitung real-time
// dari INVOICE_SEED/PB_BELI — keduanya tidak punya field sisa/outstanding sama sekali di codebase
// ini), tapi kodeCust/namaCust & kodeSupp/namaSupp diambil dari PJ_PELANGGAN/PB_SUPPLIER ASLI supaya
// dropdown pemilihan partner di form Pelunasan konsisten dengan Katalog Pelanggan/Pemasok.
//
// jenis:'Nota' = tagihan yang mengurangi piutang/hutang saat dibayar (masuk kolom Kredit di tabel
// Pelunasan). jenis:'Uang Muka'/'Retur' = kredit yang sudah tersedia, bisa dipakai membantu bayar
// Nota (masuk kolom Debet). `sisa` sengaja ada yang < nilai (sudah pernah dipakai sebagian oleh
// record PELUNASAN_PIUTANG/HUTANG seed di kasbank.data.jsx) dan ada yang 0 (nota lama yang sudah
// lunas total, sengaja tetap disimpan sebagai riwayat — SaldoPickerModal cuma menampilkan sisa>0).

const SALDO_PIUTANG_ITEMS = [
  { id:'SP-P-001', jenis:'Nota',      kodeCust:'b7364', namaCust:'Budi Susanto Cahyono Siner', noBukti:'NJ-2026-0231', tgl:'05-07-2026', jthTempo:'19-07-2026', nilai:45000000, sisa:45000000 },
  { id:'SP-P-002', jenis:'Nota',      kodeCust:'b7364', namaCust:'Budi Susanto Cahyono Siner', noBukti:'NJ-2026-0245', tgl:'12-07-2026', jthTempo:'26-07-2026', nilai:18500000, sisa:18500000 },
  { id:'SP-P-003', jenis:'Uang Muka', kodeCust:'b7364', namaCust:'Budi Susanto Cahyono Siner', noBukti:'UM-2026-0012', tgl:'01-07-2026', jthTempo:'', nilai:10000000, sisa:10000000 },

  { id:'SP-P-004', jenis:'Nota',      kodeCust:'C001',  namaCust:'Brandon Fononta 3', noBukti:'NJ-2026-0198', tgl:'28-06-2026', jthTempo:'12-07-2026', nilai:32000000, sisa:12000000 },
  { id:'SP-P-005', jenis:'Nota',      kodeCust:'C001',  namaCust:'Brandon Fononta 3', noBukti:'NJ-2026-0256', tgl:'15-07-2026', jthTempo:'29-07-2026', nilai:27500000, sisa:27500000 },

  { id:'SP-P-006', jenis:'Nota',      kodeCust:'C012',  namaCust:'Charlie Reynold 2', noBukti:'NJ-2026-0210', tgl:'02-07-2026', jthTempo:'16-07-2026', nilai:65000000, sisa:65000000 },
  { id:'SP-P-007', jenis:'Retur',     kodeCust:'C012',  namaCust:'Charlie Reynold 2', noBukti:'SR-2026-0034', tgl:'08-07-2026', jthTempo:'', nilai:5500000, sisa:5500000 },

  { id:'SP-P-008', jenis:'Nota',      kodeCust:'KV001', namaCust:'KAVI', noBukti:'NJ-2026-0220', tgl:'04-07-2026', jthTempo:'18-07-2026', nilai:21000000, sisa:21000000 },
  { id:'SP-P-009', jenis:'Nota',      kodeCust:'KV001', namaCust:'KAVI', noBukti:'NJ-2026-0261', tgl:'17-07-2026', jthTempo:'31-07-2026', nilai:38000000, sisa:38000000 },

  { id:'SP-P-010', jenis:'Nota',      kodeCust:'L001',  namaCust:'Lia Malik', noBukti:'NJ-2026-0188', tgl:'25-06-2026', jthTempo:'09-07-2026', nilai:15000000, sisa:0 },
  { id:'SP-P-011', jenis:'Uang Muka', kodeCust:'L001',  namaCust:'Lia Malik', noBukti:'UM-2026-0018', tgl:'10-07-2026', jthTempo:'', nilai:7500000, sisa:7500000 },
];

const SALDO_HUTANG_ITEMS = [
  { id:'SP-H-001', jenis:'Nota',      kodeSupp:'AG001', namaSupp:'PT. Antigravity Test', noBukti:'BL26070001', tgl:'09-07-2026', jthTempo:'23-07-2026', nilai:55000000, sisa:55000000 },
  { id:'SP-H-002', jenis:'Nota',      kodeSupp:'AG001', namaSupp:'PT. Antigravity Test', noBukti:'BL26070005', tgl:'13-07-2026', jthTempo:'27-07-2026', nilai:32500000, sisa:32500000 },
  { id:'SP-H-003', jenis:'Uang Muka', kodeSupp:'AG001', namaSupp:'PT. Antigravity Test', noBukti:'UM-B-2026-004', tgl:'05-07-2026', jthTempo:'', nilai:15000000, sisa:15000000 },

  { id:'SP-H-004', jenis:'Nota',      kodeSupp:'MRR001', namaSupp:'Mr. ReyRehan', noBukti:'BL26070002', tgl:'10-07-2026', jthTempo:'24-07-2026', nilai:41000000, sisa:41000000 },
  { id:'SP-H-005', jenis:'Retur',     kodeSupp:'MRR001', namaSupp:'Mr. ReyRehan', noBukti:'RB26070001', tgl:'10-07-2026', jthTempo:'', nilai:4750000, sisa:4750000 },

  { id:'SP-H-006', jenis:'Nota',      kodeSupp:'P003', namaSupp:'PT. Prima Baja Sentosa', noBukti:'BL26070006', tgl:'14-07-2026', jthTempo:'13-08-2026', nilai:68000000, sisa:28000000 },
  { id:'SP-H-007', jenis:'Nota',      kodeSupp:'P003', namaSupp:'PT. Prima Baja Sentosa', noBukti:'BL26070009', tgl:'20-07-2026', jthTempo:'19-08-2026', nilai:22500000, sisa:22500000 },

  { id:'SP-H-008', jenis:'Nota',      kodeSupp:'S006', namaSupp:'CV. Sinar Metal', noBukti:'BL26070004', tgl:'12-07-2026', jthTempo:'26-07-2026', nilai:18000000, sisa:18000000 },
  { id:'SP-H-009', jenis:'Uang Muka', kodeSupp:'S006', namaSupp:'CV. Sinar Metal', noBukti:'UM-B-2026-007', tgl:'08-07-2026', jthTempo:'', nilai:6000000, sisa:6000000 },
];
