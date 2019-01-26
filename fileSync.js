const fs = require('fs');

var masterFile = "\\\\path\\to\\file.mdb";//this is the file to replicate to other computers
var fileLocations = [
	"\\\\path\\to\\file.mdb",//these are the files to overwrite with the master file
	"\\\\path\\to\\file.mdb",
	"\\\\path\\to\\file.mdb",
	"\\\\path\\to\\file.mdb",
];
var lastFile="C:\\Users\\path\\to\\file.mdb";//local copy of last version of file to compare to see if the master file has been changed
var bkUpLoc="C:\\Users\\path\\to\\backup folder\\";//backups of previous files in case something goes wrong

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
    filePath = "C:\\Users\\path\\to\\ErrorLog.txt";
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

