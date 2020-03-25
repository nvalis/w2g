// This code loads the IFrame Player API code asynchronously
var tag = document.createElement('script')
tag.src = 'https://www.youtube.com/player_api'
var firstScriptTag = document.getElementsByTagName('script')[0]
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

var setVideoURLButton = document.getElementById('set-video-url')

// This function creates an <iframe> (and YouTube player) after the API code
// downloads
var player
function onYouTubePlayerAPIReady () {
  player = new YT.Player('youtube-player', {
    height: '607',
    width: '1080',
    events: {
      'onStateChange': onPlayerStateChange
    }
  })
}

// The API calls this function when the player's state changes. The function
// indicates that when playing a video (state=1), the player should play for
// six seconds and then stop.
function onPlayerStateChange (event) {
  let text
  switch (event.data) {
    case -1:
      text = 'unstarted'
      break
    case 0:
      text = 'ended'
      break
    case 1:
    // notify other clients and pause if not everyone is ready
      text = 'playing'
      break
    case 2:
    // notify other clients if not pausing because one client is still buffering
      text = 'paused'
      break
    case 3:
      // notify other clients of new position
      text = 'buffering'
      break
    case 5:
      text = 'video cued'
      break
  }

  if (text) {
    let url = player.getVideoUrl()
    document.getElementById('player-id').innerHTML = '<a href=' + url + '>' + url + '</a>'
    document.getElementById('player-state').innerHTML = text
    document.getElementById('player-pos').innerHTML = player.getCurrentTime() + 's'
  }
}

function setVideoId () {
  if (!player) { return }
  let newId = document.getElementById('video-id').value
  player.cueVideoById({
    videoId: newId
  })
}

function playVideo () {
  player.playVideo()
}

function pauseVideo () {
  player.pauseVideo()
}

// https://andybrewer.github.io/mvp/quickstart.html.txt
// https://developers.google.com/youtube/iframe_api_reference
