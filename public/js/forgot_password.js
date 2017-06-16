$(document).ready(() => {
  let userObj = {};

  $('#form_forgot_password').submit((event) => {
    event.preventDefault();
  });


  $('#forgotSuccessMessage').hide();
  $('#forgotErrorMessage').hide();

  $('#send-reset-btn').click(() => {
    const email = $('#emailInput').val();

    userObj.email = email;

    ajaxPostUserEmployee(userObj);
    $.ajax({
      type: 'POST',
      url: '/api/resetPassword/',
      dataType: 'json',
      data: userObj,
      success: function(response) {
        console.log('HELLOOOOO' +JSON.stringify(response));
        $('#forgotSuccessMessage').show();
        $('#forgotErrorMessage').hide();
      },
      error: function(response) {
        console.log('EH FEKKKKK');
        $('#forgotSuccessMessage').hide();
        $('#forgotErrorMessage').show();
      },
    });
  });


  function ajaxPostUserEmployee(data) {
    console.log('Trying to find employee');
    $.ajax({
      type: 'GET',
      url: '/api/employees/email/'+data.email,
      data: data,
      async: false,
      dataType: 'json',
      success: function(response) {
        userObj = response;
      },
      error: function() {
        console.log('Employee failed\n\n\n');
        ajaxPostUserCustomer(data);
      },
    });
  }

  function ajaxPostUserCustomer(data) {
    console.log('Trying to find customer');
    $.ajax({
      type: 'GET',
      url: '/api/employees/email/'+data.email,
      data: data,
      async: false,
      dataType: 'json',
      success: function(response) {
        userObj = response;
        location.href = '/api/login';
      },
      error: function() {
        console.log('Customer failed\n\n\n');
        // window.onerror=handleError();
        location.href = '/login.html';
      },
    });
  }
});
