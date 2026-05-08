"use client";
import styles from "./DashboardLayout.module.css";
import { useAuth } from "@/src/context/AuthContext"; // Sửa lại đường dẫn import nếu cần
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  SlidersHorizontal,
  CalendarCheck2,
  LifeBuoy,
  LogOut,
  Bell,
  Search,
  MessageSquare,
  FileText,
  GraduationCap,
  Calendar,
} from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const primaryPath =
    user?.role === "LECTURER" ? "/lecturer" : "/student";

  const items =
    user?.role === "LECTURER"
      ? [
          { href: "/lecturer", label: "Tổng quan", Icon: LayoutDashboard },
          { href: "/lecturer/schedule", label: "Lịch giảng dạy", Icon: CalendarCheck2 },
          { href: "/lecturer/classes", label: "Lớp học của tôi", Icon: Users },
          
        ]
      : [
    { href: "/student", label: "Tổng quan", Icon: LayoutDashboard },
    { href: "/student/calendar", label: "Thời khóa biểu", Icon: Calendar },
    { href: "/student/grades", label: "Điểm số", Icon: GraduationCap },
    { href: "/student/leave", label: "Nghỉ phép", Icon: FileText },
    { href: "/student/chatbot", label: "AI Assistant", Icon: MessageSquare },
  ];

  const handleLogout = () => {
    logout();
    router.replace("/");
  };

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logoSection}>
          <div className={styles.brand}>University EWS</div>
          <p className={styles.subBrand}>Early Warning System</p>
        </div>

        <div className={styles.userCard}>
          <div className={styles.userCardTop}>
            <div className={styles.userAvatar}>
              {user?.full_name?.charAt(0) || "U"}
            </div>
            <div className={styles.userMeta}>
              <div className={styles.userFullName}>{user?.full_name || "Người dùng"}</div>
              <div className={styles.userEmail}>{user?.email || ""}</div>
            </div>
          </div>
          <div className={styles.rolePill}>{user?.role || "GUEST"}</div>
        </div>
        
        <nav className={styles.nav}>
          {items.map((it) => {
            const active =
              pathname === it.href ||
              (it.href !== primaryPath && pathname.startsWith(it.href));
            const Icon = it.Icon;
            return (
              <Link
                key={it.href}
                href={it.href}
                className={`${styles.navItem} ${active ? styles.navItemActive : ""}`}
              >
                <Icon className={styles.navIcon} size={18} />
                <span>{it.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className={styles.logoutSection}>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <LogOut className={styles.btnIcon} size={18} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={styles.main}>
        {/* <header className={styles.header}>
          <div className={styles.headerLeft}>
            <h1>Dashboard</h1>
            <div className={styles.search}>
              <Search className={styles.searchIcon} size={16} />
              <input className={styles.searchInput} placeholder="Tìm nhanh..." />
            </div>
          </div>

          <div className={styles.headerRight}>
            <button className={styles.iconBtn} aria-label="Notifications">
              <Bell size={18} />
            </button>
          
            <div className={styles.profile}>
              <div className={styles.profileInfo}>
                <p className={styles.userName}>{user?.full_name || "Người dùng"}</p>
                <p className={styles.userRole}>{user?.role || "Khách"}</p>
              </div>
              <div className={styles.avatar}>
                {user?.full_name?.charAt(0) || "U"}
              </div>
            </div>
          </div>
        </header> */}

        <div className={styles.pageContent}>
          {children}
        </div>
      </main>
    </div>
  );
}