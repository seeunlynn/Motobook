window.App = function App() {
  const [currentPage, setCurrentPage] = React.useState('home');
  const [currentProfileHandle, setCurrentProfileHandle] = React.useState(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = React.useState(false);
  const [profiles, setProfiles] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const fetchProfiles = async () => {
    if (!supabaseClient) return;
    setLoading(true);
    setError(null);
    try {
      const { data: profiles, error: profileError } = await supabaseClient
        .from("profile").select("*");

      if (profileError || !profiles) throw profileError || new Error("프로필 로딩 실패");

      const profilesWithLinks = await Promise.all(
        profiles.map(async (profile) => {
          const { data: links } = await supabaseClient
            .from("link")
            .select("*")
            .eq("handle", profile.handle);
          return { ...profile, links: links || [] };
        })
      );

      setProfiles(profilesWithLinks.map(mapProfileToUI));
    } catch (err) {
      console.error(err);
      setError("데이터 불러오기 실패");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (supabaseClient) fetchProfiles();
    else {
      setError("Supabase 초기화 실패");
      setLoading(false);
    }
  }, []);

  React.useLayoutEffect(() => {
    lucide.createIcons();
  }, [currentPage, profiles]);

  const handleNavigate = (page, handle = null) => {
    setCurrentPage(page);
    setCurrentProfileHandle(handle);
    window.scrollTo(0, 0);
  };

  const handleLogin = () => {
    setIsAdminAuthenticated(true);
    handleNavigate('admin');
  };

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    handleNavigate('login');
  };

  const addProfile = async (p) => {
    const { error } = await supabaseClient.from('profile').insert(mapProfileToDB(p));
    if (!error) fetchProfiles();
  };

  const updateProfile = async (p) => {
    const { error } = await supabaseClient.from('profile').update(mapProfileToDB(p)).eq('id', p.id);
    if (!error) fetchProfiles();
  };

  const deleteProfile = async (id) => {
    const { error } = await supabaseClient.from('profile').delete().eq('id', id);
    if (!error) fetchProfiles();
  };

  const addLink = async (profileId, l) => {
    const { error } = await supabaseClient.from('link').insert(mapLinkToDB(l, profileId));
    if (!error) fetchProfiles();
  };

  const updateLink = async (profileId, l) => {
    const { error } = await supabaseClient.from('link').update(mapLinkToDB(l, profileId)).eq('id', l.id);
    if (!error) fetchProfiles();
  };

  const deleteLink = async (profileId, linkId) => {
    const { error } = await supabaseClient.from('link').delete().eq('id', linkId);
    if (!error) fetchProfiles();
  };

  const adminProps = {
    onNavigate: handleNavigate,
    onLogout: handleLogout,
    profiles,
    addProfile,
    updateProfile,
    deleteProfile,
    addLink,
    updateLink,
    deleteLink,
  };

  if (loading) return <div className="p-8 text-center">로딩 중...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  if (currentPage === 'login') return <AdminLoginPage onLogin={handleLogin} />;
  if (currentPage === 'admin') return isAdminAuthenticated ? <AdminDashboard {...adminProps} /> : <AdminLoginPage onLogin={handleLogin} />;
  if (currentPage === 'profile') return <ProfilePage onNavigate={handleNavigate} profileHandle={currentProfileHandle} profiles={profiles} />;
  return <HomePage onNavigate={handleNavigate} profiles={profiles} />;
};