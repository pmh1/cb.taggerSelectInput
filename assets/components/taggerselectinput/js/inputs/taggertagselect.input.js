(function ($, ContentBlocks) {

    ContentBlocks.fieldTypes.taggertagselectinput = function(dom, data) {
        var input = {
            fieldId: data.field,
            groups: {},
            tags: {},
            select: null
        };
        input.init = function () {
            dom.addClass('contentblocks-field-loading');
            this.select = dom.find('.contentblocks-field-tagger-tag-field select');
            if (typeof data.value !== 'string') data.value = data.properties.default_value;

            input.loadGroups();
            //input.loadResources();
        };

        input.loadGroups = function() {
            var taggerConnector = Tagger.config.connectorUrl || MODx.config.assets_url + 'components/tagger/connector.php';
            $.ajax({
                dataType: 'json',
                url: taggerConnector,
                data: {
                    action: 'mgr/group/getlist',
                },
                context: this,
                headers: {
                    'modAuth': MODx.siteId
                },
                error: function() {
                    input.loadResources();
                },
                success: function(response) {
                    if (!response) {
                        ContentBlocks.alert('Error: ' + response.message);
                    }
                    else {
                        if (response && response.results) {
                            input.groups = [];
                            $.each(response.results, function(index, item) {
                                input.groups[item.id] = item;
                            });
                        }
                    }
                    input.loadResources();
                }
            });
        }

        input.loadResources = function() {
            var assetsUrl = MODx.config['taggerselectinput.assets_url'] || MODx.config.assets_url + 'components/taggerselectinput/';
            var taggerConnector = Tagger.config.connectorUrl || MODx.config.assets_url + 'components/tagger/connector.php';

            $.ajax({
                dataType: 'json',
                url: taggerConnector,
                data: {
                    action: 'mgr/tag/getlist',
                },
                context: this,
                headers: {
                    'modAuth': MODx.siteId
                },
                error: function() {
                    ContentBlocks.alert('Error: Loading Tagger Tags');
                },
                success: function(response) {
                    if (!response) {
                        ContentBlocks.alert('Error: ' + response.message);
                    }
                    else {
                        if (response && response.results) {
                            input.tags = {};
                            $.each(response.results, function(index, item) {
                                if (data.properties.group !== '' && data.properties.group != item.group) return;
                                if (input.groups[item.group]) {
                                    if (!input.tags[item.group]) input.tags[item.group] = {};
                                    input.tags[item.group][item.id] = item;
                                } else {
                                    input.tags[item.id] = item;
                                }
                            });
                            this.loadResourcesComplete();
                        }
                        else {
                            //ContentBlocks.alert('none_available');
                        }
                    }
                    dom.removeClass('contentblocks-field-loading');
                }
            });
        };

        input.loadResourcesComplete = function() {
            this.select.empty();
            this.select.append('<option value="">--- select tagger tag ---</option>');
            $.each(input.tags, function(id, val) {
                if (typeof val == 'object') {
                    var og = input.select.append('<optgroup label="' + input.groups[id].name + '">');
                    $.each(val, function(cid, cval) {
                        var isSelected = (data.value && cval.id == data.value) ? 'selected ' : '';
                        og.append('<option ' + isSelected + 'value="' + cval.id + '" data-tag="' + cval.tag + '" data-alias="' + cval.alias + '" data-group="' + cval.group + '">' + cval.tag + '</option>');
                    });
                } else {
                    var isSelected = (data.value && val.id == data.value) ? 'selected ' : '';
                    input.select.append('<option ' + isSelected + 'value="' + val.id + '" data-tag="' + val.tag + '" data-alias="' + val.alias + '" data-group="' + val.group + '">' + val.tag + '</option>');
                }
            });
            if (data.value) {
                this.select.val(data.value);
            }
        };


        input.getData = function () {
            var item = dom.find('.contentblocks-field-tagger-tag-field select option:selected');
            var group = input.groups[item.attr('data-group')];
            return {
                value: item.val(),
                display: item.attr('data-tag'),
                alias: item.attr('data-alias'),
                group: group.id,
                group_name: group.name,
                group_alias: group.alias
            };
        };

        input.confirmBeforeDelete = function() {
            var inputData = input.getData(),
            hasClass = inputData.value != data.properties.default_value
            return hasClass;
        };

        return input;
    };
})(vcJquery, ContentBlocks);
