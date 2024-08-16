import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
    isLoggedIn: boolean;
    token: null | string;
    login: () => void;
    logout: () => void;
    persistToken: (token: string) => void;
}
const useAuthStore = create(
    persist<AuthStore>(
        (set) => ({
            isLoggedIn: false,
            token: null,
            login: () => {
                const token = localStorage.getItem('access_token');
                if (token) {
                    set({ token, isLoggedIn: true });
                }
            },
            logout: () => {
                set({ token: null, isLoggedIn: false });
                localStorage.clear();
            },
            persistToken: (token: string) => {
                localStorage.setItem('access_token', token);
            }
        }),
        {
            name: 'userLoginStatus',
        }
    )
);


export default useAuthStore;