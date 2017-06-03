<?php

class TaggerGroupSelectInput extends cbBaseInput {
  public $defaultIcon = 'tableofcontents';
  public $defaultTpl = '[[+value]]';

  /**
   * Make sure the TaggerSelectInput lexicon is loaded
   *
   * @param ContentBlocks $contentBlocks
   * @param array $options
   */
  public function __construct(ContentBlocks $contentBlocks, array $options = array())
  {
      parent::__construct($contentBlocks, $options);
      $this->modx->lexicon->load('taggerselectinput:default');
  }

  /**
   * @return array
   */
  public function getJavaScripts() {
    $assetsUrl = $this->modx->getOption('taggerselectinput.assets_url', null, MODX_ASSETS_URL . 'components/taggerselectinput/');
    return array(
      $assetsUrl . 'js/inputs/taggergroupselect.input.js',
    );
  }

  /**
   * @return array
   */
  public function getTemplates()
  {
    $tpls = array();

    // Grab the template from a .tpl file
    $corePath = $this->modx->getOption('taggerselectinput.core_path', null, MODX_CORE_PATH . 'components/taggerselectinput/');

    $template = file_get_contents($corePath . 'templates/taggergroupselectinput.tpl');

    if ($this->modx->controller) {
        $this->modx->controller->addLexiconTopic('taggerselectinput:default');
    }

    // Wrap the template, giving the input a reference of "selectinput", and
    // add it to the returned array.
    $tpls[] = $this->contentBlocks->wrapInputTpl('taggergroupselectinput', $template);
    return $tpls;
  }

  public function getLexiconTopics()
  {
    return array('taggergroupselectinput:default');
  }

  public function getName()
  {
    //return 'Tagger Group Select';
    return $this->modx->lexicon('taggerselectinput.group_select.name');
  }

  public function getDescription()
  {
    //return 'Select field that lists all Tagger groups.';
    return $this->modx->lexicon('taggerselectinput.group_select.description');
  }

  public function getFieldProperties()
  {
    return array(
      array(
        'key' => 'default_value',
        'fieldLabel' => 'Default Value',
        'xtype' => 'textfield',
        'default' => '',
        'description' => 'Default value to use, leave blank if none'
      ),
      array(
        'key' => 'limit_context',
        'fieldLabel' => 'Limit to Current Context?',
        'xtype' => 'contentblocks-combo-boolean',
        'default' => '1',
        'description' => 'Limits tag groups shown to ones visible in the current context.'
      ),
    );
  }
}
