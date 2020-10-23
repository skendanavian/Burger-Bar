$(document).ready(() => {

  //dropdown nav for mobile/tablet
  $('#dropdown-menu').click((event) => {
    $('.drop-down').slideToggle();
  });

  //error message display for login/register
  if ($('.error').length) {
    $('#error-messages').slideDown();
  }



});














