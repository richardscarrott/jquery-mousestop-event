The event can be bound in the same way you would any other event:

    $('#box').bind('mousestop', function() {
        // do stuff here
    });
	
It can then be unbound like this:

    $('#box').unbind('mousestop');
	
I've also included a shorthand method to keep the API in line with other jQuery events:

    $('#box').mousestop(function() {
        // do stuff here
    });
	
Thanks to jQuery's special event API the event object is passed to the first parameter just like native events.

I've also made the sensitivity of the event (i.e. the amount of time the mouse needs to be stationary before the event is fired) global so it can be changed by adjusting the value of $.mousestopDelay in milliseconds:

$.mousestopDelay = 1000; // defaults to 50

This sensitivity can also be adjusted on a per element basis by passing a Number into the bind() or mousestop() methods:

    $('#box-1').bind('mousestop', 1000, fn);
    $('#box-1').mousestop(1000, fn);