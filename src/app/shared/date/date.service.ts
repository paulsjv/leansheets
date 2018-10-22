import { Injectable } from '@angular/core';
//import * as moment from 'moment';
/*
declare var require: any;
var format = require('date-fns/format/index');
var differenceInCalendarDays = require('date-fns/difference_in_calendar_days/index');
var parse = require('date-fns/parse/index');
*/

import { format, parse, differenceInCalendarDays } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  format(
    date: Date | string | number,
    formatString: string,
    options?: Options
  ): string {
	return format(date, formatString, options);
  }

  parse(    
    dateString: string,
    formatString: string,
    baseDate: Date | string | number,
    options?: Options
  ): Date {
	return parse(dateString, formatString, baseDate, options);
  }

  differenceInCalendarDays(
    dateLeft: Date | string | number,
    dateRight: Date | string | number,
    options?: Options
  ): number {
	return differenceInCalendarDays(dateLeft, dateRight, options);
  } 

/*
 test() {
	moment().format('LLLL');
 }
*/
}
