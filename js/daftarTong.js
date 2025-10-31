document.addEventListener("DOMContentLoaded", () => {
  // Debug: Log semua elemen yang kita cari
  console.log("Debug elements:", {
    modal: document.getElementById("modalDaftarkan"),
    modalContent: document.getElementById("modalContent"),
    btnDaftarkan: document.getElementById("btnDaftarkan"),
    btnDaftarkanMobile: document.getElementById("btnDaftarkanMobile"),
    btnCloseModal: document.getElementById("btnCloseModal"),
    btnBatalModal: document.getElementById("btnBatalModal"),
    formDaftarTong: document.getElementById("formDaftarTong"),
  });
  const modal = document.getElementById("modalDaftarkan");
  const modalContent = document.getElementById("modalContent");
  const btnDaftarkan = document.getElementById("btnDaftarkan");
  const btnCloseModal = document.getElementById("btnCloseModal");
  const btnBatalModal = document.getElementById("btnBatalModal");
  const formDaftarTong = document.getElementById("formDaftarTong");

  // Fungsi untuk membuka modal
  const openModal = () => {
    modal.classList.remove("hidden");
    // Tambahkan delay kecil sebelum menampilkan animasi
    setTimeout(() => {
      modal.classList.add("opacity-100");
      modalContent.classList.remove("scale-95", "opacity-0");
      modalContent.classList.add("scale-100", "opacity-100");
    }, 50);
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    modalContent.classList.remove("scale-100", "opacity-100");
    modalContent.classList.add("scale-95", "opacity-0");
    modal.classList.remove("opacity-100");
    // Tambahkan delay sebelum menyembunyikan modal
    setTimeout(() => {
      modal.classList.add("hidden");
    }, 300);
  };

  // Event listener untuk tombol Daftarkan
  btnDaftarkan.addEventListener("click", openModal);

  // Event listener untuk tombol close dan batal
  btnCloseModal.addEventListener("click", closeModal);
  btnBatalModal.addEventListener("click", closeModal);

  // Tutup modal jika mengklik area luar modal
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Handle form submission
  formDaftarTong.addEventListener("submit", (e) => {
    e.preventDefault();

    const namaTong = document.getElementById("namaTong").value;
    const kodeTong = document.getElementById("kodeTong").value;

    // Di sini Anda bisa menambahkan logika untuk mengirim data ke backend
    console.log("Data yang akan dikirim:", {
      nama: namaTong,
      kode: kodeTong,
    });

    // Reset form dan tutup modal
    formDaftarTong.reset();
    closeModal();

    // Tampilkan notifikasi sukses (opsional)
    alert("Tong sampah berhasil didaftarkan!");
  });
});
