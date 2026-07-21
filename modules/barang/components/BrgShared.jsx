// Barang — komponen & helper bersama dipakai lintas sub-modul (Barang Lain, Bahan Baku, Barang
// Jadi, Mutasi/Penyesuaian/Opname). Dipindah dari root barang.jsx, tidak diubah.

function BrgHeader({ title, sub, onAdd, addLabel='Tambah', extra }) {
  return (
    <div className="page-head">
      <div><h1>{title}</h1><div className="sub">{sub}</div></div>
      <div style={{display:'flex', gap:8}}>
        <button className="btn btn-sm">{I.refresh()} Refresh</button>
        <button className="btn btn-sm">{I.download()} Export</button>
        {extra}
        {onAdd && <button className="btn btn-primary" onClick={onAdd}>{I.plus()} {addLabel}</button>}
      </div>
    </div>
  );
}

function BrgModalShell({ title, sub, onClose, onSave, children, saveLabel='Simpan', wide=false, footerExtra }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()} style={wide ? {maxWidth:1100, maxHeight:'92vh'} : {maxWidth:700}}>
        <div className="modal-head">
          <div><h2>{title}</h2>{sub && <div className="sub">{sub}</div>}</div>
          <button className="btn btn-icon" onClick={onClose}>{I.x(16)}</button>
        </div>
        <div className="modal-body" style={wide ? {overflowY:'auto', maxHeight:'calc(92vh - 180px)'} : {}}>{children}</div>
        <div className="modal-foot">
          <div className="muted" style={{fontSize:12.5}}><kbd>Esc</kbd> untuk batal</div>
          <div className="right" style={{display:'flex', gap:8}}>
            {footerExtra}
            <button className="btn" onClick={onClose}>Batal</button>
            <button className="btn btn-primary" onClick={onSave}>{I.check()} {saveLabel}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BrgInlineTable({ title, columns, rows, setRows, addLabel, shortcut }) {
  const update = (idx, key, value) => { const next = [...rows]; next[idx] = { ...next[idx], [key]: value }; setRows(next); };
  const remove = (idx) => setRows(rows.filter((_, i) => i !== idx));
  const add = () => setRows([...rows, Object.fromEntries(columns.map(c => [c.key, c.type === 'number' ? 0 : (c.default ?? '')]))]);
  // Kolom type:'select' render <select> (options array atau function), kolom lain tetap <input> seperti sebelumnya.
  const renderCell = (c, r, idx) => {
    if (c.type === 'select') {
      const opts = typeof c.options === 'function' ? c.options() : (c.options || []);
      return (
        <select className="cell" value={r[c.key]} onChange={e => update(idx, c.key, e.target.value)}>
          <option value="">— Pilih —</option>
          {opts.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      );
    }
    return (
      <input className={`cell ${c.num ? 'num mono' : c.mono ? 'mono' : ''}`} type={c.type || 'text'} placeholder={c.placeholder || ''}
        value={r[c.key]} onChange={e => update(idx, c.key, c.type === 'number' ? +e.target.value : e.target.value)} />
    );
  };
  return (
    <div className="inline-table">
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8}}>
        <h3 style={{margin:0}}>{title}</h3>
        <button className="btn btn-primary btn-sm" onClick={add}>{I.plus()} {addLabel}</button>
      </div>
      {shortcut && <div style={{textAlign:'right', fontSize:12, color:'var(--text-3)', marginBottom:8}}>Tambah: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>{shortcut}</kbd></div>}
      <div className="line-items" style={{height:200, overflowY:'auto', overflowX:'auto'}}>
        <table>
          <thead><tr>{columns.map(c => <th key={c.key} style={c.width ? {width:c.width} : {}}>{c.label}</th>)}<th style={{width:40}}></th></tr></thead>
          <tbody>
            {rows.length === 0 && <tr><td colSpan={columns.length + 1} className="empty">Belum ada data.</td></tr>}
            {rows.map((r, idx) => (
              <tr key={idx}>
                {columns.map(c => (
                  <td key={c.key}>{renderCell(c, r, idx)}</td>
                ))}
                <td><button className="btn btn-icon btn-sm del" onClick={() => remove(idx)}>{I.trash()}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function brgAktifPill(aktif) { return <span className={`pill ${aktif ? 'approved' : 'cancelled'}`}>{aktif ? 'Aktif' : 'Non-aktif'}</span>; }
function brgBatalPill(batal) { return <span className={`pill ${batal ? 'cancelled' : 'approved'}`}>{batal ? 'BATAL' : 'AKTIF'}</span>; }
function brgKategoriNama(kode) { return BRG_KATEGORI_OPTS.find(k => k.kode === kode)?.nama || kode; }
function brgGudangNama(kode) { return BRG_GUDANG_OPTS.find(g => g.kode === kode)?.nama || kode; }
