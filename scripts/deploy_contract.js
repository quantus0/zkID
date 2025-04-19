const fs = require('fs');
const path = require('path');
const { ZkIDVerifier } = require('../contracts/dist/zkIDVerifier');

async function deployContract() {
    try {
        const verificationKeyPath = path.join(__dirname, '../build/verification_key.json');
        if (!fs.existsSync(verificationKeyPath)) {
            throw new Error('Verification key not found. Run compile_circuits.js first.');
        }
        const verificationKey = Buffer.from(fs.readFileSync(verificationKeyPath));

        console.log('Deploying ZkIDVerifier contract...');
        const verifier = new ZkIDVerifier(verificationKey);
        const address = await verifier.deploy();
        console.log('Contract deployed successfully at:', address);
    } catch (error) {
        console.error('Deployment failed:', error.message);
        process.exit(1);
    }
}

deployContract().catch(console.error);
