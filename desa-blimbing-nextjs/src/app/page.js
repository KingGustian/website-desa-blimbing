'use client'; // Baris ini wajib ada karena kita menggunakan fitur interaktif

import { useEffect } from 'react';

// Karena library dimuat via CDN di layout.js, kita tidak perlu mengimpornya di sini
// Namun kita perlu memastikan kode dijalankan setelah halaman siap

export default function Home() {

  // useEffect akan menjalankan semua skrip ini setelah komponen (halaman) selesai dimuat di browser
  useEffect(() => {

    // Inisialisasi library dan event listener
    const AOS = window.AOS;
    const L = window.L;
    const Typed = window.Typed;
    const lucide = window.lucide;

    // Inisialisasi AOS (Animasi Saat Scroll)
    if (AOS) {
      AOS.init({
        duration: 800,
        once: true,
      });
    }
    
    // Inisialisasi Peta Interaktif Leaflet
    const mapElement = document.getElementById('map');
    if (mapElement && !mapElement._leaflet_id) { // Cek jika peta belum diinisialisasi
      const map = L.map('map').setView([-7.4725, 109.4322], 15);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      L.marker([-7.4725, 109.4322]).addTo(map)
        .bindPopup('<b>Kantor Desa Blimbing</b><br>Pusat layanan masyarakat.')
        .openPopup();
    }

    // Logika untuk menampilkan nama pengguna atau tombol login
    const loggedInUserName = localStorage.getItem('loggedInUserName');
    const loginButton = document.getElementById('login-button');
    const userMenu = document.getElementById('user-menu');
    const userNameSpan = document.getElementById('user-name');
    const logoutButton = document.getElementById('logout-button');

    if (loggedInUserName && loginButton && userMenu) {
      loginButton.classList.add('d-none');
      userMenu.classList.remove('d-none');
      userNameSpan.textContent = loggedInUserName;

      logoutButton.addEventListener('click', function () {
        localStorage.removeItem('loggedInUserName');
        window.location.href = '/'; // Arahkan ke halaman utama Next.js
      });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if(navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
              navbar.classList.add('scrolled');
            } else {
              navbar.classList.remove('scrolled');
            }
        });
    }

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    if(backToTopButton) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 300) {
              backToTopButton.classList.add('active');
            } else {
              backToTopButton.classList.remove('active');
            }
        });
        backToTopButton.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Inisialisasi Typed.js
    const typedElement = document.querySelector('#typed-text');
    if(typedElement) {
        new Typed('#typed-text', {
            strings: ["Desa Blimbing", "Mandiraja", "Kabupaten Banjarnegara"],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true
        });
    }
    
    // Inisialisasi Lucide Icons
    if(lucide) {
        lucide.createIcons();
    }
    
  }, []); // Array kosong memastikan useEffect hanya berjalan sekali saat halaman dimuat

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
        <div className="container">
          <a className="navbar-brand" href="#">
            <i className="fas fa-tree me-2"></i>
            Desa Blimbing
          </a>
          <button className="navbar-toggler" data-bs-target="#navbarNav" data-bs-toggle="collapse" type="button">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#beranda">Beranda</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#profil">Profil Desa</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#struktur">Struktur</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#potensi">Potensi Desa</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#artikel">Artikel</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#galeri">Galeri</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#kontak">Kontak</a>
              </li>
            </ul>
            <a href="/login" id="login-button" className="btn btn-login-nav">Login / Sign Up</a>
            <div id="user-menu" className="d-none align-items-center">
              <span className="navbar-text text-white me-2">
                Halo, <strong id="user-name"></strong>
              </span>
              <button id="logout-button" className="btn btn-outline-warning btn-sm">Logout</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Marquee */}
      <div className="marquee">
        <div className="marquee-content">
          <span>Bantuan sosial datang pada tanggal 1 Juni</span>
          <span>Gotong royong desa tiap tanggal 1</span>
          <span>Layanan 08.00–15.00 WIB</span>
          <span>Pendaftaran KTP elektronik dibuka</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-section" id="beranda">
        <div className="container text-center text-white" data-aos="zoom-in">
          <i data-lucide="map" className="icon-hero"></i>
          <h1 className="hero-title">Selamat Datang di</h1>
          <h2 className="hero-typing"><span id="typed-text"></span></h2>
          <p className="hero-subtitle">Tempat informasi dan layanan warga Desa Blimbing</p>
          <a href="/login" className="btn-custom">Masuk Sekarang</a>
        </div>
      </section>

      {/* Batik Transition */}
      <div className="batik-transition"></div>
      <br />

      {/* Judul Profil */}
      <section id="profil">
        <div className="text-center mb-5" data-aos="fade-up">
          <h2 className="fw-bold" style={{ color: 'var(--primary-color)' }}>Profil Desa Blimbing</h2>
          <p className="text-muted">Menjunjung budaya lokal, membangun masa depan modern.</p>
        </div>
      </section>

      {/* Intro Desa */}
      <section id="intro-desa" className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0" data-aos="fade-right">
              <img src="/desa 2.jpg" alt="Desa Blimbing" className="img-fluid rounded shadow" />
            </div>
            <div className="col-md-6" data-aos="fade-left">
              <h2 className="mb-3 text-success fw-bold">Selamat Datang di Desa Blimbing</h2>
              <p className="lead">
                Desa Blimbing merupakan desa yang kaya akan budaya, alam, dan kebersamaan. Kami berkomitmen untuk membangun masyarakat yang sejahtera dan berdaya saing dengan semangat gotong royong.
              </p>
              <p>
                Jelajahi potensi desa kami mulai dari sektor pertanian, UMKM lokal, hingga destinasi wisata yang menawan. Bersama kita ciptakan Desa Blimbing yang maju dan berkelanjutan.
              </p>
              <a href="#potensi" className="btn btn-success mt-3">Lihat Potensi Desa</a>
            </div>
          </div>
        </div>
      </section>
      <br /><br />
      
      {/* ... (Lanjutkan konversi semua seksi lain di sini) ... */}

      {/* Galeri Desa */}
      <section className="py-5 bg-light" id="galeri">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">Galeri Desa</h2>
          <p className="text-center mb-5" data-aos="fade-up" data-aos-delay="100">Potret kehidupan dan keindahan Desa Blimbing.</p>
          <div className="gallery-grid">
            <div className="gallery-item" data-aos="zoom-in" data-aos-delay="100">
              <img src="/Galeri 1.jpg" alt="Galeri 1" />
            </div>
            <div className="gallery-item" data-aos="zoom-in" data-aos-delay="150">
              <img src="/Galeri 2.jpg" alt="Galeri 2" />
            </div>
            <div className="gallery-item" data-aos="zoom-in" data-aos-delay="200">
              <img src="/Galeri 3.jpg" alt="Galeri 3" />
            </div>
            <div className="gallery-item" data-aos="zoom-in" data-aos-delay="250">
              <img src="/Galeri 4.jpg" alt="Galeri 4" />
            </div>
            <div className="gallery-item" data-aos="zoom-in" data-aos-delay="300">
              <img src="/Galeri 5.jpg" alt="Galeri 5" />
            </div>
            <div className="gallery-item" data-aos="zoom-in" data-aos-delay="350">
              <img src="/Galeri 6.jpg" alt="Galeri 6" />
            </div>
          </div>
        </div>
      </section>

      {/* Peta & Kontak */}
      <section className="py-5" id="kontak">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">Peta & Kontak</h2>
          <div className="row">
            <div className="col-md-6 mb-4" data-aos="fade-right">
              <div className="potensi-card h-100 p-4">
                <h5><i className="fas fa-map-marker-alt me-2"></i> Alamat</h5>
                <p className="mb-4">Jl. Raya Blimbing KM 1, Mandiraja, Banjarnegara, Jawa Tengah</p>
                {/* ... sisa info kontak ... */}
                <hr className="my-4" />
                <h5><i className="fas fa-edit me-2"></i> Buat Laporan atau Aduan</h5>
                <form action="https://formspree.io/f/xnnvrnlk" method="POST">
                  {/* ... isi form ... */}
                   <button type="submit" className="btn btn-primary w-100">Kirim Laporan</button>
                </form>
              </div>
            </div>
            <div className="col-md-6 mb-4" data-aos="fade-left">
              <div id="map" style={{ height: '100%', minHeight: '450px', borderRadius: '15px', zIndex: '1' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 bg-dark text-white">
        <div className="container">
          {/* ... isi footer ... */}
        </div>
      </footer>

      {/* Back to Top Button */}
      <a className="back-to-top" href="#">
        <i className="fas fa-arrow-up"></i>
      </a>
    </>
  );
}