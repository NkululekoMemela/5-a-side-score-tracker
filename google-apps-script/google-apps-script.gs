function doPost(e) {
    var sheet = SpreadsheetApp.openById("1ByjRgkn22vd6LkNgIAQLx9rKJkNYcm18_2RNRzD6wxc").getSheetByName("AppScores");
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([data.timestamp, data.team, data.scorer, data.assist, data.recordedBy]);
    
    return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
}

