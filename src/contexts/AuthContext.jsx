import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  signup: () => {},
  isAuthenticated: false,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('voke-user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('voke-user');
      }
    }
  }, []);

  const login = (email, password) => {
    // Mock authentication
    const mockUser = {
      id: Date.now(),
      email,
      name: email.split('@')[0],
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      joinedDate: new Date().toISOString(),
      interviewsCompleted: 0,
      preferredRole: 'Frontend Engineer',
      difficulty: 'intermediate',
    };

    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('voke-user', JSON.stringify(mockUser));
    return { success: true, user: mockUser };
  };

  const signup = (email, password, name) => {
    // Mock signup
    const mockUser = {
      id: Date.now(),
      email,
      name: name || email.split('@')[0],
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      joinedDate: new Date().toISOString(),
      interviewsCompleted: 0,
      preferredRole: 'Frontend Engineer',
      difficulty: 'intermediate',
    };

    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('voke-user', JSON.stringify(mockUser));
    return { success: true, user: mockUser };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('voke-user');
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('voke-user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        signup,
        isAuthenticated,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
