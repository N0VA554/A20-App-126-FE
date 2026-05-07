"use client";
import styles from "./index.module.css";
import { TOP_10_RISK } from "@/src/lib/data";
import { useMemo } from "react";

export default function LecturerPage() {
  const summary = useMemo(() => {
    const total = 124;
    const red = TOP_10_RISK.filter((s) => s.status === "RED").length;
    const yellow = TOP_10_RISK.filter((s) => s.status === "YELLOW").length;
    const green = Math.max(0, total - red - yellow);
    return { total, red, yellow, green };
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div>
          <h2 className={styles.heroTitle}>Tổng quan lớp học</h2>
          <p className={styles.heroSubtitle}>
            Theo dõi mức độ rủi ro và hành vi học tập theo tuần. (Dữ liệu demo)
          </p>
        </div>
        <div className={styles.heroRight}>
          <div className={styles.weekPill}>Tuần 6 • 2026</div>
          <div className={styles.refreshHint}>Cập nhật gần nhất: 2 phút trước</div>
        </div>
      </section>

      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Tổng sinh viên</p>
          <p className={styles.statValue}>{summary.total}</p>
          <p className={styles.statFoot}>+2 so với tuần trước</p>
        </div>
        <div className={`${styles.statCard} ${styles.statCardRed}`}>
          <p className={styles.statLabel}>Nguy cơ cao</p>
          <p className={styles.statValue}>{summary.red}</p>
          <p className={styles.statFoot}>Cần ưu tiên can thiệp</p>
        </div>
        <div className={`${styles.statCard} ${styles.statCardGold}`}>
          <p className={styles.statLabel}>Cảnh báo vàng</p>
          <p className={styles.statValue}>{summary.yellow}</p>
          <p className={styles.statFoot}>Theo dõi trong 7 ngày</p>
        </div>
        <div className={`${styles.statCard} ${styles.statCardGreen}`}>
          <p className={styles.statLabel}>Ổn định</p>
          <p className={styles.statValue}>{summary.green}</p>
          <p className={styles.statFoot}>Đang duy trì tốt</p>
        </div>
      </section>

      <section className={styles.insightsGrid}>
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3>Insight nhanh</h3>
            <span className={styles.panelTag}>AI Suggestion</span>
          </div>
          <ul className={styles.insightList}>
            <li>
              <span className={styles.dotRed} /> 3 sinh viên có xu hướng vắng mặt tăng mạnh.
            </li>
            <li>
              <span className={styles.dotGold} /> 5 sinh viên nộp bài trễ &gt; 2 lần/tuần.
            </li>
            <li>
              <span className={styles.dotBlue} /> Khuyến nghị gửi thông báo nhắc Lab 04 trước CN.
            </li>
          </ul>
        </div>

        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3>Phân bổ rủi ro</h3>
            <span className={styles.panelTag}>Demo</span>
          </div>
          <div className={styles.riskBars}>
            <div className={styles.riskRow}>
              <div className={styles.riskLabel}>RED</div>
              <div className={styles.riskTrack}>
                <div className={styles.riskFillRed} style={{ width: "18%" }} />
              </div>
              <div className={styles.riskValue}>{summary.red}</div>
            </div>
            <div className={styles.riskRow}>
              <div className={styles.riskLabel}>YELLOW</div>
              <div className={styles.riskTrack}>
                <div className={styles.riskFillGold} style={{ width: "22%" }} />
              </div>
              <div className={styles.riskValue}>{summary.yellow}</div>
            </div>
            <div className={styles.riskRow}>
              <div className={styles.riskLabel}>GREEN</div>
              <div className={styles.riskTrack}>
                <div className={styles.riskFillGreen} style={{ width: "60%" }} />
              </div>
              <div className={styles.riskValue}>{summary.green}</div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.tableWrapper}>
        <div className={styles.tableHeader}>
          <div>
            <h3 className={styles.tableTitle}>Danh sách cảnh báo</h3>
            <p className={styles.tableSubtitle}>Top sinh viên cần can thiệp sớm (demo)</p>
          </div>
          <div className={styles.tableActions}>
            <button className={styles.secondaryBtn}>Xuất CSV</button>
            <button className={styles.primaryBtn}>Gửi nhắc nhở</button>
          </div>
        </div>
        <table className={styles.table}>
          <thead>
            <tr><th>Hạng</th><th>Sinh viên</th><th>Risk Score</th><th>Vắng mặt</th><th>Hành động</th></tr>
          </thead>
          <tbody>
            {TOP_10_RISK.map((sv, index) => (
              <tr key={sv.id}>
                <td className={styles.rankCell}>#{index + 1}</td>
                <td>
                  <div className={styles.studentCell}>
                    <div className={styles.studentAvatar}>
                      {sv.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <span className={styles.studentName}>{sv.name}</span>
                      <span className={styles.studentId}>{sv.id} • {sv.email}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span
                    className={
                      sv.status === "RED" ? styles.badgeRed : styles.badgeGold
                    }
                  >
                    {sv.score}
                  </span>
                </td>
                <td className={styles.boldCell}>{sv.absentRate}%</td>
                <td>
                  <div className={styles.rowActions}>
                    <button className={styles.actionBtn}>Xem</button>
                    <button className={styles.actionBtnGhost}>Nhắc</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}