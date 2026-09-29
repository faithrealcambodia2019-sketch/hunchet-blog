// 365-Day Complete Devotional Journey & 500 Scripture Verses for All Nations Church
// Sourced 100% authentically from the 1954/1962 Old Khmer Version (United Bible Societies)
// គ្មានការកែប្រែ ឬកាត់បន្ថយតួអក្សរណាមួយឡើយ (Verbatim Scripture Preservation).

import { FAMOUS_KHMER_VERSES } from './famousKhmerVersesData.js';

export const YEAR_MONTHS = [
  {
    month: 1,
    name: { km: 'មករា', en: 'January', ko: '1월' },
    days: 31,
    theme: { km: 'ការចាប់ផ្តើមថ្មី និងការតាំងចិត្តក្នុងជំនឿ', en: 'New Beginnings & Firm Faith', ko: '새로운 시작과 굳건한 믿음' },
    description: {
      km: 'បោះបង់ចោលកង្វល់ និងកំហុសក្នុងអតីតកាល រួចដើរទៅមុខក្នុងឆ្នាំថ្មីដោយការទុកចិត្តលើការដឹកនាំរបស់ព្រះ។',
      en: 'Leave past regrets behind and step forward into the new year with trust in God’s guidance.'
    },
    accent: 'blue'
  },
  {
    month: 2,
    name: { km: 'កុម្ភៈ', en: 'February', ko: '2월' },
    days: 28,
    theme: { km: 'សេចក្តីស្រឡាញ់របស់ព្រះ និងការរស់នៅជាគ្រួសារ', en: 'God’s Love & Family Fellowship', ko: '하나님의 사랑과 가족 공동체' },
    description: {
      km: 'ស្គាល់ជម្រៅនៃសេចក្តីស្រឡាញ់ដ៏អស្ចារ្យរបស់ព្រះយេស៊ូវ និងរៀនស្រឡាញ់ យោគយល់ និងអត់ទោសដល់មនុស្សជុំវិញខ្លួន។',
      en: 'Experience the unconditional love of Christ and learn to love, forgive, and care for those around you.'
    },
    accent: 'rose'
  },
  {
    month: 3,
    name: { km: 'មីនា', en: 'March', ko: '3월' },
    days: 31,
    theme: { km: 'កម្លាំង និងសេចក្តីក្លាហានក្នុងឧបសគ្គ', en: 'Strength & Courage in Trials', ko: '환난 중의 힘과 거룩한 담대함' },
    description: {
      km: 'ព្រះជាជំរកដ៏រឹងមាំ។ ទោះបីជួបបញ្ហាប្រឈមក្នុងជីវិត ការរៀន ឬការងារ ក៏យើងមិនត្រូវភ័យខ្លាចឡើយ។',
      en: 'The Lord is our refuge and fortress. Stand bold in the face of life’s mountains and academic trials.'
    },
    accent: 'amber'
  },
  {
    month: 4,
    name: { km: 'មេសា', en: 'April', ko: '4월' },
    days: 30,
    theme: { km: 'ព្រះគុណនៃឈើឆ្កាង និងជីវិតរស់ឡើងវិញ', en: 'Grace of the Cross & Resurrection Power', ko: '십자가의 은혜와 부활의 능력' },
    description: {
      km: 'ការលះបង់ដ៏អស្ចារ្យរបស់ព្រះយេស៊ូវលើឈើឆ្កាងបានរំដោះយើងឱ្យមានសេរីភាព និងជីវិតថ្មីដែលពោរពេញដោយក្តីសង្ឃឹម។',
      en: 'Jesus gave His life on the cross to set us free. Walk in the glorious victory of His resurrection.'
    },
    accent: 'purple'
  },
  {
    month: 5,
    name: { km: 'ឧសភា', en: 'May', ko: '5월' },
    days: 31,
    theme: { km: 'សេចក្តីសុខសាន្ត និងការឈ្នះការថប់បារម្ភ', en: 'Supernatural Peace & Overcoming Anxiety', ko: '초자연적 평안과 염려의 극복' },
    description: {
      km: 'ប្តូរការភ័យខ្លាច និងការគិតច្រើន មកជាការអធិស្ឋាន ហើយទទួលយកសេចក្តីសុខសាន្តពីស្ថានសួគ៌។',
      en: 'Exchange panic and overthinking for sincere prayer, resting in the peace that surpasses understanding.'
    },
    accent: 'emerald'
  },
  {
    month: 6,
    name: { km: 'មិថុនា', en: 'June', ko: '6월' },
    days: 30,
    theme: { km: 'ប្រាជ្ញា និងការដើរក្នុងផ្លូវសុចរិត', en: 'Divine Wisdom & Righteous Living', ko: '하나님의 지혜와 의로운 삶' },
    description: {
      km: 'ការកោតខ្លាចដល់ព្រះជាដើមចមនៃប្រាជ្ញា។ រៀនសម្រេចចិត្តដោយឈ្លាសវៃតាមការណែនាំនៃព្រះបន្ទូល។',
      en: 'The fear of the Lord is the beginning of wisdom. Walk with godly integrity and sound judgment.'
    },
    accent: 'cyan'
  },
  {
    month: 7,
    name: { km: 'កក្កដា', en: 'July', ko: '7월' },
    days: 31,
    theme: { km: 'ជំនឿ ការទុកចិត្ត និងការដឹកនាំ', en: 'Faith, Trust & Divine Guidance', ko: '믿음과 신뢰, 성령의 인도' },
    description: {
      km: 'ដើរដោយជំនឿ មិនមែនដោយមើលឃើញនឹងភ្នែកឡើយ។ ព្រះទ្រង់ស្មោះត្រង់ក្នុងការដឹកនាំជំហានជីវិតរបស់យើង។',
      en: 'Walk by faith and not by sight, anchoring your trust in the unshakeable promises of our Father.'
    },
    accent: 'indigo'
  },
  {
    month: 8,
    name: { km: 'សីហា', en: 'August', ko: '8월' },
    days: 31,
    theme: { km: 'ការអធិស្ឋាន និងការថ្វាយបង្គំ', en: 'Passionate Prayer & Wholehearted Worship', ko: '뜨거운 기도와 온전한 예배' },
    description: {
      km: 'ការអធិស្ឋានជាដង្ហើមនៃជីវិតខាងវិញ្ញាណ។ ចូលទៅជិតព្រះដោយការអរព្រះគុណ និងការថ្វាយបង្គំដោយស្មោះ។',
      en: 'Prayer is the spiritual breath of the believer. Draw near to God with sincere adoration and thanksgiving.'
    },
    accent: 'orange'
  },
  {
    month: 9,
    name: { km: 'កញ្ញា', en: 'September', ko: '9월' },
    days: 30,
    theme: { km: 'បេសកកម្ម និងការចែកចាយដំណឹងល្អ', en: 'Kingdom Mission & Spreading the Gospel', ko: '하나님 나라의 선교와 복음 전파' },
    description: {
      km: 'ធ្វើជាពន្លឺ និងជាអំបិលក្នុងសង្គម។ ចែករំលែកសេចក្តីស្រឡាញ់ និងដំណឹងល្អនៃព្រះយេស៊ូវដល់មនុស្សជុំវិញខ្លួន។',
      en: 'Be the salt of the earth and the light of the world, proclaiming the good news of Christ with love.'
    },
    accent: 'teal'
  },
  {
    month: 10,
    name: { km: 'តុលា', en: 'October', ko: '10월' },
    days: 31,
    theme: { km: 'ព្រះបន្ទូលជាពន្លឺបំភ្លឺផ្លូវ', en: 'The Living Word as a Lamp to Our Feet', ko: '내 발에 등이요 내 길에 빛인 말씀' },
    description: {
      km: 'ព្រះបន្ទូលរបស់ព្រះជាអាហារខាងវិញ្ញាណដែលផ្តល់ជីវិត កម្លាំង និងការការពារពីសេចក្តីល្បួង។',
      en: 'God’s living Word nourishes our souls, protects our steps, and illuminates our path daily.'
    },
    accent: 'amber'
  },
  {
    month: 11,
    name: { km: 'វិច្ឆិកា', en: 'November', ko: '11월' },
    days: 30,
    theme: { km: 'ការអរព្រះគុណ និងអំណរក្នុងគ្រប់កាលៈទេសៈ', en: 'Thanksgiving & Joy in All Circumstances', ko: '범사에 감사와 기쁨의 고백' },
    description: {
      km: 'ដួងចិត្តដែលពោរពេញដោយការអរព្រះគុណ តែងតែមើលឃើញព្រះពររបស់ព្រះ ទោះបីស្ថិតក្នុងកាលៈទេសៈលំបាកក៏ដោយ។',
      en: 'A grateful heart recognizes God’s hand of blessing in every season of life and responds with joy.'
    },
    accent: 'rose'
  },
  {
    month: 12,
    name: { km: 'ធ្នូ', en: 'December', ko: '12월' },
    days: 31,
    theme: { km: 'សេចក្តីសង្ឃឹម និងព្រះយេស៊ូវជាពន្លឺនៃពិភពលោក', en: 'Eternal Hope & Jesus, Light of the World', ko: '영원한 소망과 세상의 빛耶稣' },
    description: {
      km: 'ព្រះយេស៊ូវជាអំណោយទានដ៏អស្ចារ្យបំផុតនៃស្ថានសួគ៌។ ពន្លឺទ្រង់បំភ្លឺភាពងងឹត និងនាំមកនូវក្តីសង្ឃឹមដ៏នៅអស់កល្ប។',
      en: 'Jesus is the greatest gift of heaven. His light shines in darkness, bringing eternal hope to the world.'
    },
    accent: 'amber'
  }
];

const toKmNum = (n) => String(n).replace(/\d/g, (d) => '០១២៣៤៥៦៧៨៩'[d]);
const pad2 = (n) => String(n).padStart(2, '0');
const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function getMonthDayFromDayOfYear(dayOfYear) {
  let rem = Math.max(1, Math.min(365, Number(dayOfYear) || 1));
  for (let m = 0; m < 12; m++) {
    if (rem <= MONTH_DAYS[m]) {
      return { month: m + 1, day: rem };
    }
    rem -= MONTH_DAYS[m];
  }
  return { month: 12, day: 31 };
}

const CATEGORY_DEVOTION_TEMPLATES = {
  salvation: {
    themeKm: 'សេចក្តីសង្គ្រោះ និងជីវិតថ្មីក្នុងព្រះគ្រីស្ទ',
    themeEn: 'Salvation & New Life in Christ',
    meaningKm: 'ព្រះគុណនៃព្រះបានប្រទានការសង្គ្រោះ និងជីវិតថ្មីដល់យើងតាមរយៈព្រះយេស៊ូវគ្រីស្ទ។ ទោះបីអតីតកាលយើងធ្លាប់មានកំហុស ឬភាពទន់ខ្សោយយ៉ាងណាក្តី ក៏ព្រះទ្រង់លាងជម្រះ និងតាំងយើងឱ្យជាមនុស្សថ្មី។',
    meaningEn: 'God’s grace offers us salvation and renewed life through Jesus Christ. No matter our past mistakes or weaknesses, the Lord cleanses and establishes us as a new creation.',
    actionKm: 'ថ្លែងអំណរព្រះគុណដល់ព្រះសម្រាប់សេចក្តីសង្គ្រោះ ហើយចែករំលែកសេចក្តីស្រឡាញ់នេះដល់មនុស្សម្នាក់នៅជុំវិញខ្លួន។',
    actionEn: 'Thank God for His saving grace today and share His unconditional love with someone around you.',
    prayerKm: '«ឱព្រះអម្ចាស់យេស៊ូវអើយ អរព្រះគុណទ្រង់ដែលបានលះបង់ព្រះជន្មដើម្បីសង្គ្រោះទូលបង្គំ។ សូមដឹកនាំជីវិតថ្មីរបស់ទូលបង្គំឱ្យដើរក្នុងពន្លឺ និងសេចក្តីពិត។ អាមែន។»',
    prayerEn: '“Lord Jesus, thank You for giving Your life to save me. Guide my new walk in Your light and truth every day. Amen.”',
    pills: ['Salvation', 'Grace', 'New Life']
  },
  peace: {
    themeKm: 'សេចក្តីសុខសាន្តលើសពីគំនិតមនុស្ស',
    themeEn: 'God’s Peace Beyond Understanding',
    meaningKm: 'នៅក្នុងលោកីយ៍ដែលពោរពេញដោយកង្វល់ និងសម្ពាធ ព្រះទ្រង់សន្យាប្រទានសេចក្តីសុខសាន្តដ៏ពិតប្រាកដ។ នៅពេលយើងប្រគល់បន្ទុកទាំងអស់ថ្វាយទ្រង់ សេចក្តីសុខសាន្តរបស់ព្រះនឹងការពារដួងចិត្តយើង។',
    meaningEn: 'In a world filled with anxiety and pressure, God promises true peace. As we cast our cares upon Him, His heavenly peace guards our hearts and minds.',
    actionKm: 'ឈប់បារម្ភពីអ្វីដែលអ្នកមិនអាចគ្រប់គ្រងបាន រួចប្រគល់វាថ្វាយព្រះតាមរយៈការអធិស្ឋានដោយស្ងប់ស្ងៀម។',
    actionEn: 'Release what you cannot control into God’s hands through a moment of quiet, trust-filled prayer.',
    prayerKm: '«ឱព្រះវរបិតាអើយ សូមដកចេញនូវការថប់បារម្ភពីចិត្តទូលបង្គំ ហើយបំពេញដោយសេចក្តីសុខសាន្តពីស្ថានសួគ៌។ ក្នុងព្រះនាមព្រះយេស៊ូវ អាមែន។»',
    prayerEn: '“Heavenly Father, quiet my anxious thoughts and fill my soul with Your heavenly peace. In Jesus’ name, Amen.”',
    pills: ['Peace', 'Comfort', 'Rest']
  },
  strength: {
    themeKm: 'កម្លាំង និងសេចក្តីក្លាហានក្នុងឧបសគ្គ',
    themeEn: 'Divine Strength & Holy Courage',
    meaningKm: 'ព្រះទ្រង់ជាជំរកដ៏រឹងមាំ និងជាជំនួយយ៉ាងពិតប្រាកដក្នុងគ្រាលំបាក។ នៅពេលយើងអស់កម្លាំង ទ្រង់ប្រទានកម្លាំងឡើងវិញ ដើម្បីឱ្យយើងអាចជម្នះរាល់ឧបសគ្គដោយជំនឿ។',
    meaningEn: 'God is our mighty refuge and ever-present help in trouble. When our human strength fails, He renews our power to overcome every mountain.',
    actionKm: 'ប្រឈមមុខនឹងបញ្ហាប្រឈមនៅថ្ងៃនេះដោយភាពក្លាហាន ដោយដឹងថាព្រះកំពុងប្រយុទ្ធជំនួសអ្នក។',
    actionEn: 'Face today’s toughest task with holy confidence, knowing that the Lord Himself fights for you.',
    prayerKm: '«ឱព្រះដ៏មានមហិទ្ធិឫទ្ធិ សូមប្រទានកម្លាំង និងសេចក្តីក្លាហានដល់ទូលបង្គំ ដើម្បីឈររឹងមាំក្នុងគ្រប់កាលៈទេសៈ។ ក្នុងព្រះនាមព្រះយេស៊ូវ អាមែន។»',
    prayerEn: '“Almighty God, grant me renewed strength and bold courage to stand firm through every test. In Jesus’ name, Amen.”',
    pills: ['Strength', 'Courage', 'Refuge']
  },
  faith: {
    themeKm: 'ជំនឿ និងការទុកចិត្តលើការដឹកនាំរបស់ព្រះ',
    themeEn: 'Faith, Trust & Divine Guidance',
    meaningKm: 'យើងដើរដោយជំនឿ មិនមែនដោយមើលឃើញនឹងភ្នែកឡើយ។ ព្រះទ្រង់ស្មោះត្រង់ជានិច្ច ហើយរាល់ការសន្យារបស់ទ្រង់មិនដែលសាបសូន្យឡើយ។ ចូរទុកចិត្តលើការដឹកនាំរបស់ទ្រង់។',
    meaningEn: 'We walk by faith, not by sight. The Lord is ever faithful to His promises. Trust His sovereign leading even when the road ahead is unclear.',
    actionKm: 'បោះជំហានទៅមុខដោយការស្តាប់បង្គាប់ព្រះបន្ទូល ទោះបីមើលមិនទាន់ឃើញលទ្ធផលទាំងអស់ក៏ដោយ។',
    actionEn: 'Take a step of obedience in faith today, trusting God with the outcome even when you cannot see it yet.',
    prayerKm: '«ឱព្រះអម្ចាស់អើយ សូមពង្រឹងជំនឿទូលបង្គំឱ្យកាន់តែរឹងមាំ និងជួយទូលបង្គំឱ្យទុកចិត្តលើការដឹកនាំរបស់ទ្រង់រាល់ថ្ងៃ។ អាមែន។»',
    prayerEn: '“Lord, strengthen my faith and help me trust Your perfect timing and righteous guidance. Amen.”',
    pills: ['Faith', 'Trust', 'Guidance']
  },
  love: {
    themeKm: 'សេចក្តីស្រឡាញ់ និងព្រះគុណដ៏ធំធេង',
    themeEn: 'Unconditional Love & Abundant Grace',
    meaningKm: 'សេចក្តីស្រឡាញ់របស់ព្រះយេស៊ូវគឺគ្មានលក្ខខណ្ឌ និងមិនចេះសាបសូន្យឡើយ។ នៅពេលយើងយល់ពីជម្រៅនៃក្តីស្រឡាញ់ទ្រង់ យើងក៏រៀនស្រឡាញ់ និងអត់ទោសដល់អ្នកដទៃដូចគ្នាដែរ។',
    meaningEn: 'The love of Christ is unconditional and unfailing. Experiencing His boundless grace empowers us to love, forgive, and serve others selflessly.',
    actionKm: 'បង្ហាញសេចក្តីស្រឡាញ់ជាក់ស្តែងដល់មនុស្សម្នាក់ តាមរយៈពាក្យលើកទឹកចិត្ត ឬការជួយដោយចិត្តស្មោះ។',
    actionEn: 'Express genuine Christian love today through an encouraging word, a forgiving heart, or a quiet act of service.',
    prayerKm: '«ឱព្រះយេស៊ូវអើយ សូមបំពេញដួងចិត្តទូលបង្គំដោយសេចក្តីស្រឡាញ់របស់ទ្រង់ ដើម្បីឱ្យទូលបង្គំអាចស្រឡាញ់មនុស្សជុំវិញខ្លួន។ អាមែន។»',
    prayerEn: '“Lord Jesus, overflow my heart with Your unconditional love so that I may reflect Your grace to everyone I meet. Amen.”',
    pills: ['Love', 'Grace', 'Kindness']
  },
  wisdom: {
    themeKm: 'ប្រាជ្ញាពីស្ថានសួគ៌ និងការដើរក្នុងផ្លូវសុចរិត',
    themeEn: 'Heavenly Wisdom & Righteous Living',
    meaningKm: 'ការកោតខ្លាចដល់ព្រះយេហូវ៉ា ជាដើមចមនៃប្រាជ្ញា។ ព្រះបន្ទូលរបស់ទ្រង់ជាចង្កៀងបំភ្លឺជើង និងជាពន្លឺបំភ្លឺផ្លូវរបស់យើង ដើម្បីឱ្យយើងរស់នៅដោយបរិសុទ្ធ និងត្រឹមត្រូវ។',
    meaningEn: 'The fear of the Lord is the beginning of true wisdom. His Word is a lamp to our feet, guiding our choices into righteousness and integrity.',
    actionKm: 'ស្វែងរកការណែនាំពីព្រះបន្ទូល មុននឹងធ្វើការសម្រេចចិត្តសំខាន់ៗក្នុងជីវិត ការងារ ឬការសិក្សា។',
    actionEn: 'Seek God’s wisdom in scripture before making important decisions in your studies, career, or relationships.',
    prayerKm: '«ឱព្រះវរបិតាអើយ សូមប្រទានប្រាជ្ញា និងការយល់ដឹងដល់ទូលបង្គំ ដើម្បីឱ្យទូលបង្គំចេះជ្រើសរើសផ្លូវសុចរិត។ ក្នុងព្រះនាមព្រះយេស៊ូវ អាមែន។»',
    prayerEn: '“Father in heaven, give me divine wisdom and discernment to choose what is right and pleasing to You. In Jesus’ name, Amen.”',
    pills: ['Wisdom', 'Integrity', 'Guidance']
  },
  praise: {
    themeKm: 'ការសរសើរតម្កើង និងការថ្វាយបង្គំព្រះ',
    themeEn: 'Wholehearted Praise & Worship',
    meaningKm: 'ព្រះទ្រង់សក្តិសមនឹងទទួលបានការសរសើរតម្កើងពីគ្រប់ទាំងដង្ហើម។ ទោះបីនៅក្នុងកាលៈទេសៈណាក៏ដោយ ចូរលើកតម្កើងព្រះនាមទ្រង់ ដ្បិតទ្រង់ល្អ ហើយសេចក្តីមេត្តាករុណារបស់ទ្រង់នៅអស់កល្បជានិច្ច។',
    meaningEn: 'The Lord is worthy of all praise and adoration. In every season, let our hearts declare His goodness, for His steadfast love endures forever.',
    actionKm: 'ចំណាយពេល ៥ នាទីនៅថ្ងៃនេះ ដើម្បីសរសើរតម្កើង និងអរព្រះគុណព្រះ ដោយមិនសុំអ្វីទាំងអស់។',
    actionEn: 'Take five quiet minutes today purely to praise and thank God for who He is, without asking for anything.',
    prayerKm: '«ឱព្រះយេហូវ៉ាដ៏ជាព្រះនៃទូលបង្គំអើយ ទូលបង្គំសូមលើកតម្កើង និងសរសើរព្រះនាមបរិសុទ្ធរបស់ទ្រង់ដោយអស់ពីដួងចិត្ត។ អាមែន។»',
    prayerEn: '“O Lord my God, I exalt and magnify Your holy name with all my heart, mind, and soul. Amen.”',
    pills: ['Praise', 'Worship', 'Gratitude']
  }
};

function getReadingPassages(verse, dayNum) {
  const enParts = verse.ref.en.match(/^([0-9]?\s*[A-Za-z]+)\s+([0-9]+)/);
  const kmParts = verse.ref.km.match(/^([^\d០-៩]+)\s*([០-៩\d]+)/);
  
  const bookEn = enParts ? enParts[1].trim() : 'Scripture';
  const chapEn = enParts ? enParts[2] : '1';
  const bookKm = kmParts ? kmParts[1].trim() : 'ព្រះគម្ពីរ';
  const chapKm = kmParts ? kmParts[2] : '១';
  const bookKo = (verse.ref.ko || '').replace(/[0-9: \-]+/g, '').trim() || bookEn;

  const psalmNum = ((dayNum * 7 + 13) % 150) + 1;
  const provNum = ((dayNum * 3 + 5) % 31) + 1;

  return [
    {
      book: bookEn,
      ref: `${bookEn} ${chapEn}`,
      kmRef: `${bookKm} ${chapKm}`,
      koRef: `${bookKo} ${chapEn}장`
    },
    {
      book: 'Psalms',
      ref: `Psalm ${psalmNum}`,
      kmRef: `ទំនុកដំកើង ${toKmNum(psalmNum)}`,
      koRef: `시편 ${psalmNum}편`
    },
    {
      book: 'Proverbs',
      ref: `Proverbs ${provNum}`,
      kmRef: `សុភាសិត ${toKmNum(provNum)}`,
      koRef: `잠언 ${provNum}장`
    }
  ];
}

const PASTORAL_AUTHOR = {
  name: {
    en: 'Senior Pastor Kim Jong Ho & Ministry Team',
    km: 'លោកគ្រូគង្វាល គីម ជុងហូ និងក្រុមគ្រូគង្វាល',
    ko: '김종호 담임목사 및 사역팀'
  },
  role: {
    en: 'Pastoral Team, All Nations Church',
    km: 'ក្រុមគ្រូគង្វាល ក្រុមជំនុំអលណេសិន',
    ko: '올네이션스교회 교역자팀'
  },
  avatar: '/images/pastor-kim.jpg'
};

function createDevotionItem(verse, index) {
  const dayOfYear = index + 1;
  const isWithinYear = dayOfYear <= 365;
  const { month, day } = isWithinYear ? getMonthDayFromDayOfYear(dayOfYear) : { month: 12, day: 31 };
  const monthInfo = YEAR_MONTHS[month - 1] || YEAR_MONTHS[0];
  const dateStr = `${pad2(month)}-${pad2(day)}`;
  const dateFull = `2026-${dateStr}`;

  const catMeta = CATEGORY_DEVOTION_TEMPLATES[verse.category] || CATEGORY_DEVOTION_TEMPLATES.faith;
  const theme = {
    km: `${catMeta.themeKm} (${verse.ref.km})`,
    en: `${catMeta.themeEn} (${verse.ref.en})`
  };

  const passages = getReadingPassages(verse, dayOfYear);

  return {
    id: isWithinYear ? `devotion-${dateStr}` : `verse-${verse.id}`,
    verseId: verse.id,
    dayOfYear: isWithinYear ? dayOfYear : null,
    month,
    day,
    dateString: dateStr,
    dateFull,
    monthName: monthInfo.name,
    monthlyTheme: monthInfo.theme,
    theme,
    verse: {
      ref: {
        km: verse.ref.km,
        en: verse.ref.en,
        ko: verse.ref.ko || verse.ref.en
      },
      text: {
        km: verse.text.km, // 100% exact 1954 Khmer UBS Scripture text
        en: verse.text.en
      },
      reference: {
        km: verse.ref.km,
        en: verse.ref.en,
        ko: verse.ref.ko || verse.ref.en
      },
      posterId: verse.posterId
    },
    easyMeaning: {
      km: catMeta.meaningKm,
      en: catMeta.meaningEn
    },
    practicalAction: {
      km: catMeta.actionKm,
      en: catMeta.actionEn
    },
    simplePrayer: {
      km: catMeta.prayerKm,
      en: catMeta.prayerEn
    },
    readingPassages: passages,
    keyPills: [...catMeta.pills, verse.ref.en.split(' ')[0]],
    author: PASTORAL_AUTHOR,
    reflection: {
      title: theme,
      paragraphs: [
        {
          km: catMeta.meaningKm,
          en: catMeta.meaningEn
        },
        {
          km: 'ការរស់នៅតាមព្រះបន្ទូលប្រចាំថ្ងៃ ជួយដាស់តឿនចិត្តគំនិត និងអាកប្បកិរិយារបស់យើងឱ្យស្របតាមបំណងព្រះហឫទ័យរបស់ព្រះ។ ចូរយកព្រះបន្ទូលនេះមកពិចារណាក្នុងចិត្តពេញមួយថ្ងៃ។',
          en: 'Meditating on God’s Word shapes our thoughts and actions to align with His perfect will. Keep this truth close to your heart throughout the day.'
        }
      ]
    },
    applicationQuestions: [
      {
        km: 'តើព្រះបន្ទូលថ្ងៃនេះជួយលើកទឹកចិត្តអ្នកក្នុងការរស់នៅ និងការប្រឈមមុខនឹងបញ្ហាប្រចាំថ្ងៃយ៉ាងដូចម្តេច?',
        en: 'How does today’s scripture encourage you in your daily walk and relationships?'
      },
      {
        km: 'តើអ្នកអាចយកការអនុវត្តជាក់ស្តែងថ្ងៃនេះទៅអនុវត្តក្នុងជីវិតផ្ទាល់ខ្លួន ឬគ្រួសារដោយរបៀបណា?',
        en: 'How can you put today’s practical action into practice in your personal life or family?'
      }
    ],
    guidedPrayer: {
      km: catMeta.prayerKm,
      en: catMeta.prayerEn
    }
  };
}

export const ALL_DEVOTIONS_500 = FAMOUS_KHMER_VERSES.map(createDevotionItem);
export const YEAR_DEVOTIONS_365 = ALL_DEVOTIONS_500.slice(0, 365);

// Helper: Get devotion for a specific day of the year (1-365)
export function getDevotionByDayOfYear(dayOfYear) {
  const index = Math.max(1, Math.min(365, Number(dayOfYear) || 1)) - 1;
  return YEAR_DEVOTIONS_365[index] || YEAR_DEVOTIONS_365[0];
}

// Helper: Get devotion for a specific month (1-12) and day (1-31)
export function getDevotionByDate(month, day) {
  const m = Number(month);
  const d = Number(day);
  const found = YEAR_DEVOTIONS_365.find(item => item.month === m && item.day === d);
  return found || YEAR_DEVOTIONS_365[0];
}

// Helper: Get today's devotion based on client current date
export function getTodayDevotion() {
  const now = new Date();
  const m = now.getMonth() + 1;
  const d = now.getDate();
  return getDevotionByDate(m, d);
}

// Helper: Get devotion by verse ID (1-500)
export function getDevotionByVerseId(verseId) {
  const vId = Number(verseId);
  return ALL_DEVOTIONS_500.find(item => item.verseId === vId) || ALL_DEVOTIONS_500[0];
}

// Helper: Calculate progress statistics
export function calculateYearProgress(completedIds = []) {
  const completedCount = completedIds.length;
  const total = 365;
  const percentage = Math.round((completedCount / total) * 100);
  return { completedCount, total, percentage };
}
