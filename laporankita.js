import { db } from './firebase-config.js';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

const auth = getAuth();
const laporanContainer = document.getElementById("laporanContainer");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const q = query(collection(db, "laporan"), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      laporanContainer.innerHTML = "<p>Tidak ada laporan dari Anda.</p>";
    } else {
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const laporanItem = document.createElement("div");
        laporanItem.className = "laporan-item";
        laporanItem.innerHTML = `
          <h3>${data.judul}</h3>
          <p><strong>Lokasi:</strong> ${data.lokasi}</p>
          <p>${data.deskripsi}</p>
          <img src="${data.gambarUrl}" alt="Gambar laporan">
          <button class="delete-btn" data-id="${docSnap.id}">Hapus</button>
        `;
        laporanContainer.appendChild(laporanItem);
      });

      // Event delegation untuk tombol hapus
      laporanContainer.addEventListener("click", async (e) => {
        if (e.target.classList.contains("delete-btn")) {
          const id = e.target.getAttribute("data-id");
          await deleteDoc(doc(db, "laporan", id));
          alert("Laporan berhasil dihapus.");
          location.reload();
        }
      });
    }
  } else {
    window.location.href = "login.html";
  }
});
