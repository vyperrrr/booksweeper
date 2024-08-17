import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UseAuthStore {
    isLoggedIn: boolean;
    login: (token: string) => void;
    logout: () => void;
}
const useAuthStore = create(
    persist<UseAuthStore>(
        (set) => ({
            isLoggedIn: false,
            login: (token) => {
                localStorage.setItem('access_token', token);
                set({ isLoggedIn: true });
            },
            logout: () => {
                set({ isLoggedIn: false });
                localStorage.clear();
            },
        }),
        {
            name: 'userLoginStatus',
        }
    )
);


export default useAuthStore;