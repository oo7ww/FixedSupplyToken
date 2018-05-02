
const fs = require('fs');
var solc = require('solc');
const Web3 = require('web3');

//connect to local go-ethereum node
const web3 = new Web3('http://localhost:8381');

//compile the source code
const input = fs.readFileSync('test.sol');
const output = solc.compile(input.toString(), 1);
const bytecode = output.contracts['FixedSupplyToken'].bin;
const abi = JSON.parse(output.contracts['FixedSupplyToken'],abi) ;

//contract object
const contract = web3.eth.Contract(abi);

//deploy contract instance
const contractInstance = contract.new({
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

