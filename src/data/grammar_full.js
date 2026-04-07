export const grammar_full = [

  // ================= 12 TENSES =================

  {
    type: "tense",
    name: "Present Simple",
    formula: "S + V(s/es)",
    use: "Thói quen, sự thật",
    example: "I work every day.",
    zh: "我每天工作",
    pinyin: "wǒ měi tiān gōng zuò",
    vi: "Tôi làm việc mỗi ngày"
  },

  {
    type: "tense",
    name: "Present Continuous",
    formula: "S + am/is/are + V-ing",
    use: "Đang diễn ra",
    example: "I am working now.",
    zh: "我正在工作",
    pinyin: "wǒ zhèng zài gōng zuò",
    vi: "Tôi đang làm việc"
  },

  {
    type: "tense",
    name: "Past Simple",
    formula: "S + V2/ed",
    use: "Đã xảy ra",
    example: "I worked yesterday.",
    zh: "我昨天工作了",
    pinyin: "wǒ zuó tiān gōng zuò le",
    vi: "Tôi đã làm việc hôm qua"
  },

  {
    type: "tense",
    name: "Future Simple",
    formula: "S + will + V",
    use: "Tương lai",
    example: "I will work tomorrow.",
    zh: "我明天会工作",
    pinyin: "wǒ míng tiān huì gōng zuò",
    vi: "Tôi sẽ làm việc"
  },

  {
    type: "tense",
    name: "Present Perfect",
    formula: "S + have/has + V3",
    use: "Đã làm xong",
    example: "I have finished my work.",
    zh: "我已经完成工作",
    pinyin: "wǒ yǐ jīng wán chéng gōng zuò",
    vi: "Tôi đã hoàn thành"
  },

  // ================= STRUCTURES =================

  {
    type: "structure",
    name: "There is / There are",
    formula: "There is/are + N",
    use: "Có cái gì đó",
    example: "There is a problem.",
    zh: "有一个问题",
    pinyin: "yǒu yí gè wèn tí",
    vi: "Có một vấn đề"
  },

  {
    type: "structure",
    name: "Too + adj + to V",
    formula: "Too + adj + to V",
    use: "Quá… không thể",
    example: "It is too hot to work.",
    zh: "太热了不能工作",
    pinyin: "tài rè le bù néng gōng zuò",
    vi: "Quá nóng để làm việc"
  },

  {
    type: "structure",
    name: "Enough to",
    formula: "Adj + enough + to V",
    use: "Đủ để",
    example: "He is strong enough to lift it.",
    zh: "他够强可以举起它",
    pinyin: "tā gòu qiáng kě yǐ jǔ qǐ tā",
    vi: "Anh ấy đủ mạnh để nâng"
  },

  {
    type: "structure",
    name: "Used to",
    formula: "S + used to + V",
    use: "Đã từng",
    example: "I used to live here.",
    zh: "我以前住在这里",
    pinyin: "wǒ yǐ qián zhù zài zhè lǐ",
    vi: "Tôi từng sống ở đây"
  },

  // ================= CONNECTORS =================

  {
    type: "connector",
    name: "Because",
    formula: "Because + S + V",
    use: "Bởi vì",
    example: "I stayed home because it rained.",
    zh: "因为下雨我在家",
    pinyin: "yīn wèi xià yǔ wǒ zài jiā",
    vi: "Tôi ở nhà vì mưa"
  },

  {
    type: "connector",
    name: "Although",
    formula: "Although + S + V",
    use: "Mặc dù",
    example: "Although it is hard, I try.",
    zh: "虽然很难但我尝试",
    pinyin: "suī rán hěn nán dàn wǒ cháng shì",
    vi: "Dù khó tôi vẫn cố"
  },

  {
    type: "connector",
    name: "So",
    formula: "S + V, so + S + V",
    use: "Vì vậy",
    example: "It was late, so I slept.",
    zh: "很晚了所以我睡了",
    pinyin: "hěn wǎn le suǒ yǐ wǒ shuì le",
    vi: "Trễ nên tôi ngủ"
  },

  // ================= BUSINESS =================

  {
    type: "business",
    name: "Make a decision",
    formula: "make + decision",
    use: "Ra quyết định",
    example: "We need to make a decision quickly.",
    zh: "我们需要快速做决定",
    pinyin: "wǒ men xū yào kuài sù zuò jué dìng",
    vi: "Chúng ta cần quyết định nhanh"
  },

  {
    type: "business",
    name: "Increase sales",
    formula: "increase + sales",
    use: "Tăng doanh số",
    example: "We want to increase sales.",
    zh: "我们想提高销售",
    pinyin: "wǒ men xiǎng tí gāo xiāo shòu",
    vi: "Chúng tôi muốn tăng doanh số"
  },

  {
    type: "business",
    name: "Reduce cost",
    formula: "reduce + cost",
    use: "Giảm chi phí",
    example: "We must reduce costs.",
    zh: "我们必须降低成本",
    pinyin: "wǒ men bì xū jiàng dī chéng běn",
    vi: "Chúng ta phải giảm chi phí"
  }

];