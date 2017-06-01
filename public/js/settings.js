$(document).ready(() => {
  const companyData = JSON.parse(localStorage.getItem('currentCompany'));
  const myCompanyId = companyData._id;

  console.log(myCompanyId);


  const curUser = JSON.parse(localStorage.getItem('currentUser'));
  $('#user-name').text(curUser.first_name + ' ' + curUser.last_name);
  const employees = getEmployee();

  const source = $('#setting-list-template').html();

  const template = Handlebars.compile(source);
  const compiledHtml = template(employees);


   // Pre-fill in current user information
  document.getElementsByTagName('input')[0].setAttribute('value', curUser.first_name);
  document.getElementsByTagName('input')[1].setAttribute('value', curUser.last_name);
  document.getElementsByTagName('input')[2].setAttribute('value', curUser.phone_number);
  document.getElementsByTagName('input')[3].setAttribute('value', curUser.email);

   // Pulls up form to change employee info
  $('.update-btn').click(updateEmployeeInfo);
  $('#setting-list').html(compiledHtml);
  $('#slackButton').click(authenticateSlack);

  slack();

  function slack() {
    let url = window.location.href;
    if (url.includes('code=')) {
      url = url.slice(url.indexOf('code='), url.length);
      const code = url.slice(5, url.indexOf('&'));
      const clientId = '167318334051.189600788818';
      const clientSecret = 'f72390af7662c6570ad8dc21cb00a5c1';

      let json;
      $.ajax({
        dataType: 'json',
        type: 'POST',
        data: {},
        async: false,
        url: 'https://slack.com/api/oauth.access?&client_id='+clientId+'&client_secret='+clientSecret+'&code='+code+'&redirect_uri='+window.location.href,
        success: function(response) {
          json = response;
          alert('success'+window.location.href);
          console.log(JSON.stringify(json));
        },
        error: function(response) {
          alert('error');
        },
      });
      return json;
    } else {
      // authenticateSlack();
    }
  }
  function authenticateSlack() {
    const redirectUri = window.location.href;
    const link='https://slack.com/oauth/authorize?scope=incoming-webhook,bot,chat:write:bot&client_id=167318334051.189600788818&redirect_uri='+redirectUri;
    window.open(link, '_self');
    // localStorage.setItem("slackToken", "xoxp-167318334051-167150907856-190181455090-f7c8c1446b10d3682d42b1668ff7691a");
    // localStorage.setItem("slackChannel", "#general");
    // alert("adding to local localStorage");
  }


  // Makes a get request to display list of employees
  function getEmployee() {
    let json;
    $.ajax({
      dataType: 'json',
      type: 'GET',
      data: $('#response').serialize(),
      async: false,
      url: '/api/employees/' + curUser._id,
      success: function(response) {
        json = response;
        console.log(JSON.stringify(json));
      },
    });
    return json;
  }

  // Grabs elements from the check in and puts it into an object
  function grabFormElementsUpdate() {
    const newEmployee = {};
    newEmployee.first_name= $('#employee-first').val();
    newEmployee.last_name = $('#employee-last').val();
    newEmployee.phone_number = $('#employee-number').val();
    newEmployee.email = $('#employee-email').val();
    return newEmployee;
  }

  // Update the current employee information
  function updateEmployeeInfo() {
    const data = grabFormElementsUpdate();
    console.log(data);
    updateEmployee(data);

    $('#setting-list').html(template(employees));
    document.getElementById('settings-form').reset();
  }

  // Makes a put request to update info of employee
  function updateEmployee(obj) {
    $.ajax({
      dataType: 'json',
      type: 'PUT',
      data: obj,
      async: false,
      url: '/api/employees/' + curUser._id,
      success: function(response) {
        console.log(response);
        localStorage.setItem('currentUser', JSON.stringify(response));
      },
      error: function(response) {
      },
    });
  }

  $('#logoutButton').on('click', () => {
    localStorage.setItem('userState', 0);
  });
});
