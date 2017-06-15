$(document).ready(() => {
  const companyData = JSON.parse(localStorage.getItem('currentCompany'));
  const myCompanyId = companyData._id;

  console.log(myCompanyId);
  $('.parallax').parallax();

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
  $('#slackRemove').click(removeSlack);
  slack();

  function slack() {
    let url = window.location.href;
    if (url.includes('code=')) {
      const userid = JSON.parse(localStorage.getItem('currentUser'))._id;
      console.log(localStorage.getItem('currentUser'));

      const baseUrl = (window.location.href).slice(0, url.indexOf('.html')+5);
      url = url.slice(url.indexOf('code='), url.length);
      const code = url.slice(5, url.indexOf('&'));
      const clientId = '167318334051.189600788818';
      const clientSecret = 'f72390af7662c6570ad8dc21cb00a5c1';
      const redirectUri = url.slice(0, 5+url.indexOf('.html'));

      let json;
      let slackInDB=false;

      $.ajax({
        dataType: 'json',
        type: 'GET',
        url: 'api/channels/slack/'+ userid,
        success: function(response) {
          slackInDB=true;
        },
      });

      $.ajax({
        dataType: 'json',
        type: 'POST',
        atype: 'POST',
        url: 'https://slack.com/api/oauth.access?&client_id='+clientId+'&client_secret='+clientSecret+'&code='+code+'&redirect_uri='+baseUrl,
        success: function(response) {
          json = response;
          if(json.incoming_webhook!=undefined&&json.access_token!=undefined) {
            window.localStorage.setItem('slackToken', json.access_token);
            window.localStorage.setItem('slackChannel', json.incoming_webhook.channel);
            console.log(json.access_token);
            if(json.incoming_webhook.channel.slice(0, 1)=='#')
              url='api/channels/slack/'+userid+'/'+(json.incoming_webhook.channel).slice(1)+'/'+json.access_token;
            else
              url='api/channels/slack/'+userid+'/'+json.incoming_webhook.channel+'/'+json.access_token;

            if(slackInDB) {
              $.ajax({
                dataType: 'json',
                type: 'PUT',
                async: false,
                url: url,
                success: function(response) {
                  localStorage.setItem('slackChannel', json.incoming_webhook.channel);
                  localStorage.setItem('slackToken', json.access_token);
                  console.log('success!!!');
                },
                error: function(response) {
                  console.log(JSON.stringify(response));
                },
              });
            } else{
              // if No channel saved in DB.
              $.ajax({
                dataType: 'json',
                type: 'POST',
                async: false,
                url: url,
                success: function(response) {
                  localStorage.setItem('slackChannel', json.incoming_webhook.channel);
                  localStorage.setItem('slackToken', json.access_token);
                  alert('Successfully Added Slack Integration');
                  console.log('Successfully Added Slack Integration');
                },
                error: function(response) {
                  console.log(JSON.stringify(response));
                },
              });

              // $.ajax({
              //   dataType: 'json',
              //   type: 'PUT',
              //   async: false,
              //   url: 'api/employees/'+curUser._id+'/channels/add/slack',
              //   success: function(response) {
              //     console.log('successfully added channel to user.');
              //   },
              //   error: function(response) {
              //     console.log('Could not add channel to user.'+JSON.stringify(response));
              //   },
              // });
            }
          }
          console.log('success');
        },
        error: function(response) {
          console.log(JSON.stringify(json));
        },
      });
      return json;
    } else {
      // authenticateSlack();
    }
  }
  function authenticateSlack() {
    const url = window.location.href;
    const redirectUri = url.slice(0, 5+url.indexOf('.html'));
    const link='https://slack.com/oauth/authorize?scope=incoming-webhook,bot,chat:write:bot&client_id=167318334051.189600788818&redirect_uri='+redirectUri;
    window.open(link, '_self');
  }

  function removeSlack() {
    if(localStorage.getItem('slackChannel'))
      localStorage.removeItem('slackChannel');
    if(localStorage.getItem('slackToken'))
      localStorage.removeItem('slackToken');

    $.ajax({
      dataType: 'json',
      type: 'DELETE',
      async: false,
      url: 'api/channels/slack/'+curUser._id,
      success: function(response) {
        alert('Successfully Removed Slack Integration');
        console.log('successfully removed channel from user.');
      },
      error: function(response) {
        console.log('Could not remove channel from user.');
      },
    });

    const url = 'api/employees/'+curUser._id+'/channels/remove/slack';
    // $.ajax({
    //   dataType: 'json',
    //   type: 'PUT',
    //   async: false,
    //   url: url,
    //   success: function(response) {

    //     console.log('success!!!');
    //   },
    //   error: function(response) {
    //     console.log(JSON.stringify(response));
    //   },
    // });
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
        console.log(response);
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
    });
  }

  $('#logoutButton').on('click', () => {
    localStorage.setItem('userState', 0);
  });
});
