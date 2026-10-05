const SHEET_NAME="Lokasi";
function setup(){
 const ss=SpreadsheetApp.getActive();
 let sh=ss.getSheetByName(SHEET_NAME);
 if(!sh) sh=ss.insertSheet(SHEET_NAME);
 if(sh.getLastRow()===0) sh.appendRow(["timestamp","latitude","longitude","accuracy"]);
}
function doPost(e){
 setup();
 const d=JSON.parse(e.postData.contents);
 SpreadsheetApp.getActive().getSheetByName(SHEET_NAME).appendRow([
   d.timestamp || new Date().toISOString(), d.latitude, d.longitude, d.accuracy || ""
 ]);
 return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
}
function doGet(e){
 setup();
 if(e.parameter.action!=="list") return ContentService.createTextOutput("OK");
 const sh=SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);
 const v=sh.getDataRange().getValues(); v.shift();
 const out=v.map(r=>({timestamp:r[0],latitude:r[1],longitude:r[2],accuracy:r[3]}));
 return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
}