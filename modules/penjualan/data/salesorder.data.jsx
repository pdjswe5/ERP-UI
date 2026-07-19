// Penjualan — data & config Sales Order (SO)
//
// Status SO dihitung otomatis dari realisasi barang (lihat soComputeStatus/soStatusPill di bawah),
// sama seperti pola Pembelian — kecuali "Selesai Manual" yang merupakan override manual (aksi
// "Selesaikan Manual"). 5 kemungkinan: Belum Realisasi / Selesai Sebagian / Selesai / Selesai Manual / Batal.
// Referensi ke Konfirmasi Order tetap di header (field No_Ko, relasi 1-ke-1 KO<->SO).

function soItem(kode, jumlah, disc1, discRp, realisasi=0, deskripsi='') {
  const produk = BARANG.find(b => b.code === kode);
  return {
    Kode_Item:kode, Nama_Item: produk ? produk.name : '', Deskripsi:deskripsi,
    Jumlah:jumlah, Realisasi:realisasi, Konversi:1, Satuan:'PCS',
    Hrg_Sat: produk ? (produk.hpp || produk.hargaBeli || 0) : 0,
    DiscPros_Det:disc1, DiscNilai_Det:discRp,
  };
}

function soJasaItem(kode, nama, jumlah, harga, deskripsi='') {
  return { Kode_Item:kode, Nama_Item:nama, Deskripsi:deskripsi, Jumlah:jumlah, Satuan:'PCS', Hrg_Sat:harga, DiscPros_Det:0, DiscNilai_Det:0 };
}

function soHead(no, tgl, custCode, salesName, kreditTunai, tempo, ket, details, details2, opts={}) {
  const cust = PJ_PELANGGAN.find(p => p.code === custCode);
  const salesIdx = PJ_SALES_LIST.indexOf(salesName);
  const kasbank = opts.kasbank ? PJ_KASBANK.find(k => k.kode === opts.kasbank) : null;
  return {
    No_Bukti:no, Tgl_Bukti:tgl, No_Referensi: opts.noReferensi || '',
    Kode_Cust:custCode, Nama_Cust: cust ? cust.name : custCode,
    Kode_Sales: salesIdx >= 0 ? `SL00${salesIdx+1}` : (cust ? cust.kodeSales || '' : ''), Nama_Sales:salesName,
    Kredit_Tunai:kreditTunai, Tempo:tempo, TempoLama: opts.tempoLama ?? tempo, TempoCetak: opts.tempoCetak ?? tempo,
    Kode_Kasbank: kreditTunai === 'TUNAI' ? (kasbank ? kasbank.kode : '') : '',
    Nama_Kasbank: kreditTunai === 'TUNAI' ? (kasbank ? kasbank.nama : '') : '',
    JualCoil: opts.jualCoil || 'N', Tgl_Kirim: opts.tglKirim || tgl,
    Alamat_Kirim: opts.alamatKirim || (cust ? cust.alamat : ''),
    Keterangan:ket, PPN:11, PPN_Include:false, DiscPros_Head: opts.disc ?? 0, DiscNilai_Head: opts.discRp ?? 0,
    Nm_Kirim: opts.nmKirim || (cust ? cust.namaPemesan : ''), Kt_Kirim: opts.ktKirim || (cust ? cust.kota : ''), Tel_Kirim: opts.telKirim || (cust ? cust.tel : ''),
    Locofranco: opts.incoterm || 'Franco', Klasifikasi: opts.klasifikasi || (cust ? cust.klasifikasi : ''),
    Kode_Spv: opts.kodeSpv || '', Nama_Spv: opts.namaSpv || '',
    Proyek: opts.proyek || '', No_Po: opts.noPo || '', No_Ko: opts.noKo || '', Expedisi: opts.expedisi || '',
    Status: opts.status || '', Alasan_Status: opts.alasanStatus || '', Batal: !!opts.batal, Alasan_Batal: opts.alasanBatal || '',
    Creator: opts.creator || 'PDJ Administrator', Jam_Create:`${tgl}T09:30:00`, Editor: opts.editor ?? 'PDJ Administrator', Jam_Edit: opts.editor === '' ? null : `${tgl}T10:15:00`,
    Details:details, Details2: details2 || [],
  };
}

const SALES_ORDER_SEED = [
  soHead('KSO26070001', '2026-07-09', 'b7364', 'Sales Baru 2', 'KREDIT', 14, 'Order rutin bulanan', [
    soItem('P-EF1001', 20, 0, 0, 0),
    soItem('P-AF4022', 15, 0, 0, 0),
    soItem('P-OL7022', 30, 0, 0, 0),
    soItem('P-CO4411', 25, 0, 0, 0),
    soItem('P-AK5520', 10, 0, 0, 0),
  ], [], { noKo:'KKO20260001', creator:'Ucup', editor:'' }),
  soHead('FSO26070002', '2026-07-10', 'C001', 'Sales Senior', 'TUNAI', 0, '', [
    soItem('P-BK2104', 8, 5, 0, 8),
    soItem('P-BK2105', 4, 0, 0, 4),
    soItem('P-SH1140', 6, 0, 0, 2),
    soItem('P-TY8801', 12, 0, 0, 12),
    soItem('P-BT3300', 5, 0, 0, 0),
    soItem('P-WB2210', 3, 0, 0, 3),
  ], [
    soJasaItem('JASA-01', 'Biaya Pemasangan', 1, 250000),
  ], { noKo:'KKO20260003', noPo:'PO-SJS-9981', expedisi:'Indah Cargo', kasbank:'1005.001' }),
  soHead('KSO26070003', '2026-07-05', 'C012', 'Sales Junior 1', 'KREDIT', 30, 'Dibatalkan, customer batal order', [
    soItem('P-SP3201', 10, 0, 0, 0),
    soItem('P-AF4022', 6, 0, 0, 0),
    soItem('P-OL7022', 12, 0, 0, 0),
    soItem('P-CO4411', 8, 0, 0, 0),
    soItem('P-AK5520', 5, 0, 0, 0),
  ], [], { proyek:'Proyek Pergudangan Blok A', batal:true, alasanStatus:'Customer membatalkan pesanan' }),
  soHead('KSO26070004', '2026-07-11', 'g123', 'Sales Junior 2', 'KREDIT', 21, 'Order proyek renovasi armada', [
    soItem('P-BK2104', 20, 5, 0, 20),
    soItem('P-BK2105', 12, 0, 0, 12),
    soItem('P-SP3201', 16, 0, 0, 16),
    soItem('P-AF4022', 18, 0, 0, 18),
    soItem('P-CL5500', 6, 0, 0, 6),
    soItem('P-TR6611', 4, 0, 0, 4),
    soItem('P-OL7022', 40, 0, 0, 40),
  ], [
    soJasaItem('JASA-02', 'Biaya Jasa Service', 1, 500000),
  ], { noKo:'KKO20260004' }),
  soHead('FSO26070005', '2026-07-12', 'H01', 'Sales Baru 2', 'TUNAI', 0, 'Order stok toko cabang', [
    soItem('P-TY8801', 10, 0, 0, 0),
    soItem('P-LT9210', 4, 0, 0, 0),
    soItem('P-SH1140', 8, 0, 0, 0),
    soItem('P-BT3300', 10, 0, 0, 0),
    soItem('P-CO4411', 20, 0, 0, 0),
    soItem('P-AK5520', 12, 0, 0, 0),
    soItem('P-WB2210', 6, 0, 0, 0),
  ], [], { kasbank:'1005.000' }),
  soHead('KSO26070006', '2026-07-13', 'KV001', 'Sales Senior', 'KREDIT', 14, 'Order ditutup manual, sisa dibatalkan customer', [
    soItem('P-EF1001', 15, 0, 0, 0),
    soItem('P-AF4022', 10, 0, 0, 0),
    soItem('P-OL7022', 20, 0, 0, 0),
    soItem('P-SP3201', 8, 0, 0, 0),
    soItem('P-CO4411', 15, 0, 0, 0),
  ], [], { noKo:'KKO20260006', status:'SELESAI', alasanStatus:'Sisa order dibatalkan customer, ditutup manual oleh operator' }),
  soHead('KSO26070007', '2026-07-14', 'L001', 'Sales Junior 1', 'KREDIT', 30, 'Order bertahap, pengiriman dicicil', [
    soItem('P-BK2104', 14, 5, 0, 14),
    soItem('P-BK2105', 8, 0, 0, 4),
    soItem('P-SP3201', 12, 0, 0, 0),
    soItem('P-AF4022', 10, 0, 0, 10),
    soItem('P-CL5500', 5, 0, 0, 0),
    soItem('P-TR6611', 3, 0, 0, 3),
    soItem('P-OL7022', 25, 0, 0, 10),
    soItem('P-TY8801', 8, 0, 0, 0),
    soItem('P-LT9210', 2, 0, 0, 2),
  ], [
    soJasaItem('JASA-01', 'Biaya Pemasangan', 1, 250000),
    soJasaItem('JASA-03', 'Biaya Pengiriman Ekspres', 1, 175000),
  ], { noKo:'KKO20260007' }),
  soHead('FSO26070008', '2026-07-15', 'L002', 'Sales Junior 2', 'TUNAI', 0, 'Order aksesoris lengkap', [
    soItem('P-BT3300', 15, 0, 0, 15),
    soItem('P-CO4411', 30, 0, 0, 30),
    soItem('P-AK5520', 20, 0, 0, 20),
    soItem('P-WB2210', 10, 0, 0, 10),
    soItem('P-SH1140', 6, 0, 0, 6),
    soItem('P-TY8801', 16, 0, 0, 16),
  ], [], { kasbank:'1005.003' }),
  soHead('KSO26070009', '2026-07-16', 'L015', 'Sales Baru 2', 'KREDIT', 21, 'Dibatalkan, stok tidak tersedia', [
    soItem('P-LT9210', 6, 0, 0, 0),
    soItem('P-CL5500', 4, 0, 0, 0),
    soItem('P-TR6611', 3, 0, 0, 0),
    soItem('P-SH1140', 5, 0, 0, 0),
    soItem('P-BT3300', 8, 0, 0, 0),
  ], [], { batal:true, alasanBatal:'Stok tidak tersedia, order dibatalkan' }),
  soHead('KSO26070010', '2026-07-17', 'p12345', 'Sales Senior', 'KREDIT', 14, 'Order besar proyek gudang utama', [
    soItem('P-EF1001', 30, 0, 0, 30),
    soItem('P-BK2104', 20, 5, 0, 20),
    soItem('P-BK2105', 12, 0, 0, 12),
    soItem('P-SP3201', 18, 0, 0, 18),
    soItem('P-AF4022', 22, 0, 0, 22),
    soItem('P-CL5500', 8, 0, 0, 8),
    soItem('P-TR6611', 5, 0, 0, 5),
    soItem('P-OL7022', 45, 0, 0, 45),
    soItem('P-TY8801', 14, 0, 0, 14),
    soItem('P-LT9210', 5, 0, 0, 5),
    soItem('P-SH1140', 10, 0, 0, 10),
    soItem('P-BT3300', 12, 0, 0, 12),
  ], [
    soJasaItem('JASA-02', 'Biaya Jasa Service', 2, 500000),
  ], { noKo:'KKO20260010', expedisi:'Indah Cargo' }),
];

function soComputeStatus(row) {
  if (row.Batal || row.Status === 'BATAL') return 'BATAL';
  if (row.Status === 'SELESAI') return 'SELESAI_MANUAL';
  const details = row.Details || [];
  if (details.length === 0) return 'BELUM_REALISASI';
  const realizedCount = details.filter(d => (+d.Realisasi || 0) > 0).length;
  const fullyRealizedCount = details.filter(d => (+d.Jumlah || 0) > 0 && (+d.Realisasi || 0) >= (+d.Jumlah || 0)).length;
  if (fullyRealizedCount === details.length) return 'SELESAI';
  if (realizedCount > 0) return 'SELESAI_SEBAGIAN';
  return 'BELUM_REALISASI';
}

function soStatusPill(row) {
  const s = soComputeStatus(row);
  if (s === 'BATAL') return <span className="pill cancelled">Batal</span>;
  if (s === 'SELESAI_MANUAL') return <span className="pill approved">Selesai Manual</span>;
  if (s === 'SELESAI') return <span className="pill approved">Selesai</span>;
  if (s === 'SELESAI_SEBAGIAN') return <span className="pill pending">Selesai Sebagian</span>;
  return <span className="pill draft">Belum Realisasi</span>;
}

// "Buat SO dari KO" — mengambil semua data relevan dari 1 dokumen Konfirmasi Penjualan (KO) dan
// menuangkannya ke form SO yang sedang dibuat (hanya berlaku saat CREATE, sebelum SO disimpan).
function soApplyKoData(set, ko) {
  const custByCode = PJ_PELANGGAN.find(p => p.code === ko.kodeCustomer) || PJ_PELANGGAN.find(p => p.name === ko.customer);
  const salesMatch = PJ_SALES.find(s => s.nama === ko.sales);
  const iu = ko.informasiUmum || {};
  const bayar = ko.pembayaran || {};
  set('No_Ko', ko.noBukti);
  set('Nama_Cust', ko.customer || '');
  set('Kode_Cust', ko.kodeCustomer || (custByCode ? custByCode.code : ''));
  set('Nama_Sales', ko.sales || '');
  set('Kode_Sales', salesMatch ? salesMatch.kode : (custByCode ? custByCode.kodeSales || '' : ''));
  set('Kredit_Tunai', ko.caraBayar || '');
  set('Tempo', bayar.tempo || 0);
  set('TempoLama', bayar.tempo || 0);
  set('TempoCetak', bayar.tempo || 0);
  set('No_Referensi', iu.noRef || '');
  set('Alamat_Kirim', iu.alamatPengiriman || '');
  set('Locofranco', iu.incoterm || '');
  set('Klasifikasi', iu.klasifikasi || '');
  set('Keterangan', iu.keterangan || '');
  set('Details', (ko.barang || []).map(b => ({
    Kode_Item:b.Kode_Item, Nama_Item:b.Nama_Item, Deskripsi:b.Deskripsi || '', Jumlah:b.Jumlah || 0, Realisasi:0,
    Konversi:1, Satuan:b.Satuan || 'PCS', Hrg_Sat:b.Hrg_Sat || 0, DiscPros_Det:0, DiscNilai_Det:0,
  })));
  set('Details2', (ko.biaya || []).map(b => ({
    Kode_Item:b.Kode_Item || '', Nama_Item:b.Nama_Item || '', Deskripsi:b.Deskripsi || '', Jumlah:b.Jumlah || 0,
    Satuan:b.Satuan || '', Hrg_Sat:b.Hrg_Sat || 0, DiscPros_Det:0, DiscNilai_Det:0,
  })));
}

function soClearKoData(set) {
  set('No_Ko', ''); set('Nama_Cust', ''); set('Kode_Cust', ''); set('Nama_Sales', ''); set('Kode_Sales', '');
  set('Kredit_Tunai', ''); set('Tempo', 0); set('TempoLama', 0); set('TempoCetak', 0);
  set('No_Referensi', ''); set('Alamat_Kirim', ''); set('Locofranco', ''); set('Klasifikasi', ''); set('Keterangan', '');
  set('Details', []); set('Details2', []);
}

// Picker dokumen Konfirmasi Penjualan (pilih satu) — dipakai tombol "Buat SO dari KO"/"Ganti Data KO".
function KoDocPickerModal({ list, onCancel, onConfirm }) {
  const [q, setQ] = React.useState('');
  const filtered = React.useMemo(() => {
    if (!q) return list;
    const ql = q.toLowerCase();
    return list.filter(k => k.noBukti.toLowerCase().includes(ql) || (k.customer || '').toLowerCase().includes(ql));
  }, [list, q]);
  return (
    <div className="modal-backdrop" style={{zIndex:110}} onClick={onCancel}>
      <div className="modal item-picker-modal" onClick={e=>e.stopPropagation()}>
        <div className="modal-head"><h2>Pilih Konfirmasi Penjualan</h2><button className="btn btn-icon" onClick={onCancel}>{I.x(16)}</button></div>
        <div className="modal-body">
          <div style={{display:'flex', justifyContent:'flex-end', marginBottom:12}}>
            <div className="field" style={{width:'40%', minWidth:200, marginBottom:0}}>
              <div className="input-w-icon">{I.search(14)}<input className="input" placeholder="Cari no. bukti atau customer…" value={q} onChange={e=>setQ(e.target.value)}/></div>
            </div>
          </div>
          <div className="line-items picker-table" style={{maxHeight:320, overflowY:'auto'}}>
            <table>
              <thead><tr><th>No. Bukti</th><th>Customer</th><th>Tgl. Bukti</th><th>Status</th></tr></thead>
              <tbody>
                {filtered.length === 0 && <tr><td colSpan={4} className="empty">Tidak ditemukan.</td></tr>}
                {filtered.map(k => (
                  <tr key={k.noBukti} style={{cursor:'pointer'}} onClick={()=>onConfirm(k)}>
                    <td className="mono">{k.noBukti}</td>
                    <td>{k.customer}</td>
                    <td>{k.tglBukti}</td>
                    <td>{koStatusPill(k)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="modal-foot">
          <div className="muted" style={{fontSize:12.5}}>Klik salah satu baris untuk memilih.</div>
          <div className="right" style={{display:'flex', gap:8}}>
            <button className="btn" onClick={onCancel}>Batal</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function soKoBannerFactory(konfirmasiList) {
  return function SoKoBanner({ form, set, isCreate }) {
    const [pickerOpen, setPickerOpen] = React.useState(false);
    if (!isCreate) return null;
    const hasKo = !!form.No_Ko;
    return (
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16}}>
        <div className="muted" style={{fontSize:12.5}}>
          {hasKo ? `Data diambil dari Konfirmasi Penjualan: ${form.No_Ko}` : 'Isi manual, atau ambil data dari Konfirmasi Penjualan yang sudah ada.'}
        </div>
        <div style={{display:'flex', gap:8}}>
          {hasKo && <button type="button" className="btn btn-sm" onClick={()=>soClearKoData(set)}>{I.x(14)} Clear Data KO</button>}
          <button type="button" className="btn btn-primary btn-sm" onClick={()=>setPickerOpen(true)}>{I.plus()} {hasKo ? 'Ganti Data KO' : 'Buat SO dari KO'}</button>
        </div>
        {pickerOpen && (
          <KoDocPickerModal
            list={konfirmasiList}
            onCancel={()=>setPickerOpen(false)}
            onConfirm={(ko)=>{ soApplyKoData(set, ko); setPickerOpen(false); }}
          />
        )}
      </div>
    );
  };
}

// Opsi khusus Sales Order (LOKAL — sengaja tidak memakai PJ_INCOTERM_OPTS/PJ_KLASIFIKASI_OPTS
// yang dipakai bersama dokumen Penjualan lain seperti KO, supaya perubahan ini tidak mengubah
// opsi dropdown dokumen lain).
const SO_INCOTERM_OPTS = ['Loco', 'Franco'].map(v => ({ value:v, label:v }));
const SO_KLASIFIKASI_OPTS = ['Retail', 'Konsultan', 'Proyek'].map(v => ({ value:v, label:v }));
const SO_JUALCOIL_OPTS = [{ value:'N', label:'N' }, { value:'Y', label:'Y' }];

function soKasbankOpts() { return PJ_KASBANK.map(k => ({ value:k.nama, label:k.nama })); }

function salesOrderTabs(konfirmasiList) {
  return [
    { id:'umum', label:'Informasi Umum', type:'fields', TopComponent: soKoBannerFactory(konfirmasiList), fields:[
      { key:'No_Bukti', label:'No. Bukti', mono:true, readOnly:true },
      { key:'Tgl_Bukti', label:'Tgl. Bukti', type:'date', required:true },
      { key:'Nama_Cust', label:'Nama Customer', type:'select', required:true, span:2,
        options: () => PJ_PELANGGAN.map(p => ({ value:p.name, label:p.name })),
        onChange: (val, set) => {
          const p = PJ_PELANGGAN.find(x => x.name === val);
          set('Kode_Cust', p ? p.code : '');
          set('Kode_Sales', p ? p.kodeSales || '' : '');
          set('Nama_Sales', p ? p.namaSales || '' : '');
        } },
      { key:'Kode_Cust', label:'Kode Customer', mono:true, readOnly:true, span:1 },
      { key:'Nama_Sales', label:'Nama Sales', mono:true, readOnly:true, span:2 },
      { key:'Kode_Sales', label:'Kode Sales', mono:true, readOnly:true, span:1 },
      { key:'No_Referensi', label:'No. Referensi' },
      { key:'No_Ko', label:'Ref. Konfirmasi Order', mono:true, lockOnEdit:true,
        type:'select', options: () => konfirmasiList.map(k => ({ value:k.noBukti, label:k.noBukti })) },
      { key:'Kredit_Tunai', label:'Kredit/Tunai', type:'select', options:PJ_KREDIT_TUNAI_OPTS, lockOnEdit:true },
      { key:'Tempo', label:'TOP Real (Hari)', type:'number', disabledIf: (f) => f.Kredit_Tunai === 'TUNAI', clearValue:0 },
      { key:'TempoLama', label:'TOP Lama (Hari)', type:'number', disabledIf: (f) => f.Kredit_Tunai === 'TUNAI', clearValue:0 },
      { key:'TempoCetak', label:'TOP Cetak (Hari)', type:'number', disabledIf: (f) => f.Kredit_Tunai === 'TUNAI', clearValue:0 },
      { key:'Nama_Kasbank', label:'No Kasbank', span:2, type:'select', options: soKasbankOpts,
        disabledIf: (f) => f.Kredit_Tunai !== 'TUNAI', clearValue:'',
        onChange: (val, set) => { const k = PJ_KASBANK.find(x => x.nama === val); set('Kode_Kasbank', k ? k.kode : ''); } },
      { key:'Kode_Kasbank', label:'Kode Kasbank', mono:true, readOnly:true, span:1, disabledIf: (f) => f.Kredit_Tunai !== 'TUNAI', clearValue:'' },
      { key:'JualCoil', label:'Jual Coil', type:'select', options:SO_JUALCOIL_OPTS, default:'N' },
      { key:'Tgl_Kirim', label:'Tgl. Kirim', type:'date' },
      { key:'Klasifikasi', label:'Klasifikasi', type:'select', options:SO_KLASIFIKASI_OPTS },
      { key:'Locofranco', label:'Incoterm', type:'select', options:SO_INCOTERM_OPTS },
      { key:'Expedisi', label:'Expedisi' },
      { key:'Alamat_Kirim', label:'Alamat Kirim', type:'textarea', span:3 },
      { key:'Keterangan', label:'Keterangan', type:'textarea', span:3 },
    ]},
    { id:'barang', label:'Barang', type:'items', itemsKey:'Details', produk:true, lockItems:true },
    { id:'nonprodukjasa', label:'Non-Produk atau Jasa', type:'items', itemsKey:'Details2', showTotal:true, columns:[
      { key:'Kode_Item', label:'Kode', mono:true, width:110 },
      { key:'Nama_Item', label:'Nama', width:300 },
      { key:'Deskripsi', label:'Deskripsi', width:200 },
      { key:'Jumlah', label:'Jumlah', type:'number', num:true, width:90 },
      { key:'Satuan', label:'Satuan', width:90 },
      { key:'Hrg_Sat', label:'Harga Satuan', type:'number', num:true, width:130 },
      { key:'DiscPros_Det', label:'Disc (%)', type:'number', num:true, width:90 },
      { key:'DiscNilai_Det', label:'Disc (Rp)', type:'number', num:true, width:120 },
    ], itemSource:{ data:PJ_AKUN_BIAYA, codeKey:'Kode_Item', nameKey:'Nama_Item' }, lockItems:true },
  ];
}
