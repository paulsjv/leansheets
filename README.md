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
You have two options to run LeanSheets:
1. Download either the [.zip](https://github.com/paulsjv/leansheets/zipball/master) or the [tar.gz](https://github.com/paulsjv/leansheets/tarball/master)
    * If you choose this option you can skip the steps of installing Git and running "git clone" in the below instructions.
2. Clone the Git repo.
    * If you choose this step follow all the below instructions.

Installation instructions:
See the video here:
http://www.screencast.com/t/q0aWDzuQGn

Download and Install the following
Nodejs - http://www.nodejs.org
Click the “Install” button on the page

Git - https://git-scm.com/downloads
Click on the OS you use

Once these two programs are installed do the following steps:
If you are running Windows make sure to run the "GIT Bash" program from your Start menu.  This will get you the command prompt you will need to run the below commands.

If you are running Mac you will want to run the following commands from your "Terminal."

```
cmd> git clone https://github.com/paulsjv/leansheets.git
cmd> cd leansheets
cmd> npm install bower
cmd> npm install -g grunt-cli <may have to run as root>
cmd> npm install grunt
cmd> bower install
cmd> npm install
cmd> grunt run
```

Open the link in your browser:
http://localhost:8081

Update to use your own Google Sheet
-------------------------
Update the ./src/config.json file to be like below (Google Sheet is the demo when you first run and lauch LeanSheets in your browser)

  ```json
  {
      "configUrl": "https://docs.google.com/a/google.com/spreadsheet/ccc?key=12cvMUMnWEKynGTsyXQywvJ9drpjYAyyo0-2cnTUJSFw&usp=drive_web&gid=44020743#",
      "dataUrl": "https://docs.google.com/a/google.com/spreadsheet/ccc?key=12cvMUMnWEKynGTsyXQywvJ9drpjYAyyo0-2cnTUJSFw&usp=drive_web&gid=497466409#",
      "debugEnabled": true,
      "showAllWork": true,
      "cacheTtl": 300,
      "datePickerFormat": "mm/dd/yyyy",
      "datePickerMomentFormat": "MM/DD/YYYY",
      "queryDateMomentFormat": "YYYY-MM-DD",
      "defaultHistoricalNumberOfDays": 60
  }
  ```

NOTE: The configUrl and dataUrl must be of the form https:https://docs.google.com/spreadsheet/ccc?key=<key>&gid=<id>. If the url is of the form https://docs.google.com/spreadsheets/d/<key>/edit#gid=<id> then translate it into the above expected format.

Run the following command to start the server.
```
$> grunt run
```

Running Tests
-------------------------
Coming Soon
