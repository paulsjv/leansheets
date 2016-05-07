import fs from 'fs';

export default class FileUtil {

    // FileUtil
    // --------
    // Reads a JSON file into an Object
    // If stripComments is truthy, first removes any comments that may be present to prevent parse errors.
    // Known Issue: Stripping Comments doesn't play nice with URL's...
    static readJSON(filename, stripComments) {

        let result = fs.readFileSync(filename, 'utf8');

        if (stripComments) {
            result = result.replace(/((\/\/.*)|(\/\*[\w\W]*\*\/))/g, '');
        }

        return JSON.parse(result);

    }

};
