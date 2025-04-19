import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [age, setAge] = useState('');
    const [result, setResult] = useState(null);

    const generateAndVerifyProof = async () => {
        try {
            const response = await axios.post('http://localhost:3000/generate-proof', { age: parseInt(age) });
            setResult(response.data);
        } catch (error) {
            setResult({ error: error.message });
        }
    };

    return (
        <div>
            <h1>zkID: Age Verification</h1>
            <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter your age"
            />
            <button onClick={generateAndVerifyProof}>Generate & Verify Proof</button>
            {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
        </div>
    );
}

export default App;
