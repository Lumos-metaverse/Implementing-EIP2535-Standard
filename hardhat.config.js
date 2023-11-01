/* global ethers task */
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

// DiamondCutFacet deployed: 0xD3B1035e77A91cD27c4E46Ba51B6075412FA6625
// Diamond deployed: 0xc66D773b02A06ef995D9819ed190131161Bd027E
// DiamondInit deployed: 0xd7A3b3bb172EF2Edc9c053687fcB60a529756286

// Deploying facets
// DiamondLoupeFacet deployed: 0x684db48742928F77D2903d15ea18E0875BE02ca3
// OwnershipFacet deployed: 0xF7e253cFA779b5004Ac24A64DA914E95BEAa3123
// TodoFacet deployed: 0x177d19133270F40bdf74D5BF2fb384081Ccc1E73
