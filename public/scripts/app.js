// Provided in project Skeleton 
// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });

$(document).ready(() => {


  //dropdown nav for mobile
  $('#dropdown-menu').click((event) => {
    $('.drop-down').slideToggle();
  });

  //error message display for login/register
  if ($('.error').length) {
    console.log('it exists')

    $('#error-messages').slideDown();
  }

});














