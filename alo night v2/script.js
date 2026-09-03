/* ============================================================
   الو نایت — نسخهٔ ۲
   ⚠️ اگر شماره واتساپ را عوض کردید، مقدار زیر را هم به‌روز کنید
   (با کد کشور ۹۸، بدون صفر ابتدای شماره)
   ============================================================ */
const WHATSAPP_NUMBER = '989201972198';

const waLink = (item) =>
  'https://wa.me/' + WHATSAPP_NUMBER + '?text=' +
  encodeURIComponent('سلام الو نایت، سفارش می‌دم: ' + item);

/* ---------- لینک‌های سفارش با پیام آماده ---------- */
document.querySelectorAll('.menu-order').forEach((a) => {
  a.href = waLink(a.dataset.item);
});

/* ---------- فیلتر منو ---------- */
const pills = document.querySelectorAll('.filter-pill');
const groups = document.querySelectorAll('.menu-group');

pills.forEach((pill) => {
  pill.addEventListener('click', () => {
    pills.forEach((p) => {
      p.classList.remove('active');
      p.setAttribute('aria-selected', 'false');
    });
    pill.classList.add('active');
    pill.setAttribute('aria-selected', 'true');

    const filter = pill.dataset.filter;
    groups.forEach((group) => {
      if (filter === 'all') {
        group.style.display = '';
        return;
      }
      group.style.display = group.dataset.group === filter ? '' : 'none';
    });
  });
});

/* ---------- منوی موبایل ---------- */
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

const openMenu = () => {
  mobileMenu.classList.add('open');
  mobileMenu.setAttribute('aria-hidden', 'false');
  navToggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
};
const closeMenu = () => {
  mobileMenu.classList.remove('open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  navToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
};

navToggle.addEventListener('click', openMenu);
mobileClose.addEventListener('click', closeMenu);
mobileMenu.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
});

/* ---------- انیمیشن ظهور هنگام اسکرول ---------- */
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('in'));
}

/* ---------- هدر هنگام اسکرول ---------- */
const header = document.getElementById('siteHeader');
const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
