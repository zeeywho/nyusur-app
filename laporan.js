const laporanData = [
  {
    id: "JK2502190261",
    foto: "Gambar/jalanberlubang1.jpg",
    judul: "Jalan Berlubang",
    status: "Koordinasi",
    lokasi: "Kelapa Gading Barat",
    waktu: "12 menit yang lalu",
    deskripsi: "Pas dibelokan ada lubang",
    detailLokasi: "Jl. Kew Residence Blok QE15 No.1, RT.14/RW.6, Klp. Gading Bar., Kec. Klp. Gading, Jkt Utara, Jakarta"
  },
  {
    id: "JK2502190262",
    foto: "Gambar/jalanberlubang2.jpg",
    judul: "Jalan hancur",
    status: "Menunggu",
    lokasi: "Semper Barat",
    waktu: "13 menit yang lalu",
    deskripsi: "karena banyak lombang dan menyebabkan genangan air",
    detailLokasi: "Jl. Swasta No. 88, Semper Barat, Jakarta Utara"
  },
  {
    id: "JK2502190263",
    foto: "Gambar/jalanberlubang3.jpg",
    judul: "Tambalan jalan",
    status: "Koordinasi",
    lokasi: "Cilincing",
    waktu: "18 menit yang lalu",
    deskripsi: "tambalan jalan yang sudah mulai berlobang",
    detailLokasi: "Jl. Raya Cilincing No. 102, Jakarta Utara"
  },
  {
    id: "JK2502190264",
    foto: "Gambar/jalanberlubang4.jpg",
    judul: "Lobang dalam",
    status: "Selesai",
    lokasi: "Pademangan",
    waktu: "20 menit yang lalu",
    deskripsi: "Lobang sangat dalam karena saat malam tidak terlihat",
    detailLokasi: "Jl. Pademangan I No. 45, Jakarta Utara"
  },
  {
    id: "JK2502190265",
    foto: "Gambar/jalanberlubang5.jpg",
    judul: "Jalan utama rusak",
    status: "Menunggu",
    lokasi: "Tanjung Priok",
    waktu: "25 menit yang lalu",
    deskripsi: "Jalan utama menuju kota rusak parah",
    detailLokasi: "Jl. Yos Sudarso, Tanjung Priok, Jakarta"
  }
];

function renderList(filteredData = laporanData, withDetailIndex = null) {
  const container = document.getElementById("laporanList");
  container.innerHTML = "";

  filteredData.forEach((laporan, index) => {
    const div = document.createElement("div");
    div.className = "laporan-card";
    div.onclick = () => showDetail(filteredData, index);

    const statusClass = laporan.status.toLowerCase() === "koordinasi"
      ? "status-koordinasi"
      : laporan.status.toLowerCase() === "menunggu"
        ? "status-menunggu"
        : "status-selesai";

    div.innerHTML = `
      <img class="laporan-img" src="${laporan.foto}" alt="Foto">
      <div class="laporan-content">
        <h3>${laporan.judul}</h3>
        <p>${laporan.deskripsi.substring(0, 60)}...</p>
        <p><strong>${laporan.lokasi}</strong> · ${laporan.waktu}</p>
        <span class="badge ${statusClass}">${laporan.status}</span>
      </div>
    `;

    container.appendChild(div);

    if (withDetailIndex === index) {
      const detailDiv = buildDetail(laporan);
      container.appendChild(detailDiv);
    }
  });
}

function buildDetail(data) {
  const statusClass = data.status.toLowerCase() === "koordinasi"
    ? "status-koordinasi"
    : data.status.toLowerCase() === "menunggu"
      ? "status-menunggu"
      : "status-selesai";

  const detailDiv = document.createElement("div");
  detailDiv.className = "laporan-detail";
  detailDiv.innerHTML = `
    <h2>Detail Laporan</h2>
    <img src="${data.foto}" style="width:100%; max-height:300px; object-fit:cover; border-radius:12px;">
    <p><strong>ID Laporan:</strong> ${data.id}</p>
    <p><strong>Status:</strong> <span class="badge ${statusClass}">${data.status}</span></p>
    <p><strong>Judul:</strong> ${data.judul}</p>
    <p><strong>Permasalahan:</strong><br>${data.deskripsi}</p>
    <p><strong>Lokasi:</strong><br>${data.detailLokasi}</p>
  `;
  return detailDiv;
}

function showDetail(dataSource, index) {
  renderList(dataSource, index);
}

// Tombol search
document.getElementById("btnSearch").addEventListener("click", () => {
  const query = document.getElementById("searchBox").value.toLowerCase().trim();
  if (query === "") {
    renderList(); // Reset ke awal
    return;
  }

  const matchIndex = laporanData.findIndex(laporan =>
    laporan.judul.toLowerCase().includes(query)
  );

  if (matchIndex !== -1) {
    renderList([laporanData[matchIndex]], 0); // tampilkan hasil + detail
  } else {
    const container = document.getElementById("laporanList");
    container.innerHTML = "<p>Tidak ditemukan laporan dengan judul tersebut.</p>";
  }
});

// Reset otomatis saat input kosong
document.getElementById("searchBox").addEventListener("input", (e) => {
  if (e.target.value.trim() === "") {
    renderList(); // Kembali tampil semua
  }
});

renderList();

const btnBack = document.getElementById("btnBack");

btnBack.addEventListener("click", () => {
  document.getElementById("searchBox").value = "";
  renderList();
  btnBack.classList.add("hidden");
});
