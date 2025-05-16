import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [age, setAge] = useState('');
  const [result, setResult] = useState(null);

  const generateAndVerifyProof = async () => {
    try {
      const response = await axios.post('http://localhost:3000/generate-proof', {
        age: parseInt(age),
      });
      setResult(response.data);
    } catch (error) {
      setResult({ error: error.message });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4">zkID: Age Verification</h1>
        <p className="mb-6 text-gray-400 text-sm">Prove your age without revealing your identity using ZK-SNARKs.</p>
        <div className="flex items-center gap-2 mb-4">
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age"
            className="flex-1 p-2 rounded bg-gray-700 border border-gray-600 text-white"
          />
          <button
            onClick={generateAndVerifyProof}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium"
          >
            Generate & Verify
          </button>
        </div>
        {result && (
          <pre className="bg-gray-700 text-sm text-left p-4 rounded max-h-80 overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}

export default App;
