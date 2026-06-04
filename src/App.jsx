import { useEffect, useMemo, useState } from "react";
import { topicCatalog, topicData } from "./data/topics";
import { irregularVerbs } from "./data/verbs";
import { grammar_full } from "./data/grammar_full";
import { grammar_advanced } from "./data/grammar_advanced";
import { grammar_full_pro } from "./data/grammar_full_pro";
import { styles } from "./styles/appstyles";
import { antonyms } from "./data/antonyms";
import { antonyms_full_1 } from "./data/antonyms_full_1";
import { antonyms_full_2 } from "./data/antonyms_full_2";
import { antonyms_full_3 } from "./data/antonyms_full_3";
import { verbs_basic } from "./data/verbs_basic";
import { verbs_intermediate } from "./data/verbs_intermediate";
import { verbs_advanced } from "./data/verbs_advanced";
import { verbs_pro } from "./data/verbs_pro";
import { adjectives_basic } from "./data/adjectives_basic";
import { adjectives_intermediate } from "./data/adjectives_intermediate";
import { adjectives_advanced } from "./data/adjectives_advanced";
import { adjectives_pro } from "./data/adjectives_pro";
import { sentences_common } from "./data/sentences_common";
import { dialogues } from "./data/dialogues";
import { lifeLessons1 } from "./data/life_lesson_1";
import { lifeLessons3 } from "./data/life_lesson_3";
import { lifeLessons4 } from "./data/life_lesson_4";
import { lifeLessons5 } from "./data/life_lesson_5";
import { lifeLessons6 } from "./data/life_lesson_6";
import { grammar_quiz_bank_1 } from "./data/grammar_quiz_bank_1";

const allAntonyms = [
  ...antonyms,
  ...antonyms_full_1,
  ...antonyms_full_2,
  ...antonyms_full_3,
];

const allVerbs = [
  ...verbs_basic,
  ...verbs_intermediate,
  ...verbs_advanced,
  ...verbs_pro,
];

const allAdjectives = [
  ...adjectives_basic,
  ...adjectives_intermediate,
  ...adjectives_advanced,
  ...adjectives_pro,
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
  });
  const [reviewMode, setReviewMode] = useState(false);
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
  const [grammarQuizAnswered, setGrammarQuizAnswered] = useState(false);
  const [grammarQuizMessage, setGrammarQuizMessage] = useState("");
  const [grammarQuizScore, setGrammarQuizScore] = useState(() => {
    return Number(localStorage.getItem("grammarQuizScore")) || 0;
  });
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
      [w.en, w.vi].some((v) =>
        String(v || "").toLowerCase().includes(q)
      )
    );
  }, [topicSearch, selectedTopic]);

  const filteredVerbs = useMemo(() => {
    const q = lexiconSearch.trim().toLowerCase();
    if (!q) return allVerbs;
    return allVerbs.filter((v) =>
      [v.en, v.vi, v.example].some((value) =>
        String(value || "").toLowerCase().includes(q)
      )
    );
  }, [lexiconSearch]);

  const filteredAdjectives = useMemo(() => {
    const q = lexiconSearch.trim().toLowerCase();
    if (!q) return allAdjectives;
    return allAdjectives.filter((v) =>
      [v.en, v.vi, v.example].some((value) =>
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
        v.vi1,
        v.vi2,
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
      [item.en, item.vi].some((value) =>
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
      setGrammarQuizMessage("✅ Đúng rồi!");

      if (grammarMode === "exam") {
        setGrammarExamCorrectCount((v) => v + 1);
      }
    } else {
      setGrammarQuizMessage(`❌ Sai rồi. Đáp án đúng là: ${grammarQuizAnswer}`);
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
    const reviewId = item.id || `${item.en || ""}-${item.vi || ""}`;
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
        favoriteIds.includes(word.id || `${topic.id}-${word.en}-${word.vi}`)
      )
      .map((word) => ({
        ...word,
        _favId: word.id || `${topic.id}-${word.en}-${word.vi}`,
        _topicName: topic.name,
      }))
  );

  function openProModal() {
    setShowProModal(true);
  }

  function closeProModal() {
    setShowProModal(false);
  }

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
          className="btn-3d btn-neutral"
          style={{
            padding: "8px 16px",
            fontSize: 13,
            borderRadius: 12,
            opacity: page <= 1 ? 0.5 : 1,
            cursor: page <= 1 ? "default" : "pointer",
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
          className="btn-3d btn-neutral"
          style={{
            padding: "8px 16px",
            fontSize: 13,
            borderRadius: 12,
            opacity: page >= totalPages ? 0.5 : 1,
            cursor: page >= totalPages ? "default" : "pointer",
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
    <div className="app-container">
      {/* Desktop Sticky Left Sidebar */}
      <aside className="app-sidebar">
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, padding: "0 12px" }}>
          <span style={{ fontSize: 32 }}>🦉</span>
          <span style={{ fontWeight: 900, fontSize: 18, color: "#1cb0f6", letterSpacing: "0.5px" }}>EN-LEARNING</span>
        </div>

        <button className={`nav-item ${mainTab === "topics" ? "active" : ""}`} onClick={() => setMainTab("topics")}>
          <span>📘</span> Từ vựng chủ đề
        </button>

        <button className={`nav-item ${mainTab === "verbs" ? "active" : ""}`} onClick={() => setMainTab("verbs")}>
          <span>🏃</span> Động từ
        </button>

        <button className={`nav-item ${mainTab === "adjectives" ? "active" : ""}`} onClick={() => setMainTab("adjectives")}>
          <span>🎨</span> Tính từ
        </button>

        <button
          className={`nav-item ${mainTab === "antonyms" ? "active" : ""}`}
          onClick={() => {
            if (!isPro) { openProModal(); return; }
            setMainTab("antonyms");
          }}
        >
          <span>⚖️</span> Trái nghĩa {!isPro ? "🔒" : ""}
        </button>

        <button
          className={`nav-item ${mainTab === "grammar" ? "active" : ""}`}
          onClick={() => {
            if (!isPro) { openProModal(); return; }
            setMainTab("grammar");
            generateGrammarQuiz();
          }}
        >
          <span>📝</span> Ngữ pháp {!isPro ? "🔒" : ""}
        </button>

        <button
          className={`nav-item ${mainTab === "quiz" ? "active" : ""}`}
          onClick={() => {
            if (!isPro) { openProModal(); return; }
            setMainTab("quiz");
            generateQuiz();
          }}
        >
          <span>⚡</span> Quiz từ vựng {!isPro ? "🔒" : ""}
        </button>

        <button
          className={`nav-item ${mainTab === "listening" ? "active" : ""}`}
          onClick={() => {
            if (!isPro) { openProModal(); return; }
            setMainTab("listening");
            generateListeningQuiz();
          }}
        >
          <span>🎧</span> Quiz nghe {!isPro ? "🔒" : ""}
        </button>

        <button
          className={`nav-item ${mainTab === "sentences" ? "active" : ""}`}
          onClick={() => {
            if (!isPro) { openProModal(); return; }
            setMainTab("sentences");
          }}
        >
          <span>💬</span> Câu giao tiếp {!isPro ? "🔒" : ""}
        </button>

        <button
          className={`nav-item ${mainTab === "dialogues" ? "active" : ""}`}
          onClick={() => {
            if (!isPro) { openProModal(); return; }
            setMainTab("dialogues");
          }}
        >
          <span>🗣️</span> Hội thoại {!isPro ? "🔒" : ""}
        </button>

        <button
          className={`nav-item ${mainTab === "life" ? "active" : ""}`}
          onClick={() => {
            if (!isPro) { openProModal(); return; }
            setMainTab("life");
          }}
        >
          <span>💡</span> Bài đọc thực tế {!isPro ? "🔒" : ""}
        </button>

        <button
          className={`nav-item ${mainTab === "favorites" ? "active" : ""}`}
          onClick={() => {
            if (!isPro) { openProModal(); return; }
            setMainTab("favorites");
          }}
        >
          <span>⭐</span> Yêu thích {!isPro ? "🔒" : ""}
        </button>

        <button
          className={`nav-item ${mainTab === "review" ? "active" : ""}`}
          onClick={() => {
            if (!isPro) { openProModal(); return; }
            setMainTab("review");
          }}
        >
          <span>🃏</span> Ôn tập Flashcard {!isPro ? "🔒" : ""}
        </button>

        <button className={`nav-item ${mainTab === "roadmap" ? "active" : ""}`} onClick={() => setMainTab("roadmap")}>
          <span>🗺️</span> Lộ trình PRO
        </button>

        <div style={{ marginTop: "auto", borderTop: "2px solid #e5e5e5", paddingTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
          <button
            onClick={() => setIsPro(!isPro)}
            className="btn-3d btn-primary"
            style={{ width: "100%", fontSize: 13, padding: "10px 12px" }}
          >
            {isPro ? "⭐ Đã Mở PRO" : "Mở Khóa PRO"}
          </button>
        </div>
      </aside>

      {/* Mobile Sticky Bottom Navigation Bar */}
      <nav className="app-bottom-nav">
        <button className={`mobile-nav-item ${mainTab === "topics" ? "active" : ""}`} onClick={() => setMainTab("topics")}>
          <span>📘</span>Từ vựng
        </button>
        <button className={`mobile-nav-item ${mainTab === "verbs" ? "active" : ""}`} onClick={() => setMainTab("verbs")}>
          <span>🏃</span>Động từ
        </button>
        <button
          className={`mobile-nav-item ${mainTab === "grammar" ? "active" : ""}`}
          onClick={() => {
            if (!isPro) { openProModal(); return; }
            setMainTab("grammar");
            generateGrammarQuiz();
          }}
        >
          <span>📝</span>Ngữ pháp
        </button>
        <button
          className={`mobile-nav-item ${mainTab === "quiz" ? "active" : ""}`}
          onClick={() => {
            if (!isPro) { openProModal(); return; }
            setMainTab("quiz");
            generateQuiz();
          }}
        >
          <span>⚡</span>Quiz
        </button>
        <button
          className={`mobile-nav-item ${mainTab === "review" ? "active" : ""}`}
          onClick={() => {
            if (!isPro) { openProModal(); return; }
            setMainTab("review");
          }}
        >
          <span>🃏</span>Ôn tập
        </button>
      </nav>

      {/* Responsive Work Area */}
      <main className="app-main">
        <div style={styles.hero}>
          <div>
            <div style={{ float: "right", marginTop: 4 }}>
              <button
                onClick={() => setIsPro(!isPro)}
                className="btn-3d btn-primary"
                style={{ fontSize: 13, padding: "8px 12px" }}
              >
                {isPro ? "ĐỐI TƯỢNG: PRO ⭐" : "NÂNG CẤP PRO"}
              </button>
            </div>
            <div style={styles.badge}>ENGLISH LEARNING PRO</div>
            <h1 style={styles.title}>App học Tiếng Anh PRO</h1>
            <p style={styles.subtitle}>
              Học từ vựng chuyên đề sinh động (Rau củ, Hải sản, May mặc, Thương mại, Yếu tố & Trang sức), rèn luyện phản xạ với Quiz trắc nghiệm, luyện nghe âm thanh, tra cứu động từ bất quy tắc, học ngữ pháp và cặp từ trái nghĩa một cách khoa học.
            </p>
          </div>

          <div style={styles.statRow}>
            <StatCard number={topicCatalog.length} label="Chủ đề mục tiêu" />
            <StatCard
              number={topicData.reduce((s, t) => s + t.words.length, 0)}
              label="Từ vựng tích hợp"
            />
            <StatCard number={irregularVerbs.length} label="Động từ BQ tắc" />
            <StatCard number={allGrammar.length} label="Mục ngữ pháp" />
          </div>
        </div>

        {/* Scrollable auxiliary tab row on Mobile */}
        <div className="tab-row-responsive">
          <button className={mainTab === "topics" ? "btn-3d btn-primary" : "btn-3d btn-neutral"} style={{ padding: "8px 16px", fontSize: 13, borderRadius: 12 }} onClick={() => setMainTab("topics")}>
            Từ vựng
          </button>
          <button className={mainTab === "verbs" ? "btn-3d btn-primary" : "btn-3d btn-neutral"} style={{ padding: "8px 16px", fontSize: 13, borderRadius: 12 }} onClick={() => setMainTab("verbs")}>
            Động từ
          </button>
          <button className={mainTab === "adjectives" ? "btn-3d btn-primary" : "btn-3d btn-neutral"} style={{ padding: "8px 16px", fontSize: 13, borderRadius: 12 }} onClick={() => setMainTab("adjectives")}>
            Tính từ
          </button>
          <button
            className={mainTab === "antonyms" ? "btn-3d btn-primary" : "btn-3d btn-neutral"}
            style={{ padding: "8px 16px", fontSize: 13, borderRadius: 12 }}
            onClick={() => {
              if (!isPro) { openProModal(); return; }
              setMainTab("antonyms");
            }}
          >
            Trái nghĩa {!isPro ? "🔒" : ""}
          </button>
          <button
            className={mainTab === "grammar" ? "btn-3d btn-primary" : "btn-3d btn-neutral"}
            style={{ padding: "8px 16px", fontSize: 13, borderRadius: 12 }}
            onClick={() => {
              if (!isPro) { openProModal(); return; }
              setMainTab("grammar");
              generateGrammarQuiz();
            }}
          >
            Ngữ pháp {!isPro ? "🔒" : ""}
          </button>
          <button
            className={mainTab === "quiz" ? "btn-3d btn-primary" : "btn-3d btn-neutral"}
            style={{ padding: "8px 16px", fontSize: 13, borderRadius: 12 }}
            onClick={() => {
              if (!isPro) { openProModal(); return; }
              setMainTab("quiz");
              generateQuiz();
            }}
          >
            Quiz từ vựng {!isPro ? "🔒" : ""}
          </button>
          <button
            className={mainTab === "listening" ? "btn-3d btn-primary" : "btn-3d btn-neutral"}
            style={{ padding: "8px 16px", fontSize: 13, borderRadius: 12 }}
            onClick={() => {
              if (!isPro) { openProModal(); return; }
              setMainTab("listening");
              generateListeningQuiz();
            }}
          >
            Quiz nghe {!isPro ? "🔒" : ""}
          </button>
          <button
            className={mainTab === "sentences" ? "btn-3d btn-primary" : "btn-3d btn-neutral"}
            style={{ padding: "8px 16px", fontSize: 13, borderRadius: 12 }}
            onClick={() => {
              if (!isPro) { openProModal(); return; }
              setMainTab("sentences");
            }}
          >
            Câu giao tiếp {!isPro ? "🔒" : ""}
          </button>
          <button
            className={mainTab === "dialogues" ? "btn-3d btn-primary" : "btn-3d btn-neutral"}
            style={{ padding: "8px 16px", fontSize: 13, borderRadius: 12 }}
            onClick={() => {
              if (!isPro) { openProModal(); return; }
              setMainTab("dialogues");
            }}
          >
            Hội thoại {!isPro ? "🔒" : ""}
          </button>
          <button
            className={mainTab === "life" ? "btn-3d btn-primary" : "btn-3d btn-neutral"}
            style={{ padding: "8px 16px", fontSize: 13, borderRadius: 12 }}
            onClick={() => {
              if (!isPro) { openProModal(); return; }
              setMainTab("life");
            }}
          >
            Lessons {!isPro ? "🔒" : ""}
          </button>
          <button
            className={mainTab === "favorites" ? "btn-3d btn-primary" : "btn-3d btn-neutral"}
            style={{ padding: "8px 16px", fontSize: 13, borderRadius: 12 }}
            onClick={() => {
              if (!isPro) { openProModal(); return; }
              setMainTab("favorites");
            }}
          >
            Yêu thích {!isPro ? "🔒" : ""}
          </button>
          <button
            className={mainTab === "review" ? "btn-3d btn-primary" : "btn-3d btn-neutral"}
            style={{ padding: "8px 16px", fontSize: 13, borderRadius: 12 }}
            onClick={() => {
              if (!isPro) { openProModal(); return; }
              setMainTab("review");
            }}
          >
            Ôn tập {!isPro ? "🔒" : ""}
          </button>
          <button
            className={mainTab === "roadmap" ? "btn-3d btn-primary" : "btn-3d btn-neutral"}
            style={{ padding: "8px 16px", fontSize: 13, borderRadius: 12 }}
            onClick={() => setMainTab("roadmap")}
          >
            Lộ trình
          </button>
        </div>

        {mainTab === "topics" && (
          <div className="two-col-responsive">
            <div style={styles.sidePanel}>
              <h3 style={styles.panelTitle}>Chủ đề từ vựng</h3>
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
                        height: 6,
                        background:
                          index === topicIndex ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.05)",
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
                <b>Danh sách chủ đề mục tiêu:</b>
                <div style={{ marginTop: 8, lineHeight: 1.7 }}>
                  {topicCatalog.join(" · ")}
                </div>
              </div>
            </div>

            <div style={styles.mainPanel}>
              <div style={styles.headerRow}>
                <div>
                  <h2 style={{ margin: 0, color: "#0f172a" }}>
                    {selectedTopic.icon} {selectedTopic.name}
                  </h2>
                  <p style={styles.muted}>
                    Học từ vựng Tiếng Anh theo chủ đề có phát âm và dịch nghĩa.
                  </p>
                </div>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <input
                    value={topicSearch}
                    onChange={(e) => setTopicSearch(e.target.value)}
                    placeholder="Tìm kiếm Tiếng Anh / Tiếng Việt..."
                    style={styles.searchInput}
                  />

                  <button
                    onClick={() => {
                      setRandomMode(true);
                      pickRandomWord();
                    }}
                    className={randomMode ? "btn-3d btn-primary" : "btn-3d btn-neutral"}
                    style={{ padding: "8px 16px", fontSize: 13, borderRadius: 12 }}
                  >
                    Học ngẫu nhiên
                  </button>

                  <button
                    onClick={() => {
                      setRandomMode(false);
                      setRandomWord(null);
                      setShowAnswer(false);
                    }}
                    className={!randomMode ? "btn-3d btn-primary" : "btn-3d btn-neutral"}
                    style={{ padding: "8px 16px", fontSize: 13, borderRadius: 12 }}
                  >
                    Xem toàn bộ
                  </button>
                </div>
              </div>

              {randomMode ? (
                randomWord && (
                  <div
                    style={{ ...styles.wordCard, cursor: "pointer", background: "#f8fafc", border: "1px solid #cbd5e1" }}
                    onClick={() => setShowAnswer(!showAnswer)}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                      <div style={{ fontSize: 24, fontWeight: 700 }}><b>EN:</b> {randomWord.en}</div>
                      <button
                        type="button"
                        onClick={(e) => handleSpeak(e, randomWord.en, "en-US")}
                        className="btn-3d btn-neutral"
                        style={{ padding: "8px 14px", fontSize: 14, borderRadius: 12 }}
                      >
                        🔊 Phát âm
                      </button>
                    </div>

                    {showAnswer ? (
                      <div style={{ marginTop: 12, borderTop: "1px solid #cbd5e1", paddingTop: 12 }}>
                        <div style={{ fontSize: 18, color: "#0f172a", fontWeight: 700 }}><b>VI:</b> {randomWord.vi}</div>
                      </div>
                    ) : (
                      <div style={{ marginTop: 12, color: "#64748b", fontStyle: "italic" }}>
                        Nhấp vào thẻ này để xem nghĩa Tiếng Việt...
                      </div>
                    )}

                    <div style={{ marginTop: 12 }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          pickRandomWord();
                        }}
                        className="btn-3d btn-primary"
                        style={{ padding: "10px 20px" }}
                      >
                        Từ tiếp theo →
                      </button>
                    </div>
                  </div>
                )
              ) : (
                <>
                  <div style={styles.gridCards}>
                    {topicPaged.pagedItems.map((word, idx) => {
                      const cardId = `${selectedTopic.id}-${topicPaged.currentPage}-${idx}`;
                      const favId = word.id || `${selectedTopic.id}-${word.en}-${word.vi}`;
                      const isOpen = openWordIndex === cardId;
                      const isFav = favoriteIds.includes(favId);

                      return (
                        <div
                          key={idx}
                          style={styles.wordCard}
                        >
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
                              <div style={{ fontSize: 18, fontWeight: 700 }}>{word.en}</div>
                              <button
                                type="button"
                                onClick={(e) => handleSpeak(e, word.en, "en-US")}
                                style={styles.audioBtn}
                              >
                                🔊
                              </button>
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(favId);
                              }}
                              style={{ ...styles.tabButton, color: isFav ? "#eab308" : "#94a3b8", background: "transparent", fontSize: 18, padding: 0 }}
                            >
                              {isFav ? "⭐" : "☆"}
                            </button>
                          </div>

                          <div style={{ color: "#0f172a", fontWeight: 600 }}>
                            {word.vi}
                          </div>

                          <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                            <button
                              onClick={() => setOpenWordIndex(isOpen ? null : cardId)}
                              className="btn-3d btn-neutral"
                              style={{
                                padding: "6px 12px",
                                fontSize: 12,
                                borderRadius: 12,
                              }}
                            >
                              {isOpen ? "Thu gọn" : "Xem thêm"}
                            </button>

                            {isOpen && (
                              <button
                                onClick={() =>
                                  addToReview({
                                    id: favId,
                                    type: "word",
                                    en: word.en,
                                    vi: word.vi,
                                  })
                                }
                                className="btn-3d btn-primary"
                                style={{
                                  padding: "6px 12px",
                                  fontSize: 12,
                                  borderRadius: 12,
                                }}
                              >
                                Thêm vào Ôn tập
                              </button>
                            )}
                          </div>
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
                <h2 style={{ margin: 0 }}>Động từ bất quy tắc + động từ thông dụng</h2>
                <p style={styles.muted}>Nền tảng quan trọng giúp xây dựng kỹ năng đọc, viết và giao tiếp tiếng Anh.</p>
              </div>

              <input
                value={lexiconSearch}
                onChange={(e) => setLexiconSearch(e.target.value)}
                placeholder="Tìm động từ..."
                style={styles.searchInput}
              />
            </div>

            <div style={styles.sectionBlock}>
              <h3 style={{ borderBottom: "1px solid #e2e8f0", paddingBottom: 8 }}>Động từ bất quy tắc (Irregular Verbs)</h3>
              <div style={styles.tableWrap}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Nguyên mẫu (V1)</th>
                      <th style={styles.th}>Quá khứ (V2)</th>
                      <th style={styles.th}>Phân từ II (V3)</th>
                      <th style={styles.th}>Ý nghĩa Tiếng Việt</th>
                      <th style={styles.th}>Phát âm</th>
                    </tr>
                  </thead>
                  <tbody>
                    {irregularVerbs.filter(item => 
                      item.base.toLowerCase().includes(lexiconSearch.toLowerCase()) ||
                      item.vi.toLowerCase().includes(lexiconSearch.toLowerCase())
                    ).map((item, idx) => (
                      <tr key={idx}>
                        <td style={{ ...styles.td, fontWeight: 700, color: "#0f172a" }}>{item.base}</td>
                        <td style={styles.td}>{item.past}</td>
                        <td style={styles.td}>{item.pp}</td>
                        <td style={{ ...styles.td, color: "#334155", fontWeight: 500 }}>{item.vi}</td>
                        <td style={styles.td}>
                          <button
                            type="button"
                            onClick={(e) => handleSpeakSequence(e, [item.base, item.past, item.pp], "en-US")}
                            style={{ ...styles.audioBtn, minWidth: 32, minHeight: 32, padding: "4px 8px" }}
                          >
                            🔊
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div style={styles.sectionBlock}>
              <h3 style={{ borderBottom: "1px solid #cbd5e1", paddingBottom: 8, marginTop: 32 }}>Động từ thường dùng (Common Verbs)</h3>
              <div style={styles.gridCards}>
                {verbsPaged.pagedItems.map((item, idx) => (
                  <div key={idx} style={styles.wordCard}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
                      <div style={{ fontSize: 18, fontWeight: 700 }}>{item.en}</div>
                      <button
                        type="button"
                        onClick={(e) => handleSpeak(e, item.en, "en-US")}
                        style={styles.audioBtn}
                      >
                        🔊
                      </button>
                    </div>

                    <div style={{ color: "#0f172a", fontWeight: 600 }}><b>Nghĩa:</b> {item.vi}</div>
                    {item.example && (
                      <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>
                        <b>Ví dụ:</b> <i>{item.example}</i>
                      </div>
                    )}
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
                <h2 style={{ margin: 0 }}>Tính từ thông dụng</h2>
                <p style={styles.muted}>Tính từ mô tả người, vật, cảm xúc và các khía cạnh trong đời sống.</p>
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
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
                    <div style={{ fontSize: 18, fontWeight: 700 }}>{item.en}</div>
                    <button
                      type="button"
                      onClick={(e) => handleSpeak(e, item.en, "en-US")}
                      style={styles.audioBtn}
                    >
                      🔊
                    </button>
                  </div>

                  <div style={{ color: "#0f172a", fontWeight: 600 }}><b>Nghĩa:</b> {item.vi}</div>
                  {item.example && (
                    <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>
                      <b>Ví dụ:</b> <i>{item.example}</i>
                    </div>
                  )}
                </div>
              ))}
            </div>

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
                <h2 style={{ margin: 0 }}>Cặp từ trái nghĩa (Antonyms)</h2>
                <p style={styles.muted}>Giúp mở rộng từ vựng nhanh chóng qua các cặp từ đối lập.</p>
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
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "#0f172a" }}>
                      {item.en1} ↔ {item.en2}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleSpeakSequence(e, [item.en1, item.en2], "en-US")}
                      className="btn-3d btn-neutral"
                      style={{ padding: "6px 12px", fontSize: 13, borderRadius: 12 }}
                    >
                      🔊 Nghe cả hai
                    </button>
                  </div>

                  <div style={{ marginTop: 8 }}>
                    <b>Dịch nghĩa:</b> {item.vi1} ↔ {item.vi2}
                  </div>

                  {item.ex && (
                    <div style={{ marginTop: 6, fontSize: 13, color: "#64748b", borderTop: "1px solid #e2e8f0", paddingTop: 6 }}>
                      <b>Ví dụ:</b> <i>{item.ex}</i>
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
            <h2>Ngữ pháp Tiếng Anh + Quiz</h2>

            <div style={{ marginBottom: 16, fontWeight: 700, color: "#0f172a" }}>
              Điểm ngữ pháp hiện tại: {grammarQuizScore}
            </div>

            <div
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                marginBottom: 20,
              }}
            >
              <select
                value={grammarLevel}
                onChange={(e) => setGrammarLevel(e.target.value)}
                style={styles.searchInput}
              >
                <option value="all">Mọi trình độ</option>
                <option value="basic">Cơ bản (Basic)</option>
                <option value="intermediate">Trung cấp (Intermediate)</option>
                <option value="advanced">Nâng cao (Advanced)</option>
                <option value="pro">Chuyên nghiệp (Pro)</option>
              </select>

              <select
                value={grammarCategory}
                onChange={(e) => setGrammarCategory(e.target.value)}
                style={styles.searchInput}
              >
                <option value="all">Mọi chủ điểm</option>
                {grammarCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <button
                onClick={() => setGrammarView("theory")}
                className={grammarView === "theory" ? "btn-3d btn-primary" : "btn-3d btn-neutral"}
                style={{ padding: "8px 16px", fontSize: 13, borderRadius: 12 }}
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
                className={grammarView === "quiz" ? "btn-3d btn-primary" : "btn-3d btn-neutral"}
                style={{ padding: "8px 16px", fontSize: 13, borderRadius: 12 }}
              >
                Luyện Quiz
              </button>
            </div>

            {grammarView === "theory" ? (
              <div>
                {filteredGrammarTheory.length === 0 ? (
                  <div style={styles.noteBox}>Không có chủ đề ngữ pháp nào phù hợp bộ lọc.</div>
                ) : (
                  <div style={styles.gridCards}>
                    {filteredGrammarTheory.map((g, idx) => (
                      <div key={g.id || idx} style={styles.wordCard}>
                        <div style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>
                          {g.name}
                        </div>

                        <div><b>Chủ điểm:</b> {g.category} | <b>Level:</b> {g.level}</div>
                        <div style={styles.formula}>Công thức: {g.formula}</div>
                        <div><b>Cách dùng:</b> {g.use}</div>
                        <div style={{ marginTop: 8, borderTop: "1px solid #cbd5e1", paddingTop: 8 }}>
                          <div><b>Ví dụ EN:</b> <i>{g.example}</i></div>
                          <div style={{ color: "#334155" }}><b>Dịch VI:</b> {g.vi}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
                  <button
                    onClick={() => {
                      setGrammarMode("practice");
                      setGrammarExamQueue([]);
                      setGrammarExamIndex(0);
                      setGrammarExamCorrectCount(0);
                      setGrammarExamWrongCount(0);
                      generateGrammarQuiz();
                    }}
                    className={grammarMode === "practice" ? "btn-3d btn-primary" : "btn-3d btn-neutral"}
                    style={{ padding: "8px 16px", fontSize: 13, borderRadius: 12 }}
                  >
                    Luyện tự do
                  </button>

                  <button
                    onClick={() => startGrammarExam(10)}
                    className={grammarMode === "exam" && grammarExamSize === 10 ? "btn-3d btn-primary" : "btn-3d btn-neutral"}
                    style={{ padding: "8px 16px", fontSize: 13, borderRadius: 12 }}
                  >
                    Thi 10 câu
                  </button>

                  <button
                    onClick={() => startGrammarExam(20)}
                    className={grammarMode === "exam" && grammarExamSize === 20 ? "btn-3d btn-primary" : "btn-3d btn-neutral"}
                    style={{ padding: "8px 16px", fontSize: 13, borderRadius: 12 }}
                  >
                    Thi 20 câu
                  </button>
                </div>

                {grammarMode === "exam" && (
                  <div style={{ ...styles.noteBox, marginBottom: 16 }}>
                    Bài thi: {grammarExamIndex + 1}/{grammarExamQueue.length} | ✅ Đúng: {grammarExamCorrectCount} | ❌ Sai: {grammarExamWrongCount}
                  </div>
                )}

                <div style={{ marginBottom: 30 }}>
                  <div style={styles.wordCard}>
                    <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: "#0f172a" }}>
                      {grammarQuizItem?.question || "Đang tải câu hỏi..."}
                    </div>

                    {grammarQuizItem && (
                      <div style={{ marginBottom: 16, fontSize: 13, color: "#64748b" }}>
                        Chủ điểm: <b>{grammarQuizItem.category}</b> | Cấp độ: <b>{grammarQuizItem.level}</b>
                      </div>
                    )}

                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {grammarQuizOptions.map((opt, idx) => {
                        const isCorrectOption = opt === grammarQuizAnswer;
                        const isWrongSelected = grammarQuizAnswered && opt !== grammarQuizAnswer;

                        return (
                          <button
                            key={idx}
                            onClick={() => handleGrammarQuizAnswer(opt)}
                            disabled={grammarQuizAnswered}
                            className="choice-btn-3d"
                            style={{
                              fontSize: 16,
                              background:
                                !grammarQuizAnswered
                                  ? "#ffffff"
                                  : isCorrectOption
                                  ? "#d7f5d7"
                                  : isWrongSelected
                                  ? "#ffdfdf"
                                  : "#ffffff",
                              borderColor:
                                !grammarQuizAnswered
                                  ? "#e5e5e5"
                                  : isCorrectOption
                                  ? "#58cc02"
                                  : isWrongSelected
                                  ? "#ea2b2b"
                                  : "#e5e5e5",
                              borderBottomWidth: grammarQuizAnswered ? 2 : 5,
                            }}
                          >
                            <span>{opt}</span>
                            {grammarQuizAnswered && (
                              <span>{isCorrectOption ? "✅" : isWrongSelected ? "❌" : ""}</span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {grammarQuizMessage && (
                      <div style={{ ...styles.noteBox, marginTop: 12 }}>
                        {grammarQuizMessage}
                      </div>
                    )}

                    {grammarQuizItem && grammarQuizAnswered && (
                      <div
                        style={{
                          marginTop: 12,
                          padding: 14,
                          borderRadius: 12,
                          background: "#f8fafc",
                          border: "1px solid #e2e8f0",
                          lineHeight: 1.6,
                        }}
                      >
                        <div><b>Giải thích đáp án:</b> {grammarQuizItem.explanation}</div>
                      </div>
                    )}

                    <div style={{ marginTop: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
                      {grammarMode === "practice" ? (
                        <button
                          onClick={() => generateGrammarQuiz()}
                          className="btn-3d btn-primary"
                          style={{ padding: "10px 20px" }}
                        >
                          Câu tiếp theo →
                        </button>
                      ) : (
                        <button
                          onClick={nextGrammarExamQuestion}
                          disabled={!grammarQuizAnswered}
                          className="btn-3d btn-primary"
                          style={{
                            padding: "10px 20px",
                            opacity: !grammarQuizAnswered ? 0.5 : 1,
                          }}
                        >
                          Câu tiếp theo →
                        </button>
                      )}

                      <button
                        onClick={resetGrammarExam}
                        className="btn-3d btn-neutral"
                        style={{ padding: "10px 20px" }}
                      >
                        Hủy thi / Reset
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {mainTab === "quiz" && (
          <div style={styles.mainPanel}>
            <h2 style={{ marginTop: 0 }}>Quiz thực hành từ vựng</h2>

            <div style={{ marginTop: 10, marginBottom: 16, fontWeight: 700, color: "#0f172a" }}>
              Điểm số hiện tại: {score}
            </div>

            <p style={styles.muted}>
              Chọn câu trả lời đúng nhất dựa theo từ vựng đang học.
            </p>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
              <button
                onClick={() => {
                  setQuizMode("en-vi");
                  generateQuiz("en-vi");
                }}
                className={quizMode === "en-vi" ? "btn-3d btn-primary" : "btn-3d btn-neutral"}
                style={{ padding: "8px 16px", fontSize: 13, borderRadius: 12 }}
              >
                Tiếng Anh → Tiếng Việt (EN → VI)
              </button>

              <button
                onClick={() => {
                  setQuizMode("vi-en");
                  generateQuiz("vi-en");
                }}
                className={quizMode === "vi-en" ? "btn-3d btn-primary" : "btn-3d btn-neutral"}
                style={{ padding: "8px 16px", fontSize: 13, borderRadius: 12 }}
              >
                Tiếng Việt → Tiếng Anh (VI → EN)
              </button>
            </div>

            {quizWord && (
              <div style={{ marginTop: 16 }}>
                <div style={styles.wordCard}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 16,
                      alignItems: "center",
                      flexWrap: "wrap",
                      padding: 24,
                    }}
                  >
                    <div style={{ fontSize: 32, fontWeight: 800, color: "#0f172a" }}>
                      {quizWord.prompt}
                    </div>

                    <button
                      onClick={(e) => handleSpeak(e, quizWord.en, "en-US")}
                      className="btn-3d btn-neutral"
                      style={{ padding: "8px 14px", fontSize: 14, borderRadius: 12 }}
                    >
                      🔊 Phát âm
                    </button>
                  </div>
                </div>

                <div style={{ ...styles.gridCards, marginTop: 20 }}>
                  {quizOptions.map((option, idx) => {
                    const isSelected = selectedAnswer === option;
                    const isCorrect = option === quizWord.answer;
                    const isAnswered = selectedAnswer !== null;

                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedAnswer(option);
                          if (option === quizWord.answer) {
                            setQuizResult("✅ Chính xác! Bạn đã được cộng 1 điểm.");
                            handleCorrectAnswer();
                          } else {
                            setQuizResult(`❌ Sai rồi. Đáp án đúng là: ${quizWord.answer}`);
                          }
                        }}
                        disabled={isAnswered}
                        className="choice-btn-3d"
                        style={{
                          fontSize: 18,
                          background:
                            !isAnswered
                              ? "#ffffff"
                              : isSelected || (isAnswered && isCorrect)
                              ? isCorrect
                                ? "#d7f5d7"
                                : "#ffdfdf"
                              : "#ffffff",
                          borderColor:
                            !isAnswered
                              ? "#e5e5e5"
                              : isSelected || (isAnswered && isCorrect)
                              ? isCorrect
                                ? "#58cc02"
                                : "#ea2b2b"
                              : "#e5e5e5",
                          borderBottomWidth: isAnswered ? 2 : 5,
                        }}
                      >
                        <span>{option}</span>
                        {isAnswered && (
                          <span>{isCorrect ? "✅" : isSelected ? "❌" : ""}</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {quizResult && (
                  <div style={{ ...styles.noteBox, marginTop: 16 }}>
                    {quizResult}
                  </div>
                )}

                <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
                  <button
                    onClick={() => {
                      setSelectedAnswer(null);
                      setQuizResult("");
                      generateQuiz();
                    }}
                    className="btn-3d btn-primary"
                    style={{ padding: "10px 20px" }}
                  >
                    Câu tiếp theo →
                  </button>

                  <button
                    onClick={() => {
                      setScore(0);
                      localStorage.setItem("score", "0");
                    }}
                    className="btn-3d btn-neutral"
                    style={{ padding: "10px 20px" }}
                  >
                    Reset điểm số
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {mainTab === "listening" && (
          <div style={styles.mainPanel}>
            <h2 style={{ marginTop: 0 }}>Quiz luyện nghe Tiếng Anh</h2>
            <p style={styles.muted}>Bấm nút nghe bên dưới và chọn đáp án viết đúng.</p>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
              <button
                onClick={() => {
                  setListeningMode("en-vi");
                  generateListeningQuiz("en-vi");
                }}
                className={listeningMode === "en-vi" ? "btn-3d btn-primary" : "btn-3d btn-neutral"}
                style={{ padding: "8px 16px", fontSize: 13, borderRadius: 12 }}
              >
                Nghe Tiếng Anh → Chọn nghĩa Tiếng Việt
              </button>

              <button
                onClick={() => {
                  setListeningMode("vi-en");
                  generateListeningQuiz("vi-en");
                }}
                className={listeningMode === "vi-en" ? "btn-3d btn-primary" : "btn-3d btn-neutral"}
                style={{ padding: "8px 16px", fontSize: 13, borderRadius: 12 }}
              >
                Nghe Tiếng Anh → Chọn từ viết đúng
              </button>
            </div>

            {listeningWord && (
              <div>
                <div style={{ ...styles.wordCard, alignItems: "center", padding: 24 }}>
                  <button
                    type="button"
                    onClick={(e) => handleSpeak(e, listeningWord.en, "en-US")}
                    className="btn-3d btn-primary"
                    style={{
                      fontSize: 16,
                      padding: "12px 24px"
                    }}
                  >
                    🔊 Bấm để nghe
                  </button>
                </div>

                <div style={{ ...styles.gridCards, marginTop: 20 }}>
                  {listeningOptions.map((option, idx) => {
                    const isSelected = listeningAnswer === option;
                    const isCorrect = option === listeningWord.answer;
                    const isAnswered = listeningAnswer !== null;

                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setListeningAnswer(option);
                          if (option === listeningWord.answer) {
                            setListeningResult("✅ Đúng rồi!");
                            handleCorrectAnswer();
                          } else {
                            setListeningResult(`❌ Sai rồi. Đáp án đúng là: ${listeningWord.answer}`);
                          }
                        }}
                        disabled={isAnswered}
                        className="choice-btn-3d"
                        style={{
                          fontSize: 18,
                          background:
                            !isAnswered
                              ? "#ffffff"
                              : isSelected || (isAnswered && isCorrect)
                              ? isCorrect
                                ? "#d7f5d7"
                                : "#ffdfdf"
                              : "#ffffff",
                          borderColor:
                            !isAnswered
                              ? "#e5e5e5"
                              : isSelected || (isAnswered && isCorrect)
                              ? isCorrect
                                ? "#58cc02"
                                : "#ea2b2b"
                              : "#e5e5e5",
                          borderBottomWidth: isAnswered ? 2 : 5,
                        }}
                      >
                        <span>{option}</span>
                        {isAnswered && (
                          <span>{isCorrect ? "✅" : isSelected ? "❌" : ""}</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {listeningResult && (
                  <div style={{ ...styles.noteBox, marginTop: 16 }}>
                    {listeningResult}
                  </div>
                )}

                <div style={{ marginTop: 20 }}>
                  <button
                    onClick={() => generateListeningQuiz()}
                    className="btn-3d btn-primary"
                    style={{ padding: "10px 20px" }}
                  >
                    Câu tiếp theo →
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
                <h2 style={{ margin: 0 }}>Câu giao tiếp hàng ngày</h2>
                <p style={styles.muted}>Học các mẫu câu đàm thoại ngắn, tự nhiên trong cuộc sống thực tế.</p>
              </div>

              <input
                value={lexiconSearch}
                onChange={(e) => setLexiconSearch(e.target.value)}
                placeholder="Tìm câu giao tiếp..."
                style={styles.searchInput}
              />
            </div>

            <div style={styles.gridCards}>
              {sentencesPaged.pagedItems.map((item, idx) => (
                <div key={idx} style={styles.wordCard}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>{item.en}</div>
                    <button
                      type="button"
                      onClick={(e) => handleSpeak(e, item.en, "en-US")}
                      style={styles.audioBtn}
                    >
                      🔊
                    </button>
                  </div>

                  <div style={{ color: "#0f172a", fontSize: 14, fontWeight: 500 }}>
                    {item.vi}
                  </div>
                </div>
              ))}
            </div>

            <Pager
              page={sentencesPage}
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
                <h2 style={{ margin: 0 }}>Hội thoại theo tình huống thực tế</h2>
                <p style={styles.muted}>Luyện tập phản xạ bằng cách xem và nghe các đoạn hội thoại thực tế.</p>
              </div>

              <input
                value={lexiconSearch}
                onChange={(e) => setLexiconSearch(e.target.value)}
                placeholder="Tìm chủ đề hội thoại..."
                style={styles.searchInput}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {dialoguesPaged.pagedItems.map((dialogue, idx) => (
                <div key={idx} style={styles.wordCard}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #cbd5e1", paddingBottom: 10 }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: "#0f172a" }}>
                      Chủ đề: {dialogue.topic}
                    </div>
                    <div style={{ fontSize: 13, background: "rgba(15, 23, 42, 0.05)", padding: "4px 10px", borderRadius: 999, color: "#475569", fontWeight: 500 }}>
                      Cấp độ: {dialogue.level}
                    </div>
                  </div>

                  <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 12 }}>
                    {dialogue.lines.map((line, lineIdx) => (
                      <div
                        key={lineIdx}
                        style={{
                          padding: 12,
                          background: "#ffffff",
                          border: "1px solid #e2e8f0",
                          borderRadius: 12,
                          lineHeight: 1.6,
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                          <div style={{ flex: 1, fontSize: 15, color: "#0f172a" }}>
                            <span style={{ fontWeight: 700, color: "#0f172a" }}>{line.speaker || (lineIdx % 2 === 0 ? "Person A" : "Person B")}:</span> {line.en}
                          </div>
                          <button
                            type="button"
                            onClick={(e) => handleSpeak(e, line.en, "en-US")}
                            style={{ ...styles.audioBtn, minWidth: 32, minHeight: 32, padding: "4px 8px" }}
                          >
                            🔊
                          </button>
                        </div>

                        <div style={{ color: "#64748b", fontSize: 13, marginTop: 4 }}>
                          {line.vi}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <Pager
              page={dialoguesPage}
              totalPages={dialoguesPaged.totalPages}
              onPrev={() => setDialoguesPage((p) => Math.max(1, p - 1))}
              onNext={() => setDialoguesPage((p) => Math.min(dialoguesPaged.totalPages, p + 1))}
            />
          </div>
        )}

        {mainTab === "life" && (
          <div style={styles.mainPanel}>
            <h2>Đọc hiểu: Life & Business Lessons</h2>
            <p style={styles.muted}>
              Các bài học và tin tức thực tế giúp bạn vừa học tiếng Anh vừa nâng cao kiến thức kinh doanh, đời sống.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {lifePaged.pagedItems.map((item, index) => (
                <div key={index} style={styles.wordCard}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #cbd5e1", paddingBottom: 10 }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: "#0f172a" }}>
                      {item.title || "Bài học ý nghĩa"}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleSpeak(e, item.en, "en-US")}
                      className="btn-3d btn-neutral"
                      style={{ padding: "8px 16px", fontSize: 13, borderRadius: 12 }}
                    >
                      🔊 Nghe bài đọc (Giọng EN)
                    </button>
                  </div>

                  <div style={{ lineHeight: 1.8, fontSize: 16, color: "#0f172a", margin: "16px 0", textAlign: "justify", fontWeight: 500 }}>
                    {item.en}
                  </div>

                  <div style={{ lineHeight: 1.8, fontSize: 15, color: "#475569", borderLeft: "3px solid #0f172a", paddingLeft: 12, marginBottom: 16, textAlign: "justify" }}>
                    {item.vi}
                  </div>

                  {item.story && (
                    <div style={{
                      padding: 16,
                      background: "#f8fafc",
                      border: "1px solid #cbd5e1",
                      borderRadius: 14,
                      lineHeight: 1.6,
                      fontSize: 14,
                      whiteSpace: "pre-line",
                      color: "#0f172a"
                    }}>
                      <h4 style={{ margin: "0 0 8px 0", color: "#0f172a" }}>Phân tích Từ vựng & Thành ngữ (Vocabulary Breakdown):</h4>
                      {item.story}
                    </div>
                  )}

                  {Array.isArray(item.keywords) && item.keywords.length > 0 && (
                    <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {item.keywords.map((kw, kwIdx) => (
                        <span key={kwIdx} style={styles.pill}>#{kw}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <Pager
              page={lifePage}
              totalPages={lifePaged.totalPages}
              onPrev={() => setLifePage((p) => Math.max(1, p - 1))}
              onNext={() => setLifePage((p) => Math.min(lifePaged.totalPages, p + 1))}
            />
          </div>
        )}

        {mainTab === "favorites" && (
          <div style={styles.mainPanel}>
            <h2>Từ vựng yêu thích đã lưu</h2>
            <p style={styles.muted}>Những từ vựng bạn đã đánh dấu sao vàng để học lại.</p>

            {favoriteTopicWords.length === 0 ? (
              <div style={styles.noteBox}>Bạn chưa lưu từ vựng yêu thích nào. Hãy đánh dấu sao ở phần từ vựng chủ đề!</div>
            ) : (
              <div style={styles.gridCards}>
                {favoriteTopicWords.map((word, idx) => (
                  <div key={word._favId || idx} style={styles.wordCard}>
                    <div style={{ fontSize: 13, background: "rgba(15, 23, 42, 0.05)", padding: "2px 8px", borderRadius: 999, alignSelf: "start", color: "#475569", fontWeight: 500 }}>
                      Chủ đề: {word._topicName}
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: "#0f172a" }}>{word.en}</div>
                    <div style={{ color: "#0f172a", fontWeight: 600 }}>{word.vi}</div>

                    <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <button
                        onClick={(e) => handleSpeak(e, word.en, "en-US")}
                        className="btn-3d btn-neutral"
                        style={{ padding: "6px 12px", fontSize: 12, borderRadius: 12 }}
                      >
                        🔊 Phát âm
                      </button>

                      <button
                        onClick={() => toggleFavorite(word._favId)}
                        className="btn-3d btn-neutral"
                        style={{ padding: "6px 12px", fontSize: 12, borderRadius: 12 }}
                      >
                        Bỏ yêu thích
                      </button>

                      <button
                        onClick={() =>
                          addToReview({
                            id: word._favId,
                            type: "word",
                            en: word.en,
                            vi: word.vi,
                          })
                        }
                        className="btn-3d btn-primary"
                        style={{ padding: "6px 12px", fontSize: 12, borderRadius: 12 }}
                      >
                        Luyện ôn tập
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
                <h2 style={{ margin: 0 }}>Ôn tập thông minh (Flashcard)</h2>
                <p style={styles.muted}>Luyện tập ôn lại từ vựng bạn đã lưu để nhanh ghi nhớ vào bộ nhớ dài hạn.</p>
              </div>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {!reviewMode && (
                  <>
                    <button
                      onClick={() => startReviewSession(true)}
                      disabled={reviewItems.length === 0}
                      className="btn-3d btn-primary"
                      style={{ opacity: reviewItems.length === 0 ? 0.5 : 1, padding: "8px 16px", fontSize: 13, borderRadius: 12 }}
                    >
                      Bắt đầu ôn tập xáo trộn 🔀
                    </button>

                    <button
                      onClick={() => startReviewSession(false)}
                      disabled={reviewItems.length === 0}
                      className="btn-3d btn-primary"
                      style={{ opacity: reviewItems.length === 0 ? 0.5 : 1, padding: "8px 16px", fontSize: 13, borderRadius: 12 }}
                    >
                      Ôn tập theo thứ tự
                    </button>
                  </>
                )}

                <button
                  onClick={() => {
                    setReviewItems([]);
                    localStorage.setItem("reviewItems", "[]");
                    stopReviewSession();
                  }}
                  className="btn-3d btn-error"
                  style={{ padding: "8px 16px", fontSize: 13, borderRadius: 12 }}
                >
                  Xóa tất cả ôn tập
                </button>
              </div>
            </div>

            {reviewItems.length === 0 ? (
              <div style={styles.noteBox}>Chưa có mục ôn tập nào được thêm. Hãy bấm nút 'Xem thêm' {"->"} 'Thêm vào ôn tập' ở trang Từ vựng chủ đề!</div>
            ) : reviewMode ? (
              <div style={{ ...styles.wordCard, padding: 24, alignItems: "center" }}>
                <div style={{ fontSize: 18, color: "#64748b", marginBottom: 8 }}>
                  Flashcard ôn tập: {reviewIndex + 1}/{reviewProgressTotal}
                </div>

                <div
                  style={{
                    width: "100%",
                    maxWidth: 500,
                    height: 8,
                    background: "rgba(15, 23, 42, 0.05)",
                    borderRadius: 999,
                    overflow: "hidden",
                    marginBottom: 24,
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
                    <div style={{ fontSize: 32, fontWeight: 800, color: "#0f172a", marginBottom: 20 }}>
                      {currentReviewItem.en}
                    </div>

                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
                      <button
                        onClick={(e) => handleSpeak(e, currentReviewItem.en, "en-US")}
                        className="btn-3d btn-primary"
                        style={{ padding: "8px 16px", fontSize: 13, borderRadius: 12 }}
                      >
                        🔊 Phát âm
                      </button>

                      <button
                        onClick={() => setReviewShowAnswer((v) => !v)}
                        className="btn-3d btn-neutral"
                        style={{ padding: "8px 16px", fontSize: 13, borderRadius: 12 }}
                      >
                        {reviewShowAnswer ? "Ẩn nghĩa" : "Hiện nghĩa Tiếng Việt"}
                      </button>
                    </div>

                    {reviewShowAnswer && (
                      <div
                        style={{
                          padding: 16,
                          borderRadius: 14,
                          background: "#f8fafc",
                          border: "1px solid #cbd5e1",
                          lineHeight: 1.8,
                          width: "100%",
                          maxWidth: 500,
                          textAlign: "center",
                          marginBottom: 24,
                          fontSize: 20,
                          color: "#0f172a",
                          fontWeight: 700
                        }}
                      >
                        {currentReviewItem.vi}
                      </div>
                    )}

                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                      <button
                        onClick={() => handleReviewAnswer(true)}
                        className="btn-3d btn-success"
                        style={{ padding: "10px 20px" }}
                      >
                        Đã nhớ ✅
                      </button>

                      <button
                        onClick={() => handleReviewAnswer(false)}
                        className="btn-3d btn-error"
                        style={{ padding: "10px 20px" }}
                      >
                        Chưa nhớ ❌
                      </button>

                      <button
                        onClick={stopReviewSession}
                        className="btn-3d btn-neutral"
                        style={{ padding: "10px 20px" }}
                      >
                        Thoát ôn tập
                      </button>
                    </div>

                    <div style={{ marginTop: 20, color: "#64748b", display: "flex", gap: 20 }}>
                      <div>✅ Số từ đã nhớ: {reviewKnown}</div>
                      <div>❌ Số từ quên/luyện lại: {reviewUnknown}</div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div style={styles.gridCards}>
                {reviewItems.map((item, idx) => (
                  <div key={item._reviewId || idx} style={styles.wordCard}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: "#0f172a" }}>{item.en}</div>
                    <div style={{ color: "#0f172a", fontWeight: 600 }}>{item.vi}</div>

                    <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <button
                        onClick={(e) => handleSpeak(e, item.en, "en-US")}
                        className="btn-3d btn-neutral"
                        style={{ padding: "6px 12px", fontSize: 12, borderRadius: 12 }}
                      >
                        🔊 Phát âm
                      </button>

                      <button
                        onClick={() =>
                          setReviewItems((prev) =>
                            prev.filter((x) => x._reviewId !== item._reviewId)
                          )
                        }
                        className="btn-3d btn-error"
                        style={{ padding: "6px 12px", fontSize: 12, borderRadius: 12 }}
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
            <h2 style={{ marginTop: 0 }}>Lộ trình hoàn chỉnh để trở thành PRO</h2>
            <div style={styles.roadmapGrid}>
              <div style={styles.roadCard}>
                <h3 style={{ color: "#0f172a" }}>Kho từ vựng khổng lồ</h3>
                <p style={{ color: "#475569", fontSize: 14 }}>
                  Chủ đề phong phú liên tục được mở rộng: Rau củ quả, Hải sản, Thời trang, Thương mại, Yếu tố & Trang sức... Tích hợp hệ thống từ đối lập giúp nhân đôi phản xạ.
                </p>
              </div>
              <div style={styles.roadCard}>
                <h3 style={{ color: "#0f172a" }}>Ngữ pháp ứng dụng</h3>
                <p style={{ color: "#475569", fontSize: 14 }}>
                  Nắm vững cấu trúc câu qua các bài học lý thuyết trực quan và hệ thống Quiz phân loại cấp độ từ Cơ bản đến Nâng cao.
                </p>
              </div>
              <div style={styles.roadCard}>
                <h3 style={{ color: "#0f172a" }}>Bài đọc & Audio thực tế</h3>
                <p style={{ color: "#475569", fontSize: 14 }}>
                  Bản dịch chi tiết, bài học cuộc sống & kinh doanh tích hợp thành ngữ, giải thích từ mới cặn kẽ và nút bấm phát âm tự nhiên.
                </p>
              </div>
              <div style={styles.roadCard}>
                <h3 style={{ color: "#0f172a" }}>Ôn tập Flashcard</h3>
                <p style={{ color: "#475569", fontSize: 14 }}>
                  Sử dụng phương pháp học lặp lại ngắt quãng (Spaced Repetition) thông qua hệ thống lưu Flashcard và tự đánh giá khả năng nhớ từ.
                </p>
              </div>
            </div>

            <div style={styles.noteBox}>
              Ứng dụng đã được tái cơ cấu dữ liệu sang Tiếng Anh chuyên sâu, loại bỏ hoàn toàn tiếng Trung để đảm bảo sự tập trung cao nhất và mang lại trải nghiệm tối ưu cho người học mới bắt đầu.
            </div>
          </div>
        )}
      </main>

      {showProModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(15,23,42,0.4)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
          padding: 20
        }}>
          <div style={{
            background: "#ffffff",
            border: "2px solid #cbd5e1",
            borderRadius: 24,
            padding: 30,
            maxWidth: 450,
            textAlign: "center",
            boxShadow: "0 20px 40px rgba(15, 23, 42, 0.08)",
            color: "#0f172a"
          }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔒</div>
            <h3 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 10px 0", color: "#0f172a" }}>Tính năng này yêu cầu PRO</h3>
            <p style={{ color: "#475569", lineHeight: 1.6, marginBottom: 24 }}>
              Hãy bấm vào nút <b>"Mở PRO ⭐"</b> ở góc trên cùng bên phải màn hình để kích hoạt tài khoản PRO miễn phí và trải nghiệm đầy đủ tính năng ôn tập, kiểm tra, ngữ pháp và bài đọc nâng cao!
            </p>
            <button
              onClick={closeProModal}
              className="btn-3d btn-primary"
              style={{ width: "100%", padding: "10px 24px" }}
            >
              Tôi đã hiểu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}