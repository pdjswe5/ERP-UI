// Manufaktur — data master (referensi statis): gudang, mesin, atribut barang jadi, SPK, dan barang.
// Dipindah dari root data.jsx, prefix MF_ ditambahkan pada seluruh identifier. Nilai tidak diubah.

const MF_GUDANG_LIST = ['Gudang Utama', 'Gudang B', 'Gudang C', 'Gudang Produksi'];

const MF_MESIN_LIST = [
  'TRIM 1','TRIM 2 VIETNAM','SPAN 68','SPAN 93',
  'SLITTING 1 LEBAR 450','SLITTING 1 LEBAR 300','SLITTING 1 LEBAR 600',
  'NOK V GENTENG - V1.914','NOK - V2.450',
  'GEL-BULAT BIASA TINTED','GEL-BULAT VIETNAM 0.20 MM','GEL-BULAT DD-11',
  'GEL-BULAT KECIL VIET 0.2','GEL-BULAT KECIL 0.50 MM',
  'WALL ANGLE','CANAL C-75','RENG R-32','HOLLOW 2 X 4',
];
// Pasangan kode+nama (dipakai field Kelompok Warna/AZ/Brand/Merk Barang Jadi — kode+nama seperti
// dropdown Customer/Sales di Penjualan, bukan dropdown biasa).
const MF_KELOMPOK_WARNA_LIST = ['Abadi','CBC Ultra','Colorbond','Galvanis','Impor','Interior','Kemilau','Kirana','Maroon']
  .map((nama, i) => ({ kode:`WR${String(i+1).padStart(2,'0')}`, nama }));
const MF_AZ_LIST = ['AZ 10','AZ 100','AZ 120','AZ 150','AZ 200']
  .map(nama => ({ kode:nama.replace(/\s+/g,''), nama }));
const MF_BRAND_LIST = ['Naga','Atap Salju','Banteng','Diamond','Dinding Salju','Multi Panel','Sabe Steel']
  .map((nama, i) => ({ kode:`BR${String(i+1).padStart(2,'0')}`, nama }));
const MF_MERK_BARANG_LIST = ['Alumindo','Galvalex','Austeel','Az','NS BHP','Bhusan','Bofeng','Diamond']
  .map((nama, i) => ({ kode:`MK${String(i+1).padStart(2,'0')}`, nama }));
const MF_STEMPEL_LIST     = ['Urgent','Kapal Langka','Lunas COD','VIP Customer','Cek ada Gabungan'];
const MF_SATUAN_SPK       = ['LBR','MTR','PCS'];
const MF_STATUS_SPK       = ['Proses','Draft','Pending Approval','Approved','Realisasi','Selesai','Hold','Cancelled','Batal'];

// Shared section-title style used across the SPK, Hasil Produksi, and Pemakaian/Retur dialogs.
const MF_SEC_STYLE = {
  fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'.07em',
  color:'var(--text-3)', margin:'0 0 14px',
  paddingBottom:8, borderBottom:'1px solid var(--border)',
};

const MF_SO_LIST = [
  { no:'SO-2026-0101', pelanggan:'PT Abadi Makmur',   tgl:'20-06-2026' },
  { no:'SO-2026-0102', pelanggan:'CV Bangun Jaya',     tgl:'21-06-2026' },
  { no:'SO-2026-0103', pelanggan:'PT Cipta Karya',     tgl:'22-06-2026' },
  { no:'SO-2026-0104', pelanggan:'UD Duta Bangunan',   tgl:'23-06-2026' },
  { no:'SO-2026-0105', pelanggan:'PT Eka Steel',       tgl:'24-06-2026' },
];

const MF_BARANG = [
  { code:'*CO',              nama:'COIL',                                              satuan:'pcs', status:'Aktif', merk:'Alumindo'  },
  { code:'*CO AGBESHD',      nama:'COIL ATAP GALVANIZE (TR) BIRU BELAWAN SHANDONG',   satuan:'pcs', status:'Aktif', merk:'Galvalex'  },
  { code:'*CO100TRS00020',   nama:'COIL TEBAL 1.00 TRUSS SILVER NON BSI 0.20 MTR',   satuan:'mtr', status:'Aktif', merk:'Austeel'   },
  { code:'*F',               nama:'JASA FOARMING',                                    satuan:'pcs', status:'Aktif', merk:'Az'        },
  { code:'*P',               nama:'PACKING',                                           satuan:'pcs', status:'Aktif', merk:'Bofeng'    },
  { code:'*PCR3120AN120',    nama:'PACKING CR-3 TEBALA 1.20 ABU ANGKASA LEBAR 1MM',  satuan:'pcs', status:'Aktif', merk:'NS BHP'    },
  { code:'*UM',              nama:'UANG MUKA PENJUALAN',                               satuan:'pcs', status:'Tidak', merk:''          },
  { code:'AS1023ATBBKW750',  nama:'ATAP SALJU 4CM TEBAL 0.23 BIRU BROMO KW2 750MM',  satuan:'mtr', status:'Aktif', merk:'Diamond'   },
  { code:'AS1023ATBBKW1500', nama:'ATAP SALJU 4CM TEBAL 0.23 BIRU BROMO KW2 1500MM', satuan:'mtr', status:'Aktif', merk:'Bhusan'    },
  { code:'AS1023ATGAKW1600', nama:'ATAP SALJU 4CM TEBAL 0.23 GALVALUME BIRU 1600MM', satuan:'mtr', status:'Aktif', merk:'Alumindo'  },
  { code:'CO100TRSL0020',    nama:'COIL TEBAL 1.00 TRUSS SILVER LEBAR 0.20 MTR',     satuan:'mtr', status:'Aktif', merk:'Galvalex'  },
  { code:'GAL023BRU750',     nama:'GALVALUME 0.23 BIRU BROMO LEBAR 750MM',            satuan:'mtr', status:'Aktif', merk:'Austeel'   },
];

const MF_COIL_LIST = [
  { no:'CO-2026-001', barang:'Coil PPGL 0.23mm Galvalume',   gudang:'Gudang Utama',    sisa:1250.50 },
  { no:'CO-2026-002', barang:'Coil PPGI 0.25mm Galvanized',  gudang:'Gudang B',         sisa: 980.00 },
  { no:'CO-2026-003', barang:'Coil CR 0.30mm Silver',         gudang:'Gudang Produksi', sisa:2100.75 },
  { no:'CO-2026-004', barang:'Coil PPGL 0.20mm Truss',        gudang:'Gudang Utama',    sisa: 640.00 },
  { no:'CO-2026-005', barang:'Coil Zincalume 0.27mm',         gudang:'Gudang C',         sisa:1875.25 },
  { no:'CO-2026-006', barang:'Coil PPGI 0.35mm Heavy Gauge',  gudang:'Gudang B',         sisa: 320.00 },
];

const MF_BARANG_JADI_LIST = [
  { kode:'BJ-AG023-750',  nama:'Atap Galvalume 0.23mm 750mm',   kodePU:'PU-AG023', noCoil:'CO-2026-001', satuan:'mtr' },
  { kode:'BJ-AG023-1000', nama:'Atap Galvalume 0.23mm 1000mm',  kodePU:'PU-AG023', noCoil:'CO-2026-001', satuan:'mtr' },
  { kode:'BJ-AS4C-750',   nama:'Atap Salju 4CM 750mm',           kodePU:'PU-AS4C',  noCoil:'CO-2026-002', satuan:'mtr' },
  { kode:'BJ-AS4C-1500',  nama:'Atap Salju 4CM 1500mm',          kodePU:'PU-AS4C',  noCoil:'CO-2026-002', satuan:'mtr' },
  { kode:'BJ-TR100-020',  nama:'Truss Silver 1.00mm 0.20m',      kodePU:'PU-TR100', noCoil:'CO-2026-004', satuan:'mtr' },
  { kode:'BJ-GAL027',     nama:'Galvalume Sheet 0.27mm',          kodePU:'PU-GAL',   noCoil:'CO-2026-005', satuan:'pcs' },
  { kode:'BJ-CR030-750',  nama:'CR 0.30mm Silver 750mm',          kodePU:'PU-CR030', noCoil:'CO-2026-003', satuan:'mtr' },
  { kode:'BJ-ZNC027',     nama:'Zincalume 0.27mm Sheet',          kodePU:'PU-ZNC',   noCoil:'CO-2026-005', satuan:'pcs' },
];
