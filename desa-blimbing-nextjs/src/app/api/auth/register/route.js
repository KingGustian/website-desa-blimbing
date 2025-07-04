import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

// Fungsi ini akan dieksekusi ketika ada request POST ke /api/auth/register
export async function POST(req) {
  try {
    // 1. Mengambil data dari request
    const { name, email, password } = await req.json();

    // Validasi dasar
    if (!name || !email || !password || password.length < 6) {
      return NextResponse.json(
        { message: 'Data tidak valid. Password minimal 6 karakter.' },
        { status: 400 }
      );
    }

    // 2. Menghubungkan ke MongoDB
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();

    // 3. Cek apakah pengguna sudah ada
    const existingUser = await db.collection('users').findOne({ email: email });
    if (existingUser) {
      client.close();
      return NextResponse.json(
        { message: 'Email ini sudah terdaftar.' },
        { status: 422 }
      );
    }

    // 4. Enkripsi (hash) password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 5. Simpan pengguna baru ke database
    await db.collection('users').insertOne({
      name: name,
      email: email,
      password: hashedPassword,
    });

    // 6. Tutup koneksi dan kirim respons sukses
    client.close();
    return NextResponse.json({ message: 'Pengguna berhasil didaftarkan!' }, { status: 201 });

  } catch (error) {
    // Penanganan error server
    return NextResponse.json(
      { message: 'Gagal mendaftarkan pengguna.', error: error.message },
      { status: 500 }
    );
  }
}