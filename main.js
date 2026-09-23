// Yvii Works JavaScript Engine

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Fechar o menu ao clicar em qualquer link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // 2. Portfolio Gallery Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 200);
                }
            });
        });
    });

    // 3. Image Lightbox / Modal
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalCategory = document.getElementById('modal-category');
    const closeModalBtn = document.getElementById('close-modal-btn');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const cardImg = item.querySelector('img');
            const imgSrc = (cardImg && (cardImg.currentSrc || cardImg.src)) || item.getAttribute('data-img');
            const title = item.getAttribute('data-title');
            const category = item.getAttribute('data-category') === '3d' ? 'Impressão 3D / Prop' : 'Pixel Art / Chaveiro';

            if (modalImg && modalTitle && modalCategory && modal) {
                modalImg.onerror = function() {
                    this.onerror = null;
                    if (cardImg && cardImg.src) {
                        this.src = cardImg.src;
                    }
                };
                modalImg.src = imgSrc;
                modalTitle.textContent = title;
                modalCategory.textContent = category;
                modal.classList.remove('hidden');
                modal.classList.add('flex');
            }
        });
    });

    if (closeModalBtn && modal) {
        closeModalBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        });

        // Fechar ao clicar fora do conteúdo
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            }
        });
    }

    // 4. Proteção contra Inspeção de Código (Disable Right Click & DevTools Shortcuts)
    // Desabilitar clique direito
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });

    // Desabilitar atalhos comuns de inspeção (F12, Ctrl+U, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C)
    document.addEventListener('keydown', (e) => {
        // F12
        if (e.key === 'F12' || e.keyCode === 123) {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+I ou Cmd+Option+I (Inspect)
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.keyCode === 73)) {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+J (Console)
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'J' || e.key === 'j' || e.keyCode === 74)) {
            e.preventDefault();
            return false;
        }
        // Ctrl+U (View Source)
        if ((e.ctrlKey || e.metaKey) && (e.key === 'U' || e.key === 'u' || e.keyCode === 85)) {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+C (Inspect Element Mode)
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'C' || e.key === 'c' || e.keyCode === 67)) {
            e.preventDefault();
            return false;
        }
    });
});
