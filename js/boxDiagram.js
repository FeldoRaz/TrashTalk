// === FETCH DATA ===
async function getTrashData() {
  try {
    const response = await fetch("https://nyampah-in.my.id/api/read.php");
    return await response.json();
  } catch (err) {
    console.error("Gagal mengambil data:", err);
    return [];
  }
}

// === TAMPILKAN 3 DATA TERAKHIR ===
async function tampilkanTigaTerakhir() {
  const box = document.getElementById("boxHasil");
  let data = await getTrashData();

  if (!data || data.length === 0) {
    box.innerHTML = `
      <div>
        <p class="font-semibold text-gray-800">Tidak ada data.</p>
      </div>
    `;
    return;
  }

  // Sort dari terbaru → terlama
  data.sort((a, b) => new Date(b.waktu) - new Date(a.waktu));

  // Ambil hanya 3 data paling baru
  const tigaData = data.slice(0, 3);

  // Render ke tampilan
  box.innerHTML = `
    <div class="w-full">
      <p class="font-semibold text-gray-800 mb-3">3 Data Terbaru</p>

      <div class="space-y-3">
        ${tigaData
          .map(
            (d) => `
          <div class="border rounded-lg p-3 text-left bg-gray-50">
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

// === AUTO UPDATE SETIAP 30 DETIK ===
tampilkanTigaTerakhir();
setInterval(tampilkanTigaTerakhir, 30000);
