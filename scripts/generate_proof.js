const snarkjs = require('snarkjs');
const fs = require('fs');
const path = require('path');

async function generateProof(circuitName, inputs) {
    try {
        const wasmPath = path.join(__dirname, `../build/${circuitName}/${circuitName}_js/${circuitName}.wasm`);
        const zkeyPath = path.join(__dirname, `../build/${circuitName}_final.zkey`);

        if (!fs.existsSync(wasmPath) || !fs.existsSync(zkeyPath)) {
            throw new Error('Circuit files not found. Run compile_circuits.js first.');
        }

        console.log('Generating proof...');
        const { proof, publicSignals } = await snarkjs.groth16.fullProve(inputs, wasmPath, zkeyPath);

        const proofPath = path.join(__dirname, `../build/${circuitName}_proof.json`);
        fs.writeFileSync(proofPath, JSON.stringify(proof, null, 2));

        const publicSignalsPath = path.join(__dirname, `../build/${circuitName}_public.json`);
        fs.writeFileSync(publicSignalsPath, JSON.stringify(publicSignals, null, 2));

        console.log('Proof generated:', proofPath);
        return { proof, publicSignals };
    } catch (error) {
        console.error('Proof generation failed:', error.message);
        process.exit(1);
    }
}

const inputs = {
    age: 25, 
    threshold: 18 
};

generateProof('age_verifier', inputs).catch(console.error);
