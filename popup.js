function setData(data) {
  document.getElementById('firstname').value = data.firstname;
  document.getElementById('surname').value = data.surname;
  document.getElementById('website').value = data.website;
  document.getElementById('city').value = data.city;
}

window.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id, {
        from: 'popup',
        action: 'info'
      }, setData);
  });
}, false);
