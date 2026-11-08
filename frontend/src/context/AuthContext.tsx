import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserAccount } from '../types';

export const SEED_USERS: UserAccount[] = [
  {
    id: 'usr-phq-1',
    username: 'phq_superadmin',
    password: 'cgpolice@123',
    fullNameEn: 'State Admin (PHQ Raipur)',
    fullNameHi: 'राज्य प्रशासक (मुख्यालय नवा रायपुर)',
    role: 'SUPER_ADMIN',
    roleLabelHi: 'मुख्यालय सुपर एडमिन',
    isActive: true,
    badgeNumber: 'PHQ-CG-001',
    mobile: '94252XXXX0',
    email: 'cctns.phq@cgpolice.gov.in',
    lastLoginAt: '2026-11-06 22:30'
  },
  {
    id: 'usr-dist-durg',
    username: 'durg_admin',
    password: 'cgpolice@123',
    fullNameEn: 'District Admin (SP Office Durg)',
    fullNameHi: 'जिला प्रशासक (पुलिस अधीक्षक कार्यालय दुर्ग)',
    role: 'DISTRICT_ADMIN',
    roleLabelHi: 'जिला एडमिन (दुर्ग)',
    districtId: 'dist-durg',
    districtNameEn: 'DURG',
    districtNameHi: 'दुर्ग',
    districtCode: 'DURG',
    isActive: true,
    badgeNumber: 'SP-DURG-01',
    mobile: '94252XXXX1',
    email: 'sp.durg@cgpolice.gov.in',
    lastLoginAt: '2026-11-06 21:15'
  },
  {
    id: 'usr-sho-durg-kotwali',
    username: 'sho_durg_kotwali',
    password: 'cgpolice@123',
    fullNameEn: 'SHO Kotwali Durg (TI Santosh Mishra)',
    fullNameHi: 'थाना प्रभारी कोतवाली दुर्ग (निरी. संतोष मिश्रा)',
    role: 'SHO',
    roleLabelHi: 'थाना प्रभारी (कोतवाली दुर्ग)',
    districtId: 'dist-durg',
    districtNameEn: 'DURG',
    districtNameHi: 'दुर्ग',
    districtCode: 'DURG',
    policeStationId: 'ps-durg-kotwali_durg',
    policeStationNameEn: 'KOTWALI, DURG',
    policeStationNameHi: 'कोतवाली दुर्ग',
    policeStationCode: 'DURG_KOTWALI_DUR',
    badgeNumber: 'TI-DURG-042',
    mobile: '98261XXXX3',
    email: 'ps.kotwali.durg@cgpolice.gov.in',
    isActive: true,
    lastLoginAt: '2026-11-06 22:10'
  }
];

interface AuthContextType {
  currentUser: UserAccount;
  isAuthenticated: boolean;
  switchUser: (userId: string) => void;
  login: (username: string, password: string) => { success: boolean; message: string };
  logout: () => void;
  allUsers: UserAccount[];
  addUser: (user: UserAccount) => void;
  updateUser: (userId: string, updatedData: Partial<UserAccount>) => boolean;
  toggleUserStatus: (userId: string) => void;
  resetPassword: (userId: string, newPassword: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Start with login page as requested by user
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserAccount>(SEED_USERS[0]);
  const [usersList, setUsersList] = useState<UserAccount[]>(() => {
    try {
      const saved = localStorage.getItem('cctns_users_list_clean_v4');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load users from localStorage:', e);
    }
    return SEED_USERS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('cctns_users_list_clean_v4', JSON.stringify(usersList));
    } catch (e) {
      console.error('Failed to save users to localStorage:', e);
    }
  }, [usersList]);

  const switchUser = (userId: string) => {
    const user = usersList.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
  };

  const login = (username: string, password: string): { success: boolean; message: string } => {
    const trimmedUsername = username.trim().toLowerCase();
    const user = usersList.find(u => u.username.toLowerCase() === trimmedUsername);

    if (!user) {
      return { success: false, message: 'उपयोगकर्ता आईडी (User ID) अमान्य है!' };
    }

    if (!user.isActive) {
      return { success: false, message: 'यह उपयोगकर्ता खाता निष्क्रिय (Deactivated) है! कृपया एडमिन से संपर्क करें।' };
    }

    const expectedPassword = user.password || 'cgpolice@123';
    if (password !== expectedPassword) {
      return { success: false, message: 'गलत पासवर्ड! कृपया सही पासवर्ड दर्ज करें।' };
    }

    // Login successful
    setCurrentUser({
      ...user,
      lastLoginAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    });
    setIsAuthenticated(true);
    return { success: true, message: 'लॉगिन सफल रहा!' };
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const addUser = (newUser: UserAccount) => {
    setUsersList(prev => [...prev, newUser]);
  };

  const updateUser = (userId: string, updatedData: Partial<UserAccount>): boolean => {
    setUsersList(prev => prev.map(u => {
      if (u.id === userId) {
        return { ...u, ...updatedData };
      }
      return u;
    }));
    if (currentUser.id === userId) {
      setCurrentUser(prev => ({ ...prev, ...updatedData }));
    }
    return true;
  };

  const toggleUserStatus = (userId: string) => {
    setUsersList(prev => prev.map(u => u.id === userId ? { ...u, isActive: !u.isActive } : u));
  };

  const resetPassword = (userId: string, newPassword: string): boolean => {
    setUsersList(prev => prev.map(u => u.id === userId ? { ...u, password: newPassword } : u));
    if (currentUser.id === userId) {
      setCurrentUser(prev => ({ ...prev, password: newPassword }));
    }
    return true;
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAuthenticated,
      switchUser,
      login,
      logout,
      allUsers: usersList,
      addUser,
      updateUser,
      toggleUserStatus,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
