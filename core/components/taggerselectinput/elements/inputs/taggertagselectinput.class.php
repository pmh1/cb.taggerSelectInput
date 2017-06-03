<?php

class TaggerTagSelectInput extends cbBaseInput {
  public $defaultIcon = 'unorderedlist';
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
      $assetsUrl . 'js/inputs/taggertagselect.input.js',
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

    $template = file_get_contents($corePath . 'templates/taggertagselectinput.tpl');

    if ($this->modx->controller) {
        $this->modx->controller->addLexiconTopic('taggerselectinput:default');
    }

    // Wrap the template, giving the input a reference of "selectinput", and
    // add it to the returned array.
    $tpls[] = $this->contentBlocks->wrapInputTpl('taggertagselectinput', $template);
    return $tpls;
  }

  public function getName()
  {
    return $this->modx->lexicon('taggerselectinput.tag_select.name');
  }

  public function getDescription()
  {
    return $this->modx->lexicon('taggerselectinput.tag_select.description');
  }

  public function getFieldProperties()
  {
    return array(
      array(
        'key' => 'group',
        'fieldLabel' => "Limit to Group",
        'xtype' => 'textfield',
        'default' => '',
        'description' => 'Group ID to limit tag selection to'
      ),
      array(
        'key' => 'default_value',
        'fieldLabel' => 'Default Value',
        'xtype' => 'textfield',
        'default' => '',
        'description' => 'Default value to use, leave blank if none'
      ),
    );
  }
}
