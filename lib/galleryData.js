// Authentic categorized gallery items for Hun Chet Ministry & All Nations Church

export const GALLERY_CATEGORIES = [
  { id: "all", label: { en: "All Moments", km: "ទាំងអស់", ko: "전체" } },
  { id: "worship", label: { en: "Sunday Worship & Pulpit", km: "ការថ្វាយបង្គំ និងវេទិកា", ko: "예배와 강단" } },
  { id: "baptism", label: { en: "Water Baptism", km: "ពិធីបុណ្យជ្រមុជទឹក", ko: "세례식" } },
  { id: "youth", label: { en: "Youth & NextGen", km: "យុវជន", ko: "청소년" } },
  { id: "kids", label: { en: "Sunday School", km: "ថ្នាក់កុមារ", ko: "주일학교" } },
  { id: "digital", label: { en: "CV Digital Ministry", km: "ព័ន្ធកិច្ចឌីជីថល", ko: "디지털 사역" } },
  { id: "teaching", label: { en: "Theology & Equipping", km: "ការបណ្តុះបណ្តាល", ko: "신학 교육" } },
  { id: "videos", label: { en: "Videos & Tours", km: "វីដេអូ", ko: "영상" } },
];

export const GALLERY_ITEMS = [
  // 1. VIDEOS
  {
    id: "vid-worship",
    type: "video",
    category: "videos",
    src: "/videos/church-intro-480p.mp4",
    poster: "/images/hero-cover.jpg",
    duration: "0:28",
    badge: { en: "Sunday Worship", km: "ការថ្វាយបង្គំថ្ងៃអាទិត្យ", ko: "주일 예배" },
    title: {
      en: "Sunday Worship Service & Praise",
      km: "ការថ្វាយបង្គំ និងការសរសើរតម្កើង",
      ko: "주일 예배와 찬양",
    },
    description: {
      en: "Heartfelt praise and worship led by our choir and ministry team in the main sanctuary at All Nations Church.",
      km: "ការថ្វាយបង្គំ និងការសរសើរតម្កើងចេញពីចិត្ត ដឹកនាំដោយក្រុមចម្រៀង និងក្រុមអ្នកបម្រើក្នុងព្រះវិហារ។",
      ko: "본당에서 찬양팀과 사역팀이 인도하는 진심 어린 찬양과 예배 영상입니다.",
    },
  },
  {
    id: "vid-campus",
    type: "video",
    category: "videos",
    src: "/videos/church-campus.mp4",
    poster: "/images/church-campus-poster.jpg",
    duration: "0:18",
    badge: { en: "Campus Aerial Tour", km: "ទស្សនាបរិវេណពីលើអាកាស", ko: "항공 교회 투어" },
    title: {
      en: "Church Campus & Grounds Tour",
      km: "ទស្សនាបរិវេណ និងទីធ្លាព្រះវិហារ",
      ko: "교회 부지 둘러보기",
    },
    description: {
      en: "Scenic aerial drone tour of our grounds, front gate, and fellowship pavilion in Trapaing Krasang, Phnom Penh.",
      km: "ទិដ្ឋភាពពីលើអាកាសនៃទីធ្លាព្រះវិហារ ច្រកទ្វារមុខ និងសាលប្រកបគ្នានៅភូមិត្រពាំងក្រសាំង រាជធានីភ្នំពេញ។",
      ko: "프놈펜 뜨라뻬앙끄라상에 위치한 교회 부지와 친교 파빌리온을 담은 드론 영상입니다.",
    },
  },

  // 2. SUNDAY WORSHIP & PULPIT PREACHING
  {
    id: "photo-pastors-pulpit",
    type: "photo",
    category: "worship",
    src: "/images/pastors-pulpit.jpg",
    badge: { en: "Pastoral Preaching", km: "ការផ្សាយព្រះបន្ទូល", ko: "목회자 설교" },
    title: {
      en: "Preaching the Word of Truth",
      km: "ការផ្សាយព្រះបន្ទូលនៃសេចក្តីពិត",
      ko: "진리의 말씀 선포",
    },
    description: {
      en: "Senior Pastor Kim Jong Ho and Leader Hun Chet ministering and preaching together from the pulpit.",
      km: "លោកគ្រូគង្វាល គីម ជុងហូ និងលោកគ្រូ ហ៊ុន ចិត្ត ដឹកនាំ និងចែកចាយព្រះបន្ទូលរួមគ្នានៅលើវេទិកា។",
      ko: "김종호 담임목사와 훈 쳇 리더가 강단에서 함께 말씀을 전하고 사역합니다.",
    },
  },
  {
    id: "photo-church-family",
    type: "photo",
    category: "worship",
    src: "/images/church-family.jpg",
    badge: { en: "Sanctuary Family", km: "គ្រួសារក្នុងព្រះវិហារ", ko: "본당 성도 가족" },
    title: {
      en: "Our Church Family Gathered",
      km: "គ្រួសារក្រុមជំនុំអលណេសិនជួបជុំគ្នា",
      ko: "함께 모인 교회 가족",
    },
    description: {
      en: "All generations together in the sanctuary under the cross of Christ in Phnom Penh.",
      km: "មនុស្សគ្រប់ជំនាន់ជួបជុំគ្នាក្នុងព្រះវិហារក្រោមឈើឆ្កាងនៃព្រះគ្រីស្ទ។",
      ko: "그리스도의 십자가 아래 모든 세대가 본당에 함께 모였습니다.",
    },
  },
  {
    id: "photo-worship-service",
    type: "photo",
    category: "worship",
    src: "/images/worship-service.jpg",
    badge: { en: "Congregation Worship", km: "ការថ្វាយបង្គំជុំគ្នា", ko: "공동체 예배" },
    title: {
      en: "Reverent Sunday Worship",
      km: "ការថ្វាយបង្គំដោយស្មោះស្ម័គ្រ",
      ko: "경건한 주일 예배",
    },
    description: {
      en: "Brothers and sisters lifting their voices and hearts in praise to God.",
      km: "បងប្អូនរួមជំនឿលើកសំឡេង និងដួងចិត្តថ្វាយការសរសើរតម្កើងដល់ព្រះជាម្ចាស់។",
      ko: "형제자매들이 한마음으로 하나님을 찬양하고 예배합니다.",
    },
  },
  {
    id: "photo-sanctuary-worship",
    type: "photo",
    category: "worship",
    src: "/images/history-sanctuary-worship.jpg",
    badge: { en: "Praise & Adoration", km: "ការសរសើរតម្កើង", ko: "찬양과 경배" },
    title: {
      en: "Hands Lifted in Praise",
      km: "លើកដៃសរសើរតម្កើងព្រះ",
      ko: "손을 들고 드리는 찬양",
    },
    description: {
      en: "Worship service filled with the presence and peace of the Holy Spirit.",
      km: "ការថ្វាយបង្គំពោរពេញដោយវត្តមាន និងសេចក្តីសុខសាន្តនៃព្រះវិញ្ញាណបរិសុទ្ធ។",
      ko: "성령의 임재와 평안이 가득한 주일 예배 시간입니다.",
    },
  },
  {
    id: "photo-hero-cover",
    type: "photo",
    category: "worship",
    src: "/images/hero-cover.jpg",
    badge: { en: "Worship Ministry", km: "ក្រុមថ្វាយបង្គំ", ko: "찬양 사역팀" },
    title: {
      en: "Sanctuary Choir & Ministry Leaders",
      km: "ក្រុមអ្នកដឹកនាំការថ្វាយបង្គំ និងក្រុមចម្រៀង",
      ko: "본당 찬양대와 사역 리더들",
    },
    description: {
      en: "Leading the church family into worship with reverence, joy, and spiritual harmony.",
      km: "ដឹកនាំគ្រួសារក្រុមជំនុំចូលទៅក្នុងការថ្វាយបង្គំដោយការគោរព អំណរ និងសាមគ្គីភាពក្នុងព្រះវិញ្ញាណ។",
      ko: "경건과 기쁨으로 성도들을 예배의 자리로 인도하는 찬양팀입니다.",
    },
  },

  // 3. WATER BAPTISM CELEBRATIONS
  {
    id: "photo-baptism-2026-family",
    type: "photo",
    category: "baptism",
    src: "/images/baptism-2026-family-group.jpg",
    badge: { en: "Baptism • 15 Feb 2026", km: "បុណ្យជ្រមុជទឹក • ១៥ កុម្ភៈ ២០២៦", ko: "세례식 • 2026년 2월 15일" },
    title: {
      en: "Church Family Baptism Celebration (15 Feb 2026)",
      km: "ពិធីបុណ្យជ្រមុជទឹកគ្រួសារក្រុមជំនុំ (១៥ កុម្ភៈ ២០២៦)",
      ko: "교회 가족 세례식 축하 (2026년 2월 15일)",
    },
    description: {
      en: "Joyful celebration with our entire church family celebrating brothers and sisters receiving water baptism on February 15, 2026.",
      km: "អំណរដ៏អស្ចារ្យជាមួយគ្រួសារក្រុមជំនុំ ខណៈដែលបងប្អូនបានទទួលពិធីបុណ្យជ្រមុជទឹក នៅថ្ងៃទី១៥ ខែកុម្ភៈ ឆ្នាំ២០២៦។",
      ko: "2026년 2월 15일 온 성도가 모여 물세례를 받고 새 생명을 얻은 성도들을 축하했습니다.",
    },
  },
  {
    id: "photo-baptism-2026-immersion",
    type: "photo",
    category: "baptism",
    src: "/images/baptism-2026-water-immersion.jpg",
    badge: { en: "Holy Baptism", km: "ពិធីជ្រមុជក្នុងទឹក", ko: "침례 예식" },
    title: {
      en: "Water Immersion in the Name of Christ",
      km: "ការជ្រមុជក្នុងទឹកក្នុងព្រះនាមព្រះគ្រីស្ទ",
      ko: "그리스도 안에서의 침례",
    },
    description: {
      en: "Senior Pastor Kim Jong Ho and Leader Hun Chet baptizing believers in the name of the Father, Son, and Holy Spirit.",
      km: "លោកគ្រូគង្វាល គីម ជុងហូ និងលោកគ្រូ ហ៊ុន ចិត្ត ជ្រមុជទឹកជូនបងប្អូនក្នុងព្រះនាមព្រះវរបិតា ព្រះរាជបុត្រា និងព្រះវិញ្ញាណបរិសុទ្ធ។",
      ko: "김종호 담임목사와 훈 쳇 리더가 성부, 성자, 성령의 이름으로 성도들에게 침례를 베풉니다.",
    },
  },
  {
    id: "photo-baptism-2026-pavilion",
    type: "photo",
    category: "baptism",
    src: "/images/baptism-2026-pavilion-worship.jpg",
    badge: { en: "Pavilion Worship", km: "ការថ្វាយបង្គំនៅសាលាប្រកប", ko: "파빌리온 예배" },
    title: {
      en: "Baptism Service Fellowship & Praise",
      km: "ការថ្វាយបង្គំ និងការប្រកបគ្នាក្នុងពិធីបុណ្យជ្រមុជទឹក",
      ko: "세례식 감사 예배와 찬양",
    },
    description: {
      en: "Church members gathering around the outdoor baptismal pool to pray, praise, and welcome new brothers and sisters.",
      km: "សមាជិកក្រុមជំនុំជួបជុំគ្នាជុំវិញអាងជ្រមុជទឹក ដើម្បីអធិស្ឋាន សរសើរតម្កើង និងស្វាគមន៍បងប្អូនថ្មីក្នុងព្រះគ្រីស្ទ។",
      ko: "세례탕 주변에 모여 기도하고 찬양하며 새로운 형제자매를 환영하는 은혜로운 시간입니다.",
    },
  },
  {
    id: "photo-baptism-2026-prayer",
    type: "photo",
    category: "baptism",
    src: "/images/baptism-2026-prayer-blessing.jpg",
    badge: { en: "Pastoral Blessing", km: "ការអធិស្ឋានប្រសិទ្ធពរ", ko: "축복 기도" },
    title: {
      en: "Pastoral Blessing & Laying on of Hands",
      km: "ការអធិស្ឋាន និងការដាក់ដៃប្រសិទ្ធពរ",
      ko: "목회자 안수 및 축복 기도",
    },
    description: {
      en: "Pastor Kim Jong Ho and Leader Hun Chet laying hands and praying for spiritual strength and perseverance for the newly baptized.",
      km: "លោកគ្រូគង្វាល គីម ជុងហូ និងលោកគ្រូ ហ៊ុន ចិត្ត ដាក់ដៃអធិស្ឋានសូមព្រះប្រទានកម្លាំង និងភាពខ្ជាប់ខ្ជួនក្នុងជំនឿដល់បងប្អូនដែលទើបទទួលបុណ្យជ្រមុជទឹក។",
      ko: "세례받은 성도들이 믿음 안에서 굳건히 서도록 목회자들이 안수하며 축복 기도합니다.",
    },
  },
  {
    id: "photo-history-beach-baptism",
    type: "photo",
    category: "baptism",
    src: "/images/history-beach-baptism.jpg",
    badge: { en: "Beach Baptism", km: "បុណ្យជ្រមុជទឹកនៅមាត់សមុទ្រ", ko: "해변 세례식" },
    title: {
      en: "Outdoor Ocean Baptism Service",
      km: "ពិធីបុណ្យជ្រមុជទឹកនៅមាត់សមុទ្រ",
      ko: "바닷가 야외 세례식",
    },
    description: {
      en: "Believers publicly professing their faith in Jesus Christ through water immersion at the coast.",
      km: "បងប្អូនប្រកាសជំនឿលើព្រះយេស៊ូវគ្រីស្ទជាសាធារណៈ តាមរយៈពិធីជ្រមុជទឹកនៅមាត់សមុទ្រ។",
      ko: "바닷가에서 물세례를 통해 예수 그리스도를 향한 믿음을 고백하는 성도들입니다.",
    },
  },

  // 4. YOUTH & NEXTGEN
  {
    id: "photo-youth-fellowship-2025-group",
    type: "photo",
    category: "youth",
    src: "/images/youth-fellowship-2025-group.jpg",
    badge: { en: "Youth Retreat • 15 June 2025", km: "ការជួបជុំយុវជន • ១៥ មិថុនា ២០២៥", ko: "청소년 수련회 • 2025년 6월 15일" },
    title: {
      en: "All Nations Youth Fellowship Gathering (15 June 2025)",
      km: "ការជួបជុំ និងការប្រកបគ្នារបស់យុវជនអលណេសិន (១៥ មិថុនា ២០២៥)",
      ko: "올네이션스 청소년 연합 수련회 단체 (2025년 6월 15일)",
    },
    description: {
      en: "A joyful gathering of dozens of vibrant youth, teachers, and leaders coming together for faith, fellowship, and outdoor memories.",
      km: "ការជួបជុំដ៏អធិកអធមរបស់យុវជន លោកគ្រូអ្នកគ្រូ និងអ្នកដឹកនាំជាច្រើននាក់ ក្នុងការកសាងជំនឿ និងការប្រកបគ្នាដ៏ស្រស់បំព្រង។",
      ko: "2025년 6월 15일, 수십 명의 청소년과 교사, 리더들이 함께 모여 신앙과 우정을 나눈 수련회입니다.",
    },
  },
  {
    id: "photo-youth-fellowship-2025-beach",
    type: "photo",
    category: "youth",
    src: "/images/youth-fellowship-2025-beach.jpg",
    badge: { en: "Beach Fellowship", km: "ការប្រកបគ្នានៅឆ្នេរខ្សាច់", ko: "해변 친교" },
    title: {
      en: "Beach Team Building & Brotherhood",
      km: "ល្បែងកម្សាន្ត និងសាមគ្គីភាពនៅមាត់សមុទ្រ",
      ko: "해변 팀 빌딩과 공동체 활동",
    },
    description: {
      en: "Youth bonding through exciting beach games, teamwork, and joyful encouragement along the coastline.",
      km: "យុវជនបង្កើតសាមគ្គីភាព និងក្តីស្រឡាញ់តាមរយៈល្បែងកម្សាន្តជាក្រុមនៅឆ្នេរខ្សាច់។",
      ko: "해변에서 팀 게임과 친교를 통해 주 안에서 하나 됨을 배우는 청소년들입니다.",
    },
  },
  {
    id: "photo-youth-fellowship-2025-praise",
    type: "photo",
    category: "youth",
    src: "/images/youth-fellowship-2025-praise.jpg",
    badge: { en: "Youth Praise", km: "យុវជនច្រៀងសរសើរ", ko: "청소년 찬양" },
    title: {
      en: "Outdoor Worship Under Palm Trees",
      km: "ការថ្វាយបង្គំ និងច្រៀងសរសើរក្រោមម្លប់ដូង",
      ko: "야외 찬양과 기도",
    },
    description: {
      en: "Young people worshiping God with acoustic guitars, joyful clapping, and honest hearts.",
      km: "យុវជនថ្វាយបង្គំព្រះដោយហ្គីតា ការទះដៃដោយអំណរ និងដួងចិត្តស្មោះត្រង់។",
      ko: "기타 반주에 맞춰 손뼉 치며 순수한 마음으로 하나님을 찬양하는 청소년들입니다.",
    },
  },
  {
    id: "photo-youth-fellowship-2025-word",
    type: "photo",
    category: "youth",
    src: "/images/youth-fellowship-2025-word-table.jpg",
    badge: { en: "Word & Fellowship", km: "ព្រះបន្ទូល និងតុអាហារ", ko: "말씀과 교제" },
    title: {
      en: "Bible Discussion Around the Fellowship Table",
      km: "ការពិភាក្សាព្រះបន្ទូលជុំវិញតុអាហារ",
      ko: "식탁 교제와 말씀 나눔",
    },
    description: {
      en: "Sharing delicious fellowship meals and discussing biblical principles for real-life challenges.",
      km: "ការចែករំលែកអាហារដ៏ឆ្ងាញ់ និងការពិភាក្សាអំពីគោលការណ៍ព្រះគម្ពីរសម្រាប់ជីវិតជាក់ស្តែង។",
      ko: "맛있는 음식을 함께 나누며 삶의 고민과 성경적 가치관을 나누는 청소년들입니다.",
    },
  },
  {
    id: "photo-one-to-one-circle",
    type: "photo",
    category: "youth",
    src: "/images/one-to-one-disciple-circle.jpg",
    badge: { en: "Discipleship Circle", km: "រង្វង់បណ្តុះសិស្ស", ko: "제자훈련 서클" },
    title: {
      en: "One-to-One Discipleship & Mentoring",
      km: "ការបណ្តុះសិស្ស និងការបង្ហាត់បង្រៀនយុវជន",
      ko: "일대일 제자훈련과 멘토링",
    },
    description: {
      en: "Leader Hun Chet and church mentors investing in the spiritual walk, character, and prayer lives of emerging leaders.",
      km: "លោកគ្រូ ហ៊ុន ចិត្ត និងអ្នកដឹកនាំវិនិយោគលើជីវិតជំនឿ ចរិតលក្ខណៈ និងការអធិស្ឋានរបស់អ្នកដឹកនាំវ័យក្មេង។",
      ko: "차세대 리더들의 영적 성장과 성품, 기도를 돕는 멘토링 시간입니다.",
    },
  },
  {
    id: "photo-bible-class-grade12",
    type: "photo",
    category: "youth",
    src: "/images/bible-class-grade12-teaching.jpg",
    badge: { en: "Bible Class", km: "ថ្នាក់រៀនព្រះគម្ពីរ", ko: "성경 수업" },
    title: {
      en: "Equipping High School Graduates with Truth",
      km: "ការបំពាក់បំប៉នសិស្សថ្នាក់ទី១២ ដោយសេចក្តីពិត",
      ko: "고등부 학생들을 위한 성경 교육",
    },
    description: {
      en: "Biblical worldview and character training for students preparing for university and future leadership in Cambodia.",
      km: "ការបណ្តុះបណ្តាលទស្សនវិស័យតាមព្រះគម្ពីរ និងចរិតលក្ខណៈសម្រាប់សិស្សត្រៀមចូលសាកលវិទ្យាល័យ។",
      ko: "대학 진학과 미래 사회 진출을 앞둔 학생들을 위한 성경적 세계관 교육입니다.",
    },
  },

  // 5. SUNDAY SCHOOL & KIDS
  {
    id: "photo-sunday-school-hero",
    type: "photo",
    category: "kids",
    src: "/images/sunday-school-hero.jpg",
    badge: { en: "Kids Ministry", km: "ថ្នាក់កុមារ", ko: "어린이부" },
    title: {
      en: "Sunday School Children & Teachers",
      km: "កុមារ និងគ្រូបង្រៀនថ្នាក់ថ្ងៃអាទិត្យ",
      ko: "주일학교 어린이와 교사들",
    },
    description: {
      en: "A vibrant, loving community for children and youth every Sunday morning.",
      km: "សហគមន៍ដែលពោរពេញដោយក្តីស្រឡាញ់ និងការលូតលាស់សម្រាប់កុមាររៀងរាល់ព្រឹកថ្ងៃអាទិត្យ។",
      ko: "매주 주일 아침, 어린이들을 위한 사랑과 활기 넘치는 믿음의 공간입니다.",
    },
  },
  {
    id: "photo-sunday-school-worship",
    type: "photo",
    category: "kids",
    src: "/images/sunday-school-worship.jpg",
    badge: { en: "Kids Praise", km: "កុមារថ្វាយបង្គំ", ko: "어린이 찬양" },
    title: {
      en: "Outdoor Pavilion Praise",
      km: "ការថ្វាយបង្គំកុមារក្រោមដំបូលសាលា",
      ko: "야외 파빌리온 찬양",
    },
    description: {
      en: "Children praising God with joyful action songs and pure hearts.",
      km: "កុមារតូចៗច្រៀង និងរាំថ្វាយព្រះដោយអំណរ និងដួងចិត្តបរិសុទ្ធ។",
      ko: "어린이들이 율동과 맑은 마음으로 하나님을 기쁘게 찬양합니다.",
    },
  },
  {
    id: "photo-sunday-school-community",
    type: "photo",
    category: "kids",
    src: "/images/sunday-school-community.jpg",
    badge: { en: "Next Generation", km: "ជំនាន់ក្រោយ", ko: "다음 세대" },
    title: {
      en: "Generations of Hope & Faith",
      km: "ជំនាន់ថ្មីពោរពេញដោយក្តីសង្ឃឹម",
      ko: "소망과 믿음의 다음 세대",
    },
    description: {
      en: "Joyful group portrait of our Sunday School students after class in the church grounds.",
      km: "រូបថតជួបជុំគ្នារបស់កុមារថ្នាក់ថ្ងៃអាទិត្យបន្ទាប់ពីរៀនព្រះគម្ពីរចប់។",
      ko: "주일학교 성경 수업 후 함께 모인 아이들의 밝은 단체 사진입니다.",
    },
  },
  {
    id: "photo-sunday-school-listening",
    type: "photo",
    category: "kids",
    src: "/images/sunday-school-listening.jpg",
    badge: { en: "Bible Learning", km: "រៀនព្រះគម្ពីរ", ko: "성경 공부" },
    title: {
      en: "Attentive Bible Learning",
      km: "ការរៀនព្រះបន្ទូលព្រះដោយយកចិត្តទុកដាក់",
      ko: "귀 기울이는 말씀 시간",
    },
    description: {
      en: "Children attentively listening to Bible stories, memory verses, and character lessons.",
      km: "កុមារស្តាប់ដំណើររឿងព្រះគម្ពីរ ការទន្ទេញខគម្ពីរ និងការបង្រៀនអំពីសីលធម៌យ៉ាងយកចិត្តទុកដាក់។",
      ko: "성경 이야기와 성품 교훈에 귀 기울이는 아이들의 모습입니다.",
    },
  },

  // 6. CV DIGITAL MINISTRY (True Friend Cambodia)
  {
    id: "photo-cv-efc",
    type: "photo",
    category: "digital",
    src: "https://hunchetblog.wordpress.com/wp-content/uploads/2026/06/cddf7-481059789_1321611435728127_993577711556320171_n.jpg",
    badge: { en: "Conference", km: "សន្និសីទ", ko: "컨퍼런스" },
    title: {
      en: "Sharing the Digital Ministry Model at EFC",
      km: "ការចែករំលែកគំរូព័ន្ធកិច្ចឌីជីថលនៅ EFC",
      ko: "EFC 디지털 사역 모델 발표",
    },
    description: {
      en: "Hun Chet presenting digital evangelism and media outreach strategies to pastors and Christian leaders across Cambodia.",
      km: "លោកគ្រូ ហ៊ុន ចិត្ត បង្ហាញអំពីយុទ្ធសាស្ត្រផ្សាយដំណឹងល្អតាមប្រព័ន្ធឌីជីថលដល់លោកគ្រូគង្វាល និងអ្នកដឹកនាំ។",
      ko: "캄보디아 목회자들과 교회 지도자들에게 디지털 미디어 사역 모델을 소개하는 모습입니다.",
    },
  },
  {
    id: "photo-cv-directing",
    type: "photo",
    category: "digital",
    src: "https://hunchetblog.wordpress.com/wp-content/uploads/2026/06/a631c-481577673_1321022952453642_5665127949675965574_n.jpg",
    badge: { en: "Film Production", km: "ផលិតភាពយន្តខ្លី", ko: "영화 제작" },
    title: {
      en: "Directing Short Films for Online Outreach",
      km: "ការដឹកនាំថតភាពយន្តខ្លីសម្រាប់ការផ្សាយតាមអនឡាញ",
      ko: "온라인 전도 단편 영화 연출",
    },
    description: {
      en: "Producing gospel short films and values-driven storytelling reaching hundreds of thousands of Khmer youth on social media.",
      km: "ការផលិតភាពយន្តខ្លីនៃដំណឹងល្អ ដែលបានទៅដល់យុវជនខ្មែររាប់សែននាក់នៅលើបណ្តាញសង្គម។",
      ko: "SNS를 통해 수많은 캄보디아 청년들에게 다가가는 복음 단편 영화 제작 현장입니다.",
    },
  },
  {
    id: "photo-cv-set",
    type: "photo",
    category: "digital",
    src: "https://hunchetblog.wordpress.com/wp-content/uploads/2026/06/a0ab0-481471242_1321022945786976_5359368866106775056_n.jpg",
    badge: { en: "Behind the Scenes", km: "សកម្មភាពក្រោយឆាក", ko: "현장 비하인드" },
    title: {
      en: "On Set with the Production Crew",
      km: "នៅលើទីតាំងថតជាមួយក្រុមការងារផលិត",
      ko: "제작 스태프와 함께한 촬영 현장",
    },
    description: {
      en: "Collaborating with cinematographers, actors, and media specialists to create high-quality Christian content.",
      km: "សហការជាមួយក្រុមការងារបច្ចេកទេស និងតួសម្តែង ដើម្បីបង្កើតមាតិកាគ្រីស្ទបរិស័ទប្រកបដោយគុណភាពខ្ពស់។",
      ko: "영상 전문가들과 협력하여 양질의 기독교 미디어 콘텐츠를 제작하는 현장입니다.",
    },
  },
  {
    id: "photo-cv-speaking",
    type: "photo",
    category: "digital",
    src: "https://hunchetblog.wordpress.com/wp-content/uploads/2026/06/2da36-14.jpg",
    badge: { en: "Leadership Training", km: "ការបណ្តុះបណ្តាល", ko: "지도자 훈련" },
    title: {
      en: "Training Pastors in Social Media & Online Ministry",
      km: "ការបណ្តុះបណ្តាលលោកគ្រូគង្វាលពីប្រព័ន្ធផ្សព្វផ្សាយសង្គម",
      ko: "목회자 대상 SNS 미디어 훈련",
    },
    description: {
      en: "Equipping local pastors to leverage mobile communication and digital channels for church connection.",
      km: "បំពាក់បំប៉នលោកគ្រូគង្វាលក្នុងស្រុកឲ្យចេះប្រើប្រាស់ប្រព័ន្ធផ្សព្វផ្សាយដើម្បីភ្ជាប់ទំនាក់ទំនងជាមួយសមាជិក។",
      ko: "지역 교회 목회자들이 온라인 소통을 통해 성도들과 연결되도록 돕는 훈련입니다.",
    },
  },

  // 7. THEOLOGY & EQUIPPING
  {
    id: "photo-theology-lecture",
    type: "photo",
    category: "teaching",
    src: "https://hunchetblog.wordpress.com/wp-content/uploads/2026/06/ef58f-481097535_1317882432767694_175058885625152371_n.jpg",
    badge: { en: "Theology Institute", km: "វិទ្យាស្ថានទ្រឹស្តី", ko: "신학원 강의" },
    title: {
      en: "Lecturing on Early Church History",
      km: "ការបង្រៀនប្រវត្តិក្រុមជំនុំដំបូង នៅវិទ្យាស្ថានទ្រឹស្តី",
      ko: "초대교회사 신학 강의",
    },
    description: {
      en: "Serving as lecturer in Early Church History at the Cambodia Presbyterian Theology Institute (2019–2024).",
      km: "បម្រើជាសាស្ត្រាចារ្យបង្រៀនប្រវត្តិក្រុមជំនុំដំបូង នៅវិទ្យាស្ថានទ្រឹស្តីប្រេសប៊ីធារានកម្ពុជា (២០១៩–២០២៤)។",
      ko: "캄보디아 장로교 신학원에서 초대교회사를 강의하며 차세대 목회자들을 양성했습니다.",
    },
  },
  {
    id: "photo-theology-classroom",
    type: "photo",
    category: "teaching",
    src: "https://hunchetblog.wordpress.com/wp-content/uploads/2026/06/2d610-11.jpg",
    badge: { en: "Biblical Education", km: "ការអប់រំតាមព្រះគម្ពីរ", ko: "성경 교육" },
    title: {
      en: "Equipping Future Christian Leaders in the Classroom",
      km: "ការបំពាក់បំប៉នអ្នកដឹកនាំគ្រីស្ទបរិស័ទជំនាន់ក្រោយក្នុងថ្នាក់រៀន",
      ko: "교실에서 양성되는 기독교 지도자들",
    },
    description: {
      en: "Deep biblical exegesis, historical theology, and pastoral ministry preparation for young leaders across Cambodia.",
      km: "ការពន្យល់ព្រះគម្ពីរយ៉ាងស៊ីជម្រៅ ទ្រឹស្តីប្រវត្តិសាស្ត្រ និងការត្រៀមខ្លួនសម្រាប់ព័ន្ធកិច្ចគង្វាល។",
      ko: "성경 주해와 역사신학을 통해 캄보디아 교회의 미래 지도자들을 훈련하는 현장입니다.",
    },
  },
  {
    id: "photo-institute-campus",
    type: "photo",
    category: "teaching",
    src: "/images/all-nations-institute-campus.jpg",
    badge: { en: "ANI Campus", km: "បរិវេណវិទ្យាស្ថាន ANI", ko: "ANI 교육관 전경" },
    title: {
      en: "All Nations Institute Campus & Training Grounds",
      km: "បរិវេណវិទ្យាស្ថានអលណេសិន (ANI)",
      ko: "올네이션스 인스티튜트 교육관",
    },
    description: {
      en: "The educational facilities, computer labs, classrooms, and dormitory for students in Trapaing Krasang, Phnom Penh.",
      km: "អគារអប់រំ បន្ទប់កុំព្យូទ័រ ថ្នាក់រៀន និងអន្តេវាសិកដ្ឋានសម្រាប់សិស្សនិស្សិតនៅភូមិត្រពាំងក្រសាំង។",
      ko: "학생들을 위한 강의실, 컴퓨터실, 기숙사를 갖춘 교육 훈련 공간입니다.",
    },
  },
];
