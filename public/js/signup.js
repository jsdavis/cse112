/**
 * Created by DanielKong on 3/8/16.
 */
$(document).ready(() => {
  let companyId;

    // Listener for Initial Sign up of an Employee
  $('#submit-btn').on('click', () => {
    const employeeData = grabEmployeeData();
    console.log(employeeData);
    ajaxPost('/api/employees', employeeData);
  });

   // Listener for creating a company
  function submitCompany() {
    if( validateCompany() === false)
      return false;

    else {
      const companyData = grabCompanyData();
      console.log(companyData);
      // ajaxPost('/api/companies', companyData);
      return true;
    }
  }

    // next step
  $('#submit-company-btn').on('click', function() {
    const ParentFieldset = $(this).parents('fieldset');
    let NextStep = true;
    console.log(NextStep);
    if(!submitCompany()) {
      NextStep = false;
    }
    console.log(NextStep);

    if( NextStep ) {
      ParentFieldset.fadeOut(400, function() {
        $(this).next().fadeIn();
      });
    }
  });

    // Grab Company Data from form
  function grabCompanyData() {
    const company = {};
    company.name = $('#form-company-name').val();
    company.email = $('#form-email').val();
    company.phone_number = $('#form-phone').val();
    return company;
  }

    // Grab employee data from form
  function grabEmployeeData() {
    const employee = {};
    employee.first_name = $('#form-employee-first').val();
    employee.last_name = $('#form-employee-last').val();
    employee.email = $('#form-employee-email').val();
    employee.password = $('#form-password').val();
    employee.phone_number = $('#form-employee-phone').val();
    employee.role = $('#form-employee-role').val();
    console.log('Role = ' + employee.role);
    employee.company_id = companyId;
    return employee;
  }

    // Ajax function to create a POST request to server
  function ajaxPost(url, data) {
    $.ajax({
      type: 'POST',
      url: url,
      data: data,
      dataType: 'json',
      success: function(response) {
        if(url == '/api/employees') {
          console.log(response);
          if(response.role == 'admin') {
            localStorage.setItem('userState', 2);
            localStorage.setItem('currentUser', JSON.stringify(response));
            location.href = '/admin-dashboard.html';
          } else if(response.role == 'client') {
            localStorage.setItem('userState', 1);
            localStorage.setItem('currentUser', JSON.stringify(response));
            location.href = '/visitors.html';
          } else if(response.role == 'customer') {
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

  function validateCompany() {
    const companyName = $('#form-company-name').val();
    const companyEmail = $('#form-email').val();
    const companyNumber = $('#form-phone').val();

    if(companyName == '') {
      console.log('username cannot be blank');
      return false;
    }

    if(!validateEmail(companyEmail)) {
      console.log('please enter a valid email');
      return false;
    }

    if(!validatePhone(companyNumber)) {
      console.log('please enter a valid phone number');
      return false;
    }

    return true;
  }


  function validateEmail(email) {
    // const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const re = /([^@\s]+@[^@\s]+\.[^@\s]+)$/;
    return re.test(email);
  }

  function validatePhone(phone) {
    const PhoneFormat = /(\d{3}-\d{3}-\d{4}$)/;
    return PhoneFormat.test(phone);
  }

  function checkPassword(form) {
    if(form.first.value == '') {
      alert('Error: Username cannot be blank!');
      form.username.focus();
      return false;
    }
    const password = $('#form-password');
    const confirmPassword = $('#form-repeat-password');

    if(password.value != '' && password.value == confirmPassword.value) {
      if(form.password.value.length < 6) {
        console.log('Password must contain at least six characters!');
        password.focus();
        return false;
      }
      if(password.value == password.value) {
        console.log('Error: Password must be different from Username!');
        password.focus();
        return false;
      }
      re = /[0-9]/;
      if(!re.test(password.value)) {
        console.log('Error: password must contain at least one number (0-9)!');
        password.focus();
        return false;
      }
      re = /[a-z]/;
      if(!re.test(password.value)) {
        console.log('Error: password must contain at least one lowercase letter (a-z)!');
        password.focus();
        return false;
      }
      re = /[A-Z]/;
      if(!re.test(form.pwd1.value)) {
        console.log('Error: password must contain at least one uppercase letter (A-Z)!');
        password.focus();
        return false;
      }
    } else {
      console.log('Error: Please check that you\'ve entered and confirmed your password!');
      password.focus();
      return false;
    }
    console.log('You entered a valid password: ' + password.value);
    return true;
  }
  function validateForm() {

  }
});
