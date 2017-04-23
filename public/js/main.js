/**
 * Handles retrieval of the foo function
 */
function submitFoo() {
  let input = document.getElementById('textID').value;
  let output = foo(input);
  document.getElementById('foo_retval').innerHTML = output;
}

/**
 * Grabs submission details from the submit isValid HTML element
 */
function submitValidTime() {
  let input = document.getElementById('isValidTimeText').value;
  let output = isValidTime(input);
  document.getElementById('valid_time_retval').innerHTML = output;
}

/**
 * Grabs submission details from the submit format HTML element
 */
function submitFormatTime() {
  let hours = document.getElementById('hourTime').value;
  let minutes = document.getElementById('minuteTime').value;
  let seconds = document.getElementById('secondsTime').value;
  let milliseconds = document.getElementById('millisecondsTime').value;
  let output = formatTime(hours, minutes, seconds, milliseconds);
  document.getElementById('format_time_retval').innerHTML = output;
}

/**
 * isValidTime takes in a string as the parameter and returns true or false
 * depending on if it is of the format hh:mm where hh cannot be greater than 12
 * and mm cannot be greater than 59
 * @param {string} timeString string to check if valid time.
 * @return {boolean} False if invalid time format, True otherwise.
 */
function isValidTime(timeString) {
  // Regular expression to match required time format
  re = /^\d{1,2}:\d{2}([ap]m)?$/;

  if(timeString.value != '' && !timeString.match(re)) {
    console.log('Invalid time format');
    return false;
  } else {
    let hours = timeString.slice(0, 2);
    let mins = timeString.slice(3, 5);
    if(parseInt(hours) > 12 || parseInt(mins) > 59) {
      // console.log('Invalid time format');
      return false;
    }
    console.log('Valid time format');
    return true;
  }
}

/**
 * Formats Time based on the inputted hours, minutes, seconds, and milliseconds
 * @param {string} hour The hour to format
 * @param {string} minute The minute to format
 * @param {string} second The second to format
 * @param {string} millisecond The millisecond to format
 * @return {string} valid time, "This is an invalid time." if fails
 */
function formatTime(hour, minute, second = 0, millisecond = 0) {
  if(minute.length==1) {
    minute = '0'+minute;
  }
  if(second.length==1) {
    second = '0'+second;
  }
  if(millisecond.length==1) {
    millisecond = '0'+millisecond;
  }
  let time = hour+':'+minute;
  if(isValidTime(time)) {
    return time;
  } else {
    return 'This is an invalid time.';
  }
}

