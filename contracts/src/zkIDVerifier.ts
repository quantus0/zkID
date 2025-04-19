import axios from 'axios';
import { Buffer } from 'buffer';

import { deployContract, verifyZkProof } from '@midnight-ntwrk/wallet'; 

export class ZkIDVerifier {
    private verificationKey: Buffer;
    private contractAddress?: string;

    constructor(vk: Buffer) {
        this.verificationKey = vk;
    }

    async deploy(): Promise<string> {
        try {
            const contractCode = this.generateContractCode();
            const contract = await deployContract(contractCode, {
                verificationKey: this.verificationKey.toString('hex')
            });
            this.contractAddress = contract.address;
            console.log(`Deployed ZkIDVerifier at: ${this.contractAddress}`);
            return this.contractAddress;
        } catch (error) {
            throw new Error(`Deployment failed: ${error.message}`);
        }
    }

    async verifyAgeProof(proof: Buffer, publicInputs: number[]): Promise<boolean> {
        try {
            const response = await axios.post('http://localhost:8080/verify', {
                verificationKey: this.verificationKey.toString('hex'),
                proof: proof.toString('hex'),
                publicInputs
            });
            if (response.data.valid) {
                if (this.contractAddress) {
                    return await verifyZkProof(this.contractAddress, proof, publicInputs);
                }
                return true;
            }
            return false;
        } catch (error) {
            console.error(`Proof verification failed: ${error.message}`);
            return false;
        }
    }

    private generateContractCode(): string {
        return `
            contract ZkIDVerifier {
                verificationKey: Buffer;

                constructor(vk: Buffer) {
                    this.verificationKey = vk;
                }

                function verifyAgeProof(proof: Buffer, publicInputs: number[]): boolean {
                    return verifyZkSnark(this.verificationKey, proof, publicInputs);
                }
            }
        `;
    }
}
