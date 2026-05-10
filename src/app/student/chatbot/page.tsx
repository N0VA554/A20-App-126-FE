"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./index.module.css";
import { postJson } from "@/src/lib/api/http";
import { PUBLIC_API_BASE_URL } from "@/src/lib/api/config";
import { Send, Bot, Sparkles, User, Settings, Zap, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "assistant", 
      content: "Chào bạn! Tôi là **Trợ lý Học vụ AI**. Tôi có thể giúp bạn: \n- Phân tích lộ trình học tập \n- Giải đáp quy chế \n- Cảnh báo rủi ro học vụ \n\nHãy nhập câu hỏi của bạn hoặc chọn một gợi ý bên dưới nhé!" 
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll mỗi khi có tin nhắn mới hoặc đang loading
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || loading) return;
    const userMsg = text.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const apiUrl = `${PUBLIC_API_BASE_URL || "http://127.0.0.1:5000/api/v1/"}chat`;
      const history = messages.slice(-6).map((m) => ({ role: m.role, content: m.content }));
      const res = await postJson<{ success: boolean; data: { reply: string } }>(
        apiUrl, { message: userMsg, history }
      );
      if (res.success) {
        setMessages((prev) => [...prev, { role: "assistant", content: res.data.reply }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", content: "⚠️ **Lỗi kết nối**: Không thể liên lạc với server AI." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.chatContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <button className={styles.newChatBtn} onClick={() => setMessages([messages[0]])}>
            <Zap size={16} /> Hội thoại mới
          </button>
        </div>
        <div className={styles.historyScroll}>
          <p className={styles.groupLabel}>Gần đây</p>
          <div className={styles.historyCardActive}>Trợ lý Học vụ AI</div>
          <div className={styles.historyCard}>Lộ trình học AI & Data</div>
        </div>
      </aside>

      <div className={styles.mainChat}>
        <header className={styles.chatHeader}>
          <div className={styles.aiInfo}>
            <div className={styles.aiAvatar}><Sparkles size={20} /></div>
            <div>
              <h3>VinUni AI Assistant</h3>
              <span className={styles.status}>{loading ? "AI đang soạn câu trả lời..." : "Trực tuyến"}</span>
            </div>
          </div>
          <button className={styles.configBtn}><Settings size={18} /></button>
        </header>

        {/* Phần tin nhắn: Đã fix Scroll */}
        <div className={styles.messageArea} ref={scrollRef}>
          {messages.map((msg, i) => (
            <div key={i} className={msg.role === 'assistant' ? styles.botRow : styles.userRow}>
              <div className={styles.avatarPill}>
                {msg.role === 'assistant' ? <Bot size={16} /> : <User size={16} />}
              </div>
              <div className={styles.bubble}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {msg.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}
          {loading && (
            <div className={styles.botRow}>
              <div className={styles.avatarPill}><Loader2 size={16} className={styles.spinner} /></div>
              <div className={styles.loadingBubble}>Đang phân tích dữ liệu...</div>
            </div>
          )}
        </div>

        <div className={styles.inputArea}>
          <div className={styles.suggestGrid}>
            <button className={styles.chip} onClick={() => handleSend("Lộ trình học")}>Lộ trình học</button>
            <button className={styles.chip} onClick={() => handleSend("Quy chế cấm thi")}>Quy chế cấm thi</button>
            <button className={styles.chip} onClick={() => handleSend("Quy chế vắng mặt")}>Quy chế vắng mặt</button>
          </div>
          <div className={styles.inputWrapper}>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Nhập câu hỏi tại đây..." 
            />
            <button className={styles.sendBtn} onClick={() => handleSend()} disabled={loading || !input.trim()}>
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}