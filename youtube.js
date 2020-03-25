var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var setVideoURLButton = document.getElementById('set-video-url');

var player;
function onYouTubePlayerAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '607',
        width: '1080',
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerStateChange(event) {
    var playerStatus = event.data;
    var text;
    if (playerStatus == -1) {
        text = "unstarted";
    } else if (playerStatus == 0) {
        text = "ended";
    } else if (playerStatus == 1) {
        text = "playing";
    } else if (playerStatus == 2) {
        text = "paused";
    } else if (playerStatus == 3) {
        text = "buffering";
    } else if (playerStatus == 5) {
        text = "video cued";
    }
    if (text) {
        var url = player.getVideoUrl();
        document.getElementById('player-id').innerHTML = "<a href=" + url + ">" + url + "</a>";
        document.getElementById('player-state').innerHTML = text;
        document.getElementById('player-pos').innerHTML = player.getCurrentTime() + "s";
    }
}
function setVideoId() {
    if (!player) {return;}
    var newId = document.getElementById('video-id').value;
    player.cueVideoById({
        videoId: newId
    });
}

function playVideo() {
    player.playVideo();
}

function pauseVideo() {
    player.pauseVideo();
}

// https://andybrewer.github.io/mvp/quickstart.html.txt
// https://developers.google.com/youtube/iframe_api_reference