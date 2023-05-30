class IndicatorParser {
    // Regexes
    constructor() {
        this.domain = new RegExp(/^((?!-)[_A-Za-z0-9-]{1,63}(?<!-)\.)+([A-Za-z]{2,63})$/);
        this.def_domain = new RegExp(/^((?!-)[_A-Za-z0-9-]{1,63}(?<!-)(?:(\[\.\]|\.)))+[A-Za-z]{2,63}$/);
        this.url = new RegExp(/^(?:http[s]?):\/\/((?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,63})\b(?:[-a-zA-Z0-9@:%_\+.~#?&//=]*)$/);
        this.def_url = new RegExp(/^(?:h(xx|XX|tt)p[s]?):\/\/(?:www(?:(\[\.\]|\.)))?(?:[-a-zA-Z0-9@:%_\+~#=]+(\[\.\]|\.))+(?:[a-z]{2,63})\b(?:[-a-zA-Z0-9@:%_\+.~#?&//=]*)$/)
        this.ip = new RegExp(/^(?!0)(?!.*\.$)((2[0-4][0-9]|25[0-5]|1[0-9][0-9]|[1-9][0-9]|\d)\.){3}(2[0-4][0-9]|25[0-5]|1[0-9][0-9]|[1-9][0-9]|\d)$/);
        this.def_ip = new RegExp(/^(?!0)(?!.*\.$)((2[0-4][0-9]|25[0-5]|1[0-9][0-9]|[1-9][0-9]|\d)(?:(\[\.\]|\.))){3}(2[0-4][0-9]|25[0-5]|1[0-9][0-9]|[1-9][0-9]|\d)$/);
    }
   

    /**
     * Get the type of the indicator given as parameter
     * @param{indicator} String that may contain an indicator
     * @return Type of the indicator detected, if it is valid
     */
    getIndicatorType(indicator) {

        if(indicator.match(this.domain) || indicator.match(this.ip) || indicator.match(this.url)) {
            return "refanged";
        }  else if(indicator.match(this.def_domain) || indicator.match(this.def_ip) || 
            indicator.match(this.def_url)) {
            return "defanged";
        } else {
            return "invalid";
        }
    }


    /**
     * Get the original indicator from the defanged one
     * @param{def_indicator} defanged indicator to parse
     * @return Usable indicator that can be used as parameter for queries
     */
    refangIndicator(def_indicator) {
        // If the indicator is an URL, remove the "xx" from "http"
        if(def_indicator.match(this.def_url)) {
            def_indicator = def_indicator.replaceAll("hxxp","http");
            def_indicator = def_indicator.replaceAll("hXXp","http");
        }
        // Remove square brackets
        def_indicator = def_indicator.replaceAll("[", "");
        let ref_indicator = def_indicator.replaceAll("]", "");
        return ref_indicator;
        
    }

    /**
     * Get the defanged indicator from the original
     * @param{indicator} indicator to defang
     * @return defanged indicator
     */
    defangIndicator(indicator) {
        if(indicator.match(this.url)) {
            indicator = indicator.replaceAll("http", "hXXp");
        }
        let def_indicator = indicator.replaceAll(".", "[.]");
        return def_indicator;
    }
}
