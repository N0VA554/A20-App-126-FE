"use client";

export default function LecturerClassesPage() {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0b1a2b" }}>
        Lớp học của tôi
      </h2>
      <p style={{ marginTop: 6, color: "rgba(11, 26, 43, 0.65)" }}>
        Demo danh sách lớp — sẽ thay bằng API sau.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16,
          marginTop: 16,
        }}
      >
        {[
          { code: "AI101", name: "Nhập môn AI", students: 62 },
          { code: "DS201", name: "Data Science", students: 58 },
          { code: "ML301", name: "Machine Learning", students: 49 },
        ].map((c) => (
          <div
            key={c.code}
            style={{
              background: "white",
              borderRadius: 20,
              border: "1px solid #eef1f7",
              boxShadow: "0 10px 20px rgba(0,0,0,0.03)",
              padding: 18,
            }}
          >
            <div style={{ fontWeight: 700, color: "#0b1a2b" }}>{c.code}</div>
            <div style={{ marginTop: 4, fontWeight: 700, color: "#003366" }}>
              {c.name}
            </div>
            <div style={{ marginTop: 10, color: "rgba(11, 26, 43, 0.65)" }}>
              {c.students} sinh viên
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

