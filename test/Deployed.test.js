const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const options = { gasLimit: 100000000 };
const web3 = new Web3(ganache.provider(options));
const compiled_contract = require('../compileDeployed.js');
const interface = compiled_contract.contracts['Deployed.sol']['Deployed'].abi;
console.log(interface);
const bytecode = compiled_contract.contracts['Deployed.sol']['Deployed'].evm.bytecode.object;
console.log(bytecode);

const compiledExistingContract = require('../compileExisting.js');
const existingAbi = compiledExistingContract.contracts['Existing.sol']['Existing'].abi;
//console.log(existingAbi);
const existingBytecode = compiledExistingContract.contracts['Existing.sol']['Existing'].evm.bytecode.object;


//console.log(bytecode);
// a list of accounts
let accounts;
let deployedContract;
let deployedExisting;
beforeEach(async () => {
    // get a list of accounts
    accounts = await web3.eth.getAccounts();
    // use one account to deploy the contract
    deployedContract = await new web3.eth.Contract(interface)
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: '100000000' });

    deployedExisting = await new web3.eth.Contract(existingAbi)
    .deploy({ data: existingBytecode, arguments: [deployedContract.options.address] })
    .send({ from: accounts[0], gas: '100000000' });
});
describe('Deployed', () => {
    it('deploys a contract', () => {
      assert.ok(deployedContract.options.address);
    });
    it('Set A', async () =>{
      const result = await deployedExisting.methods
      .setA('30')
      .send({ from: accounts[0], gas: '100000000' });

      const actualA = await deployedExisting.methods.getA().call();

      assert.equal(actualA, '30');



    });
});
