"use strict";

$(function() {	
	
	$.ajaxSetup({
		headers:{
			'X-CSRF-Token':$('meta[name="csrf-token"]').attr('content')
		}
	});
	
	
	
		var orderview = new OrderView({
			el: $("#order_container"),
			model: new Order()
		}),
		
		//TEST
			testmoduleview = new TestModuleView({
				el: $("#testmodule")
		})
	
});
