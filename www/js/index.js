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
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
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
		icon.src='img/pause.png'
    } else {
       audio.pause(); 
	   icon.src='img/play.png'
    }
};