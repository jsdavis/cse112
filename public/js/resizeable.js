/*
	This function will be called in the event when browser breakpoint changes
 */

var public_vars = public_vars || {};

jQuery.extend(public_vars, {

  breakpoints: {
    largescreen: [991, -1],
    tabletscreen: [768, 990],
    devicescreen: [420, 767],
    sdevicescreen:	[0, 419],
  },

  lastBreakpoint: null,
});


/* Main Function that will be called each time when the screen breakpoint changes */
function resizable(breakpoint) {
  let sb_with_animation;


	// Large Screen Specific Script
  if(is('largescreen'))	{
  }


	// Tablet or larger screen
  if(ismdxl())	{
  }


	// Tablet Screen Specific Script
  if(is('tabletscreen'))	{
  }


	// Tablet Screen Specific Script
  if(isxs())	{
  }


	// Trigger Event
  jQuery(window).trigger('neon.resize');
}


/* Functions */

// Get current breakpoint
function get_current_breakpoint() {
  let width = jQuery(window).width(),
    breakpoints = public_vars.breakpoints;

  for(const breakpont_label in breakpoints)	{
    let bp_arr = breakpoints[breakpont_label],
      min = bp_arr[0],
      max = bp_arr[1];

    if(max == -1)
      max = width;

    if(min <= width && max >= width)		{
      return breakpont_label;
    }
  }

  return null;
}


// Check current screen breakpoint
function is(screen_label) {
  return get_current_breakpoint() == screen_label;
}


// Is xs device
function isxs() {
  return is('devicescreen') || is('sdevicescreen');
}

// Is md or xl
function ismdxl() {
  return is('tabletscreen') || is('largescreen');
}


// Trigger Resizable Function
function trigger_resizable() {
  if(public_vars.lastBreakpoint != get_current_breakpoint())	{
    public_vars.lastBreakpoint = get_current_breakpoint();
    resizable(public_vars.lastBreakpoint);
  }
}
