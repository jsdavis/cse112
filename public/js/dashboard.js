
let visitors;
let source;
let template;

let modal;
let modalTemplate;
let compiledHtml;

let companyData;
let myCompanyId;


$(document).ready(() => {
  $('.parallax').parallax();
  // var CONNECTION = "connection";
  const VALIDATE_COMPANY_ID = 'validate_company_id';
  const VISITOR_LIST_UPDATE = 'visitor_list_update';
  const DISCONNECT = 'disconnect';
  const REMOVE_VISITOR = 'remove_visitor';
  const ADD_VISITOR = 'add_visitor';
  /** *
   * Compile all the Handle Bar Templates
   */

  companyData = JSON.parse(localStorage.getItem('currentCompany'));
  myCompanyId = companyData._id;

  updateVisitors();
  updateModalVisitor();

  /** *
  * Function Listener for Opening a Modal
  */
  let uniqueId;
  $(document).on('click', '.patient-check-out', function() {
    /* eslint-disable */ // eslint doesn't like 'this'
    uniqueId = $(this).attr('value');
    /* eslint-enable */

    const visitorData = getVisitorData(myCompanyId, uniqueId);
    const compiledTemplate = modalTemplate(visitorData);
    $('.modal-dialog').html(compiledTemplate);
  });

  $(document).on('click', '.check-in-btn', function() {
    /* eslint-disable */ // eslint doesn't like 'this'
    const id = $(this).closest('.modal-content').find('.phone-number').attr('value');
    /* eslint-enable */
  });

  /* eslint-disable */ // eslint doesn't like 'this'
  $(document).on('click', '.removeButton', function() {
    let json;
    $.ajax({
      dataType: 'json',
      type: 'DELETE',
      data: $('#response').serialize(),
      async: false,
      url: '/api/visitorLists/company/' + myCompanyId + '/visitor/' + uniqueId,
      success: function(response) {
        json = response;
        console.log(response);

        updateVisitors();
        updateModalVisitor();
      },
    });
  });
  /* eslint-enable */ // eslint doesn't like 'this'
});

function updateVisitors() {
  visitors = getVisitors(myCompanyId);
  // DashBoard Template
  source = $('#visitor-list-template').html();
  template = Handlebars.compile(source);
}

function updateModalVisitor() {
    // Modal Template
  modal = $('#visitor-info-template').html();
  modalTemplate = Handlebars.compile(modal);
  compiledHtml = template(visitors);
  $('#visitor-list').html(compiledHtml);
}

// Makes a get request to display list of employees
function getVisitors(myCompanyId) {
  let json;
  $.ajax({
    dataType: 'json',
    type: 'GET',
    data: $('#response').serialize(),
    async: false,
    url: '/api/visitorLists/company/' + myCompanyId,
    success: function(response) {
      json = response;
      console.log(response);
    },
  });
  return json.visitors;
}


function getVisitorData(myCompanyId, uniqueId) {
  let json;
  $.ajax({
    dataType: 'json',
    type: 'GET',
    data: $('#response').serialize(),
    async: false,
    url: '/api/visitorLists/company/' + myCompanyId,
    success: function(response) {
      json = response;
      console.log(response);
    },
  });

  const container = json.visitors;
  // return JSON.stringify(container[0]);
  for (let i = 0; i < container.length; i++) {
    if (container != null && container[i] != null && container[i]['_id'] == uniqueId) {
      return(container[i]);
    }
  }
}
