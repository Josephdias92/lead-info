(function($) {
  $('#getInfo').on('click', function() {
    var serverURL = 'http://10.10.0.98:8888/app/index.php/DB/find_email';
    var firstname = $('#firstname').val();
    var surname = $('#surname').val();
    var website = $('#website').val();
    var position = $('#position').innerText;

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
        var form = document.getElementById('leadFinderForm');
        var displayLeadInfo = document.getElementById(
          'displayLeadInfo');
        if (form && displayLeadInfo) {
          form.style.display = 'none';
          displayLeadInfo.style.display = 'block';
          document.getElementById('email').value = d.email;
        }
      }
    })
  })
})(jQuery);
