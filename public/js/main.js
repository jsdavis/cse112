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
  let timeFormat = document.getElementById('timeFormatString').value;
  let output = formatTime(timeFormat);
  document.getElementById('formatTimeRetval').innerHTML = output;
}

/**
 * isValidTime takes in a string as the parameter and returns true or false
 * depending on if it is of the format hh:mm where hh cannot be greater than 12
 * and mm cannot be greater than 59
 * @param {string} timeString string to check if valid time.
 * @return {boolean} False if invalid time format, True otherwise.
 */
function isValidTime(timeString) {
  if(isEmpty(timeString)) {
    console.log('Time input is empty');
    return false;
  }
  console.log('starting is ValdiTime');
  let time = getTime(timeString);
  let date = getDate(timeString);

  if(time==false) {
    console.log('time is false');
    return false;
  }

  if(date==false) {
    console.log('date is false');
  }

    return true;
}

/**
 * Formats Time based on the inputted hours, minutes, seconds, and milliseconds
 * @param {string} string to parse.
 * @return {string} valid time, "This is an invalid time." if fails
 */
function formatTime(string) {
  let time;
  let date;
  if(!isValidTime(string)) {
    return false;
  } else {
    time = getTime(string);
    date = getDate(string);
  }

  let format = (string.split(' - '))[1];
  if(isEmpty(format) || format == null) {
    return time.original;
  } else {
    format = format.replace(/%/g, '');
    format = format.replace(/ /g, '');
    let formatArr = format.split('');
    format = manipulateString(time, date, formatArr);
  }
}

/**
 * Formats Time based on the inputted hours, minutes, seconds, and milliseconds
 * @param {object} time object
 * @param {object} date object
 * @param {object} arr all flags for format
 * @return {string} valid time, "This is an invalid time." if fails
 */
function manipulateString(time, date, arr) {
  if(time == false || date == false) {
    console.log('Input is invalid');
    return false;
  }

  for(let i=0; i<arr.legnth; i++) {
    switch(arr[i]) {
      case 'a': break;
      case 'b': break;
      case 'c': break;
      case 'd': break;
    }
  }
}


/**
 * Checks whether string is empty
 * @param {string} string to check
 * @return {boolean} true or false
 */
function isEmpty(string) {
  if(string == '') {
    return true;
  }
  return false;
}

/**
 * parses string to date object
 * @param {string} string to parse
 * @return {object} returns date boject
 */
function getDate(string) {
  if(isEmpty(string)) {
    return false;
  }

  dateFormat=/(([0]?[0-9]|1[0-2])\/([0-2]?[0-9]|3[0-1])\/([0-9]{2}?[0-9]{2})?)/;

  if(!string.match(dateFormat)) {
    console.log('no matches');
    return false;
  } else {
      let date = (string.match(dateFormat))[0];
      let dateArr = date.split('/');

      let month = dateArr[0];
      let day = dateArr[1];
      let year = dateArr[2];
      console.log('found matches'+day);

      if(parseInt(month) > 12 || parseInt(day) > 31) {
        console.log('month: '+month+ 'day: '+day);
        return false;
      }
      return {month: month, day: day, year: year,
        weekday: null, timezone: null};
    }
}

/**
 * parses string to time object
 * @param {string} string to parse
 * @return {object} returns time boject
 */
function getTime(string) {
  if(isEmpty(string)) {
    return false;
  }
  timeFormat = /([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9](:([0-9]{4}))?)?/;

  if(!string.match(timeFormat)) {
    console.log('Time input is invalid');
    return false;
  } else {
    let addS = false;
    let addM = false;
    let time = (string.match(timeFormat))[0];

    let timeArr = time.split(':');
    console.log(timeArr);
    let hours = timeArr[0];
    let mins = timeArr[1];
    let seconds = 0;
    let milliseconds = 0;

    if(timeArr.length > 2) {
      addS = true;
      seconds = timeArr[2];
    }
    if(timeArr.length == 4) {
      addM = true;
      milliseconds = timeArr[3];
    }

    if(parseInt(hours) > 24 || parseInt(mins) > 59 ||
      (addS && parseInt(seconds) > 59) ||(addM && parseInt(milliseconds))) {
      console.log('Invalid time format');
      return false;
    }
    return {hours: hours, minutes: mins, seconds: seconds,
      milliseconds: milliseconds, original: time};
  }
}


