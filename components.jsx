// Icon set + shared components

const I = {
  menu:    (s=18)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6"  x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  search:  (s=16)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><line x1="20" y1="20" x2="16.5" y2="16.5"/></svg>,
  bell:    (s=18)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6"/><path d="M10 20a2 2 0 1 0 4 0"/></svg>,
  help:    (s=18)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7v.5"/><line x1="12" y1="17" x2="12" y2="17.01"/></svg>,
  settings:(s=18)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>,
  chev:    (s=14, dir='down')=> {
    const r = {down:0, up:180, left:90, right:-90}[dir];
    return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{transform:`rotate(${r}deg)`}}><polyline points="6 9 12 15 18 9"/></svg>;
  },
  plus:    (s=14)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  x:       (s=14)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></svg>,
  edit:    (s=14)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>,
  print:   (s=14)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>,
  trash:   (s=14)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>,
  email:   (s=14)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  filter:  (s=14)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.5 10 19 14 21 14 12.5 22 3"/></svg>,
  cal:     (s=14)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  download:(s=14)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  refresh: (s=14)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>,
  more:    (s=14)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><circle cx="5"  cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg>,
  arrowL:  (s=16)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  copy:    (s=14)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
  upload:  (s=14)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  // Module / nav icons
  home:    (s=16)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-4v-7H10v7H6a2 2 0 0 1-2-2V9z" /></svg>,
  cart:    (s=16)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4A2 2 0 0 0 9.7 16h9.4a2 2 0 0 0 2-1.6L23 6H6"/></svg>,
  truck:   (s=16)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="6" width="13" height="11" rx="1"/><polyline points="14 9 18 9 22 13 22 17 14 17"/><circle cx="6" cy="20" r="2"/><circle cx="18" cy="20" r="2"/></svg>,
  box:     (s=16)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.3 7 12 12 20.7 7"/><line x1="12" y1="22" x2="12" y2="12"/></svg>,
  layers:  (s=16)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 22 8 12 14 2 8 12 2"/><polyline points="2 17 12 23 22 17"/><polyline points="2 12 12 18 22 12"/></svg>,
  invoice: (s=16)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/></svg>,
  list:    (s=16)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
  zoom:    (s=16)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><line x1="20" y1="20" x2="16.5" y2="16.5"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>,
  chart:   (s=16)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6"  y1="20" x2="6"  y2="14"/></svg>,
  bank:    (s=16)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 22 8 22 10 2 10 2 8 12 2"/><line x1="5" y1="10" x2="5" y2="20"/><line x1="9" y1="10" x2="9" y2="20"/><line x1="15" y1="10" x2="15" y2="20"/><line x1="19" y1="10" x2="19" y2="20"/><line x1="2" y1="22" x2="22" y2="22"/></svg>,
  users:   (s=16)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/></svg>,
  shield:  (s=16)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  check:   (s=14)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  arrowR:  (s=12)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  fileX:   (s=14)=> <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8.5"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="13" y2="13"/><line x1="16.5" y1="17.5" x2="21.5" y2="22.5"/><line x1="21.5" y1="17.5" x2="16.5" y2="22.5"/></svg>,
};

// PDJ logo mark — abstract geometric (no Ford)
function BrandMark({ size = 18, color = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M6 8 L14 8 L20 16 L14 24 L6 24 L12 16 Z" fill={color} opacity=".95" />
      <path d="M16 8 L24 8 L26 12 L20 16 L18 12 Z" fill={color} opacity=".55" />
      <path d="M20 16 L26 20 L24 24 L18 24 Z" fill={color} opacity=".75" />
    </svg>
  );
}

// ---------- Notification data ----------
const NOTIFS_DATA = [
  { id:1, type:'approval', title:'Perlu Persetujuan',    msg:'PO-2026-0631 dari CV Bengkel Sentosa menunggu approval',   time:'14:22',          read:false },
  { id:2, type:'info',     title:'Stock Opname Selesai', msg:'SO26040002 di Gudang Utama telah selesai',                 time:'13:08',          read:false },
  { id:3, type:'warning',  title:'Stok Kritis',          msg:'4 item barang berada di bawah minimum stock',             time:'11:45',          read:false },
  { id:4, type:'approval', title:'Perlu Verifikasi',     msg:'Kas Masuk KM-2026-0412 perlu verifikasi oleh manager',    time:'09:30',          read:true  },
  { id:5, type:'info',     title:'PO Direalisasi',       msg:'PO-2026-0625 dari PT Indo Ban Prima sudah 100% diterima', time:'Kemarin · 17:30',read:true  },
  { id:6, type:'warning',  title:'Jatuh Tempo',          msg:'3 hutang supplier jatuh tempo dalam 3 hari',              time:'Kemarin · 09:12',read:true  },
];

// ---------- Top bar ----------
function TopBar({ onHome, onNavigate }) {
  // Burger menu
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = React.useRef(null);
  const btnRef  = React.useRef(null);

  // User dropdown
  const [userOpen, setUserOpen] = React.useState(false);
  const userMenuRef = React.useRef(null);
  const userBtnRef  = React.useRef(null);

  // Notification dropdown
  const [notifOpen, setNotifOpen] = React.useState(false);
  const [notifs, setNotifs] = React.useState(NOTIFS_DATA);
  const notifMenuRef = React.useRef(null);
  const notifBtnRef  = React.useRef(null);
  const unreadCount = notifs.filter(n => !n.read).length;

  // Smart search
  const [q, setQ]           = React.useState('');
  const [scope, setScope]   = React.useState('');
  const [searchOpen, setSearchOpen] = React.useState(false);
  const searchRef = React.useRef(null);

  // Outside-click: burger
  React.useEffect(() => {
    if (!menuOpen) return;
    const h = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) &&
          btnRef.current  && !btnRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [menuOpen]);

  // Outside-click: user menu
  React.useEffect(() => {
    if (!userOpen) return;
    const h = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target) &&
          userBtnRef.current  && !userBtnRef.current.contains(e.target)) setUserOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [userOpen]);

  // Outside-click: notif menu
  React.useEffect(() => {
    if (!notifOpen) return;
    const h = (e) => {
      if (notifMenuRef.current && !notifMenuRef.current.contains(e.target) &&
          notifBtnRef.current  && !notifBtnRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [notifOpen]);

  // Outside-click: search
  React.useEffect(() => {
    if (!searchOpen) return;
    const h = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [searchOpen]);

  // Live search results
  const searchResults = React.useMemo(() => {
    if (q.length === 0) {
      const allMods = MODULES.filter(m => m.id !== 'home');
      return { mods: scope ? allMods.filter(m => m.id === scope) : allMods, subs: [], quick: true };
    }
    const ql = q.toLowerCase();
    const targetMods = scope ? MODULES.filter(m => m.id === scope) : MODULES;
    const mods = MODULES.filter(m => m.id !== 'home' && (!scope || m.id === scope) && m.label.toLowerCase().includes(ql));
    const subs = [];
    targetMods.forEach(m => {
      (MODULE_SUBS[m.id] || []).forEach(s => {
        if (s.label.toLowerCase().includes(ql)) {
          subs.push({ modId:m.id, subId:s.id, label:s.label, modLabel:m.label, icon:m.icon });
        }
      });
    });
    return { mods: mods.slice(0, 5), subs: subs.slice(0, 8), quick: false };
  }, [q, scope]);

  const hasResults = searchResults.mods.length > 0 || searchResults.subs.length > 0;

  const notifIcon  = t => t === 'approval' ? I.check(14)   : t === 'warning' ? I.bell(14) : I.invoice(14);
  const notifColor = t => t === 'approval' ? 'var(--realisasi)' : t === 'warning' ? 'var(--danger)' : 'var(--primary)';
  const markAllRead = () => setNotifs(prev => prev.map(n => ({...n, read:true})));

  return (
    <header className="topbar" data-screen-label="topbar">
      <div className="topbar-left" style={{position:'relative'}}>
        <button ref={btnRef} className={`menu-btn${menuOpen ? ' active' : ''}`} title="Menu" onClick={() => setMenuOpen(v => !v)}>
          {I.menu(20)}
        </button>

        {menuOpen && (
          <div className="burger-menu" ref={menuRef}>
            {MODULES.map(m => (
              <div key={m.id} className="burger-group">
                <button className="burger-module" onClick={() => { onNavigate(m.id); setMenuOpen(false); }}>
                  {m.icon(14)}<span>{m.label}</span>
                </button>
                {(MODULE_SUBS[m.id] || []).map(s => (
                  <button key={s.id} className="burger-sub" onClick={() => { onNavigate(m.id, s.id); setMenuOpen(false); }}>
                    {s.label}
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}

        <button className="brand-mark" onClick={onHome} title="PDJ ERP — Home">
          <span className="brand-mark-glyph"><BrandMark size={18} /></span>
          <span className="brand-name">PDJ ERP<small>PT. Pacific Data Jaya</small></span>
        </button>
      </div>

      {/* Smart search */}
      <div className="topbar-search" ref={searchRef} style={{position:'relative'}}>
        <select className="scope" value={scope} onChange={e => { setScope(e.target.value); setSearchOpen(true); }}>
          <option value="">Semua Modul</option>
          {MODULES.filter(m => m.id !== 'home').map(m => (
            <option key={m.id} value={m.id}>{m.label}</option>
          ))}
        </select>
        <input
          placeholder="Cari modul, sub menu…"
          value={q}
          onChange={e => { setQ(e.target.value); setSearchOpen(true); }}
          onFocus={() => setSearchOpen(true)}
        />
        <button className="search-icon" title="Search">{I.search(15)}</button>

        {searchOpen && (
          <div className="search-results">
            {!hasResults && q.length > 0 && <div className="search-no-result">Tidak ada hasil untuk "<b>{q}</b>"</div>}
            {searchResults.mods.length > 0 && (
              <>
                <div className="search-result-group">{searchResults.quick ? 'Akses Cepat' : 'Modul'}</div>
                {searchResults.mods.map(m => (
                  <button key={m.id} className="search-result-item" onClick={() => { onNavigate(m.id); setQ(''); setSearchOpen(false); }}>
                    <span className="sri-icon" style={{color:'var(--primary)'}}>{m.icon(14)}</span>
                    <span className="sri-label">{m.label}</span>
                    <span className="sri-badge">Modul</span>
                  </button>
                ))}
              </>
            )}
            {searchResults.subs.length > 0 && (
              <>
                <div className="search-result-group">Sub Menu</div>
                {searchResults.subs.map((r,i) => (
                  <button key={i} className="search-result-item" onClick={() => { onNavigate(r.modId, r.subId); setQ(''); setSearchOpen(false); }}>
                    <span className="sri-icon" style={{color:'var(--text-3)'}}>{r.icon(14)}</span>
                    <span className="sri-label">{r.label}</span>
                    <span className="sri-badge">{r.modLabel}</span>
                  </button>
                ))}
              </>
            )}
          </div>
        )}
      </div>

      <div className="topbar-right" style={{position:'relative'}}>
        <button className="icon-btn" title="Bantuan">{I.help()}</button>

        {/* Notification button + dropdown */}
        <button ref={notifBtnRef} className={`icon-btn${notifOpen ? ' active' : ''}`} title="Notifikasi"
          style={{position:'relative'}} onClick={() => setNotifOpen(v => !v)}>
          {unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}
          {I.bell()}
        </button>

        {notifOpen && (
          <div className="notif-menu" ref={notifMenuRef}>
            <div className="notif-menu-header">
              <span style={{fontWeight:600, fontSize:13}}>Notifikasi</span>
              {unreadCount > 0 && (
                <button className="notif-mark-read" onClick={markAllRead}>Tandai semua dibaca</button>
              )}
            </div>
            <div className="notif-list">
              {notifs.map(n => (
                <div key={n.id} className={`notif-item${n.read ? '' : ' unread'}`}>
                  <div className="notif-item-icon" style={{color: notifColor(n.type)}}>{notifIcon(n.type)}</div>
                  <div className="notif-item-body">
                    <div className="notif-item-title">{n.title}</div>
                    <div className="notif-item-msg">{n.msg}</div>
                  </div>
                  <div className="notif-item-time">{n.time}</div>
                </div>
              ))}
            </div>
            <div className="notif-menu-footer">
              <button className="btn" style={{width:'100%', justifyContent:'center', fontSize:12.5}}>Lihat semua notifikasi</button>
            </div>
          </div>
        )}

        {/* Avatar + user menu */}
        <button ref={userBtnRef} className={`avatar-btn${userOpen ? ' active' : ''}`} title="Administrator"
          onClick={() => setUserOpen(v => !v)}>AD</button>

        {userOpen && (
          <div className="user-menu" ref={userMenuRef}>
            <div className="user-menu-header">
              <div style={{fontWeight:600, fontSize:13}}>Administrator</div>
              <div style={{fontSize:11.5, color:'var(--text-3)', marginTop:1}}>PDJ Administrator</div>
            </div>
            <hr className="user-menu-divider" />
            <button className="user-menu-item" onClick={()=>{ onNavigate('admin','profil'); setUserOpen(false); }}>
              {I.settings(14)} Pengaturan Akun
            </button>
            <button className="user-menu-item" onClick={()=>{ window.__erpToast&&window.__erpToast('Fitur ubah password belum tersedia.'); setUserOpen(false); }}>
              {I.edit(14)} Ubah Password
            </button>
            <hr className="user-menu-divider" />
            <button className="user-menu-item user-menu-danger" onClick={()=>{ window.__erpToast&&window.__erpToast('Anda telah keluar.'); setUserOpen(false); }}>
              {I.arrowR(14)} Keluar
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

// ---------- Module nav (SAP-style horizontal tabs) ----------
const MODULES = [
  { id: 'home',        label: 'Home',         icon: I.home },
  { id: 'sales',       label: 'Penjualan',    icon: I.users },
  { id: 'pembelian',   label: 'Pembelian',    icon: I.truck },
  { id: 'barang',      label: 'Barang',       icon: I.box },
  { id: 'kataloglain', label: 'Katalog Lain', icon: I.layers },
  { id: 'manufaktur',  label: 'Manufaktur',   icon: I.list },
  { id: 'finance',     label: 'Akuntan',      icon: I.bank },
  { id: 'cashbank',    label: 'Keuangan',     icon: I.bank },
  { id: 'reports',     label: 'Reports',      icon: I.chart },
  { id: 'master',      label: 'Master Data',  icon: I.users },
  { id: 'admin',       label: 'System Admin', icon: I.shield },
  { id: 'pengaturan',  label: 'Pengaturan',   icon: I.settings },
];

function ModuleNav({ active, onChange }) {
  return (
    <nav className="modnav">
      {MODULES.map(m => (
        <button key={m.id} className={active === m.id ? 'active' : ''} onClick={() => onChange(m.id)}>
          <span className="mod-icon">{m.icon(15)}</span>
          {m.label}
        </button>
      ))}
    </nav>
  );
}

// ---------- Multi-tab nav (Chrome-style tab groups) ----------
const MODULE_SUBS = {
  home:      [],
  pembelian: [{ id:'pemasok', label:'Katalog Pemasok' }, { id:'pr', label:'Purchase Request' },
              { id:'rfq', label:'Request for Quotation' }, { id:'quotation', label:'Quotation' },
              { id:'gr', label:'Goods Receive' }, { id:'po', label:'Purchase Order' },
              { id:'beli', label:'Nota Pembelian' }, { id:'retur', label:'Retur Beli' }],
  sales:     [{ id:'katalog', label:'Katalog Pelanggan' }, { id:'konfirmasi', label:'Konfirmasi Penjualan' },
               { id:'salesorder', label:'Sales Order' }, { id:'delivery', label:'Delivery Order' },
               { id:'invoice', label:'Invoice' }, { id:'retur', label:'Sales Return' }],
  manufaktur: [
    { id:'spk',      label:'Surat Perintah Kerja' },
    { id:'produksi', label:'Hasil Produksi & Pemakaian Bahan' },
    { id:'bpbl',     label:'Bukti Pemakaian Barang Lain' },
    { id:'rpbl',     label:'Retur Pakai Barang Lain' },
    { id:'planning', label:'Planning Schedule Produksi Harian' },
  ],
  inventory: [{ id:'barang', label:'Katalog Barang' }, { id:'kategori', label:'Kategori Produk' },
               { id:'mutasi', label:'Mutasi Barang' }, { id:'penyesuaian', label:'Penyesuaian' },
               { id:'opname', label:'Stock Opname' }],
  finance:   [{ id:'akun', label:'Katalog Akun' }, { id:'aktiva', label:'Aktiva Tetap' },
               { id:'jurnal', label:'Jurnal Memorial' }],
  cashbank:  [
    { id:'kbg', label:'Kas, Bank & Giro' },
    { id:'km',  label:'Kas Masuk' },
    { id:'kk',  label:'Kas Keluar' },
    { id:'bm',  label:'Bank Masuk' },
    { id:'bk',  label:'Bank Keluar' },
    { id:'tm',  label:'Transfer Masuk' },
    { id:'tk',  label:'Transfer Keluar' },
    { id:'gm',  label:'Giro Masuk' },
    { id:'gk',  label:'Giro Keluar' },
    { id:'pp',  label:'Pelunasan Piutang' },
    { id:'ph',  label:'Pelunasan Hutang' },
  ],
  reports: [
    { id:'persediaan', label:'Laporan Persediaan' },
    { id:'spk',        label:'Surat Perintah Kerja' },
    { id:'produksi',   label:'Hasil Produksi & Pemakaian Barang' },
    { id:'pemakaian',  label:'Pemakaian Bahan' },
  ],
  barang: [
    { id:'baranglain',   label:'Barang Lain' },
    { id:'bahankaku',    label:'Bahan Baku' },
    { id:'barangjadi',   label:'Barang Jadi Umum & PU' },
    { id:'mutasi',       label:'Mutasi Barang & Konsinyasi' },
    { id:'penyesuaian',  label:'Penyesuaian Barang' },
    { id:'opname',       label:'Stock Opname' },
  ],
  kataloglain: [
    { id:'salesman',     label:'Katalog Salesman' },
    { id:'gudang',       label:'Katalog Gudang' },
    { id:'kategori',     label:'Katalog Kategori Barang' },
    { id:'satuan',       label:'Katalog Satuan Barang' },
    { id:'pelengkap',    label:'Pelengkap Bahan Baku & Barang Umum' },
    { id:'akunbukubesar',label:'Katalog Akun Buku Besar' },
    { id:'aktiva',       label:'Katalog Aktiva' },
    { id:'user',         label:'Katalog User' },
    { id:'grupuser',     label:'Katalog Grup User' },
  ],
  master: [
    { id:'salesman', label:'Katalog Salesman' },
    { id:'gudang',   label:'Katalog Gudang' },
    { id:'satuan',   label:'Katalog Satuan Produk' },
    { id:'user',     label:'Katalog User' },
    { id:'grup',     label:'Katalog Grup User' },
    { id:'menu',     label:'Katalog Menu' },
  ],
  pengaturan: [
    { id:'akses',      label:'Akses User' },
    { id:'menu',       label:'Menu' },
    { id:'grupmenu',   label:'Grup Menu' },
    { id:'sistem',     label:'Konfigurasi Sistem' },
    { id:'organisasi', label:'Konfigurasi Organisasi' },
    { id:'penjualan',  label:'Konfigurasi Penjualan' },
  ],
  admin: [
    { id:'profil',    label:'Profil Perusahaan' },
    { id:'default',   label:'Nilai Default' },
    { id:'cetakan',   label:'Keterangan Cetakan' },
    { id:'fitur',     label:'Fitur Administrator' },
    { id:'sesi',      label:'Login Pengguna' },
    { id:'tampilan',  label:'Tampilan & Tema' },
  ],
};

const GROUP_COLORS = {
  home:'#6366f1', pembelian:'#0ea5e9', sales:'#10b981', inventory:'#f59e0b',
  barang:'#f59e0b', kataloglain:'#0d9488', manufaktur:'#f97316',
  finance:'#8b5cf6', cashbank:'#ec4899', reports:'#14b8a6', master:'#64748b', admin:'#ef4444',
  pengaturan:'#6b7280',
};

function MultiTabNav({ tabGroups, activeGroup, onGroupClick, onTabClick, onTabClose, onToggleCollapse, moduleOrder, onReorderGroups, onReorderSubTabs }) {
  const dragGroupRef = React.useRef(null);
  const dragSubRef   = React.useRef(null);

  const orderedModules = moduleOrder
    ? moduleOrder.map(id => MODULES.find(m => m.id === id)).filter(Boolean)
    : MODULES;

  return (
    <nav className="multitab-nav">
      {orderedModules.map(m => {
        const group = tabGroups[m.id] || { openSubs: [], activeSub: null, collapsed: false };
        const isActiveGroup = activeGroup === m.id;
        const color = GROUP_COLORS[m.id];
        const hasSubs = group.openSubs.length > 0;

        return (
          <div
            key={m.id}
            className={`tab-group${isActiveGroup ? ' active' : ''}${group.collapsed ? ' collapsed' : ''}`}
            draggable={true}
            onDragStart={e => {
              if (dragSubRef.current) { e.preventDefault(); return; }
              dragGroupRef.current = m.id;
              e.dataTransfer.effectAllowed = 'move';
            }}
            onDragOver={e => {
              if (dragSubRef.current || !dragGroupRef.current || dragGroupRef.current === m.id) return;
              e.preventDefault();
              e.currentTarget.classList.add('drag-over');
            }}
            onDragLeave={e => { e.currentTarget.classList.remove('drag-over'); }}
            onDrop={e => {
              e.currentTarget.classList.remove('drag-over');
              if (dragSubRef.current || !dragGroupRef.current || dragGroupRef.current === m.id) return;
              e.preventDefault();
              onReorderGroups && onReorderGroups(dragGroupRef.current, m.id);
              dragGroupRef.current = null;
            }}
            onDragEnd={() => {
              dragGroupRef.current = null;
              document.querySelectorAll('.tab-group.drag-over').forEach(el => el.classList.remove('drag-over'));
            }}
          >
            <button
              className="tab-group-label"
              onClick={() => onGroupClick(m.id)}
              title={m.label}
            >
              <span className="mod-icon">{m.icon(13)}</span>
              <span>{m.label}</span>
              {hasSubs && group.collapsed && (
                <span style={{
                  fontSize:10, fontWeight:700, lineHeight:1,
                  background: 'var(--primary)', color:'#fff',
                  borderRadius:10, padding:'2px 5px', marginLeft:2,
                }}>
                  {group.openSubs.length}
                </span>
              )}
              {hasSubs && (
                <span
                  className="group-collapse-btn"
                  onClick={e => { e.stopPropagation(); onToggleCollapse(m.id); }}
                  title={group.collapsed ? 'Expand' : 'Collapse'}
                >
                  {I.chev(10, group.collapsed ? 'right' : 'down')}
                </span>
              )}
            </button>

            <div className={`tab-group-subs${group.openSubs.length === 0 ? ' empty' : ''}${group.collapsed ? ' collapsed' : ''}`}>
              {group.openSubs.map((subId, subIdx) => {
                const subs = MODULE_SUBS[m.id] || [];
                const sub = subs.find(s => s.id === subId);
                if (!sub) return null;
                const isActiveSub = isActiveGroup && group.activeSub === subId;
                return (
                  <button
                    key={subId}
                    className={`sub-tab${isActiveSub ? ' active' : ''}`}
                    draggable={true}
                    onClick={() => onTabClick(m.id, subId)}
                    style={{ '--group-color': color }}
                    onDragStart={e => {
                      e.stopPropagation();
                      dragSubRef.current = { modId: m.id, fromIdx: subIdx };
                      e.dataTransfer.effectAllowed = 'move';
                      e.currentTarget.classList.add('dragging');
                    }}
                    onDragOver={e => {
                      e.stopPropagation();
                      e.preventDefault();
                      e.currentTarget.classList.add('drag-over');
                    }}
                    onDragLeave={e => { e.currentTarget.classList.remove('drag-over'); }}
                    onDrop={e => {
                      e.stopPropagation();
                      e.currentTarget.classList.remove('drag-over');
                      if (!dragSubRef.current || dragSubRef.current.modId !== m.id) return;
                      e.preventDefault();
                      const { fromIdx } = dragSubRef.current;
                      if (fromIdx !== subIdx) onReorderSubTabs && onReorderSubTabs(m.id, fromIdx, subIdx);
                      dragSubRef.current = null;
                    }}
                    onDragEnd={e => {
                      e.currentTarget.classList.remove('dragging');
                      document.querySelectorAll('.sub-tab.drag-over').forEach(el => el.classList.remove('drag-over'));
                      dragSubRef.current = null;
                    }}
                  >
                    <span>{sub.label}</span>
                    <span
                      className="tab-close"
                      onClick={e => { e.stopPropagation(); onTabClose(m.id, subId); }}
                      title="Tutup tab"
                    >
                      {I.x(10)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </nav>
  );
}

// ---------- Reusable module dashboard (Pengaturan, Katalog Lain, Barang) ----------
function ModuleDashboard({ title, subtitle, sections, activityLog, onOpenSub, activityTitle = 'Log Aktivitas Terbaru', activitySub = 'Operasi sistem yang dideteksi secara real-time' }) {
  return (
    <div className="page" data-screen-label={title}>
      <div className="crumbs">
        <a onClick={() => onOpenSub?.(null)} style={{cursor:'pointer'}}>Home</a><span className="sep">/</span>
        <span className="current">{title}</span>
      </div>
      <div className="page-head">
        <div>
          <h1>{title}</h1>
          <div className="sub">{subtitle}</div>
        </div>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:20, alignItems:'start'}}>
        <div>
          {sections.map((sec, i) => (
            <div key={i} style={{marginBottom:24}}>
              {sec.title && (
                <h3 className="section-title" style={{textTransform:'uppercase', letterSpacing:'.06em', fontSize:12, color:'var(--text-3)'}}>
                  {sec.title} <span className="count">{sec.count}</span>
                </h3>
              )}
              <div className="tile-grid">
                {sec.tiles.map(t => (
                  <button key={t.id} className="tile" onClick={() => onOpenSub?.(t.id)}>
                    <div className="tile-head">
                      <div className="tile-icon-wrap" style={{background:'var(--primary-50)', color:'var(--primary)'}}>{t.icon || I.list(20)}</div>
                      {t.badge && <span className="tile-badge">{t.badge}</span>}
                    </div>
                    <div>
                      <h3>{t.title}</h3>
                    </div>
                    <div className="tile-foot"><b style={{color:'var(--text-3)', fontWeight:500}}>Buka</b> {I.arrowR(11)}</div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="panel">
          <h3>{activityTitle}</h3>
          <div className="sub" style={{marginBottom:14}}>{activitySub}</div>
          <div style={{display:'flex', flexDirection:'column', gap:14}}>
            {activityLog.map((log, idx) => (
              <div key={idx} style={{display:'flex', gap:12}}>
                <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                  <span style={{width:10, height:10, borderRadius:'50%', background: log.color || 'var(--primary)', border:'2px solid #fff', boxShadow:'0 0 0 1px var(--border)'}}></span>
                  {idx < activityLog.length - 1 && <div style={{width:1, flex:1, background:'var(--border)', marginTop:4}}></div>}
                </div>
                <div style={{flex:1, paddingBottom:12}}>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
                    <b style={{fontSize:13}}>{log.user}</b>
                    <span style={{fontSize:11, color:'var(--text-4)'}}>{log.time}</span>
                  </div>
                  <div style={{fontSize:12.5, color:'var(--text-2)', marginTop:2}}>{log.action} <b style={{color:'var(--primary)'}}>{log.detail}</b></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Toast ----------
function Toast({ msg, kind = 'success' }) {
  if (!msg) return null;
  return <div className={`toast ${kind}`}>{kind==='success' ? I.check() : null}{msg}</div>;
}

// ---------- Confirmation Modal (Batalkan / Selesaikan Manual / dll) ----------
function ConfirmationModal({ title, message, onConfirm, onCancel, confirmLabel='Konfirmasi', cancelLabel='Batal', confirmKind='danger', requireReason=true }) {
  const [reason, setReason] = React.useState('');
  const canConfirm = !requireReason || reason.trim();
  return (
    <div className="modal-backdrop" style={{zIndex:110}} onClick={onCancel}>
      <div className="modal" onClick={e=>e.stopPropagation()} style={{maxWidth:480}}>
        <div className="modal-head"><h2>{title}</h2><button className="btn btn-icon" onClick={onCancel}>{I.x(16)}</button></div>
        <div className="modal-body">
          <p style={{margin:'0 0 14px', color:'var(--text-2)'}}>{message}</p>
          {requireReason && (
            <div className="field"><label>Alasan <span style={{color:'var(--danger)'}}>*</span></label><textarea className="textarea" value={reason} onChange={e=>setReason(e.target.value)} placeholder="Masukkan alasan…"/></div>
          )}
        </div>
        <div className="modal-foot">
          <button className="btn" onClick={onCancel}>{cancelLabel}</button>
          <button className={`btn btn-${confirmKind}`} onClick={()=>onConfirm(reason)} disabled={!canConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}

// ---------- Item Picker Modal ----------
function ItemPickerModal({ title, items, onConfirm, onCancel }) {
  const [q, setQ] = React.useState('');
  const [selected, setSelected] = React.useState({});
  const [qtyMap, setQtyMap] = React.useState({});

  const filtered = React.useMemo(() => {
    if (!q) return items;
    const ql = q.toLowerCase();
    return items.filter(it => (it.nama||it.name||it.Nama_Item||'').toLowerCase().includes(ql) || (it.kode||it.code||it.Kode_Item||'').toLowerCase().includes(ql));
  }, [items, q]);

  const toggle = (code) => {
    setSelected(prev => {
      const next = { ...prev };
      if (next[code]) {
        delete next[code];
        // hapus qty juga
        setQtyMap(qm => { const nqm={...qm}; delete nqm[code]; return nqm; });
      } else {
        next[code] = true;
      }
      return next;
    });
  };

  const setQty = (code, val) => setQtyMap(prev => ({ ...prev, [code]: Math.max(1, +val || 1) }));

  const selectedCount = Object.keys(selected).length;

  const handleConfirm = () => {
    const picked = Object.keys(selected).map(code => {
      const it = items.find(x => (x.kode||x.code||x.Kode_Item) === code);
      return { ...it, _qty: qtyMap[code] || 1 };
    });
    onConfirm(picked);
  };

  return (
    <div className="modal-backdrop" style={{zIndex:110}} onClick={onCancel}>
      <div className="modal item-picker-modal" onClick={e=>e.stopPropagation()}>
        <div className="modal-head"><h2>{title || 'Pilih Barang'}</h2><button className="btn btn-icon" onClick={onCancel}>{I.x(16)}</button></div>
        <div className="modal-body">
          <div style={{display:'flex', justifyContent:'flex-end', marginBottom:12}}>
            <div className="field" style={{width:'40%', minWidth:200, marginBottom:0}}>
              <div className="input-w-icon">{I.search(14)}<input className="input" placeholder="Cari kode atau nama barang…" value={q} onChange={e=>setQ(e.target.value)}/></div>
            </div>
          </div>
          <div className="line-items picker-table" style={{maxHeight:320, overflowY:'auto'}}>
            <table>
              <thead><tr><th style={{width:40}}></th><th>Kode</th><th>Nama Barang</th><th style={{width:90}}>Jumlah</th></tr></thead>
              <tbody>
                {filtered.length === 0 && <tr><td colSpan={4} className="empty">Tidak ditemukan.</td></tr>}
                {filtered.map(it => {
                  const code = it.kode || it.code || it.Kode_Item;
                  const name = it.nama || it.name || it.Nama_Item;
                  const isSel = !!selected[code];
                  return (
                    <tr key={code} className={isSel ? 'selected' : ''} onClick={()=>toggle(code)}>
                      <td><input type="checkbox" checked={isSel} onChange={()=>toggle(code)} onClick={e=>e.stopPropagation()}/></td>
                      <td className="mono">{code}</td>
                      <td>{name}</td>
                      <td>
                        {isSel ? (
                          <input className="cell num" type="number" min={1} value={qtyMap[code]||1} onChange={e=>setQty(code, e.target.value)} onClick={e=>e.stopPropagation()}/>
                        ) : (
                          <span className="muted">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="modal-foot">
          <div className="muted" style={{fontSize:12.5}}>{selectedCount} barang dipilih</div>
          <div className="right" style={{display:'flex', gap:8}}>
            <button className="btn" onClick={onCancel}>Batal</button>
            <button className="btn btn-primary" onClick={handleConfirm} disabled={selectedCount===0}>{I.plus()} Tambah Item ({selectedCount})</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- ScrollNavModal (wide modal shell with nav buttons + 3-mode) ----------
function ScrollNavModal({
  title,
  subtitle,
  mode,
  sections,
  summaryPanel,
  preContent,
  statusBadge,
  locked,
  onClose,
  onSave,
  onSaveAndClose,
  onCancelDoc,
  onCompleteDoc,
  onEditMode,
  onCancelEdit,
  showSelesai,
  xwide,
}) {
  const bodyRef = React.useRef(null);
  const sectionRefs = React.useRef({});
  const [activeSection, setActiveSection] = React.useState(sections[0]?.id);

  const scrollTo = (id) => {
    setActiveSection(id);
    const el = sectionRefs.current[id];
    const body = bodyRef.current;
    if (el && body) {
      const bodyRect = body.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      body.scrollBy({ top: elRect.top - bodyRect.top - 12, behavior: 'smooth' });
    }
  };

  React.useEffect(() => {
    if (!bodyRef.current) return;
    const body = bodyRef.current;
    const onScroll = () => {
      const bodyTop = body.getBoundingClientRect().top;
      let closest = null, closestDist = Infinity;
      sections.forEach(s => {
        const el = sectionRefs.current[s.id];
        if (!el) return;
        const dist = Math.abs(el.getBoundingClientRect().top - bodyTop - 12);
        if (dist < closestDist) { closestDist = dist; closest = s.id; }
      });
      if (closest) setActiveSection(closest);
    };
    body.addEventListener('scroll', onScroll, { passive: true });
    return () => body.removeEventListener('scroll', onScroll);
  }, [sections]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className={`modal modal-wide ${xwide ? 'modal-xwide' : ''}`} onClick={e=>e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <h2 style={{display:'flex', alignItems:'center', gap:10, flexWrap:'wrap'}}>
              {title}
              {statusBadge}
            </h2>
            {subtitle && <div className="sub">{subtitle}</div>}
          </div>
          <button className="btn btn-icon" onClick={onClose}>{I.x(16)}</button>
        </div>

        <div className="scroll-nav-bar">
          {sections.map(s => (
            <button key={s.id} className={activeSection===s.id?'active':''} onClick={()=>scrollTo(s.id)}>{s.label}</button>
          ))}
        </div>

        <div className="modal-body modal-body-scroll" ref={bodyRef}>
          <div className={`scroll-modal-layout ${summaryPanel ? 'with-side' : ''}`}>
            <div className="scroll-modal-main">
              {preContent}
              {sections.map(s => (
                <div key={s.id} ref={el => sectionRefs.current[s.id] = el} className="scroll-section">
                  {s.content}
                </div>
              ))}
            </div>
            {summaryPanel && (
              <div className="scroll-modal-side">
                {summaryPanel}
              </div>
            )}
          </div>
        </div>

        <div className="modal-foot">
          <div className="muted" style={{fontSize:12.5}}><kbd>Esc</kbd> untuk batal</div>
          <div className="right" style={{display:'flex', gap:8}}>
            {mode === 'VIEW' && !locked && onEditMode && (
              <button className="btn btn-primary" onClick={onEditMode}>{I.edit()} Edit</button>
            )}
            {mode === 'VIEW' && !locked && onCancelDoc && (
              <button className="btn btn-danger-outline" onClick={onCancelDoc}>{I.fileX(14)} Batalkan Transaksi</button>
            )}
            {mode === 'VIEW' && !locked && onCompleteDoc && showSelesai && (
              <button className="btn btn-success" onClick={onCompleteDoc}>{I.check()} Selesaikan Manual</button>
            )}
            {mode === 'VIEW' && (
              <button className="btn" onClick={()=>window.__erpToast && window.__erpToast('Fitur cetak belum tersedia pada prototipe ini.')}>{I.print()} Cetak</button>
            )}
            {mode === 'CREATE' && (
              <>
                <button className="btn" onClick={onClose}>Tutup</button>
                <button className="btn btn-primary btn-soft" onClick={onSaveAndClose}>{I.check()} Simpan & Tutup</button>
                <button className="btn btn-primary" onClick={onSave}>{I.check()} Simpan</button>
              </>
            )}
            {mode === 'EDIT' && (
              <>
                <button className="btn" onClick={onClose}>Tutup</button>
                <button className="btn btn-danger-outline" onClick={onCancelEdit}>Batalkan Perubahan</button>
                <button className="btn btn-primary" onClick={onSave}>{I.check()} Simpan</button>
              </>
            )}
            {mode === 'VIEW' && (
              <button className="btn" onClick={onClose}>Tutup</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { I, BrandMark, TopBar, ModuleNav, MODULES, Toast, MultiTabNav, MODULE_SUBS, GROUP_COLORS, ModuleDashboard, ConfirmationModal, ItemPickerModal, ScrollNavModal });
