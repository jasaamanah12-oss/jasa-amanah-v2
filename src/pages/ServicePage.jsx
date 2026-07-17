import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { FileText, FolderOpen, User, Car, CarFront, Star, Crown, Check, ArrowRight } from 'lucide-react'

var WA = '6289507527206'

var data = {
  dokumen: {
    theme: 'navy-theme',
    Icon: FileText,
    icon2: FolderOpen,
    title: 'Jasa Dokumen',
    subtitle: 'Pengurusan dokumen resmi, cepat, dan terpercaya.',
    desc: 'Kami menyediakan jasa pengurusan berbagai dokumen resmi dengan proses yang cepat dan hasil yang memuaskan.',
    long: 'Tim kami berpengalaman dalam menangani berbagai jenis dokumen. Setiap proses ditangani secara profesional.',
    feat: ['Akta Cerai', 'Ijazah & Transkrip', 'Vaksin', 'CV & Portofolio', 'Landing Page', 'Legalisir', 'Paspor & Visa', 'Dokumen Perusahaan'],
    formUrl: '/pesan-dokumen'
  },
  supir: {
    theme: 'green-theme',
    Icon: User,
    icon2: Car,
    title: 'Jasa Supir',
    subtitle: 'Supir profesional, berpengalaman, dan ramah.',
    desc: 'Supir pribadi harian, mingguan, bulanan, acara khusus, atau luar kota.',
    long: 'Supir kami diseleksi ketat dan berpengalaman. Ramah, profesional, dan siap melayani.',
    feat: ['Harian', 'Mingguan', 'Bulanan', 'Acara Khusus', 'Luar Kota', 'Pribadi', 'Bisnis'],
    formUrl: '/pesan-dokumen?layanan=supir'
  },
  'sewa-mobil-supir': {
    theme: 'green-theme',
    Icon: CarFront,
    icon2: Crown,
    title: 'Sewa Mobil + Supir',
    subtitle: 'Mulai Rp 180.000. Mobil nyaman + supir profesional.',
    desc: 'Sewa mobil lengkap dengan supir profesional. Nyaman dan harga terjangkau.',
    long: 'Paket terlengkap untuk kebutuhan transportasi Anda. Mobil bersih, supir profesional, harga bersaing.',
    feat: ['Dalam Kota', 'Luar Kota', 'Antar Jemput', 'Harian', 'Acara Khusus', 'Bisnis', 'Wisata'],
    formUrl: '/pesan-dokumen?layanan=sewa-mobil-supir'
  }
}

export default function ServicePage({ slug }) {
  var [show, setShow] = useState(false)
  var d = data[slug]
  useEffect(function () { setShow(false); var t = setTimeout(function () { setShow(true) }, 50); return function () { clearTimeout(t) } }, [slug])

  if (!d) return (<div className="service-page navy-theme" style={{ textAlign: 'center', paddingTop: 200 }}><h2>Layanan tidak ditemukan</h2><Link to="/">Kembali</Link></div>)

  var Icon = d.Icon
  var waMsg = encodeURIComponent('Halo! Saya tertarik dengan *' + d.title + '*')
  var checkIcon = d.theme === 'green-theme' ? <Check size={22} className="check-icon" /> : <Check size={22} className="check-icon" />

  return (
    <div className={'service-page ' + d.theme}>
      <div className={show ? 'service-transition' : ''} style={{ opacity: show ? 1 : 0 }}>
        <section className="service-hero">
          <div className="container">
            <div className="service-icon-lg">
              <Icon size={48} strokeWidth={1.5} color={d.theme === 'green-theme' ? 'var(--gold)' : 'var(--copper)'} />
            </div>
            <h1><span className="highlight text-3d-glow">{d.title}</span></h1>
            <p className="subtitle">{d.subtitle}</p>
          </div>
        </section>
        <section className="service-content">
          <div className="container">
            <div className="service-info">
              <h2 className="text-3d-glow">Tentang {d.title}</h2>
              <p>{d.desc}</p>
              <ul className="service-features">
                {d.feat.map(function (f, i) { return (<li key={i}>{checkIcon}{f}</li>) })}
              </ul>
            </div>
            <div className="form-card">
              <h3>Siap Menggunakan Jasa Kami?</h3>
              <p className="form-subtitle">Isi form dan upload dokumen sekarang</p>
              <Link to={d.formUrl} className="btn-form">
                Isi Form & Upload
                <ArrowRight size={20} />
              </Link>
              <p className="form-wa-alt">
                Atau langsung via{' '}
                <a className="whatsapp-text-link" href={'https://wa.me/' + WA + '?text=' + waMsg} target="_blank" rel="noopener noreferrer">
                  WhatsApp 📱
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
