
const fs = require('fs');
var solc = require('solc');
const Web3 = require('web3');

const web3 = new Web3('http://localhost:8381');

const input = fs.readFileSync('test.sol');
const output = solc.compile(input.toString(), 1);
const bytecode = output.contracts[':FixedSupplyToken'].bytecode;
const abi = JSON.parse(output.contracts[':FixedSupplyToken'].interface);

const contract = new web3.eth.Contract(abi);

var firstAccount = web3.eth.accounts.create();
const private_key0 = firstAccount.privateKey;
console.log('This is private key: '  + private_key0);
console.log('This is address: ' + firstAccount.address);
console.log('This is bin: ' + bytecode);
var tx = {chainId: 10, data: '0x' + bytecode, gas: 1000000};

var signed = web3.eth.accounts.signTransaction(tx, private_key0);

console.log(signed.rawTransaction);

var sendover = web3.eth.sendSignedTransaction((signed.rawTransaction).toString('hex'));

console.log('send finished');
