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
  var time_format = document.getElementById('time_format_string').value;
  var output = formatTime(time_format);
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
  if(isEmpty(timeString)){
    console.log('Time input is empty');
    return false;
  }
  console.log("starting is ValdiTime");
  var time = getTime(timeString);
  var date = getDate(timeString);

  if(time==false){
    console.log("time is false");
    return false;
  }

  if(date==false){
    console.log("date is false");
  }

    return true;
}

/**
 * Formats Time based on the inputted hours, minutes, seconds, and milliseconds
 * @param {string} hour The hour to format
 * @param {string} minute The minute to format
 * @param {string} second The second to format
 * @param {string} millisecond The millisecond to format
 * @return {string} valid time, "This is an invalid time." if fails
 */
function formatTime(string) {
  var time, date;
  if(!isValidTime(string)){
    return false;
  }
  else {
    time = getTime(string);
    date = getDate(string);
  }

  var format = (string.split(" - "))[1];
  if(isEmpty(format) || format == null){
    return time.original;
  }
  else {
    format = format.replace(/%/g, "");
    format = format.replace(/ /g, "");
    var formatArr = format.split("");
    format = manipulateString(time, date, formatArr);
  }
}

function manipulateString(time, date, arr){
  if(time == false || date == false){
    console.log("Input is invalid");
    return false;
  }

  for(var i=0; i<arr.legnth; i++){
    switch(arr[i]){
      case "a": break;
      case "b": break;
      case "c": break;
      case "d": break;
    }
  }


}





function isEmpty(string){
  if(string == ""){
    return true;
  }
  return false;
}

function getDate(string){
  if(isEmpty(string)){
    return false;
  }

  dateFormat = /(([0]?[0-9]|1[0-2])\/([0-2]?[0-9]|3[0-1])\/([0-9]{2}?[0-9]{2})?)/;

  if(!string.match(dateFormat)){
    console.log("no matches");
    return false;
  }
  else {

      var date = (string.match(dateFormat))[0];
      var dateArr = date.split("/");

      var month = dateArr[0];
      var day = dateArr[1];
      var year = dateArr[2];
      console.log("found matches"+day);

      if(parseInt(month) > 12 || parseInt(day) > 31){
        console.log("month: "+month+ "day: "+day);
        return false;
      }
      return {month: month, day: day, year: year, weekday: null, timezone: null};
    }
    
}


function getTime(string){
  if(isEmpty(string)){
    return false;
  }
  timeFormat = /([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9](:([0-9]{4}))?)?/;

  if(!string.match(timeFormat)) {
    console.log('Time input is invalid');
    return false;
  }
  else {
    var addS = false, addM = false;
    var time = (string.match(timeFormat))[0];

    let timeArr = time.split(":");
    console.log(timeArr);
    let hours = timeArr[0];
    let mins = timeArr[1];
    var seconds = 0, milliseconds = 0;
    if(timeArr.length > 2){
      addS = true;
      seconds = timeArr[2];
    }
    if(timeArr.length == 4){
      addM = true;
      milliseconds = timeArr[3];
    }

    if(parseInt(hours) > 24 || parseInt(mins) > 59 || (addS && parseInt(seconds) > 59) || (addM && parseInt(milliseconds))){
      console.log('Invalid time format');
      return false;
    }
    return {hours: hours, minutes: mins, seconds: seconds, milliseconds: milliseconds, original: time};
  }
}


