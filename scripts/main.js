var App = function () {}

App.bindMenuLinks = function(){
	$(".sideBar_link").click(function (e) {
		e.preventDefault();
		link = $(this).attr("href");
		switch(link){
			case "#develop" :
				subnav = $(this).parent().find("ul.subnav")
				console.log(subnav)
				subnav.removeClass("hidden");
				$(".nav.navbar-nav > li").removeClass("active")
				$(link).addClass("active")
				break;
			default:
				$(".nav.navbar-nav > li").removeClass("active")
				$(link).addClass("active")
				break;
		}
	})
}
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