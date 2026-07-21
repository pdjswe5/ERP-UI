// Manufaktur — router top-level modul: mengangkat 5 array dokumen (SPK, Hasil Produksi, BPBL,
// RPBL, Planning) jadi state, merender dashboard atau halaman sub-modul sesuai activeSub.
//
// Root-cause fix (state-lifting): sebelumnya SPK_LIST/HP_LIST/BPBL_LIST/RPBL_LIST/PLANNING_LIST
// adalah const array module-level, dan tombol Simpan di dialog cuma menutup modal + toast tanpa
// pernah menulis ke array itu — Tambah/Edit tidak pernah benar-benar tersimpan. Sama seperti fix
// yang sudah diterapkan di PenjualanPage.jsx, di sini setiap seed data diangkat jadi state nyata
// lewat React.useState, rows/setRows diteruskan ke tiap sub-halaman, dan onSave benar-benar
// menulis (append untuk CREATE, replace-by-no untuk EDIT) ke state tersebut.

// ─── Dashboard ───────────────────────────────────────────────────────────────

function MfManufakturDashboard({ onOpenSub, spkRows, produksiRows, bpblRows, rpblRows, planningRows }) {
  const tiles = [
    {
      id: 'spk',
      icon: I.list(20),
      title: 'Surat Perintah Kerja',
      desc: 'Buat dan kelola work order produksi.',
      badge: spkRows.filter(s => s.status === 'Pending Approval').length + ' Menunggu',
      count: spkRows.length + ' SPK',
    },
    {
      id: 'produksi',
      icon: I.box(20),
      title: 'Hasil Produksi & Pemakaian Bahan',
      desc: 'Catat hasil produksi dan pemakaian bahan baku.',
      badge: null,
      count: produksiRows.length + ' Dokumen',
    },
    {
      id: 'bpbl',
      icon: I.invoice(20),
      title: 'Bukti Pemakaian Barang Lain',
      desc: 'Catat pemakaian barang lain dari gudang.',
      badge: null,
      count: bpblRows.length + ' Dokumen',
    },
    {
      id: 'rpbl',
      icon: I.truck(20),
      title: 'Retur Pakai Barang Lain',
      desc: 'Catat pengembalian barang ke gudang.',
      badge: null,
      count: rpblRows.length + ' Dokumen',
    },
    {
      id: 'planning',
      icon: I.cal(20),
      title: 'Planning Schedule Produksi',
      desc: 'Kelola antrian dan jadwal produksi per mesin.',
      badge: planningRows.filter(r => r.status === 'planning').length + ' Antrian',
      count: MF_MESIN_LIST.length + ' Mesin',
    },
  ];

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1>Manufaktur</h1>
          <div className="sub">Kelola proses produksi dan pemakaian bahan</div>
        </div>
      </div>
      <div className="tile-grid">
        {tiles.map(t => (
          <button key={t.id} className="tile" onClick={() => onOpenSub(t.id)}>
            <div className="tile-head">
              <div className="tile-icon-wrap">{t.icon}</div>
              {t.badge && (
                <span className="tile-badge pulse">{t.badge}</span>
              )}
            </div>
            <div>
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
            </div>
            <div className="tile-foot"><b>{t.count}</b> {I.arrowR(11)}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page Router ─────────────────────────────────────────────────────────

function ManufakturPage({ activeSub, onSubChange, onNavigate }) {
  const [spkRows,      setSpkRows]      = React.useState(MF_SPK_SEED);
  const [produksiRows, setProduksiRows] = React.useState(MF_PRODUKSI_SEED);
  const [bpblRows,     setBpblRows]     = React.useState(MF_BPBL_SEED);
  const [rpblRows,     setRpblRows]     = React.useState(MF_RPBL_SEED);
  const [planningRows, setPlanningRows] = React.useState(MF_PLANNING_SEED);

  const [modal, setModal] = React.useState(null);
  const [spkModalMode, setSpkModalMode] = React.useState(null); // null (CREATE) | 'VIEW' | 'EDIT' — khusus SPK
  const [confirmCancelSpk, setConfirmCancelSpk] = React.useState(null);

  const showToast = (msg) => { window.__erpToast && window.__erpToast(msg); };

  // Menulis form yang dirakit dialog ke state rows yang sesuai: CREATE menambah baris baru,
  // EDIT mengganti baris lama yang cocok berdasarkan field "no".
  const saveToRows = (setRows) => (form) => {
    setRows(prev => {
      const exists = prev.some(r => r.no === form.no);
      return exists ? prev.map(r => r.no === form.no ? form : r) : [...prev, form];
    });
    setModal(null);
    showToast('Data berhasil disimpan.');
  };

  // SPK: Batalkan via ConfirmationModal (dipicu dari ikon list atau tombol "Batalkan SPK" di dalam dialog VIEW)
  const cancelSpkFromModal = (row) => { setModal(null); setConfirmCancelSpk(row); };
  const confirmCancelSpkNow = (reason) => {
    setSpkRows(prev => prev.map(r => r.no === confirmCancelSpk.no
      ? { ...r, status:'Batal', Batal:true, Alasan_Batal: reason || 'Dibatalkan oleh operator' }
      : r));
    showToast('SPK dibatalkan.');
    setConfirmCancelSpk(null);
  };

  const onBack = () => onSubChange(null);

  const subLabel = {
    spk:      'Surat Perintah Kerja',
    produksi: 'Hasil Produksi & Pemakaian Bahan',
    bpbl:     'Bukti Pemakaian Barang Lain',
    rpbl:     'Retur Pakai Barang Lain',
    planning: 'Planning Schedule Produksi Harian',
  };

  if (!activeSub) {
    return (
      <MfManufakturDashboard
        onOpenSub={onSubChange}
        spkRows={spkRows} produksiRows={produksiRows}
        bpblRows={bpblRows} rpblRows={rpblRows} planningRows={planningRows}
      />
    );
  }

  return (
    <div className="page">
      <div className="crumbs">
        <a style={{cursor:'pointer'}} onClick={() => onNavigate('home')}>Home</a>
        <span className="sep">/</span>
        <a style={{cursor:'pointer'}} onClick={onBack}>Manufaktur</a>
        <span className="sep">/</span>
        <span className="current">{subLabel[activeSub] || activeSub}</span>
      </div>

      {activeSub === 'spk'      && <MfSpkList rows={spkRows}
        onAdd={()  => { setSpkModalMode(null);   setModal({type:'spk', data:null}); }}
        onView={r  => { setSpkModalMode('VIEW'); setModal({type:'spk', data:r}); }}
        onEdit={r  => { setSpkModalMode('EDIT'); setModal({type:'spk', data:r}); }}
        onCancelDoc={r => setConfirmCancelSpk(r)}
        onNavigate={onNavigate} />}
      {activeSub === 'produksi' && <MfHasilProduksiList rows={produksiRows}
        onAdd={() => setModal({type:'produksi', data:null})}
        onEdit={r  => setModal({type:'produksi', data:r})} />}
      {activeSub === 'bpbl' && <MfPemakaianBarangList type="bpbl" rows={bpblRows}
        onAdd={() => setModal({type:'bpbl', data:null})}
        onEdit={r  => setModal({type:'bpbl', data:r})} />}
      {activeSub === 'rpbl' && <MfPemakaianBarangList type="rpbl" rows={rpblRows}
        onAdd={() => setModal({type:'rpbl', data:null})}
        onEdit={r  => setModal({type:'rpbl', data:r})} />}
      {activeSub === 'planning' && <MfPlanningScheduleList rows={planningRows} setRows={setPlanningRows} />}

      {modal?.type === 'spk'      && <MfSpkDialog           data={modal.data} initialMode={spkModalMode} onClose={() => setModal(null)} onSave={saveToRows(setSpkRows)} onCancelDoc={cancelSpkFromModal} />}
      {modal?.type === 'produksi' && <MfHasilProduksiDialog data={modal.data} onClose={() => setModal(null)} onSave={saveToRows(setProduksiRows)} />}
      {modal?.type === 'bpbl' && <MfPemakaianBarangDialog type="bpbl" data={modal.data} onClose={() => setModal(null)} onSave={saveToRows(setBpblRows)} />}
      {modal?.type === 'rpbl' && <MfPemakaianBarangDialog type="rpbl" data={modal.data} onClose={() => setModal(null)} onSave={saveToRows(setRpblRows)} />}

      {confirmCancelSpk && (
        <ConfirmationModal
          title="Batalkan SPK"
          message={`Surat Perintah Kerja "${confirmCancelSpk.no}" akan dibatalkan. Transaksi yang sudah dibatalkan tidak bisa diaktifkan kembali.`}
          confirmLabel="Batalkan"
          confirmKind="danger"
          onCancel={() => setConfirmCancelSpk(null)}
          onConfirm={confirmCancelSpkNow}
        />
      )}
    </div>
  );
}
