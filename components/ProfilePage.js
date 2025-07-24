window.ProfilePage = function ProfilePage({ onNavigate, profileHandle, profiles }) {
  const profile = profiles.find((p) => p.handle === profileHandle);

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500">프로필을 찾을 수 없습니다.</p>
        <button
          onClick={() => onNavigate("home")}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md"
        >
          홈으로
        </button>
      </div>
    );
  }

  const youtubeLinks = profile.links?.filter((link) => getYoutubeVideoId(link.url)) || [];
  const regularLinks = profile.links?.filter((link) => !getYoutubeVideoId(link.url)) || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-emerald-100 font-sans">
      {/* 상단 네비 */}
      <nav className="sticky top-0 z-10 flex items-center justify-between px-4 h-14">
        <button onClick={() => onNavigate("home")} className="p-2">
          <i data-lucide="home" className="w-6 h-6 text-gray-700"></i>
        </button>
        <div className="w-10 h-10" />
      </nav>

      {/* 본문 */}
      <main className="p-4 pb-12">
        <div className="max-w-md mx-auto space-y-6">
          {/* 프로필 헤더 */}
          <header className="flex flex-col items-center text-center space-y-4">
            <img
              src={profile.icon}
              alt={profile.name}
              className="w-20 h-20 rounded-[24px] shadow-lg object-cover"
            />
            <div>
              <h1 className="text-lg font-semibold text-gray-900">{profile.name}</h1>
              <p className="text-sm text-gray-500 whitespace-pre-line mt-1">{profile.intro}</p>
            </div>
          </header>

          {/* 유튜브 카드 */}
          {youtubeLinks.length > 0 && (
            <section className="space-y-4">
              {youtubeLinks.map((link) => {
                const videoId = getYoutubeVideoId(link.url);
                const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <div className="relative overflow-hidden rounded-[20px] shadow-lg">
                      <img
                        src={thumbnailUrl}
                        alt={link.name}
                        className="w-full h-auto object-cover aspect-video group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <i data-lucide="youtube" className="text-white w-12 h-12"></i>
                      </div>
                    </div>
                    <p className="mt-3 text-sm font-medium text-gray-700">{link.name}</p>
                  </a>
                );
              })}
            </section>
          )}

          {/* 일반 링크 카드 */}
          {regularLinks.length > 0 && (
            <section className="space-y-3">
              {regularLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:scale-105 transition-all duration-150"
                >
                  <img
                    src={link.icon}
                    alt={link.name}
                    className="w-10 h-10 rounded-[10px] flex-shrink-0 object-cover"
                  />
                  <span className="font-medium text-gray-900">{link.name}</span>
                </a>
              ))}
            </section>
          )}
        </div>
      </main>
    </div>
  );
};