// Manufaktur — Hasil Produksi & Pemakaian Bahan: list dan dialog (create/edit).
// Dipindah dari manufaktur.jsx, identifier diprefix Mf/MF_.
//
// State-lifting fix: MfHasilProduksiDialog tidak punya field header "No. HP" (dialog aslinya
// juga tidak menampilkannya), jadi nomor dokumen dibuat otomatis dari MF_PRODUKSI_SEED.length
// saat Simpan, sama seperti pola no-otomatis yang sudah dipakai SPK. Data dirakit dan dikirim
// ke onSave, bukan dibiarkan kosong seperti sebelumnya.

// ─── Hasil Produksi Dialog ────────────────────────────────────────────────────

function MfHasilProduksiDialog({ data, onClose, onSave }) {
  const isCreate = !data;

  // No. Bukti: gerbang F/K sama pola dengan KO/SO/DO/SPK — user ketik F atau K, field lain
  // (Tgl. Bukti, Gudang) baru bisa diisi setelah itu, nomor lengkap dibuat saat Simpan.
  const [noBuktiRaw, setNoBuktiRaw] = React.useState('');
  const [noBuktiError, setNoBuktiError] = React.useState('');
  const noBuktiRef = React.useRef(null);
  const handleNoBuktiChange = (val) => {
    const v = val.toUpperCase();
    setNoBuktiRaw(v);
    if (!v) setNoBuktiError('No. Bukti harus di isi');
    else if (!['F','K'].includes(v[0])) setNoBuktiError('Format No. Bukti salah');
    else setNoBuktiError('');
  };
  const noBuktiLocked = isCreate && (!noBuktiRaw || !['F','K'].includes(noBuktiRaw[0]));
  React.useEffect(() => { if (isCreate && noBuktiRef.current) noBuktiRef.current.focus(); }, [isCreate]);

  const [tgl,    setTgl]    = React.useState(data?.tgl    || '2026-06-24');
  const [gudang, setGudang] = React.useState(data?.gudang || '');

  const [spkLines, setSpkLines] = React.useState(data?.spkLines || []);
  const [spkModal, setSpkModal] = React.useState(null);  // null | 'add' | {idx, data}

  const modalBodyRef = React.useRef(null);

  React.useEffect(() => {
    const h = e => { if (e.key === 'Escape' && !spkModal) onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [spkModal, onClose]);

  // Soft-delete/restore — sama pola dengan tabel item Pembelian/Penjualan/SPK: baris ditandai
  // _deleted (bisa di-Restore sebelum Simpan), bukan langsung hilang.
  const softDeleteSpk = (idx) => setSpkLines(ls => ls.map((r,i) => i===idx ? {...r, _deleted:true}  : r));
  const restoreSpk    = (idx) => setSpkLines(ls => ls.map((r,i) => i===idx ? {...r, _deleted:false} : r));

  const handleSave = () => {
    const cleanSpk = spkLines.filter(r => !r._deleted).map(({_deleted, _added, ...r}) => r);
    const finalNo = isCreate
      ? (noBuktiRaw[0] || '') + 'HP' + new Date().toISOString().slice(2,4) + new Date().toISOString().slice(5,7) + String(Math.floor(Math.random()*9000)+1000)
      : data.no;
    onSave({
      no: finalNo, tgl, gudang,
      noSpk: cleanSpk[0]?.noSpk || data?.noSpk || '',
      noCoil: cleanSpk[0]?.noCoil || data?.noCoil || '',
      kondisi: cleanSpk[0]?.kondisi || data?.kondisi || '',
      spkLines: cleanSpk,
      totalBarang: cleanSpk.length,
    });
  };

  const tdS = { padding:'5px 6px', borderBottom:'1px solid var(--border)', verticalAlign:'middle' };

  return (
    <>
      <div className="modal-backdrop">
        <div className="modal" style={{maxWidth:1440}} onClick={e => e.stopPropagation()}>
          <div className="modal-head">
            <div>
              <h2>{data ? 'Edit Hasil Produksi' : 'Buat Hasil Produksi & Pemakaian Bahan'}</h2>
              <div className="sub">Pastikan semua kolom bertanda (*) terisi.</div>
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
              <div style={{display:'grid', gridTemplateColumns:'220px 160px 1fr', gap:12}}>
                <div className="field" style={{marginBottom:0}}>
                  <label>No. Bukti *</label>
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
                  <label>Tgl. Bukti *</label>
                  <input className="input" type="date" value={tgl} disabled={noBuktiLocked} onChange={e => setTgl(e.target.value)} />
                </div>
                <div className="field" style={{marginBottom:0}}>
                  <label>Gudang *</label>
                  <select className="select" value={gudang} disabled={noBuktiLocked} onChange={e => setGudang(e.target.value)}>
                    <option value="">— Pilih —</option>
                    {MF_GUDANG_LIST.map(g => <option key={g}>{g}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* ── Content ────────────────────────────────────── */}
            <div style={{paddingTop:20}}>

              <div style={{display:'flex', flexDirection:'column', gap:28}}>

                {/* Section: Daftar SPK */}
                <div className="inline-table">
                  <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8}}>
                    <h3 style={{margin:0, fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'.07em', color:'var(--text-3)'}}>Daftar SPK</h3>
                    <button className="btn btn-primary btn-sm" onClick={() => setSpkModal('add')}>{I.plus()} Tambah SPK</button>
                  </div>
                  <div className="line-items" style={{overflowX:'auto'}}>
                    <table style={{width:'100%', borderCollapse:'separate', borderSpacing:0, minWidth:900}}>
                      <thead>
                        <tr>
                          {[
                            ['No. SPK',    '16%'], ['Kode Bahan','12%'], ['Merk SPK','12%'],
                            ['Gudang','13%'], ['No. Coil','12%'], ['Kondisi', '17%'],
                            ['Jumlah','12%'], ['', '60px'],
                          ].map(([label, w]) => (
                            <th key={label||'aksi'} style={{
                              padding:'10px 10px', fontWeight:500, fontSize:'11.5px', letterSpacing:'.04em', textTransform:'uppercase',
                              width: w || undefined,
                            }}>{label}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {spkLines.length === 0 && (
                          <tr><td colSpan={8} style={{padding:'32px 12px', textAlign:'center', color:'var(--text-3)', fontSize:13}}>
                            Belum ada SPK. Klik "+ Tambah SPK" untuk menambahkan.
                          </td></tr>
                        )}
                        {spkLines.map((row, idx) => (
                          <tr key={row.id} className={`${row._deleted ? 'row-deleted' : ''} ${row._added ? 'row-added' : ''}`} title={row._deleted ? 'Baris ini akan dihapus' : ''}>
                            <td style={tdS}><span style={{color:'var(--primary)',fontWeight:500}}>{row.noSpk}</span></td>
                            <td style={tdS}>{row.kodeBahan}</td>
                            <td style={tdS}>{row.merkSpk}</td>
                            <td style={tdS}>{row.gudang}</td>
                            <td style={tdS}><span className="mono">{row.noCoil}</span></td>
                            <td style={tdS}><span style={{fontSize:11.5}}>{row.kondisi}</span></td>
                            <td style={{...tdS, textAlign:'right'}} className="mono">{row.jumlah} {row.satuanJ}</td>
                            <td style={{...tdS, textAlign:'center'}}>
                              <div className="row-actions" style={{justifyContent:'center'}}>
                                {row._deleted ? (
                                  <button className="btn btn-icon btn-sm" style={{color:'var(--realisasi)'}} title="Restore"
                                    onClick={() => restoreSpk(idx)}>{I.refresh(14)}</button>
                                ) : (
                                  <>
                                    <button className="btn btn-icon btn-sm" title="Edit"
                                      onClick={() => setSpkModal({idx, data: row})}>{I.edit()}</button>
                                    <button className="btn btn-icon btn-sm del" title="Hapus"
                                      onClick={() => softDeleteSpk(idx)}>{I.trash()}</button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
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

      {spkModal && (
        <MfSpkEntryModal
          data={spkModal === 'add' ? null : spkModal.data}
          onClose={() => setSpkModal(null)}
          onSave={(entry) => {
            if (spkModal === 'add') setSpkLines(ls => [...ls, {...entry, id: Date.now()}]);
            else setSpkLines(ls => ls.map((l, i) => i === spkModal.idx ? {...entry, id: l.id} : l));
            setSpkModal(null);
          }}
        />
      )}
    </>
  );
}

// ─── Hasil Produksi List ──────────────────────────────────────────────────────

function MfHasilProduksiList({ rows, onAdd, onEdit }) {
  const [tglDari, setTglDari] = React.useState('');
  const [tglSmp, setTglSmp]   = React.useState('');
  const [spkF, setSpkF]       = React.useState('');
  const [page, setPage]       = React.useState(1);
  const perPage = 10;

  const filtered = rows.filter(r => {
    if (spkF && !r.noSpk.toLowerCase().includes(spkF.toLowerCase())) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageRows = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Hasil Produksi &amp; Pemakaian Bahan</h1>
          <div className="sub">Daftar dokumen hasil produksi</div>
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
            <label>No. SPK</label>
            <input className="input" placeholder="SPK-2026-…" value={spkF} onChange={e => setSpkF(e.target.value)} />
          </div>
          <div className="filter-actions">
            <button className="btn btn-primary" onClick={() => setPage(1)}>{I.search(13)} Cari</button>
            <button className="btn" onClick={() => { setTglDari(''); setTglSmp(''); setSpkF(''); setPage(1); }}>Reset</button>
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
                <th>No. Bukti</th>
                <th>No. SPK</th>
                <th>Tanggal</th>
                <th>Gudang</th>
                <th className="num">Jml SPK</th>
                <th className="center" style={{width:60}}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 && (
                <tr><td colSpan={7} style={{textAlign:'center', padding:32, color:'var(--text-3)'}}>Tidak ada data</td></tr>
              )}
              {pageRows.map(r => (
                <tr key={r.no}>
                  <td><input type="checkbox" className="cb" /></td>
                  <td><span className="cell-link">{r.no}</span></td>
                  <td className="muted">{r.noSpk}</td>
                  <td>{r.tgl}</td>
                  <td>{r.gudang}</td>
                  <td className="num mono">{(r.spkLines || []).length}</td>
                  <td className="center">
                    <div className="row-actions">
                      <button className="btn btn-icon btn-sm" title="Edit" onClick={() => onEdit(r)}>{I.edit()}</button>
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
