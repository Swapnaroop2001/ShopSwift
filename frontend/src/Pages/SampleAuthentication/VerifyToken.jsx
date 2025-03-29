import { useState } from 'react';
import axios from 'axios';

const VerifyToken = () => {
    const [idToken, setIdToken] = useState<string>('');

    const handleVerifyToken = async () => {
        try {
            const response = await axios.post(`${API_URL}/verify-token`, idToken, {
                headers: { 'Content-Type': 'text/plain' }
            });
            alert(response.data);
        } catch (error) {
            alert('Token verification failed');
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl mb-4">Verify Token</h2>
            <input
                type="text"
                placeholder="ID Token"
                value={idToken}
                onChange={(e) => setIdToken(e.target.value)}
                className="p-2 border"
            />
            <button onClick={handleVerifyToken} className="bg-purple-500 text-white p-2 mt-4">Verify Token</button>
        </div>
    );
};

export default VerifyToken;
