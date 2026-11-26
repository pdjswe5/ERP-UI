// Payroll — Master Karyawan (data DUMMY fiktif: nama, No. KTP, alamat, telepon, KPJ bukan data orang
// sungguhan). Pola No.Induk = 6-digit sequence + tanggal masuk YYMMDD, dibuat lewat prNoInduk().

function prNoInduk(seq, tglMasukIso) {
  const [y, m, d] = tglMasukIso.split('-');
  return String(seq).padStart(6, '0') + y.slice(2) + m + d;
}

function prKaryawanRow(seq, opts) {
  const tglMasuk = opts.tglMasuk;
  return {
    noInduk: prNoInduk(seq, tglMasuk),
    noIndukLama: opts.noIndukLama || '',
    noFinger: String(opts.noFinger ?? seq),
    statusKyw: opts.statusKyw || '00',
    tglMasuk,
    nama: opts.nama,
    noNpwp: opts.noNpwp || '',
    noKtp: opts.noKtp || '',
    alamat: opts.alamat || '',
    kota: opts.kota || 'PASURUAN',
    kodePos: opts.kodePos || '',
    telpon: opts.telpon || '',
    tempatLahir: opts.tempatLahir || opts.kota || 'PASURUAN',
    tglLahir: opts.tglLahir || '',
    alamatKtp: opts.alamatKtp || opts.alamat || '',
    noJkn: opts.noJkn || '',
    alamatDomisili: opts.alamatDomisili || opts.alamatKtp || opts.alamat || '',
    noKpj: opts.noKpj || '',
    jenisKelamin: opts.jenisKelamin || 'L',
    statusKawin: opts.statusKawin ?? true,
    kTk: opts.kTk || 'TK0',
    agama: opts.agama || 'ISLAM',
    pendidikan: opts.pendidikan || 'SLTA',
    tglKeluar: opts.tglKeluar || '',
    statusKeluar: !!opts.statusKeluar,
    levelKaryawan: opts.levelKaryawan || 'B',
    noRekening: opts.noRekening || '',
    bank: opts.bank || '',
    atasNama: opts.atasNama || opts.nama,
    ket: opts.ket || '',
    keluarga: opts.keluarga || [],
    aktif: opts.aktif ?? !opts.statusKeluar,
  };
}

const PR_KARYAWAN = [
  // 6 record pertama
  prKaryawanRow(1, { nama:'Karim Santoso', tglMasuk:'2001-05-23', noKtp:'3500000000000001', noFinger:1,
    tglLahir:'1970-12-28', tempatLahir:'PASURUAN', telpon:'0812 0000 0001', jenisKelamin:'L', statusKawin:true, kTk:'K1',
    alamatKtp:'Jl. Contoh No. 1, Pasuruan', pendidikan:'SLTP', levelKaryawan:'B', noIndukLama:'111',
    noKpj:'KPJ00000001', keluarga:[{ hubungan:'Suami/Istri', nama:'', tglLahir:'' }] }),
  prKaryawanRow(2, { nama:'Pranoto', tglMasuk:'2001-01-22', noKtp:'3500000000000002', noFinger:2,
    tglLahir:'1973-06-27', jenisKelamin:'L', levelKaryawan:'B', pendidikan:'SLTA' }),
  prKaryawanRow(3, { nama:'Putri Lestari', tglMasuk:'2021-08-09', noKtp:'3500000000000003', noFinger:3,
    tglLahir:'1994-11-01', jenisKelamin:'P', levelKaryawan:'A', pendidikan:'SLTA' }),
  prKaryawanRow(5, { nama:'Teguh Widodo', tglMasuk:'1994-10-18', noKtp:'3500000000000004', noFinger:5,
    tglLahir:'1961-03-15', jenisKelamin:'L', levelKaryawan:'A', pendidikan:'SD', statusKeluar:true, tglKeluar:'2026-05-31', aktif:false }),
  prKaryawanRow(9, { nama:'Budi Haryanto', tglMasuk:'1997-05-29', noKtp:'3500000000000005', noFinger:9,
    tglLahir:'1976-09-20', jenisKelamin:'L', levelKaryawan:'B', pendidikan:'SLTA' }),
  prKaryawanRow(10, { nama:'John Doe', tglMasuk:'2011-06-01', noKtp:'3500000000000006', noFinger:10,
    tglLahir:'1988-02-14', jenisKelamin:'L', levelKaryawan:'A', pendidikan:'S1' }),

  // 6 record tambahan (Bagian B022-Packing 5) supaya Transaksi Produksi Harian & Proses Penggajian Borongan (§8-9) punya data konsisten.
  prKaryawanRow(11, { nama:'Sumiyati', tglMasuk:'1997-03-19', noKtp:'3500000000000007', noFinger:11,
    tglLahir:'1997-03-19', jenisKelamin:'P', levelKaryawan:'B', pendidikan:'SLTP' }),
  prKaryawanRow(12, { nama:'Marto Wiyono', tglMasuk:'1999-09-19', noKtp:'3500000000000008', noFinger:12,
    tglLahir:'1978-09-19', jenisKelamin:'L', levelKaryawan:'B', pendidikan:'SLTP' }),
  prKaryawanRow(13, { nama:'Mahmud Sidik', tglMasuk:'2001-01-13', noKtp:'3500000000000009', noFinger:13,
    tglLahir:'1980-01-13', jenisKelamin:'L', levelKaryawan:'B', pendidikan:'SLTA' }),
  prKaryawanRow(14, { nama:'Wahono', tglMasuk:'1999-02-17', noKtp:'3500000000000010', noFinger:14,
    tglLahir:'1979-02-17', jenisKelamin:'L', levelKaryawan:'B', pendidikan:'SD' }),
  prKaryawanRow(15, { nama:'Dodi Kurniawan', tglMasuk:'1994-10-18', noKtp:'3500000000000011', noFinger:15,
    tglLahir:'1974-10-18', jenisKelamin:'L', levelKaryawan:'B', pendidikan:'SLTP' }),
  prKaryawanRow(16, { nama:'Sutini', tglMasuk:'2000-08-03', noKtp:'3500000000000012', noFinger:16,
    tglLahir:'1980-08-03', jenisKelamin:'P', levelKaryawan:'B', pendidikan:'SD' }),
];

// Daftar karyawan yang sedang dipakai modul Payroll (window.PR_KARYAWAN_LIVE, diisi PayrollPage) —
// supaya karyawan baru langsung muncul di dropdown Absensi/Produksi Harian. aktifSaja -> hanya aktif.
function prKaryawan(aktifSaja) {
  const list = window.PR_KARYAWAN_LIVE || PR_KARYAWAN;
  return aktifSaja ? list.filter(k => k.aktif !== false && !k.statusKeluar) : list;
}
window.prKaryawan = prKaryawan;
