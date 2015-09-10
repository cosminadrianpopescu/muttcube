MuttatorKeys = {
    key_disable: 'key_1000_D', 
    mode_normal: {
        key_0100_B: {
            command: "muttcube.commands.move_page('prev')",
        },
        key_0000_C: {
            command: "muttcube._rcmail.command('compose')",
        },
        key_0000_D: {
            command: "muttcube._rcmail.command('delete')",
        },
        key_0000_F: {
            command: "muttcube._rcmail.command('forward')",
            chain: {
                key_0000_U: {
                    command: 'muttcube.commands.filter("UNSEEN", "Unread")',
                },
                key_0000_F: {
                    command: 'muttcube.commands.filter("FLAGGED", "Flagged")',
                },
                key_0000_R: {
                    command: 'muttcube.commands.filter("UNANSWERED", "Unanswered")',
                },
                key_0000_X: {
                    command: 'muttcube.commands.filter("ALL", "All")',
                },
                key_0000_D: {
                    command: 'muttcube.commands.filter("DELETED", "Deleted")',
                },
                key_0001_D: {
                    command: 'muttcube.commands.filter("UNDELETED", "Not deleted")',
                },
            },
        },
        key_0001_F: {
            command: "muttcube.commands.change_mode('folders')",
        },
        key_0100_F: {
            command: "muttcube.commands.move_page('next')",
        },
        key_0000_G: {
            command: 'muttcube._rcmail.message_list.select_first()',
        },
        key_0001_G: {
            command: 'muttcube._rcmail.message_list.select_last()',
        },
        key_0000_J: {
            command: "muttcube.commands.go_message('get_next_row')",
        },
        key_0000_K: {
            command: "muttcube.commands.go_message('get_prev_row')",
        },
        key_0100_L: {
            command: "muttcube._rcmail.refresh()", 
        },
        key_0000_M: {
            command: 'muttcube.commands.change_mode("message")', 
            chain: {
                key_0000_U: {
                    command: "muttcube._rcmail.command('mark', 'unread')",
                },
                key_0000_R: {
                    command: "muttcube._rcmail.command('mark', 'read')",
                },
            },
        },
        key_0000_N: {
            command: 'muttcube.last_search.next_result()',
        },
        key_0001_N: {
            command: 'muttcube.commands.quick_search_next_result_reverse()',
        },
        key_0000_P: {
            command: 'muttcube._rcmail.command("print")',
        },
        key_0000_R: {
            command: "muttcube._rcmail.command('reply')",
        },
        key_0001_R: {
            command: "muttcube._rcmail.command('reply-all')",
        },
        key_0000_S: {
            command: "muttcube._rcmail.command('viewsource')",
        },
        key_0000_Z: {
            chain: {
                key_0000_T: {
                    command: 'muttcube.commands.message_to_top()',
                },
                key_0000_B: {
                    command: 'muttcube.commands.message_to_bottom()',
                },
                key_0000_Z: {
                    command: 'muttcube.commands.message_to_middle()',
                },
                key_0000_A: {
                    command: 'muttcube.commands.toggle_fold()',
                },
                key_0001_M: {
                    command: 'muttcube._rcmail.message_list.collapse_all()',
                },
                key_0001_R: {
                    command: 'muttcube._rcmail.message_list.expand_all()',
                },
            },
        },
        key_0000_T: {
            command: "muttcube.commands.open_in_new_tab()",
        },
        key_0000_V: {
            command: 'muttcube.commands.change_mode("visual")',
        },
        key_0001_V: {
            command: 'muttcube.commands.preview_toggle()',
        },
        key_0001_3: {
            chain: {
                key_0000_F: {
                    command: 'muttcube.commands.quick_search("from", -1)', 
                },
                key_0000_T: {
                    command: 'muttcube.commands.quick_search("to", -1)', 
                },
            },
        },
        key_0001__59: {
            command: "muttcube.commands.read_command()",
        },
        key_0001__186: {
            command: "muttcube.commands.read_command()",
        },
        key_0000__191: {
            command: "$('#quicksearchbox').focus()",
        },
        key_0001_8: {
            chain: {
                key_0000_F: {
                    command: 'muttcube.commands.quick_search("from", 1)', 
                },
                key_0000_T: {
                    command: 'muttcube.commands.quick_search("to", 1)', 
                },
            },
        },
        key_0000__221: {
            chain: {
                key_0000__221: {
                    command: 'muttcube._rcmail.command("nextpage")', 
                },
            },
        },
        key_0000__219: {
            chain: {
                key_0000__219: {
                    command: 'muttcube._rcmail.command("previouspage")', 
                },
            },
        },
    },
    mode_message: {
        key_0100_B: {
            command: 'muttcube.commands.message_page_move(-1)',
        },
        key_0000_C: {
            command: 'muttcube.commands.view_html(true)',
        },
        key_0001_C: {
            command: 'muttcube.commands.view_html(false)',
        },
        key_0100_F: {
            command: 'muttcube.commands.message_page_move(1)',
        },
        key_0000_F: {
            command: 'muttcube.commands.change_mode("follow_links")',
        },
        key_0000_G: {
            command: 'muttcube.commands.message_top()',
        },
        key_0001_G: {
            command: 'muttcube.commands.message_bottom()',
        },
        key_0000_H: {
            command: "muttcube.commands.message_scroll(-15, 0)",
        },
        key_0000_J: {
            command: "muttcube.commands.message_scroll(0, 15)",
        },
        key_0000_K: {
            command: "muttcube.commands.message_scroll(0, -15)",
        },
        key_0000_L: {
            command: "muttcube.commands.message_scroll(15, 0)",
        },
        key_0000_Q: {
            command: "muttcube.commands.close_message()",
        },
        key_0000__221: {
            chain: {
                key_0000__221: {
                    command: 'muttcube._rcmail.command("nextmessage")', 
                },
            },
        },
        key_0000__219: {
            chain: {
                key_0000__219: {
                    command: 'muttcube._rcmail.command("previousmessage")', 
                },
            },
        },
    },
    mode_follow_links: {
        key_0000_0: {
            command: 'muttcube.commands.follow_links_key_press(0)', 
        },
        key_0000_1: {
            command: 'muttcube.commands.follow_links_key_press(1)', 
        },
        key_0000_2: {
            command: 'muttcube.commands.follow_links_key_press(2)', 
        },
        key_0000_3: {
            command: 'muttcube.commands.follow_links_key_press(3)', 
        },
        key_0000_4: {
            command: 'muttcube.commands.follow_links_key_press(4)', 
        },
        key_0000_5: {
            command: 'muttcube.commands.follow_links_key_press(5)', 
        },
        key_0000_6: {
            command: 'muttcube.commands.follow_links_key_press(6)', 
        },
        key_0000_7: {
            command: 'muttcube.commands.follow_links_key_press(7)', 
        },
        key_0000_8: {
            command: 'muttcube.commands.follow_links_key_press(8)', 
        },
        key_0000_9: {
            command: 'muttcube.commands.follow_links_key_press(9)', 
        },
        key_0000__13: {
            command: 'muttcube.commands.follow_first_link()', 
        },
        key_0100_B: {
            command: 'muttcube.commands.message_page_move(-1)',
        },
        key_0100_F: {
            command: 'muttcube.commands.message_page_move(1)',
        },
        key_0000_G: {
            command: 'muttcube.commands.message_top()',
        },
        key_0001_G: {
            command: 'muttcube.commands.message_bottom()',
        },
        key_0000_H: {
            command: "muttcube.commands.message_scroll(-15, 0)",
        },
        key_0000_J: {
            command: "muttcube.commands.message_scroll(0, 15)",
        },
        key_0000_K: {
            command: "muttcube.commands.message_scroll(0, -15)",
        },
        key_0000_L: {
            command: "muttcube.commands.message_scroll(15, 0)",
        },
    },
    mode_message_caret: {
    },
    mode_visual: {
        key_0000_G: {
            command: 'muttcube._rcmail.message_list.select_first(muttcube.current_mode == "visual" ? SHIFT_KEY : 0)',
        },
        key_0001_G: {
            command: 'muttcube._rcmail.message_list.select_last(muttcube.current_mode == "visual" ? SHIFT_KEY : 0)',
        },
        key_0000_J: {
            command: "muttcube.commands.go_message('get_next_row')",
        },
        key_0000_K: {
            command: "muttcube.commands.go_message('get_prev_row')",
        },
        key_0000__13: {
            command: 'muttcube.commands.normal_with_selection()', 
        },
    },
    mode_folders: {
        key_0000_G: {
            command: "muttcube.commands.folders_first_or_last('first')",
        },
        key_0001_G: {
            command: "muttcube.commands.folders_first_or_last('last')",
        },
        key_0000_J: {
            command: "muttcube.commands.move_folder(1)",
        },
        key_0000_K: {
            command: "muttcube.commands.move_folder(-1)",
        },
        key_0000__13: {
            command: "muttcube.commands.change_folder()", 
        },
        key_0000_Z: {
            chain: {
                key_0000_A: {
                    command: 'muttcube.commands.folders_fold()',
                },
            },
        },
    },
    mode_compose: {
        key_0000_A: {
            command: "muttcube.commands.upload_attachments_form()",
        },
        key_0000_B: {
            command: "$('#_bcc').focus()",
        },
        key_0001_B: {
            command: "muttcube.commands.compose_header('show', 'bcc')",
        },
        key_0000_C: {
            command: "$('#_cc').focus()",
        },
        key_0001_C: {
            command: "muttcube.commands.compose_header('show', 'cc')",
        },
        key_0000_D: {
            command: "muttcube.commands.change_mode('att_delete')",
        },
        key_0000_M: {
            command: "muttcube.commands.messagebody_focus()",
        },
        key_0000_Q: {
            command: "muttcube._rcmail.command('list')",
        },
        key_0000_S: {
            command: "$('#compose-subject').focus()",
        },
        key_0000_T: {
            command: "$('#_to').focus()",
        },
        key_0000_U: {
            command: "muttcube.commands.upload_attachments()", 
        },
        key_0000_X: {
            chain: {
                key_0000_B: {
                    command: "muttcube.commands.compose_header('hide', 'bcc')", 
                },
                key_0000_C: {
                    command: "muttcube.commands.compose_header('hide', 'cc')", 
                },
            },
        },
        key_0000_Y: {
            command: "muttcube._rcmail.command('send', '')", 
        },
        key_0000__191: {
            command: "muttcube.commands.search_contacts()",
        },
    },
    mode_att_delete: {
        key_0000_K: {
            command: "muttcube.commands.att_move(-1)",
        },
        key_0000_J: {
            command: "muttcube.commands.att_move(1)",
        },
        key_0000__13: {
            command: "muttcube.commands.del_attachment()",
        },
    },
    mode_contacts: {
        key_0000_B: {
            command: "muttcube._rcmail.compose_add_recipient('bcc')",
        },
        key_0000_C: {
            command: "muttcube._rcmail.compose_add_recipient('cc')",
        },
        key_0000_G: {
            command: "muttcube.commands.first_or_last_contact('first')",
        },
        key_0001_G: {
            command: "muttcube.commands.first_or_last_contact('last')",
        },
        key_0000_J: {
            command: "muttcube.commands.contact_move('next')",
        },
        key_0000_K: {
            command: "muttcube.commands.contact_move('prev')",
        },
        key_0000_T: {
            command: "muttcube._rcmail.compose_add_recipient('to')",
        },
        key_0000__13: {
            command: "muttcube._rcmail.compose_add_recipient('to')",
        },
    },
}
