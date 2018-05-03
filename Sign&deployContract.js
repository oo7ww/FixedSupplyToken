var Tx = require('ethereumjs-tx');
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
//var tx = {chainId: '10', data: '0x' + bytecode, gas: 1000000};
var rawTx = {
    data: '0x' + bytecode,
    gas: '1000000',
    chainId: '10'
}
var tx = new Tx(rawTx);
tx.sign(private_key0);
var serializedTx = tx.serialize();

web3.eth.sendSignedTransaction('0x'+  serializedTx.toString('hex'))
.on('receipt', console.log);
//var signed = web3.eth.accounts.signTransaction(tx, private_key0).then(console.log);
//var rawTx = await signed.rawTransaction;
//console.log(rawTx);
//console.log(x);
//var sendover = web3.eth.sendSignedTransaction(rawTx);

console.log('send finished');
