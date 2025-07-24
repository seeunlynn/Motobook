window.AdminDashboard = function AdminDashboard({
  onNavigate,
  onLogout,
  profiles,
  addProfile,
  updateProfile,
  deleteProfile,
  addLink,
  updateLink,
  deleteLink,
}) {
  const [adminView, setAdminView] = React.useState("dashboard");
  const [selectedProfile, setSelectedProfile] = React.useState(null);
  const [editingProfile, setEditingProfile] = React.useState(null);
  const [editingLink, setEditingLink] = React.useState(null);
  const [isProfileModalOpen, setProfileModalOpen] = React.useState(false);
  const [isLinkModalOpen, setLinkModalOpen] = React.useState(false);

  const currentSelectedProfile =
    profiles.find((p) => p.id === selectedProfile?.id) || selectedProfile;

  const handleSaveProfile = async (data) => {
    if (editingProfile) {
      await updateProfile(data);
    } else {
      await addProfile(data);
    }
    setProfileModalOpen(false);
    setEditingProfile(null);
  };

  const handleSaveLink = async (data) => {
    if (!currentSelectedProfile) return;
    if (editingLink) {
      await updateLink(currentSelectedProfile.id, {
        ...data,
        id: editingLink.id,
      });
    } else {
      await addLink(currentSelectedProfile.id, data);
    }
    setLinkModalOpen(false);
    setEditingLink(null);
  };
    return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* 사이드 메뉴 */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="h-16 flex items-center justify-center text-xl font-bold border-b border-gray-700">
          Motobook Admin
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <button
            onClick={() => onNavigate("home")}
            className="w-full flex items-center px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
          >
            <i data-lucide="globe" className="mr-3 w-4 h-4" /> 홈으로
          </button>
          <button
            onClick={() => setAdminView("dashboard")}
            className={`w-full flex items-center px-4 py-2 rounded-md text-sm font-medium ${
              adminView === "dashboard" ? "bg-gray-900" : "hover:bg-gray-700"
            }`}
          >
            <i data-lucide="layout-dashboard" className="mr-3 w-4 h-4" /> 대시보드
          </button>
          <button
            onClick={() => {
              setAdminView("profiles");
              setSelectedProfile(null);
            }}
            className={`w-full flex items-center px-4 py-2 rounded-md text-sm font-medium ${
              adminView === "profiles" ? "bg-gray-900" : "hover:bg-gray-700"
            }`}
          >
            <i data-lucide="users" className="mr-3 w-4 h-4" /> 프로필 관리
          </button>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={onLogout}
            className="w-full flex items-center px-4 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <i data-lucide="log-out" className="mr-3 w-4 h-4" /> 로그아웃
          </button>
        </div>
      </aside>

      {/* 본문 */}
      <main className="flex-1 p-8 overflow-y-auto">
        {adminView === "dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
                  <i data-lucide="users" className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">총 프로필 수</p>
                  <p className="text-2xl font-bold text-gray-900">{profiles.length}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 프로필 관리 뷰 */}
        {adminView === "profiles" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">프로필 관리</h2>
              <button
                onClick={() => {
                  setEditingProfile(null);
                  setProfileModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                <i data-lucide="plus-circle" className="w-4 h-4" />
                새 프로필 추가
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="p-2 text-left">제목(핸들)</th>
                      <th className="p-2 text-left">링크 수</th>
                      <th className="p-2 text-left">액션</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profiles.map((p) => (
                      <tr key={p.id} className="border-b">
                        <td className="p-2">{p.name} ({p.handle})</td>
                        <td className="p-2">{p.links?.length || 0}</td>
                        <td className="p-2 flex gap-2">
                          <button onClick={() => {
                            setSelectedProfile(p);
                            setAdminView("links");
                          }}>
                            <i data-lucide="link" className="w-4 h-4 text-green-600" />
                          </button>
                          <button onClick={() => {
                            setEditingProfile(p);
                            setProfileModalOpen(true);
                          }}>
                            <i data-lucide="edit" className="w-4 h-4 text-blue-500" />
                          </button>
                          <button onClick={() => {
                            if (window.confirm("정말 삭제할까요?")) deleteProfile(p.id);
                          }}>
                            <i data-lucide="trash-2" className="w-4 h-4 text-red-500" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 링크 관리 뷰 */}
        {adminView === "links" && currentSelectedProfile && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                "{currentSelectedProfile.name}" 링크 관리
              </h2>
              <button
                onClick={() => {
                  setEditingLink(null);
                  setLinkModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                <i data-lucide="plus-circle" className="w-4 h-4" />
                새 링크 추가
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="p-2 text-left">링크명</th>
                    <th className="p-2 text-left">URL</th>
                    <th className="p-2 text-left">액션</th>
                  </tr>
                </thead>
                <tbody>
                  {(currentSelectedProfile.links || []).map((l) => (
                    <tr key={l.id} className="border-b">
                      <td className="p-2">{l.name}</td>
                      <td className="p-2 truncate max-w-xs">{l.url}</td>
                      <td className="p-2 flex gap-2">
                        <button onClick={() => {
                          setEditingLink(l);
                          setLinkModalOpen(true);
                        }}>
                          <i data-lucide="edit" className="w-4 h-4 text-blue-500" />
                        </button>
                        <button onClick={() => {
                          if (window.confirm("링크를 삭제할까요?")) deleteLink(currentSelectedProfile.id, l.id);
                        }}>
                          <i data-lucide="trash-2" className="w-4 h-4 text-red-500" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* 모달 */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md">
            <p className="font-semibold">프로필 모달 (이 부분은 별도 파일로 분리 가능)</p>
            <button onClick={() => setProfileModalOpen(false)} className="mt-4 text-blue-600">닫기</button>
          </div>
        </div>
      )}

      {isLinkModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md">
            <p className="font-semibold">링크 모달 (이 부분도 분리 가능)</p>
            <button onClick={() => setLinkModalOpen(false)} className="mt-4 text-blue-600">닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};