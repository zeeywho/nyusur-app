import { db, auth } from './firebase-config.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// Ambil elemen-elemen form
const form = document.getElementById("formLaporan");
const statusUpload = document.getElementById("statusUpload");
const notifikasi = document.getElementById("notifikasi");

// Sembunyikan form sampai cek auth selesai
form.style.display = 'none';

// Proteksi akses halaman: tampilkan form jika user sudah login, atau redirect ke login jika belum
auth.onAuthStateChanged((user) => {
  if (user) {
    form.style.display = 'block';
  } else {
    alert("Anda harus login terlebih dahulu.");
    window.location.href = "login.html";
  }
});

// Handling submit form laporan
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Cek ulang auth sebelum submit
  const user = auth.currentUser;
  if (!user) {
    alert("Anda harus login terlebih dahulu untuk mengirim laporan.");
    window.location.href = "login.html";
    return;
  }

  // Ambil data input
  const judul = document.getElementById("judul").value.trim();
  const lokasi = document.getElementById("lokasi").value.trim();
  const deskripsi = document.getElementById("deskripsi").value.trim();
  const gambarFile = document.getElementById("gambar").files[0];

  if (!gambarFile) {
    alert("Silakan pilih gambar terlebih dahulu.");
    return;
  }

  // Tampilkan status upload
  statusUpload.textContent = "Mengupload gambar...";
  notifikasi.textContent = "";

  try {
    // Upload ke Imgur
    const formData = new FormData();
    formData.append("image", gambarFile);

    const response = await fetch("https://api.imgur.com/3/image", {
      method: "POST",
      headers: { Authorization: "Client-ID 95fe961482fad11" },
      body: formData
    });

    const data = await response.json();
    if (!data.success) throw new Error("Gagal upload gambar ke Imgur");

    const imageUrl = data.data.link;

    // Simpan laporan ke Firestore
    await addDoc(collection(db, "laporan"), {
      judul,
      lokasi,
      deskripsi,
      gambarUrl: imageUrl,
      timestamp: serverTimestamp(),
      uid: user.uid,
      email: user.email
    });

    // Reset dan notifikasi berhasil
    statusUpload.textContent = "";
    notifikasi.textContent = "✅ Laporan berhasil dikirim!";
    form.reset();
    setTimeout(() => {
      window.location.href = "laporan-terkirim.html";
    }, 1500);

  } catch (error) {
    console.error("Error:", error);
    statusUpload.textContent = "";
    notifikasi.textContent = "❌ Gagal mengirim laporan.";
  }
});
