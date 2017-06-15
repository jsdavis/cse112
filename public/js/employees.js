$(document).ready(() => {
  const companyData = JSON.parse(localStorage.getItem('currentCompany'));
  const myCompanyId = companyData._id;
  console.log(myCompanyId);

  const curUser = JSON.parse(localStorage.getItem('currentUser'));
  $('#user-name').text(curUser.first_name + ' ' + curUser.last_name);

  const employees = getEmployees();

  const source = $('#employee-list-template').html();
  const template = Handlebars.compile(source);
  const compiledHtml = template(employees);
  const userObj = JSON.parse(localStorage.getItem('currentUser'));
  if(userObj.role == 'employee') {
    document.getElementById('employees-link').hidden = true;
    document.getElementById('form-build-link').hidden = true;
  } else if(userObj.role != 'employee_admin' || userObj.role != 'employee') {
    location.href = '/user-dashboard.html';
  }
  $('#employee-list').html(compiledHtml);
  $('#saveEmployeeButton').click(submitForm);
  $('.modal').modal();
  // Makes a get request to display list of employees
  function getEmployees() {
    let json;
    $.ajax({
      dataType: 'json',
      type: 'GET',
      data: $('#response').serialize(),
      async: false,
      url: '/api/employees/company/' + myCompanyId,
      success: function(response) {
        json = response;
               // console.log(response);
      },
    });
    return json;
  }

  // Makes a post request to update list of employees when adding a new employee
  function updateEmployeeList(obj) {
    $.ajax({
      dataType: 'json',
      type: 'POST',
      data: obj,
      async: false,
      url: '/api/employees',
      success: function(response) {
        employees.push(response);
               // console.log(response);
      },
    });
  }

  // When a patient submits their form
  function submitForm() {
    const d = grabFormElements();
    updateEmployeeList(d);
    $('#employee-list').html(template(employees));
    document.getElementById('employee-form').reset();
  }

  // Grabs elements from the check in and puts it into an object
  function grabFormElements() {
    const newEmployee = {};
    newEmployee.company_id = myCompanyId;
    newEmployee.role = 'employee',
        newEmployee.first_name= $('#employee-first').val();
    newEmployee.last_name = $('#employee-last').val();
    newEmployee.phone_number = $('#employee-number').val();
    newEmployee.email = $('#employee-email').val();
    newEmployee.password = $('#employee-pw').val();
    newEmployee.confirm_password = $('#employee-confirm-pw').val();
    return newEmployee;
  }

  // Find Specific Employee Given Employee ID within the Employee Array
  function findEmployee(id) {
    for(const employee in employeeList) {
      if(employeeList.hasOwnProperty(employee)) {
        if(employeeList[employee]._id === id) {
          if(DEBUG) // console.log(employeeList[employee]);
            return employeeList[employee];
        }
      }
    }
  }

  $('#logoutButton').on('click', () => {
    localStorage.setItem('userState', 0);
  });
});
