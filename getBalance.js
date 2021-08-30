/**
 * getBalance.js
 */

const fs = require("fs");

let data = fs.readFileSync("accounts.json", "utf-8");
let accounts = JSON.parse(data.toString());

const Web3 = require("web3");

let web3 = new Web3(
  new Web3.providers.HttpProvider("https://polygon-rpc.com/")
);

accounts.forEach((element) => {
  let ac = web3.eth.accounts.privateKeyToAccount(element["privateKey"]);
  web3.eth.getBalance(ac.address).then((amount) => {
    console.log(ac.address + " " + amount * 10 ** -18 + " MATIC");
  });
});
