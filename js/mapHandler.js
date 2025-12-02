(() => {
  let latestData = { Kayangan: null, Nirmala: null };

  // === Ambil API ===
  async function fetchLatestData() {
    try {
      const response = await fetch("https://nyampah-in.my.id/api/read.php");
      const data = await response.json();

      // Ambil data terakhir masing-masing lokasi
      latestData.Kayangan = data.find((d) => d.device === "Kayangan") || null;
      latestData.Nirmala = data.find((d) => d.device === "Nirmala") || null;
    } catch (err) {
      console.error("Gagal memuat data lokasi:", err);
    }
  }


  function openInGoogleMaps(latitude, longitude) {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(url, "_blank");
  }

  document.addEventListener("DOMContentLoaded", () => {
    // Tombol Kayangan
    document.getElementById("trackBtn")?.addEventListener("click", () => {
      if (latestData.Kayangan) {
        const { latitude, longitude } = latestData.Kayangan;
        openInGoogleMaps(latitude, longitude);
      } else {
        alert("Lokasi Kayangan belum tersedia!");
      }
    });

    // Tombol Nirmala
    document
      .getElementById("trackBtnNirmala")
      ?.addEventListener("click", () => {
        if (latestData.Nirmala) {
          const { latitude, longitude } = latestData.Nirmala;
          openInGoogleMaps(latitude, longitude);
        } else {
          alert("Lokasi Nirmala belum tersedia!");
        }
      });

    fetchLatestData();

    setInterval(fetchLatestData, 60000);
  });
})();
