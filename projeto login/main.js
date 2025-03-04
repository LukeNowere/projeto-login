const carousel = document.querySelector('.carousel');
const list = document.querySelector('.carousel .list');
const time = document.querySelector('.carousel .time');

let currentItem = 1;
let isAnimating = false;

const moveCarousel = (direction) => {
    if (isAnimating) return;
    isAnimating = true;

    const itemWidth = list.children[0].offsetWidth;
    const translateX = direction === 'next' ? -itemWidth : itemWidth;

    list.style.transform = `translateX(${translateX}px)`;

    setTimeout(() => {
        if (direction === 'next') {
            currentItem++;
            if (currentItem > list.children.length) {
                currentItem = 1;
                list.style.transform = 'translateX(0px)';
            }
        } else {
            currentItem--;
            if (currentItem < 1) {
                currentItem = list.children.length;
                list.style.transform = `translateX(-${itemWidth * (list.children.length - 1)}px)`;
            }
        }
        isAnimating = false;
    }, 0); // Tempo de transição para 0 segundos
};

const updateProgress = () => {
    const itemWidth = list.children[0].offsetWidth;
    const progressWidth = (currentItem - 1) * itemWidth;
    time.style.width = `${progressWidth}px`;
};

updateProgress();

// Iniciar a navegação automática
const autoplayInterval = 3000; // Intervalo de 3 segundos
let autoplay = setInterval(() => {
    moveCarousel('next');
}, autoplayInterval);

// Pausar a navegação automática ao passar o mouse sobre o carrossel
carousel.addEventListener('mouseover', () => {
    clearInterval(autoplay);
});

// Reiniciar a navegação automática ao sair do mouse do carrossel
carousel.addEventListener('mouseout', () => {
    autoplay = setInterval(() => {
        moveCarousel('next');
    }, autoplayInterval);
});


