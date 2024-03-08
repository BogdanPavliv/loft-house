"use strict"

/* ========================== Libs start ========================== */

;(function () {
  var canUseWebP = function () {
    var elem = document.createElement("canvas");

    if (!!(elem.getContext && elem.getContext("2d"))) {
      // was able or not to get WebP representation
      return elem.toDataURL("image/webp").indexOf("data:image/webp") == 0;
    }

    // very old browser like IE 8, canvas not supported
    return false;
  };

  var isWebpSupported = canUseWebP();

  if (isWebpSupported === false) {
    var lazyItems = document.querySelectorAll("[data-src-replace-webp]");

    for (var i = 0; i < lazyItems.length; i += 1) {
      var item = lazyItems[i];

      var dataSrcReplaceWebp = item.getAttribute("data-src-replace-webp");
      if (dataSrcReplaceWebp !== null) {
        item.setAttribute("data-src", dataSrcReplaceWebp);
      }
    }
  }

  var lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy",
  });
})();
/* ========================== Libs end ========================== */

/* ========================== myLib start ==========================  */

;(function () {
	window.myLib = {};
  
	window.myLib.body = document.querySelector("body");
  
	window.myLib.closestAttr = function (item, attr) {
	  var node = item;
  
	  while (node) {
		var attrValue = node.getAttribute(attr);
		if (attrValue) {
		  return attrValue;
		}
  
		node = node.parentElement;
	  }
  
	  return null;
	};
  
	window.myLib.closestItemByClass = function (item, className) {
	  var node = item;
  
	  while (node) {
		if (node.classList.contains(className)) {
		  return node;
		}
  
		node = node.parentElement;
	  }
  
	  return null;
	};
  
	window.myLib.toggleScroll = function () {
	  myLib.body.classList.toggle("no-scroll");
	};
  })();

/* ========================== myLib end ========================== */

/* ========================== Nav icon start ========================== */

const navBtn = document.querySelector('.nav-icon-btn');
const navIcon = document.querySelector('.nav-icon');
const nav = document.querySelector('.header__top-row');

navBtn.onclick = function () {
    navIcon.classList.toggle('nav-icon--active');
    nav.classList.toggle('header__top-row--mobile');
    document.body.classList.toggle('no-scroll');
}

/* ========================== Nav icon end ========================== */

/* ========================== Phone Mask start ========================== */

mask('[data-tel-input]');

// Remove '+' if nothing else is entered to show placeholder
const phoneInputs = document.querySelectorAll('[data-tel-input]');
phoneInputs.forEach((input)=>{
	input.addEventListener('input', ()=>{
		if (input.value == '+') input.value = '';
	})
	input.addEventListener('blur', ()=>{
		if (input.value == '+') input.value = '';
	})
});

/* ========================== Phone Mask end ========================== */

/* ========================== Google Map start ========================== */

var sectionMap = document.querySelector(".section-map");

var initMap = function () {
  // The location of Uluru
  const uluru = { lat: 50.4372643, lng: 30.5926263 };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 17,
    center: uluru,
  });

  var markers = [
    {
      coordinates: { lat: 50.4372643, lng: 30.5926263 },
      image: {
        url: "./images/common/marker.svg",
        scaledSize: new google.maps.Size(40, 63.2), // Marker dimensions without cropping the image
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0), // Marker center
      },
      info: "<h6 style='color: #000'>м. Київ, Русанівська набережна 10-15</h6>",
    },
  ];

  for (var i = 0; i < markers.length; i++) {
    addMarker(markers[i]);
  }

  //AddMarker
  function addMarker(properties) {
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
      position: properties.coordinates,
      map: map,
      icon: properties.image, // Setting the icon for the marker
    });

    if (properties.info) {
      // InfoWindow
      var InfoWindow = new google.maps.InfoWindow({
        content: properties.info,
      });

      marker.addListener("click", function () {
        InfoWindow.open(map, marker);
      });
    }
  }
};

window.initMap = initMap;

var initMapLoad = function () {
  var script = document.createElement("script");
  script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBTaWccSuYeuRcezNZ4VQDOiXcQ-QUylYI&callback=initMap";
  myLib.body.appendChild(script);
  script.addEventListener('load', initMap);
};

var chechInitMap = function () {
  var sectionMapTop = sectionMap.getBoundingClientRect().top;
  var scrollTop = window.pageYOffset;
  var sectionMapOffsetTop = scrollTop + sectionMapTop;

  if (scrollTop + window.innerHeight > sectionMapOffsetTop) {
    initMapLoad();
    window.removeEventListener("scroll", chechInitMap);
  }
};

window.addEventListener("scroll", chechInitMap);
chechInitMap();

/* ========================== Google Map end ========================== */