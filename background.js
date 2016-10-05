chrome.runtime.onMessage.addListener(function(msg, sender) {
  if ((msg.from === 'content') && (msg.action === 'showPage')) {
    chrome.pageAction.show(sender.tab.id);
  }
});
