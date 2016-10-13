function setData(data) {
  $('#loader').hide();
  $('#firstname').val(data.firstname);
  $('#surname').val(data.surname);
  $('#website').val(data.website);
  $('#city').val(data.city);
  $('#position').val(data.position);
}

window.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    console.log('loader');
    chrome.tabs.sendMessage(
      tabs[0].id, {
        from: 'popup',
        action: 'info'
      }, setData);
  });
}, false);
