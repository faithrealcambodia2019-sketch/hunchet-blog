const fs = require('fs');
const path = require('path');

const books = [
  {
    slug: 'world-history',
    author: 'HUN CHET',
    title: 'World History',
    subtitle: null,
    khmer: 'ប្រវត្តិសាស្ត្រពិភពលោក',
    coverBg: ['#1b5438', '#0e3422', '#092317'],
    spineBg: ['#0b121a', '#060a0f'],
    goldAccent: '#f59e0b',
  },
  {
    slug: 'mhc-gen-01',
    author: 'HUN CHET',
    title: 'MHC Gen 01 1-2',
    subtitle: 'Translated by SamAth Em',
    khmer: 'អត្ថាធិប្បាយ លោកុប្បត្តិ ១-២',
    coverBg: ['#163566', '#0e2345', '#08152b'],
    spineBg: ['#09111e', '#040810'],
    goldAccent: '#f59e0b',
  },
  {
    slug: 'mhc-gen-03',
    author: 'HUN CHET',
    title: 'MHC Gen 03-05',
    subtitle: 'Translated by SamAth Em',
    khmer: 'អត្ថាធិប្បាយ លោកុប្បត្តិ ៣-៥',
    coverBg: ['#61182a', '#400c19', '#25060e'],
    spineBg: ['#1c050c', '#0d0205'],
    goldAccent: '#f59e0b',
  },
  {
    slug: 'matthew-henry-commentary',
    author: 'REV. MATTHEW HENRY',
    title: 'Bible Commentary',
    subtitle: 'Complete Exposition • Genesis to Revelation',
    khmer: 'អត្ថាធិប្បាយព្រះគម្ពីរទាំងមូល',
    coverBg: ['#1e2538', '#121724', '#090c13'],
    spineBg: ['#090c13', '#030508'],
    goldAccent: '#d4af37',
  },
  {
    slug: 'matthew-henry-preface',
    author: 'REV. MATTHEW HENRY',
    title: 'Preface to Vol. I',
    subtitle: 'Historical Introduction to the Scriptures',
    khmer: 'បុព្វកថាភាគទីមួយ',
    coverBg: ['#52270d', '#361807', '#1f0d03'],
    spineBg: ['#1a0b03', '#0a0401'],
    goldAccent: '#f59e0b',
  },
  {
    slug: 'khmer-english-dictionary',
    author: 'HUN CHET',
    title: 'Theological Dictionary',
    subtitle: 'Khmer • English Reference Companion',
    khmer: 'វចនានុក្រមទេវវិទ្យា',
    coverBg: ['#1c4078', '#112b54', '#0a1a33'],
    spineBg: ['#09152b', '#040a17'],
    goldAccent: '#f59e0b',
  },
  {
    slug: 'church-history-foundations',
    author: 'HUN CHET',
    title: 'Early Church History',
    subtitle: 'From Apostles to the Reformation',
    khmer: 'ប្រវត្តិក្រុមជំនុំដំបូង',
    coverBg: ['#491475', '#300b4f', '#1c052f'],
    spineBg: ['#170428', '#0a0113'],
    goldAccent: '#f59e0b',
  },
  {
    slug: 'discipleship-foundations',
    author: 'HUN CHET',
    title: 'Discipleship Essentials',
    subtitle: 'Rooted in Christ & Gospel Mission',
    khmer: 'គ្រឹះនៃការបណ្តុះសិស្ស',
    coverBg: ['#0d5242', '#07362b', '#04211a'],
    spineBg: ['#051c16', '#020d0a'],
    goldAccent: '#f59e0b',
  },
];

function generateBookSvg(b) {
  // viewBox: 0 0 320 440
  // Book width: 264, height: 396
  // Left: x=24, Top: y=18
  // Spine: x=24, y=18, w=48, h=396
  // Cover face: x=72, y=18, w=216, h=396
  // Center of cover face = 72 + 108 = 180

  const hasSub = Boolean(b.subtitle);
  const boxW = 162;
  const boxH = hasSub ? 94 : 76;
  const boxX = 180 - boxW / 2; // 99
  const boxY = 82;

  const ribY = [72, 154, 236, 318];

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 440" width="100%" height="100%">
  <defs>
    <!-- Realistic soft drop shadow -->
    <filter id="shadow-${b.slug}" x="-15%" y="-15%" width="145%" height="145%">
      <feDropShadow dx="12" dy="16" stdDeviation="14" flood-color="#020617" flood-opacity="0.36"/>
      <feDropShadow dx="3" dy="5" stdDeviation="5" flood-color="#020617" flood-opacity="0.2"/>
    </filter>

    <!-- Cover leather gradient -->
    <linearGradient id="coverGrad-${b.slug}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${b.coverBg[0]}"/>
      <stop offset="50%" stop-color="${b.coverBg[1]}"/>
      <stop offset="100%" stop-color="${b.coverBg[2]}"/>
    </linearGradient>

    <!-- Spine gradient with cylindrical 3D curve -->
    <linearGradient id="spineGrad-${b.slug}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${b.spineBg[1]}"/>
      <stop offset="25%" stop-color="${b.spineBg[0]}"/>
      <stop offset="70%" stop-color="${b.spineBg[0]}"/>
      <stop offset="95%" stop-color="${b.spineBg[1]}"/>
      <stop offset="100%" stop-color="#000000"/>
    </linearGradient>

    <!-- Spine hinge groove shadow -->
    <linearGradient id="grooveGrad-${b.slug}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="rgba(0,0,0,0.85)"/>
      <stop offset="35%" stop-color="rgba(0,0,0,0.45)"/>
      <stop offset="70%" stop-color="rgba(255,255,255,0.08)"/>
      <stop offset="100%" stop-color="transparent"/>
    </linearGradient>

    <!-- Raised 3D gold rib gradient -->
    <linearGradient id="ribGrad-${b.slug}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fffbeb"/>
      <stop offset="25%" stop-color="#fde047"/>
      <stop offset="60%" stop-color="#d97706"/>
      <stop offset="100%" stop-color="#78350f"/>
    </linearGradient>

    <!-- Gold Foil Gradient for Stamp Frame & Author Text -->
    <linearGradient id="goldFoil-${b.slug}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef9c3"/>
      <stop offset="25%" stop-color="#facc15"/>
      <stop offset="50%" stop-color="#d97706"/>
      <stop offset="75%" stop-color="#fde047"/>
      <stop offset="100%" stop-color="#b45309"/>
    </linearGradient>

    <!-- Page block trim gradient on right -->
    <linearGradient id="pageGrad-${b.slug}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#e2ded4"/>
      <stop offset="30%" stop-color="#fffef9"/>
      <stop offset="60%" stop-color="#ddd6c6"/>
      <stop offset="100%" stop-color="#b5ab96"/>
    </linearGradient>

    <!-- Hardcover surface lighting reflection -->
    <linearGradient id="sheenGrad-${b.slug}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.18)"/>
      <stop offset="25%" stop-color="rgba(255,255,255,0.06)"/>
      <stop offset="60%" stop-color="transparent"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0.2)"/>
    </linearGradient>
  </defs>

  <!-- Drop Shadow Wrap -->
  <g filter="url(#shadow-${b.slug})">
    <!-- Right Physical Page Block (Paper Thickness) -->
    <path d="M 288 24 L 298 29 L 298 418 L 288 412 Z" fill="url(#pageGrad-${b.slug})"/>
    <line x1="298" y1="29" x2="298" y2="418" stroke="#998e7b" stroke-width="0.8"/>
    <line x1="293" y1="27" x2="293" y2="415" stroke="rgba(0,0,0,0.1)" stroke-width="0.6"/>

    <!-- Bottom Page Edge -->
    <path d="M 68 412 L 288 412 L 298 418 L 74 418 Z" fill="#c4bcab"/>

    <!-- Front Hardcover Shell -->
    <rect x="24" y="18" width="264" height="396" rx="4" fill="url(#coverGrad-${b.slug})"/>

    <!-- Left Black Spine (Classic Binding) -->
    <path d="M 24 18 L 70 18 L 70 414 L 24 414 Z" fill="url(#spineGrad-${b.slug})"/>

    <!-- 4 Raised Gold Embossed Ribs on Spine -->
    ${ribY.map(y => `
      <g>
        <rect x="22" y="${y + 4}" width="48" height="3" rx="1.5" fill="rgba(0,0,0,0.7)"/>
        <rect x="22" y="${y}" width="48" height="5.5" rx="1.8" fill="url(#ribGrad-${b.slug})"/>
        <line x1="23" y1="${y + 1}" x2="69" y2="${y + 1}" stroke="#ffffff" stroke-width="0.75" stroke-opacity="0.85"/>
        <line x1="23" y1="${y + 2.5}" x2="69" y2="${y + 2.5}" stroke="rgba(255,255,255,0.4)" stroke-width="0.5"/>
      </g>
    `).join('')}

    <!-- Spine Hinge Crease Shadow -->
    <rect x="66" y="18" width="10" height="396" fill="url(#grooveGrad-${b.slug})"/>

    <!-- Subtle Blind Embossed Border Line on Cover Face -->
    <rect x="80" y="28" width="198" height="376" rx="2" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>

    <!-- ============================================================== -->
    <!-- REAL GOLD BOXED LABEL STAMP (MATCHING REFERENCE EXACTLY!)     -->
    <!-- ============================================================== -->
    <g transform="translate(${boxX}, ${boxY})">
      <!-- Box Background with subtle recess -->
      <rect x="0" y="0" width="${boxW}" height="${boxH}" rx="2" 
            fill="rgba(0,0,0,0.28)" 
            stroke="url(#goldFoil-${b.slug})" 
            stroke-width="1.8"/>

      <!-- Inner Fine Gold Inset Frame -->
      <rect x="3.5" y="3.5" width="${boxW - 7}" height="${boxH - 7}" rx="1" 
            fill="none" 
            stroke="url(#goldFoil-${b.slug})" 
            stroke-width="0.7" 
            stroke-opacity="0.8"/>

      <!-- Corner Accent Squares -->
      <rect x="5.5" y="5.5" width="2.5" height="2.5" fill="url(#goldFoil-${b.slug})"/>
      <rect x="${boxW - 8}" y="5.5" width="2.5" height="2.5" fill="url(#goldFoil-${b.slug})"/>
      <rect x="5.5" y="${boxH - 8}" width="2.5" height="2.5" fill="url(#goldFoil-${b.slug})"/>
      <rect x="${boxW - 8}" y="${boxH - 8}" width="2.5" height="2.5" fill="url(#goldFoil-${b.slug})"/>

      <!-- Author: HUN CHET / REV. MATTHEW HENRY -->
      <text x="${boxW / 2}" y="22" 
            text-anchor="middle" 
            fill="url(#goldFoil-${b.slug})" 
            font-family="'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif" 
            font-size="9.5" 
            font-weight="800" 
            letter-spacing="2.2">
        ${b.author}
      </text>

      <!-- Thin Gold Separator Line -->
      <line x1="${boxW / 2 - 36}" y1="29" x2="${boxW / 2 + 36}" y2="29" 
            stroke="url(#goldFoil-${b.slug})" 
            stroke-width="0.7" 
            stroke-opacity="0.8"/>

      <!-- Main Book Title -->
      <text x="${boxW / 2}" y="${hasSub ? 49 : 52}" 
            text-anchor="middle" 
            fill="#ffffff" 
            font-family="'Plus Jakarta Sans', -apple-system, sans-serif" 
            font-size="${b.title.length > 18 ? 12.5 : 14.5}" 
            font-weight="700" 
            letter-spacing="0.4">
        ${b.title}
      </text>

      ${hasSub ? `
      <!-- Subtitle (e.g. Translated by SamAth Em) -->
      <text x="${boxW / 2}" y="67" 
            text-anchor="middle" 
            fill="#cbd5e1" 
            font-family="'Plus Jakarta Sans', 'Inter', sans-serif" 
            font-size="7.5" 
            font-weight="600" 
            letter-spacing="0.5">
        ${b.subtitle}
      </text>
      ` : ''}

      <!-- Khmer Identification Text -->
      <text x="${boxW / 2}" y="${hasSub ? 83 : 67}" 
            text-anchor="middle" 
            fill="url(#goldFoil-${b.slug})" 
            font-family="'Koh Santepheap', 'Kantumruy Pro', sans-serif" 
            font-size="8.5" 
            font-weight="600"
            fill-opacity="0.95">
        ${b.khmer}
      </text>
    </g>

    <!-- Classic Publisher Emblem at Cover Bottom -->
    <g transform="translate(180, 366)" stroke="url(#goldFoil-${b.slug})" stroke-width="0.75" stroke-opacity="0.6">
      <line x1="-28" y1="0" x2="28" y2="0"/>
      <circle cx="0" cy="0" r="2.2" fill="url(#goldFoil-${b.slug})"/>
    </g>

    <!-- Hardcover Glare Overlay (Realistic Satin Shine) -->
    <rect x="24" y="18" width="264" height="396" rx="4" fill="url(#sheenGrad-${b.slug})" pointer-events="none"/>
  </g>
</svg>`;
}

const outDir = path.join(__dirname, '../public/images/books');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

books.forEach((b) => {
  const filePath = path.join(outDir, `cover-${b.slug}.svg`);
  fs.writeFileSync(filePath, generateBookSvg(b), 'utf8');
  console.log(`Generated: ${filePath}`);
});

console.log('All 8 covers re-generated with perfect proportions!');
