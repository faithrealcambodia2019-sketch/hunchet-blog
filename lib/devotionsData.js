// Daily Bible Verse & Devotions Data for All Nations Church
// Sourced 100% authentically from the 1954/1962 Old Khmer Version (United Bible Societies)
// គ្មានការប្រែសម្រួល ឬលុបខណាមួយឡើយ (Verbatim Scripture Preservation).

import { YEAR_DEVOTIONS_365, getTodayDevotion } from './yearDevotionsData.js';

export const DEVOTION_TOPICS = [
  { id: 'all', label: { en: 'All Devotions', km: 'ទាំងអស់', ko: '전체 묵상' } },
  { id: 'peace', label: { en: 'Peace & Hope', km: 'សេចក្តីសុខសាន្ត និងសង្ឃឹម', ko: '평안과 소망' } },
  { id: 'faith', label: { en: 'Faith & Trust', km: 'ជំនឿ និងការទុកចិត្ត', ko: '믿음과 신뢰' } },
  { id: 'youth', label: { en: 'Youth & Purpose', km: 'យុវជន និងទិសដៅជីវិត', ko: '청소년과 비전' } },
  { id: 'wisdom', label: { en: 'Wisdom & Walk', km: 'ប្រាជ្ញា និងការដើរក្នុងជីវិត', ko: '지혜와 동행' } },
  { id: 'prayer', label: { en: 'Prayer & Worship', km: 'ការអធិស្ឋាន និងថ្វាយបង្គំ', ko: '기도와 찬양' } },
];

export const DAILY_READING_PLANS = [
  {
    day: 1,
    dateString: '2026-09-22',
    passages: [
      {
        book: 'Mark',
        ref: 'Mark 11:20-25',
        kmRef: 'ម៉ាកុស ១១:២០-២៥',
        koRef: '마가복음 11:20-25',
        text: {
          km: `២០ លុះ​ព្រឹក​ឡើង កាល​កំពុង​តែ​ដើរ​កាត់​តាម​ផ្លូវ​ទៅ នោះ​ឃើញ​ដើម​ល្វា​នោះ​បាន​ក្រៀម​ស្វិត​ពី​ឫស​មក ២១ ពេត្រុស​ក៏​នឹក​ឃើញ​ទូល​ទ្រង់​ថា លោក​គ្រូ មើល ដើម​ល្វា​ដែល​ទ្រង់​បាន​ដាក់​បណ្តាសា​នោះ ក្រៀម​ស្វិត​អស់​ហើយ ២២ ព្រះយេស៊ូវ​មាន​ព្រះបន្ទូល​ឆ្លើយ​ថា ចូរ​មាន​សេចក្តី​ជំនឿ​ចំពោះ​ព្រះ​ចុះ ២៣ ដ្បិត​ខ្ញុំ​ប្រាប់​អ្នក​រាល់​គ្នា​ជា​ប្រាកដ​ថា បើ​អ្នក​ណា​នឹង​និយាយ​ទៅ​ភ្នំ​នេះ​ថា «ចូរ​រើ​ចេញ​ទៅ​ធ្លាក់​ក្នុង​សមុទ្រ​ទៅ» ដោយ​ឥត​សង្ស័យ​ក្នុង​ចិត្ត គឺ​ជឿ​ជាក់​ថា សេចក្តី​ដែល​ខ្លួន​និយាយ​នោះ​នឹង​កើត​ឡើង នោះ​ការ​នោះ​នឹង​បាន​សំរេច​ដូច​ពាក្យ​នោះ​មែន ២៤ ដោយ​ហេតុ​នោះ​បាន​ជា​ខ្ញុំ​ប្រាប់​អ្នក​រាល់​គ្នា​ថា គ្រប់​ទាំង​សេចក្តី​ដែល​អ្នក​រាល់​គ្នា​អធិស្ឋាន​សូម ចូរ​ជឿ​ថា បាន​ហើយ នោះ​នឹង​បាន​មែន ២៥ ហើយ​កាល​ណា​អ្នក​រាល់​គ្នា​ឈរ​អធិស្ឋាន បើ​មាន​ទាស់​នឹង​អ្នក​ណា នោះ​ចូរ​អត់​ទោស​ឲ្យ​គេ​ទៅ ដើម្បី​ឲ្យ​ព្រះវរបិតា​នៃ​អ្នក​រាល់​គ្នា ដែល​គង់​នៅ​ស្ថានសួគ៌ បាន​អត់​ទោស​ចំពោះ​ការ​រំលង​របស់​អ្នក​រាល់​គ្នា​ដែរ។`,
          en: `20 In the morning, as they went by, they saw the fig tree withered away from the roots. 21 Peter, remembering, said to him, “Rabbi, look! The fig tree which you cursed has withered away.” 22 Jesus answered them, “Have faith in God. 23 Most certainly I tell you, whoever may tell this mountain, ‘Be taken up and cast into the sea,’ and doesn’t doubt in his heart, but believes that what he says is happening; he shall have whatever he says. 24 Therefore I tell you, all things whatever you pray and ask for, believe that you have received them, and you shall have them. 25 Whenever you stand praying, forgive, if you have anything against anyone; so that your Father, who is in heaven, may also forgive you your transgressions.”`,
          ko: `20 그들이 아침에 지나갈 때에 무화과나무가 뿌리째 마른 것을 보고 21 베드로가 생각이 나서 여짜오되 랍비여 보소서 저주하신 무화과나무가 말랐나이다 22 예수께서 그들에게 대답하여 이르시되 하나님을 믿으라 23 내가 진실로 너희에게 이르노니 누구든지 이 산더러 들리어 바다에 던져지라 하며 그 말하는 것이 이루어질 줄 믿고 마음에 의심하지 아니하면 그대로 되리라 24 그러므로 내가 너희에게 말하노니 무엇이든지 기도하고 구하는 것은 받은 줄로 믿으라 그리하면 너희에게 그대로 되리라 25 서서 기도할 때에 아무에게나 혐의가 있거든 용서하라 그리하여야 하늘에 계신 너희 아버지께서도 너희 허물을 사하여 주시리라 하시니라`
        }
      },
      {
        book: 'Psalms',
        ref: 'Psalm 23',
        kmRef: 'ទំនុកដំកើង ២៣',
        koRef: '시편 23편',
        text: {
          km: `ទំនុកនៃស្តេចដាវីឌ។\n១ ព្រះយេហូវ៉ាទ្រង់ជាអ្នកគង្វាលខ្ញុំ ខ្ញុំនឹងមិនខ្វះអ្វីសោះ\n២ ទ្រង់ឲ្យខ្ញុំដេកសំរាកនៅទីមានស្មៅខៀវខ្ចី ទ្រង់នាំខ្ញុំទៅក្បែរមាត់ទឹកដែលហូរគ្រឿនៗ\n៣ ទ្រង់កែព្រលឹងខ្ញុំឡើងវិញ ទ្រង់នាំខ្ញុំទៅតាមផ្លូវសុចរិត ដោយយល់ដល់ព្រះនាមទ្រង់។\n៤ អើ ទោះបើទូលបង្គំដើរកាត់ច្រកភ្នំនៃម្លប់សេចក្តីស្លាប់ក៏ដោយ គង់តែមិនខ្លាចសេចក្តីអាក្រក់ណាឡើយ ដ្បិតទ្រង់គង់នៅជាមួយនឹងទូលបង្គំ ព្រនង់ ហើយនឹងដំបងរបស់ទ្រង់កំសាន្តចិត្តទូលបង្គំ\n៥ ទ្រង់រៀបតុនៅមុខទូលបង្គំ ចំពោះពួកខ្មាំងសត្រូវផង ទ្រង់ចាក់ប្រេងលាបលើក្បាលទូលបង្គំ ពែងនៃទូលបង្គំក៏ពេញហៀរ។\n៦ ប្រាកដជាសេចក្តីសប្បុរស និងសេចក្តីមេត្តាករុណា នឹងជាប់តាមខ្ញុំ រាល់តែថ្ងៃ ដរាបដល់អស់១ជីវិតខ្ញុំ ហើយខ្ញុំនឹងនៅក្នុងដំណាក់នៃព្រះយេហូវ៉ា ជារៀងដរាបទៅ។`,
          en: `A psalm of David.\n1 The LORD is my shepherd, I lack nothing.\n2 He makes me lie down in green pastures, he leads me beside quiet waters,\n3 he refreshes my soul. He guides me along the right paths for his name’s sake.\n4 Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me.\n5 You prepare a table before me in the presence of my enemies. You anoint my head with oil; my cup overflows.\n6 Surely your goodness and love will follow me all the days of my life, and I will dwell in the house of the LORD forever.`,
          ko: `다윗의 시.\n1 여호와는 나의 목자시니 내게 부족함이 없으리로다\n2 그가 나를 푸른 풀밭에 누이시며 쉴 만한 물 가로 인도하시는도다\n3 내 영혼을 소생시키시고 자기 이름을 위하여 의의 길로 인도하시는도다\n4 내가 사망의 음침한 골짜기로 다닐지라도 해를 두려워하지 않을 것은 주께서 나와 함께 하심이라 주의 지팡이와 막대기가 나를 안위하시나이다\n5 주께서 내 원수의 목전에서 내게 상을 차려 주시고 기름을 내 머리에 부으셨으니 내 잔이 넘치나이다\n6 내 평생에 선하심과 인자하심이 반드시 나를 따르리니 내가 여호와의 집에 영원히 살리로다`
        }
      }
    ]
  }
];

function categoryToTopic(cat) {
  switch (cat) {
    case 'peace': return 'peace';
    case 'strength': return 'faith';
    case 'faith': return 'faith';
    case 'love': return 'prayer';
    case 'wisdom': return 'wisdom';
    case 'salvation': return 'youth';
    case 'praise': return 'prayer';
    default: return 'faith';
  }
}

const todayDev = getTodayDevotion();
const todayIdx = (todayDev.dayOfYear || 265) - 1;
const startIdx = Math.max(0, todayIdx - 30);

export const DEVOTIONS_DATA = YEAR_DEVOTIONS_365.slice(startIdx, todayIdx + 1).reverse().map((d) => ({
  ...d,
  date: d.dateFull,
  isToday: d.id === todayDev.id,
  topic: categoryToTopic(d.verse?.category || 'faith')
}));
