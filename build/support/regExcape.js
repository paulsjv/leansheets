// regExcape
// ---------
// Escapes a string so that it may be used in a RegExp constructor.
export default (regexStr) => regexStr.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
