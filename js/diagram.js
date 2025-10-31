document.addEventListener("DOMContentLoaded", () => {
  const btnTampilkan = document.querySelector('[data-action="tampilkan"]');
  const dropdownTanggal = document.querySelector('[data-calendar="trigger"]');
  const dropdownKodeTong = document.querySelector("#kodeTong");
  const boxHasil = document.querySelector("#boxHasil");

  // Sample data untuk demo
  const sampleData = {
    T01: {
      labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
      datasets: [
        {
          label: "Persentase Penuh (%)",
          data: [30, 45, 60, 75, 85, 95],
          borderColor: "#018246",
          backgroundColor: "rgba(1, 130, 70, 0.1)",
          fill: true,
        },
      ],
    },
    T02: {
      labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
      datasets: [
        {
          label: "Persentase Penuh (%)",
          data: [20, 25, 35, 40, 45, 50],
          borderColor: "#018246",
          backgroundColor: "rgba(1, 130, 70, 0.1)",
          fill: true,
        },
      ],
    },
  };

  function tampilkanDiagram(tanggal, kodeTong) {
    // Hapus konten sebelumnya
    boxHasil.innerHTML = "";

    // Buat canvas untuk diagram
    const canvas = document.createElement("canvas");
    canvas.id = "diagramTong";
    boxHasil.appendChild(canvas);

    // Ambil data berdasarkan kode tong
    const data = sampleData[kodeTong];

    // Buat diagram menggunakan Chart.js
    new Chart(canvas, {
      type: "line",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: `Grafik Penggunaan Tong Sampah ${kodeTong} - ${tanggal}`,
            font: {
              size: 16,
              weight: "bold",
            },
            padding: 20,
          },
          legend: {
            position: "bottom",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: "Persentase Penuh (%)",
            },
          },
          x: {
            title: {
              display: true,
              text: "Waktu",
            },
          },
        },
      },
    });
  }

  // Event listener untuk tombol Tampilkan
  btnTampilkan.addEventListener("click", () => {
    const tanggal = dropdownTanggal.textContent.trim();
    const kodeTong = dropdownKodeTong.value;

    if (tanggal === "Waktu") {
      alert("Silakan pilih tanggal terlebih dahulu");
      return;
    }

    if (kodeTong === "Kode Tong") {
      alert("Silakan pilih kode tong terlebih dahulu");
      return;
    }

    tampilkanDiagram(tanggal, kodeTong);
  });
});
