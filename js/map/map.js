// Custom Map
var geom = {
    "type": "Polygon",
    "coordinates": [
        [
            [
                36.25488281249999,
                33.61461929233378
            ],
            [
                58.84277343749999,
                33.61461929233378
            ],
            [
                58.84277343749999,
                44.68427737181225
            ],
            [
                36.25488281249999,
                44.68427737181225
            ],
            [
                36.25488281249999,
                33.61461929233378
            ]
        ]
    ]
};
var southWest = L.latLng(33.5780, 36.2549),
    northEast = L.latLng(44.6218, 58.7988),
    bounds = L.latLngBounds(southWest, northEast);
const vacancy_mapEl = document.querySelector("#vacancy_map");
var vacancy_map = L.map(vacancy_mapEl, {scrollWheelZoom: false,}).setView([40.4598, 49.8936], 11),
    osmUrl = 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
    osmAttribution = 'Əmir İsmayılov &copy; 2023';
vacancy_map.attributionControl.setPrefix('IATC')
// var tileLayer = L.TileLayer.boundaryCanvas(osmUrl, {
var tileLayer = L.tileLayer(osmUrl, {
    minZoom: 5,
    maxZoom: 20,
    // boundary: geom,
    // maxBounds: [
    //     //south west
    //     [33.5780, 36.2549],
    //     //north east
    //     [44.6218, 58.7988]
    // ],
    attribution: osmAttribution,
    // trackAttribution: true,
    // infinite: false
}).addTo(vacancy_map);
vacancy_map.addControl(new L.Control.Fullscreen());
var progress = document.getElementById('progress');
var progressBar = document.getElementById('progress-bar');

function showMapPopUp(round) {
    markers[round - 1].openPopup();
    panToCenterMarker(markers[round - 1]);
}

function panToCenterMarker(marker) {
    var position = marker.getLatLng();
    vacancy_map.panTo([position.lat, position.lng]);
}

function updateProgressBar(processed, total, elapsed, layersArray) {
    if (elapsed > 1000) {
        // if it takes more than a second to load, display the progress bar:
        progress.style.display = 'block';
        progressBar.style.width = Math.round(processed / total * 100) + '%';
    }

    if (processed === total) {
        // all markers processed - hide the progress bar:
        progress.style.display = 'none';
    }
}

var markers = L.markerClusterGroup({chunkedLoading: true, chunkProgress: updateProgressBar});

var markerList = [];
var addressPoints = [{
    address: "Azərbaycan Dövlət Neft və Sənaye  Universiteti",
    phone_number: "+994 (12) 498 88 46",
    site: "http://asoiu.edu.az/",
    longitude: "49.8483",
    latitude: "40.3780",
    image: "/assets/images/map/image_adnsu.jpg",
    icon: "https://amir-ismayilov.github.io/IATC-Finish-Work/assets/images/map/favicon.ico"
}, {
    address: "Israel Azerbaijan Training Center",
    phone_number: "+994 (12) 493 83 83",
    site: "http://iatc.edu.az/",
    longitude: "49.8519",
    latitude: "40.3766",
    image: "/assets/images/map/image_iatc.jpg",
    icon: "https://amir-ismayilov.github.io/IATC-Finish-Work/assets/images/map/favicon.ico"
},
    {
        address: "İnnovasiya və Rəqəmsal İnkişaf Agentliyi",
        phone_number: "+994 (12) 598-58-58 ",
        site: "https://mincom.gov.az/az/",
        longitude: "49.8495995",
        latitude: "40.4023223",
        image: "/assets/images/map/egov.png",
        icon: "https://amir-ismayilov.github.io/IATC-Finish-Work/assets/images/map/favicon.ico"
    },
    {
        address: "Elm və Təhsil Nazirliyi",
        phone_number: "+994 (12) 599-11-55",
        site: "https://edu.gov.az/az/",
        longitude: "49.8589451",
        latitude: "40.3916139",
        image: "/assets/images/map/education.jpg",
        icon: "https://amir-ismayilov.github.io/IATC-Finish-Work/assets/images/map/favicon.ico"
    }
];
for (var i = 0; i < addressPoints.length; i++) {
    var terminal = addressPoints[i];
    console.log(terminal.longitude);
    var title = terminal.terminal_id;
    var LeafIcon = L.Icon.extend({
        options: {
            iconSize: [65, 70],
            iconAnchor: [37, 26],
            popupAnchor: [-1, -25]
        }
    });
    var greenIcon = new LeafIcon({
        iconUrl: terminal.icon,
    })
    var marker = L.marker(L.latLng(terminal.latitude, terminal.longitude), {icon: greenIcon});

    popupContent = `<div class="popup-map">
                            <div class="item">
                                <img src="${terminal.image}" alt="">
                            </div>
                            
                            <div class="item">
                            <div class="title"><i class="fa fa-tty" aria-hidden="true"></i>CONTACT</div>
                                <p><a href="tel:${terminal.phone_number}">${terminal.phone_number}</a></p>
                                
                                                            </div><div class="item"> 
                            <div class="title"><i class="fa fa-laptop" aria-hidden="true"></i>OFFICIAL WEBSITE</div>
                                <p><a href="${terminal.site}" target="_blank">Go to the official page</a></p>
                            </div></div>\`;
                                
                                
                                 </div><div class="item"> 
                            <div class="title"><i class="fa fa-laptop" aria-hidden="true"></i>ÜNVAN</div>
                                <p><a href="https://maps.google.com/?q=${terminal.latitude},${terminal.longitude}" target="_blank">${terminal.address}</a></p>
                            </div></div>\`;
                                
                                

                           `;

    // popupContent += `<a class="popup_link" href="javascript:void(0);"  style="margin-bottom:0px;font-size: 14px"><i class="fa fa-location-arrow" aria-hidden="true"></i> Ünvan: ${terminal.address}</a>`;
    // popupContent += `<a class="popup_link" href="javascript:void(0);"  style="margin-bottom:0px;font-size: 14px"><i class="fa fa-phone" aria-hidden="true"></i> Əlaqə: ${terminal.phone_number}</a>`;
    // popupContent += `<h3 style="font-weight: bold">${terminal.address}<h3>`;
    let popup = L.popup({
        className: "f1_location_popup",
        minWidth: 310,
        maxWidth: 310,
    }).setContent(popupContent);
    marker.bindPopup(popup).on("click", (e) => {
        panToCenterMarker(e.target);
    });
    markerList.push(marker);
}
markers.addLayers(markerList);
vacancy_map.addLayer(markers);


$(document).ready(function () {
    var hash_page = $(location).attr('hash');
    if (hash_page.length > 0) {
        let scroll_pos_load = $(hash_page).offset().top;
        $('html, body').animate({
            scrollTop: scroll_pos_load - 148
        }, 1000);
    }

    // $('.link_header').click(function () {
    //
    // });
    var navItems = $('.main-menu.nav li');
    var navItemsLinks = $('.main-menu.nav li a');
    var win = $(window);
    var items = $('.item');
    navItemsLinks.click(function (e) {
        var item = $(this);
        $('.main-menu.nav li.active').removeClass('active');
        $(item).parent().addClass('active');
        let scroll_pos = $($(this).attr('href')).offset().top;
        let hash_page_a = $(location).attr('hash');
        if (hash_page_a !== $(this).attr('href')) {
            $('html, body').animate({
                scrollTop: scroll_pos - 148
            }, 1000);
            return false;
        } else {
            return false;
        }

    });
    win.scroll(function (e) {
        $.each(items, function (key, value) {
            var item = $(value);
            // console.log(win.scrollTop(), item.offset().top);
            if (win.scrollTop() >= item.offset().top - 160) {
                $('.main-menu.nav li.active').removeClass('active');
                var id = item.attr('id');

                $.each(navItemsLinks, function (key, value) {
                    var navItem = $(value);
                    if (navItem.attr('href') == '#' + id) navItem.parent().addClass('active');
                });
            }
        });
    });
})
