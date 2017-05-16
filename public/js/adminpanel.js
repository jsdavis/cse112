$(document).ready(() => {
  console.log('ready');
  function getCompanies() {
    let json;
    $.ajax({
      dataType: 'json',
      type: 'GET',
      data: $('#response').serialize(),
      async: false,
      url: '/api/companies',
      success: function(response) {
        json = response;
        console.log(response);
      },
    });
    return json;
  }
  const companies = getCompanies();
    // DashBoard Template
  const source = $('#company-list-template').html();
  const template = Handlebars.compile(source);


  const compiledHtml = template(companies);

  $('#company-list').html(compiledHtml);
});
