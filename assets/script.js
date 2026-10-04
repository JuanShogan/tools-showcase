/* ═══════════════════════════════════════════════════════════
   我的工具作品集 · 交互脚本（无依赖）
   1. 滚动入场动画
   2. 自动更新页脚年份
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── 页脚年份自动更新 ── */
  var y = document.getElementById('year');
  if (y) { y.textContent = String(new Date().getFullYear()); }

  /* ── 滚动入场动画 ── */
  var targets = document.querySelectorAll(
    '.featured, .grid .card, .about, .sec-title, .sec-sub'
  );
  targets.forEach(function (el) { el.classList.add('reveal'); });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);   // 出现一次就不再管，省性能
        }
      });
    }, { threshold: 0.08 });

    targets.forEach(function (el) { io.observe(el); });
  } else {
    // 老浏览器兜底：直接全部显示
    targets.forEach(function (el) { el.classList.add('visible'); });
  }
})();
