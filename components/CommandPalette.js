import { useState, useEffect, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/router";
import Link from "next/link";
import { pick } from "../lib/i18n";
import { VIDEOS } from "../lib/videos";
import { BOOKS } from "../lib/books";
import {
  SearchIcon,
  CloseIcon,
  BookOpenIcon,
  PlayIcon,
  CompassIcon,
  ArrowRightIcon,
  UserIcon,
  CameraIcon,
  HeartIcon,
  CalendarIcon,
  MapPinIcon,
} from "./Icons";

const STATIC_PAGES = [
  {
    type: "page",
    href: "/",
    icon: CompassIcon,
    title: {
      en: "Home — Hun Chet Ministry Sanctuary",
      km: "ទំព័រដើម — ព័ន្ធកិច្ចលោកគ្រូ ហ៊ុន ចិត្ត",
      ko: "홈 — 훈 쳇 사역 본당",
      zh: "首页 — Hun Chet 事工圣殿",
    },
    category: { en: "Navigation", km: "ការរុករក", ko: "탐색", zh: "导览" },
  },
  {
    type: "page",
    href: "/about",
    icon: CompassIcon,
    title: {
      en: "Our Story & Ministry Vision in Phnom Penh",
      km: "ដំណើររឿង និងចក្ខុវិស័យក្រុមជំនុំនៅភ្នំពេញ",
      ko: "교회 이야기와 프놈펜 사역 비전",
      zh: "教会异象与金边宣教事工",
    },
    category: { en: "About", km: "អំពីយើង", ko: "교회 소개", zh: "关于我们" },
  },
  {
    type: "page",
    href: "/about#leadership",
    icon: UserIcon,
    title: {
      en: "Pastors & Leadership — Pastor Kim Jong Ho & Leader Hun Chet",
      km: "គ្រូគង្វាល និងថ្នាក់ដឹកនាំ — លោកគ្រូ គីម ជុងហូ & លោកគ្រូ ហ៊ុន ចិត្ត",
      ko: "목회자와 리더십 — 김종호 목사 & 훈 쳇 리더",
      zh: "教牧同工 — 金钟浩牧师与 Hun Chet 传道",
    },
    category: { en: "Leadership", km: "ថ្នាក់ដឹកនាំ", ko: "리더십", zh: "同工团队" },
  },
  {
    type: "page",
    href: "/about#beliefs",
    icon: BookOpenIcon,
    title: {
      en: "What We Believe — Orthodox Biblical Heritage & 1954 Khmer Bible",
      km: "ជំនឿ និងគោលលទ្ធិ — ជំនឿពិត និងព្រះគម្ពីរភាសាខ្មែរ ១៩៥៤",
      ko: "우리의 신앙과 교리 — 1954 크메르 성경 유산",
      zh: "基本信条 — 正统历史信仰与1954高棉圣经",
    },
    category: { en: "Doctrine", km: "គោលលទ្ធិ", ko: "신앙 고백", zh: "信仰信条" },
  },
  {
    type: "page",
    href: "/devotions",
    icon: BookOpenIcon,
    title: {
      en: "Daily Devotions (365-Day Journey & 500 Famous Verses)",
      km: "ការសញ្ជឹងគិតប្រចាំថ្ងៃ (ដំណើរជីវិត ៣៦៥ ថ្ងៃ & ៥០០ ខគម្ពីរ)",
      ko: "매일 말씀 묵상 (365일 성경 여정 & 500구절 암송)",
      zh: "每日灵修（365天灵修历程与500金句）",
    },
    category: { en: "Devotion", km: "ការសញ្ជឹងគិត", ko: "묵상", zh: "每日灵修" },
  },
  {
    type: "page",
    href: "/resource",
    icon: PlayIcon,
    title: {
      en: "Sermons & Media Archive — Sunday Services & Gospel Videos",
      km: "វីដេអូ និងធនធាន — ការថ្វាយបង្គំថ្ងៃអាទិត្យ និងដំណឹងល្អ",
      ko: "영상 설교 & 미디어 — 주일 예배 및 복음 영상",
      zh: "影音与讲道 — 主日崇拜实况与福音影片",
    },
    category: { en: "Media", km: "ប្រព័ន្ធផ្សព្វផ្សាយ", ko: "미디어", zh: "讲道影音" },
  },
  {
    type: "page",
    href: "/library",
    icon: BookOpenIcon,
    title: {
      en: "Theological Library — Christian Books & PDF Commentaries",
      km: "បណ្ណាល័យសៀវភៅ — សៀវភៅគ្រីស្ទបរិស័ទ និងអត្ថាធិប្បាយ PDF",
      ko: "신학 도서관 — 기독교 고전 및 주석 PDF",
      zh: "神学图书馆 — 属灵书籍与电子注释书",
    },
    category: { en: "Library", km: "បណ្ណាល័យ", ko: "도서관", zh: "属灵图书" },
  },
  {
    type: "page",
    href: "/articles",
    icon: BookOpenIcon,
    title: {
      en: "Articles & Exegesis — Biblical Commentary & Pastoral Reflections",
      km: "អត្ថបទ និងទេសនា — ការពន្យល់ព្រះគម្ពីរ និងការលើកទឹកចិត្ត",
      ko: "설교 및 칼럼 — 목회적 성경 강해와 영적 권면",
      zh: "讲道与专文 — 教牧解经与属灵劝勉",
    },
    category: { en: "Articles", km: "អត្ថបទ", ko: "칼럼", zh: "专文解经" },
  },
  {
    type: "page",
    href: "/gallery",
    icon: CameraIcon,
    title: {
      en: "Ministry Photo Gallery — Sanctuary Worship & Baptism Joy",
      km: "កម្រងរូបភាពព័ន្ធកិច្ច — ការថ្វាយបង្គំ និងពិធីបុណ្យជ្រមុជទឹក",
      ko: "사역 갤러리 — 주일 예배 및 물세례식 사진",
      zh: "事工画廊 — 圣殿崇拜与欢庆受浸实景",
    },
    category: { en: "Gallery", km: "កម្រងរូបភាព", ko: "갤러리", zh: "事工实景" },
  },
  {
    type: "page",
    href: "/partner-with-us",
    icon: HeartIcon,
    title: {
      en: "Partner With Us — Kingdom Giving & Ministry Support (ABA / ACLEDA)",
      km: "ចូលរួមជាដៃគូ — ការថ្វាយដង្វាយ និងការគាំទ្រព័ន្ធកិច្ច",
      ko: "동역 및 후원 — 십일조 및 사역 헌금 (ABA / ACLEDA)",
      zh: "同心奉献 — 宣教奉献与伙伴支持（ABA / ACLEDA）",
    },
    category: { en: "Giving", km: "ការថ្វាយដង្វាយ", ko: "후원", zh: "奉献事工" },
  },
  {
    type: "page",
    href: "/contact",
    icon: MapPinIcon,
    title: {
      en: "Contact & Church Location — Trapaing Krasang, Phnom Penh",
      km: "ទំនាក់ទំនង និងទីតាំងព្រះវិហារ — ភូមិត្រពាំងក្រសាំង រាជធានីភ្នំពេញ",
      ko: "오시는 길 & 문의 — 프놈펜 뜨라뻬앙끄拉상",
      zh: "联系与地址 — 金边 Trapaing Krasang 园区",
    },
    category: { en: "Contact", km: "ទំនាក់ទំនង", ko: "문의", zh: "联系我们" },
  },
];

export default function CommandPalette({ isOpen, onClose }) {
  const router = useRouter();
  const locale = router.locale || "en";
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filterType, setFilterType] = useState("all");
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setFilterType("all");
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 50);
    }
  }, [isOpen]);

  // Lock body scroll
  useEffect(() => {
    if (!isOpen) return undefined;
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = origOverflow;
    };
  }, [isOpen]);

  // Aggregate searchable items
  const allItems = useMemo(() => {
    const items = [...STATIC_PAGES];

    // Add Videos
    VIDEOS.forEach((vid) => {
      items.push({
        type: "video",
        href: `/resource`,
        icon: PlayIcon,
        title: vid.title,
        desc: vid.description,
        badge: vid.duration,
        category: { en: "Sermon", km: "វីដេអូ", ko: "영상 설교", zh: "影音讲道" },
      });
    });

    // Add Books
    BOOKS.forEach((book) => {
      items.push({
        type: "book",
        href: `/library/${book.slug}`,
        icon: BookOpenIcon,
        title: book.title,
        desc: book.desc,
        badge: book.pages,
        category: { en: "Library Book", km: "សៀវភៅបណ្ណាល័យ", ko: "도서", zh: "图书" },
      });
    });

    return items;
  }, []);

  // Filter items based on query and filter tab
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();

    return allItems.filter((item) => {
      if (filterType !== "all" && item.type !== filterType) {
        return false;
      }

      if (!q) return true;

      const titleStr = (pick(item.title, locale) || "").toLowerCase();
      const titleEn = (item.title?.en || "").toLowerCase();
      const titleKm = (item.title?.km || "").toLowerCase();
      const descStr = (pick(item.desc, locale) || "").toLowerCase();
      const catStr = (pick(item.category, locale) || "").toLowerCase();

      return (
        titleStr.includes(q) ||
        titleEn.includes(q) ||
        titleKm.includes(q) ||
        descStr.includes(q) ||
        catStr.includes(q)
      );
    });
  }, [allItems, query, filterType, locale]);

  // Reset selected index when filtered list changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredItems]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredItems.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredItems.length - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          const item = filteredItems[selectedIndex];
          onClose();
          router.push(item.href);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose, router]);

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.children[selectedIndex];
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  if (!isOpen || typeof document === "undefined") return null;

  const placeholderText = {
    en: "Type to search devotions, sermons, library books, or pages...",
    km: "ស្វែងរកការសញ្ជឹងគិត វីដេអូ សៀវភៅ ឬទំព័រផ្សេងៗ...",
    ko: "말씀 묵상, 설교 영상, 도서, 페이지 검색...",
    zh: "搜索灵修、讲道、图书或页面...",
  };

  return createPortal(
    <div
      className="cmd-palette-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Quick Search"
    >
      <div
        className="cmd-palette-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="cmd-input-bar">
          <SearchIcon className="cmd-search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="cmd-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={pick(placeholderText, locale)}
            aria-label="Search"
          />
          {query ? (
            <button
              type="button"
              className="cmd-clear-btn"
              onClick={() => setQuery("")}
              aria-label="Clear input"
            >
              <CloseIcon style={{ width: 14, height: 14 }} />
            </button>
          ) : (
            <kbd className="cmd-shortcut-badge">ESC</kbd>
          )}
        </div>

        {/* Filter Pills */}
        <div className="cmd-filter-bar">
          {[
            { id: "all", label: { en: "All", km: "ទាំងអស់", ko: "전체", zh: "全部" } },
            { id: "page", label: { en: "Pages", km: "ទំព័រ", ko: "페이지", zh: "页面" } },
            { id: "book", label: { en: "Library Books", km: "សៀវភៅ", ko: "도서", zh: "图书" } },
            { id: "video", label: { en: "Sermons & Media", km: "វីដេអូ", ko: "영상", zh: "影音" } },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`cmd-filter-pill ${filterType === tab.id ? "active" : ""}`}
              onClick={() => setFilterType(tab.id)}
            >
              {pick(tab.label, locale)}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="cmd-results-list" ref={listRef}>
          {filteredItems.length === 0 ? (
            <div className="cmd-empty-state">
              <p>
                {locale === "km"
                  ? "មិនមានលទ្ធផលត្រូវគ្នានឹងការស្វែងរករបស់អ្នកឡើយ"
                  : locale === "ko"
                  ? "검색 결과가 없습니다"
                  : locale === "zh"
                  ? "未找到匹配的结果"
                  : "No matching results found for your search."}
              </p>
            </div>
          ) : (
            filteredItems.slice(0, 30).map((item, idx) => {
              const IconComp = item.icon || CompassIcon;
              const isSelected = idx === selectedIndex;

              return (
                <div
                  key={`${item.href}-${idx}`}
                  className={`cmd-result-item ${isSelected ? "is-selected" : ""}`}
                  onClick={() => {
                    onClose();
                    router.push(item.href);
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <div className="cmd-result-icon">
                    <IconComp style={{ width: 18, height: 18 }} />
                  </div>

                  <div className="cmd-result-content">
                    <div className="cmd-result-top">
                      <span className="cmd-result-title">
                        {pick(item.title, locale)}
                      </span>
                      <span className="cmd-result-badge">
                        {pick(item.category, locale)}
                      </span>
                    </div>

                    {item.desc && (
                      <p className="cmd-result-desc">
                        {pick(item.desc, locale)}
                      </p>
                    )}
                  </div>

                  <div className="cmd-result-action">
                    <ArrowRightIcon style={{ width: 14, height: 14 }} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Keyboard Helper Footer */}
        <div className="cmd-footer-bar">
          <div className="cmd-footer-keys">
            <span>
              <kbd>↑</kbd> <kbd>↓</kbd> {locale === "km" ? "រុករក" : "Navigate"}
            </span>
            <span>
              <kbd>↵</kbd> {locale === "km" ? "បើក" : "Select"}
            </span>
            <span>
              <kbd>ESC</kbd> {locale === "km" ? "បិទ" : "Close"}
            </span>
          </div>
          <div className="cmd-footer-branding">
            <span>Hun Chet Ministry Search</span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
