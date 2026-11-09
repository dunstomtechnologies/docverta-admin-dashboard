import { create } from 'zustand';
import { AdminUser } from '../types/auth.types';

interface AuthState {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, role?: 'super_admin' | 'admin') => void;
  logout: () => void;
  updateRole: (role: 'super_admin' | 'admin' | 'auditor') => void;
}

const DEFAULT_ADMIN: AdminUser = {
  id: 'ADM-001',
  name: 'Alex Morgan',
  email: 'admin@docverta.com',
  role: 'super_admin',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
  department: 'Central Clinical Operations',
  lastLogin: '2026-11-09T18:00:00Z',
};

export const useAuthStore = create<AuthState>((set) => ({
  user: DEFAULT_ADMIN,
  token: 'mock-jwt-docverta-admin-token-2026',
  isAuthenticated: true,
  isLoading: false,

  login: (email: string, role = 'super_admin') => {
    const user: AdminUser = {
      ...DEFAULT_ADMIN,
      email,
      role,
    };
    localStorage.setItem('docverta_admin_token', 'mock-jwt-docverta-admin-token-2026');
    set({ user, token: 'mock-jwt-docverta-admin-token-2026', isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('docverta_admin_token');
    localStorage.removeItem('docverta_admin_user');
    set({ user: null, token: null, isAuthenticated: false });
  },

  updateRole: (role) => {
    set((state) => (state.user ? { user: { ...state.user, role } } : state));
  },
}));
