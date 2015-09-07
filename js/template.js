var muttcube_tpl = {
    render: function(id, values){
        var html = $('#' + id).text();
        for (var i in values){
            html = html.replace(new RegExp('#' + i + '#', 'g'), values[i]);
        }

        return html;
    }
}
