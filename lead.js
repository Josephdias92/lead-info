(function($) {
  var serverURL = 'localhost';
  $('#getInfo').on('click', function() {
    var firstname = $('#firstname').val();
    var surname = $('#surname').val();
    var website = $('#website').val();
    var city = $('#city').val();
    $.ajax({
      url: serverURL,
      method: 'GET',
      data: {
        firstname: firstname,
        surname: surname,
        website: website,
        city: city
      }
    })
  })
})(jQuery);
