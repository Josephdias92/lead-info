chrome.runtime.sendMessage({
  from: 'content',
  action: 'showPage'
});

function makeHttpCall(url, obj, cb) {
  var xhttp = new XMLHttpRequest();
  xhttp.open(obj.method || 'GET', url, false);
  xhttp.send(null);
  if (cb) {
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState === 4) {
        var response = JSON.parse(xhttp.responseText);
        if (xhttp.status === 200 && response.status === 'OK') {
          cb(response);
        } else {
          cb(response);
        }
      }
    }
  }
  return xhttp.responseText;
}


function getHostUrl(url) {
  var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
  if (match != null && match.length > 2 &&
    typeof match[2] === 'string' && match[2].length > 0) {
    return match[2];
  } else {
    return null;
  }
}

function getWebsiteName(websites) {
  var website = '';
  var linkCompany = '';
  if (websites[0]) {
    for (var i = 0; i < websites.length; i++) {
      var link = websites[i].children[0] && websites[i].children[0].href;
      if (link)
        break;
    }
    var webCompanyText = makeHttpCall(link, {
      method: 'GET'
    });
    var el = document.createElement('div');
    el.innerHTML = webCompanyText;
    if (el.getElementsByTagName('website')) {
      website = el.getElementsByClassName('website')[0];
      if (website) {
        var website = website.getElementsByTagName('p')[0].childNodes[1].innerHTML;
      } else if (el.getElementsByTagName('code')) {
        var code = el.getElementsByTagName('code')[1];
        code = code.childNodes[0] && code.childNodes[0].data;
        if (code) {
          obj = JSON.parse(code);
          website = obj.website;
        }
      }
    } else if (el.getElementById('code#stream-footer-embed-id-content')) {
      var codeTag = el.getElementById('code#stream-footer-embed-id-content');
      codeTag = codeTag.replace("<!--", "");
      codeTag = codeTag.replace("-->", "");
      obj = JSON.parse(codeTag);
      website = obj.website;
    }
  }
  website = website || '';
  return website;
}

function getPosition(positions) {
  var position = '';
  if (positions[0]) {
    var currentPos = positions[0];
    if (currentPos.children[0]) {
      position = currentPos.children[0].innerHTML;
    }
  } else {
    position = 'No Position Found';
  }
  return position;
}


function getCity() {
  var city = '';
  var cityHtml = document.getElementsByClassName('locality');
  if (cityHtml.length) {
    city = cityHtml[0].innerText
    var index = city.indexOf('Area');
    city = city.substr(0, index);
  }
  return city;
}

function getData(data) {
  var city = getCity();
  var website = '';
  var positions;
  var fullName = document.getElementsByClassName('full-name');
  if (fullName.length) {
    var fullname = fullName[0].innerText;
    var splitName = fullname.split(' ');
    var workProfile = document.getElementById('background-experience');
    if (workProfile) {
      var listOfWork = workProfile.querySelectorAll('strong');
      var website = getWebsiteName(listOfWork);
      positions = workProfile.querySelectorAll('h4');
    }
    var position = getPosition(positions);
    data = createObject(splitName, website, city, position);
  }
  return data;
}
chrome.runtime.onMessage.addListener(function(msg, sender, response) {
  var data = {
    firstname: '',
    surname: '',
    website: '',
    city: '',
    position: 'No Position Found'
  };

  if ((msg.from === 'popup') && (msg.action === 'info')) {
    var linkedinUrl = document.URL;
    var hostName = getHostUrl(linkedinUrl);
    if (hostName === 'linkedin.com') {
      var returnData = getData(data);
      returnData.linkedinUrl = linkedinUrl;
      response(returnData);
    }
  }
});



function createObject(splitedName, website, city, position) {
  var data = {
    website: website,
    city: city,
    position: position
  };
  if (splitedName.length > 2) {
    data.firstname = splitedName[0] + " " + splitedName[1];
    data.surname = splitedName[2];
  } else {
    data.firstname = splitedName[0];
    data.surname = splitedName[1];
  };
  return data;
}
