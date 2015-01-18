var App = function () {}

App.showMenu = function(type) {
	$("#sideBar").load("side_bar.html");
	App.load($("#sideBar") , "side_bar.html" , App.resizeMenu)

}
// binds the button for resizing the sidebar menu
App.resizeMenu = function(type) {
	$(".subnav").removeCss("hidden");
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