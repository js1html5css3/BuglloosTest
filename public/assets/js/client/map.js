const zoom = {{config('leaflet.zoom_level')}};
// calling map
var map = L.map('mapid').setView([{{ config('leaflet.map_center_latitude') }}, {{ config('leaflet.map_center_longitude') }}], {{ config('leaflet.zoom_level') }});

// Used to load and display tile layers on the map
// Most tile servers require attribution, which you can set under `Layer`
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

///many points
var points = [
];
var polyhontemp=[];
var layer;

const sidebar = $("#sidebar");    

// const fg = L.featureGroup().addTo(map);
var fg = new L.FeatureGroup();
map.addLayer(fg);

// add Leaflet-Geoman controls with some options to the map  

map.pm.addControls({  
    position: 'topleft',
    drawMarker: false,
    drawPolyline:false,
    drawRectangle: false,
    drawCircle: false,
    drawCircleMarker:false,
    drawText: false,
    cutPolygon: false
});  
map.pm.setLang('fa');

var myIcon = L.icon({
    shadowUrl: "{{url('/leaflet/images/marker-shadow.png')}}",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var icon = new L.Icon.Default(); 
var blueIconsUrl="{{url('/leaflet/images/blue.png')}}";
var redIconsUrl="{{url('/leaflet/images/red.png')}}";

var count=1;
var markers = L.markerClusterGroup();
viewPortCordinate();

const bounds = map.getBounds();

map.on("dragend", viewPortCordinate);

map.on("zoomend", viewPortCordinate);

map.on('pm:create', function(e) {
    layer = e.layer;
    updateFilterMarkers(layer);
    layer.on('pm:update', function(e) {
        updateFilterMarkers(e.layer);
    });
});

map.on('pm:remove', (e) => {
    polyhontemp=[];
    viewPortCordinate();
});


function updateFilterMarkers(layer) {
    
    var feature = layer.toGeoJSON();
    var cord=feature.geometry.coordinates[0];

    var temp =[];
    for(var i=0; i < cord.length - 1 ;i++){
        temp.push(cord[i].reverse());
    }
    polyhontemp=[];
    polyhontemp=temp;
    var polygon = L.polygon(temp);


    // markers.clearLayers();
    deletemarkers();
    sidebar.empty();
    points.forEach((mar) => {
        
        var m1 = L.marker([mar.lat, mar.lng], {icon: myIcon});
        if(polygon.contains(m1.getLatLng())){
            addmarker(mar);
        }
    })
    map.addLayer(markers); 
}

function viewPortCordinate(){
    deletemarkers();
    // markers.clearLayers();
    const bounds = map.getBounds();
    $.ajax({
            url: "{{route('client.getAreaMarkers')}}",
            type: "POST",
            data: {
                _token: "{{csrf_token()}}",
                northEastLat: bounds._northEast.lat,
                northEastLng: bounds._northEast.lng,
                southWestLat: bounds._southWest.lat,
                southWestLng: bounds._southWest.lng
            }
        }).done(function (response) {
            ///sidebar
            if(response.length > 200){
                window.swal({
                    title: "نتایج زیاد",
                    icon: 'error',
                    text: "لطفا فیلتر های بیشتری یا محدوده نقشه خود را کوچکتر انتخاب کنید.",
                    showConfirmButton: false,
                    allowOutsideClick: true
                });
                return false;
            }
            var contu=response.length;
            sidebar.empty();
            points=[];
            response.forEach((point) => {
                points.push(point);
            })
            response.forEach((point) => {
                if(polyhontemp.length > 0 )
                {
                    var polygon = L.polygon(polyhontemp);
                    var m1 = L.marker([point.lat, point.lng], {icon: myIcon});
                    if(polygon.contains(m1.getLatLng())){
                        addmarker(point);
                    }
                }
                else{
                    addmarker(point);
                } 
            });

            // map.fitBounds(fg.getBounds());
            map.addLayer(markers);
            
        });
}

function addmarker(point){
    if(point.color == 'blue' )
        myIcon.options.iconUrl = blueIconsUrl; 
    else
        myIcon.options.iconUrl = redIconsUrl; 
        count++;

    const marker = L.marker([point.lat,point.lng], {icon: myIcon}).addTo(fg);
    var testimage=`http://localhost:8000/images/${point.image}.png`;
    // marker.bindPopup("Popup content");
    marker.on('mouseover', function (e ) {
        const getLatLong = marker.getLatLng();
        marker.bindPopup("<a  style='display:block;width:300px;' target='_blank' href='https://time.ir'><center >My Photo </center>" + "</br>"+"<img class='image-size2' src='"+testimage+"' alt='Italian Trulli'></a>").openPopup();
        
        $("#sidebar").children().removeClass("bgred");
        $("#sidebar").find(`[data-marker='${marker._leaflet_id}']`).addClass('bgred');
        $("#sidebar").find(`[data-marker='${marker._leaflet_id}']`).prependTo("#sidebar");
        $("#sidebar").animate({ scrollTop: 0 }, "slow");
    });
    
    createSidebarElements(marker,[point.lat,point.lng,point.banner],testimage);
    markers.addLayer(marker);
}

function createSidebarElements(layer,point,testimage) {
    var box=$("<div>");
    box.addClass('sidebar-el').attr('data-marker',layer._leaflet_id);
    var image=$("<div>");

    image.append("<img class='image-size' src='"+testimage+"' alt='Italian Trulli'>");
    var content=$("<div>").text(point[2]);
    box.append(image);
    box.append(content);

    sidebar.append(box);
    box.on('mouseover',function(){
        var pontid=$(this).closest('.sidebar-el').attr("data-marker");
        const marker = fg.getLayer(pontid);
        const getLatLong = marker.getLatLng();
        
        marker.bindPopup("<a  style='display:block;width:300px;' target='_blank' href='https://time.ir'><center >My Photo </center>" + "</br>"+"<img class='image-size2' src='"+testimage+"' alt='Italian Trulli'>"+getLatLong.toString()+"</a>").openPopup();
        
        //set center marker to map
        // map.panTo(getLatLong);
    });
}

function getimage(){
    var rand=Math.floor(Math.random() * 6 + 1)
    var testimage=`http://localhost:8000/images/${rand}.png`;
    return testimage;
}


function getRandomLatLng() {
    return [29.5 + 0.2 * Math.random(), 52.5 + 0.2 * Math.random()];
}

function deletemarkers(){
    // map._panes.markerPane.remove();
    markers.clearLayers();
    // clearMarkerClusters(map);
    $(".leaflet-marker-icon").remove();
    $(".leaflet-popup").remove();
    $(".leaflet-marker-shadow").remove();
    
    // points.forEach((point) => {
    //     var m1 = L.marker([point.lat, point.lng], {icon: myIcon});
    //     map.removeLayer(m1);   
    // })

}
