var video_player;
var btn_playpause;
var btn_fullscreen;
var video_progress;
var video_containter;
var video_player_currentpos;
var video_player_duration;

document.addEventListener("DOMContentLoaded", function() { intiVideoPlayer(); }, false);

function intiVideoPlayer() {
    video_player              = document.getElementById('video_player');
    video_containter          = document.getElementById('video_containter');
    btn_playpause             = document.getElementById('video_player_playpause');
    btn_fullscreen            = document.getElementById('video_player_fullscreen');
    video_player_progress_bar = document.getElementById('video_player_progress_bar');
    video_player_currentpos   = document.getElementById('video_player_currentpos');
    video_player_duration     = document.getElementById('video_player_duration');

    video_player.controls     = false;

    video_player.addEventListener('timeupdate', updateVideoProgress, false);

    video_player.addEventListener('loadedmetadata', function() {
        video_player_duration.innerHTML   = timeFromSeconds(video_player.duration);
        video_player_currentpos.innerHTML = timeFromSeconds(video_player.currentTime);
    }, false);
}

function togglePlayPause() {
    if (video_player.paused || video_player.ended) {
        btn_playpause.title = 'pause';
        btn_playpause.className = 'fas fa-pause';
        video_player.play();
    }
    else {
        btn_playpause.title = 'play';
        btn_playpause.className = 'fas fa-play';
        video_player.pause();
    }
}

function updateVideoProgress() {
    var percentage = (100 / video_player.duration) * video_player.currentTime;
    video_player_progress_bar.style.width=percentage+'%';
    
    video_player_duration.innerHTML   = timeFromSeconds(video_player.duration);
    video_player_currentpos.innerHTML = timeFromSeconds(video_player.currentTime);
}

function toggleFullScreen() {
    if (document.fullscreen) {
        btn_fullscreen.title = 'Fullscreen';
        btn_fullscreen.className = 'fas fa-expand';
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
        else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
    }
    else {
        btn_fullscreen.title = 'Exit Fullscreen';
        btn_fullscreen.className = 'fas fa-compress';
        if (video_containter.requestFullscreen) video_containter.requestFullscreen()
        else if (video_containter.mozRequestFullScreen) video_containter.mozRequestFullScreen();
        else if (video_containter.webkitRequestFullScreen) video_containter.webkitRequestFullScreen();
        else if (video_containter.msRequestFullscreen) video_containter.msRequestFullscreen();
    }
}

function timeFromSeconds(seconds) {
    var h = Math.floor(seconds / 3600);
    h = h > 0 ? ( h < 10 ? '0' + h : h) + ':' : '';
    var m = Math.floor(seconds % 3600 / 60);
    m = m > 0 ? ( m < 10 ? '0' + m : m) + ':' : '00:';
    var s = Math.floor(seconds % 3600 % 60);
    s = s > 0 ? ( s < 10 ? '0' + s : s) : '00';

    return h + m + s;
}