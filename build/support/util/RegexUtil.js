export default class RegexUtil {

    static escape(regexStr) {
        return regexStr.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }
    
}
