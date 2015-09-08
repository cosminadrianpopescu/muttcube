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

Each mode has it's own shortcuts. 

### Messages list

In this mode you navigate the messages in your mailbox. 

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
* `&lt;C-f&gt;`: page up

