"use client";
import { useState } from "react";
import styles from "./index.module.css";
import { Send, Bot, Sparkles, User, History, Settings, Zap } from "lucide-react";

export default function ChatbotPage() {
  const [messages] = useState([
    { role: 'bot', text: 'Chào bạn! Tôi là VinUni AI. Tôi đã phân tích điểm Lab 1 môn ML của bạn (8.5/10). Bạn có muốn biết cách tối ưu bài Lab 2 để kéo GPA lên không?' },
    { role: 'user', text: 'Có, hãy gợi ý cho mình một vài tài liệu bổ sung.' },
  ]);

  return (
    <div className={styles.chatContainer}>
      {/* Sidebar Chat History */}
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <button className={styles.newChatBtn}><Zap size={16} /> Hội thoại mới</button>
        </div>
        <div className={styles.historyScroll}>
          <p className={styles.groupLabel}>Gần đây</p>
          <div className={styles.historyCardActive}>Phân tích điểm ML Lab 1</div>
          <div className={styles.historyCard}>Lộ trình học Deep Learning</div>
          <div className={styles.historyCard}>Thủ tục bảo lưu tín chỉ</div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={styles.mainChat}>
        <div className={styles.chatHeader}>
          <div className={styles.aiInfo}>
            <div className={styles.aiAvatar}><Sparkles size={20} /></div>
            <div>
              <h3>AI Assistant</h3>
              <span className={styles.status}>Dữ liệu cập nhật: 2 phút trước</span>
            </div>
          </div>
          <button className={styles.configBtn}><Settings size={18} /></button>
        </div>

        <div className={styles.messageArea}>
          {messages.map((msg, i) => (
            <div key={i} className={msg.role === 'bot' ? styles.botRow : styles.userRow}>
              <div className={styles.avatarPill}>
                {msg.role === 'bot' ? <Bot size={16} /> : <User size={16} />}
              </div>
              <div className={styles.bubble}>{msg.text}</div>
            </div>
          ))}
        </div>

        <div className={styles.inputArea}>
          <div className={styles.suggestGrid}>
            <button className={styles.chip}>Dự báo điểm cuối kỳ</button>
            <button className={styles.chip}>Giải thích quy chế vắng mặt</button>
            <button className={styles.chip}>Tìm Mentor cho môn Toán</button>
          </div>
          <div className={styles.inputWrapper}>
            <input type="text" placeholder="Hỏi AI về lộ trình học tập của bạn..." />
            <button className={styles.sendBtn}><Send size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}