import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setIntersectionObserver } from './modules/Observer';

gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false });

/**
 * Main.
 * -----------------------------------------------------------------------------
/* READY : DOMContentLoaded
------------------------------------------------------------------------------*/
window.addEventListener('DOMContentLoaded', () => {

  /* 文字カルーセル -> ブラッシュアップでCSS対応に変更。Splide使用のソースを一応残す。
  --------------------------------------------------------------------------*/
  // const options = {
  //   type: 'loop',
  //   arrows: false,
  //   pagination: false,
  //   autoWidth: true,
  //   gap: '8%',
  //   perPage: 1.5,
  //   breakpoints: {
  //     767.98:{
  //       gap: '7%'
  //     }
  //   },
  //   autoScroll: {
  //     speed: 0.5,
  //     pauseOnHover: false, //カーソルが乗ってもスクロールを停止させない
  //   },
  // };

  // const splide = new Splide('.splide', options);
  // splide.mount(window.splide.Extensions);

  // const splide2 = new Splide('.splide2', options);
  // splide2.mount(window.splide.Extensions);



  /* 背景パララックス
  --------------------------------------------------------------------------*/
    const targets = document.querySelectorAll('.js-parallax');

    targets.forEach(target => {
      gsap.fromTo(target.querySelector('img'), {
        y: 0,
      }, {
        y: -140,
        ease: "none",
        scrollTrigger: {
          trigger: target,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.3,
          // markers: true, //デバック
        }
      });
    });



  /* CVボタン追従
  --------------------------------------------------------------------------*/

  // ref: https://greensock.com/docs/v3/GSAP/gsap.matchMedia()

  let mm = gsap.matchMedia(),
    breakPoint = 768;

  mm.add({

    isDesktop: `(min-width: ${breakPoint}px)`,
    isMobile: `(max-width: ${breakPoint - 1}px)`,
    reduceMotion: "(prefers-reduced-motion: reduce)"

  }, (context) => {

    let { isDesktop, isMobile, reduceMotion } = context.conditions;

    ScrollTrigger.create({
      trigger: '.js-trigger-cv',
      start: isDesktop? '25% center' : '10% center',
      end: '15000px',
      scrub: true,
      nullTargetWarn: false,
      toggleClass: {targets: ".js-cv-button", className: "is-active"},
      // markers: true, //デバック
    });

    return () => {
    }
  });



  /* header hamburger
  --------------------------------------------------------------------------*/
  const hamburgerButton = document.querySelector('.js-hamburger-btn');
  const nav = document.querySelector('.js-drawer-menu');

  const openMenu = target => {
    target.setAttribute('aria-expanded',true);
    nav.classList.add('is-open');
    nav.setAttribute('aria-hidden',false);
  }

  const closeMenu = target => {
    target.setAttribute('aria-expanded',false);
    nav.classList.remove('is-open');
    nav.setAttribute('aria-hidden',true);
  }

  hamburgerButton.addEventListener('click', (e) => {
    const value = e.target.getAttribute('aria-expanded');
    if(value === 'true'){
      closeMenu(e.target);
    }else{
      openMenu(e.target);
    }
  });



  /* header link ※linkをクリックするとドロワーメニューを閉じる
  --------------------------------------------------------------------------*/
  const anchorList = document.getElementById('js-nav-list');
  anchorList.addEventListener('click', (e) => {
    if(e.target === e.currentTarget) return;
    closeMenu(hamburgerButton);
  })



  /* 表示領域に入ったらクラスをつける (IntersectionObserver)
  --------------------------------------------------------------------------*/
  setIntersectionObserver(document.querySelectorAll('.js-inview'));


  
  /* accordion
  --------------------------------------------------------------------------*/
  const accordions = document.querySelectorAll('.js-accordion');

  accordions.forEach(target => {
    target.getElementsByClassName('js-accordion-head')[0].addEventListener('click', () => {
      const targetBody = target.getElementsByClassName('js-accordion-body')[0];
      const targetButton = target.getElementsByClassName('js-accordion-button')[0];
      const isOpen = () => targetButton.getAttribute('aria-expanded') === 'true';

      gsap.to(targetBody, {
        height: (targetBody.closest('.js-accordion').classList.contains('is-open')) ? 0 : 'auto',
        duration: 0.5,
        ease: 'power4.inOut'
      });
      
      if(isOpen()){
        targetButton.setAttribute('aria-expanded', 'false');
        target.classList.remove('is-open');
      } else {
        targetButton.setAttribute('aria-expanded', 'true');
        target.classList.add('is-open');
      }
    });
  });



});
