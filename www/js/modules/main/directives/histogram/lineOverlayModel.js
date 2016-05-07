export default class LineOverlayModel {
    
    constructor() {
        this.percentageTickMaxValue     = null; 
    }

    get percentageTickMaxValue()             { return this.percentageTickMaxValue;       } 
    set percentageTickMaxValue(percentage)   { this.percentageTickMaxValue = percentage; }
}
