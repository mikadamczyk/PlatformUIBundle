/*
 * Copyright (C) eZ Systems AS. All rights reserved.
 * For full copyright and license information view LICENSE file distributed with this source code.
 */
YUI.add('ez-alloyeditor-button-imagehref', function (Y) {
    "use strict";
    /**
     * Provides the ezimagehref button
     *
     * @module ez-alloyeditor-button-imagehref
     */
    Y.namespace('eZ.AlloyEditorButton');

    var AlloyEditor = Y.eZ.AlloyEditor,
        React = Y.eZ.React,
        ButtonImageHref;

    /**
     * The ButtonImageHref component represents a button to set the target
     * content on an image element.
     *
     * @uses Y.eZ.AlloyEditorButton.ButtonEmbedDiscoverContent
     * @uses Y.eZ.AlloyEditorButton.ButtonEmbedImage
     *
     * @class ButtonImageHref
     * @namespace eZ.AlloyEditorButton
     */
    ButtonImageHref = React.createClass({
        mixins: [
            Y.eZ.AlloyEditorButton.WidgetButton,
            Y.eZ.AlloyEditorButton.ButtonEmbedDiscoverContent,
            Y.eZ.AlloyEditorButton.ButtonEmbedImage,
        ],

        statics: {
            key: 'ezimagehref'
        },

        getDefaultProps: function () {
            return {
                udwTitle: 'Select an image to embed',
                udwContentDiscoveredMethod: "_updateEmbed",
                udwIsSelectableMethod: '_isImage',
                udwLoadContent: true,
                label: 'Select another image',
            };
        },

        /**
         * Returns the UDW title to pick a Content to embed.
         *
         * @method _getUDWTitle
         * @protected
         * @return {String}
         */
        _getUDWTitle: function () {
            return Y.eZ.trans('select.an.image.to.embed', {}, 'onlineeditor');
        },


        /**
         * Updates the image element with the selected content in UDW.
         *
         * @method _updateEmbed
         * @param {EventFacade} e the contentDiscovered event facade
         * @protected
         */
        _updateEmbed: function (e) {
            var contentInfo = e.selection.contentInfo,
                widget = this._getWidget();

            this._setContentInfo(contentInfo);
            widget.focus();
            widget.setWidgetContent('');
            this._fireUpdatedEmbed(e.selection);
        },

        render: function () {
            return (
                <button className="ae-button" onClick={this._chooseContent}
                    tabIndex={this.props.tabIndex} title={Y.eZ.trans('select.another.image', {}, 'onlineeditor')}>
                    <span className="ez-font-icon ae-icon-image ez-ae-icon-image"></span>
                </button>
            );
        },
    });

    AlloyEditor.Buttons[ButtonImageHref.key] = ButtonImageHref;

    Y.eZ.AlloyEditorButton.ButtonImageHref = ButtonImageHref;
});
