// with Button named loginButton
$(() => {
  $('#loginButton').click(() => {
    const userData = grabUserData();
       // alert(userData);
    event.preventDefault();
    const role = $('#role').val();
    if(role == 'employee') {
      ajaxPostUser('/api/employees/login', userData);
    } else if(role == 'customer') {
      ajaxPostUser('/api/customers/login', userData);
    } else if(role == 'admin') {
      ajaxPostUser('/api/admins/login', userData);
    }
  });
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
function ajaxPostUser(url, data) {
  $.ajax({
    type: 'POST',
    url: url,
    data: data,
    dataType: 'json',
    success: function(response) {
      console.log(response);
      if(response.role == 'admin') {
        localStorage.setItem('userState', 2);
        location.href = '/admin-dashboard.html';
      } else if(response.role == 'employee') {
        localStorage.setItem('userState', 1);
        localStorage.setItem('currentUser', JSON.stringify(response));
        ajaxGetCompanyInfo('/api/companies/' + response.company_id);
        location.href = '/visitors.html';
      }else if(response.role == 'customer') {
        localStorage.setItem('userState', 3);
        localStorage.setItem('currentUser', JSON.stringify(response));
        location.href = '/user-dashboard.html';
      }
      ajaxGetSlackInfo('api/channels/slack');
    },
    error: function() {
      window.onerror=handleError();
      event.preventDefault();
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
