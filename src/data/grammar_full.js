export const grammar_full = [

  // ================= 12 TENSES =================

  {
    type: "tense",
    name: "Present Simple",
    formula: "S + V(s/es)",
    use: "Thói quen, sự thật",
    example: "I work every day.",
    vi: "Tôi làm việc mỗi ngày"
  },

  {
    type: "tense",
    name: "Present Continuous",
    formula: "S + am/is/are + V-ing",
    use: "Đang diễn ra",
    example: "I am working now.",
    vi: "Tôi đang làm việc"
  },

  {
    type: "tense",
    name: "Past Simple",
    formula: "S + V2/ed",
    use: "Đã xảy ra",
    example: "I worked yesterday.",
    vi: "Tôi đã làm việc hôm qua"
  },

  {
    type: "tense",
    name: "Future Simple",
    formula: "S + will + V",
    use: "Tương lai",
    example: "I will work tomorrow.",
    vi: "Tôi sẽ làm việc"
  },

  {
    type: "tense",
    name: "Present Perfect",
    formula: "S + have/has + V3",
    use: "Đã làm xong",
    example: "I have finished my work.",
    vi: "Tôi đã hoàn thành"
  },

  // ================= STRUCTURES =================

  {
    type: "structure",
    name: "There is / There are",
    formula: "There is/are + N",
    use: "Có cái gì đó",
    example: "There is a problem.",
    vi: "Có một vấn đề"
  },

  {
    type: "structure",
    name: "Too + adj + to V",
    formula: "Too + adj + to V",
    use: "Quá… không thể",
    example: "It is too hot to work.",
    vi: "Quá nóng để làm việc"
  },

  {
    type: "structure",
    name: "Enough to",
    formula: "Adj + enough + to V",
    use: "Đủ để",
    example: "He is strong enough to lift it.",
    vi: "Anh ấy đủ mạnh để nâng"
  },

  {
    type: "structure",
    name: "Used to",
    formula: "S + used to + V",
    use: "Đã từng",
    example: "I used to live here.",
    vi: "Tôi từng sống ở đây"
  },

  // ================= CONNECTORS =================

  {
    type: "connector",
    name: "Because",
    formula: "Because + S + V",
    use: "Bởi vì",
    example: "I stayed home because it rained.",
    vi: "Tôi ở nhà vì mưa"
  },

  {
    type: "connector",
    name: "Although",
    formula: "Although + S + V",
    use: "Mặc dù",
    example: "Although it is hard, I try.",
    vi: "Dù khó tôi vẫn cố"
  },

  {
    type: "connector",
    name: "So",
    formula: "S + V, so + S + V",
    use: "Vì vậy",
    example: "It was late, so I slept.",
    vi: "Trễ nên tôi ngủ"
  },

  // ================= BUSINESS =================

  {
    type: "business",
    name: "Make a decision",
    formula: "make + decision",
    use: "Ra quyết định",
    example: "We need to make a decision quickly.",
    vi: "Chúng ta cần quyết định nhanh"
  },

  {
    type: "business",
    name: "Increase sales",
    formula: "increase + sales",
    use: "Tăng doanh số",
    example: "We want to increase sales.",
    vi: "Chúng tôi muốn tăng doanh số"
  },

  {
    type: "business",
    name: "Reduce cost",
    formula: "reduce + cost",
    use: "Giảm chi phí",
    example: "We must reduce costs.",
    vi: "Chúng ta phải giảm chi phí"
  }

];