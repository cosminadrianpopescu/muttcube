var muttcube_i18n = {
    gettext: function(txt, params){
        if (typeof(params) == 'undefined' || params == null){
            params = {};
        }

        var result = rcmail.gettext("muttcube." + txt);
        for (var key in params){
            result = result.replace(new RegExp("#" + key + "#", 'g'), params[key]);
        }

        return result;
    }
}
