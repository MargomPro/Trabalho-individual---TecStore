(function carregar() {
  document
    .getElementById("lupaBuscar")
    .addEventListener("click", function (event) {
      event.stopPropagation();
      document.querySelector(".buscar-box").classList.toggle("ativar");
      document.querySelector(".input-buscar").classList.toggle("active");
    });

  document
    .getElementById("btnFechar")
    .addEventListener("click", function (event) {
      event.stopPropagation();
      document.querySelector(".buscar-box").classList.remove("ativar");
      document.querySelector(".input-buscar").classList.remove("active");
    });

  document.addEventListener("click", function (event) {
    const buscarBox = document.querySelector(".buscar-box");
    if (event.target !== buscarBox && !buscarBox.contains(event.target)) {
      buscarBox.classList.remove("ativar");
      document.querySelector(".input-buscar").classList.remove("active");
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
  

  const initApp = () => {
    fetch("produtos.json")
      .then((response) => response.json())
      .then((data) => {
        produtos = data;
        addDataToHTML();

        if (localStorage.getItem("cart")) {
          cart = JSON.parse(localStorage.getItem("cart"));
          addCartToHTML();
        }
      });
  };

  initApp();
})();


