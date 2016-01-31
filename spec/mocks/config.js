export const CONFIG = {
    "dataSources": { 
        "Team 1": {
            "config": "config url",
            "data": "data url",
            "dataServiceDriver": "GoogleFactory",
            "dateFormat": "YYYY-MM-DD",
            "queryConfig": {
                "id": "A",
                "description": "B",
                "link": "C",
                "states": [ "D","E","F","G" ],
                "tags": [ "H","I","J","K","L" ],
                "risks": [ "M","N","O" ]
            },
        }, 
            "Team 2": {
                "dataSource": "JIRA",
                "data": "data url"
            }
        },
        "globalDataSource": "google",
        "debugEnabled": true,
        "showAllWork": true,
        "datePickerFormat": "mm/dd/yyyy",
        "datePickerMomentFormat": "MM/DD/YYYY",
        "queryDateMomentFormat": "YYYY-MM-DD",
        "defaultHistoricalNumberOfDays": 60
}
