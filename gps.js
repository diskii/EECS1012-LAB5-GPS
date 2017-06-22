/* jslint browser:true */

var id = null;
var firstTime = -1;
var curCache = -1;

var loc1 = {longitude: -79.5076287 ,latitude: 43.7731276,  description: "William Small Centre" } ;
var loc2 = {longitude: -79.5087227 ,latitude: 43.7729757,   description: "Bethune College" } ;
var loc3 = {longitude: -79.5064459 ,latitude: 43.7725525, description: "Bergeron Building" } ;
var loc4 = {longitude: -79.5049562 ,latitude: 43.7736179,  description: "Lassonde Building" } ;
var loc5 = {longitude: -79.5038245 ,latitude: 43.7740495,  description: "Student Centre"};

//var currentCache = 0
var caches = [];
caches[0] = loc1;
caches[1] = loc2;
caches[2] = loc3;
caches[3] = loc4;
caches[4] = loc5;

function togglegps() {
    var button = document.getElementById("togglegps");
    if (navigator.geolocation) {
        if (id === null) {
            id = navigator.geolocation.watchPosition(showPosition, handleError, {enableHighAccuracy : true, timeout: 1000});
            button.innerHTML = "STOP GPS";
            firstTime = -1;
        } else {
            navigator.geolocation.clearWatch(id);
            id = null;
            button.innerHTML = "START GPS";
        }
    } else {
        alert("NO GPS AVAILABLE");
    }
}

function handleError(error) {
    var errorstr = "Really unknown error";
    switch (error.code) {
    case error.PERMISSION_DENIED:
        errorstr = "Permission deined";
        break;
    case error.POSITION_UNAVAILABLE:
        errorstr = "Permission unavailable";
        break;
    case error.TIMEOUT:
        errorstr = "Timeout";
        break;
    case error.UNKNOWN_ERROR:
        error = "Unknown error";
        break;
    }
    alert("GPS error " + error);
}


function showPosition(position) {
    var latitude = document.getElementById("latitude");
    var longitude = document.getElementById("longitude");
    var now = document.getElementById("now");
    var debug = document.getElementById("debug");
    
    latitude.innerHTML = position.coords.latitude;
    longitude.innerHTML = position.coords.longitude;
    
    var u = interpolate(-79.509928,-79.505240, 5, 650,longitude.innerHTML); 
    var v = interpolate(43.772262, 43.774325, 750, 8, latitude.innerHTML);
    
   
    
    var me = document.getElementById("me").style;
    me.left = u +"px";
    me.top = v + "px";
    
    
    
    
    debug.innerHTML = u + " " + v;
    
    if (firstTime < 0) {
      firstTime = position.timestamp;
    }
    now.innerHTML = position.timestamp - firstTime;

}

function interpolate(gps1, gps2, u1, u2, gps){
  return u1 + (u2 - u1) * (gps - gps1) / (gps2 - gps1);
}

function drawCache(cache){
  // var u_target = interpolate(-79.509928,-79.505240, 43, 796,cache.longitude); 
    //var v_target = interpolate(43.772262, 43.774325, 473, 10,cache.latitude); 
    var u_target = interpolate(-79.509928,-79.505240, 5, 650,cache.longitude); 
  var v_target = interpolate(43.772262, 43.774325, 750, 8,cache.latitude); 
   var target = document.getElementById("target").style;
    target.left = u_target + "px";
    target.top = v_target + "px";
    
    var location = document.getElementById("location");
    location.innerHTML = "Current Target: " + cache.description;
}

function updateCache(){
  curCache++;
  if (curCache == caches.length) curCache = 0;
  drawCache(caches[curCache]);
}
