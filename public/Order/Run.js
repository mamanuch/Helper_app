"use strict";

$(function() {

        var orderview = new App_Views_Order({
            el: $("#order_container"),
            model: new App_Models_Order()
        }),

        //TEST
            testmoduleview = new App_Views_Test({
                el: $("#testmodule")
        })

});
