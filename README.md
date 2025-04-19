zkID: Privacy-Preserving Identity Verification on Midnight Blockchain
This repository implements zkID, a privacy-preserving identity verification system for DAOs and DApps on the Midnight blockchain. It uses zk-SNARKs to prove attributes like age without revealing underlying data.
Features

ZK-based proof of age.
Midnight smart contracts in Compact/TypeScript.
IPFS for revocation lists.
React frontend with backend proof generation.

Prerequisites

Node.js (v18)
Docker
Circom (npm install -g circom)
SnarkJS (npm install -g snarkjs)
IPFS (snap install ipfs)
Midnight Lace wallet (Chrome extension)
Midnight proof server (Docker)

Setup

Clone the repository:
git clone https://github.com/quantus0/zkID-Midnight.git
cd zkID-Midnight


Install dependencies:
npm install
cd contracts && npm install
cd ../frontend && npm install


Run IPFS daemon:
ipfs daemon &


Run Midnight proof server:
docker run -p 8080:8080 midnightnetwork/proof-server:latest


Install Midnight Lace wallet and request tDUST from the testnet faucet (see https://docs.midnight.network).


Usage

Compile ZK circuits:
node scripts/compile_circuits.js


Deploy smart contract:
cd contracts
npm run build
node ../scripts/deploy_contract.js


Generate a proof:
node scripts/generate_proof.js


Store revocation list on IPFS:
node ipfs/store_revocation.js


Run backend server:
npm run start:server


Run frontend:
cd frontend
npm start



Project Structure

circuits/: ZK circuit definitions (Circom).
contracts/: Midnight smart contracts (TypeScript).
scripts/: Scripts for circuit compilation, proof generation, and deployment.
ipfs/: IPFS integration scripts.
frontend/: React frontend.

License
MIT
