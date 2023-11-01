require('@nomiclabs/hardhat-waffle')
require('dotenv').config();
require("@nomiclabs/hardhat-etherscan");

task('accounts', 'Prints the list of accounts', async () => {
  const accounts = await ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

module.exports = {
  solidity: '0.8.4',
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_API_KEY,
      accounts: [process.env.PRIVATE_KEY],
      blockGasLimit: 200000000000,
      gasPrice: 100000000000,
      timeout: 90000,
    }
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
}

// DiamondCutFacet deployed: 0x29e12230dF8f0573F2396327A7fB77a3F6330Dad
// Diamond deployed: 0xBA4152495de0cf228718f9D51c4a73641FfE6161
// DiamondInit deployed: 0x2cd97165807c2B959aadd34A788150fAE0a24084

// Deploying facets
// DiamondLoupeFacet deployed: 0x453e44C8381EE17B027D0F46b7D41C163ea63be4
// OwnershipFacet deployed: 0x35391F14D81CbE3A56DeFCe8999eB2c5989859b3
// TodoFacet deployed: 0xE0a065e82671871FE85E688Ba1F208Cbea7E4f7C