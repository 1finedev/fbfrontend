import React, { createContext, useState, useEffect } from 'react';
import AuthService from './../services/AuthService';
import Spinner from './../components/utils/Spinner';
export const AuthContext = createContext(null);

export default ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [role, setRole] = useState(null);

  const auth = async () => {
    const response = await AuthService.isAuthenticated();

    const { isAuthenticated, admin, user, error } = response;
    if (isAuthenticated) {
      setIsAuthenticated(isAuthenticated);
      setUser(user);
      setRole(user.role);
      setIsLoading(false);
      return;
    } else {
      setIsAuthenticated(isAuthenticated);
      setMessage(error);
      setIsLoading(false);
      return;
    }
  };

  useEffect(() => {
    auth();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <AuthContext.Provider
          value={{
            user,
            setUser,
            isAuthenticated,
            setIsAuthenticated,
            message,
            setMessage,
            role,
            setRole,
            isLoading,
            setIsLoading
          }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </div>
  );
};
