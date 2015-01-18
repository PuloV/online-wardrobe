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

		$(".active_small").removeClass("active_small");
		var selector = $(".container")
		var url = "gender_clothes.html"
		var callback = false

		switch(link){
			case "#catalog":
				subnav = $(link).find("ul.subnav")
				$(".nav.navbar-nav li").removeClass("active")
				subnav.removeClass("hidden");
				$(link).addClass("active")
				url = "gender_clothes.html"
				break;

			case "#about":
				subnav = $(link).find("ul.subnav")
				$(".nav.navbar-nav li").removeClass("active")
				subnav.removeClass("hidden");
				$(link).addClass("active")
				url = "about.html"
				break;

			case "#contact":
				subnav = $(link).find("ul.subnav")
				$(".nav.navbar-nav li").removeClass("active")
				subnav.removeClass("hidden");
				$(link).addClass("active")
				url = "contact.html"
				break;

			case "#male":
				selector = $(".container")
				url = "type_clothes.html"
				callback = function () {
					App.getData("clothes/men" , function (data) {
						var html = ""
						data.forEach(function(element){
							html += App.buildTypeClothesRow(element);
						})
						$(".container .panel-body").html(html)
						$(".container .breadcrumb .active").text("Male Clothes")
						App.bindTypeClothesRowLink()
					})
				}
				break;
			case "#female":
				selector = $(".container")
				url = "FemaleClothes.html"
				callback = false
				break;
			case "#child":
				selector = $(".container")
				url = "ChildClothes.html"
				callback = false
				break;

			default:
				$(".nav.navbar-nav li").removeClass("active")
				$("ul.subnav").addClass("hidden")
				$(link).addClass("active")
				break;
		}
		$(".container").focus();
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

// get the data from the needed json
App.getData = function (url ,callback) {
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
		default:
			alert("FATAL ERROR");

	}

	$.ajax({
		url: json_url,
		dataType: "json"
	}).done(callback)

}

App.buildTypeClothesRow = function(cloth){
	var html = ""

	html = "<div class='row type_item imgfloatleft' data-id =  "+cloth.id+ "> \
              	<div class='col-xs-3 col-sm-5 imgnopadding'> \
                    <div class='imgVA'> \
                         <img src='" + cloth.image +"'> \
                    </div> \
             	</div> \
	            <div class='col-xs-8 col-sm-6 infoBoxSpace'> \
	                <div class='panel panel-default noborder '> \
	                    <!-- Panel contents --> \
	                     <div class='panel-heading '><h3>"+ cloth.title +"</h3></font></div> \
	                         <div class='panel-body no-padding'> \
	                            <span>Number of items <span class='badge'>"+ cloth.count+"</span></span> \
	                                <div class='jumbotron color-cloud'> \
	                                  <p>"+ cloth.desc +" </p> \
	                                </div> \
	                         </div> \
	                             <!-- /Panel contents --> \
	                </div> \
	            </div> \
	        </div>"
    return html
}

App.bindTypeClothesRowLink = function(){
	$(".type_item").click(function(e){
		var link = $(this).data("id")
		console.log("a")
		var callback = function () {
			// here call App.getData  see line  51
		}
		App.getData(link ,function (data) {
			// each + print func like line 54
		})
		App.load($(".container") , "MaleShirts.html" , callback)
	})
}
