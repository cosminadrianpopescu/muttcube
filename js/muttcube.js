var muttcube = {
    current_mode: 'normal', 
    start_mode: null, 
    root: null,
    chain_timeout_id: null,
    timeout: 1000,
    _rcmail: null,
    exec_on_enter: true,
    ignore_keys: {'i_45': 1},
    disabled: false,

    get_ui: function(){
        if (typeof(UI) != 'undefined'){
            return UI;
        }
        return rcmail_ui;
    },

    selector: function(sel){
        var context = $(document);
        if (typeof(muttcube.modes[muttcube.current_mode].get_context) != 'undefined'){
            context = muttcube.modes[muttcube.current_mode].get_context();
        }

        return $(sel, context);
    },

    set_start_mode: function(){
        this.start_mode = 'normal';
        if (rcmail.env.action == 'show' || rcmail.env.action == 'preview'){
            this.commands.change_mode('message');
        }
        else if (rcmail.env.action == 'compose'){
            this.commands.change_mode('compose');
        }
        else {
            this.commands.change_mode('normal');
        }
    },

    set_status_bar: function(){
        var bar = $('#muttcube-statusbar');
        bar.width($(window).width() - 10).offset({left: 5, top: $(window).height() - bar.height() - 5});
    },

    print_status_bar(text, section){
        if (typeof(section) == 'undefined' || section == null){
            section = 'message';
        }

        $('#muttcube-statusbar-' + section).text(text);
    },

    modes: {
        normal: {
            text: muttcube_i18n.gettext("normalmode.text"), 
            get_rcmail: function(){
                return top.window.rcmail;
            },
        },
        message: {
            text: muttcube_i18n.gettext("messagemode.text"),
            get_context: function(){
                return $('#messagecontframe').length > 0 ? $('#messagecontframe').contents() : $(document);
            },
            prev_mode: function(){
                if (rcmail.env.action == 'show' || rcmail.env.action == 'preview'){
                    return 'message';
                }
                return 'normal';
            },
            init: function(){
                if ($('#messagecontframe:visible').length == 0 && $('#messagecontframe').length > 0){
                    muttcube.commands.change_mode('normal');
                }
            },
        },
        follow_links: {
            text: muttcube_i18n.gettext("followliksmode.text"), 
            selector: '#messagebody a,#attachment-list a[class != "drop"]',
            init: function(){
                muttcube.exec_on_enter = false;
                var n = 1;
                $$(this.selector).each(function(idx){
                    if (!$(this).hasClass('follow-link-skip')){
                        $(this).before(muttcube_tpl.render('followlink_template', {id: n++}));
                        $(this).addClass('link-background');
                        if (n == 2){
                            $(this).addClass('link-background-default');
                        }
                    }
                });

                muttcube.commands.follow_link_if_one();
            },
            finish: function(){
                muttcube.exec_on_enter = true;
                muttcube.commands.stop_follow_links();
            },
            prev_mode: function(){
                return 'message'
            },
            get_context: function(){
                return muttcube.modes.message.get_context();
            },
        },
        message_caret: {
            text: muttcube_i18n.gettext("messagecaretmode.text"), 
            view_html: true, 
            init: function(){
                if (rcmail.env.action == ''){
                    var div = $('#messagepreview, #messagebody', $('#messagecontframe', $(top.document)).contents());
                    $('#messagecontframe')[0].contentWindow.muttcube.commands.change_mode('message_caret');
                    div.attr('contenteditable', "true");
                    div.focus();
                }
            },
            prev_mode: function(){
                return 'message';
            }, 
            finish: function(){
                // $('#muttator_dialog_id', $(top.document)).dialog('close');
                $$('body').attr('contenteditable', null);
                if (top !== window){
                    top.muttcube.commands.change_mode('message');
                    var uid = top.rcmail.get_single_uid();
                    top.rcmail.message_list.select_row(uid);
                }
            },
            get_context: function(){
                return muttcube.modes.message.get_context();
            },
        },
        visual: {
            text: muttcube_i18n.gettext("visualmode.text"), 
            leave_selection: false, 
            get_context: function(){
                return $(top.document);
            },
            get_rcmail: function(){
                return muttcube.modes.normal.get_rcmail();
            },
            prev_mode: function(){
                return 'normal';
            },
            init: function(){
                muttcube.exec_on_enter = false;
            },
            finish: function(key){
                var selection = muttcube._rcmail.message_list.selection;
                if (selection.length > 1){
                    if (!this.leave_selection){
                        var row_id = selection[selection.length - 1];
                        muttcube._rcmail.message_list.select_row(row_id);
                    }
                    this.leave_selection = false;
                }
                muttcube.exec_on_enter = true;
            },
        },
        folders: {
            text: muttcube_i18n.gettext("foldersmode.text"), 
            get_context: function(){
                return $(top.document);
            },
            get_rcmail: function(){
                return muttcube.modes.normal.get_rcmail();
            },
            prev_mode: function(){
                return 'normal'; 
            },
            init: function(){
                muttcube.exec_on_enter = false;
            },
            finish: function(){
                muttcube.exec_on_enter = true;
                $('.muttcube-current-folder').removeClass('muttcube-current-folder');
            }
        },
        compose: {
            text: muttcube_i18n.gettext("composemode.txt"), 
            get_context: function(){
                return $(document);
            },
            get_rcmail: function(){
                return rcmail;
            },
            prev_mode: function(){
                return 'compose';
            },
        },
        insert: {
            text: muttcube_i18n.gettext("insertmode.txt"), 
            old_mode: null, 
            get_context: function(){
                return $(document);
            },
            prev_mode: function(){
                if (this.old_mode == null){
                    return 'normal';
                }
                return this.old_mode;
            },
            get_rcmail: function(){
                return rcmail;
            },
            finish: function(){
                $(document.activeElement).blur();
            }
        },
        att_delete: {
            text: muttcube_i18n.gettext("attdeletemode.txt"), 
            get_context: function(){
                return $(document);
            },
            init: function(){
                muttcube.exec_on_enter = false;
                muttcube.commands.att_move(1);
            },
            prev_mode: function(){
                return 'compose';
            },
            get_rcmail: function(){
                return rcmail;
            },
            finish: function(){
                muttcube.exec_on_enter = true;
                $('.muttcube-current-folder').removeClass('muttcube-current-folder');
            },
        },
        contacts: {
            text: muttcube_i18n.gettext('contactsmode.txt'), 
            comming_from: null, 
            get_context: function(){
                return $(document);
            },
            prev_mode: function(){
                return 'compose';
            },
            get_rcmail: function(){
                return rcmail;
            },
            init: function(){
                muttcube.exec_on_enter = false;
                if (this.comming_from != '/'){
                    if ($('#contacts-table tr').length == 0){
                        muttcube.commands.change_mode(this.prev_mode());
                    }
                }
                this.comming_from = null;
            },
            finish: function(){
                muttcube.exec_on_enter = true;
            },
        },
    }, 

    get_message_frame: function(){
        if ($('#messagecontframe').length > 0){
            return $('#messagecontframe', $(top.document))[0].contentWindow;
        }
        if ($('messagecontent').length > 0){
            return $('#messagecontent')[0];
        }
        return $('#messagepreview, #messagebody')[0];
    },

    open_in_new_tab: function(url){
        var a = muttcube_tpl.render('muttator_new_window', {url: url});
        $('body', $(top.document)).append(a);
        console.log('a is ', a);
        $('#muttator_new_window_a')[0].click();
        $('#muttator_new_window_a').remove();
    },

    last_search: {
        results: [], 
        dir: 0, 

        quick_search: function(field, dir){
            if (muttcube._rcmail.message_list.selection.length == 0){
                return ;
            }
            muttcube.last_search.dir = dir;
            var idx = $$('#messagelist th[rel="' + field + '"]').index();
            var row = $$('#messagelist .selected');
            var term = muttcube._rcmail.message_list.get_cell(row, idx).text();
            muttcube.last_search.results.splice(0, muttcube.last_search.results.length);
            var n = 0;
            $$('#messagelist tr.message').each(function(_idx){
                var t = muttcube._rcmail.message_list.get_cell($(this), idx).text();
                muttcube.last_search.results.push({uid: $(this).data('uid'), id: $(this).attr('id'), m: t.toLowerCase() == term.toLowerCase() ? ++n : 0});
            });
        },

        inc_result: function(start){
            var result = start * 1 + this.dir * 1;
            if (result >= this.results.length && this.dir > 0){
                result = 0;
            }
            else if (result < 0 && this.dir < 0) {
                result = this.results.length - 1;
            }

            return result;
        },

        next_idx: function(){
            var uid = $$('#messagelist .selected').data('uid');
            var start = -1;
            for (var i in this.results){
                if (this.results[i].uid == uid){
                    start = i;
                    break;
                }
            }
            if (start != -1){
                var result = this.inc_result(start, this.dir);

                while (result != start){
                    if ($$('#' + this.results[result].id).is(':visible') && this.results[result].m){
                        return result;
                    }

                    result = this.inc_result(result, this.dir);
                }
            }

            return -1;
        },

        next_result: function(){
            var next_idx = this.next_idx();
            if (next_idx != -1){
                var uid = this.results[next_idx].uid;
                muttcube._rcmail.message_list.select_row(uid);
                muttcube._rcmail.message_list.scrollto(uid);
                var count = 0;
                for (var i = this.results.length - 1; i >= 0; i--){
                    if (this.results[i].m){
                        count = this.results[i].m;
                        break;
                    }
                }
                var msg = muttcube_i18n.gettext("search.result", {idx: this.results[next_idx].m, count: count, s: (count > 1 ? 's' : '')}, 'message');
                muttcube.print_status_bar(msg)
            }
            else {
                muttcube.print_status_bar(muttcube_i18n.gettext("search.noresult"), 'message')
            }
        },
    }, 

    reset_key_chain: function(){
        this.root = MuttatorKeys['mode_' + this.current_mode];
        this.print_status_bar('', 'keychain');
    },

    reset_chain_timeout: function(){
        if (this.chain_timeout_id != null){
            clearTimeout(this.chain_timeout_id);
            this.chain_timeout_id = null;
        }
    },

    start_chain_timeout: function(which, keyCode){
        var that = this;
        this.reset_chain_timeout();
        this.chain_timeout_id = setTimeout(function(){
            that.chain_timed_out();
        }, this.timeout);

        var txt = "<" + which + ">";
        if (typeof(keyCode) != 'undefined' && keyCode !== 0){
            txt = String.fromCharCode(keyCode);
        }

        txt = $('#muttcube-statusbar-keychain').text() + txt;
        this.print_status_bar(txt, 'keychain');
    },

    execute_root: function(){
        this.reset_chain_timeout();
        if (typeof(this.root['command']) != 'undefined'){
            if (this.root['command'].match(/\(/g)){
                eval(this.root['command']);
            }
            else {
                this.commands[this.root['command']]();
            }
        }
        this.reset_key_chain();
    },

    chain_timed_out: function(){
        this.execute_root();
    },

    commands: {
        go_message: function(where){
            if (muttcube._rcmail.message_list.selection.length == 0){
                muttcube._rcmail.message_list.select_first();
            }
            else {
                var row = muttcube._rcmail.message_list[where]();
                if (row != null){
                    muttcube._rcmail.message_list.select_row(row.uid, muttcube.current_mode == 'visual' ? SHIFT_KEY : 0);
                    muttcube._rcmail.message_list.scrollto(row.uid);
                }
            }
        },

        message_to_top: function(){
            var container = $$('#messagelistcontainer');
            var element = $$('#messagelist .selected').first();

            container.scrollTop(element.offset().top - container.offset().top + container.scrollTop() - element.height());
        },

        message_to_bottom: function(){
            var container = $$('#messagelistcontainer');
            var element = $$('#messagelist .selected').first();

            container.scrollTop(element.offset().top - container.offset().top + container.scrollTop() + element.height() - container.height());
        },

        message_to_middle: function(){
            var container = $$('#messagelistcontainer');
            var element = $$('#messagelist .selected').first();

            container.scrollTop(element.offset().top - container.offset().top + container.scrollTop() + Math.round(element.height() / 2, 0) - Math.round(container.height() / 2, 0));
        },

        move_page: function(where){
            if (muttcube._rcmail.message_list.selection.length > 0){
                var h = $$('#messagelist .selected').first().height();
                var lines = Math.floor($$('#messagelistcontainer').height() / h, 0) - 1;
                var row = $$('#messagelist .selected');

                for (var i = 0; i < lines; i++){
                    row = row[where]();
                    if (row.length == 0){
                        break;
                    }
                    while (!row.is(':visible')){
                        row = row[where]();
                        if (row.length == 0){
                            break;
                        }
                    }

                    if (row.length == 0){
                        break;
                    }
                }

                for (var r in muttcube._rcmail.message_list.rows){
                    if (muttcube._rcmail.message_list.rows[r].id == row.attr('id')){
                        var uid = muttcube._rcmail.message_list.rows[r].uid;
                        muttcube._rcmail.message_list.select_row(uid, false, false);
                        muttcube._rcmail.message_list.scrollto(uid);
                        return ;
                    }
                }
            }
        },

        toggle_fold: function(){
            if (muttcube._rcmail.message_list.selection.length > 0){
                var row_id = muttcube._rcmail.message_list.selection[0];
                var row = muttcube._rcmail.message_list.rows[row_id];
                if (typeof(row) != 'undefined' && row != null){
                    if (typeof(row.expando) != 'undefined' && row.expando != null){
                        row.expando.click();
                    }
                }
            }
        },

        quick_search: function(field, dir){
            muttcube.last_search.quick_search(field, dir);
            muttcube.last_search.next_result();
        },

        quick_search_next_result_reverse: function(){
            muttcube.last_search.dir = muttcube.last_search.dir * -1;
            muttcube.last_search.next_result();
            muttcube.last_search.dir = muttcube.last_search.dir * -1;
        },

        filter: function(what, txt){
            muttcube._rcmail.filter_mailbox(what);
            $$('a.menuselector .handle').text(txt);
        },

        preview_toggle: function(){
            if (typeof(UI) != 'undefined'){
                $$(top.document).find('#mailpreviewtoggle').click();
            }
            else {
                $$(top.document).find('#prevpaneswitch').click();
            }
        },

        change_mode: function(mode){
            console.log('i am ', window.location.toString());
            console.log('changing to ', mode);
            if (typeof(muttcube.modes[muttcube.current_mode].finish) != 'undefined'){
                muttcube.modes[muttcube.current_mode].finish();
            }
            muttcube.current_mode = mode;
            var m = muttcube.modes[mode];
            if (typeof(m.init) != 'undefined'){
                m.init();
            }

            for (var i in muttcube.modes){
                $('#muttcube-statusbar').removeClass('statusbar-' + i + '-mode');
            }

            $('#muttcube-statusbar').addClass('statusbar-' + mode + '-mode');
            muttcube.print_status_bar("-- " + m.text + " --", 'current-mode');
            muttcube.reset_key_chain();
            muttcube.print_status_bar('', 'message');
        },

        follow_link_if_one: function(){
            if ($$('.follow-link').length == 1){
                $$('.link-background')[0].click();
                this.stop_follow_links(true);
            }
            else if ($$('.follow-link').length == 0){
                this.stop_follow_links(true);
            }
        },

        stop_follow_links: function(change_mode){
            $$(muttcube.modes.follow_links.selector).removeClass('link-background').removeClass('link-background-default').removeClass('follow-link-skip');
            $$('.follow-link').remove();
            if (change_mode){
                this.change_mode('message');
            }
        },

        follow_links_key_press: function(digit){
            $$('.link-background').each(function(idx){
                var _idx = $(this).prev().data('idx') + "";
                var m = _idx.match(new RegExp('^' + digit, 'g'));
                if (!m){
                    $(this).removeClass('link-background');
                    $(this).prev().remove();
                }
                else {
                    $(this).prev().data('idx', _idx.substring(1));
                }
            });
            $$('.link-background-default').removeClass('link-background-default');
            $$('.link-background').first().addClass('link-background-default');
            this.follow_link_if_one();
        },

        follow_first_link: function(){
            if ($$('.link-background-default').length == 1){
                $$('.link-background-default')[0].click();
                this.stop_follow_links(true);
            }
        },

        message_scroll: function(px, py){
            muttcube.get_message_frame().scrollBy(px, py);
        },

        message_page_move: function(where){
            var h = $(muttcube.get_message_frame()).height();
            this.message_scroll(0, where * h);
        },

        message_top: function(){
            $(muttcube.get_message_frame()).scrollTop(0);
        },

        message_bottom: function(){
            $(muttcube.get_message_frame()).scrollTop($$(document).height());
        },

        view_html: function(html){
            muttcube.modes.message_caret.view_html = html;
            this.change_mode('message_caret');
        },

        normal_with_selection: function(){
            muttcube.modes.visual.leave_selection = true;
            this.change_mode('normal');
        },

        move_current_folder: function(list, where, _class){
            if (typeof(_class) == 'undefined' || _class == null){
                _class = 'muttcube-current-folder';
            }
            for (var i = 0; i < list.length; i++){
                if ($(list[i]).hasClass(_class) && i + where >= 0 && i + where < list.length){
                    var element = $(list[i + where]);
                    $('.' + _class).removeClass(_class);
                    element.addClass(_class);
                    return ;
                }
            }
        },

        move_folder: function(where){
            var ul = $('#mailboxlist');
            if (ul.find('.muttcube-current-folder').length == 0){
                if (ul.find('.selected:visible').length > 0){
                    ul.find('.selected').addClass('muttcube-current-folder');
                }
                else {
                    ul.children().first().addClass('muttcube-current-folder');
                }
            }

            this.move_current_folder($('#mailboxlist li:visible'), where);
        },

        att_move: function(where){
            var ul = $('#compose-attachments ul');
            if (ul.find('.muttcube-current-folder').length == 0){
                ul.children().first().addClass('muttcube-current-folder');
                return ;
            }

            this.move_current_folder($('#compose-attachments ul li'), where);
        },

        folders_first_or_last: function(which){
            var li = $('#mailboxlist li')[which]();
            $('.muttcube-current-folder').removeClass('muttcube-current-folder');
            li.addClass('muttcube-current-folder');
        },

        folders_fold: function(){
            var li = $('.muttcube-current-folder');
            var collapsed = li.find('div.treetoggle');
            if (collapsed.length > 0){
                collapsed.click();
            }
        },

        change_folder: function(){
            var li = $('.muttcube-current-folder');
            if (!li.hasClass('selected')){
                li.removeClass('muttcube-current-folder');
                var collapsed = li.find('div.collapsed');
                if (collapsed.length > 0){
                    collapsed.click();
                }
                li.find('a').click();
            }

            this.change_mode('normal');
        },

        open_in_new_tab: function(){
            var uid = muttcube._rcmail.get_single_uid();
            var url = muttcube._rcmail.url("show", {_mbox: muttcube._rcmail.get_message_mailbox(uid), _uid: uid});
            url = window.location.origin + window.location.pathname + url.replace(/^.*(\?.*)$/g, '$1');
            muttcube.open_in_new_tab(url);
        },

        close_message: function(){
            var action = muttcube._rcmail.env.action;
            if (action == 'show' || action == 'preview'){
                window.close();
            }
        },

        search_contacts: function(){
            muttcube.modes.contacts.comming_from = '/';
            this.change_mode('contacts');
            $('.searchbox input[type="text"]').focus();
        },

        contact_move: function(where){
            var table = $('#contacts-table');
            if (table.find('.selected').length == 0){
                this.first_or_last_contact('first');
                return ;
            }
            row = table.find('.selected');
            var new_row = row[where]();
            muttcube._rcmail.contact_list.select_row(this.get_contact_row_id(new_row));
        },

        get_contact_row_id: function(row){
            if (typeof(row.attr) == 'undefined'){
                return '';
            }
            if (typeof(row.attr('id')) == 'undefined'){
                return '';
            }
            return row.attr('id').replace(/^rcmrow/g, '');
        },

        first_or_last_contact: function(which){
            var row = $('#contacts-table tr')[which]();
            console.log('the row is', row);
            console.log('the id is ', this.get_contact_row_id(row));
            muttcube._rcmail.contact_list.select_row(this.get_contact_row_id(row));
        },

        del_attachment: function(){
            if ($('.muttcube-current-folder').length > 0){
                var li = $('.muttcube-current-folder');
                var id = li.attr('id');
                li.removeClass('muttcube-current-folder');
                muttcube._rcmail.command('remove-attachment', id);
                this.change_mode('compose');
            }
        },

        upload_attachments: function(){
            if ($('#upload-dialog:visible, #attachment-form:visible').length > 0){
                muttcube._rcmail.command('send-attachment', '');
            }
        },

        compose_header: function(op, which){
            if (typeof(UI) != 'undefined'){
                muttcube.get_ui()[op + '_header_row'](which);
            }
            else if (typeof(rcmail_ui) != 'undefined'){
                muttcube.get_ui()[op + '_header_form'](which);
            }
        },

        upload_attachments_form: function(){
            if (typeof(UI) != 'undefined'){
                muttcube.get_ui().show_uploadform();
            }
            else {
                rcmail_ui.show_popup('uploadmenu', true)
            }
        },

        toggle_enabled: function(){
            muttcube.disabled = !muttcube.disabled;
            muttcube.print_status_bar(muttcube.disabled ? muttcube_i18n.gettext("disabled") : "");
        },

        finish_command: function(){
            $('#muttcube-statusbar-message').show();
            $('#muttcube-command').hide();
        },

        execute_command: function(){
            $('#muttcube-command-input').blur();
            var command = $('#muttcube-command-input').val();
            console.log('command is', command);
            eval('muttcube.' + command);
        },

        read_command: function(){
            $('#muttcube-statusbar-message').hide();
            $('#muttcube-command').show();
            $('#muttcube-command-input').val('').focus().width($('#muttcube-statusbar').width() - $('#muttcube-statusbar-current-mode').width() - $('#muttcube-statusbar-keychain').width() - 10);
        },

        messagebody_focus: function(){
            if ($('input[name="_is_html"]').val() != '1'){
                $('#composebody').focus();
            }
            else {
                tinymce.activeEditor.focus();
            }
        },
    },
};


