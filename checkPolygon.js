/**
 * @author @Nuko973663
 */
"use strict";
const intervalInSeconds = 60;
const numberOfChecks = 60 * 24 * 7;
const rpc_url = "https://polygon-rpc.com/";
//const rpc_url = "https://rpc-mainnet.matic.network/";
const accountJson = "account.json";
const Web3 = require("web3");
const fs = require("fs");

/**
 * Main Function
 */
const main = () => {
  let count = 0;

  let json = JSON.parse(fs.readFileSync(accountJson, "utf-8"));
  let web3 = new Web3(new Web3.providers.HttpProvider(rpc_url));

  let ac = web3.eth.accounts.privateKeyToAccount(json["privateKey"]);
  web3.eth.accounts.wallet.add(ac);

  let address = web3.eth.accounts.wallet[0].address;

  let csvWriter = require("csv-write-stream");

  console.log("Starting PolygonChecker using " + address);

  const checkPolygon = () => {
    const csvWriter = require("csv-write-stream");

    let logFile = rpc_url.replace("https://", "").replace("/", "") + ".csv";
    //console.log(logFile);

    let writer = null;
    if (!fs.existsSync(logFile))
      writer = csvWriter({
        headers: ["start", "gas", "tx", "txid", "receipt", "error"],
      });
    else writer = csvWriter({ sendHeaders: false });
    writer.pipe(fs.createWriteStream(logFile, { flags: "a" }));
    count++;

    web3.eth.getGasPrice().then((gasPrice) => {
      let start = Date.now();
      let record = {
        start: String(start),
        gas: String(gasPrice),
        tx: "",
        txid: "",
        receipt: "",
        error: "",
      };
      web3.eth
        .sendTransaction({
          from: address,
          to: address,
          value: "1",
          gas: gasPrice,
          gasLimit: 2100000,
        })
        .on("transactionHash", (hash) => {
          let tx = Date.now();
          record["tx"] = String(tx);
          record["txid"] = hash;
          console.log("got TX: " + String(tx - start) + " : " + record["txid"]);
        })
        .on("receipt", () => {
          let receipt = Date.now();
          record["receipt"] = String(receipt);
          console.log("receipt: " + String(receipt - start));
          writer.write(record);
          writer.end();
        })
        .on("error", (err) => {
          let error = Date.now();
          record["error"] = String(error);
          writer.write(record);
          console.log(err);
          console.log("error: " + String(error - start));
          writer.end();
        });
    });

    console.log(count + " / " + numberOfChecks + " : " + Date.now());
  };

  const intervalId = setInterval(() => {
    checkPolygon();
    if (count >= numberOfChecks) {
      clearInterval(intervalId);
    }
  }, intervalInSeconds * 1000);
};

main();
