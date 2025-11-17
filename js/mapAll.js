(() => {
  let map, markerKayangan, markerNirmala, lineBetween;
  let latestData = { Kayangan: null, Nirmala: null };

  // === Fungsi untuk hitung jarak antar dua titik (meter) ===
  function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371000; // jari-jari bumi (m)
    const toRad = (deg) => (deg * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  // === Ambil data dari API ===
  async function fetchLocationData() {
    try {
      const res = await fetch("https://nyampah-in.my.id/api/read.php");
      const data = await res.json();

      const kayangan = data.find((d) => d.device === "Kayangan");
      const nirmala = data.find((d) => d.device === "Nirmala");

      if (kayangan) latestData.Kayangan = kayangan;
      if (nirmala) latestData.Nirmala = nirmala;

      updateMap();
    } catch (err) {
      console.error("Gagal memuat data lokasi:", err);
    }
  }

  // === Perbarui tampilan peta ===
  function updateMap() {
    if (!latestData.Kayangan || !latestData.Nirmala) return;

    const latK = parseFloat(latestData.Kayangan.latitude);
    const lonK = parseFloat(latestData.Kayangan.longitude);
    const latN = parseFloat(latestData.Nirmala.latitude);
    const lonN = parseFloat(latestData.Nirmala.longitude);

    // Perbarui marker Kayangan
    if (!markerKayangan) {
      markerKayangan = L.marker([latK, lonK])
        .addTo(map)
        .bindPopup(`<b>Kayangan</b><br>${latK}, ${lonK}`);
    } else {
      markerKayangan.setLatLng([latK, lonK]);
    }

    // Perbarui marker Nirmala
    if (!markerNirmala) {
      markerNirmala = L.marker([latN, lonN])
        .addTo(map)
        .bindPopup(`<b>Nirmala</b><br>${latN}, ${lonN}`);
    } else {
      markerNirmala.setLatLng([latN, lonN]);
    }

    // Perbarui garis penghubung
    if (lineBetween) map.removeLayer(lineBetween);
    lineBetween = L.polyline(
      [
        [latK, lonK],
        [latN, lonN],
      ],
      { color: "green", weight: 3 }
    ).addTo(map);

    // Atur tampilan agar kedua titik terlihat
    const group = L.featureGroup([markerKayangan, markerNirmala]);
    map.fitBounds(group.getBounds(), { padding: [40, 40] });

    // Hitung jarak
    const jarak = haversine(latK, lonK, latN, lonN);
    const infoBox = document.getElementById("distanceInfo");
    if (infoBox) {
      infoBox.innerHTML = `Jarak antara <b>Kayangan</b> dan <b>Nirmala</b>: ${jarak.toFixed(
        2
      )} meter`;
    }
  }

  // === Inisialisasi Peta ===
  document.addEventListener("DOMContentLoaded", () => {
    const mapEl = document.getElementById("mapAll");
    if (!mapEl) return; // hindari error kalau halaman tanpa mapAll

    map = L.map("mapAll").setView([-7.3086, 112.7283], 17);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
    }).addTo(map);

    fetchLocationData();
    setInterval(fetchLocationData, 60000); // update tiap 1 menit
  });
})();
