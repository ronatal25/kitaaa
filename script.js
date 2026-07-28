// ===================== AMBIENT FLOATING HEARTS =====================
const heartsField = document.getElementById('heartsField');
function spawnHeart(){
  const heart = document.createElement('span');
  heart.className = 'heart-particle';
  heart.textContent = '♥';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.setProperty('--drift', (Math.random() * 80 - 40) + 'px');
  heart.style.fontSize = (12 + Math.random() * 14) + 'px';
  const duration = 8 + Math.random() * 6;
  heart.style.animationDuration = duration + 's';
  heartsField.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000);
}
setInterval(spawnHeart, 900);
for (let i = 0; i < 5; i++) setTimeout(spawnHeart, i * 300);

// ===================== ENVELOPE INTRO =====================
const envelope = document.getElementById('envelope');
const envelopeScreen = document.getElementById('envelopeScreen');
const book = document.getElementById('book');

envelope.addEventListener('click', openEnvelope);
envelope.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' || e.key === ' ') openEnvelope();
});

let opened = false;
function openEnvelope(){
  if (opened) return;
  opened = true;
  envelope.classList.add('open');
  setTimeout(() => {
    envelopeScreen.classList.add('hidden');
    book.classList.add('visible');
    document.body.style.overflow = 'auto';
  }, 1400);
}

// lock scroll until envelope opens
document.body.style.overflow = 'hidden';

// ===================== FILTER CHIPS =====================
const chips = document.querySelectorAll('.chip');
const polaroids = document.querySelectorAll('.polaroid');

chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const filter = chip.dataset.filter;
    polaroids.forEach(p => {
      const match = filter === 'all' || p.dataset.filter === filter;
      p.classList.toggle('hide', !match);
    });
  });
});

// ===================== LIGHTBOX =====================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

const gridImages = Array.from(document.querySelectorAll('.polaroid'));
let currentIndex = 0;

function openLightbox(index){
  const visible = gridImages.filter(p => !p.classList.contains('hide'));
  const target = gridImages[index];
  currentIndex = index;
  const img = target.querySelector('img');
  const caption = target.querySelector('figcaption').textContent;
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCaption.textContent = caption;
  lightbox.classList.add('active');
}

function closeLightbox(){
  lightbox.classList.remove('active');
}

function showRelative(step){
  let next = currentIndex;
  do {
    next = (next + step + gridImages.length) % gridImages.length;
  } while (gridImages[next].classList.contains('hide') && next !== currentIndex);
  openLightbox(next);
}

gridImages.forEach((p, i) => {
  p.addEventListener('click', () => openLightbox(i));
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => showRelative(-1));
lightboxNext.addEventListener('click', () => showRelative(1));
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showRelative(-1);
  if (e.key === 'ArrowRight') showRelative(1);
});

// ===================== FLIPBOOK / BUKU CERITA =====================
const fpages = Array.from(document.querySelectorAll('.fpage'));
const fpPrev = document.getElementById('fpPrev');
const fpNext = document.getElementById('fpNext');
const fpIndicator = document.getElementById('fpIndicator');
let fpIndex = 0;

function renderFlipbook(){
  fpages.forEach((p, i) => p.classList.toggle('active', i === fpIndex));
  fpIndicator.textContent = `${fpIndex + 1} / ${fpages.length}`;
  fpPrev.disabled = fpIndex === 0;
  fpNext.disabled = fpIndex === fpages.length - 1;
}

if (fpages.length){
  renderFlipbook();
  fpPrev.addEventListener('click', () => {
    if (fpIndex > 0) { fpIndex--; renderFlipbook(); }
  });
  fpNext.addEventListener('click', () => {
    if (fpIndex < fpages.length - 1) { fpIndex++; renderFlipbook(); }
  });
}

// ===================== MUSIC TOGGLE =====================
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
let playing = false;

musicToggle.addEventListener('click', () => {
  if (!playing) {
    bgMusic.play().catch(() => {
      // browser blocked autoplay-like behavior without prior interaction; ignore
    });
    musicToggle.classList.add('playing');
    playing = true;
  } else {
    bgMusic.pause();
    musicToggle.classList.remove('playing');
    playing = false;
  }
});
