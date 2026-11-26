// Pengaturan (Settings) module — 5 sub-screens

// ---------- Mock data ----------
const PG_MENU_LIST = [
  { kode:'M01', nama:'Dashboard' },
  { kode:'M02', nama:'Katalog Pelanggan' },
  { kode:'M03', nama:'Konfirmasi Penjualan' },
  { kode:'M04', nama:'Katalog Barang' },
  { kode:'M05', nama:'Mutasi Barang' },
  { kode:'M06', nama:'Kas Bank' },
  { kode:'M07', nama:'Jurnal Umum' },
  { kode:'M08', nama:'Laporan' },
];

const PG_GRUP_OPTS = ['Super Admin', 'Akuntan', 'Staff Gudang', 'Sales Manager'];

function pgEmptyMenus() {
  return PG_MENU_LIST.map(m => ({ kodeMenu:m.kode, namaMenu:m.nama, view:false, add:false, edit:false, del:false, print:false, exportData:false }));
}

const PG_AKSES_USER = [
  { kodeUser:'pdjsw', namaUser:'PDJ Administrator', grupUser:'Super Admin', aktif:true,
    menus: PG_MENU_LIST.map(m => ({ kodeMenu:m.kode, namaMenu:m.nama, view:true, add:true, edit:true, del:true, print:true, exportData:true })) },
  { kodeUser:'operator_1', namaUser:'Siti Rahayu', grupUser:'Akuntan', aktif:true,
    menus: PG_MENU_LIST.map(m => ({ kodeMenu:m.kode, namaMenu:m.nama, view:true, add:m.kode==='M06'||m.kode==='M07', edit:m.kode==='M06'||m.kode==='M07', del:false, print:true, exportData:true })) },
  { kodeUser:'budi.gdg', namaUser:'Budi Santoso', grupUser:'Staff Gudang', aktif:true,
    menus: PG_MENU_LIST.map(m => ({ kodeMenu:m.kode, namaMenu:m.nama, view:true, add:m.kode==='M04'||m.kode==='M05', edit:m.kode==='M04'||m.kode==='M05', del:false, print:false, exportData:false })) },
  { kodeUser:'dewi.sls', namaUser:'Dewi Kartika', grupUser:'Sales Manager', aktif:false,
    menus: PG_MENU_LIST.map(m => ({ kodeMenu:m.kode, namaMenu:m.nama, view:true, add:m.kode==='M02'||m.kode==='M03', edit:m.kode==='M02'||m.kode==='M03', del:false, print:true, exportData:false })) },
];

const PG_MENU = [
  { kodeMenu:'MD.050', namaMenu:'Katalog Grub Menu', tipeMenu:'Katalog', kodeParent:'05_Katalog', grupComponent:'PageMasterData', namaComponent:'Katalog', aktif:true, keterangan:'' },
  { kodeMenu:'TR.006.001', namaMenu:'Konfirmasi Penjualan', tipeMenu:'Transaksi', kodeParent:'04_Pelanggan', grupComponent:'PageTransaksi', namaComponent:'KonfirmasiPenjualan', aktif:true, keterangan:'' },
  { kodeMenu:'MD.024', namaMenu:'Katalog Barang Lain', tipeMenu:'Katalog', kodeParent:'06_Barang', grupComponent:'PageMasterData', namaComponent:'BarangLain', aktif:true, keterangan:'' },
  { kodeMenu:'MD.015', namaMenu:'Katalog Akun', tipeMenu:'Katalog', kodeParent:'08_Akuntan', grupComponent:'PageMasterData', namaComponent:'KatalogAkun', aktif:true, keterangan:'' },
  { kodeMenu:'RP.001', namaMenu:'Laporan Stock', tipeMenu:'Laporan', kodeParent:'09_Laporan', grupComponent:'PageLaporan', namaComponent:'LaporanStock', aktif:false, keterangan:'Belum aktif' },
];

const PG_GRUP_MENU = [
  { kode:'GM01', nama:'Rekap Data', keterangan:'Dashboard ringkasan', icon:'home', urutan:1 },
  { kode:'GM02', nama:'Pemasok', keterangan:'Modul purchasing', icon:'truck', urutan:2 },
  { kode:'GM03', nama:'Pelanggan', keterangan:'Modul penjualan', icon:'users', urutan:3 },
  { kode:'GM04', nama:'Barang', keterangan:'Modul persediaan', icon:'box', urutan:4 },
  { kode:'GM05', nama:'Katalog Lain', keterangan:'Modul katalog pendukung', icon:'layers', urutan:5 },
  { kode:'GM10', nama:'Pengaturan', keterangan:'', icon:'settings', urutan:10 },
];

const PG_SISTEM = { tempoHutang:30, kodeGudangBeli:'GDG001', kodeSatuan:'PCS', cetakHeader:true, cetakTtd:true, aktif:true };
const PG_ORGANISASI = { nama:'PT. Pacific Data Jaya', alamat:'Jl. Dharmahusada 162 E', kota:'Surabaya', kodePos:'60285', telpon:'+62811336336', email:'pdjsupport@gmail.com', noNpwp:'01.234.567.8-403.000', akunBank:'NIAGA : 506.048.3100' };
const PG_PENJUALAN = { ppn:11, ppnMasukan:'PPN 11%', ppnKeluaran:'PPN 11%', tempoPiutang:60, plafonPiutang:10000000, kodeGudangJual:'GDG002', catatanInvoice1:'Terima kasih atas kepercayaan Anda.', catatanInvoice2:'Barang yang sudah dibeli tidak dapat ditukar.' };

const ACTIVITY_LOG_PENGATURAN = [
  { user:'pdjsw', action:'Melakukan Login:', detail:'Sistem Utama', time:'4 menit yang lalu', color:'var(--realisasi)' },
  { user:'admin', action:'Mengubah Data Pemasok:', detail:'PT. Pemasok Contoh E', time:'17 menit yang lalu', color:'#f59e0b' },
  { user:'operator_1', action:'Membuat Nota Penjualan:', detail:'INV-2026-9682', time:'1 jam yang lalu', color:'var(--realisasi)' },
  { user:'system', action:'Sinkronisasi Database:', detail:'Server Cloud Utama', time:'3 jam yang lalu', color:'var(--accent)' },
  { user:'admin', action:'Menghapus Batch Produksi:', detail:'PRD-2026-B2', time:'7 jam yang lalu', color:'var(--danger)' },
];

// ---------- Shared UI helpers ----------
function PgHeader({ title, sub, onAdd, addLabel='Tambah' }) {
  return (
    <div className="page-head">
      <div><h1>{title}</h1><div className="sub">{sub}</div></div>
      <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
        <button className="btn btn-sm">{I.refresh()} Refresh</button>
        {onAdd && <button className="btn btn-primary" onClick={onAdd}>{I.plus()} {addLabel}</button>}
      </div>
    </div>
  );
}

function PgModalShell({ title, sub, onClose, onSave, children, saveLabel='Simpan', wide=false }) {
  useEscape(onClose);
  return (
    <div className="modal-backdrop">
      <div className="modal" onClick={e=>e.stopPropagation()} style={wide ? {maxWidth:1000, maxHeight:'92vh'} : {maxWidth:700}}>
        <div className="modal-head">
          <div><h2>{title}</h2>{sub && <div className="sub">{sub}</div>}</div>
          <button className="btn btn-icon" onClick={onClose}>{I.x(16)}</button>
        </div>
        <div className="modal-body" style={wide ? {overflowY:'auto', maxHeight:'calc(92vh - 180px)'} : {}}>{children}</div>
        <div className="modal-foot">
          <div className="muted" style={{fontSize:12.5}}><kbd>Esc</kbd> untuk batal</div>
          <div className="right" style={{display:'flex', gap:8, flexWrap:'wrap'}}>
            <button className="btn" onClick={onClose}>Batal</button>
            <button className="btn btn-primary" onClick={onSave}>{I.check()} {saveLabel}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function pgAktifPill(aktif) { return <span className={`pill ${aktif ? 'approved' : 'cancelled'}`}>{aktif ? 'Aktif' : 'Non-aktif'}</span>; }

function PgGenericModal({ moduleTitle, data, fields, formCols=2, onClose, onSave }) {
  const isEdit = !!data;
  const empty = Object.fromEntries(fields.map(f => [f.key, f.type === 'aktif' ? true : f.type === 'number' ? 0 : '']));
  const [form, setForm] = React.useState(data ? {...empty, ...data} : empty);
  const set = (k,v) => setForm(f => ({...f, [k]:v}));
  return (
    <PgModalShell title={isEdit ? `Edit ${moduleTitle}` : `Tambah ${moduleTitle}`} sub="Pastikan semua kolom bertanda (*) terisi." onClose={onClose} onSave={()=>onSave(form)}>
      <div className={`form-grid-${formCols}`} style={{gap:12}}>
        {fields.map(f => {
          const spanStyle = f.span ? {gridColumn:`span ${f.span}`} : {};
          if (f.type === 'aktif') {
            return (
              <div className="field" style={spanStyle} key={f.key}>
                <label>Status</label>
                <select className="select" value={form[f.key] ? '1' : '0'} onChange={e=>set(f.key, e.target.value === '1')}>
                  <option value="1">Aktif</option><option value="0">Non-aktif</option>
                </select>
              </div>
            );
          }
          if (f.type === 'select') {
            return (
              <div className="field" style={spanStyle} key={f.key}>
                <label>{f.label}{f.required && <span style={{color:'var(--danger)'}}> *</span>}</label>
                <select className="select" value={form[f.key]} onChange={e=>set(f.key, e.target.value)}>
                  <option value="">— Pilih —</option>
                  {f.options.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            );
          }
          if (f.type === 'textarea') {
            return (
              <div className="field" style={spanStyle} key={f.key}>
                <label>{f.label}</label>
                <textarea className="textarea" value={form[f.key]} onChange={e=>set(f.key, e.target.value)}/>
              </div>
            );
          }
          return (
            <div className="field" style={spanStyle} key={f.key}>
              <label>{f.label}{f.required && <span style={{color:'var(--danger)'}}> *</span>}</label>
              <input className={`input ${f.mono ? 'mono' : ''}`} type={f.type === 'number' ? 'number' : 'text'} disabled={f.disabled}
                value={form[f.key]} onChange={e=>set(f.key, f.type === 'number' ? +e.target.value : e.target.value)} />
            </div>
          );
        })}
      </div>
    </PgModalShell>
  );
}

function PgSimpleCatalog({ moduleTitle, addLabel='Tambah Data', initialRows, keyField, listColumns, fields, formCols=2 }) {
  const [rows, setRows] = React.useState(initialRows);
  const [modal, setModal] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [q, setQ] = React.useState('');
  // Root-cause fix: tombol Hapus di bawah dulu tidak punya onClick sama sekali (no-op).
  const [pendingDelete, setPendingDelete] = React.useState(null);
  const filtered = rows.filter(r => !q || listColumns.some(c => String(r[c.key] ?? '').toLowerCase().includes(q.toLowerCase())));
  const openAdd = () => { setModal(null); setShowModal(1); };
  const openEdit = (r) => { setModal(r); setShowModal(2); };
  const save = (form) => {
    setRows(prev => showModal === 2 ? prev.map(r => r[keyField] === modal[keyField] ? form : r) : [...prev, form]);
    window.__erpToast && window.__erpToast(`${moduleTitle} berhasil disimpan.`);
    setShowModal(false); setModal(null);
  };
  return (
    <>
      <PgHeader title={moduleTitle} sub={`Jumlah: ${filtered.length} data`} onAdd={openAdd} addLabel={addLabel} />
      <div className="filter-bar"><div className="filter-grid">
        <div className="field"><label>Pencarian</label><div className="input-w-icon">{I.search(14)}<input className="input" placeholder="Cari…" value={q} onChange={e=>setQ(e.target.value)}/></div></div>
        <div className="filter-actions"><button className="btn">{I.filter()} Cari</button></div>
      </div></div>
      <div className="table-card">
        <div className="table-toolbar"><div className="table-toolbar-left"><b>Jumlah: {filtered.length}</b></div></div>
        <div className="table-scroll">
          <table className="data">
            <thead><tr>{listColumns.map(c => <th key={c.key}>{c.label}</th>)}<th style={{width:90}}>Aksi</th></tr></thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r[keyField]} onClick={()=>openEdit(r)}>
                  {listColumns.map((c,i) => (
                    <td key={c.key} className={c.mono ? 'mono' : ''}>
                      {c.render ? c.render(r[c.key], r) : i === 0 ? <span className="cell-link">{r[c.key]}</span> : (r[c.key] ?? <span className="muted">—</span>)}
                    </td>
                  ))}
                  <td onClick={e=>e.stopPropagation()}>
                    <div className="row-actions">
                      <button className="btn btn-icon btn-sm" title="Edit" onClick={()=>openEdit(r)}>{I.edit()}</button>
                      <button className="btn btn-icon btn-sm del" title="Hapus" onClick={()=>setPendingDelete(r)}>{I.trash()}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pager"><div>Menampilkan <b>1</b>–<b>{filtered.length}</b> dari <b>{filtered.length}</b></div></div>
      </div>
      {showModal && <PgGenericModal moduleTitle={moduleTitle} data={modal} fields={fields} formCols={formCols} onClose={()=>setShowModal(false)} onSave={save} />}
      {pendingDelete && (
        <ConfirmationModal
          title="Hapus Data?" message={`Data "${pendingDelete[keyField]}" akan dihapus permanen dari ${moduleTitle}.`}
          confirmLabel="Hapus" confirmKind="danger" requireReason={false}
          onCancel={()=>setPendingDelete(null)}
          onConfirm={()=>{
            setRows(prev => prev.filter(x => x[keyField] !== pendingDelete[keyField]));
            window.__erpToast && window.__erpToast(`${moduleTitle} berhasil dihapus.`);
            setPendingDelete(null);
          }} />
      )}
    </>
  );
}

// ─── 1. Akses User (catalog + permission checklist modal) ─────────────────

function PgPermTable({ menus, setMenus }) {
  const cols = [ {key:'view',label:'Lihat'}, {key:'add',label:'Tambah'}, {key:'edit',label:'Ubah'}, {key:'del',label:'Hapus'}, {key:'print',label:'Cetak'}, {key:'exportData',label:'Export'} ];
  const toggle = (idx, key) => setMenus(menus.map((m,i) => i === idx ? {...m, [key]: !m[key]} : m));
  return (
    <div className="inline-table">
      <h3 style={{margin:'0 0 8px'}}>Hak Akses Menu</h3>
      <div className="line-items" style={{height:240, overflowY:'auto', overflowX:'auto'}}>
        <table>
          <thead><tr><th>Menu</th>{cols.map(c => <th key={c.key} style={{width:70, textAlign:'center'}}>{c.label}</th>)}</tr></thead>
          <tbody>
            {menus.map((m, idx) => (
              <tr key={m.kodeMenu}>
                <td>{m.namaMenu}</td>
                {cols.map(c => <td key={c.key} style={{textAlign:'center'}}><input type="checkbox" checked={!!m[c.key]} onChange={()=>toggle(idx, c.key)} /></td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AksesUserModal({ data, onClose, onSave }) {
  const isEdit = !!data;
  const empty = { kodeUser:'', namaUser:'', grupUser:'', aktif:true, menus: pgEmptyMenus() };
  const [form, setForm] = React.useState(() => {
    const base = data ? {...empty, ...data} : {...empty};
    if (!Array.isArray(base.menus) || base.menus.length === 0) base.menus = pgEmptyMenus();
    return base;
  });
  const set = (k,v) => setForm(f => ({...f, [k]:v}));
  return (
    <PgModalShell title={isEdit ? `Edit Akses User — ${form.kodeUser}` : 'Tambah Akses User'} onClose={onClose} onSave={()=>onSave(form)} wide>
      <div className="panel">
        <div className="form-grid-3" style={{gap:12}}>
          <div className="field"><label>Kode User <span style={{color:'var(--danger)'}}>*</span></label><input className="input mono" value={form.kodeUser} onChange={e=>set('kodeUser',e.target.value)} disabled={isEdit}/></div>
          <div className="field"><label>Nama User <span style={{color:'var(--danger)'}}>*</span></label><input className="input" value={form.namaUser} onChange={e=>set('namaUser',e.target.value)}/></div>
          <div className="field"><label>Grup User</label><select className="select" value={form.grupUser} onChange={e=>set('grupUser',e.target.value)}><option value="">— Pilih —</option>{PG_GRUP_OPTS.map(g=><option key={g}>{g}</option>)}</select></div>
          <div className="field"><label>Status</label><select className="select" value={form.aktif ? '1':'0'} onChange={e=>set('aktif', e.target.value==='1')}><option value="1">Aktif</option><option value="0">Non-aktif</option></select></div>
        </div>
      </div>
      <div className="panel" style={{marginTop:16}}>
        <PgPermTable menus={form.menus} setMenus={v=>set('menus', v)} />
      </div>
    </PgModalShell>
  );
}

function AksesUserList() {
  const [rows, setRows] = React.useState(PG_AKSES_USER);
  const [modal, setModal] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [q, setQ] = React.useState('');
  // Root-cause fix: tombol Hapus di bawah dulu tidak punya onClick sama sekali (no-op).
  const [pendingDelete, setPendingDelete] = React.useState(null);
  const filtered = rows.filter(r => !q || r.namaUser.toLowerCase().includes(q.toLowerCase()) || r.kodeUser.toLowerCase().includes(q.toLowerCase()));
  const save = (form) => {
    setRows(prev => showModal === 2 ? prev.map(r => r.kodeUser === modal.kodeUser ? form : r) : [...prev, form]);
    window.__erpToast && window.__erpToast('Akses user berhasil disimpan.');
    setShowModal(false); setModal(null);
  };
  return (
    <>
      <PgHeader title="Akses User" sub={`Jumlah: ${filtered.length} user`} onAdd={()=>{setModal(null); setShowModal(1);}} addLabel="Tambah Akses" />
      <div className="filter-bar"><div className="filter-grid">
        <div className="field"><label>Pencarian</label><div className="input-w-icon">{I.search(14)}<input className="input" placeholder="Kode atau nama user…" value={q} onChange={e=>setQ(e.target.value)}/></div></div>
        <div className="filter-actions"><button className="btn">{I.filter()} Cari</button></div>
      </div></div>
      <div className="table-card">
        <div className="table-toolbar"><div className="table-toolbar-left"><b>Jumlah: {filtered.length}</b></div></div>
        <div className="table-scroll">
          <table className="data">
            <thead><tr><th>Kode User</th><th>Nama User</th><th>Grup</th><th>Jml Menu Diakses</th><th>Status</th><th style={{width:90}}>Aksi</th></tr></thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.kodeUser} onClick={()=>{setModal(r); setShowModal(2);}}>
                  <td className="mono muted">{r.kodeUser}</td>
                  <td><span className="cell-link">{r.namaUser}</span></td>
                  <td>{r.grupUser}</td>
                  <td className="mono">{r.menus.filter(m => m.view || m.add || m.edit || m.del || m.print || m.exportData).length} / {r.menus.length}</td>
                  <td>{pgAktifPill(r.aktif)}</td>
                  <td onClick={e=>e.stopPropagation()}><div className="row-actions"><button className="btn btn-icon btn-sm" title="Edit" onClick={()=>{setModal(r); setShowModal(2);}}>{I.edit()}</button><button className="btn btn-icon btn-sm del" title="Hapus" onClick={()=>setPendingDelete(r)}>{I.trash()}</button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pager"><div>Menampilkan <b>1</b>–<b>{filtered.length}</b> dari <b>{filtered.length}</b></div></div>
      </div>
      {showModal && <AksesUserModal data={modal} onClose={()=>setShowModal(false)} onSave={save} />}
      {pendingDelete && (
        <ConfirmationModal
          title="Hapus Data?" message={`Akses user "${pendingDelete.namaUser}" akan dihapus permanen.`}
          confirmLabel="Hapus" confirmKind="danger" requireReason={false}
          onCancel={()=>setPendingDelete(null)}
          onConfirm={()=>{
            setRows(prev => prev.filter(x => x.kodeUser !== pendingDelete.kodeUser));
            window.__erpToast && window.__erpToast('Akses user berhasil dihapus.');
            setPendingDelete(null);
          }} />
      )}
    </>
  );
}

// ─── 2. Menu ────────────────────────────────────────────────────────────────

function MenuList() {
  return (
    <PgSimpleCatalog
      moduleTitle="Menu" addLabel="Tambah Menu" keyField="kodeMenu" initialRows={PG_MENU}
      listColumns={[
        { key:'kodeMenu', label:'Kode', mono:true },
        { key:'namaMenu', label:'Nama' },
        { key:'tipeMenu', label:'Tipe' },
        { key:'kodeParent', label:'Parent', mono:true },
        { key:'aktif', label:'Status', render:v => pgAktifPill(v) },
      ]}
      fields={[
        { key:'kodeMenu', label:'Kode Menu', required:true, mono:true },
        { key:'namaMenu', label:'Nama Menu', required:true },
        { key:'tipeMenu', label:'Tipe Menu', type:'select', options:['Katalog','Transaksi','Module','Laporan'] },
        { key:'kodeParent', label:'Kode Parent', mono:true },
        { key:'grupComponent', label:'Grup Component' },
        { key:'namaComponent', label:'Nama Component' },
        { key:'keterangan', label:'Keterangan', type:'textarea', span:2 },
        { key:'aktif', type:'aktif' },
      ]}
    />
  );
}

// ─── 3. Grup Menu ───────────────────────────────────────────────────────────

function GrupMenuList() {
  return (
    <PgSimpleCatalog
      moduleTitle="Grup Menu" addLabel="Tambah Grup Menu" keyField="kode" initialRows={PG_GRUP_MENU}
      listColumns={[
        { key:'kode', label:'Kode', mono:true },
        { key:'nama', label:'Nama' },
        { key:'urutan', label:'Urutan' },
      ]}
      fields={[
        { key:'kode', label:'Kode', required:true, mono:true },
        { key:'nama', label:'Nama', required:true },
        { key:'icon', label:'Icon' },
        { key:'urutan', label:'Urutan', type:'number' },
        { key:'keterangan', label:'Keterangan', type:'textarea', span:2 },
      ]}
    />
  );
}

// ─── 4-6. Konfigurasi (single-record settings forms, tanpa modal) ─────────

function KonfigurasiSistem() {
  const [d, setD] = React.useState(PG_SISTEM);
  const gudangOpts = ['GDG001', 'GDG002', 'GDG003', 'GDG004'];
  const satuanOpts = ['PCS', 'KG', 'LBR', 'MTR', 'ROLL'];
  return (
    <>
      <PgHeader title="Konfigurasi Sistem" sub="Pengaturan umum sistem ERP." />
      <div className="panel" style={{marginTop:0}}>
        <div className="form-grid-2" style={{gap:16}}>
          <div className="field"><label>Tempo Hutang (hari)</label><input className="input mono" type="number" value={d.tempoHutang} onChange={e=>setD({...d, tempoHutang:+e.target.value})}/></div>
          <div className="field"><label>Gudang Pembelian Default</label><select className="select" value={d.kodeGudangBeli} onChange={e=>setD({...d, kodeGudangBeli:e.target.value})}>{gudangOpts.map(g=><option key={g}>{g}</option>)}</select></div>
          <div className="field"><label>Satuan Default</label><select className="select" value={d.kodeSatuan} onChange={e=>setD({...d, kodeSatuan:e.target.value})}>{satuanOpts.map(s=><option key={s}>{s}</option>)}</select></div>
          <div className="field"><label>Tampilkan Header Cetak</label><select className="select" value={d.cetakHeader ? '1':'0'} onChange={e=>setD({...d, cetakHeader:e.target.value==='1'})}><option value="1">Ya</option><option value="0">Tidak</option></select></div>
          <div className="field"><label>Tampilkan TTD Cetak</label><select className="select" value={d.cetakTtd ? '1':'0'} onChange={e=>setD({...d, cetakTtd:e.target.value==='1'})}><option value="1">Ya</option><option value="0">Tidak</option></select></div>
          <div className="field"><label>Status Sistem</label><select className="select" value={d.aktif ? '1':'0'} onChange={e=>setD({...d, aktif:e.target.value==='1'})}><option value="1">Aktif</option><option value="0">Non-aktif</option></select></div>
        </div>
        <div style={{marginTop:20, display:'flex', gap:8, justifyContent:'flex-end'}}>
          <button className="btn" onClick={()=>setD(PG_SISTEM)}>Reset</button>
          <button className="btn btn-primary" onClick={()=>window.__erpToast && window.__erpToast('Konfigurasi sistem berhasil disimpan.')}>{I.check()} Simpan Perubahan</button>
        </div>
      </div>
    </>
  );
}

function KonfigurasiOrganisasi() {
  const [d, setD] = React.useState(() => ({...PG_ORGANISASI}));
  return (
    <>
      <PgHeader title="Konfigurasi Organisasi" sub="Pengaturan data perusahaan & cabang." />
      <div className="panel" style={{marginTop:0}}>
        <div className="form-grid-2" style={{gap:16}}>
          <div className="field" style={{gridColumn:'span 2'}}><label>Nama Perusahaan</label><input className="input" value={d.nama} onChange={e=>setD({...d, nama:e.target.value})}/></div>
          <div className="field" style={{gridColumn:'span 2'}}><label>Alamat</label><textarea className="textarea" value={d.alamat} onChange={e=>setD({...d, alamat:e.target.value})}/></div>
          <div className="field"><label>Kota</label><input className="input" value={d.kota} onChange={e=>setD({...d, kota:e.target.value})}/></div>
          <div className="field"><label>Kode Pos</label><input className="input mono" value={d.kodePos} onChange={e=>setD({...d, kodePos:e.target.value})}/></div>
          <div className="field"><label>Telepon</label><input className="input mono" value={d.telpon} onChange={e=>setD({...d, telpon:e.target.value})}/></div>
          <div className="field"><label>Email</label><input className="input" type="email" value={d.email} onChange={e=>setD({...d, email:e.target.value})}/></div>
          <div className="field"><label>No. NPWP</label><input className="input mono" value={d.noNpwp} onChange={e=>setD({...d, noNpwp:e.target.value})}/></div>
          <div className="field"><label>Rekening Bank</label><input className="input" value={d.akunBank} onChange={e=>setD({...d, akunBank:e.target.value})}/></div>
        </div>
        <div style={{marginTop:20, display:'flex', gap:8, justifyContent:'flex-end'}}>
          <button className="btn" onClick={()=>setD({...PG_ORGANISASI})}>Reset</button>
          <button className="btn btn-primary" onClick={()=>{ Object.assign(PG_ORGANISASI, d); window.__erpToast && window.__erpToast('Konfigurasi organisasi berhasil disimpan (berlaku sampai halaman di-refresh).'); }}>{I.check()} Simpan Perubahan</button>
        </div>
      </div>
    </>
  );
}

function KonfigurasiPenjualan() {
  const [d, setD] = React.useState(PG_PENJUALAN);
  const gudangOpts = ['GDG001', 'GDG002', 'GDG003', 'GDG004'];
  return (
    <>
      <PgHeader title="Konfigurasi Penjualan" sub="Pengaturan default modul penjualan." />
      <div className="panel" style={{marginTop:0}}>
        <div className="form-grid-2" style={{gap:16}}>
          <div className="field"><label>Besaran PPN (%)</label><input className="input mono" type="number" value={d.ppn} onChange={e=>setD({...d, ppn:+e.target.value})}/></div>
          <div className="field"><label>Gudang Penjualan Default</label><select className="select" value={d.kodeGudangJual} onChange={e=>setD({...d, kodeGudangJual:e.target.value})}>{gudangOpts.map(g=><option key={g}>{g}</option>)}</select></div>
          <div className="field"><label>Pajak Masukan</label><input className="input" value={d.ppnMasukan} onChange={e=>setD({...d, ppnMasukan:e.target.value})}/></div>
          <div className="field"><label>Pajak Keluaran</label><input className="input" value={d.ppnKeluaran} onChange={e=>setD({...d, ppnKeluaran:e.target.value})}/></div>
          <div className="field"><label>Tempo Piutang (hari)</label><input className="input mono" type="number" value={d.tempoPiutang} onChange={e=>setD({...d, tempoPiutang:+e.target.value})}/></div>
          <div className="field"><label>Plafon Piutang</label><input className="input mono" type="number" value={d.plafonPiutang} onChange={e=>setD({...d, plafonPiutang:+e.target.value})}/></div>
          <div className="field" style={{gridColumn:'span 2'}}><label>Catatan Invoice 1</label><textarea className="textarea" value={d.catatanInvoice1} onChange={e=>setD({...d, catatanInvoice1:e.target.value})}/></div>
          <div className="field" style={{gridColumn:'span 2'}}><label>Catatan Invoice 2</label><textarea className="textarea" value={d.catatanInvoice2} onChange={e=>setD({...d, catatanInvoice2:e.target.value})}/></div>
        </div>
        <div style={{marginTop:20, display:'flex', gap:8, justifyContent:'flex-end'}}>
          <button className="btn" onClick={()=>setD(PG_PENJUALAN)}>Reset</button>
          <button className="btn btn-primary" onClick={()=>window.__erpToast && window.__erpToast('Konfigurasi penjualan berhasil disimpan.')}>{I.check()} Simpan Perubahan</button>
        </div>
      </div>
    </>
  );
}

// ─── Dashboard & Router (unchanged) ────────────────────────────────────────


// ─── 7-12. Menu Admin (dulu kosong) — form satu-record sederhana. Simpan menulis ke objek PG_* di
// memori (berlaku sampai halaman di-refresh, sesuai sifat demo). ─────────────────────────────────
const PG_DEFAULT = { tempoPiutang:30, tempoHutang:30, kodeGudang:'GDG001', kodeSatuan:'PCS', ppn:11, ppnMode:'Exclude', caraBayar:'KREDIT', mataUang:'IDR' };
const PG_CETAKAN = { judulKop:'PT. Pacific Data Jaya', catatanPO:'Mohon cantumkan No. PO pada surat jalan.', catatanInvoice:'Pembayaran ditransfer ke rekening perusahaan.', catatanSJ:'Barang diterima dalam keadaan baik dan lengkap.', ttdKiri:'Dibuat oleh', ttdTengah:'Diperiksa oleh', ttdKanan:'Disetujui oleh', tampilLogo:true };
const PG_FITUR = { approvalPO:true, approvalSO:true, batasPlafon:true, stokMinus:false, multiGudang:true, hargaPerPelanggan:false, auditLog:true };
const PG_SESI = [
  { user:'admin',      perangkat:'Chrome · Windows 11', ip:'192.168.1.10', mulai:'25-11-2026 08:02', status:'Aktif' },
  { user:'operator_1', perangkat:'Edge · Windows 10',   ip:'192.168.1.24', mulai:'25-11-2026 08:15', status:'Aktif' },
  { user:'gudang_01',  perangkat:'Chrome · Android',    ip:'192.168.1.41', mulai:'25-11-2026 07:48', status:'Aktif' },
  { user:'sales_a',    perangkat:'Safari · iOS',        ip:'10.10.0.7',    mulai:'24-11-2026 16:30', status:'Aktif' },
];
const PG_TAMPILAN = { ukuranHuruf:'100', kepadatan:'Normal', barisPerHalaman:10, formatTanggal:'DD-MM-YYYY' };

// fields: [{ key, label, type:'text'|'number'|'select'|'bool'|'textarea', options, span }]
function PgSettingsForm({ title, sub, store, fields, onSaved }) {
  const [d, setD] = React.useState(() => ({ ...store }));
  const [err, setErr] = React.useState('');
  const save = () => {
    const bad = fields.find(f => f.type === 'number' && (d[f.key] === '' || +d[f.key] < 0));
    if (bad) { setErr(`${bad.label} harus berupa angka ≥ 0.`); return; }
    setErr('');
    Object.assign(store, d);
    onSaved && onSaved(d);
    window.__erpToast && window.__erpToast(`${title} berhasil disimpan (berlaku sampai halaman di-refresh).`);
  };
  return (
    <>
      <PgHeader title={title} sub={sub} />
      <div className="panel" style={{marginTop:0}}>
        {err && <div className="danger-form" style={{marginBottom:12}}>{err}</div>}
        <div className="form-grid-2" style={{gap:16}}>
          {fields.map(f => (
            <div className="field" key={f.key} style={f.span ? {gridColumn:`span ${f.span}`} : null}>
              <label>{f.label}</label>
              {f.type === 'bool' ? (
                <select className="select" value={d[f.key] ? '1' : '0'} onChange={e=>setD({...d, [f.key]: e.target.value === '1'})}><option value="1">Ya / Aktif</option><option value="0">Tidak</option></select>
              ) : f.type === 'select' ? (
                <select className="select" value={d[f.key]} onChange={e=>setD({...d, [f.key]: e.target.value})}>{f.options.map(o => <option key={o}>{o}</option>)}</select>
              ) : f.type === 'textarea' ? (
                <textarea className="textarea" value={d[f.key]} onChange={e=>setD({...d, [f.key]: e.target.value})} />
              ) : (
                <input className={`input ${f.type === 'number' ? 'mono' : ''}`} type={f.type === 'number' ? 'number' : 'text'} value={d[f.key]}
                  onChange={e=>setD({...d, [f.key]: f.type === 'number' ? (e.target.value === '' ? '' : +e.target.value) : e.target.value})} />
              )}
            </div>
          ))}
        </div>
        <div style={{marginTop:20, display:'flex', gap:8, justifyContent:'flex-end'}}>
          <button className="btn" onClick={()=>setD({ ...store })}>Reset</button>
          <button className="btn btn-primary" onClick={save}>{I.check()} Simpan Perubahan</button>
        </div>
      </div>
    </>
  );
}

function AdminProfil() {
  return <PgSettingsForm title="Profil Perusahaan" sub="Identitas perusahaan yang tampil di kop semua cetakan." store={PG_ORGANISASI} fields={[
    { key:'nama', label:'Nama Perusahaan', span:2 }, { key:'alamat', label:'Alamat', type:'textarea', span:2 },
    { key:'kota', label:'Kota' }, { key:'kodePos', label:'Kode Pos' }, { key:'telpon', label:'Telepon' }, { key:'email', label:'Email' },
    { key:'noNpwp', label:'No. NPWP' }, { key:'akunBank', label:'Rekening Bank' },
  ]} />;
}
function AdminDefault() {
  return <PgSettingsForm title="Nilai Default" sub="Nilai awal yang otomatis terisi saat membuat dokumen baru." store={PG_DEFAULT} fields={[
    { key:'tempoPiutang', label:'Tempo Piutang (hari)', type:'number' }, { key:'tempoHutang', label:'Tempo Hutang (hari)', type:'number' },
    { key:'kodeGudang', label:'Gudang Default', type:'select', options:['GDG001','GDG002','GDG003','GDG004'] },
    { key:'kodeSatuan', label:'Satuan Default', type:'select', options:['PCS','KG','LBR','MTR','ROLL'] },
    { key:'ppn', label:'PPN (%)', type:'number' }, { key:'ppnMode', label:'Mode PPN', type:'select', options:['Exclude','Include'] },
    { key:'caraBayar', label:'Cara Bayar Default', type:'select', options:['KREDIT','TUNAI'] }, { key:'mataUang', label:'Mata Uang', type:'select', options:['IDR','USD'] },
  ]} />;
}
function AdminCetakan() {
  return <PgSettingsForm title="Keterangan Cetakan" sub="Catatan kaki & label tanda tangan pada dokumen cetak." store={PG_CETAKAN} fields={[
    { key:'judulKop', label:'Judul Kop', span:2 }, { key:'catatanPO', label:'Catatan Purchase Order', type:'textarea', span:2 },
    { key:'catatanInvoice', label:'Catatan Faktur Penjualan', type:'textarea', span:2 }, { key:'catatanSJ', label:'Catatan Surat Jalan', type:'textarea', span:2 },
    { key:'ttdKiri', label:'Label TTD Kiri' }, { key:'ttdTengah', label:'Label TTD Tengah' }, { key:'ttdKanan', label:'Label TTD Kanan' },
    { key:'tampilLogo', label:'Tampilkan Logo', type:'bool' },
  ]} />;
}
function AdminFitur() {
  return <PgSettingsForm title="Fitur Administrator" sub="Aktif/nonaktifkan fitur kontrol per perusahaan." store={PG_FITUR} fields={[
    { key:'approvalPO', label:'Wajib Approval Purchase Order', type:'bool' }, { key:'approvalSO', label:'Wajib Approval Sales Order', type:'bool' },
    { key:'batasPlafon', label:'Blokir Order Melebihi Plafon', type:'bool' }, { key:'stokMinus', label:'Izinkan Stok Minus', type:'bool' },
    { key:'multiGudang', label:'Multi Gudang', type:'bool' }, { key:'hargaPerPelanggan', label:'Harga Khusus per Pelanggan', type:'bool' },
    { key:'auditLog', label:'Catat Log Aktivitas', type:'bool' },
  ]} />;
}
function AdminSesi() {
  const [rows, setRows] = React.useState(PG_SESI);
  const [target, setTarget] = React.useState(null);
  return (
    <>
      <PgHeader title="Login Pengguna" sub={`${rows.filter(r=>r.status==='Aktif').length} sesi aktif`} />
      <div className="table-card">
        <div className="table-scroll">
          <table className="data">
            <thead><tr><th>User</th><th>Perangkat</th><th>IP</th><th>Mulai</th><th>Status</th><th style={{width:120}}>Aksi</th></tr></thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.user + r.mulai}>
                  <td className="mono">{r.user}</td><td>{r.perangkat}</td><td className="mono">{r.ip}</td><td className="mono">{r.mulai}</td>
                  <td>{pgAktifPill(r.status === 'Aktif')}</td>
                  <td><button className="btn btn-sm" disabled={r.status !== 'Aktif'} onClick={()=>setTarget(r)}>Akhiri Sesi</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {target && (
        <ConfirmationModal title="Akhiri Sesi" message={`Sesi ${target.user} (${target.perangkat}) akan diakhiri.`} confirmLabel="Akhiri" requireReason={false}
          onCancel={()=>setTarget(null)}
          onConfirm={()=>{ setRows(prev => prev.map(x => x === target ? { ...x, status:'Berakhir' } : x)); setTarget(null); window.__erpToast && window.__erpToast('Sesi diakhiri.'); }} />
      )}
    </>
  );
}
function AdminTampilan() {
  const apply = (d) => { document.documentElement.style.zoom = (+d.ukuranHuruf || 100) / 100; };
  return <PgSettingsForm title="Tampilan & Tema" sub="Preferensi tampilan aplikasi." store={PG_TAMPILAN} onSaved={apply} fields={[
    { key:'ukuranHuruf', label:'Skala Tampilan (%)', type:'select', options:['90','100','110','125'] },
    { key:'kepadatan', label:'Kepadatan Tabel', type:'select', options:['Rapat','Normal','Lega'] },
    { key:'barisPerHalaman', label:'Baris per Halaman', type:'number' },
    { key:'formatTanggal', label:'Format Tanggal', type:'select', options:['DD-MM-YYYY','YYYY-MM-DD'] },
  ]} />;
}

function PengaturanDashboard({ onOpenSub }) {
  const sections = [
    {
      title:'Pengaturan Umum',
      count:'6',
      tiles:[
        { id:'sistem',      title:'Konfigurasi Sistem',      badge:'12 item', icon:I.settings(20) },
        { id:'organisasi',  title:'Konfigurasi Organisasi',  badge:'5 item',  icon:I.list(20) },
        { id:'penjualan',   title:'Konfigurasi Penjualan',   badge:'9 item',  icon:I.cart(20) },
      ]
    },
    {
      title:'Hak Akses & Menu',
      count:'3',
      tiles:[
        { id:'akses',      title:'Akses User',     badge:'12 user', icon:I.users(20) },
        { id:'menu',       title:'Menu',           badge:'45 menu', icon:I.list(20) },
        { id:'grupmenu',   title:'Grup Menu',      badge:'8 grup',  icon:I.layers(20) },
      ]
    },
    {
      title:'Administrasi',
      count:'6',
      tiles:[
        { id:'profil',     title:'Profil Perusahaan',     badge:'10 field',  icon:I.invoice(20) },
        { id:'default',    title:'Nilai Default',         badge:'8 default', icon:I.settings(20) },
        { id:'cetakan',    title:'Keterangan Cetakan',    badge:'4 catatan', icon:I.print(20)   },
        { id:'fitur',      title:'Fitur Administrator',   badge:'6 hak akses', icon:I.shield(20) },
        { id:'sesi',       title:'Login Pengguna',        badge:'1 sesi',    icon:I.users(20) },
        { id:'tampilan',   title:'Tampilan & Tema',       badge:'4 preset',  icon:I.layers(20) },
      ]
    },
  ];
  return (
    <ModuleDashboard
      title="Dashboard Pengaturan"
      subtitle="Halaman ini digunakan untuk mengelola data pengaturan, tersedia 15 menu pendukung."
      sections={sections}
      activityLog={ACTIVITY_LOG_PENGATURAN}
      onOpenSub={onOpenSub}
    />
  );
}

function PengaturanPage({ activeSub, onSubChange, onNavigate, theme, setTheme }) {
  if (!activeSub) return <PengaturanDashboard onOpenSub={onSubChange} />;
  const subLabel = MODULE_SUBS.pengaturan.find(s => s.id === activeSub)?.label ?? activeSub;
  return (
    <div className="page" data-screen-label={`Pengaturan — ${activeSub}`}>
      <div className="crumbs">
        <a onClick={() => onNavigate?.('home')} style={{cursor:'pointer'}}>Home</a><span className="sep">/</span>
        <a onClick={()=>onSubChange(null)} style={{cursor:'pointer'}}>Pengaturan</a><span className="sep">/</span>
        <span className="current">{subLabel}</span>
      </div>
      {/* Pengaturan subs */}
      {activeSub === 'akses'       && <AksesUserList />}
      {activeSub === 'menu'        && <MenuList />}
      {activeSub === 'grupmenu'    && <GrupMenuList />}
      {activeSub === 'sistem'      && <KonfigurasiSistem />}
      {activeSub === 'organisasi'  && <KonfigurasiOrganisasi />}
      {activeSub === 'penjualan'   && <KonfigurasiPenjualan />}
      {/* Admin subs (digabung ke Pengaturan) */}
      {activeSub === 'profil'      && <AdminProfil />}
      {activeSub === 'default'     && <AdminDefault />}
      {activeSub === 'cetakan'     && <AdminCetakan />}
      {activeSub === 'fitur'       && <AdminFitur />}
      {activeSub === 'sesi'        && <AdminSesi />}
      {activeSub === 'tampilan'    && <AdminTampilan />}
    </div>
  );
}

window.PengaturanPage = PengaturanPage;
