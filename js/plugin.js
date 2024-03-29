var $$ = muttcube.selector;

function wait_tinymce(){
    if ($('#composebody_ifr').length == 0){
        setTimeout('wait_tinymce()', 100);
    }
    else {
        $('body', $('#composebody_ifr').contents()).keydown(function(ev){
            if (ev.which == 27){
                $('#_to', $(top.document)).focus().blur();
            }
        });
    }
}

$(function() {
    muttcube.set_start_mode();
    muttcube.set_status_bar();

    $('body').keydown(function(e){
        return muttcube_key_handle(e);
    });

   if (document.querySelector('div#compose_to')) {
        selector = "ul textarea, ul input, input#compose-subject, textarea#composebody";
    } else {
        selector = "textarea, input";
    }

    $(selector).focus(function(ev){
        if ($(ev.currentTarget).attr('id') != 'muttcube-focus' && $(ev.currentTarget).attr('type') != 'file'){
            muttcube.modes.insert.old_mode = muttcube.current_mode;
            muttcube.commands.change_mode("insert");
        }
    }).blur(function(ev){
        if ($(ev.currentTarget).attr('id') != 'muttcube-focus'){
            muttcube.commands.change_mode(muttcube.modes.insert.prev_mode());
        }
    });

    if (rcmail.env.action == 'compose'){
        if ($('input[name="_is_html"]').val() == '1'){
            wait_tinymce();
        }

        // Hack for jsvi editor
        if (typeof(editor) != 'undefined'){
            $('#composebody').on('vi_quit', function(ev){
                $(this).blur();
            })
        }
    }

    function muttcube_key_handle(ev){
        // Hack for jsvi_editor (if used)
        if (typeof(editor) != 'undefined' && $('.editor:visible').length > 0){
            return true;
        }
        var flags = (ev.altKey ? '1' : '0') + 
            (ev.ctrlKey ? '1' : '0') + 
            (ev.metaKey ? '1' : '0') + 
            (ev.shiftKey ? '1' : '0');

        if (MuttatorKeys['key_disable'] == 'key_' + flags + '_' + String.fromCharCode(ev.which)){
            muttcube.commands.toggle_enabled();
        }

        if (muttcube.disabled){
            return true;
        }
        if (typeof(muttcube.ignore_keys['i_' + ev.which]) != 'undefined'){
            return true;
        }
        if ((ev.which >= 16 && ev.which <= 18) || ev.which == 91){
            return true;
        }
        if (($("*:focus").is("textarea, input") && $('*:focus').attr('id') != 'muttcube-focus')) {
            if (ev.which == 27){
                muttcube.commands.change_mode(muttcube.modes.insert.prev_mode());
            }
            else if (ev.which == 13 && $('*:focus').attr('id') == 'muttcube-command-input'){
                muttcube.commands.execute_command();
            }
            return true;
        }

        if (muttcube.root == null){
            muttcube.reset_key_chain();
        }

        if (typeof(muttcube.modes[muttcube.current_mode].get_rcmail) != 'undefined'){
            muttcube._rcmail = muttcube.modes[muttcube.current_mode].get_rcmail();
        }
        else {
            muttcube._rcmail = rcmail;
        }

        if (flags == '0000' && ev.keyCode == 27){
            var m = muttcube.modes[muttcube.current_mode].prev_mode;
            if (typeof(m) != 'undefined'){
                if (m() != muttcube.current_mode){
                    muttcube.commands.change_mode(m());
                }
            }
            return false;
        }

        if (flags == '0000' && ev.keyCode == 13 && muttcube.exec_on_enter){
            muttcube.execute_root();
            return false;
        }

        if (typeof(muttcube.root['chain']) != 'undefined'){
            muttcube.root = muttcube.root['chain'];
        }

        var key = 'key_' + flags + '_' + String.fromCharCode(ev.which);

        if (typeof(muttcube.root['key_' + flags + '__' + ev.keyCode]) != 'undefined'){
            key = 'key_' + flags + '__' + ev.keyCode;
        }

        if (typeof(muttcube.root[key]) == 'undefined'){
            muttcube.reset_key_chain();
            return true;
        }

        muttcube.root = muttcube.root[key];

        if (typeof(muttcube.root['chain']) != 'undefined'){
            muttcube.start_chain_timeout(ev.which, ev.keyCode);
            return false;
        }

        muttcube.execute_root();
        return false;
    }
});

