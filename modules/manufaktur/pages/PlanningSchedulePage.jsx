// Manufaktur — Planning Schedule Produksi Harian.
// Dipindah dari manufaktur.jsx, identifier diprefix Mf/MF_.
//
// State-lifting fix: antrian planning/outstanding sudah berupa state di komponen asli
// (bukan bug seperti SPK/HP/BPBL/RPBL), tapi state-nya lokal ke komponen ini sehingga hilang
// saat berpindah sub-modul. Di sini state diangkat ke MfManufakturPage lewat props rows/setRows,
// mengikuti pola yang sama dipakai 4 sub-modul lain.

function MfPlanningScheduleList({ rows, setRows }) {
  const showToast = (msg) => { window.__erpToast && window.__erpToast(msg); };

  const [selectedMesin,  setSelectedMesin]  = React.useState(null);
  const [tgl,            setTgl]            = React.useState('2026-06-24');
  const [jamMulai,       setJamMulai]       = React.useState('08:30');
  const [jamSelesai,     setJamSelesai]     = React.useState('17:00');
  const [selPlanning,    setSelPlanning]    = React.useState(new Set());
  const [selOutstanding, setSelOutstanding] = React.useState(new Set());
  const [showSpkPicker,  setShowSpkPicker]  = React.useState(false);

  const items = rows;
  const setItems = setRows;

  const planningItems    = items.filter(r => r.mesin === selectedMesin && r.status === 'planning');
  const outstandingItems = items.filter(r => r.mesin === selectedMesin && r.status === 'outstanding');

  const updateStatus = (ids, newStatus) =>
    setItems(ls => ls.map(r => ids.has(r.id) ? {...r, status: newStatus} : r));

  const handleMulaiProduksi = () => {
    updateStatus(selPlanning, 'outstanding');
    setSelPlanning(new Set());
    showToast(`${selPlanning.size} SPK dipindahkan ke outstanding.`);
  };
  const handleSelesaikanProduksi = () => {
    updateStatus(selOutstanding, 'selesai');
    setSelOutstanding(new Set());
    showToast(`${selOutstanding.size} SPK diselesaikan.`);
  };
  const handleBatalkanPlanning = () => {
    updateStatus(selPlanning, 'batal');
    setSelPlanning(new Set());
    showToast(`${selPlanning.size} planning dibatalkan.`);
  };
  const handleBatalkanProduksi = () => {
    updateStatus(selOutstanding, 'batal');
    setSelOutstanding(new Set());
    showToast(`${selOutstanding.size} produksi dibatalkan.`);
  };

  const toggleSel = (set, setFn, id) =>
    setFn(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });
  const toggleAllPlanning = (checked) =>
    setSelPlanning(checked ? new Set(planningItems.map(r => r.id)) : new Set());
  const toggleAllOutstanding = (checked) =>
    setSelOutstanding(checked ? new Set(outstandingItems.map(r => r.id)) : new Set());

  const mesinStyle = (active) => ({
    display:'block', width:'100%', textAlign:'left',
    padding:'8px 14px', fontSize:13, border:'none', outline:'none',
    background: active ? 'var(--primary-soft, #e8f0fe)' : 'transparent',
    color: active ? 'var(--primary)' : 'var(--text)',
    fontWeight: active ? 600 : 400,
    borderLeft: active ? '3px solid var(--primary)' : '3px solid transparent',
    cursor:'pointer', borderBottom:'1px solid var(--border)',
  });

  const thS = (w, center) => ({
    padding:'8px 8px', background:'var(--primary)', color:'#fff',
    fontWeight:500, fontSize:'11.5px', letterSpacing:'.04em', textTransform:'uppercase',
    textAlign: center ? 'center' : 'left', width: w || undefined,
  });
  const tdS = { padding:'6px 8px', borderBottom:'1px solid var(--border)', verticalAlign:'middle' };

  const emptyRow = (cols, msg) => (
    <tr><td colSpan={cols} style={{textAlign:'center', padding:'28px 8px', color:'var(--text-3)', fontSize:13}}>
      {msg}
    </td></tr>
  );

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Planning Schedule Produksi Harian</h1>
          <div className="sub">Kelola antrian dan jadwal produksi per mesin</div>
        </div>
      </div>

      <div style={{display:'flex', gap:16, alignItems:'flex-start'}}>

        {/* ── Left: Machine sidebar ── */}
        <div style={{width:220, flexShrink:0, position:'sticky', top:0}}>
          <div className="table-card">
            <div className="table-toolbar" style={{minHeight:42}}>
              <div className="table-toolbar-left" style={{fontWeight:600, fontSize:12.5, letterSpacing:'.04em', textTransform:'uppercase'}}>
                Nama Mesin
              </div>
            </div>
            <div style={{maxHeight:520, overflowY:'auto'}}>
              {MF_MESIN_LIST.map(m => {
                const nPlanning    = items.filter(r => r.mesin === m && r.status === 'planning').length;
                const nOutstanding = items.filter(r => r.mesin === m && r.status === 'outstanding').length;
                return (
                  <button key={m} style={mesinStyle(selectedMesin === m)}
                    onClick={() => { setSelectedMesin(m); setSelPlanning(new Set()); setSelOutstanding(new Set()); }}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:4}}>
                      <span style={{flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{m}</span>
                      <div style={{display:'flex', gap:3, flexShrink:0}}>
                        {nPlanning    > 0 && <span style={{fontSize:10, padding:'1px 5px', borderRadius:10, background:'var(--primary)', color:'#fff'}}>{nPlanning}</span>}
                        {nOutstanding > 0 && <span style={{fontSize:10, padding:'1px 5px', borderRadius:10, background:'#f59e0b', color:'#fff'}}>{nOutstanding}</span>}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Right: Content ── */}
        <div style={{flex:1, minWidth:0}}>

          {/* Action bar */}
          <div className="filter-bar">
            <div className="filter-grid" style={{gridTemplateColumns:'160px 120px 16px 120px auto'}}>
              <div className="field">
                <label>Tanggal</label>
                <input className="input" type="date" value={tgl} onChange={e => setTgl(e.target.value)} />
              </div>
              <div className="field">
                <label>Jam Mulai</label>
                <input className="input" type="time" value={jamMulai} onChange={e => setJamMulai(e.target.value)} />
              </div>
              <span style={{alignSelf:'flex-end', paddingBottom:9, textAlign:'center', color:'var(--text-3)', fontSize:13}}>–</span>
              <div className="field">
                <label>Jam Selesai</label>
                <input className="input" type="time" value={jamSelesai} onChange={e => setJamSelesai(e.target.value)} />
              </div>
              <div className="filter-actions">
                <button className="btn btn-primary" disabled={!selectedMesin}
                  onClick={() => setShowSpkPicker(true)}>
                  {I.plus()} Mulai Planning
                </button>
              </div>
            </div>
          </div>

          {/* Planning table */}
          <div className="table-card" style={{marginBottom:16}}>
            <div className="table-toolbar">
              <div className="table-toolbar-left">
                <span style={{fontWeight:600}}>Planning Produksi</span>
                {selectedMesin && <span style={{marginLeft:6, color:'var(--text-3)', fontWeight:400}}>— {selectedMesin}</span>}
                {selPlanning.size > 0 && (
                  <span className="pill" style={{marginLeft:8}}>{selPlanning.size} dipilih</span>
                )}
              </div>
              {selPlanning.size > 0 && (
                <div className="table-toolbar-right">
                  <button className="btn btn-primary btn-sm" onClick={handleMulaiProduksi}>
                    {I.check()} Mulai Produksi ({selPlanning.size})
                  </button>
                  <button className="btn btn-sm" style={{color:'var(--danger)', borderColor:'var(--danger)'}}
                    onClick={handleBatalkanPlanning}>
                    {I.x()} Batalkan
                  </button>
                </div>
              )}
            </div>
            <div className="table-scroll">
              <table className="data">
                <thead>
                  <tr>
                    <th style={thS('36px', true)}>
                      <input type="checkbox" className="cb"
                        checked={planningItems.length > 0 && selPlanning.size === planningItems.length}
                        onChange={e => toggleAllPlanning(e.target.checked)} />
                    </th>
                    <th style={thS('36px', true)}>No</th>
                    <th style={thS('18%')}>No. SPK</th>
                    <th style={thS('16%')}>Merk</th>
                    <th style={thS()}>Nama Barang</th>
                    <th style={thS('80px', true)}>Jumlah</th>
                    <th style={thS('60px', true)}>Sat</th>
                    <th style={thS('70px', true)}>Menit</th>
                    <th style={thS('90px', true)}>Jam Mulai</th>
                    <th style={thS('90px', true)}>Jam Selesai</th>
                    <th style={thS('52px', true)}></th>
                  </tr>
                </thead>
                <tbody>
                  {!selectedMesin && emptyRow(11, 'Pilih mesin di sidebar untuk melihat planning produksi.')}
                  {selectedMesin && planningItems.length === 0 && emptyRow(11, 'Tidak ada SPK dalam antrian planning untuk mesin ini.')}
                  {planningItems.map((r, idx) => (
                    <tr key={r.id} style={{background: selPlanning.has(r.id) ? 'var(--primary-soft, #f0f4ff)' : ''}}>
                      <td style={{...tdS, textAlign:'center'}}>
                        <input type="checkbox" className="cb"
                          checked={selPlanning.has(r.id)}
                          onChange={() => toggleSel(selPlanning, setSelPlanning, r.id)} />
                      </td>
                      <td style={{...tdS, textAlign:'center', color:'var(--text-3)', fontSize:12}}>{idx + 1}</td>
                      <td style={tdS}><span className="cell-link">{r.noSpk}</span></td>
                      <td style={tdS}>{r.merk}</td>
                      <td style={tdS}>{r.namaBarang}</td>
                      <td style={{...tdS, textAlign:'right'}} className="mono">{r.jumlah}</td>
                      <td style={{...tdS, textAlign:'center'}}>{r.satuan}</td>
                      <td style={{...tdS, textAlign:'right'}} className="mono">{r.menit}</td>
                      <td style={{...tdS, textAlign:'center'}} className="mono">{r.jamMulai}</td>
                      <td style={{...tdS, textAlign:'center'}} className="mono">{r.jamSelesai}</td>
                      <td style={{...tdS, textAlign:'center'}}>
                        <div className="row-actions">
                          <button className="btn btn-icon btn-sm" title="Batalkan"
                            style={{color:'var(--text-3)'}}
                            onClick={() => { updateStatus(new Set([r.id]), 'batal'); showToast('Planning dibatalkan.'); }}>
                            {I.trash()}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Outstanding table */}
          <div className="table-card">
            <div className="table-toolbar">
              <div className="table-toolbar-left">
                <span style={{fontWeight:600}}>Outstanding SPK</span>
                {selectedMesin && <span style={{marginLeft:6, color:'var(--text-3)', fontWeight:400}}>— {selectedMesin}</span>}
                {selOutstanding.size > 0 && (
                  <span className="pill" style={{marginLeft:8}}>{selOutstanding.size} dipilih</span>
                )}
              </div>
              {selOutstanding.size > 0 && (
                <div className="table-toolbar-right">
                  <button className="btn btn-primary btn-sm" onClick={handleSelesaikanProduksi}>
                    {I.check()} Selesaikan Produksi ({selOutstanding.size})
                  </button>
                  <button className="btn btn-sm" style={{color:'var(--danger)', borderColor:'var(--danger)'}}
                    onClick={handleBatalkanProduksi}>
                    {I.x()} Batalkan
                  </button>
                </div>
              )}
            </div>
            <div className="table-scroll">
              <table className="data">
                <thead>
                  <tr>
                    <th style={thS('36px', true)}>
                      <input type="checkbox" className="cb"
                        checked={outstandingItems.length > 0 && selOutstanding.size === outstandingItems.length}
                        onChange={e => toggleAllOutstanding(e.target.checked)} />
                    </th>
                    <th style={thS('36px', true)}>No</th>
                    <th style={thS('18%')}>No. SPK</th>
                    <th style={thS('16%')}>Merk</th>
                    <th style={thS()}>Nama Barang</th>
                    <th style={thS('80px', true)}>Jumlah</th>
                    <th style={thS('60px', true)}>Sat</th>
                    <th style={thS('70px', true)}>Menit</th>
                    <th style={thS('90px', true)}>Jam Mulai</th>
                    <th style={thS('90px', true)}>Jam Selesai</th>
                    <th style={thS('52px', true)}></th>
                  </tr>
                </thead>
                <tbody>
                  {!selectedMesin && emptyRow(11, 'Pilih mesin di sidebar untuk melihat outstanding produksi.')}
                  {selectedMesin && outstandingItems.length === 0 && emptyRow(11, 'Tidak ada SPK dalam outstanding untuk mesin ini.')}
                  {outstandingItems.map((r, idx) => (
                    <tr key={r.id} style={{background: selOutstanding.has(r.id) ? 'var(--primary-soft, #f0f4ff)' : ''}}>
                      <td style={{...tdS, textAlign:'center'}}>
                        <input type="checkbox" className="cb"
                          checked={selOutstanding.has(r.id)}
                          onChange={() => toggleSel(selOutstanding, setSelOutstanding, r.id)} />
                      </td>
                      <td style={{...tdS, textAlign:'center', color:'var(--text-3)', fontSize:12}}>{idx + 1}</td>
                      <td style={tdS}><span className="cell-link">{r.noSpk}</span></td>
                      <td style={tdS}>{r.merk}</td>
                      <td style={tdS}>{r.namaBarang}</td>
                      <td style={{...tdS, textAlign:'right'}} className="mono">{r.jumlah}</td>
                      <td style={{...tdS, textAlign:'center'}}>{r.satuan}</td>
                      <td style={{...tdS, textAlign:'right'}} className="mono">{r.menit}</td>
                      <td style={{...tdS, textAlign:'center'}} className="mono">{r.jamMulai}</td>
                      <td style={{...tdS, textAlign:'center'}} className="mono">{r.jamSelesai}</td>
                      <td style={{...tdS, textAlign:'center'}}>
                        <div className="row-actions">
                          <button className="btn btn-icon btn-sm" title="Batalkan"
                            style={{color:'var(--text-3)'}}
                            onClick={() => { updateStatus(new Set([r.id]), 'batal'); showToast('Produksi dibatalkan.'); }}>
                            {I.trash()}
                          </button>
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

      {showSpkPicker && (
        <MfSpkPickerModal
          onPick={(spk) => {
            setItems(ls => [...ls, {
              id: 'PL-' + Date.now(),
              mesin: selectedMesin, tgl, jamMulai, jamSelesai,
              noSpk: spk.no, merk: spk.merkSpk, namaBarang: spk.produk,
              jumlah: spk.qty, satuan: 'LBR', menit: 60,
              status: 'planning',
            }]);
            setShowSpkPicker(false);
            showToast('SPK berhasil ditambahkan ke planning.');
          }}
          onClose={() => setShowSpkPicker(false)}
        />
      )}
    </>
  );
}
