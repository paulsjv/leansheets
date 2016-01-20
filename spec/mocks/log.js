export default class Log {
    log(prefix, message) { 
        if (this.enabled) { console.log(prefix + message); } 
    }
	debug(message) { this.log('DEBUG: ', message); }
	error(message) { this.log('ERROR: ', message); }
    // set to true to enable logging - useful for debugging unit tests
    setEnabled(bool) { this.enabled = bool; }
}
