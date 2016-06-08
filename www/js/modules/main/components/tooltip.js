import { select }   from 'www/js/modules/utils/d3';

export default class ToolTip {

    constructor(log, className) {
        this.log        = log;
        this.tooltip    = null;
        this.className  = className;
    }

    add() {
        this.tooltip = select('body').append('div')
                            .attr('class', this.className);
    }

    show(top, left, innerHtml) {
        this.tooltip
                .style('visibility', 'visible')
                .style('top', top)
                .style('left', left)
                .html(innerHtml);
    }

    hide() {
        this.tooltip.style('visibility', 'hidden');
    }

    remove() {
       this.tooltip.remove(); 
    }
}
