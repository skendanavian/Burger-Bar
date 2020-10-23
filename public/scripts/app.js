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

  $('#dropdown-menu').click((event) => {
    $('.drop-down').slideToggle();
  });

  $('#order-submit-btn').submit(function() {
    checked = $("input[type=checkbox]:checked").length;
    if (!checked) {
      alert("You must check at least one checkbox.");
      return false;
    }
  });


  $('input[type="checkbox"]').click(function() {
    if ($(this).is(":checked")) {
      console.log("Checkbox is checked.");
    }
    else if ($(this).is(":not(:checked)")) {
      console.log("Checkbox is unchecked.");
    }
  });


  $('#order-submit-btn').submit(function(e) {
    //check atleat 1 checkbox is checked
    if (!$('.online-order-form').is(':checked')) {
      //prevent the default form submit if it is not checked
      // e.preventDefault();
      alert('There are no menu items selected')
    }
  })


});














