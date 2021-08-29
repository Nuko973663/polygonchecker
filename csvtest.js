var fs = require("fs");
var csvWriter = require("csv-write-stream");

var writer = null;
let finalPathFile = "out.csv";

if (!fs.existsSync(finalPathFile))
  writer = csvWriter({ headers: ["header1", "header2"] });
else writer = csvWriter({ sendHeaders: false });

writer.pipe(fs.createWriteStream(finalPathFile, { flags: "a" }));
writer.write({
  header1: "hello",
  header2: "world",
});
writer.end();
