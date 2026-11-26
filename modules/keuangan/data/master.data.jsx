// Keuangan — daftar sub-menu Kas/Bank/Giro dipakai breadcrumb (KeuanganPage). Sub-menu accounting
// (akun/aktiva/jurnal/labarugi/aruskas/neraca) TIDAK di sini — labelnya di-fallback ke
// MODULE_SUBS.keuangan (components.jsx) langsung oleh KeuanganPage, karena components.jsx
// dieksekusi lebih dulu (sebelum data file modul manapun dimuat) jadi tidak bisa saling
// mereferensikan balik. Pola sama seperti PJ_SUBS di modules/penjualan/data/master.data.jsx.
const KU_SUBS = [
  { id:'kbg',   label:'Kas, Bank & Giro',         icon:'wallet' },
  { id:'kas',      label:'Transaksi Kas',     icon:'in' },
  { id:'bank',     label:'Transaksi Bank',    icon:'in' },
  { id:'transfer', label:'Transfer Kas/Bank', icon:'in' },
  { id:'giro',     label:'Transaksi Giro',    icon:'doc' },
  { id:'pp',    label:'Pelunasan Piutang',         icon:'check' },
  { id:'ph',    label:'Pelunasan Hutang',          icon:'check' },
];
