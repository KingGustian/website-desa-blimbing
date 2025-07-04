import { Inter } from "next/font/google";
import "./globals.css";

// FITUR TAMBAHAN: Link CSS untuk AOS dan Leaflet
import 'aos/dist/aos.css';
import 'leaflet/dist/leaflet.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Desa Blimbing - Mandiraja | Kabupaten Banjarnegara",
  description: "Website Resmi Desa Blimbing, Kecamatan Mandiraja, Kabupaten Banjarnegara.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        {/* Link untuk Font Awesome */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className={inter.className}>
        {children}

        {/* Script untuk Bootstrap */}
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        
        {/* Script untuk Lucide Icons & Typed.js */}
        <script src="https://unpkg.com/lucide@latest"></script>
        <script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.12"></script>
      </body>
    </html>
  );
}