/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  console.log(StatusBar);
  StatusBar.show();
  StatusBar.backgroundColorByHexString("1A468C");
  // COMMENTED: don't actually want status bar glow
  //setupStatusBarGlow();
  musiccontrol();
};

//Status Bar//
function setupStatusBarGlow() {
  var index = 0;
  function setNextColor() {
    index = index + 1;
    if (index >= 512) {
      index = 0;
    }
    var value = index;
    if (value > 255) {
      value = 512 - value;
    }
    var str = value.toString(16);
    if (str.length == 1) {
      str = '0' + str;
    }

    // CHANGE THIS PART if you want a different color.
    // Remember color is: RRGGBB
    // This color will go from 000000 to 0000FF (black to blue)
    // Switch it around if you want to use different colors
    var colorString = '0000' + str;
    StatusBar.backgroundColorByHexString(colorString);
  }
  setInterval(setNextColor, 20);
}




/*cordova music plug-in*/
function musiccontrol() {
  MusicControls.create({
    track: 'Time is Running Out',        // optional, default : ''
    artist: 'Muse',                     // optional, default : ''
    cover: 'albums/absolution.jpg',      // optional, default : nothing
    // cover can be a local path (use fullpath 'file:///storage/emulated/...', or only 'my_image.jpg' if my_image.jpg is in the www folder of your app)
    //           or a remote url ('http://...', 'https://...', 'ftp://...')
    isPlaying: true,                           // optional, default : true
    dismissable: true,                         // optional, default : false

    // hide previous/next/close buttons:
    hasPrev: false,      // show previous button, optional, default: true
    hasNext: false,      // show next button, optional, default: true
    hasClose: true,       // show close button, optional, default: false

    // iOS only, optional
    album: 'Absolution',     // optional, default: ''
    duration: 60, // optional, default: 0;
    elapsed: 10, // optional, default: 0;

    // Android only, optional
    // text displayed in the status bar when the notification (and the ticker) are updated
    ticker: 'Now playing "Time is Running Out"'
  }, onSuccess, onError);

  // Register callback
  MusicControls.subscribe(events);

  // Start listening for events
  // The plugin will run the events function each time an event is fired
  MusicControls.listen();
  function events(action) {
    switch (action) {
      case 'music-controls-next':
        // Do something
        break;
      case 'music-controls-previous':
        // Do something
        break;
      case 'music-controls-pause':
        // Do something
        break;
      case 'music-controls-play':
        // Do something
        break;
      case 'music-controls-destroy':
        // Do something
        break;

      // External controls (iOS only)
      case 'music-controls-toggle-play-pause':
        // Do something
        break;

      // Headset events (Android only)
      case 'music-controls-media-button':
        // Do something
        break;
      case 'music-controls-headset-unplugged':
        // Do something
        break;
      case 'music-controls-headset-plugged':
        // Do something
        break;
      default:
        break;
    }
  };

};





/*function onload(){	
	document.addEventListener("deviceready", onDeviceReady, false);
	function onDeviceReady() {
    console.log(Media);
	}
};

// Play audio
//
function playAudio(url) {
    // Play the audio file at url
    var my_media = new Media(url,
        // success callback
        function () {
            console.log("playAudio():Audio Success");
        },
        // error callback
        function (err) {
            console.log("playAudio():Audio Error: " + err);
        }
    );
    // Play audio
    my_media.play();
}*/



// These are the supported stations, mapped to the ID and URL
// of the stream
var STATIONS = {
  'nac_radio': {
    streamId: 'nundahac',
    url: 'http://thassos.cdnstream.com:5049/live',
    logo: 'http://www.nac.org.au/wp-content/uploads/nac_easylistening.png'
  },
  'dcvs-radio': {
    streamId: 'donrudd',
    url: 'http://thassos.cdnstream.com:5046/stream',
    logo: 'http://www.nac.org.au/wp-content/uploads/dcvs_radio.png'
  },
};

/*
function play() {
  var audio = document.getElementById("radio");
  audio.load();
  audio.play();
};

function pause() {
  var audio = document.getElementById("radio");
  audio.pause();

};

function defaultvolume() {
  var audio = document.getElementById("radio");
  audio.volume = 0.7;
}
function decVol() {
  var audio = document.getElementById("radio");
  audio.volume -= 0.2;
};

function incVol() {
  var audio = document.getElementById("radio");
  audio.volume += 0.2;
};
*/
// This function adds click handler on the station links.
// The purpose is to force the page to reload with a modified hash.
function setupLinks() {
  $('#channels a').click(function (event) {
    var elem = $(event.currentTarget);
    var baseUrl = window.location.href.split('#')[0];
    var newUrl = baseUrl + elem.attr('href');
    location.replace(newUrl);
    location.reload();
  });
}

// This function adjusts the audio and cc_streaminfo elements to
// match the selected station.  It must be called before
// the js from thassos is loaded.
function chooseStation() {
  var stationId = window.location.hash.substr(1);

  if (!stationId) {
    // this is the default if none selected
    stationId = 'nac_radio';
  }

  var station = STATIONS[stationId];
  var streamId = station.streamId;
  var url = station.url;
  var logo = station.logo;

  $('.cc_streaminfo').each(function (idx, elem) {
    // add the selected streamId onto .cc_streaminfo element IDs,
    // e.g. cc_strinfo_title => cc_strinfo_title_nundahac
    elem = $(elem);
    elem.attr('id', elem.attr('id') + '_' + streamId);
  });
  $('#radio').attr('src', url);
  $('.radiologo img').attr('src', logo);
}

function loadStreamInfo() {
  console.log("About to load streaminfo.js");
  var url = 'https://thassos.cdnstream.com:2199/system/streaminfo.js';
  var scriptElement = document.createElement('script');
  scriptElement.setAttribute('src', url);
  document.getElementsByTagName('body')[0].appendChild(scriptElement);
  console.log('streaminfo.js script has been appended');
}

// Do all initialization prior to loading thassos JS.
function init() {
  setupLinks();
  chooseStation();
  /* volume(); */
  $(document).ready(loadStreamInfo);
}

init();

/*
function play() {
  var audio = document.getElementById("radio");
  audio.load();
  audio.play();
};

function pause() {
  var audio = document.getElementById("radio");
  audio.pause();
};
*/

function playPause() {
  var audio = document.getElementById("radio");
  var icon = document.getElementById("playicon");
  if (audio.paused) {
    audio.load();
    audio.play();
    icon.className = "pause";
  } else {
    audio.pause();
    icon.className = "play";
  }
};

function decVol() {
  var audio = document.getElementById("radio");
  audio.volume -= 0.2;
};

function incVol() {
  var audio = document.getElementById("radio");
  audio.volume += 0.2;
};

/* Set the width of the side navigation to 100% */
function openNav() {
  document.getElementById("mySidenav").style.width = "100%";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
};



