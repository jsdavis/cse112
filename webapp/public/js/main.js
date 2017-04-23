function submitFoo() {
  var input = document.getElementById('textID').value;
  var output = foo(input);
  document.getElementById('foo_retval').innerHTML = output;
}

function submitValidTime(){
  var input = document.getElementById('isValidTimeText').value;
  var output = isValidTime(input);
  document.getElementById('valid_time_retval').innerHTML = output;
}

function submitFormatTime(){

  var time = document.getElementById('timeString').value;
  var format = document.getElementById('formatString').value;
  var output = formatTime(time, format);
  document.getElementById('format_time_retval').innerHTML = output;
}

/*
 * isValidTime takes in a string as the parameter and returns true or false
 * depending on if it is of the format hh:mm where hh cannot be greater than 12
 * and mm cannot be greater than 59
 */
function isValidTime(timeString) {
  //Regular expression to match required time format
  re = /^\d{1,2}:\d{2}([ap]m)?$/;

  if(timeString.value != '' && !timeString.match(re)) {
    console.log('Invalid time format');
    return false;
  } else  {
    var hours = timeString.slice(0, 2);
    var mins = timeString.slice(3, 5);
    if(parseInt(hours) > 12 || parseInt(mins) > 59) {
      // console.log('Invalid time format');
      return false;
    }
    console.log('Valid time format');
    return true;
  }
}

function formatTime(time, format){

  if(!isValidTime(time)){
    return "The input is not a valid time."
  }
  else {
    return time;
  }
}

