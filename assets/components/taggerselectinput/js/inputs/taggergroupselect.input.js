(function ($, ContentBlocks) {

    ContentBlocks.fieldTypes.taggergroupselectinput = function(dom, data) {
        var input = {
            fieldId: data.field,
            groups: {},
            select: null
        };
        input.init = function () {
            dom.addClass('contentblocks-field-loading');
            this.select = dom.find('.contentblocks-field-tagger-group-field select');
            if (typeof data.value !== 'string') data.value = data.properties.default_value;

            input.loadResources();
        };

        input.loadResources = function() {
            var contextkey = data.properties.limit_context == 0 ? false : MODx.activePage.record.context_key;
            var assetsUrl = MODx.config['taggerselectinput.assets_url'] || MODx.config.assets_url + 'components/taggerselectinput/';
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
                    ContentBlocks.alert('Error: Loading Tagger Groups');
                },
                success: function(response) {
                    if (!response) {
                        ContentBlocks.alert('Error: ' + response.message);
                    }
                    else {
                        if (response && response.results) {
                            input.groups = [];
                            $.each(response.results, function(index, item) {
                                if (contextkey == false || (item.show_for_contexts === '' || item.show_for_contexts.indexOf(contextkey) !== -1)) {
                                    input.groups.push(item);
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
            this.select.append('<option value="">--- select tagger group ---</option>');
            $.each(input.groups, function(id, val) {
                var isSelected = (data.value && val.id == data.value) ? 'selected ' : '';
                input.select.append('<option ' + isSelected + 'value="' + val.id + '" data-alias="' + val.alias + '" data-name="' + val.name + '">' + val.name + '</option>');
            });
            if (data.value) {
                this.select.val(data.value);
            }
        };


        input.getData = function () {
            var item = dom.find('.contentblocks-field-tagger-group-field select option:selected');

            return {
                value: item.val(),
                display: item.attr('data-name'),
                alias: item.attr('data-alias')
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
