// Manufaktur — seed data Surat Perintah Kerja (SPK).
//
// Data lengkap: setiap SPK punya baris Barang Jadi (bjLines, 1-5 baris) dan Bahan (bahanLines,
// 1-10 baris) terisi penuh — sebelumnya kosong/minim (cuma 1 baris tiap tabel), jadi kalau dibuka
// Edit/View, tabelnya kosong padahal ringkasan header sudah menampilkan angka. Pola sama seperti
// seed data dokumen Penjualan/Pembelian: helper baris + helper header. 16 record, mencakup semua
// 9 status di MF_STATUS_SPK. No. SPK memakai format F/K + SPK + YYMM + urut, sama seperti nomor
// yang dibuat otomatis oleh gerbang F/K di MfSpkDialog (lihat handleSave).

let _spkRowId = 9000;
function mfLookupKode(list, nama) { const f = list.find(x => x.nama === nama); return f ? f.kode : ''; }

function spkBjRow(kodeBarang, qtySPK, satuan, namaKelompokWarna, namaAz, namaBrand, stempel, mesinDipilih) {
  const b = MF_BARANG.find(x => x.code === kodeBarang);
  const namaMerkBarang = b ? b.merk : '';
  return {
    id: _spkRowId++, kodeBarang, namaBarang: b ? b.nama : '', qtySPK, satuan,
    kelompokWarna: mfLookupKode(MF_KELOMPOK_WARNA_LIST, namaKelompokWarna), namaKelompokWarna,
    az: mfLookupKode(MF_AZ_LIST, namaAz), namaAz,
    brand: mfLookupKode(MF_BRAND_LIST, namaBrand), namaBrand,
    merkBarang: mfLookupKode(MF_MERK_BARANG_LIST, namaMerkBarang), namaMerkBarang,
    stempel: stempel || '', mesinDipilih: mesinDipilih || [],
  };
}
function spkBahanRow(gudang, kodeBahan, jumlah, satuan) {
  const b = MF_BARANG.find(x => x.code === kodeBahan);
  return { id: _spkRowId++, gudang, kodeBahan, merkBahan: b ? b.merk : '', jumlah, satuan };
}

// Barang jadi & barang baku yang aktif dipakai (kode "*UM" sengaja dilewati, statusnya "Tidak").
const SPK_BJ_CODES = ['AS1023ATBBKW750', 'AS1023ATBBKW1500', 'AS1023ATGAKW1600', 'CO100TRSL0020', 'GAL023BRU750'];
const SPK_BAHAN_CODES = ['*CO', '*CO AGBESHD', '*CO100TRS00020', '*PCR3120AN120', 'AS1023ATBBKW750', 'AS1023ATBBKW1500', 'AS1023ATGAKW1600', 'CO100TRSL0020', 'GAL023BRU750', '*P', '*F'];
const SPK_WARNA = MF_KELOMPOK_WARNA_LIST.map(w => w.nama);
const SPK_AZ = MF_AZ_LIST.map(a => a.nama);
const SPK_BRAND = MF_BRAND_LIST.map(b => b.nama);

// Generator baris Barang Jadi (1-5 baris) — dipakai supaya tiap SPK punya beberapa barang jadi
// tanpa harus menulis setiap baris manual, tetap bervariasi lewat parameter offset.
function spkBjRows(count, offset, stempel) {
  return Array.from({ length: count }, (_, i) => {
    const idx = offset + i;
    return spkBjRow(
      SPK_BJ_CODES[idx % SPK_BJ_CODES.length],
      60 + ((idx * 37) % 440),
      MF_SATUAN_SPK[idx % MF_SATUAN_SPK.length],
      SPK_WARNA[idx % SPK_WARNA.length],
      SPK_AZ[idx % SPK_AZ.length],
      SPK_BRAND[idx % SPK_BRAND.length],
      i === 0 ? (stempel || '') : '',
      [MF_MESIN_LIST[idx % MF_MESIN_LIST.length], MF_MESIN_LIST[(idx + 3) % MF_MESIN_LIST.length]],
    );
  });
}

// Generator baris Bahan (1-10 baris) — sama alasannya dengan spkBjRows.
function spkBahanRows(count, offset) {
  return Array.from({ length: count }, (_, i) => {
    const idx = offset + i;
    const kode = SPK_BAHAN_CODES[idx % SPK_BAHAN_CODES.length];
    const satuan = (kode === '*P' || kode === '*F') ? 'PCS' : 'MTR';
    return spkBahanRow(MF_GUDANG_LIST[idx % MF_GUDANG_LIST.length], kode, 15 + ((idx * 23) % 285), satuan);
  });
}

function spkHead(no, tgl, status, bjLines, bahanLines, opts={}) {
  const isApproved = ['Approved', 'Realisasi', 'Selesai'].includes(status) || !!opts.isApproved;
  return {
    no, tgl, noSo: opts.noSo || '', stempel: opts.stempel || bjLines[0]?.stempel || '',
    status, tglKirim: opts.tglKirim || '',
    produk: bjLines[0]?.namaBarang || '', gudang: bahanLines[0]?.gudang || '',
    qty: bjLines[0]?.qtySPK || 0, kodeBahan: bahanLines[0]?.kodeBahan || '',
    bjLines, bahanLines,
    dibuatOleh: opts.dibuatOleh || 'Admin', dibuatTgl: opts.dibuatTgl || `${tgl} 08:00`,
    isApproved, disetujuiOleh: isApproved ? (opts.disetujuiOleh || 'Supervisor Produksi') : '',
    disetujuiTgl: isApproved ? (opts.disetujuiTgl || `${tgl} 10:30`) : '',
    Batal: status === 'Batal', Alasan_Batal: opts.alasanBatal || '',
  };
}

const MF_SPK_SEED = [
  spkHead('FSPK26060601', '01-06-2026', 'Draft',
    spkBjRows(1, 0), spkBahanRows(2, 0), {}),

  spkHead('KSPK26060602', '02-06-2026', 'Pending Approval',
    spkBjRows(2, 1, 'Urgent'), spkBahanRows(4, 2), { noSo:'KSO26070001', tglKirim:'2026-06-10' }),

  spkHead('FSPK26060603', '03-06-2026', 'Approved',
    spkBjRows(3, 3, 'Lunas COD'), spkBahanRows(6, 5), { noSo:'FSO26070002', tglKirim:'2026-06-11' }),

  spkHead('KSPK26060604', '04-06-2026', 'Proses',
    spkBjRows(1, 4), spkBahanRows(3, 8), {}),

  spkHead('FSPK26060605', '05-06-2026', 'Realisasi',
    spkBjRows(4, 5, 'VIP Customer'), spkBahanRows(8, 11), { noSo:'KSO26070003', tglKirim:'2026-06-12' }),

  spkHead('KSPK26060606', '06-06-2026', 'Realisasi',
    spkBjRows(2, 6), spkBahanRows(5, 15), { tglKirim:'2026-06-13' }),

  spkHead('FSPK26060607', '07-06-2026', 'Selesai',
    spkBjRows(3, 7, 'Kapal Langka'), spkBahanRows(7, 18), { noSo:'KSO26070004', tglKirim:'2026-06-14' }),

  spkHead('KSPK26060608', '08-06-2026', 'Hold',
    spkBjRows(1, 8), spkBahanRows(2, 22), {}),

  spkHead('FSPK26060609', '09-06-2026', 'Draft',
    spkBjRows(2, 9), spkBahanRows(4, 25), {}),

  spkHead('KSPK26060610', '10-06-2026', 'Pending Approval',
    spkBjRows(5, 10, 'Cek ada Gabungan'), spkBahanRows(10, 29), { noSo:'FSO26070005', tglKirim:'2026-06-16' }),

  spkHead('FSPK26060611', '11-06-2026', 'Approved',
    spkBjRows(2, 11), spkBahanRows(3, 34), { tglKirim:'2026-06-17' }),

  spkHead('KSPK26060612', '12-06-2026', 'Batal',
    spkBjRows(1, 12), spkBahanRows(2, 37), { alasanBatal:'Order dibatalkan customer, bahan belum diproses' }),

  spkHead('FSPK26060613', '13-06-2026', 'Proses',
    spkBjRows(3, 13, 'Urgent'), spkBahanRows(6, 39), { noSo:'KSO26070006', tglKirim:'2026-06-19' }),

  spkHead('KSPK26060614', '14-06-2026', 'Realisasi',
    spkBjRows(4, 14), spkBahanRows(9, 45), { noSo:'KSO26070007', tglKirim:'2026-06-20' }),

  spkHead('FSPK26060615', '15-06-2026', 'Selesai',
    spkBjRows(1, 15, 'Lunas COD'), spkBahanRows(1, 54), { tglKirim:'2026-06-21' }),

  spkHead('KSPK26060616', '16-06-2026', 'Batal',
    spkBjRows(2, 16), spkBahanRows(3, 55), { alasanBatal:'Salah input spesifikasi warna, dibuat ulang sebagai SPK baru' }),
];
