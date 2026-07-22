// Penjualan — dashboard modul (kpi + tile per sub-halaman)
// Catatan: berbeda dari Pembelian (yang pakai komponen ModuleDashboard generik dari root
// components.jsx), dashboard Penjualan memakai layout kustom (kpi-strip, top pelanggan, timeline)
// yang sudah ada sejak modul Pelanggan lama — dipertahankan apa adanya, bukan diseragamkan.

function PenjualanDashboard({ onOpenSub, onNavigate, pelanggan, konfirmasi, salesOrders, invoices, salesReturns, deliveryOrders }) {
  const totalPel = pelanggan.length;
  const aktifPel = pelanggan.filter(p => p.email).length;
  const pendingKonf = konfirmasi.filter(k => k.status === 'AKTIF' && !['DISETUJUI','SELESAI MANUAL'].includes(k.progressApproval)).length;
  const outstanding = invoices.filter(n => n.Status === 'Outstanding').reduce((s,n) => s+(n.Details||[]).reduce((t,d)=>t+pjLineTotal(d),0), 0);
  const returPending = salesReturns.filter(r => r.Status === 'Pending').length;
  const omzet30 = invoices.reduce((s,n)=>s+(n.Details||[]).reduce((t,d)=>t+pjLineTotal(d),0), 0);

  const topPelanggan = (() => {
    const byCust = {};
    invoices.filter(n => !n.Batal).forEach(n => {
      const nilai = (n.Details||[]).reduce((t,d)=>t+pjLineTotal(d),0);
      byCust[n.Nama_Cust] = (byCust[n.Nama_Cust] || 0) + nilai;
    });
    const sorted = Object.entries(byCust).sort((a,b)=>b[1]-a[1]).slice(0,5);
    const max = sorted[0]?.[1] || 1;
    return sorted.map(([nm, val]) => [nm, val, Math.round((val/max)*100)]);
  })();

  const tiles = [
    { id:'katalog',    icon:I.users(20),   title:'Katalog Pelanggan',    desc:'Master data pelanggan, kontak, alamat, dan info perusahaan.', badge:`${totalPel} pelanggan`, count:`${aktifPel} aktif`, accent:null },
    { id:'konfirmasi', icon:I.cart(20),    title:'Confirmation Order', desc:'Buat dan kelola konfirmasi pesanan pelanggan serta approval.', badge: pendingKonf > 0 ? `${pendingKonf} perlu approval` : null, badgeKind:'pulse', accent:'#0d9488' },
    { id:'salesorder', icon:I.list(20),    title:'Sales Order',          desc:'Order penjualan resmi setelah konfirmasi disetujui.', badge:`${salesOrders.length} order`, accent:'#0369a1' },
    { id:'delivery',   icon:I.truck(20),   title:'Delivery Order',       desc:'Surat jalan dan pengiriman barang ke pelanggan.', badge:`${deliveryOrders.length} DO`, accent:'#7c3aed' },
    { id:'invoice',    icon:I.invoice(20), title:'Invoice',              desc:'Penerbitan faktur/tagihan untuk pelanggan.', badge:`${invoices.filter(n=>n.Status==='Outstanding').length} outstanding`, accent:'#b45309' },
    { id:'retur',      icon:I.refresh(20), title:'Sales Return',         desc:'Catat retur barang dari pelanggan dan proses penggantian/refund.', badge: returPending > 0 ? `${returPending} pending` : null, badgeKind:'pulse', accent:'#b45309' },
  ];

  return (
    <div className="page" data-screen-label="04 Penjualan — Dashboard">
      <div className="crumbs">
        <a onClick={() => onNavigate?.('home')} style={{cursor:'pointer'}}>Home</a><span className="sep">/</span>
        <span className="current">Penjualan</span>
      </div>

      <div className="page-head">
        <div>
          <h1>Dashboard Penjualan</h1>
          <div className="sub">Kelola pelanggan, konfirmasi, sales order, delivery, invoice, dan sales return dalam satu workspace.</div>
        </div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn-sm">{I.refresh()} Refresh</button>
        </div>
      </div>

      <div className="kpi-strip">
        <div className="kpi">
          <div className="lbl">Total Pelanggan</div>
          <div className="val mono">{totalPel}</div>
          <div className="delta up">{aktifPel} aktif (kontak lengkap)</div>
        </div>
        <div className="kpi">
          <div className="lbl">Omzet (30 Hari)</div>
          <div className="val mono">{fmtRp(omzet30)}</div>
          <div className="delta up">▲ 6.2% vs bulan lalu</div>
        </div>
        <div className="kpi">
          <div className="lbl">Outstanding Piutang</div>
          <div className="val mono" style={{color: outstanding > 50000000 ? 'var(--warn)' : 'var(--text)'}}>{fmtRp(outstanding)}</div>
          <div className="delta down">{invoices.filter(n=>n.Status==='Outstanding').length} invoice belum lunas</div>
        </div>
        <div className="kpi">
          <div className="lbl">Konfirmasi & Retur Aktif</div>
          <div className="val mono">{konfirmasi.length + salesReturns.length}</div>
          <div className="delta">{pendingKonf + returPending} menunggu tindakan</div>
        </div>
      </div>

      <h3 className="section-title">Modul Penjualan <span className="count">{tiles.length}</span></h3>
      <div className="tile-grid">
        {tiles.map(t => (
          <button key={t.id} className="tile" onClick={()=>onOpenSub(t.id)}>
            <div className="tile-head">
              <div className="tile-icon-wrap" style={t.accent ? { background: t.accent + '14', color: t.accent } : null}>{t.icon}</div>
              {t.badge && <span className={`tile-badge ${t.badgeKind === 'pulse' ? 'pulse' : ''}`}>{t.badge}</span>}
            </div>
            <div>
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
            </div>
            {t.count && <div className="tile-foot"><b style={{color:'var(--text-2)', fontWeight:600}}>{t.count}</b> {I.arrowR(11)}</div>}
          </button>
        ))}
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:16, marginTop:32}}>
        <div className="panel">
          <h3>Top Pelanggan</h3>
          <div style={{display:'flex', flexDirection:'column', gap:14}}>
            {topPelanggan.length === 0 && <div className="muted" style={{fontSize:12.5}}>Belum ada invoice tercatat.</div>}
            {topPelanggan.map(([nm, val, pct]) => (
              <div key={nm}>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:12.5, marginBottom:5}}>
                  <span>{nm}</span><span className="mono muted">{fmtRp(val)}</span>
                </div>
                <div style={{height:6, background:'var(--bg-sub)', borderRadius:999, overflow:'hidden'}}>
                  <div style={{height:'100%', width:pct+'%', background:'linear-gradient(90deg, var(--primary), var(--accent))', borderRadius:999}} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <h3>Aktivitas Penjualan Terkini</h3>
          <div className="timeline">
            <div className="timeline-item done">
              <div className="ti-when">Hari ini · 14:22</div>
              <div className="ti-what"><b className="ti-who">Sales Baru 2</b> menerbitkan invoice <span className="cell-link mono">NJ-2026-0231</span> · Sari Mart</div>
            </div>
            <div className="timeline-item done">
              <div className="ti-when">Hari ini · 11:08</div>
              <div className="ti-what"><b className="ti-who">Sistem</b> retur dari Toko Jaya Abadi disetujui · {fmtRp(1180000)}</div>
            </div>
            <div className="timeline-item">
              <div className="ti-when">Kemarin · 16:30</div>
              <div className="ti-what"><b className="ti-who">Sales Senior</b> membuat konfirmasi <span className="cell-link mono">KKO20260001</span></div>
            </div>
            <div className="timeline-item">
              <div className="ti-when">Kemarin · 09:12</div>
              <div className="ti-what"><b className="ti-who">Admin</b> menambah pelanggan baru: PELANGGAN BARU</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
