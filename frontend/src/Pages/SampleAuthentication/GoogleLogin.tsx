import { useState } from 'react';
import axios from 'axios';

const GoogleLogin = () => {
    const [googleToken, setGoogleToken] = useState('');

    const handleGoogleLogin = async () => {
        try {
            const response = await axios.post(`${process.env.API_URL}/google-login`, googleToken, {
                headers: { 'Content-Type': 'text/plain' }
            });
            alert(response.data);
        } catch (error) {
            console.error('Google login error:', error);  // ✅ Log the error
            alert('Google login failed');
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl mb-4">Google Login</h2>
            <input 
                type="text" 
                placeholder="Google Token" 
                value={googleToken}
                onChange={(e) => setGoogleToken(e.target.value)}
                className="p-2 border"
            />
            <button onClick={handleGoogleLogin} className="bg-red-500 text-white p-2 mt-4">Login with Google</button>
        </div>
    );
};

export default GoogleLogin;
