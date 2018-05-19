import { Injectable } from '@angular/core';
import { DataSource } from '../../data.source';

@Injectable()
export class Jira64014Service implements DataSource {

  public getWorkItems(): Array<any> {
    return this.getJIRAWorkItems();
  }
  /**
   *
   * NOTE: this is only 50 incomplete items.  Must query each item to get changelog history.
   *
   * @returns JavaScript Object
   */
  private getJIRAWorkItems(): Array<any> {
        let workItems =    {
          "expand": "schema,names",
          "startAt": 0,
          "maxResults": 25,
          "total": 1306,
          "issues": [
          {
            "expand": "operations,editmeta,changelog,transitions,renderedFields",
            "id": "204335",
            "self": "https://jira.carezen.local/rest/api/2/issue/204335",
            "key": "HP-1745",
            "fields": {
              "summary": "Create angular footer",
              "issuetype": {
                "self": "https://jira.carezen.local/rest/api/2/issuetype/3",
                "id": "3",
                "description": "A task that needs to be done.",
                "iconUrl": "https://jira.carezen.local/images/icons/issuetypes/task.png",
                "name": "Task",
                "subtask": false
              },
              "project": {
                "self": "https://jira.carezen.local/rest/api/2/project/11816",
                "id": "11816",
                "key": "HP",
                "name": "HomePay: Projects",
                "avatarUrls": {
                  "48x48": "https://jira.carezen.local/secure/projectavatar?avatarId=10011",
                  "24x24": "https://jira.carezen.local/secure/projectavatar?size=small&avatarId=10011",
                  "16x16": "https://jira.carezen.local/secure/projectavatar?size=xsmall&avatarId=10011",
                  "32x32": "https://jira.carezen.local/secure/projectavatar?size=medium&avatarId=10011"
                }
              },
              "labels": [
                "HP-UI"
              ]
            },
            "changelog": {
              "startAt": 0,
              "maxResults": 7,
              "total": 7,
              "histories": [
                {
                  "id": "1431309",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=brigitte.huneke",
                    "name": "brigitte.huneke",
                    "key": "brigitte.huneke",
                    "emailAddress": "brigitte.huneke@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Brigitte Huneke",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-05T16:29:21.000-0400",
                  "items": [
                    {
                      "field": "Epic Link",
                      "fieldtype": "custom",
                      "from": null,
                      "fromString": null,
                      "to": "204190",
                      "toString": "HP-1736"
                    }
                  ]
                },
                {
                  "id": "1431311",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=brigitte.huneke",
                    "name": "brigitte.huneke",
                    "key": "brigitte.huneke",
                    "emailAddress": "brigitte.huneke@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Brigitte Huneke",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-05T16:29:35.000-0400",
                  "items": [
                    {
                      "field": "status",
                      "fieldtype": "jira",
                      "from": "10022",
                      "fromString": "To Do",
                      "to": "10326",
                      "toString": "Design Done"
                    }
                  ]
                },
                {
                  "id": "1431314",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=brigitte.huneke",
                    "name": "brigitte.huneke",
                    "key": "brigitte.huneke",
                    "emailAddress": "brigitte.huneke@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Brigitte Huneke",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-05T16:36:12.000-0400",
                  "items": [
                    {
                      "field": "description",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": "WHEN I visit https://github.mhp-int.com/MyHomePay/mobile-payroll-ui\r\nEXPECT \r\n* a new angular repo that has pattern-lib-clone integrated\r\n* with Jenkinsfile included\r\n\r\nWHEN you run ng serve\r\nEXPECT \r\n* to view a blank page with a header 50px in height on localhost:4200 (see attached wireframe)\r\n* the Care/HomePay logo to be centered in the middle (NEED SVG FROM CARE)\r\n* Care's hamburger menu icon should be in the left corner (22px height by 22px width)\r\n* Care's phone icon should be in the right corner and should call HomePay when clicked (22px height by 22px width)\r\n\r\nIncorporating icons: [http://dummy-data.carezen.local:3002/docs/icons]\r\n\r\n",
                      "to": null,
                      "toString": "GIVEN mobile-payroll-ui repo\r\nWHEN you run ng serve\r\nTHEN expect to see basic footer matching attached wireframe\r\nAND expect to see header created in HP-1738\r\n\r\nIncorporating icons: [http://dummy-data.carezen.local:3002/docs/icons]\r\nNote: If icons can't be located, use 40px diameter circles as placeholders.\r\n"
                    }
                  ]
                },
                {
                  "id": "1431315",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=brigitte.huneke",
                    "name": "brigitte.huneke",
                    "key": "brigitte.huneke",
                    "emailAddress": "brigitte.huneke@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Brigitte Huneke",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-05T16:36:15.000-0400",
                  "items": [
                    {
                      "field": "status",
                      "fieldtype": "jira",
                      "from": "10326",
                      "fromString": "Design Done",
                      "to": "10325",
                      "toString": "Design"
                    }
                  ]
                },
                {
                  "id": "1431330",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=brigitte.huneke",
                    "name": "brigitte.huneke",
                    "key": "brigitte.huneke",
                    "emailAddress": "brigitte.huneke@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Brigitte Huneke",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-05T17:32:52.000-0400",
                  "items": [
                    {
                      "field": "Attachment",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": null,
                      "to": "218463",
                      "toString": "Screen Shot 2018-04-05 at 4.32.10 PM.png"
                    }
                  ]
                },
                {
                  "id": "1431331",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=brigitte.huneke",
                    "name": "brigitte.huneke",
                    "key": "brigitte.huneke",
                    "emailAddress": "brigitte.huneke@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Brigitte Huneke",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-05T17:33:54.000-0400",
                  "items": [
                    {
                      "field": "Attachment",
                      "fieldtype": "jira",
                      "from": "218463",
                      "fromString": "Screen Shot 2018-04-05 at 4.32.10 PM.png",
                      "to": null,
                      "toString": null
                    }
                  ]
                },
                {
                  "id": "1431332",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=brigitte.huneke",
                    "name": "brigitte.huneke",
                    "key": "brigitte.huneke",
                    "emailAddress": "brigitte.huneke@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Brigitte Huneke",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-05T17:34:10.000-0400",
                  "items": [
                    {
                      "field": "Attachment",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": null,
                      "to": "218464",
                      "toString": "Screen Shot 2018-04-05 at 4.33.41 PM.png"
                    }
                  ]
                }
              ]
            }
          },
          {
            "expand": "operations,editmeta,changelog,transitions,renderedFields",
            "id": "204312",
            "self": "https://jira.carezen.local/rest/api/2/issue/204312",
            "key": "HP-1744",
            "fields": {
              "summary": "9.1.23 - Use Consul And Vault For Payment Instruction Publisher Configuration In Nomad Job",
              "issuetype": {
                "self": "https://jira.carezen.local/rest/api/2/issuetype/5",
                "id": "5",
                "description": "The sub-task of the issue",
                "iconUrl": "https://jira.carezen.local/images/icons/issuetypes/subtask_alternate.png",
                "name": "Sub-task",
                "subtask": true
              },
              "project": {
                "self": "https://jira.carezen.local/rest/api/2/project/11816",
                "id": "11816",
                "key": "HP",
                "name": "HomePay: Projects",
                "avatarUrls": {
                  "48x48": "https://jira.carezen.local/secure/projectavatar?avatarId=10011",
                  "24x24": "https://jira.carezen.local/secure/projectavatar?size=small&avatarId=10011",
                  "16x16": "https://jira.carezen.local/secure/projectavatar?size=xsmall&avatarId=10011",
                  "32x32": "https://jira.carezen.local/secure/projectavatar?size=medium&avatarId=10011"
                }
              },
              "labels": [
                "HP-NoVerifyNeeded",
                "HP-PayrollProcessing"
              ]
            },
            "changelog": {
              "startAt": 0,
              "maxResults": 1,
              "total": 1,
              "histories": [
                {
                  "id": "1431215",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=sean.schade",
                    "name": "sean.schade",
                    "key": "sean.shade",
                    "emailAddress": "sean.schade@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=sean.shade&avatarId=13606",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=sean.shade&avatarId=13606",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=sean.shade&avatarId=13606",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=sean.shade&avatarId=13606"
                    },
                    "displayName": "Sean Schade",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-05T13:54:26.000-0400",
                  "items": [
                    {
                      "field": "status",
                      "fieldtype": "jira",
                      "from": "10022",
                      "fromString": "To Do",
                      "to": "10326",
                      "toString": "Design Done"
                    }
                  ]
                }
              ]
            }
          },
          {
            "expand": "operations,editmeta,changelog,transitions,renderedFields",
            "id": "204310",
            "self": "https://jira.carezen.local/rest/api/2/issue/204310",
            "key": "HP-1743",
            "fields": {
              "summary": "9.1.22 - Use Consul And Vault For Payment Instruction Materializer Configuration In Nomad Job",
              "issuetype": {
                "self": "https://jira.carezen.local/rest/api/2/issuetype/5",
                "id": "5",
                "description": "The sub-task of the issue",
                "iconUrl": "https://jira.carezen.local/images/icons/issuetypes/subtask_alternate.png",
                "name": "Sub-task",
                "subtask": true
              },
              "project": {
                "self": "https://jira.carezen.local/rest/api/2/project/11816",
                "id": "11816",
                "key": "HP",
                "name": "HomePay: Projects",
                "avatarUrls": {
                  "48x48": "https://jira.carezen.local/secure/projectavatar?avatarId=10011",
                  "24x24": "https://jira.carezen.local/secure/projectavatar?size=small&avatarId=10011",
                  "16x16": "https://jira.carezen.local/secure/projectavatar?size=xsmall&avatarId=10011",
                  "32x32": "https://jira.carezen.local/secure/projectavatar?size=medium&avatarId=10011"
                }
              },
              "labels": [
                "HP-NoVerifyNeeded",
                "HP-PayrollProcessing"
              ]
            },
            "changelog": {
              "startAt": 0,
              "maxResults": 4,
              "total": 4,
              "histories": [
                {
                  "id": "1431202",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=sean.schade",
                    "name": "sean.schade",
                    "key": "sean.shade",
                    "emailAddress": "sean.schade@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=sean.shade&avatarId=13606",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=sean.shade&avatarId=13606",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=sean.shade&avatarId=13606",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=sean.shade&avatarId=13606"
                    },
                    "displayName": "Sean Schade",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-05T13:50:26.000-0400",
                  "items": [
                    {
                      "field": "description",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": "*GIVEN* that distributed tracing is essential to operating distributed systems with confidence\r\n*WHEN* developing the _payment-instruction-materializer_\r\n*EXPECT* that calls to the grpc endpoints create a span and push it to [Jaeger|https://jaeger.readthedocs.io/en/latest/]\r\n* https://github.com/grpc-ecosystem/grpc-opentracing/tree/master/go/otgrpc\r\n** Provides an interceptor for automatically creating a span around grpc endpoint calls\r\n\r\n*GIVEN* that Jaeger has been deployed using the updated {{hashistack.nomad}} file and grpc calls are creating spans\r\n*WHEN* {{debug}} level logging is enabled\r\n*EXPECT* span data to show up in log files (nomad log window)\r\n* This will most likely require a small wrapper around {{logrus}} so that it implements the jaeger logger interface. Good example code: https://github.com/jaegertracing/jaeger-client-go/blob/master/config/example_test.go#L49\r\n\r\n*Given* that opentracing will be used for debugging\r\n*When* creating spans\r\n*Expect* consistent field naming to be used\r\n** {{account.ID}}\r\n** {{instrument.ID}}\r\n** {{nats.messageID}}\r\n** {{payment.event}}\r\n** {{payment.event.type}}\r\n",
                      "to": null,
                      "toString": "As an operator I want all application configuration for Nomad jobs to come from Consul and Vault.\r\n\r\nIn the example below you can see that the secrets are coming from Vault. However, the _env_ section should go away, and the rest of the non-sensitive values should come from Consul using the _keyOrDefault_ function.\r\n\r\n\r\n{code}\r\n      env {\r\n        \"PORT\"              = \"${NOMAD_PORT_http}\"\r\n        \"LOG_LEVEL\"         = \"Info\"\r\n        \"NATS_DURABLE\"      = \"payment-instruction-materializer\"\r\n        \"NATS_SUBJECT\"      = \"payment.instructions\"\r\n        \"NATS_URL\"          = \"nats://stan.service.consul:4222\"\r\n        \"NATS_CLUSTER\"      = \"homepay-nats\"\r\n        \"NATS_CLIENT\"       = \"payment-instruction-publisher-${NOMAD_ALLOC_ID}\"\r\n        \"COUCHBASE_CLUSTER\" = \"couchbase://couchbase-web.service.consul\"\r\n        \"COUCHBASE_BUCKET\"  = \"homepay\"\r\n      }\r\n\r\n      template {\r\n        data = <<EOH\r\n        NATS_SUBJECT = \"{{ keyOrDefault \\\"service/payment-instruction-publisher/nats/subject\\\" \\\"payment.instructions\\\" }}\"\r\n\tCOUCHBASE_USERNAME = {{with secret \"secret/couchbase\"}}{{.Data.username}}{{end}}\r\n\tCOUCHBASE_PASSWORD = {{with secret \"secret/couchbase\"}}{{.Data.password}}{{end}}\r\n\tEOH\r\n\r\n        destination = \"environment\"\r\n        env         = true\r\n      }\r\n{code}"
                    }
                  ]
                },
                {
                  "id": "1431205",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=sean.schade",
                    "name": "sean.schade",
                    "key": "sean.shade",
                    "emailAddress": "sean.schade@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=sean.shade&avatarId=13606",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=sean.shade&avatarId=13606",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=sean.shade&avatarId=13606",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=sean.shade&avatarId=13606"
                    },
                    "displayName": "Sean Schade",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-05T13:52:06.000-0400",
                  "items": [
                    {
                      "field": "description",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": "As an operator I want all application configuration for Nomad jobs to come from Consul and Vault.\r\n\r\nIn the example below you can see that the secrets are coming from Vault. However, the _env_ section should go away, and the rest of the non-sensitive values should come from Consul using the _keyOrDefault_ function.\r\n\r\n\r\n{code}\r\n      env {\r\n        \"PORT\"              = \"${NOMAD_PORT_http}\"\r\n        \"LOG_LEVEL\"         = \"Info\"\r\n        \"NATS_DURABLE\"      = \"payment-instruction-materializer\"\r\n        \"NATS_SUBJECT\"      = \"payment.instructions\"\r\n        \"NATS_URL\"          = \"nats://stan.service.consul:4222\"\r\n        \"NATS_CLUSTER\"      = \"homepay-nats\"\r\n        \"NATS_CLIENT\"       = \"payment-instruction-publisher-${NOMAD_ALLOC_ID}\"\r\n        \"COUCHBASE_CLUSTER\" = \"couchbase://couchbase-web.service.consul\"\r\n        \"COUCHBASE_BUCKET\"  = \"homepay\"\r\n      }\r\n\r\n      template {\r\n        data = <<EOH\r\n        NATS_SUBJECT = \"{{ keyOrDefault \\\"service/payment-instruction-publisher/nats/subject\\\" \\\"payment.instructions\\\" }}\"\r\n\tCOUCHBASE_USERNAME = {{with secret \"secret/couchbase\"}}{{.Data.username}}{{end}}\r\n\tCOUCHBASE_PASSWORD = {{with secret \"secret/couchbase\"}}{{.Data.password}}{{end}}\r\n\tEOH\r\n\r\n        destination = \"environment\"\r\n        env         = true\r\n      }\r\n{code}",
                      "to": null,
                      "toString": "As an operator I want all application configuration for Nomad jobs to come from Consul and Vault.\r\n\r\nIn the example below you can see that the secrets are coming from Vault. However, the _env_ section should go away, and the rest of the non-sensitive values should come from Consul using the _keyOrDefault_ function.\r\n\r\n\r\n{code}\r\n      env {\r\n        \"PORT\"              = \"${NOMAD_PORT_http}\"\r\n        \"LOG_LEVEL\"         = \"Info\"\r\n        \"NATS_DURABLE\"      = \"payment-instruction-materializer\"\r\n        # REMOVE  \"NATS_SUBJECT\"      = \"payment.instructions\"\r\n        \"NATS_URL\"          = \"nats://stan.service.consul:4222\"\r\n        \"NATS_CLUSTER\"      = \"homepay-nats\"\r\n        \"NATS_CLIENT\"       = \"payment-instruction-publisher-${NOMAD_ALLOC_ID}\"\r\n        \"COUCHBASE_CLUSTER\" = \"couchbase://couchbase-web.service.consul\"\r\n        \"COUCHBASE_BUCKET\"  = \"homepay\"\r\n      }\r\n\r\n      template {\r\n        data = <<EOH\r\n        NATS_SUBJECT = {{keyOrDefault \"service/payment-instruction-publisher/nats/subject\" \"payment.instructions\"}}\r\n\tCOUCHBASE_USERNAME = {{with secret \"secret/couchbase\"}}{{.Data.username}}{{end}}\r\n\tCOUCHBASE_PASSWORD = {{with secret \"secret/couchbase\"}}{{.Data.password}}{{end}}\r\n\tEOH\r\n\r\n        destination = \"environment\"\r\n        env         = true\r\n      }\r\n{code}"
                    }
                  ]
                },
                {
                  "id": "1431210",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=sean.schade",
                    "name": "sean.schade",
                    "key": "sean.shade",
                    "emailAddress": "sean.schade@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=sean.shade&avatarId=13606",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=sean.shade&avatarId=13606",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=sean.shade&avatarId=13606",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=sean.shade&avatarId=13606"
                    },
                    "displayName": "Sean Schade",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-05T13:53:40.000-0400",
                  "items": [
                    {
                      "field": "description",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": "As an operator I want all application configuration for Nomad jobs to come from Consul and Vault.\r\n\r\nIn the example below you can see that the secrets are coming from Vault. However, the _env_ section should go away, and the rest of the non-sensitive values should come from Consul using the _keyOrDefault_ function.\r\n\r\n\r\n{code}\r\n      env {\r\n        \"PORT\"              = \"${NOMAD_PORT_http}\"\r\n        \"LOG_LEVEL\"         = \"Info\"\r\n        \"NATS_DURABLE\"      = \"payment-instruction-materializer\"\r\n        # REMOVE  \"NATS_SUBJECT\"      = \"payment.instructions\"\r\n        \"NATS_URL\"          = \"nats://stan.service.consul:4222\"\r\n        \"NATS_CLUSTER\"      = \"homepay-nats\"\r\n        \"NATS_CLIENT\"       = \"payment-instruction-publisher-${NOMAD_ALLOC_ID}\"\r\n        \"COUCHBASE_CLUSTER\" = \"couchbase://couchbase-web.service.consul\"\r\n        \"COUCHBASE_BUCKET\"  = \"homepay\"\r\n      }\r\n\r\n      template {\r\n        data = <<EOH\r\n        NATS_SUBJECT = {{keyOrDefault \"service/payment-instruction-publisher/nats/subject\" \"payment.instructions\"}}\r\n\tCOUCHBASE_USERNAME = {{with secret \"secret/couchbase\"}}{{.Data.username}}{{end}}\r\n\tCOUCHBASE_PASSWORD = {{with secret \"secret/couchbase\"}}{{.Data.password}}{{end}}\r\n\tEOH\r\n\r\n        destination = \"environment\"\r\n        env         = true\r\n      }\r\n{code}",
                      "to": null,
                      "toString": "As an operator I want all application configuration for Nomad jobs to come from Consul and Vault.\r\n\r\nIn the example below you can see that the secrets are coming from Vault. However, the _env_ section should go away, and the rest of the non-sensitive values should come from Consul using the _keyOrDefault_ function.\r\n\r\n\r\n{code}\r\n      env {\r\n        \"PORT\"              = \"${NOMAD_PORT_http}\"\r\n        \"LOG_LEVEL\"         = \"Info\"\r\n        \"NATS_DURABLE\"      = \"payment-instruction-materializer\"\r\n        # REMOVE  \"NATS_SUBJECT\"      = \"payment.instructions\"\r\n        \"NATS_URL\"          = \"nats://stan.service.consul:4222\"\r\n        \"NATS_CLUSTER\"      = \"homepay-nats\"\r\n        \"NATS_CLIENT\"       = \"payment-instruction-publisher-${NOMAD_ALLOC_ID}\"\r\n        \"COUCHBASE_CLUSTER\" = \"couchbase://couchbase-web.service.consul\"\r\n        \"COUCHBASE_BUCKET\"  = \"homepay\"\r\n      }\r\n\r\n      template {\r\n        data = <<EOH\r\n        NATS_SUBJECT = {{keyOrDefault \"service/payment-instruction-publisher/nats/subject\" \"payment.instructions\"}}\r\n\tCOUCHBASE_USERNAME = {{with secret \"secret/couchbase\"}}{{.Data.username}}{{end}}\r\n\tCOUCHBASE_PASSWORD = {{with secret \"secret/couchbase\"}}{{.Data.password}}{{end}}\r\n\tEOH\r\n\r\n        destination = \"environment\"\r\n        env         = true\r\n      }\r\n{code}\r\n\r\n*Given* that Consul and Vault can be used for Nomad job configuration\r\n*When* defining the Nomad job\r\n*Expect* the _env_ section to be replaced with a _template_ that pulls all configuration from Consul and Vault into the environment variables."
                    }
                  ]
                },
                {
                  "id": "1431212",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=sean.schade",
                    "name": "sean.schade",
                    "key": "sean.shade",
                    "emailAddress": "sean.schade@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=sean.shade&avatarId=13606",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=sean.shade&avatarId=13606",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=sean.shade&avatarId=13606",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=sean.shade&avatarId=13606"
                    },
                    "displayName": "Sean Schade",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-05T13:53:52.000-0400",
                  "items": [
                    {
                      "field": "status",
                      "fieldtype": "jira",
                      "from": "10022",
                      "fromString": "To Do",
                      "to": "10326",
                      "toString": "Design Done"
                    }
                  ]
                }
              ]
            }
          },
          {
            "expand": "operations,editmeta,changelog,transitions,renderedFields",
            "id": "204299",
            "self": "https://jira.carezen.local/rest/api/2/issue/204299",
            "key": "HP-1742",
            "fields": {
              "summary": "Add ability to run in a nomad environment",
              "issuetype": {
                "self": "https://jira.carezen.local/rest/api/2/issuetype/3",
                "id": "3",
                "description": "A task that needs to be done.",
                "iconUrl": "https://jira.carezen.local/images/icons/issuetypes/task.png",
                "name": "Task",
                "subtask": false
              },
              "project": {
                "self": "https://jira.carezen.local/rest/api/2/project/11816",
                "id": "11816",
                "key": "HP",
                "name": "HomePay: Projects",
                "avatarUrls": {
                  "48x48": "https://jira.carezen.local/secure/projectavatar?avatarId=10011",
                  "24x24": "https://jira.carezen.local/secure/projectavatar?size=small&avatarId=10011",
                  "16x16": "https://jira.carezen.local/secure/projectavatar?size=xsmall&avatarId=10011",
                  "32x32": "https://jira.carezen.local/secure/projectavatar?size=medium&avatarId=10011"
                }
              },
              "labels": []
            },
            "changelog": {
              "startAt": 0,
              "maxResults": 1,
              "total": 1,
              "histories": [
                {
                  "id": "1431113",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=luis.sanchez",
                    "name": "luis.sanchez",
                    "key": "luis.sanchez",
                    "emailAddress": "luis.sanchez@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Luis Sanchez",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-05T12:10:14.000-0400",
                  "items": [
                    {
                      "field": "Epic Link",
                      "fieldtype": "custom",
                      "from": null,
                      "fromString": null,
                      "to": "204190",
                      "toString": "HP-1736"
                    }
                  ]
                }
              ]
            }
          },
          {
            "expand": "operations,editmeta,changelog,transitions,renderedFields",
            "id": "204296",
            "self": "https://jira.carezen.local/rest/api/2/issue/204296",
            "key": "HP-1741",
            "fields": {
              "summary": "9.1.21 - Implement OpenTracing in Payment Instruction Materializer",
              "issuetype": {
                "self": "https://jira.carezen.local/rest/api/2/issuetype/5",
                "id": "5",
                "description": "The sub-task of the issue",
                "iconUrl": "https://jira.carezen.local/images/icons/issuetypes/subtask_alternate.png",
                "name": "Sub-task",
                "subtask": true
              },
              "project": {
                "self": "https://jira.carezen.local/rest/api/2/project/11816",
                "id": "11816",
                "key": "HP",
                "name": "HomePay: Projects",
                "avatarUrls": {
                  "48x48": "https://jira.carezen.local/secure/projectavatar?avatarId=10011",
                  "24x24": "https://jira.carezen.local/secure/projectavatar?size=small&avatarId=10011",
                  "16x16": "https://jira.carezen.local/secure/projectavatar?size=xsmall&avatarId=10011",
                  "32x32": "https://jira.carezen.local/secure/projectavatar?size=medium&avatarId=10011"
                }
              },
              "labels": [
                "HP-NoVerifyNeeded",
                "HP-PayrollProcessing"
              ]
            },
            "changelog": {
              "startAt": 0,
              "maxResults": 2,
              "total": 2,
              "histories": [
                {
                  "id": "1431084",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=sean.schade",
                    "name": "sean.schade",
                    "key": "sean.shade",
                    "emailAddress": "sean.schade@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=sean.shade&avatarId=13606",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=sean.shade&avatarId=13606",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=sean.shade&avatarId=13606",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=sean.shade&avatarId=13606"
                    },
                    "displayName": "Sean Schade",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-05T11:48:56.000-0400",
                  "items": [
                    {
                      "field": "description",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": "*GIVEN* that distributed tracing is essential to operating distributed systems with confidence\r\n*WHEN* developing the _payment-instruction-publisher_\r\n*EXPECT* that calls to the grpc endpoints create a span and push it to [Jaeger|https://jaeger.readthedocs.io/en/latest/]\r\n* https://github.com/grpc-ecosystem/grpc-opentracing/tree/master/go/otgrpc\r\n** Provides an interceptor for automatically creating a span around grpc endpoint calls\r\n\r\n*GIVEN* that Jaeger has been deployed using the updated {{hashistack.nomad}} file and grpc calls are creating spans\r\n*WHEN* {{debug}} level logging is enabled\r\n*EXPECT* span data to show up in log files (nomad log window)\r\n* This will most likely require a small wrapper around {{logrus}} so that it implements the jaeger logger interface. Good example code: https://github.com/jaegertracing/jaeger-client-go/blob/master/config/example_test.go#L49\r\n\r\n*Given* that opentracing will be used for debugging\r\n*When* creating spans\r\n*Expect* consistent field naming to be used\r\n** {{account.ID}}\r\n** {{instrument.ID}}\r\n** {{nats.messageID}}\r\n** {{payment.event}}\r\n** {{payment.event.type}}\r\n",
                      "to": null,
                      "toString": "*GIVEN* that distributed tracing is essential to operating distributed systems with confidence\r\n*WHEN* developing the _payment-instruction-materializer_\r\n*EXPECT* that calls to the grpc endpoints create a span and push it to [Jaeger|https://jaeger.readthedocs.io/en/latest/]\r\n* https://github.com/grpc-ecosystem/grpc-opentracing/tree/master/go/otgrpc\r\n** Provides an interceptor for automatically creating a span around grpc endpoint calls\r\n\r\n*GIVEN* that Jaeger has been deployed using the updated {{hashistack.nomad}} file and grpc calls are creating spans\r\n*WHEN* {{debug}} level logging is enabled\r\n*EXPECT* span data to show up in log files (nomad log window)\r\n* This will most likely require a small wrapper around {{logrus}} so that it implements the jaeger logger interface. Good example code: https://github.com/jaegertracing/jaeger-client-go/blob/master/config/example_test.go#L49\r\n\r\n*Given* that opentracing will be used for debugging\r\n*When* creating spans\r\n*Expect* consistent field naming to be used\r\n** {{account.ID}}\r\n** {{instrument.ID}}\r\n** {{nats.messageID}}\r\n** {{payment.event}}\r\n** {{payment.event.type}}\r\n"
                    }
                  ]
                },
                {
                  "id": "1431091",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=sean.schade",
                    "name": "sean.schade",
                    "key": "sean.shade",
                    "emailAddress": "sean.schade@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=sean.shade&avatarId=13606",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=sean.shade&avatarId=13606",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=sean.shade&avatarId=13606",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=sean.shade&avatarId=13606"
                    },
                    "displayName": "Sean Schade",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-05T11:49:05.000-0400",
                  "items": [
                    {
                      "field": "status",
                      "fieldtype": "jira",
                      "from": "10022",
                      "fromString": "To Do",
                      "to": "10326",
                      "toString": "Design Done"
                    }
                  ]
                }
              ]
            }
          },
          {
            "expand": "operations,editmeta,changelog,transitions,renderedFields",
            "id": "204281",
            "self": "https://jira.carezen.local/rest/api/2/issue/204281",
            "key": "HP-1740",
            "fields": {
              "summary": "9.1.20 - Benchmark payment-instruction-materializer",
              "issuetype": {
                "self": "https://jira.carezen.local/rest/api/2/issuetype/5",
                "id": "5",
                "description": "The sub-task of the issue",
                "iconUrl": "https://jira.carezen.local/images/icons/issuetypes/subtask_alternate.png",
                "name": "Sub-task",
                "subtask": true
              },
              "project": {
                "self": "https://jira.carezen.local/rest/api/2/project/11816",
                "id": "11816",
                "key": "HP",
                "name": "HomePay: Projects",
                "avatarUrls": {
                  "48x48": "https://jira.carezen.local/secure/projectavatar?avatarId=10011",
                  "24x24": "https://jira.carezen.local/secure/projectavatar?size=small&avatarId=10011",
                  "16x16": "https://jira.carezen.local/secure/projectavatar?size=xsmall&avatarId=10011",
                  "32x32": "https://jira.carezen.local/secure/projectavatar?size=medium&avatarId=10011"
                }
              },
              "labels": [
                "HP-NoVerifyNeeded",
                "HP-PayrollProcessing"
              ]
            },
            "changelog": {
              "startAt": 0,
              "maxResults": 2,
              "total": 2,
              "histories": [
                {
                  "id": "1430946",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=sean.schade",
                    "name": "sean.schade",
                    "key": "sean.shade",
                    "emailAddress": "sean.schade@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=sean.shade&avatarId=13606",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=sean.shade&avatarId=13606",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=sean.shade&avatarId=13606",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=sean.shade&avatarId=13606"
                    },
                    "displayName": "Sean Schade",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-05T10:22:06.000-0400",
                  "items": [
                    {
                      "field": "status",
                      "fieldtype": "jira",
                      "from": "10022",
                      "fromString": "To Do",
                      "to": "10325",
                      "toString": "Design"
                    }
                  ]
                },
                {
                  "id": "1431076",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=sean.schade",
                    "name": "sean.schade",
                    "key": "sean.shade",
                    "emailAddress": "sean.schade@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=sean.shade&avatarId=13606",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=sean.shade&avatarId=13606",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=sean.shade&avatarId=13606",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=sean.shade&avatarId=13606"
                    },
                    "displayName": "Sean Schade",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-05T11:44:18.000-0400",
                  "items": [
                    {
                      "field": "description",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": "As a developer I want to validate how much load my service can handle. All services should include a set of benchmark tests that measure min, mean, and max response times under various load scenarios. Another set of benchmarks should measure the memory pressure under the same various load scenarios.\r\n\r\nThe service should be publishing Prometheus metrics, and the benchmark tests will use these metrics to validate that the service is operating as expected.\r\n\r\nGinkgo provides benchmarking capability through the _Measure_ DSL.\r\n\r\nhttps://onsi.github.io/ginkgo/#benchmark-tests\r\n\r\n\r\n*Given* a set of benchmark scenarios\r\n*When* developing the tests\r\n*Expect* the following scenarios\r\n#  1 RPS (request per second)\r\n#  10 RPS\r\n#  100 RPS\r\n#  1000 RPS\r\n*Expect* each scenario to be run 10 times\r\n*Expect* the following metrics to be calculated over the 10 iterations\r\n# min(memory)\r\n# max(memory)\r\n# mean(memory)\r\n# min(response time ms)\r\n# max(response time ms)\r\n# mean(response time ms)",
                      "to": null,
                      "toString": "As a developer I want to validate how much load my service can handle. All services should include a set of benchmark tests that measure min, mean, and max response times under various load scenarios. Another set of benchmarks should measure the memory pressure under the same various load scenarios.\r\n\r\nThe service should be publishing Prometheus metrics, and the benchmark tests will use these metrics to validate that the service is operating as expected.\r\n\r\nGinkgo provides benchmarking capability through the _Measure_ DSL.\r\n\r\nhttps://onsi.github.io/ginkgo/#benchmark-tests\r\n\r\n\r\n*Given* a set of benchmark scenarios\r\n*When* developing the tests\r\n*Expect* each scenario to be run 10 times\r\n*Expect* the following scenarios\r\n#  1 RPS (request per second)\r\n#  10 RPS\r\n#  100 RPS\r\n#  1000 RPS\r\n\r\nhttps://github.com/prometheus/client_golang/blob/master/prometheus/go_collector.go#L33\r\n\r\n*Given* that every service should export standard Go Prometheus metrics\r\n*When* running the benchmarks\r\n*Expect* the following metrics to be queried \r\n* go_gc_duration_seconds\r\n* go_memstats_alloc_bytes\r\n* go_memstats_sys_bytes\r\n* go_memstats_lookups_total\r\n* go_memstats_mallocs_total\r\n* go_memstats_heap_alloc_bytes\r\n* go_memstats_heap_sys_bytes\r\n* go_memstats_heap_objects\r\n* go_memstats_stack_inuse_bytes\r\n\r\nhttps://github.com/grpc-ecosystem/go-grpc-prometheus/blob/master/client_metrics.go\r\n\r\n*Given* that every gRPC client should export standard gRPC metrics\r\n*When* running the benchmarks\r\n*Expect* the following metrics to be queried \r\n* grpc_client_started_total\r\n* grpc_client_handled_total\r\n* grpc_client_handling_seconds\r\n"
                    }
                  ]
                }
              ]
            }
          },
          {
            "expand": "operations,editmeta,changelog,transitions,renderedFields",
            "id": "204280",
            "self": "https://jira.carezen.local/rest/api/2/issue/204280",
            "key": "HP-1739",
            "fields": {
              "summary": "9.1.19 - Benchmark payment-instruction-publisher",
              "issuetype": {
                "self": "https://jira.carezen.local/rest/api/2/issuetype/5",
                "id": "5",
                "description": "The sub-task of the issue",
                "iconUrl": "https://jira.carezen.local/images/icons/issuetypes/subtask_alternate.png",
                "name": "Sub-task",
                "subtask": true
              },
              "project": {
                "self": "https://jira.carezen.local/rest/api/2/project/11816",
                "id": "11816",
                "key": "HP",
                "name": "HomePay: Projects",
                "avatarUrls": {
                  "48x48": "https://jira.carezen.local/secure/projectavatar?avatarId=10011",
                  "24x24": "https://jira.carezen.local/secure/projectavatar?size=small&avatarId=10011",
                  "16x16": "https://jira.carezen.local/secure/projectavatar?size=xsmall&avatarId=10011",
                  "32x32": "https://jira.carezen.local/secure/projectavatar?size=medium&avatarId=10011"
                }
              },
              "labels": [
                "HP-NoVerifyNeeded",
                "HP-PayrollProcessing"
              ]
            },
            "changelog": {
              "startAt": 0,
              "maxResults": 4,
              "total": 4,
              "histories": [
                {
                  "id": "1430944",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=sean.schade",
                    "name": "sean.schade",
                    "key": "sean.shade",
                    "emailAddress": "sean.schade@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=sean.shade&avatarId=13606",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=sean.shade&avatarId=13606",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=sean.shade&avatarId=13606",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=sean.shade&avatarId=13606"
                    },
                    "displayName": "Sean Schade",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-05T10:21:21.000-0400",
                  "items": [
                    {
                      "field": "Component",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": null,
                      "to": "11350",
                      "toString": "Infrastructure"
                    }
                  ]
                },
                {
                  "id": "1430945",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=sean.schade",
                    "name": "sean.schade",
                    "key": "sean.shade",
                    "emailAddress": "sean.schade@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=sean.shade&avatarId=13606",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=sean.shade&avatarId=13606",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=sean.shade&avatarId=13606",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=sean.shade&avatarId=13606"
                    },
                    "displayName": "Sean Schade",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-05T10:21:31.000-0400",
                  "items": [
                    {
                      "field": "status",
                      "fieldtype": "jira",
                      "from": "10022",
                      "fromString": "To Do",
                      "to": "10325",
                      "toString": "Design"
                    }
                  ]
                },
                {
                  "id": "1430947",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=sean.schade",
                    "name": "sean.schade",
                    "key": "sean.shade",
                    "emailAddress": "sean.schade@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=sean.shade&avatarId=13606",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=sean.shade&avatarId=13606",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=sean.shade&avatarId=13606",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=sean.shade&avatarId=13606"
                    },
                    "displayName": "Sean Schade",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-05T10:22:29.000-0400",
                  "items": [
                    {
                      "field": "assignee",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": null,
                      "to": "sean.shade",
                      "toString": "Sean Schade"
                    }
                  ]
                },
                {
                  "id": "1431073",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=sean.schade",
                    "name": "sean.schade",
                    "key": "sean.shade",
                    "emailAddress": "sean.schade@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=sean.shade&avatarId=13606",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=sean.shade&avatarId=13606",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=sean.shade&avatarId=13606",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=sean.shade&avatarId=13606"
                    },
                    "displayName": "Sean Schade",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-05T11:41:53.000-0400",
                  "items": [
                    {
                      "field": "description",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": "As a developer I want to validate how much load my service can handle. All services should include a set of benchmark tests that measure min, mean, and max response times under various load scenarios. Another set of benchmarks should measure the memory pressure under the same various load scenarios.\r\n\r\nThe service should be publishing Prometheus metrics, and the benchmark tests will use these metrics to validate that the service is operating as expected.\r\n\r\nGinkgo provides benchmarking capability through the _Measure_ DSL.\r\n\r\nhttps://onsi.github.io/ginkgo/#benchmark-tests\r\n\r\n\r\n*Given* a set of benchmark scenarios\r\n*When* developing the tests\r\n*Expect* the following scenarios\r\n#  1 RPS (request per second)\r\n#  10 RPS\r\n#  100 RPS\r\n#  1000 RPS\r\n*Expect* each scenario to be run 10 times\r\n*Expect* the following metrics to be calculated over the 10 iterations\r\n# min(memory)\r\n# max(memory)\r\n# mean(memory)\r\n# min(response time ms)\r\n# max(response time ms)\r\n# mean(response time ms)",
                      "to": null,
                      "toString": "As a developer I want to validate how much load my service can handle. All services should include a set of benchmark tests that measure min, mean, and max response times under various load scenarios. Another set of benchmarks should measure the memory pressure under the same various load scenarios.\r\n\r\nThe service should be publishing Prometheus metrics, and the benchmark tests will use these metrics to validate that the service is operating as expected.\r\n\r\nGinkgo provides benchmarking capability through the _Measure_ DSL.\r\n\r\nhttps://onsi.github.io/ginkgo/#benchmark-tests\r\n\r\n\r\n*Given* a set of benchmark scenarios\r\n*When* developing the tests\r\n*Expect* each scenario to be run 10 times\r\n*Expect* the following scenarios\r\n#  1 RPS (request per second)\r\n#  10 RPS\r\n#  100 RPS\r\n#  1000 RPS\r\n\r\nhttps://github.com/prometheus/client_golang/blob/master/prometheus/go_collector.go#L33\r\n\r\n*Given* that every service should export standard Go Prometheus metrics\r\n*When* running the benchmarks\r\n*Expect* the following metrics to be queried \r\n* go_gc_duration_seconds\r\n* go_memstats_alloc_bytes\r\n* go_memstats_sys_bytes\r\n* go_memstats_lookups_total\r\n* go_memstats_mallocs_total\r\n* go_memstats_heap_alloc_bytes\r\n* go_memstats_heap_sys_bytes\r\n* go_memstats_heap_objects\r\n* go_memstats_stack_inuse_bytes\r\n\r\nhttps://github.com/grpc-ecosystem/go-grpc-prometheus/blob/master/server_metrics.go\r\n\r\n*Given* that every gRPC service should export standard gRPC metrics\r\n*When* running the benchmarks\r\n*Expect* the following metrics to be queried \r\n* grpc_server_started_total\r\n* grpc_server_handled_total\r\n* grpc_server_handling_seconds\r\n"
                    }
                  ]
                }
              ]
            }
          },
          {
            "expand": "operations,editmeta,changelog,transitions,renderedFields",
            "id": "204197",
            "self": "https://jira.carezen.local/rest/api/2/issue/204197",
            "key": "HP-1738",
            "fields": {
              "summary": "Create angular header ",
              "issuetype": {
                "self": "https://jira.carezen.local/rest/api/2/issuetype/3",
                "id": "3",
                "description": "A task that needs to be done.",
                "iconUrl": "https://jira.carezen.local/images/icons/issuetypes/task.png",
                "name": "Task",
                "subtask": false
              },
              "project": {
                "self": "https://jira.carezen.local/rest/api/2/project/11816",
                "id": "11816",
                "key": "HP",
                "name": "HomePay: Projects",
                "avatarUrls": {
                  "48x48": "https://jira.carezen.local/secure/projectavatar?avatarId=10011",
                  "24x24": "https://jira.carezen.local/secure/projectavatar?size=small&avatarId=10011",
                  "16x16": "https://jira.carezen.local/secure/projectavatar?size=xsmall&avatarId=10011",
                  "32x32": "https://jira.carezen.local/secure/projectavatar?size=medium&avatarId=10011"
                }
              },
              "labels": [
                "HP-UI"
              ]
            },
            "changelog": {
              "startAt": 0,
              "maxResults": 5,
              "total": 5,
              "histories": [
                {
                  "id": "1430271",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=brigitte.huneke",
                    "name": "brigitte.huneke",
                    "key": "brigitte.huneke",
                    "emailAddress": "brigitte.huneke@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Brigitte Huneke",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-04T17:03:08.000-0400",
                  "items": [
                    {
                      "field": "Epic Link",
                      "fieldtype": "custom",
                      "from": null,
                      "fromString": null,
                      "to": "204190",
                      "toString": "HP-1736"
                    }
                  ]
                },
                {
                  "id": "1430273",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=brigitte.huneke",
                    "name": "brigitte.huneke",
                    "key": "brigitte.huneke",
                    "emailAddress": "brigitte.huneke@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Brigitte Huneke",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-04T17:04:16.000-0400",
                  "items": [
                    {
                      "field": "status",
                      "fieldtype": "jira",
                      "from": "10022",
                      "fromString": "To Do",
                      "to": "10325",
                      "toString": "Design"
                    }
                  ]
                },
                {
                  "id": "1430994",
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
                  "created": "2018-04-05T10:56:42.000-0400",
                  "items": [
                    {
                      "field": "status",
                      "fieldtype": "jira",
                      "from": "10325",
                      "fromString": "Design",
                      "to": "10149",
                      "toString": "Development Ready"
                    }
                  ]
                },
                {
                  "id": "1431039",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=brigitte.huneke",
                    "name": "brigitte.huneke",
                    "key": "brigitte.huneke",
                    "emailAddress": "brigitte.huneke@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Brigitte Huneke",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-05T11:17:35.000-0400",
                  "items": [
                    {
                      "field": "description",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": "\r\nWHEN I visit https://github.mhp-int.com/MyHomePay/mobile-payroll-ui\r\nEXPECT \r\n* a new angular repo that has pattern-lib-clone integrated\r\n* with Jenkinsfile included\r\n\r\nWHEN you run ng serve\r\nEXPECT \r\n* to view a blank page with a header 50px in height on localhost:4200 (see attached wireframe)\r\n* the Care/HomePay logo to be centered in the middle (NEED SVG FROM CARE)\r\n* Care's hamburger menu icon should be in the left corner (22px height by 22px width)\r\n* Care's phone icon should be in the right corner and should call HomePay when clicked (22px height by 22px width)\r\n\r\nIncorporating icons: [http://dummy-data.carezen.local:3002/docs/icons]\r\n\r\n",
                      "to": null,
                      "toString": "WHEN I visit https://github.mhp-int.com/MyHomePay/mobile-payroll-ui\r\nEXPECT \r\n* a new angular repo that has pattern-lib-clone integrated\r\n* with Jenkinsfile included\r\n\r\nWHEN you run ng serve\r\nEXPECT \r\n* to view a blank page with a header 50px in height on localhost:4200 (see attached wireframe)\r\n* the Care/HomePay logo to be centered in the middle (NEED SVG FROM CARE)\r\n* Care's hamburger menu icon should be in the left corner (22px height by 22px width)\r\n* Care's phone icon should be in the right corner and should call HomePay when clicked (22px height by 22px width)\r\n\r\nIncorporating icons: [http://dummy-data.carezen.local:3002/docs/icons]\r\n\r\n"
                    },
                    {
                      "field": "Attachment",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": null,
                      "to": "218431",
                      "toString": "Screen Shot 2018-04-05 at 10.11.48 AM.png"
                    }
                  ]
                },
                {
                  "id": "1431343",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=brigitte.huneke",
                    "name": "brigitte.huneke",
                    "key": "brigitte.huneke",
                    "emailAddress": "brigitte.huneke@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Brigitte Huneke",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-05T18:03:32.000-0400",
                  "items": [
                    {
                      "field": "description",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": "WHEN I visit https://github.mhp-int.com/MyHomePay/mobile-payroll-ui\r\nEXPECT \r\n* a new angular repo that has pattern-lib-clone integrated\r\n* with Jenkinsfile included\r\n\r\nWHEN you run ng serve\r\nEXPECT \r\n* to view a blank page with a header 50px in height on localhost:4200 (see attached wireframe)\r\n* the Care/HomePay logo to be centered in the middle (NEED SVG FROM CARE)\r\n* Care's hamburger menu icon should be in the left corner (22px height by 22px width)\r\n* Care's phone icon should be in the right corner and should call HomePay when clicked (22px height by 22px width)\r\n\r\nIncorporating icons: [http://dummy-data.carezen.local:3002/docs/icons]\r\n\r\n",
                      "to": null,
                      "toString": "WHEN I visit https://github.mhp-int.com/MyHomePay/mobile-payroll-ui\r\nEXPECT \r\n* a new angular repo that has pattern-lib-clone integrated\r\n* with Jenkinsfile included\r\n\r\nWHEN you run ng serve\r\nEXPECT \r\n* to view a blank page with a header 50px in height on localhost:4200 (see attached wireframe)\r\n* [http://dummy-data.carezen.local:3002/components/detail/headers--default] should be used as a template\r\n* Care's phone icon should replace the search icon\r\n* HomePay Logo should replace Care logo if available\r\n\r\nIncorporating icons: [http://dummy-data.carezen.local:3002/docs/icons]\r\n\r\n"
                    }
                  ]
                }
              ]
            }
          },
          {
            "expand": "operations,editmeta,changelog,transitions,renderedFields",
            "id": "204192",
            "self": "https://jira.carezen.local/rest/api/2/issue/204192",
            "key": "HP-1737",
            "fields": {
              "summary": "Paycheck Hardening",
              "issuetype": {
                "self": "https://jira.carezen.local/rest/api/2/issuetype/19",
                "id": "19",
                "description": "A big user story that needs to be broken down.",
                "iconUrl": "https://jira.carezen.local/images/icons/issuetypes/epic.png",
                "name": "Epic",
                "subtask": false
              },
              "project": {
                "self": "https://jira.carezen.local/rest/api/2/project/11816",
                "id": "11816",
                "key": "HP",
                "name": "HomePay: Projects",
                "avatarUrls": {
                  "48x48": "https://jira.carezen.local/secure/projectavatar?avatarId=10011",
                  "24x24": "https://jira.carezen.local/secure/projectavatar?size=small&avatarId=10011",
                  "16x16": "https://jira.carezen.local/secure/projectavatar?size=xsmall&avatarId=10011",
                  "32x32": "https://jira.carezen.local/secure/projectavatar?size=medium&avatarId=10011"
                }
              },
              "labels": []
            },
            "changelog": {
              "startAt": 0,
              "maxResults": 1,
              "total": 1,
              "histories": [
                {
                  "id": "1430251",
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
                  "created": "2018-04-04T15:52:11.000-0400",
                  "items": [
                    {
                      "field": "status",
                      "fieldtype": "jira",
                      "from": "10022",
                      "fromString": "To Do",
                      "to": "10132",
                      "toString": "Discarded"
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
                }
              ]
            }
          },
          {
            "expand": "operations,editmeta,changelog,transitions,renderedFields",
            "id": "204190",
            "self": "https://jira.carezen.local/rest/api/2/issue/204190",
            "key": "HP-1736",
            "fields": {
              "summary": "Mobile Payroll UI Based on Newer Tech (e.g. Angular, Care Pattern Lib, etc.)",
              "issuetype": {
                "self": "https://jira.carezen.local/rest/api/2/issuetype/19",
                "id": "19",
                "description": "A big user story that needs to be broken down.",
                "iconUrl": "https://jira.carezen.local/images/icons/issuetypes/epic.png",
                "name": "Epic",
                "subtask": false
              },
              "project": {
                "self": "https://jira.carezen.local/rest/api/2/project/11816",
                "id": "11816",
                "key": "HP",
                "name": "HomePay: Projects",
                "avatarUrls": {
                  "48x48": "https://jira.carezen.local/secure/projectavatar?avatarId=10011",
                  "24x24": "https://jira.carezen.local/secure/projectavatar?size=small&avatarId=10011",
                  "16x16": "https://jira.carezen.local/secure/projectavatar?size=xsmall&avatarId=10011",
                  "32x32": "https://jira.carezen.local/secure/projectavatar?size=medium&avatarId=10011"
                }
              },
              "labels": [
                "HP-UI"
              ]
            },
            "changelog": {
              "startAt": 0,
              "maxResults": 4,
              "total": 4,
              "histories": [
                {
                  "id": "1430225",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=luis.sanchez",
                    "name": "luis.sanchez",
                    "key": "luis.sanchez",
                    "emailAddress": "luis.sanchez@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Luis Sanchez",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-04T15:49:16.000-0400",
                  "items": [
                    {
                      "field": "Epic Child",
                      "fieldtype": "custom",
                      "from": null,
                      "fromString": null,
                      "to": "204029",
                      "toString": "HP-1728"
                    }
                  ]
                },
                {
                  "id": "1430272",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=brigitte.huneke",
                    "name": "brigitte.huneke",
                    "key": "brigitte.huneke",
                    "emailAddress": "brigitte.huneke@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Brigitte Huneke",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-04T17:03:08.000-0400",
                  "items": [
                    {
                      "field": "Epic Child",
                      "fieldtype": "custom",
                      "from": null,
                      "fromString": null,
                      "to": "204197",
                      "toString": "HP-1738"
                    }
                  ]
                },
                {
                  "id": "1431114",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=luis.sanchez",
                    "name": "luis.sanchez",
                    "key": "luis.sanchez",
                    "emailAddress": "luis.sanchez@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Luis Sanchez",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-05T12:10:14.000-0400",
                  "items": [
                    {
                      "field": "Epic Child",
                      "fieldtype": "custom",
                      "from": null,
                      "fromString": null,
                      "to": "204299",
                      "toString": "HP-1742"
                    }
                  ]
                },
                {
                  "id": "1431310",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=brigitte.huneke",
                    "name": "brigitte.huneke",
                    "key": "brigitte.huneke",
                    "emailAddress": "brigitte.huneke@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Brigitte Huneke",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-05T16:29:21.000-0400",
                  "items": [
                    {
                      "field": "Epic Child",
                      "fieldtype": "custom",
                      "from": null,
                      "fromString": null,
                      "to": "204335",
                      "toString": "HP-1745"
                    }
                  ]
                }
              ]
            }
          },
          {
            "expand": "operations,editmeta,changelog,transitions,renderedFields",
            "id": "204181",
            "self": "https://jira.carezen.local/rest/api/2/issue/204181",
            "key": "HP-1735",
            "fields": {
              "summary": "9.1.18 - Configure Vault To Act As Certificate Authority",
              "issuetype": {
                "self": "https://jira.carezen.local/rest/api/2/issuetype/5",
                "id": "5",
                "description": "The sub-task of the issue",
                "iconUrl": "https://jira.carezen.local/images/icons/issuetypes/subtask_alternate.png",
                "name": "Sub-task",
                "subtask": true
              },
              "project": {
                "self": "https://jira.carezen.local/rest/api/2/project/11816",
                "id": "11816",
                "key": "HP",
                "name": "HomePay: Projects",
                "avatarUrls": {
                  "48x48": "https://jira.carezen.local/secure/projectavatar?avatarId=10011",
                  "24x24": "https://jira.carezen.local/secure/projectavatar?size=small&avatarId=10011",
                  "16x16": "https://jira.carezen.local/secure/projectavatar?size=xsmall&avatarId=10011",
                  "32x32": "https://jira.carezen.local/secure/projectavatar?size=medium&avatarId=10011"
                }
              },
              "labels": [
                "HP-NoVerifyNeeded",
                "HP-PayrollProcessing"
              ]
            },
            "changelog": {
              "startAt": 0,
              "maxResults": 6,
              "total": 6,
              "histories": [
                {
                  "id": "1430041",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=sean.schade",
                    "name": "sean.schade",
                    "key": "sean.shade",
                    "emailAddress": "sean.schade@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=sean.shade&avatarId=13606",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=sean.shade&avatarId=13606",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=sean.shade&avatarId=13606",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=sean.shade&avatarId=13606"
                    },
                    "displayName": "Sean Schade",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-04T14:47:18.000-0400",
                  "items": [
                    {
                      "field": "Component",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": null,
                      "to": "11350",
                      "toString": "Infrastructure"
                    }
                  ]
                },
                {
                  "id": "1430042",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=sean.schade",
                    "name": "sean.schade",
                    "key": "sean.shade",
                    "emailAddress": "sean.schade@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=sean.shade&avatarId=13606",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=sean.shade&avatarId=13606",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=sean.shade&avatarId=13606",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=sean.shade&avatarId=13606"
                    },
                    "displayName": "Sean Schade",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-04T14:47:31.000-0400",
                  "items": [
                    {
                      "field": "status",
                      "fieldtype": "jira",
                      "from": "10022",
                      "fromString": "To Do",
                      "to": "10325",
                      "toString": "Design"
                    }
                  ]
                },
                {
                  "id": "1430261",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=sean.schade",
                    "name": "sean.schade",
                    "key": "sean.shade",
                    "emailAddress": "sean.schade@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=sean.shade&avatarId=13606",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=sean.shade&avatarId=13606",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=sean.shade&avatarId=13606",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=sean.shade&avatarId=13606"
                    },
                    "displayName": "Sean Schade",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-04T16:13:34.000-0400",
                  "items": [
                    {
                      "field": "assignee",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": null,
                      "to": "sean.shade",
                      "toString": "Sean Schade"
                    }
                  ]
                },
                {
                  "id": "1430262",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=sean.schade",
                    "name": "sean.schade",
                    "key": "sean.shade",
                    "emailAddress": "sean.schade@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=sean.shade&avatarId=13606",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=sean.shade&avatarId=13606",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=sean.shade&avatarId=13606",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=sean.shade&avatarId=13606"
                    },
                    "displayName": "Sean Schade",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-04T16:13:39.000-0400",
                  "items": [
                    {
                      "field": "status",
                      "fieldtype": "jira",
                      "from": "10325",
                      "fromString": "Design",
                      "to": "10326",
                      "toString": "Design Done"
                    }
                  ]
                },
                {
                  "id": "1430263",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=sean.schade",
                    "name": "sean.schade",
                    "key": "sean.shade",
                    "emailAddress": "sean.schade@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=sean.shade&avatarId=13606",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=sean.shade&avatarId=13606",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=sean.shade&avatarId=13606",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=sean.shade&avatarId=13606"
                    },
                    "displayName": "Sean Schade",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-04T16:13:46.000-0400",
                  "items": [
                    {
                      "field": "status",
                      "fieldtype": "jira",
                      "from": "10326",
                      "fromString": "Design Done",
                      "to": "10149",
                      "toString": "Development Ready"
                    }
                  ]
                },
                {
                  "id": "1430264",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=sean.schade",
                    "name": "sean.schade",
                    "key": "sean.shade",
                    "emailAddress": "sean.schade@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=sean.shade&avatarId=13606",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=sean.shade&avatarId=13606",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=sean.shade&avatarId=13606",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=sean.shade&avatarId=13606"
                    },
                    "displayName": "Sean Schade",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-04T16:14:17.000-0400",
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
                }
              ]
            }
          },
          {
            "expand": "operations,editmeta,changelog,transitions,renderedFields",
            "id": "204150",
            "self": "https://jira.carezen.local/rest/api/2/issue/204150",
            "key": "HP-1734",
            "fields": {
              "summary": "9.1.17 - Create Go protobuf builder  jenkins-slave-go-proto",
              "issuetype": {
                "self": "https://jira.carezen.local/rest/api/2/issuetype/5",
                "id": "5",
                "description": "The sub-task of the issue",
                "iconUrl": "https://jira.carezen.local/images/icons/issuetypes/subtask_alternate.png",
                "name": "Sub-task",
                "subtask": true
              },
              "project": {
                "self": "https://jira.carezen.local/rest/api/2/project/11816",
                "id": "11816",
                "key": "HP",
                "name": "HomePay: Projects",
                "avatarUrls": {
                  "48x48": "https://jira.carezen.local/secure/projectavatar?avatarId=10011",
                  "24x24": "https://jira.carezen.local/secure/projectavatar?size=small&avatarId=10011",
                  "16x16": "https://jira.carezen.local/secure/projectavatar?size=xsmall&avatarId=10011",
                  "32x32": "https://jira.carezen.local/secure/projectavatar?size=medium&avatarId=10011"
                }
              },
              "labels": [
                "HP-NoVerifyNeeded",
                "HP-PayrollProcessing"
              ]
            },
            "changelog": {
              "startAt": 0,
              "maxResults": 5,
              "total": 5,
              "histories": [
                {
                  "id": "1429909",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=sean.schade",
                    "name": "sean.schade",
                    "key": "sean.shade",
                    "emailAddress": "sean.schade@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=sean.shade&avatarId=13606",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=sean.shade&avatarId=13606",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=sean.shade&avatarId=13606",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=sean.shade&avatarId=13606"
                    },
                    "displayName": "Sean Schade",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-04T12:46:07.000-0400",
                  "items": [
                    {
                      "field": "status",
                      "fieldtype": "jira",
                      "from": "10022",
                      "fromString": "To Do",
                      "to": "10325",
                      "toString": "Design"
                    }
                  ]
                },
                {
                  "id": "1429910",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=sean.schade",
                    "name": "sean.schade",
                    "key": "sean.shade",
                    "emailAddress": "sean.schade@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=sean.shade&avatarId=13606",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=sean.shade&avatarId=13606",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=sean.shade&avatarId=13606",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=sean.shade&avatarId=13606"
                    },
                    "displayName": "Sean Schade",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-04T12:46:47.000-0400",
                  "items": [
                    {
                      "field": "labels",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": "",
                      "to": null,
                      "toString": "HP-NoVerifyNeeded HP-PayrollProcessing"
                    }
                  ]
                },
                {
                  "id": "1429913",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=sean.schade",
                    "name": "sean.schade",
                    "key": "sean.shade",
                    "emailAddress": "sean.schade@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=sean.shade&avatarId=13606",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=sean.shade&avatarId=13606",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=sean.shade&avatarId=13606",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=sean.shade&avatarId=13606"
                    },
                    "displayName": "Sean Schade",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-04T12:48:22.000-0400",
                  "items": [
                    {
                      "field": "Parent",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": null,
                      "to": "198927",
                      "toString": "HP-1601"
                    },
                    {
                      "field": "issuetype",
                      "fieldtype": "jira",
                      "from": "3",
                      "fromString": "Task",
                      "to": "5",
                      "toString": "Sub-task"
                    }
                  ]
                },
                {
                  "id": "1429914",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=sean.schade",
                    "name": "sean.schade",
                    "key": "sean.shade",
                    "emailAddress": "sean.schade@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=sean.shade&avatarId=13606",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=sean.shade&avatarId=13606",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=sean.shade&avatarId=13606",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=sean.shade&avatarId=13606"
                    },
                    "displayName": "Sean Schade",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-04T12:48:49.000-0400",
                  "items": [
                    {
                      "field": "summary",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": "9.1.15 - Create Go protobuf builder  jenkins-slave-go-proto",
                      "to": null,
                      "toString": "9.1.17 - Create Go protobuf builder  jenkins-slave-go-proto"
                    }
                  ]
                },
                {
                  "id": "1431026",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=eric.adams",
                    "name": "eric.adams",
                    "key": "eric.adams",
                    "emailAddress": "Eric.Adams@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Eric Adams",
                    "active": true,
                    "timeZone": "America/New_York"
                  },
                  "created": "2018-04-05T11:10:30.000-0400",
                  "items": [
                    {
                      "field": "status",
                      "fieldtype": "jira",
                      "from": "10325",
                      "fromString": "Design",
                      "to": "10326",
                      "toString": "Design Done"
                    }
                  ]
                }
              ]
            }
          },
          {
            "expand": "operations,editmeta,changelog,transitions,renderedFields",
            "id": "204129",
            "self": "https://jira.carezen.local/rest/api/2/issue/204129",
            "key": "HP-1733",
            "fields": {
              "summary": "9.1.16 - Create Jenkinsfile and Build Pipeline for Money Movement Project",
              "issuetype": {
                "self": "https://jira.carezen.local/rest/api/2/issuetype/5",
                "id": "5",
                "description": "The sub-task of the issue",
                "iconUrl": "https://jira.carezen.local/images/icons/issuetypes/subtask_alternate.png",
                "name": "Sub-task",
                "subtask": true
              },
              "project": {
                "self": "https://jira.carezen.local/rest/api/2/project/11816",
                "id": "11816",
                "key": "HP",
                "name": "HomePay: Projects",
                "avatarUrls": {
                  "48x48": "https://jira.carezen.local/secure/projectavatar?avatarId=10011",
                  "24x24": "https://jira.carezen.local/secure/projectavatar?size=small&avatarId=10011",
                  "16x16": "https://jira.carezen.local/secure/projectavatar?size=xsmall&avatarId=10011",
                  "32x32": "https://jira.carezen.local/secure/projectavatar?size=medium&avatarId=10011"
                }
              },
              "labels": [
                "HP-NoVerifyNeeded",
                "HP-PayrollProcessing"
              ]
            },
            "changelog": {
              "startAt": 0,
              "maxResults": 2,
              "total": 2,
              "histories": [
                {
                  "id": "1429598",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=sean.schade",
                    "name": "sean.schade",
                    "key": "sean.shade",
                    "emailAddress": "sean.schade@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=sean.shade&avatarId=13606",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=sean.shade&avatarId=13606",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=sean.shade&avatarId=13606",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=sean.shade&avatarId=13606"
                    },
                    "displayName": "Sean Schade",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-04T10:20:29.000-0400",
                  "items": [
                    {
                      "field": "description",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": "*GIVEN* that distributed tracing is essential to operating distributed systems with confidence\r\n*WHEN* developing the _payment-instruction-publisher_\r\n*EXPECT* that calls to the grpc endpoints create a span and push it to [Jaeger|https://jaeger.readthedocs.io/en/latest/]\r\n* https://github.com/grpc-ecosystem/grpc-opentracing/tree/master/go/otgrpc\r\n** Provides an interceptor for automatically creating a span around grpc endpoint calls\r\n\r\n*GIVEN* that Jaeger has been deployed using the updated {{hashistack.nomad}} file and grpc calls are creating spans\r\n*WHEN* {{debug}} level logging is enabled\r\n*EXPECT* span data to show up in log files (nomad log window)\r\n* This will most likely require a small wrapper around {{logrus}} so that it implements the jaeger logger interface. Good example code: https://github.com/jaegertracing/jaeger-client-go/blob/master/config/example_test.go#L49\r\n\r\n*Given* that opentracing will be used for debugging\r\n*When* creating spans\r\n*Expect* consistent field naming to be used\r\n** {{account.ID}}\r\n** {{instrument.ID}}\r\n** {{nats.messageID}}\r\n** {{payment.event}}\r\n** {{payment.event.type}}\r\n",
                      "to": null,
                      "toString": "*Given* that _money-movment_ is a monorepo \r\n*And* has multiple, discrete deployment artifacts\r\n*When* defining the build pipeline\r\n*Expect* the job to detect changes in individual projects; ie _payment-instruction-publisher_\r\n*Expect* the build to only include artifacts that have changed\r\n\r\nAdditional requirements to be determined..."
                    }
                  ]
                },
                {
                  "id": "1429599",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=sean.schade",
                    "name": "sean.schade",
                    "key": "sean.shade",
                    "emailAddress": "sean.schade@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=sean.shade&avatarId=13606",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=sean.shade&avatarId=13606",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=sean.shade&avatarId=13606",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=sean.shade&avatarId=13606"
                    },
                    "displayName": "Sean Schade",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-04T10:20:35.000-0400",
                  "items": [
                    {
                      "field": "status",
                      "fieldtype": "jira",
                      "from": "10022",
                      "fromString": "To Do",
                      "to": "10325",
                      "toString": "Design"
                    }
                  ]
                }
              ]
            }
          },
          {
            "expand": "operations,editmeta,changelog,transitions,renderedFields",
            "id": "204042",
            "self": "https://jira.carezen.local/rest/api/2/issue/204042",
            "key": "HP-1732",
            "fields": {
              "summary": "Modify header/footer for mobile payroll ui",
              "issuetype": {
                "self": "https://jira.carezen.local/rest/api/2/issuetype/20",
                "id": "20",
                "description": "A user story",
                "iconUrl": "https://jira.carezen.local/images/icons/issuetypes/story.png",
                "name": "Story",
                "subtask": false
              },
              "project": {
                "self": "https://jira.carezen.local/rest/api/2/project/11816",
                "id": "11816",
                "key": "HP",
                "name": "HomePay: Projects",
                "avatarUrls": {
                  "48x48": "https://jira.carezen.local/secure/projectavatar?avatarId=10011",
                  "24x24": "https://jira.carezen.local/secure/projectavatar?size=small&avatarId=10011",
                  "16x16": "https://jira.carezen.local/secure/projectavatar?size=xsmall&avatarId=10011",
                  "32x32": "https://jira.carezen.local/secure/projectavatar?size=medium&avatarId=10011"
                }
              },
              "labels": [
                "HP-UI"
              ]
            },
            "changelog": {
              "startAt": 0,
              "maxResults": 4,
              "total": 4,
              "histories": [
                {
                  "id": "1428785",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=brigitte.huneke",
                    "name": "brigitte.huneke",
                    "key": "brigitte.huneke",
                    "emailAddress": "brigitte.huneke@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Brigitte Huneke",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-03T16:36:37.000-0400",
                  "items": [
                    {
                      "field": "description",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": "CONTEXT\r\nThis ticket is to make the style of mobile PAYROLL MANAGER functional and legible. \r\n\r\nGIVEN Bootstrap has been integrated into the Payroll Manager page of BIS\r\nAND elements have been reordered when collapsed in mobile view\r\nTHEN resize and rework individual elements so that they are legible and functional for users on mobile devices (see wireframes for guiding example)\r\n\r\nNote: \r\n* The header/footer changes are out of scope for this card.\r\n\r\nLAYOUT SPECIFICS\r\n\r\n* All links/buttons/icons that are currently clickable in the desktop view should remain clickable and work with touch screens.\r\n* Buttons should ideally be a minimum of 60px wide to ensure they can be clicked by user.\r\n* The sub-tabs below the header are existing elements that should be centered in mobile view to take up the width of the screen. \r\n(Note that Payroll Manager is the only page being refactored and the Payroll History and Pay Stubs tabs would take the user back to the BIS experience that already exists.)\r\n* The Payroll Entry and Paycheck tables are to be stacked vertically and each should take up the entire width of the screen in mobile view. The font size for the type inside the table may need to be smaller for everything to fit in one row on the smaller screen, but should be as large as possible for legibility.\r\n* It looks like the existing header font sizes will work for mobile with the exception of Paycheck Preview, which should be smaller to match.\r\n\r\n\r\n\r\nInvision protoype (will expire, but pdfs are attached): https://invis.io/RHGLXT2VSJG",
                      "to": null,
                      "toString": "In BIS UI,\r\n\r\nGIVEN Bootstrap has been integrated into the Payroll Manager page of BIS\r\nAND elements have been reordered and restyled in mobile view\r\nTHEN rework the header to display the care/homepay logo and homepay phone number \r\nAND rework the footer to stack the icons over and text and enlarge the phone and email icons\r\n(see wireframes for guiding example)\r\n\r\nNote: Links to social media, phone number, and email should all remain functional\r\n\r\nInvision protoype (will expire, but pdfs are attached): https://invis.io/RHGLXT2VSJG"
                    }
                  ]
                },
                {
                  "id": "1428786",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=brigitte.huneke",
                    "name": "brigitte.huneke",
                    "key": "brigitte.huneke",
                    "emailAddress": "brigitte.huneke@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Brigitte Huneke",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-03T16:36:43.000-0400",
                  "items": [
                    {
                      "field": "status",
                      "fieldtype": "jira",
                      "from": "10022",
                      "fromString": "To Do",
                      "to": "10326",
                      "toString": "Design Done"
                    }
                  ]
                },
                {
                  "id": "1428901",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=brigitte.huneke",
                    "name": "brigitte.huneke",
                    "key": "brigitte.huneke",
                    "emailAddress": "brigitte.huneke@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Brigitte Huneke",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-03T17:35:16.000-0400",
                  "items": [
                    {
                      "field": "Epic Link",
                      "fieldtype": "custom",
                      "from": null,
                      "fromString": null,
                      "to": "166620",
                      "toString": "HP-829"
                    }
                  ]
                },
                {
                  "id": "1429933",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=luis.sanchez",
                    "name": "luis.sanchez",
                    "key": "luis.sanchez",
                    "emailAddress": "luis.sanchez@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Luis Sanchez",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-04T13:00:59.000-0400",
                  "items": [
                    {
                      "field": "description",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": "In BIS UI,\r\n\r\nGIVEN Bootstrap has been integrated into the Payroll Manager page of BIS\r\nAND elements have been reordered and restyled in mobile view\r\nTHEN rework the header to display the care/homepay logo and homepay phone number \r\nAND rework the footer to stack the icons over and text and enlarge the phone and email icons\r\n(see wireframes for guiding example)\r\n\r\nNote: Links to social media, phone number, and email should all remain functional\r\n\r\nInvision protoype (will expire, but pdfs are attached): https://invis.io/RHGLXT2VSJG",
                      "to": null,
                      "toString": "In BIS UI,\r\n\r\n*GIVEN* Bootstrap has been integrated into the Payroll Manager page of BIS\r\n*AND* elements have been reordered and restyled in mobile view\r\n*THEN*\r\n* rework the header to display the care/homepay logo and homepay phone number (see wireframes for guiding example)\r\n* rework the footer to stack the icons over and text and enlarge the phone and email icons\r\n(see wireframes for guiding example)\r\n\r\nNote: Links to social media, phone number, and email should all remain functional\r\n\r\nInvision protoype (will expire, but pdfs are attached): https://invis.io/RHGLXT2VSJG"
                    }
                  ]
                }
              ]
            }
          },
          {
            "expand": "operations,editmeta,changelog,transitions,renderedFields",
            "id": "204037",
            "self": "https://jira.carezen.local/rest/api/2/issue/204037",
            "key": "HP-1731",
            "fields": {
              "summary": "Utilize Bootstrap hamburger menu for payroll manager menu items",
              "issuetype": {
                "self": "https://jira.carezen.local/rest/api/2/issuetype/20",
                "id": "20",
                "description": "A user story",
                "iconUrl": "https://jira.carezen.local/images/icons/issuetypes/story.png",
                "name": "Story",
                "subtask": false
              },
              "project": {
                "self": "https://jira.carezen.local/rest/api/2/project/11816",
                "id": "11816",
                "key": "HP",
                "name": "HomePay: Projects",
                "avatarUrls": {
                  "48x48": "https://jira.carezen.local/secure/projectavatar?avatarId=10011",
                  "24x24": "https://jira.carezen.local/secure/projectavatar?size=small&avatarId=10011",
                  "16x16": "https://jira.carezen.local/secure/projectavatar?size=xsmall&avatarId=10011",
                  "32x32": "https://jira.carezen.local/secure/projectavatar?size=medium&avatarId=10011"
                }
              },
              "labels": [
                "HP-UI"
              ]
            },
            "changelog": {
              "startAt": 0,
              "maxResults": 4,
              "total": 4,
              "histories": [
                {
                  "id": "1428700",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=luis.sanchez",
                    "name": "luis.sanchez",
                    "key": "luis.sanchez",
                    "emailAddress": "luis.sanchez@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Luis Sanchez",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-03T16:08:29.000-0400",
                  "items": [
                    {
                      "field": "description",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": "CONTEXT\r\nThis ticket is to make the existing client-facing PAYROLL MANAGER page responsive using Bootstrap ([https://getbootstrap.com/docs/4.0/getting-started/introduction/]), which should have already been integrated in HP-1715. \r\n\r\nGIVEN Bootstrap has been integrated into the Payroll Manager page of BIS\r\nWHEN the page is viewed on a device smaller than 768 pixels\r\nTHEN all existing elements should collapse and be reordered to match the flow of the attached wireframes using the bootstrap grid\r\n\r\nNote: \r\n* The header/footer changes and work for resizing elements are out of scope for this card (i.e. The UI doesn't have to look perfect, as long as the proper followup cards are created to improve the UI where needed).\r\n\r\nInvision protoype (will expire, but pdfs are attached): https://invis.io/RHGLXT2VSJG",
                      "to": null,
                      "toString": "CONTEXT\r\nThis ticket is to make the existing client-facing PAYROLL MANAGER page responsive using Bootstrap ([https://getbootstrap.com/docs/4.0/getting-started/introduction/]), which should have already been integrated in HP-1715. \r\n\r\n*GIVEN* Bootstrap has been integrated into the Payroll Manager page of BIS\r\n*WHEN* the Payroll Manager page is viewed on a device smaller than 768 pixels\r\n*THEN*\r\n* All existing menu items should collapse into a hamburger menu\r\n* The hamburger menu is *ONLY* available on the Payroll Manager page\r\n* Clicking on any other menu item from the Payroll Manager hamburger menu will take you back to a non-responsive BIS page.\r\n\r\nInvision protoype (will expire, but pdfs are attached): https://invis.io/RHGLXT2VSJG"
                    }
                  ]
                },
                {
                  "id": "1428701",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=luis.sanchez",
                    "name": "luis.sanchez",
                    "key": "luis.sanchez",
                    "emailAddress": "luis.sanchez@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Luis Sanchez",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-03T16:08:49.000-0400",
                  "items": [
                    {
                      "field": "summary",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": "Utilize bootstrap hamburger menu for payroll manager menu items",
                      "to": null,
                      "toString": "Utilize Bootstrap hamburger menu for payroll manager menu items"
                    }
                  ]
                },
                {
                  "id": "1428722",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=brigitte.huneke",
                    "name": "brigitte.huneke",
                    "key": "brigitte.huneke",
                    "emailAddress": "brigitte.huneke@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Brigitte Huneke",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-03T16:19:43.000-0400",
                  "items": [
                    {
                      "field": "status",
                      "fieldtype": "jira",
                      "from": "10022",
                      "fromString": "To Do",
                      "to": "10326",
                      "toString": "Design Done"
                    }
                  ]
                },
                {
                  "id": "1428899",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=brigitte.huneke",
                    "name": "brigitte.huneke",
                    "key": "brigitte.huneke",
                    "emailAddress": "brigitte.huneke@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Brigitte Huneke",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-03T17:35:01.000-0400",
                  "items": [
                    {
                      "field": "Epic Link",
                      "fieldtype": "custom",
                      "from": null,
                      "fromString": null,
                      "to": "166620",
                      "toString": "HP-829"
                    }
                  ]
                }
              ]
            }
          },
          {
            "expand": "operations,editmeta,changelog,transitions,renderedFields",
            "id": "204033",
            "self": "https://jira.carezen.local/rest/api/2/issue/204033",
            "key": "HP-1730",
            "fields": {
              "summary": "Resize UI elements as shown in wireframes",
              "issuetype": {
                "self": "https://jira.carezen.local/rest/api/2/issuetype/20",
                "id": "20",
                "description": "A user story",
                "iconUrl": "https://jira.carezen.local/images/icons/issuetypes/story.png",
                "name": "Story",
                "subtask": false
              },
              "project": {
                "self": "https://jira.carezen.local/rest/api/2/project/11816",
                "id": "11816",
                "key": "HP",
                "name": "HomePay: Projects",
                "avatarUrls": {
                  "48x48": "https://jira.carezen.local/secure/projectavatar?avatarId=10011",
                  "24x24": "https://jira.carezen.local/secure/projectavatar?size=small&avatarId=10011",
                  "16x16": "https://jira.carezen.local/secure/projectavatar?size=xsmall&avatarId=10011",
                  "32x32": "https://jira.carezen.local/secure/projectavatar?size=medium&avatarId=10011"
                }
              },
              "labels": [
                "HP-UI"
              ]
            },
            "changelog": {
              "startAt": 0,
              "maxResults": 3,
              "total": 3,
              "histories": [
                {
                  "id": "1428712",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=brigitte.huneke",
                    "name": "brigitte.huneke",
                    "key": "brigitte.huneke",
                    "emailAddress": "brigitte.huneke@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Brigitte Huneke",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-03T16:16:39.000-0400",
                  "items": [
                    {
                      "field": "description",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": "CONTEXT\r\nThis ticket is to make the existing client-facing PAYROLL MANAGER page responsive using Bootstrap ([https://getbootstrap.com/docs/4.0/getting-started/introduction/]), which should have already been integrated in HP-1715. \r\n\r\nGIVEN Bootstrap has been integrated into the Payroll Manager page of BIS\r\nWHEN the page is viewed on a device smaller than 768 pixels\r\nTHEN all existing elements should collapse and be reordered to match the flow of the attached wireframes using the bootstrap grid\r\n\r\nNote: \r\n* The header/footer changes and work for resizing elements are out of scope for this card.\r\n\r\nInvision protoype (will expire, but pdfs are attached): https://invis.io/RHGLXT2VSJG",
                      "to": null,
                      "toString": "CONTEXT\r\nThis ticket is to make the style of mobile PAYROLL MANAGER functional and legible. \r\n\r\nGIVEN Bootstrap has been integrated into the Payroll Manager page of BIS\r\nAND elements have been reordered when collapsed in mobile view\r\nTHEN resize and rework individual elements so that they are legible and functional for users on mobile devices (see wireframes for guiding example)\r\n\r\nNote: \r\n* The header/footer changes are out of scope for this card.\r\n\r\nLAYOUT SPECIFICS\r\n\r\n* All links/buttons/icons that are currently clickable in the desktop view should remain clickable and work with touch screens.\r\n* Buttons should ideally be a minimum of 60px wide to ensure they can be clicked by user.\r\n* The sub-tabs below the header are existing elements that should be centered in mobile view to take up the width of the screen. \r\n(Note that Payroll Manager is the only page being refactored and the Payroll History and Pay Stubs tabs would take the user back to the BIS experience that already exists.)\r\n* The Payroll Entry and Paycheck tables are to be stacked vertically and each should take up the entire width of the screen in mobile view. The font size for the type inside the table may need to be smaller for everything to fit in one row on the smaller screen, but should be as large as possible for legibility.\r\n* It looks like the existing header font sizes will work for mobile with the exception of Paycheck Preview, which should be smaller to match.\r\n\r\n\r\n\r\nInvision protoype (will expire, but pdfs are attached): https://invis.io/RHGLXT2VSJG"
                    }
                  ]
                },
                {
                  "id": "1428723",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=brigitte.huneke",
                    "name": "brigitte.huneke",
                    "key": "brigitte.huneke",
                    "emailAddress": "brigitte.huneke@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Brigitte Huneke",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-03T16:19:47.000-0400",
                  "items": [
                    {
                      "field": "status",
                      "fieldtype": "jira",
                      "from": "10022",
                      "fromString": "To Do",
                      "to": "10326",
                      "toString": "Design Done"
                    }
                  ]
                },
                {
                  "id": "1428897",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=brigitte.huneke",
                    "name": "brigitte.huneke",
                    "key": "brigitte.huneke",
                    "emailAddress": "brigitte.huneke@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Brigitte Huneke",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-03T17:34:30.000-0400",
                  "items": [
                    {
                      "field": "Epic Link",
                      "fieldtype": "custom",
                      "from": null,
                      "fromString": null,
                      "to": "166620",
                      "toString": "HP-829"
                    }
                  ]
                }
              ]
            }
          },
          {
            "expand": "operations,editmeta,changelog,transitions,renderedFields",
            "id": "204030",
            "self": "https://jira.carezen.local/rest/api/2/issue/204030",
            "key": "HP-1729",
            "fields": {
              "summary": "Utilize bootstrap grid to layout mobile pages",
              "issuetype": {
                "self": "https://jira.carezen.local/rest/api/2/issuetype/20",
                "id": "20",
                "description": "A user story",
                "iconUrl": "https://jira.carezen.local/images/icons/issuetypes/story.png",
                "name": "Story",
                "subtask": false
              },
              "project": {
                "self": "https://jira.carezen.local/rest/api/2/project/11816",
                "id": "11816",
                "key": "HP",
                "name": "HomePay: Projects",
                "avatarUrls": {
                  "48x48": "https://jira.carezen.local/secure/projectavatar?avatarId=10011",
                  "24x24": "https://jira.carezen.local/secure/projectavatar?size=small&avatarId=10011",
                  "16x16": "https://jira.carezen.local/secure/projectavatar?size=xsmall&avatarId=10011",
                  "32x32": "https://jira.carezen.local/secure/projectavatar?size=medium&avatarId=10011"
                }
              },
              "labels": [
                "HP-UI"
              ]
            },
            "changelog": {
              "startAt": 0,
              "maxResults": 4,
              "total": 4,
              "histories": [
                {
                  "id": "1428432",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=brigitte.huneke",
                    "name": "brigitte.huneke",
                    "key": "brigitte.huneke",
                    "emailAddress": "brigitte.huneke@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Brigitte Huneke",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-03T15:06:08.000-0400",
                  "items": [
                    {
                      "field": "description",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": "CONTEXT\r\nThis ticket is to make the existing client-facing PAYROLL MANAGER page responsive using Bootstrap ([https://getbootstrap.com/docs/4.0/getting-started/introduction/]), so that it can be accessed and edited on mobile devices. \r\n\r\nTHINGS TO NOTE\r\n* The PDFs attached show the desired layout for the mobile views.\r\n* The views should appear for the user when their screen is smaller than 768px.\r\n* All elements shown in the PDFs (with the exception of the hamburger menu) exist on the desktop version, but will be reorganized and resized for smaller screen.\r\n* All links/buttons/icons that are currently clickable in the desktop view should remain clickable and work with touch screens.\r\n\r\nLAYOUT SPECIFICS\r\n* The header needs to be refactored to collapse to hamburger menu and to show a list view of tabs when clicked\r\n* The sub-tabs below the header are existing elements that should be centered in mobile view to take up the width of the screen. Note that Payroll Manager is the only page being refactored and the Payroll History and Pay Stubs tabs would take the user back to the BIS experience that already exists.\r\n* The Payroll Entry and Paycheck tables are to be stacked vertically and each should take up the entire width of the screen in mobile view. The font size for the type inside the table may need to be smaller for everything to fit in one row on the smaller screen, but should be as large as possible for legibility.\r\n* Footer should be more condensed in mobile view, with the phone and email icons aligning with other icons.\r\n* It looks like the existing header font sizes will work for mobile with the exception of Paycheck Preview, which should be smaller to match.\r\n* Buttons should ideally be a minimum of 60px wide to ensure they can be clicked by user.\r\n\r\nNew Client Site layout should be created (new master-page with twitter-bootstrap and jQuery attached)\r\n* See attached pdfs and/or Invision link for desired page organization\r\n* jQuery and bootstrap shouldn't be added via NuGet - it should be a linked script/resource\r\n* menu should be reworked so that it should use bootstrap classes\r\n* header and footer should be reworked so that it should use bootstrap classes\r\n* after that, all the pages should be reviewed (some of them may be tuned)\r\n\r\nsome useful links (HowTo)\r\nhttp://www.mytecbits.com/microsoft/dot-net/bootstrap-3-0-0-with-asp-net-web-forms\r\nhttp://www.mytecbits.com/microsoft/dot-net/how-to-add-bootstrap-in-asp-net\r\n\r\nInvision protoype (will expire, but pdfs are attached): https://invis.io/RHGLXT2VSJG",
                      "to": null,
                      "toString": "CONTEXT\r\nThis ticket is to make the existing client-facing PAYROLL MANAGER page responsive using Bootstrap ([https://getbootstrap.com/docs/4.0/getting-started/introduction/]), which should have already been integrated in HP-1715. \r\n\r\nGIVEN Bootstrap has been integrated into the Payroll Manager page of BIS\r\nWHEN the page is viewed on a device smaller than 768 pixels\r\nTHEN all existing elements should collapse and be reordered to match the flow of the attached wireframes using the bootstrap grid\r\n\r\nNote: \r\n* The header/footer changes and work for resizing elements are out of scope for this card.\r\n\r\nInvision protoype (will expire, but pdfs are attached): https://invis.io/RHGLXT2VSJG"
                    },
                    {
                      "field": "assignee",
                      "fieldtype": "jira",
                      "from": "iryna.kutsakova",
                      "fromString": "Iryna Kutsakova",
                      "to": null,
                      "toString": null
                    }
                  ]
                },
                {
                  "id": "1428439",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=luis.sanchez",
                    "name": "luis.sanchez",
                    "key": "luis.sanchez",
                    "emailAddress": "luis.sanchez@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Luis Sanchez",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-03T15:10:52.000-0400",
                  "items": [
                    {
                      "field": "description",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": "CONTEXT\r\nThis ticket is to make the existing client-facing PAYROLL MANAGER page responsive using Bootstrap ([https://getbootstrap.com/docs/4.0/getting-started/introduction/]), which should have already been integrated in HP-1715. \r\n\r\nGIVEN Bootstrap has been integrated into the Payroll Manager page of BIS\r\nWHEN the page is viewed on a device smaller than 768 pixels\r\nTHEN all existing elements should collapse and be reordered to match the flow of the attached wireframes using the bootstrap grid\r\n\r\nNote: \r\n* The header/footer changes and work for resizing elements are out of scope for this card.\r\n\r\nInvision protoype (will expire, but pdfs are attached): https://invis.io/RHGLXT2VSJG",
                      "to": null,
                      "toString": "CONTEXT\r\nThis ticket is to make the existing client-facing PAYROLL MANAGER page responsive using Bootstrap ([https://getbootstrap.com/docs/4.0/getting-started/introduction/]), which should have already been integrated in HP-1715. \r\n\r\nGIVEN Bootstrap has been integrated into the Payroll Manager page of BIS\r\nWHEN the page is viewed on a device smaller than 768 pixels\r\nTHEN all existing elements should collapse and be reordered to match the flow of the attached wireframes using the bootstrap grid\r\n\r\nNote: \r\n* The header/footer changes and work for resizing elements are out of scope for this card (i.e. The UI doesn't have to look perfect, as long as the proper followup cards are created to improve the UI where needed).\r\n\r\nInvision protoype (will expire, but pdfs are attached): https://invis.io/RHGLXT2VSJG"
                    }
                  ]
                },
                {
                  "id": "1428486",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=luis.sanchez",
                    "name": "luis.sanchez",
                    "key": "luis.sanchez",
                    "emailAddress": "luis.sanchez@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Luis Sanchez",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-03T15:21:32.000-0400",
                  "items": [
                    {
                      "field": "status",
                      "fieldtype": "jira",
                      "from": "10022",
                      "fromString": "To Do",
                      "to": "10326",
                      "toString": "Design Done"
                    }
                  ]
                },
                {
                  "id": "1428893",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=brigitte.huneke",
                    "name": "brigitte.huneke",
                    "key": "brigitte.huneke",
                    "emailAddress": "brigitte.huneke@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Brigitte Huneke",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-03T17:33:19.000-0400",
                  "items": [
                    {
                      "field": "Epic Link",
                      "fieldtype": "custom",
                      "from": null,
                      "fromString": null,
                      "to": "166620",
                      "toString": "HP-829"
                    }
                  ]
                }
              ]
            }
          },
          {
            "expand": "operations,editmeta,changelog,transitions,renderedFields",
            "id": "204029",
            "self": "https://jira.carezen.local/rest/api/2/issue/204029",
            "key": "HP-1728",
            "fields": {
              "summary": "Dockerize angular-seed project",
              "issuetype": {
                "self": "https://jira.carezen.local/rest/api/2/issuetype/3",
                "id": "3",
                "description": "A task that needs to be done.",
                "iconUrl": "https://jira.carezen.local/images/icons/issuetypes/task.png",
                "name": "Task",
                "subtask": false
              },
              "project": {
                "self": "https://jira.carezen.local/rest/api/2/project/11816",
                "id": "11816",
                "key": "HP",
                "name": "HomePay: Projects",
                "avatarUrls": {
                  "48x48": "https://jira.carezen.local/secure/projectavatar?avatarId=10011",
                  "24x24": "https://jira.carezen.local/secure/projectavatar?size=small&avatarId=10011",
                  "16x16": "https://jira.carezen.local/secure/projectavatar?size=xsmall&avatarId=10011",
                  "32x32": "https://jira.carezen.local/secure/projectavatar?size=medium&avatarId=10011"
                }
              },
              "labels": [
                "HP-UI"
              ]
            },
            "changelog": {
              "startAt": 0,
              "maxResults": 7,
              "total": 7,
              "histories": [
                {
                  "id": "1428280",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=luis.sanchez",
                    "name": "luis.sanchez",
                    "key": "luis.sanchez",
                    "emailAddress": "luis.sanchez@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Luis Sanchez",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-03T14:44:43.000-0400",
                  "items": [
                    {
                      "field": "Epic Link",
                      "fieldtype": "custom",
                      "from": null,
                      "fromString": null,
                      "to": "166620",
                      "toString": "HP-829"
                    }
                  ]
                },
                {
                  "id": "1428289",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=luis.sanchez",
                    "name": "luis.sanchez",
                    "key": "luis.sanchez",
                    "emailAddress": "luis.sanchez@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Luis Sanchez",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-03T14:46:11.000-0400",
                  "items": [
                    {
                      "field": "description",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": "*GIVEN* A fresh clone of https://github.mhp-int.com/MyHomePay/angular-seed\r\n*WHEN* running {{docker build -t angular-seed .}} \r\n*EXPECT*\r\n* A multi-stage docker build to occur where the initial build step performs all the necessary setup and executes an {{ng build}} with the proper production flags\r\n** Example: https://github.com/MyHomePay/demo-tool/blob/master/Dockerfile\r\n* A resulting image based on https://hub.docker.com/_/nginx/ that hosts the production angular files\r\n\r\n",
                      "to": null,
                      "toString": "This is the first step in being able to deploy this in our hashi-environment.\r\n\r\n*GIVEN* A fresh clone of https://github.mhp-int.com/MyHomePay/angular-seed\r\n*WHEN* running {{docker build -t angular-seed .}} \r\n*EXPECT*\r\n* A multi-stage docker build to occur where the initial build step performs all the necessary setup and executes an {{ng build}} with the proper production flags\r\n** Example: https://github.com/MyHomePay/demo-tool/blob/master/Dockerfile\r\n* A resulting image based on https://hub.docker.com/_/nginx/ that hosts the production angular files\r\n\r\n"
                    }
                  ]
                },
                {
                  "id": "1428307",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=luis.sanchez",
                    "name": "luis.sanchez",
                    "key": "luis.sanchez",
                    "emailAddress": "luis.sanchez@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Luis Sanchez",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-03T14:47:06.000-0400",
                  "items": [
                    {
                      "field": "status",
                      "fieldtype": "jira",
                      "from": "10022",
                      "fromString": "To Do",
                      "to": "10326",
                      "toString": "Design Done"
                    }
                  ]
                },
                {
                  "id": "1430224",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=luis.sanchez",
                    "name": "luis.sanchez",
                    "key": "luis.sanchez",
                    "emailAddress": "luis.sanchez@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Luis Sanchez",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-04T15:49:16.000-0400",
                  "items": [
                    {
                      "field": "Epic Link",
                      "fieldtype": "custom",
                      "from": "166620",
                      "fromString": "HP-829",
                      "to": "204190",
                      "toString": "HP-1736"
                    }
                  ]
                },
                {
                  "id": "1430991",
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
                  "created": "2018-04-05T10:55:13.000-0400",
                  "items": [
                    {
                      "field": "status",
                      "fieldtype": "jira",
                      "from": "10326",
                      "fromString": "Design Done",
                      "to": "10149",
                      "toString": "Development Ready"
                    }
                  ]
                },
                {
                  "id": "1431000",
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
                  "created": "2018-04-05T11:00:29.000-0400",
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
                  "id": "1431002",
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
                  "created": "2018-04-05T11:00:47.000-0400",
                  "items": [
                    {
                      "field": "assignee",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": null,
                      "to": "brigitte.huneke",
                      "toString": "Brigitte Huneke"
                    }
                  ]
                }
              ]
            }
          },
          {
            "expand": "operations,editmeta,changelog,transitions,renderedFields",
            "id": "203999",
            "self": "https://jira.carezen.local/rest/api/2/issue/203999",
            "key": "HP-1727",
            "fields": {
              "summary": "Fix failing unit tests",
              "issuetype": {
                "self": "https://jira.carezen.local/rest/api/2/issuetype/3",
                "id": "3",
                "description": "A task that needs to be done.",
                "iconUrl": "https://jira.carezen.local/images/icons/issuetypes/task.png",
                "name": "Task",
                "subtask": false
              },
              "project": {
                "self": "https://jira.carezen.local/rest/api/2/project/11816",
                "id": "11816",
                "key": "HP",
                "name": "HomePay: Projects",
                "avatarUrls": {
                  "48x48": "https://jira.carezen.local/secure/projectavatar?avatarId=10011",
                  "24x24": "https://jira.carezen.local/secure/projectavatar?size=small&avatarId=10011",
                  "16x16": "https://jira.carezen.local/secure/projectavatar?size=xsmall&avatarId=10011",
                  "32x32": "https://jira.carezen.local/secure/projectavatar?size=medium&avatarId=10011"
                }
              },
              "labels": [
                "HP-UI"
              ]
            },
            "changelog": {
              "startAt": 0,
              "maxResults": 5,
              "total": 5,
              "histories": [
                {
                  "id": "1427980",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=luis.sanchez",
                    "name": "luis.sanchez",
                    "key": "luis.sanchez",
                    "emailAddress": "luis.sanchez@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Luis Sanchez",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-03T10:27:23.000-0400",
                  "items": [
                    {
                      "field": "Epic Link",
                      "fieldtype": "custom",
                      "from": null,
                      "fromString": null,
                      "to": "197578",
                      "toString": "HP-1556"
                    }
                  ]
                },
                {
                  "id": "1427982",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=luis.sanchez",
                    "name": "luis.sanchez",
                    "key": "luis.sanchez",
                    "emailAddress": "luis.sanchez@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Luis Sanchez",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-03T10:27:36.000-0400",
                  "items": [
                    {
                      "field": "summary",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": "Fix failing tests",
                      "to": null,
                      "toString": "Fix failing unit tests"
                    }
                  ]
                },
                {
                  "id": "1427983",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=luis.sanchez",
                    "name": "luis.sanchez",
                    "key": "luis.sanchez",
                    "emailAddress": "luis.sanchez@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Luis Sanchez",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-03T10:27:46.000-0400",
                  "items": [
                    {
                      "field": "status",
                      "fieldtype": "jira",
                      "from": "10022",
                      "fromString": "To Do",
                      "to": "10326",
                      "toString": "Design Done"
                    }
                  ]
                },
                {
                  "id": "1427984",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=luis.sanchez",
                    "name": "luis.sanchez",
                    "key": "luis.sanchez",
                    "emailAddress": "luis.sanchez@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Luis Sanchez",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-03T10:28:36.000-0400",
                  "items": [
                    {
                      "field": "description",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": "Looks like there's just a single failure that needs to be updated:\r\n\r\n{noformat}\r\nChrome 65.0.3325 (Mac OS X 10.13.3) AppComponent should render title in a h1 tag FAILED\r\n\tFailed: Cannot read property 'textContent' of null\r\n\tTypeError: Cannot read property 'textContent' of null\r\n\t    at UserContext.<anonymous> src/app/app.component.spec.ts:25:40)\r\n\t    at ZoneDelegate.webpackJsonp../node_modules/zone.js/dist/zone.js.ZoneDelegate.invoke node_modules/zone.js/dist/zone.js:388:1)\r\n\t    at AsyncTestZoneSpec.webpackJsonp../node_modules/zone.js/dist/zone-testing.js.AsyncTestZoneSpec.onInvoke node_modules/zone.js/dist/zone-testing.js:707:1)\r\n\t    at ProxyZoneSpec.webpackJsonp../node_modules/zone.js/dist/zone-testing.js.ProxyZoneSpec.onInvoke node_modules/zone.js/dist/zone-testing.js:285:1)\r\n\t    at ZoneDelegate.webpackJsonp../node_modules/zone.js/dist/zone.js.ZoneDelegate.invoke node_modules/zone.js/dist/zone.js:387:1)\r\n\t    at Zone.webpackJsonp../node_modules/zone.js/dist/zone.js.Zone.runGuarded node_modules/zone.js/dist/zone.js:151:1)\r\n\t    at runInTestZone node_modules/@angular/core/esm5/testing.js:107:1)\r\n\t    at UserContext.<anonymous> node_modules/@angular/core/esm5/testing.js:46:1)\r\n\t    at ZoneDelegate.webpackJsonp../node_modules/zone.js/dist/zone.js.ZoneDelegate.invoke node_modules/zone.js/dist/zone.js:388:1)\r\n\t    at ProxyZoneSpec.webpackJsonp../node_modules/zone.js/dist/zone-testing.js.ProxyZoneSpec.onInvoke node_modules/zone.js/dist/zone-testing.js:288:1)\r\nChrome 65.0.3325 (Mac OS X 10.13.3): Executed 3 of 3 (1 FAILED) (0 secs / 0.295 secs)\r\nChrome 65.0.3325 (Mac OS X 10.13.3) AppComponent should render title in a h1 tag FAILED\r\n\tFailed: Cannot read property 'textContent' of null\r\n\tTypeError: Cannot read property 'textContent' of null\r\n\t    at UserContext.<anonymous> src/app/app.component.spec.ts:25:40)\r\n\t    at ZoneDelegate.webpackJsonp../node_modules/zone.js/dist/zone.js.ZoneDelegate.invoke node_modules/zone.js/dist/zone.js:388:1)\r\n\t    at AsyncTestZoneSpec.webpackJsonp../node_modules/zone.js/dist/zone-testing.js.AsyncTestZoneSpec.onInvoke node_modules/zone.js/dist/zone-testing.js:707:1)\r\n\t    at ProxyZoneSpec.webpackJsonp../node_modules/zone.js/dist/zone-testing.js.ProxyZoneSpec.onInvoke node_modules/zone.js/dist/zone-testing.js:285:1)\r\n\t    at ZoneDelegate.webpackJsonp../node_modules/zone.js/dist/zone.js.ZoneDelegate.invoke node_modules/zone.js/dist/zone.js:387:1)\r\n\t    at Zone.webpackJsonp../node_modules/zone.js/dist/zone.js.Zone.runGuarded node_modules/zone.js/dist/zone.js:151:1)\r\n\t    at runInTestZone node_modules/@angular/core/esm5/testing.js:107:1)\r\n\t    at UserContext.<anonymous> node_modules/@angular/core/esm5/testing.js:46:1)\r\n\t    at ZoneDelegate.webpackJsonp../node_modules/zone.js/dist/zone.js.ZoneDelegate.invoke node_modules/zone.js/dist/zone.js:388:1)\r\nChrome 65.0.3325 (Mac OS X 10.13.3): Executed 3 of 3 (1 FAILED) (0.329 secs / 0.295 secs)\r\n{noformat}",
                      "to": null,
                      "toString": "*GIVEN* A fresh clone of the angular seed project\r\n*WHEN* {{ng test}} is run\r\n*EXPECT* all tests to pass\r\n\r\nLooks like there's just a single failure that needs to be updated:\r\n\r\n{noformat}\r\nChrome 65.0.3325 (Mac OS X 10.13.3) AppComponent should render title in a h1 tag FAILED\r\n\tFailed: Cannot read property 'textContent' of null\r\n\tTypeError: Cannot read property 'textContent' of null\r\n\t    at UserContext.<anonymous> src/app/app.component.spec.ts:25:40)\r\n\t    at ZoneDelegate.webpackJsonp../node_modules/zone.js/dist/zone.js.ZoneDelegate.invoke node_modules/zone.js/dist/zone.js:388:1)\r\n\t    at AsyncTestZoneSpec.webpackJsonp../node_modules/zone.js/dist/zone-testing.js.AsyncTestZoneSpec.onInvoke node_modules/zone.js/dist/zone-testing.js:707:1)\r\n\t    at ProxyZoneSpec.webpackJsonp../node_modules/zone.js/dist/zone-testing.js.ProxyZoneSpec.onInvoke node_modules/zone.js/dist/zone-testing.js:285:1)\r\n\t    at ZoneDelegate.webpackJsonp../node_modules/zone.js/dist/zone.js.ZoneDelegate.invoke node_modules/zone.js/dist/zone.js:387:1)\r\n\t    at Zone.webpackJsonp../node_modules/zone.js/dist/zone.js.Zone.runGuarded node_modules/zone.js/dist/zone.js:151:1)\r\n\t    at runInTestZone node_modules/@angular/core/esm5/testing.js:107:1)\r\n\t    at UserContext.<anonymous> node_modules/@angular/core/esm5/testing.js:46:1)\r\n\t    at ZoneDelegate.webpackJsonp../node_modules/zone.js/dist/zone.js.ZoneDelegate.invoke node_modules/zone.js/dist/zone.js:388:1)\r\n\t    at ProxyZoneSpec.webpackJsonp../node_modules/zone.js/dist/zone-testing.js.ProxyZoneSpec.onInvoke node_modules/zone.js/dist/zone-testing.js:288:1)\r\nChrome 65.0.3325 (Mac OS X 10.13.3): Executed 3 of 3 (1 FAILED) (0 secs / 0.295 secs)\r\nChrome 65.0.3325 (Mac OS X 10.13.3) AppComponent should render title in a h1 tag FAILED\r\n\tFailed: Cannot read property 'textContent' of null\r\n\tTypeError: Cannot read property 'textContent' of null\r\n\t    at UserContext.<anonymous> src/app/app.component.spec.ts:25:40)\r\n\t    at ZoneDelegate.webpackJsonp../node_modules/zone.js/dist/zone.js.ZoneDelegate.invoke node_modules/zone.js/dist/zone.js:388:1)\r\n\t    at AsyncTestZoneSpec.webpackJsonp../node_modules/zone.js/dist/zone-testing.js.AsyncTestZoneSpec.onInvoke node_modules/zone.js/dist/zone-testing.js:707:1)\r\n\t    at ProxyZoneSpec.webpackJsonp../node_modules/zone.js/dist/zone-testing.js.ProxyZoneSpec.onInvoke node_modules/zone.js/dist/zone-testing.js:285:1)\r\n\t    at ZoneDelegate.webpackJsonp../node_modules/zone.js/dist/zone.js.ZoneDelegate.invoke node_modules/zone.js/dist/zone.js:387:1)\r\n\t    at Zone.webpackJsonp../node_modules/zone.js/dist/zone.js.Zone.runGuarded node_modules/zone.js/dist/zone.js:151:1)\r\n\t    at runInTestZone node_modules/@angular/core/esm5/testing.js:107:1)\r\n\t    at UserContext.<anonymous> node_modules/@angular/core/esm5/testing.js:46:1)\r\n\t    at ZoneDelegate.webpackJsonp../node_modules/zone.js/dist/zone.js.ZoneDelegate.invoke node_modules/zone.js/dist/zone.js:388:1)\r\nChrome 65.0.3325 (Mac OS X 10.13.3): Executed 3 of 3 (1 FAILED) (0.329 secs / 0.295 secs)\r\n{noformat}"
                    }
                  ]
                },
                {
                  "id": "1428067",
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
                  "created": "2018-04-03T11:12:42.000-0400",
                  "items": [
                    {
                      "field": "status",
                      "fieldtype": "jira",
                      "from": "10326",
                      "fromString": "Design Done",
                      "to": "10132",
                      "toString": "Discarded"
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
                }
              ]
            }
          },
          {
            "expand": "operations,editmeta,changelog,transitions,renderedFields",
            "id": "203853",
            "self": "https://jira.carezen.local/rest/api/2/issue/203853",
            "key": "HP-1726",
            "fields": {
              "summary": "9.1.15 - Implement OpenTracing in Payment Instruction Publisher",
              "issuetype": {
                "self": "https://jira.carezen.local/rest/api/2/issuetype/5",
                "id": "5",
                "description": "The sub-task of the issue",
                "iconUrl": "https://jira.carezen.local/images/icons/issuetypes/subtask_alternate.png",
                "name": "Sub-task",
                "subtask": true
              },
              "project": {
                "self": "https://jira.carezen.local/rest/api/2/project/11816",
                "id": "11816",
                "key": "HP",
                "name": "HomePay: Projects",
                "avatarUrls": {
                  "48x48": "https://jira.carezen.local/secure/projectavatar?avatarId=10011",
                  "24x24": "https://jira.carezen.local/secure/projectavatar?size=small&avatarId=10011",
                  "16x16": "https://jira.carezen.local/secure/projectavatar?size=xsmall&avatarId=10011",
                  "32x32": "https://jira.carezen.local/secure/projectavatar?size=medium&avatarId=10011"
                }
              },
              "labels": [
                "HP-NoVerifyNeeded",
                "HP-PayrollProcessing"
              ]
            },
            "changelog": {
              "startAt": 0,
              "maxResults": 6,
              "total": 6,
              "histories": [
                {
                  "id": "1427238",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=sean.schade",
                    "name": "sean.schade",
                    "key": "sean.shade",
                    "emailAddress": "sean.schade@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=sean.shade&avatarId=13606",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=sean.shade&avatarId=13606",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=sean.shade&avatarId=13606",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=sean.shade&avatarId=13606"
                    },
                    "displayName": "Sean Schade",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-02T15:15:30.000-0400",
                  "items": [
                    {
                      "field": "summary",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": "9.1.14 - Implement OpenTracing in Payment Instruction Publisher",
                      "to": null,
                      "toString": "9.1.15 - Implement OpenTracing in Payment Instruction Publisher"
                    },
                    {
                      "field": "description",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": "*GIVEN* that distributed tracing is essential to operating distributed systems with confidence\r\n*WHEN* developing the Money Movement State Machine\r\n*EXPECT* that calls to the grpc endpoints create a span and push it to [Jaeger|https://jaeger.readthedocs.io/en/latest/]\r\n* https://github.com/grpc-ecosystem/grpc-opentracing/tree/master/go/otgrpc\r\n** Provides an interceptor for automatically creating a span around grpc endpoint calls\r\n\r\n*GIVEN* that _hashistack_ should include OpenTracing\r\n*EXPECT* the {{hashistack.nomad}} job to include a group for Jaeger ([all in one container|https://jaeger.readthedocs.io/en/latest/getting_started/#all-in-one-docker-image] may be a good first place to start)\r\n\r\n*GIVEN* that Jaeger has been deployed using the updated {{hashistack.nomad}} file and grpc calls are creating spans\r\n*EXPECT* Jaeger ui to show all spans that have been created\r\n* Jaeger ui is part of the all in one container\r\n\r\n*GIVEN* that Jaeger has been deployed using the updated {{hashistack.nomad}} file and grpc calls are creating spans\r\n*WHEN* {{debug}} level logging is enabled\r\n*EXPECT* span data to show up in log files (nomad log window)\r\n* This will most likely require a small wrapper around {{logrus}} so that it implements the jaeger logger interface. Good example code: https://github.com/jaegertracing/jaeger-client-go/blob/master/config/example_test.go#L49\r\n\r\n*Given* that opentracing will be used for debugging\r\n*When* creating spans\r\n*Expect* consistent field naming to be used\r\n** {{account.ID}}\r\n** {{instrument.ID}}\r\n** {{nats.messageID}}\r\n** {{payment.event}}\r\n** {{payment.event.type}}\r\n\r\nh5. Note:\r\nThis ticket only covers adding opentracing in the _hashistack_ environment. Needs followup with Zach and Sean to discuss how to move forward with valar environment and how we plan to handle this dual environment moving forward (this also applies to HP-1672) ",
                      "to": null,
                      "toString": "*GIVEN* that distributed tracing is essential to operating distributed systems with confidence\r\n*WHEN* developing the _payment-instruction-publisher_\r\n*EXPECT* that calls to the grpc endpoints create a span and push it to [Jaeger|https://jaeger.readthedocs.io/en/latest/]\r\n* https://github.com/grpc-ecosystem/grpc-opentracing/tree/master/go/otgrpc\r\n** Provides an interceptor for automatically creating a span around grpc endpoint calls\r\n\r\n*Given* that opentracing will be used for debugging\r\n*When* creating spans\r\n*Expect* consistent field naming to be used\r\n** {{account.ID}}\r\n** {{instrument.ID}}\r\n** {{nats.messageID}}\r\n** {{payment.event}}\r\n** {{payment.event.type}}\r\n"
                    }
                  ]
                },
                {
                  "id": "1427240",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=sean.schade",
                    "name": "sean.schade",
                    "key": "sean.shade",
                    "emailAddress": "sean.schade@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=sean.shade&avatarId=13606",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=sean.shade&avatarId=13606",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=sean.shade&avatarId=13606",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=sean.shade&avatarId=13606"
                    },
                    "displayName": "Sean Schade",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-02T15:17:00.000-0400",
                  "items": [
                    {
                      "field": "description",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": "*GIVEN* that distributed tracing is essential to operating distributed systems with confidence\r\n*WHEN* developing the _payment-instruction-publisher_\r\n*EXPECT* that calls to the grpc endpoints create a span and push it to [Jaeger|https://jaeger.readthedocs.io/en/latest/]\r\n* https://github.com/grpc-ecosystem/grpc-opentracing/tree/master/go/otgrpc\r\n** Provides an interceptor for automatically creating a span around grpc endpoint calls\r\n\r\n*Given* that opentracing will be used for debugging\r\n*When* creating spans\r\n*Expect* consistent field naming to be used\r\n** {{account.ID}}\r\n** {{instrument.ID}}\r\n** {{nats.messageID}}\r\n** {{payment.event}}\r\n** {{payment.event.type}}\r\n",
                      "to": null,
                      "toString": "*GIVEN* that distributed tracing is essential to operating distributed systems with confidence\r\n*WHEN* developing the _payment-instruction-publisher_\r\n*EXPECT* that calls to the grpc endpoints create a span and push it to [Jaeger|https://jaeger.readthedocs.io/en/latest/]\r\n* https://github.com/grpc-ecosystem/grpc-opentracing/tree/master/go/otgrpc\r\n** Provides an interceptor for automatically creating a span around grpc endpoint calls\r\n\r\n*GIVEN* that Jaeger has been deployed using the updated {{hashistack.nomad}} file and grpc calls are creating spans\r\n*WHEN* {{debug}} level logging is enabled\r\n*EXPECT* span data to show up in log files (nomad log window)\r\n* This will most likely require a small wrapper around {{logrus}} so that it implements the jaeger logger interface. Good example code: https://github.com/jaegertracing/jaeger-client-go/blob/master/config/example_test.go#L49\r\n\r\n*Given* that opentracing will be used for debugging\r\n*When* creating spans\r\n*Expect* consistent field naming to be used\r\n** {{account.ID}}\r\n** {{instrument.ID}}\r\n** {{nats.messageID}}\r\n** {{payment.event}}\r\n** {{payment.event.type}}\r\n"
                    }
                  ]
                },
                {
                  "id": "1428097",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=sean.schade",
                    "name": "sean.schade",
                    "key": "sean.shade",
                    "emailAddress": "sean.schade@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=sean.shade&avatarId=13606",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=sean.shade&avatarId=13606",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=sean.shade&avatarId=13606",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=sean.shade&avatarId=13606"
                    },
                    "displayName": "Sean Schade",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-03T11:34:13.000-0400",
                  "items": [
                    {
                      "field": "status",
                      "fieldtype": "jira",
                      "from": "10022",
                      "fromString": "To Do",
                      "to": "10326",
                      "toString": "Design Done"
                    }
                  ]
                },
                {
                  "id": "1428100",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=sean.schade",
                    "name": "sean.schade",
                    "key": "sean.shade",
                    "emailAddress": "sean.schade@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=sean.shade&avatarId=13606",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=sean.shade&avatarId=13606",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=sean.shade&avatarId=13606",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=sean.shade&avatarId=13606"
                    },
                    "displayName": "Sean Schade",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-03T11:35:12.000-0400",
                  "items": [
                    {
                      "field": "labels",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": "HP-PayrollProcessing",
                      "to": null,
                      "toString": "HP-NoVerifyNeeded HP-PayrollProcessing"
                    }
                  ]
                },
                {
                  "id": "1429668",
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
                  "created": "2018-04-04T10:51:29.000-0400",
                  "items": [
                    {
                      "field": "Link",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": null,
                      "to": "HP-1671",
                      "toString": "This issue See Related issues HP-1671"
                    }
                  ]
                },
                {
                  "id": "1429670",
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
                  "created": "2018-04-04T10:52:00.000-0400",
                  "items": [
                    {
                      "field": "status",
                      "fieldtype": "jira",
                      "from": "10326",
                      "fromString": "Design Done",
                      "to": "10149",
                      "toString": "Development Ready"
                    }
                  ]
                }
              ]
            }
          },
          {
            "expand": "operations,editmeta,changelog,transitions,renderedFields",
            "id": "203840",
            "self": "https://jira.carezen.local/rest/api/2/issue/203840",
            "key": "HP-1725",
            "fields": {
              "summary": "9.1.14 - Add Prometheus/Grafana deployment group to Nomad",
              "issuetype": {
                "self": "https://jira.carezen.local/rest/api/2/issuetype/5",
                "id": "5",
                "description": "The sub-task of the issue",
                "iconUrl": "https://jira.carezen.local/images/icons/issuetypes/subtask_alternate.png",
                "name": "Sub-task",
                "subtask": true
              },
              "project": {
                "self": "https://jira.carezen.local/rest/api/2/project/11816",
                "id": "11816",
                "key": "HP",
                "name": "HomePay: Projects",
                "avatarUrls": {
                  "48x48": "https://jira.carezen.local/secure/projectavatar?avatarId=10011",
                  "24x24": "https://jira.carezen.local/secure/projectavatar?size=small&avatarId=10011",
                  "16x16": "https://jira.carezen.local/secure/projectavatar?size=xsmall&avatarId=10011",
                  "32x32": "https://jira.carezen.local/secure/projectavatar?size=medium&avatarId=10011"
                }
              },
              "labels": [
                "HP-NoVerifyNeeded",
                "HP-PayrollProcessing"
              ]
            },
            "changelog": {
              "startAt": 0,
              "maxResults": 8,
              "total": 8,
              "histories": [
                {
                  "id": "1427000",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=eric.adams",
                    "name": "eric.adams",
                    "key": "eric.adams",
                    "emailAddress": "Eric.Adams@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Eric Adams",
                    "active": true,
                    "timeZone": "America/New_York"
                  },
                  "created": "2018-04-02T13:05:18.000-0400",
                  "items": [
                    {
                      "field": "Component",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": null,
                      "to": "11350",
                      "toString": "Infrastructure"
                    }
                  ]
                },
                {
                  "id": "1427003",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=eric.adams",
                    "name": "eric.adams",
                    "key": "eric.adams",
                    "emailAddress": "Eric.Adams@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Eric Adams",
                    "active": true,
                    "timeZone": "America/New_York"
                  },
                  "created": "2018-04-02T13:06:02.000-0400",
                  "items": [
                    {
                      "field": "summary",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": "Add Prometheus/Grafana deployment group to Nomad",
                      "to": null,
                      "toString": "9.1.8.1 - Add Prometheus/Grafana deployment group to Nomad"
                    },
                    {
                      "field": "description",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": "\r\n*Given* Consul, Vault, Nomad, Couchbase all expose Prometheus metrics\r\n*Expect* Consul, Vault, Nomad, Couchbase metrics to be collected by Prometheus\r\n\r\n*Given* that our cloud environment + _hashistack_ should include a Prometheus server\r\n*Expect* a nomad job to include Prometheus as part of a group running in a Docker container\r\n\r\n*Given* our environment should include Grafana to visualize collected Prometheus metrics\r\n*Expect* a Grafana server to deploy as a part of Prometheus' nomad run group\r\n\r\n\r\nhelpful links:\r\nhttps://prometheus.io/docs/prometheus/latest/getting_started/\r\nhttps://www.nomadproject.io/guides/nomad-metrics.html\r\nhttps://github.com/prometheus/consul_exporter\r\nhttps://prometheus.io/docs/instrumenting/exporters/",
                      "to": null,
                      "toString": "*Given* Consul, Vault, Nomad, Couchbase all expose Prometheus metrics\r\n*Expect* Consul, Vault, Nomad, Couchbase metrics to be collected by Prometheus\r\n\r\n*Given* that our cloud environment + _hashistack_ should include a Prometheus server\r\n*Expect* a nomad job to include Prometheus as part of a group running in a Docker container\r\n\r\n*Given* our environment should include Grafana to visualize collected Prometheus metrics\r\n*Expect* a Grafana server to deploy as a part of Prometheus' nomad run group\r\n\r\n\r\nhelpful links:\r\nhttps://prometheus.io/docs/prometheus/latest/getting_started/\r\nhttps://www.nomadproject.io/guides/nomad-metrics.html\r\nhttps://github.com/prometheus/consul_exporter\r\nhttps://prometheus.io/docs/instrumenting/exporters/"
                    }
                  ]
                },
                {
                  "id": "1427004",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=eric.adams",
                    "name": "eric.adams",
                    "key": "eric.adams",
                    "emailAddress": "Eric.Adams@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Eric Adams",
                    "active": true,
                    "timeZone": "America/New_York"
                  },
                  "created": "2018-04-02T13:06:37.000-0400",
                  "items": [
                    {
                      "field": "summary",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": "9.1.8.1 - Add Prometheus/Grafana deployment group to Nomad",
                      "to": null,
                      "toString": "9.1.14 - Add Prometheus/Grafana deployment group to Nomad"
                    }
                  ]
                },
                {
                  "id": "1427023",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=eric.adams",
                    "name": "eric.adams",
                    "key": "eric.adams",
                    "emailAddress": "Eric.Adams@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Eric Adams",
                    "active": true,
                    "timeZone": "America/New_York"
                  },
                  "created": "2018-04-02T13:07:09.000-0400",
                  "items": [
                    {
                      "field": "status",
                      "fieldtype": "jira",
                      "from": "10022",
                      "fromString": "To Do",
                      "to": "10325",
                      "toString": "Design"
                    }
                  ]
                },
                {
                  "id": "1428043",
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
                  "created": "2018-04-03T10:55:21.000-0400",
                  "items": [
                    {
                      "field": "status",
                      "fieldtype": "jira",
                      "from": "10325",
                      "fromString": "Design",
                      "to": "10326",
                      "toString": "Design Done"
                    }
                  ]
                },
                {
                  "id": "1428047",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=eric.adams",
                    "name": "eric.adams",
                    "key": "eric.adams",
                    "emailAddress": "Eric.Adams@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Eric Adams",
                    "active": true,
                    "timeZone": "America/New_York"
                  },
                  "created": "2018-04-03T10:56:51.000-0400",
                  "items": [
                    {
                      "field": "labels",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": "",
                      "to": null,
                      "toString": "HP-PayrollProcessing"
                    }
                  ]
                },
                {
                  "id": "1428098",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=sean.schade",
                    "name": "sean.schade",
                    "key": "sean.shade",
                    "emailAddress": "sean.schade@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=sean.shade&avatarId=13606",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=sean.shade&avatarId=13606",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=sean.shade&avatarId=13606",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=sean.shade&avatarId=13606"
                    },
                    "displayName": "Sean Schade",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-03T11:34:53.000-0400",
                  "items": [
                    {
                      "field": "labels",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": "HP-PayrollProcessing",
                      "to": null,
                      "toString": "HP-NoVerifyNeeded HP-PayrollProcessing"
                    }
                  ]
                },
                {
                  "id": "1430996",
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
                  "created": "2018-04-05T10:58:36.000-0400",
                  "items": [
                    {
                      "field": "status",
                      "fieldtype": "jira",
                      "from": "10326",
                      "fromString": "Design Done",
                      "to": "10149",
                      "toString": "Development Ready"
                    }
                  ]
                }
              ]
            }
          },
          {
            "expand": "operations,editmeta,changelog,transitions,renderedFields",
            "id": "203834",
            "self": "https://jira.carezen.local/rest/api/2/issue/203834",
            "key": "HP-1724",
            "fields": {
              "summary": "9.1.13 - Generate C# Client For Payment Instruction Publisher",
              "issuetype": {
                "self": "https://jira.carezen.local/rest/api/2/issuetype/5",
                "id": "5",
                "description": "The sub-task of the issue",
                "iconUrl": "https://jira.carezen.local/images/icons/issuetypes/subtask_alternate.png",
                "name": "Sub-task",
                "subtask": true
              },
              "project": {
                "self": "https://jira.carezen.local/rest/api/2/project/11816",
                "id": "11816",
                "key": "HP",
                "name": "HomePay: Projects",
                "avatarUrls": {
                  "48x48": "https://jira.carezen.local/secure/projectavatar?avatarId=10011",
                  "24x24": "https://jira.carezen.local/secure/projectavatar?size=small&avatarId=10011",
                  "16x16": "https://jira.carezen.local/secure/projectavatar?size=xsmall&avatarId=10011",
                  "32x32": "https://jira.carezen.local/secure/projectavatar?size=medium&avatarId=10011"
                }
              },
              "labels": [
                "HP-NoVerifyNeeded",
                "HP-PayrollProcessing"
              ]
            },
            "changelog": {
              "startAt": 0,
              "maxResults": 6,
              "total": 6,
              "histories": [
                {
                  "id": "1426995",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=sean.schade",
                    "name": "sean.schade",
                    "key": "sean.shade",
                    "emailAddress": "sean.schade@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=sean.shade&avatarId=13606",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=sean.shade&avatarId=13606",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=sean.shade&avatarId=13606",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=sean.shade&avatarId=13606"
                    },
                    "displayName": "Sean Schade",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-02T13:03:04.000-0400",
                  "items": [
                    {
                      "field": "description",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": "As a subscriber I want to send _pending_ Payment Instructions to the _Financial Transactions_ service.\r\n\r\n*Given* a subscriber to the _financial.transactions_ STAN subject \r\n*When* a Financial Transaction with a status of _Pending_ arrives\r\n*Expect* request to the _POST /tx_ to be created\r\n*Expect* _PaymentInstruction.Originator.AccountID_ to be mapped to _FinancialTransaction.AccountID_\r\n*Expect* _PaymentInstruction.Category_ to be mapped to _FinancialTransaction.PaymentTypeID_\r\n*Expect* _PaymentInstruction.Operation_ to be mapped to _FinancialTransaction.TransferMethodTypeID_\r\nTBD remaining mapping\r\n\r\n*Given* a _POST /tx_\r\n*When* a 200 response is returned\r\n*Expect* request to _PUT /batch-tx/{id}_ where {id} is the batch ID returned from _POST /tx_\r\n*Expect* the request to set the _currentStatus_ of the batch to \"In Progress\"\r\n\r\n*Given* a subscriber to the _financial.transactions_ STAN subject \r\n*When* a Financial Transaction with a status that is *NOT* _Pending_ arrives\r\n*Expect* the message to be ignored\r\n\r\n",
                      "to": null,
                      "toString": "As a BIS client I want to publish Payment Instructions.\r\n\r\n*Given* that gRPC clients can be generated from Protobuf files\r\n*When* creating a client to the _payment-instruction-publisher_\r\n*Expect* the client to be generated using the _protoc_ binary\r\n\r\nHere is an example for how the C# client could be generated. It is based on the way the Go client is currently generated. \r\n\r\n{code}\r\n\tprotoc -I=. -I=../../vendor --csharp_out=Mgoogle/protobuf/any.proto=github.com/gogo/protobuf/types,Mgoogle/protobuf/duration.proto=github.com/gogo/protobuf/types,Mgoogle/protobuf/struct.proto=github.com/gogo/protobuf/types,Mgoogle/protobuf/timestamp.proto=github.com/gogo/protobuf/types,Mgoogle/protobuf/wrappers.proto=github.com/gogo/protobuf/types,plugins=grpc:. finance.proto\r\n{code}"
                    }
                  ]
                },
                {
                  "id": "1426997",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=sean.schade",
                    "name": "sean.schade",
                    "key": "sean.shade",
                    "emailAddress": "sean.schade@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=sean.shade&avatarId=13606",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=sean.shade&avatarId=13606",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=sean.shade&avatarId=13606",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=sean.shade&avatarId=13606"
                    },
                    "displayName": "Sean Schade",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-02T13:03:19.000-0400",
                  "items": [
                    {
                      "field": "status",
                      "fieldtype": "jira",
                      "from": "10022",
                      "fromString": "To Do",
                      "to": "10326",
                      "toString": "Design Done"
                    }
                  ]
                },
                {
                  "id": "1427001",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=sean.schade",
                    "name": "sean.schade",
                    "key": "sean.shade",
                    "emailAddress": "sean.schade@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=sean.shade&avatarId=13606",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=sean.shade&avatarId=13606",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=sean.shade&avatarId=13606",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=sean.shade&avatarId=13606"
                    },
                    "displayName": "Sean Schade",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-02T13:05:49.000-0400",
                  "items": [
                    {
                      "field": "description",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": "As a BIS client I want to publish Payment Instructions.\r\n\r\n*Given* that gRPC clients can be generated from Protobuf files\r\n*When* creating a client to the _payment-instruction-publisher_\r\n*Expect* the client to be generated using the _protoc_ binary\r\n\r\nHere is an example for how the C# client could be generated. It is based on the way the Go client is currently generated. \r\n\r\n{code}\r\n\tprotoc -I=. -I=../../vendor --csharp_out=Mgoogle/protobuf/any.proto=github.com/gogo/protobuf/types,Mgoogle/protobuf/duration.proto=github.com/gogo/protobuf/types,Mgoogle/protobuf/struct.proto=github.com/gogo/protobuf/types,Mgoogle/protobuf/timestamp.proto=github.com/gogo/protobuf/types,Mgoogle/protobuf/wrappers.proto=github.com/gogo/protobuf/types,plugins=grpc:. finance.proto\r\n{code}",
                      "to": null,
                      "toString": "As a BIS client I want to publish Payment Instructions.\r\n\r\n*Given* that gRPC clients can be generated from Protobuf files\r\n*When* creating a client to the _payment-instruction-publisher_\r\n*Expect* the client to be generated using the _protoc_ binary\r\n\r\nHere is an example for how the C# client could be generated. It is based on the way the Go client is currently generated. \r\n\r\n{code}\r\nprotoc -I=. -I=../../vendor --csharp_out=Mgoogle/protobuf/any.proto=github.com/gogo/protobuf/types,Mgoogle/protobuf/duration.proto=github.com/gogo/protobuf/types,Mgoogle/protobuf/struct.proto=github.com/gogo/protobuf/types,Mgoogle/protobuf/timestamp.proto=github.com/gogo/protobuf/types,Mgoogle/protobuf/wrappers.proto=github.com/gogo/protobuf/types,plugins=grpc:. finance.proto\r\n{code}"
                    }
                  ]
                },
                {
                  "id": "1428049",
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
                  "created": "2018-04-03T10:58:45.000-0400",
                  "items": [
                    {
                      "field": "status",
                      "fieldtype": "jira",
                      "from": "10326",
                      "fromString": "Design Done",
                      "to": "10149",
                      "toString": "Development Ready"
                    }
                  ]
                },
                {
                  "id": "1428081",
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
                  "created": "2018-04-03T11:22:17.000-0400",
                  "items": [
                    {
                      "field": "assignee",
                      "fieldtype": "jira",
                      "from": "sean.shade",
                      "fromString": "Sean Schade",
                      "to": "andriy.zakharko",
                      "toString": "Andriy Zakharko"
                    }
                  ]
                },
                {
                  "id": "1428118",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=sean.schade",
                    "name": "sean.schade",
                    "key": "sean.shade",
                    "emailAddress": "sean.schade@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=sean.shade&avatarId=13606",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=sean.shade&avatarId=13606",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=sean.shade&avatarId=13606",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=sean.shade&avatarId=13606"
                    },
                    "displayName": "Sean Schade",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-03T11:51:06.000-0400",
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
                }
              ]
            }
          },
          {
            "expand": "operations,editmeta,changelog,transitions,renderedFields",
            "id": "203634",
            "self": "https://jira.carezen.local/rest/api/2/issue/203634",
            "key": "HP-1722",
            "fields": {
              "summary": "Investigate OpenID/JSON Web Token library for Angular",
              "issuetype": {
                "self": "https://jira.carezen.local/rest/api/2/issuetype/20",
                "id": "20",
                "description": "A user story",
                "iconUrl": "https://jira.carezen.local/images/icons/issuetypes/story.png",
                "name": "Story",
                "subtask": false
              },
              "project": {
                "self": "https://jira.carezen.local/rest/api/2/project/11816",
                "id": "11816",
                "key": "HP",
                "name": "HomePay: Projects",
                "avatarUrls": {
                  "48x48": "https://jira.carezen.local/secure/projectavatar?avatarId=10011",
                  "24x24": "https://jira.carezen.local/secure/projectavatar?size=small&avatarId=10011",
                  "16x16": "https://jira.carezen.local/secure/projectavatar?size=xsmall&avatarId=10011",
                  "32x32": "https://jira.carezen.local/secure/projectavatar?size=medium&avatarId=10011"
                }
              },
              "labels": [
                "HP-Angular",
                "HP-UI"
              ]
            },
            "changelog": {
              "startAt": 0,
              "maxResults": 3,
              "total": 3,
              "histories": [
                {
                  "id": "1424505",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=luis.sanchez",
                    "name": "luis.sanchez",
                    "key": "luis.sanchez",
                    "emailAddress": "luis.sanchez@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Luis Sanchez",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-03-30T10:18:07.000-0400",
                  "items": [
                    {
                      "field": "Epic Link",
                      "fieldtype": "custom",
                      "from": null,
                      "fromString": null,
                      "to": "197578",
                      "toString": "HP-1556"
                    }
                  ]
                },
                {
                  "id": "1425020",
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
                  "created": "2018-03-30T16:46:26.000-0400",
                  "items": [
                    {
                      "field": "Workflow",
                      "fieldtype": "jira",
                      "from": "283920",
                      "fromString": "HP: Project Workflow 20171020",
                      "to": "283988",
                      "toString": "HP: Project Workflow 20180330"
                    }
                  ]
                },
                {
                  "id": "1427533",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=luis.sanchez",
                    "name": "luis.sanchez",
                    "key": "luis.sanchez",
                    "emailAddress": "luis.sanchez@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Luis Sanchez",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-03T01:38:28.000-0400",
                  "items": [
                    {
                      "field": "status",
                      "fieldtype": "jira",
                      "from": "10022",
                      "fromString": "To Do",
                      "to": "10325",
                      "toString": "Design"
                    }
                  ]
                }
              ]
            }
          },
          {
            "expand": "operations,editmeta,changelog,transitions,renderedFields",
            "id": "203623",
            "self": "https://jira.carezen.local/rest/api/2/issue/203623",
            "key": "HP-1721",
            "fields": {
              "summary": "Prototype Security Token Service using IdentityServer4 (with in memory storage configurations)",
              "issuetype": {
                "self": "https://jira.carezen.local/rest/api/2/issuetype/20",
                "id": "20",
                "description": "A user story",
                "iconUrl": "https://jira.carezen.local/images/icons/issuetypes/story.png",
                "name": "Story",
                "subtask": false
              },
              "project": {
                "self": "https://jira.carezen.local/rest/api/2/project/11816",
                "id": "11816",
                "key": "HP",
                "name": "HomePay: Projects",
                "avatarUrls": {
                  "48x48": "https://jira.carezen.local/secure/projectavatar?avatarId=10011",
                  "24x24": "https://jira.carezen.local/secure/projectavatar?size=small&avatarId=10011",
                  "16x16": "https://jira.carezen.local/secure/projectavatar?size=xsmall&avatarId=10011",
                  "32x32": "https://jira.carezen.local/secure/projectavatar?size=medium&avatarId=10011"
                }
              },
              "labels": [
                "HP-UI"
              ]
            },
            "changelog": {
              "startAt": 0,
              "maxResults": 7,
              "total": 7,
              "histories": [
                {
                  "id": "1424465",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=luis.sanchez",
                    "name": "luis.sanchez",
                    "key": "luis.sanchez",
                    "emailAddress": "luis.sanchez@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Luis Sanchez",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-03-30T09:29:36.000-0400",
                  "items": [
                    {
                      "field": "Epic Link",
                      "fieldtype": "custom",
                      "from": null,
                      "fromString": null,
                      "to": "197578",
                      "toString": "HP-1556"
                    }
                  ]
                },
                {
                  "id": "1424467",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=luis.sanchez",
                    "name": "luis.sanchez",
                    "key": "luis.sanchez",
                    "emailAddress": "luis.sanchez@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Luis Sanchez",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-03-30T09:29:58.000-0400",
                  "items": [
                    {
                      "field": "status",
                      "fieldtype": "jira",
                      "from": "10022",
                      "fromString": "To Do",
                      "to": "10527",
                      "toString": "Grooming"
                    }
                  ]
                },
                {
                  "id": "1424472",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=luis.sanchez",
                    "name": "luis.sanchez",
                    "key": "luis.sanchez",
                    "emailAddress": "luis.sanchez@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Luis Sanchez",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-03-30T09:32:49.000-0400",
                  "items": [
                    {
                      "field": "description",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": "[IdentityServer4|http://docs.identityserver.io/en/release/] is a set of middleware that makes it easy to customize endpoints so that they plug into your existing system. One of the places where we will end up plugging into BIS will be the user related tables (BIS uses ASP.NET membership).\r\n\r\nFor this simple prototype we can just use in memory storage. The idea behind this ticket is that we'll be able to have an OpenID Connect and OAuth 2 Security Token Service that we can start integrating with.\r\n\r\n",
                      "to": null,
                      "toString": "[IdentityServer4|http://docs.identityserver.io/en/release/] is a set of middleware that makes it easy to customize endpoints so that they plug into your existing system. One of the places where we will end up plugging into BIS will be the user related tables (BIS uses ASP.NET membership).\r\n\r\nFor this simple prototype we can just use in memory storage. The idea behind this ticket is that we'll be able to have an OpenID Connect and OAuth 2 Security Token Service that we can start integrating with.\r\n\r\nResources:\r\n* https://www.youtube.com/watch?v=YXdJ2HLAOdE\r\n* https://www.youtube.com/watch?v=J5p72gTdx_M\r\n"
                    }
                  ]
                },
                {
                  "id": "1424473",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=luis.sanchez",
                    "name": "luis.sanchez",
                    "key": "luis.sanchez",
                    "emailAddress": "luis.sanchez@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Luis Sanchez",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-03-30T09:33:06.000-0400",
                  "items": [
                    {
                      "field": "description",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": "[IdentityServer4|http://docs.identityserver.io/en/release/] is a set of middleware that makes it easy to customize endpoints so that they plug into your existing system. One of the places where we will end up plugging into BIS will be the user related tables (BIS uses ASP.NET membership).\r\n\r\nFor this simple prototype we can just use in memory storage. The idea behind this ticket is that we'll be able to have an OpenID Connect and OAuth 2 Security Token Service that we can start integrating with.\r\n\r\nResources:\r\n* https://www.youtube.com/watch?v=YXdJ2HLAOdE\r\n* https://www.youtube.com/watch?v=J5p72gTdx_M\r\n",
                      "to": null,
                      "toString": "[IdentityServer4|http://docs.identityserver.io/en/release/] is a set of middleware that makes it easy to customize endpoints so that they plug into your existing system. One of the places where we will end up plugging into BIS will be the user related tables (BIS uses ASP.NET membership).\r\n\r\nFor this simple prototype we can just use in memory storage. The idea behind this ticket is that we'll be able to have an OpenID Connect and OAuth 2 Security Token Service that we can start integrating with.\r\n\r\nh5. Resources:\r\n* https://www.youtube.com/watch?v=YXdJ2HLAOdE\r\n* https://www.youtube.com/watch?v=J5p72gTdx_M\r\n"
                    }
                  ]
                },
                {
                  "id": "1424482",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=luis.sanchez",
                    "name": "luis.sanchez",
                    "key": "luis.sanchez",
                    "emailAddress": "luis.sanchez@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Luis Sanchez",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-03-30T09:46:24.000-0400",
                  "items": [
                    {
                      "field": "description",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": "[IdentityServer4|http://docs.identityserver.io/en/release/] is a set of middleware that makes it easy to customize endpoints so that they plug into your existing system. One of the places where we will end up plugging into BIS will be the user related tables (BIS uses ASP.NET membership).\r\n\r\nFor this simple prototype we can just use in memory storage. The idea behind this ticket is that we'll be able to have an OpenID Connect and OAuth 2 Security Token Service that we can start integrating with.\r\n\r\nh5. Resources:\r\n* https://www.youtube.com/watch?v=YXdJ2HLAOdE\r\n* https://www.youtube.com/watch?v=J5p72gTdx_M\r\n",
                      "to": null,
                      "toString": "[IdentityServer4|http://docs.identityserver.io/en/release/] is a set of middleware that makes it easy to customize endpoints so that they plug into your existing system. One of the places where we will end up plugging into BIS will be the user related tables (BIS uses ASP.NET membership).\r\n\r\nFor this simple prototype we can just use in memory storage. The idea behind this ticket is that we'll be able to have an OpenID Connect and OAuth 2 Security Token Service that we can start integrating with. Since we'll be using open standards for most of this work, we should (in theory) be able to switch over to a different implementation if we decide to go with a different implementation.\r\n\r\nh5. Resources:\r\n* https://www.youtube.com/watch?v=YXdJ2HLAOdE\r\n* https://www.youtube.com/watch?v=J5p72gTdx_M\r\n"
                    }
                  ]
                },
                {
                  "id": "1426294",
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
                  "created": "2018-03-30T16:46:50.000-0400",
                  "items": [
                    {
                      "field": "Workflow",
                      "fieldtype": "jira",
                      "from": "283909",
                      "fromString": "HP: Project Workflow 20171020",
                      "to": "285262",
                      "toString": "HP: Project Workflow 20180330"
                    },
                    {
                      "field": "status",
                      "fieldtype": "jira",
                      "from": "10527",
                      "fromString": "Grooming",
                      "to": "10622",
                      "toString": "User Story"
                    }
                  ]
                },
                {
                  "id": "1426302",
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
                  "created": "2018-03-30T16:51:46.000-0400",
                  "items": [
                    {
                      "field": "labels",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": "HP-Angular HP-UI",
                      "to": null,
                      "toString": "HP-UI"
                    }
                  ]
                }
              ]
            }
          },
          {
            "expand": "operations,editmeta,changelog,transitions,renderedFields",
            "id": "203551",
            "self": "https://jira.carezen.local/rest/api/2/issue/203551",
            "key": "HP-1720",
            "fields": {
              "summary": "9.1.12 BIS PaymentProfile.aspx Publish Pending Payment Instruction",
              "issuetype": {
                "self": "https://jira.carezen.local/rest/api/2/issuetype/5",
                "id": "5",
                "description": "The sub-task of the issue",
                "iconUrl": "https://jira.carezen.local/images/icons/issuetypes/subtask_alternate.png",
                "name": "Sub-task",
                "subtask": true
              },
              "project": {
                "self": "https://jira.carezen.local/rest/api/2/project/11816",
                "id": "11816",
                "key": "HP",
                "name": "HomePay: Projects",
                "avatarUrls": {
                  "48x48": "https://jira.carezen.local/secure/projectavatar?avatarId=10011",
                  "24x24": "https://jira.carezen.local/secure/projectavatar?size=small&avatarId=10011",
                  "16x16": "https://jira.carezen.local/secure/projectavatar?size=xsmall&avatarId=10011",
                  "32x32": "https://jira.carezen.local/secure/projectavatar?size=medium&avatarId=10011"
                }
              },
              "labels": [
                "HP-NoVerifyNeeded",
                "HP-PayrollProcessing"
              ]
            },
            "changelog": {
              "startAt": 0,
              "maxResults": 13,
              "total": 13,
              "histories": [
                {
                  "id": "1423944",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=eric.adams",
                    "name": "eric.adams",
                    "key": "eric.adams",
                    "emailAddress": "Eric.Adams@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Eric Adams",
                    "active": true,
                    "timeZone": "America/New_York"
                  },
                  "created": "2018-03-29T15:19:36.000-0400",
                  "items": [
                    {
                      "field": "Component",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": null,
                      "to": "11350",
                      "toString": "Infrastructure"
                    }
                  ]
                },
                {
                  "id": "1423946",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=eric.adams",
                    "name": "eric.adams",
                    "key": "eric.adams",
                    "emailAddress": "Eric.Adams@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Eric Adams",
                    "active": true,
                    "timeZone": "America/New_York"
                  },
                  "created": "2018-03-29T15:19:54.000-0400",
                  "items": [
                    {
                      "field": "status",
                      "fieldtype": "jira",
                      "from": "10022",
                      "fromString": "To Do",
                      "to": "10325",
                      "toString": "Design"
                    }
                  ]
                },
                {
                  "id": "1423947",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=eric.adams",
                    "name": "eric.adams",
                    "key": "eric.adams",
                    "emailAddress": "Eric.Adams@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Eric Adams",
                    "active": true,
                    "timeZone": "America/New_York"
                  },
                  "created": "2018-03-29T15:20:15.000-0400",
                  "items": [
                    {
                      "field": "summary",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": "Bank Verifications - 9.1.12 BIS paymentProfile.aspx publish pending payment instruction",
                      "to": null,
                      "toString": "9.1.12 BIS paymentProfile.aspx publish pending payment instruction"
                    }
                  ]
                },
                {
                  "id": "1423954",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=sean.schade",
                    "name": "sean.schade",
                    "key": "sean.shade",
                    "emailAddress": "sean.schade@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=sean.shade&avatarId=13606",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=sean.shade&avatarId=13606",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=sean.shade&avatarId=13606",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=sean.shade&avatarId=13606"
                    },
                    "displayName": "Sean Schade",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-03-29T15:21:39.000-0400",
                  "items": [
                    {
                      "field": "summary",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": "9.1.12 BIS paymentProfile.aspx publish pending payment instruction",
                      "to": null,
                      "toString": "9.1.12 BIS PaymentProfile.aspx Publish Pending Payment Instruction"
                    }
                  ]
                },
                {
                  "id": "1424560",
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
                  "created": "2018-03-30T10:59:42.000-0400",
                  "items": [
                    {
                      "field": "assignee",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": null,
                      "to": "eric.adams",
                      "toString": "Eric Adams"
                    }
                  ]
                },
                {
                  "id": "1424622",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=eric.adams",
                    "name": "eric.adams",
                    "key": "eric.adams",
                    "emailAddress": "Eric.Adams@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Eric Adams",
                    "active": true,
                    "timeZone": "America/New_York"
                  },
                  "created": "2018-03-30T12:17:10.000-0400",
                  "items": [
                    {
                      "field": "description",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": null,
                      "to": null,
                      "toString": "As a user, when I use BIS to create a new payment pro\r\n\r\nGIVEN \r\na call to /PaymentProfile.aspx.cs SaveBtn_OnClick()\r\nWHEN \r\nPayment Profile calls Saved Successfully\r\nAND\r\n\r\nEXPECT\r\nA new query to Retrieve accountTransactionId from created transaction\r\nEXPECT\r\nCall publishPending(accountTransactionId)"
                    },
                    {
                      "field": "assignee",
                      "fieldtype": "jira",
                      "from": "eric.adams",
                      "fromString": "Eric Adams",
                      "to": null,
                      "toString": null
                    }
                  ]
                },
                {
                  "id": "1424623",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=eric.adams",
                    "name": "eric.adams",
                    "key": "eric.adams",
                    "emailAddress": "Eric.Adams@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Eric Adams",
                    "active": true,
                    "timeZone": "America/New_York"
                  },
                  "created": "2018-03-30T12:17:20.000-0400",
                  "items": [
                    {
                      "field": "assignee",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": null,
                      "to": "eric.adams",
                      "toString": "Eric Adams"
                    }
                  ]
                },
                {
                  "id": "1424635",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=eric.adams",
                    "name": "eric.adams",
                    "key": "eric.adams",
                    "emailAddress": "Eric.Adams@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Eric Adams",
                    "active": true,
                    "timeZone": "America/New_York"
                  },
                  "created": "2018-03-30T12:26:31.000-0400",
                  "items": [
                    {
                      "field": "description",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": "As a user, when I use BIS to create a new payment pro\r\n\r\nGIVEN \r\na call to /PaymentProfile.aspx.cs SaveBtn_OnClick()\r\nWHEN \r\nPayment Profile calls Saved Successfully\r\nAND\r\n\r\nEXPECT\r\nA new query to Retrieve accountTransactionId from created transaction\r\nEXPECT\r\nCall publishPending(accountTransactionId)",
                      "to": null,
                      "toString": "As a platform engineer, I want payment method verification to employ payroll processing's state machine to verify payment instruments when I use BIS to create a new payment profile. To kick off the process, BIS must make a call to PaymentInstructionPublisher.PublishPending() that passes the newly created accountTransactionID into the system. \r\n\r\nGIVEN \r\na call to /PaymentProfile.aspx.cs SaveBtn_OnClick()\r\nWHEN \r\nPayment Profile calls SaveData();\r\nAND\r\nNo Exception is thrown\r\nAND\r\nA valid accountTransactionId is created/returned by ClientVerificationRequest (https://github.mhp-int.com/MyHomePay/BIS/blob/984c4271beb30665092783940370136d5f28e38a/Breedlove.BIS.BR/TransactionVerification.cs#L179)\r\nEXPECT\r\nA reference to PaymentInstructionPublisher is available to BIS\r\nEXPECT\r\nBIS to CallPaymentInstructionPublisher.PublishPending(accountTransactionId)\r\n\r\nGIVEN\r\nBIS to CallPaymentInstructionPublisher.PublishPending(accountTransactionId)\r\nWHEN \r\nException\r\nEXPECT\r\n\r\n\r\n"
                    }
                  ]
                },
                {
                  "id": "1426216",
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
                  "created": "2018-03-30T16:46:48.000-0400",
                  "items": [
                    {
                      "field": "Workflow",
                      "fieldtype": "jira",
                      "from": "283836",
                      "fromString": "HP: Project Workflow 20171020",
                      "to": "285184",
                      "toString": "HP: Project Workflow 20180330"
                    }
                  ]
                },
                {
                  "id": "1427462",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=eric.adams",
                    "name": "eric.adams",
                    "key": "eric.adams",
                    "emailAddress": "Eric.Adams@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Eric Adams",
                    "active": true,
                    "timeZone": "America/New_York"
                  },
                  "created": "2018-04-02T18:33:21.000-0400",
                  "items": [
                    {
                      "field": "description",
                      "fieldtype": "jira",
                      "from": null,
                      "fromString": "As a platform engineer, I want payment method verification to employ payroll processing's state machine to verify payment instruments when I use BIS to create a new payment profile. To kick off the process, BIS must make a call to PaymentInstructionPublisher.PublishPending() that passes the newly created accountTransactionID into the system. \r\n\r\nGIVEN \r\na call to /PaymentProfile.aspx.cs SaveBtn_OnClick()\r\nWHEN \r\nPayment Profile calls SaveData();\r\nAND\r\nNo Exception is thrown\r\nAND\r\nA valid accountTransactionId is created/returned by ClientVerificationRequest (https://github.mhp-int.com/MyHomePay/BIS/blob/984c4271beb30665092783940370136d5f28e38a/Breedlove.BIS.BR/TransactionVerification.cs#L179)\r\nEXPECT\r\nA reference to PaymentInstructionPublisher is available to BIS\r\nEXPECT\r\nBIS to CallPaymentInstructionPublisher.PublishPending(accountTransactionId)\r\n\r\nGIVEN\r\nBIS to CallPaymentInstructionPublisher.PublishPending(accountTransactionId)\r\nWHEN \r\nException\r\nEXPECT\r\n\r\n\r\n",
                      "to": null,
                      "toString": "As a platform engineer, I want payment method verification to employ payroll processing's state machine to verify payment instruments when I use BIS to create a new payment profile. To kick off the process, BIS must make a call to PaymentInstructionPublisher.PublishPending() that passes the newly created accountTransactionID into the system. \r\n\r\nGIVEN \r\na call to /PaymentProfile.aspx.cs SaveBtn_OnClick()\r\nWHEN \r\nPayment Profile calls SaveData();\r\nAND\r\nNo Exception is thrown\r\nAND\r\nA valid accountTransactionId is created/returned by ClientVerificationRequest (https://github.mhp-int.com/MyHomePay/BIS/blob/984c4271beb30665092783940370136d5f28e38a/Breedlove.BIS.BR/TransactionVerification.cs#L179)\r\nEXPECT\r\nA reference to PaymentInstructionPublisher is available to BIS\r\nEXPECT\r\nBIS to CallPaymentInstructionPublisher.PublishPending(accountTransactionId)\r\n\r\nGIVEN\r\nBIS to CallPaymentInstructionPublisher.PublishPending(accountTransactionId)\r\n\r\nWHEN \r\nBIS throws a temporary or recoverable Exception\r\nEXPECT\r\nBIS to log the error and enter a Retry routine (maybe: with exponential backoff?)\r\n\r\nWHEN\r\nBIS throws a non-recoverable Exception\r\nEXPECT\r\nBIS to log the error and catch the Exception where it can alert the User\r\n\r\nWHEN \r\nPaymentInstructionPublisher.PublishPending(accountTransactionId) Succeeds\r\nEXPECT\r\nThe subroutine to return without Exception\r\nEXPECT\r\nA new Pending Transaction message carrying the accountTransactionId published on NATS/STAN PaymentInstructions Subscription"
                    }
                  ]
                },
                {
                  "id": "1427463",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=eric.adams",
                    "name": "eric.adams",
                    "key": "eric.adams",
                    "emailAddress": "Eric.Adams@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?avatarId=10122",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&avatarId=10122",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&avatarId=10122",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&avatarId=10122"
                    },
                    "displayName": "Eric Adams",
                    "active": true,
                    "timeZone": "America/New_York"
                  },
                  "created": "2018-04-02T18:33:27.000-0400",
                  "items": [
                    {
                      "field": "status",
                      "fieldtype": "jira",
                      "from": "10325",
                      "fromString": "Design",
                      "to": "10326",
                      "toString": "Design Done"
                    }
                  ]
                },
                {
                  "id": "1428060",
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
                  "created": "2018-04-03T11:05:46.000-0400",
                  "items": [
                    {
                      "field": "status",
                      "fieldtype": "jira",
                      "from": "10326",
                      "fromString": "Design Done",
                      "to": "10149",
                      "toString": "Development Ready"
                    }
                  ]
                },
                {
                  "id": "1428120",
                  "author": {
                    "self": "https://jira.carezen.local/rest/api/2/user?username=sean.schade",
                    "name": "sean.schade",
                    "key": "sean.shade",
                    "emailAddress": "sean.schade@myHomePay.com",
                    "avatarUrls": {
                      "48x48": "https://jira.carezen.local/secure/useravatar?ownerId=sean.shade&avatarId=13606",
                      "24x24": "https://jira.carezen.local/secure/useravatar?size=small&ownerId=sean.shade&avatarId=13606",
                      "16x16": "https://jira.carezen.local/secure/useravatar?size=xsmall&ownerId=sean.shade&avatarId=13606",
                      "32x32": "https://jira.carezen.local/secure/useravatar?size=medium&ownerId=sean.shade&avatarId=13606"
                    },
                    "displayName": "Sean Schade",
                    "active": true,
                    "timeZone": "America/Chicago"
                  },
                  "created": "2018-04-03T11:51:32.000-0400",
                  "items": [
                    {
                      "field": "assignee",
                      "fieldtype": "jira",
                      "from": "eric.adams",
                      "fromString": "Eric Adams",
                      "to": null,
                      "toString": null
                    }
                  ]
                }
              ]
            }
          }
        ]
        }
        return workItems.issues;
  }
}
