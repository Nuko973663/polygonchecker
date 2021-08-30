const fs = require("fs");
let Accounts = require("web3-eth-accounts");
let accounts = new Accounts("https://polygon-rpc.com/");

let nAccounts = 3;

accounts.wallet.create(nAccounts);

let dt = [];

for (let i = 0; i < nAccounts; i++) {
  dt.push(accounts.wallet[i]);
}

const data = JSON.stringify(dt);
console.log(data);

fs.writeFile("accounts.json", data, (err) => {
  if (err) {
    throw err;
  }
  console.log("JSON data is saved.");
});
