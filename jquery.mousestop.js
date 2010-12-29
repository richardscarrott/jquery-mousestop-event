/*
 * jQuery Mousestop Event v1.0
 * http://richardscarrott.co.uk/posts/view/jquery-mousestop-event
 *
 * Copyright (c) 2010 Richard Scarrott
 * W/ thanks to Ben Alman for his decent jQuery special event API write up:
 * http://benalman.com/news/2010/03/jquery-special-events/
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Requires jQuery v1.3+
 *
 */

(function($) {
	// private vars
	var timeout;
	// public vars
	$.mousestopDelay = 50;
	// special event
	$.event.special.mousestop = {
		setup: function(data) {
			$(this).data('mousestop', {delay: data})
				   .bind('mouseenter.mousestop', mouseenterHandler)
				   .bind('mouseleave.mousestop', mouseleaveHandler);
		},
		teardown: function() {
			$(this).removeData('mousestop')
			       .unbind('.mousestop');
		}
	};
	// private methods
	function mouseenterHandler(e) {
		var elem = $(e.target),
			data = elem.data('mousestop'),
			delay = data.delay || $.mousestopDelay;

		elem.bind('mousemove.mousestop', function() {
			clearTimeout(timeout);
			timeout = setTimeout(function() {
				elem.trigger('mousestop');
			}, delay);
		});
	};
	function mouseleaveHandler(e) {
		var elem = $(e.target);
		elem.unbind('mousemove.mousestop');
		clearTimeout(timeout);
	};
	// shorthand alias
	$.fn.mousestop = function(data, fn) {
		if (fn == null) {
			fn = data;
			data = null;
		}
		return arguments.length > 0 ? this.bind('mousestop', data, fn) : this.trigger('mousestop');
	};
})(jQuery);