var mymap = L.map('mapid');
var city
var country
var country_code
var county
var neighbourhood_map
var district_map
var road
var state
var suburb
var latlng


var icon = new L.Icon.Default();
icon.options.shadowSize = [0, 0];
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
}).addTo(mymap, 'addMarker()');
mymap.setView(new L.LatLng(29.5926, 52.5836), 13);
var marker = null;

mymap.on('click', function (e) {
    if (marker !== null) {
        mymap.removeLayer(marker);
    }
    latlng = {'lat': e.latlng.lat, 'lng': e.latlng.lng}

    marker = L.marker(e.latlng, e.position).addTo(mymap);
    jQuery.ajax({
        url: 'https://nominatim.openstreetmap.org/reverse?format=json&lat=' + e.latlng.lat + '&lon=' + e.latlng.lng + '&zoom=18&accept-language=fa',
        type: 'post',
        dataType: 'json',
        success: function (data) {
            var data2 = JSON.stringify(data);
            $('.map-json').val(data2);
            var data2 = JSON.parse(data2);
            console.log(data2)
            city = data2.address.city
            country = data2.address.country
            country_code = data2.address.country_code
            county = data2.address.county
            neighbourhood_map = data2.address.neighbourhood;
            district_map = data2.address.district
            road = data2.address.road
            state = data2.address.state
            suburb = data2.address.suburb
            $('#161_1_city').val(state.split(' ')[1]).change()
            $.get('/getCities?state_id=' + state.split(' ')[1], function (data) {
                $('#7_1_city').empty();
                $.each(data, function (index, value) {
                    $('#7_1_city').append('<option value="' + value.name + '">' + value.name + '</option>');
                    if (county.split(' ')[1] == value.name) {
                        $('#7_1_city').val(county.split(' ')[1]).change()
                    }
                })
            });
            if (neighbourhood_map != undefined) {
                document.getElementById('9_1').value = neighbourhood_map
            } else {
                document.getElementById('9_1').value = ''
            }
            if (suburb != undefined) {
                document.getElementById('8_1').value = suburb
            } else {
                document.getElementById('8_1').value = ''
            }
            if (road != undefined) {
                document.getElementById('11_1').value = road
            } else {
                document.getElementById('11_1').value = ''
            }

        }
    });


})

