'use client'; // Wajib ada untuk halaman dengan interaktivitas

import { useState } from 'react';
import Link from 'next/link'; // Komponen link standar di Next.js

export default function LoginPage() {
  // State untuk mengelola tampilan antara login dan daftar
  const [isLoginView, setIsLoginView] = useState(true);

  // State untuk data formulir pendaftaran
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // State untuk pesan error, sukses, dan loading
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fungsi yang dijalankan saat formulir pendaftaran disubmit
  async function handleRegister(event) {
    event.preventDefault();
    setIsLoading(true); // Mulai proses loading
    setError('');
    setSuccess('');

    // Kirim data ke API register yang sudah kita buat
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Jika ada error dari API (misal: email sudah terdaftar)
        throw new Error(data.message || 'Terjadi kesalahan');
      }

      // Jika pendaftaran berhasil
      setSuccess('Pendaftaran berhasil! Silakan pindah ke halaman login untuk masuk.');
      setName('');
      setEmail('');
      setPassword('');

    } catch (err) {
      // Tangkap dan tampilkan pesan error
      setError(err.message);
    } finally {
      setIsLoading(false); // Selesai proses loading
    }
  }

  // Fungsi untuk formulir login akan kita buat nanti
  async function handleLogin(event) {
    event.preventDefault();
    alert('Fitur login akan segera dibuat!');
  }

  return (
    <div style={{ fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', backgroundColor: '#f8f9fa', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '20px' }}>
      <div style={{ maxWidth: '450px', width: '100%', background: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)', position: 'relative' }}>
        
        <Link href="/" style={{ position: 'absolute', top: '15px', left: '15px', color: '#6c757d', fontSize: '1.5rem', transition: 'color 0.3s' }}>
            <i className="fas fa-home"></i>
        </Link>
        
        {isLoginView ? (
          // Tampilan Login
          <div>
            <div className="text-center">
              <h3 style={{color: '#2c7865', fontWeight: '700'}}>Selamat Datang Kembali</h3>
              <p style={{color: '#6c757d', marginBottom: '30px'}}>Masuk untuk mengakses layanan desa.</p>
            </div>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="loginEmail" className="form-label">Email</label>
                <input type="email" id="loginEmail" className="form-control" required />
              </div>
              <div className="mb-3">
                <label htmlFor="loginPassword" className="form-label">Kata Sandi</label>
                <input type="password" id="loginPassword" className="form-control" required />
              </div>
              <div className="d-grid mt-4">
                <button type="submit" className="btn btn-primary" style={{backgroundColor: '#2c7865', borderColor: '#2c7865', padding: '12px', fontWeight: '600'}}>Login</button>
              </div>
              <div className="text-center mt-4">
                <p>Belum punya akun? <a href="#" style={{color: '#2c7865', fontWeight: '500', cursor: 'pointer'}} onClick={() => setIsLoginView(false)}>Daftar di sini</a></p>
              </div>
            </form>
          </div>
        ) : (
          // Tampilan Daftar
          <div>
            <div className="text-center">
              <h3 style={{color: '#2c7865', fontWeight: '700'}}>Buat Akun Baru</h3>
              <p style={{color: '#6c757d', marginBottom: '30px'}}>Daftar untuk menjadi bagian dari komunitas.</p>
            </div>
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label htmlFor="signupName" className="form-label">Nama Lengkap</label>
                <input type="text" id="signupName" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label htmlFor="signupEmail" className="form-label">Email</label>
                <input type="email" id="signupEmail" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label htmlFor="signupPassword" className="form-label">Kata Sandi</label>
                <input type="password" id="signupPassword" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              <div className="d-grid mt-4">
                <button type="submit" className="btn btn-primary" disabled={isLoading} style={{backgroundColor: '#2c7865', borderColor: '#2c7865', padding: '12px', fontWeight: '600'}}>
                  {isLoading ? 'Mendaftarkan...' : 'Daftar'}
                </button>
              </div>
              <div className="text-center mt-4">
                <p>Sudah punya akun? <a href="#" style={{color: '#2c7865', fontWeight: '500', cursor: 'pointer'}} onClick={() => setIsLoginView(true)}>Masuk di sini</a></p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}