import { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Use Vite environment variable
    const API_URL = import.meta.env.VITE_API_URL;

    const handleLogin = async () => {
        try {
            console.log(`API_URL: ${API_URL}`); // For debugging

            const response = await axios.post(`${API_URL}/login`, { email, password });
            alert(`✅ ${response.data}`);
        } catch (error) {
            console.error('❌ Login error:', error);
            alert('Login failed');
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h2 className="text-2xl font-bold">Login</h2>
            
            <input 
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-md"
            />
            
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded-md mt-2"
            />
            
            <button 
                onClick={handleLogin} 
                className="w-full bg-green-500 text-white p-2 mt-4 rounded-md hover:bg-green-600 transition">
                Login
            </button>
        </div>
    );
};

export default Login;
