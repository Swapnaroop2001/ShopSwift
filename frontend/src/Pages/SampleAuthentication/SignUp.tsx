import { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const API_URL = import.meta.env.VITE_API_URL;

    const handleSignUp = async () => {
        try {
            const response = await axios.post(`${API_URL}/signup`, { email, password });
            alert(`✅ ${response.data}`);
        } catch (error) {
            console.error('❌ Signup error:', error);
            alert('Signup failed');
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h2 className="text-2xl font-bold">Sign Up</h2>
            
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
                onClick={handleSignUp} 
                className="w-full bg-blue-500 text-white p-2 mt-4 rounded-md hover:bg-blue-600 transition">
                Sign Up
            </button>
        </div>
    );
};

export default SignUp;
