//account new&store
const Web3 = require('web3');
const fs = require('fs');

const web3 = new Web3('http://127.0.0.1:8381');

var newAccount = web3.eth.accounts.create();

const address = newAccount.address;
const privateKey = newAccount.privateKey;

fs.writeFile('coinbase.txt',privateKey+ '-' + address, function(err){
    if(err){
        return console.log(err);
    }
    console.log('keystore successed');    
}
);

