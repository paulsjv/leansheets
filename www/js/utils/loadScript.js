export default (url, callback) => {
    
    return new Promise((resolve) => {

        let script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.src = url;

        if (script.readyState) {

            script.onreadystatechange = () => {

                if (script.readyState === "loaded" || script.readyState === "complete") {

                    script.onreadystatechange = null;

                    if (callback && typeof callback === "function") {
                        resolve(callback());
                    } else {
                        resolve();
                    }

                }

            };

        } else {

            script.onload = () => {

                if (callback && typeof callback === "function") {
                    resolve(callback());
                } else {
                    resolve();
                }

            };

        }

        document.body.appendChild(script);
        
    });

};
