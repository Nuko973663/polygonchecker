const fs = require("fs");

let Accounts = require("web3-eth-accounts");

// Passing in the eth or web3 package is necessary to allow retrieving chainId, gasPrice and nonce automatically
// for accounts.signTransaction().
let accounts = new Accounts("https://polygon-rpc.com/");
let ac = accounts.create();
//console.log(a);

const data = JSON.stringify(ac);
console.log(data);

//console.log(accounts.wallet.create(1));
fs.writeFile("user.json", data, (err) => {
  if (err) {
    throw err;
  }
  console.log("JSON data is saved.");
});
