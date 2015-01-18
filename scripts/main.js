var App = function () {}

//  binds the sidebar menu links
App.bindMenuLinks = function(){
	$(".sideBar_link").click(function (e) {
		e.preventDefault();
		link = $(this).attr("href");
		parent_el = $(this).parent()
		is_active = parent_el.hasClass("active")

		if(is_active){
			parent_el.removeClass("active")
			subnav = parent_el.find("ul.subnav")
			subnav.addClass("hidden");
			return
		}

		switch(link){
			case "#catalog" :
				subnav = $(link).find("ul.subnav")
				console.log(subnav)
				subnav.removeClass("hidden");
				$(".nav.navbar-nav > li").removeClass("active")
				$(link).addClass("active")

				var selector = $(".container")
				var url = "gender_clothes.html"
				var callback = false
				break;
			default:
				$(".nav.navbar-nav > li").removeClass("active")
				$("ul.subnav").addClass("hidden")
				$(link).addClass("active")
				break;
		}

		App.load(selector , url , callback)
	})
}

// shows the menus
App.showMenu = function(type) {
	$("#sideBar").load("side_bar.html");

	bind_links = function () {
		App.resizeMenu();
		App.bindMenuLinks();
	}

	App.load($("#sideBar") , "side_bar.html" , bind_links)

}

// binds the button for resizing the sidebar menu
App.resizeMenu = function(type) {

	$('#collapse-sidebar').click(function(){
		$('.navbar-side').toggleClass('navbar-side-closed');
	    $('#wrapper').toggleClass('wrapper-full');
    });

}

// loads an HTML in the selector and then runs the callback
App.load = function (selector , url , callback) {
	$.ajax({
		url: url,
		dataType: "html"
	}).done(function(data){
		selector.html(data)
		if(callback){
			callback()
		}
	})
}

App.getData = function (url) {
	var json_url = "";
	switch(url){
		case "clothes/men":
			json_url = "data/men.json"
		break;

		case "clothes/women":
			json_url = "data/women.json"
		break;

		case "clothes/dresses":
			json_url = "data/dresses.json"
		break;

		case "clothes/shirts":
			json_url = "data/shirts.json"
		break;

		case "clothes/jeans":
			json_url = "data/jeans.json"
		break;

		case "clothes/tops":
			json_url = "data/tops.json"
		break;

	}
	var result = []
	$.ajax({
		url: json_url,
		dataType: "json"
	}).done(function(data){
		result = data
	})
	return result
}