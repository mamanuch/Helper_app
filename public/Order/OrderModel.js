"use strict";

var App_Models_Order = Backbone.Model.extend({
    
    //url: "orders.json",
    
    defaults: {        
        status: "opened"
    },
    
    //el: $($("#order_container")),
    
    saveNew: function() {
        var model = this;
                
        model.url = "orders.json";        
        model.save(
            {error: function() {
                console.log("order.save ERROR");
            }},
            {success: function(model) {
                model.successSave();                
            }}
            );       
    },   
                        
    successSave:function() {
        var order_id = this.get("id");
        
        $("#order_close").css('visibility', 'visible');
        //this.el.find("#order_close").css('visibility', 'visible');
        
        Backbone.Mediator.pub("order-create", order_id);
    },
    
    existFetch: function(id) {    
        var model = this;
        console.log(this);
        model.url = "orders/"+id+".json";
        //console.log(order);
        model.fetch();
    }   
    
    
});