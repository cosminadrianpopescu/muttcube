<?php
/**
 * Roundcube Mutt
 *
 * Adds modes support and shortcuts like muttator for Thunderbird
 *
 * @version 1.4 - 07.07.2010
 * @author Cosmin Popescu (cosmin at popescu dot eu dot com)
 * @licence GNU GPL
 *
 **/
/** *
 **/

error_reporting(E_ALL);

class muttcube extends rcube_plugin
{
    public $task = 'mail|compose';

    function init()
    {
        $rcmail = rcmail::get_instance();
        $this->require_plugin('jqueryui');

        if($_SESSION['username'] && empty($_SESSION['plugin.newuserdialog'])){
            $this->include_script('js/i18n.js');
            $this->include_script('js/template.js');
            $this->include_script('js/muttcube.js');
            $this->include_stylesheet('css/muttcube.css');
            $this->include_script('js/key-map.js');
            $this->include_script('js/plugin.js');
            $this->add_hook('template_container', array($this, 'html_output'));
            $this->add_texts('localization', true);

            $this->load_config();
            if ($rcmail->config->get('use_jsvi')){
                $this->include_script('js/lib/vi.js');
                $this->include_script('js/lib/vi.css');
            }
        }
    }

    function html_output($p){
        if ($p['name'] == 'taskbar'){
            $content = file_get_contents(__DIR__ . '/html/muttcube.html');
            $p['content'] .= $content;
        }
        return $p;
    }
}
