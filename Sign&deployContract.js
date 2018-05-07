
const fs = require('fs');
var solc = require('solc');
const Web3 = require('web3');

const web3 = new Web3('http://localhost:8381');

const input = fs.readFileSync('test.sol');
const output = solc.compile(input.toString(), 1);
const bytecode = output.contracts[':FixedSupplyToken'].bytecode;
const abi = JSON.parse(output.contracts[':FixedSupplyToken'].interface);

const contract = new web3.eth.Contract(abi);

const private_key0 = '0x4fdeceafa4352e5eef12a4d34bf5bc9459c85462f7d5ebe59e6555fff65872dc';
//var firstAccount = web3.eth.accounts.create();
//const private_key0 = firstAccount.privateKey;

//console.log(firstAccount.address);

var tx = {data: '0x' + bytecode, gas: 10000000};

//var signed = web3.eth.accounts.signTransaction(tx, private_key0).then(console.log);
//web3.eth.sendSignedTransaction(signed.rawTransaction).then(console.log);

web3.eth.accounts.signTransaction(tx, private_key0).then(signed => {
    console.log('hello');
    web3.eth.sendSignedTransaction(signed.rawTransaction);
    console.log('contract deployed');
    }
);
