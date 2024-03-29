'use strict';

/* global foo */
/* eslint no-unused-vars: ["warn"]*/

/**
 * Grabs submission details from the submit foo HTML element
 * Calls Foo function with the input string.
 * @param {TYPE} None
 * @return {undefined} None
 */
function submitFoo() {
  /* get time input */
  var input = document.getElementById('textID').value;

  /* call foo with input */
  var output = foo(input);
  document.getElementById('foo_retval').innerHTML = output;
}

/**
 * Grabs submission details from the submit isValid HTML element
 * calls isValidTime with the time input String
 * @param {TYPE} None
 * @return {undefined} None
 */
function submitValidTime() {
  /* get time input */
  var inputTime = document.getElementById('isValidTimeText').value;

  /* call isValidTime with input */
  var output = isValidTime(inputTime);
  document.getElementById('valid_time_retval').innerHTML = output;
}

/**
 * Grabs submission details from the submit format HTML element
 * Calls formatTime with the time input string and selected format style
 * @param {TYPE} None
 * @return {undefined}
 */
function submitFormatTime() {
  /* get selected format stylw */
  var format = document.getElementById('timeFormatSelector');
  var selectedFormat = format.options[format.selectedIndex].value;
  /* get time input */

  var timeFormat = document.getElementById('timeFormatString').value;

  /* call formatTime with inputs */
  var output = formatTime(selectedFormat, timeFormat);
  document.getElementById('formatTimeRetval').innerHTML = output;
}

/**
 * checks if time input string represents valid using regular expressions
 * @param {string} timeString time as stringinput by user.
 * @param {bool} flag flag to see if we want to return the time object or just
 * know if the time is valid
 * @return {bool} returns whether time is valid. If time is valid, and flag is
 * 1, returns JSON object for time.
 */
function isValidTime(timeString) {
  var flag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  /* error checking */
  if (isEmpty(timeString)) {
    return 'Empty Input';
  }

  /* Disabling eslint, regex longer than 80 characters */
  /* eslint-disable */
  var timeFormatRegex = /((^)|(\ ))([0-1]?[0-9]|2[0-3])((\ )?(AM|PM|am|pm)|(:[0-5][0-9]((\ )?(AM|PM|am|pm)|(:[0-5][0-9]((\ )?(AM|PM|am|pm)?))?)))$/;
  /* eslint-enable */

  /* get strings that match the regex, valid time formats */
  var match = timeString.match(timeFormatRegex);

  if (match) {
    var string = match[0]; // full match string/
    string.replace(/\ /g, ''); // remove whitespaces.
    var valuesArr = string.split(':');
    var array = ['00', '00', '00']; // [hours, minutes, seconds]

    /* check each value for am/pm input.*/
    for (var i = 0; i < valuesArr.length; i++) {
      /* update values in result array */
      if (valuesArr[i].includes(' ')) {
        valuesArr[i] = valuesArr[i].replace(/\ /g, ''); // clean up match
      }

      array[i] = valuesArr[i];

      if (valuesArr[i].includes('am') || valuesArr[i].includes('AM')) {
        valuesArr[i] = valuesArr[i].replace(/am/g, ''); // clean up match
        valuesArr[i] = valuesArr[i].replace(/AM/g, '');
        array[i] = valuesArr[i]; // update

        /* 0 am invalid time. */
        if (parseInt(valuesArr[0]) == 0) {
          return false;
        } else if (parseInt(valuesArr[0]) == 12) {
          /* 12am --> 00:00 */
          array[0] = 0;
        } else {
          array[0] = valuesArr[0];
        }
      } else if (valuesArr[i].includes('pm') || valuesArr[i].includes('PM')) {
        valuesArr[i] = valuesArr[i].replace(/pm/g, ''); // clean up match
        valuesArr[i] = valuesArr[i].replace(/PM/g, '');

        array[i] = valuesArr[i]; // update

        /* 0pm --> invalid time. */
        if (parseInt(valuesArr[0]) == 0) {
          return false;
        } else if (parseInt(valuesArr[0]) < 12) {
          /* 3:15pm --> 15:15 */
          array[0] = (parseInt(valuesArr[0]) + 12).toString();
        } else if (parseInt(valuesArr[0]) == 12) {
          /* 12:34 pm --> 12:34*/
          array[0] = valuesArr[0];
        } else {
          return false;
        }
      }

      /* add padding for single digit minutes and seconds */
      if (i > 0 && array[i].length == 1) {
        array[i] = '0' + array[i];
      }
    }

    /* if flag is true, we want to return the time object. */
    if (flag) {
      return { hours: array[0], minutes: array[1], seconds: array[2] };
    }

    return true;
  }
  /* did not find match --> not a valid time. */
  return false;
}

/**
 * formats the time from input string to the specifed choice.
 * @param {string} formatStyle user's choice of formatting.
 * @param {string} inputString time as string input by user.
 * @return {string} time string formatted as per choice, or
 * "Time is Invalid".
 */
function formatTime(formatStyle, inputString) {
  /* check if input time is valid  */
  var time = isValidTime(inputString, 1);

  var ampm = void 0;
  /* if so, format it accordingly */
  if (time) {
    switch (formatStyle) {
      case '1':
        /* HH */
        return time.hours;
      case '2':
        /* HH am/pm */
        ampm = isAmPm(time.hours);
        return ampm.hour + ' ' + ampm.ampm;
      case '3':
        /* HH:MM */
        return time.hours + ':' + time.minutes;
      case '4':
        /* HH:MM am/pm */
        ampm = isAmPm(time.hours);
        return ampm.hour + ':' + time.minutes + ' ' + ampm.ampm;
      case '5':
        /* HH:MM:SS */
        return time.hours + ':' + time.minutes + ':' + time.seconds;
      case '6':
        /* HH:MM:SS am/pm */
        ampm = isAmPm(time.hours);
        return ampm.hour + ':' + time.minutes + ':' + time.seconds + ' ' + ampm.ampm;
    }
  } else {
    return 'Time is Invalid';
  }
}

/**
 * helper function which takes in an hour (base 24 hour) as a string
 * and returns object containing the hour in base 12 and the am or pm tag.
 * @param {string} hour hour in base 24.
 * @return {object} JSON object containing the hour base 12 and am or pm
 * labels.
 */
function isAmPm(hour) {
  /* if hour < 12, it s the morning --> am tag. */
  if (parseInt(hour) >= 0 && parseInt(hour) < 12) {
    /* 0 am --> 12am */
    if (parseInt(hour) == 0) {
      return { hour: '12', ampm: 'am' };
    } else {
      return { hour: hour, ampm: 'am' };
    }
  } else {
    /* 13:00 --> 1pm */
    return { hour: (parseInt(hour) - 12).toString(), ampm: 'pm' };
  }
}

/**
 * Checks whether string is empty
 * @param {string} string input string for which we want to check if empty
 * @return {boolean} true if the input string is empty, otherwise false.
 */
function isEmpty(string) {
  if (string == '') {
    return true;
  }
  return false;
}

module.exports.isValidTime = isValidTime;
module.exports.formatTime = formatTime;
//# sourceMappingURL=main.js.map