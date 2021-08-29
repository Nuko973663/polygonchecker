const Web3 = require("web3");

let web3 = new Web3(
  new Web3.providers.HttpProvider("https://polygon-rpc.com/")
);

web3.eth.getBlockNumber(function (error, result) {
  console.log(result);
});
