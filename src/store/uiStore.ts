import { create } from 'zustand';

interface UIState {
  sidebarCollapsed: boolean;
  mobileSidebarOpen: boolean;
  globalSearchQuery: string;
  unreadNotificationsCount: number;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleMobileSidebar: () => void;
  setMobileSidebarOpen: (open: boolean) => void;
  setGlobalSearchQuery: (query: string) => void;
  clearUnreadNotifications: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  mobileSidebarOpen: false,
  globalSearchQuery: '',
  unreadNotificationsCount: 3,

  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed: boolean) =>
    set({ sidebarCollapsed: collapsed }),

  toggleMobileSidebar: () =>
    set((state) => ({ mobileSidebarOpen: !state.mobileSidebarOpen })),
  setMobileSidebarOpen: (open: boolean) =>
    set({ mobileSidebarOpen: open }),

  setGlobalSearchQuery: (query: string) =>
    set({ globalSearchQuery: query }),

  clearUnreadNotifications: () =>
    set({ unreadNotificationsCount: 0 }),
}));
