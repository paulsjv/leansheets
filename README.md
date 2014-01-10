leansheets
==========

A tool that creates charts for Lean and Kanban based off of a Google Spread Sheet.

Cloning/Forking the Repo
================
When cloning or forking the repo there is a /nodejs/server.js file.  You'll want to use this if you do not already have a nodejs server.js file that you use to start up your nodejs server.  Make sure that when you edit the server.js file to point to your path to the leansheet/app directory that you untrack the server.js file in git with the following command:

This will tell git you want to start ignoring the changes to the file
```
git update-index --assume-unchanged path/to/server.js
```
When you want to start keeping track again
```
git update-index --no-assume-unchanged path/to/server.js
```