let elementLabel;
let elementPlaceholder;
const elementsObj = [
  {
    'label': 'First Name',
    'placeholder': 'Enter your first name',
  },
  {
    'label': 'Last Name',
    'placeholder': 'Enter your last name',
  },
  {
    'label': 'Phone Number',
    'placeholder': 'Enter your phone number',
  },
];

const companyData = JSON.parse(localStorage.getItem('currentCompany'));
const myCompanyId = companyData._id;
const curUser = JSON.parse(localStorage.getItem('currentUser'));

$(document).ready(($) => {
  $('.modal').modal();
  $('.my-form:last .add-box').click(() => {
    const label = $('#optional_label').val();
    console.log('value: ' + label);
    const n = $('.text-box').length;
    if( 2 < n ) {
      alert('Max number of fields that can be added is 2');
      return false;
    }
    const boxHtml = $('<p class="text-box"><label id = "added_label" for="optional_' + n + '"> <span class="box-number">' + label + '</span></label><br> <input type="text" name="boxes[]" value="" placeholder = "Enter here" id="box' + n + '" required/> <button type="button" class="btn btn-danger remove-box">Remove</button></p>');
    boxHtml.hide();
    $('.my-form:first .addField:last').before(boxHtml);
    boxHtml.fadeIn('slow');
    $('#optional_label').val('');
    return false;
  });

  if(curUser.role == 'employee') {
    location.href = '/visitors.html';
    document.getElementById('employees-link').hidden = true;
    document.getElementById('form-build-link').hidden = true;
  }

  function hexFromRGB(r, g, b) {
    const hex = [
      r.toString( 16 ),
      g.toString( 16 ),
      b.toString( 16 ),
    ];
    $.each( hex, ( nr, val ) => {
      if ( val.length === 1 ) {
        hex[nr] = '0' + val;
      }
    });
    return hex.join('').toUpperCase();
  }

  function refreshSwatch() {
    const red = $('#red').slider('value');
    const green = $('#green').slider('value');
    const blue = $('#blue').slider( 'value' );
    const hex = hexFromRGB( red, green, blue );
    $('#swatch').css('background-color', '#' + hex );
    return hex;
  }

  $('#red, #green, #blue').slider({
    orientation: 'horizontal',
    range: 'min',
    max: 255,
    value: 127,
    slide: refreshSwatch,
    change: refreshSwatch,
  });

  $( '#red' ).slider( 'value', 255 );
  $( '#green' ).slider( 'value', 140 );
  $( '#blue' ).slider( 'value', 60 );


  $('#add-element-button').click(()=> {
    console.log('Add element clicked');
    $('#modal1').modal('open');
  });

  $('#modal-add-button').click(() => {
    elementLabel = $('#element-label').val();
    elementPlaceholder = $('#element-placeholder').val();
    $('#wrapper').append('<div><label for="' + elementLabel + '">' + elementLabel +
      '</label><input type="text" name="' + elementLabel +
      '" placeholder="' + elementPlaceholder + '"/><div>');
    elementsObj.push({'label': elementLabel, 'placeholder': elementPlaceholder});
    console.log(elementsObj);
  });

  $('#submit-button').click(() => {
    const formColor = refreshSwatch();
    const putObj = {
      company_id: myCompanyId,
      form_color: formColor,
      elements: elementsObj,
    };
    $.ajax({
      type: 'PUT',
      dataType: 'json',
      url: '/api/theme/' + myCompanyId,
      data: putObj,
      success: (response) => {
        console.log(response);
      },
    });
  });
});

$('.my-form').on('click', '.remove-box', function() {
  $(this).parent().css( 'background-color', '#FF6C6C' );
  $(this).parent().fadeOut('slow', function() {
    $(this).remove();
    $('.box-number').each((index) => {
      $('#box2').attr('id', 'box1');
      $('#added_label').attr('for', 'optional_1');
    });
  });
  return false;
});

