window.HomePage = function HomePage({ onNavigate, profiles }) {
  const [activeCategory, setActiveCategory] = React.useState("전체");
  const categories = ["전체", "웹·앱 서비스", "인플루언서", "마켓", "크리에이터", "커뮤니티"];

  const filteredProfiles =
    activeCategory === "전체"
      ? profiles
      : profiles.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* 네비게이션 */}
      <nav className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-between px-4 h-14 border-b border-gray-100">
        <h1 className="text-xl font-bold">Motobook</h1>
        <button className="p-2" onClick={() => alert("메뉴 기능은 준비 중입니다.")}>
          <i data-lucide="menu" className="w-6 h-6"></i>
        </button>
      </nav>

      {/* 카테고리 필터 */}
      <div className="sticky top-14 bg-white/80 backdrop-blur-sm z-10 px-4 py-3 border-b border-gray-100">
        <div className="flex space-x-2 overflow-x-auto whitespace-nowrap pb-2 -mb-2 no-scrollbar">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                activeCategory === c
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* 프로필 카드 리스트 */}
      <main className="p-4 space-y-6">
        <section>
          <h2 className="text-base font-semibold text-gray-800 pb-2">전체 프로필</h2>
          <div className="space-y-3">
            {filteredProfiles.map((profile) => (
              <div
                key={profile.id}
                onClick={() => onNavigate("profile", profile.handle)}
                className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <img
                  src={profile.icon}
                  alt={profile.name}
                  className="w-10 h-10 rounded-2xl flex-shrink-0 object-cover"
                />
                <div className="flex flex-col flex-grow">
                  <span className="text-sm font-medium text-gray-800">
                    {profile.catchphrase || profile.name}
                  </span>
                  <span className="text-xs text-gray-400">{profile.name}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="text-center p-4">
        <button
          onClick={() => onNavigate("login")}
          className="text-xs text-gray-400 hover:text-gray-600"
        >
          관리자 페이지로 이동
        </button>
      </footer>
    </div>
  );
};