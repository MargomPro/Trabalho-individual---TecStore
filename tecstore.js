

document.getElementById('lupaBuscar').addEventListener('click', function(event) {
    event.stopPropagation();
    document.querySelector('.buscar-box').classList.toggle('ativar');
    document.querySelector('.input-buscar').classList.toggle('active');
});

document.getElementById('btnFechar').addEventListener('click', function(event) {
    event.stopPropagation();
    document.querySelector('.buscar-box').classList.remove('ativar');
    document.querySelector('.input-buscar').classList.remove('active');
});

document.addEventListener('click', function(event) {
    const buscarBox = document.querySelector('.buscar-box');
    if (event.target !== buscarBox && !buscarBox.contains(event.target)) {
        buscarBox.classList.remove('ativar');
        document.querySelector('.input-buscar').classList.remove('active');
    }
}); 
const wrapper = document.querySelector('.wrapper.janela-modal');
const entrarLink = document.querySelector('.entrar-link');
const registarLink = document.querySelector('.registar-link');
const btnPopup = document.querySelector('.btnEntrar-popup');
const iconeFechar = document.querySelector('.icone-fechar');
const fundoDesfocado = document.querySelector('.fundo-desfocado');
let scrollYPos = 0;

function abrirModal() {
    scrollYPos = window.scrollY || window.pageYOffset;
    wrapper.classList.add('active-popup');
    fundoDesfocado.style.display = 'block';
    disableBackgroundScroll();
    lockScrollPosition();
    localStorage.setItem('modalState', 'aberto');
}

function fecharModal() {
    wrapper.classList.remove('active-popup');
    fundoDesfocado.style.display = 'none';
    enableBackgroundScroll();
    unlockScrollPosition();
    localStorage.removeItem('modalState');
}

function disableBackgroundScroll() {
    fundoDesfocado.addEventListener('wheel', preventDefault, { passive: false });
}

function enableBackgroundScroll() {
    fundoDesfocado.removeEventListener('wheel', preventDefault);
}

function preventDefault(event) {
    event.preventDefault();
}

function lockScrollPosition() {
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollYPos}px`;
    document.body.style.width = '99%';
}

function unlockScrollPosition() {
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollYPos);
}

function toggleModal() {
    if (!wrapper.classList.contains('active-popup')) {
        abrirModal();
    } else {
        fecharModal();
    }
}

registarLink.addEventListener('click', () => {
    wrapper.classList.add('active');
})

entrarLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
})

btnPopup.addEventListener('click', toggleModal);
iconeFechar.addEventListener('click', toggleModal);
fundoDesfocado.addEventListener('click', toggleModal);

let slideIndex = 0;
let slideInterval;


function showSlides(n) {
    const slides = document.querySelectorAll('.slide');
    const bars = document.querySelectorAll('.bar');

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }

    slideIndex = n;

    if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    } else if (slideIndex >= slides.length) {
        slideIndex = 0;
    }

    slides[slideIndex].style.display = 'flex';
    updateBars(slideIndex);
}


function updateBars(n) {
    const bars = document.querySelectorAll('.bar');
    for (let i = 0; i < bars.length; i++) {
        bars[i].classList.remove('active');
    }
    bars[n].classList.add('active');
}


function currentSlide(n) {
    showSlides(n - 1);
    stopAutoSlide(); 
}

function slide(direction) {
    stopAutoSlide(); 

    showSlides(slideIndex + direction);
}

function startAutoSlide() {
    slideInterval = setInterval(() => {
        slide(1); 
    }, 6000); 
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}

window.onload = function() {
    startAutoSlide();
};

showSlides(slideIndex);

document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.querySelector(".menu-icon");
    const navbarUl = document.querySelector(".navbar ul");

    menuIcon.addEventListener("click", function () {
        navbarUl.classList.toggle("active");
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 800) {
            navbarUl.classList.remove("active");
        }
    });
});