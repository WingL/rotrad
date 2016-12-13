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

function onDeviceReady() {
    console.log(StatusBar);
	StatusBar.show();
	StatusBar.backgroundColorByHexString("1A468C");
	// COMMENTED: don't actually want status bar glow
	//setupStatusBarGlow();
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
      logo:'http://www.nac.org.au/wp-content/uploads/nac_easylistening.png'
    },
    'dcvs-radio': {
      streamId: 'donrudd',
      url: 'http://thassos.cdnstream.com:5046/stream',
      logo:'http://www.nac.org.au/wp-content/uploads/dcvs_radio.png'
    },
  };


  function play() {
    var audio = document.getElementById("radio");
    audio.load();
    audio.play();
  };

  function pause(){
    var audio = document.getElementById("radio");
    audio.pause();

  };

  function defaultvolume(){
    var audio = document.getElementById("radio");
    audio.volume=0.7;
  }
  function decVol() {
    var audio = document.getElementById("radio");
    audio.volume -= 0.2;
  };

  function incVol(){
    var audio = document.getElementById("radio");
    audio.volume += 0.2;
  };

  // This function adds click handler on the station links.
  // The purpose is to force the page to reload with a modified hash.
  function setupLinks() {
    $('#channels a').click(function(event){
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

    $('.cc_streaminfo').each(function(idx, elem) {
      // add the selected streamId onto .cc_streaminfo element IDs,
      // e.g. cc_strinfo_title => cc_strinfo_title_nundahac
      elem = $(elem);
      elem.attr('id', elem.attr('id') + '_' + streamId);
    });
    $('#radio').attr('src', url);
    $('.radiologo img').attr('src',logo);
  }

function loadStreamInfo(){
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


  function play() {
	var audio = document.getElementById("radio");
    audio.load();
    audio.play();
};

function pause(){
	var audio = document.getElementById("radio");
	audio.pause();
};


function playPause() {
    var audio = document.getElementById("radio");
	var icon = document.getElementById('playicon');
    if (audio.paused) {
		audio.load();
        audio.play();
		icon.src='img/icon3.png'
    } else {
       audio.pause();
	   icon.src='img/icon2.png'
    }
};

/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
};

