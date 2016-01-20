import isEmpty from 'www/js/utils/isEmpty';
import isString from 'www/js/utils/isString';
import hasOwnProp from 'www/js/utils/hasOwnProp';

// commented out lines are not supported
var isoDates = {
//    'YYYYYY-MM-DD': /[+-]\d{6}-\d\d-\d\d/,
    'YYYY-MM-DD': {
        'regex': /(\d{4})-(\d\d)-(\d\d)/,
        'year': 1, 
        'month': 2,
        'day':3
    }
//    'GGGG-[W]WW-E': /\d{4}-W\d\d-\d/,
//    'GGGG-[W]WW': /\d{4}-W\d\d/,
//    'YYYY-DDD': /\d{4}-\d{3}/,
//    'YYYY-MM': /\d{4}-\d\d/,
//    'YYYYYYMMDD': /[+-]\d{10}/,
//    'YYYYMMDD': /\d{8}/,
    // YYYYMM is NOT allowed by the standard
//    'GGGG[W]WWE': /\d{4}W\d{3}/,
//    'GGGG[W]WW': /\d{4}W\d{2}/,
//    'YYYYDDD': /\d{7}/
};

var validateDate = (year, month, day) => {
    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month === 0 || month > 12) {
        return false;
    }

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
        monthLength[1] = 29;
    }

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
};

export default function isDate (input, format) {
    if (isEmpty(input) || isEmpty(format)) {
        return false;
    }
    
    if (!isString(input) || !isString(format)) {
        return false;
    }

    if (!hasOwnProp(isoDates, format)) {
        throw new Error('isDate - format "'+ format + '" is not supported!'); 
    }

    let regex = isoDates[format].regex;
    if (!regex.test(input)) {
        return false;
    }
    
    let match = input.match(regex);
    let year = match[isoDates[format].year];
    let month = match[isoDates[format].month];
    let day = match[isoDates[format].day];

    return validateDate(year, month, day);
} 
