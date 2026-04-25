import { useState } from "react";

const mockMatches = [
  {
    id: 1,
    home: "Real Madrid",
    away: "Barcelona",
    homeScore: 3,
    awayScore: 2,
    date: "20 أبريل 2026",
    league: "الليغا",
    homeBadge: "👑",
    awayBadge: "🔵",
    reviews: [
      { user: "خالد", avatar: "خ", rating: 5, text: "مباراة كلاسيكو مجنونة! هدف بيلينغهام في الدقيقة 90 غير كل شيء.", likes: 134 },
      { user: "سارة", avatar: "س", rating: 4, text: "لعب رائع من الفريقين. الأول كان يستحق الفوز.", likes: 87 },
    ],
    avgRating: 4.6,
    totalReviews: 2341,
  },
  {
    id: 2,
    home: "ليفربول",
    away: "مانشستر سيتي",
    homeScore: 2,
    awayScore: 2,
    date: "18 أبريل 2026",
    league: "البريميرليغ",
    homeBadge: "🔴",
    awayBadge: "🔵",
    reviews: [
      { user: "ياسر", avatar: "ي", rating: 4, text: "تعادل درامي. صلاح كان خارقاً كالعادة.", likes: 211 },
    ],
    avgRating: 4.1,
    totalReviews: 1872,
  },
  {
    id: 3,
    home: "PSG",
    away: "بايرن ميونخ",
    homeScore: 1,
    awayScore: 3,
    date: "15 أبريل 2026",
    league: "دوري أبطال أوروبا",
    homeBadge: "🗼",
    awayBadge: "🔴",
    reviews: [
      { user: "نورة", avatar: "ن", rating: 3, text: "بايرن سحق باريس. المباراة انتهت بشكل مبكر.", likes: 55 },
      { user: "فهد", avatar: "ف", rating: 5, text: "كين أسطورة. هاتريك في الشان!! تاريخي.", likes: 302 },
    ],
    avgRating: 3.9,
    totalReviews: 998,
  },
];

const activityFeed = [
  { user: "خالد", avatar: "خ", action: "قيّم", match: "ريال مدريد - برشلونة", rating: 5, time: "منذ 2 ساعة" },
  { user: "سارة", avatar: "س", action: "علّق على", match: "ليفربول - سيتي", rating: null, time: "منذ 4 ساعات" },
  { user: "فهد", avatar: "ف", action: "أضاف إلى قائمته", match: "PSG - بايرن", rating: null, time: "منذ 6 ساعات" },
  { user: "نورة", avatar: "ن", action: "قيّم", match: "PSG - بايرن", rating: 3, time: "منذ يوم" },
];

const StarRating = ({ value, size = "sm" }) => {
  const s = size === "lg" ? "text-xl" : "text-sm";
  return (
    <span className={`${s} tracking-tight`} style={{ fontFamily: "monospace", letterSpacing: "-2px" }}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ color: i <= value ? "#f5c842" : "#3a3a4a" }}>⬟</span>
      ))}
    </span>
  );
};

const MatchCard = ({ match, onClick }) => (
  <div
    onClick={() => onClick(match)}
    style={{
      background: "linear-gradient(135deg, #1a1a2e 60%, #16213e)",
      border: "1px solid #2a2a4a",
      borderRadius: 16,
      padding: "20px",
      cursor: "pointer",
      transition: "all 0.25s ease",
      position: "relative",
      overflow: "hidden",
    }}
    onMouseEnter={e => {
      e.currentTarget.style.border = "1px solid #f5c842";
      e.currentTarget.style.transform = "translateY(-3px)";
      e.currentTarget.style.boxShadow = "0 12px 40px rgba(245,200,66,0.15)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.border = "1px solid #2a2a4a";
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "none";
    }}
  >
    <div style={{ position: "absolute", top: 0, right: 0, background: "#f5c842", color: "#0d0d1a", fontSize: 10, fontWeight: 800, padding: "3px 10px", borderBottomLeftRadius: 10, letterSpacing: 1 }}>
      {match.league}
    </div>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16 }}>
      <div style={{ textAlign: "center", flex: 1 }}>
        <div style={{ fontSize: 32 }}>{match.homeBadge}</div>
        <div style={{ color: "#e0e0f0", fontWeight: 700, fontSize: 13, marginTop: 4 }}>{match.home}</div>
      </div>
      <div style={{ textAlign: "center", padding: "0 16px" }}>
        <div style={{ background: "#0d0d1a", borderRadius: 10, padding: "8px 18px", border: "1px solid #3a3a5a" }}>
          <span style={{ color: "#f5c842", fontWeight: 900, fontSize: 24, fontFamily: "'Courier New', monospace" }}>
            {match.homeScore} <span style={{ color: "#3a3a5a" }}>—</span> {match.awayScore}
          </span>
        </div>
        <div style={{ color: "#555577", fontSize: 11, marginTop: 6 }}>{match.date}</div>
      </div>
      <div style={{ textAlign: "center", flex: 1 }}>
        <div style={{ fontSize: 32 }}>{match.awayBadge}</div>
        <div style={{ color: "#e0e0f0", fontWeight: 700, fontSize: 13, marginTop: 4 }}>{match.away}</div>
      </div>
    </div>
    <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 12, borderTop: "1px solid #2a2a4a", paddingTop: 12 }}>
      <StarRating value={Math.round(match.avgRating)} />
      <span style={{ color: "#f5c842", fontWeight: 700, fontSize: 14 }}>{match.avgRating}</span>
      <span style={{ color: "#555577", fontSize: 12 }}>{match.totalReviews.toLocaleString()} تقييم</span>
    </div>
  </div>
);

const MatchModal = ({ match, onClose }) => {
  const [newReview, setNewReview] = useState("");
  const [myRating, setMyRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviews, setReviews] = useState(match.reviews);

  const submitReview = () => {
    if (!newReview.trim() || !myRating) return;
    setReviews([{ user: "أنت", avatar: "أ", rating: myRating, text: newReview, likes: 0 }, ...reviews]);
    setNewReview("");
    setMyRating(0);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={onClose}>
      <div
        style={{ background: "#12121f", borderRadius: 20, maxWidth: 620, width: "100%", maxHeight: "85vh", overflow: "auto", border: "1px solid #2a2a4a", position: "relative" }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ background: "linear-gradient(135deg, #1a1a2e, #0d0d1a)", padding: "28px 28px 20px", borderBottom: "1px solid #2a2a4a" }}>
          <button onClick={onClose} style={{ position: "absolute", top: 16, left: 16, background: "none", border: "none", color: "#555577", fontSize: 22, cursor: "pointer" }}>✕</button>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#f5c842", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>{match.league}</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
              <div>
                <div style={{ fontSize: 40 }}>{match.homeBadge}</div>
                <div style={{ color: "#e0e0f0", fontWeight: 700, marginTop: 4 }}>{match.home}</div>
              </div>
              <div style={{ background: "#0d0d1a", borderRadius: 12, padding: "10px 22px", border: "1px solid #3a3a5a" }}>
                <span style={{ color: "#f5c842", fontWeight: 900, fontSize: 32, fontFamily: "monospace" }}>
                  {match.homeScore} – {match.awayScore}
                </span>
                <div style={{ color: "#555577", fontSize: 11, textAlign: "center", marginTop: 2 }}>{match.date}</div>
              </div>
              <div>
                <div style={{ fontSize: 40 }}>{match.awayBadge}</div>
                <div style={{ color: "#e0e0f0", fontWeight: 700, marginTop: 4 }}>{match.away}</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 14 }}>
              <StarRating value={Math.round(match.avgRating)} size="lg" />
              <span style={{ color: "#f5c842", fontWeight: 800, fontSize: 18 }}>{match.avgRating}</span>
              <span style={{ color: "#555577" }}>({match.totalReviews.toLocaleString()})</span>
            </div>
          </div>
        </div>
        <div style={{ padding: "20px 28px" }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ color: "#888", fontSize: 12, marginBottom: 8, fontWeight: 600, letterSpacing: 1 }}>تقييمك</div>
            <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
              {[1, 2, 3, 4, 5].map(i => (
                <span key={i}
                  style={{ fontSize: 28, cursor: "pointer", transition: "transform 0.1s", color: i <= (hoverRating || myRating) ? "#f5c842" : "#2a2a4a" }}
                  onMouseEnter={() => setHoverRating(i)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setMyRating(i)}
                >⬟</span>
              ))}
            </div>
            <textarea
              value={newReview}
              onChange={e => setNewReview(e.target.value)}
              placeholder="شاركنا رأيك في هذه المباراة..."
              style={{ width: "100%", background: "#1a1a2e", border: "1px solid #2a2a4a", borderRadius: 10, color: "#e0e0f0", padding: "10px 14px", fontSize: 14, resize: "none", height: 80, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }}
            />
            <button
              onClick={submitReview}
              style={{ marginTop: 8, background: "#f5c842", color: "#0d0d1a", border: "none", borderRadius: 8, padding: "8px 20px", fontWeight: 800, fontSize: 13, cursor: "pointer" }}
            >نشر التقييم</button>
          </div>
          <div style={{ color: "#888", fontSize: 12, fontWeight: 600, letterSpacing: 1, marginBottom: 12 }}>آراء المشجعين</div>
          {reviews.map((r, idx) => (
            <div key={idx} style={{ background: "#1a1a2e", borderRadius: 12, padding: "14px 16px", marginBottom: 10, border: "1px solid #2a2a4a" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#f5c842", color: "#0d0d1a", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14 }}>{r.avatar}</div>
                <span style={{ color: "#c0c0d0", fontWeight: 700 }}>{r.user}</span>
                <StarRating value={r.rating} />
              </div>
              <p style={{ color: "#a0a0b8", fontSize: 14, margin: 0, lineHeight: 1.6 }}>{r.text}</p>
              <div style={{ color: "#444466", fontSize: 12, marginTop: 8 }}>❤ {r.likes}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function FootballLetterboxd() {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedMatch, setSelectedMatch] = useState(null);

  return (
    <div style={{ minHeight: "100vh", background: "#0d0d1a", color: "#e0e0f0", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", direction: "rtl" }}>
      {/* Header */}
      <header style={{ background: "#080814", borderBottom: "1px solid #1a1a2e", padding: "0 24px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 26 }}>⚽</span>
            <span style={{ color: "#f5c842", fontWeight: 900, fontSize: 22, letterSpacing: -1 }}>ماتش</span>
            <span style={{ color: "#555577", fontSize: 12, borderRight: "1px solid #2a2a4a", paddingRight: 10, marginRight: -4 }}>للمباريات</span>
          </div>
          <nav style={{ display: "flex", gap: 6 }}>
            {[["home", "الرئيسية"], ["discover", "استكشاف"], ["profile", "حسابي"]].map(([key, label]) => (
              <button key={key} onClick={() => setActiveTab(key)}
                style={{ background: activeTab === key ? "#f5c842" : "transparent", color: activeTab === key ? "#0d0d1a" : "#888", border: "none", borderRadius: 8, padding: "6px 14px", fontWeight: 700, fontSize: 13, cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit" }}>
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "28px 20px", display: "grid", gridTemplateColumns: "1fr 280px", gap: 24, alignItems: "start" }}>
        {/* Main feed */}
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <h2 style={{ color: "#f5c842", fontWeight: 900, fontSize: 18, margin: 0 }}>المباريات الأخيرة</h2>
            <div style={{ display: "flex", gap: 6 }}>
              {["الكل", "الليغا", "البريميرليغ", "أبطال أوروبا"].map(f => (
                <button key={f} style={{ background: f === "الكل" ? "#1a1a2e" : "transparent", color: f === "الكل" ? "#f5c842" : "#555577", border: "1px solid #2a2a4a", borderRadius: 20, padding: "4px 12px", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>{f}</button>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {mockMatches.map(m => <MatchCard key={m.id} match={m} onClick={setSelectedMatch} />)}
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* My profile */}
          <div style={{ background: "#1a1a2e", borderRadius: 16, padding: "18px", border: "1px solid #2a2a4a" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#f5c842", color: "#0d0d1a", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 18 }}>أ</div>
              <div>
                <div style={{ fontWeight: 800, color: "#f0f0ff" }}>أحمد الرياضي</div>
                <div style={{ color: "#555577", fontSize: 12 }}>@ahmed_football</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, textAlign: "center" }}>
              {[["247", "مباراة"], ["89", "متابع"], ["134", "يتابع"]].map(([n, l]) => (
                <div key={l} style={{ background: "#0d0d1a", borderRadius: 10, padding: "8px 4px" }}>
                  <div style={{ color: "#f5c842", fontWeight: 800, fontSize: 16 }}>{n}</div>
                  <div style={{ color: "#555577", fontSize: 11 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity */}
          <div style={{ background: "#1a1a2e", borderRadius: 16, padding: "18px", border: "1px solid #2a2a4a" }}>
            <div style={{ color: "#f5c842", fontWeight: 800, fontSize: 14, marginBottom: 14 }}>نشاط الأصدقاء</div>
            {activityFeed.map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#2a2a4a", color: "#f5c842", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{a.avatar}</div>
                <div>
                  <div style={{ fontSize: 12, color: "#c0c0d0", lineHeight: 1.5 }}>
                    <span style={{ fontWeight: 700 }}>{a.user}</span>
                    <span style={{ color: "#555577" }}> {a.action} </span>
                    <span style={{ color: "#e0e0f0" }}>{a.match}</span>
                    {a.rating && <span style={{ color: "#f5c842", marginRight: 4 }}>{"⬟".repeat(a.rating)}</span>}
                  </div>
                  <div style={{ color: "#3a3a5a", fontSize: 11 }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Top matches */}
          <div style={{ background: "#1a1a2e", borderRadius: 16, padding: "18px", border: "1px solid #2a2a4a" }}>
            <div style={{ color: "#f5c842", fontWeight: 800, fontSize: 14, marginBottom: 12 }}>🏆 الأعلى تقييماً</div>
            {mockMatches.sort((a, b) => b.avgRating - a.avgRating).map((m, i) => (
              <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, cursor: "pointer" }} onClick={() => setSelectedMatch(m)}>
                <span style={{ color: "#555577", fontWeight: 900, fontSize: 13, minWidth: 16 }}>{i + 1}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#e0e0f0" }}>{m.home} - {m.away}</div>
                  <div style={{ fontSize: 11, color: "#555577" }}>{m.league}</div>
                </div>
                <span style={{ color: "#f5c842", fontWeight: 800, fontSize: 13 }}>{m.avgRating}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {selectedMatch && <MatchModal match={selectedMatch} onClose={() => setSelectedMatch(null)} />}
    </div>
  );
}
