$(document).ready(($) => {
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
  const userObj = JSON.parse(localStorage.getItem('currentUser'));
  if(userObj.role == 'employee') {
    document.getElementById('employees-link').hidden = true;
    document.getElementById('form-build-link').hidden = true;
  } else if(userObj.role != 'employee_admin' || userObj.role != 'employee') {
    location.href = '/user-dashboard.html';
  }
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

$(() => {
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
});

$('.dropdown-button').dropdown({
  inDuration: 300,
  outDuration: 225,
  constrainWidth: false, // Does not change width of dropdown to that of the activator
  hover: true, // Activate on hover
  gutter: 0, // Spacing from edge
  belowOrigin: false, // Displays dropdown below the button
  alignment: 'left', // Displays dropdown with edge aligned to the left of button
  stopPropagation: false, // Stops event propagation
});
$('.dropdown-button').dropdown();
$('.dropdown-button').dropdown('close');
