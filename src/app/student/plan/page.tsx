"use client";

export default function StudentPlanPage() {
  return (
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0b1a2b" }}>
        Kế hoạch học tập
      </h2>
      <p style={{ marginTop: 6, color: "rgba(11, 26, 43, 0.65)" }}>
        Demo timeline tuần này — sẽ thay bằng API sau.
      </p>

      <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
        {[
          { title: "Lecture 06", desc: "Xem video + ghi chú", when: "Hôm nay" },
          { title: "Quiz tuần 6", desc: "15 phút", when: "Tối nay" },
          { title: "Lab 04", desc: "Nộp bản nháp", when: "Thứ 7" },
        ].map((t) => (
          <div
            key={t.title}
            style={{
              background: "white",
              borderRadius: 20,
              border: "1px solid #eef1f7",
              boxShadow: "0 10px 20px rgba(0,0,0,0.03)",
              padding: 16,
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div>
              <div style={{ fontWeight: 700, color: "#0b1a2b" }}>{t.title}</div>
              <div style={{ marginTop: 4, color: "rgba(11, 26, 43, 0.65)" }}>
                {t.desc}
              </div>
            </div>
            <div
              style={{
                alignSelf: "flex-start",
                padding: "6px 10px",
                borderRadius: 999,
                background: "rgba(0,51,102,0.07)",
                border: "1px solid rgba(0,51,102,0.08)",
                fontWeight: 700,
                color: "rgba(11, 26, 43, 0.75)",
                fontSize: 12,
              }}
            >
              {t.when}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

