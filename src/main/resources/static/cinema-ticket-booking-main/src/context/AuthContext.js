import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/api/users');
        const users = await response.json();
        const validUser = users.find(u => u.token === token);
        
        if (validUser) {
          setUser(validUser);
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error('Token validation failed:', err);
      } finally {
        setIsLoading(false);
      }
    };

    validateToken();
  }, []);

  const login = async (account, password) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/users');
      const users = await response.json();
      const foundUser = users.find(u => u.account === account && u.password === password);
      
      if (!foundUser) {
        throw new Error('Invalid credentials');
      }

      localStorage.setItem('token', foundUser.token);
      setUser(foundUser);
      setIsAuthenticated(true);
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);