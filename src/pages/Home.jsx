import { Link } from 'react-router-dom'
import { FileText, User, Car, ArrowRight } from 'lucide-react'

var WA = '6289507527206'
var WAM = encodeURIComponent('Halo Jasa Amanah!')

var services = [
  { slug: 'dokumen', Icon: FileText, title: 'Jasa Dokumen', desc: 'Pengurusan berbagai dokumen: akta cerai, ijazah, vaksin COVID, CV, portofolio, landing page, surat keterangan, legalisir, dan lainnya.' },
  { slug: 'supir', Icon: User, title: 'Jasa Supir', desc: 'Supir pribadi harian, mingguan, bulanan, acara khusus, atau luar kota. Profesional, berpengalaman, ramah.' },
  { slug: 'sewa-mobil-supir', Icon: Car, title: 'Sewa Mobil + Supir', desc: 'Mobil nyaman + supir profesional. Mulai Rp 180.000.' }
]

var testimonials = [
  { stars: 5, quote: 'Prosesnya cepat! Dokumen selesai 2 hari.', name: 'Ibu Ratna', role: 'Klien Jasa Dokumen', initial: 'R' },
  { stars: 5, quote: 'Supirnya sopan, tepat waktu.', name: 'Pak Hendra', role: 'Klien Jasa Supir', initial: 'H' },
  { stars: 5, quote: 'Mobil bersih, supir profesional.', name: 'Bu Dewi', role: 'Klien Sewa Mobil', initial: 'D' }
]

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>
              <span className="line">Solusi</span>
              <span className="highlight text-3d-glow line">Terpercaya</span>
              <span className="line">untuk Setiap Kebutuhan Anda</span>
            </h1>
            <p>JASA AMANAH hadir dengan tiga layanan unggulan. <strong>Proses satset, hasil memuaskan.</strong></p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={function () { document.getElementById('layanan')?.scrollIntoView({ behavior: 'smooth' }) }}>
                Lihat Layanan
                <ArrowRight size={18} />
              </button>
              <a href={'https://wa.me/' + WA + '?text=' + WAM} target="_blank" rel="noopener noreferrer" className="btn-outline">
                Konsultasi Gratis
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-logo-large">JA</div>
            <div className="hero-floating-card card-1">100+ Klien Puas</div>
            <div className="hero-floating-card card-2">Proses Satset</div>
          </div>
        </div>
      </section>

      <section className="services-section" id="layanan">
        <div className="container">
          <div className="section-header">
            <span className="badge">Layanan Kami</span>
            <h2 className="text-3d-glow">Pilih Layanan Sesuai Kebutuhan</h2>
            <p>Tiga layanan unggulan JASA AMANAH.</p>
          </div>
          <div className="services-grid">
            {services.map(function (s) {
              var IconComp = s.Icon
              return (
                <Link to={'/jasa/' + s.slug} className="service-card" key={s.slug}>
                  <div className="service-icon icon-3d">
                    <span className="icon-3d-inner">
                      <IconComp size={32} strokeWidth={1.5} color="var(--copper)" />
                    </span>
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <span className="card-arrow">Selengkapnya →</span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <span className="badge">Testimoni</span>
            <h2 className="text-3d-glow">Apa Kata Klien Kami?</h2>
            <p>Kepercayaan klien adalah prioritas utama.</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map(function (t, i) {
              return (
                <div className="testimonial-card" key={i}>
                  <div className="testimonial-stars">{'★'.repeat(t.stars)}</div>
                  <blockquote>{t.quote}</blockquote>
                  <div className="testimonial-author">
                    <div className="testimonial-photo-placeholder">{t.initial}</div>
                    <div className="testimonial-info">
                      <p className="name">{t.name}</p>
                      <p className="role">{t.role}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2 className="text-3d-glow">Siap Menggunakan Jasa Kami?</h2>
          <p>Klik di bawah untuk konsultasi gratis!</p>
          <a href={'https://wa.me/' + WA + '?text=' + WAM} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Chat WhatsApp Sekarang
          </a>
        </div>
      </section>
    </main>
  )
}
