import React, { createContext, useContext, useState, useCallback } from 'react';
import { generateVerificationCode, sendVerificationEmail } from '../services/authService';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isVerifying: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  verifyCode: (code: string) => Promise<void>;
  resendVerificationCode: () => Promise<void>;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tempUserData, setTempUserData] = useState<{email: string; verificationCode: string; name?: string} | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setError(null);
      // TODO: Implement actual login API call here
      const verificationCode = generateVerificationCode();
      await sendVerificationEmail(email, verificationCode);

      setTempUserData({ email, verificationCode });
      setIsVerifying(true);
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    try {
      setError(null);
      // TODO: Implement actual signup API call here
      const verificationCode = generateVerificationCode();
      console.log('Generated verification code for signup:', verificationCode);

      try {
        await sendVerificationEmail(email, verificationCode);
        console.log('Verification email sent successfully');
        // Store the name along with email and verification code
        setTempUserData({ email, verificationCode, name });
        setIsVerifying(true);
      } catch (emailError) {
        console.error('Error sending verification email:', emailError);
        setError(emailError instanceof Error ? emailError.message : 'Failed to send verification email');
        return;
      }
    } catch (err) {
      console.error('Signup process failed:', err);
      setError(err instanceof Error ? err.message : 'Signup failed. Please try again.');
    }
  }, []);

  const verifyCode = useCallback(async (code: string) => {
    try {
      setError(null);
      if (!tempUserData) {
        throw new Error('No verification in progress');
      }

      if (code === tempUserData.verificationCode) {
        // TODO: Complete the authentication process with backend
        setIsAuthenticated(true);
        setUser({
          id: '1', // This should come from your backend
          name: tempUserData.name || 'User', // Use the name from signup or default to 'User'
          email: tempUserData.email
        });
        setIsVerifying(false);
        setTempUserData(null);
      } else {
        throw new Error('Invalid verification code');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed. Please try again.');
    }
  }, [tempUserData]);

  const resendVerificationCode = useCallback(async () => {
    try {
      setError(null);
      if (!tempUserData?.email) {
        throw new Error('No email address available');
      }

      const newVerificationCode = generateVerificationCode();
      await sendVerificationEmail(tempUserData.email, newVerificationCode);
      setTempUserData(prev => prev ? { ...prev, verificationCode: newVerificationCode } : null);
    } catch (err) {
      setError('Failed to resend verification code. Please try again.');
    }
  }, [tempUserData]);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
    setIsVerifying(false);
    setTempUserData(null);
    setError(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        isVerifying,
        error,
        login,
        signup,
        logout,
        verifyCode,
        resendVerificationCode
      }}
    >
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