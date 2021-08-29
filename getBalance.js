const fs = require("fs");

let data = fs.readFileSync("user.json", "utf-8");
let json = JSON.parse(data.toString());

const Web3 = require("web3");

let web3 = new Web3(
  new Web3.providers.HttpProvider("https://polygon-rpc.com/")
);

let ac = web3.eth.accounts.privateKeyToAccount(json["privateKey"]);

//console.log(ac);

web3.eth.getBalance(ac.address).then((amount) => {
  console.log(amount * 10 ** -18 + " MATIC");
});
