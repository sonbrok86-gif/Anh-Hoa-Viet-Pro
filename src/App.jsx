import { useEffect, useMemo, useState } from "react";
import { topicCatalog, topicData } from "./data/topics";
import { irregularVerbs } from "./data/verbs";
import { grammar_full } from "./data/grammar_full";
import { grammar_advanced } from "./data/grammar_advanced";
import { grammar_full_pro } from "./data/grammar_full_pro";
import { styles } from "./styles/appstyles";
import { antonyms_full_1 } from "./data/antonyms_full_1";
import { antonyms_full_2 } from "./data/antonyms_full_2";
import { antonyms_full_3 } from "./data/antonyms_full_3";
import { verbs_basic } from "./data/verbs_basic";
import { verbs_intermediate } from "./data/verbs_intermediate";
import { verbs_advanced } from "./data/verbs_advanced";
import { adjectives_basic } from "./data/adjectives_basic";
import { adjectives_intermediate } from "./data/adjectives_intermediate";
import { adjectives_advanced } from "./data/adjectives_advanced";
import { sentences_common } from "./data/sentences_common";
import { dialogues } from "./data/dialogues";
import { lifeLessons1 } from "./data/life_lesson_1";
import { lifeLessons3 } from "./data/life_lesson_3";
import { lifeLessons4 } from "./data/life_lesson_4";
import { lifeLessons5 } from "./data/life_lesson_5";
import { lifeLessons6 } from "./data/life_lesson_6";
import { grammar_quiz_bank_1 } from "./data/grammar_quiz_bank_1";

const allAntonyms = [
  ...antonyms_full_1,
  ...antonyms_full_2,
  ...antonyms_full_3,
];

const allVerbs = [
  ...verbs_basic,
  ...verbs_intermediate,
  ...verbs_advanced,
];

const allAdjectives = [
  ...adjectives_basic,
  ...adjectives_intermediate,
  ...adjectives_advanced,
];

const allGrammar = [
  ...grammar_full,
  ...grammar_advanced,
...grammar_full_pro,
];
const allLifeLessons = [
  ...lifeLessons1,
  ...lifeLessons3,
  ...lifeLessons4,
  ...lifeLessons5,
  ...lifeLessons6
];
function StatCard({ number, label }) {
  return (
    <div style={styles.statCard}>
      <div style={styles.statNumber}>{number}</div>
      <div style={styles.statLabel}>{label}</div>
    </div>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        ...styles.tabButton,
        ...(active ? styles.tabButtonActive : {}),
      }}
    >
      {children}
    </button>
  );
}

export default function App() {
const [showProModal, setShowProModal] = useState(false);
const [topicPage, setTopicPage] = useState(1);
const [verbsPage, setVerbsPage] = useState(1);
const [adjectivesPage, setAdjectivesPage] = useState(1);
const [isPro, setIsPro] = useState(() => {
  const saved = localStorage.getItem("isPro");
  return saved ? JSON.parse(saved) : false;
});
const [antonymsPage, setAntonymsPage] = useState(1);
const [sentencesPage, setSentencesPage] = useState(1);
const [dialoguesPage, setDialoguesPage] = useState(1);
const [lifePage, setLifePage] = useState(1);
  const [mainTab, setMainTab] = useState("topics");
  const [topicIndex, setTopicIndex] = useState(0);
  const [topicSearch, setTopicSearch] = useState("");
  const [lexiconSearch, setLexiconSearch] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [randomMode, setRandomMode] = useState(false);
  const [randomWord, setRandomWord] = useState(null);
const [openWordIndex, setOpenWordIndex] = useState(null);

const [favoriteIds, setFavoriteIds] = useState(() => {
  const saved = localStorage.getItem("favoriteIds");
  return saved ? JSON.parse(saved) : [];
});

const [reviewItems, setReviewItems] = useState(() => {
  const saved = localStorage.getItem("reviewItems");
  return saved ? JSON.parse(saved) : [];
});const [reviewMode, setReviewMode] = useState(false);
const [reviewQueue, setReviewQueue] = useState([]);
const [reviewIndex, setReviewIndex] = useState(0);
const [reviewShowAnswer, setReviewShowAnswer] = useState(false);
const [reviewKnown, setReviewKnown] = useState(0);
const [reviewUnknown, setReviewUnknown] = useState(0);

  const [quizWord, setQuizWord] = useState(null);
  const [quizMode, setQuizMode] = useState("en-vi");
  const [quizOptions, setQuizOptions] = useState([]);
  const [quizResult, setQuizResult] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const [grammarQuizItem, setGrammarQuizItem] = useState(null);
  const [grammarQuizOptions, setGrammarQuizOptions] = useState([]);
  const [grammarQuizAnswer, setGrammarQuizAnswer] = useState(null);
  const [grammarQuizCorrect, setGrammarQuizCorrect] = useState(null);
  const [grammarQuizScore, setGrammarQuizScore] = useState(() => {
    return Number(localStorage.getItem("grammarQuizScore")) || 0;
  });
  const [grammarQuizAnswered, setGrammarQuizAnswered] = useState(false);
  const [grammarQuizMessage, setGrammarQuizMessage] = useState("");
const [grammarLevel, setGrammarLevel] = useState("all");
const [grammarCategory, setGrammarCategory] = useState("all");
const [grammarMode, setGrammarMode] = useState("practice"); // practice | exam
const [grammarExamSize, setGrammarExamSize] = useState(10);
const [grammarExamQueue, setGrammarExamQueue] = useState([]);
const [grammarExamIndex, setGrammarExamIndex] = useState(0);
const [grammarExamCorrectCount, setGrammarExamCorrectCount] = useState(0);
const [grammarExamWrongCount, setGrammarExamWrongCount] = useState(0);
const [grammarWrongBank, setGrammarWrongBank] = useState(() => {
  const saved = localStorage.getItem("grammarWrongBank");
  return saved ? JSON.parse(saved) : [];
});
const [grammarQuizUsedIds, setGrammarQuizUsedIds] = useState([]);
const [grammarView, setGrammarView] = useState("theory"); // theory | quiz

  const [listeningWord, setListeningWord] = useState(null);
  const [listeningOptions, setListeningOptions] = useState([]);
  const [listeningResult, setListeningResult] = useState("");
  const [listeningAnswer, setListeningAnswer] = useState(null);
  const [listeningMode, setListeningMode] = useState("en-vi");

  const [topicProgress, setTopicProgress] = useState(() => {
    const saved = localStorage.getItem("topicProgress");
    return saved ? JSON.parse(saved) : {};
  });

  const [score, setScore] = useState(() => {
    return Number(localStorage.getItem("score")) || 0;
  });

  const selectedTopic =
    topicData[topicIndex] || {
      id: "default",
      words: [],
      icon: "📘",
      name: "Chủ đề",
    };

  const filteredTopicWords = useMemo(() => {
    const q = topicSearch.trim().toLowerCase();
    if (!q) return selectedTopic.words;

    return selectedTopic.words.filter((w) =>
      [w.en, w.zh, w.vi, w.pinyin].some((v) =>
        String(v || "").toLowerCase().includes(q)
      )
    );
  }, [topicSearch, selectedTopic]);

  const filteredVerbs = useMemo(() => {
    const q = lexiconSearch.trim().toLowerCase();
    if (!q) return allVerbs;
    return allVerbs.filter((v) =>
      [v.en, v.zh, v.vi, v.pinyin, v.example].some((value) =>
        String(value || "").toLowerCase().includes(q)
      )
    );
  }, [lexiconSearch]);

  const filteredAdjectives = useMemo(() => {
    const q = lexiconSearch.trim().toLowerCase();
    if (!q) return allAdjectives;
    return allAdjectives.filter((v) =>
      [v.en, v.zh, v.vi, v.pinyin, v.example].some((value) =>
        String(value || "").toLowerCase().includes(q)
      )
    );
  }, [lexiconSearch]);

  const filteredAntonyms = useMemo(() => {
    const q = lexiconSearch.trim().toLowerCase();
    if (!q) return allAntonyms;

    return allAntonyms.filter((v) =>
      [
        v.en1,
        v.en2,
        v.zh1,
        v.zh2,
        v.vi1,
        v.vi2,
        v.pinyin1,
        v.pinyin2,
      ].some((value) => String(value || "").toLowerCase().includes(q))
    );
  }, [lexiconSearch]);
const grammarQuizSource = grammar_quiz_bank_1 || [];

const grammarCategories = Array.from(
  new Set(grammarQuizSource.map((item) => item.category).filter(Boolean))
);

const filteredGrammarQuizItems = useMemo(() => {
  return grammarQuizSource.filter((item) => {
    const levelOk = grammarLevel === "all" ? true : item.level === grammarLevel;
    const categoryOk = grammarCategory === "all" ? true : item.category === grammarCategory;
    return levelOk && categoryOk;
  });
}, [grammarQuizSource, grammarLevel, grammarCategory]);
const filteredGrammarTheory = useMemo(() => {
  return allGrammar.filter((item) => {
    const levelOk = grammarLevel === "all" ? true : item.level === grammarLevel;
    const categoryOk = grammarCategory === "all" ? true : item.category === grammarCategory;
    return levelOk && categoryOk;
  });
}, [grammarLevel, grammarCategory]);

  const filteredSentences = useMemo(() => {
    const q = lexiconSearch.trim().toLowerCase();
    if (!q) return sentences_common;

    return sentences_common.filter((item) =>
      [item.en, item.zh, item.pinyin, item.vi].some((value) =>
        String(value || "").toLowerCase().includes(q)
      )
    );
  }, [lexiconSearch]);

  const filteredDialogues = useMemo(() => {
    const q = lexiconSearch.trim().toLowerCase();
    if (!q) return dialogues;

    return dialogues.filter((dialogue) =>
      [dialogue.topic, dialogue.level].some((value) =>
        String(value || "").toLowerCase().includes(q)
      )
    );
  }, [lexiconSearch]);
  useEffect(() => {
    setTopicPage(1);
  }, [topicIndex, topicSearch]);

  useEffect(() => {
    setVerbsPage(1);
    setAdjectivesPage(1);
    setAntonymsPage(1);
    setSentencesPage(1);
    setDialoguesPage(1);
  }, [lexiconSearch]);

  useEffect(() => {
    setLifePage(1);
  }, [mainTab]);
useEffect(() => {
  localStorage.setItem("favoriteIds", JSON.stringify(favoriteIds));
}, [favoriteIds]);
useEffect(() => {
  localStorage.setItem("grammarWrongBank", JSON.stringify(grammarWrongBank));
}, [grammarWrongBank]);

useEffect(() => {
  localStorage.setItem("reviewItems", JSON.stringify(reviewItems));
}, [reviewItems]);
useEffect(() => {
  localStorage.setItem("isPro", JSON.stringify(isPro));
}, [isPro]);
useEffect(() => {
  if (typeof window === "undefined") return;
  if (!("speechSynthesis" in window)) return;

  const synth = window.speechSynthesis;

  const loadVoices = () => {
    synth.getVoices();
  };

  loadVoices();

  if (typeof synth.addEventListener === "function") {
    synth.addEventListener("voiceschanged", loadVoices);
    return () => synth.removeEventListener("voiceschanged", loadVoices);
  }
}, []);

  function pickRandomWord() {
    if (!selectedTopic.words.length) return;
    const item =
      selectedTopic.words[
        Math.floor(Math.random() * selectedTopic.words.length)
      ];
    setRandomWord(item);
    setShowAnswer(false);
  }

  function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  function generateQuiz(mode = quizMode) {
    const words = selectedTopic.words;
    if (words.length < 4) return;

    const correct = words[Math.floor(Math.random() * words.length)];
    let prompt = "";
    let answer = "";
    let wrongPool = [];

    if (mode === "en-vi") {
      prompt = correct.en;
      answer = correct.vi;
      wrongPool = words.filter((w) => w.vi !== correct.vi).map((w) => w.vi);
    } else if (mode === "vi-en") {
      prompt = correct.vi;
      answer = correct.en;
      wrongPool = words.filter((w) => w.en !== correct.en).map((w) => w.en);
    } else if (mode === "zh-vi") {
      prompt = correct.zh;
      answer = correct.vi;
      wrongPool = words.filter((w) => w.vi !== correct.vi).map((w) => w.vi);
    }

    const wrongOptions = shuffleArray(wrongPool).slice(0, 3);
    const options = shuffleArray([answer, ...wrongOptions]);

    setQuizWord({ ...correct, prompt, answer });
    setQuizOptions(options);
    setSelectedAnswer(null);
    setQuizResult("");
  }

  function generateGrammarQuiz(fromList = null) {
  const source = fromList || filteredGrammarQuizItems;

  if (!source || source.length < 1) return;

  let available = source.filter((item) => !grammarQuizUsedIds.includes(item.id));

  if (available.length === 0) {
    setGrammarQuizUsedIds([]);
    available = source;
  }

  const randomItem = available[Math.floor(Math.random() * available.length)];

  setGrammarQuizItem(randomItem);
  setGrammarQuizOptions(
    [...randomItem.options].sort(() => Math.random() - 0.5)
  );
  setGrammarQuizAnswer(randomItem.correct);
  setGrammarQuizCorrect(null);
  setGrammarQuizAnswered(false);
  setGrammarQuizMessage("");
  setGrammarQuizUsedIds((prev) => [...prev, randomItem.id]);
}
  function handleGrammarQuizAnswer(option) {
  if (grammarQuizAnswered || !grammarQuizItem) return;

  const isCorrect = option === grammarQuizAnswer;

  setGrammarQuizCorrect(isCorrect);
  setGrammarQuizAnswered(true);

  if (isCorrect) {
    const newScore = grammarQuizScore + 1;
    setGrammarQuizScore(newScore);
    localStorage.setItem("grammarQuizScore", String(newScore));
    setGrammarQuizMessage("✅ Đúng rồi");

    if (grammarMode === "exam") {
      setGrammarExamCorrectCount((v) => v + 1);
    }
  } else {
    setGrammarQuizMessage(`❌ Sai. Đáp án đúng là: ${grammarQuizAnswer}`);

    setGrammarWrongBank((prev) => {
      if (prev.some((x) => x.id === grammarQuizItem.id)) return prev;
      return [...prev, grammarQuizItem];
    });

    if (grammarMode === "exam") {
      setGrammarExamWrongCount((v) => v + 1);
    }
  }
}
function startGrammarExam(size = 10) {
  if (!filteredGrammarQuizItems.length) return;

  const shuffled = [...filteredGrammarQuizItems].sort(() => Math.random() - 0.5);
  const examItems = shuffled.slice(0, size);

  setGrammarMode("exam");
  setGrammarExamSize(size);
  setGrammarExamQueue(examItems);
  setGrammarExamIndex(0);
  setGrammarExamCorrectCount(0);
  setGrammarExamWrongCount(0);
  setGrammarQuizUsedIds([]);

  if (examItems.length > 0) {
    generateGrammarQuiz(examItems);
  }
}

function nextGrammarExamQuestion() {
  const nextIndex = grammarExamIndex + 1;

  if (nextIndex >= grammarExamQueue.length) {
    setGrammarQuizMessage(
      `🏁 Hoàn thành bài thi. Đúng: ${grammarExamCorrectCount} | Sai: ${grammarExamWrongCount}`
    );
    return;
  }

  setGrammarExamIndex(nextIndex);
  const nextItem = grammarExamQueue[nextIndex];

  setGrammarQuizItem(nextItem);
  setGrammarQuizOptions([...nextItem.options].sort(() => Math.random() - 0.5));
  setGrammarQuizAnswer(nextItem.correct);
  setGrammarQuizCorrect(null);
  setGrammarQuizAnswered(false);
  setGrammarQuizMessage("");
}

function resetGrammarExam() {
  setGrammarMode("practice");
  setGrammarExamQueue([]);
  setGrammarExamIndex(0);
  setGrammarExamCorrectCount(0);
  setGrammarExamWrongCount(0);
  setGrammarQuizUsedIds([]);
  generateGrammarQuiz();
}
 function getMobileFriendlyVoice(lang = "en-US") {
  if (!window.speechSynthesis) return null;

  const voices = window.speechSynthesis.getVoices();

  if (!voices.length) return null;

  const langLower = lang.toLowerCase();

  return (
    voices.find(v => v.lang.toLowerCase() === langLower) ||
    voices.find(v => v.lang.toLowerCase().includes(langLower.split("-")[0])) ||
    null
  );
}

function unlockSpeech() {
  if (typeof window === "undefined") return;
  if (!("speechSynthesis" in window)) return;

  try {
    const synth = window.speechSynthesis;

    synth.cancel();

    const warmup = new SpeechSynthesisUtterance(".");
    warmup.volume = 0;
    warmup.rate = 1;
    warmup.pitch = 1;

    synth.speak(warmup);

  } catch (err) {
    console.log("unlock speech error", err);
  }
}

function speakText(text, lang = "en-US") {
  if (!text) return;
  if (!window.speechSynthesis) return;

  try {
    const synth = window.speechSynthesis;

    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = lang;
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    const voice = getMobileFriendlyVoice(lang);

    if (voice) utterance.voice = voice;

    synth.speak(utterance);

  } catch (err) {
    console.log("speech error", err);
  }
}

function speakSequence(texts = [], lang = "en-US") {
  if (!texts.length) return;

  let index = 0;

  function speakNext() {
    if (index >= texts.length) return;

    const utterance = new SpeechSynthesisUtterance(texts[index]);

    utterance.lang = lang;
    utterance.rate = 0.9;

    const voice = getMobileFriendlyVoice(lang);

    if (voice) utterance.voice = voice;

    utterance.onend = () => {
      index++;
      setTimeout(speakNext, 200);
    };

    window.speechSynthesis.speak(utterance);
  }

  window.speechSynthesis.cancel();

  speakNext();
}

function handleSpeak(e, text, lang = "en-US") {
  e.preventDefault();
  e.stopPropagation();

  unlockSpeech();

  setTimeout(() => {
    speakText(text, lang);
  }, 120);
}

function handleSpeakSequence(e, texts, lang = "en-US") {
  e.preventDefault();
  e.stopPropagation();

  unlockSpeech();

  setTimeout(() => {
    speakSequence(texts, lang);
  }, 120);
}
  function generateListeningQuiz(mode = listeningMode) {
    const words = selectedTopic.words;
    if (words.length < 4) return;

    const correct = words[Math.floor(Math.random() * words.length)];
    let answer = "";
    let wrongPool = [];

    if (mode === "en-vi") {
      answer = correct.vi;
      wrongPool = words.filter((w) => w.vi !== correct.vi).map((w) => w.vi);
    } else if (mode === "zh-vi") {
      answer = correct.vi;
      wrongPool = words.filter((w) => w.vi !== correct.vi).map((w) => w.vi);
    } else if (mode === "vi-en") {
      answer = correct.en;
      wrongPool = words.filter((w) => w.en !== correct.en).map((w) => w.en);
    }

    const wrongOptions = shuffleArray(wrongPool).slice(0, 3);
    const options = shuffleArray([answer, ...wrongOptions]);

    setListeningWord({ ...correct, answer });
    setListeningOptions(options);
    setListeningResult("");
    setListeningAnswer(null);
  }

  function handleCorrectAnswer() {
    const newScore = score + 1;
    setScore(newScore);
    localStorage.setItem("score", String(newScore));

    const topicId = selectedTopic.id;
    const newProgress = {
      ...topicProgress,
      [topicId]: (topicProgress[topicId] || 0) + 1,
    };

    setTopicProgress(newProgress);
    localStorage.setItem("topicProgress", JSON.stringify(newProgress));
  }
function toggleFavorite(id) {
  setFavoriteIds((prev) =>
    prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
  );
}

function addToReview(item) {
  const reviewId = item.id || `${item.en || ""}-${item.zh || ""}-${item.vi || ""}`;

  setReviewItems((prev) => {
    if (prev.some((x) => x._reviewId === reviewId)) return prev;
    return [...prev, { ...item, _reviewId: reviewId }];
  });
}

function startReviewSession(shuffle = true) {
  if (!reviewItems.length) return;

  const items = shuffle
    ? [...reviewItems].sort(() => Math.random() - 0.5)
    : [...reviewItems];

  setReviewQueue(items);
  setReviewIndex(0);
  setReviewShowAnswer(false);
  setReviewKnown(0);
  setReviewUnknown(0);
  setReviewMode(true);
}

function stopReviewSession() {
  setReviewMode(false);
  setReviewQueue([]);
  setReviewIndex(0);
  setReviewShowAnswer(false);
}

function handleReviewAnswer(isKnown) {
  const current = reviewQueue[reviewIndex];
  if (!current) return;

  if (isKnown) {
    setReviewKnown((v) => v + 1);
  } else {
    setReviewUnknown((v) => v + 1);
    setReviewQueue((prev) => [...prev, current]);
  }

  if (reviewIndex >= reviewQueue.length - 1) {
    setReviewShowAnswer(false);
    return;
  }

  setReviewIndex((v) => v + 1);
  setReviewShowAnswer(false);
}
function paginate(items, page = 1, pageSize = 8) {
  const safeItems = Array.isArray(items) ? items : [];
  const totalPages = Math.max(1, Math.ceil(safeItems.length / pageSize));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = (currentPage - 1) * pageSize;
  const pagedItems = safeItems.slice(start, start + pageSize);
  return {
    pagedItems,
    totalPages,
    currentPage,
  };
}
const favoriteTopicWords = topicData.flatMap((topic) =>
  topic.words
    .filter((word) =>
      favoriteIds.includes(word.id || `${topic.id}-${word.en}-${word.zh}-${word.vi}`)
    )
    .map((word) => ({
      ...word,
      _favId: word.id || `${topic.id}-${word.en}-${word.zh}-${word.vi}`,
      _topicName: topic.name,
    }))
);
function openProModal() {
  setShowProModal(true);
}

function closeProModal() {
  setShowProModal(false);
};
function Pager({ page, totalPages, onPrev, onNext }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
        marginTop: 18,
        flexWrap: "wrap",
      }}
    >
      <button
        onClick={onPrev}
        disabled={page <= 1}
        style={{
          ...styles.tabButton,
          color: "#1e293b",
          background: "#ffffff",
          opacity: page <= 1 ? 0.5 : 1,
        }}
      >
        ← Trước
      </button>

      <div style={{ fontWeight: 700, color: "#334155" }}>
        Trang {page}/{totalPages}
      </div>

      <button
        onClick={onNext}
        disabled={page >= totalPages}
        style={{
          ...styles.tabButton,
          color: "#1e293b",
          background: "#ffffff",
          opacity: page >= totalPages ? 0.5 : 1,
        }}
      >
        Tiếp →
      </button>
    </div>
  );
}
const topicPaged = paginate(filteredTopicWords, topicPage, 8);
const currentReviewItem = reviewQueue[reviewIndex] || null;
const reviewProgressTotal = reviewQueue.length || 1;
const reviewProgressPercent = Math.min(
  100,
  Math.round(((reviewIndex + 1) / reviewProgressTotal) * 100)
);
const verbsPaged = paginate(filteredVerbs, verbsPage, 8);
const adjectivesPaged = paginate(filteredAdjectives, adjectivesPage, 8);
const antonymsPaged = paginate(filteredAntonyms, antonymsPage, 6);
const sentencesPaged = paginate(filteredSentences, sentencesPage, 6);
const dialoguesPaged = paginate(filteredDialogues, dialoguesPage, 1);
const lifePaged = paginate(allLifeLessons, lifePage, 1);
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.hero}>
          <div>
<div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
  <button
    onClick={() => setIsPro(true)}
    style={{ ...styles.tabButton, color: "#1e293b", background: "#ffffff" }}
  >
    Mở PRO
  </button>

  <button
    onClick={() => setIsPro(false)}
    style={{ ...styles.tabButton, color: "#1e293b", background: "#ffffff" }}
  >
    Về FREE
  </button>
</div>
            <div style={styles.badge}>PRO BUILD</div>
            <h1 style={styles.title}>App học Anh - Hoa - Việt PRO</h1>
            <p style={styles.subtitle}>
              Nền tảng học cho người Việt: từ vựng theo chủ đề, động từ bất quy
              tắc, bộ động từ thường dùng, tính từ thường dùng, cặp từ trái
              nghĩa và khung ngữ pháp nền tảng để tiếp tục bơm dữ liệu lớn.
            </p>
          </div>

          <div style={styles.statRow}>
            <StatCard number={topicCatalog.length} label="Chủ đề mục tiêu" />
            <StatCard
              number={topicData.reduce((s, t) => s + t.words.length, 0)}
              label="Từ mẫu đã bơm"
            />
            <StatCard number={irregularVerbs.length} label="Động từ BQ tắc" />
            <StatCard number={allGrammar.length} label="Mục ngữ pháp" />
          </div>
        </div>

        <div style={styles.tabRow}>
          <TabButton active={mainTab === "topics"} onClick={() => setMainTab("topics")}>
            Từ vựng chủ đề
          </TabButton>

          <TabButton active={mainTab === "verbs"} onClick={() => setMainTab("verbs")}>
            Động từ
          </TabButton>

          <TabButton active={mainTab === "adjectives"} onClick={() => setMainTab("adjectives")}>
            Tính từ
          </TabButton>

         <TabButton
  active={mainTab === "antonyms"}
  onClick={() => {
    if (!isPro) {
      openProModal();
      return;
    }
    setMainTab("antonyms");
  }}
>
  Trái nghĩa {!isPro ? "🔒" : ""}
</TabButton>

         <TabButton
  active={mainTab === "grammar"}
  onClick={() => {
    if (!isPro) {
      openProModal();
      return;
    }
    setMainTab("grammar");
    generateGrammarQuiz();
  }}
>
  Ngữ pháp {!isPro ? "🔒" : ""}
</TabButton>

        <TabButton
  active={mainTab === "quiz"}
  onClick={() => {
    if (!isPro) {
      openProModal();
      return;
    }
    setMainTab("quiz");
    generateQuiz();
  }}
>
  Quiz {!isPro ? "🔒" : ""}
</TabButton>

         <TabButton
  active={mainTab === "listening"}
  onClick={() => {
    if (!isPro) {
      openProModal();
      return;
    }
    setMainTab("listening");
    generateListeningQuiz();
  }}
>
  Quiz nghe {!isPro ? "🔒" : ""}
</TabButton>

          <TabButton
  active={mainTab === "sentences"}
  onClick={() => {
    if (!isPro) {
      openProModal();
      return;
    }
    setMainTab("sentences");
  }}
>
  Câu giao tiếp {!isPro ? "🔒" : ""}
</TabButton>

         <TabButton
  active={mainTab === "dialogues"}
  onClick={() => {
    if (!isPro) {
      openProModal();
      return;
    }
    setMainTab("dialogues");
  }}
>
  Hội thoại {!isPro ? "🔒" : ""}
</TabButton>
<TabButton
  active={mainTab === "life"}
  onClick={() => {
    if (!isPro) {
      openProModal();
      return;
    }
    setMainTab("life");
  }}
>
  Life Lessons {!isPro ? "🔒" : ""}
</TabButton>

<TabButton
  active={mainTab === "favorites"}
  onClick={() => {
    if (!isPro) {
      openProModal();
      return;
    }
    setMainTab("favorites");
  }}
>
  Yêu thích {!isPro ? "🔒" : ""}
</TabButton>

<TabButton
  active={mainTab === "review"}
  onClick={() => {
    if (!isPro) {
      openProModal();
      return;
    }
    setMainTab("review");
  }}
>
  Ôn tập {!isPro ? "🔒" : ""}
</TabButton>
          <TabButton active={mainTab === "roadmap"} onClick={() => setMainTab("roadmap")}>
            Lộ trình PRO
          </TabButton>
        </div>

        {mainTab === "topics" && (
          <div style={styles.twoCol}>
            <div style={styles.sidePanel}>
              <h3 style={styles.panelTitle}>Chủ đề hiện có</h3>

              {topicData.map((topic, index) => {
                const learned = topicProgress[topic.id] || 0;
                const total = topic.words.length || 1;
                const percent = Math.min(100, Math.round((learned / total) * 100));

                return (
                  <button
                    key={topic.id}
                   onClick={() => {
  if (!isPro && index > 2) {
    openProModal();
    return;
  }
  setTopicIndex(index);
}}
                    style={{
                      ...styles.sideBtn,
                      ...(index === topicIndex ? styles.sideBtnActive : {}),
                      flexDirection: "column",
                      alignItems: "stretch",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                     <div>
  {topic.icon} {topic.name} {!isPro && index > 2 ? "🔒" : ""}
</div>
                      <div style={{ fontSize: 12, opacity: 0.85 }}>{percent}%</div>
                    </div>

                    <div
                      style={{
                        marginTop: 8,
                        height: 8,
                        background:
                          index === topicIndex ? "rgba(255,255,255,0.25)" : "#dbeafe",
                        borderRadius: 999,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${percent}%`,
                          height: "100%",
                          background: index === topicIndex ? "#ffffff" : "#22c55e",
                          borderRadius: 999,
                        }}
                      />
                    </div>

                    <div style={{ marginTop: 6, fontSize: 12, opacity: 0.85 }}>
                      {learned}/{total} câu đúng
                    </div>
                  </button>
                );
              })}

              <div style={styles.noteBox}>
                <b>Danh sách PRO mục tiêu:</b>
                <div style={{ marginTop: 8, lineHeight: 1.7 }}>
                  {topicCatalog.join(" · ")}
                </div>
              </div>
            </div>

            <div style={styles.mainPanel}>
              <div style={styles.headerRow}>
                <div>
                  <h2 style={{ margin: 0 }}>
                    {selectedTopic.icon} {selectedTopic.name}
                  </h2>
                  <p style={styles.muted}>
                    Từ vựng 3 ngôn ngữ dành cho người Việt học thực chiến.
                  </p>
                </div>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <input
                    value={topicSearch}
                    onChange={(e) => setTopicSearch(e.target.value)}
                    placeholder="Tìm Anh / Hoa / Việt / pinyin"
                    style={styles.searchInput}
                  />

                  <button
                    onClick={() => {
                      setRandomMode(true);
                      pickRandomWord();
                    }}
                    style={{
                      ...styles.tabButton,
                      color: "#1e293b",
                      background: "#ffffff",
                    }}
                  >
                    Học ngẫu nhiên
                  </button>

                  <button
                    onClick={() => {
                      setRandomMode(false);
                      setRandomWord(null);
                      setShowAnswer(false);
                    }}
                    style={{
                      ...styles.tabButton,
                      color: "#1e293b",
                      background: "#ffffff",
                    }}
                  >
                    Xem toàn bộ
                  </button>
                </div>
              </div>

                             {randomMode ? (
                randomWord && (
                  <div
                    style={{ ...styles.wordCard, cursor: "pointer" }}
                    onClick={() => setShowAnswer(!showAnswer)}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                      <div><b>EN:</b> {randomWord.en}</div>
                      <button
  type="button"
onClick={(e) => handleSpeak(e, randomWord.en, "en-US")}
onTouchEnd={(e) => handleSpeak(e, randomWord.en, "en-US")}
  style={styles.audioBtn}
>
  🔊 EN
</button>      
              </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginTop: 8 }}>
                      <div style={styles.zh}><b>ZH:</b> {randomWord.zh}</div>
                     <button
  type="button"
 onClick={(e) => handleSpeak(e, randomWord.zh, "zh-CN")}
onTouchEnd={(e) => handleSpeak(e, randomWord.zh, "zh-CN")}
  style={styles.audioBtn}
>
  🔊 ZH
</button>
                   </div>

                    {showAnswer && (
                      <>
                        <div><b>Pinyin:</b> {randomWord.pinyin}</div>
                        <div><b>VI:</b> {randomWord.vi}</div>
                      </>
                    )}

                    <div style={{ marginTop: 12 }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          pickRandomWord();
                        }}
                        style={{ ...styles.tabButton, color: "#1e293b", background: "#ffffff" }}
                      >
                        Từ tiếp theo
                      </button>
                    </div>
                  </div>
                )
              ) : (
                <>
                <div style={styles.gridCards}>
  {topicPaged.pagedItems.map((word, idx) => {
    const cardId = `${selectedTopic.id}-${topicPaged.currentPage}-${idx}`;
    const favId = word.id || `${selectedTopic.id}-${word.en}-${word.zh}-${word.vi}`;
    const isOpen = openWordIndex === cardId;
    const isFav = favoriteIds.includes(favId);

    return (
     <div
  key={idx}
  style={styles.wordCard}
>
<button
  onClick={() => setOpenWordIndex(isOpen ? null : cardId)}
  style={{
    ...styles.tabButton,
    marginTop: 10,
    color: "#1e293b",
    background: "#ffffff"
  }}
>
  {isOpen ? "Thu gọn" : "Mở"}
</button>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 10,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <div><b>EN:</b> {word.en}</div>
            <button
  type="button"
  onTouchStart={(e) => {
    e.stopPropagation();
  }}
  onClick={(e) => handleSpeak(e, word.en, "en-US")}
onTouchEnd={(e) => handleSpeak(e, word.en, "en-US")}
  style={styles.audioBtn}
>
  🔊 EN
</button>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(favId);
            }}
            style={{ ...styles.tabButton, color: "#1e293b", background: "#ffffff" }}
          >
            {isFav ? "⭐" : "☆"}
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginTop: 8 }}>
          <div style={styles.zh}><b>ZH:</b> {word.zh}</div>
          <button
  type="button"
  onTouchStart={(e) => {
    e.stopPropagation();
  }}
 onClick={(e) => handleSpeak(e, word.zh, "zh-CN")}
onTouchEnd={(e) => handleSpeak(e, word.zh, "zh-CN")}
  style={styles.audioBtn}
>
  🔊 ZH
</button>
        </div>

        {isOpen && (
          <>
            <div><b>Pinyin:</b> {word.pinyin}</div>
            <div><b>VI:</b> {word.vi}</div>

            <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button
  onClick={() =>
    addToReview({
      id: word._favId,
      type: "word",
      en: word.en,
      zh: word.zh,
      pinyin: word.pinyin,
      vi: word.vi,
    })
  }
  style={{ ...styles.tabButton, color: "#1e293b", background: "#ffffff" }}
>
  Ôn tập
</button>            </div>
          </>
        )}
      </div>
    );
  })}
</div>
                  <Pager
                    page={topicPaged.currentPage}
                    totalPages={topicPaged.totalPages}
                    onPrev={() => setTopicPage((p) => Math.max(1, p - 1))}
                    onNext={() => setTopicPage((p) => Math.min(topicPaged.totalPages, p + 1))}
                  />
                </>
              )}
            </div>
          </div>
        )}

               {mainTab === "verbs" && (
          <div style={styles.mainPanel}>
            <div style={styles.headerRow}>
              <div>
                <h2 style={{ margin: 0 }}>Động từ bất quy tắc + động từ thường dùng</h2>
                <p style={styles.muted}>Nền cho phần đọc, nói, viết và luyện phản xạ.</p>
              </div>

              <input
                value={lexiconSearch}
                onChange={(e) => setLexiconSearch(e.target.value)}
                placeholder="Tìm động từ..."
                style={styles.searchInput}
              />
            </div>

            <div style={styles.sectionBlock}>
              <h3>Động từ bất quy tắc</h3>
              <div style={styles.tableWrap}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>V1</th>
                      <th style={styles.th}>V2</th>
                      <th style={styles.th}>V3</th>
                      <th style={styles.th}>Nghĩa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {irregularVerbs.map((item, idx) => (
                      <tr key={idx}>
                        <td style={styles.td}>{item.base}</td>
                        <td style={styles.td}>{item.past}</td>
                        <td style={styles.td}>{item.pp}</td>
                        <td style={styles.td}>{item.vi}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div style={styles.sectionBlock}>
              <h3>Động từ thường dùng</h3>
              <div style={styles.gridCards}>
                {verbsPaged.pagedItems.map((item, idx) => (
  <div key={idx} style={styles.wordCard}>
    <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
      <div><b>EN:</b> {item.en}</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
<button
  type="button"
  onClick={(e) => handleSpeak(e, item.en, "en-US")}
  onTouchEnd={(e) => handleSpeak(e, item.en, "en-US")}
  style={styles.audioBtn}
>
  🔊 EN
</button>
       <button
  type="button"
  onClick={(e) => handleSpeak(e, item.zh, "zh-CN")}
  onTouchEnd={(e) => handleSpeak(e, item.zh, "zh-CN")}
  style={styles.audioBtn}
>
  🔊 ZH
</button>
      </div>
    </div>

    <div><b>ZH:</b> {item.zh}</div>
    <div><b>Pinyin:</b> {item.pinyin}</div>
    <div><b>VI:</b> {item.vi}</div>

    <div style={{ marginTop: 8 }}>
      <b>Example:</b> {item.example}
    </div>
  </div>
))}
              </div>

              <Pager
                page={verbsPaged.currentPage}
                totalPages={verbsPaged.totalPages}
                onPrev={() => setVerbsPage((p) => Math.max(1, p - 1))}
                onNext={() => setVerbsPage((p) => Math.min(verbsPaged.totalPages, p + 1))}
              />
            </div>
          </div>
        )}
               {mainTab === "adjectives" && (
          <div style={styles.mainPanel}>
            <div style={styles.headerRow}>
              <div>
                <h2 style={{ margin: 0 }}>Tính từ thường dùng</h2>
                <p style={styles.muted}>
                  Dùng để mô tả người, vật, cảm xúc, công việc, sản phẩm.
                </p>
              </div>

              <input
                value={lexiconSearch}
                onChange={(e) => setLexiconSearch(e.target.value)}
                placeholder="Tìm tính từ..."
                style={styles.searchInput}
              />
            </div>

            <div style={styles.gridCards}>
             {adjectivesPaged.pagedItems.map((item, idx) => (
  <div key={idx} style={styles.wordCard}>
    <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
      <div><b>EN:</b> {item.en}</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
 <button
  type="button"
  onClick={(e) => handleSpeak(e, item.en, "en-US")}
  onTouchEnd={(e) => handleSpeak(e, item.en, "en-US")}
  style={styles.audioBtn}
>
  🔊 EN
</button>
    <button
  type="button"
  onClick={(e) => handleSpeak(e, item.zh, "zh-CN")}
  onTouchEnd={(e) => handleSpeak(e, item.zh, "zh-CN")}
  style={styles.audioBtn}
>
  🔊 ZH
</button>
      </div>
    </div>

    <div><b>ZH:</b> {item.zh}</div>
    <div><b>Pinyin:</b> {item.pinyin}</div>
    <div><b>VI:</b> {item.vi}</div>

    <div style={{ marginTop: 8 }}>
      <b>Example:</b> {item.example}
    </div>
  </div>
))}            </div>

            <Pager
              page={adjectivesPaged.currentPage}
              totalPages={adjectivesPaged.totalPages}
              onPrev={() => setAdjectivesPage((p) => Math.max(1, p - 1))}
              onNext={() => setAdjectivesPage((p) => Math.min(adjectivesPaged.totalPages, p + 1))}
            />
          </div>
        )}
               {mainTab === "antonyms" && (
          <div style={styles.mainPanel}>
            <div style={styles.headerRow}>
              <div>
                <h2 style={{ margin: 0 }}>Cặp từ trái nghĩa</h2>
                <p style={styles.muted}>Đã gộp full 3 batch antonyms mới.</p>
              </div>

              <input
                value={lexiconSearch}
                onChange={(e) => setLexiconSearch(e.target.value)}
                placeholder="Tìm cặp từ..."
                style={styles.searchInput}
              />
            </div>

            <div style={styles.gridCards}>
              {antonymsPaged.pagedItems.map((item, idx) => (
  <div key={idx} style={styles.wordCard}>
    <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
      <div style={{ fontSize: 18, fontWeight: 700 }}>
        {item.en1} ↔ {item.en2}
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
 <button
  type="button"
  onClick={(e) => handleSpeakSequence(e,[item.en1,item.en2],"en-US")}
onTouchEnd={(e) => handleSpeakSequence(e,[item.en1,item.en2],"en-US")}
  style={styles.audioBtn}
>
  🔊 EN
</button>

<button
  type="button"
  onClick={(e) => handleSpeakSequence(e, [item.zh1, item.zh2], "zh-CN")}
  onTouchEnd={(e) => handleSpeakSequence(e, [item.zh1, item.zh2], "zh-CN")}
  style={styles.audioBtn}
>
  🔊 ZH
</button>
            </div>
    </div>

    <div style={{ marginTop: 8 }}>
      <b>ZH:</b> {item.zh1} ↔ {item.zh2}
    </div>

    <div>
      <b>Pinyin:</b> {item.pinyin1} ↔ {item.pinyin2}
    </div>

    <div>
      <b>VI:</b> {item.vi1} ↔ {item.vi2}
    </div>

    {item.ex && (
      <div style={{ marginTop: 8 }}>
        <b>Example:</b> {item.ex}
      </div>
    )}
  </div>
))}              
            </div>

            <Pager
              page={antonymsPaged.currentPage}
              totalPages={antonymsPaged.totalPages}
              onPrev={() => setAntonymsPage((p) => Math.max(1, p - 1))}
              onNext={() => setAntonymsPage((p) => Math.min(antonymsPaged.totalPages, p + 1))}
            />
          </div>
        )}
       {mainTab === "grammar" && (
  <div style={styles.mainPanel}>
    <h2>Ngữ pháp + Quiz PRO</h2>

    <div style={{ marginBottom: 12, fontWeight: 700 }}>
      Điểm grammar: {grammarQuizScore}
    </div>

    <div
      style={{
        display: "flex",
        gap: 10,
        flexWrap: "wrap",
        marginBottom: 16,
      }}
    >
      <select
        value={grammarLevel}
        onChange={(e) => setGrammarLevel(e.target.value)}
        style={styles.searchInput}
      >
        <option value="all">All levels</option>
        <option value="basic">Basic</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
        <option value="pro">Pro</option>
      </select>

      <select
        value={grammarCategory}
        onChange={(e) => setGrammarCategory(e.target.value)}
        style={styles.searchInput}
      >
        <option value="all">All categories</option>
        {grammarCategories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <button
        onClick={() => setGrammarView("theory")}
        style={{
          ...styles.tabButton,
          color: "#1e293b",
          background: grammarView === "theory" ? "#dbeafe" : "#ffffff",
        }}
      >
        Lý thuyết
      </button>

      <button
        onClick={() => {
          setGrammarView("quiz");
          setGrammarMode("practice");
          setGrammarExamQueue([]);
          setGrammarExamIndex(0);
          setGrammarExamCorrectCount(0);
          setGrammarExamWrongCount(0);
          generateGrammarQuiz();
        }}
        style={{
          ...styles.tabButton,
          color: "#1e293b",
          background: grammarView === "quiz" ? "#dbeafe" : "#ffffff",
        }}
      >
        Quiz
      </button>
    </div>

    {grammarView === "theory" ? (
      <div>
        {filteredGrammarTheory.length === 0 ? (
          <div style={styles.noteBox}>Không có mục ngữ pháp phù hợp bộ lọc.</div>
        ) : (
          <div style={styles.gridCards}>
            {filteredGrammarTheory.map((g, idx) => (
              <div key={g.id || idx} style={styles.wordCard}>
                <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>
                  {g.name}
                </div>

                <div><b>Category:</b> {g.category}</div>
                <div><b>Level:</b> {g.level}</div>
                <div><b>Formula:</b> {g.formula}</div>
                <div><b>Use:</b> {g.use}</div>
                <div><b>EN:</b> {g.example}</div>
                <div><b>ZH:</b> {g.zh}</div>
                <div><b>Pinyin:</b> {g.pinyin}</div>
                <div><b>VI:</b> {g.vi}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    ) : (
      <div>
        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            marginBottom: 16,
          }}
        >
          <button
            onClick={() => {
              setGrammarMode("practice");
              setGrammarExamQueue([]);
              setGrammarExamIndex(0);
              setGrammarExamCorrectCount(0);
              setGrammarExamWrongCount(0);
              generateGrammarQuiz();
            }}
            style={{
              ...styles.tabButton,
              color: "#1e293b",
              background: grammarMode === "practice" ? "#dbeafe" : "#ffffff",
            }}
          >
            Practice
          </button>

          <button
            onClick={() => startGrammarExam(10)}
            style={{
              ...styles.tabButton,
              color: "#1e293b",
              background: "#ffffff",
            }}
          >
            Exam 10
          </button>

          <button
            onClick={() => startGrammarExam(20)}
            style={{
              ...styles.tabButton,
              color: "#1e293b",
              background: "#ffffff",
            }}
          >
            Exam 20
          </button>

          <button
            onClick={() => startGrammarExam(30)}
            style={{
              ...styles.tabButton,
              color: "#1e293b",
              background: "#ffffff",
            }}
          >
            Exam 30
          </button>
        </div>

        {grammarMode === "exam" && (
          <div style={{ ...styles.noteBox, marginBottom: 16 }}>
            Bài thi: {grammarExamIndex + 1}/{grammarExamQueue.length} | ✅ {grammarExamCorrectCount} | ❌ {grammarExamWrongCount}
          </div>
        )}

        <div style={{ marginBottom: 30 }}>
          <h3>🎯 Quiz ngữ pháp</h3>

          <div style={styles.wordCard}>
            <div style={{ marginBottom: 10 }}>
              <b>Chọn đáp án đúng:</b>
            </div>

            <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>
              {grammarQuizItem?.question || "Nhấn 'Quiz' hoặc 'Câu mới' để bắt đầu"}
            </div>

            {grammarQuizItem && (
              <div style={{ marginBottom: 12, color: "#475569" }}>
                <b>Category:</b> {grammarQuizItem.category} | <b>Level:</b> {grammarQuizItem.level}
              </div>
            )}

            {grammarQuizOptions.map((opt, idx) => {
              const isCorrectOption = opt === grammarQuizAnswer;
              const isWrongSelected =
                grammarQuizAnswered && opt !== grammarQuizAnswer;

              return (
                <button
                  key={idx}
                  onClick={() => handleGrammarQuizAnswer(opt)}
                  disabled={grammarQuizAnswered}
                  style={{
                    ...styles.wordCard,
                    width: "100%",
                    cursor: grammarQuizAnswered ? "default" : "pointer",
                    textAlign: "left",
                    fontSize: 16,
                    marginBottom: 8,
                    background:
                      !grammarQuizAnswered
                        ? "#ffffff"
                        : isCorrectOption
                        ? "#16a34a"
                        : isWrongSelected
                        ? "#dc2626"
                        : "#ffffff",
                    color:
                      !grammarQuizAnswered
                        ? "#1e293b"
                        : isCorrectOption || isWrongSelected
                        ? "#ffffff"
                        : "#1e293b",
                    border:
                      !grammarQuizAnswered
                        ? "1px solid #e2e8f0"
                        : isCorrectOption || isWrongSelected
                        ? "none"
                        : "1px solid #e2e8f0",
                  }}
                >
                  {opt}
                </button>
              );
            })}

            {grammarQuizMessage && (
              <div style={{ ...styles.noteBox, marginTop: 12 }}>
                {grammarQuizMessage}
              </div>
            )}

            {grammarQuizItem && grammarQuizAnswered && (
              <div
                style={{
                  marginTop: 12,
                  padding: 12,
                  borderRadius: 12,
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  lineHeight: 1.7,
                }}
              >
                <div><b>Giải thích:</b> {grammarQuizItem.explanation}</div>
              </div>
            )}

            <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
              {grammarMode === "practice" ? (
                <button
                  onClick={() => generateGrammarQuiz()}
                  style={{
                    ...styles.tabButton,
                    color: "#1e293b",
                    background: "#ffffff",
                  }}
                >
                  Câu mới
                </button>
              ) : (
                <button
                  onClick={nextGrammarExamQuestion}
                  disabled={!grammarQuizAnswered}
                  style={{
                    ...styles.tabButton,
                    color: "#1e293b",
                    background: "#ffffff",
                    opacity: !grammarQuizAnswered ? 0.5 : 1,
                  }}
                >
                  Câu tiếp
                </button>
              )}

              <button
                onClick={resetGrammarExam}
                style={{
                  ...styles.tabButton,
                  color: "#1e293b",
                  background: "#ffffff",
                }}
              >
                Reset mode
              </button>

              <button
                onClick={() => {
                  setGrammarQuizScore(0);
                  localStorage.setItem("grammarQuizScore", "0");
                }}
                style={{
                  ...styles.tabButton,
                  color: "#1e293b",
                  background: "#ffffff",
                }}
              >
                Reset điểm
              </button>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <h3>❌ Wrong Bank</h3>
          {grammarWrongBank.length === 0 ? (
            <div style={styles.noteBox}>Chưa có câu sai nào.</div>
          ) : (
            <div style={styles.gridCards}>
              {grammarWrongBank.map((item) => (
                <div key={item.id} style={styles.wordCard}>
                  <div><b>Question:</b> {item.question}</div>
                  <div><b>Correct:</b> {item.correct}</div>
                  <div><b>Explain:</b> {item.explanation}</div>
                  <div style={{ marginTop: 10 }}>
                    <button
                      onClick={() =>
                        setGrammarWrongBank((prev) => prev.filter((x) => x.id !== item.id))
                      }
                      style={{
                        ...styles.tabButton,
                        color: "#1e293b",
                        background: "#ffffff",
                      }}
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )}
  </div>
)}
        {mainTab === "quiz" && (
          <div style={styles.mainPanel}>
            <h2 style={{ marginTop: 0 }}>Quiz chọn đáp án</h2>

            <div style={{ marginTop: 10, marginBottom: 10, fontWeight: 700 }}>
              Điểm: {score}
            </div>

            <p style={styles.muted}>
              Chọn đáp án đúng theo chế độ bạn chọn.
            </p>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
              <button
                onClick={() => {
                  setQuizMode("en-vi");
                  generateQuiz("en-vi");
                }}
                style={{
                  ...styles.tabButton,
                  color: "#1e293b",
                  background: quizMode === "en-vi" ? "#dbeafe" : "#ffffff",
                }}
              >
                EN → VI
              </button>

              <button
                onClick={() => {
                  setQuizMode("vi-en");
                  generateQuiz("vi-en");
                }}
                style={{
                  ...styles.tabButton,
                  color: "#1e293b",
                  background: quizMode === "vi-en" ? "#dbeafe" : "#ffffff",
                }}
              >
                VI → EN
              </button>

              <button
                onClick={() => {
                  setQuizMode("zh-vi");
                  generateQuiz("zh-vi");
                }}
                style={{
                  ...styles.tabButton,
                  color: "#1e293b",
                  background: quizMode === "zh-vi" ? "#dbeafe" : "#ffffff",
                }}
              >
                ZH → VI
              </button>
            </div>

            {quizWord && (
              <div style={{ marginTop: 16 }}>
                <div style={styles.wordCard}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 10,
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <div style={{ fontSize: 28, fontWeight: 800 }}>
                      {quizWord.prompt}
                    </div>

                    {(quizMode === "en-vi" || quizMode === "vi-en") && (
                      <button
                       onClick={(e) => handleSpeak(e, quizWord.en, "en-US")}
onTouchEnd={(e) => handleSpeak(e, quizWord.en, "en-US")}
                        style={{
                          ...styles.tabButton,
                          color: "#1e293b",
                          background: "#ffffff",
                        }}
                      >
                        🔊 EN
                      </button>
                    )}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 10,
                      alignItems: "center",
                      flexWrap: "wrap",
                      marginTop: 8,
                    }}
                  >
                    <div style={{ fontSize: 20 }}>{quizWord.zh}</div>

                    <button
                     onClick={(e) => handleSpeak(e, quizWord.zh, "zh-CN")}
onTouchEnd={(e) => handleSpeak(e, quizWord.zh, "zh-CN")}
                      style={{
                        ...styles.tabButton,
                        color: "#1e293b",
                        background: "#ffffff",
                      }}
                    >
                      🔊 ZH
                    </button>
                  </div>
                </div>

                <div style={{ ...styles.gridCards, marginTop: 16 }}>
                  {quizOptions.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedAnswer(option);

                        if (option === quizWord.answer) {
                          setQuizResult("✅ Đúng rồi");
                          handleCorrectAnswer();
                        } else {
                          setQuizResult(`❌ Sai. Đáp án đúng là: ${quizWord.answer}`);
                        }
                      }}
                      disabled={selectedAnswer !== null}
                      style={{
                        ...styles.wordCard,
                        cursor: selectedAnswer !== null ? "default" : "pointer",
                        textAlign: "left",
                        fontSize: 18,
                        background:
                          selectedAnswer === option
                            ? option === quizWord.answer
                              ? "#16a34a"
                              : "#dc2626"
                            : selectedAnswer !== null && option === quizWord.answer
                            ? "#16a34a"
                            : "#fff",
                        color:
                          selectedAnswer === option ||
                          (selectedAnswer !== null && option === quizWord.answer)
                            ? "#fff"
                            : "#1e293b",
                        border:
                          selectedAnswer === option ||
                          (selectedAnswer !== null && option === quizWord.answer)
                            ? "none"
                            : "1px solid #e2e8f0",
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {quizResult && (
                  <div style={{ ...styles.noteBox, marginTop: 16, color: "#1e293b" }}>
                    {quizResult}
                  </div>
                )}

                <div style={{ marginTop: 16 }}>
                  <button
                    onClick={() => {
                      setSelectedAnswer(null);
                      setQuizResult("");
                      generateQuiz();
                    }}
                    style={{
                      ...styles.tabButton,
                      color: "#1e293b",
                      background: "#ffffff",
                    }}
                  >
                    Câu mới
                  </button>

                  <button
                    onClick={() => {
                      setScore(0);
                      localStorage.setItem("score", "0");
                    }}
                    style={{
                      ...styles.tabButton,
                      marginLeft: 10,
                      color: "#1e293b",
                      background: "#ffffff",
                    }}
                  >
                    Reset điểm
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {mainTab === "listening" && (
          <div style={styles.mainPanel}>
            <h2 style={{ marginTop: 0 }}>Quiz nghe</h2>
            <p style={styles.muted}>Bấm nút nghe, sau đó chọn đáp án đúng.</p>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
              <button
                onClick={() => {
                  setListeningMode("en-vi");
                  generateListeningQuiz("en-vi");
                }}
                style={{
                  ...styles.tabButton,
                  color: "#1e293b",
                  background: listeningMode === "en-vi" ? "#dbeafe" : "#ffffff",
                }}
              >
                Nghe EN → chọn VI
              </button>

              <button
                onClick={() => {
                  setListeningMode("zh-vi");
                  generateListeningQuiz("zh-vi");
                }}
                style={{
                  ...styles.tabButton,
                  color: "#1e293b",
                  background: listeningMode === "zh-vi" ? "#dbeafe" : "#ffffff",
                }}
              >
                Nghe ZH → chọn VI
              </button>

              <button
                onClick={() => {
                  setListeningMode("vi-en");
                  generateListeningQuiz("vi-en");
                }}
                style={{
                  ...styles.tabButton,
                  color: "#1e293b",
                  background: listeningMode === "vi-en" ? "#dbeafe" : "#ffffff",
                }}
              >
                Nghe EN → chọn EN
              </button>
            </div>

            {listeningWord && (
              <div>
                <div style={styles.wordCard}>
                 <button
  type="button"
  onClick={(e) => {
    if (listeningMode === "en-vi" || listeningMode === "vi-en") {
      handleSpeak(e, listeningWord.en, "en-US");
    } else if (listeningMode === "zh-vi") {
      handleSpeak(e, listeningWord.zh, "zh-CN");
    }
  }}
  onTouchEnd={(e) => {
    if (listeningMode === "en-vi" || listeningMode === "vi-en") {
      handleSpeak(e, listeningWord.en, "en-US");
    } else if (listeningMode === "zh-vi") {
      handleSpeak(e, listeningWord.zh, "zh-CN");
    }
  }}
  style={{
    ...styles.tabButton,
    color: "#1e293b",
    background: "#ffffff",
  }}
>
  🔊 Nghe
</button>
                </div>

                <div style={{ ...styles.gridCards, marginTop: 16 }}>
                  {listeningOptions.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setListeningAnswer(option);

                        if (option === listeningWord.answer) {
                          setListeningResult("✅ Đúng rồi");
                          handleCorrectAnswer();
                        } else {
                          setListeningResult(`❌ Sai. Đáp án đúng là: ${listeningWord.answer}`);
                        }
                      }}
                      disabled={listeningAnswer !== null}
                      style={{
                        ...styles.wordCard,
                        cursor: listeningAnswer !== null ? "default" : "pointer",
                        textAlign: "left",
                        fontSize: 18,
                        background:
                          listeningAnswer === option
                            ? option === listeningWord.answer
                              ? "#16a34a"
                              : "#dc2626"
                            : listeningAnswer !== null && option === listeningWord.answer
                            ? "#16a34a"
                            : "#fff",
                        color:
                          listeningAnswer === option ||
                          (listeningAnswer !== null && option === listeningWord.answer)
                            ? "#fff"
                            : "#1e293b",
                        border:
                          listeningAnswer === option ||
                          (listeningAnswer !== null && option === listeningWord.answer)
                            ? "none"
                            : "1px solid #e2e8f0",
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {listeningResult && (
                  <div style={{ ...styles.noteBox, marginTop: 16 }}>
                    {listeningResult}
                  </div>
                )}

                <div style={{ marginTop: 16 }}>
                  <button
                    onClick={() => generateListeningQuiz()}
                    style={{
                      ...styles.tabButton,
                      color: "#1e293b",
                      background: "#ffffff",
                    }}
                  >
                    Câu mới
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
               {mainTab === "sentences" && (
          <div style={styles.mainPanel}>
            <div style={styles.headerRow}>
              <div>
                <h2 style={{ margin: 0 }}>Câu giao tiếp thường dùng</h2>
                <p style={styles.muted}>
                  Các câu ngắn, dùng ngay trong đời sống và công việc.
                </p>
              </div>

              <input
                value={lexiconSearch}
                onChange={(e) => setLexiconSearch(e.target.value)}
                placeholder="Tìm câu..."
                style={styles.searchInput}
              />
            </div>

            <div style={styles.gridCards}>
              {sentencesPaged.pagedItems.map((item, idx) => (
                <div key={idx} style={styles.wordCard}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <div><b>EN:</b> {item.en}</div>
                  <button
  type="button"
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    unlockSpeech();
    speakText(item.en, "en-US");
  }}
  style={styles.audioBtn}
>
  🔊 EN
</button>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginTop: 8 }}>
                    <div><b>ZH:</b> {item.zh}</div>
                    <button
  type="button"
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    unlockSpeech();
    speakText(item.zh, "zh-CN");
  }}
  style={styles.audioBtn}
>
  🔊 ZH
</button>                  </div>

                  <div><b>Pinyin:</b> {item.pinyin}</div>
                  <div><b>VI:</b> {item.vi}</div>
                </div>
              ))}
            </div>

            <Pager
              page={sentencesPaged.currentPage}
              totalPages={sentencesPaged.totalPages}
              onPrev={() => setSentencesPage((p) => Math.max(1, p - 1))}
              onNext={() => setSentencesPage((p) => Math.min(sentencesPaged.totalPages, p + 1))}
            />
          </div>
        )}
               {mainTab === "dialogues" && (
          <div style={styles.mainPanel}>
            <div style={styles.headerRow}>
              <div>
                <h2 style={{ margin: 0 }}>Hội thoại theo tình huống</h2>
                <p style={styles.muted}>
                  Học theo đoạn thoại ngắn để nhớ từ và phản xạ nhanh hơn.
                </p>
              </div>

              <input
                value={lexiconSearch}
                onChange={(e) => setLexiconSearch(e.target.value)}
                placeholder="Tìm chủ đề hội thoại..."
                style={styles.searchInput}
              />
            </div>

            <div style={styles.gridCards}>
              {dialoguesPaged.pagedItems.map((dialogue, idx) => (
                <div key={idx} style={styles.wordCard}>
                  <div style={{ fontSize: 18, fontWeight: 700 }}>
                    {dialogue.topic}
                  </div>
                  <div style={{ marginTop: 4, color: "#64748b" }}>
                    Level: {dialogue.level}
                  </div>

                  <div style={{ marginTop: 12 }}>
                    {dialogue.lines.map((line, lineIdx) => (
                      <div
                        key={lineIdx}
                        style={{
                          marginBottom: 12,
                          padding: 10,
                          background: "#ffffff",
                          border: "1px solid #e2e8f0",
                          borderRadius: 12,
                          lineHeight: 1.7,
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                          <div><b>EN:</b> {line.en}</div>
                          <button
  type="button"
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    unlockSpeech();
    speakText(line.en, "en-US");
  }}
  style={{
    ...styles.tabButton,
    color: "#1e293b",
    background: "#ffffff",
  }}
>
  🔊 EN
</button>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginTop: 6 }}>
                          <div><b>ZH:</b> {line.zh}</div>
                         <button
  type="button"
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    unlockSpeech();
    speakText(line.zh, "zh-CN");
  }}
  style={{
    ...styles.tabButton,
    color: "#1e293b",
    background: "#ffffff",
  }}
>
  🔊 ZH
</button>
                        </div>

                        <div><b>Pinyin:</b> {line.pinyin}</div>
                        <div><b>VI:</b> {line.vi}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <Pager
              page={dialoguesPaged.currentPage}
              totalPages={dialoguesPaged.totalPages}
              onPrev={() => setDialoguesPage((p) => Math.max(1, p - 1))}
              onNext={() => setDialoguesPage((p) => Math.min(dialoguesPaged.totalPages, p + 1))}
            />
          </div>
        )}
        {mainTab === "life" && (
          <div style={styles.mainPanel}>
            <h2>Life Lessons</h2>

            <div style={styles.gridCards}>
              {lifePaged.pagedItems.map((item, index) => (
                <div key={index} style={styles.wordCard}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#1e293b" }}>
                    {index + 1}. {item.title ? item.title : "Life Lesson"}
                  </div>

                  <div
                    style={{
                      marginTop: 8,
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      flexWrap: "wrap",
                    }}
                  >
                    <div style={{ color: "#1e293b" }}>
                      <b>EN:</b> {item.en || ""}
                    </div>

                    {!!item.en && (
  <button
    type="button"
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      unlockSpeech();
      speakText(item.en, "en-US");
    }}
    style={{
      ...styles.tabButton,
      color: "#1e293b",
      background: "#ffffff",
    }}
  >
    🔊 EN
  </button>
)}   
      
                  </div>

                  <div
                    style={{
                      marginTop: 8,
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      flexWrap: "wrap",
                    }}
                  >
                    <div style={{ color: "#1e293b" }}>
                      <b>ZH:</b> {item.zh || ""}
                    </div>

                    {!!item.zh && (
  <button
    type="button"
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      unlockSpeech();
      speakText(item.zh, "zh-CN");
    }}
    style={{
      ...styles.tabButton,
      color: "#1e293b",
      background: "#ffffff",
    }}
  >
    🔊 ZH
  </button>
)}              
                  </div>

                  <div style={{ marginTop: 8, color: "#1e293b", textTransform: "none" }}>
                    <b>Pinyin:</b> {item.pinyin || ""}
                  </div>

                  <div style={{ marginTop: 8, color: "#1e293b" }}>
                    <b>VI:</b> {item.vi || ""}
                  </div>

                  {item.story && (
                    <div style={{ marginTop: 8, color: "#1e293b" }}>
                      <b>Story:</b> {item.story}
                    </div>
                  )}

                  {Array.isArray(item.keywords) && item.keywords.length > 0 && (
                    <div style={{ marginTop: 8, color: "#64748b", textTransform: "none" }}>
                      #{item.keywords.join(", ")}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <Pager
              page={lifePaged.currentPage}
              totalPages={lifePaged.totalPages}
              onPrev={() => setLifePage((p) => Math.max(1, p - 1))}
              onNext={() => setLifePage((p) => Math.min(lifePaged.totalPages, p + 1))}
            />
          </div>
        )}  
        {mainTab === "favorites" && (
          <div style={styles.mainPanel}>
            <div style={styles.headerRow}>
              <div>
                <h2 style={{ margin: 0 }}>Từ yêu thích</h2>
                <p style={styles.muted}>Những từ bạn đã đánh dấu sao.</p>
              </div>
            </div>

            {favoriteTopicWords.length === 0 ? (
              <div style={styles.noteBox}>Chưa có từ yêu thích nào.</div>
            ) : (
              <div style={styles.gridCards}>
                {favoriteTopicWords.map((word, idx) => (
                  <div key={word._favId || idx} style={styles.wordCard}>
                    <div><b>Topic:</b> {word._topicName}</div>
                    <div><b>EN:</b> {word.en}</div>
                    <div><b>ZH:</b> {word.zh}</div>
                    <div><b>Pinyin:</b> {word.pinyin}</div>
                    <div><b>VI:</b> {word.vi}</div>

                    <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
                      <button
 onClick={(e) => handleSpeak(e, word.en, "en-US")}
onTouchEnd={(e) => handleSpeak(e, word.en, "en-US")}
  style={{ ...styles.tabButton, color: "#1e293b", background: "#ffffff" }}
>
  🔊 EN
</button>

                     <button
  onClick={(e) => handleSpeak(e, word.zh, "zh-CN")}
onTouchEnd={(e) => handleSpeak(e, word.zh, "zh-CN")}
  style={{ ...styles.tabButton, color: "#1e293b", background: "#ffffff" }}
>
  🔊 ZH
</button>
                      <button
                        onClick={() => toggleFavorite(word._favId)}
                        style={{ ...styles.tabButton, color: "#1e293b", background: "#ffffff" }}
                      >
                        Bỏ sao
                      </button>

                      <button
                        onClick={() =>
                          addToReview({
                            id: word._favId,
                            type: "word",
                            en: word.en,
                            zh: word.zh,
                            pinyin: word.pinyin,
                            vi: word.vi,
                          })
                        }
                        style={{ ...styles.tabButton, color: "#1e293b", background: "#ffffff" }}
                      >
                        Ôn tập
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
            {mainTab === "review" && (
  <div style={styles.mainPanel}>
    <div style={styles.headerRow}>
      <div>
        <h2 style={{ margin: 0 }}>Ôn tập</h2>
        <p style={styles.muted}>Từ/câu bạn đã lưu để ôn lại sau.</p>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {!reviewMode && (
          <>
            <button
              onClick={() => startReviewSession(true)}
              disabled={reviewItems.length === 0}
              style={{ ...styles.tabButton, color: "#1e293b", background: "#ffffff" }}
            >
              Bắt đầu ôn tập
            </button>

            <button
              onClick={() => startReviewSession(false)}
              disabled={reviewItems.length === 0}
              style={{ ...styles.tabButton, color: "#1e293b", background: "#ffffff" }}
            >
              Ôn theo thứ tự
            </button>
          </>
        )}

        <button
          onClick={() => {
            setReviewItems([]);
            localStorage.setItem("reviewItems", "[]");
            stopReviewSession();
          }}
          style={{ ...styles.tabButton, color: "#1e293b", background: "#ffffff" }}
        >
          Xóa ôn tập
        </button>
      </div>
    </div>

    {reviewItems.length === 0 ? (
      <div style={styles.noteBox}>Chưa có mục ôn tập nào.</div>
    ) : reviewMode ? (
      <div style={styles.wordCard}>
        <div style={{ marginBottom: 12, fontWeight: 700 }}>
          Flashcard review
        </div>

        <div style={{ marginBottom: 10, color: "#475569" }}>
          Thẻ {reviewIndex + 1}/{reviewProgressTotal}
        </div>

        <div
          style={{
            width: "100%",
            height: 10,
            background: "#e5e7eb",
            borderRadius: 999,
            overflow: "hidden",
            marginBottom: 18,
          }}
        >
          <div
            style={{
              width: `${reviewProgressPercent}%`,
              height: "100%",
              background: "#22c55e",
              borderRadius: 999,
            }}
          />
        </div>

        {currentReviewItem && (
          <>
            <div style={{ fontSize: 26, fontWeight: 800, marginBottom: 12 }}>
              {currentReviewItem.en || currentReviewItem.zh || currentReviewItem.vi}
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
              {!!currentReviewItem.en && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    unlockSpeech();
                    speakText(currentReviewItem.en, "en-US");
                  }}
                  style={{ ...styles.tabButton, color: "#1e293b", background: "#ffffff" }}
                >
                  🔊 EN
                </button>
              )}

              {!!currentReviewItem.zh && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    unlockSpeech();
                    speakText(currentReviewItem.zh, "zh-CN");
                  }}
                  style={{ ...styles.tabButton, color: "#1e293b", background: "#ffffff" }}
                >
                  🔊 ZH
                </button>
              )}

              <button
                onClick={() => setReviewShowAnswer((v) => !v)}
                style={{ ...styles.tabButton, color: "#1e293b", background: "#ffffff" }}
              >
                {reviewShowAnswer ? "Ẩn đáp án" : "Hiện đáp án"}
              </button>
            </div>

            {reviewShowAnswer && (
              <div
                style={{
                  padding: 14,
                  borderRadius: 12,
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  lineHeight: 1.8,
                  marginBottom: 16,
                }}
              >
                {currentReviewItem.en && <div><b>EN:</b> {currentReviewItem.en}</div>}
                {currentReviewItem.zh && <div><b>ZH:</b> {currentReviewItem.zh}</div>}
                {currentReviewItem.pinyin && <div><b>Pinyin:</b> {currentReviewItem.pinyin}</div>}
                {currentReviewItem.vi && <div><b>VI:</b> {currentReviewItem.vi}</div>}
              </div>
            )}

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button
                onClick={() => handleReviewAnswer(true)}
                style={{ ...styles.tabButton, color: "#ffffff", background: "#16a34a" }}
              >
                Đã nhớ
              </button>

              <button
                onClick={() => handleReviewAnswer(false)}
                style={{ ...styles.tabButton, color: "#ffffff", background: "#dc2626" }}
              >
                Chưa nhớ
              </button>

              <button
                onClick={stopReviewSession}
                style={{ ...styles.tabButton, color: "#1e293b", background: "#ffffff" }}
              >
                Thoát
              </button>
            </div>

            <div style={{ marginTop: 16, color: "#475569", lineHeight: 1.8 }}>
              <div>✅ Đã nhớ: {reviewKnown}</div>
              <div>❌ Chưa nhớ: {reviewUnknown}</div>
            </div>
          </>
        )}
      </div>
    ) : (
      <div style={styles.gridCards}>
        {reviewItems.map((item, idx) => (
          <div key={item._reviewId || idx} style={styles.wordCard}>
            {item.en && <div><b>EN:</b> {item.en}</div>}
            {item.zh && <div><b>ZH:</b> {item.zh}</div>}
            {item.pinyin && <div><b>Pinyin:</b> {item.pinyin}</div>}
            {item.vi && <div><b>VI:</b> {item.vi}</div>}

            <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
              {!!item.en && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    unlockSpeech();
                    speakText(item.en, "en-US");
                  }}
                  style={{ ...styles.tabButton, color: "#1e293b", background: "#ffffff" }}
                >
                  🔊 EN
                </button>
              )}

              {!!item.zh && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    unlockSpeech();
                    speakText(item.zh, "zh-CN");
                  }}
                  style={{ ...styles.tabButton, color: "#1e293b", background: "#ffffff" }}
                >
                  🔊 ZH
                </button>
              )}

              <button
                onClick={() =>
                  setReviewItems((prev) =>
                    prev.filter((x) => x._reviewId !== item._reviewId)
                  )
                }
                style={{ ...styles.tabButton, color: "#1e293b", background: "#ffffff" }}
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
)}
{mainTab === "roadmap" && (
          <div style={styles.mainPanel}>
            <h2 style={{ marginTop: 0 }}>Lộ trình nâng thành bản PRO hoàn chỉnh</h2>
            <div style={styles.roadmapGrid}>
              <div style={styles.roadCard}>
                <h3>Kho dữ liệu</h3>
                <p>
                  30+ chủ đề, mỗi chủ đề 100 từ, thêm câu mẫu, hội thoại ngắn và
                  quiz theo từng tầng.
                </p>
              </div>
              <div style={styles.roadCard}>
                <h3>Ngữ pháp đầy đủ</h3>
                <p>
                  12 thì, giới từ, liên từ, đại từ, mạo từ, so sánh, bị động,
                  điều kiện, câu gián tiếp.
                </p>
              </div>
              <div style={styles.roadCard}>
                <h3>Âm thanh và luyện nói</h3>
                <p>
                  Audio theo câu, luyện phát âm, đọc chậm hoặc nhanh, ghi âm và
                  chấm phản xạ.
                </p>
              </div>
              <div style={styles.roadCard}>
                <h3>Kiếm tiền</h3>
                <p>
                  Tài khoản học viên, khóa gói tháng, quý, năm, mã kích hoạt và
                  khóa tính năng PRO.
                </p>
              </div>
            </div>

            <div style={styles.noteBox}>
              Bản hiện tại đã được tách file để dễ bơm dữ liệu lớn mà không làm
              rối App.jsx.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}