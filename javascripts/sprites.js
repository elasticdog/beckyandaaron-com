/*

	-- -- -- -- -- -- --
	css sprites 2
	nav behaviour

	http://www.alistapart.com/articles/sprites2
	-- -- -- -- -- -- --

*/

function generateSprites(parent, setActive, hoverSpeedIn, hoverSpeedOut, style) {
	var parentClass = $(parent).attr("class");

	$(parent).children("li").each(function() {
		var myClass = ($(this).attr("class"))

		attachNavEvents(parent, myClass, setActive, hoverSpeedIn, hoverSpeedOut, style);

		if (!$(this).hasClass("current")) {
			$(this).children("a").css({backgroundImage:"none"});
		}
	});
}


function attachNavEvents(parent, myClass, setActive, hoverSpeedIn, hoverSpeedOut, style) {
	$(parent + " ." + myClass).mouseover(function() {
		$(this).append('<div class="nav-' + myClass + '"></div>');

		if (style == "slide") {
			$("div.nav-" + myClass).css({display:"none"}).slideDown(hoverSpeedIn);
		} else {
			$("div.nav-" + myClass).css({display:"none"}).fadeIn(hoverSpeedIn);
		}
	}).mouseout(function() {
		if (style == "slide") {
			$("div.nav-" + myClass).slideUp(hoverSpeedOut, function() {
				$(this).remove();
			});
		} else {
			$("div.nav-" + myClass).fadeOut(hoverSpeedOut, function() {
				$(this).remove();
			});
		}
	});


	// we only want to check the mousedown/up events if the CSS exists for :active states
	// if so, let's apply our selective filtering to undo the events above
	if (setActive) {
		$(parent + " ." + myClass).mousedown(function() {
			$("div.nav-" + myClass).attr("class", "nav-" + myClass + "-click");
		}).mouseup(function() {
			$("div.nav-" + myClass + "-click").attr("class", "nav-" + myClass);
		});
	}
}
