//document.getElementById("demo");
//var x = document.getElementsByClassName("example");

var i = 0;
var wait_time = [1,5,8,7]; //*1
var last_time = 10; // сек
var msgs = document.getElementsByClassName("msg-wrap");
var udata = document.getElementById("user-data");

var audio = new Audio('src/msg.mp3');
var audio_err = new Audio('src/error.mp3');
var send_msg_btn = document.getElementById("send_msg");
var send_msg_form = document.getElementById("msg_form");
var msg_warning = document.getElementsByClassName("msg-warning")[0];
var chat_box = document.getElementsByClassName("chat-box")[0];
var textarea = document.getElementById("send_msg_text");
var video = document.getElementById("user-video");

textarea.onfocus = function() {
  this.focused = true;
}

textarea.onblur = function() {
  this.focused = false;
}

function send_msg(i) {
	console.log(i+"  "+wait_time[i]);
	setTimeout( function () {
		udata.classList.add("user-print");
	}, (wait_time[i]-3)*1000);

	setTimeout( function () {
		udata.classList.remove("user-print");
		
		msgs[i].classList.add("in");
		msgs[i].scrollIntoView(false);
		audio.play();
		i++;
		if ( wait_time[i] !== void 0 ) {
			send_msg(i);
		} else {
			setTimeout( function () {
				init_attention();
			}, last_time*1000);
			console.log("no item");

		}
	}, wait_time[i]*1000);	
}

function show_msg() {
	for (var i = 0; i < wait_time.length; i++) {
		msgs[i].classList.add("in");
		msgs[i].scrollIntoView(false);
	}
}
function attention() {
	console.log("attention");
	msg_warning.classList.add("shake");
	msg_warning.scrollIntoView(false);
	audio_err.play();
	setTimeout( function () {
		msg_warning.classList.remove("shake");
	},1000);
}
function init_attention() {
	video.addEventListener("click", attention, false);
	document.getElementById("form-block").addEventListener("click", attention, false);
	send_msg_form.classList.add("send");
	send_msg_btn.setAttribute("disabled","disabled");
	textarea.setAttribute("disabled","disabled");
	msg_warning.classList.add("in");
	msg_warning.scrollIntoView(false);
	audio_err.play();
	
}
send_msg_form.addEventListener("submit", function(event) {
	event.preventDefault();
	init_attention();
}, false);

document.onkeyup = function (e) {
	e.preventDefault();
	e = e || window.event;
	if (e.keyCode === 13 && textarea.focused ) {
		init_attention();
	}
	return false;
}
video.addEventListener("click", init_attention, false);

function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}
function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function load_all() {
	//show_msg();
	chat_box.classList.add("load_all");
	init_attention();
}

function init() {
	if ( getCookie("sm") != "1") {
		send_msg(i);
		setCookie("sm", "1", {expires: 3*3600});
	} else {
		load_all();
	}
	
}
init();