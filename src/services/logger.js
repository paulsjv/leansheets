
const logger = {
    debug: str => {},
    error: str => {},
    trace: str => {}
}

function log() {
    // https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
    return process.env.REACT_APP_DEBUG_ENABLED === 'true' ? console : logger;
}

export default log();