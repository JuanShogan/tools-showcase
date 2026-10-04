/* ═══════════════════════════════════════════════════════════
   我的工具箱 · 交互脚本（无依赖）
   1. 滚动渐入
   2. 导航栏滚动变色
   3. 轻微视差（图片随滚动微移）
   4. 页脚年份
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 1. 页脚年份 ── */
  var year = document.getElementById('year');
  if (year) { year.textContent = String(new Date().getFullYear()); }

  /* ── 2. 滚动渐入 ── */
  var reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ── 3. 导航栏滚动变色 ── */
  var nav = document.getElementById('nav');

  /* ── 4. 视差：让首屏和产品图随滚动轻微上移 ── */
  var parallaxItems = [];
  document.querySelectorAll('[data-parallax]').forEach(function (el) {
    // 作用在图片上而不是容器上，避免和 .reveal 的 transform 打架
    var target = el.querySelector('img') || el;
    var factor = parseFloat(el.getAttribute('data-parallax')) || 0;
    if (factor !== 0) {
      target.style.willChange = 'transform';
      parallaxItems.push({ el: el, target: target, factor: factor });
    }
  });

  var ticking = false;

  function onScroll() {
    if (ticking) { return; }
    ticking = true;
    window.requestAnimationFrame(function () {
      var y = window.pageYOffset || document.documentElement.scrollTop;

      if (nav) {
        if (y > 40) { nav.classList.add('scrolled'); }
        else { nav.classList.remove('scrolled'); }
      }

      if (!reduceMotion && parallaxItems.length) {
        var vh = window.innerHeight;
        parallaxItems.forEach(function (item) {
          // 元素中心相对视口中心的偏移，归一化到大约 -1 ~ 1
          var rect = item.el.getBoundingClientRect();
          var center = rect.top + rect.height / 2;
          var offset = (center - vh / 2) / vh;
          var shift = (-offset * item.factor * 100).toFixed(2);
          item.target.style.transform = 'translate3d(0, ' + shift + 'px, 0)';
        });
      }

      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();
})();
