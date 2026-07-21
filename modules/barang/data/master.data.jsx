// Barang — master data & lintas-sub-modul (referensi bersama semua sub-modul Barang).
// Dipindah dari root barang.jsx, nilai tidak diubah.

const BRG_KATEGORI_OPTS = [
  { kode:'BAKU', nama:'Bahan Baku' }, { kode:'JADI', nama:'Barang Jadi' },
  { kode:'KAT001', nama:'Aksesoris' }, { kode:'KAT002', nama:'K3' }, { kode:'KAT003', nama:'Kemasan' },
  // Ditambahkan untuk form Barang Lain (lihat BRG_KATEGORI_LAIN_OPTS di bawah) — additive,
  // tidak menghapus opsi lama yang masih dipakai Bahan Baku/Barang Jadi.
  { kode:'JADIPU', nama:'Barang Jadi PU' }, { kode:'LAIN', nama:'Barang Lain' },
  { kode:'PENOLONG', nama:'Barang Penolong' }, { kode:'SPARE', nama:'Barang Spare' }, { kode:'TOOLS', nama:'Barang Tools' },
];
// Subset BRG_KATEGORI_OPTS yang boleh dipilih di form Barang Lain saja.
const BRG_KATEGORI_LAIN_OPTS = BRG_KATEGORI_OPTS.filter(k => ['LAIN','PENOLONG','SPARE','TOOLS'].includes(k.kode));

const BRG_SATUAN_OPTS = ['PCS', 'KG', 'LBR', 'MTR', 'ROLL', 'ZAK', 'PSG'];
// Pasangan kode+nama satuan (dipakai kolom "Satuan" di tabel Satuan & Konversi Barang Lain).
const BRG_SATUAN_KONVERSI_OPTS = BRG_SATUAN_OPTS.map((nama, i) => ({ kode:String(51 + i), nama }));
const BRG_GUDANG_OPTS = [
  { kode:'GDG001', nama:'Gudang Utama' }, { kode:'GDG002', nama:'Gudang Konjoran' },
  { kode:'GDG003', nama:'Gudang Pusat' }, { kode:'GDG004', nama:'Gudang Cabang Surabaya' },
];

const ACTIVITY_LOG_BARANG = [
  { user:'pdjsw', action:'Melakukan Login:', detail:'Sistem Utama', time:'1 menit yang lalu', color:'var(--realisasi)' },
  { user:'admin', action:'Mengubah Data Pemasok:', detail:'PT. Sinar Jaya', time:'12 menit yang lalu', color:'#f59e0b' },
  { user:'operator_1', action:'Membuat Nota Penjualan:', detail:'INV-2026-9526', time:'1 jam yang lalu', color:'var(--realisasi)' },
  { user:'system', action:'Sinkronisasi Database:', detail:'Server Cloud Utama', time:'3 jam yang lalu', color:'var(--accent)' },
  { user:'admin', action:'Menghapus Batch Produksi:', detail:'PRD-2026-B1', time:'7 jam yang lalu', color:'var(--danger)' },
];
