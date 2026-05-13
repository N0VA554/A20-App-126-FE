"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./index.module.css";
import { 
  ListChecks, 
  Send, 
  CalendarClock, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  BookOpen, 
  Target 
} from "lucide-react";
import {
  fetchEnrollmentPlan,
  simulateEnrollment,
  submitEnrollment,
  type EnrollmentPlan,
  type EnrollmentSimulation,
} from "@/src/lib/api/sis";

export default function EnrollmentPlannerPage() {
  const [plan, setPlan] = useState<EnrollmentPlan | null>(null);
  const [selected, setSelected] = useState<number[]>([]);
  const [simulation, setSimulation] = useState<EnrollmentSimulation | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // 1. Fetch dữ liệu kế hoạch ban đầu
  useEffect(() => {
    fetchEnrollmentPlan()
      .then((data) => {
        setPlan(data);
        // Tự động chọn các môn bắt buộc gợi ý
        setSelected(data.recommended.filter(c => c.is_required).map(c => c.course_id));
      })
      .finally(() => setLoading(false));
  }, []);

  // 2. Mô phỏng khi thay đổi lựa chọn
  useEffect(() => {
    if (!selected.length) {
      setSimulation(null);
      return;
    }
    simulateEnrollment(selected).then(setSimulation).catch(() => setSimulation(null));
  }, [selected]);

  const selectedSet = useMemo(() => new Set(selected), [selected]);

  const toggleCourse = (id: number) => {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleSubmit = async () => {
    const result = await submitEnrollment(selected);
    setMessage(result.message || (result.success ? "Gửi đăng ký thành công!" : "Kế hoạch không hợp lệ."));
  };

  if (loading) return <div className={styles.statCard}>Đang tải kế hoạch đăng ký...</div>;
  if (!plan) return <div className={styles.statCard}>Lỗi nạp dữ liệu kế hoạch.</div>;

  return (
    <div className={styles.wrapper}>
      
      {/* 1. Stats Row Section */}
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={styles.statInfo}>
            <p>Kỳ học mục tiêu</p>
            <h3>Kỳ {plan.target_semester}</h3>
          </div>
          <div className={`${styles.statIcon} ${styles.bgNavy}`}><Target size={24} /></div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statInfo}>
            <p>Tín chỉ đã chọn</p>
            <h3>{simulation?.total_credits ?? 0} TC</h3>
          </div>
          <div className={`${styles.statIcon} ${styles.bgEmerald}`}><BookOpen size={24} /></div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statInfo}>
            <p>Giới hạn tín chỉ</p>
            <h3>{plan.credit_limit.min} - {plan.credit_limit.max}</h3>
          </div>
          <div className={`${styles.statIcon} ${styles.bgGold}`}><ListChecks size={24} /></div>
        </div>
      </div>

      {/* 2. Main Content Grid */}
      <div className={styles.contentGrid}>
        
        {/* Left: Recommended Courses */}
        <div className={styles.coursePanel}>
          <div className={styles.panelHeader}>
            <h3>Học phần có thể đăng ký</h3>
            <p style={{fontSize: '0.875rem', color: '#64748b', marginTop: '4px'}}>
              Chọn các môn để xem mô phỏng thời khóa biểu và kiểm tra điều kiện.
            </p>
          </div>

          <div className={styles.courseList}>
            {plan.recommended.map((course) => (
              <label key={course.course_id} className={styles.courseItem}>
                <input 
                  type="checkbox" 
                  className={styles.checkbox}
                  checked={selectedSet.has(course.course_id)}
                  onChange={() => toggleCourse(course.course_id)}
                />
                <div style={{flex: 1}}>
                  <span className={styles.courseCode}>{course.course_code}</span>
                  <h4 className={styles.courseName}>{course.course_name}</h4>
                  <div className={styles.courseMeta}>
                    <span>{course.credits} Tín chỉ</span>
                    <span style={{color: course.is_required ? '#c0392b' : '#64748b', fontWeight: 600}}>
                      {course.is_required ? '• Bắt buộc' : '• Tự chọn'}
                    </span>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Right: Simulation & Blocked */}
        <div className={styles.sidePanel}>
          
          {/* Simulation Summary */}
          <div className={styles.simulationCard}>
            <div className={styles.simTitle}><CalendarClock size={18} /> Mô phỏng đăng ký</div>
            <div className={styles.totalCredits}>{simulation?.total_credits ?? 0} <span style={{fontSize: '1rem'}}>Tín chỉ</span></div>
            
            <div style={{marginTop: '1rem'}}>
              {simulation?.warnings?.map((w, i) => (
                <div key={i} className={`${styles.statusBox} ${styles.warning}`}>
                  <AlertTriangle size={14} style={{inlineSize: '16px'}} /> {w}
                </div>
              ))}
              
              {simulation?.is_valid && (
                <div className={`${styles.statusBox} ${styles.valid}`}>
                  <CheckCircle2 size={14} style={{inlineSize: '16px'}} /> Kế hoạch hợp lệ
                </div>
              )}

              {message && <div className={styles.statusBox} style={{background: '#f1f5f9'}}>{message}</div>}
            </div>

            {/* Timetable Preview */}
            {simulation?.timetable && simulation.timetable.length > 0 && (
              <div className={styles.timetableBox}>
                <p style={{fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase'}}>Thời khóa biểu dự kiến</p>
                {simulation.timetable.map((slot, idx) => (
                  <div key={idx} className={styles.timeSlot}>
                    <strong>{slot.course_code} · {slot.course_name}</strong>
                    <span>{slot.day_of_week} | {slot.start_time}-{slot.end_time} | {slot.room_number}</span>
                  </div>
                ))}
              </div>
            )}

            <button 
              className={styles.submitBtn}
              onClick={handleSubmit}
              disabled={!simulation?.is_valid}
            >
              <Send size={16} /> Gửi đăng ký
            </button>
          </div>

          {/* Blocked Courses (Prerequisites missing) */}
          {plan.blocked.length > 0 && (
            <div className={styles.blockedCard}>
              <div className={styles.blockedTitle}><Lock size={16} /> Chưa đủ điều kiện (Tiên quyết)</div>
              {plan.blocked.map(c => (
                <div key={c.course_id} className={styles.blockedItem}>
                  • {c.course_code} - {c.course_name}
                </div>
              ))}
            </div>
          )}

          <div className={styles.statCard} style={{padding: '1rem', background: '#f8fafc', borderStyle: 'dashed'}}>
            <p style={{fontSize: '0.75rem', color: '#64748b', lineHeight: 1.5}}>
              <strong>Ghi chú:</strong> {plan.credit_limit.note}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}