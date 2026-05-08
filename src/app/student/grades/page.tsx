"use client";
import styles from "./index.module.css";
import { Award, TrendingUp, BookOpen, Search, Download, Filter, ChevronRight } from "lucide-react";

export default function GradesPage() {
  return (
    <div className={styles.wrapper}>
      {/* Header Stats */}
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={styles.statInfo}>
            <p>GPA Tích lũy (4.0)</p>
            <h3>3.65</h3>
          </div>
          <div className={`${styles.statIcon} ${styles.bgGold}`}><Award size={24} /></div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statInfo}>
            <p>Tín chỉ tích lũy</p>
            <h3>72 / 120</h3>
          </div>
          <div className={`${styles.statIcon} ${styles.bgNavy}`}><BookOpen size={24} /></div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statInfo}>
            <p>Xếp loại dự kiến</p>
            <h3>Excellent</h3>
          </div>
          <div className={`${styles.statIcon} ${styles.bgGreen}`}><TrendingUp size={24} /></div>
        </div>
      </div>

      <div className={styles.contentGrid}>
        {/* Main Grades Table */}
        <div className={styles.tablePanel}>
          <div className={styles.panelHeader}>
            <h3>Chi tiết điểm học kỳ II</h3>
            <div className={styles.actions}>
              <div className={styles.searchBox}>
                <Search size={16} />
                <input type="text" placeholder="Tìm môn học..." />
              </div>
              <button className={styles.iconBtn}><Download size={18} /></button>
            </div>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Mã môn</th>
                  <th>Tên môn học</th>
                  <th>Số TC</th>
                  <th>Quá trình</th>
                  <th>Cuối kỳ</th>
                  <th>Tổng kết</th>
                  <th>Thang 4</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 'COMP301', name: 'Machine Learning', tc: 3, mid: 8.5, final: 9.0, total: 8.8, gpa: 4.0 },
                  { id: 'COMP202', name: 'Database Systems', tc: 3, mid: 7.5, final: 8.0, total: 7.8, gpa: 3.5 },
                  { id: 'MATH105', name: 'Linear Algebra', tc: 4, mid: 9.0, final: 8.5, total: 8.7, gpa: 4.0 },
                  { id: 'ETHI101', name: 'Ethics in AI', tc: 2, mid: 8.0, final: 7.5, total: 7.7, gpa: 3.0 },
                ].map((item, idx) => (
                  <tr key={idx}>
                    <td className={styles.codeCell}>{item.id}</td>
                    <td className={styles.nameCell}>{item.name}</td>
                    <td>{item.tc}</td>
                    <td>{item.mid}</td>
                    <td>{item.final}</td>
                    <td className={styles.boldCell}>{item.total}</td>
                    <td><span className={styles.gradeBadge}>{item.gpa}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Side Analysis */}
        <div className={styles.sidePanel}>
          <div className={styles.panelHeader}>
            <h3>Phân tích mục tiêu AI</h3>
          </div>
          <div className={styles.goalCard}>
            <div className={styles.goalHeader}>
              <span>Mục tiêu GPA kỳ này</span>
              <strong>3.80</strong>
            </div>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: '85%' }}></div>
            </div>
            <p className={styles.goalHint}>Bạn cần đạt ít nhất 8.5 ở môn <strong>Deep Learning</strong> để chạm mục tiêu.</p>
          </div>

          <div className={styles.historyList}>
            <h4 className={styles.listTitle}>Các kỳ trước</h4>
            {['Học kỳ I - 2025', 'Học kỳ II - 2024'].map((sem, i) => (
              <div key={i} className={styles.historyItem}>
                <span>{sem}</span>
                <div className={styles.semGpa}>
                  <strong>3.55</strong>
                  <ChevronRight size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}