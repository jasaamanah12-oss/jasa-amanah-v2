import { useState, useRef } from 'react'
import { FileText, Upload, X, ArrowLeft } from 'lucide-react'
import { supabase } from '../lib/supabase'

var WA_NUMBER = '6289507527206'
var MAX_FILES = 6

function formatSize(bytes) {
  var mb = bytes / (1024 * 1024)
  return mb < 1 ? Math.round(bytes / 1024) + ' KB' : mb.toFixed(2) + ' MB'
}

function generateSubmissionNumber() {
  var d = new Date()
  var r = Math.floor(Math.random() * 999999).toString().padStart(6, '0')
  return 'JA-' + d.getFullYear() + '-' + r
}


function SuccessNotification({ submissionNumber, documentType, applicantName, onClose }) {
  var waMsg = encodeURIComponent(
    'Halo Jasa Amanah! Saya ' + applicantName +
    ' sudah mengirim form ' + documentType +
    '. Nomor pengajuan saya: ' + submissionNumber
  )
  return (
    <div className="success-overlay" onClick={function(e){if(e.target===e.currentTarget)onClose()}}>
      <div className="success-card">
        <div className="success-checkmark">
          <div className="check-circle">
            <svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
          </div>
        </div>
        <h2 className="success-title">Data berhasil dikirim!</h2>
        <p className="success-subtitle">Tim kami akan menghubungi Anda dalam 1×24 jam.</p>
        <div className="success-id">{submissionNumber}</div>
        <a href={'https://wa.me/' + WA_NUMBER + '?text=' + waMsg} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
          <svg viewBox="0 0 24 24" width="22" height="22" style={{fill:'#fff'}}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Lanjut Konfirmasi via WhatsApp
        </a>
        <button className="success-close-btn" onClick={onClose}>Tutup</button>
      </div>
    </div>
  )
}


var DOC_TYPES = {
  'Ijjazah': {
    icon: '🎓',
    fields: [
      { id: 'nama', label: 'Nama Lengkap', type: 'text', required: true, placeholder: 'Nama lengkap sesuai akta' },
      { id: 'telepon', label: 'WhatsApp', type: 'tel', required: true, placeholder: '0895-0752-7206', phone: true },
      { id: 'email', label: 'Email', type: 'email', required: true, placeholder: 'email@contoh.com' },
      { id: 'tempat_lahir', label: 'Tempat Lahir', type: 'text', required: true, placeholder: 'Kota/Kabupaten' },
      { id: 'tanggal_lahir', label: 'Tanggal Lahir', type: 'date', required: true },
      { id: 'jenis_kelamin', label: 'Jenis Kelamin', type: 'select', required: true, options: ['', 'Laki-laki', 'Perempuan'] },
      { id: 'agama', label: 'Agama', type: 'select', required: true, options: ['', 'Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'] },
      { id: 'alamat', label: 'Alamat Lengkap', type: 'textarea', required: true, placeholder: 'Alamat sesuai KTP/KK', rows: 2 },
      { id: 'ortu', label: 'Nama Orang Tua / Wali', type: 'text', required: true, placeholder: 'Nama orang tua atau wali' },
      { id: 'ayah', label: 'Nama Ayah', type: 'text', required: true, placeholder: 'Nama ayah kandung' },
    ],
    foto3x4: true, rekomendasiSekolah: true,
    uploadLabel: 'Upload Dokumen Pendukung (NISN, KK, Akta, dll)', uploadRequired: true
  },
  'KTP': {},  'Kartu Keluarga': {},  'Akta Kelahiran': {}, 'Akta Cerai': {},
  'SIM': {}, 'Paspor': {}, 'NPWP': {}, 'Sertifikat': {}, 'Vaksin': {}, 'Lainnya': {}
}
