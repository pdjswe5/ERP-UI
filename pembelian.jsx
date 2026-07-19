// Pembelian module — 8 sub-modul (Katalog Pemasok, PR, RFQ, Quotation, GR, PO, Beli, Retur Beli)
// Field mengikuti nama field API asli (Postman ERP Master/Transaksi), data dummy lokal saja.

// ---------- Master data ----------
const PB_SUPPLIER = [
  { Kode_Supp:'AG001', Nama_Supp:'PT. Antigravity Test', Owner:'Bob', Kontak:'Alice', Telpon:'0812345678', Email:'antigravity@test.com', Aktif:true,
    Alamat:'Jl. Teknik Kimia', Kelurahan:'Keputih', Kecamatan:'Sukolilo', Kota:'Surabaya', KodePos:'60111',
    No_NPWP:'123456789012345', No_NIK:'1234567890123456', Nama_Pajak:'PT. Antigravity Test', Alamat_Pajak:'Jl. Teknik Kimia', Kota_Pajak:'Surabaya',
    Tempo:30, Plafon:50000000, Keterangan:'Supplier bahan baku utama' },
  { Kode_Supp:'MRR001', Nama_Supp:'Mr. ReyRehan', Owner:'Rey Rehan', Kontak:'Rehan', Telpon:'081234567890', Email:'reyrehan@supplier.com', Aktif:true,
    Alamat:'Jl. Rungkut Industri No. 12', Kelurahan:'Rungkut', Kecamatan:'Rungkut', Kota:'Surabaya', KodePos:'60293',
    No_NPWP:'234567890123456', No_NIK:'2345678901234567', Nama_Pajak:'Mr. ReyRehan', Alamat_Pajak:'Jl. Rungkut Industri No. 12', Kota_Pajak:'Surabaya',
    Tempo:14, Plafon:30000000, Keterangan:'' },
  { Kode_Supp:'P003', Nama_Supp:'PT. Prima Baja Sentosa', Owner:'Hendra Wijaya', Kontak:'Fina', Telpon:'0315678901', Email:'prima@baja.co.id', Aktif:true,
    Alamat:'Jl. Rungkut Industri Raya 45', Kelurahan:'Kalirungkut', Kecamatan:'Rungkut', Kota:'Surabaya', KodePos:'60293',
    No_NPWP:'345678901234567', No_NIK:'', Nama_Pajak:'PT. Prima Baja Sentosa', Alamat_Pajak:'Jl. Rungkut Industri Raya 45', Kota_Pajak:'Surabaya',
    Tempo:30, Plafon:75000000, Keterangan:'' },
  { Kode_Supp:'S006', Nama_Supp:'CV. Sinar Metal', Owner:'Agus Salim', Kontak:'Agus', Telpon:'0317890123', Email:'sinarmetal@gmail.com', Aktif:true,
    Alamat:'Jl. Kedung Cowek 88', Kelurahan:'Kedinding', Kecamatan:'Kenjeran', Kota:'Surabaya', KodePos:'60129',
    No_NPWP:'', No_NIK:'4567890123456789', Nama_Pajak:'', Alamat_Pajak:'', Kota_Pajak:'',
    Tempo:7, Plafon:15000000, Keterangan:'Supplier lokal, bayar cepat' },
  { Kode_Supp:'S001', Nama_Supp:'PT. Sinar Jaya', Owner:'Budi Santoso', Kontak:'Budi', Telpon:'0315551234', Email:'sinarjaya@ptsj.co.id', Aktif:false,
    Alamat:'Jl. Dharmahusada 200', Kelurahan:'Mulyorejo', Kecamatan:'Mulyorejo', Kota:'Surabaya', KodePos:'60115',
    No_NPWP:'567890123456789', No_NIK:'', Nama_Pajak:'PT. Sinar Jaya', Alamat_Pajak:'Jl. Dharmahusada 200', Kota_Pajak:'Surabaya',
    Tempo:30, Plafon:0, Keterangan:'Non-aktif sementara' },
];

const PB_PURCHASING_ORG = [
  { kode:'PCO_0001', nama:'Divisi Pengadaan Pusat' },
  { kode:'PCO_0002', nama:'Divisi Pengadaan Bahan Baku' },
];
const PB_SATUAN = ['LEMBAR', 'LBR', 'PCS', 'Haluan', 'KG', 'ROLL'];
const PB_AKUN = [
  { kode:'100.001', nama:'Kas Besar' },
  { kode:'100.003', nama:'Kas Kecil' },
  { kode:'200.001', nama:'Biaya Angkut Pembelian' },
  { kode:'200.002', nama:'Biaya Bongkar Muat' },
];
const PB_PRODUK = [
  { kode:'AA0450914100550', nama:'BAHAN ABU ANGKOLA TEBAL 0.45 LEBAR 914 MM AZ 100 G-550', satuan:'LEMBAR', harga:275000 },
  { kode:'BB040091470550', nama:'BAHAGIA BIRU BROMO TEBAL 0.40 LEBAR 914 MM AZ 70 G-550', satuan:'LBR', harga:260000 },
  { kode:'AS1025ATBONON075000410', nama:'ATAP SALJU 4CM TEBAL 0.25 ATAP BIRU BOGOWONTO NON BSI LEBAR 750 MM PANJANG 4.10 MTR', satuan:'PCS', harga:98000 },
];

function pbProdukNama(kode) { return PB_PRODUK.find(p => p.kode === kode)?.nama || ''; }
function pbSuppNama(kode) { return PB_SUPPLIER.find(s => s.Kode_Supp === kode)?.Nama_Supp || kode; }
function pbOrgNama(kode) { return PB_PURCHASING_ORG.find(o => o.kode === kode)?.nama || kode; }
function pbGudangNama(kode) { return GUDANG_DATA.find(g => g.kode === kode)?.nama || kode; }
function pbNextNo(prefix) { return prefix + Date.now().toString().slice(-9); }

// ---------- Transaksi mock data (satu rantai koheren: PR → RFQ → Quotation → GR → PO → Beli → Retur Beli) ----------

const PB_PR = [
  { No_Bukti:'PB26070001', Tgl_Bukti:'2026-07-01', Kode_PurchasingORG:'PCO_0001', Keterangan:'Pengadaan bahan baku Juli', Status:'DISETUJUI', Alasan_Status:'', Batal:false, Alasan_Batal:'',
    Details:[ { Kode_Item:'AA0450914100550', Nama_Item:pbProdukNama('AA0450914100550'), Deskripsi:'Ukuran standar', Qty:150, Satuan:'LEMBAR', Kode_Konversi:1, Konversi:1, Qty_Realisasi:150 } ] },
  { No_Bukti:'PB26070002', Tgl_Bukti:'2026-07-03', Kode_PurchasingORG:'PCO_0002', Keterangan:'Pengadaan material cadangan', Status:'', Alasan_Status:'', Batal:false, Alasan_Batal:'',
    Details:[ { Kode_Item:'BB040091470550', Nama_Item:pbProdukNama('BB040091470550'), Deskripsi:'PI 2', Qty:50, Satuan:'LBR', Kode_Konversi:1, Konversi:1, Qty_Realisasi:0 } ] },
  { No_Bukti:'PB26070003', Tgl_Bukti:'2026-07-05', Kode_PurchasingORG:'PCO_0001', Keterangan:'', Status:'DITOLAK', Alasan_Status:'Anggaran belum tersedia', Batal:false, Alasan_Batal:'',
    Details:[ { Kode_Item:'AS1025ATBONON075000410', Nama_Item:pbProdukNama('AS1025ATBONON075000410'), Deskripsi:'', Qty:20, Satuan:'PCS', Kode_Konversi:1, Konversi:1, Qty_Realisasi:0 } ] },
];

const PB_RFQ = [
  { No_Bukti:'KPP26070001', Tgl_Bukti:'2026-07-02', Kode_Supp:'MRR001', Keterangan:'Baik', Status:'',
    Details:[ { Kode_Item:'AA0450914100550', Nama_Item:pbProdukNama('AA0450914100550'), Deskripsi:'', Qty:150, Satuan:'LEMBAR', Kode_PurchasingORG:'PCO_0001', Kode_Konversi:1, Konversi:1, No_Bukti_From:'PB26070001', No_Id_From:1 } ] },
  { No_Bukti:'KPP26070002', Tgl_Bukti:'2026-07-04', Kode_Supp:'AG001', Keterangan:'', Status:'',
    Details:[ { Kode_Item:'BB040091470550', Nama_Item:pbProdukNama('BB040091470550'), Deskripsi:'', Qty:50, Satuan:'LBR', Kode_PurchasingORG:'PCO_0002', Kode_Konversi:1, Konversi:1, No_Bukti_From:'PB26070002', No_Id_From:1 } ] },
];

const PB_QUOTATION = [
  { No_Bukti:'KPN26070001', Tgl_Bukti:'2026-07-06', Kode_Supp:'MRR001', Keterangan:'Baik', Ppn:11, Ppn_Include:false, Disc:5, Disc_Rp:0,
    Details:[ { Kode_Item:'AA0450914100550', Nama_Item:pbProdukNama('AA0450914100550'), Deskripsi:'', Qty:150, Satuan:'LEMBAR', Harga:275000, Disc1:5, Disc2:0, DiscRp:0, Kode_PurchasingORG:'PCO_0001', Kode_Konversi:1, Konversi:1, No_Bukti_From:'KPP26070001', No_Id_From:1 } ] },
  { No_Bukti:'KPN26070002', Tgl_Bukti:'2026-07-07', Kode_Supp:'AG001', Keterangan:'', Ppn:11, Ppn_Include:false, Disc:0, Disc_Rp:10000,
    Details:[ { Kode_Item:'BB040091470550', Nama_Item:pbProdukNama('BB040091470550'), Deskripsi:'', Qty:50, Satuan:'LBR', Harga:260000, Disc1:0, Disc2:0, DiscRp:0, Kode_PurchasingORG:'PCO_0002', Kode_Konversi:1, Konversi:1, No_Bukti_From:'KPP26070002', No_Id_From:1 } ] },
];

const PB_GR = [
  { No_Bukti:'FTB26070001', Tgl_Bukti:'2026-07-08', Kode_Supp:'MRR001', Keterangan:'Quotation pembelian bahan baku', Ppn:11, Ppn_Include:false, Disc:5, Disc_Rp:0, Kode_Gudang:'GDG-001', Jenis_Ref:'PP', No_Ref:'KPN26070001', No_Id_Ref:1,
    Details:[ { Kode_Item:'AA0450914100550', Nama_Item:pbProdukNama('AA0450914100550'), Deskripsi:'Bahan produksi', Qty:150, Satuan:'LEMBAR', Harga:275000, Disc1:5, Disc2:0, DiscRp:0, Panjang:6, No_Coil:'C-001', Kode_PurchasingORG:'PCO_0001', Kode_Konversi:1, Konversi:1, No_Bukti_From:'KPN26070001', No_Id_From:1 } ] },
];

const PB_PO = [
  { No_Bukti:'KPO26070001', Tgl_Bukti:'2026-07-09', No_Referensi:'KPN26070001', Kode_Supp:'MRR001', PPN:11, PPN_Include:false, DiscPros_Head:5, DiscNilai_Head:0, Kredit_Tunai:'KREDIT', Tempo:14, Keterangan:'PO hasil quotation Juli', Status:'OPEN', Alasan_Status:'',
    Details:[ { Kode_Item:'AA0450914100550', Nama_Item:pbProdukNama('AA0450914100550'), Kode_Konversi:1, Deskripsi:'', Konversi:1, Jumlah:150, Satuan:'LEMBAR', Hrg_Sat:275000, DiscPros_Det:5, DiscNilai_Det:0, No_Bukti_From:'KPN26070001', No_Id_From:1, Jenis_Dok_From:'PP', Kode_PurchasingORG:'PCO_0001' } ],
    Details2:[ { Kode_Item:'200.001', Nama_Item:'Biaya Angkut Pembelian', Deskripsi:'Ongkir Surabaya-gudang', Jumlah:1, Satuan:'PCS', Hrg_Sat:350000, DiscPros_Det:0, DiscNilai_Det:0 } ] },
  { No_Bukti:'KPO26070002', Tgl_Bukti:'2026-07-10', No_Referensi:'', Kode_Supp:'AG001', PPN:11, PPN_Include:false, DiscPros_Head:0, DiscNilai_Head:10000, Kredit_Tunai:'TUNAI', Tempo:0, Keterangan:'', Status:'OPEN', Alasan_Status:'',
    Details:[ { Kode_Item:'BB040091470550', Nama_Item:pbProdukNama('BB040091470550'), Kode_Konversi:1, Deskripsi:'', Konversi:1, Jumlah:50, Satuan:'LBR', Hrg_Sat:260000, DiscPros_Det:0, DiscNilai_Det:0, No_Bukti_From:'', No_Id_From:0, Jenis_Dok_From:'', Kode_PurchasingORG:'PCO_0002' } ],
    Details2:[] },
];

const PB_BELI = [
  { No_Bukti:'BL26070001', Tgl_Bukti:'2026-07-11', Kode_Supp:'MRR001', Kode_Sales:'', Kode_Gudang:'GDG-001', Akun_Tunai:'100.001', Kredit_Tunai:'KREDIT', Tempo:14, Tgl_Kirim:'2026-07-12', Alamat_Kirim:'Gudang Utama', No_Sj_Inv:'SJ-0091', Tgl_Sj_Inv:'2026-07-11', No_Pajak:'', Tgl_Pajak:'', Nilai_Bayar:0, Sisa_Nota:0, Keterangan:'Nota dari PO Juli', PPN:11, PPN_Include:false, DiscPros_Head:5, DiscNilai_Head:0,
    Details:[ { Kode_Item:'AA0450914100550', Nama_Item:pbProdukNama('AA0450914100550'), Kode_Konversi:1, Deskripsi:'', Konversi:1, Jumlah:150, Satuan:'LEMBAR', Hrg_Sat:275000, DiscPros_Det:5, DiscNilai_Det:0, No_Bukti_From:'KPO26070001', No_Id_From:1, Jenis_Dok_From:'PO' } ],
    Details2:[ { Kode_Item:'200.001', Nama_Item:'Biaya Angkut Pembelian', Deskripsi:'', Jumlah:1, Satuan:'PCS', Hrg_Sat:350000, DiscPros_Det:0, DiscNilai_Det:0 } ] },
];

const PB_RETUR_BELI = [
  { No_Bukti:'RB26070001', Tgl_Bukti:'2026-07-13', No_Beli:'BL26070001', Kode_Supp:'MRR001', Kode_Gudang:'GDG-001', PPN:11, PPN_Include:false, DiscPros_Head:0, DiscNilai_Head:0, Kredit_Tunai:'KREDIT', Akun_Tunai:'100.001', Tempo:0, Keterangan:'Barang cacat produksi',
    Details:[ { Kode_Item:'AA0450914100550', Jumlah:10, Satuan:'LEMBAR', Hrg_Sat:275000, DiscPros_Det:0, DiscNilai_Det:0 } ],
    Details2:[] },
];

const ACTIVITY_LOG_PEMBELIAN = [
  { user:'pdjsw', action:'Melakukan Login:', detail:'Sistem Utama', time:'2 menit yang lalu', color:'var(--realisasi)' },
  { user:'admin', action:'Membuat Purchase Order:', detail:'KPO26070002', time:'25 menit yang lalu', color:'var(--realisasi)' },
  { user:'operator_1', action:'Menerima Barang (GR):', detail:'FTB26070001', time:'1 jam yang lalu', color:'var(--accent)' },
  { user:'system', action:'Sinkronisasi Database:', detail:'Server Cloud Utama', time:'3 jam yang lalu', color:'var(--accent)' },
  { user:'admin', action:'Retur Pembelian:', detail:'RB26070001', time:'5 jam yang lalu', color:'var(--danger)' },
];

// ---------- Shared UI helpers ----------
function PbHeader({ title, sub, onAdd, addLabel='Buat Baru' }) {
  return (
    <div className="page-head">
      <div><h1>{title}</h1><div className="sub">{sub}</div></div>
      <div style={{display:'flex', gap:8}}>
        <button className="btn btn-sm" onClick={()=>window.__erpToast && window.__erpToast('Data diperbarui.')}>{I.refresh()} Refresh</button>
        <button className="btn btn-sm" onClick={()=>window.__erpToast && window.__erpToast('Fitur export akan tersedia pada integrasi backend.')}>{I.download()} Export</button>
        {onAdd && <button className="btn btn-primary" onClick={onAdd}>{I.plus()} {addLabel}</button>}
      </div>
    </div>
  );
}

function pbStatusPill(status, batal) {
  if (batal) return <span className="pill cancelled">BATAL</span>;
  const s = (status || '').toUpperCase();
  if (s === 'DISETUJUI' || s === 'SELESAI' || s === 'OPEN' || s === 'AKTIF') return <span className="pill approved">{s || 'AKTIF'}</span>;
  if (s === 'DITOLAK') return <span className="pill cancelled">DITOLAK</span>;
  if (!s) return <span className="pill draft">DRAFT</span>;
  return <span className="pill pending">{s}</span>;
}

function pbLineTotal(r) {
  const jml = +r.Jumlah || +r.Qty || 0;
  const hrg = +r.Hrg_Sat || +r.Harga || 0;
  const d1 = +r.DiscPros_Det || +r.Disc1 || 0;
  const d2 = +r.Disc2 || 0;
  const dRp = +r.DiscNilai_Det || +r.DiscRp || 0;
  return jml * hrg * (1 - d1/100) * (1 - d2/100) - dRp;
}

function PbInlineItemTable({ title, columns, rows, setRows, addLabel='Tambah Baris', shortcut, itemSource, showTotal, disabled, onPickItems, lockItems }) {
  const update = (idx, key, value) => {
    let row = { ...rows[idx], [key]: value };
    if (itemSource && key === itemSource.codeKey && !lockItems) {
      const found = itemSource.data.find(p => (p.kode ?? p.Kode_Supp) === value);
      if (found) {
        row[itemSource.nameKey] = found.nama ?? found.Nama_Supp ?? '';
        if (itemSource.satuanKey && found.satuan) row[itemSource.satuanKey] = found.satuan;
        if (itemSource.hargaKey && found.harga !== undefined) row[itemSource.hargaKey] = found.harga;
      }
    }
    const next = [...rows]; next[idx] = row; setRows(next);
  };
  const softDelete = (idx) => {
    const next = [...rows];
    next[idx] = { ...next[idx], _deleted: true };
    setRows(next);
  };
  const restore = (idx) => {
    const next = [...rows];
    next[idx] = { ...next[idx], _deleted: false };
    setRows(next);
  };
  const add = () => setRows([...rows, { ...Object.fromEntries(columns.map(c => [c.key, c.type === 'number' ? 0 : ''])), _added: true }]);
  const total = rows.reduce((s, r) => r._deleted ? s : s + pbLineTotal(r), 0);

  const isLockedItemCol = (c) => lockItems && itemSource && (c.key === itemSource.codeKey || c.key === itemSource.nameKey);

  const renderCell = (c, r, idx) => {
    if (disabled || isLockedItemCol(c) || r._deleted) {
      return <span className={`cell ${c.num ? 'num mono' : c.mono ? 'mono' : ''}`} style={{display:'block',padding:'4px 0',borderBottom:'1px solid transparent'}}>{r[c.key]}</span>;
    }
    if (itemSource && c.key === itemSource.codeKey) {
      return (
        <select className="cell mono" value={r[c.key]} onChange={e => update(idx, c.key, e.target.value)}>
          <option value="">— Pilih —</option>
          {itemSource.data.map(p => <option key={p.kode ?? p.Kode_Supp} value={p.kode ?? p.Kode_Supp}>{p.kode ?? p.Kode_Supp} — {p.nama ?? p.Nama_Supp}</option>)}
        </select>
      );
    }
    return (
      <input
        className={`cell ${c.num ? 'num mono' : c.mono ? 'mono' : ''}`}
        type={c.type || 'text'}
        placeholder={c.placeholder || ''}
        readOnly={c.readOnly}
        value={r[c.key]}
        onChange={e => update(idx, c.key, c.type === 'number' ? +e.target.value : e.target.value)}
      />
    );
  };

  return (
    <div className="inline-table">
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8}}>
        <h3 style={{margin:0}}>{title}</h3>
        {!disabled && (
          <div style={{display:'flex', gap:8}}>
            {onPickItems && <button className="btn btn-primary btn-sm" onClick={onPickItems}>{I.plus()} Pilih Barang</button>}
            {!lockItems && <button className="btn btn-primary btn-sm" onClick={add}>{I.plus()} {addLabel}</button>}
          </div>
        )}
      </div>
      {shortcut && !disabled && !lockItems && <div style={{textAlign:'right', fontSize:12, color:'var(--text-3)', marginBottom:8}}>Tambah: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>{shortcut}</kbd></div>}
      <div className={`line-items ${disabled ? 'view-only' : ''}`} style={{maxHeight:280, overflowY:'auto', overflowX:'auto'}}>
        <table>
          <thead><tr>{columns.map(c => <th key={c.key} style={c.width ? {width:c.width} : {}}>{c.label}</th>)}{!disabled && <th style={{width:40}}></th>}</tr></thead>
          <tbody>
            {rows.length === 0 && <tr><td colSpan={columns.length + (disabled?0:1)} className="empty">Belum ada data.</td></tr>}
            {rows.map((r, idx) => (
              <tr key={idx} className={`${r._deleted ? 'row-deleted' : ''} ${r._added ? 'row-added' : ''}`} title={r._deleted ? 'Barang ini akan dihapus' : ''}>
                {columns.map(c => (
                  <td key={c.key}>{renderCell(c, r, idx)}</td>
                ))}
                {!disabled && (
                  <td>
                    {r._deleted ? (
                      <button className="btn btn-icon btn-sm" style={{color:'var(--realisasi)'}} onClick={() => restore(idx)} title="Restore">{I.refresh(14)}</button>
                    ) : (
                      <button className="btn btn-icon btn-sm del" onClick={() => softDelete(idx)}>{I.trash()}</button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showTotal && <div style={{textAlign:'right', marginTop:8, fontSize:13}}>Subtotal baris: <b className="mono">{fmtRp(total)}</b></div>}
    </div>
  );
}

function PbTotalsCard({ subtotal, discPct, setDiscPct, discRp, setDiscRp, ppn, setPpn, ppnMode, setPpnMode }) {
  const discAmt = subtotal * ((discPct||0)/100) + (+discRp || 0);
  const dpp = Math.max(0, subtotal - discAmt);
  const ppnAmt = ppnMode === 'Exclude' ? dpp * ((ppn||0)/100) : 0;
  const total = ppnMode === 'Exclude' ? dpp + ppnAmt : dpp;
  return (
    <div className="panel" style={{position:'sticky', top:16}}>
      <div style={{fontWeight:700, fontSize:12.5, letterSpacing:'.04em', color:'var(--primary)', background:'var(--primary-50)', padding:'8px 12px', borderRadius:6, marginBottom:12}}>RINGKASAN</div>
      <div style={{display:'flex', justifyContent:'space-between', marginBottom:8}}><span>Subtotal</span><b className="mono">{fmtRp(subtotal)}</b></div>
      <div style={{display:'flex', alignItems:'center', gap:6, marginBottom:8}}>
        <span style={{flex:1}}>Disc (%)</span>
        <input className="input mono" style={{width:70}} type="number" value={discPct} onChange={e=>setDiscPct(+e.target.value)} />
      </div>
      <div style={{display:'flex', alignItems:'center', gap:6, marginBottom:8}}>
        <span style={{flex:1}}>Disc (Rp)</span>
        <input className="input mono" style={{width:110}} type="number" value={discRp} onChange={e=>setDiscRp(+e.target.value)} />
      </div>
      <div style={{display:'flex', justifyContent:'space-between', marginBottom:8}}><span>DPP</span><b className="mono">{fmtRp(dpp)}</b></div>
      <div style={{display:'flex', alignItems:'center', gap:6, marginBottom:8}}>
        <span style={{flex:1}}>PPN (%)</span>
        <input className="input mono" style={{width:70}} type="number" value={ppn} onChange={e=>setPpn(+e.target.value)} />
        <select className="select" style={{width:100}} value={ppnMode} onChange={e=>setPpnMode(e.target.value)}>
          <option>Exclude</option><option>Include</option>
        </select>
      </div>
      <div style={{display:'flex', justifyContent:'space-between', marginBottom:12}}><span>PPN</span><b className="mono">{fmtRp(ppnAmt)}</b></div>
      <div style={{display:'flex', justifyContent:'space-between', paddingTop:12, borderTop:'1px solid var(--border)'}}><span style={{fontWeight:700}}>Total</span><b className="mono" style={{fontSize:16, color:'var(--primary)'}}>{fmtRp(total)}</b></div>
    </div>
  );
}

// ---------- Generic doc list ----------
function PbDocList({ title, sub, rows, columns, onAdd, onEdit, addLabel='Buat Baru' }) {
  const [q, setQ] = React.useState('');
  const filtered = rows.filter(r => !q || columns.some(c => String(r[c.key] ?? '').toLowerCase().includes(q.toLowerCase())));
  return (
    <>
      <PbHeader title={title} sub={sub ?? `${filtered.length} transaksi`} onAdd={onAdd} addLabel={addLabel} />
      <div className="filter-bar"><div className="filter-grid">
        <div className="field"><label>Pencarian</label><div className="input-w-icon">{I.search(14)}<input className="input" placeholder="No. Bukti…" value={q} onChange={e=>setQ(e.target.value)}/></div></div>
        <div className="filter-actions"><button className="btn btn-primary">{I.filter()} Cari</button></div>
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

// ---------- Generic tabbed doc modal (refactored to ScrollNavModal + 3-mode) ----------
function PbDocModal({ title, data, tabs, docKind, showTotals, prefix, onClose, onSave, onCancelDoc, onCompleteDoc }) {
  // mode: CREATE (data=null), VIEW (data exists, initial), EDIT (data exists, editing)
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

  // Snapshot untuk Batal Edit
  const [snapshotForm, setSnapshotForm] = React.useState(null);

  // No_Bukti trigger state
  const [noBuktiRaw, setNoBuktiRaw] = React.useState(() => {
    const nb = form.No_Bukti || '';
    if (!nb) return '';
    return nb;
  });
  const [noBuktiError, setNoBuktiError] = React.useState('');
  const noBuktiRef = React.useRef(null);

  React.useEffect(() => {
    if (isCreate && noBuktiRef.current) {
      noBuktiRef.current.focus();
    }
  }, [isCreate]);

  const set = (k,v) => setForm(f => ({...f, [k]:v}));
  const isBatal = !!(form.Batal || form.Status === 'BATAL');
  const isSelesai = form.Status === 'SELESAI';
  const isLocked = isBatal || isSelesai;

  const allItemRows = tabs.filter(t => t.type === 'items').flatMap(t => form[t.itemsKey] || []);
  const subtotal = allItemRows.reduce((s,r) => s + pbLineTotal(r), 0);

  // Item picker
  const [picker, setPicker] = React.useState(null);
  const [confirmModal, setConfirmModal] = React.useState(null);

  const handleNoBuktiChange = (val) => {
    const v = val.toUpperCase();
    setNoBuktiRaw(v);
    if (!v) {
      setNoBuktiError('No. Bukti harus di isi');
    } else if (!['F','K'].includes(v[0])) {
      setNoBuktiError('Format no Bukti salah');
    } else {
      setNoBuktiError('');
    }
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
    if (andClose) { onClose(); }
    else if (isEdit) { setMode('VIEW'); }
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

  const handleCancelDoc = () => {
    if (onCancelDoc) onCancelDoc(form);
  };

  const handleCompleteDoc = () => {
    if (onCompleteDoc) onCompleteDoc(form);
  };

  const fieldLocked = (f) => {
    if (isView) return true;
    if (isEdit) {
      // Fields that stay locked in edit mode
      const lockedKeys = ['No_Bukti','Tgl_Bukti','Kode_Supp','Kode_Cust','Kode_Gudang','No_Referensi','No_Beli','No_Ref','No_Ko','No_Jual'];
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
          <input
            ref={noBuktiRef}
            className="input mono"
            type="text"
            value={noBuktiRaw}
            onChange={e => handleNoBuktiChange(e.target.value)}
            placeholder="Ketik F atau K"
            maxLength={1}
          />
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
        <input
          className={`input ${f.mono ? 'mono' : ''}`}
          type={f.type === 'number' ? 'number' : f.type === 'date' ? 'date' : 'text'}
          placeholder={f.readOnly ? 'Otomatis' : ''}
          value={form[f.key]}
          onChange={e=>set(f.key, f.type === 'number' ? +e.target.value : e.target.value)}
        />
      </div>
    );
  };

  const alasanPreContent = isLocked ? (
    <div className="alasan-section">
      <h3>{isBatal ? 'Alasan Batal' : 'Alasan Selesai'}</h3>
      <div className={`alasan-box ${isBatal ? 'batal' : 'selesai'}`}>
        <span className="icon">{isBatal ? I.x(16) : I.check(16)}</span>
        <span>{form.Alasan_Batal || form.Alasan_Status || (isBatal ? 'Transaksi dibatalkan' : 'Transaksi diselesaikan manual')}</span>
      </div>
    </div>
  ) : null;

  const sections = tabs.map(t => {
    if (t.type === 'fields') {
      return {
        id: t.id,
        label: t.label,
        content: (
          <div className="panel">
            <div style={{display:'grid', gridTemplateColumns:'repeat(3, minmax(0,1fr))', gap:12}}>
              {t.fields.map(renderField)}
            </div>
          </div>
        ),
      };
    }
    return {
      id: t.id,
      label: t.label,
      content: (
        <div className="panel">
          <PbInlineItemTable
            title={t.label}
            columns={t.columns}
            rows={form[t.itemsKey]}
            setRows={v => set(t.itemsKey, v)}
            addLabel={`Tambah ${t.label}`}
            itemSource={t.itemSource}
            showTotal={t.showTotal}
            disabled={isView}
            onPickItems={!isView && t.itemSource ? () => setPicker(t) : null}
            lockItems={t.lockItems}
          />
        </div>
      ),
    };
  });

  const summaryPanel = showTotals ? (
    <PbTotalsCard
      subtotal={subtotal}
      discPct={form.discPct} setDiscPct={v=>set('discPct', v)}
      discRp={form.discRp} setDiscRp={v=>set('discRp', v)}
      ppn={form.PPN ?? form.Ppn ?? 11} setPpn={v=>set(form.PPN !== undefined ? 'PPN' : 'Ppn', v)}
      ppnMode={form.ppnMode} setPpnMode={v=>set('ppnMode', v)}
    />
  ) : null;

  const modalTitle = isCreate ? `${title} Baru` : isEdit ? `Edit ${title} — ${form.No_Bukti || ''}` : `${title} — ${form.No_Bukti || ''}`;

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
        onSave={() => handleSave(false)}
        onSaveAndClose={() => handleSave(true)}
        onCancelDoc={isView && onCancelDoc && !isLocked ? ()=>setConfirmModal({kind:'batal'}) : null}
        onCompleteDoc={isView && onCompleteDoc && !isLocked ? ()=>setConfirmModal({kind:'selesai'}) : null}
        onEditMode={isView && !isLocked ? enterEditMode : null}
        onCancelEdit={isEdit ? handleCancelEdit : null}
        showSelesai={isView && onCompleteDoc && !isLocked && (form.Status === 'OPEN' || form.Status === '' || !form.Status)}
      />
      {picker && (
        <ItemPickerModal
          title={`Pilih ${picker.label}`}
          items={picker.itemSource?.data || []}
          onCancel={() => setPicker(null)}
          onConfirm={(picked) => {
            const mapped = picked.map(p => {
              const row = Object.fromEntries(picker.columns.map(c => [c.key, c.type === 'number' ? 0 : '']));
              row[picker.itemSource.codeKey] = p.kode || p.code || p.Kode_Item;
              row[picker.itemSource.nameKey] = p.nama || p.name || p.Nama_Item;
              if (picker.itemSource.satuanKey) row[picker.itemSource.satuanKey] = p.satuan || p.Satuan || 'PCS';
              if (picker.itemSource.hargaKey) row[picker.itemSource.hargaKey] = p.harga || p.Harga || p.price || 0;
              row[picker.columns.find(c => c.key === 'Qty' || c.key === 'Jumlah')?.key || 'Qty'] = p._qty || 1;
              row._added = true;
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
              const updated = { ...form, Status:'BATAL', Batal:true, Alasan_Batal: reason };
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

// ---------- Konfigurasi per dokumen (field & kolom) ----------

const PB_ORG_OPTS = () => PB_PURCHASING_ORG.map(o => ({ value:o.kode, label:`${o.nama} (${o.kode})` }));
const PB_SUPP_OPTS = () => PB_SUPPLIER.map(s => ({ value:s.Kode_Supp, label:s.Nama_Supp }));
const PB_GUDANG_OPTS = () => GUDANG_DATA.map(g => ({ value:g.kode, label:g.nama }));

function pbBarangCols(extra=[]) {
  return [
    { key:'Kode_Item', label:'Kode Item', mono:true, width:170 },
    { key:'Nama_Item', label:'Nama Item', width:260 },
    { key:'Deskripsi', label:'Deskripsi' },
    { key:'Qty', label:'Qty', type:'number', num:true, width:80 },
    { key:'Satuan', label:'Satuan', width:80 },
    ...extra,
  ];
}
function pbBiayaCols() {
  return [
    { key:'Kode_Item', label:'Kode Akun', mono:true, width:110 },
    { key:'Nama_Item', label:'Nama Akun', width:200 },
    { key:'Deskripsi', label:'Deskripsi' },
    { key:'Jumlah', label:'Jumlah', type:'number', num:true, width:90 },
    { key:'Satuan', label:'Satuan', width:80 },
    { key:'Hrg_Sat', label:'Harga Satuan', type:'number', num:true },
    { key:'DiscPros_Det', label:'Disc (%)', type:'number', num:true, width:80 },
    { key:'DiscNilai_Det', label:'Disc (Rp)', type:'number', num:true },
  ];
}

// ---------- 1. Katalog Pemasok ----------
function PemasokList({ rows, onAdd, onEdit }) {
  const [q, setQ] = React.useState('');
  const filtered = rows.filter(r => !q || r.Nama_Supp.toLowerCase().includes(q.toLowerCase()) || r.Kode_Supp.toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <PbHeader title="Katalog Pemasok" sub={`Jumlah: ${filtered.length} pemasok`} onAdd={onAdd} addLabel="Tambah Pemasok" />
      <div className="filter-bar"><div className="filter-grid">
        <div className="field"><label>Pencarian</label><div className="input-w-icon">{I.search(14)}<input className="input" placeholder="Nama atau kode pemasok…" value={q} onChange={e=>setQ(e.target.value)}/></div></div>
        <div className="filter-actions"><button className="btn btn-primary">{I.filter()} Cari</button></div>
      </div></div>
      <div className="table-card">
        <div className="table-toolbar"><div className="table-toolbar-left"><b>Jumlah: {filtered.length}</b></div></div>
        <div className="table-scroll">
          <table className="data">
            <thead><tr><th>Kode</th><th>Nama Perusahaan</th><th>Kota</th><th>Telepon</th><th>Kontak</th><th>Tempo</th><th>Plafon</th><th>Status</th><th style={{width:90}}>Aksi</th></tr></thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.Kode_Supp} onClick={()=>onEdit(r)}>
                  <td className="mono muted">{r.Kode_Supp}</td>
                  <td><span className="cell-link">{r.Nama_Supp}</span></td>
                  <td>{r.Kota || <span className="muted">—</span>}</td>
                  <td className="mono">{r.Telpon || <span className="muted">—</span>}</td>
                  <td>{r.Kontak || <span className="muted">—</span>}</td>
                  <td className="mono">{r.Tempo} hari</td>
                  <td className="mono">{fmtRp(r.Plafon)}</td>
                  <td>{pbStatusPill(r.Aktif ? 'AKTIF' : '')}</td>
                  <td onClick={e=>e.stopPropagation()}><div className="row-actions"><button className="btn btn-icon btn-sm" onClick={()=>onEdit(r)}>{I.edit()}</button><button className="btn btn-icon btn-sm del">{I.trash()}</button></div></td>
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

function pemasokModalTabs() {
  return [
    { id:'umum', label:'Informasi Umum', type:'fields', fields:[
      { key:'Kode_Supp', label:'Kode Pemasok', required:true, mono:true },
      { key:'Nama_Supp', label:'Nama Perusahaan', required:true, span:2 },
      { key:'Owner', label:'Owner' },
      { key:'Kontak', label:'Kontak' },
      { key:'Telpon', label:'Telepon', mono:true },
      { key:'Email', label:'Email' },
      { key:'Aktif', label:'Status', type:'select', options:[{value:'true',label:'Aktif'},{value:'false',label:'Non-aktif'}] },
    ]},
    { id:'alamat', label:'Alamat', type:'fields', fields:[
      { key:'Alamat', label:'Alamat', type:'textarea', span:3 },
      { key:'Kelurahan', label:'Kelurahan' },
      { key:'Kecamatan', label:'Kecamatan' },
      { key:'Kota', label:'Kota' },
      { key:'KodePos', label:'Kode Pos', mono:true },
    ]},
    { id:'pajak', label:'Pajak', type:'fields', fields:[
      { key:'No_NPWP', label:'No. NPWP', mono:true },
      { key:'No_NIK', label:'No. NIK', mono:true },
      { key:'Nama_Pajak', label:'Nama Pajak' },
      { key:'Alamat_Pajak', label:'Alamat Pajak', type:'textarea', span:2 },
      { key:'Kota_Pajak', label:'Kota Pajak' },
    ]},
    { id:'tempo', label:'Tempo & Plafon', type:'fields', fields:[
      { key:'Tempo', label:'Tempo (hari)', type:'number' },
      { key:'Plafon', label:'Plafon', type:'number' },
      { key:'Keterangan', label:'Keterangan', type:'textarea', span:3 },
    ]},
  ];
}

function PemasokPage({ rows, setRows }) {
  const [modal, setModal] = React.useState(null);
  const [show, setShow] = React.useState(false);
  const save = (form) => {
    const normalized = { ...form, Aktif: form.Aktif === true || form.Aktif === 'true' };
    setRows(prev => modal ? prev.map(r => r.Kode_Supp===modal.Kode_Supp ? normalized : r) : [...prev, normalized]);
    window.__erpToast && window.__erpToast('Data pemasok berhasil disimpan.');
  };
  return (
    <>
      <PemasokList rows={rows} onAdd={()=>{setModal(null); setShow(true);}} onEdit={(r)=>{setModal(r); setShow(true);}} />
      {show && <PbDocModal title="Pemasok" data={modal} tabs={pemasokModalTabs()} onClose={()=>{setShow(false); setModal(null);}} onSave={save} />}
    </>
  );
}

// ---------- 2. Purchase Request (PR) ----------
function prModalTabs() {
  return [
    { id:'umum', label:'Informasi Umum', type:'fields', fields:[
      { key:'No_Bukti', label:'No. Bukti', mono:true, readOnly:true },
      { key:'Tgl_Bukti', label:'Tgl. Bukti', type:'date', required:true },
      { key:'Kode_PurchasingORG', label:'Purchasing Org', type:'select', options:PB_ORG_OPTS, required:true },
      { key:'Keterangan', label:'Catatan', type:'textarea', span:3 },
    ]},
    { id:'barang', label:'Barang', type:'items', itemsKey:'Details', columns:[
      { key:'Nama_Item', label:'Nama Barang', width:280 },
      { key:'Kode_Item', label:'Kode Barang', mono:true, width:170 },
      { key:'Qty', label:'Jumlah', type:'number', num:true, width:90 },
      { key:'Satuan', label:'Satuan', width:90 },
      { key:'Deskripsi', label:'Deskripsi', width:260 },
    ], itemSource:{ data:PB_PRODUK, codeKey:'Kode_Item', nameKey:'Nama_Item', satuanKey:'Satuan' }, lockItems:true },
  ];
}
function PembelianDocTab({ title, sub, rows, setRows, columns, tabsFn, prefix, showTotals, addLabel='Buat Baru', allowSelesai=false }) {
  const [modal, setModal] = React.useState(null);
  const [show, setShow] = React.useState(false);

  const save = (form, mode) => {
    if (mode === 'CREATE') {
      setRows(prev => [...prev, form]);
    } else {
      setRows(prev => prev.map(r => r.No_Bukti===form.No_Bukti ? form : r));
    }
    window.__erpToast && window.__erpToast(`${title} berhasil disimpan.`);
    if (mode === 'CREATE') {
      // After save in CREATE, switch to view mode by keeping modal open with the saved data
      setModal(form);
    }
  };

  const cancelDoc = (form) => {
    const updated = { ...form, Status:'BATAL', Batal:true, Alasan_Batal: form.Alasan_Batal || 'Dibatalkan oleh operator' };
    setRows(prev => prev.map(r => r.No_Bukti===updated.No_Bukti ? updated : r));
    setModal(updated);
    window.__erpToast && window.__erpToast(`${title} dibatalkan.`);
  };

  const completeDoc = (form) => {
    const updated = { ...form, Status:'SELESAI', Alasan_Status: form.Alasan_Status || 'Diselesaikan manual oleh operator' };
    setRows(prev => prev.map(r => r.No_Bukti===updated.No_Bukti ? updated : r));
    setModal(updated);
    window.__erpToast && window.__erpToast(`${title} diselesaikan manual.`);
  };

  return (
    <>
      <PbDocList title={title} sub={sub} rows={rows} columns={columns} onAdd={()=>{setModal(null); setShow(true);}} onEdit={(r)=>{setModal(r); setShow(true);}} addLabel={addLabel} />
      {show && (
        <PbDocModal
          title={title}
          data={modal}
          tabs={tabsFn()}
          prefix={prefix}
          showTotals={showTotals}
          onClose={()=>{setShow(false); setModal(null);}}
          onSave={save}
          onCancelDoc={cancelDoc}
          onCompleteDoc={allowSelesai ? completeDoc : null}
        />
      )}
    </>
  );
}

function PrPage({ rows, setRows }) {
  const columns = [
    { key:'No_Bukti', label:'No. Bukti', mono:true },
    { key:'Tgl_Bukti', label:'Tgl. Bukti' },
    { key:'Kode_PurchasingORG', label:'Purchasing Org', render:v => pbOrgNama(v) },
    { key:'Keterangan', label:'Keterangan' },
    { key:'Details', label:'Jml Item', render:v => (v||[]).length },
    { key:'Status', label:'Status', render:(v,r) => pbStatusPill(v, r.Batal) },
  ];
  return <PembelianDocTab title="Purchase Request" rows={rows} setRows={setRows} columns={columns} tabsFn={prModalTabs} prefix="PB" addLabel="PR Baru" allowSelesai />;
}

// ---------- 3. RFQ ----------
function rfqModalTabs(prRows) {
  return [
    { id:'umum', label:'Informasi Umum', type:'fields', fields:[
      { key:'No_Bukti', label:'No. Bukti', mono:true, readOnly:true },
      { key:'Tgl_Bukti', label:'Tgl. Bukti', type:'date', required:true },
      { key:'Kode_Supp', label:'Supplier', type:'select', options:PB_SUPP_OPTS, required:true },
      { key:'Keterangan', label:'Keterangan', type:'textarea', span:3 },
    ]},
    { id:'barang', label:'Barang', type:'items', itemsKey:'Details', columns: pbBarangCols([
      { key:'Kode_PurchasingORG', label:'Purchasing Org', width:120 },
      { key:'Kode_Konversi', label:'Kd. Konv.', type:'number', num:true, width:80 },
      { key:'Konversi', label:'Konversi', type:'number', num:true, width:80 },
      { key:'No_Bukti_From', label:'Ref. PR', mono:true, width:110 },
    ]), itemSource:{ data:PB_PRODUK, codeKey:'Kode_Item', nameKey:'Nama_Item', satuanKey:'Satuan' } },
  ];
}
function RfqPage({ rows, setRows }) {
  const columns = [
    { key:'No_Bukti', label:'No. Bukti', mono:true },
    { key:'Tgl_Bukti', label:'Tgl. Bukti' },
    { key:'Kode_Supp', label:'Supplier', render:v => pbSuppNama(v) },
    { key:'Keterangan', label:'Keterangan' },
    { key:'Details', label:'Jml Item', render:v => (v||[]).length },
    { key:'Status', label:'Status', render:(v,r) => pbStatusPill(v, r.Batal) },
  ];
  return <PembelianDocTab title="RFQ" rows={rows} setRows={setRows} columns={columns} tabsFn={rfqModalTabs} prefix="KPP" addLabel="RFQ Baru" allowSelesai />;
}

// ---------- 4. Quotation ----------
function quotationModalTabs() {
  return [
    { id:'umum', label:'Informasi Umum', type:'fields', fields:[
      { key:'No_Bukti', label:'No. Bukti', mono:true, readOnly:true },
      { key:'Tgl_Bukti', label:'Tgl. Bukti', type:'date', required:true },
      { key:'Kode_Supp', label:'Supplier', type:'select', options:PB_SUPP_OPTS, required:true },
      { key:'Keterangan', label:'Keterangan', type:'textarea', span:3 },
    ]},
    { id:'barang', label:'Barang', type:'items', itemsKey:'Details', showTotal:true, columns: [
      { key:'Kode_Item', label:'Kode Item', mono:true, width:170 },
      { key:'Nama_Item', label:'Nama Item', width:220 },
      { key:'Qty', label:'Qty', type:'number', num:true, width:70 },
      { key:'Satuan', label:'Satuan', width:80 },
      { key:'Harga', label:'Harga', type:'number', num:true },
      { key:'Disc1', label:'Disc1 (%)', type:'number', num:true, width:80 },
      { key:'Disc2', label:'Disc2 (%)', type:'number', num:true, width:80 },
      { key:'DiscRp', label:'Disc (Rp)', type:'number', num:true },
      { key:'No_Bukti_From', label:'Ref. RFQ', mono:true, width:110 },
    ], itemSource:{ data:PB_PRODUK, codeKey:'Kode_Item', nameKey:'Nama_Item', satuanKey:'Satuan', hargaKey:'Harga' } },
  ];
}
function QuotationPage({ rows, setRows }) {
  const columns = [
    { key:'No_Bukti', label:'No. Bukti', mono:true },
    { key:'Tgl_Bukti', label:'Tgl. Bukti' },
    { key:'Kode_Supp', label:'Supplier', render:v => pbSuppNama(v) },
    { key:'Details', label:'Total', render:(v) => fmtRp((v||[]).reduce((s,r)=>s+pbLineTotal(r),0)) },
    { key:'Status', label:'Status', render:(v,r) => pbStatusPill(v, r.Batal) },
  ];
  return <PembelianDocTab title="Quotation" rows={rows} setRows={setRows} columns={columns} tabsFn={quotationModalTabs} prefix="KPN" showTotals addLabel="Quotation Baru" allowSelesai />;
}

// ---------- 5. Goods Receive (GR) ----------
function grModalTabs() {
  return [
    { id:'umum', label:'Informasi Umum', type:'fields', fields:[
      { key:'No_Bukti', label:'No. Bukti', mono:true, readOnly:true },
      { key:'Tgl_Bukti', label:'Tgl. Bukti', type:'date', required:true },
      { key:'Kode_Supp', label:'Supplier', type:'select', options:PB_SUPP_OPTS, required:true },
      { key:'Kode_Gudang', label:'Gudang', type:'select', options:PB_GUDANG_OPTS, required:true },
      { key:'No_Ref', label:'No. Ref (Quotation)', mono:true },
      { key:'Keterangan', label:'Keterangan', type:'textarea', span:3 },
    ]},
    { id:'barang', label:'Barang', type:'items', itemsKey:'Details', showTotal:true, columns: [
      { key:'Kode_Item', label:'Kode Item', mono:true, width:170 },
      { key:'Nama_Item', label:'Nama Item', width:200 },
      { key:'Qty', label:'Qty', type:'number', num:true, width:70 },
      { key:'Satuan', label:'Satuan', width:80 },
      { key:'Harga', label:'Harga', type:'number', num:true },
      { key:'Panjang', label:'Panjang', type:'number', num:true, width:80 },
      { key:'No_Coil', label:'No. Coil', mono:true, width:90 },
    ], itemSource:{ data:PB_PRODUK, codeKey:'Kode_Item', nameKey:'Nama_Item', satuanKey:'Satuan', hargaKey:'Harga' } },
  ];
}
function GrPage({ rows, setRows }) {
  const columns = [
    { key:'No_Bukti', label:'No. Bukti', mono:true },
    { key:'Tgl_Bukti', label:'Tgl. Bukti' },
    { key:'Kode_Supp', label:'Supplier', render:v => pbSuppNama(v) },
    { key:'Kode_Gudang', label:'Gudang', render:v => pbGudangNama(v) },
    { key:'No_Ref', label:'Ref. Quotation', render:v => v || <span className="muted">—</span> },
    { key:'Status', label:'Status', render:(v,r) => pbStatusPill(v, r.Batal) },
  ];
  return <PembelianDocTab title="Goods Receive" rows={rows} setRows={setRows} columns={columns} tabsFn={grModalTabs} prefix="FTB" showTotals addLabel="GR Baru" />;
}

// ---------- 6. Purchase Order (PO) ----------
function poModalTabs() {
  return [
    { id:'umum', label:'Informasi Umum', type:'fields', fields:[
      { key:'No_Bukti', label:'No. Bukti', mono:true, readOnly:true },
      { key:'Tgl_Bukti', label:'Tgl. Bukti', type:'date', required:true },
      { key:'No_Referensi', label:'No. Referensi', mono:true },
      { key:'Kode_Supp', label:'Supplier', type:'select', options:PB_SUPP_OPTS, required:true },
      { key:'Kredit_Tunai', label:'Kredit/Tunai', type:'select', options:[{value:'TUNAI',label:'Tunai'},{value:'KREDIT',label:'Kredit'}] },
      { key:'Tempo', label:'Tempo (hari)', type:'number' },
      { key:'Status', label:'Status', type:'select', options:[{value:'OPEN',label:'Open'},{value:'SELESAI',label:'Selesai'}] },
      { key:'Alasan_Status', label:'Alasan Status' },
      { key:'Keterangan', label:'Keterangan', type:'textarea', span:3 },
    ]},
    { id:'barang', label:'Barang', type:'items', itemsKey:'Details', columns: pbBarangCols([
      { key:'Hrg_Sat', label:'Harga Satuan', type:'number', num:true },
      { key:'DiscPros_Det', label:'Disc (%)', type:'number', num:true, width:80 },
      { key:'DiscNilai_Det', label:'Disc (Rp)', type:'number', num:true },
      { key:'No_Bukti_From', label:'Ref. Dok', mono:true, width:110 },
    ]).map(c => c.key==='Qty' ? {...c, key:'Jumlah', label:'Jumlah'} : c), itemSource:{ data:PB_PRODUK, codeKey:'Kode_Item', nameKey:'Nama_Item', satuanKey:'Satuan', hargaKey:'Hrg_Sat' } },
    { id:'biaya', label:'Non-Produk atau Biaya', type:'items', itemsKey:'Details2', columns: pbBiayaCols(), itemSource:{ data:PB_AKUN, codeKey:'Kode_Item', nameKey:'Nama_Item' } },
  ];
}
function PoPage({ rows, setRows }) {
  const columns = [
    { key:'No_Bukti', label:'No. Bukti', mono:true },
    { key:'Tgl_Bukti', label:'Tgl. Bukti' },
    { key:'Kode_Supp', label:'Supplier', render:v => pbSuppNama(v) },
    { key:'No_Referensi', label:'No. Referensi', render:v => v || <span className="muted">—</span> },
    { key:'Details', label:'Total', render:(v,r) => fmtRp([...(v||[]), ...(r.Details2||[])].reduce((s,x)=>s+pbLineTotal(x),0)) },
    { key:'Status', label:'Status', render:(v,r) => pbStatusPill(v, r.Batal) },
  ];
  return <PembelianDocTab title="Purchase Order" rows={rows} setRows={setRows} columns={columns} tabsFn={poModalTabs} prefix="KPO" showTotals addLabel="PO Baru" allowSelesai />;
}

// ---------- 7. Beli (Nota Pembelian) ----------
function beliModalTabs() {
  return [
    { id:'umum', label:'Informasi Umum', type:'fields', fields:[
      { key:'No_Bukti', label:'No. Bukti', mono:true, readOnly:true },
      { key:'Tgl_Bukti', label:'Tgl. Bukti', type:'date', required:true },
      { key:'Kode_Supp', label:'Supplier', type:'select', options:PB_SUPP_OPTS, required:true },
      { key:'Kode_Gudang', label:'Gudang', type:'select', options:PB_GUDANG_OPTS },
      { key:'Akun_Tunai', label:'Akun Bayar', type:'select', options:()=>PB_AKUN.map(a=>({value:a.kode,label:a.nama})) },
      { key:'Kredit_Tunai', label:'Kredit/Tunai', type:'select', options:[{value:'TUNAI',label:'Tunai'},{value:'KREDIT',label:'Kredit'}] },
      { key:'Tempo', label:'Tempo (hari)', type:'number' },
      { key:'Tgl_Kirim', label:'Tgl. Kirim', type:'date' },
      { key:'No_Sj_Inv', label:'No. SJ/Invoice', mono:true },
      { key:'Nilai_Bayar', label:'Nilai Bayar', type:'number' },
      { key:'Keterangan', label:'Keterangan', type:'textarea', span:3 },
    ]},
    { id:'barang', label:'Barang', type:'items', itemsKey:'Details', columns: [
      { key:'Kode_Item', label:'Kode Item', mono:true, width:170 },
      { key:'Nama_Item', label:'Nama Item', width:200 },
      { key:'Jumlah', label:'Jumlah', type:'number', num:true, width:80 },
      { key:'Satuan', label:'Satuan', width:80 },
      { key:'Hrg_Sat', label:'Harga Satuan', type:'number', num:true },
      { key:'DiscPros_Det', label:'Disc (%)', type:'number', num:true, width:80 },
      { key:'No_Bukti_From', label:'Ref. PO', mono:true, width:110 },
    ], itemSource:{ data:PB_PRODUK, codeKey:'Kode_Item', nameKey:'Nama_Item', satuanKey:'Satuan', hargaKey:'Hrg_Sat' } },
    { id:'biaya', label:'Non-Produk atau Biaya', type:'items', itemsKey:'Details2', columns: pbBiayaCols(), itemSource:{ data:PB_AKUN, codeKey:'Kode_Item', nameKey:'Nama_Item' } },
  ];
}
function BeliPage({ rows, setRows }) {
  const columns = [
    { key:'No_Bukti', label:'No. Bukti', mono:true },
    { key:'Tgl_Bukti', label:'Tgl. Bukti' },
    { key:'Kode_Supp', label:'Supplier', render:v => pbSuppNama(v) },
    { key:'Kode_Gudang', label:'Gudang', render:v => pbGudangNama(v) },
    { key:'Details', label:'Total', render:(v,r) => fmtRp([...(v||[]), ...(r.Details2||[])].reduce((s,x)=>s+pbLineTotal(x),0)) },
    { key:'Status', label:'Status', render:(v,r) => pbStatusPill(v, r.Batal) },
  ];
  return <PembelianDocTab title="Nota Pembelian" rows={rows} setRows={setRows} columns={columns} tabsFn={beliModalTabs} prefix="BL" showTotals addLabel="Nota Baru" />;
}

// ---------- 8. Retur Beli ----------
function returBeliModalTabs() {
  return [
    { id:'umum', label:'Informasi Umum', type:'fields', fields:[
      { key:'No_Bukti', label:'No. Bukti', mono:true, readOnly:true },
      { key:'Tgl_Bukti', label:'Tgl. Bukti', type:'date', required:true },
      { key:'No_Beli', label:'No. Nota Pembelian', mono:true, required:true },
      { key:'Kode_Supp', label:'Supplier', type:'select', options:PB_SUPP_OPTS },
      { key:'Kode_Gudang', label:'Gudang', type:'select', options:PB_GUDANG_OPTS },
      { key:'Kredit_Tunai', label:'Kredit/Tunai', type:'select', options:[{value:'TUNAI',label:'Tunai'},{value:'KREDIT',label:'Kredit'}] },
      { key:'Akun_Tunai', label:'Akun Bayar', type:'select', options:()=>PB_AKUN.map(a=>({value:a.kode,label:a.nama})) },
      { key:'Tempo', label:'Tempo (hari)', type:'number' },
      { key:'Keterangan', label:'Keterangan', type:'textarea', span:3 },
    ]},
    { id:'barang', label:'Barang', type:'items', itemsKey:'Details', columns: [
      { key:'Kode_Item', label:'Kode Item', mono:true, width:170 },
      { key:'Jumlah', label:'Jumlah', type:'number', num:true, width:80 },
      { key:'Satuan', label:'Satuan', width:80 },
      { key:'Hrg_Sat', label:'Harga Satuan', type:'number', num:true },
      { key:'DiscPros_Det', label:'Disc (%)', type:'number', num:true, width:80 },
    ], itemSource:{ data:PB_PRODUK, codeKey:'Kode_Item', nameKey:'Nama_Item', satuanKey:'Satuan', hargaKey:'Hrg_Sat' } },
    { id:'biaya', label:'Non-Produk atau Biaya', type:'items', itemsKey:'Details2', columns: pbBiayaCols(), itemSource:{ data:PB_AKUN, codeKey:'Kode_Item', nameKey:'Nama_Item' } },
  ];
}
function ReturBeliPage({ rows, setRows }) {
  const columns = [
    { key:'No_Bukti', label:'No. Bukti', mono:true },
    { key:'Tgl_Bukti', label:'Tgl. Bukti' },
    { key:'No_Beli', label:'No. Nota Beli' },
    { key:'Kode_Supp', label:'Supplier', render:v => pbSuppNama(v) },
    { key:'Details', label:'Total', render:(v,r) => fmtRp([...(v||[]), ...(r.Details2||[])].reduce((s,x)=>s+pbLineTotal(x),0)) },
    { key:'Status', label:'Status', render:(v,r) => pbStatusPill(v, r.Batal) },
  ];
  return <PembelianDocTab title="Retur Beli" rows={rows} setRows={setRows} columns={columns} tabsFn={returBeliModalTabs} prefix="RB" showTotals addLabel="Retur Baru" />;
}

// ---------- Dashboard & Router ----------
function PembelianDashboard({ onOpenSub }) {
  const sections = [
    {
      title:'Master & Permintaan',
      count:'3',
      tiles:[
        { id:'pemasok', title:'Katalog Pemasok', badge:`${PB_SUPPLIER.length} pemasok`, icon:I.users(20) },
        { id:'pr', title:'Purchase Request', badge:`${PB_PR.length} PR`, icon:I.invoice(20) },
        { id:'rfq', title:'Request for Quotation', badge:`${PB_RFQ.length} RFQ`, icon:I.invoice(20) },
      ]
    },
    {
      title:'Penawaran & Penerimaan',
      count:'2',
      tiles:[
        { id:'quotation', title:'Quotation', badge:`${PB_QUOTATION.length} quotation`, icon:I.invoice(20) },
        { id:'gr', title:'Goods Receive', badge:`${PB_GR.length} GR`, icon:I.truck(20) },
      ]
    },
    {
      title:'Order & Pembayaran',
      count:'3',
      tiles:[
        { id:'po', title:'Purchase Order', badge:`${PB_PO.length} PO`, icon:I.cart(20) },
        { id:'beli', title:'Nota Pembelian', badge:`${PB_BELI.length} nota`, icon:I.invoice(20) },
        { id:'retur', title:'Retur Beli', badge:`${PB_RETUR_BELI.length} retur`, icon:I.list(20) },
      ]
    },
  ];
  return (
    <ModuleDashboard
      title="Dashboard Pembelian"
      subtitle="Alur pengadaan barang: Purchase Request → RFQ → Quotation → Goods Receive → Purchase Order → Nota Pembelian → Retur Beli."
      sections={sections}
      activityLog={ACTIVITY_LOG_PEMBELIAN}
      onOpenSub={onOpenSub}
      activityTitle="Log Aktivitas Terbaru"
      activitySub="Operasi sistem yang dideteksi secara real-time"
    />
  );
}

function PembelianPage({ activeSub, onSubChange, onNavigate }) {
  const [pemasok, setPemasok] = React.useState(PB_SUPPLIER);
  const [pr, setPr] = React.useState(PB_PR);
  const [rfq, setRfq] = React.useState(PB_RFQ);
  const [quotation, setQuotation] = React.useState(PB_QUOTATION);
  const [gr, setGr] = React.useState(PB_GR);
  const [po, setPo] = React.useState(PB_PO);
  const [beli, setBeli] = React.useState(PB_BELI);
  const [retur, setRetur] = React.useState(PB_RETUR_BELI);

  if (!activeSub) return <PembelianDashboard onOpenSub={onSubChange} />;
  const subLabel = MODULE_SUBS.pembelian.find(s => s.id === activeSub)?.label ?? activeSub;
  return (
    <div className="page" data-screen-label={`Pembelian — ${activeSub}`}>
      <div className="crumbs">
        <a onClick={() => onNavigate?.('home')} style={{cursor:'pointer'}}>Home</a><span className="sep">/</span>
        <a onClick={()=>onSubChange(null)} style={{cursor:'pointer'}}>Pembelian</a><span className="sep">/</span>
        <span className="current">{subLabel}</span>
      </div>
      {activeSub === 'pemasok'   && <PemasokPage rows={pemasok} setRows={setPemasok} />}
      {activeSub === 'pr'        && <PrPage rows={pr} setRows={setPr} />}
      {activeSub === 'rfq'       && <RfqPage rows={rfq} setRows={setRfq} />}
      {activeSub === 'quotation' && <QuotationPage rows={quotation} setRows={setQuotation} />}
      {activeSub === 'gr'        && <GrPage rows={gr} setRows={setGr} />}
      {activeSub === 'po'        && <PoPage rows={po} setRows={setPo} />}
      {activeSub === 'beli'      && <BeliPage rows={beli} setRows={setBeli} />}
      {activeSub === 'retur'     && <ReturBeliPage rows={retur} setRows={setRetur} />}
    </div>
  );
}

window.PembelianPage = PembelianPage;
