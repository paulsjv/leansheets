
    export interface StatusCategory {
        self: string;
        id: number;
        key: string;
        colorName: string;
        name: string;
    };

    export interface Status {
        self: string;
        description: string;
        iconUrl: string;
        name: string;
        id: string;
        statusCategory: StatusCategory;
    };

    export interface Priority {
        self: string;
        iconUrl: string;
        name: string;
        id: string;
    };

    export interface Issuetype {
        self: string;
        id: string;
        description: string;
        iconUrl: string;
        name: string;
        subtask: boolean;
    };

    export interface Fields2 {
        summary: string;
        status: Status;
        priority: Priority;
        issuetype: Issuetype;
    };

    export interface Parent {
        id: string;
        key: string;
        self: string;
        fields: Fields2;
    };

    export interface AvatarUrls {
        fourty8xfourty8: string;
        twenty4xtwenty4: string;
        sixteenxsixteen: string;
        thirty2xthirty2: string;
    };

    export interface Customfield12015 {
        self: string;
        name: string;
        key: string;
        emailAddress: string;
        avatarUrls: AvatarUrls;
        displayName: string;
        active: boolean;
        timeZone: string;
    };

    export interface Resolution {
        self: string;
        id: string;
        description: string;
        name: string;
    };

    export interface AvatarUrls2 {
        fourty8xfourty8: string;
        twenty4xtwenty4: string;
        sixteenxsixteen: string;
        thirty2xthirty2: string;
    };

    export interface Customfield12014 {
        self: string;
        name: string;
        key: string;
        emailAddress: string;
        avatarUrls: AvatarUrls2;
        displayName: string;
        active: boolean;
        timeZone: string;
    };

    export interface AvatarUrls3 {
        fourty8xfourty8: string;
        twenty4xtwenty4: string;
        sixteenxsixteen: string;
        thirty2xthirty2: string;
    };

    export interface Customfield12016 {
        self: string;
        name: string;
        key: string;
        emailAddress: string;
        avatarUrls: AvatarUrls3;
        displayName: string;
        active: boolean;
        timeZone: string;
    };

    export interface Priority2 {
        self: string;
        iconUrl: string;
        name: string;
        id: string;
    };

    export interface Type {
        id: string;
        name: string;
        inward: string;
        outward: string;
        self: string;
    };

    export interface StatusCategory2 {
        self: string;
        id: number;
        key: string;
        colorName: string;
        name: string;
    };

    export interface Status2 {
        self: string;
        description: string;
        iconUrl: string;
        name: string;
        id: string;
        statusCategory: StatusCategory2;
    };

    export interface Priority3 {
        self: string;
        iconUrl: string;
        name: string;
        id: string;
    };

    export interface Issuetype2 {
        self: string;
        id: string;
        description: string;
        iconUrl: string;
        name: string;
        subtask: boolean;
    };

    export interface Fields3 {
        summary: string;
        status: Status2;
        priority: Priority3;
        issuetype: Issuetype2;
    };

    export interface InwardIssue {
        id: string;
        key: string;
        self: string;
        fields: Fields3;
    };

    export interface Issuelink {
        id: string;
        self: string;
        type: Type;
        inwardIssue: InwardIssue;
    };

    export interface AvatarUrls4 {
        fourty8xfourty8: string;
        twenty4xtwenty4: string;
        sixteenxsixteen: string;
        thirty2xthirty2: string;
    };

    export interface Assignee {
        self: string;
        name: string;
        key: string;
        emailAddress: string;
        avatarUrls: AvatarUrls4;
        displayName: string;
        active: boolean;
        timeZone: string;
    };

    export interface StatusCategory3 {
        self: string;
        id: number;
        key: string;
        colorName: string;
        name: string;
    };

    export interface Status3 {
        self: string;
        description: string;
        iconUrl: string;
        name: string;
        id: string;
        statusCategory: StatusCategory3;
    };

    export interface Component {
        self: string;
        id: string;
        name: string;
    };

    export interface Customfield11416 {
        self: string;
        value: string;
        id: string;
    };

    export interface Customfield11415 {
        self: string;
        value: string;
        id: string;
    };

    export interface AvatarUrls5 {
        fourty8xfourty8: string;
        twenty4xtwenty4: string;
        sixteenxsixteen: string;
        thirty2xthirty2: string;
    };

    export interface Creator {
        self: string;
        name: string;
        key: string;
        emailAddress: string;
        avatarUrls: AvatarUrls5;
        displayName: string;
        active: boolean;
        timeZone: string;
    };

    export interface AvatarUrls6 {
        fourty8xfourty8: string;
        twenty4xtwenty4: string;
        sixteenxsixteen: string;
        thirty2xthirty2: string;
    };

    export interface Reporter {
        self: string;
        name: string;
        key: string;
        emailAddress: string;
        avatarUrls: AvatarUrls6;
        displayName: string;
        active: boolean;
        timeZone: string;
    };

    export interface Aggregateprogress {
        progress: number;
        total: number;
    };

    export interface Progress {
        progress: number;
        total: number;
    };

    export interface Votes {
        self: string;
        votes: number;
        hasVoted: boolean;
    };

    export interface Worklog {
        startAt: number;
        maxResults: number;
        total: number;
        worklogs: any[];
    };

    export interface Issuetype3 {
        self: string;
        id: string;
        description: string;
        iconUrl: string;
        name: string;
        subtask: boolean;
    };

    export interface AvatarUrls7 {
        fourty8xfourty8: string;
        twenty4xtwenty4: string;
        sixteenxsixteen: string;
        thirty2xthirty2: string;
    };

    export interface Project {
        self: string;
        id: string;
        key: string;
        name: string;
        avatarUrls: AvatarUrls7;
    };

    export interface Watches {
        self: string;
        watchCount: number;
        isWatching: boolean;
    };

    export interface Timetracking {
    };

    export interface Customfield10000 {
        self: string;
        value: string;
        id: string;
    };

    export interface AvatarUrls8 {
        fourty8xfourty8: string;
        twenty4xtwenty4: string;
        sixteenxsixteen: string;
        thirty2xthirty2: string;
    };

    export interface Customfield10004 {
        self: string;
        name: string;
        key: string;
        emailAddress: string;
        avatarUrls: AvatarUrls8;
        displayName: string;
        active: boolean;
        timeZone: string;
    };

    export interface Comment {
        startAt: number;
        maxResults: number;
        total: number;
        comments: any[];
    };

    export interface Fields {
        parent: Parent;
        customfield_12011?: any;
        customfield_12010?: any;
        customfield_12013?: any;
        customfield_12530?: any;
        fixVersions: any[];
        customfield_12012?: any;
        customfield_12015: Customfield12015;
        customfield_12532?: any;
        customfield_12411?: any;
        resolution: Resolution;
        customfield_12014: Customfield12014;
        customfield_12531?: any;
        customfield_12410?: any;
        customfield_11169?: any;
        customfield_12017?: any;
        customfield_12413?: any;
        customfield_12016: Customfield12016;
        customfield_12533?: any;
        customfield_11711: string;
        customfield_12525?: any;
        customfield_11710?: any;
        customfield_12524?: any;
        customfield_11713: string;
        customfield_12527?: any;
        customfield_11712: string;
        customfield_11714?: any;
        customfield_12528?: any;
        lastViewed?: any;
        priority: Priority2;
        customfield_11311?: any;
        customfield_12520?: any;
        customfield_12523?: any;
        labels: string[];
        customfield_12514?: any;
        customfield_10215?: any;
        customfield_12516?: any;
        customfield_10217?: any;
        customfield_12515?: any;
        customfield_12518?: any;
        aggregatetimeoriginalestimate?: any;
        timeestimate?: any;
        customfield_10219?: any;
        customfield_10615?: any;
        customfield_12519?: any;
        issuelinks: Issuelink[];
        assignee: Assignee;
        status: Status3;
        components: Component[];
        customfield_12110?: any;
        customfield_12510?: any;
        customfield_12512?: any;
        customfield_10213: string;
        customfield_11810?: any;
        customfield_11416: Customfield11416;
        customfield_11415: Customfield11415;
        customfield_11811: string;
        aggregatetimeestimate?: any;
        customfield_11417?: any;
        creator: Creator;
        subtasks: any[];
        reporter: Reporter;
        aggregateprogress: Aggregateprogress;
        customfield_11411?: any;
        customfield_10317?: any;
        progress: Progress;
        votes: Votes;
        worklog: Worklog;
        issuetype: Issuetype3;
        customfield_12570?: any;
        timespent?: any;
        customfield_12572?: any;
        customfield_12571?: any;
        project: Project;
        customfield_12210?: any;
        aggregatetimespent?: any;
        customfield_11640?: any;
        customfield_11643?: any;
        customfield_11634?: any;
        customfield_12569?: any;
        customfield_11633?: any;
        customfield_11636: string;
        customfield_11911?: any;
        customfield_11635?: any;
        customfield_11910?: any;
        customfield_11638?: any;
        customfield_11637?: any;
        resolutiondate: Date;
        customfield_11639?: any;
        workratio: number;
        watches: Watches;
        created: Date;
        customfield_12561?: any;
        customfield_12560?: any;
        customfield_12563?: any;
        customfield_12562?: any;
        customfield_11630?: any;
        customfield_12565?: any;
        customfield_12564?: any;
        customfield_11632?: any;
        customfield_12567?: any;
        customfield_11631?: any;
        customfield_12566?: any;
        customfield_12558?: any;
        customfield_12557?: any;
        customfield_11625?: any;
        customfield_11624?: any;
        customfield_12559?: any;
        customfield_11627?: any;
        customfield_11629?: any;
        customfield_10815?: any;
        customfield_11628?: any;
        updated: Date;
        timeoriginalestimate?: any;
        description: string;
        customfield_12310?: any;
        customfield_12551?: any;
        customfield_12554?: any;
        customfield_12312?: any;
        customfield_12553?: any;
        customfield_12311?: any;
        customfield_10410: string;
        customfield_12556?: any;
        timetracking: Timetracking;
        customfield_10411: string[];
        customfield_12555?: any;
        customfield_12313?: any;
        customfield_10005?: any;
        customfield_10126?: any;
        customfield_10006?: any;
        customfield_12546?: any;
        customfield_12549?: any;
        customfield_12548?: any;
        attachment: any[];
        customfield_11617?: any;
        summary: string;
        customfield_12541?: any;
        customfield_10000: Customfield10000;
        customfield_12540?: any;
        customfield_12542?: any;
        customfield_10003?: any;
        customfield_12545?: any;
        customfield_10004: Customfield10004;
        customfield_12536?: any;
        customfield_12535?: any;
        environment?: any;
        customfield_12537?: any;
        customfield_10515?: any;
        duedate?: any;
        comment: Comment;
    };

    export interface AvatarUrls9 {
        fourty8xfourty: string;
        twenty4xtwenty4: string;
        sixteenxsixteen: string;
        thirty2xthirty2: string;
    };

    export interface Author {
        self: string;
        name: string;
        key: string;
        emailAddress: string;
        avatarUrls: AvatarUrls9;
        displayName: string;
        active: boolean;
        timeZone: string;
    };

    export interface Item {
        field: string;
        fieldtype: string;
        from: string;
        fromString: string;
        to: string;
        toString: string;
    };

    export interface History {
        id: string;
        author: Author;
        created: Date;
        items: Item[];
    };

    export interface Changelog {
        startAt: number;
        maxResults: number;
        total: number;
        histories: History[];
    };

    export interface RootObject {
        expand: string;
        id: string;
        self: string;
        key: string;
        fields: Fields;
        changelog: Changelog;
    };

