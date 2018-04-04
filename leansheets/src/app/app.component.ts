import { Component } from '@angular/core';
import * as cf from 'crossfilter2';
import { Status } from './status';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  title = 'app';
  data = cf(this.getHistory());
  size = this.data.size();
  statuses = this.getHistory();

  changelog = JSON.stringify(this.getChangelog());

  getHistory(): Array<Status> {
        let cl = this.getChangelog();
        // get first status which is the created date and fromStatus == "" and toStatus == "To Do" or first workflow step

        let statuses = new Array<Status>();
        statuses.push(new Status(new Date(cl.fields.created), "", "To Do"));

        for (let history of cl.changelog.histories) {
            for (let item of history.items) {
                if (item.field === "status") {
                    statuses.push(new Status(new Date(history.created), item.fromString, item.toString));
                }
            }
        }

        return statuses;

    }

    getChangelog() {
        return {
    "fields": {
        "created": "2017-06-30T11:18:24.000-0400"
    },
    "changelog": {
        "startAt": 0,
        "maxResults": 25,
        "total": 25,
        "histories": [
            {
                "id": "1235284",
                "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=Jay.Paulson",
                    "name": "Jay.Paulson",
                    "key": "jay.paulson",
                    "emailAddress": "Jay.Paulson@myhomepay.com",
                    "avatarUrls": {
                        "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=jay.paulson&avatarId=12926",
                        "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=jay.paulson&avatarId=12926",
                        "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=jay.paulson&avatarId=12926",
                        "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=jay.paulson&avatarId=12926"
                    },
                    "displayName": "Jay Paulson",
                    "active": true,
                    "timeZone": "America/Chicago"
                },
                "created": "2017-06-30T11:18:51.000-0400",
                "items": [
                    {
                        "field": "status",
                        "fieldtype": "jira",
                        "from": "10022",
                        "fromString": "To Do",
                        "to": "10149",
                        "toString": "Development Ready"
                    }
                ]
            },
            {
                "id": "1236370",
                "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=Jay.Paulson",
                    "name": "Jay.Paulson",
                    "key": "jay.paulson",
                    "emailAddress": "Jay.Paulson@myhomepay.com",
                    "avatarUrls": {
                        "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=jay.paulson&avatarId=12926",
                        "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=jay.paulson&avatarId=12926",
                        "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=jay.paulson&avatarId=12926",
                        "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=jay.paulson&avatarId=12926"
                    },
                    "displayName": "Jay Paulson",
                    "active": true,
                    "timeZone": "America/Chicago"
                },
                "created": "2017-07-03T17:49:32.000-0400",
                "items": [
                    {
                        "field": "labels",
                        "fieldtype": "jira",
                        "from": null,
                        "fromString": "",
                        "to": null,
                        "toString": "HP-Paychecks"
                    }
                ]
            },
            {
                "id": "1245238",
                "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=leo.hinojosa",
                    "name": "leo.hinojosa",
                    "key": "leo.hinojosa",
                    "emailAddress": "Leo.Hinojosa@myHomePay.com",
                    "avatarUrls": {
                        "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=leo.hinojosa&avatarId=12941",
                        "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=leo.hinojosa&avatarId=12941",
                        "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=leo.hinojosa&avatarId=12941",
                        "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=leo.hinojosa&avatarId=12941"
                    },
                    "displayName": "Leo Hinojosa",
                    "active": true,
                    "timeZone": "America/New_York"
                },
                "created": "2017-07-17T11:35:34.000-0400",
                "items": [
                    {
                        "field": "status",
                        "fieldtype": "jira",
                        "from": "10149",
                        "fromString": "Development Ready",
                        "to": "3",
                        "toString": "In Progress"
                    }
                ]
            },
            {
                "id": "1247071",
                "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=nicole.taylor",
                    "name": "nicole.taylor",
                    "key": "nicole.taylor",
                    "emailAddress": "nicole.taylor@myhomepay.com",
                    "avatarUrls": {
                        "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=nicole.taylor&avatarId=12932",
                        "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=nicole.taylor&avatarId=12932",
                        "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=nicole.taylor&avatarId=12932",
                        "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=nicole.taylor&avatarId=12932"
                    },
                    "displayName": "Nicole Taylor",
                    "active": false,
                    "timeZone": "America/New_York"
                },
                "created": "2017-07-19T10:32:35.000-0400",
                "items": [
                    {
                        "field": "assignee",
                        "fieldtype": "jira",
                        "from": null,
                        "fromString": null,
                        "to": "nicole.taylor",
                        "toString": "Nicole Taylor"
                    }
                ]
            },
            {
                "id": "1247072",
                "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=nicole.taylor",
                    "name": "nicole.taylor",
                    "key": "nicole.taylor",
                    "emailAddress": "nicole.taylor@myhomepay.com",
                    "avatarUrls": {
                        "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=nicole.taylor&avatarId=12932",
                        "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=nicole.taylor&avatarId=12932",
                        "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=nicole.taylor&avatarId=12932",
                        "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=nicole.taylor&avatarId=12932"
                    },
                    "displayName": "Nicole Taylor",
                    "active": false,
                    "timeZone": "America/New_York"
                },
                "created": "2017-07-19T10:33:43.000-0400",
                "items": [
                    {
                        "field": "description",
                        "fieldtype": "jira",
                        "from": null,
                        "fromString": "Outcome:\r\nFully integrated ETL that is populating Couchbase with data from BIS.",
                        "to": null,
                        "toString": "Outcome:\r\nFully integrated ETL that is populating Couchbase with data from BIS.\r\n\r\n* Leo refactored code - Done\r\n* Nicole is finishing out a bit of the refactor and writing a few more units tests to become familiar with the new organization of the code"
                    }
                ]
            },
            {
                "id": "1247179",
                "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=nicole.taylor",
                    "name": "nicole.taylor",
                    "key": "nicole.taylor",
                    "emailAddress": "nicole.taylor@myhomepay.com",
                    "avatarUrls": {
                        "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=nicole.taylor&avatarId=12932",
                        "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=nicole.taylor&avatarId=12932",
                        "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=nicole.taylor&avatarId=12932",
                        "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=nicole.taylor&avatarId=12932"
                    },
                    "displayName": "Nicole Taylor",
                    "active": false,
                    "timeZone": "America/New_York"
                },
                "created": "2017-07-19T12:48:36.000-0400",
                "items": [
                    {
                        "field": "Link",
                        "fieldtype": "jira",
                        "from": null,
                        "fromString": null,
                        "to": "HP-918",
                        "toString": "This issue Is issue for HP-918"
                    }
                ]
            },
            {
                "id": "1247395",
                "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=nicole.taylor",
                    "name": "nicole.taylor",
                    "key": "nicole.taylor",
                    "emailAddress": "nicole.taylor@myhomepay.com",
                    "avatarUrls": {
                        "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=nicole.taylor&avatarId=12932",
                        "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=nicole.taylor&avatarId=12932",
                        "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=nicole.taylor&avatarId=12932",
                        "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=nicole.taylor&avatarId=12932"
                    },
                    "displayName": "Nicole Taylor",
                    "active": false,
                    "timeZone": "America/New_York"
                },
                "created": "2017-07-19T18:49:41.000-0400",
                "items": [
                    {
                        "field": "RemoteIssueLink",
                        "fieldtype": "jira",
                        "from": null,
                        "fromString": null,
                        "to": "17372",
                        "toString": "This issue links to \"Page (Care.com Wiki)\""
                    }
                ]
            },
            {
                "id": "1247411",
                "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=nicole.taylor",
                    "name": "nicole.taylor",
                    "key": "nicole.taylor",
                    "emailAddress": "nicole.taylor@myhomepay.com",
                    "avatarUrls": {
                        "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=nicole.taylor&avatarId=12932",
                        "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=nicole.taylor&avatarId=12932",
                        "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=nicole.taylor&avatarId=12932",
                        "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=nicole.taylor&avatarId=12932"
                    },
                    "displayName": "Nicole Taylor",
                    "active": false,
                    "timeZone": "America/New_York"
                },
                "created": "2017-07-19T19:07:41.000-0400",
                "items": [
                    {
                        "field": "status",
                        "fieldtype": "jira",
                        "from": "3",
                        "fromString": "In Progress",
                        "to": "10426",
                        "toString": "Code Review"
                    }
                ]
            },
            {
                "id": "1247412",
                "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=nicole.taylor",
                    "name": "nicole.taylor",
                    "key": "nicole.taylor",
                    "emailAddress": "nicole.taylor@myhomepay.com",
                    "avatarUrls": {
                        "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=nicole.taylor&avatarId=12932",
                        "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=nicole.taylor&avatarId=12932",
                        "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=nicole.taylor&avatarId=12932",
                        "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=nicole.taylor&avatarId=12932"
                    },
                    "displayName": "Nicole Taylor",
                    "active": false,
                    "timeZone": "America/New_York"
                },
                "created": "2017-07-19T19:07:57.000-0400",
                "items": [
                    {
                        "field": "Reviewed By",
                        "fieldtype": "custom",
                        "from": null,
                        "fromString": null,
                        "to": "leo.hinojosa",
                        "toString": "Leo Hinojosa"
                    }
                ]
            },
            {
                "id": "1250383",
                "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=nicole.taylor",
                    "name": "nicole.taylor",
                    "key": "nicole.taylor",
                    "emailAddress": "nicole.taylor@myhomepay.com",
                    "avatarUrls": {
                        "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=nicole.taylor&avatarId=12932",
                        "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=nicole.taylor&avatarId=12932",
                        "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=nicole.taylor&avatarId=12932",
                        "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=nicole.taylor&avatarId=12932"
                    },
                    "displayName": "Nicole Taylor",
                    "active": false,
                    "timeZone": "America/New_York"
                },
                "created": "2017-07-24T13:51:54.000-0400",
                "items": [
                    {
                        "field": "status",
                        "fieldtype": "jira",
                        "from": "10426",
                        "fromString": "Code Review",
                        "to": "10141",
                        "toString": "Code Review Done"
                    }
                ]
            },
            {
                "id": "1251345",
                "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=Jay.Paulson",
                    "name": "Jay.Paulson",
                    "key": "jay.paulson",
                    "emailAddress": "Jay.Paulson@myhomepay.com",
                    "avatarUrls": {
                        "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=jay.paulson&avatarId=12926",
                        "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=jay.paulson&avatarId=12926",
                        "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=jay.paulson&avatarId=12926",
                        "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=jay.paulson&avatarId=12926"
                    },
                    "displayName": "Jay Paulson",
                    "active": true,
                    "timeZone": "America/Chicago"
                },
                "created": "2017-07-25T13:44:44.000-0400",
                "items": [
                    {
                        "field": "status",
                        "fieldtype": "jira",
                        "from": "10141",
                        "fromString": "Code Review Done",
                        "to": "10154",
                        "toString": "Demo"
                    }
                ]
            },
            {
                "id": "1252415",
                "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=nicole.taylor",
                    "name": "nicole.taylor",
                    "key": "nicole.taylor",
                    "emailAddress": "nicole.taylor@myhomepay.com",
                    "avatarUrls": {
                        "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=nicole.taylor&avatarId=12932",
                        "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=nicole.taylor&avatarId=12932",
                        "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=nicole.taylor&avatarId=12932",
                        "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=nicole.taylor&avatarId=12932"
                    },
                    "displayName": "Nicole Taylor",
                    "active": false,
                    "timeZone": "America/New_York"
                },
                "created": "2017-07-26T16:23:37.000-0400",
                "items": [
                    {
                        "field": "Link",
                        "fieldtype": "jira",
                        "from": null,
                        "fromString": null,
                        "to": "HP-1139",
                        "toString": "This issue Is issue for HP-1139"
                    }
                ]
            },
            {
                "id": "1252427",
                "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=nicole.taylor",
                    "name": "nicole.taylor",
                    "key": "nicole.taylor",
                    "emailAddress": "nicole.taylor@myhomepay.com",
                    "avatarUrls": {
                        "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=nicole.taylor&avatarId=12932",
                        "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=nicole.taylor&avatarId=12932",
                        "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=nicole.taylor&avatarId=12932",
                        "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=nicole.taylor&avatarId=12932"
                    },
                    "displayName": "Nicole Taylor",
                    "active": false,
                    "timeZone": "America/New_York"
                },
                "created": "2017-07-26T16:28:46.000-0400",
                "items": [
                    {
                        "field": "Link",
                        "fieldtype": "jira",
                        "from": null,
                        "fromString": null,
                        "to": "HP-1140",
                        "toString": "This issue Is issue for HP-1140"
                    }
                ]
            },
            {
                "id": "1252446",
                "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=nicole.taylor",
                    "name": "nicole.taylor",
                    "key": "nicole.taylor",
                    "emailAddress": "nicole.taylor@myhomepay.com",
                    "avatarUrls": {
                        "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=nicole.taylor&avatarId=12932",
                        "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=nicole.taylor&avatarId=12932",
                        "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=nicole.taylor&avatarId=12932",
                        "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=nicole.taylor&avatarId=12932"
                    },
                    "displayName": "Nicole Taylor",
                    "active": false,
                    "timeZone": "America/New_York"
                },
                "created": "2017-07-26T16:31:25.000-0400",
                "items": [
                    {
                        "field": "Link",
                        "fieldtype": "jira",
                        "from": null,
                        "fromString": null,
                        "to": "HP-1141",
                        "toString": "This issue Is issue for HP-1141"
                    }
                ]
            },
            {
                "id": "1252469",
                "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=nicole.taylor",
                    "name": "nicole.taylor",
                    "key": "nicole.taylor",
                    "emailAddress": "nicole.taylor@myhomepay.com",
                    "avatarUrls": {
                        "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=nicole.taylor&avatarId=12932",
                        "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=nicole.taylor&avatarId=12932",
                        "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=nicole.taylor&avatarId=12932",
                        "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=nicole.taylor&avatarId=12932"
                    },
                    "displayName": "Nicole Taylor",
                    "active": false,
                    "timeZone": "America/New_York"
                },
                "created": "2017-07-26T16:37:24.000-0400",
                "items": [
                    {
                        "field": "Link",
                        "fieldtype": "jira",
                        "from": null,
                        "fromString": null,
                        "to": "HP-1143",
                        "toString": "This issue Is issue for HP-1143"
                    }
                ]
            },
            {
                "id": "1253035",
                "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=Jay.Paulson",
                    "name": "Jay.Paulson",
                    "key": "jay.paulson",
                    "emailAddress": "Jay.Paulson@myhomepay.com",
                    "avatarUrls": {
                        "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=jay.paulson&avatarId=12926",
                        "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=jay.paulson&avatarId=12926",
                        "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=jay.paulson&avatarId=12926",
                        "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=jay.paulson&avatarId=12926"
                    },
                    "displayName": "Jay Paulson",
                    "active": true,
                    "timeZone": "America/Chicago"
                },
                "created": "2017-07-27T11:19:01.000-0400",
                "items": [
                    {
                        "field": "status",
                        "fieldtype": "jira",
                        "from": "10154",
                        "fromString": "Demo",
                        "to": "10141",
                        "toString": "Code Review Done"
                    }
                ]
            },
            {
                "id": "1254755",
                "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=Jay.Paulson",
                    "name": "Jay.Paulson",
                    "key": "jay.paulson",
                    "emailAddress": "Jay.Paulson@myhomepay.com",
                    "avatarUrls": {
                        "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=jay.paulson&avatarId=12926",
                        "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=jay.paulson&avatarId=12926",
                        "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=jay.paulson&avatarId=12926",
                        "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=jay.paulson&avatarId=12926"
                    },
                    "displayName": "Jay Paulson",
                    "active": true,
                    "timeZone": "America/Chicago"
                },
                "created": "2017-07-31T17:15:36.000-0400",
                "items": [
                    {
                        "field": "status",
                        "fieldtype": "jira",
                        "from": "10141",
                        "fromString": "Code Review Done",
                        "to": "10427",
                        "toString": "Verification"
                    }
                ]
            },
            {
                "id": "1254765",
                "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=Jay.Paulson",
                    "name": "Jay.Paulson",
                    "key": "jay.paulson",
                    "emailAddress": "Jay.Paulson@myhomepay.com",
                    "avatarUrls": {
                        "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=jay.paulson&avatarId=12926",
                        "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=jay.paulson&avatarId=12926",
                        "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=jay.paulson&avatarId=12926",
                        "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=jay.paulson&avatarId=12926"
                    },
                    "displayName": "Jay Paulson",
                    "active": true,
                    "timeZone": "America/Chicago"
                },
                "created": "2017-07-31T17:21:09.000-0400",
                "items": [
                    {
                        "field": "summary",
                        "fieldtype": "jira",
                        "from": null,
                        "fromString": "Integrate Account CRUD endpoints with Employer Account ETL",
                        "to": null,
                        "toString": "*Integrate Account CRUD endpoints with Employer Account ETL"
                    }
                ]
            },
            {
                "id": "1257774",
                "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=daniel.hampton",
                    "name": "daniel.hampton",
                    "key": "daniel.hampton",
                    "emailAddress": "daniel.hampton@myhomepay.com",
                    "avatarUrls": {
                        "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                        "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                        "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                        "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Daniel Hampton",
                    "active": true,
                    "timeZone": "America/Chicago"
                },
                "created": "2017-08-07T11:03:09.000-0400",
                "items": [
                    {
                        "field": "status",
                        "fieldtype": "jira",
                        "from": "10427",
                        "fromString": "Verification",
                        "to": "10023",
                        "toString": "Done"
                    },
                    {
                        "field": "resolution",
                        "fieldtype": "jira",
                        "from": null,
                        "fromString": null,
                        "to": "1",
                        "toString": "Fixed"
                    }
                ]
            },
            {
                "id": "1257776",
                "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=daniel.hampton",
                    "name": "daniel.hampton",
                    "key": "daniel.hampton",
                    "emailAddress": "daniel.hampton@myhomepay.com",
                    "avatarUrls": {
                        "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                        "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                        "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                        "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Daniel Hampton",
                    "active": true,
                    "timeZone": "America/Chicago"
                },
                "created": "2017-08-07T11:03:37.000-0400",
                "items": [
                    {
                        "field": "Verified By",
                        "fieldtype": "custom",
                        "from": null,
                        "fromString": null,
                        "to": "daniel.hampton",
                        "toString": "Daniel Hampton"
                    },
                    {
                        "field": "Approved By",
                        "fieldtype": "custom",
                        "from": null,
                        "fromString": null,
                        "to": "daniel.hampton",
                        "toString": "Daniel Hampton"
                    }
                ]
            },
            {
                "id": "1258011",
                "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=Jay.Paulson",
                    "name": "Jay.Paulson",
                    "key": "jay.paulson",
                    "emailAddress": "Jay.Paulson@myhomepay.com",
                    "avatarUrls": {
                        "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=jay.paulson&avatarId=12926",
                        "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=jay.paulson&avatarId=12926",
                        "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=jay.paulson&avatarId=12926",
                        "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=jay.paulson&avatarId=12926"
                    },
                    "displayName": "Jay Paulson",
                    "active": true,
                    "timeZone": "America/Chicago"
                },
                "created": "2017-08-07T15:17:00.000-0400",
                "items": [
                    {
                        "field": "status",
                        "fieldtype": "jira",
                        "from": "10023",
                        "fromString": "Done",
                        "to": "10135",
                        "toString": "Archived"
                    }
                ]
            },
            {
                "id": "1258013",
                "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=Jay.Paulson",
                    "name": "Jay.Paulson",
                    "key": "jay.paulson",
                    "emailAddress": "Jay.Paulson@myhomepay.com",
                    "avatarUrls": {
                        "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=jay.paulson&avatarId=12926",
                        "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=jay.paulson&avatarId=12926",
                        "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=jay.paulson&avatarId=12926",
                        "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=jay.paulson&avatarId=12926"
                    },
                    "displayName": "Jay Paulson",
                    "active": true,
                    "timeZone": "America/Chicago"
                },
                "created": "2017-08-07T15:17:04.000-0400",
                "items": [
                    {
                        "field": "summary",
                        "fieldtype": "jira",
                        "from": null,
                        "fromString": "*Integrate Account CRUD endpoints with Employer Account ETL",
                        "to": null,
                        "toString": "Integrate Account CRUD endpoints with Employer Account ETL"
                    }
                ]
            },
            {
                "id": "1308789",
                "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=Jay.Paulson",
                    "name": "Jay.Paulson",
                    "key": "jay.paulson",
                    "emailAddress": "Jay.Paulson@myhomepay.com",
                    "avatarUrls": {
                        "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=jay.paulson&avatarId=12926",
                        "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=jay.paulson&avatarId=12926",
                        "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=jay.paulson&avatarId=12926",
                        "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=jay.paulson&avatarId=12926"
                    },
                    "displayName": "Jay Paulson",
                    "active": true,
                    "timeZone": "America/Chicago"
                },
                "created": "2017-10-20T10:45:18.000-0400",
                "items": [
                    {
                        "field": "Workflow",
                        "fieldtype": "jira",
                        "from": "259771",
                        "fromString": "HP: Project Workflow 20170503",
                        "to": "269412",
                        "toString": "HP: Project Workflow 20171020"
                    }
                ]
            },
            {
                "id": "1415706",
                "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=liz.cox",
                    "name": "liz.cox",
                    "key": "eberlinger",
                    "emailAddress": "Liz.berlinger@myhomepay.com",
                    "avatarUrls": {
                        "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=eberlinger&avatarId=12921",
                        "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=eberlinger&avatarId=12921",
                        "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=eberlinger&avatarId=12921",
                        "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=eberlinger&avatarId=12921"
                    },
                    "displayName": "Elizabeth Cox",
                    "active": true,
                    "timeZone": "America/New_York"
                },
                "created": "2018-03-20T09:54:52.000-0400",
                "items": [
                    {
                        "field": "RemoteIssueLink",
                        "fieldtype": "jira",
                        "from": "17372",
                        "fromString": "This issue links to \"Page (Care.com Wiki)\"",
                        "to": "17372",
                        "toString": "This issue links to \"Page (Care.com Wiki)\""
                    }
                ]
            },
            {
                "id": "1426085",
                "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=Jay.Paulson",
                    "name": "Jay.Paulson",
                    "key": "jay.paulson",
                    "emailAddress": "Jay.Paulson@myhomepay.com",
                    "avatarUrls": {
                        "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=jay.paulson&avatarId=12926",
                        "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=jay.paulson&avatarId=12926",
                        "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=jay.paulson&avatarId=12926",
                        "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=jay.paulson&avatarId=12926"
                    },
                    "displayName": "Jay Paulson",
                    "active": true,
                    "timeZone": "America/Chicago"
                },
                "created": "2018-03-30T16:46:45.000-0400",
                "items": [
                    {
                        "field": "Workflow",
                        "fieldtype": "jira",
                        "from": "269412",
                        "fromString": "HP: Project Workflow 20171020",
                        "to": "285053",
                        "toString": "HP: Project Workflow 20180330"
                    }
                ]
                }
            ]
        }
        };
    }

}



