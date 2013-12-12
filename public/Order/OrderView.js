"use strict";

var App_Views_Order;
$(function() {

        App_Views_Order = Backbone.View.extend({

            initialize: function() {                
                Backbone.Mediator.sub("table-active", this.universalShow, this);
                
            },

            events: {
                "click #order_close": "close"
            },

            className: "order_box",
            template: _.template($("#order_tpl").html()),

            universalShow: function(id) {
                if (!isNaN(id)) {
                    this.existRender(id);
                } else {
                    this.newRender(id);
                }
                //console.log("universalShow");
            },

            newRender: function(order) {            
                this.$el.html(this.template());
                this.newPub();                
            },

            newPub:function() {
                var el = this.$el.find("#order_items"),
                    order_id = "new",
                    hash = {
                        "order_id": order_id,
                        "el": el
                    };
                    
                Backbone.Mediator.subscribeOnce("orderitem-add", this.orderSave, this);
                Backbone.Mediator.pub("order-show", hash);            
            },
            
            showSyncModel: function(order) {  
                $("#order_close").css('visibility', 'visible');
                //console.log(order);
            },

            existRender: function(id) {
                var order = new App_Models_Order({
                        url: "orders/"+id+".json" //!== order.url ????                                                   
                    }),
                    el,
                    hash;
                this.model = order;   
                order.existFetch(id);                
                this.$el.html(this.template());  
                
                el = this.$el.find("#order_items");               
                hash = {
                    "order_id": id,
                    "el": el
                };
                
                order.on("sync", this.showSyncModel, this)
                Backbone.Mediator.unsubscribe("orderitem-add", this.orderSave, this);
                Backbone.Mediator.pub("order-show", hash);
                
            },

            close: function(event) {             
                console.log(this.model);

                this.$el.find("#order_close").css('visibility', 'hidden');
                this.$el.find("#order_items").remove();
                
                this.model.set({status: "closed"});
                //this.model.save(status, {patch: true}); 
                this.model.save();
                
                Backbone.Mediator.unsubscribe("orderitem-add", this.orderSave, this);
                Backbone.Mediator.pub("order-close");
            },

            orderSave: function(rr) {
                var order = new App_Models_Order();                
                order.saveNew(); 
            }
                   
        });

});