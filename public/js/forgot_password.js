$(document).ready(() => {
  $('#form_forgot_password').submit((event) => {
    event.preventDefault();
  });
  alert('uweybjkn');

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
        cosnole.log('HELLOOOOO');
      },
      error: function(response) {
        cosnole.log('EH FEKKKKK');
      },
    });
  });
});
