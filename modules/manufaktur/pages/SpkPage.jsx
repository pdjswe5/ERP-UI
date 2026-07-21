// Manufaktur — Surat Perintah Kerja: list, dialog (create/edit), dan entry modal SPK referensi.
// Dipindah dari manufaktur.jsx, identifier diprefix Mf/MF_.
//
// State-lifting fix: MfSpkDialog sekarang merakit objek form pada tombol Simpan dan mengirimnya
// ke onSave (sebelumnya tombol Simpan hanya memanggil onSave tanpa data apa pun, sehingga
// Tambah/Edit tidak pernah benar-benar tersimpan). rows/setRows diangkat ke MfManufakturPage.

// ─── SPK List ────────────────────────────────────────────────────────────────

function MfSpkList({ rows, onAdd, onView, onEdit, onCancelDoc, onNavigate }) {
  const [tglDari, setTglDari] = React.useState('');
  const [tglSmp, setTglSmp]   = React.useState('');
  const [statusF, setStatusF] = React.useState('');
  const [q, setQ]             = React.useState('');
  const [page, setPage]       = React.useState(1);
  const perPage = 10;

  const filtered = rows.filter(r => {
    if (statusF && r.status !== statusF) return false;
    if (q && !r.no.toLowerCase().includes(q.toLowerCase()) &&
             !r.produk.toLowerCase().includes(q.toLowerCase()) &&
             !(r.stempel || '').toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageRows = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Surat Perintah Kerja</h1>
          <div className="sub">Daftar work order produksi</div>
        </div>
      </div>

      <div className="filter-bar">
        <div className="filter-grid" style={{gridTemplateColumns:'1fr 1fr 1fr auto auto'}}>
          <div className="field">
            <label>Tgl. Dari</label>
            <input className="input" type="date" value={tglDari} onChange={e => setTglDari(e.target.value)} />
          </div>
          <div className="field">
            <label>Tgl. Sampai</label>
            <input className="input" type="date" value={tglSmp} onChange={e => setTglSmp(e.target.value)} />
          </div>
          <div className="field">
            <label>Status</label>
            <select className="select" value={statusF} onChange={e => setStatusF(e.target.value)}>
              <option value="">Semua</option>
              {MF_STATUS_SPK.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="filter-actions">
            <button className="btn btn-primary" onClick={() => setPage(1)}>{I.search(13)} Cari</button>
            <button className="btn" onClick={() => { setTglDari(''); setTglSmp(''); setStatusF(''); setQ(''); setPage(1); }}>Reset</button>
          </div>
        </div>
      </div>

      <div className="table-card">
        <div className="table-toolbar">
          <div className="table-toolbar-left">
            Total Item <b>({filtered.length})</b>
          </div>
          <div className="table-toolbar-right">
            <button className="btn btn-primary btn-sm" onClick={onAdd}>{I.plus()} Tambah Data</button>
            <button className="btn btn-sm btn-icon" title="Refresh">{I.refresh()}</button>
            <button className="btn btn-sm btn-icon" title="Print">{I.print()}</button>
            <button className="btn btn-sm btn-icon btn-danger" title="Hapus">{I.trash()}</button>
          </div>
        </div>

        <div className="table-scroll">
          <table className="data">
            <thead>
              <tr>
                <th style={{width:32}}><input type="checkbox" className="cb" /></th>
                <th>No SPK</th>
                <th>Tanggal</th>
                <th>Produk</th>
                <th>Gudang</th>
                <th>Stempel</th>
                <th>Status</th>
                <th className="center" style={{width:60}}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 && (
                <tr><td colSpan={8} style={{textAlign:'center', padding:32, color:'var(--text-3)'}}>Tidak ada data</td></tr>
              )}
              {pageRows.map(r => (
                <tr key={r.no}>
                  <td><input type="checkbox" className="cb" onClick={e => e.stopPropagation()} /></td>
                  <td><span className="cell-link" style={{cursor:'pointer'}} onClick={() => onView(r)}>{r.no}</span></td>
                  <td>{r.tgl}</td>
                  <td>{r.produk}</td>
                  <td>{r.gudang}</td>
                  <td>
                    {r.stempel
                      ? <span style={{display:'inline-block', padding:'2px 8px', borderRadius:999,
                          fontSize:11.5, fontWeight:600, background:'var(--primary)', color:'#fff'}}>
                          {r.stempel}
                        </span>
                      : <span style={{color:'var(--text-3)'}}>—</span>}
                  </td>
                  <td><span className={`pill ${STATUS_CLASS[r.status] || 'draft'}`}>{r.status}</span></td>
                  <td className="center">
                    <div className="row-actions">
                      <button className="btn btn-icon btn-sm" title="Edit" onClick={() => onEdit(r)}>{I.edit()}</button>
                      {onCancelDoc && (
                        <button className="btn btn-icon btn-sm del" title={r.status === 'Batal' ? 'Sudah dibatalkan' : 'Batalkan SPK'}
                          disabled={r.status === 'Batal'} onClick={() => onCancelDoc(r)}>{I.fileX(14)}</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pager">
          <span>Menampilkan {pageRows.length} dari {filtered.length} data</span>
          <div className="pager-pages">
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>{I.chev(12,'left')}</button>
            {Array.from({length: totalPages}, (_, i) => i + 1).map(p => (
              <button key={p} className={p === page ? 'active' : ''} onClick={() => setPage(p)}>{p}</button>
            ))}
            <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>{I.chev(12,'right')}</button>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── SPK Dialog ──────────────────────────────────────────────────────────────

function MfSpkDialog({ data, initialMode, onClose, onSave, onCancelDoc }) {
  // CREATE (data kosong) | VIEW (buka dari klik nama) | EDIT (buka dari ikon Edit)
  const [mode, setMode] = React.useState(data ? (initialMode === 'EDIT' ? 'EDIT' : 'VIEW') : 'CREATE');
  const isCreate = mode === 'CREATE';
  const isView   = mode === 'VIEW';
  const isBatal  = data?.status === 'Batal';

  // No. SPK: gerbang F/K sebelum field lain terbuka, sama pola dengan No. Bukti di KO/SO/DO
  // (lihat noBuktiLocked di PjDocModal) — user ketik F atau K, nomor lengkap dibuat saat Simpan.
  const [noBuktiRaw, setNoBuktiRaw] = React.useState('');
  const [noBuktiError, setNoBuktiError] = React.useState('');
  const noBuktiRef = React.useRef(null);
  const handleNoBuktiChange = (val) => {
    const v = val.toUpperCase();
    setNoBuktiRaw(v);
    if (!v) setNoBuktiError('No. SPK harus di isi');
    else if (!['F','K'].includes(v[0])) setNoBuktiError('Format No. SPK salah');
    else setNoBuktiError('');
  };
  const noBuktiLocked = isCreate && (!noBuktiRaw || !['F','K'].includes(noBuktiRaw[0]));
  React.useEffect(() => { if (isCreate && noBuktiRef.current) noBuktiRef.current.focus(); }, [isCreate]);

  // Header fields
  const [tgl,      setTgl]      = React.useState(data?.tgl      || '2026-06-24');
  const [noSo,     setNoSo]     = React.useState(data?.noSo     || '');
  const [stempel,  setStempel]  = React.useState(data?.stempel  || '');
  const [status,   setStatus]   = React.useState(data?.status   || 'Proses');
  const [tglKirim, setTglKirim] = React.useState(data?.tglKirim || '');
  const [soPicker, setSoPicker] = React.useState(false);

  // Line items — diisi dari data yang sudah ada supaya mode View/Edit menampilkan barisnya
  // (sebelumnya selalu mulai kosong meski data.bjLines/bahanLines terisi).
  const [bjLines,    setBjLines]    = React.useState(data?.bjLines    || []);
  const [bahanLines, setBahanLines] = React.useState(data?.bahanLines || []);
  const [bjModal,    setBjModal]    = React.useState(null);  // null | 'add' | {idx, data}
  const [bahanPicker, setBahanPicker] = React.useState(false);
  const [activeTab,  setActiveTab]  = React.useState('bj');

  // Approval
  const fmtNow = () => {
    const d = new Date();
    const p = n => String(n).padStart(2,'0');
    return `${p(d.getDate())}-${p(d.getMonth()+1)}-${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`;
  };
  const [dibuatOleh,    setDibuatOleh]    = React.useState(data?.dibuatOleh    || 'Admin');
  const [dibuatTgl,     setDibuatTgl]     = React.useState(data?.dibuatTgl     || fmtNow());
  const [isApproved,    setIsApproved]    = React.useState(data?.isApproved    || false);
  const [disetujuiOleh, setDisetujuiOleh] = React.useState(data?.disetujuiOleh || '');
  const [disetujuiTgl,  setDisetujuiTgl]  = React.useState(data?.disetujuiTgl  || '');

  const handleApprove = () => {
    setIsApproved(true);
    setDisetujuiOleh('Admin');
    setDisetujuiTgl(fmtNow());
  };

  const modalBodyRef = React.useRef(null);
  const bjRef        = React.useRef(null);
  const bahanRef     = React.useRef(null);

  const scrollTo = (id, ref) => {
    setActiveTab(id);
    if (!ref.current || !modalBodyRef.current) return;
    const body    = modalBodyRef.current;
    const bodyTop = body.getBoundingClientRect().top;
    const refTop  = ref.current.getBoundingClientRect().top;
    body.scrollBy({ top: refTop - bodyTop - 52, behavior: 'smooth' });
  };

  React.useEffect(() => {
    const h = e => { if (e.key === 'Escape' && !bjModal && !bahanPicker && !soPicker) onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [bjModal, bahanPicker, soPicker, onClose]);

  // Barang Jadi & Bahan: pola sama seperti tabel item Pembelian/Penjualan — tambah SATU baris
  // sekaligus lewat picker (Kode/Nama terkunci begitu dipilih), hapus bersifat soft-delete
  // (baris ditandai _deleted, masih bisa di-Restore sebelum Simpan) bukan langsung hilang.
  const softDeleteBj  = (idx) => setBjLines(ls => ls.map((r,i) => i===idx ? {...r, _deleted:true}  : r));
  const restoreBj     = (idx) => setBjLines(ls => ls.map((r,i) => i===idx ? {...r, _deleted:false} : r));
  const softDeleteBahan = (idx) => setBahanLines(ls => ls.map((r,i) => i===idx ? {...r, _deleted:true}  : r));
  const restoreBahan    = (idx) => setBahanLines(ls => ls.map((r,i) => i===idx ? {...r, _deleted:false} : r));

  const onBahanPick = (picked) => {
    setBahanLines(ls => [...ls, ...picked.map((b, i) => ({
      id: Date.now() + i, gudang:'', kodeBahan:b.code, merkBahan:b.merk || '', jumlah:b._qty || '', satuan:'MTR', _added:true,
    }))]);
    setBahanPicker(false);
  };

  const updateBahan = (idx, field, val) =>
    setBahanLines(ls => ls.map((r, i) => {
      if (i !== idx) return r;
      if (field === 'kodeBahan') {
        const b = MF_BARANG.find(x => x.code === val);
        return {...r, kodeBahan: val, merkBahan: b?.merk || ''};
      }
      return {...r, [field]: val};
    }));

  const handleSave = () => {
    // Buang baris soft-delete + strip flag _deleted/_added sebelum disimpan (sama seperti
    // handleSave PjDocModal/PbModalShell di Penjualan/Pembelian).
    const cleanBj    = bjLines.filter(r => !r._deleted).map(({_deleted, _added, ...r}) => r);
    const cleanBahan = bahanLines.filter(r => !r._deleted).map(({_deleted, _added, ...r}) => r);
    // No. SPK baru dibentuk dari huruf F/K yang diketik + "SPK" + YYMM + acak, sama pola
    // dengan No. Bukti KO/SO/DO (lihat handleSave di PjDocModal).
    const finalNo = isCreate
      ? (noBuktiRaw[0] || '') + 'SPK' + new Date().toISOString().slice(2,4) + new Date().toISOString().slice(5,7) + String(Math.floor(Math.random()*9000)+1000)
      : data.no;
    onSave({
      no: finalNo,
      tgl, noSo, stempel, status, tglKirim,
      Batal: status === 'Batal', Alasan_Batal: data?.Alasan_Batal || '',
      bjLines: cleanBj, bahanLines: cleanBahan,
      dibuatOleh, dibuatTgl, isApproved, disetujuiOleh, disetujuiTgl,
      produk: cleanBj[0]?.namaBarang || data?.produk || '',
      gudang: cleanBahan[0]?.gudang  || data?.gudang  || '',
      qty:    cleanBj[0]?.qtySPK     || data?.qty     || '',
      kodeBahan: cleanBahan[0]?.kodeBahan || data?.kodeBahan || '',
    });
  };

  const tdS = { padding:'5px 6px', borderBottom:'1px solid var(--border)', verticalAlign:'middle' };
  // Header putih (bg-elev) — konsisten dengan tabel item Pembelian/Penjualan (lihat wrapper
  // className="inline-table" di bawah, yang men-trigger aturan CSS .inline-table .line-items thead th).
  const thS = (w, center) => ({
    padding:'10px 10px', fontWeight:500, fontSize:'11.5px', letterSpacing:'.04em', textTransform:'uppercase',
    textAlign: center ? 'center' : 'left', width: w || undefined,
  });

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal" style={{maxWidth:1440}} onClick={e => e.stopPropagation()}>
          <div className="modal-head">
            <div>
              <h2>{isCreate ? 'Buat Surat Perintah Kerja' : isView ? `Surat Perintah Kerja — ${data.no}` : `Edit Surat Perintah Kerja — ${data.no}`}</h2>
              <div className="sub">{isView ? 'Mode lihat — klik Edit untuk mengubah.' : 'Pastikan semua kolom bertanda (*) terisi.'}</div>
            </div>
            <button className="btn btn-icon" onClick={onClose}>{I.x(16)}</button>
          </div>

          <div className="modal-body" ref={modalBodyRef} style={{paddingTop:0, position:'relative'}}>

            {/* ── Header info bar ────────────────────────────── */}
            <div style={{
              background:'var(--bg-sub)', padding:'14px 0 14px',
              marginLeft:-24, marginRight:-24, paddingLeft:24, paddingRight:24,
              borderBottom:'1px solid var(--border)', marginBottom:0,
            }}>
              <div style={{display:'grid', gridTemplateColumns:'220px 160px 1fr', gap:12, marginBottom:10}}>
                <div className="field" style={{marginBottom:0}}>
                  <label>No. SPK</label>
                  {isCreate ? (
                    <>
                      <input ref={noBuktiRef} className="input mono" type="text" value={noBuktiRaw}
                        onChange={e => handleNoBuktiChange(e.target.value)} placeholder="Ketik F atau K" maxLength={1} />
                      {noBuktiError && <div className="no-bukti-alert">{noBuktiError}</div>}
                    </>
                  ) : (
                    <input className="input" value={data?.no} readOnly />
                  )}
                </div>
                <div className="field" style={{marginBottom:0}}>
                  <label>Tanggal *</label>
                  <input className="input" type="date" value={tgl} disabled={isView || noBuktiLocked} onChange={e => setTgl(e.target.value)} />
                </div>
                <div className="field" style={{marginBottom:0}}>
                  <label>No. SO</label>
                  <input className="input" style={{cursor: (isView || noBuktiLocked) ? 'default' : 'pointer', background:'var(--bg-elev)'}}
                    readOnly placeholder="— Pilih Sales Order —" value={noSo}
                    onClick={() => { if (!isView && !noBuktiLocked) setSoPicker(true); }} />
                </div>
              </div>
              <div style={{display:'grid', gridTemplateColumns:'180px 160px 1fr', gap:12}}>
                <div className="field" style={{marginBottom:0}}>
                  <label>Tgl. Kirim</label>
                  <input className="input" type="date" value={tglKirim} disabled={isView || noBuktiLocked} onChange={e => setTglKirim(e.target.value)} />
                </div>
                <div className="field" style={{marginBottom:0}}>
                  <label>Status</label>
                  <select className="select" value={status} disabled={isView || isBatal || noBuktiLocked} onChange={e => setStatus(e.target.value)}>
                    {MF_STATUS_SPK.filter(s => s !== 'Batal').map(s => <option key={s}>{s}</option>)}
                    {isBatal && <option>Batal</option>}
                  </select>
                </div>
                <div className="field" style={{marginBottom:0}}>
                  <label>Stempel</label>
                  <select className="select" value={stempel} disabled={isView || noBuktiLocked} onChange={e => setStempel(e.target.value)}>
                    <option value="">— Pilih —</option>
                    {MF_STEMPEL_LIST.map(v => <option key={v}>{v}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* ── Approval bar (edit mode only) ──────────────── */}
            {data && <div style={{
              background:'var(--bg-sub)',
              marginLeft:-24, marginRight:-24,
              padding:'10px 24px',
              borderBottom:'1px solid var(--border)',
              display:'flex', alignItems:'center', gap:24, flexWrap:'wrap',
            }}>
              <div style={{display:'flex', alignItems:'center', gap:10}}>
                <div style={{
                  width:28, height:28, borderRadius:'50%', flexShrink:0,
                  background:'var(--primary)', display:'flex', alignItems:'center',
                  justifyContent:'center', fontSize:12, color:'#fff', fontWeight:700,
                }}>✓</div>
                <div>
                  <div style={{fontSize:10.5, fontWeight:700, textTransform:'uppercase',
                    letterSpacing:'.06em', color:'var(--text-3)', lineHeight:1}}>Dibuat Oleh</div>
                  <div style={{fontSize:13, fontWeight:600, color:'var(--text)'}}>{dibuatOleh}</div>
                  <div style={{fontSize:11.5, color:'var(--text-3)'}}>{dibuatTgl}</div>
                </div>
              </div>

              {isApproved ? (
                <>
                  <div style={{width:40, height:2, background:'var(--primary)', flexShrink:0}} />
                  <div style={{display:'flex', alignItems:'center', gap:10}}>
                    <div style={{
                      width:28, height:28, borderRadius:'50%', flexShrink:0,
                      background:'#22c55e', display:'flex', alignItems:'center',
                      justifyContent:'center', fontSize:12, color:'#fff', fontWeight:700,
                    }}>✓</div>
                    <div>
                      <div style={{fontSize:10.5, fontWeight:700, textTransform:'uppercase',
                        letterSpacing:'.06em', color:'var(--text-3)', lineHeight:1}}>Disetujui Oleh</div>
                      <div style={{fontSize:13, fontWeight:600, color:'var(--text)'}}>{disetujuiOleh}</div>
                      <div style={{fontSize:11.5, color:'var(--text-3)'}}>{disetujuiTgl}</div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div style={{width:40, height:2, background:'var(--border)', flexShrink:0}} />
                  {!isView && (
                    <button className="btn btn-primary btn-sm" onClick={handleApprove}
                      style={{whiteSpace:'nowrap'}}>
                      {I.check()} Setujui Surat Perintah Kerja
                    </button>
                  )}
                </>
              )}
            </div>}

            {/* ── Sticky tab bar ─────────────────────────────── */}
            <div style={{
              position:'sticky', top:0, zIndex:10,
              background:'var(--bg-elev)',
              borderBottom:'1px solid var(--border)',
              marginLeft:-24, marginRight:-24, paddingLeft:24, paddingRight:24,
              paddingTop:14,
            }}>
              <div className="tabs-pills" style={{marginBottom:0, borderBottom:0}}>
                <button className={activeTab === 'bj'    ? 'active' : ''} onClick={() => scrollTo('bj',    bjRef)}>Barang Jadi</button>
                <button className={activeTab === 'bahan' ? 'active' : ''} onClick={() => scrollTo('bahan', bahanRef)}>Bahan</button>
              </div>
            </div>

            {/* ── Content ────────────────────────────────────── */}
            <div style={{paddingTop:20, display:'flex', flexDirection:'column', gap:28}}>

              {/* Section: Barang Jadi */}
              <div ref={bjRef} className="inline-table">
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8}}>
                  <h3 style={{margin:0, fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'.07em', color:'var(--text-3)'}}>Barang Jadi</h3>
                  {!isView && (
                    <button className="btn btn-primary btn-sm" onClick={() => setBjModal('add')}>{I.plus()} Tambah Barang</button>
                  )}
                </div>
                <div className="line-items" style={{overflowX:'auto'}}>
                  <table style={{width:'100%', borderCollapse:'separate', borderSpacing:0, minWidth:900}}>
                    <thead>
                      <tr>
                        <th style={thS('20%')}>Nama Barang</th>
                        <th style={thS('13%')}>Kode Brg.</th>
                        <th style={thS('7%', true)}>Qty SPK</th>
                        <th style={thS('4%', true)}>Sat</th>
                        <th style={thS('12%')}>Kelompok Warna</th>
                        <th style={thS('5%')}>AZ</th>
                        <th style={thS('10%')}>Brand</th>
                        <th style={thS('10%')}>Merk Barang</th>
                        <th style={thS('14%')}>Mesin</th>
                        <th style={thS('52px', true)}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {bjLines.length === 0 && (
                        <tr><td colSpan={10} style={{padding:'32px 12px', textAlign:'center', color:'var(--text-3)', fontSize:13}}>
                          Belum ada barang jadi. Klik "+ Tambah Barang" untuk menambahkan.
                        </td></tr>
                      )}
                      {bjLines.map((row, idx) => (
                        <tr key={row.id} className={`${row._deleted ? 'row-deleted' : ''} ${row._added ? 'row-added' : ''}`} title={row._deleted ? 'Barang ini akan dihapus' : ''}>
                          <td style={tdS}>{row.namaBarang || <span style={{color:'var(--text-3)'}}>—</span>}</td>
                          <td style={tdS}><span style={{color:'var(--primary)', fontWeight:500}}>{row.kodeBarang}</span></td>
                          <td style={{...tdS, textAlign:'right'}} className="mono">{row.qtySPK}</td>
                          <td style={{...tdS, textAlign:'center'}}>{row.satuan}</td>
                          <td style={tdS}>{row.namaKelompokWarna || '—'}</td>
                          <td style={tdS}>{row.namaAz || '—'}</td>
                          <td style={tdS}>{row.namaBrand || '—'}</td>
                          <td style={tdS}>{row.namaMerkBarang || '—'}</td>
                          <td style={tdS}>
                            <div style={{display:'flex', flexWrap:'wrap', gap:3}}>
                              {(row.mesinDipilih || []).slice(0,3).map(m => (
                                <span key={m} style={{
                                  display:'inline-block', padding:'1px 6px', borderRadius:4,
                                  background:'var(--bg-sub)', fontSize:11, fontWeight:500,
                                }}>{m}</span>
                              ))}
                              {(row.mesinDipilih || []).length > 3 && (
                                <span style={{fontSize:11, color:'var(--text-3)'}}>+{row.mesinDipilih.length - 3}</span>
                              )}
                            </div>
                          </td>
                          <td style={{...tdS, textAlign:'center'}}>
                            {!isView && (
                              <div className="row-actions" style={{justifyContent:'center'}}>
                                {row._deleted ? (
                                  <button className="btn btn-icon btn-sm" style={{color:'var(--realisasi)'}} title="Restore"
                                    onClick={() => restoreBj(idx)}>{I.refresh(14)}</button>
                                ) : (
                                  <>
                                    <button className="btn btn-icon btn-sm" title="Edit"
                                      onClick={() => setBjModal({idx, data: row})}>{I.edit()}</button>
                                    <button className="btn btn-icon btn-sm del" title="Hapus"
                                      onClick={() => softDeleteBj(idx)}>{I.trash()}</button>
                                  </>
                                )}
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section: Bahan */}
              <div ref={bahanRef} className="inline-table">
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8}}>
                  <h3 style={{margin:0, fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'.07em', color:'var(--text-3)'}}>Bahan</h3>
                  {!isView && (
                    <button className="btn btn-primary btn-sm" onClick={() => setBahanPicker(true)}>{I.plus()} Tambah Bahan</button>
                  )}
                </div>
                <div className="line-items" style={{overflowX:'auto'}}>
                  <table style={{width:'100%', borderCollapse:'separate', borderSpacing:0, minWidth:700}}>
                    <thead>
                      <tr>
                        <th style={thS('36px', true)}>No</th>
                        <th style={thS('18%')}>Gd. Bahan</th>
                        <th style={thS('22%')}>Kode Bahan</th>
                        <th style={thS('16%')}>Merk Bahan</th>
                        <th style={thS('10%', true)}>Jumlah SPK</th>
                        <th style={thS('9%', true)}>Satuan</th>
                        <th style={thS('50px', true)}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {bahanLines.length === 0 && (
                        <tr><td colSpan={7} style={{padding:'32px 12px', textAlign:'center', color:'var(--text-3)', fontSize:13}}>
                          Belum ada bahan. Klik "+ Tambah Bahan" untuk menambahkan.
                        </td></tr>
                      )}
                      {bahanLines.map((row, idx) => (
                        <tr key={row.id} className={`${row._deleted ? 'row-deleted' : ''} ${row._added ? 'row-added' : ''}`} title={row._deleted ? 'Bahan ini akan dihapus' : ''}>
                          <td style={{...tdS, textAlign:'center', color:'var(--text-3)', fontSize:12}}>{idx + 1}</td>
                          <td style={tdS}>
                            <select className="select" style={{width:'100%', fontSize:12, padding:'3px 6px'}} disabled={isView || row._deleted}
                              value={row.gudang} onChange={e => updateBahan(idx, 'gudang', e.target.value)}>
                              <option value="">— Pilih —</option>
                              {MF_GUDANG_LIST.map(g => <option key={g}>{g}</option>)}
                            </select>
                          </td>
                          <td style={tdS}><span style={{color:'var(--primary)', fontWeight:500}}>{row.kodeBahan}</span></td>
                          <td style={tdS}>{row.merkBahan || <span style={{color:'var(--text-3)'}}>—</span>}</td>
                          <td style={tdS}>
                            <input className="input" type="number" min="0" step="0.01" disabled={isView || row._deleted}
                              style={{width:'100%', fontSize:12, padding:'3px 6px', textAlign:'right'}}
                              placeholder="0.00" value={row.jumlah}
                              onChange={e => updateBahan(idx, 'jumlah', e.target.value)} />
                          </td>
                          <td style={tdS}>
                            <select className="select" style={{width:'100%', fontSize:12, padding:'3px 6px'}} disabled={isView || row._deleted}
                              value={row.satuan} onChange={e => updateBahan(idx, 'satuan', e.target.value)}>
                              {MF_SATUAN_SPK.map(s => <option key={s}>{s}</option>)}
                            </select>
                          </td>
                          <td style={{...tdS, textAlign:'center'}}>
                            {!isView && (
                              <div className="row-actions" style={{justifyContent:'center'}}>
                                {row._deleted ? (
                                  <button className="btn btn-icon btn-sm" style={{color:'var(--realisasi)'}} title="Restore"
                                    onClick={() => restoreBahan(idx)}>{I.refresh(14)}</button>
                                ) : (
                                  <button className="btn btn-icon btn-sm del" title="Hapus"
                                    onClick={() => softDeleteBahan(idx)}>{I.trash()}</button>
                                )}
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>

          <div className="modal-foot">
            <div className="muted"><kbd>Esc</kbd> Untuk Batal</div>
            <div style={{display:'flex', gap:8}}>
              <button className="btn" onClick={onClose}>Tutup</button>
              {isView ? (
                <>
                  {!isBatal && onCancelDoc && (
                    <button className="btn btn-danger-outline" onClick={() => onCancelDoc(data)}>{I.fileX(14)} Batalkan SPK</button>
                  )}
                  {!isBatal && <button className="btn btn-primary" onClick={() => setMode('EDIT')}>{I.edit()} Edit</button>}
                </>
              ) : (
                <button className="btn btn-primary" onClick={handleSave}>{I.check()} Simpan</button>
              )}
            </div>
          </div>
        </div>
      </div>

      {bjModal && (
        <MfBarangJadiEntryModal
          data={bjModal === 'add' ? null : bjModal.data}
          onClose={() => setBjModal(null)}
          onSave={(entry) => {
            if (bjModal === 'add') setBjLines(ls => [...ls, {...entry, id: Date.now(), _added:true}]);
            else setBjLines(ls => ls.map((l, i) => i === bjModal.idx ? {...entry, id: l.id, _added: l._added} : l));
            setBjModal(null);
          }}
        />
      )}
      {bahanPicker && (
        <MfPilihBarangModal zIndex={300} onConfirm={onBahanPick} onCancel={() => setBahanPicker(false)} />
      )}
      {soPicker && (
        <MfSoPickerModal
          onCancel={() => setSoPicker(false)}
          onConfirm={(so) => { setNoSo(so.No_Bukti); setSoPicker(false); }}
        />
      )}
    </>
  );
}

// ─── SPK Entry Modal (referensi SPK dipakai di Hasil Produksi) ────────────────

function MfSpkEntryModal({ data, onClose, onSave }) {
  const [noSpk,       setNoSpk]       = React.useState(data?.noSpk       || '');
  const [sisaStok,    setSisaStok]    = React.useState(data?.sisaStok    || '0.00');
  // Bahan, Gudang, Merk SPK — pasangan kode+nama, auto-terisi dari data SPK yang dipilih
  // (pola sama seperti Kode_X/Nama_X di Penjualan), bukan diketik manual lagi.
  const [kodeBahan,     setKodeBahan]     = React.useState(data?.kodeBahan     || '');
  const [namaBahan,     setNamaBahan]     = React.useState(data?.namaBahan     || '');
  const [kodeGudang,    setKodeGudang]    = React.useState(data?.kodeGudang    || '');
  const [gudang,        setGudang]        = React.useState(data?.gudang        || '');
  const [kodeMerkSpk,   setKodeMerkSpk]   = React.useState(data?.kodeMerkSpk   || '');
  const [merkSpk,       setMerkSpk]       = React.useState(data?.merkSpk       || '');
  const [noCoil,     setNoCoil]     = React.useState(data?.noCoil     || '');
  const [pembelian,  setPembelian]  = React.useState(data?.pembelian  || '');
  const [tgl,        setTgl]        = React.useState(data?.tgl        || '2026-06-24');
  // Jumlah & Satuan sekarang auto-fill dari data SPK yang dipilih (bukan diketik manual).
  const [jumlah,     setJumlah]     = React.useState(data?.jumlah     || '');
  const [satuanJ,    setSatuanJ]    = React.useState(data?.satuanJ    || 'MTR');
  const [kondisi,    setKondisi]    = React.useState(data?.kondisi    || 'Normal');
  const [lapisanPu,  setLapisanPu]  = React.useState(data?.lapisanPu || 'Atas');

  const [showSpkPicker,  setShowSpkPicker]  = React.useState(false);
  const [showCoilPicker, setShowCoilPicker] = React.useState(false);

  React.useEffect(() => {
    const h = e => { if (e.key === 'Escape' && !showSpkPicker && !showCoilPicker) onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [showSpkPicker, showCoilPicker, onClose]);

  const onSpkPick = (spk) => {
    setNoSpk(spk.no);
    const bahan = MF_BARANG.find(b => b.code === spk.kodeBahan);
    setKodeBahan(spk.kodeBahan || '');
    setNamaBahan(bahan ? bahan.nama : '');
    const gudangEntry = GUDANG_DATA.find(g => g.nama === spk.gudang);
    setGudang(spk.gudang || '');
    setKodeGudang(gudangEntry ? gudangEntry.kode : '');
    const firstBj = (spk.bjLines || [])[0];
    setMerkSpk(firstBj?.namaMerkBarang || spk.produk || '');
    setKodeMerkSpk(firstBj?.merkBarang || '');
    setSisaStok(String(spk.qty || '0.00'));
    setJumlah(firstBj?.qtySPK ?? spk.qty ?? '');
    setSatuanJ(firstBj?.satuan || 'MTR');
    setShowSpkPicker(false);
  };

  const onCoilPick = (coil) => {
    setNoCoil(coil.no);
    if (!sisaStok || sisaStok === '0.00') setSisaStok(String(coil.sisa));
    setShowCoilPicker(false);
  };

  const handleSave = () => {
    onSave({ noSpk, sisaStok, kodeBahan, namaBahan, gudang, kodeGudang, merkSpk, kodeMerkSpk, noCoil, pembelian, tgl, jumlah, satuanJ, kondisi, lapisanPu });
  };

  return (
    <>
      <div className="modal-backdrop" style={{zIndex:200}} onClick={onClose}>
        <div className="modal" style={{maxWidth:860}} onClick={e => e.stopPropagation()}>
          <div className="modal-head">
            <div>
              <h2>{data ? 'Edit SPK' : 'Tambah SPK'}</h2>
              <div className="sub">Pilih SPK — field lain otomatis terisi sesuai data SPK tsb.</div>
            </div>
            <button className="btn btn-icon" onClick={onClose}>{I.x(16)}</button>
          </div>

          <div className="modal-body">
            <div style={{display:'grid', gridTemplateColumns:'repeat(3, minmax(0,1fr))', gap:12}}>

              {/* No. SPK — field klik-untuk-pilih, gaya sama seperti Nama Customer/No. SO di SO/SPK */}
              <div className="field" style={{gridColumn:'span 2'}}>
                <label>No. SPK *</label>
                <input className="input" style={{cursor:'pointer', background:'var(--bg-elev)'}} readOnly
                  placeholder="— Pilih SPK —" value={noSpk}
                  onClick={() => setShowSpkPicker(true)} />
              </div>
              <div className="field">
                <label>Sisa Stock Sebelumnya</label>
                <input className="input" value={sisaStok} readOnly style={{textAlign:'right'}} />
              </div>

              {/* Bahan (kode+nama, auto) */}
              <div className="field" style={{gridColumn:'span 2'}}>
                <label>Nama Bahan</label>
                <input className="input" value={namaBahan} readOnly placeholder="Otomatis dari SPK" />
              </div>
              <div className="field">
                <label>Kode Bahan</label>
                <input className="input mono" value={kodeBahan} readOnly placeholder="Otomatis" />
              </div>

              {/* Gudang (kode+nama, auto) */}
              <div className="field" style={{gridColumn:'span 2'}}>
                <label>Nama Gudang</label>
                <input className="input" value={gudang} readOnly placeholder="Otomatis dari SPK" />
              </div>
              <div className="field">
                <label>Kode Gudang</label>
                <input className="input mono" value={kodeGudang} readOnly placeholder="Otomatis" />
              </div>

              {/* Merk SPK (kode+nama, auto) */}
              <div className="field" style={{gridColumn:'span 2'}}>
                <label>Nama Merk SPK</label>
                <input className="input" value={merkSpk} readOnly placeholder="Otomatis dari SPK" />
              </div>
              <div className="field">
                <label>Kode Merk SPK</label>
                <input className="input mono" value={kodeMerkSpk} readOnly placeholder="Otomatis" />
              </div>

              {/* No. COIL — klik-untuk-pilih, hanya 1 (single) */}
              <div className="field" style={{gridColumn:'span 2'}}>
                <label>No. COIL</label>
                <input className="input mono" style={{cursor:'pointer', background:'var(--bg-elev)'}} readOnly
                  placeholder="— Pilih Coil —" value={noCoil}
                  onClick={() => setShowCoilPicker(true)} />
              </div>
              <div className="field">
                <label>Pembelian</label>
                <input className="input" placeholder="No. Pembelian…" value={pembelian} onChange={e => setPembelian(e.target.value)} />
              </div>

              <div className="field">
                <label>Tgl</label>
                <input className="input" type="date" value={tgl} onChange={e => setTgl(e.target.value)} />
              </div>
              <div className="field">
                <label>Jumlah</label>
                <input className="input" value={jumlah} readOnly style={{textAlign:'right'}} placeholder="Otomatis dari SPK" />
              </div>
              <div className="field">
                <label>Satuan</label>
                <input className="input" value={satuanJ} readOnly placeholder="Otomatis dari SPK" />
              </div>

              <div className="field">
                <label>Kondisi COIL</label>
                <select className="select" value={kondisi} onChange={e => setKondisi(e.target.value)}>
                  <option>Normal</option>
                  <option>Termasuk Tong Coil</option>
                  <option>Sisa Slitting PU</option>
                  <option>Tong Coil &amp; Sisa Slitting PU</option>
                </select>
              </div>
              <div className="field" style={{gridColumn:'span 2'}}>
                <label>Lapisan PU</label>
                <div style={{display:'flex', gap:8, height:32, alignItems:'center'}}>
                  {['Atas','Bawah'].map(v => (
                    <label key={v} style={{
                      display:'inline-flex', alignItems:'center', gap:6,
                      cursor:'pointer', fontWeight:500, fontSize:13,
                      padding:'4px 12px', borderRadius:6,
                      background: lapisanPu === v ? 'var(--primary)' : 'var(--bg-sub)',
                      color: lapisanPu === v ? '#fff' : 'var(--text)',
                      transition:'background .12s, color .12s',
                    }}>
                      <input type="radio" name="lpSPK" value={v}
                        checked={lapisanPu === v} onChange={() => setLapisanPu(v)}
                        style={{display:'none'}} />
                      {v}
                    </label>
                  ))}
                </div>
              </div>

            </div>
          </div>

          <div className="modal-foot">
            <div className="muted"><kbd>Esc</kbd> Untuk Batal</div>
            <div style={{display:'flex', gap:8}}>
              <button className="btn" onClick={onClose}>Tutup</button>
              <button className="btn btn-primary" onClick={handleSave}>{I.check()} Simpan</button>
            </div>
          </div>
        </div>
      </div>

      {showSpkPicker  && <MfSpkPickerModal  onPick={onSpkPick}  onClose={() => setShowSpkPicker(false)}  />}
      {showCoilPicker && <MfCoilPickerModal onPick={onCoilPick} onClose={() => setShowCoilPicker(false)} />}
    </>
  );
}
