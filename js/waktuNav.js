// === Perbarui Waktu Terakhir Update ===
async function updateLatestTime() {
  try {
    const res = await fetch("https://nyampah-in.my.id/api/read.php");
    const data = await res.json();

    // Ambil data paling baru (baris pertama)
    const latest = data[0];
    if (latest && latest.waktu) {
      const waktu = new Date(latest.waktu.replace(" ", "T"));
      const formatted = waktu.toLocaleString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      // Update teks waktu
      const waktuEl = document.getElementById("updateTime");
      if (waktuEl) waktuEl.textContent = formatted;

      // Efek kecil saat update
      const container = document.getElementById("updateTimeContainer");
      if (container) {
        container.classList.add("ring-2", "ring-emerald-400");
        setTimeout(
          () => container.classList.remove("ring-2", "ring-emerald-400"),
          800
        );
      }
    }
  } catch (err) {
    console.error("Gagal memuat waktu update:", err);
  }
}

// Jalankan pertama kali dan update tiap 30 detik
updateLatestTime();
setInterval(updateLatestTime, 30000);
