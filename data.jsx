// Sample data for the prototype
const SUPPLIERS = [
  { code: 'S5001', name: 'PT Auto Parts Nusantara', city: 'Jakarta', phone: '021-5550001' },
  { code: 'S5002', name: 'CV Sumber Mesin Jaya',    city: 'Surabaya', phone: '031-5550012' },
  { code: 'S5003', name: 'PT Karya Otomotif',       city: 'Bandung',  phone: '022-5550023' },
  { code: 'S5004', name: 'PT Mitra Suku Cadang',    city: 'Semarang', phone: '024-5550034' },
  { code: 'S5005', name: 'PT Global Lubricants',    city: 'Tangerang',phone: '021-5550045' },
  { code: 'S5006', name: 'CV Bengkel Sentosa',      city: 'Bekasi',   phone: '021-5550056' },
  { code: 'S5007', name: 'PT Indo Ban Prima',       city: 'Medan',    phone: '061-5550067' },
  { code: 'S5008', name: 'PT Mandiri Lighting',     city: 'Jakarta',  phone: '021-5550078' },
];

const ITEMS = [
  { code: 'P-EF1001', name: 'Engine Oil Filter — 5.0L',         unit: 'pcs', price:  185000 },
  { code: 'P-BK2104', name: 'Brake Pad Set Front — Ranger',     unit: 'set', price:  925000 },
  { code: 'P-BK2105', name: 'Brake Disc Rear — Everest',        unit: 'pcs', price: 1450000 },
  { code: 'P-SP3201', name: 'Spark Plug Iridium (4-pack)',      unit: 'set', price:  640000 },
  { code: 'P-AF4022', name: 'Air Filter — Ranger 2.2L',         unit: 'pcs', price:  235000 },
  { code: 'P-CL5500', name: 'Clutch Disc — Manual 6-spd',       unit: 'pcs', price: 3250000 },
  { code: 'P-TR6611', name: 'Timing Belt Kit — EcoBoost',       unit: 'set', price: 4180000 },
  { code: 'P-OL7022', name: 'Engine Oil 5W-30 (4L)',            unit: 'btl', price:  595000 },
  { code: 'P-TY8801', name: 'Tire 265/65R17 All-Terrain',       unit: 'pcs', price: 2100000 },
  { code: 'P-LT9210', name: 'Headlamp LED Assy — Ranger',       unit: 'pcs', price: 5450000 },
  { code: 'P-SH1140', name: 'Shock Absorber Rear — Everest',    unit: 'pcs', price: 1875000 },
  { code: 'P-BT3300', name: 'Battery 70Ah MF',                  unit: 'pcs', price: 1325000 },
];

const STATUSES = ['Draft', 'Pending Approval', 'Approved', 'Realisasi', 'Partial', 'Cancelled'];
const STATUS_CLASS = {
  'Draft': 'draft',
  'Pending Approval': 'pending',
  'Approved': 'approved',
  'Realisasi': 'realisasi',
  'Partial': 'partial',
  'Cancelled': 'cancelled',
};

// pre-built PO list (deterministic)
const PO_LIST = [
  { no:'PO-2026-0631', date:'30-04-2026', supplier:'PT Auto Parts Nusantara',  ref:'REF-AP-1108', status:'Pending Approval', due:'14-05-2026', total: 18450000, items: 6 },
  { no:'PO-2026-0630', date:'30-04-2026', supplier:'PT Mandiri Lighting',      ref:'REF-ML-2204', status:'Realisasi',        due:'13-05-2026', total: 27200000, items: 4 },
  { no:'PO-2026-0629', date:'29-04-2026', supplier:'CV Sumber Mesin Jaya',     ref:'REF-SM-9912', status:'Approved',         due:'13-05-2026', total: 41750000, items: 9 },
  { no:'PO-2026-0628', date:'29-04-2026', supplier:'PT Karya Otomotif',        ref:'REF-KO-3344', status:'Realisasi',        due:'12-05-2026', total: 12880000, items: 3 },
  { no:'PO-2026-0627', date:'28-04-2026', supplier:'PT Mitra Suku Cadang',     ref:'REF-MS-7781', status:'Partial',          due:'11-05-2026', total:  8650000, items: 5 },
  { no:'PO-2026-0626', date:'28-04-2026', supplier:'PT Global Lubricants',     ref:'REF-GL-4456', status:'Pending Approval', due:'10-05-2026', total: 15920000, items: 8 },
  { no:'PO-2026-0625', date:'28-04-2026', supplier:'PT Indo Ban Prima',        ref:'REF-IB-1129', status:'Realisasi',        due:'10-05-2026', total: 63420000, items: 12 },
  { no:'PO-2026-0624', date:'27-04-2026', supplier:'CV Bengkel Sentosa',       ref:'REF-BS-6612', status:'Draft',            due:'09-05-2026', total:  4180000, items: 2 },
  { no:'PO-2026-0623', date:'27-04-2026', supplier:'PT Auto Parts Nusantara',  ref:'REF-AP-1107', status:'Approved',         due:'09-05-2026', total: 22450000, items: 7 },
  { no:'PO-2026-0622', date:'26-04-2026', supplier:'PT Mandiri Lighting',      ref:'REF-ML-2203', status:'Cancelled',        due:'08-05-2026', total:  6300000, items: 2 },
  { no:'PO-2026-0621', date:'26-04-2026', supplier:'PT Mitra Suku Cadang',     ref:'REF-MS-7780', status:'Realisasi',        due:'08-05-2026', total: 11800000, items: 4 },
  { no:'PO-2026-0620', date:'25-04-2026', supplier:'CV Sumber Mesin Jaya',     ref:'REF-SM-9911', status:'Approved',         due:'07-05-2026', total: 38900000, items: 10 },
  { no:'PO-2026-0619', date:'25-04-2026', supplier:'PT Global Lubricants',     ref:'REF-GL-4455', status:'Pending Approval', due:'07-05-2026', total:  9450000, items: 5 },
  { no:'PO-2026-0618', date:'24-04-2026', supplier:'PT Karya Otomotif',        ref:'REF-KO-3343', status:'Realisasi',        due:'06-05-2026', total: 14200000, items: 6 },
];

const fmtRp = (n) => 'Rp ' + (n || 0).toLocaleString('id-ID');
const fmtNum = (n) => (n || 0).toLocaleString('id-ID');

const GUDANG_LIST = ['Gudang Utama', 'Gudang B', 'Gudang C', 'Gudang Produksi'];

const MESIN_LIST = [
  'TRIM 1','TRIM 2 VIETNAM','SPAN 68','SPAN 93',
  'SLITTING 1 LEBAR 450','SLITTING 1 LEBAR 300','SLITTING 1 LEBAR 600',
  'NOK V GENTENG - V1.914','NOK - V2.450',
  'GEL-BULAT BIASA TINTED','GEL-BULAT VIETNAM 0.20 MM','GEL-BULAT DD-11',
  'GEL-BULAT KECIL VIET 0.2','GEL-BULAT KECIL 0.50 MM',
  'WALL ANGLE','CANAL C-75','RENG R-32','HOLLOW 2 X 4',
];
const KELOMPOK_WARNA   = ['Abadi','CBC Ultra','Colorbond','Galvanis','Impor','Interior','Kemilau','Kirana','Maroon'];
const AZ_LIST          = ['AZ 10','AZ 100','AZ 120','AZ 150','AZ 200'];
const BRAND_LIST       = ['Naga','Atap Salju','Banteng','Diamond','Dinding Salju','Multi Panel','Sabe Steel'];
const MERK_BARANG_LIST = ['Alumindo','Galvalex','Austeel','Az','NS BHP','Bhusan','Bofeng','Diamond'];
const STEMPEL_LIST     = ['Urgent','Kapal Langka','Lunas COD','VIP Customer','Cek ada Gabungan'];
const SATUAN_SPK       = ['LBR','MTR','PCS'];
const STATUS_SPK       = ['Proses','Draft','Pending Approval','Approved','Realisasi','Selesai','Hold','Cancelled','Batal'];

const SO_LIST = [
  { no:'SO-2026-0101', pelanggan:'PT Abadi Makmur',   tgl:'20-06-2026' },
  { no:'SO-2026-0102', pelanggan:'CV Bangun Jaya',     tgl:'21-06-2026' },
  { no:'SO-2026-0103', pelanggan:'PT Cipta Karya',     tgl:'22-06-2026' },
  { no:'SO-2026-0104', pelanggan:'UD Duta Bangunan',   tgl:'23-06-2026' },
  { no:'SO-2026-0105', pelanggan:'PT Eka Steel',       tgl:'24-06-2026' },
];

const SPK_LIST = [
  { no:'SPK-2026-0021', tgl:'24-06-2026', produk:'Atap Galvalume TR',         qty:500, gudang:'Gudang Utama',    status:'Approved',         kodeBahan:'COB-AG023', merkSpk:'Galvalume TR',   stempel:'Lunas COD'        },
  { no:'SPK-2026-0020', tgl:'23-06-2026', produk:'Coil Silver Non BSI',        qty:200, gudang:'Gudang B',        status:'Draft',            kodeBahan:'COB-CR030', merkSpk:'Silver Non BSI', stempel:''                 },
  { no:'SPK-2026-0019', tgl:'22-06-2026', produk:'Packing CR-3',               qty:300, gudang:'Gudang Utama',    status:'Realisasi',        kodeBahan:'COB-PCR31', merkSpk:'CR-3 Angkasa',   stempel:'VIP Customer'     },
  { no:'SPK-2026-0018', tgl:'21-06-2026', produk:'Atap Salju 4CM 750MM',       qty:150, gudang:'Gudang Produksi', status:'Pending Approval', kodeBahan:'COB-AS4C7', merkSpk:'Salju 4CM',      stempel:'Urgent'           },
  { no:'SPK-2026-0017', tgl:'20-06-2026', produk:'Coil Atap Galvanize Biru',   qty:400, gudang:'Gudang Utama',    status:'Approved',         kodeBahan:'COB-AGBE',  merkSpk:'Galvanize Biru', stempel:'Kapal Langka'     },
  { no:'SPK-2026-0016', tgl:'19-06-2026', produk:'Packing Angkasa 1.20',       qty:250, gudang:'Gudang C',        status:'Realisasi',        kodeBahan:'COB-PACK',  merkSpk:'Angkasa 1.20',   stempel:''                 },
  { no:'SPK-2026-0015', tgl:'18-06-2026', produk:'Atap Salju 4CM 1500MM',      qty:100, gudang:'Gudang Produksi', status:'Cancelled',        kodeBahan:'COB-AS4C1', merkSpk:'Salju 4CM',      stempel:''                 },
  { no:'SPK-2026-0014', tgl:'17-06-2026', produk:'Coil Tebal 1.00 Truss',      qty:350, gudang:'Gudang Utama',    status:'Draft',            kodeBahan:'COB-TR100', merkSpk:'Truss 1.00',     stempel:'Cek ada Gabungan' },
];

const HP_LIST = [
  { no:'HP-2026-0012', noSpk:'SPK-2026-0019', tgl:'24-06-2026', gudang:'Gudang Utama',    noCoil:'CO-001', kondisi:'Normal',                      totalBarang:4 },
  { no:'HP-2026-0011', noSpk:'SPK-2026-0018', tgl:'23-06-2026', gudang:'Gudang B',         noCoil:'CO-002', kondisi:'Termasuk Tong Coil',          totalBarang:2 },
  { no:'HP-2026-0010', noSpk:'SPK-2026-0017', tgl:'22-06-2026', gudang:'Gudang Utama',    noCoil:'CO-003', kondisi:'Sisa Slitting PU',            totalBarang:6 },
  { no:'HP-2026-0009', noSpk:'SPK-2026-0016', tgl:'21-06-2026', gudang:'Gudang Produksi', noCoil:'CO-004', kondisi:'Normal',                      totalBarang:3 },
  { no:'HP-2026-0008', noSpk:'SPK-2026-0015', tgl:'20-06-2026', gudang:'Gudang C',         noCoil:'CO-005', kondisi:'Tong Coil & Sisa Slitting PU',totalBarang:5 },
  { no:'HP-2026-0007', noSpk:'SPK-2026-0014', tgl:'19-06-2026', gudang:'Gudang Utama',    noCoil:'CO-006', kondisi:'Normal',                      totalBarang:2 },
];

const MANUFAKTUR_BARANG = [
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

const COIL_LIST = [
  { no:'CO-2026-001', barang:'Coil PPGL 0.23mm Galvalume',   gudang:'Gudang Utama',    sisa:1250.50 },
  { no:'CO-2026-002', barang:'Coil PPGI 0.25mm Galvanized',  gudang:'Gudang B',         sisa: 980.00 },
  { no:'CO-2026-003', barang:'Coil CR 0.30mm Silver',         gudang:'Gudang Produksi', sisa:2100.75 },
  { no:'CO-2026-004', barang:'Coil PPGL 0.20mm Truss',        gudang:'Gudang Utama',    sisa: 640.00 },
  { no:'CO-2026-005', barang:'Coil Zincalume 0.27mm',         gudang:'Gudang C',         sisa:1875.25 },
  { no:'CO-2026-006', barang:'Coil PPGI 0.35mm Heavy Gauge',  gudang:'Gudang B',         sisa: 320.00 },
];

const BARANG_JADI_LIST = [
  { kode:'BJ-AG023-750',  nama:'Atap Galvalume 0.23mm 750mm',   kodePU:'PU-AG023', noCoil:'CO-2026-001', satuan:'mtr' },
  { kode:'BJ-AG023-1000', nama:'Atap Galvalume 0.23mm 1000mm',  kodePU:'PU-AG023', noCoil:'CO-2026-001', satuan:'mtr' },
  { kode:'BJ-AS4C-750',   nama:'Atap Salju 4CM 750mm',           kodePU:'PU-AS4C',  noCoil:'CO-2026-002', satuan:'mtr' },
  { kode:'BJ-AS4C-1500',  nama:'Atap Salju 4CM 1500mm',          kodePU:'PU-AS4C',  noCoil:'CO-2026-002', satuan:'mtr' },
  { kode:'BJ-TR100-020',  nama:'Truss Silver 1.00mm 0.20m',      kodePU:'PU-TR100', noCoil:'CO-2026-004', satuan:'mtr' },
  { kode:'BJ-GAL027',     nama:'Galvalume Sheet 0.27mm',          kodePU:'PU-GAL',   noCoil:'CO-2026-005', satuan:'pcs' },
  { kode:'BJ-CR030-750',  nama:'CR 0.30mm Silver 750mm',          kodePU:'PU-CR030', noCoil:'CO-2026-003', satuan:'mtr' },
  { kode:'BJ-ZNC027',     nama:'Zincalume 0.27mm Sheet',          kodePU:'PU-ZNC',   noCoil:'CO-2026-005', satuan:'pcs' },
];

const GUDANG_DATA = [
  { kode:'GDG-001', nama:'Gudang Utama' },
  { kode:'GDG-002', nama:'Gudang B' },
  { kode:'GDG-003', nama:'Gudang C' },
  { kode:'GDG-004', nama:'Gudang Produksi' },
];

const BPBL_LIST = [
  { no:'BPBL-2026-0005', tgl:'24-06-2026', gudang:'GDG-001', namaGudang:'Gudang Utama',    bagian:'Produksi',    noOpb:'OPB-2026-011', totalBarang:3 },
  { no:'BPBL-2026-0004', tgl:'23-06-2026', gudang:'GDG-002', namaGudang:'Gudang B',         bagian:'QC',          noOpb:'OPB-2026-010', totalBarang:2 },
  { no:'BPBL-2026-0003', tgl:'22-06-2026', gudang:'GDG-004', namaGudang:'Gudang Produksi', bagian:'Maintenance', noOpb:'OPB-2026-009', totalBarang:5 },
  { no:'BPBL-2026-0002', tgl:'21-06-2026', gudang:'GDG-001', namaGudang:'Gudang Utama',    bagian:'Engineering', noOpb:'OPB-2026-008', totalBarang:1 },
  { no:'BPBL-2026-0001', tgl:'20-06-2026', gudang:'GDG-003', namaGudang:'Gudang C',         bagian:'Produksi',    noOpb:'OPB-2026-007', totalBarang:4 },
];

const RPBL_LIST = [
  { no:'RPBL-2026-0004', tgl:'24-06-2026', gudang:'GDG-001', namaGudang:'Gudang Utama',    bagian:'Produksi',    totalBarang:2 },
  { no:'RPBL-2026-0003', tgl:'23-06-2026', gudang:'GDG-002', namaGudang:'Gudang B',         bagian:'QC',          totalBarang:1 },
  { no:'RPBL-2026-0002', tgl:'22-06-2026', gudang:'GDG-004', namaGudang:'Gudang Produksi', bagian:'Maintenance', totalBarang:3 },
  { no:'RPBL-2026-0001', tgl:'21-06-2026', gudang:'GDG-003', namaGudang:'Gudang C',         bagian:'Engineering', totalBarang:2 },
];

const PLANNING_LIST = [
  { id:'PL-001', mesin:'TRIM 1',         tgl:'24-06-2026', jamMulai:'08:30', jamSelesai:'09:15', noSpk:'SPK-2026-0021', merk:'Galvalume TR',   namaBarang:'Atap Galvalume TR',        jumlah:500, satuan:'LBR', menit:45, status:'planning'    },
  { id:'PL-002', mesin:'TRIM 1',         tgl:'24-06-2026', jamMulai:'09:20', jamSelesai:'10:30', noSpk:'SPK-2026-0017', merk:'Galvanize Biru', namaBarang:'Coil Atap Galvanize Biru', jumlah:400, satuan:'LBR', menit:70, status:'planning'    },
  { id:'PL-003', mesin:'TRIM 1',         tgl:'24-06-2026', jamMulai:'07:00', jamSelesai:'08:20', noSpk:'SPK-2026-0019', merk:'CR-3 Angkasa',   namaBarang:'Packing CR-3',             jumlah:300, satuan:'PCS', menit:80, status:'outstanding' },
  { id:'PL-004', mesin:'SPAN 68',        tgl:'24-06-2026', jamMulai:'08:00', jamSelesai:'09:00', noSpk:'SPK-2026-0018', merk:'Salju 4CM',      namaBarang:'Atap Salju 4CM 750MM',     jumlah:150, satuan:'MTR', menit:60, status:'planning'    },
  { id:'PL-005', mesin:'SPAN 68',        tgl:'24-06-2026', jamMulai:'06:30', jamSelesai:'07:45', noSpk:'SPK-2026-0016', merk:'Angkasa 1.20',   namaBarang:'Packing Angkasa 1.20',     jumlah:250, satuan:'PCS', menit:75, status:'outstanding' },
  { id:'PL-006', mesin:'SPAN 93',        tgl:'24-06-2026', jamMulai:'08:30', jamSelesai:'09:45', noSpk:'SPK-2026-0020', merk:'Silver Non BSI', namaBarang:'Coil Silver Non BSI',      jumlah:200, satuan:'LBR', menit:75, status:'planning'    },
  { id:'PL-007', mesin:'SPAN 93',        tgl:'24-06-2026', jamMulai:'10:00', jamSelesai:'11:20', noSpk:'SPK-2026-0014', merk:'Truss 1.00',     namaBarang:'Coil Tebal 1.00 Truss',   jumlah:350, satuan:'LBR', menit:80, status:'planning'    },
  { id:'PL-008', mesin:'WALL ANGLE',     tgl:'24-06-2026', jamMulai:'08:00', jamSelesai:'08:45', noSpk:'SPK-2026-0015', merk:'Salju 4CM',      namaBarang:'Atap Salju 4CM 1500MM',   jumlah:100, satuan:'MTR', menit:45, status:'outstanding' },
  { id:'PL-009', mesin:'TRIM 2 VIETNAM', tgl:'24-06-2026', jamMulai:'09:00', jamSelesai:'10:15', noSpk:'SPK-2026-0021', merk:'Galvalume TR',   namaBarang:'Atap Galvalume TR',        jumlah:250, satuan:'LBR', menit:75, status:'planning'    },
  { id:'PL-010', mesin:'TRIM 2 VIETNAM', tgl:'24-06-2026', jamMulai:'07:30', jamSelesai:'08:50', noSpk:'SPK-2026-0019', merk:'CR-3 Angkasa',   namaBarang:'Packing CR-3',             jumlah:180, satuan:'PCS', menit:80, status:'outstanding' },
  { id:'PL-011', mesin:'CANAL C-75',     tgl:'24-06-2026', jamMulai:'08:15', jamSelesai:'09:30', noSpk:'SPK-2026-0018', merk:'Salju 4CM',      namaBarang:'Atap Salju 4CM 750MM',     jumlah:120, satuan:'MTR', menit:75, status:'planning'    },
  { id:'PL-012', mesin:'RENG R-32',      tgl:'24-06-2026', jamMulai:'08:00', jamSelesai:'09:00', noSpk:'SPK-2026-0017', merk:'Galvanize Biru', namaBarang:'Coil Atap Galvanize Biru', jumlah:300, satuan:'LBR', menit:60, status:'planning'    },
];

Object.assign(window, { SUPPLIERS, ITEMS, STATUSES, STATUS_CLASS, PO_LIST, fmtRp, fmtNum,
  GUDANG_LIST, GUDANG_DATA, SPK_LIST, HP_LIST, MANUFAKTUR_BARANG, COIL_LIST, BARANG_JADI_LIST,
  MESIN_LIST, KELOMPOK_WARNA, AZ_LIST, BRAND_LIST, MERK_BARANG_LIST,
  STEMPEL_LIST, SATUAN_SPK, STATUS_SPK, SO_LIST, BPBL_LIST, RPBL_LIST, PLANNING_LIST });
