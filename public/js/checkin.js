$(document).ready(() => {
  const socket = io();

  const VALIDATE_COMPANY_ID = 'validate_company_id';
  const ADD_VISITOR = 'add_visitor';

  const companyData = JSON.parse(localStorage.getItem('currentCompany'));
  console.log(companyData);
  socket.emit(VALIDATE_COMPANY_ID, companyData);

    // Prevent users from scrolling around on iPad
  document.ontouchmove = function(e) {
    e.preventDefault();
  };

    // Bind Listeners
  $('#tap-to-check').on('click', startCheckIn);
  $('.check-in').on('submit', submitForm);

    // When a user starts their check in
  function startCheckIn() {
    $('.check-in').addClass('show');
    $('.check-in').animate({
      top: '10%',
      opacity: '1',
    }, 700);
    /* eslint-disable */ // eslint doesn't like 'this'
    $(this).addClass('hide');
    /* eslint-enable */
    $('#clock').addClass('hide');
  }

    // When a patient submits their form
  function submitForm() {
        // event.preventDefault();
    const data = grabFormElements();
        // console.log(data.company_id);

    if(localStorage.getItem('slackToken')!=undefined&&localStorage.getItem('slackChannel')!=undefined) {
      $.post('https://slack.com/api/chat.postMessage',
        {
          'token': localStorage.getItem('slackToken'),
          'channel': localStorage.getItem('slackChannel'),
          'text': 'Name: ' + data['first_name'] + ' ' + data['last_name'] + ' Phone Number: ' + data['phone_number'],
        },
             (data, status) => {
             });
    }
    socket.emit(ADD_VISITOR, data);

    /* eslint-disable */ // eslint doesn't like 'this'
    $(this).animate({
    /* eslint-enable */
      top: '35%',
      opacity: '0',
    }, 0);
  }
    // Grabs elements from the check in and puts it into an object
  function grabFormElements() {
    const newVisitor = {};
    if(companyData==null) {
      return null;
    }
    newVisitor.company_id = companyData._id;
    newVisitor.first_name= $('#visitor-first').val();
    newVisitor.last_name = $('#visitor-last').val();
    newVisitor.phone_number = $('#visitor-number').val();
    newVisitor.checkin_time = new Date();
    return newVisitor;
  }

    // CLOCK
  function updateClock() {
    const currentTime = new Date( );
    let currentHours = currentTime.getHours( );
    let currentMinutes = currentTime.getMinutes( );
        // var currentSeconds = currentTime.getSeconds ( );
        // Pad the minutes and seconds with leading zeros, if required
    currentMinutes = ( currentMinutes < 10 ? '0' : '' ) + currentMinutes;
        // currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;

        // Convert the hours component to 12-hour format if needed
    currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;

        // Convert an hours component of "0" to "12"
    currentHours = ( currentHours == 0 ) ? 12 : currentHours;

        // Compose the string for display
    const currentTimeString = currentHours + ':' + currentMinutes;

    $('#clock').html(currentTimeString);
  }
  updateClock();
  setInterval(updateClock, 60 * 1000);

  // Find a specific cookie name
  function getCookie(cName) {
    const name = cName + '=';
    const cookieArray = document.cookie.split(';');

    for (let i = 0, len = cookieArray.length; i < len; i++) {
      const cookie = cookieArray[i];
      while (cookie.charAt(0) == ' ')
        cookie.substring(1);
      if (cookie.indexOf(name) == 0)
        return cookie.substring(name.length, cookie.length);
    }
  }
});
