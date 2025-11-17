async function updateTrashLevels() {
  try {
    const response = await fetch("https://nyampah-in.my.id/api/read.php");
    const data = await response.json();

    // Loop semua elemen overlay (Kayangan & Nirmala)
    document.querySelectorAll(".trash-overlay").forEach((overlay) => {
      const deviceName = overlay.dataset.device; // ambil "Kayangan" atau "Nirmala"
      const record = data.find((d) => d.device === deviceName);

      if (record) {
        // pastikan volume ada dan ubah ke persentase
        const volume = parseFloat(record.volume) || 0;
        const heightPercent = Math.min(100, Math.max(0, volume));

        // Koreksi tinggi visual agar proporsional dengan gambar
        const correctionFactor = 0.7; // area isi 80% dari tinggi gambar
        const bottomOffset = 5;
        const adjustedHeight = heightPercent * correctionFactor + bottomOffset;

        overlay.style.height = Math.min(100, adjustedHeight) + "%";
        overlay.style.transition = "height 0.5s ease";

        // update teks dan indikator warna
        const container = overlay.closest(".w-32, .lg\\:w-56, .xl\\:w-64");
        if (container) {
          const percentageEl = container.querySelector(".trash-percentage");
          const statusEl = container.querySelector(".trash-status");
          const indicatorEl = container.querySelector(".trash-indicator");

          if (percentageEl) percentageEl.textContent = `${heightPercent}%`;
          if (statusEl) {
            if (heightPercent >= 90) {
              statusEl.textContent = "Penuh";
              indicatorEl.style.backgroundColor = "red";
            } else if (heightPercent >= 50) {
              statusEl.textContent = "Setengah";
              indicatorEl.style.backgroundColor = "orange";
            } else {
              statusEl.textContent = "Kosong";
              indicatorEl.style.backgroundColor = "green";
            }
          }
        }
      }
    });
  } catch (error) {
    console.error("Gagal mengambil data:", error);
  }
}

// Jalankan pertama kali dan ulangi setiap 30 detik
updateTrashLevels();
setInterval(updateTrashLevels, 30000);

