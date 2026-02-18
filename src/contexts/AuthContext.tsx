import { useApiCall } from '@/shared/hooks/useApiCall';
import type { AuthContextType } from '@/shared/types/AuthContext';
import type { UserResponse } from '@/shared/types/UserApi';
import { createContext, useContext, useEffect, type ReactNode } from 'react';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children?: ReactNode
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const { state, handleApiCall } = useApiCall<UserResponse>();

    useEffect(() => {
        handleApiCall({
            endpoint: "/auth/me",
            credentials: true,
            method: "GET",
        });
    }, []);

    const contextValue: AuthContextType = {
        authUser: state.result?.data,
        authState: state
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
};

// Custom hook to consume the context easily
export const useAuth = () => {
    const context = useContext(AuthContext);
        if (context === undefined) {
            throw new Error('useAuth must be used within an AuthProvider');
        }
    return context;
};