const fs = require('fs');

var masterFile = "\\\\MEDSRG\\Zettler32\\2ZETINFO.mdb";
var fileLocations = [
	"\\\\ED\\Zettler32\\ZETINFOtest.mdb",
	"\\\\NLC\\Zettler32\\ZETINFOtest.mdb",
	"\\\\PPLC\\Zettler32\\ZETINFOtest.mdb",
	"\\\\SURG\\Zettler32\\ZETINFOtest.mdb",
]
var lastFile="C:\\Users\\Sterling\\Documents\\2ZETINFO.mdb";
var bkUpLoc="C:\\Users\\Sterling\\Documents\\oldZetinfo\\";

let lastDate = fs.statSync(lastFile).mtimeMs;
let currentDate = fs.statSync(masterFile).mtimeMs;

getDateStamp = function(){
	fullDate = new Date();
    d = fullDate.getDate();
    m = fullDate.getMonth()+1;
    y = fullDate.getFullYear();
	dateStamp = [m,d,y];
	dateStamp = dateStamp.join("-");
    return dateStamp
}

syncFiles = function(){
	for (i = 0; i < fileLocations.length; i++){
	fs.copyFileSync(lastFile, fileLocations[i]);
	}
    console.log("all files copied");
};

writeLog = function(txt){
    stamp = getDateStamp();
    filePath = "C:\Users\Sterling\Documents\ErrorLog.txt";
    str = stamp.concat(",", txt, ",");
    fs.appendFile(filePath, str, err => {
        if (err) throw err;
        });
};

if (lastDate < currentDate){
	console.log("Newer File Available");
	stamp = getDateStamp();
    bkUpFile = bkUpLoc.concat(stamp,".mdb");
	console.log(bkUpFile);
	try {
		fs.copyFileSync(lastFile, bkUpFile);
		fs.copyFileSync(masterFile, lastFile);
        syncFiles();
        }
    catch(err){
        console.log(err);
        writeLog(err);
    }
    
};

