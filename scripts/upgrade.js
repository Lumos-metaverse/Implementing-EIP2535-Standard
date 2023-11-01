/* global ethers */
/* eslint prefer-const: "off" */

const { getSelectors, removeSelectors, FacetCutAction } = require('./libraries/diamond.js')

async function deployDiamond () {
  const accounts = await ethers.getSigners()
  const contractOwner = '0x7439e532F9847bf734E88D52c1B37878e88A2073';

  const getDiamondInit = await ethers.getContractAt('DiamondInit', "0xBA4152495de0cf228718f9D51c4a73641FfE6161")

  // Deploy Facets
  console.log('')
  console.log('Deploying facets')
  const FacetNames = [
    'TodoFacet'
  ]

  const cut = []
  for (const FacetName of FacetNames) {
    const Facet = await ethers.getContractAt("TodoFacet", "0xBA4152495de0cf228718f9D51c4a73641FfE6161")
 
    const functionsToKeep = ['removeTask(uint256)']
   
    const selectors = getSelectors(Facet).remove(functionsToKeep);
    console.log('Got here')

    cut.push({
      facetAddress:  ethers.constants.AddressZero,
      action: FacetCutAction.Remove,
      functionSelectors: selectors
    })

  }

  // upgrade diamond with facets
  console.log('')
  console.log('Diamond Cut:', cut)
  const diamondCut = await ethers.getContractAt('IDiamondCut', "0xBA4152495de0cf228718f9D51c4a73641FfE6161")
  let tx
  let receipt
  // call to init function
  let functionCall = getDiamondInit.interface.encodeFunctionData('init')
  tx = await diamondCut.diamondCut(cut, "0x2cd97165807c2B959aadd34A788150fAE0a24084", functionCall)
  console.log('Diamond cut tx: ', tx.hash)
  receipt = await tx.wait()
  if (!receipt.status) {
    throw Error(`Diamond upgrade failed: ${tx.hash}`)
  }
  console.log('Completed diamond cut')
  //return diamond.address
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
if (require.main === module) {
  deployDiamond()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error)
      process.exit(1)
    })
}

exports.deployDiamond = deployDiamond