Muttcube
========================================

This is muttcube, a roundcube plugin which will transform your mail experience
based on vi keybinding and paradigms. 

*With this plugin you can:*

* send e-mails
* manage attachments
* search e-mails
* search contacts
* open attachments
* follow links in e-mails

etc. without ever touching the mouse. The plugin will give you a vim look and
feel. It will add for `roundcube` modes, chaining shortcuts, like `za` and
shortcuts different depending on the current mode. 

What it will not add are counts (for example you cannot do `3j`) and motions
like `dj`. 

You will have basic `vim` shortcuts, like `h`, `j`, `k`, `l` and so on. The
idea is borrowed from `mutt` and `muttator` for `Thuderbird`, but this is not
a perfect copy of neither. It also adds my own ideas. However, it is `GPL` and
fully extensible. This means that it is very easy to modify any shortcut from
the `key-map.js` file and even to add new modes. 

The plugin is tested in Firefox and Chrome. It will probably not work for
older versions of IE (I've ended the `json` lists with a comma) and I have no
idea if it will work for newer versions of IE or whatever `Micro$oft` is
calling now IE. Anyway, you should not use IE in general, but if anybody uses
it, please let me know if it works or not.

## Modes

The plugin will add the following modes to roundcube: 

* Messages list
* Message
* Follow links
* Caret
* Visual
* Folders select
* Compose
* Insert
* Attachments delete
* Contacts search
* Command mode

Each mode has it's own shortcuts. 

### Messages list

In this mode you navigate the messages in your mailbox. The focus is on
messages list.

* `<C-b>`: page down
* `c`: compose new message
* `d`: delete currently selected message
* `f`: forward currently selected message
* `fu`: filter the mailbox with the unread messages
* `ff`: filter flagged messages
* `fr`: filter unanswered messages
* `fx`: clear all filters
* `fd`: filter deleted messages
* `fD`: filter undeleted messages
* `<C-f>`: page up
* `g`: go to the first message
* `G`: go to the last message
* `j`: go to the next message
* `k`: go to the previous message
* `<C-l>`: refresh the messages list
* `m`: change to message mode
* `mu`: mark currently selected message as unread
* `mr`: mark currently selected message as read
* `*f`: performs a quick search for the from field (goes to the next message
  in the list from the same sender)
* `*t`: performs a quick search for the from field (goes to the next message
  in the list received from the list person)
* `#f`: like `*f` but in the other direction
* `#t`: like `*t` but in the other direction
* `n`: go to the next quick search result
* `p`: print the currently selected message
* `r`: reply to the currently selected message
* `R`: reply to all for the currently selected message
* `s`: view message source
* `zt`: scroll the currently selected message to the top of the list
* `zb`: scroll the currently selected message to the bottom of the list
* `zz`: scroll the currently selected message to the middle of the list
* `za`: toggle the current thread folding
* `zM`: Collapse all threads
* `zR`: Expand all threads
* `t`: open currently selected message in new tab
* `v`: enter visual mode
* `V`: toggle the preview pane
* `:`: enter command mode
* `/`: enter search mails mode (focuses the search box)
* `]]`: goes to the next page
* `[[`: goes to previous page
* `Shift-f`: switch to "Folders select" mode


### Message mode

To enter in message mode, select a message from the message list and type
`m<CR>` or type `m` and wait for a second. The message mode is the mode in
which you control the message currently selected. 

* `<C-b>`: page up
* `c`: enter caret mode
* `<C-f>`: page down
* `f`: enter follow links mode
* `g`: go to the top of the message
* `G`: go to the bottom of the message
* `h, j, k, l`: scroll the message (left, down, top, right)
* `q`: when message opened in new tab, close this tab
* `]]`: when message opened in new tab, go to the next message
* `[[`: when message opened in new tab, go to the previous message

`<esc>` will take you back to `messages list` mode.

### Follow links mode

In `message` mode, once you press `f` you will be in `Follow links` mode. This
means that all the html links in the message will get a number and you can
type that number to open the link. Is similar with `vimperator`. You can also
click on attachments, which will trigger their default action (view or
download) depending on your settings and other installed plugins.

The current link is in green. This means that if you press `<cr>`, this link
will open. 

`<esc>` will take you back to `messages` mode.

### Caret mode

This mode has no `vim` shortcuts. It is only a convenient way if you need to
copy some text from the message in the clipboard. But the navigation and the
copy to the clipboard have to be made with browser shortcuts (cursors and
`<C-c>`).

`<esc>` will take you back to `messages` mode.

In this mode, you can select more than one message. 

* `g`: select from the current message until the first message
* `G`: select from the current message until the last message
* `j`: select from the current message the next message
* `k`: select from the current message the previous message

`<esc>` will take you back to `messages list` mode where you can apply actions
like `delete` or `mark` on the currently selected messages. 

### Folders mode

In this mode, you can change the current mail box. 

* `g`: go to the first 
* `G`: go to the last folder
* `j`: go to the next folder
* `k`: go to the previous folder
* `<cr>`: select the current folder
* `za`: expand or collapse subfolders list (if the current folder has subfolders)

`<esc>` will take you back to `messages list` mode.

### Compose mode

This is the mode in which you compose a message. It is activated by the
compose page (whey you reply to someone, forward a message or create a new
message). 

* `a`: open the upload file dialog; after selecting your files, click `u` to
  actually upload them in your message. 
* `b`: focus the `BCC` header (if present)
* `B`: add the `BCC` header
* `c`: focus the `CC` header (if present)
* `C`: add the `CC` header
* `d`: enter `delete attachments` mode (if you have any uploaded attachments)
* `m`: focus the message body
* `q`: quit the `compose` mode and go back to the `messages list` mode
* `s`: focus the `SUBJECT` header
* `t`: focus the `TO` header
* `xb`: delete the `BCC` header
* `xc`: delete the `CC` header
* `y`: send the message
* `/`: enter the `contacts search` mode

### Attachments delete mode

In this mode you can delete uploaded attachments. 

* `j`: go to the next attachment
* `k`: go to the previous attachment

`<cr>` will delete the currently selected attachment and return you to the
`compose` mode. 

### Contacts search mode

This mode will help you search for contacts in the compose window. Clicking
`/` will focus the search box. Once you click enter in the search box, you can
navigate between the found contacts and add them to your message. 

* `b`: add the currently selected contact to `BCC`
* `c`: add the currently selected contact to `CC`
* `g`: go to the first contact
* `G`: go to the last contact
* `j`: go to the next contact
* `k`: go to the previous contact
* `t`, `<cr>: add the currently selected contact to `TO`

`<esc>` will take you back to `compose` mode.

Whenever you are in a textbox, you will notice that the mode is changed to
insert. You can at any moment return to the previous mode by pressing `<esc>`. 
