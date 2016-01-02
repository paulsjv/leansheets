export default new Promise((resolve, reject) => {

    if (window.google) {
        window.google.load('visualization', '1', {
            packages: ['corechart', 'geochart', 'table'],
            callback: () => {
                resolve(window.google);
            }
        });
    } else {
        reject("Google jsapi not loaded. Did you forget to include the script tag above the main bundle?");
    }
});
