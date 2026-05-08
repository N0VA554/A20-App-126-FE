"use client";
import { useState } from "react";
import styles from "./index.module.css";
import { 
  ChevronLeft, ChevronRight, Calendar as CalendarIcon, 
  MapPin, Users, Clock, X, Info, AlertCircle, BookOpen, FileText, Download
} from "lucide-react";

// Dữ liệu mẫu lịch dạy
const TEACHING_EVENTS = [
  { id: 1, date: "2026-05-11", day: "Thứ 2", time: "08:00 - 10:30", title: "Machine Learning", room: "C201", type: "Lecture", students: 45, riskCount: 5, status: "upcoming", desc: "Giới thiệu về Neural Networks. Lưu ý kiểm tra bài tập Lab 1 của sinh viên." },
  { id: 2, date: "2026-05-12", day: "Thứ 3", time: "13:30 - 16:00", title: "Deep Learning Lab", room: "Lab 402", type: "Lab", students: 22, riskCount: 8, status: "warning", desc: "Hướng dẫn thực hành CNN. Có nhiều sinh viên gặp lỗi ở môi trường PyTorch." },
  { id: 3, date: "2026-05-13", day: "Thứ 4", time: "08:00 - 10:30", title: "Data Structures", room: "C102", type: "Lecture", students: 50, riskCount: 1, status: "upcoming", desc: "Cấu trúc dữ liệu cây (Tree) và ứng dụng." },
];

const DAYS_NAME = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"];
const TODAY_STR = "2026-05-11"; // Giả sử hôm nay là Thứ 2

export default function LecturerSchedulePage() {
  const [view, setView] = useState("week");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const getEventsByDate = (date: string) => TEACHING_EVENTS.filter(e => e.date === date);

  return (
    <div className={styles.container}>
      {/* --- CALENDAR HEADER --- */}
      <div className={styles.calendarHeader}>
        <div className={styles.headerLeft}>
          {/* <div className={styles.navBtns}>
            <button className={styles.iconBtn}><ChevronLeft size={20} /></button>
            <button className={styles.iconBtn}><ChevronRight size={20} /></button>
          </div> */}
          <h2 className={styles.currentDate}>Tháng 5, 2026</h2>
          <div className={styles.viewSwitch}>
            {['day', 'week', 'month'].map((v) => (
              <button key={v} onClick={() => setView(v)} className={view === v ? styles.activeView : ""}>
                {v === 'day' ? 'Ngày' : v === 'week' ? 'Tuần' : 'Tháng'}
              </button>
            ))}
          </div>
        </div>
        <button className={styles.syncBtn}><CalendarIcon size={18} /> Đồng bộ Outlook</button>
      </div>

      <div className={styles.viewContainer}>
        {/* --- VIEW: NGÀY (TIMELINE) --- */}
        {view === 'day' && (
          <div className={styles.dayViewWrapper}>
            <div className={styles.dayHeaderRow}>
              <div className={styles.dayInfo}>
                <h3>Thứ 2, ngày 11 tháng 05</h3>
                <p>Hôm nay bạn có <strong>{getEventsByDate(TODAY_STR).length} ca dạy</strong></p>
              </div>
              <span className={styles.todayLabel}>Hôm nay</span>
            </div>
            <div className={styles.timelineContainer}>
              {getEventsByDate(TODAY_STR).map((event, index) => (
                <div key={event.id} className={styles.timelineItem} onClick={() => setSelectedEvent(event)}>
                  <div className={styles.timeSection}>
                    <span className={styles.startTime}>{event.time.split(' - ')[0]}</span>
                    <div className={styles.timeLineConnector}>
                      <div className={styles.timeDot} />
                      {index !== getEventsByDate(TODAY_STR).length - 1 && <div className={styles.line} />}
                    </div>
                  </div>
                  <div className={`${styles.detailedCard} ${event.riskCount > 5 ? styles.highRiskCard : ""}`}>
                    <div className={styles.cardHeader}>
                      <span className={styles.typeBadge}>{event.type}</span>
                      <span className={styles.riskInfo}><AlertCircle size={14}/> {event.riskCount} SV rủi ro</span>
                    </div>
                    <h4 className={styles.courseTitle}>{event.title}</h4>
                    <div className={styles.cardMeta}>
                      <span><MapPin size={16}/> {event.room}</span>
                      <span><Users size={16}/> {event.students} Sinh viên</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- VIEW: TUẦN --- */}
        {view === 'week' && (
          <div className={styles.weekGrid}>
            {DAYS_NAME.map((day, idx) => {
              const currentDate = `2026-05-${11 + idx}`;
              const isToday = currentDate === TODAY_STR;
              return (
                <div key={day} className={`${styles.dayColumn} ${isToday ? styles.todayCol : ""}`}>
                  <div className={styles.dayHeader}>
                    <span className={styles.dayName}>{day}</span>
                    <span className={`${styles.dayNumber} ${isToday ? styles.todayCircle : ""}`}>{11 + idx}</span>
                  </div>
                  <div className={styles.eventSlot}>
                    {getEventsByDate(currentDate).map(event => (
                      <div key={event.id} className={`${styles.eventCard} ${styles[event.status]}`} onClick={() => setSelectedEvent(event)}>
                        <div className={styles.eventTime}>{event.time.split(' ')[0]}</div>
                        <div className={styles.eventTitle}>{event.title}</div>
                        <div className={styles.eventMetaSmall}><Users size={12}/> {event.students}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* --- VIEW: THÁNG --- */}
        {view === 'month' && (
          <div className={styles.monthGrid}>
            {DAYS_NAME.map(d => <div key={d} className={styles.monthDayHeader}>{d}</div>)}
            {Array.from({ length: 31 }).map((_, i) => {
              const dateStr = `2026-05-${String(i + 1).padStart(2, '0')}`;
              const dailyEvents = getEventsByDate(dateStr);
              const isToday = dateStr === TODAY_STR;
              return (
                <div key={i} className={`${styles.monthCell} ${isToday ? styles.todayCell : ""}`}>
                  <span className={styles.monthDateNum}>{i + 1}</span>
                  <div className={styles.monthEventList}>
                    {dailyEvents.map(e => (
                      <div key={e.id} className={styles.monthEventPill} onClick={(ev) => { ev.stopPropagation(); setSelectedEvent(e); }}>
                        {e.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* --- MODAL CHI TIẾT (LECTURER VERSION) --- */}
      {selectedEvent && (
        <div className={styles.modalOverlay} onClick={() => setSelectedEvent(null)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setSelectedEvent(null)}><X size={24} /></button>
            <div className={styles.modalHeader}>
              <div className={styles.typeTag}>{selectedEvent.type}</div>
              <h3 className={styles.modalTitle}>{selectedEvent.title}</h3>
              <p className={styles.modalSubtitle}>{selectedEvent.day}, Ngày {selectedEvent.date}</p>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.infoRow}>
                <div className={styles.iconBox}><Clock size={20} /></div>
                <div><label>Thời gian</label><p>{selectedEvent.time}</p></div>
              </div>
              <div className={styles.infoRow}>
                <div className={styles.iconBox}><MapPin size={20} /></div>
                <div><label>Địa điểm</label><p>Phòng {selectedEvent.room} • VinUni Alpha</p></div>
              </div>
              <div className={styles.infoRow}>
                <div className={styles.iconBox} style={{color: '#ef4444', background: '#fff5f5'}}><AlertCircle size={20} /></div>
                <div><label>Tình trạng lớp</label><p>{selectedEvent.students} SV ({selectedEvent.riskCount} nguy cơ cao)</p></div>
              </div>
              <div className={styles.descriptionBox}>
                <div className={styles.descTitle}><Info size={16} /> Ghi chú giảng dạy</div>
                <p>{selectedEvent.desc}</p>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.secondaryBtn}><Download size={18} /> Danh sách lớp</button>
              <button className={styles.primaryBtn}><FileText size={18} /> Điểm danh AI</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}