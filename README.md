ContentBlocks Tagger Select Input
=========================
Tagger Select Input for [modmore ContentBlocks](https://modmore.com/contentblocks/) is a set of field types for ContentBlocks that allow for the selection of [MODX Tagger](https://github.com/modxcms/Tagger) Tags or Groups.

Requirements
------------

* MODX 2.5+
* Tagger 1.9+
* ContentBlocks 1.5+

*******************

Usage
-----

You can only select a single group or tag, if you need to select multiple you can add these fields to a repeater. The two select types have not been tested with large amounts of Groups/Tags as it currently does not suport paginated results. 

### Tagger Group Select

The group selector gives you a dropdown with all groups, you can limit the list to just the current context which is the default setting.

The template can return:
* `[[+value]]` -> Group ID
* `[[+display]]` -> Group Name
* `[[+alias]]` => Group Alias

### Tagger Tag Select

Tag select returns all tags by tag group as a nested select. You can limit the tags to a single group by filtering based on group id.

The template can return:
* `[[+value]]` -> Tag ID
* `[[+display]]` -> Tag Name
* `[[+alias]]` => Tag Alias
