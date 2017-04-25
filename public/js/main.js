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
  let inputTime = document.getElementById('isValidTimeText').value;
  let output = isValidTime(inputTime);
  document.getElementById('valid_time_retval').innerHTML = output;
}

/**
 * Grabs submission details from the submit format HTML element
 */
function submitFormatTime() {
  let format = document.getElementsByName('formatSelector');
  let selectedFormat;

  for(let i = 0; i < format.length; i++) {
     if(format[i].checked) {
         selectedFormat = format[i].value;
   }
 }


  let timeFormat = document.getElementById('timeFormatString').value;
  let output = formatTime(selectedFormat, timeFormat);
  document.getElementById('formatTimeRetval').innerHTML = output;
}


/**
 * checks if time is valid
 * @param {string} timeString to check
 * @return {bool}
 */
function isValidTime(timeString) {
  if(isEmpty(timeString)) {
    return 'Empty Input';
  }

  /* eslint-disable */
  let timeFormatRegex = /((^)|(\ ))([0-1]?[0-9]|2[0-3])((am|pm)|(:[0-5][0-9]((am|pm)|(:[0-5][0-9](am|pm)?)?)))(\ |$)/;
  /* eslint-enable */
  let match = timeString.match(timeFormatRegex);
  if(match) {
    let string = match[0];
    string.replace(/\ /g, '');

    let valuesArr = string.split(':');
    let array = [0, 0, 0];


    for(let i=0; i<valuesArr.length; i++) {
      if(valuesArr[i].includes('am')) {
        valuesArr[i] = valuesArr[i].replace(/am/g, '');
        if(parseInt(valuesArr[0])==0) {
          return false;
        } else if(parseInt(valuesArr[0])==12) {
          array[0] = 0;
        } else{
          array[0] = valuesArr[0];
        }
        console.log(valuesArr[0]);
      } else if(valuesArr[i].includes('pm')) {
        valuesArr[i] = valuesArr[i].replace(/pm/g, '');
        if(parseInt(valuesArr[0])==0) {
          return false;
        } else if(parseInt(valuesArr[0])<12) {
          array[0] = (parseInt(valuesArr[0])+12).toString();
        } else if(parseInt(valuesArr[0]) == 12) {
          array[0] = valuesArr[0];
        } else {
          console.log(valuesArr[0]);
          return false;
        }
      }
      array[i] = valuesArr[i];
    }

    return {hours: array[0], minutes: array[1], seconds: array[2]};
  }
  return false;
}


/**
 * formats the time
 * @param {string} formatStyle  to check
 * @param {string} inputString  to check
 * @return {bool}
 */
function formatTime(formatStyle, inputString) {
  let time = isValidTime(inputString);
  console.log('Hello');
  if(time) {
    switch(formatStyle) {
      case '1':
          return time.hours+':'+time.minutes;
          break;
      case '2':
          return time.hours+':'+time.minutes+':'+time.seconds;
          break;
      default:
          console.log(formatStyle);
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
