$(document).ready(() => {
  $('#form_forgot_password').submit((event) => {
    event.preventDefault();
  });

  $('#send-reset-btn').click(() => {
    alert('uewvjgdh');
    const email = $('#emailInput').val();
    const data = {};
    data.email_address = email;
    alert(JSON.stringify(data));
    $.ajax({
      type: 'GET',
      url: 'api/resetPassword/',
      dataType: 'json',
      data: data,
      success: function(response) {
        console.log('HELLOOOOO');
      },
      error: function(response) {
        console.log('EH FEKKKKK');
      },
    });
  });
});
