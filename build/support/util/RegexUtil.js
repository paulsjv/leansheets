module.exports = class RegexUtil {

    static escape(regexStr) {
        return regexStr.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }
    
};
