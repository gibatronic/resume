!function() {
  'use strict';

  var avatar;
  var bridge;
  var display;
  var video;

  var $ = function(query) {
    return document.querySelector(query);
  };

  var main = function() {
    avatar = $('.avatar');
    bridge = $('.avatar__bridge').getContext('2d');
    display = $('.avatar__display').getContext('2d');
    video = $('.avatar__video');

    bridge.imageSmoothingEnabled = false;
    display.imageSmoothingEnabled = false;

    video.addEventListener('play', processAvatarVideo);
  };

  var processAvatarVideo = function() {
    requestAnimationFrame(processAvatarVideo);
    bridge.drawImage(video, 0, 0, 240, 240);

    var frameNew = bridge.createImageData(960, 960);
    var frameOld = bridge.getImageData(0, 0, 240, 240);

    for (var index = 0, length = frameOld.data.length; index < length; index++) {
      var p = index * 4;
      var y = index / frameOld.height >> 0;

      var r = frameOld.data[p];
      var g = frameOld.data[p + 1];
      var b = frameOld.data[p + 2];
      var a = frameOld.data[p + 3];

      p *= 4;
      p += y * frameNew.width * 12;

      frameNew.data[p] = r;
      frameNew.data[p + 1] = g;
      frameNew.data[p + 2] = b;
      frameNew.data[p + 3] = a;
    }

    console.log(frameNew);
    display.putImageData(frameNew, 0, 0, 0, 0, 960, avatar.offsetHeight);
  };

  document.addEventListener('DOMContentLoaded', main);
}();
