// === FETCH DATA ===
async function getTrashData() {
  try {
    const res = await fetch("https://nyampah-in.my.id/api/read.php");
    return await res.json();
  } catch (e) {
    console.error("Gagal mengambil data:", e);
    return [];
  }
}

// === FILTER & TAMPILKAN ===
async function applyFilter() {
  const box = document.getElementById("boxHasil");
  const tanggal = document.getElementById("filterTanggal").value;
  const kodeTong = document.getElementById("filterTong").value;

  let data = await getTrashData();

  // jika tidak ada data
  if (!data || data.length === 0) {
    box.classList.add("flex", "items-center", "justify-center", "text-center");
    box.innerHTML = `
      <div>
        <p class="font-semibold text-gray-800">Tidak ada data.</p>
      </div>`;
    return;
  }

  // Sort terbaru → lama
  data.sort((a, b) => new Date(b.waktu) - new Date(a.waktu));

  // FILTER TANGGAL
  if (tanggal !== "") {
    data = data.filter((item) => item.waktu.startsWith(tanggal));
  }

  // FILTER DEVICE
  if (kodeTong !== "") {
    data = data.filter((item) => item.device === kodeTong);
  }

  // hasil filter kosong
  if (data.length === 0) {
    box.classList.add("flex", "items-center", "justify-center", "text-center");
    box.innerHTML = `
      <div>
        <p class="font-semibold text-gray-800">Data tidak ditemukan.</p>
        <p>Silakan ubah filter.</p>
      </div>`;
    return;
  }

  // gunakan 2 data terbaru
  const duaData = data.slice(0, 2);

  // HAPUS gaya center default agar tampilan kiri
  box.classList.remove("flex", "items-center", "justify-center", "text-center");

  // TAMPILKAN
  box.innerHTML = `
    <div class="w-full text-left">
      <p class="text-center text-lg font-semibold text-gray-800 mb-3">
        2 Data Terbaru
      </p>

      <div class="space-y-3">
        ${duaData
          .map(
            (d) => `
          <div class="border rounded-lg p-3 bg-gray-50 shadow-sm">
            <p><b>Kode Tong:</b> ${d.device}</p>
            <p><b>Volume:</b> ${d.volume}%</p>
            <p><b>Lokasi:</b> ${d.latitude}, ${d.longitude}</p>
            <p><b>Waktu:</b> ${d.waktu}</p>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  `;
}

// === EVENT LISTENER TOMBOL ===
document.getElementById("btnFilter").addEventListener("click", applyFilter);

// === AUTO UPDATE SETIAP 30 DETIK ===
applyFilter();
setInterval(applyFilter, 30000);
