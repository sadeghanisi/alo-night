/* ============================================================
   الو نایت — اسکریپت‌ها
   ⚠️ اگر شماره واتساپ را عوض کردید، مقدار زیر را هم به‌روز کنید
   (با کد کشور ۹۸، بدون صفر ابتدای شماره)
   ============================================================ */
const WHATSAPP_NUMBER = '989201972198';

const waLink = (item) => {
  const text = item
    ? `سلام، سفارش می‌دم: ${item}`
    : 'سلام، سفارش قلیون دارم';
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
};

/* ---------- لینک واتساپ آیتم‌های منو ---------- */
document.querySelectorAll('.menu-order').forEach((link) => {
  link.href = waLink(link.dataset.item || '');
});

/* ---------- هدر: سایه هنگام اسکرول ---------- */
const header = document.getElementById('siteHeader');
const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- منوی موبایل ---------- */
const mobileMenu = document.getElementById('mobileMenu');
const navToggle = document.getElementById('navToggle');
const mobileClose = document.getElementById('mobileClose');

const openMenu = () => {
  mobileMenu.classList.add('open');
  document.body.classList.add('menu-open');
  navToggle.setAttribute('aria-expanded', 'true');
  mobileMenu.setAttribute('aria-hidden', 'false');
};
const closeMenu = () => {
  mobileMenu.classList.remove('open');
  document.body.classList.remove('menu-open');
  navToggle.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
};

navToggle.addEventListener('click', openMenu);
mobileClose.addEventListener('click', closeMenu);
mobileMenu.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));

/* ---------- فیلتر منو ---------- */
const filterPills = document.querySelectorAll('.filter-pill');
const menuCards = document.querySelectorAll('.menu-card');

filterPills.forEach((pill) => {
  pill.addEventListener('click', () => {
    filterPills.forEach((p) => {
      p.classList.remove('active');
      p.setAttribute('aria-selected', 'false');
    });
    pill.classList.add('active');
    pill.setAttribute('aria-selected', 'true');

    const filter = pill.dataset.filter;
    menuCards.forEach((card) => {
      const show = filter === 'all' || card.classList.contains(filter);
      card.classList.toggle('hidden', !show);
    });
  });
});

/* ---------- انیمیشن ظهور هنگام اسکرول ---------- */
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('in'));
}
