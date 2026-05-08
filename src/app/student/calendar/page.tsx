"use client";
import { useState } from "react";
import styles from "./index.module.css";
import { 
  ChevronLeft, ChevronRight, Calendar as CalendarIcon, 
  MapPin, User, Clock, X, Info, BookOpen, FileText, AlertCircle
} from "lucide-react";

const EVENTS = [
  { id: 1, date: "2026-05-11", day: "Thứ 2", time: "08:00 - 10:30", title: "Machine Learning", lecturer: "Prof. Nguyen Van A", room: "C201", type: "Lecture", status: "upcoming", desc: "Giới thiệu về mạng Neural và thuật toán Lan truyền ngược (Backpropagation)." },
  { id: 2, date: "2026-05-12", day: "Thứ 3", time: "13:30 - 16:00", title: "Deep Learning", lecturer: "Dr. Le Haan", room: "Lab 402", type: "Lab", status: "warning", desc: "Thực hành triển khai CNN bằng PyTorch. Yêu cầu nộp báo cáo Lab 3 trước buổi học." },
  { id: 3, date: "2026-05-13", day: "Thứ 4", time: "08:00 - 10:30", title: "Data Structures", lecturer: "Prof. Tran B", room: "C102", type: "Lecture", status: "upcoming", desc: "Cấu trúc dữ liệu cây (Tree) và ứng dụng trong tìm kiếm nhị phân." },
  { id: 4, date: "2026-05-15", day: "Thứ 6", time: "10:00 - 12:00", title: "Ethics in AI", lecturer: "Dr. Elena", room: "C201", type: "Seminar", status: "upcoming", desc: "Thảo luận về các vấn đề đạo đức và quyền riêng tư trong thu thập dữ liệu lớn." },
];

const DAYS_NAME = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"];
const TODAY_STR = "2026-05-11";

export default function TKBPage() {
  const [view, setView] = useState("week");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const getEventsByDate = (date: string) => EVENTS.filter(e => e.date === date);

  return (
    <div className={styles.container}>
      {/* --- CẤU CẤU HEADER --- */}
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
        <button className={styles.syncBtn}><CalendarIcon size={18} /> Đồng bộ Calendar</button>
      </div>

      <div className={styles.viewContainer}>
        {/* --- VIEW: NGÀY (Cải tiến với Timeline Chi tiết) --- */}
{view === 'day' && (
  <div className={styles.dayViewWrapper}>
    <div className={styles.dayHeaderRow}>
      <div className={styles.dayInfo}>
        <h3>Thứ 2, ngày 11 tháng 05</h3>
        <p>Bạn có <strong>{getEventsByDate(TODAY_STR).length} buổi học</strong> trong hôm nay</p>
      </div>
      <span className={styles.todayLabel}>Hôm nay</span>
    </div>

    <div className={styles.timelineContainer}>
      {getEventsByDate(TODAY_STR).length > 0 ? (
        getEventsByDate(TODAY_STR).map((event, index) => (
          <div key={event.id} className={styles.timelineItem} onClick={() => setSelectedEvent(event)}>
            <div className={styles.timeSection}>
              <span className={styles.startTime}>{event.time.split(' - ')[0]}</span>
              <div className={styles.timeLineConnector}>
                <div className={styles.timeDot} />
                {index !== getEventsByDate(TODAY_STR).length - 1 && <div className={styles.line} />}
              </div>
            </div>
            
            <div className={`${styles.detailedCard} ${styles[event.status]}`}>
              <div className={styles.cardHeader}>
                <span className={styles.typeBadge}>{event.type}</span>
                <span className={styles.duration}><Clock size={14} /> {event.time}</span>
              </div>
              <h4 className={styles.courseTitle}>{event.title}</h4>
              <div className={styles.cardMeta}>
                <span className={styles.metaItem}><MapPin size={16} /> {event.room}</span>
                <span className={styles.metaItem}><User size={16} /> {event.lecturer}</span>
              </div>
              {event.status === 'warning' && (
                <div className={styles.warningAlert}>
                  <AlertCircle size={14} /> Lưu ý: Cần nộp bài trước khi vào lớp
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className={styles.emptyState}>
          <CalendarIcon size={48} />
          <p>Hôm nay bạn không có lịch học. Hãy tận hưởng thời gian nghỉ ngơi!</p>
        </div>
      )}
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
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* --- VIEW: THÁNG (Đã nâng cấp hiển thị nội dung) --- */}
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

      {/* --- MODAL CHI TIẾT (PHIÊN BẢN ĐẦY ĐỦ NHẤT) --- */}
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
                <div className={styles.iconBox}><User size={20} /></div>
                <div><label>Giảng viên</label><p>{selectedEvent.lecturer}</p></div>
              </div>
              
              <div className={styles.descriptionBox}>
                <div className={styles.descTitle}><Info size={16} /> Nội dung buổi học</div>
                <p>{selectedEvent.desc}</p>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button className={styles.secondaryBtn}><BookOpen size={18} /> Tài liệu</button>
              <button className={styles.primaryBtn}><FileText size={18} /> Ghi chú AI</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}