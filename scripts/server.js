const express = require('express');
const { generateProof } = require('./generate_proof');
const { ZkIDVerifier } = require('../contracts/dist/zkIDVerifier');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

app.post('/generate-proof', async (req, res) => {
    try {
        const { age } = req.body;
        if (!age || isNaN(age)) {
            return res.status(400).json({ error: 'Invalid age' });
        }

        const inputs = { age, threshold: 18 };
        const { proof, publicSignals } = await generateProof('age_verifier', inputs);

        const verificationKeyPath = path.join(__dirname, '../build/verification_key.json');
        const verificationKey = Buffer.from(fs.readFileSync(verificationKeyPath));
        const verifier = new ZkIDVerifier(verificationKey);

        const isValid = await verifier.verifyAgeProof(Buffer.from(JSON.stringify(proof)), publicSignals);
        res.json({ proof, publicSignals, isValid });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
