import fs from 'fs';

// readJSON
// --------
// Reads a JSON file into an Object, but first removes any comments that may be present to prevent parse errors.
export default (filename) => {
    return JSON.parse(fs.readFileSync(filename, 'utf8').replace(/((\/\/.*)|(\/\*[\w\W]*\*\/))/g, ''));
};
