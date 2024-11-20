const express = require('express');
const Web3 = require('web3');
const app = express();

const CONTRACT_ADDRESS = "YOUR_SMART_CONTRACT_ADDRESS";
const ABI = require('./build/contracts/NFTMarketplace.json').abi; // Replace  ABI file

const web3 = new Web3("https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID"); //  Infura or Alchemy
const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

app.use(express.json());

// Mint NFT endpoint
app.post('/mint', async (req, res) => {
    const { tokenURI, address } = req.body;
    try {
        const result = await contract.methods.createNFT(tokenURI).send({ from: address });
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
