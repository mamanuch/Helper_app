"use strict";

var App_Views_Test;
$(function() {
        App_Views_Test = Backbone.View.extend({
            modelBinder:undefined,
            initialize: function() {

                Backbone.Mediator.sub("order-create", this.orderCreate, this);  //TEST emulation order_items, table sub	 
                Backbone.Mediator.sub("order-show", this.orderShow, this);	
            },

            events: {
                "click #menu_order_new": "menuOrder_new",
                "click #table_order_new": "tableOrder_show_new",
                "click #table_order_show": "tableOrder_show_exist"
            },

            //emulation table pub
            tableOrder_show_new: function() {
                Backbone.Mediator.pub("table-active", "neworder");
                //console.log("table_order_show");
            },

            tableOrder_show_exist: function() {
                Backbone.Mediator.pub("table-active", 14);
                //console.log("table_order_show");
            },

            //emulation menu pub 
            menuOrder_new: function() {
                Backbone.Mediator.pub("orderitem-add");
            },

            //emulation table sub 
            orderCreate: function(hash) {
                console.log(hash);
            },

            orderBusy: function() {
                    console.log("orderBusy");
            },

            orderShow: function(hash) {
                console.log(hash);
            }


        });

});