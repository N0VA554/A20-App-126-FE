export type RiskStatus = 'RED' | 'YELLOW' | 'GREEN';

export interface Student {
  id: string;
  name: string;
  score: number;
  status: RiskStatus;
  absentRate: number;
  avgGrade: number;
  email: string;
}

export const TOP_10_RISK: Student[] = [
  { id: "SV013", name: "Lý Văn Nam", score: 80, status: 'RED', absentRate: 60.0, avgGrade: 2.75, email: "nam.lv@vinuni.edu.vn" },
  { id: "SV007", name: "Trần Văn Giang", score: 77, status: 'RED', absentRate: 50.0, avgGrade: 2.75, email: "giang.tv@vinuni.edu.vn" },
  { id: "SV004", name: "Phạm Thị Dung", score: 70, status: 'RED', absentRate: 40.0, avgGrade: 3.5, email: "dung.pt@vinuni.edu.vn" },
  { id: "SV009", name: "Đinh Văn Ích", score: 68, status: 'RED', absentRate: 30.0, avgGrade: 4.0, email: "ich.dv@vinuni.edu.vn" },
  { id: "SV011", name: "Bùi Văn Long", score: 66, status: 'RED', absentRate: 40.0, avgGrade: 4.67, email: "long.bv@vinuni.edu.vn" },
  { id: "SV005", name: "Hoàng Văn Em", score: 64, status: 'RED', absentRate: 20.0, avgGrade: 5.0, email: "em.hv@vinuni.edu.vn" },
  { id: "SV015", name: "Cao Văn Phú", score: 63, status: 'RED', absentRate: 20.0, avgGrade: 5.5, email: "phu.cv@vinuni.edu.vn" },
  { id: "SV001", name: "Nguyễn Văn An", score: 58, status: 'YELLOW', absentRate: 30.0, avgGrade: 6.83, email: "an.nv@vinuni.edu.vn" },
  { id: "SV003", name: "Lê Văn Cường", score: 46, status: 'YELLOW', absentRate: 10.0, avgGrade: 5.17, email: "cuong.lv@vinuni.edu.vn" },
  { id: "SV012", name: "Đặng Thị Mai", score: 40, status: 'YELLOW', absentRate: 10.0, avgGrade: 6.0, email: "mai.dt@vinuni.edu.vn" },
];