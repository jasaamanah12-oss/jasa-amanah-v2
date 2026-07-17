import { useState, useEffect, useCallback, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import SplashScreen from './components/SplashScreen'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ServicePage from './pages/ServicePage'
import PesanDokumen from './pages/PesanDokumen'
import Footer from './components/Footer'
import LoginPage from './pages/dashboard/LoginPage'
import DashboardLayout from './pages/dashboard/DashboardLayout'
import Inbox from './pages/dashboard/Inbox'
import DetailPengajuan from './pages/dashboard/DetailPengajuan'
import KelolaStaff from './pages/dashboard/KelolaStaff'
import Pengaturan from './pages/dashboard/Pengaturan'
import ProtectedRoute from './components/dashboard/ProtectedRoute'
import AdminRoute from './components/dashboard/AdminRoute'

function AnimatedBg() {
  var stars = []
  var colors = ['rgba(255,255,255,.85)','rgba(212,132,90,.75)','rgba(232,168,124,.65)','rgba(212,175,55,.6)','rgba(255,255,255,.55)']
  for (var i = 0; i < 45; i++) {
    stars.push({ id: i, x: Math.random() * 100, y: Math.random() * 100, s: 1.2 + Math.random() * 3.5, d: Math.random() * 4, r: Math.random() * 3 })
  }
  return (<div className="animated-bg">
    <div className="galaxy"/><div className="galaxy galaxy-2"/>
    <div className="rays">{Array.from({length:8}).map(function(_,i){return <div key={i} className="ray"/>})}</div>
    <div className="waves"><div className="wave wave-1"/><div className="wave wave-2"/><div className="wave wave-3"/></div>
    <div className="glow glow-1"/><div className="glow glow-2"/><div className="glow glow-3"/>
    <div className="stars">
      {stars.map(function(s) {
        var c = colors[Math.floor(Math.random() * colors.length)]
        return (<div key={s.id} className="star" style={{
          left: s.x + '%', top: s.y + '%',
          width: s.s + 'px', height: s.s + 'px',
          background: c,
          boxShadow: '0 0 ' + (2 + s.s * 3) + 'px ' + c,
          animationDelay: s.d + 's', animationDuration: (2.5 + s.r) + 's'
        }} />)
      })}
    </div>
  </div>)
}

function Cursor() {
  var pr = useRef({ x: -100, y: -100 }), tr = useRef({ x: -100, y: -100 })
  var [pos, sp] = useState({ x: -100, y: -100 }), [hover, sh] = useState(false), [clicking, sc] = useState(false)
  var [trails, st] = useState([]), raf = useRef(null)
  useEffect(function () {
    var l = function () { var c = pr.current, t = tr.current; c.x += (t.x - c.x) * .18; c.y += (t.y - c.y) * .18; sp({ x: c.x, y: c.y }); raf.current = requestAnimationFrame(l) }
    raf.current = requestAnimationFrame(l); return function () { cancelAnimationFrame(raf.current) }
  }, [])
  var m = useCallback(function (e) { tr.current = { x: e.clientX, y: e.clientY }; st(function (p) { return p.slice(-16).concat({ id: Math.random(), x: e.clientX, y: e.clientY, size: 2 + Math.random() * 5 }) }) }, [])
  useEffect(function () {
    window.addEventListener('mousemove', m, { passive: true })
    window.addEventListener('mousedown', function () { sc(true) }); window.addEventListener('mouseup', function () { sc(false) })
    var ov = function (e) { if (e.target.closest('a,button,.service-card,.btn-primary,.btn-outline,.btn-form,.nav-toggle,[role="button"],input,select,textarea,.file-upload-area')) sh(true) }
    var out = function (e) { if (e.target.closest('a,button,.service-card,.btn-primary,.btn-outline,.btn-form,.nav-toggle,[role="button"],input,select,textarea,.file-upload-area')) sh(false) }
    document.addEventListener('mouseover', ov); document.addEventListener('mouseout', out)
    return function () { window.removeEventListener('mousemove', m); document.removeEventListener('mouseover', ov); document.removeEventListener('mouseout', out) }
  }, [m])
  return (<>{trails.map(function (t) { return <div key={t.id} className="cursor-trail" style={{ left: t.x - t.size / 2, top: t.y - t.size / 2, width: t.size, height: t.size }} /> })}
    <div className={'cursor-ring' + (hover ? ' hover' : '') + (clicking ? ' clicking' : '')} style={{ left: pos.x, top: pos.y }} /><div className="cursor-dot" style={{ left: pos.x - 6, top: pos.y - 6 }} /></>)
}

export default function App() { var [splash, ss] = useState(true); var loc = useLocation(); useEffect(function () { var t = setTimeout(function () { ss(false) }, 3000); return function () { clearTimeout(t) } }, []); useEffect(function () { window.scrollTo(0, 0) }, [loc.pathname]); if (splash) return <SplashScreen />; return (<><Cursor /><AnimatedBg /><Navbar /><div className="page-enter" key={loc.pathname}><Routes><Route path="/" element={<Home />} /><Route path="/jasa/dokumen" element={<ServicePage slug="dokumen" />} /><Route path="/jasa/supir" element={<ServicePage slug="supir" />} /><Route path="/jasa/sewa-mobil-supir" element={<ServicePage slug="sewa-mobil-supir" />} /><Route path="/pesan-dokumen" element={<PesanDokumen />} /><Route path="/dashboard/login" element={<LoginPage />} /><Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}><Route index element={<Inbox />} /><Route path="diproses" element={<Inbox status="Diproses" />} /><Route path="selesai" element={<Inbox status="Selesai" />} /><Route path="detail/:id" element={<DetailPengajuan />} /><Route path="staff" element={<AdminRoute><KelolaStaff /></AdminRoute>} /><Route path="pengaturan" element={<AdminRoute><Pengaturan /></AdminRoute>} /></Route></Routes></div><Footer /></>) }
