<?php
/**
 * @var modX $modx
 * @var ContentBlocks $contentBlocks
 * @var array $scriptProperties
 * Bind plugin to ContentBlocks_RegisterInputs
 */
if ($modx->event->name == 'ContentBlocks_RegisterInputs') {
  // Load your own class. No need to require cbBaseInput, that's already loaded.
  $path = $modx->getOption('taggerselectinput.core_path', null, MODX_CORE_PATH . 'components/taggerselectinput/');
  require_once($path . 'elements/inputs/taggergroupselectinput.class.php');
  require_once($path . 'elements/inputs/taggertagselectinput.class.php');

  // Create an instance of your input type, passing the $contentBlocks var
  $group_instance = new TaggerGroupSelectInput($contentBlocks);
  $tag_instance = new TaggerTagSelectInput($contentBlocks);

  // Pass back your input reference as key, and the instance as value
  $modx->event->output(array(
    'taggergroupselectinput' => $group_instance,
    'taggertagselectinput' => $tag_instance
  ));
}
