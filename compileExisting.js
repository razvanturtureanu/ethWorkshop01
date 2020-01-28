const path = require('path');
const fs = require('fs');
const solc = require('solc');

const contractPathExisting = path.resolve(__dirname, 'contracts', 'Existing.sol');
const sourceExisting = fs.readFileSync(contractPathExisting, 'utf8');


const input = {
    language: 'Solidity',
    sources: {
        'Existing.sol': {
            content: sourceExisting
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

console.log("Started compiling of Existing...");

module.exports = JSON.parse(solc.compile(JSON.stringify(input)));
console.log(JSON.parse(solc.compile(JSON.stringify(input))));

console.log("Done compiling Existing...");
