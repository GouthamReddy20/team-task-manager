import { createContext, useState, useEffect, useContext } from 'react';
import api from '../lib/api';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get('/auth/me');

        setUser(data);
      } catch {
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // LOGIN
  const login = async (email, password, role) => {
    try {
      const { data } = await api.post('/auth/login', {
        email,
        password,
        role,
      });

      localStorage.setItem('token', data.token);

      setUser(data.user);

      toast.success('Logged in successfully!');

      return true;
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Login failed'
      );

      return false;
    }
  };

  // SIGNUP
  const signup = async (
    name,
    email,
    password,
    role,
    adminSecret
  ) => {
    try {
      const { data } = await api.post('/auth/signup', {
        name,
        email,
        password,
        role,
        adminSecret,
      });

      localStorage.setItem('token', data.token);

      setUser(data.user);

      toast.success('Signed up successfully!');

      return true;
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Signup failed'
      );

      return false;
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem('token');

    setUser(null);

    toast.success('Logged out successfully');

    window.location.href = '/';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);