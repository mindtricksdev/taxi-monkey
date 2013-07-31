/*jslint browser:true*/
/*global $, jQuery, alert, FastClick, console, MemoryAdapter, locationlib, setup */

var util = {
    showAlert: function (message, title) {
        "use strict";
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title + ": " + message) : message);
        }
    },
    displayModal: function (title, content, button, buttonCallBack) {
        "use strict";
        $('#modal-window h1').text(title);
        $('#modal-window .md-inner-content').html(content);
        $('#modal-window .md-action').text(button);
        
        
        $('#modal-window .md-action').off().on('click', function () {
            util.closeModal();
            buttonCallBack();
        });
        
        $('.md-close').off().on('click', util.closeModal);
        $('.md-overlay').off().on('click', util.closeModal);
        
        $('#modal-window').addClass('md-show');
    },
    closeModal: function () {
        "use strict";
        $('#modal-window').removeClass('md-show');
    }
};