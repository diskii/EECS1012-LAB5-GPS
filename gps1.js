/* jslint browser:true */

var id = null;
var firstTime = -1;

var loc1 = {lat: 43.7731276 ,lon: -79.5076287 ,  desc: "William Small Centre" } ;
var loc2 = {lat: 43.772975 ,lon: -79.5087227 ,   desc: "Bethune College" } ;
var loc3 = {lat: 43.772552 ,lon: -79.5064459 ,  desc: "Bergeron Building" } ;
var loc4 = {lat: 43.7736179 ,lon: -79.5049562 ,  desc: "Lassonde Building" } ;
var loc5 = {lat: 43.7740492 ,lon: -79.5038245 ,  desc: "Student Centre"};

var currentCache = 0
var caches = [];
caches[0] = loc1;
caches[1] = loc2;
caches[2] = loc3;
caches[3] = loc4;
caches[4] = loc5;

var userLat;
var userLon;

window.onload = runner;

// calibrate corrdinates on image
var u1 = {lat: 250.0, lon:308.0};
var u2 = {lat: 260.0, lon:242.0};

// real gps corrdinates
var gps1 = {lat : 43.7742659, lon:-79.5085167};
var gps2 = {lat : 43.77389, lon:-79.5107316};
/*
cache.push(loc1);
cache.push(loc2);
cache.push(loc3);
cache.push(loc4);
cache.push(loc5);
*/
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

    userLat = position.coords.latitude;
    userLon = position.coords.longitude;
   
    var u = interpolate(-79.5087227,-79.5038245,43,796,latitude.innerHTML);
    var v = interpolate(43.772975,43.7740492,473,10,longitude.innerHTML);
    var me = document.getElementById("me").style;
    me.left = u + "px";
    me.top = v + "px";

    debug.innerHTML = u + " " + v; 
 
    if (firstTime < 0) {
      firstTime = position.timestamp;
    }
    now.innerHTML = position.timestamp - firstTime;

}
function interpolate(gps1,gps2,u1,u2,gps){

  return u1 + (u2 - u1) * (gps - gps1) / (gps2 - gps1);
}
function runner(){
    //
    var size = 8;
    size += "px";

    // set target position
    var target = document.getElementById("target");
    target.style.height = size;
    target.style.width = size;
    target.style.top = String(parseInt(u1.lat)) + "px";
    target.style.left = String(parseInt(u1.lon)) + "px";

    if(window.DeviceOrientationEvent) {
        document.getElementById("debug").innerHTML = "Supports orientation events";
        window.addEventListener("deviceorientation", orientationCallback, true);
    } else {
        document.getElementById("debug").innerHMTL = "No orientation event support";
    }

}

function orientationCallback(eventData){

    document.getElementById("debug2").innerHTML = userLat;
    document.getElementById("debug3").innerHTML = userLon;

    gps.lat = userLat;
    gps.lon = userLon;

    // set user indicator properties
    var size = 8;
    size += "px";
    var me = document.getElementById("me");
    me.style.height = size;
    me.style.width = size;
    var userLocation = interpolate(gps1, gps2, u1, u2, gps);
    me.style.top = String(parseInt(userLocation.lat)) + "px";
    me.style.left = String(parseInt(userLocation.lon)) + "px";

}

function updateCache(){
  currentCache++;

  //if(currentCache > caches.length){
   // currentCache = 0;
 // }
 currentCache = currentCache % 3;
 showCache();

}

function showCache(){

    var u_target = interpolate(-79.5087227,-79.5038245,43,796,caches.innerHTML);
    var v_target = interpolate(43.772975,43.7740492,473,10,caches.innerHTML);

    var target = document.getElementById("target").style;
    target.left = u_target + "px";
    target.top = v_target + "px";
    


/*
  var cache = caches[currentCache];
  var size = 8;
  size += "px";
  var me = document.getElementById("target");
  me.style.height = size;
  me.style.width = size;
  var userLocation = interpolate(gps1, gps2, u1, u2 , cache);
  me.style.top = String(parseInt(userLocation.lat)) + "px";
  me.style.left = String(parseInt(userLocation.lon)) + "px";
}
*/
}

