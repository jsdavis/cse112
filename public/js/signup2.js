$("#password").on("focusout", function (e) {
	if( $(this).val() != $("#repeat-password").val()) {
		$("#repeat-password").removeClass("valid").addClass("invalid");
	} else {
		$("#repeat-password").removeClass("invalid").addClass("valid");
	}
});

$("#repeat-password").on("keyup", function (e) {
    if ($("#password").val() != $(this).val()) {
        $(this).removeClass("valid").addClass("invalid");
    } else {
        $(this).removeClass("invalid").addClass("valid");
    }
});


$('#user-submit-btn').on('click', () => {
    const userData = grabUserData();
    console.log(userData);
    if(userData.role=='employee') {
      ajaxPost('/api/employees', userData);
    } else if(userData.role=='customer') {
      ajaxPost('/api/customers', userData);
    } else if(userData.role=='admin') {
      ajaxPost('/api/admins', userData);
    } else {
      console.log('Error invalid role');
    }
  });


(function() {
    $('form > input').keyup(function() {
        var invalid = false;
        $('form > input').each(function() {
            if ($(this).classList.contains("invalid")){
                invalid = true;
            }
        });
        if (invalid) {
            $('#user-submit-btn').attr('disabled');
        } else {
            $('#user-submit-btn').removeAttr('disabled');
        }
    });
})

  function ajaxPost(url, data) {
    $.ajax({
      type: 'POST',
      url: url,
      data: data,
      dataType: 'json',
      success: function(response) {
        if(url == '/api/employees' || url == '/api/admins' || url == '/api/customers') {
          console.log(response);
          if(response.role == 'admin') {
            localStorage.setItem('userState', 2);
            localStorage.setItem('currentUser', JSON.stringify(response));
            location.href = '/admin-dashboard.html';
          } else if(response.role == 'employee') {
            localStorage.setItem('userState', 1);
            localStorage.setItem('currentUser', JSON.stringify(response));
            location.href = '/visitors.html';
          } else{ // if(response.role == 'customer') {
            localStorage.setItem('userState', 3);
            localStorage.setItem('currentUser', JSON.stringify(response));
            location.href = '/user-dashboard.html';
          }
        } else if (url == '/api/companies') {
          localStorage.setItem('currentCompany', JSON.stringify(response));
          companyId = response._id;
        }
      },
      error: function(response) {
        console.log('HELLO');
        console.log(response);
        const resJSON = JSON.stringify(response);
        alert(jQuery.parseJSON(resJSON).responseText);
        event.preventDefault();
        location.href = '/signup.html';
      },
    });
  }


function grabUserData() {
	const user = {};
    user.first_name = $('#first_name').val();
    user.last_name = $('#last_name').val();
    user.email = $('#email').val();
    user.password = $('#password').val();
    user.phone_number = $('#telephone').val();
    user.role = 'customer'
    return user;
  }