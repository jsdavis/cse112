/**
 * Handles retrieval of the foo function
 */
function submitFoo() {
  /* get time input */
  let input = document.getElementById('textID').value;

  /* call foo with input */
  let output = foo(input);
  document.getElementById('foo_retval').innerHTML = output;
}

/**
 * Grabs submission details from the submit isValid HTML element
 */
function submitValidTime() {
  /* get time input */
  let inputTime = document.getElementById('isValidTimeText').value;

  /* call isValidTime with input */
  let output = isValidTime(inputTime);

  document.getElementById('valid_time_retval').innerHTML = output;
}

/**
 * Grabs submission details from the submit format HTML element
 */
function submitFormatTime() {
  /* get selected format stylw */
  let format = document.getElementById('timeFormatSelector');
  let selectedFormat = format.options[format.selectedIndex].value;

  /* get time input */
  let timeFormat = document.getElementById('timeFormatString').value;

  /* call formatTime with inputs */
  let output = formatTime(selectedFormat, timeFormat);

  document.getElementById('formatTimeRetval').innerHTML = output;
}


/**
 * checks if time is valid using regex
 * @param {string} timeString input by user as time.
 * @param {bool} flag to see if we want to return the time object,
 *  true if time is valid
 * @return {bool} if object exists or not.
 */
function isValidTime(timeString, flag=0) {
  /* error checking */
  if(isEmpty(timeString)) {
    console.log('Input is empty.');
    return 'Empty Input';
  }

  /* Disabling eslint, regex longer than 80 characters */
  /* eslint-disable */
  let timeFormatRegex = /((^)|(\ ))([0-1]?[0-9]|2[0-3])((AM|PM|am|pm)|(:[0-5][0-9]((AM|PM|am|pm)|(:[0-5][0-9](AM|PM|am|pm)?)?)))(\ |$)/;
  /* eslint-enable */

  /* get strings that match the regex, valid time formats */
  let match = timeString.match(timeFormatRegex);

  if(match) {
    let string = match[0];      // full match string/
    string.replace(/\ /g, '');  // remove whitespaces.

    let valuesArr = string.split(':');
    let array = ['00', '00', '00']; // [hours, minutes, seconds]


    /* check each value for am/pm input.*/
    for(let i=0; i<valuesArr.length; i++) {
      /* update values in result array */

      if(valuesArr[i].includes(' ')) {
        valuesArr[i] = valuesArr[i].replace(/\ /g, ''); // clean up match
      }

      array[i] = valuesArr[i];

      if(valuesArr[i].includes('am')||valuesArr[i].includes('AM')) {
        valuesArr[i] = valuesArr[i].replace(/am/g, ''); // clean up match
        valuesArr[i] = valuesArr[i].replace(/AM/g, '');

        array[i] = valuesArr[i];// update

        /* 0 am invalid time. */
        if(parseInt(valuesArr[0])==0) {
          return false;
        } else if(parseInt(valuesArr[0])==12) {
          /* 12am --> 00:00 */
          array[0] = 0;
        } else{
          array[0] = valuesArr[0];
        }
      } else if(valuesArr[i].includes('pm')||valuesArr[i].includes('PM')) {
        valuesArr[i] = valuesArr[i].replace(/pm/g, ''); // clean up match
        valuesArr[i] = valuesArr[i].replace(/PM/g, '');

        array[i] = valuesArr[i];// update

        /* 0pm --> invalid time. */
        if(parseInt(valuesArr[0])==0) {
          return false;
        } else if(parseInt(valuesArr[0])<12) {
          /* 3:15pm --> 15:15 */
          array[0] = (parseInt(valuesArr[0])+12).toString();
        } else if(parseInt(valuesArr[0]) == 12) {
          /* 12:34 pm --> 12:34*/
          array[0] = valuesArr[0];
        } else {
          return false;
        }
      }

      /* add padding for single digit minutes and seconds */
      if(i>0 && array[i].length == 1) {
        array[i] = '0'+array[i];
      }
    }

    /* if flag is true, we want to return the time object. */
    if(flag) {
      return {hours: array[0], minutes: array[1], seconds: array[2]};
    }

    return true;
  }
  /* did not find match --> not a valid time. */
  return false;
}


/**
 * formats the time from input string to specifed choice.
 * @param {string} formatStyle selected.
 * @param {string} inputString time as input by user.
 * @return {string} formatted string.
 */
function formatTime(formatStyle, inputString) {
  /* check if input time is valid  */
  let time = isValidTime(inputString, 1 );
  console.log('time');

  let ampm;
  /* if so, format it accordingly */
  if(time) {
    switch(formatStyle) {
      case '1': /* HH */
          return time.hours;
          break;
      case '2': /* HH am/pm */
          ampm = isAmPm(time.hours);
          return ampm.hour+' '+ampm.ampm;
          break;
      case '3': /* HH:MM */
          return time.hours+':'+time.minutes;
          break;
      case '4': /* HH:MM am/pm */
          ampm = isAmPm(time.hours);
          return ampm.hour+':'+time.minutes+' '+ampm.ampm;
          break;
      case '5': /* HH:MM:SS */
          return time.hours+':'+time.minutes+':'+time.seconds;
          break;
      case '6': /* HH:MM:SS am/pm */
          ampm = isAmPm(time.hours);
          return ampm.hour+':'+time.minutes+':'+time.seconds+' '+ampm.ampm;
          break;
      default:
          console.log(formatStyle);
    }
  } else {
    return 'Time is Invalid';
  }
}


/**
 * helper function which takes in an hour (base 24 hour) and returns
 * an object containing the hour in base 12 and the am or pm tag.
 * @param {string} hour, current hour in the time.
 * @return {object} containing hour and ampm labels.
 */
function isAmPm(hour) {
  /* if hour < 12, it s the morning --> am tag. */
  if(parseInt(hour) >= 0 && parseInt(hour) < 12) {
    /* 0 am --> 12am */
    if(parseInt(hour) == 0) {
        return {hour: '12', ampm: 'am'};
    } else {
      return {hour: hour, ampm: 'am'};
    }
  } else {
    /* 13:00 --> 1pm */
    return {hour: (parseInt(hour)-12).toString(), ampm: 'pm'};
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
