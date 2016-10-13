(function($) {
  $('#getInfo').on('click', function() {
    var loader = $("#loader");
    loader.show();
    var serverURL = 'http://139.59.23.63/index.php/Prospects/find_email';
    var firstname = $('#firstname').val();
    var surname = $('#surname').val();
    var website = $('#website').val();
    var position = $('#position').val();
    var city = $('#city').val();
    $.ajax({
      url: serverURL,
      method: 'Post',
      data: {
        fname: firstname,
        lname: surname,
        domain: website,
        city: city,
        position: position,
      }
    }).done(function(d) {
      if (d) {
        var form = $('#leadFinderForm');
        var displayLeadInfo = $('#displayLeadInfo');
        if (form && displayLeadInfo) {
          loader.hide();
          form.hide();
          displayLeadInfo.show();
          $('#email').val(d.email);
        }
      }
    })
  })
})(jQuery);
