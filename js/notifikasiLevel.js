// MINTA IZIN NOTIFIKASI SAAT PERTAMA KALI
if (Notification.permission !== "granted") {
  Notification.requestPermission();
}

setInterval(() => {
  fetch("https://cek-kandangku.my.id/read.php")
    .then((res) => res.json())
    .then((data) => {
      if (!data || data.length === 0) return;

      const latestKayangan = data
        .filter((d) => d.device === "Kayangan")
        .sort((a, b) => b.id - a.id)[0];

      const latestNirmala = data
        .filter((d) => d.device === "Nirmala")
        .sort((a, b) => b.id - a.id)[0];

      // ------ Kayangan ------
      if (latestKayangan && parseFloat(latestKayangan.volume) >= 100) {
        document.getElementById("notif-kayangan").classList.remove("hidden");

        // NOTIFIKASI WEB
        new Notification("Tong Sampah Kayangan Penuh! (100%)");
      } else {
        document.getElementById("notif-kayangan").classList.add("hidden");
      }

      // ------ Nirmala ------
      if (latestNirmala && parseFloat(latestNirmala.volume) >= 100) {
        document.getElementById("notif-nirmala").classList.remove("hidden");

        // NOTIFIKASI WEB
        new Notification("Tong Sampah Nirmala Penuh! (100%)");
      } else {
        document.getElementById("notif-nirmala").classList.add("hidden");
      }
    })
    .catch((err) => console.error(err));
}, 2000); // cek setiap 2 detik
