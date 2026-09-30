import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { CalendarIcon, ClockIcon, MapPinIcon, DownloadIcon } from "./Icons";

// Calculate next Sunday at 10:00 AM UTC+7 (Indochina Time)
function getNextSundayService() {
  const now = new Date();
  
  // Convert current time to UTC+7
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const cambodiaNow = new Date(utc + 3600000 * 7);

  const dayOfWeek = cambodiaNow.getDay(); // 0 is Sunday
  const daysUntilSunday = (7 - dayOfWeek) % 7;

  const nextSunday = new Date(cambodiaNow);
  nextSunday.setDate(cambodiaNow.getDate() + daysUntilSunday);
  nextSunday.setHours(10, 0, 0, 0);

  // If today is Sunday and it's already past 12:00 PM, point to next Sunday
  if (dayOfWeek === 0 && cambodiaNow.getHours() >= 12) {
    nextSunday.setDate(nextSunday.getDate() + 7);
  }

  // Convert back to local timestamp difference
  const diffMs = nextSunday.getTime() - cambodiaNow.getTime();
  return {
    targetDate: nextSunday,
    diffMs: Math.max(diffMs, 0),
  };
}

export default function SundayCountdown({ onPlanVisit }) {
  const router = useRouter();
  const locale = router.locale || "en";

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [showCalendarMenu, setShowCalendarMenu] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const { diffMs } = getNextSundayService();

      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diffMs / 1000 / 60) % 60);
      const seconds = Math.floor((diffMs / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Generate Google Calendar Link
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent("Sunday Sanctuary Worship — Hun Chet");
    const details = encodeURIComponent(
      "Reverent congregational worship, prayer, biblical exposition, and fellowship. Pastor Kim Jong Ho and Leader Hun Chet ministering in the sanctuary."
    );
    const location = encodeURIComponent(
      "Trapaing Krasang, Por Senchey, Phnom Penh, Cambodia"
    );
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&recur=RRULE:FREQ=WEEKLY;BYDAY=SU`;
  };

  // Generate and download .ics calendar file for Apple Calendar / Outlook
  const downloadIcsFile = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Hun Chet Ministry//Sunday Worship//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      "UID:sunday-worship-" + Date.now() + "@hunchet.blog",
      "SUMMARY:Sunday Sanctuary Worship — Hun Chet",
      "DESCRIPTION:Reverent congregational worship, prayer, biblical exposition, and fellowship in Phnom Penh.",
      "LOCATION:Trapaing Krasang, Por Senchey, Phnom Penh, Cambodia",
      "RRULE:FREQ=WEEKLY;BYDAY=SU",
      "STATUS:CONFIRMED",
      "SEQUENCE:0",
      "BEGIN:VALARM",
      "TRIGGER:-PT12H",
      "ACTION:DISPLAY",
      "DESCRIPTION:Reminder: Sunday Sanctuary Worship at 10:00 AM",
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "hunchet-sunday-worship.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowCalendarMenu(false);
  };

  const labels = {
    badge: {
      en: "Next Sanctuary Gathering",
      km: "កម្មវិធីថ្វាយបង្គំបន្ទាប់",
      ko: "다음 주일 예배",
      zh: "下一次主日崇拜",
    },
    title: {
      en: "Sunday Sanctuary Worship at 10:00 AM",
      km: "ការថ្វាយបង្គំថ្ងៃអាទិត្យ វេលាម៉ោង ១០:០០ ព្រឹក",
      ko: "주일 오전 10:00 본당 예배",
      zh: "主日上午 10:00 圣殿崇拜",
    },
    days: { en: "Days", km: "ថ្ងៃ", ko: "일", zh: "天" },
    hours: { en: "Hours", km: "ម៉ោង", ko: "시간", zh: "时" },
    mins: { en: "Mins", km: "នាទី", ko: "분", zh: "分" },
    secs: { en: "Secs", km: "វិនាទី", ko: "초", zh: "秒" },
    addToCal: {
      en: "Add to Calendar",
      km: "កត់ត្រាក្នុងប្រតិទិន",
      ko: "캘린더에 추가",
      zh: "加入日历",
    },
    googleCal: {
      en: "Google Calendar",
      km: "Google Calendar",
      ko: "구글 캘린더",
      zh: "谷歌日历",
    },
    appleCal: {
      en: "Apple / Outlook (.ics)",
      km: "Apple / Outlook (.ics)",
      ko: "애플 / 아웃룩 (.ics)",
      zh: "苹果 / 微软日历 (.ics)",
    },
  };

  const t = (key) => labels[key]?.[locale] || labels[key]?.en || "";

  return (
    <div className="sunday-countdown-card">
      <div className="sunday-countdown-header">
        <div className="sunday-countdown-badge">
          <ClockIcon style={{ width: 13, height: 13 }} />
          <span>{t("badge")}</span>
        </div>
        <div className="sunday-countdown-location">
          <MapPinIcon style={{ width: 13, height: 13 }} />
          <span>Phnom Penh</span>
        </div>
      </div>

      <h4 className="sunday-countdown-title">{t("title")}</h4>

      {/* 4 Time Digit Boxes */}
      <div className="sunday-countdown-grid">
        <div className="countdown-box">
          <span className="countdown-digit">
            {String(timeLeft.days).padStart(2, "0")}
          </span>
          <span className="countdown-label">{t("days")}</span>
        </div>
        <span className="countdown-colon">:</span>
        <div className="countdown-box">
          <span className="countdown-digit">
            {String(timeLeft.hours).padStart(2, "0")}
          </span>
          <span className="countdown-label">{t("hours")}</span>
        </div>
        <span className="countdown-colon">:</span>
        <div className="countdown-box">
          <span className="countdown-digit">
            {String(timeLeft.minutes).padStart(2, "0")}
          </span>
          <span className="countdown-label">{t("mins")}</span>
        </div>
        <span className="countdown-colon">:</span>
        <div className="countdown-box">
          <span className="countdown-digit">
            {String(timeLeft.seconds).padStart(2, "0")}
          </span>
          <span className="countdown-label">{t("secs")}</span>
        </div>
      </div>

      {/* Action Buttons: Add to Calendar & Plan Visit */}
      <div className="sunday-countdown-actions">
        <div className="calendar-dropdown-wrap">
          <button
            type="button"
            className="countdown-cal-btn"
            onClick={() => setShowCalendarMenu(!showCalendarMenu)}
            aria-expanded={showCalendarMenu}
          >
            <CalendarIcon style={{ width: 14, height: 14 }} />
            <span>{t("addToCal")}</span>
          </button>

          {showCalendarMenu && (
            <div className="calendar-dropdown-menu">
              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="calendar-dropdown-item"
                onClick={() => setShowCalendarMenu(false)}
              >
                <CalendarIcon style={{ width: 14, height: 14 }} />
                <span>{t("googleCal")}</span>
              </a>
              <button
                type="button"
                className="calendar-dropdown-item"
                onClick={downloadIcsFile}
              >
                <DownloadIcon style={{ width: 14, height: 14 }} />
                <span>{t("appleCal")}</span>
              </button>
            </div>
          )}
        </div>

        {onPlanVisit && (
          <button
            type="button"
            className="countdown-visit-btn"
            onClick={onPlanVisit}
          >
            {locale === "km"
              ? "គ្រោងមកជួប"
              : locale === "ko"
              ? "방문 계획"
              : locale === "zh"
              ? "计划来访"
              : "Plan Visit"}
          </button>
        )}
      </div>
    </div>
  );
}
