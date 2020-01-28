const path = require('path');
const fs = require('fs');
const solc = require('solc');

const contractPathDeployed = path.resolve(__dirname, 'contracts', 'Deployed.sol');
const sourceDeployed = fs.readFileSync(contractPathDeployed, 'utf8');


const input = {
    language: 'Solidity',
    sources: {
        'Deployed.sol': {
            content: sourceDeployed
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
}

console.log("Started compiling of Deployed...");

module.exports = JSON.parse(solc.compile(JSON.stringify(input)));
console.log(JSON.parse(solc.compile(JSON.stringify(input))));

console.log("Done compiling Deployed...");
