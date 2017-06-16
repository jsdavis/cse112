/**
 * Created by DanielKong on 3/8/16.
 */
$(document).ready(() => {
  let companyId;
  let userId;
  const message = document.getElementById('perror');
  message.style.visibility = 'hidden';

  $('#signupForm').on('submit',(event) => {
    event.preventDefault();

    let is_valid = validateUser();
    if(is_valid == false){
      message.style.visibility = 'visible';
    }
    else{
      message.style.visibility = 'hidden';
      submitUser();
      location.replace = '/login.html';
    }
  });

  /*
  $('#password').on('focusout', (e) => {
	  if( $(this).val() != $('#repeat-password').val()) {
		  $('#repeat-password').removeClass('valid').addClass('invalid');
	  } else {
		  $('#repeat-password').removeClass('invalid').addClass('valid');
	  }
  });

  $('#repeat-password').on('keyup', (e) => {
    if ($('#password').val() != $(this).val()) {
        $(this).removeClass('valid').addClass('invalid');
    } else {
        $(this).removeClass('invalid').addClass('valid');
    }
  });
  */



  function submitUser(){
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
  }

  $('#companyForm').on('submit',(event) => {
    event.preventDefault();
    let is_valid = validateCompany();
    if(is_valid == false){
      return false;
    }
    else{
      submitCompany();
      location.href = '/visitors.html';
    }
  });

  /*
  $('#submit-btn-company').on('click', () => {
    if(!validateCompany()){
      preventDefault();
    }
  */

  function submitCompany(){
    const companyData = grabCompanyData();
    //validate data!!!
    ajaxPost('/api/companies', companyData, false);
    companyData.adminUser.company_id = companyId;
    companyData.company_id = companyId;
    ajaxPost('/api/employees', companyData,false);
    ajaxPost('/api/companies/addAdmin/'+userId,companyData,true,'PUT');
    const themeData = {
      company_id: companyId,
      form_color: "FF8C3C",
      elements: [
        {
          label: 'First Name',
          placeholder: 'Enter your first name',
        },
        {
          label: 'Last Name',
          placeholder: 'Enter your last name',
        },
        {
          label: 'Phone Number',
          placeholder: 'Enter your phone number',
        },
      ]
    }
    console.log('hi');
    ajaxPost('/api/theme/', themeData, false);
    location.href='/login.html';
  }


   // Listener for creating a company
  // function submitCompany() {
  // 	if( validateCompany() === false) {
  // 	  return false;
  // 	}  	else{
  //   const companyData = grabCompanyData();
  //   console.log(companyData);
  //   companyData.company_id = companyId;
  //     // ajaxPost('/api/companies', companyData);
  //   return true;
  // }
  // }

  //   // next step
  // $('#submit-company-btn').on('click', function() {
  //   const parent_fieldset = $(this).parents('fieldset');
  //   let next_step = true;
  //   console.log(next_step);
  //   if(!submitCompany()) {
  //     next_step = false;
  //   }
  //   console.log(next_step);
  //   if( next_step ) {
  //     parent_fieldset.fadeOut(400, function() {
	 //      $(this).next().fadeIn();
	 //    });
  //   }
  // });

    // Grab Company Data from form
  function grabCompanyData() {
    const company = {};
    company.company_name= $('#company_name').val();
    company.adminUser = grabUserData();
    company.adminUser.role = "employee_admin";
    return company;
  }

    // Grab user data from form
  function grabUserData() {
    const user = {};
    user.first_name = $('#first_name').val();
    user.last_name = $('#last_name').val();
    user.email = $('#email').val();
    user.password = $('#form-password').val();
    user.phone_number = $('#telephone').val();
    user.password = $('#password').val();
    user.repeat_password = $('#repeat-password').val();
    user.role = "customer";
    return user;
  }

    // Ajax function to create a POST request to server
  function ajaxPost(url, data, bool=true,type='POST') {
    $.ajax({
      type: type,
      async: false,
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
          } else if(response.role == 'employee' || response.role == 'employee_admin') {
            localStorage.setItem('userState', 1);
            localStorage.setItem('currentUser', JSON.stringify(response));
            userId = response._id;
            console.log('hi');
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
        console.log('request to ' + url);
      },
      error: function(response) {
        console.log(response);
        const resJSON = JSON.stringify(response);
        event.preventDefault();
        if(data.company_name != undefined){
          location.href = '/signup-company.html';
        }
        else {
          location.href = '/signup.html';
        }
      },
    });
  }

  function validateUser() {
    const f_name = $('#first_name').val();
    const l_name = $('#last_name').val();
    const employee_email = $('#email').val();
    const employee_phone = $('#telephone').val();
    const password = $('#password').val();
    const repeat_password = $('#repeat-password').val();
    if(f_name == '') {
      console.log('name field cannot be blank');
      return false;
    }

    if(l_name == '') {
      console.log('name field cannot be blank');
      return false;
    }

    if(!validateEmail(employee_email)) {
      console.log('please enter a valid email');
      return false;
    }

    if(!checkPassword(password,repeat_password) ) {
      return false;
    }

    if(!validatePhone(employee_phone)) {
      console.log('please enter a valid phone number');
      return false;
    }
    return true;
  }

  function validateCompany() {
    const companyName = $('#company_name').val();
    const adminName = $('#first_name').val();
    const adminLName = $('#last_name').val();
    const companyEmail = $('#email').val();
    const companyNumber = $('#telephone').val();
    const password = $('#password').val();
    const repeat_password = $('#repeat-password').val();
    if(adminName == '') {
      console.log('name field cannot be blank');
      return false;
    }

    if(adminLName == '') {
      console.log('name field cannot be blank');
      return false;
    }

    if(companyName == '') {
      console.log('company name cannot be blank');
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

    if(!checkPassword(password,repeat_password)){
      return false;
    }

    return true;
  }

  function validateRole(role) {
  	if( role != 'admin' || role != 'client' || role != 'customer' ) {
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

  function checkPassword(password, repeat_password) {


      if(password.length < 6) {
        console.log('Password must contain at least six characters!');
        return false;
      }
      re = /[0-9]/;
      if(!re.test(password)) {
        console.log('Error: password must contain at least one number (0-9)!');
        return false;
      }
      re = /[a-z]/;
      if(!re.test(password)) {
        console.log('Error: password must contain at least one lowercase letter (a-z)!');
        return false;
      }
      re = /[A-Z]/;
      if(!re.test(password)) {
        console.log('Error: password must contain at least one uppercase letter (A-Z)!');
        return false;
      }
      if(password != repeat_password ) {
      	console.log('Error: passwords must match!');
      	return false;
      }
      return true;
    }

});
