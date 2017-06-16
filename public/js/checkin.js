$(document).ready(() => {
  const companyData = JSON.parse(localStorage.getItem('currentCompany'));

    // Prevent users from scrolling around on iPad
  document.ontouchmove = function(e) {
    e.preventDefault();
  };

  /* eslint-disable */
  $('#checkinForm').on('submit', function(e) {
      e.preventDefault();
      submitForm();
      checkIn();
      $('#clock').removeClass('hide');
      $('#clock').addClass('show');
      $('#tap-to-check').removeClass('hide');
      $('#tap-to-check').addClass('show');
      $(this).removeClass('show');
      $(this).addClass('hide');

  });
  $('#tap-to-check').on('click', function(e) {
      e.preventDefault();
      startCheckIn();
      $(this).removeClass('show');
      $(this).addClass('hide');
      $('.check-in').removeClass('hide');
      $('.check-in').addClass('show');
      $('#visitor-first').val('');
      $('#visitor-last').val('');
      $('#visitor-number').val('');

  });
  /* eslint-enable */

  function checkIn() {
    $.post({
      type: 'POST',
      async: false,
      data: {
        employee_id: localStorage.getItem(currentUser._id),
        customer_first_name: $('#first_name').val(),
        customer_last_name: $('#last_name').val(),
        customer_email: $('email').val(),
      },
      url: '/api/appointments/checkin/',
      dataType: 'json',
      success: function(response) {
        if (response.statusCode !== 200)
          alert('Checkin failed!');
        else {
          $('#first_name').val('');
          $('#last_name').val('');
          $('#email').val('');
        }
      },
    });
  }

    // Bind Listeners
  // $('#tap-to-check').on('click', startCheckIn);
  // $('.check-in').on('submit', submitForm);


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
    alert('SUBMITTING');
    const data = grabFormElements();
    const slTok = localStorage.getItem('slackToken');
    const slChan = localStorage.getItem('slackChannel');

    if(slTok!=undefined&&slChan!=undefined) {
      $.post('https://slack.com/api/chat.postMessage',
        {
          'token': slTok,
          'channel': slChan,
          'text': 'Name: ' + data['first_name'] + ' ' + data['last_name'] + ' Phone Number: ' + data['phone_number'],
        },
             (data, status) => {
             }
        );
    }


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
