
        function openModal() {
            const modal = document.getElementById('modalDaftarkan');
            const modalContent = document.getElementById('modalContent');
            
            // Tampilkan modal
            modal.classList.remove('hidden');
            
            // Animasi fade in
            requestAnimationFrame(() => {
                modal.style.opacity = '1';
                modalContent.style.transform = 'scale(1)';
                modalContent.style.opacity = '1';
            });
        }

        function closeModal() {
            const modal = document.getElementById('modalDaftarkan');
            const modalContent = document.getElementById('modalContent');
            
            // Animasi fade out
            modal.style.opacity = '0';
            modalContent.style.transform = 'scale(0.95)';
            modalContent.style.opacity = '0';
            
            // Sembunyikan modal setelah animasi
            setTimeout(() => {
                modal.classList.add('hidden');
                modal.style.opacity = '';
                modalContent.style.transform = '';
                modalContent.style.opacity = '';
            }, 300);
        }

        // Event listener saat dokumen dimuat
        document.addEventListener('DOMContentLoaded', () => {
            const modal = document.getElementById('modalDaftarkan');
            const btnCloseModal = document.getElementById('btnCloseModal');
            const btnBatalModal = document.getElementById('btnBatalModal');
            const formDaftarTong = document.getElementById('formDaftarTong');

            // Event untuk tombol close dan batal
            if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);
            if (btnBatalModal) btnBatalModal.addEventListener('click', closeModal);

            // Tutup modal saat klik di luar
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeModal();
            });

            // Handle form submission
            formDaftarTong.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const namaTong = document.getElementById('namaTong').value;
                const kodeTong = document.getElementById('kodeTong').value;

                console.log('Data yang akan dikirim:', { nama: namaTong, kode: kodeTong });
                
                // Reset form dan tutup modal
                formDaftarTong.reset();
                closeModal();

                // Notifikasi sukses sederhana
                alert('Tong sampah berhasil didaftarkan!');
            });

            // Tutup modal dengan tombol Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                    closeModal();
                }
            });
        });
