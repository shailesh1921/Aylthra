import { createContext, useContext, useState, useEffect } from 'react';

// ─── Auth Context ──────────────────────────────────────
const AuthContext = createContext();

const loadUser = () => {
  try {
    const saved = localStorage.getItem('aylthra_user');
    return saved ? JSON.parse(saved) : null;
  } catch { return null; }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadUser);

  useEffect(() => {
    if (user) localStorage.setItem('aylthra_user', JSON.stringify(user));
    else localStorage.removeItem('aylthra_user');
  }, [user]);

  const login = (email, password) => {
    // Simulated auth — in production, connect to backend
    const mockUser = {
      id: 'usr_' + Date.now(),
      name: email.split('@')[0],
      email,
      joined: new Date().toISOString(),
    };
    setUser(mockUser);
    return { success: true };
  };

  const signup = (name, email, password) => {
    const mockUser = {
      id: 'usr_' + Date.now(),
      name,
      email,
      joined: new Date().toISOString(),
    };
    setUser(mockUser);
    return { success: true };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
