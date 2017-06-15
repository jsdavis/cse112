$(document).ready(() => {
  const companyData = JSON.parse(localStorage.getItem('currentCompany'));
  const myCompanyId = companyData._id;
  const curUser = JSON.parse(localStorage.getItem('currentUser'));

  $('#modal-save').click(submitForm);

  //  $('#appt-date').datepicker();
  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year
    container: 'body',
  });
  $('.modal').modal();
  let appts = getAppts();

  function initializeAppts(appts) {
    appts.sort((a, b) => {
      return new Date(a.start) - new Date(b.start);
    });
    for(let i = 0, len = appts.length; i < len; i++) {
      appts[i].fullDate = formatDate(''+appts[i].start);
      appts[i].appointmentTime = formatTime(''+appts[i].start);
    }
    return appts;
  }

  appts = initializeAppts(appts);
  const source = $('#appt-list-template').html();
  const template = Handlebars.compile(source);
  const compiledHtml = template(appts);

  $('#appt-list').html(compiledHtml);

  // Makes a get request to display list of appts
  function getAppts() {
    let json;
    $.ajax({
      dataType: 'json',
      type: 'GET',
      async: false,
      url: '/api/appointments/company/' + myCompanyId,
      success: function(response) {
        json = response;
        console.log(response);
      },
    });
    return json;
  }

  // When a patient submits their form
  function submitForm() {
    const d = grabFormElements();
    console.log(d);
    updateApptList(d);
    appts = getAppts();
    appts = initializeAppts(appts);
    $('#appt-list').html(template(appts));
    // document.getElementById('appt-form').reset();
  }

  // Makes a post request to update list of appts when adding a new employee
  function updateApptList(obj) {
    alert('passing in'+JSON.stringify(obj));
    $.ajax({
      dataType: 'json',
      type: 'POST',
      data: obj,
      async: false,
      url: '/api/appointments/',
      success: function(response) {
        appts.push(response);
        console.log(response);
      },
      error: function(response) {
        alert(JSON.stringify(response));
      },
    });
  }


  // Grabs elements from the check in and puts it into an object
  function grabFormElements() {
    const newAppt = {};
    newAppt.company_id = myCompanyId;
    newAppt.customer_first_name= $('#appt-first').val();
    newAppt.customer_last_name = $('#appt-last').val();
    newAppt.phone_number = $('#appt-number').val();
    newAppt.employee_first_name = curUser.first_name;
    newAppt.employee_last_name = curUser.last_name;
    newAppt.employee_email = curUser.email;
    const userDate = $('#appt-date').val();
    const userStartTime = $('#appt-start-time').val();
    const userEndTime = $('#appt-start-time').val();

    newAppt.start = jsDate(userDate, userStartTime);
    newAppt.end = jsDate(userDate, userEndTime);
    return newAppt;
  }

  $(document).on('click', '.delete-appt', function() {
    /* eslint-disable */ // eslint doesn't like 'this'
    const apptId = $(this).closest('.appt-row').attr('value');
    /* eslint-enable */
    console.log('delete');
    $.ajax({
      dataType: 'json',
      type: 'DELETE',
      url: '/api/appointments/' + apptId,
      success: function(response) {
        const updateAppts = getAppts();
        const removeAppt = initializeAppts(updateAppts);
        $('#appt-list').html(template(removeAppt));
      },
    });
  });


    /** ******************* FUNCTIONS TO FORMAT JAVASCRIPT DATES ********************/

  function formatDate(date) {
    const d = new Date(Date.parse(date));
    let mm = d.getMonth() + 1;
    const yyyy = d.getFullYear();
    let dd = d.getDate();
      // var monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug","Sep","Nov","Dec"];
    if(dd < 10) {
      dd = '0' + dd;
    }
    if(mm < 10) {
      mm = '0' + mm;
    }
      // console.log(monthArray[mm]);
    return mm + '/' + dd + '/' + + yyyy;
  }

  /* eslint-disable */ // Defined but never used
  function formatNumber(number) {
    return '(' + number.substr(0, 3) + ')' + number.substr(3, 3) + '-' + number.substr(6, 4);
  }
  /* eslint-enable */

    // FUNCTION TO FORMAT DATE OBJECT IN JS
  function jsDate(date, time) {
    const jsDate = reFormatDate(date);
    const jsTime = reFormatTime(time);
    jsDateObj = jsDate + ' ' + jsTime;
    return jsDateObj;
  }

    // FUNCTION TO FORMAT DATE TO JS FOR ROBOTS
  function reFormatDate(date) {
    const d = new Date(Date.parse(date));
    let mm = d.getMonth() + 1;
    const yyyy = d.getFullYear();
    let dd = d.getDate();

    if(dd < 10) {
      dd = '0' + dd;
    }
    if(mm < 10) {
      mm = '0' + mm;
    }
    return yyyy + '-' + mm +'-' + dd;
  }


    // FUNCTION TO FORMAT TIME TO JS FOR ROBOTS
  function reFormatTime(time) {
    const ampm = time.substr(-2, 2);
    let formattedTime;
    let formattedHour;
    const colon = time.indexOf(':');

    if(ampm === 'PM') {
      formattedHour = time.substr(0, 2);

      if(formattedHour == '12')
        formattedHour = 12;
      else
          formattedHour = 12 + parseInt(time.substr(0, 2));

      formattedTime = formattedHour + time.substr(colon, 3) + ':00';
    } else{
      formattedHour = parseInt(time.substr(0, 2));
      if(formattedHour < 10) {
        formattedHour = '0' + formattedHour;
      }
      if(formattedHour == 12) {
        formattedHour = '00';
      }
      formattedTime = formattedHour + time.substr(colon, 3) + ':00';
    }

    return formattedTime;
  }


    // FUNCTION TO FORMAT TIME TO AM AND PM FOR HUMANS
  function formatTime(time) {
    let currentTime = new Date(Date.parse(time));
    let hour = currentTime.getHours();
    let minute = currentTime.getMinutes();

    if(minute < 10) {
      minute = '0' + minute;
    }

    if(hour >= 13) {
      hour = hour-12;
      currentTime = hour + ':' + minute + 'PM';
    } else if(hour === 12) {
      currentTime = hour + ':' + minute +'PM';
    } else if(hour === 0) {
      currentTime = 1 + ':' + minute + 'AM';
    } else{
      currentTime = hour + ':' + minute +'AM';
    }

    return currentTime;
  }
});
