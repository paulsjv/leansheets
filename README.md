LeanSheets
==========

A tool that creates charts for Lean and Kanban based off of a Google Spread Sheet.

Life Cycle
-----------------
1. Loads /config.json
2. Loads the Configuration from your Google Spread Sheet that you have defined
3. Fires a $broadcast event to other chart's controllers for them to draw their chart

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