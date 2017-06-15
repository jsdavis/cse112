// with Button named loginButton
$('#form_login').submit((event) => {
  event.preventDefault();
});
$('#loginButton').click(() => {
  const userData = grabUserData();
  ajaxPostUserEmployee(userData);
});

// with Button named signin-bt
$(() => {
  $('#logoutButton').click(() => {
    localStorage.removeItem('userState');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentCompany');
    localStorage.removeItem('slackChannel');
    localStorage.removeItem('slackToken');
  });
});

// Ajax function to create a POST request to server
function ajaxPostUserEmployee(data) {
  $.ajax({
    type: 'POST',
    url: '/api/employees/login',
    data: data,
    dataType: 'json',
    success: function(response) {
      console.log(response);
      if(response.role == 'admin') {
        localStorage.setItem('currentUser', JSON.stringify(response));
        localStorage.setItem('userState', 2);
        localStorage.setItem('userType', 'employee_admin');
        location.href = '/admin-dashboard.html';
      } else {
        localStorage.setItem('userState', 1);
        localStorage.setItem('currentUser', JSON.stringify(response));
        localStorage.setItem('userType', 'employee');
        ajaxGetCompanyInfo('/api/companies/' + response.company_id);
        location.href = '/visitors.html';
      }
      ajaxGetSlackInfo('api/channels/slack');
    },
    error: function() {
      ajaxPostUserCustomer(data);
      window.onerror=handleError();
    },
  });
}

function ajaxPostUserCustomer(data) {
  $.ajax({
    type: 'POST',
    url: '/api/customers/login',
    data: data,
    dataType: 'json',
    success: function(response) {
      console.log(response);
      localStorage.setItem('userState', 2);
      location.href = '/user-dashboard.html';
      localStorage.setItem('userType', 'customer');
    },
    error: function() {
      window.onerror=handleError();
           // location.href = '/login.html';
    },
  });
}
// ex) company_id : 56e8a51293a19986040e93fe
// Ajax function to create a POST request to server
function ajaxGetCompanyInfo(url) {
  $.ajax({
    type: 'GET',
    url: url,
    data: $('#response').serialize(),
    async: false,
    dataType: 'json',
    success: function(response) {
      console.log(response);
           // alert(response.name);
      localStorage.setItem('currentCompany', JSON.stringify(response));
    },
  });
}
function ajaxGetSlackInfo(url) {
  $.ajax({
    type: 'GET',
    url: url+'/'+JSON.parse(localStorage.getItem('currentUser'))._id,
    async: false,
    dataType: 'json',
    success: function(response) {
      console.log(response);
      if(response.slackToken)
        localStorage.setItem('slackToken', response.slackToken);
      if(response.slackChannel)
        localStorage.setItem('slackChannel', response.slackChannel);
    },
  });
}

// Grab user data from form
function grabUserData() {
  const user = {};
  user.email = $('#username').val();
  user.password = $('#password').val();
  return user;
}


function handleError() {
  errorlog.innerHTML='Not Valid Username and Password, please type valid one.';
  return true;
}
