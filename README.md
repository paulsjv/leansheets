LeanSheets
==========

A tool that creates Cumulative Flow, Histogram, and Control charts for Kanban systems based off of a Google Spread Sheet.

Life Cycle
-----------------
1. Loads /config.json
2. Loads the Configuration from your Google Spread Sheet that you have defined
3. Fires a $broadcast event to other chart's controllers for them to draw their chart

Installing & Running
-------------------------
Currently there is no home for LeanSheets so you will have to clone the repo and run it locally.  You'll also need a Google Spread Sheet that you can link to for LeanSheets to work.  If you would like an example sheet please open an issue as I'm in the process of making one that can be the example/demo sheet.

1. Clone the following repo: https://github.com/paulsjv/leansheets
  * The master branch is what you want.  It's the latest version.
2. Make sure you have Nodejs installed on your system.  Next run the following commands to install everything.

  ```
  $> npm install
  $> bower install
  ```
3. Update the ./src/config.json file to be like below (Google Sheet is the demo I'm currently working on):

  ```json
  {
      "configUrl": "https://docs.google.com/a/google.com/spreadsheet/ccc?key=12cvMUMnWEKynGTsyXQywvJ9drpjYAyyo0-2cnTUJSFw&usp=drive_web&gid=44020743#",
      "dataUrl": "https://docs.google.com/a/google.com/spreadsheet/ccc?key=12cvMUMnWEKynGTsyXQywvJ9drpjYAyyo0-2cnTUJSFw&usp=drive_web&gid=497466409#",
      "queryStartDate": "2015-03-01",
      "queryEndDate": "2015-03-31",
      "debugEnabled": true,
      "showAllWork": true,
      "cacheTtl": 300
  }
  ```
  
NOTE: The configUrl and dataUrl must be of the form https:https://docs.google.com/spreadsheet/ccc?key=<key>&gid=<id>. If the url is of the form https://docs.google.com/spreadsheets/d/<key>/edit#gid=<id> then translate it into the above expected format.



Cloning/Forking the Repo
-------------------------
If you decide to fork this Repo please see the following if you wish to ignore changes to any files if you choose to pull/rebase from the main repo.

This will tell git you want to start ignoring the changes to the file
```
git update-index --assume-unchanged path/to/server.js
```
When you want to start keeping track again
```
git update-index --no-assume-unchanged path/to/server.js
```

Running Tests
-------------------------
Coming Soon
