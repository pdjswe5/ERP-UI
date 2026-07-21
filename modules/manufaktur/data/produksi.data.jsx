// Manufaktur — seed data Hasil Produksi & Pemakaian Bahan.
//
// Data lengkap: setiap record punya spkLines terisi (referensi nyata ke MF_SPK_SEED, 1-4 baris per
// record), sebelumnya tidak ada field spkLines sama sekali — jadi kalau dibuka Edit, tabel Daftar
// SPK selalu kosong walau header sudah menampilkan No. SPK. No. Bukti pakai format F/K + HP + YYMM
// (sama pola dengan gerbang F/K SPK/KO/SO/DO), field header Tgl. Bukti & Gudang field asli (bukan
// turunan dari baris SPK pertama). 12 record, tiap baris SPK dibangun dari helper generator supaya
// variatif tanpa menulis manual satu-satu.

let _hpRowId = 7000;
function hpSpkLine(spkNo, opts={}) {
  const spk = MF_SPK_SEED.find(s => s.no === spkNo);
  const bahan = MF_BARANG.find(b => b.code === spk?.kodeBahan);
  const gudangEntry = GUDANG_DATA.find(g => g.nama === spk?.gudang);
  const firstBj = (spk?.bjLines || [])[0];
  return {
    id: _hpRowId++, noSpk: spkNo,
    sisaStok: String(spk?.qty ?? '0.00'),
    kodeBahan: spk?.kodeBahan || '', namaBahan: bahan ? bahan.nama : '',
    gudang: spk?.gudang || '', kodeGudang: gudangEntry ? gudangEntry.kode : '',
    merkSpk: firstBj?.namaMerkBarang || spk?.produk || '', kodeMerkSpk: firstBj?.merkBarang || '',
    noCoil: opts.noCoil || '', pembelian: opts.pembelian || '',
    tgl: opts.tgl || spk?.tgl || '2026-06-24',
    jumlah: firstBj?.qtySPK ?? spk?.qty ?? '', satuanJ: firstBj?.satuan || 'MTR',
    kondisi: opts.kondisi || 'Normal', lapisanPu: opts.lapisanPu || 'Atas',
  };
}

function hpHead(no, tgl, gudang, spkLines, opts={}) {
  const first = spkLines[0];
  return {
    no, tgl, gudang,
    noSpk: first?.noSpk || '', noCoil: first?.noCoil || '', kondisi: first?.kondisi || '',
    spkLines, totalBarang: spkLines.length,
    dibuatOleh: opts.dibuatOleh || 'Admin', dibuatTgl: opts.dibuatTgl || `${tgl} 09:00`,
  };
}

// SPK yang dipakai sebagai referensi (SPK berstatus Batal sengaja dilewati — tidak masuk akal
// punya hasil produksi), dan pilihan No. Coil / Kondisi COIL untuk variasi baris.
const HP_CANDIDATE_SPK = [
  'FSPK26060603', 'KSPK26060604', 'FSPK26060605', 'KSPK26060606', 'FSPK26060607',
  'FSPK26060611', 'FSPK26060613', 'KSPK26060614', 'FSPK26060615', 'KSPK26060602',
  'KSPK26060610', 'FSPK26060601', 'KSPK26060608', 'FSPK26060609',
];
const HP_COIL_NOS = ['CO-2026-001', 'CO-2026-002', 'CO-2026-003', 'CO-2026-004', 'CO-2026-005', 'CO-2026-006'];
const HP_KONDISI = ['Normal', 'Termasuk Tong Coil', 'Sisa Slitting PU', 'Tong Coil & Sisa Slitting PU'];

// Generator baris Daftar SPK (1-4 baris per Hasil Produksi) — dipakai supaya tiap record punya
// beberapa detail SPK tanpa harus menulis tiap baris manual, tetap bervariasi lewat offset.
function hpSpkLines(count, offset) {
  return Array.from({ length: count }, (_, i) => {
    const idx = offset + i;
    return hpSpkLine(HP_CANDIDATE_SPK[idx % HP_CANDIDATE_SPK.length], {
      noCoil: HP_COIL_NOS[idx % HP_COIL_NOS.length],
      kondisi: HP_KONDISI[idx % HP_KONDISI.length],
    });
  });
}

const MF_PRODUKSI_SEED = [
  hpHead('KHP26060601', '24-06-2026', 'Gudang Utama', hpSpkLines(2, 0)),
  hpHead('FHP26060602', '23-06-2026', 'Gudang B', hpSpkLines(1, 2)),
  hpHead('KHP26060603', '22-06-2026', 'Gudang Utama', hpSpkLines(3, 3)),
  hpHead('FHP26060604', '21-06-2026', 'Gudang Produksi', hpSpkLines(2, 6)),
  hpHead('KHP26060605', '20-06-2026', 'Gudang C', hpSpkLines(4, 8)),
  hpHead('FHP26060606', '19-06-2026', 'Gudang Utama', hpSpkLines(1, 12)),
  hpHead('KHP26060607', '18-06-2026', 'Gudang B', hpSpkLines(2, 13)),
  hpHead('FHP26060608', '17-06-2026', 'Gudang Produksi', hpSpkLines(3, 15)),
  hpHead('KHP26060609', '16-06-2026', 'Gudang Utama', hpSpkLines(1, 18)),
  hpHead('FHP26060610', '15-06-2026', 'Gudang C', hpSpkLines(4, 19)),
  hpHead('KHP26060611', '14-06-2026', 'Gudang B', hpSpkLines(2, 23)),
  hpHead('FHP26060612', '13-06-2026', 'Gudang Utama', hpSpkLines(3, 25)),
];
