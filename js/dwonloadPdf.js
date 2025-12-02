document.addEventListener("DOMContentLoaded", () => {
  const downloadBtn = document.getElementById("downloadBtn");

  downloadBtn.addEventListener("click", async () => {
    try {
      const response = await fetch("https://nyampah-in.my.id/api/read.php");
      const data = await response.json();

      // Header CSV
      let csv = "ID,Device,Volume (%),Latitude,Longitude,Waktu\n";

      // Tambahkan baris CSV
      data.forEach((item) => {
        csv += `${item.id},${item.device},${item.volume},${item.latitude},${item.longitude},${item.waktu}\n`;
      });

      // Buat file blob CSV
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "data_sampah.csv";
      document.body.appendChild(a);
      a.click();

      // Cleanup
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Gagal download:", err);
      alert("Gagal mengambil data dari server.");
    }
  });
});
