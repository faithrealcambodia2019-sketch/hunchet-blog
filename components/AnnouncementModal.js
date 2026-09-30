import { useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  CloseIcon,
  TelegramIcon,
  MapPinIcon,
  ClockIcon,
  CalendarIcon,
  CheckIcon,
} from "./Icons";

export default function AnnouncementModal({ isOpen, onClose, locale = "en" }) {
  useEffect(() => {
    if (!isOpen) return undefined;

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    const origBody = document.body.style.overflow;
    const origHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = origBody;
      document.documentElement.style.overflow = origHtml;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === "undefined") return null;

  const t = (obj) => obj[locale] || obj.en;

  const text = {
    badge: {
      en: "Official Sanctuary Announcement",
      km: "សេចក្ដីប្រកាសផ្លូវការក្រុមជំនុំ",
      ko: "올네이션스 교회 공식 주일 안내",
      zh: "万民教会官方主日崇拜通告",
    },
    title: {
      en: "Sunday Sanctuary Worship & Preaching",
      km: "ការថ្វាយបង្គំ និងការអធិប្បាយព្រះបន្ទូល",
      ko: "주일 예배 및 말씀 선포",
      zh: "主日崇拜与真理传讲",
    },
    subTitle: {
      en: "Sanctuary Worship • Phnom Penh Campus",
      km: "ការថ្វាយបង្គំនៅព្រះវិហារ • រាជធានីភ្នំពេញ",
      ko: "주일 예배 • 프놈펜 성전",
      zh: "主日崇拜 • 金边崇拜堂",
    },
    preacherLabel: {
      en: "Preachers & Pulpit Ministry",
      km: "អ្នកអធិប្បាយ និងកិច្ចការវេទិកា",
      ko: "설교 및 강단 사역자",
      zh: "讲台教牧事工",
    },
    preachers: {
      en: "Senior Pastor Kim Jong Ho & Ministry Lead Hun Chet",
      km: "លោកគ្រូគង្វាល គីម ជុងហូ & លោកគ្រូ ហ៊ុន ចិត្ត",
      ko: "김종호 담임목사 & 훈 쳇 사역리더",
      zh: "金钟浩主任牧师 & Hun Chet 传道",
    },
    scheduleLabel: {
      en: "Sanctuary Schedule & Times",
      km: "កាលវិភាគថ្វាយបង្គំ",
      ko: "예배 시간표",
      zh: "崇拜时间表",
    },
    service1Title: {
      en: "Sunday Sanctuary Worship",
      km: "ការថ្វាយបង្គំធំថ្ងៃអាទិត្យ",
      ko: "주일 대예배",
      zh: "主日主堂崇拜",
    },
    service1Time: {
      en: "Every Sunday at 10:00 AM",
      km: "រៀងរាល់ថ្ងៃអាទិត្យ ម៉ោង ១០:០០ ព្រឹក",
      ko: "매주 주일 오전 10:00",
      zh: "每周主日 上午 10:00",
    },
    service1Desc: {
      en: "Biblical exposition, congregational praise & prayer (Khmer & English)",
      km: "ការពន្យល់ព្រះគម្ពីរ ការច្រៀងសរសើរតម្កើង និងការអធិស្ឋាន (ខ្មែរ & អង់គ្លេស)",
      ko: "성경 강해, 은혜로운 찬양과 기도 (크메르어 및 영어 통역)",
      zh: "圣经讲道、赞美敬拜与祷告（高棉语及英语）",
    },
    service2Title: {
      en: "Next-Gen Youth & Sunday School",
      km: "យុវជន & ថ្នាក់កុមារព្រះគម្ពីរ",
      ko: "청소년부 및 주일학교",
      zh: "青年团契与主日学",
    },
    service2Time: {
      en: "Every Sunday at 10:30 AM",
      km: "រៀងរាល់ថ្ងៃអាទិត្យ ម៉ោង ១០:៣០ ព្រឹក",
      ko: "매주 주일 오전 10:30",
      zh: "每周主日 上午 10:30",
    },
    service2Desc: {
      en: "Youth discipleship, Bible study, and loving fellowship",
      km: "ការបណ្ដុះសិស្សយុវជន ការរៀនព្រះគម្ពីរ និងការប្រកបគ្នាយ៉ាងកក់ក្ដៅ",
      ko: "청소년 제자 훈련, 성경 공부 및 사랑의 교제",
      zh: "青年门徒训练、圣经研读与属灵团契",
    },
    locationLabel: {
      en: "Campus Location",
      km: "ទីតាំងក្រុមជំនុំ",
      ko: "오시는 길",
      zh: "教会地址",
    },
    locationDesc: {
      en: "Sanctuary Campus, Trapaing Krasang, Por Senchey, Phnom Penh, Cambodia",
      km: "វិទ្យាស្ថាន និងព្រះវិហារ ភូមិត្រពាំងក្រសាំង ខណ្ឌពោធិ៍សែនជ័យ រាជធានីភ្នំពេញ",
      ko: "성전 (캄보디아 프놈펜 트라파잉 ក្រសាំង)",
      zh: "教会园区，金边市菩森芷区 Trapaing Krasang",
    },
    directionsBtn: {
      en: "View Campus Map & Directions",
      km: "មើលផែនទីទីតាំង & ការធ្វើដំណើរ",
      ko: "성전 오시는 길 안내",
      zh: "查看路线与地图",
    },
    telegramBtn: {
      en: "Contact Pastoral Team on Telegram",
      km: "ទាក់ទងគ្រូគង្វាលតាម Telegram",
      ko: "목회자 상담 텔레그램",
      zh: "通过 Telegram 联络教牧",
    },
  };

  return createPortal(
    <div
      className="anc-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Sanctuary Announcement Flyer"
    >
      <div
        className="anc-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          className="anc-modal-close-btn"
          onClick={onClose}
          aria-label="Close flyer modal"
        >
          <CloseIcon style={{ width: 18, height: 18 }} />
        </button>

        {/* Poster Media Side */}
        <div className="anc-modal-poster-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/church-announcement.jpg"
            alt="Sunday Worship Sanctuary Flyer"
            className="anc-modal-poster-img"
          />
        </div>

        {/* Content & Service Details Side */}
        <div className="anc-modal-info-wrap">
          <div>
            <div className="anc-modal-badge">
              <CalendarIcon style={{ width: 13, height: 13, marginRight: 5 }} />
              <span>{t(text.badge)}</span>
            </div>

            <h2 className="anc-modal-title">{t(text.title)}</h2>
            <p className="anc-modal-subtitle">{t(text.subTitle)}</p>

            {/* Preachers Card */}
            <div className="anc-modal-preacher-card">
              <span className="anc-modal-kicker">{t(text.preacherLabel)}</span>
              <strong className="anc-modal-preacher-name">{t(text.preachers)}</strong>
            </div>

            {/* Schedule Rows */}
            <div className="anc-modal-schedule-list">
              <span className="anc-modal-kicker">{t(text.scheduleLabel)}</span>
              <div className="anc-modal-schedule-item">
                <ClockIcon style={{ width: 16, height: 16, color: "var(--gold)", flexShrink: 0, marginTop: 2 }} />
                <div>
                  <strong className="anc-modal-sch-title">{t(text.service1Title)}</strong>
                  <div className="anc-modal-sch-time">{t(text.service1Time)}</div>
                  <div className="anc-modal-sch-desc">{t(text.service1Desc)}</div>
                </div>
              </div>

              <div className="anc-modal-schedule-item">
                <ClockIcon style={{ width: 16, height: 16, color: "var(--gold)", flexShrink: 0, marginTop: 2 }} />
                <div>
                  <strong className="anc-modal-sch-title">{t(text.service2Title)}</strong>
                  <div className="anc-modal-sch-time">{t(text.service2Time)}</div>
                  <div className="anc-modal-sch-desc">{t(text.service2Desc)}</div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="anc-modal-loc-box">
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                <MapPinIcon style={{ width: 16, height: 16, color: "var(--gold)", flexShrink: 0, marginTop: 2 }} />
                <div>
                  <span className="anc-modal-kicker">{t(text.locationLabel)}</span>
                  <p className="anc-modal-loc-text">{t(text.locationDesc)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="anc-modal-actions-row">
            <Link
              href="/contact"
              className="anc-modal-directions-btn"
              onClick={onClose}
            >
              <MapPinIcon style={{ width: 15, height: 15 }} />
              <span>{t(text.directionsBtn)}</span>
            </Link>

            <a
              href="https://t.me/+855966875886"
              target="_blank"
              rel="noreferrer"
              className="anc-modal-telegram-btn"
            >
              <TelegramIcon style={{ width: 15, height: 15 }} />
              <span>{t(text.telegramBtn)}</span>
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
