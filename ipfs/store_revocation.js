const { create } = require('ipfs-http-client');
const fs = require('fs');
const path = require('path');

const ipfs = create({ host: 'localhost', port: 5001, protocol: 'http' });

async function storeRevocationList() {
    try {
        const revocationList = {
            revokedIds: ['id1', 'id2'],
            timestamp: Date.now()
        };

        const filePath = path.join(__dirname, 'revocation_list.json');
        fs.writeFileSync(filePath, JSON.stringify(revocationList));

        const { cid } = await ipfs.add(fs.readFileSync(filePath));
        console.log('Revocation list stored on IPFS:', cid.toString());
        return cid.toString();
    } catch (error) {
        console.error('IPFS upload failed:', error.message);
        process.exit(1);
    }
}

storeRevocationList().catch(console.error);
