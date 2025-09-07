const root = document.documentElement;
const app = document.getElementById('app');

const CONTACT_EMAIL = (window.CONTACT_EMAIL && typeof window.CONTACT_EMAIL === 'string')
  ? window.CONTACT
  : 'deepak.parashar@example.com';

// Shared biodata used for screen and print
const BIODATA = {
  name: 'Deepak Parashar',
  place: 'Nagpur, Maharashtra, India',
  position: 'Senior Manager',
  company: 'Adani Power Pvt Ltd',
  father: 'Sanjay Kumar Shastri',
  mother: 'Vibha Devi',
  sibling: 'Ujjawal Kumar (Software Engineer, Deloitte)',
  address: 'Parashar Bhawan, Vill + Post: Sisai, P.S: Goreyakothi, Dist: Siwan, State: Bihar, Pincode: 841506',
  dob: '11 October 1994',
  phone: '+91 9650769277',
};

const GALLERY_IMAGES = [
  './assets/photo-1.jpeg',
  './assets/photo-2.jpeg',
  './assets/photo-3.jpeg',
  './assets/photo-4.jpeg',
  './assets/photo-5.jpeg',
];

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === 'class') node.className = v;
    else if (k === 'disabled' && v) node.setAttribute('disabled', '');
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2).toLowerCase(), v);
    else if (v !== null && v !== undefined) node.setAttribute(k, v);
  });
  children.forEach((c) => node.append(c));
  return node;
}

function header() {
  return el('div', { class: 'container' },
    el('div', { class: 'header' },
      el('div', { class: 'logo' }, el('div', { class: 'dot' }), el('span', {}, 'Welcome to the Page,')),
      el('img', { class: 'header-center-img', src: './assets/shree-ganeshay-namah.jpg', alt: 'Shree Ganeshay Namah'}),
      el('div', {},
        // Direct download of bundled PDF
        el('a', { class: 'btn primary glow pulse', href: './assets/marriage-biodata.pdf', download: 'Deepak-Parashar-Biodata.pdf' }, 'Download PDF')
      )
    )
  );
}

function heroSection() {
  // Hero with name, tagline and subtle floating background particles
  const floating = el('div', { class: 'floating-bg' });
  // Floating particles and hearts
  for (let i = 0; i < 12; i++) floating.append(el('span', { class: 'float-dot', style: `--i:${i}` }));
  for (let i = 0; i < 6; i++) floating.append(el('span', { class: 'float-heart', style: `--i:${i}` }));

  // Sparkle layer (random positions/durations)
  const sparkles = el('div', { class: 'sparkle-layer' });
  for (let i = 0; i < 20; i++) {
    const s = el('span', { class: 'sparkle' });
    s.style.top = Math.random() * 90 + '%';
    s.style.left = Math.random() * 90 + '%';
    s.style.animationDuration = (1.8 + Math.random() * 2).toFixed(2) + 's';
    s.style.animationDelay = (Math.random() * 2).toFixed(2) + 's';
    sparkles.append(s);
  }

  return el('section', { id: 'hero', class: 'section hero-portfolio reveal fade-in-up' },
    el('div', { class: 'heartbeat-bg' }),
    floating,
    sparkles,
    el('div', { class: 'particle-layer', id: 'hero-particles' }),
    el('div', { class: 'hero-inner' },
      el('h1', { class: 'hero-name shimmer-text' }, BIODATA.name),
      el('p', { class: 'hero-tag' }, 'Elegant • Family-Oriented • Gentleman • Disciplined'),
      el('p', { class: 'hero-meta' }, `${BIODATA.position}, ${BIODATA.company}`)
    ),
    waveDivider()
  );
}

function aboutSection() {
  // About me with photo and short description + slide/zoom effects
  return el('section', { id: 'about', class: 'section reveal fade-in-left' },
    el('div', { class: 'bokeh-layer', id: 'about-bokeh' }),
    el('div', { class: 'grid about-grid' },
      el('div', { class: 'slide-in' },
        el('label', { class: 'label' }, 'About Me'),
        el('h3', {}, 'A bit about me'),
        el('p', { class: 'p' }, `I was born and raised in Sisai, Siwan, Bihar, in a family where sincerity, compassion, and respect for others are deeply valued. Currently, I am working as a Senior Manager at Adani Power Pvt. Ltd. While I remain dedicated to my profession, I strongly believe that true happiness lies in family, togetherness, and shared values.

I enjoy spending time with loved ones and upholding our traditions, as I believe they form the foundation of a strong and harmonious life. I aspire to build a home filled with warmth, respect, and joy, where both families feel equally valued and cherished. With the blessings of elders and the support of a life partner, I look forward to creating a journey rooted in love, trust, and cultural values.`),
        el('div', { class: 'facts-mini' },
          el('div', { class: 'mini-row' }, el('span', { class: 'mini-label' }, 'Date of Birth: '), `${BIODATA.dob}`),
          el('div', { class: 'mini-row' }, el('span', { class: 'mini-label' }, 'Phone: '), `${BIODATA.phone}`)
        )
      ),
      el('div', {},
        el('img', { class: 'img about-photo pixel-perfect', src: GALLERY_IMAGES[0], alt: 'Profile photo', onClick: () => openLightbox(0) })
      )
    )
  );
}

function statsSection() {
  // Simple details cards with flip on hover
  const cards = el('div', { class: 'grid' },
    // Date of Birth card
    el('div', { class: 'card stat-card flip-card' },
      el('div', { class: 'flip-inner' },
        el('div', { class: 'flip-front' },
          el('h4', {}, 'Date of Birth'),
          el('p', { class: 'p' }, BIODATA.dob)
        ),
        el('div', { class: 'flip-back' }, 'Date of Birth')
      )
    ),
    // Location card
    el('div', { class: 'card stat-card flip-card' },
      el('div', { class: 'flip-inner' },
        el('div', { class: 'flip-front' },
          el('h4', {}, 'Location'),
          el('p', { class: 'p' }, BIODATA.place)
        ),
        el('div', { class: 'flip-back' }, 'Location')
      )
    ),
    // Contact Number card
    el('div', { class: 'card stat-card flip-card' },
      el('div', { class: 'flip-inner' },
        el('div', { class: 'flip-front' },
          el('h4', {}, 'Contact Number'),
          el('p', { class: 'p' }, BIODATA.phone)
        ),
        el('div', { class: 'flip-back' }, 'Contact Number')
      )
    )
  );

  return el('section', { id: 'stats', class: 'section reveal' },
    el('label', { class: 'label' }, 'Details'),
    cards
  );
}

function familySection() {
  // Use all family details used so far as cards with zoom/tilt hover and rotate-in
  const members = [
    { title: 'Father', desc: BIODATA.father },
    { title: 'Mother', desc: BIODATA.mother },
    { title: 'Sibling', desc: BIODATA.sibling },
    { title: 'Address', desc: BIODATA.address },
  ];

  const variants = ['anim-flip', 'anim-flip', 'anim-flip', 'anim-flip'];
  return el('section', { id: 'family', class: 'section reveal rotate-in' },
    el('div', { class: 'particle-layer', id: 'family-particles' }),
    el('div', { class: 'family-head' },
      el('span', { class: 'badge' }, 'Family Details'),
      el('h3', {}, 'My Family')
    ),
    el('div', { class: 'grid family-grid' },
      ...members.map((m, i) =>
        el('div', { class: `card family-card flip-card reveal ${variants[i % variants.length]}`, style: `--d:${i * 120}ms` },
          el('div', { class: 'flip-inner' },
            el('div', { class: 'flip-front' },
              el('h4', {}, m.title),
              el('p', { class: m.title === 'Address' ? 'p no-clamp' : 'p' }, m.desc)
            ),
            el('div', { class: 'flip-back' }, m.title)
          )
        )
      )
    ),
    waveDivider()
  );
}

// Contact section removed as requested



function whatsappFab() {
  const number = (window.WHATSAPP_NUMBER || '').replace(/\D/g, '');
  const text = encodeURIComponent(window.WHATSAPP_TEXT || 'Hello');
  const href = number ? `https://wa.me/${number}?text=${text}` : `https://wa.me/?text=${text}`;
  // Inline SVG (no external request). White WhatsApp glyph + heartbeat
  const icon = el('img', {
    class: 'heartbeat',
    src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23FFFFFF'><path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.672.15-.198.297-.768.967-.94 1.166-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.672-1.619-.922-2.219-.242-.58-.487-.5-.672-.51-.173-.01-.372-.012-.571-.012-.198 0-.52.074-.793.372-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.413-.074-.123-.272-.198-.57-.347m-5.421 7.617h-.001a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.246c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.87 11.87 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.49-8.413Z'/></svg>",
    alt: 'WhatsApp',
    width: 28,
    height: 28,
    decoding: 'async',
    loading: 'lazy'
  });
  return el('a', { class: 'whatsapp-fab', href, target: '_blank', rel: 'noopener noreferrer', title: 'Chat on WhatsApp' }, icon);
}

function waveDivider() {
  return el('div', { class: 'wave-wrap' },
    el('svg', { class: 'wave', viewBox: '0 0 1440 60', xmlns: 'http://www.w3.org/2000/svg', preserveAspectRatio: 'none' },
      el('path', { d: 'M0,30 C180,50 360,10 540,20 C720,30 900,55 1080,35 C1260,15 1440,30 1440,30 L1440,60 L0,60 Z' })
    )
  );
}

function footer() {
  const year = new Date().getFullYear();
  return el('div', { class: 'footer' }, `© ${year} Deepak Parashar · Marriage Biodata`);
}

function confettiBurst(anchorEl) {
  // Create layer once
  let layer = document.getElementById('confetti-layer');
  if (!layer) {
    layer = el('div', { id: 'confetti-layer' });
    document.body.appendChild(layer);
  }
  const rect = anchorEl.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const colors = ['#e0617f','#f2c94c','#ff9aae','#ffd6e0','#fff'];
  for (let i = 0; i < 24; i++) {
    const c = el('span', { class: 'confetti' });
    c.style.left = cx + 'px';
    c.style.top = cy + 'px';
    const ang = Math.random() * Math.PI * 2;
    const dist = 120 + Math.random() * 120;
    c.style.setProperty('--dx', Math.cos(ang) * dist);
    c.style.setProperty('--dy', Math.sin(ang) * dist);
    c.style.background = colors[i % colors.length];
    layer.appendChild(c);
    setTimeout(() => c.remove(), 1400);
  }
}

function showToast(message, variant = 'info', duration = 3000) {
  // Ensure container exists
  let cont = document.getElementById('toast-container');
  if (!cont) {
    cont = document.createElement('div');
    cont.id = 'toast-container';
    cont.style.position = 'fixed';
    cont.style.right = '16px';
    cont.style.bottom = '16px';
    cont.style.zIndex = '9999';
    cont.style.display = 'flex';
    cont.style.flexDirection = 'column';
    cont.style.alignItems = 'flex-end';
    document.body.appendChild(cont);
  }
  const palette = {
    success: '#1B5E20',
    info: '#0D47A1',
    warning: '#E65100',
    error: '#B71C1C'
  };
  const bg = palette[variant] || palette.info;
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.position = 'relative';
  toast.style.marginTop = '8px';
  toast.style.padding = '10px 14px';
  toast.style.borderRadius = '8px';
  toast.style.background = bg;
  toast.style.color = '#fff';
  toast.style.boxShadow = '0 8px 24px rgba(0,0,0,.2)';
  toast.style.opacity = '0';
  toast.style.transform = 'translateY(6px)';
  toast.style.transition = 'opacity .2s ease, transform .2s ease';
  cont.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(6px)';
    setTimeout(() => toast.remove(), 200);
  }, duration);
}

function printOnlySection() {
  // Minimal one-pager for PDF: black text, simple layout
  const wrap = el('div', { id: 'print-only' });
  wrap.append(
    el('h1', {}, BIODATA.name),
    el('p', {}, `${BIODATA.position}, ${BIODATA.company}`),
    el('p', {}, `Place: ${BIODATA.place}`),
    el('p', {}, `Date of Birth: ${BIODATA.dob}`),
    el('p', {}, `Contact Number: ${BIODATA.phone}`),
    el('p', {}, `Address: ${BIODATA.address}`),
    el('p', {}, `Father: ${BIODATA.father}`),
    el('p', {}, `Mother: ${BIODATA.mother}`),
    el('p', {}, `Younger Brother: ${BIODATA.sibling}`),
    // Photo comes last
    el('img', { id: 'print-photo', src: GALLERY_IMAGES[0], alt: 'Photo' }),
  );
  return wrap;
}

let LB_INDEX = 0;
let LB_SCALE = 1;

function lightbox() {
  const overlay = el('div', { id: 'lightbox', class: 'lightbox', role: 'dialog', 'aria-modal': 'true', style: 'display:none;' },
    el('div', { class: 'lightbox-backdrop', onClick: closeLightbox }),
    el('div', { class: 'lightbox-content' },
      el('img', { id: 'lightbox-img', alt: 'Zoomed photo', style: 'transform: scale(1); cursor: grab;' }),
      el('div', { class: 'lightbox-controls' },
        el('button', { class: 'lb-btn', onClick: prevImage, 'aria-label': 'Previous image' }, '‹'),
        el('button', { class: 'lb-btn', onClick: zoomOut, 'aria-label': 'Zoom out' }, '−'),
        el('button', { class: 'lb-btn', onClick: resetZoom, 'aria-label': 'Reset zoom' }, '⤾'),
        el('button', { class: 'lb-btn', onClick: zoomIn, 'aria-label': 'Zoom in' }, '+'),
        el('button', { class: 'lb-btn', onClick: nextImage, 'aria-label': 'Next image' }, '›'),
      ),
      el('button', { class: 'lightbox-close', onClick: closeLightbox, 'aria-label': 'Close' }, '×')
    )
  );
  document.body.appendChild(overlay);
}

function openLightbox(srcOrIndex = 0) {
  const img = document.getElementById('lightbox-img');
  const box = document.getElementById('lightbox');
  if (!img || !box) return;
  // set index from src or direct number
  if (typeof srcOrIndex === 'number') {
    LB_INDEX = (srcOrIndex + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
  } else if (typeof srcOrIndex === 'string') {
    // Open arbitrary image (not in gallery)
    LB_INDEX = -1;
  } else {
    LB_INDEX = 0;
  }
  LB_SCALE = 1; // reset zoom on open
  img.style.transform = `scale(${LB_SCALE})`;
  img.src = typeof srcOrIndex === 'string' ? srcOrIndex : GALLERY_IMAGES[LB_INDEX];
  box.style.display = 'grid';
}

function closeLightbox() {
  const box = document.getElementById('lightbox');
  if (box) box.style.display = 'none';
}

function nextImage() {
  LB_INDEX = (LB_INDEX + 1) % GALLERY_IMAGES.length;
  updateLightboxImage();
}

function prevImage() {
  LB_INDEX = (LB_INDEX - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
  updateLightboxImage();
}

function updateLightboxImage() {
  const img = document.getElementById('lightbox-img');
  if (!img) return;
  img.src = GALLERY_IMAGES[LB_INDEX];
}

function zoomIn() {
  setZoom(LB_SCALE + 0.2);
}

function zoomOut() {
  setZoom(LB_SCALE - 0.2);
}

function resetZoom() {
  setZoom(1);
}

function setZoom(val) {
  const img = document.getElementById('lightbox-img');
  if (!img) return;
  LB_SCALE = Math.min(4, Math.max(0.5, val));
  img.style.transform = `scale(${LB_SCALE})`;
}

function bindEscClose() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

function initScrollReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('revealed');
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(elm => io.observe(elm));
}

function startFlowerShower() {
  // Create a container overlay once (behind content)
  let layer = document.getElementById('flower-layer');
  if (!layer) {
    layer = el('div', { id: 'flower-layer', style: 'z-index:0' });
    document.body.appendChild(layer);
  }
  // Periodically add petals with random positions and durations
  const createPetal = () => {
    const p = el('span', { class: 'heart petal' });
    p.style.left = Math.random() * 100 + 'vw';
    p.style.animationDuration = (8 + Math.random() * 8).toFixed(2) + 's';
    p.style.opacity = (0.2 + Math.random() * 0.2).toFixed(2);
    p.style.transform = `scale(${0.6 + Math.random() * 0.8})`;
    layer.appendChild(p);
    // Remove after animation ends
    setTimeout(() => p.remove(), 17000);
  };
  // Burst at start
  for (let i = 0; i < 14; i++) setTimeout(createPetal, i * 140);
  // Gentle continuous petals
  return setInterval(createPetal, 900);
}

function render() {
  app.innerHTML = '';
  app.append(
    header(),
    el('div', { class: 'container' },
      heroSection(),
      aboutSection(),
      statsSection(),
      familySection(),
      printOnlySection(),
      footer(),
    ),
    whatsappFab(),
  );
  if (!document.getElementById('lightbox')) lightbox();
  bindEscClose();
  initScrollReveal();
  startFlowerShower();

  // Populate background effects
  seedParticles('hero-particles', 28);
  seedParticles('family-particles', 20);
  seedBokeh('about-bokeh', 10);
}

function seedParticles(layerId, count) {
  const layer = document.getElementById(layerId);
  if (!layer) return;
  for (let i = 0; i < count; i++) {
    const p = el('span', { class: 'particle' });
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.setProperty('--pDur', (8 + Math.random() * 6).toFixed(2) + 's');
    layer.appendChild(p);
  }
}

function seedBokeh(layerId, count) {
  const layer = document.getElementById(layerId);
  if (!layer) return;
  for (let i = 0; i < count; i++) {
    const b = el('span', { class: 'bokeh' });
    const size = 60 + Math.random() * 120; // 60–180px
    b.style.left = Math.random() * 90 + '%';
    b.style.top = Math.random() * 80 + '%';
    b.style.setProperty('--s', size + 'px');
    b.style.setProperty('--dur', (7 + Math.random() * 6).toFixed(2) + 's');
    layer.appendChild(b);
  }
}

render();