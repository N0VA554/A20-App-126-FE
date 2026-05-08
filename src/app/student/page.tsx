"use client";
import styles from "./index.module.css";
import { TOP_10_RISK } from "@/src/lib/data";
import { useAuth } from "@/src/context/AuthContext";
import { 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Clock 
} from "lucide-react";

export default function StudentPage() {
  const { user } = useAuth();
  const myData = TOP_10_RISK[0]; // Dữ liệu giả lập

  return (
    <div className={styles.container}>
      {/* Hero Section - Đồng bộ với Lecturer */}
      <section className={styles.hero}>
        <div>
          <h2 className={styles.heroTitle}>
            Chào {user?.full_name?.split(" ").pop() || "Sinh viên"},
          </h2>
          <p className={styles.heroSubtitle}>
            Hệ thống AI đã cập nhật lộ trình học tập cá nhân hóa của bạn.
          </p>
        </div>
        <div className={styles.heroRight}>
          <div className={styles.weekPill}>Tuần 6 • Semester 2</div>
          <div className={styles.refreshHint}>Cập nhật: 2 phút trước</div>
        </div>
      </section>

      {/* Stats Grid - 4 Chỉ số chính */}
      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>GPA Hiện tại</p>
          <p className={`${styles.statValue} ${styles.colorGold}`}>{myData.avgGrade.toFixed(2)}</p>
          <p className={styles.statFoot}>Tăng 0.15 so với tuần 5</p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Chuyên cần</p>
          <p className={styles.statValue}>{100 - myData.absentRate}%</p>
          <p className={styles.statFoot}>Vắng mặt: {myData.absentRate / 10} buổi</p>
        </div>
        <div className={`${styles.statCard} ${myData.status === "RED" ? styles.statCardRed : styles.statCardGold}`}>
          <p className={styles.statLabel}>Mức độ rủi ro</p>
          <p className={styles.statValue}>{myData.score}</p>
          <p className={styles.statFoot}>Dựa trên hành vi học tập</p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Bài tập hoàn thành</p>
          <p className={styles.statValue}>12/15</p>
          <p className={styles.statFoot}>Còn 3 bài trong tuần này</p>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className={styles.insightsGrid}>
        {/* Cột trái: Gợi ý từ AI & Lộ trình */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3>Gợi ý lộ trình từ AI</h3>
            <span className={styles.panelTag}>AI Coach</span>
          </div>
          <div className={styles.learningProgress}>
            <div className={styles.progressItem}>
              <div className={styles.progressInfo}>
                <span>Lý thuyết xác suất (Tuần 6)</span>
                <span>80%</span>
              </div>
              <div className={styles.progressBar}><div className={styles.progressFill} style={{width: '80%'}}></div></div>
            </div>
            <div className={styles.progressItem}>
              <div className={styles.progressInfo}>
                <span>Thực hành Python nâng cao</span>
                <span>45%</span>
              </div>
              <div className={styles.progressBar}><div className={styles.progressFill} style={{width: '45%'}}></div></div>
            </div>
          </div>
          <ul className={styles.insightList} style={{ marginTop: '1.5rem' }}>
            <li><CheckCircle2 size={16} className={styles.iconGreen} /> Hoàn thành Lab 04 trước 23:59 Chủ Nhật.</li>
            <li><TrendingUp size={16} className={styles.iconBlue} /> Cần tập trung hơn vào phần Linear Regression.</li>
            <li><AlertCircle size={16} className={styles.iconRed} /> Bạn có 1 bài quiz sắp hết hạn sau 4 giờ.</li>
          </ul>
        </div>

        {/* Cột phải: Việc cần làm (To-do) chuyên nghiệp */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3>Việc cần làm hôm nay</h3>
            <button className={styles.panelLink}>Xem tất cả</button>
          </div>
          <div className={styles.todoContainer}>
            <div className={styles.todoCard}>
              <input type="checkbox" id="t1" defaultChecked />
              <label htmlFor="t1">
                <strong>Ôn tập Slide 06</strong>
                <span>Hạn chót: 14:00 hôm nay</span>
              </label>
            </div>
            <div className={styles.todoCard}>
              <input type="checkbox" id="t2" />
              <label htmlFor="t2">
                <strong>Làm Quiz tuần 6</strong>
                <span>Hệ thống AI & Data</span>
              </label>
            </div>
            <div className={styles.todoCard}>
              <input type="checkbox" id="t3" />
              <label htmlFor="t3">
                <strong>Nộp bản thảo Research</strong>
                <span>Hạn chót: Ngày mai</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
}