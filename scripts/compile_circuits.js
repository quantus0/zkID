const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const circuitsDir = path.join(__dirname, '../circuits');
const outputDir = path.join(__dirname, '../build');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const compileCircuit = (circuitName) => {
    try {
        console.log(`Compiling ${circuitName}...`);
        const circuitPath = path.join(circuitsDir, `${circuitName}.circom`);
        const outputPath = path.join(outputDir, circuitName);

        if (!fs.existsSync(circuitPath)) {
            throw new Error(`Circuit file ${circuitPath} not found`);
        } 
        execSync(`circom ${circuitPath} --r1cs --wasm --sym -o ${outputPath}`, { stdio: 'inherit' });

        
        const ptauFile = path.join(outputDir, 'powersOfTau28_hez_final_10.ptau');
        if (!fs.existsSync(ptauFile)) {
            console.log('Downloading powersOfTau...');
            execSync(`wget -O ${ptauFile} https://hermez.s3-eu-west-1.amazonaws.com/powersOfTau28_hez_final_10.ptau`);
        }

        
        execSync(`snarkjs zkey new ${outputPath}/${circuitName}.r1cs ${ptauFile} ${outputPath}/${circuitName}_0000.zkey`, { stdio: 'inherit' });

        execSync(`snarkjs zkey contribute ${outputPath}/${circuitName}_0000.zkey ${outputPath}/${circuitName}_final.zkey -e="random entropy"`, { stdio: 'inherit' });

        execSync(`snarkjs zkey export verificationkey ${outputPath}/${circuitName}_final.zkey ${outputPath}/verification_key.json`, { stdio: 'inherit' });

        console.log(`${circuitName} compiled successfully.`);
    } catch (error) {
        console.error(`Error compiling ${circuitName}:`, error.message);
        process.exit(1);
    }
};

compileCircuit('age_verifier');
