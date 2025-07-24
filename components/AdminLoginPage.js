window.AdminLoginPage = function AdminLoginPage({ onLogin }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900">Motobook 관리자</h1>
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            onLogin(); // 실제 인증 로직은 필요 시 추가
          }}
        >
          <input
            type="email"
            defaultValue="admin@motobook.com"
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border rounded-md"
            readOnly
          />
          <input
            type="password"
            defaultValue="password"
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border rounded-md"
            readOnly
          />
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};