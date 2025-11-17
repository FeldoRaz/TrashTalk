(() => {
  // === Peta dan Marker ===
  let mapKayangan, mapNirmala;
  let markerKayangan, markerNirmala;
  let latestData = { Kayangan: null, Nirmala: null };

  // === Ambil Data dari API ===
  async function fetchLatestData() {
    try {
      const response = await fetch("https://nyampah-in.my.id/api/read.php");
      const data = await response.json();

      // Ambil data terakhir untuk masing-masing device
      const kayangan = data.find((d) => d.device === "Kayangan");
      const nirmala = data.find((d) => d.device === "Nirmala");

      if (kayangan) latestData.Kayangan = kayangan;
      if (nirmala) latestData.Nirmala = nirmala;

      updateMapMarkers();
    } catch (err) {
      console.error("Gagal memuat data lokasi:", err);
    }
  }

  // === Update Marker di Map ===
  function updateMapMarkers() {
    if (latestData.Kayangan && mapKayangan) {
      const { latitude, longitude } = latestData.Kayangan;
      const latLng = [parseFloat(latitude), parseFloat(longitude)];

      if (!markerKayangan) {
        markerKayangan = L.marker(latLng)
          .addTo(mapKayangan)
          .bindPopup(
            `<b>Tong Sampah Kayangan</b><br>${latitude}, ${longitude}`
          );
      } else {
        markerKayangan.setLatLng(latLng);
      }

      mapKayangan.setView(latLng, 18);
    }

    if (latestData.Nirmala && mapNirmala) {
      const { latitude, longitude } = latestData.Nirmala;
      const latLng = [parseFloat(latitude), parseFloat(longitude)];

      if (!markerNirmala) {
        markerNirmala = L.marker(latLng)
          .addTo(mapNirmala)
          .bindPopup(`<b>Tong Sampah Nirmala</b><br>${latitude}, ${longitude}`);
      } else {
        markerNirmala.setLatLng(latLng);
      }

      mapNirmala.setView(latLng, 18);
    }
  }

  // === Tampilkan / Tutup Popup Map ===
  function toggleMap(device) {
    const mapContainer = document.getElementById(
      device === "Kayangan" ? "mapContainer" : "mapContainerNirmala"
    );
    const closeBtn = document.getElementById(
      device === "Kayangan" ? "closeMap" : "closeMapNirmala"
    );
    const mapId = device === "Kayangan" ? "map" : "mapNirmala";

    if (!mapContainer) return;

    // Tampilkan popup
    mapContainer.classList.remove("hidden");
    setTimeout(() => (mapContainer.style.opacity = "1"), 10);

    // Inisialisasi map jika belum
    if (device === "Kayangan" && !mapKayangan) {
      mapKayangan = L.map(mapId).setView([-7.3086, 112.7283], 18);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapKayangan);
    } else if (device === "Nirmala" && !mapNirmala) {
      mapNirmala = L.map(mapId).setView([-7.3086, 112.7283], 18);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapNirmala);
    }

    // Tutup map
    closeBtn.addEventListener("click", () => {
      mapContainer.style.opacity = "0";
      setTimeout(() => mapContainer.classList.add("hidden"), 300);
    });

    // Perbarui marker
    updateMapMarkers();
  }

  // === Event Listener Tombol ===
  document.addEventListener("DOMContentLoaded", () => {
    document
      .getElementById("trackBtn")
      ?.addEventListener("click", () => toggleMap("Kayangan"));
    document
      .getElementById("trackBtnNirmala")
      ?.addEventListener("click", () => toggleMap("Nirmala"));

    // Jalankan pertama kali dan perbarui tiap 60 detik
    fetchLatestData();
    setInterval(fetchLatestData, 60000);
  });
})();
