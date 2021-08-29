const fs = require("fs");

let data = fs.readFileSync("user.json", "utf-8");
let json = JSON.parse(data.toString());

const Web3 = require("web3");

let web3 = new Web3(
  new Web3.providers.HttpProvider("https://polygon-rpc.com/")
);

let gas = 0;

async function sample() {
  await web3.eth.getGasPrice().then((gasPrice) => {
    gas = gasPrice;
  });
  return gas;
}
sample().then(console.log);

let ac = web3.eth.accounts.privateKeyToAccount(json["privateKey"]);
web3.eth.accounts.wallet.add(ac);

console.log(web3.eth.accounts.wallet[0].address);

let address = web3.eth.accounts.wallet[0].address;

web3.eth
  .sendTransaction({
    from: address,
    to: address,
    value: "1",
    gas: gas,
    gasLimit: 2100000,
  })
  .on("transactionHash", function (hash) {
    console.log("TX: " + hash);
  })
  .on("receipt", function (receipt) {
    console.log("receipt: " + receipt);
  })
  .on("confirmation", function (confirmationNumber, receipt) {
    console.log("confirmation: " + confirmationNumber + " " + receipt);
  })
  .on("error", console.error); // If a out of gas error, the second parameter is the receipt.
