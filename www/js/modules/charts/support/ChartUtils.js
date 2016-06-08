import * as d3 from './d3';

export default class ChartUtils {

    static calcHistogramDomainMax(data, ticks) {

        let frequencies = data.map((datum) => {
                return datum.frequency;
            }),
            domainMax = d3.max([d3.max(frequencies), ticks]),
            remainder = domainMax % ticks;

        if (remainder > 0 || domainMax === d3.max(frequencies)) {
            domainMax += (ticks - remainder);
        }

        return domainMax;
        
    }

};
