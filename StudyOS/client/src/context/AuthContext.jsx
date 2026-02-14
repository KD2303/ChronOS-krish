import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            // Check for the "Logged In" hint to avoid 401 errors in console for guests
            const authHint = localStorage.getItem('studyos_logged_in');

            if (!authHint) {
                setLoading(false);
                return;
            }

            try {
                const { data } = await axios.get('/api/auth/me');
                setUser(data);
            } catch (error) {
                if (error.response?.status === 401) {
                    localStorage.removeItem('studyos_logged_in');
                } else {
                    console.error('Initial auth check failed:', error);
                }
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkUser();
    }, []);

    const login = async (email, password) => {
        const { data } = await axios.post('/api/auth/login', { email, password });
        localStorage.setItem('studyos_logged_in', 'true');
        setUser(data);
        return data;
    };

    const register = async (username, email, password) => {
        const { data } = await axios.post('/api/auth/register', { username, email, password });
        localStorage.setItem('studyos_logged_in', 'true');
        setUser(data);
        return data;
    };

    const logout = async () => {
        await axios.post('/api/auth/logout');
        localStorage.removeItem('studyos_logged_in');
        setUser(null);
    };



    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
