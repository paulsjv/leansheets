export default class HistogramModel {

    constructor() {
        // Root element Histogram is going to attach itself to DOM
        this.rootElement            = null;
        // Histogram Properties
        this.svgHeight              = null;
        this.svgWidth               = null;
        this.barContainerHeight     = null;
        this.barContainerWidth      = null;
        this.margin                 = null; 
        this.padding                = null; 
        this.ticks                  = null; 
        this.domainMax              = null;
        this.barHeight              = null;

        // D3 Scales
        this.scaleBand              = null;
    }

    // Root Element
    getRootElement()                       { return this.rootElement;                  }
    setRootElement(element)                { this.rootElement = element;               }

    // Histogram Properties
    get svgHeight()                         { return this.svgHeight;                    }
    set svgHeight(height)                   { this.svgHeight = height;                  }
    get svgWidth()                          { return this.svgWidth;                     }
    set svgWidth(width)                     { this.svgWidth = width;                    }
    get barContainerHeight()                { return this.barContainerHeight;           }
    set barContainerHeight(height)          { this.barContainerHeight = height;         }
    get barContainerWidth()                 { return this.barContainerWidth;            }
    set barContainerWidth(width)            { this.barContainerWidth = width;           }
    get margin()                            { return this.margin;                       }
    set margin(margin)                      { this.margin = margin;                     }
    get padding()                           { return this.padding;                      }
    set padding(padding)                    { this.padding = padding;                   }
    get ticks()                             { return this.ticks;                        }
    set ticks(ticks)                        { this.ticks = ticks;                       }
    get domainMax()                         { return this.domainMax;                    }
    set domainMax(domainMax)                { this.domainMax = domainMax;               }
    get barHeight()                         { return this.barHeight;                    }
    set barHeight(barHeight)                { this.barHeight = barHeight;               }

    // D3 Scales
    get scaleBand()                         { return this.scaleBand;                    }
    set scaleBand(scale)                    { this.scaleBand = scale;                   }
}
