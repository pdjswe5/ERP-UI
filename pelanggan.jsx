// Pelanggan (Customer) module — dashboard + 4 sub-screens + modals

const PELANGGAN = [
  {
      name:"Budi Susanto Cahyono Siner",
      code:"b7364",
      alamat:"Jl. Melati No. 12",
      kota:"SURABAYA",
      tel:"081234567890",
      pemilik:"Budi Susanto",
      nik:"3175012345678",
      email:"budi.susanto@example.com",
      kontak:"081234567890",
      flag:null,
      salesman:"Sales Baru 2",
      noKtp:"3175012345678",
      namaKtp:"Budi Susanto",
      tglLahir:"1990-01-01T00:00:00",
      owner:"Budi Susanto",
      namaPemesan:"Budi Susanto",
      area:"Jabodetabek",
      kodeGabungan:"Gab-b7364",
      golongan:"Blokir",
      kodePos:"10000",
      fax:"0211000000",
      klasifikasi:"Retail",
      fk:"Non Fiskal",
      status:"Aktif",
      keterangan:"Data lengkap pelanggan Budi Susanto Cahyono Siner",
      alamatKirim:"Jl. Melati No. 12",
      noNpwp:"09.001.002.3-100.004",
      jenisHarga:"Standar",
      namaPajak:"Budi Susanto Cahyono Siner",
      kotaPajak:"SURABAYA",
      plafon:5000000,
      plafonTemp:0,
      alamatPajak:"Jl. Melati No. 12",
      tempo:0,
      tempoLama:7,
      tempoKom:3,
      virtualAc:"BCA 1000000000",
      alamatTagih:"Jl. Melati No. 12",
      expedisi:[
          { expedisi:"Gojek", alamatExpedisi:"Jl. Expedisi No. 1", telepon:"081255556666", keterangan:"Ekspedisi utama" },
          { expedisi:"JNE", alamatExpedisi:"Jl. Cargo 2", telepon:"02170100", keterangan:"Reguler" }
        ],
      alamatKirimList:[
          { namaPenerima:"Budi Susanto", alamatKirim:"Jl. Melati No. 12", kota:"SURABAYA", telepon:"081234567890", keterangan:"Alamat utama" },
          { namaPenerima:"Penerima 1", alamatKirim:"Jl. Kirim No. 10", kota:"SURABAYA", telepon:"081234567890", keterangan:"Cabang" }
        ],
      npwpList:[
          { noNpwp:"09.001.002.3-100.004", namaNpwp:"Budi Susanto Cahyono Siner", alamat:"Jl. Melati No. 12" },
          { noNpwp:"09.005.006.000-200.000", namaNpwp:"Cabang SURABAYA", alamat:"Jl. Melati No. 12" }
        ],
      saldoTitipan:[
          { periode:"202607", awalTitipan:100000, awalPpn:10 },
          { periode:"202606", awalTitipan:0, awalPpn:10 }
        ],
      saldoPiutang:[
          { periode:"202607", nilaiAwal:2500000 },
          { periode:"202606", nilaiAwal:0 }
        ]
  },
  {
      name:"Brandon Fononta 3",
      code:"C001",
      alamat:"Blok M",
      kota:"JKT",
      tel:"5555",
      pemilik:"Eddy",
      nik:"12345",
      email:"brandon@pdj.com",
      kontak:"Brandon",
      flag:null,
      salesman:"Sales Senior",
      noKtp:"12345",
      namaKtp:"Eddy",
      tglLahir:"1990-01-01T00:00:00",
      owner:"Eddy",
      namaPemesan:"Eddy",
      area:"Jawa Barat",
      kodeGabungan:"Gab-C001",
      golongan:"Baik",
      kodePos:"10001",
      fax:"0211000001",
      klasifikasi:"Distributor",
      fk:"Fiskal",
      status:"Aktif",
      keterangan:"Data lengkap pelanggan Brandon Fononta 3",
      alamatKirim:"Blok M",
      noNpwp:"09.002.003.4-101.005",
      jenisHarga:"Standar",
      namaPajak:"Brandon Fononta 3",
      kotaPajak:"JKT",
      plafon:10000000,
      plafonTemp:1000000,
      alamatPajak:"Blok M",
      tempo:7,
      tempoLama:14,
      tempoKom:10,
      virtualAc:"BCA 1000000001",
      alamatTagih:"Blok M",
      expedisi:[
          { expedisi:"Gojek", alamatExpedisi:"Jl. Expedisi No. 2", telepon:"081255556667", keterangan:"Ekspedisi utama" },
          { expedisi:"JNE", alamatExpedisi:"Jl. Cargo 3", telepon:"02170101", keterangan:"Reguler" }
        ],
      alamatKirimList:[
          { namaPenerima:"Eddy", alamatKirim:"Blok M", kota:"JKT", telepon:"5555", keterangan:"Alamat utama" },
          { namaPenerima:"Penerima 2", alamatKirim:"Jl. Kirim No. 11", kota:"JKT", telepon:"Brandon", keterangan:"Cabang" }
        ],
      npwpList:[
          { noNpwp:"09.002.003.4-101.005", namaNpwp:"Brandon Fononta 3", alamat:"Blok M" },
          { noNpwp:"09.006.007.000-201.000", namaNpwp:"Cabang JKT", alamat:"Blok M" }
        ],
      saldoTitipan:[
          { periode:"202607", awalTitipan:200000, awalPpn:9.5 },
          { periode:"202606", awalTitipan:75000, awalPpn:11 }
        ],
      saldoPiutang:[
          { periode:"202607", nilaiAwal:5000000 },
          { periode:"202606", nilaiAwal:1200000 }
        ]
  },
  {
      name:"Charlie Reynold 2",
      code:"C012",
      alamat:"Blok M",
      kota:"JKT",
      tel:"5555",
      pemilik:"Alex",
      nik:"12345",
      email:"charlie@pdj.com",
      kontak:"Charlie",
      flag:null,
      salesman:"Sales Junior 1",
      noKtp:"12345",
      namaKtp:"Alex",
      tglLahir:"1990-01-01T00:00:00",
      owner:"Alex",
      namaPemesan:"Alex",
      area:"Jawa Timur",
      kodeGabungan:"Gab-C012",
      golongan:"Baik",
      kodePos:"10002",
      fax:"0211000002",
      klasifikasi:"Korporat",
      fk:"Fiskal",
      status:"Aktif",
      keterangan:"Data lengkap pelanggan Charlie Reynold 2",
      alamatKirim:"Blok M",
      noNpwp:"09.003.004.5-102.006",
      jenisHarga:"Standar",
      namaPajak:"Charlie Reynold 2",
      kotaPajak:"JKT",
      plafon:15000000,
      plafonTemp:2000000,
      alamatPajak:"Blok M",
      tempo:14,
      tempoLama:21,
      tempoKom:17,
      virtualAc:"BCA 1000000002",
      alamatTagih:"Blok M",
      expedisi:[
          { expedisi:"Gojek", alamatExpedisi:"Jl. Expedisi No. 3", telepon:"081255556668", keterangan:"Ekspedisi utama" },
          { expedisi:"JNE", alamatExpedisi:"Jl. Cargo 4", telepon:"02170102", keterangan:"Reguler" }
        ],
      alamatKirimList:[
          { namaPenerima:"Alex", alamatKirim:"Blok M", kota:"JKT", telepon:"5555", keterangan:"Alamat utama" },
          { namaPenerima:"Penerima 3", alamatKirim:"Jl. Kirim No. 12", kota:"JKT", telepon:"Charlie", keterangan:"Cabang" }
        ],
      npwpList:[
          { noNpwp:"09.003.004.5-102.006", namaNpwp:"Charlie Reynold 2", alamat:"Blok M" },
          { noNpwp:"09.007.008.000-202.000", namaNpwp:"Cabang JKT", alamat:"Blok M" }
        ],
      saldoTitipan:[
          { periode:"202607", awalTitipan:300000, awalPpn:11 },
          { periode:"202606", awalTitipan:150000, awalPpn:9.5 }
        ],
      saldoPiutang:[
          { periode:"202607", nilaiAwal:7500000 },
          { periode:"202606", nilaiAwal:2400000 }
        ]
  },
  {
      name:"gagagaga",
      code:"g123",
      alamat:"Jl. Mawar 45",
      kota:"BANDUNG",
      tel:"081298765432",
      pemilik:"didi",
      nik:"12345682832",
      email:"wildann@example.com",
      kontak:"09089876655",
      flag:null,
      salesman:"Sales Junior 2",
      noKtp:"12345682832",
      namaKtp:"didi",
      tglLahir:"1990-01-01T00:00:00",
      owner:"didi",
      namaPemesan:"didi",
      area:"Jawa Tengah",
      kodeGabungan:"Gab-g123",
      golongan:"Baik",
      kodePos:"10003",
      fax:"0211000003",
      klasifikasi:"Project",
      fk:"Non Fiskal",
      status:"Aktif",
      keterangan:"Data lengkap pelanggan gagagaga",
      alamatKirim:"Jl. Mawar 45",
      noNpwp:"09.004.005.6-103.007",
      jenisHarga:"Standar",
      namaPajak:"gagagaga",
      kotaPajak:"BANDUNG",
      plafon:20000000,
      plafonTemp:3000000,
      alamatPajak:"Jl. Mawar 45",
      tempo:21,
      tempoLama:28,
      tempoKom:24,
      virtualAc:"BCA 1000000003",
      alamatTagih:"Jl. Mawar 45",
      expedisi:[
          { expedisi:"Gojek", alamatExpedisi:"Jl. Expedisi No. 4", telepon:"081255556669", keterangan:"Ekspedisi utama" },
          { expedisi:"JNE", alamatExpedisi:"Jl. Cargo 5", telepon:"02170103", keterangan:"Reguler" }
        ],
      alamatKirimList:[
          { namaPenerima:"didi", alamatKirim:"Jl. Mawar 45", kota:"BANDUNG", telepon:"081298765432", keterangan:"Alamat utama" },
          { namaPenerima:"Penerima 4", alamatKirim:"Jl. Kirim No. 13", kota:"BANDUNG", telepon:"09089876655", keterangan:"Cabang" }
        ],
      npwpList:[
          { noNpwp:"09.004.005.6-103.007", namaNpwp:"gagagaga", alamat:"Jl. Mawar 45" },
          { noNpwp:"09.008.009.000-203.000", namaNpwp:"Cabang BANDUNG", alamat:"Jl. Mawar 45" }
        ],
      saldoTitipan:[
          { periode:"202607", awalTitipan:400000, awalPpn:11 },
          { periode:"202606", awalTitipan:225000, awalPpn:10 }
        ],
      saldoPiutang:[
          { periode:"202607", nilaiAwal:10000000 },
          { periode:"202606", nilaiAwal:3600000 }
        ]
  },
  {
      name:"Pelanggan 1",
      code:"H01",
      alamat:"Jl. Anggrek 7",
      kota:"SURABAYA",
      tel:"081300001111",
      pemilik:"Hadi",
      nik:"3175098765432",
      email:"pelanggan1@example.com",
      kontak:"081300001111",
      flag:null,
      salesman:"Sales Baru 2",
      noKtp:"3175098765432",
      namaKtp:"Hadi",
      tglLahir:"1990-01-01T00:00:00",
      owner:"Hadi",
      namaPemesan:"Hadi",
      area:"Sumatera",
      kodeGabungan:"Gab-H01",
      golongan:"Baik",
      kodePos:"10004",
      fax:"0211000004",
      klasifikasi:"Retail",
      fk:"Fiskal",
      status:"Aktif",
      keterangan:"Data lengkap pelanggan Pelanggan 1",
      alamatKirim:"Jl. Anggrek 7",
      noNpwp:"09.005.006.7-104.008",
      jenisHarga:"Standar",
      namaPajak:"Pelanggan 1",
      kotaPajak:"SURABAYA",
      plafon:25000000,
      plafonTemp:4000000,
      alamatPajak:"Jl. Anggrek 7",
      tempo:0,
      tempoLama:7,
      tempoKom:3,
      virtualAc:"BCA 1000000004",
      alamatTagih:"Jl. Anggrek 7",
      expedisi:[
          { expedisi:"Gojek", alamatExpedisi:"Jl. Expedisi No. 5", telepon:"081255556670", keterangan:"Ekspedisi utama" },
          { expedisi:"JNE", alamatExpedisi:"Jl. Cargo 6", telepon:"02170104", keterangan:"Reguler" }
        ],
      alamatKirimList:[
          { namaPenerima:"Hadi", alamatKirim:"Jl. Anggrek 7", kota:"SURABAYA", telepon:"081300001111", keterangan:"Alamat utama" },
          { namaPenerima:"Penerima 5", alamatKirim:"Jl. Kirim No. 14", kota:"SURABAYA", telepon:"081300001111", keterangan:"Cabang" }
        ],
      npwpList:[
          { noNpwp:"09.005.006.7-104.008", namaNpwp:"Pelanggan 1", alamat:"Jl. Anggrek 7" },
          { noNpwp:"09.009.010.000-204.000", namaNpwp:"Cabang SURABAYA", alamat:"Jl. Anggrek 7" }
        ],
      saldoTitipan:[
          { periode:"202607", awalTitipan:500000, awalPpn:10 },
          { periode:"202606", awalTitipan:300000, awalPpn:11 }
        ],
      saldoPiutang:[
          { periode:"202607", nilaiAwal:12500000 },
          { periode:"202606", nilaiAwal:4800000 }
        ]
  },
  {
      name:"KAVI",
      code:"KV001",
      alamat:"Jl. Kenari 88",
      kota:"JAKARTA",
      tel:"02199887766",
      pemilik:"asdfas",
      nik:"3174012345001",
      email:"kavi@example.com",
      kontak:"02199887766",
      flag:null,
      salesman:"Sales Senior",
      noKtp:"3174012345001",
      namaKtp:"asdfas",
      tglLahir:"1990-01-01T00:00:00",
      owner:"asdfas",
      namaPemesan:"asdfas",
      area:"Jabodetabek",
      kodeGabungan:"Gab-KV001",
      golongan:"Baik",
      kodePos:"10005",
      fax:"0211000005",
      klasifikasi:"Distributor",
      fk:"Fiskal",
      status:"Aktif",
      keterangan:"Data lengkap pelanggan KAVI",
      alamatKirim:"Jl. Kenari 88",
      noNpwp:"09.006.007.8-105.009",
      jenisHarga:"Standar",
      namaPajak:"KAVI",
      kotaPajak:"JAKARTA",
      plafon:30000000,
      plafonTemp:5000000,
      alamatPajak:"Jl. Kenari 88",
      tempo:7,
      tempoLama:14,
      tempoKom:10,
      virtualAc:"BCA 1000000005",
      alamatTagih:"Jl. Kenari 88",
      expedisi:[
          { expedisi:"Gojek", alamatExpedisi:"Jl. Expedisi No. 6", telepon:"081255556671", keterangan:"Ekspedisi utama" },
          { expedisi:"JNE", alamatExpedisi:"Jl. Cargo 7", telepon:"02170105", keterangan:"Reguler" }
        ],
      alamatKirimList:[
          { namaPenerima:"asdfas", alamatKirim:"Jl. Kenari 88", kota:"JAKARTA", telepon:"02199887766", keterangan:"Alamat utama" },
          { namaPenerima:"Penerima 6", alamatKirim:"Jl. Kirim No. 15", kota:"JAKARTA", telepon:"02199887766", keterangan:"Cabang" }
        ],
      npwpList:[
          { noNpwp:"09.006.007.8-105.009", namaNpwp:"KAVI", alamat:"Jl. Kenari 88" },
          { noNpwp:"09.010.011.000-205.000", namaNpwp:"Cabang JAKARTA", alamat:"Jl. Kenari 88" }
        ],
      saldoTitipan:[
          { periode:"202607", awalTitipan:600000, awalPpn:10 },
          { periode:"202606", awalTitipan:375000, awalPpn:10 }
        ],
      saldoPiutang:[
          { periode:"202607", nilaiAwal:15000000 },
          { periode:"202606", nilaiAwal:6000000 }
        ]
  },
  {
      name:"Lia Malik",
      code:"L001",
      alamat:"Blok M",
      kota:"JKT",
      tel:"9725",
      pemilik:"Alex",
      nik:"12345",
      email:"lia@pdj.com",
      kontak:"Lia",
      flag:null,
      salesman:"Sales Junior 1",
      noKtp:"12345",
      namaKtp:"Alex",
      tglLahir:"1990-01-01T00:00:00",
      owner:"Alex",
      namaPemesan:"Alex",
      area:"Jawa Barat",
      kodeGabungan:"Gab-L001",
      golongan:"Baik",
      kodePos:"10006",
      fax:"0211000006",
      klasifikasi:"Korporat",
      fk:"Non Fiskal",
      status:"Aktif",
      keterangan:"Data lengkap pelanggan Lia Malik",
      alamatKirim:"Blok M",
      noNpwp:"09.007.008.9-106.010",
      jenisHarga:"Standar",
      namaPajak:"Lia Malik",
      kotaPajak:"JKT",
      plafon:35000000,
      plafonTemp:6000000,
      alamatPajak:"Blok M",
      tempo:14,
      tempoLama:21,
      tempoKom:17,
      virtualAc:"BCA 1000000006",
      alamatTagih:"Blok M",
      expedisi:[
          { expedisi:"Gojek", alamatExpedisi:"Jl. Expedisi No. 7", telepon:"081255556672", keterangan:"Ekspedisi utama" },
          { expedisi:"JNE", alamatExpedisi:"Jl. Cargo 8", telepon:"02170106", keterangan:"Reguler" }
        ],
      alamatKirimList:[
          { namaPenerima:"Alex", alamatKirim:"Blok M", kota:"JKT", telepon:"9725", keterangan:"Alamat utama" },
          { namaPenerima:"Penerima 7", alamatKirim:"Jl. Kirim No. 16", kota:"JKT", telepon:"Lia", keterangan:"Cabang" }
        ],
      npwpList:[
          { noNpwp:"09.007.008.9-106.010", namaNpwp:"Lia Malik", alamat:"Blok M" },
          { noNpwp:"09.011.012.000-206.000", namaNpwp:"Cabang JKT", alamat:"Blok M" }
        ],
      saldoTitipan:[
          { periode:"202607", awalTitipan:700000, awalPpn:9.5 },
          { periode:"202606", awalTitipan:450000, awalPpn:11 }
        ],
      saldoPiutang:[
          { periode:"202607", nilaiAwal:17500000 },
          { periode:"202606", nilaiAwal:7200000 }
        ]
  },
  {
      name:"Lanny Wijaya",
      code:"L002",
      alamat:"Blok M",
      kota:"JKT",
      tel:"5555",
      pemilik:"Alex",
      nik:"12345",
      email:"lanny@pdj.com",
      kontak:"Lanny",
      flag:null,
      salesman:"Sales Junior 2",
      noKtp:"12345",
      namaKtp:"Alex",
      tglLahir:"1990-01-01T00:00:00",
      owner:"Alex",
      namaPemesan:"Alex",
      area:"Jawa Timur",
      kodeGabungan:"Gab-L002",
      golongan:"Blokir",
      kodePos:"10007",
      fax:"0211000007",
      klasifikasi:"Project",
      fk:"Fiskal",
      status:"Aktif",
      keterangan:"Data lengkap pelanggan Lanny Wijaya",
      alamatKirim:"Blok M",
      noNpwp:"09.008.009.10-107.011",
      jenisHarga:"Standar",
      namaPajak:"Lanny Wijaya",
      kotaPajak:"JKT",
      plafon:40000000,
      plafonTemp:7000000,
      alamatPajak:"Blok M",
      tempo:21,
      tempoLama:28,
      tempoKom:24,
      virtualAc:"BCA 1000000007",
      alamatTagih:"Blok M",
      expedisi:[
          { expedisi:"Gojek", alamatExpedisi:"Jl. Expedisi No. 8", telepon:"081255556673", keterangan:"Ekspedisi utama" },
          { expedisi:"JNE", alamatExpedisi:"Jl. Cargo 9", telepon:"02170107", keterangan:"Reguler" }
        ],
      alamatKirimList:[
          { namaPenerima:"Alex", alamatKirim:"Blok M", kota:"JKT", telepon:"5555", keterangan:"Alamat utama" },
          { namaPenerima:"Penerima 8", alamatKirim:"Jl. Kirim No. 17", kota:"JKT", telepon:"Lanny", keterangan:"Cabang" }
        ],
      npwpList:[
          { noNpwp:"09.008.009.10-107.011", namaNpwp:"Lanny Wijaya", alamat:"Blok M" },
          { noNpwp:"09.012.013.000-207.000", namaNpwp:"Cabang JKT", alamat:"Blok M" }
        ],
      saldoTitipan:[
          { periode:"202607", awalTitipan:800000, awalPpn:11 },
          { periode:"202606", awalTitipan:525000, awalPpn:9.5 }
        ],
      saldoPiutang:[
          { periode:"202607", nilaiAwal:20000000 },
          { periode:"202606", nilaiAwal:8400000 }
        ]
  },
  {
      name:"Lusista Wijaya 2",
      code:"L015",
      alamat:"Blok M",
      kota:"JKT",
      tel:"5555",
      pemilik:"Alex",
      nik:"12345",
      email:"lusista@pdj.com",
      kontak:"Lusista",
      flag:null,
      salesman:"Sales Baru 2",
      noKtp:"12345",
      namaKtp:"Alex",
      tglLahir:"1990-01-01T00:00:00",
      owner:"Alex",
      namaPemesan:"Alex",
      area:"Jawa Tengah",
      kodeGabungan:"Gab-L015",
      golongan:"Baik",
      kodePos:"10008",
      fax:"0211000008",
      klasifikasi:"Retail",
      fk:"Fiskal",
      status:"Aktif",
      keterangan:"Data lengkap pelanggan Lusista Wijaya 2",
      alamatKirim:"Blok M",
      noNpwp:"09.009.010.11-108.012",
      jenisHarga:"Standar",
      namaPajak:"Lusista Wijaya 2",
      kotaPajak:"JKT",
      plafon:45000000,
      plafonTemp:8000000,
      alamatPajak:"Blok M",
      tempo:0,
      tempoLama:7,
      tempoKom:3,
      virtualAc:"BCA 1000000008",
      alamatTagih:"Blok M",
      expedisi:[
          { expedisi:"Gojek", alamatExpedisi:"Jl. Expedisi No. 9", telepon:"081255556674", keterangan:"Ekspedisi utama" },
          { expedisi:"JNE", alamatExpedisi:"Jl. Cargo 10", telepon:"02170108", keterangan:"Reguler" }
        ],
      alamatKirimList:[
          { namaPenerima:"Alex", alamatKirim:"Blok M", kota:"JKT", telepon:"5555", keterangan:"Alamat utama" },
          { namaPenerima:"Penerima 9", alamatKirim:"Jl. Kirim No. 18", kota:"JKT", telepon:"Lusista", keterangan:"Cabang" }
        ],
      npwpList:[
          { noNpwp:"09.009.010.11-108.012", namaNpwp:"Lusista Wijaya 2", alamat:"Blok M" },
          { noNpwp:"09.013.014.000-208.000", namaNpwp:"Cabang JKT", alamat:"Blok M" }
        ],
      saldoTitipan:[
          { periode:"202607", awalTitipan:900000, awalPpn:11 },
          { periode:"202606", awalTitipan:600000, awalPpn:10 }
        ],
      saldoPiutang:[
          { periode:"202607", nilaiAwal:22500000 },
          { periode:"202606", nilaiAwal:9600000 }
        ]
  },
  {
      name:"Lusiska",
      code:"L0151",
      alamat:"Blok M",
      kota:"JKT",
      tel:"5555",
      pemilik:"Alex",
      nik:"12345",
      email:"lusiska@pdj.com",
      kontak:"Lusiska",
      flag:null,
      salesman:"Sales Senior",
      noKtp:"12345",
      namaKtp:"Alex",
      tglLahir:"1990-01-01T00:00:00",
      owner:"Alex",
      namaPemesan:"Alex",
      area:"Sumatera",
      kodeGabungan:"Gab-L0151",
      golongan:"Baik",
      kodePos:"10009",
      fax:"0211000009",
      klasifikasi:"Distributor",
      fk:"Non Fiskal",
      status:"Aktif",
      keterangan:"Data lengkap pelanggan Lusiska",
      alamatKirim:"Blok M",
      noNpwp:"09.010.011.12-109.013",
      jenisHarga:"Standar",
      namaPajak:"Lusiska",
      kotaPajak:"JKT",
      plafon:50000000,
      plafonTemp:9000000,
      alamatPajak:"Blok M",
      tempo:7,
      tempoLama:14,
      tempoKom:10,
      virtualAc:"BCA 1000000009",
      alamatTagih:"Blok M",
      expedisi:[
          { expedisi:"Gojek", alamatExpedisi:"Jl. Expedisi No. 10", telepon:"081255556675", keterangan:"Ekspedisi utama" },
          { expedisi:"JNE", alamatExpedisi:"Jl. Cargo 11", telepon:"02170109", keterangan:"Reguler" }
        ],
      alamatKirimList:[
          { namaPenerima:"Alex", alamatKirim:"Blok M", kota:"JKT", telepon:"5555", keterangan:"Alamat utama" },
          { namaPenerima:"Penerima 10", alamatKirim:"Jl. Kirim No. 19", kota:"JKT", telepon:"Lusiska", keterangan:"Cabang" }
        ],
      npwpList:[
          { noNpwp:"09.010.011.12-109.013", namaNpwp:"Lusiska", alamat:"Blok M" },
          { noNpwp:"09.014.015.000-209.000", namaNpwp:"Cabang JKT", alamat:"Blok M" }
        ],
      saldoTitipan:[
          { periode:"202607", awalTitipan:1000000, awalPpn:10 },
          { periode:"202606", awalTitipan:675000, awalPpn:11 }
        ],
      saldoPiutang:[
          { periode:"202607", nilaiAwal:25000000 },
          { periode:"202606", nilaiAwal:10800000 }
        ]
  },
  {
      name:"Pelanggan 40000000",
      code:"p12345",
      alamat:"Jl. Sudirman Kav. 10",
      kota:"JAKARTA",
      tel:"09089876655",
      pemilik:"Khalid",
      nik:"2135678910",
      email:"jayasadiq@gmail.com",
      kontak:"09089876655",
      flag:null,
      salesman:"Sales Junior 1",
      noKtp:"2135678910",
      namaKtp:"Khalid",
      tglLahir:"1990-01-01T00:00:00",
      owner:"Khalid",
      namaPemesan:"Khalid",
      area:"Jabodetabek",
      kodeGabungan:"Gab-p12345",
      golongan:"Baik",
      kodePos:"10010",
      fax:"0211000010",
      klasifikasi:"Korporat",
      fk:"Fiskal",
      status:"Aktif",
      keterangan:"Data lengkap pelanggan Pelanggan 40000000",
      alamatKirim:"Jl. Sudirman Kav. 10",
      noNpwp:"09.011.012.13-110.014",
      jenisHarga:"Standar",
      namaPajak:"Pelanggan 40000000",
      kotaPajak:"JAKARTA",
      plafon:55000000,
      plafonTemp:10000000,
      alamatPajak:"Jl. Sudirman Kav. 10",
      tempo:14,
      tempoLama:21,
      tempoKom:17,
      virtualAc:"BCA 1000000010",
      alamatTagih:"Jl. Sudirman Kav. 10",
      expedisi:[
          { expedisi:"Gojek", alamatExpedisi:"Jl. Expedisi No. 11", telepon:"081255556676", keterangan:"Ekspedisi utama" },
          { expedisi:"JNE", alamatExpedisi:"Jl. Cargo 12", telepon:"02170110", keterangan:"Reguler" }
        ],
      alamatKirimList:[
          { namaPenerima:"Khalid", alamatKirim:"Jl. Sudirman Kav. 10", kota:"JAKARTA", telepon:"09089876655", keterangan:"Alamat utama" },
          { namaPenerima:"Penerima 11", alamatKirim:"Jl. Kirim No. 20", kota:"JAKARTA", telepon:"09089876655", keterangan:"Cabang" }
        ],
      npwpList:[
          { noNpwp:"09.011.012.13-110.014", namaNpwp:"Pelanggan 40000000", alamat:"Jl. Sudirman Kav. 10" },
          { noNpwp:"09.015.016.000-210.000", namaNpwp:"Cabang JAKARTA", alamat:"Jl. Sudirman Kav. 10" }
        ],
      saldoTitipan:[
          { periode:"202607", awalTitipan:1100000, awalPpn:10 },
          { periode:"202606", awalTitipan:750000, awalPpn:10 }
        ],
      saldoPiutang:[
          { periode:"202607", nilaiAwal:27500000 },
          { periode:"202606", nilaiAwal:12000000 }
        ]
  },
  {
      name:"INDOMILK 2",
      code:"P105",
      alamat:"Jl.Mutiara",
      kota:"Sampang",
      tel:"00872",
      pemilik:"Affan Maulana Zulkamain",
      nik:"",
      email:"indomilk@example.com",
      kontak:"Kosong Bro",
      flag:null,
      salesman:"Sales Junior 2",
      noKtp:"3175000000011",
      namaKtp:"Affan Maulana Zulkamain",
      tglLahir:"1990-01-01T00:00:00",
      owner:"Affan Maulana Zulkamain",
      namaPemesan:"Affan Maulana Zulkamain",
      area:"Jawa Barat",
      kodeGabungan:"Gab-P105",
      golongan:"Baik",
      kodePos:"10011",
      fax:"0211000011",
      klasifikasi:"Project",
      fk:"Fiskal",
      status:"Aktif",
      keterangan:"Data lengkap pelanggan INDOMILK 2",
      alamatKirim:"Jl.Mutiara",
      noNpwp:"09.012.013.14-111.015",
      jenisHarga:"Standar",
      namaPajak:"INDOMILK 2",
      kotaPajak:"Sampang",
      plafon:60000000,
      plafonTemp:11000000,
      alamatPajak:"Jl.Mutiara",
      tempo:21,
      tempoLama:28,
      tempoKom:24,
      virtualAc:"BCA 1000000011",
      alamatTagih:"Jl.Mutiara",
      expedisi:[
          { expedisi:"Gojek", alamatExpedisi:"Jl. Expedisi No. 12", telepon:"081255556677", keterangan:"Ekspedisi utama" },
          { expedisi:"JNE", alamatExpedisi:"Jl. Cargo 13", telepon:"02170111", keterangan:"Reguler" }
        ],
      alamatKirimList:[
          { namaPenerima:"Affan Maulana Zulkamain", alamatKirim:"Jl.Mutiara", kota:"Sampang", telepon:"00872", keterangan:"Alamat utama" },
          { namaPenerima:"Penerima 12", alamatKirim:"Jl. Kirim No. 21", kota:"Sampang", telepon:"Kosong Bro", keterangan:"Cabang" }
        ],
      npwpList:[
          { noNpwp:"09.012.013.14-111.015", namaNpwp:"INDOMILK 2", alamat:"Jl.Mutiara" },
          { noNpwp:"09.016.017.000-211.000", namaNpwp:"Cabang Sampang", alamat:"Jl.Mutiara" }
        ],
      saldoTitipan:[
          { periode:"202607", awalTitipan:1200000, awalPpn:9.5 },
          { periode:"202606", awalTitipan:825000, awalPpn:11 }
        ],
      saldoPiutang:[
          { periode:"202607", nilaiAwal:30000000 },
          { periode:"202606", nilaiAwal:13200000 }
        ]
  },
  {
      name:"PELANGGAN H",
      code:"P34567",
      alamat:"JL KEDUNG BARUK NO 588S",
      kota:"SURABAYA",
      tel:"08145678967",
      pemilik:"David",
      nik:"",
      email:"davidcompany@gmail.com",
      kontak:"08145678967",
      flag:null,
      salesman:"Sales Baru 2",
      noKtp:"3175000000012",
      namaKtp:"David",
      tglLahir:"1990-01-01T00:00:00",
      owner:"David",
      namaPemesan:"David",
      area:"Jawa Timur",
      kodeGabungan:"Gab-P34567",
      golongan:"Baik",
      kodePos:"10012",
      fax:"0211000012",
      klasifikasi:"Retail",
      fk:"Non Fiskal",
      status:"Aktif",
      keterangan:"Data lengkap pelanggan PELANGGAN H",
      alamatKirim:"JL KEDUNG BARUK NO 588S",
      noNpwp:"09.013.014.15-112.016",
      jenisHarga:"Standar",
      namaPajak:"PELANGGAN H",
      kotaPajak:"SURABAYA",
      plafon:65000000,
      plafonTemp:12000000,
      alamatPajak:"JL KEDUNG BARUK NO 588S",
      tempo:0,
      tempoLama:7,
      tempoKom:3,
      virtualAc:"BCA 1000000012",
      alamatTagih:"JL KEDUNG BARUK NO 588S",
      expedisi:[
          { expedisi:"Gojek", alamatExpedisi:"Jl. Expedisi No. 13", telepon:"081255556678", keterangan:"Ekspedisi utama" },
          { expedisi:"JNE", alamatExpedisi:"Jl. Cargo 14", telepon:"02170112", keterangan:"Reguler" }
        ],
      alamatKirimList:[
          { namaPenerima:"David", alamatKirim:"JL KEDUNG BARUK NO 588S", kota:"SURABAYA", telepon:"08145678967", keterangan:"Alamat utama" },
          { namaPenerima:"Penerima 13", alamatKirim:"Jl. Kirim No. 22", kota:"SURABAYA", telepon:"08145678967", keterangan:"Cabang" }
        ],
      npwpList:[
          { noNpwp:"09.013.014.15-112.016", namaNpwp:"PELANGGAN H", alamat:"JL KEDUNG BARUK NO 588S" },
          { noNpwp:"09.017.018.000-212.000", namaNpwp:"Cabang SURABAYA", alamat:"JL KEDUNG BARUK NO 588S" }
        ],
      saldoTitipan:[
          { periode:"202607", awalTitipan:1300000, awalPpn:11 },
          { periode:"202606", awalTitipan:900000, awalPpn:9.5 }
        ],
      saldoPiutang:[
          { periode:"202607", nilaiAwal:32500000 },
          { periode:"202606", nilaiAwal:14400000 }
        ]
  },
  {
      name:"PELANGGAN I",
      code:"P86432",
      alamat:"JL GRESIKAN NO 20000",
      kota:"SURABAYA",
      tel:"08506789009",
      pemilik:"Siti",
      nik:"",
      email:"siticompany@gmail.com",
      kontak:"08145678967",
      flag:null,
      salesman:"Sales Senior",
      noKtp:"3175000000013",
      namaKtp:"Siti",
      tglLahir:"1990-01-01T00:00:00",
      owner:"Siti",
      namaPemesan:"Siti",
      area:"Jawa Tengah",
      kodeGabungan:"Gab-P86432",
      golongan:"Baik",
      kodePos:"10013",
      fax:"0211000013",
      klasifikasi:"Distributor",
      fk:"Fiskal",
      status:"Aktif",
      keterangan:"Data lengkap pelanggan PELANGGAN I",
      alamatKirim:"JL GRESIKAN NO 20000",
      noNpwp:"09.014.015.16-113.017",
      jenisHarga:"Standar",
      namaPajak:"PELANGGAN I",
      kotaPajak:"SURABAYA",
      plafon:70000000,
      plafonTemp:13000000,
      alamatPajak:"JL GRESIKAN NO 20000",
      tempo:7,
      tempoLama:14,
      tempoKom:10,
      virtualAc:"BCA 1000000013",
      alamatTagih:"JL GRESIKAN NO 20000",
      expedisi:[
          { expedisi:"Gojek", alamatExpedisi:"Jl. Expedisi No. 14", telepon:"081255556679", keterangan:"Ekspedisi utama" },
          { expedisi:"JNE", alamatExpedisi:"Jl. Cargo 15", telepon:"02170113", keterangan:"Reguler" }
        ],
      alamatKirimList:[
          { namaPenerima:"Siti", alamatKirim:"JL GRESIKAN NO 20000", kota:"SURABAYA", telepon:"08506789009", keterangan:"Alamat utama" },
          { namaPenerima:"Penerima 14", alamatKirim:"Jl. Kirim No. 23", kota:"SURABAYA", telepon:"08145678967", keterangan:"Cabang" }
        ],
      npwpList:[
          { noNpwp:"09.014.015.16-113.017", namaNpwp:"PELANGGAN I", alamat:"JL GRESIKAN NO 20000" },
          { noNpwp:"09.018.019.000-213.000", namaNpwp:"Cabang SURABAYA", alamat:"JL GRESIKAN NO 20000" }
        ],
      saldoTitipan:[
          { periode:"202607", awalTitipan:1400000, awalPpn:11 },
          { periode:"202606", awalTitipan:975000, awalPpn:10 }
        ],
      saldoPiutang:[
          { periode:"202607", nilaiAwal:35000000 },
          { periode:"202606", nilaiAwal:15600000 }
        ]
  },
  {
      name:"PELANGGAN BARU",
      code:"PRB01",
      alamat:"JAI AN JAI AN NO 1234",
      kota:"SURABAYA",
      tel:"08312345678",
      pemilik:"NISA",
      nik:"1234567890",
      email:"nisa@gmail.com",
      kontak:"08765654321",
      flag:null,
      salesman:"Sales Junior 1",
      noKtp:"1234567890",
      namaKtp:"NISA",
      tglLahir:"1990-01-01T00:00:00",
      owner:"NISA",
      namaPemesan:"NISA",
      area:"Sumatera",
      kodeGabungan:"Gab-PRB01",
      golongan:"Blokir",
      kodePos:"10014",
      fax:"0211000014",
      klasifikasi:"Korporat",
      fk:"Fiskal",
      status:"Aktif",
      keterangan:"Data lengkap pelanggan PELANGGAN BARU",
      alamatKirim:"JAI AN JAI AN NO 1234",
      noNpwp:"09.015.016.17-114.018",
      jenisHarga:"Standar",
      namaPajak:"PELANGGAN BARU",
      kotaPajak:"SURABAYA",
      plafon:75000000,
      plafonTemp:14000000,
      alamatPajak:"JAI AN JAI AN NO 1234",
      tempo:14,
      tempoLama:21,
      tempoKom:17,
      virtualAc:"BCA 1000000014",
      alamatTagih:"JAI AN JAI AN NO 1234",
      expedisi:[
          { expedisi:"Gojek", alamatExpedisi:"Jl. Expedisi No. 15", telepon:"081255556680", keterangan:"Ekspedisi utama" },
          { expedisi:"JNE", alamatExpedisi:"Jl. Cargo 16", telepon:"02170114", keterangan:"Reguler" }
        ],
      alamatKirimList:[
          { namaPenerima:"NISA", alamatKirim:"JAI AN JAI AN NO 1234", kota:"SURABAYA", telepon:"08312345678", keterangan:"Alamat utama" },
          { namaPenerima:"Penerima 15", alamatKirim:"Jl. Kirim No. 24", kota:"SURABAYA", telepon:"08765654321", keterangan:"Cabang" }
        ],
      npwpList:[
          { noNpwp:"09.015.016.17-114.018", namaNpwp:"PELANGGAN BARU", alamat:"JAI AN JAI AN NO 1234" },
          { noNpwp:"09.019.020.000-214.000", namaNpwp:"Cabang SURABAYA", alamat:"JAI AN JAI AN NO 1234" }
        ],
      saldoTitipan:[
          { periode:"202607", awalTitipan:1500000, awalPpn:10 },
          { periode:"202606", awalTitipan:1050000, awalPpn:11 }
        ],
      saldoPiutang:[
          { periode:"202607", nilaiAwal:37500000 },
          { periode:"202606", nilaiAwal:16800000 }
        ]
  },
  {
      name:"Pelanggan 3",
      code:"PLG03",
      alamat:"Jl.Pattimura no 123",
      kota:"malang",
      tel:"089623653463/8123…",
      pemilik:"Mans",
      nik:"12345678910",
      email:"pelanggan3@pdj.com",
      kontak:"08912345657",
      flag:"pink",
      salesman:"Sales Junior 2",
      noKtp:"12345678910",
      namaKtp:"Mans",
      tglLahir:"1990-01-01T00:00:00",
      owner:"Mans",
      namaPemesan:"Mans",
      area:"Jabodetabek",
      kodeGabungan:"Gab-PLG03",
      golongan:"Baik",
      kodePos:"10015",
      fax:"0211000015",
      klasifikasi:"Project",
      fk:"Non Fiskal",
      status:"Aktif",
      keterangan:"Data lengkap pelanggan Pelanggan 3",
      alamatKirim:"Jl.Pattimura no 123",
      noNpwp:"09.016.017.18-115.019",
      jenisHarga:"Standar",
      namaPajak:"Pelanggan 3",
      kotaPajak:"malang",
      plafon:80000000,
      plafonTemp:15000000,
      alamatPajak:"Jl.Pattimura no 123",
      tempo:21,
      tempoLama:28,
      tempoKom:24,
      virtualAc:"BCA 1000000015",
      alamatTagih:"Jl.Pattimura no 123",
      expedisi:[
          { expedisi:"Gojek", alamatExpedisi:"Jl. Expedisi No. 16", telepon:"081255556681", keterangan:"Ekspedisi utama" },
          { expedisi:"JNE", alamatExpedisi:"Jl. Cargo 17", telepon:"02170115", keterangan:"Reguler" }
        ],
      alamatKirimList:[
          { namaPenerima:"Mans", alamatKirim:"Jl.Pattimura no 123", kota:"malang", telepon:"089623653463/8123…", keterangan:"Alamat utama" },
          { namaPenerima:"Penerima 16", alamatKirim:"Jl. Kirim No. 25", kota:"malang", telepon:"08912345657", keterangan:"Cabang" }
        ],
      npwpList:[
          { noNpwp:"09.016.017.18-115.019", namaNpwp:"Pelanggan 3", alamat:"Jl.Pattimura no 123" },
          { noNpwp:"09.020.021.000-215.000", namaNpwp:"Cabang malang", alamat:"Jl.Pattimura no 123" }
        ],
      saldoTitipan:[
          { periode:"202607", awalTitipan:1600000, awalPpn:10 },
          { periode:"202606", awalTitipan:1125000, awalPpn:10 }
        ],
      saldoPiutang:[
          { periode:"202607", nilaiAwal:40000000 },
          { periode:"202606", nilaiAwal:18000000 }
        ]
  },
  {
      name:"Perusahaan 7",
      code:"PT07",
      alamat:"jl mawar no 12345",
      kota:"Jakarta",
      tel:"08123456578",
      pemilik:"Kiki",
      nik:"12345789",
      email:"perusahaan7@gmail.com",
      kontak:"08712345672",
      flag:"pink",
      salesman:"Sales Baru 2",
      noKtp:"12345789",
      namaKtp:"Kiki",
      tglLahir:"1990-01-01T00:00:00",
      owner:"Kiki",
      namaPemesan:"Kiki",
      area:"Jawa Barat",
      kodeGabungan:"Gab-PT07",
      golongan:"Baik",
      kodePos:"10016",
      fax:"0211000016",
      klasifikasi:"Retail",
      fk:"Fiskal",
      status:"Aktif",
      keterangan:"Data lengkap pelanggan Perusahaan 7",
      alamatKirim:"jl mawar no 12345",
      noNpwp:"09.017.018.19-116.020",
      jenisHarga:"Standar",
      namaPajak:"Perusahaan 7",
      kotaPajak:"Jakarta",
      plafon:85000000,
      plafonTemp:16000000,
      alamatPajak:"jl mawar no 12345",
      tempo:0,
      tempoLama:7,
      tempoKom:3,
      virtualAc:"BCA 1000000016",
      alamatTagih:"jl mawar no 12345",
      expedisi:[
          { expedisi:"Gojek", alamatExpedisi:"Jl. Expedisi No. 17", telepon:"081255556682", keterangan:"Ekspedisi utama" },
          { expedisi:"JNE", alamatExpedisi:"Jl. Cargo 18", telepon:"02170116", keterangan:"Reguler" }
        ],
      alamatKirimList:[
          { namaPenerima:"Kiki", alamatKirim:"jl mawar no 12345", kota:"Jakarta", telepon:"08123456578", keterangan:"Alamat utama" },
          { namaPenerima:"Penerima 17", alamatKirim:"Jl. Kirim No. 26", kota:"Jakarta", telepon:"08712345672", keterangan:"Cabang" }
        ],
      npwpList:[
          { noNpwp:"09.017.018.19-116.020", namaNpwp:"Perusahaan 7", alamat:"jl mawar no 12345" },
          { noNpwp:"09.021.022.000-216.000", namaNpwp:"Cabang Jakarta", alamat:"jl mawar no 12345" }
        ],
      saldoTitipan:[
          { periode:"202607", awalTitipan:1700000, awalPpn:9.5 },
          { periode:"202606", awalTitipan:1200000, awalPpn:11 }
        ],
      saldoPiutang:[
          { periode:"202607", nilaiAwal:42500000 },
          { periode:"202606", nilaiAwal:19200000 }
        ]
  },
  {
      name:"Reynold",
      code:"R003",
      alamat:"Blok M",
      kota:"JKT",
      tel:"5555",
      pemilik:"Alex",
      nik:"12345",
      email:"reynold1@pdj.com",
      kontak:"Reynold",
      flag:null,
      salesman:"Sales Senior",
      noKtp:"12345",
      namaKtp:"Alex",
      tglLahir:"1990-01-01T00:00:00",
      owner:"Alex",
      namaPemesan:"Alex",
      area:"Jawa Timur",
      kodeGabungan:"Gab-R003",
      golongan:"Baik",
      kodePos:"10017",
      fax:"0211000017",
      klasifikasi:"Distributor",
      fk:"Fiskal",
      status:"Aktif",
      keterangan:"Data lengkap pelanggan Reynold",
      alamatKirim:"Blok M",
      noNpwp:"09.018.019.20-117.021",
      jenisHarga:"Standar",
      namaPajak:"Reynold",
      kotaPajak:"JKT",
      plafon:90000000,
      plafonTemp:17000000,
      alamatPajak:"Blok M",
      tempo:7,
      tempoLama:14,
      tempoKom:10,
      virtualAc:"BCA 1000000017",
      alamatTagih:"Blok M",
      expedisi:[
          { expedisi:"Gojek", alamatExpedisi:"Jl. Expedisi No. 18", telepon:"081255556683", keterangan:"Ekspedisi utama" },
          { expedisi:"JNE", alamatExpedisi:"Jl. Cargo 19", telepon:"02170117", keterangan:"Reguler" }
        ],
      alamatKirimList:[
          { namaPenerima:"Alex", alamatKirim:"Blok M", kota:"JKT", telepon:"5555", keterangan:"Alamat utama" },
          { namaPenerima:"Penerima 18", alamatKirim:"Jl. Kirim No. 27", kota:"JKT", telepon:"Reynold", keterangan:"Cabang" }
        ],
      npwpList:[
          { noNpwp:"09.018.019.20-117.021", namaNpwp:"Reynold", alamat:"Blok M" },
          { noNpwp:"09.022.023.000-217.000", namaNpwp:"Cabang JKT", alamat:"Blok M" }
        ],
      saldoTitipan:[
          { periode:"202607", awalTitipan:1800000, awalPpn:11 },
          { periode:"202606", awalTitipan:1275000, awalPpn:9.5 }
        ],
      saldoPiutang:[
          { periode:"202607", nilaiAwal:45000000 },
          { periode:"202606", nilaiAwal:20400000 }
        ]
  },
  {
      name:"Reynold",
      code:"R006",
      alamat:"Blok M",
      kota:"JKT",
      tel:"5555",
      pemilik:"Alex",
      nik:"12345",
      email:"reynold2@pdj.com",
      kontak:"Reynold",
      flag:null,
      salesman:"Sales Junior 1",
      noKtp:"12345",
      namaKtp:"Alex",
      tglLahir:"1990-01-01T00:00:00",
      owner:"Alex",
      namaPemesan:"Alex",
      area:"Jawa Tengah",
      kodeGabungan:"Gab-R006",
      golongan:"Baik",
      kodePos:"10018",
      fax:"0211000018",
      klasifikasi:"Korporat",
      fk:"Non Fiskal",
      status:"Aktif",
      keterangan:"Data lengkap pelanggan Reynold",
      alamatKirim:"Blok M",
      noNpwp:"09.019.020.21-118.022",
      jenisHarga:"Standar",
      namaPajak:"Reynold",
      kotaPajak:"JKT",
      plafon:95000000,
      plafonTemp:18000000,
      alamatPajak:"Blok M",
      tempo:14,
      tempoLama:21,
      tempoKom:17,
      virtualAc:"BCA 1000000018",
      alamatTagih:"Blok M",
      expedisi:[
          { expedisi:"Gojek", alamatExpedisi:"Jl. Expedisi No. 19", telepon:"081255556684", keterangan:"Ekspedisi utama" },
          { expedisi:"JNE", alamatExpedisi:"Jl. Cargo 20", telepon:"02170118", keterangan:"Reguler" }
        ],
      alamatKirimList:[
          { namaPenerima:"Alex", alamatKirim:"Blok M", kota:"JKT", telepon:"5555", keterangan:"Alamat utama" },
          { namaPenerima:"Penerima 19", alamatKirim:"Jl. Kirim No. 28", kota:"JKT", telepon:"Reynold", keterangan:"Cabang" }
        ],
      npwpList:[
          { noNpwp:"09.019.020.21-118.022", namaNpwp:"Reynold", alamat:"Blok M" },
          { noNpwp:"09.023.024.000-218.000", namaNpwp:"Cabang JKT", alamat:"Blok M" }
        ],
      saldoTitipan:[
          { periode:"202607", awalTitipan:1900000, awalPpn:11 },
          { periode:"202606", awalTitipan:1350000, awalPpn:10 }
        ],
      saldoPiutang:[
          { periode:"202607", nilaiAwal:47500000 },
          { periode:"202606", nilaiAwal:21600000 }
        ]
  },
  {
      name:"Reynold Pratama",
      code:"R009",
      alamat:"Blok M",
      kota:"JKT",
      tel:"5555",
      pemilik:"Alex",
      nik:"12345",
      email:"reynold.p@pdj.com",
      kontak:"Reynold",
      flag:null,
      salesman:"Sales Junior 2",
      noKtp:"12345",
      namaKtp:"Alex",
      tglLahir:"1990-01-01T00:00:00",
      owner:"Alex",
      namaPemesan:"Alex",
      area:"Sumatera",
      kodeGabungan:"Gab-R009",
      golongan:"Baik",
      kodePos:"10019",
      fax:"0211000019",
      klasifikasi:"Project",
      fk:"Fiskal",
      status:"Aktif",
      keterangan:"Data lengkap pelanggan Reynold Pratama",
      alamatKirim:"Blok M",
      noNpwp:"09.020.021.22-119.023",
      jenisHarga:"Standar",
      namaPajak:"Reynold Pratama",
      kotaPajak:"JKT",
      plafon:100000000,
      plafonTemp:19000000,
      alamatPajak:"Blok M",
      tempo:21,
      tempoLama:28,
      tempoKom:24,
      virtualAc:"BCA 1000000019",
      alamatTagih:"Blok M",
      expedisi:[
          { expedisi:"Gojek", alamatExpedisi:"Jl. Expedisi No. 20", telepon:"081255556685", keterangan:"Ekspedisi utama" },
          { expedisi:"JNE", alamatExpedisi:"Jl. Cargo 21", telepon:"02170119", keterangan:"Reguler" }
        ],
      alamatKirimList:[
          { namaPenerima:"Alex", alamatKirim:"Blok M", kota:"JKT", telepon:"5555", keterangan:"Alamat utama" },
          { namaPenerima:"Penerima 20", alamatKirim:"Jl. Kirim No. 29", kota:"JKT", telepon:"Reynold", keterangan:"Cabang" }
        ],
      npwpList:[
          { noNpwp:"09.020.021.22-119.023", namaNpwp:"Reynold Pratama", alamat:"Blok M" },
          { noNpwp:"09.024.025.000-219.000", namaNpwp:"Cabang JKT", alamat:"Blok M" }
        ],
      saldoTitipan:[
          { periode:"202607", awalTitipan:2000000, awalPpn:10 },
          { periode:"202606", awalTitipan:1425000, awalPpn:11 }
        ],
      saldoPiutang:[
          { periode:"202607", nilaiAwal:50000000 },
          { periode:"202606", nilaiAwal:22800000 }
        ]
  },
  {
      name:"Sari Mart",
      code:"S101",
      alamat:"Jl. Kenanga 22",
      kota:"Jakarta",
      tel:"02199887766",
      pemilik:"Sari Dewi",
      nik:"3174012345",
      email:"sarimart@gmail.com",
      kontak:"08123456789",
      flag:null,
      salesman:"Sales Baru 2",
      noKtp:"3174012345",
      namaKtp:"Sari Dewi",
      tglLahir:"1990-01-01T00:00:00",
      owner:"Sari Dewi",
      namaPemesan:"Sari Dewi",
      area:"Jabodetabek",
      kodeGabungan:"Gab-S101",
      golongan:"Baik",
      kodePos:"10020",
      fax:"0211000020",
      klasifikasi:"Retail",
      fk:"Fiskal",
      status:"Aktif",
      keterangan:"Data lengkap pelanggan Sari Mart",
      alamatKirim:"Jl. Kenanga 22",
      noNpwp:"09.021.022.23-120.024",
      jenisHarga:"Standar",
      namaPajak:"Sari Mart",
      kotaPajak:"Jakarta",
      plafon:105000000,
      plafonTemp:20000000,
      alamatPajak:"Jl. Kenanga 22",
      tempo:0,
      tempoLama:7,
      tempoKom:3,
      virtualAc:"BCA 1000000020",
      alamatTagih:"Jl. Kenanga 22",
      expedisi:[
          { expedisi:"Gojek", alamatExpedisi:"Jl. Expedisi No. 21", telepon:"081255556686", keterangan:"Ekspedisi utama" },
          { expedisi:"JNE", alamatExpedisi:"Jl. Cargo 22", telepon:"02170120", keterangan:"Reguler" }
        ],
      alamatKirimList:[
          { namaPenerima:"Sari Dewi", alamatKirim:"Jl. Kenanga 22", kota:"Jakarta", telepon:"02199887766", keterangan:"Alamat utama" },
          { namaPenerima:"Penerima 21", alamatKirim:"Jl. Kirim No. 30", kota:"Jakarta", telepon:"08123456789", keterangan:"Cabang" }
        ],
      npwpList:[
          { noNpwp:"09.021.022.23-120.024", namaNpwp:"Sari Mart", alamat:"Jl. Kenanga 22" },
          { noNpwp:"09.025.026.000-220.000", namaNpwp:"Cabang Jakarta", alamat:"Jl. Kenanga 22" }
        ],
      saldoTitipan:[
          { periode:"202607", awalTitipan:2100000, awalPpn:10 },
          { periode:"202606", awalTitipan:1500000, awalPpn:10 }
        ],
      saldoPiutang:[
          { periode:"202607", nilaiAwal:52500000 },
          { periode:"202606", nilaiAwal:24000000 }
        ]
  },
  {
      name:"Toko Jaya Abadi",
      code:"T201",
      alamat:"Jl. Sudirman 45",
      kota:"Bandung",
      tel:"02288776655",
      pemilik:"Joko Susilo",
      nik:"3273098765",
      email:"jayaabadi@gmail.com",
      kontak:"08198765432",
      flag:null,
      salesman:"Sales Senior",
      noKtp:"3273098765",
      namaKtp:"Joko Susilo",
      tglLahir:"1990-01-01T00:00:00",
      owner:"Joko Susilo",
      namaPemesan:"Joko Susilo",
      area:"Jawa Barat",
      kodeGabungan:"Gab-T201",
      golongan:"Blokir",
      kodePos:"10021",
      fax:"0211000021",
      klasifikasi:"Distributor",
      fk:"Non Fiskal",
      status:"Aktif",
      keterangan:"Data lengkap pelanggan Toko Jaya Abadi",
      alamatKirim:"Jl. Sudirman 45",
      noNpwp:"09.022.023.24-121.025",
      jenisHarga:"Standar",
      namaPajak:"Toko Jaya Abadi",
      kotaPajak:"Bandung",
      plafon:110000000,
      plafonTemp:21000000,
      alamatPajak:"Jl. Sudirman 45",
      tempo:7,
      tempoLama:14,
      tempoKom:10,
      virtualAc:"BCA 1000000021",
      alamatTagih:"Jl. Sudirman 45",
      expedisi:[
          { expedisi:"Gojek", alamatExpedisi:"Jl. Expedisi No. 22", telepon:"081255556687", keterangan:"Ekspedisi utama" },
          { expedisi:"JNE", alamatExpedisi:"Jl. Cargo 23", telepon:"02170121", keterangan:"Reguler" }
        ],
      alamatKirimList:[
          { namaPenerima:"Joko Susilo", alamatKirim:"Jl. Sudirman 45", kota:"Bandung", telepon:"02288776655", keterangan:"Alamat utama" },
          { namaPenerima:"Penerima 22", alamatKirim:"Jl. Kirim No. 31", kota:"Bandung", telepon:"08198765432", keterangan:"Cabang" }
        ],
      npwpList:[
          { noNpwp:"09.022.023.24-121.025", namaNpwp:"Toko Jaya Abadi", alamat:"Jl. Sudirman 45" },
          { noNpwp:"09.026.027.000-221.000", namaNpwp:"Cabang Bandung", alamat:"Jl. Sudirman 45" }
        ],
      saldoTitipan:[
          { periode:"202607", awalTitipan:2200000, awalPpn:9.5 },
          { periode:"202606", awalTitipan:1575000, awalPpn:11 }
        ],
      saldoPiutang:[
          { periode:"202607", nilaiAwal:55000000 },
          { periode:"202606", nilaiAwal:25200000 }
        ]
  }
];

// Sales Order — mengikuti field API asli (Header + Details produk + Details2 non-produk/jasa)
const SALES_ORDER_SEED = [
  { No_Bukti:'SSO26070001', Tgl_Bukti:'2026-07-09', No_Referensi:'', Kode_Cust:'b7364', Nama_Cust:'Budi Susanto Cahyono Siner', Kode_Sales:'SL001', Nama_Sales:'Sales Baru 2',
    Kredit_Tunai:'KREDIT', Tempo:14, Tgl_Kirim:'2026-07-14', Alamat_Kirim:'Jl. Melati No. 12, Surabaya', Keterangan:'Order rutin bulanan', PPN:11, PPN_Include:false, DiscPros_Head:0, DiscNilai_Head:0,
    Nm_Kirim:'Budi Susanto', Kt_Kirim:'Surabaya', Tel_Kirim:'081234567890', Locofranco:'Franco', Klasifikasi:'Retail', Kode_Spv:'', Nama_Spv:'', Proyek:'', No_Po:'', No_Ko:'KKO20260001', Expedisi:'',
    Status:'OPEN', Alasan_Status:'',
    Details:[ { Kode_Item:'AA0450914100550', Nama_Item:'BAHAN ABU ANGKOLA TEBAL 0.45 LEBAR 914 MM AZ 100 G-550', Deskripsi:'', Jumlah:100, Realisasi:0, Konversi:1, Satuan:'LEMBAR', Hrg_Sat:95000, DiscPros_Det:0, DiscNilai_Det:0 } ],
    Details2:[] },
  { No_Bukti:'SSO26070002', Tgl_Bukti:'2026-07-10', No_Referensi:'REF-678678', Kode_Cust:'HLM001', Nama_Cust:'Lebah Dev', Kode_Sales:'SL002', Nama_Sales:'Sales Senior',
    Kredit_Tunai:'TUNAI', Tempo:0, Tgl_Kirim:'2026-07-12', Alamat_Kirim:'Jl. Rungkut Industri No. 12, Surabaya', Keterangan:'', PPN:11, PPN_Include:false, DiscPros_Head:5, DiscNilai_Head:0,
    Nm_Kirim:'Erwin', Kt_Kirim:'Surabaya', Tel_Kirim:'', Locofranco:'Loco', Klasifikasi:'Distributor', Kode_Spv:'SPV-01', Nama_Spv:'Hendra Wijaya', Proyek:'', No_Po:'PO-SJS-9981', No_Ko:'KKO20260003', Expedisi:'Indah Cargo',
    Status:'OPEN', Alasan_Status:'',
    Details:[ { Kode_Item:'BB040091470550', Nama_Item:'BAHAGIA BIRU BROMO TEBAL 0.40 LEBAR 914 MM AZ 70 G-550', Deskripsi:'', Jumlah:40, Realisasi:0, Konversi:1, Satuan:'LBR', Hrg_Sat:88000, DiscPros_Det:5, DiscNilai_Det:0 } ],
    Details2:[ { Kode_Item:'JASA-01', Nama_Item:'Biaya Pemasangan', Deskripsi:'', Jumlah:1, Satuan:'PCS', Hrg_Sat:250000, DiscPros_Det:0, DiscNilai_Det:0 } ] },
  { No_Bukti:'SSO26070003', Tgl_Bukti:'2026-07-05', No_Referensi:'', Kode_Cust:'C001', Nama_Cust:'Brandon Honanta', Kode_Sales:'SL001', Nama_Sales:'Sales Baru 2',
    Kredit_Tunai:'KREDIT', Tempo:30, Tgl_Kirim:'2026-07-20', Alamat_Kirim:'', Keterangan:'Menunggu approval kredit', PPN:11, PPN_Include:false, DiscPros_Head:0, DiscNilai_Head:0,
    Nm_Kirim:'', Kt_Kirim:'', Tel_Kirim:'', Locofranco:'Franco', Klasifikasi:'Korporat', Kode_Spv:'', Nama_Spv:'', Proyek:'Proyek Pergudangan Blok A', No_Po:'', No_Ko:'', Expedisi:'',
    Status:'', Alasan_Status:'',
    Details:[ { Kode_Item:'AS1025ATBONON075000410', Nama_Item:'ATAP SALJU 4CM TEBAL 0.25 ATAP BIRU BOGOWONTO NON BSI LEBAR 750 MM PANJANG 4.10 MTR', Deskripsi:'', Jumlah:20, Realisasi:0, Konversi:1, Satuan:'PCS', Hrg_Sat:120000, DiscPros_Det:0, DiscNilai_Det:0 } ],
    Details2:[] },
];

// Invoice — mengikuti field API asli grup "Jual"
const INVOICE_SEED = [
  { No_Bukti:'SIV26070001', Tgl_Bukti:'2026-07-11', No_Bukti_From:'SSO26070001', Kode_Cust:'b7364', Nama_Cust:'Budi Susanto Cahyono Siner', Kode_Sales:'SL001', Nama_Sales:'Sales Baru 2',
    Kode_Gudang:'GDG-001', Nama_Gudang:'Gudang Utama', Kredit_Tunai:'KREDIT', Akun_Tunai:'Bank BCA 8810-99', Tempo:14, Tgl_Kirim:'2026-07-14', Alamat_Kirim:'Jl. Melati No. 12, Surabaya',
    Keterangan:'', PPN:11, PPN_Include:false, DiscPros_Head:0, DiscNilai_Head:0, Kode_Spv:'', Nama_Spv:'', Ket_Proyek:'', Ket_Kwitansi:'', Status:'Outstanding', Expedisi:'', No_Polisi:'', Kendaraan:'',
    Details:[ { Kode_Item:'AA0450914100550', Nama_Item:'BAHAN ABU ANGKOLA TEBAL 0.45 LEBAR 914 MM AZ 100 G-550', Konversi:1, Jumlah:100, Satuan:'LEMBAR', Hrg_Sat:95000, DiscPros_Det:0, DiscNilai_Det:0, Nama_Cetak:'', Komisi:0 } ],
    Details2:[] },
  { No_Bukti:'SIV26070002', Tgl_Bukti:'2026-07-06', No_Bukti_From:'', Kode_Cust:'H01', Nama_Cust:'Pelanggan 1', Kode_Sales:'SL002', Nama_Sales:'Sales Senior',
    Kode_Gudang:'GDG-002', Nama_Gudang:'Gudang B', Kredit_Tunai:'TUNAI', Akun_Tunai:'Kas Besar — IDR', Tempo:0, Tgl_Kirim:'2026-07-06', Alamat_Kirim:'',
    Keterangan:'Lunas di tempat', PPN:11, PPN_Include:false, DiscPros_Head:0, DiscNilai_Head:0, Kode_Spv:'', Nama_Spv:'', Ket_Proyek:'', Ket_Kwitansi:'', Status:'Lunas', Expedisi:'', No_Polisi:'', Kendaraan:'',
    Details:[ { Kode_Item:'BB040091470550', Nama_Item:'BAHAGIA BIRU BROMO TEBAL 0.40 LEBAR 914 MM AZ 70 G-550', Konversi:1, Jumlah:15, Satuan:'LBR', Hrg_Sat:88000, DiscPros_Det:0, DiscNilai_Det:0, Nama_Cetak:'', Komisi:5000 } ],
    Details2:[] },
];

// Sales Return — mengikuti field API asli grup "Retur Jual"
const SALES_RETURN_SEED = [
  { No_Bukti:'SRJ26070001', Tgl_Bukti:'2026-07-12', No_Jual:'SIV26070001', Kode_Cust:'b7364', Nama_Cust:'Budi Susanto Cahyono Siner', Kode_Sales:'SL001', Kode_Gudang:'GDG-001',
    PPN:11, PPN_Include:false, DiscPros_Head:0, DiscNilai_Head:0, Kredit_Tunai:'KREDIT', Akun_Tunai:'Bank BCA 8810-99', Tempo:14, Alasan_Retur:'Cacat produksi', Keterangan:'',
    Status:'Approved',
    Details:[ { Kode_Item:'AA0450914100550', Nama_Item:'BAHAN ABU ANGKOLA TEBAL 0.45 LEBAR 914 MM AZ 100 G-550', Jumlah:5, Satuan:'LEMBAR', Hrg_Sat:95000, DiscPros_Det:0, DiscNilai_Det:0 } ],
    Details2:[] },
];

// Delivery Order — body flat, hanya Details (tanpa non-produk/jasa) per API asli grup "DO"
const DELIVERY_ORDER_SEED = [
  { No_Bukti:'SDO26070001', Tgl_Bukti:'2026-07-14', No_Referensi:'SSO26070001', Kode_Cust:'b7364', Nama_Cust:'Budi Susanto Cahyono Siner', Tgl_Kirim:'2026-07-14', Alamat_Kirim:'Jl. Melati No. 12, Surabaya',
    Keterangan:'', Ppn:11, Ppn_Include:false, DiscPros_Head:0, DiscNilai_Head:0, Nm_Kirim:'Budi Susanto', Kt_Kirim:'Surabaya', Tel_Kirim:'081234567890', Locofranco:'Franco', Klasifikasi:'Retail',
    Kode_Gudang:'GDG-001', Nama_Gudang:'Gudang Utama', Expedisi:'', Status:'OPEN',
    Details:[ { No_Ko:'KKO20260001', No_Ko_Id_Det:1, No_So:'SSO26070001', No_So_Id_Det:1, Kode_Item:'AA0450914100550', Nama_Item:'BAHAN ABU ANGKOLA TEBAL 0.45 LEBAR 914 MM AZ 100 G-550', Deskripsi:'', Jumlah:100, Realisasi:0, Konversi:1, Satuan:'LEMBAR', Hrg_Sat:95000, DiscPros_Det:0, DiscNilai_Det:0 } ] },
];

const SALES_LIST = ['Sales Baru 2', 'Sales Senior', 'Sales Junior 1', 'Sales Junior 2'];
const AKUN_TUNAI = ['Kas Besar — IDR', 'Bank BCA 8810-99', 'Bank Mandiri 1212', 'Kas Kecil Cabang'];
const GUDANG_PJ = ['Gudang Konjoran', 'Gudang Utama', 'Gudang Pusat', 'Gudang Cabang Surabaya'];
const CARA_BAYAR = ['TUNAI', 'KREDIT'];
const INCOTERM_LIST = ['Franco', 'Loco', 'Ex Works'];
const KLASIFIKASI_LIST = ['Retail', 'Distributor', 'Korporat', 'Project'];
const STATUS_KONFIRMASI = ['AKTIF', 'BATAL', 'SELESAI MANUAL'];
const PROGRESS_APPROVAL = ['PENGAJUAN SPV', 'PENGAJUAN MGR', 'DISETUJUI', 'DITOLAK SPV', 'DITOLAK MGR'];

// Helper pembentuk nomor bukti: [K/F][InisialMenu][Tahun][Counter]
// Contoh: KKO20260001, FKO20260002, KSO20260001
function fmtNoBukti(prefix, menuInitial, year, counter) {
  return `${prefix}${menuInitial}${year}${String(counter).padStart(4, '0')}`;
}

// Total satu baris item (Sales Order/Invoice/Sales Return/Delivery Order) dari field API asli
function pjLineTotal(r) {
  const jml = +r.Jumlah || 0;
  const hrg = +r.Hrg_Sat || 0;
  const d1 = +r.DiscPros_Det || 0;
  const dRp = +r.DiscNilai_Det || 0;
  return jml * hrg * (1 - d1/100) - dRp;
}
function pjNextNo(prefix) { return prefix + Date.now().toString().slice(-9); }

const KONFIRMASI_PENJUALAN = [
  {
    noBukti: 'KKO20260001', tglDari: '08/07/2026', tglBukti: '2026-07-08', noReferensi: '',
    customer: 'rismaa', kodeCustomer: '', sales: 'SUPPLIER AGUNG CP',
    caraBayar: 'TUNAI', status: 'AKTIF', progressApproval: 'DISETUJUI', jmlItem: 1, totalNilai: 1332000,
    createdBy: 'PDJ Administrator', createdAt: '08/07/2026, 14:30', editedBy: 'PDJ Administrator', editedAt: '08/07/2026, 15:47',
    approval: { level: 'Level 1 - Supervisor', status: 'DISETUJUI', approvedBy: 'Admin', approvedAt: '08/07/2026, 15:00' },
    informasiUmum: { noRef: '', estimasiKirim: '2026-07-11', incoterm: 'Franco', klasifikasi: 'Retail', attn: 'Budi', namaHpPenerima: '', telepon: '', email: '', alamatCustomer: '', keterangan: '', alamatPengiriman: '', jenisKendaraan: '' },
    pembayaran: { tempo: 0, dp: 0, payment2: 0, payment3: 0, akun: 'BANK BCA', berlakuSampai: '2026-07-11' },
    barang: [{ kode: 'Affan1-UM-260711141743', nama: '*C BAK AIR ABU ASAHAN AZ LEBAR 5 MM PANJANG 5 MTR', catatan: 'Catatan', jumlah: 1, satuan: 'PCS', harga: 10000, total: 10000 }]
  },
  {
    noBukti: 'FKO20260002', tglDari: '07/07/2026', tglBukti: '2026-07-07', noReferensi: '',
    customer: 'Brandon Honanta', kodeCustomer: 'C001', sales: 'Bobby',
    caraBayar: 'TUNAI', status: 'AKTIF', progressApproval: 'DISETUJUI', jmlItem: 2, totalNilai: 91575000,
    createdBy: 'PDJ Administrator', createdAt: '07/07/2026, 10:15', editedBy: 'PDJ Administrator', editedAt: '07/07/2026, 11:20',
    approval: { level: 'Level 1 - Supervisor', status: 'PENGAJUAN', approvedBy: '', approvedAt: '' },
    informasiUmum: { noRef: '', estimasiKirim: '2026-07-10', incoterm: 'Franco', klasifikasi: 'Retail', attn: 'Brandon', namaHpPenerima: '', telepon: '', email: '', alamatCustomer: '', keterangan: '', alamatPengiriman: '', jenisKendaraan: '' },
    pembayaran: { tempo: 0, dp: 0, payment2: 0, payment3: 0, akun: 'BANK BCA', berlakuSampai: '2026-07-10' },
    barang: [
      { kode: 'ITEM-001', nama: 'Produk A', catatan: '', jumlah: 1, satuan: 'PCS', harga: 45000000, total: 45000000 },
      { kode: 'ITEM-002', nama: 'Produk B', catatan: '', jumlah: 1, satuan: 'PCS', harga: 46575000, total: 46575000 }
    ]
  },
  {
    noBukti: 'KKO20260003', tglDari: '04/07/2026', tglBukti: '2026-07-04', noReferensi: 'Ref-678678',
    customer: 'Lebah Dev', kodeCustomer: 'HLM001', sales: 'Affan',
    caraBayar: 'KREDIT', status: 'AKTIF', progressApproval: 'DISETUJUI', jmlItem: 2, totalNilai: 66600000,
    createdBy: 'PDJ Administrator', createdAt: '04/07/2026, 09:00', editedBy: 'PDJ Administrator', editedAt: '04/07/2026, 09:30',
    approval: { level: 'Level 1 - Supervisor', status: 'DISETUJUI', approvedBy: 'Admin', approvedAt: '04/07/2026, 09:30' },
    informasiUmum: { noRef: 'Ref-678678', estimasiKirim: '2026-07-07', incoterm: 'Franco', klasifikasi: 'Distributor', attn: 'Budi', namaHpPenerima: '', telepon: '', email: '', alamatCustomer: '', keterangan: '', alamatPengiriman: '', jenisKendaraan: '' },
    pembayaran: { tempo: 14, dp: 0, payment2: 0, payment3: 0, akun: 'BANK BCA', berlakuSampai: '2026-07-18' },
    barang: [
      { kode: 'ITEM-003', nama: 'Coil Galvalume', catatan: '', jumlah: 2, satuan: 'LBR', harga: 33300000, total: 66600000 }
    ]
  },
  {
    noBukti: 'KKO20260004', tglDari: '04/07/2026', tglBukti: '2026-07-04', noReferensi: 'Ref-765765',
    customer: 'Lebah Dev', kodeCustomer: 'HLM001', sales: 'Affan',
    caraBayar: 'TUNAI', status: 'AKTIF', progressApproval: 'DISETUJUI', jmlItem: 2, totalNilai: 38850000,
    createdBy: 'PDJ Administrator', createdAt: '04/07/2026, 08:30', editedBy: 'PDJ Administrator', editedAt: '04/07/2026, 08:45',
    approval: { level: 'Level 1 - Supervisor', status: 'DISETUJUI', approvedBy: 'Admin', approvedAt: '04/07/2026, 08:45' },
    informasiUmum: { noRef: 'Ref-765765', estimasiKirim: '2026-07-07', incoterm: 'Franco', klasifikasi: 'Distributor', attn: 'Budi', namaHpPenerima: '', telepon: '', email: '', alamatCustomer: '', keterangan: '', alamatPengiriman: '', jenisKendaraan: '' },
    pembayaran: { tempo: 0, dp: 0, payment2: 0, payment3: 0, akun: 'BANK BCA', berlakuSampai: '2026-07-07' },
    barang: [{ kode: 'ITEM-004', nama: 'Atap Spandek', catatan: '', jumlah: 2, satuan: 'LBR', harga: 19425000, total: 38850000 }]
  },
  {
    noBukti: 'KKO20260005', tglDari: '02/07/2026', tglBukti: '2026-07-02', noReferensi: 'REF-456456',
    customer: 'Charlie Reynold 2', kodeCustomer: 'C012', sales: 'Bobby',
    caraBayar: 'TUNAI', status: 'AKTIF', progressApproval: 'DITOLAK SPV', jmlItem: 1, totalNilai: 5550000,
    createdBy: 'PDJ Administrator', createdAt: '02/07/2026, 13:00', editedBy: 'PDJ Administrator', editedAt: '02/07/2026, 13:15',
    approval: { level: 'Level 1 - Supervisor', status: 'DITOLAK', approvedBy: '', approvedAt: '' },
    informasiUmum: { noRef: 'REF-456456', estimasiKirim: '2026-07-05', incoterm: 'Franco', klasifikasi: 'Retail', attn: 'Charlie', namaHpPenerima: '', telepon: '', email: '', alamatCustomer: '', keterangan: '', alamatPengiriman: '', jenisKendaraan: '' },
    pembayaran: { tempo: 0, dp: 0, payment2: 0, payment3: 0, akun: 'BANK BCA', berlakuSampai: '2026-07-05' },
    barang: [{ kode: 'ITEM-005', nama: 'Reng Baja Ringan', catatan: '', jumlah: 1, satuan: 'PCS', harga: 5550000, total: 5550000 }]
  },
  {
    noBukti: 'KKO20260006', tglDari: '02/07/2026', tglBukti: '2026-07-02', noReferensi: 'REF-123123',
    customer: 'Brandon Honanta', kodeCustomer: 'C001', sales: 'Affan Maulana Zulkarnain',
    caraBayar: 'TUNAI', status: 'AKTIF', progressApproval: 'PENGAJUAN MGR', jmlItem: 1, totalNilai: 111000,
    createdBy: 'PDJ Administrator', createdAt: '02/07/2026, 11:00', editedBy: 'PDJ Administrator', editedAt: '02/07/2026, 11:30',
    approval: { level: 'Level 1 - Supervisor', status: 'PENGAJUAN', approvedBy: '', approvedAt: '' },
    informasiUmum: { noRef: 'REF-123123', estimasiKirim: '2026-07-05', incoterm: 'Franco', klasifikasi: 'Retail', attn: 'Brandon', namaHpPenerima: '', telepon: '', email: '', alamatCustomer: '', keterangan: '', alamatPengiriman: '', jenisKendaraan: '' },
    pembayaran: { tempo: 0, dp: 0, payment2: 0, payment3: 0, akun: 'BANK BCA', berlakuSampai: '2026-07-05' },
    barang: [{ kode: 'ITEM-006', nama: 'Baut Roofing', catatan: '', jumlah: 1, satuan: 'PCS', harga: 111000, total: 111000 }]
  },
  {
    noBukti: 'KKO20260007', tglDari: '30/06/2026', tglBukti: '2026-06-30', noReferensi: '',
    customer: 'Pelanggan 1', kodeCustomer: 'H01', sales: 'Bobby',
    caraBayar: 'TUNAI', status: 'BATAL', progressApproval: 'PENGAJUAN SPV', jmlItem: 1, totalNilai: 0,
    createdBy: 'PDJ Administrator', createdAt: '30/06/2026, 10:00', editedBy: 'PDJ Administrator', editedAt: '30/06/2026, 10:15',
    approval: { level: 'Level 1 - Supervisor', status: 'PENGAJUAN', approvedBy: '', approvedAt: '' },
    informasiUmum: { noRef: '', estimasiKirim: '2026-07-03', incoterm: 'Franco', klasifikasi: 'Retail', attn: 'Pelanggan', namaHpPenerima: '', telepon: '', email: '', alamatCustomer: '', keterangan: '', alamatPengiriman: '', jenisKendaraan: '' },
    pembayaran: { tempo: 0, dp: 0, payment2: 0, payment3: 0, akun: 'BANK BCA', berlakuSampai: '2026-07-03' },
    barang: []
  },
  {
    noBukti: 'KKO20260008', tglDari: '18/06/2026', tglBukti: '2026-06-18', noReferensi: '',
    customer: 'Pelanggan 1', kodeCustomer: 'H01', sales: 'Affan30',
    caraBayar: 'TUNAI', status: 'BATAL', progressApproval: 'PENGAJUAN SPV', jmlItem: 1, totalNilai: 5550000,
    createdBy: 'PDJ Administrator', createdAt: '18/06/2026, 09:00', editedBy: 'PDJ Administrator', editedAt: '18/06/2026, 09:10',
    approval: { level: 'Level 1 - Supervisor', status: 'PENGAJUAN', approvedBy: '', approvedAt: '' },
    informasiUmum: { noRef: '', estimasiKirim: '2026-06-21', incoterm: 'Franco', klasifikasi: 'Retail', attn: 'Pelanggan', namaHpPenerima: '', telepon: '', email: '', alamatCustomer: '', keterangan: '', alamatPengiriman: '', jenisKendaraan: '' },
    pembayaran: { tempo: 0, dp: 0, payment2: 0, payment3: 0, akun: 'BANK BCA', berlakuSampai: '2026-06-21' },
    barang: [{ kode: 'ITEM-007', nama: 'Plat Galvanis', catatan: '', jumlah: 1, satuan: 'LBR', harga: 5550000, total: 5550000 }]
  },
  {
    noBukti: 'KKO20260009', tglDari: '30/06/2026', tglBukti: '2026-06-30', noReferensi: '',
    customer: 'Pelanggan 1', kodeCustomer: 'H01', sales: 'SUPPLIER AGUNG CP',
    caraBayar: 'TUNAI', status: 'BATAL', progressApproval: 'PENGAJUAN SPV', jmlItem: 1, totalNilai: 11100000,
    createdBy: 'PDJ Administrator', createdAt: '30/06/2026, 08:00', editedBy: 'PDJ Administrator', editedAt: '30/06/2026, 08:05',
    approval: { level: 'Level 1 - Supervisor', status: 'PENGAJUAN', approvedBy: '', approvedAt: '' },
    informasiUmum: { noRef: '', estimasiKirim: '2026-07-03', incoterm: 'Franco', klasifikasi: 'Retail', attn: 'Pelanggan', namaHpPenerima: '', telepon: '', email: '', alamatCustomer: '', keterangan: '', alamatPengiriman: '', jenisKendaraan: '' },
    pembayaran: { tempo: 0, dp: 0, payment2: 0, payment3: 0, akun: 'BANK BCA', berlakuSampai: '2026-07-03' },
    barang: [{ kode: 'ITEM-008', nama: 'Coil Aluminium', catatan: '', jumlah: 1, satuan: 'ROLL', harga: 11100000, total: 11100000 }]
  },
  {
    noBukti: 'KKO20260010', tglDari: '30/06/2026', tglBukti: '2026-06-30', noReferensi: '',
    customer: 'Budi Susanto C.', kodeCustomer: 'b7364', sales: 'Affan Maulana Zulkarnain',
    caraBayar: 'TUNAI', status: 'BATAL', progressApproval: 'PENGAJUAN SPV', jmlItem: 1, totalNilai: 444000,
    createdBy: 'PDJ Administrator', createdAt: '30/06/2026, 07:30', editedBy: 'PDJ Administrator', editedAt: '30/06/2026, 07:40',
    approval: { level: 'Level 1 - Supervisor', status: 'PENGAJUAN', approvedBy: '', approvedAt: '' },
    informasiUmum: { noRef: '', estimasiKirim: '2026-07-03', incoterm: 'Franco', klasifikasi: 'Retail', attn: 'Budi', namaHpPenerima: '', telepon: '', email: '', alamatCustomer: '', keterangan: '', alamatPengiriman: '', jenisKendaraan: '' },
    pembayaran: { tempo: 0, dp: 0, payment2: 0, payment3: 0, akun: 'BANK BCA', berlakuSampai: '2026-07-03' },
    barang: [{ kode: 'ITEM-009', nama: 'Sekrup', catatan: '', jumlah: 1, satuan: 'KG', harga: 444000, total: 444000 }]
  },
  {
    noBukti: 'KKO20260011', tglDari: '30/06/2026', tglBukti: '2026-06-30', noReferensi: '',
    customer: 'Halim', kodeCustomer: 'test01', sales: 'Affan Maulana',
    caraBayar: 'TUNAI', status: 'BATAL', progressApproval: 'PENGAJUAN SPV', jmlItem: 1, totalNilai: 133200,
    createdBy: 'PDJ Administrator', createdAt: '30/06/2026, 07:00', editedBy: 'PDJ Administrator', editedAt: '30/06/2026, 07:10',
    approval: { level: 'Level 1 - Supervisor', status: 'PENGAJUAN', approvedBy: '', approvedAt: '' },
    informasiUmum: { noRef: '', estimasiKirim: '2026-07-03', incoterm: 'Franco', klasifikasi: 'Retail', attn: 'Halim', namaHpPenerima: '', telepon: '', email: '', alamatCustomer: '', keterangan: '', alamatPengiriman: '', jenisKendaraan: '' },
    pembayaran: { tempo: 0, dp: 0, payment2: 0, payment3: 0, akun: 'BANK BCA', berlakuSampai: '2026-07-03' },
    barang: [{ kode: 'ITEM-010', nama: 'Lem Sheet', catatan: '', jumlah: 1, satuan: 'PCS', harga: 133200, total: 133200 }]
  },
  {
    noBukti: 'KKO20260012', tglDari: '18/06/2026', tglBukti: '2026-06-18', noReferensi: 'Ref-321321321',
    customer: 'Pelanggan 1', kodeCustomer: 'H01', sales: 'Affan30',
    caraBayar: 'KREDIT', status: 'AKTIF', progressApproval: 'DITOLAK MGR', jmlItem: 1, totalNilai: 44400,
    createdBy: 'PDJ Administrator', createdAt: '18/06/2026, 06:00', editedBy: 'PDJ Administrator', editedAt: '18/06/2026, 06:15',
    approval: { level: 'Level 1 - Supervisor', status: 'DITOLAK', approvedBy: '', approvedAt: '' },
    informasiUmum: { noRef: 'Ref-321321321', estimasiKirim: '2026-06-21', incoterm: 'Franco', klasifikasi: 'Retail', attn: 'Pelanggan', namaHpPenerima: '', telepon: '', email: '', alamatCustomer: '', keterangan: '', alamatPengiriman: '', jenisKendaraan: '' },
    pembayaran: { tempo: 30, dp: 0, payment2: 0, payment3: 0, akun: 'BANK BCA', berlakuSampai: '2026-07-18' },
    barang: [{ kode: 'ITEM-011', nama: 'Tutup Nok', catatan: '', jumlah: 1, satuan: 'PCS', harga: 44400, total: 44400 }]
  },
  {
    noBukti: 'FKO20260013', tglDari: '18/06/2026', tglBukti: '2026-06-18', noReferensi: '',
    customer: 'Pelanggan 1', kodeCustomer: 'H01', sales: 'Affan30',
    caraBayar: 'TUNAI', status: 'SELESAI MANUAL', progressApproval: 'PENGAJUAN SPV', jmlItem: 4, totalNilai: 5661000,
    createdBy: 'PDJ Administrator', createdAt: '18/06/2026, 05:00', editedBy: 'PDJ Administrator', editedAt: '18/06/2026, 05:30',
    approval: { level: 'Level 1 - Supervisor', status: 'PENGAJUAN', approvedBy: '', approvedAt: '' },
    informasiUmum: { noRef: '', estimasiKirim: '2026-06-21', incoterm: 'Franco', klasifikasi: 'Retail', attn: 'Pelanggan', namaHpPenerima: '', telepon: '', email: '', alamatCustomer: '', keterangan: '', alamatPengiriman: '', jenisKendaraan: '' },
    pembayaran: { tempo: 0, dp: 0, payment2: 0, payment3: 0, akun: 'BANK BCA', berlakuSampai: '2026-06-21' },
    barang: [{ kode: 'ITEM-012', nama: 'Paket Atap', catatan: '', jumlah: 4, satuan: 'SET', harga: 1415250, total: 5661000 }]
  }
];

Object.assign(window, { PELANGGAN, KONFIRMASI_PENJUALAN, SALES_LIST, AKUN_TUNAI, GUDANG_PJ, CARA_BAYAR, INCOTERM_LIST, KLASIFIKASI_LIST, STATUS_KONFIRMASI, PROGRESS_APPROVAL, fmtNoBukti });

const PJ_SUBS = [
  { id:'katalog',    label:'Katalog Pelanggan' },
  { id:'konfirmasi', label:'Konfirmasi Penjualan' },
  { id:'salesorder', label:'Sales Order' },
  { id:'delivery',   label:'Delivery Order' },
  { id:'invoice',    label:'Invoice' },
  { id:'retur',      label:'Sales Return' },
];

// ─── Dashboard ──────────────────────────────────────────────────────────────

function PelangganDashboard({ onOpenSub, onNavigate, pelanggan, konfirmasi, salesOrders, invoices, salesReturns, deliveryOrders }) {
  const totalPel = pelanggan.length;
  const aktifPel = pelanggan.filter(p => p.email).length;
  const pendingKonf = konfirmasi.filter(k => k.status === 'AKTIF' && !['DISETUJUI','SELESAI MANUAL'].includes(k.progressApproval)).length;
  const outstanding = invoices.filter(n => n.Status === 'Outstanding').reduce((s,n) => s+(n.Details||[]).reduce((t,d)=>t+pjLineTotal(d),0), 0);
  const returPending = salesReturns.filter(r => r.Status === 'Pending').length;
  const omzet30 = invoices.reduce((s,n)=>s+(n.Details||[]).reduce((t,d)=>t+pjLineTotal(d),0), 0);

  const tiles = [
    { id:'katalog',    icon:I.users(20),   title:'Katalog Pelanggan',    desc:'Master data pelanggan, kontak, alamat, dan info perusahaan.', badge:`${totalPel} pelanggan`, count:`${aktifPel} aktif`, accent:null },
    { id:'konfirmasi', icon:I.cart(20),    title:'Konfirmasi Penjualan', desc:'Buat dan kelola konfirmasi pesanan pelanggan serta approval.', badge: pendingKonf > 0 ? `${pendingKonf} perlu approval` : null, badgeKind:'pulse', accent:'#0d9488' },
    { id:'salesorder', icon:I.list(20),    title:'Sales Order',          desc:'Order penjualan resmi setelah konfirmasi disetujui.', badge:`${salesOrders.length} order`, accent:'#0369a1' },
    { id:'delivery',   icon:I.truck(20),   title:'Delivery Order',       desc:'Surat jalan dan pengiriman barang ke pelanggan.', badge:`${deliveryOrders.length} DO`, accent:'#7c3aed' },
    { id:'invoice',    icon:I.invoice(20), title:'Invoice',              desc:'Penerbitan faktur/tagihan untuk pelanggan.', badge:`${invoices.filter(n=>n.Status==='Outstanding').length} outstanding`, accent:'#b45309' },
    { id:'retur',      icon:I.refresh(20), title:'Sales Return',         desc:'Catat retur barang dari pelanggan dan proses penggantian/refund.', badge: returPending > 0 ? `${returPending} pending` : null, badgeKind:'pulse', accent:'#b45309' },
  ];

  return (
    <div className="page" data-screen-label="04 Pelanggan — Dashboard">
      <div className="crumbs">
        <a onClick={() => onNavigate?.('home')} style={{cursor:'pointer'}}>Home</a><span className="sep">/</span>
        <span className="current">Pelanggan</span>
      </div>

      <div className="page-head">
        <div>
          <h1>Pelanggan Workspace</h1>
          <div className="sub">Kelola pelanggan, konfirmasi, sales order, delivery, invoice, dan sales return dalam satu workspace.</div>
        </div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn-sm">{I.refresh()} Refresh</button>
          <button className="btn btn-sm btn-primary" onClick={()=>onOpenSub('konfirmasi')}>{I.plus()} Konfirmasi Baru</button>
        </div>
      </div>

      <div className="kpi-strip">
        <div className="kpi">
          <div className="lbl">Total Pelanggan</div>
          <div className="val mono">{totalPel}</div>
          <div className="delta up">{aktifPel} aktif (kontak lengkap)</div>
        </div>
        <div className="kpi">
          <div className="lbl">Omzet (30 Hari)</div>
          <div className="val mono">{fmtRp(omzet30)}</div>
          <div className="delta up">▲ 6.2% vs bulan lalu</div>
        </div>
        <div className="kpi">
          <div className="lbl">Outstanding Piutang</div>
          <div className="val mono" style={{color: outstanding > 50000000 ? 'var(--warn)' : 'var(--text)'}}>{fmtRp(outstanding)}</div>
          <div className="delta down">{invoices.filter(n=>n.Status==='Outstanding').length} invoice belum lunas</div>
        </div>
        <div className="kpi">
          <div className="lbl">Konfirmasi & Retur Aktif</div>
          <div className="val mono">{konfirmasi.length + salesReturns.length}</div>
          <div className="delta">{pendingKonf + returPending} menunggu tindakan</div>
        </div>
      </div>

      <h3 className="section-title">Modul Pelanggan <span className="count">{tiles.length}</span></h3>
      <div className="tile-grid">
        {tiles.map(t => (
          <button key={t.id} className="tile" onClick={()=>onOpenSub(t.id)}>
            <div className="tile-head">
              <div className="tile-icon-wrap" style={t.accent ? { background: t.accent + '14', color: t.accent } : null}>{t.icon}</div>
              {t.badge && <span className={`tile-badge ${t.badgeKind === 'pulse' ? 'pulse' : ''}`}>{t.badge}</span>}
            </div>
            <div>
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
            </div>
            {t.count && <div className="tile-foot"><b style={{color:'var(--text-2)', fontWeight:600}}>{t.count}</b> {I.arrowR(11)}</div>}
          </button>
        ))}
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:16, marginTop:32}}>
        <div className="panel">
          <h3>Top Pelanggan (30 Hari)</h3>
          <div style={{display:'flex', flexDirection:'column', gap:14}}>
            {[
              ['Toko Jaya Abadi', 35311000, 95],
              ['INDOMILK 2',      23665000, 64],
              ['Pelanggan 3',      9812000, 26],
              ['PELANGGAN I',      6237000, 17],
              ['Sari Mart',        4675000, 13],
            ].map(([nm, val, pct]) => (
              <div key={nm}>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:12.5, marginBottom:5}}>
                  <span>{nm}</span><span className="mono muted">{fmtRp(val)}</span>
                </div>
                <div style={{height:6, background:'var(--bg-sub)', borderRadius:999, overflow:'hidden'}}>
                  <div style={{height:'100%', width:pct+'%', background:'linear-gradient(90deg, var(--primary), var(--accent))', borderRadius:999}} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <h3>Aktivitas Penjualan Terkini</h3>
          <div className="timeline">
            <div className="timeline-item done">
              <div className="ti-when">Hari ini · 14:22</div>
              <div className="ti-what"><b className="ti-who">Sales Baru 2</b> menerbitkan invoice <span className="cell-link mono">NJ-2026-0231</span> · Sari Mart</div>
            </div>
            <div className="timeline-item done">
              <div className="ti-when">Hari ini · 11:08</div>
              <div className="ti-what"><b className="ti-who">Sistem</b> retur dari Toko Jaya Abadi disetujui · {fmtRp(1180000)}</div>
            </div>
            <div className="timeline-item">
              <div className="ti-when">Kemarin · 16:30</div>
              <div className="ti-what"><b className="ti-who">Sales Senior</b> membuat konfirmasi <span className="cell-link mono">KKO20260001</span></div>
            </div>
            <div className="timeline-item">
              <div className="ti-when">Kemarin · 09:12</div>
              <div className="ti-what"><b className="ti-who">Admin</b> menambah pelanggan baru: PELANGGAN BARU</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Header helper ──────────────────────────────────────────────────────────

function PjHeader({ title, sub, onAdd, addLabel='Tambah', extra, onRefresh, onExport }) {
  return (
    <div className="page-head">
      <div><h1>{title}</h1><div className="sub">{sub}</div></div>
      <div style={{display:'flex', gap:8}}>
        <button className="btn btn-sm" onClick={onRefresh || (()=>window.__erpToast && window.__erpToast('Data diperbarui.'))}>{I.refresh()} Refresh</button>
        <button className="btn btn-sm" onClick={onExport || (()=>window.__erpToast && window.__erpToast('Fitur export akan tersedia pada integrasi backend.'))}>{I.download()} Export</button>
        {extra}
        {onAdd && <button className="btn btn-primary" onClick={onAdd}>{I.plus()} {addLabel}</button>}
      </div>
    </div>
  );
}

// ─── 1. Katalog Pelanggan ───────────────────────────────────────────────────

function KatalogPelanggan({ rows, onAdd, onEdit, onDelete }) {
  const [q, setQ] = React.useState('');
  const [kota, setKota] = React.useState('');
  const [page, setPage] = React.useState(1);
  const perPage = 25;
  const filtered = rows.filter(p => {
    if (q) {
      const s = q.toLowerCase();
      if (!p.name.toLowerCase().includes(s) && !p.code.toLowerCase().includes(s) && !(p.pemilik||'').toLowerCase().includes(s)) return false;
    }
    if (kota && p.kota !== kota) return false;
    return true;
  });
  const kotas = [...new Set(rows.map(p => p.kota).filter(Boolean))];
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const curPage = Math.min(page, totalPages);
  const pageRows = filtered.slice((curPage-1)*perPage, curPage*perPage);
  const reset = () => { setQ(''); setKota(''); setPage(1); };

  return (
    <>
      <PjHeader title="Katalog Pelanggan" sub={`Jumlah: ${filtered.length} pelanggan`} onAdd={onAdd} addLabel="Tambah Pelanggan" />
      <div className="filter-bar">
        <div className="filter-grid">
          <div className="field">
            <label>Pencarian</label>
            <div className="input-w-icon">{I.search(14)}<input className="input" placeholder="Nama, kode, atau pemilik…" value={q} onChange={e=>{setQ(e.target.value); setPage(1);}}/></div>
          </div>
          <div className="field">
            <label>Kota</label>
            <select className="select" value={kota} onChange={e=>{setKota(e.target.value); setPage(1);}}>
              <option value="">Semua kota</option>
              {kotas.map(k => <option key={k}>{k}</option>)}
            </select>
          </div>
          <div className="filter-actions">
            <button className="btn" onClick={reset}>Reset</button>
          </div>
        </div>
      </div>

      <div className="table-card">
        <div className="table-toolbar">
          <div className="table-toolbar-left"><b>Jumlah: {filtered.length}</b></div>
        </div>
        <div className="table-scroll">
          <table className="data">
            <thead>
              <tr>
                <th>Nama Perusahaan</th>
                <th>Kode</th>
                <th>Alamat</th>
                <th>Kota</th>
                <th>Telepon</th>
                <th>Nama Pemilik</th>
                <th>NIK</th>
                <th>Email</th>
                <th>Kontak</th>
                <th style={{width:100}}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map(p => (
                <tr key={p.code} onClick={()=>onEdit(p)} style={p.flag === 'pink' ? { background: '#fde4ec' } : null}>
                  <td><span className="cell-link">{p.name}</span></td>
                  <td className="mono muted">{p.code}</td>
                  <td>{p.alamat || <span className="muted">—</span>}</td>
                  <td>{p.kota || <span className="muted">—</span>}</td>
                  <td className="mono">{p.tel || <span className="muted">—</span>}</td>
                  <td>{p.pemilik || <span className="muted">—</span>}</td>
                  <td className="mono">{p.nik || <span className="muted">—</span>}</td>
                  <td className={p.email ? 'cell-link' : ''}>{p.email || <span className="muted">—</span>}</td>
                  <td>{p.kontak || <span className="muted">—</span>}</td>
                  <td onClick={e=>e.stopPropagation()}>
                    <div className="row-actions">
                      <button className="btn btn-icon btn-sm" title="Edit" onClick={()=>onEdit(p)}>{I.edit()}</button>
                      <button className="btn btn-icon btn-sm" title="Email" onClick={()=>{
                        if (p.email) window.location.href = `mailto:${p.email}`;
                        else window.__erpToast && window.__erpToast('Email tidak tersedia.');
                      }}>{I.email()}</button>
                      <button className="btn btn-icon btn-sm del" title="Hapus" onClick={()=>{
                        if (window.confirm(`Hapus pelanggan ${p.name}?`)) onDelete(p.code);
                      }}>{I.trash()}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pager">
          <div>Menampilkan <b style={{color:'var(--text)'}}>{filtered.length === 0 ? 0 : (curPage-1)*perPage+1}</b>–<b style={{color:'var(--text)'}}>{Math.min(curPage*perPage, filtered.length)}</b> dari <b style={{color:'var(--text)'}}>{filtered.length}</b></div>
          <div className="pager-pages">
            {Array.from({length: totalPages}, (_,i)=>i+1).slice(0, 7).map(n => (
              <button key={n} className={n===curPage?'active':''} onClick={()=>setPage(n)}>{n}</button>
            ))}
          </div>
          <div>Tampilkan <b style={{color:'var(--text)'}}>{perPage}</b> per halaman</div>
        </div>
      </div>
    </>
  );
}

// ─── 2. Konfirmasi Penjualan list ─────────────────────────────────────────────

function statusKonfirmasiClass(s) {
  if (s === 'AKTIF') return 'realisasi';
  if (s === 'BATAL') return 'cancelled';
  if (s === 'SELESAI MANUAL') return 'realisasi';
  return 'draft';
}

function progressApprovalClass(p) {
  if (p === 'DISETUJUI') return 'realisasi';
  if (p && p.startsWith('DITOLAK')) return 'cancelled';
  return 'pending';
}

function KonfirmasiPenjualan({ rows, onAdd, onView, onCancel }) {
  const [q, setQ] = React.useState('');
  const [noBukti, setNoBukti] = React.useState('');
  const [tglDari, setTglDari] = React.useState('');
  const [tglSampai, setTglSampai] = React.useState('');
  const [customer, setCustomer] = React.useState('');
  const [status, setStatus] = React.useState('');

  const customers = React.useMemo(() => [...new Set(rows.map(k => k.customer))], [rows]);

  const filtered = rows.filter(k => {
    if (q) {
      const ql = q.toLowerCase();
      if (!k.noBukti.toLowerCase().includes(ql) &&
          !k.customer.toLowerCase().includes(ql) &&
          !(k.noReferensi || '').toLowerCase().includes(ql)) return false;
    }
    if (noBukti && k.noBukti !== noBukti) return false;
    if (tglDari && k.tglBukti < tglDari) return false;
    if (tglSampai && k.tglBukti > tglSampai) return false;
    if (customer && k.customer !== customer) return false;
    if (status && k.status !== status) return false;
    return true;
  });

  const isLocked = (k) => k.status === 'BATAL' || k.status === 'SELESAI MANUAL';
  const reset = () => { setQ(''); setNoBukti(''); setTglDari(''); setTglSampai(''); setCustomer(''); setStatus(''); };

  return (
    <>
      <PjHeader title="Konfirmasi Penjualan" sub="Konfirmasi Pesanan Pelanggan" onAdd={onAdd} addLabel="Konfirmasi Penjualan baru" />
      <div className="filter-bar">
        <div className="filter-grid" style={{gridTemplateColumns:'repeat(6, minmax(0,1fr)) auto'}}>
          <div className="field">
            <label>Pencarian</label>
            <div className="input-w-icon">{I.search(14)}<input className="input" placeholder="Pencarian…" value={q} onChange={e=>setQ(e.target.value)}/></div>
          </div>
          <div className="field">
            <label>No. Bukti</label>
            <select className="select" value={noBukti} onChange={e=>setNoBukti(e.target.value)}>
              <option value="">Semua</option>
              {rows.map(k => <option key={k.noBukti}>{k.noBukti}</option>)}
            </select>
          </div>
          <div className="field"><label>Tgl. Dari</label><input className="input" type="date" value={tglDari} onChange={e=>setTglDari(e.target.value)}/></div>
          <div className="field"><label>Tgl. Sampai</label><input className="input" type="date" value={tglSampai} onChange={e=>setTglSampai(e.target.value)}/></div>
          <div className="field">
            <label>Customer</label>
            <select className="select" value={customer} onChange={e=>setCustomer(e.target.value)}>
              <option value="">Semua</option>
              {customers.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Status</label>
            <select className="select" value={status} onChange={e=>setStatus(e.target.value)}>
              <option value="">Semua</option>
              {STATUS_KONFIRMASI.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="filter-actions" style={{alignSelf:'flex-end'}}>
            <button className="btn" onClick={reset}>Reset</button>
            <button className="btn btn-primary">{I.filter()} Cari</button>
          </div>
        </div>
      </div>

      <div className="table-card">
        <div className="table-toolbar">
          <div className="table-toolbar-left"><b>Total Item ({filtered.length})</b></div>
          <div className="table-toolbar-right">
            <button className="btn btn-primary btn-sm" onClick={onAdd}>{I.plus()} Konfirmasi Penjualan baru</button>
            <button className="btn btn-sm btn-icon" title="Refresh" onClick={()=>window.__erpToast && window.__erpToast('Data diperbarui.')}>{I.refresh()}</button>
            <button className="btn btn-sm btn-icon" title="Export" onClick={()=>window.__erpToast && window.__erpToast('Fitur export akan tersedia pada integrasi backend.')}>{I.download()}</button>
          </div>
        </div>
        <div className="table-scroll">
          <table className="data">
            <thead>
              <tr>
                <th style={{width:38}}><input type="checkbox" className="cb"/></th>
                <th>No. Bukti</th>
                <th>Tgl. Dari</th>
                <th>No. Referensi</th>
                <th>Customer</th>
                <th>Sales</th>
                <th>Cara Bayar</th>
                <th>Status</th>
                <th>Progress Approval</th>
                <th className="num">Jml. Item</th>
                <th className="num">Total Nilai</th>
                <th style={{width:100}}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(k => {
                const locked = isLocked(k);
                return (
                  <tr key={k.noBukti}>
                    <td onClick={e=>e.stopPropagation()}><input type="checkbox" className="cb"/></td>
                    <td><span className="cell-link mono" onClick={()=>onView(k)}>{k.noBukti}</span></td>
                    <td>{k.tglDari}</td>
                    <td className="muted">{k.noReferensi || '—'}</td>
                    <td>{k.customer}</td>
                    <td>{k.sales}</td>
                    <td><span className={`pill ${k.caraBayar==='TUNAI'?'realisasi':'pending'}`}>{k.caraBayar}</span></td>
                    <td><span className={`pill ${statusKonfirmasiClass(k.status)}`}>{k.status}</span></td>
                    <td><span className={`pill ${progressApprovalClass(k.progressApproval)}`}>{k.progressApproval}</span></td>
                    <td className="num mono">{k.jmlItem}</td>
                    <td className="num mono">{fmtRp(k.totalNilai)}</td>
                    <td onClick={e=>e.stopPropagation()}>
                      <div className="row-actions">
                        <button className="btn btn-icon btn-sm" title={locked?'Lihat':'Edit'} onClick={()=>onView(k)}>{locked ? I.zoom(14) : I.edit()}</button>
                        <button className="btn btn-icon btn-sm" title="Cetak" onClick={()=>window.__erpToast && window.__erpToast('Fitur cetak belum tersedia pada prototipe ini.')}>{I.print()}</button>
                        <button className="btn btn-icon btn-sm del" title="Batalkan Pesanan" disabled={locked} onClick={()=>{
                          if (window.confirm(`Batalkan konfirmasi ${k.noBukti}?`)) onCancel(k.noBukti);
                        }}>
                          {I.x(14)}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// ─── Konfirmasi Penjualan detail/edit modal ──────────────────────────────────

function KonfirmasiPenjualanModal({ data, onClose, onSave }) {
  const [mode, setMode] = React.useState(data ? 'VIEW' : 'CREATE');
  const isCreate = mode === 'CREATE';
  const isView = mode === 'VIEW';
  const isEdit = mode === 'EDIT';

  const buildEmpty = () => ({
    noBukti: '',
    tglBukti: '2026-07-11',
    noReferensi: '',
    customer: '',
    kodeCustomer: '',
    sales: '',
    caraBayar: 'TUNAI',
    status: 'AKTIF',
    progressApproval: 'PENGAJUAN SPV',
    jmlItem: 0,
    totalNilai: 0,
    createdBy: 'PDJ Administrator',
    createdAt: '',
    editedBy: 'PDJ Administrator',
    editedAt: '',
    approval: { level: 'Level 1 - Supervisor', status: 'PENGAJUAN', approvedBy: '', approvedAt: '' },
    informasiUmum: { noRef: '', estimasiKirim: '', incoterm: 'Franco', klasifikasi: 'Retail', attn: '', namaHpPenerima: '', telepon: '', email: '', alamatCustomer: '', keterangan: '', alamatPengiriman: '', jenisKendaraan: '' },
    pembayaran: { tempo: 0, dp: 0, payment2: 0, payment3: 0, akun: 'BANK BCA', berlakuSampai: '' },
    barang: []
  });

  const [form, setForm] = React.useState(data || buildEmpty());
  const [snapshotForm, setSnapshotForm] = React.useState(null);

  const [noBuktiRaw, setNoBuktiRaw] = React.useState('');
  const [noBuktiError, setNoBuktiError] = React.useState('');
  const noBuktiRef = React.useRef(null);
  const [confirmModal, setConfirmModal] = React.useState(null);

  React.useEffect(() => {
    if (isCreate && noBuktiRef.current) noBuktiRef.current.focus();
  }, [isCreate]);

  const [activeTab, setActiveTab] = React.useState('informasi');
  const infoRef = React.useRef(null);
  const bayarRef = React.useRef(null);
  const barangRef = React.useRef(null);
  const modalBodyRef = React.useRef(null);

  const scrollTo = (ref) => {
    if (ref.current && modalBodyRef.current) {
      const bodyRect = modalBodyRef.current.getBoundingClientRect();
      const refRect = ref.current.getBoundingClientRect();
      modalBodyRef.current.scrollBy({ top: refRect.top - bodyRect.top - 80, behavior: 'smooth' });
    }
  };

  const setApproval = (patch) => setForm(f => ({ ...f, approval: { ...f.approval, ...patch } }));
  const setInfo = (patch) => setForm(f => ({ ...f, informasiUmum: { ...f.informasiUmum, ...patch } }));
  const setBayar = (patch) => setForm(f => ({ ...f, pembayaran: { ...f.pembayaran, ...patch } }));
  const setBarang = (barang) => setForm(f => ({ ...f, barang }));

  const subtotal = form.barang.reduce((s, b) => s + (b.total || 0), 0);
  const ppnPct = 11;
  const ppnMode = 'Exclude';
  const ppnRp = ppnMode === 'Exclude' ? Math.round(subtotal * ppnPct / 100) : 0;
  const totalNetto = subtotal + ppnRp;

  const isLocked = form.status === 'BATAL' || form.status === 'SELESAI MANUAL';
  const disabled = isView || isLocked;

  const handleNoBuktiChange = (val) => {
    const v = val.toUpperCase();
    setNoBuktiRaw(v);
    if (!v) setNoBuktiError('No. Bukti harus di isi');
    else if (!['F','K'].includes(v[0])) setNoBuktiError('Format no Bukti salah');
    else setNoBuktiError('');
  };

  const noBuktiLocked = isCreate && (!noBuktiRaw || !['F','K'].includes(noBuktiRaw[0]));

  const handleApprove = () => {
    setApproval({ status: 'DISETUJUI', approvedBy: 'Admin', approvedAt: new Date().toLocaleString('id-ID') });
    setForm(f => ({ ...f, progressApproval: 'DISETUJUI' }));
  };
  const handleReject = () => {
    setApproval({ status: 'DITOLAK' });
    setForm(f => ({ ...f, progressApproval: 'DITOLAK SPV' }));
  };

  const resetToCreate = () => {
    setForm(buildEmpty());
    setNoBuktiRaw('');
    setNoBuktiError('');
    setSnapshotForm(null);
    setMode('CREATE');
  };

  const enterEditMode = () => {
    setSnapshotForm({...form});
    setMode('EDIT');
  };

  const handleCancelEdit = () => {
    if (snapshotForm) {
      setForm(snapshotForm);
    }
    setSnapshotForm(null);
    setMode('VIEW');
  };

  const handleSave = (andClose=false) => {
    let saved = form;
    if (isCreate) {
      const fullNo = (noBuktiRaw[0] || '') + 'KO' + new Date().toISOString().slice(2,4) + new Date().toISOString().slice(5,7) + String(Math.floor(Math.random()*9000)+1000);
      saved = { ...form, noBukti: fullNo };
      setForm(saved);
    }
    // Filter out soft-deleted items
    if (Array.isArray(saved.items)) {
      saved = { ...saved, items: saved.items.filter(r => !r._deleted).map(r => { const { _deleted, _added, ...rest } = r; return rest; }) };
    }
    onSave && onSave(saved);
    if (andClose) { onClose(); return; }
    if (isEdit) { setMode('VIEW'); }
    else { resetToCreate(); }
    window.__erpToast && window.__erpToast('Konfirmasi order berhasil disimpan.');
  };

  const titleText = isCreate ? 'Tambah Konfirmasi Order' : isEdit ? `Edit Konfirmasi Order - ${form.noBukti}` : `Konfirmasi Order - ${form.noBukti}`;

  return (
    <>
      <div className="modal-backdrop">
        <div className="modal modal-wide" onClick={e=>e.stopPropagation()} style={{maxHeight: '92vh'}}>
          <div className="modal-head">
            <div>
              <h2 style={{display:'flex', alignItems:'center', gap:10, flexWrap:'wrap'}}>
                {titleText}
                {isLocked && <span className={`status-badge ${form.status==='BATAL'?'batal':'selesai'}`}>{form.status==='BATAL'?'BATAL':'SELESAI MANUAL'}</span>}
              </h2>
              <div className="sub">Dibuat: {form.createdBy} {form.createdAt}{form.editedAt ? ` | Diedit: ${form.editedBy} ${form.editedAt}` : ''}</div>
            </div>
            <button className="btn btn-icon" onClick={onClose}>{I.x(16)}</button>
          </div>

          <div className="scroll-nav-bar">
            <button className={activeTab==='informasi'?'active':''} onClick={()=>{setActiveTab('informasi'); scrollTo(infoRef);}}>Informasi Umum</button>
            <button className={activeTab==='pembayaran'?'active':''} onClick={()=>{setActiveTab('pembayaran'); scrollTo(bayarRef);}}>Pembayaran</button>
            <button className={activeTab==='barang'?'active':''} onClick={()=>{setActiveTab('barang'); scrollTo(barangRef);}}>Barang</button>
          </div>

          <div className="modal-body modal-body-scroll" ref={modalBodyRef}>
            <div className="scroll-modal-layout">
              <div className="scroll-modal-main">
                {isLocked && (
                  <div className="alasan-section" style={{marginBottom:16}}>
                    <h3>{form.status==='BATAL'?'Alasan Batal':'Alasan Selesai'}</h3>
                    <div className={`alasan-box ${form.status==='BATAL'?'batal':'selesai'}`}>
                      <span className="icon">{form.status==='BATAL'?I.x(16):I.check(16)}</span>
                      <span>{form.Alasan_Status || (form.status==='BATAL'?'Transaksi dibatalkan':'Transaksi diselesaikan manual')}</span>
                    </div>
                  </div>
                )}
                <div className="panel" style={{marginBottom:16}}>
                  <h3>Status Persetujuan</h3>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:16, flexWrap:'wrap'}}>
                    <div>
                      <div style={{fontSize:13, fontWeight:500}}>{form.approval.level}</div>
                      <div style={{fontSize:12, color:'var(--text-3)', marginTop:2}}>
                        {form.approval.approvedBy ? `Oleh ${form.approval.approvedBy} ${form.approval.approvedAt}` : 'Menunggu persetujuan'}
                      </div>
                    </div>
                    <div style={{display:'flex', alignItems:'center', gap:10}}>
                      <span className={`pill ${progressApprovalClass(form.progressApproval)}`}>{form.progressApproval}</span>
                      {!disabled && (
                        <div style={{display:'flex', gap:6}}>
                          <button className="btn btn-primary btn-sm" onClick={handleApprove}>{I.check()} Approve</button>
                          <button className="btn btn-sm" style={{color:'var(--danger)', borderColor:'var(--danger)'}} onClick={handleReject}>{I.x(14)} Tolak</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div ref={infoRef} className="panel scroll-section" style={{marginBottom:16}}>
                  <h3>Informasi Umum</h3>
                  <div style={{display:'grid', gridTemplateColumns:'repeat(4, minmax(0,1fr))', gap:12}}>
                    {isCreate ? (
                      <div className="field">
                        <label>No. Bukti <span style={{color:'var(--danger)'}}>*</span></label>
                        <input ref={noBuktiRef} className="input mono" type="text" value={noBuktiRaw} onChange={e=>handleNoBuktiChange(e.target.value)} placeholder="Ketik F atau K" maxLength={1} />
                        {noBuktiError && <div className="no-bukti-alert">{noBuktiError}</div>}
                      </div>
                    ) : (
                      <div className="view-field"><label>No. Bukti</label><div className="view-value mono">{form.noBukti}</div></div>
                    )}
                    <div className="field"><label>Tgl. Bukti <span style={{color:'var(--danger)'}}>*</span></label><input className="input" type="date" value={form.tglBukti} onChange={e=>setForm(f=>({...f,tglBukti:e.target.value}))} disabled={disabled}/></div>
                    <div className="field"><label>No. Ref</label><input className="input" value={form.informasiUmum.noRef} onChange={e=>setInfo({noRef:e.target.value})} disabled={disabled}/></div>
                    <div className="field"><label>Estimasi Tgl. kirim <span style={{color:'var(--danger)'}}>*</span></label><input className="input" type="date" value={form.informasiUmum.estimasiKirim} onChange={e=>setInfo({estimasiKirim:e.target.value})} disabled={disabled}/></div>

                    <div className="field"><label>Customer <span style={{color:'var(--danger)'}}>*</span></label><select className="select" value={form.customer} onChange={e=>setForm(f=>({...f,customer:e.target.value}))} disabled={disabled}><option value="">— Pilih —</option>{PELANGGAN.map(p=><option key={p.code} value={p.name}>{p.name}</option>)}</select></div>
                    <div className="field"><label>Kode Customer</label><input className="input" value={form.kodeCustomer} onChange={e=>setForm(f=>({...f,kodeCustomer:e.target.value}))} disabled={disabled}/></div>
                    <div className="field"><label>Klasifikasi <span style={{color:'var(--danger)'}}>*</span></label><select className="select" value={form.informasiUmum.klasifikasi} onChange={e=>setInfo({klasifikasi:e.target.value})} disabled={disabled}><option value="">— Pilih —</option>{KLASIFIKASI_LIST.map(k=><option key={k}>{k}</option>)}</select></div>
                    <div className="field"><label>Attn - PIC <span style={{color:'var(--danger)'}}>*</span></label><input className="input" value={form.informasiUmum.attn} onChange={e=>setInfo({attn:e.target.value})} disabled={disabled}/></div>

                    <div className="field"><label>Sales <span style={{color:'var(--danger)'}}>*</span></label><select className="select" value={form.sales} onChange={e=>setForm(f=>({...f,sales:e.target.value}))} disabled={disabled}><option value="">— Pilih —</option>{SALES_LIST.map(s=><option key={s}>{s}</option>)}</select></div>
                    <div className="field"><label>Telepon / HP</label><input className="input" value={form.informasiUmum.telepon} onChange={e=>setInfo({telepon:e.target.value})} disabled={disabled}/></div>
                    <div className="field"><label>Email</label><input className="input" type="email" value={form.informasiUmum.email} onChange={e=>setInfo({email:e.target.value})} disabled={disabled}/></div>
                    <div className="field"><label>Nama & HP Penerima</label><input className="input" value={form.informasiUmum.namaHpPenerima} onChange={e=>setInfo({namaHpPenerima:e.target.value})} disabled={disabled}/></div>

                    <div className="field" style={{gridColumn:'span 2'}}><label>Alamat Customer</label><textarea className="textarea" value={form.informasiUmum.alamatCustomer} onChange={e=>setInfo({alamatCustomer:e.target.value})} disabled={disabled}/></div>
                    <div className="field" style={{gridColumn:'span 2'}}><label>Keterangan</label><textarea className="textarea" value={form.informasiUmum.keterangan} onChange={e=>setInfo({keterangan:e.target.value})} disabled={disabled}/></div>

                    <div className="field" style={{gridColumn:'span 2'}}><label>Alamat Pengiriman / ambil</label><textarea className="textarea" value={form.informasiUmum.alamatPengiriman} onChange={e=>setInfo({alamatPengiriman:e.target.value})} disabled={disabled}/></div>
                    <div className="field"><label>Jenis Kendaraan</label><input className="input" value={form.informasiUmum.jenisKendaraan} onChange={e=>setInfo({jenisKendaraan:e.target.value})} disabled={disabled}/></div>
                    <div className="field"><label>Incoterm <span style={{color:'var(--danger)'}}>*</span></label><select className="select" value={form.informasiUmum.incoterm} onChange={e=>setInfo({incoterm:e.target.value})} disabled={disabled}><option value="">— Pilih —</option>{INCOTERM_LIST.map(i=><option key={i}>{i}</option>)}</select></div>
                  </div>
                </div>

                <div ref={bayarRef} className="panel scroll-section" style={{marginBottom:16}}>
                  <h3>Pembayaran</h3>
                  <div style={{display:'grid', gridTemplateColumns:'repeat(3, minmax(0,1fr))', gap:12}}>
                    <div className="field"><label>Cara Bayar <span style={{color:'var(--danger)'}}>*</span></label><select className="select" value={form.caraBayar} onChange={e=>setForm(f=>({...f,caraBayar:e.target.value}))} disabled={disabled}><option value="">— Pilih —</option>{CARA_BAYAR.map(c=><option key={c}>{c}</option>)}</select></div>
                    <div className="field"><label>Tempo (Hari)</label><input className="input mono" type="number" value={form.pembayaran.tempo} onChange={e=>setBayar({tempo:+e.target.value})} disabled={disabled}/></div>
                    <div className="field"><label>Payment 1 / DP</label><input className="input mono" type="number" value={form.pembayaran.dp} onChange={e=>setBayar({dp:+e.target.value})} disabled={disabled}/></div>

                    <div className="field"><label>Akun Pembayaran <span style={{color:'var(--danger)'}}>*</span></label><select className="select" value={form.pembayaran.akun} onChange={e=>setBayar({akun:e.target.value})} disabled={disabled}><option value="">— Pilih —</option>{AKUN_TUNAI.map(a=><option key={a}>{a}</option>)}</select></div>
                    <div className="field"><label>Berlaku Sampai</label><input className="input" type="date" value={form.pembayaran.berlakuSampai} onChange={e=>setBayar({berlakuSampai:e.target.value})} disabled={disabled}/></div>
                    <div className="field"><label>Payment 2</label><input className="input mono" type="number" value={form.pembayaran.payment2} onChange={e=>setBayar({payment2:+e.target.value})} disabled={disabled}/></div>

                    <div className="field"><label>Payment 3</label><input className="input mono" type="number" value={form.pembayaran.payment3} onChange={e=>setBayar({payment3:+e.target.value})} disabled={disabled}/></div>
                  </div>
                </div>

                <div ref={barangRef} className="panel scroll-section" style={{marginBottom:16}}>
                  <h3>Barang</h3>
                  <div className={`line-items ${disabled ? 'view-only' : ''}`}>
                    <table>
                      <thead>
                        <tr>
                          <th>Kode</th>
                          <th>Nama Barang</th>
                          <th>Catatan Pelanggan</th>
                          <th className="num">Jumlah</th>
                          <th>Sat. Brg</th>
                          <th className="num">Hrg. Satuan</th>
                          <th className="num">Total Rp</th>
                          {!disabled && <th style={{width:40}}></th>}
                        </tr>
                      </thead>
                      <tbody>
                        {form.barang.length === 0 && (
                          <tr><td colSpan={disabled?7:8} className="empty">Belum ada barang.</td></tr>
                        )}
                        {form.barang.map((b, idx) => (
                          <tr key={idx}>
                            {disabled ? (
                              <><td className="mono">{b.kode}</td><td>{b.nama}</td><td>{b.catatan}</td></>
                            ) : (
                              <>
                                <td><input className="cell" value={b.kode} onChange={e=>{const nb=[...form.barang]; nb[idx]={...b,kode:e.target.value}; setBarang(nb);}}/></td>
                                <td><input className="cell" value={b.nama} onChange={e=>{const nb=[...form.barang]; nb[idx]={...b,nama:e.target.value}; setBarang(nb);}}/></td>
                                <td><input className="cell" value={b.catatan} onChange={e=>{const nb=[...form.barang]; nb[idx]={...b,catatan:e.target.value}; setBarang(nb);}}/></td>
                              </>
                            )}
                            {disabled ? <td className="num mono">{b.jumlah}</td> : <td><input className="cell num" type="number" value={b.jumlah} onChange={e=>{const nb=[...form.barang]; nb[idx]={...b,jumlah:+e.target.value,total:+e.target.value*b.harga}; setBarang(nb);}}/></td>}
                            {disabled ? <td>{b.satuan}</td> : <td><input className="cell" value={b.satuan} onChange={e=>{const nb=[...form.barang]; nb[idx]={...b,satuan:e.target.value}; setBarang(nb);}}/></td>}
                            {disabled ? <td className="num mono">{fmtRp(b.harga)}</td> : <td><input className="cell num" type="number" value={b.harga} onChange={e=>{const nb=[...form.barang]; nb[idx]={...b,harga:+e.target.value,total:b.jumlah*+e.target.value}; setBarang(nb);}}/></td>}
                            <td className="num mono">{fmtRp(b.total)}</td>
                            {!disabled && <td><button className="btn btn-icon btn-sm del" onClick={()=>setBarang(form.barang.filter((_,i)=>i!==idx))}>{I.trash()}</button></td>}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {!disabled && (
                      <div className="add-row">
                        <button className="btn btn-ghost btn-sm" onClick={()=>setBarang([...form.barang,{kode:'',nama:'',catatan:'',jumlah:1,satuan:'PCS',harga:0,total:0}])}>{I.plus()} Tambah Barang</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="scroll-modal-side">
                <div className="panel" style={{padding:0, overflow:'hidden'}}>
                  <div style={{background:'var(--primary)', color:'#fff', padding:'12px 16px', fontSize:12, fontWeight:600, textTransform:'uppercase', letterSpacing:'.04em'}}>Ringkasan Konfirmasi Order</div>
                  <div style={{padding:'12px 16px', display:'flex', flexDirection:'column', gap:10, fontSize:13}}>
                    <div style={{display:'flex', justifyContent:'space-between'}}><span>Barang ({form.barang.length})</span><span className="mono">{fmtRp(subtotal)}</span></div>
                    <div style={{display:'flex', justifyContent:'space-between'}}><span>Subtotal</span><span className="mono">{fmtRp(subtotal)}</span></div>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                      <span>PPN</span>
                      <span style={{display:'flex', alignItems:'center', gap:6}}>
                        <input className="input mono" type="number" value={ppnPct} style={{width:50, height:26, textAlign:'right'}} disabled/>
                        <span>%</span>
                        <select className="select" value={ppnMode} style={{width:90, height:26}} disabled><option>Exclude</option></select>
                      </span>
                      <span className="mono">{fmtRp(ppnRp)}</span>
                    </div>
                    <div style={{borderTop:'1px solid var(--border)', paddingTop:10, display:'flex', justifyContent:'space-between', fontWeight:600, fontSize:15}}>
                      <span>Total Netto</span><span className="mono" style={{color:'var(--primary)'}}>{fmtRp(totalNetto)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-foot">
            <div className="muted" style={{fontSize:12.5}}><kbd>Esc</kbd> untuk batal</div>
            <div className="right" style={{display:'flex', gap:8}}>
              {isView && !isLocked && (
                <>
                  <button className="btn btn-primary" onClick={enterEditMode}>{I.edit()} Edit</button>
                  <button className="btn btn-danger" onClick={()=>setConfirmModal({kind:'batal'})}>{I.x(14)} Batalkan Transaksi</button>
                  <button className="btn btn-success" onClick={()=>setConfirmModal({kind:'selesai'})}>{I.check()} Selesaikan Manual</button>
                </>
              )}
              {isView && <button className="btn" onClick={()=>window.__erpToast && window.__erpToast('Fitur cetak belum tersedia pada prototipe ini.')}>{I.print()} Cetak</button>}
              {(isCreate || isEdit) && (
                <>
                  <button className="btn" onClick={isEdit ? handleCancelEdit : onClose}>{isEdit ? 'Batal' : 'Tutup'}</button>
                  <button className="btn btn-primary btn-soft" onClick={()=>handleSave(true)}>{I.check()} Simpan & Tutup</button>
                  <button className="btn btn-primary" onClick={()=>handleSave(false)} disabled={isCreate && noBuktiLocked}>{I.check()} Simpan</button>
                </>
              )}
              {isView && <button className="btn" onClick={onClose}>Tutup</button>}
            </div>
          </div>
        </div>
      </div>

      {confirmModal && (
        <ConfirmationModal
          title={confirmModal.kind==='batal'?'Batalkan Transaksi':'Selesaikan Manual'}
          message={confirmModal.kind==='batal'?'Masukkan alasan pembatalan transaksi ini.':'Masukkan alasan penyelesaian manual transaksi ini.'}
          confirmLabel={confirmModal.kind==='batal'?'Batalkan':'Selesaikan'}
          confirmKind={confirmModal.kind==='batal'?'danger':'success'}
          onCancel={()=>setConfirmModal(null)}
          onConfirm={(reason)=>{
            if (confirmModal.kind==='batal') {
              const updated = { ...form, status:'BATAL' };
              setForm(updated);
              onSave && onSave(updated);
              window.__erpToast && window.__erpToast('Transaksi dibatalkan.');
            } else {
              const updated = { ...form, status:'SELESAI MANUAL' };
              setForm(updated);
              onSave && onSave(updated);
              window.__erpToast && window.__erpToast('Transaksi diselesaikan manual.');
            }
            setConfirmModal(null);
          }}
        />
      )}
    </>
  );
}

// ─── Modals ─────────────────────────────────────────────────────────────────

function PjModalShell({ title, sub, onClose, onSave, children, saveLabel = 'Simpan', wide = false }) {
  return (
    <div className="modal-backdrop">
      <div className="modal" onClick={e=>e.stopPropagation()} style={wide ? {maxWidth: 1100} : {maxWidth: 700}}>
        <div className="modal-head">
          <div><h2>{title}</h2>{sub && <div className="sub">{sub}</div>}</div>
          <button className="btn btn-icon" onClick={onClose}>{I.x(16)}</button>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-foot">
          <div className="muted" style={{fontSize:12.5}}><kbd>Esc</kbd> untuk batal</div>
          <div className="right" style={{display:'flex', gap:8}}>
            <button className="btn" onClick={onClose}>Batal</button>
            <button className="btn btn-primary" onClick={onSave}>{I.check()} {saveLabel}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InlineTable({ title, columns, rows, setRows, addLabel, shortcut, disabled }) {
  const update = (idx, key, value) => {
    const next = [...rows];
    next[idx] = { ...next[idx], [key]: value };
    setRows(next);
  };
  const softDelete = (idx) => { const next=[...rows]; next[idx]={...next[idx],_deleted:true}; setRows(next); };
  const restore = (idx) => { const next=[...rows]; next[idx]={...next[idx],_deleted:false}; setRows(next); };
  const add = () => setRows([...rows, { ...Object.fromEntries(columns.map(c => [c.key, c.type === 'number' ? 0 : ''])), _added:true }]);
  return (
    <div className="inline-table">
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8}}>
        <h3 style={{margin:0}}>{title}</h3>
        {!disabled && <button className="btn btn-primary btn-sm" onClick={add}>{I.plus()} {addLabel}</button>}
      </div>
      {shortcut && !disabled && (
        <div style={{textAlign:'right', fontSize:12, color:'var(--text-3)', marginBottom:8}}>
          Tambah: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>{shortcut}</kbd>
        </div>
      )}
      <div className={`line-items ${disabled ? 'view-only' : ''}`} style={{maxHeight: 280, overflowY:'auto', overflowX:'auto'}}>
        <table>
          <thead>
            <tr>
              {columns.map(c => <th key={c.key} style={c.width ? {width:c.width} : c.style || {}}>{c.label}</th>)}
              {!disabled && <th style={{width:40}}></th>}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && <tr><td colSpan={columns.length + (disabled?0:1)} className="empty">Belum ada data.</td></tr>}
            {rows.map((r, idx) => (
              <tr key={idx} className={`${r._deleted ? 'row-deleted' : ''} ${r._added ? 'row-added' : ''}`} title={r._deleted ? 'Barang ini akan dihapus' : ''}>
                {columns.map(c => (
                  <td key={c.key}>
                    {disabled || r._deleted ? (
                      <span className={`cell ${c.num ? 'num mono' : c.mono ? 'mono' : ''}`} style={{display:'block',padding:'4px 0'}}>{r[c.key]}</span>
                    ) : (
                      <input
                        className={`cell ${c.num ? 'num mono' : c.mono ? 'mono' : ''}`}
                        type={c.type || 'text'}
                        value={r[c.key]}
                        onChange={e => update(idx, c.key, c.type === 'number' ? +e.target.value : e.target.value)}
                      />
                    )}
                  </td>
                ))}
                {!disabled && (
                  <td>
                    {r._deleted ? (
                      <button className="btn btn-icon btn-sm" style={{color:'var(--realisasi)'}} onClick={()=>restore(idx)} title="Restore">{I.refresh(14)}</button>
                    ) : (
                      <button className="btn btn-icon btn-sm del" onClick={()=>softDelete(idx)}>{I.trash()}</button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PelangganModal({ data, onClose, onSave }) {
  const isEdit = !!data;
  const empty = {
    name:'', code:'', alamat:'', kota:'', tel:'', pemilik:'', nik:'', email:'', kontak:'', flag:null,
    salesman:'', noKtp:'', namaKtp:'', tglLahir:'', owner:'', namaPemesan:'',
    area:'', kodeGabungan:'', golongan:'Baik', kodePos:'', fax:'', klasifikasi:'Retail', fk:'Fiskal', status:'Aktif', keterangan:'', alamatKirim:'',
    noNpwp:'', jenisHarga:'Standar', namaPajak:'', kotaPajak:'', plafon:0, plafonTemp:0, alamatPajak:'',
    tempo:0, tempoLama:0, tempoKom:0, virtualAc:'', alamatTagih:'',
    expedisi:[], alamatKirimList:[], npwpList:[], saldoTitipan:[], saldoPiutang:[]
  };
  const [form, setForm] = React.useState(() => {
    const base = data ? {...empty, ...data} : {...empty};
    ['expedisi','alamatKirimList','npwpList','saldoTitipan','saldoPiutang'].forEach(k => { if (!Array.isArray(base[k])) base[k] = []; });
    return base;
  });
  const [activeSection, setActiveSection] = React.useState('dasar');
  const modalBodyRef = React.useRef(null);
  const dasarRef = React.useRef(null);
  const pajakRef = React.useRef(null);
  const expedisiRef = React.useRef(null);
  const alamatRef = React.useRef(null);
  const npwpRef = React.useRef(null);
  const titipanRef = React.useRef(null);
  const piutangRef = React.useRef(null);

  const set = (k,v) => setForm(f => ({...f, [k]: v}));
  const setArr = (k,v) => setForm(f => ({...f, [k]: v}));

  const scrollTo = (ref) => {
    if (ref.current && modalBodyRef.current) {
      const bodyRect = modalBodyRef.current.getBoundingClientRect();
      const refRect = ref.current.getBoundingClientRect();
      modalBodyRef.current.scrollBy({ top: refRect.top - bodyRect.top - 16, behavior: 'smooth' });
    }
  };

  const sections = [
    { id:'dasar',    label:'Informasi Dasar',    ref:dasarRef },
    { id:'pajak',    label:'Pajak & Kredit',     ref:pajakRef },
    { id:'expedisi', label:'Expedisi Customer',  ref:expedisiRef },
    { id:'alamat',   label:'Alamat Kirim',       ref:alamatRef },
    { id:'npwp',     label:'NPWP Customer',      ref:npwpRef },
    { id:'titipan',  label:'Saldo Titipan',      ref:titipanRef },
    { id:'piutang',  label:'Saldo Piutang',      ref:piutangRef },
  ];

  const handleDraft = () => {
    window.__erpToast && window.__erpToast('Draft pelanggan disimpan.');
    onSave && onSave(form);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal" onClick={e=>e.stopPropagation()} style={{maxWidth: 1100, maxHeight: '92vh'}}>
        <div className="modal-head">
          <div>
            <h2>{isEdit ? `Edit Pelanggan — ${form.code}` : 'Tambah Pelanggan Baru'}</h2>
            <div className="sub">{isEdit ? form.name : 'Pastikan semua kolom bertanda (*) terisi.'}</div>
          </div>
          <button className="btn btn-icon" onClick={onClose}>{I.x(16)}</button>
        </div>

        <div style={{padding:'10px 24px', borderBottom:'1px solid var(--border)', background:'var(--bg-elev)'}}>
          <div className="tabs-pills" style={{marginBottom:0}}>
            {sections.map(s => (
              <button key={s.id} className={activeSection===s.id?'active':''} onClick={()=>{setActiveSection(s.id); scrollTo(s.ref);}}>{s.label}</button>
            ))}
          </div>
        </div>

        <div className="modal-body" ref={modalBodyRef} style={{overflowY:'auto', maxHeight:'calc(92vh - 180px)', background:'var(--bg)', padding:'16px 24px'}}>
          <div ref={dasarRef} className="panel" style={{marginBottom:16}}>
            <h3>Informasi Dasar</h3>
            <div style={{display:'grid', gridTemplateColumns:'repeat(3, minmax(0,1fr))', gap:12}}>
              <div className="field"><label>Kode Customer <span style={{color:'var(--danger)'}}>*</span></label><input className="input mono" value={form.code} onChange={e=>set('code',e.target.value)}/></div>
              <div className="field"><label>Nama Customer <span style={{color:'var(--danger)'}}>*</span></label><input className="input" value={form.name} onChange={e=>set('name',e.target.value)}/></div>
              <div className="field"><label>Salesman</label><select className="select" value={form.salesman} onChange={e=>set('salesman',e.target.value)}><option value="">— Pilih —</option>{SALES_LIST.map(s=><option key={s}>{s}</option>)}</select></div>

              <div className="field"><label>No. KTP</label><input className="input mono" value={form.noKtp} onChange={e=>set('noKtp',e.target.value)}/></div>
              <div className="field"><label>Nama KTP</label><input className="input" value={form.namaKtp} onChange={e=>set('namaKtp',e.target.value)}/></div>
              <div className="field"><label>Tgl. Lahir</label><input className="input" type="datetime-local" value={form.tglLahir} onChange={e=>set('tglLahir',e.target.value)}/></div>

              <div className="field"><label>Owner</label><input className="input" value={form.owner} onChange={e=>set('owner',e.target.value)}/></div>
              <div className="field"><label>Nama Pemesan</label><input className="input" value={form.namaPemesan} onChange={e=>set('namaPemesan',e.target.value)}/></div>
              <div className="field"><label>Kode Gabungan</label><input className="input mono" value={form.kodeGabungan} onChange={e=>set('kodeGabungan',e.target.value)}/></div>

              <div className="field"><label>Area <span style={{color:'var(--danger)'}}>*</span></label><select className="select" value={form.area} onChange={e=>set('area',e.target.value)}><option value="">— Pilih —</option><option>Jabodetabek</option><option>Jawa Barat</option><option>Jawa Timur</option><option>Jawa Tengah</option><option>Sumatera</option></select></div>
              <div className="field"><label>Golongan <span style={{color:'var(--danger)'}}>*</span></label><select className="select" value={form.golongan} onChange={e=>set('golongan',e.target.value)}><option>Baik</option><option>Blokir</option><option>Blacklist</option></select></div>
              <div className="field"><label>Klasifikasi</label><select className="select" value={form.klasifikasi} onChange={e=>set('klasifikasi',e.target.value)}>{KLASIFIKASI_LIST.map(k=><option key={k}>{k}</option>)}</select></div>

              <div className="field"><label>Kota</label><input className="input" value={form.kota} onChange={e=>set('kota',e.target.value)}/></div>
              <div className="field"><label>Kode Pos</label><input className="input mono" value={form.kodePos} onChange={e=>set('kodePos',e.target.value)}/></div>
              <div className="field"><label>Fax</label><input className="input mono" value={form.fax} onChange={e=>set('fax',e.target.value)}/></div>

              <div className="field"><label>Telepon</label><input className="input mono" value={form.tel} onChange={e=>set('tel',e.target.value)}/></div>
              <div className="field"><label>Email</label><input className="input" type="email" value={form.email} onChange={e=>set('email',e.target.value)}/></div>
              <div className="field"><label>Kontak</label><input className="input" value={form.kontak} onChange={e=>set('kontak',e.target.value)}/></div>

              <div className="field" style={{gridColumn:'span 2'}}><label>Alamat</label><textarea className="textarea" value={form.alamat} onChange={e=>set('alamat',e.target.value)}/></div>
              <div className="field"><label>FK</label><select className="select" value={form.fk} onChange={e=>set('fk',e.target.value)}><option>Fiskal</option><option>Non Fiskal</option></select></div>

              <div className="field"><label>Status</label><select className="select" value={form.status} onChange={e=>set('status',e.target.value)}><option>Aktif</option><option>Non-aktif</option></select></div>
              <div className="field" style={{gridColumn:'span 2'}}><label>Keterangan</label><textarea className="textarea" value={form.keterangan} onChange={e=>set('keterangan',e.target.value)}/></div>

              <div className="field" style={{gridColumn:'span 3'}}><label>Alamat Kirim</label><textarea className="textarea" value={form.alamatKirim} onChange={e=>set('alamatKirim',e.target.value)}/></div>
            </div>
          </div>

          <div ref={pajakRef} className="panel" style={{marginBottom:16}}>
            <h3>Pajak & Kredit</h3>
            <div style={{display:'grid', gridTemplateColumns:'repeat(3, minmax(0,1fr))', gap:12}}>
              <div className="field" style={{gridColumn:'span 2'}}><label>No. NPWP</label><input className="input mono" value={form.noNpwp} onChange={e=>set('noNpwp',e.target.value)}/></div>
              <div className="field"><label>Jenis Harga <span style={{color:'var(--danger)'}}>*</span></label><select className="select" value={form.jenisHarga} onChange={e=>set('jenisHarga',e.target.value)}><option>Standar</option><option>Khusus</option><option>Grosir</option></select></div>

              <div className="field"><label>Nama Pajak</label><input className="input" value={form.namaPajak} onChange={e=>set('namaPajak',e.target.value)}/></div>
              <div className="field"><label>Kota Pajak</label><input className="input" value={form.kotaPajak} onChange={e=>set('kotaPajak',e.target.value)}/></div>
              <div className="field"><label>Plafon</label><input className="input mono" type="number" value={form.plafon} onChange={e=>set('plafon',+e.target.value)}/></div>

              <div className="field"><label>Plafon Temp</label><input className="input mono" type="number" value={form.plafonTemp} onChange={e=>set('plafonTemp',+e.target.value)}/></div>
              <div className="field"><label>Tempo (hari)</label><input className="input mono" type="number" value={form.tempo} onChange={e=>set('tempo',+e.target.value)}/></div>
              <div className="field"><label>Tempo Lama (hari)</label><input className="input mono" type="number" value={form.tempoLama} onChange={e=>set('tempoLama',+e.target.value)}/></div>

              <div className="field"><label>Tempo Kom (hari)</label><input className="input mono" type="number" value={form.tempoKom} onChange={e=>set('tempoKom',+e.target.value)}/></div>
              <div className="field" style={{gridColumn:'span 2'}}><label>Virtual AC</label><input className="input mono" value={form.virtualAc} onChange={e=>set('virtualAc',e.target.value)}/></div>

              <div className="field" style={{gridColumn:'span 3'}}><label>Alamat Pajak</label><textarea className="textarea" value={form.alamatPajak} onChange={e=>set('alamatPajak',e.target.value)}/></div>
              <div className="field" style={{gridColumn:'span 3'}}><label>Alamat Tagih</label><textarea className="textarea" value={form.alamatTagih} onChange={e=>set('alamatTagih',e.target.value)}/></div>
            </div>
          </div>

          <div ref={expedisiRef} className="panel" style={{marginBottom:16}}>
            <InlineTable
              title="Expedisi Customer"
              columns={[
                { key:'expedisi', label:'Expedisi', placeholder:'Expedisi…' },
                { key:'alamatExpedisi', label:'Alamat Expedisi', placeholder:'Alamat Expedisi…' },
                { key:'telepon', label:'Telepon', placeholder:'Telepon…' },
                { key:'keterangan', label:'Keterangan', placeholder:'Keterangan…' }
              ]}
              rows={form.expedisi}
              setRows={v => setArr('expedisi', v)}
              addLabel="Tambah Data Expedisi"
              shortcut="1"
            />
          </div>

          <div ref={alamatRef} className="panel" style={{marginBottom:16}}>
            <InlineTable
              title="Alamat Kirim"
              columns={[
                { key:'namaPenerima', label:'Nama Penerima', placeholder:'Nama Penerima…' },
                { key:'alamatKirim', label:'Alamat Kirim', placeholder:'Alamat Kirim…' },
                { key:'kota', label:'Kota', placeholder:'Kota…' },
                { key:'telepon', label:'Telepon', placeholder:'Telepon…' },
                { key:'keterangan', label:'Keterangan', placeholder:'Keterangan…' }
              ]}
              rows={form.alamatKirimList}
              setRows={v => setArr('alamatKirimList', v)}
              addLabel="Data Alamat Kirim"
              shortcut="2"
            />
          </div>

          <div ref={npwpRef} className="panel" style={{marginBottom:16}}>
            <InlineTable
              title="NPWP Customer"
              columns={[
                { key:'noNpwp', label:'No. NPWP', placeholder:'No. NPWP…', mono:true },
                { key:'namaNpwp', label:'Nama NPWP', placeholder:'Nama NPWP…' },
                { key:'alamat', label:'Alamat', placeholder:'Alamat…' }
              ]}
              rows={form.npwpList}
              setRows={v => setArr('npwpList', v)}
              addLabel="Tambah Data NPWP"
              shortcut="3"
            />
          </div>

          <div ref={titipanRef} className="panel" style={{marginBottom:16}}>
            <InlineTable
              title="Saldo Titipan"
              columns={[
                { key:'periode', label:'Periode', placeholder:'202607', mono:true },
                { key:'awalTitipan', label:'Awal Titipan', type:'number', num:true, placeholder:'0' },
                { key:'awalPpn', label:'Awal PPN (%)', type:'number', num:true, placeholder:'11' }
              ]}
              rows={form.saldoTitipan}
              setRows={v => setArr('saldoTitipan', v)}
              addLabel="Tambah Saldo Titipan"
              shortcut="4"
            />
          </div>

          <div ref={piutangRef} className="panel" style={{marginBottom:16}}>
            <InlineTable
              title="Saldo Piutang"
              columns={[
                { key:'periode', label:'Periode', placeholder:'202607', mono:true },
                { key:'nilaiAwal', label:'Nilai Awal', type:'number', num:true, placeholder:'0' }
              ]}
              rows={form.saldoPiutang}
              setRows={v => setArr('saldoPiutang', v)}
              addLabel="Tambah Saldo Piutang"
              shortcut="5"
            />
          </div>
        </div>

        <div className="modal-foot">
          <div className="muted" style={{fontSize:12.5}}><kbd>Esc</kbd> untuk batal</div>
          <div className="right" style={{display:'flex', gap:8}}>
            <button className="btn" onClick={onClose}>Batal</button>
            <button className="btn" onClick={handleDraft}>Simpan Sebagai Draft</button>
            <button className="btn btn-primary" onClick={()=>onSave && onSave(form)}>{I.check()} Simpan</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sales Order / Invoice / Sales Return / Delivery Order ────────────────
// Dibangun ulang mengikuti field API asli (SalesOrder/Jual/Retur Jual/DO),
// dengan modal tab generik (PjDocModal) + tabel item produk (PjItemTable).

function PjItemTable({ title, rows, setRows, showRealisasi, disabled, onPickItems }) {
  const update = (idx, key, value) => {
    let row = { ...rows[idx], [key]: value };
    if (key === 'Kode_Item' && !row._deleted) {
      const found = BARANG.find(b => b.code === value);
      if (found) { row.Nama_Item = found.name; row.Satuan = found.unit || row.Satuan; row.Hrg_Sat = found.price || found.hpp || 0; }
    }
    const next = [...rows]; next[idx] = row; setRows(next);
  };
  const softDelete = (idx) => { const next=[...rows]; next[idx]={...next[idx],_deleted:true}; setRows(next); };
  const restore = (idx) => { const next=[...rows]; next[idx]={...next[idx],_deleted:false}; setRows(next); };
  const add = () => setRows([...rows, { Kode_Item:'', Nama_Item:'', Deskripsi:'', Jumlah:1, Realisasi:0, Konversi:1, Satuan:'PCS', Hrg_Sat:0, DiscPros_Det:0, DiscNilai_Det:0, _added:true }]);
  const total = rows.reduce((s,r) => r._deleted ? s : s + pjLineTotal(r), 0);
  return (
    <div className="inline-table">
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8}}>
        <h3 style={{margin:0}}>{title}</h3>
        {!disabled && (
          <div style={{display:'flex', gap:8}}>
            {onPickItems && <button className="btn btn-primary btn-sm" onClick={onPickItems}>{I.plus()} Pilih Barang</button>}
            <button className="btn btn-primary btn-sm" onClick={add}>{I.plus()} Tambah Item</button>
          </div>
        )}
      </div>
      <div className={`line-items ${disabled ? 'view-only' : ''}`} style={{maxHeight:280, overflowY:'auto', overflowX:'auto'}}>
        <table>
          <thead>
            <tr>
              <th style={{width:160}}>Kode Item</th><th>Nama Barang</th><th>Deskripsi</th>
              <th className="num" style={{width:70}}>Jumlah</th>
              {showRealisasi && <th className="num" style={{width:80}}>Realisasi</th>}
              <th style={{width:70}}>Satuan</th><th className="num">Harga Satuan</th>
              <th className="num" style={{width:70}}>Disc %</th><th className="num">Disc Rp</th><th className="num">Total Rp</th>
              {!disabled && <th style={{width:38}}></th>}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && <tr><td colSpan={showRealisasi?11:10} className="empty" style={{padding:'32px 16px', textAlign:'center', color:'var(--text-3)'}}>Belum ada item.</td></tr>}
            {rows.map((r, idx) => (
              <tr key={idx} className={`${r._deleted ? 'row-deleted' : ''} ${r._added ? 'row-added' : ''}`} title={r._deleted ? 'Barang ini akan dihapus' : ''}>
                {disabled || r._deleted ? (
                  <><td className="mono">{r.Kode_Item}</td><td>{r.Nama_Item || '—'}</td><td>{r.Deskripsi}</td></>
                ) : (
                  <>
                    <td>
                      <select className="cell mono" value={r.Kode_Item} onChange={e=>update(idx,'Kode_Item',e.target.value)}>
                        <option value="">— Pilih —</option>
                        {BARANG.map(b => <option key={b.code} value={b.code}>{b.code}</option>)}
                      </select>
                    </td>
                    <td className="muted" style={{padding:'0 8px', fontSize:12.5}}>{r.Nama_Item || '—'}</td>
                    <td><input className="cell" value={r.Deskripsi} onChange={e=>update(idx,'Deskripsi',e.target.value)}/></td>
                  </>
                )}
                {disabled || r._deleted ? <td className="num mono">{r.Jumlah}</td> : <td><input className="cell num" type="number" value={r.Jumlah} onChange={e=>update(idx,'Jumlah',+e.target.value)}/></td>}
                {showRealisasi && <td className="num mono muted" style={{padding:'0 8px'}}>{r.Realisasi||0}</td>}
                {disabled || r._deleted ? <td>{r.Satuan}</td> : <td><input className="cell" value={r.Satuan} onChange={e=>update(idx,'Satuan',e.target.value)}/></td>}
                {disabled || r._deleted ? <td className="num mono">{fmtRp(r.Hrg_Sat)}</td> : <td><input className="cell num" type="number" value={r.Hrg_Sat} onChange={e=>update(idx,'Hrg_Sat',+e.target.value)}/></td>}
                {disabled || r._deleted ? <td className="num">{r.DiscPros_Det}%</td> : <td><input className="cell num" type="number" value={r.DiscPros_Det} onChange={e=>update(idx,'DiscPros_Det',+e.target.value)}/></td>}
                {disabled || r._deleted ? <td className="num mono">{fmtRp(r.DiscNilai_Det)}</td> : <td><input className="cell num" type="number" value={r.DiscNilai_Det} onChange={e=>update(idx,'DiscNilai_Det',+e.target.value)}/></td>}
                <td className="num mono">{fmtRp(pjLineTotal(r))}</td>
                {!disabled && (
                  <td>
                    {r._deleted ? (
                      <button className="btn btn-icon btn-sm" style={{color:'var(--realisasi)'}} onClick={()=>restore(idx)} title="Restore">{I.refresh(14)}</button>
                    ) : (
                      <button className="btn btn-icon btn-sm del" onClick={()=>softDelete(idx)}>{I.trash()}</button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{textAlign:'right', marginTop:8, fontSize:13}}>Subtotal: <b className="mono">{fmtRp(total)}</b></div>
    </div>
  );
}

function PjTotalsCard({ subtotal, discPct, setDiscPct, discRp, setDiscRp, ppn, setPpn, ppnMode, setPpnMode }) {
  const discAmt = subtotal * ((discPct||0)/100) + (+discRp || 0);
  const dpp = Math.max(0, subtotal - discAmt);
  const ppnRp = ppnMode === 'Exclude' ? Math.round(dpp * (ppn||0)/100) : 0;
  const total = dpp + ppnRp;
  return (
    <div className="totals-card">
      <div className="row"><span>Subtotal</span><span className="v mono">{fmtRp(Math.round(subtotal))}</span></div>
      <div className="row disc">
        <span style={{display:'flex', alignItems:'center', gap:8}}>
          Diskon
          <input className="input" type="number" value={discPct} onChange={e=>setDiscPct(+e.target.value)} style={{width:55, height:26, padding:'0 6px', textAlign:'right', fontSize:12.5}}/> %
          <input className="input mono" type="number" value={discRp} onChange={e=>setDiscRp(+e.target.value)} style={{width:90, height:26, padding:'0 6px', textAlign:'right', fontSize:12.5}}/>
        </span>
        <span className="v mono">−{fmtRp(Math.round(discAmt))}</span>
      </div>
      <div className="row muted"><span>DPP</span><span className="v mono">{fmtRp(Math.round(dpp))}</span></div>
      <div className="row">
        <span style={{display:'flex', alignItems:'center', gap:8}}>
          PPN
          <input className="input" type="number" value={ppn} onChange={e=>setPpn(+e.target.value)} style={{width:50, height:26, padding:'0 6px', textAlign:'right', fontSize:12.5}}/> %
          <select className="select" value={ppnMode} onChange={e=>setPpnMode(e.target.value)} style={{width:90, height:26, padding:'0 6px', fontSize:12.5}}>
            <option>Exclude</option><option>Include</option>
          </select>
        </span>
        <span className="v mono" style={{color:'var(--accent)'}}>{fmtRp(ppnRp)}</span>
      </div>
      <div className="row total"><span>Total</span><span className="v mono">{fmtRp(Math.round(total))}</span></div>
    </div>
  );
}

// Modal tab generik refactored to ScrollNavModal + 3-mode
function PjDocModal({ title, data, tabs, showTotals, showRealisasi, prefix, onClose, onSave, onCancelDoc, onCompleteDoc }) {
  const [mode, setMode] = React.useState(data ? 'VIEW' : 'CREATE');
  const isCreate = mode === 'CREATE';
  const isView = mode === 'VIEW';
  const isEdit = mode === 'EDIT';

  const emptyShape = () => {
    const base = {};
    tabs.forEach(t => {
      if (t.type === 'fields') t.fields.forEach(f => { base[f.key] = f.default ?? (f.type === 'number' ? 0 : ''); });
      if (t.type === 'items') base[t.itemsKey] = [];
    });
    if (showTotals) { base.discPct = 0; base.discRp = 0; base.ppnMode = 'Exclude'; }
    return base;
  };

  const buildEmpty = () => {
    const base = emptyShape();
    tabs.forEach(t => { if (t.type === 'items' && !Array.isArray(base[t.itemsKey])) base[t.itemsKey] = []; });
    return base;
  };

  const [form, setForm] = React.useState(() => {
    const base = data ? {...buildEmpty(), ...data} : buildEmpty();
    tabs.forEach(t => { if (t.type === 'items' && !Array.isArray(base[t.itemsKey])) base[t.itemsKey] = []; });
    return base;
  });

  const [snapshotForm, setSnapshotForm] = React.useState(null);

  const [noBuktiRaw, setNoBuktiRaw] = React.useState(() => {
    const nb = form.No_Bukti || '';
    return nb;
  });
  const [noBuktiError, setNoBuktiError] = React.useState('');
  const noBuktiRef = React.useRef(null);

  React.useEffect(() => {
    if (isCreate && noBuktiRef.current) noBuktiRef.current.focus();
  }, [isCreate]);

  const set = (k,v) => setForm(f => ({...f, [k]:v}));
  const isBatal = form.Status === 'BATAL';
  const isSelesai = form.Status === 'SELESAI';
  const isLocked = isBatal || isSelesai;
  const itemTabs = tabs.filter(t => t.type === 'items');
  const subtotal = itemTabs.reduce((s,t) => s + (form[t.itemsKey]||[]).reduce((x,r)=>x+pjLineTotal(r),0), 0);

  const [picker, setPicker] = React.useState(null);
  const [confirmModal, setConfirmModal] = React.useState(null);

  const handleNoBuktiChange = (val) => {
    const v = val.toUpperCase();
    setNoBuktiRaw(v);
    if (!v) setNoBuktiError('No. Bukti harus di isi');
    else if (!['F','K'].includes(v[0])) setNoBuktiError('Format no Bukti salah');
    else setNoBuktiError('');
  };

  const noBuktiLocked = isCreate && (!noBuktiRaw || !['F','K'].includes(noBuktiRaw[0]));

  const resetToCreate = () => {
    const empty = buildEmpty();
    setForm(empty);
    setNoBuktiRaw('');
    setNoBuktiError('');
    setSnapshotForm(null);
    setMode('CREATE');
  };

  const handleSave = (andClose=false) => {
    let withNo = form;
    if (isCreate && prefix) {
      const fullNo = (noBuktiRaw[0] || '') + prefix + new Date().toISOString().slice(2,4) + new Date().toISOString().slice(5,7) + String(Math.floor(Math.random()*9000)+1000);
      withNo = { ...form, No_Bukti: fullNo };
    }
    // Filter out soft-deleted items from all item arrays
    tabs.filter(t => t.type === 'items').forEach(t => {
      const arr = withNo[t.itemsKey];
      if (Array.isArray(arr)) {
        withNo = { ...withNo, [t.itemsKey]: arr.filter(r => !r._deleted).map(r => { const { _deleted, _added, ...rest } = r; return rest; }) };
      }
    });
    onSave(withNo, mode);
    if (andClose) onClose();
    else if (isEdit) setMode('VIEW');
    else { resetToCreate(); }
  };

  const enterEditMode = () => {
    setSnapshotForm({...form});
    setMode('EDIT');
  };

  const handleCancelEdit = () => {
    if (snapshotForm) {
      setForm(snapshotForm);
    }
    setSnapshotForm(null);
    setMode('VIEW');
  };

  const fieldLocked = (f) => {
    if (isView) return true;
    if (isEdit) {
      const lockedKeys = ['No_Bukti','Tgl_Bukti','Kode_Supp','Kode_Cust','Kode_Gudang','No_Referensi','No_Beli','No_Ref','No_Ko','No_Jual','No_Bukti_From'];
      return lockedKeys.includes(f.key) || f.readOnly;
    }
    return noBuktiLocked || f.readOnly;
  };

  const renderField = (f) => {
    const locked = fieldLocked(f);
    const spanStyle = f.span ? {gridColumn:`span ${f.span}`} : {};

    if (f.key === 'No_Bukti' && isCreate) {
      return (
        <div className="field" style={spanStyle} key={f.key}>
          <label>{f.label}{f.required && <span style={{color:'var(--danger)'}}> *</span>}</label>
          <input ref={noBuktiRef} className="input mono" type="text" value={noBuktiRaw} onChange={e=>handleNoBuktiChange(e.target.value)} placeholder="Ketik F atau K" maxLength={1} />
          {noBuktiError && <div className="no-bukti-alert">{noBuktiError}</div>}
        </div>
      );
    }

    if (locked) {
      return (
        <div className="view-field" style={spanStyle} key={f.key}>
          <label>{f.label}</label>
          <div className={`view-value ${f.mono ? 'mono' : ''}`}>{form[f.key] || <span className="muted">—</span>}</div>
        </div>
      );
    }

    if (f.type === 'select') {
      const opts = typeof f.options === 'function' ? f.options() : f.options;
      return (
        <div className="field" style={spanStyle} key={f.key}>
          <label>{f.label}{f.required && <span style={{color:'var(--danger)'}}> *</span>}</label>
          <select className="select" value={form[f.key]} onChange={e=>{ set(f.key, e.target.value); f.onChange && f.onChange(e.target.value, set); }}>
            <option value="">— Pilih —</option>
            {opts.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      );
    }
    if (f.type === 'textarea') {
      return (
        <div className="field" style={spanStyle} key={f.key}>
          <label>{f.label}</label>
          <textarea className="textarea" value={form[f.key]} onChange={e=>set(f.key, e.target.value)} />
        </div>
      );
    }
    return (
      <div className="field" style={spanStyle} key={f.key}>
        <label>{f.label}{f.required && <span style={{color:'var(--danger)'}}> *</span>}</label>
        <input className={`input ${f.mono ? 'mono' : ''}`} type={f.type==='number'?'number':f.type==='date'?'date':'text'} placeholder={f.readOnly?'Otomatis':''} value={form[f.key]} onChange={e=>set(f.key, f.type==='number'?+e.target.value:e.target.value)} />
      </div>
    );
  };

  const alasanPreContent = isLocked ? (
    <div className="alasan-section">
      <h3>{isBatal ? 'Alasan Batal' : 'Alasan Selesai'}</h3>
      <div className={`alasan-box ${isBatal ? 'batal' : 'selesai'}`}>
        <span className="icon">{isBatal ? I.x(16) : I.check(16)}</span>
        <span>{form.Alasan_Status || (isBatal ? 'Transaksi dibatalkan' : 'Transaksi diselesaikan manual')}</span>
      </div>
    </div>
  ) : null;

  const sections = tabs.map(t => {
    if (t.type === 'fields') {
      return { id:t.id, label:t.label, content: (
        <div className="panel">
          <div style={{display:'grid', gridTemplateColumns:'repeat(3, minmax(0,1fr))', gap:12}}>
            {t.fields.map(renderField)}
          </div>
        </div>
      )};
    }
    return { id:t.id, label:t.label, content: (
      <div className="panel">
        {t.produk
          ? <PjItemTable title={t.label} rows={form[t.itemsKey]} setRows={v=>set(t.itemsKey,v)} showRealisasi={showRealisasi} disabled={isView} onPickItems={!isView ? ()=>setPicker(t) : null} />
          : <InlineTable title={t.label} columns={t.columns} rows={form[t.itemsKey]} setRows={v=>set(t.itemsKey,v)} addLabel={`Tambah ${t.label}`} disabled={isView} />}
      </div>
    )};
  });

  const summaryPanel = showTotals ? (
    <PjTotalsCard subtotal={subtotal} discPct={form.discPct} setDiscPct={v=>set('discPct',v)} discRp={form.discRp} setDiscRp={v=>set('discRp',v)} ppn={form.PPN??form.Ppn??11} setPpn={v=>set(form.PPN!==undefined?'PPN':'Ppn',v)} ppnMode={form.ppnMode} setPpnMode={v=>set('ppnMode',v)} />
  ) : null;

  const modalTitle = isCreate ? `${title} Baru` : isEdit ? `Edit ${title} — ${form.No_Bukti||''}` : `${title} — ${form.No_Bukti||''}`;

  return (
    <>
      <ScrollNavModal
        title={modalTitle}
        mode={mode}
        sections={sections}
        summaryPanel={summaryPanel}
        preContent={alasanPreContent}
        statusBadge={isLocked ? <span className={`status-badge ${isBatal ? 'batal' : 'selesai'}`}>{isBatal ? 'BATAL' : 'SELESAI'}</span> : null}
        locked={isLocked}
        onClose={onClose}
        onSave={()=>handleSave(false)}
        onSaveAndClose={()=>handleSave(true)}
        onCancelDoc={isView && onCancelDoc && !isLocked ? ()=>setConfirmModal({kind:'batal'}) : null}
        onCompleteDoc={isView && onCompleteDoc && !isLocked ? ()=>setConfirmModal({kind:'selesai'}) : null}
        onEditMode={isView && !isLocked ? enterEditMode : null}
        onCancelEdit={isEdit ? handleCancelEdit : null}
        showSelesai={isView && onCompleteDoc && !isLocked && (form.Status==='OPEN'||form.Status===''||!form.Status)}
      />
      {picker && (
        <ItemPickerModal
          title={`Pilih ${picker.label}`}
          items={BARANG || []}
          onCancel={()=>setPicker(null)}
          onConfirm={(picked)=>{
            const mapped = picked.map(p => {
              const row = { Kode_Item:p.code||p.kode||'', Nama_Item:p.name||p.nama||'', Deskripsi:'', Jumlah:p._qty||1, Satuan:p.unit||p.satuan||'PCS', Hrg_Sat:p.price||p.hpp||p.harga||0, DiscPros_Det:0, DiscNilai_Det:0, Realisasi:0, Konversi:1, _added:true };
              return row;
            });
            set(picker.itemsKey, [...form[picker.itemsKey], ...mapped]);
            setPicker(null);
          }}
        />
      )}
      {confirmModal && (
        <ConfirmationModal
          title={confirmModal.kind==='batal'?'Batalkan Transaksi':'Selesaikan Manual'}
          message={confirmModal.kind==='batal'?'Masukkan alasan pembatalan transaksi ini.':'Masukkan alasan penyelesaian manual transaksi ini.'}
          confirmLabel={confirmModal.kind==='batal'?'Batalkan':'Selesaikan'}
          confirmKind={confirmModal.kind==='batal'?'danger':'success'}
          onCancel={()=>setConfirmModal(null)}
          onConfirm={(reason)=>{
            if (confirmModal.kind==='batal') {
              const updated = { ...form, Status:'BATAL', Alasan_Status: reason };
              setForm(updated);
              if (onCancelDoc) onCancelDoc(updated);
            } else {
              const updated = { ...form, Status:'SELESAI', Alasan_Status: reason };
              setForm(updated);
              if (onCompleteDoc) onCompleteDoc(updated);
            }
            setConfirmModal(null);
          }}
        />
      )}
    </>
  );
}

function PjDocList({ title, sub, rows, columns, onAdd, onEdit, addLabel='Buat Baru' }) {
  const [q, setQ] = React.useState('');
  const filtered = rows.filter(r => !q || columns.some(c => String(r[c.key] ?? '').toLowerCase().includes(q.toLowerCase())));
  return (
    <>
      <PjHeader title={title} sub={sub ?? `${filtered.length} transaksi`} onAdd={onAdd} addLabel={addLabel} />
      <div className="filter-bar"><div className="filter-grid">
        <div className="field"><label>Pencarian</label><div className="input-w-icon">{I.search(14)}<input className="input" placeholder="No. Bukti, customer…" value={q} onChange={e=>setQ(e.target.value)}/></div></div>
        <div className="filter-actions"><button className="btn" onClick={()=>setQ('')}>Reset</button></div>
      </div></div>
      <div className="table-card">
        <div className="table-toolbar"><div className="table-toolbar-left"><b>Jumlah: {filtered.length}</b></div></div>
        <div className="table-scroll">
          <table className="data">
            <thead><tr>{columns.map(c => <th key={c.key}>{c.label}</th>)}<th style={{width:90}}>Aksi</th></tr></thead>
            <tbody>
              {filtered.map((r,i) => (
                <tr key={r.No_Bukti ?? i} onClick={()=>onEdit(r)}>
                  {columns.map((c,ci) => (
                    <td key={c.key} className={c.mono ? 'mono' : ''}>
                      {c.render ? c.render(r[c.key], r) : ci === 0 ? <span className="cell-link">{r[c.key]}</span> : (r[c.key] || <span className="muted">—</span>)}
                    </td>
                  ))}
                  <td onClick={e=>e.stopPropagation()}>
                    <div className="row-actions">
                      <button className="btn btn-icon btn-sm" title="Edit" onClick={()=>onEdit(r)}>{I.edit()}</button>
                      <button className="btn btn-icon btn-sm" title="Cetak" onClick={()=>window.__erpToast && window.__erpToast('Fitur cetak belum tersedia pada prototipe ini.')}>{I.print()}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pager"><div>Menampilkan <b>1</b>–<b>{filtered.length}</b> dari <b>{filtered.length}</b></div></div>
      </div>
    </>
  );
}

function pjDocStatusPill(v) {
  const s = v || 'DRAFT';
  const cls = ['OPEN','AKTIF','LUNAS'].includes((v||'').toUpperCase()) ? 'approved'
    : (v||'').toUpperCase() === 'BATAL' ? 'cancelled'
    : (v||'').toUpperCase() === 'OUTSTANDING' || (v||'').toUpperCase() === 'PENDING' ? 'pending'
    : !v ? 'draft' : 'pending';
  return <span className={`pill ${cls}`}>{s}</span>;
}

const PJ_KREDIT_TUNAI_OPTS = CARA_BAYAR.map(c => ({ value:c, label:c }));
const PJ_KLASIFIKASI_OPTS = KLASIFIKASI_LIST.map(k => ({ value:k, label:k }));
const PJ_INCOTERM_OPTS = INCOTERM_LIST.map(i => ({ value:i, label:i }));
const PJ_GUDANG_OPTS = GUDANG_PJ.map(g => ({ value:g, label:g }));
const PJ_AKUN_OPTS = AKUN_TUNAI.map(a => ({ value:a, label:a }));
function pjCustOpts() { return PELANGGAN.map(p => ({ value:p.code, label:p.name })); }
function pjCustOnChange(val, set) { const p = PELANGGAN.find(x=>x.code===val); if (p) set('Nama_Cust', p.name); }

// ─── Sales Order ────────────────────────────────────────────────────────────

function salesOrderTabs(konfirmasiList) {
  return [
    { id:'umum', label:'Informasi Umum', type:'fields', fields:[
      { key:'No_Bukti', label:'No. Bukti', mono:true, readOnly:true },
      { key:'Tgl_Bukti', label:'Tgl. Bukti', type:'date', required:true },
      { key:'No_Referensi', label:'No. Referensi' },
      { key:'Kode_Cust', label:'Customer', type:'select', options:pjCustOpts, required:true, onChange:pjCustOnChange },
      { key:'No_Ko', label:'Ref. Konfirmasi Order', type:'select', options:()=>konfirmasiList.map(k=>({value:k.noBukti,label:k.noBukti})) },
      { key:'Kredit_Tunai', label:'Kredit/Tunai', type:'select', options:PJ_KREDIT_TUNAI_OPTS },
      { key:'Tempo', label:'Tempo (hari)', type:'number' },
      { key:'Tgl_Kirim', label:'Tgl. Kirim', type:'date' },
      { key:'Klasifikasi', label:'Klasifikasi', type:'select', options:PJ_KLASIFIKASI_OPTS },
      { key:'Locofranco', label:'Incoterm', type:'select', options:PJ_INCOTERM_OPTS },
      { key:'Expedisi', label:'Expedisi' },
      { key:'Status', label:'Status', type:'select', options:[{value:'OPEN',label:'Open'},{value:'SELESAI',label:'Selesai'}] },
      { key:'Alamat_Kirim', label:'Alamat Kirim', type:'textarea', span:3 },
      { key:'Keterangan', label:'Keterangan', type:'textarea', span:3 },
    ]},
    { id:'barang', label:'Barang', type:'items', itemsKey:'Details', produk:true },
    { id:'nonprodukjasa', label:'Non-Produk atau Jasa', type:'items', itemsKey:'Details2', columns:[
      { key:'Kode_Item', label:'Kode', mono:true, width:110 },
      { key:'Nama_Item', label:'Nama' },
      { key:'Deskripsi', label:'Deskripsi' },
      { key:'Jumlah', label:'Jumlah', type:'number', num:true, width:80 },
      { key:'Satuan', label:'Satuan', width:80 },
      { key:'Hrg_Sat', label:'Harga Satuan', type:'number', num:true },
      { key:'DiscPros_Det', label:'Disc (%)', type:'number', num:true, width:80 },
      { key:'DiscNilai_Det', label:'Disc (Rp)', type:'number', num:true },
    ]},
  ];
}

function SalesOrderPage({ rows, setRows, konfirmasiList }) {
  const [modal, setModal] = React.useState(null);
  const [show, setShow] = React.useState(false);
  const save = (form, mode) => {
    if (mode === 'CREATE') {
      setRows(prev => [...prev, form]);
    } else {
      setRows(prev => prev.map(r => r.No_Bukti===form.No_Bukti ? form : r));
    }
    window.__erpToast && window.__erpToast('Sales Order berhasil disimpan.');
  };
  const cancelDoc = (form) => {
    const updated = { ...form, Status:'BATAL', Alasan_Status: form.Alasan_Status || 'Dibatalkan oleh operator' };
    setRows(prev => prev.map(r => r.No_Bukti===updated.No_Bukti ? updated : r));
    setModal(updated);
    window.__erpToast && window.__erpToast('Sales Order dibatalkan.');
  };
  const completeDoc = (form) => {
    const updated = { ...form, Status:'SELESAI', Alasan_Status: form.Alasan_Status || 'Diselesaikan manual oleh operator' };
    setRows(prev => prev.map(r => r.No_Bukti===updated.No_Bukti ? updated : r));
    setModal(updated);
    window.__erpToast && window.__erpToast('Sales Order diselesaikan manual.');
  };
  const columns = [
    { key:'No_Bukti', label:'No. Bukti', mono:true },
    { key:'Tgl_Bukti', label:'Tgl. Bukti' },
    { key:'Nama_Cust', label:'Customer' },
    { key:'Nama_Sales', label:'Sales' },
    { key:'Kredit_Tunai', label:'Kredit/Tunai' },
    { key:'Tempo', label:'Jth. Tempo (hari)' },
    { key:'Details', label:'Total', render:(v,r) => fmtRp([...(v||[]), ...(r.Details2||[])].reduce((s,x)=>s+pjLineTotal(x),0)) },
    { key:'Status', label:'Status', render:v => pjDocStatusPill(v) },
  ];
  return (
    <>
      <PjDocList title="Sales Order" rows={rows} columns={columns} onAdd={()=>{setModal(null); setShow(true);}} onEdit={(r)=>{setModal(r); setShow(true);}} addLabel="Sales Order Baru" />
      {show && <PjDocModal title="Sales Order" data={modal} tabs={salesOrderTabs(konfirmasiList)} prefix="SSO" showTotals showRealisasi onClose={()=>{setShow(false); setModal(null);}} onSave={save} onCancelDoc={cancelDoc} onCompleteDoc={completeDoc} />}
    </>
  );
}

// ─── Invoice ─────────────────────────────────────────────────────────────────

function invoiceTabs(salesOrderList) {
  return [
    { id:'umum', label:'Informasi Umum', type:'fields', fields:[
      { key:'No_Bukti', label:'No. Bukti', mono:true, readOnly:true },
      { key:'Tgl_Bukti', label:'Tgl. Bukti', type:'date', required:true },
      { key:'No_Bukti_From', label:'Ref. Sales Order', type:'select', options:()=>salesOrderList.map(s=>({value:s.No_Bukti,label:s.No_Bukti})) },
      { key:'Kode_Cust', label:'Customer', type:'select', options:pjCustOpts, required:true, onChange:pjCustOnChange },
      { key:'Nama_Gudang', label:'Gudang', type:'select', options:PJ_GUDANG_OPTS },
      { key:'Kredit_Tunai', label:'Kredit/Tunai', type:'select', options:PJ_KREDIT_TUNAI_OPTS },
      { key:'Akun_Tunai', label:'Akun Bayar', type:'select', options:PJ_AKUN_OPTS },
      { key:'Tempo', label:'Tempo (hari)', type:'number' },
      { key:'Tgl_Kirim', label:'Tgl. Kirim', type:'date' },
      { key:'Status', label:'Status', type:'select', options:[{value:'Outstanding',label:'Outstanding'},{value:'Lunas',label:'Lunas'},{value:'Partial',label:'Partial'}] },
      { key:'Alamat_Kirim', label:'Alamat Kirim', type:'textarea', span:3 },
      { key:'Keterangan', label:'Keterangan', type:'textarea', span:3 },
    ]},
    { id:'barang', label:'Barang', type:'items', itemsKey:'Details', produk:true },
    { id:'nonprodukjasa', label:'Non-Produk atau Jasa', type:'items', itemsKey:'Details2', columns:[
      { key:'Kode_Item', label:'Kode', mono:true, width:110 },
      { key:'Nama_Item', label:'Nama' },
      { key:'Deskripsi', label:'Deskripsi' },
      { key:'Jumlah', label:'Jumlah', type:'number', num:true, width:80 },
      { key:'Satuan', label:'Satuan', width:80 },
      { key:'Hrg_Sat', label:'Harga Satuan', type:'number', num:true },
      { key:'DiscPros_Det', label:'Disc (%)', type:'number', num:true, width:80 },
      { key:'DiscNilai_Det', label:'Disc (Rp)', type:'number', num:true },
    ]},
  ];
}

function InvoicePage({ rows, setRows, salesOrderList }) {
  const [modal, setModal] = React.useState(null);
  const [show, setShow] = React.useState(false);
  const save = (form, mode) => {
    if (mode === 'CREATE') {
      setRows(prev => [...prev, form]);
    } else {
      setRows(prev => prev.map(r => r.No_Bukti===form.No_Bukti ? form : r));
    }
    window.__erpToast && window.__erpToast('Invoice berhasil disimpan.');
  };
  const cancelDoc = (form) => {
    const updated = { ...form, Status:'BATAL' };
    setRows(prev => prev.map(r => r.No_Bukti===updated.No_Bukti ? updated : r));
    setModal(updated);
    window.__erpToast && window.__erpToast('Invoice dibatalkan.');
  };
  const columns = [
    { key:'No_Bukti', label:'No. Bukti', mono:true },
    { key:'Tgl_Bukti', label:'Tgl. Bukti' },
    { key:'No_Bukti_From', label:'Ref. Sales Order', render:v => v || <span className="muted">—</span> },
    { key:'Nama_Cust', label:'Customer' },
    { key:'Nama_Gudang', label:'Gudang' },
    { key:'Details', label:'Total', render:(v,r) => fmtRp([...(v||[]), ...(r.Details2||[])].reduce((s,x)=>s+pjLineTotal(x),0)) },
    { key:'Status', label:'Status', render:v => pjDocStatusPill(v) },
  ];
  return (
    <>
      <PjDocList title="Invoice" rows={rows} columns={columns} onAdd={()=>{setModal(null); setShow(true);}} onEdit={(r)=>{setModal(r); setShow(true);}} addLabel="Invoice Baru" />
      {show && <PjDocModal title="Invoice" data={modal} tabs={invoiceTabs(salesOrderList)} prefix="SIV" showTotals onClose={()=>{setShow(false); setModal(null);}} onSave={save} onCancelDoc={cancelDoc} />}
    </>
  );
}

// ─── Sales Return ────────────────────────────────────────────────────────────

const PJ_ALASAN_RETUR_OPTS = ['Cacat produksi', 'Salah kirim varian', 'Kemasan rusak', 'Tidak sesuai pesanan', 'Expired', 'Lain-lain'].map(a => ({ value:a, label:a }));

function salesReturnTabs(invoiceList) {
  return [
    { id:'umum', label:'Informasi Umum', type:'fields', fields:[
      { key:'No_Bukti', label:'No. Bukti', mono:true, readOnly:true },
      { key:'Tgl_Bukti', label:'Tgl. Bukti', type:'date', required:true },
      { key:'No_Jual', label:'Ref. Invoice', type:'select', options:()=>invoiceList.map(v=>({value:v.No_Bukti,label:v.No_Bukti})), required:true },
      { key:'Kode_Cust', label:'Customer', type:'select', options:pjCustOpts, required:true, onChange:pjCustOnChange },
      { key:'Nama_Gudang', label:'Gudang', type:'select', options:PJ_GUDANG_OPTS },
      { key:'Kredit_Tunai', label:'Kredit/Tunai', type:'select', options:PJ_KREDIT_TUNAI_OPTS },
      { key:'Akun_Tunai', label:'Akun Bayar', type:'select', options:PJ_AKUN_OPTS },
      { key:'Tempo', label:'Tempo (hari)', type:'number' },
      { key:'Alasan_Retur', label:'Alasan Retur', type:'select', options:PJ_ALASAN_RETUR_OPTS, required:true },
      { key:'Status', label:'Status', type:'select', options:[{value:'Approved',label:'Approved'},{value:'Pending',label:'Pending'},{value:'Cancelled',label:'Cancelled'}] },
      { key:'Keterangan', label:'Keterangan', type:'textarea', span:3 },
    ]},
    { id:'barang', label:'Barang', type:'items', itemsKey:'Details', produk:true },
    { id:'nonprodukjasa', label:'Non-Produk atau Jasa', type:'items', itemsKey:'Details2', columns:[
      { key:'Kode_Item', label:'Kode', mono:true, width:110 },
      { key:'Nama_Item', label:'Nama' },
      { key:'Deskripsi', label:'Deskripsi' },
      { key:'Jumlah', label:'Jumlah', type:'number', num:true, width:80 },
      { key:'Satuan', label:'Satuan', width:80 },
      { key:'Hrg_Sat', label:'Harga Satuan', type:'number', num:true },
      { key:'DiscPros_Det', label:'Disc (%)', type:'number', num:true, width:80 },
      { key:'DiscNilai_Det', label:'Disc (Rp)', type:'number', num:true },
    ]},
  ];
}

function SalesReturnPage({ rows, setRows, invoiceList }) {
  const [modal, setModal] = React.useState(null);
  const [show, setShow] = React.useState(false);
  const save = (form, mode) => {
    if (mode === 'CREATE') {
      setRows(prev => [...prev, form]);
    } else {
      setRows(prev => prev.map(r => r.No_Bukti===form.No_Bukti ? form : r));
    }
    window.__erpToast && window.__erpToast('Sales Return berhasil disimpan.');
  };
  const cancelDoc = (form) => {
    const updated = { ...form, Status:'Cancelled' };
    setRows(prev => prev.map(r => r.No_Bukti===updated.No_Bukti ? updated : r));
    setModal(updated);
    window.__erpToast && window.__erpToast('Sales Return dibatalkan.');
  };
  const columns = [
    { key:'No_Bukti', label:'No. Bukti', mono:true },
    { key:'Tgl_Bukti', label:'Tgl. Bukti' },
    { key:'No_Jual', label:'Ref. Invoice' },
    { key:'Nama_Cust', label:'Customer' },
    { key:'Alasan_Retur', label:'Alasan' },
    { key:'Details', label:'Total', render:(v,r) => fmtRp([...(v||[]), ...(r.Details2||[])].reduce((s,x)=>s+pjLineTotal(x),0)) },
    { key:'Status', label:'Status', render:v => pjDocStatusPill(v) },
  ];
  return (
    <>
      <PjDocList title="Sales Return" rows={rows} columns={columns} onAdd={()=>{setModal(null); setShow(true);}} onEdit={(r)=>{setModal(r); setShow(true);}} addLabel="Retur Baru" />
      {show && <PjDocModal title="Sales Return" data={modal} tabs={salesReturnTabs(invoiceList)} prefix="SRJ" showTotals onClose={()=>{setShow(false); setModal(null);}} onSave={save} onCancelDoc={cancelDoc} />}
    </>
  );
}

// ─── Delivery Order ──────────────────────────────────────────────────────────

function deliveryOrderTabs(salesOrderList) {
  return [
    { id:'umum', label:'Informasi Umum', type:'fields', fields:[
      { key:'No_Bukti', label:'No. Bukti', mono:true, readOnly:true },
      { key:'Tgl_Bukti', label:'Tgl. Bukti', type:'date', required:true },
      { key:'No_Referensi', label:'Ref. Sales Order', type:'select', options:()=>salesOrderList.map(s=>({value:s.No_Bukti,label:s.No_Bukti})) },
      { key:'Kode_Cust', label:'Customer', type:'select', options:pjCustOpts, required:true, onChange:pjCustOnChange },
      { key:'Nama_Gudang', label:'Gudang', type:'select', options:PJ_GUDANG_OPTS },
      { key:'Tgl_Kirim', label:'Tgl. Kirim', type:'date' },
      { key:'Klasifikasi', label:'Klasifikasi', type:'select', options:PJ_KLASIFIKASI_OPTS },
      { key:'Locofranco', label:'Incoterm', type:'select', options:PJ_INCOTERM_OPTS },
      { key:'Expedisi', label:'Expedisi' },
      { key:'Status', label:'Status', type:'select', options:[{value:'OPEN',label:'Open'},{value:'SELESAI',label:'Selesai'}] },
      { key:'Ppn', label:'PPN (%)', type:'number' },
      { key:'Alamat_Kirim', label:'Alamat Kirim', type:'textarea', span:3 },
      { key:'Keterangan', label:'Keterangan', type:'textarea', span:3 },
    ]},
    { id:'barang', label:'Barang', type:'items', itemsKey:'Details', produk:true },
  ];
}

function DeliveryOrderPage({ rows, setRows, salesOrderList }) {
  const [modal, setModal] = React.useState(null);
  const [show, setShow] = React.useState(false);
  const save = (form, mode) => {
    if (mode === 'CREATE') {
      setRows(prev => [...prev, form]);
    } else {
      setRows(prev => prev.map(r => r.No_Bukti===form.No_Bukti ? form : r));
    }
    window.__erpToast && window.__erpToast('Delivery Order berhasil disimpan.');
  };
  const cancelDoc = (form) => {
    const updated = { ...form, Status:'BATAL' };
    setRows(prev => prev.map(r => r.No_Bukti===updated.No_Bukti ? updated : r));
    setModal(updated);
    window.__erpToast && window.__erpToast('Delivery Order dibatalkan.');
  };
  const columns = [
    { key:'No_Bukti', label:'No. Bukti', mono:true },
    { key:'Tgl_Bukti', label:'Tgl. Bukti' },
    { key:'No_Referensi', label:'Ref. Sales Order' },
    { key:'Nama_Cust', label:'Customer' },
    { key:'Tgl_Kirim', label:'Tgl. Kirim' },
    { key:'Nama_Gudang', label:'Gudang' },
    { key:'Details', label:'Jml Item', render:v => (v||[]).length },
    { key:'Status', label:'Status', render:v => pjDocStatusPill(v) },
  ];
  return (
    <>
      <PjDocList title="Delivery Order" sub="Surat jalan dan pengiriman barang ke pelanggan." rows={rows} columns={columns} onAdd={()=>{setModal(null); setShow(true);}} onEdit={(r)=>{setModal(r); setShow(true);}} addLabel="Delivery Order Baru" />
      {show && <PjDocModal title="Delivery Order" data={modal} tabs={deliveryOrderTabs(salesOrderList)} prefix="SDO" onClose={()=>{setShow(false); setModal(null);}} onSave={save} onCancelDoc={cancelDoc} />}
    </>
  );
}

// ─── Page wrapper ───────────────────────────────────────────────────────────

function PelangganPage({ activeSub, onSubChange, onNavigate }) {
  // Root-cause fix: setiap data pelanggan/transaksi diangkat jadi state nyata di sini,
  // bukan const global — supaya Tambah/Edit/Simpan benar-benar tersimpan dan terlihat di list.
  const [pelanggan, setPelanggan] = React.useState(PELANGGAN);
  const [konfirmasi, setKonfirmasi] = React.useState(KONFIRMASI_PENJUALAN);
  const [salesOrders, setSalesOrders] = React.useState(SALES_ORDER_SEED);
  const [invoices, setInvoices] = React.useState(INVOICE_SEED);
  const [salesReturns, setSalesReturns] = React.useState(SALES_RETURN_SEED);
  const [deliveryOrders, setDeliveryOrders] = React.useState(DELIVERY_ORDER_SEED);

  const [modal, setModal] = React.useState(null);
  const close = () => setModal(null);

  const savePelanggan = (form) => {
    setPelanggan(prev => prev.some(p => p.code === form.code) ? prev.map(p => p.code===form.code ? form : p) : [form, ...prev]);
    window.__erpToast && window.__erpToast('Data berhasil disimpan.');
    close();
  };
  const deletePelanggan = (code) => {
    setPelanggan(prev => prev.filter(p => p.code !== code));
    window.__erpToast && window.__erpToast('Pelanggan berhasil dihapus.');
  };
  const saveKonfirmasi = (form) => {
    setKonfirmasi(prev => prev.some(k => k.noBukti === form.noBukti) ? prev.map(k => k.noBukti===form.noBukti ? form : k) : [form, ...prev]);
    close();
  };
  const cancelKonfirmasi = (noBukti) => {
    setKonfirmasi(prev => prev.map(k => k.noBukti===noBukti ? {...k, status:'BATAL'} : k));
    window.__erpToast && window.__erpToast('Konfirmasi penjualan dibatalkan.');
  };

  if (!activeSub) return (
    <PelangganDashboard
      onOpenSub={onSubChange} onNavigate={onNavigate}
      pelanggan={pelanggan} konfirmasi={konfirmasi} salesOrders={salesOrders}
      invoices={invoices} salesReturns={salesReturns} deliveryOrders={deliveryOrders}
    />
  );

  return (
    <div className="page" data-screen-label={`04 Pelanggan — ${activeSub}`}>
      <div className="crumbs">
        <a onClick={() => onNavigate?.('home')} style={{cursor:'pointer'}}>Home</a><span className="sep">/</span>
        <a onClick={()=>onSubChange(null)} style={{cursor:'pointer'}}>Pelanggan</a><span className="sep">/</span>
        <span className="current">{PJ_SUBS.find(s=>s.id===activeSub)?.label}</span>
      </div>
      {activeSub === 'katalog'    && <KatalogPelanggan rows={pelanggan} onAdd={()=>setModal({kind:'pel'})} onEdit={(d)=>setModal({kind:'pel', data:d})} onDelete={deletePelanggan} />}
      {activeSub === 'konfirmasi' && <KonfirmasiPenjualan rows={konfirmasi} onAdd={()=>setModal({kind:'konfirmasi'})} onView={(d)=>setModal({kind:'konfirmasi', data:d})} onCancel={cancelKonfirmasi} />}
      {activeSub === 'salesorder' && <SalesOrderPage rows={salesOrders} setRows={setSalesOrders} konfirmasiList={konfirmasi} />}
      {activeSub === 'delivery'   && <DeliveryOrderPage rows={deliveryOrders} setRows={setDeliveryOrders} salesOrderList={salesOrders} />}
      {activeSub === 'invoice'    && <InvoicePage rows={invoices} setRows={setInvoices} salesOrderList={salesOrders} />}
      {activeSub === 'retur'      && <SalesReturnPage rows={salesReturns} setRows={setSalesReturns} invoiceList={invoices} />}

      {modal?.kind === 'pel'        && <PelangganModal            data={modal.data} onClose={close} onSave={savePelanggan}/>}
      {modal?.kind === 'konfirmasi' && <KonfirmasiPenjualanModal  data={modal.data} onClose={close} onSave={saveKonfirmasi}/>}
    </div>
  );
}

window.PelangganPage = PelangganPage;
