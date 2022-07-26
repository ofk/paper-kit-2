(() => {
  //  Activate the popovers
  Array.from(document.querySelectorAll('[data-bs-toggle="popover"]')).forEach(
    (el) => {
      new bootstrap.Popover(el);
    }
  );

  //  Activate the tooltips
  Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]')).forEach(
    (el) => {
      new bootstrap.Tooltip(el);
    }
  );

  // Navbar color change on scroll

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.

  function debounce(func, wait, immediate = false) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = undefined;
        if (!immediate) func.apply(context, args);
      }, wait);
      if (immediate && !timeout) func.apply(context, args);
    };
  }

  const navbars = Array.from(
    document.querySelectorAll("[data-pk-scroll-boundary]")
  );

  const checkScrollForTransparentNavbar = debounce(() => {
    navbars.forEach((el) => {
      if (window.pageYOffset > Number(el.dataset.pkScrollBoundary)) {
        el.classList.remove(...el.dataset.pkScrollInClass.split(/\s+/));
        el.classList.add(...el.dataset.pkScrollOutClass.split(/\s+/));
      } else {
        el.classList.add(...el.dataset.pkScrollInClass.split(/\s+/));
        el.classList.remove(...el.dataset.pkScrollOutClass.split(/\s+/));
      }
    });
  }, 17);

  if (navbars.length) {
    checkScrollForTransparentNavbar();
    window.addEventListener("scroll", checkScrollForTransparentNavbar);
  }

  // Javascript for the parallax

  const parallaxes = Array.from(
    document.querySelectorAll('[data-pk-parallax="true"]')
  );

  const checkScrollForParallax = debounce(() => {
    const oVal = window.pageYOffset / 3;
    parallaxes.forEach((el) => {
      el.style.transform = `translate3d(0,${oVal}px,0)`;
    });
  }, 4);

  if (parallaxes.length) {
    window.addEventListener("scroll", checkScrollForParallax);
  }
})();
