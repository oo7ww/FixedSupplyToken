
const fs = require('fs');
var solc = require('solc');
const Web3 = require('web3');

//connect to local go-ethereum node
const web3 = new Web3('http://localhost:8381');

//compile the source code
const input = fs.readFileSync('test.sol');
const output = solc.compile(input.toString(), 1);
const bytecode = output.contracts[':FixedSupplyToken'].bytecode;
const abi = JSON.parse(output.contracts[':FixedSupplyToken'].interface) ;

console.log(bytecode);
console.log(abi);
//contract object
const contract = new web3.eth.Contract(abi);

//unlock the coinbase account to make transactions out of it
console.log("Unlocking coinbase account");
var password = "test";
try {
    web3.personal.unlockAccount(web3.eth.coinbase, password);
} catch(e) {
    console.log(e);
    return;
}

//deploy and estimate the gas
const contractInstance = contract.deploy({
    data: '0x' + bytecode
}).estimateGas(function(err, gas){
    console.log(gas);
});

//deploy contract instance
/*
const contractInstance = contract.deploy({
    data: '0x' + bytecode,
    from: web3.eth.coinbase,
    gas:90000*2 //not sure 
},(err, res) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log(res.transactionHash);

    if(res.address) {
        console.log('Contract address:' + res.address);
    }
});
*/

