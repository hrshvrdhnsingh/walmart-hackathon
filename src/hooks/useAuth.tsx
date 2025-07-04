
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthToken } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, userData?: Partial<User>) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem('walmart_auth');
    if (storedAuth) {
      try {
        const authData: AuthToken = JSON.parse(storedAuth);
        if (authData.expiresAt > Date.now()) {
          setUser(authData.user);
        } else {
          localStorage.removeItem('walmart_auth');
        }
      } catch (error) {
        localStorage.removeItem('walmart_auth');
      }
    }
  }, []);

  const login = async (email: string, password: string, userData?: Partial<User>) => {
    // Simulate API call - in real app, this would validate credentials
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name: userData?.name || email.split('@')[0],
      phone: userData?.phone || '',
      location: userData?.location || 'Not set',
    };

    const authToken: AuthToken = {
      token: `token_${Date.now()}`,
      expiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000), // 7 days
      user: newUser,
    };

    localStorage.setItem('walmart_auth', JSON.stringify(authToken));
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('walmart_auth');
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      
      const storedAuth = localStorage.getItem('walmart_auth');
      if (storedAuth) {
        const authData: AuthToken = JSON.parse(storedAuth);
        authData.user = updatedUser;
        localStorage.setItem('walmart_auth', JSON.stringify(authData));
      }
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      updateUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
