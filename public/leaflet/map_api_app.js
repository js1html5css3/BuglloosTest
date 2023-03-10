$(document).ready(function () {

    // calling map
    var map = L.map('mapid').setView([29.5926, 52.5836], 12);

    // Used to load and display tile layers on the map
    // Most tile servers require attribution, which you can set under `Layer`
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    ///many points
    var polyhontemp = {};
    var layer;
    const sidebar = $("#sidebar");

    // const fg = L.featureGroup().addTo(map);
    var fg = new L.FeatureGroup();
    map.addLayer(fg);

    // add Leaflet-Geoman controls with some options to the map

    map.pm.addControls({
        position: 'topleft',
        drawMarker: false,
        drawPolyline: false,
        drawRectangle: false,
        drawCircle: false,
        drawCircleMarker: false,
        drawText: false,
        cutPolygon: false
    });
    map.pm.setLang('fa');

    var myIcon = L.icon({
        shadowUrl: marker_shadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    var icon = new L.Icon.Default();
    // var blueIconsUrl = "{{url('/leaflet/images/blue.png')}}";
    // var redIconsUrl = "{{url('/leaflet/images/red.png')}}";

    var count = 1;
    var markers = L.markerClusterGroup();
    viewPortCordinate(true);

    const bounds = map.getBounds();

    map.on("dragend", viewPortCordinate);

    map.on("zoomend", viewPortCordinate);

    map.on('pm:create', function (e) {
        first_time=true;
        layer = e.layer;
        const FeatureId = layer._leaflet_id;
        updateFilterMarkers(layer);
        layer.on('pm:update', function (e) {
            first_time=true;
            const FeatureId = e.layer._leaflet_id;
            updateFilterMarkers(e.layer);
        });
    });

    map.on('pm:remove', (e) => {
        delete polyhontemp[e.layer._leaflet_id];
        viewPortCordinate();
    });


    function updateFilterMarkers(layer) {
        const FeatureId = layer._leaflet_id;
        var feature = layer.toGeoJSON();
        var cord = feature.geometry.coordinates[0];

        var temp = [];
        for (var i = 0; i < cord.length - 1; i++) {
            temp.push(cord[i].reverse());
        }


        polyhontemp[FeatureId] = temp;

        var polygon = L.polygon(temp);


        // markers.clearLayers();
        deletemarkers();
        sidebar.empty();
        var products_count = 0;
        points.forEach((mar) => {
            let flag = false;
            var m1 = L.marker([mar.products[0].lat, mar.products[0].lng], { icon: myIcon });
            for (const key in polyhontemp) {
                var polygon = L.polygon(polyhontemp[key]);
                if (polygon.contains(m1.getLatLng())) {
                    flag = true;

                }
            }
            if (flag) {
                window.addmarker(mar);
                products_count++;
            }
        })

        if (products_count == 0) {
            $("#products_count").removeClass("alert-primary").addClass("alert-warning");
            $("#products_count").text(" ???????? ???? ?????? ?????????? ???????? ??????.");
        }
        else {
            $("#products_count").removeClass("alert-warning").addClass("alert-primary");
            $("#products_count").text(products_count + " ?????? ???????? ????");
        }
        map.addLayer(markers);
    }

    function viewPortCordinate(firstTime = false) {
        deletemarkers();
        // markers.clearLayers();
        const bounds = map.getBounds();
        $.ajax({
            url: mapurl,
            type: "POST",
            data: {
                _token: mapurltoken,
                northEastLat: bounds._northEast.lat,
                northEastLng: bounds._northEast.lng,
                southWestLat: bounds._southWest.lat,
                southWestLng: bounds._southWest.lng
            }
        }).done(function (response) {
            ///sidebar
            // if (response.length > 200) {
            //     window.swal({
            //         title: "?????????? ????????",
            //         icon: 'error',
            //         text: "???????? ?????????? ?????? ???????????? ???? ???????????? ???????? ?????? ???? ???????????? ???????????? ????????.",
            //         showConfirmButton: false,
            //         allowOutsideClick: true
            //     });
            //     return false;
            // }
            window.update_map(response);
            

        });
    }

    window.addmarker=function addmarker(point) {
        if (point.contract_type == '??????????')
            myIcon.options.iconUrl = blueIconsUrl;
        else
            myIcon.options.iconUrl = redIconsUrl;
        count++;

        const marker = L.marker([point.products[0].lat, point.products[0].lng], { icon: myIcon }).addTo(fg);
        var testimage = getimage();

        var box_maker = createSidebarElements(marker, point, testimage);

        marker.on('mouseover', function (e) {
            $("#mapInput").val(point.id);
        });


        markers.addLayer(marker);
    }

    window.update_map= function update_map(response){
        deletemarkers();
        sidebar.empty();

        points = [];
        response.forEach((point) => {
            points.push(point);
        })
        var products_count = 0;
        response.forEach((point) => {
            if (!$.isEmptyObject(polyhontemp)) {
                let flag = false;
                var m1 = L.marker([point.products[0].lat, point.products[0].lng], { icon: myIcon });
                for (const key in polyhontemp) {
                    var polygon = L.polygon(polyhontemp[key]);
                    if (polygon.contains(m1.getLatLng())) {
                        flag = true;
                    }
                }
                if (flag) {
                    window.addmarker(point);
                    products_count++;
                }
            } else {
                window.addmarker(point);
                products_count++;
            }
        });
        if (products_count == 0) {
            $("#products_count").removeClass("alert-primary").addClass("alert-warning");
            $("#products_count").text(" ???????? ???? ?????? ?????????? ???????? ??????.");
        }
        else {
            $("#products_count").removeClass("alert-warning").addClass("alert-primary");
            $("#products_count").text(products_count + " ?????? ???????? ????");
        }
        // map.fitBounds(fg.getBounds());
        map.addLayer(markers);
    }

    function createSidebarElements(layer, point, testimage) {
        var box = $("<div class'm-1'>");
        box.addClass('sidebar-el').attr('data-marker', layer._leaflet_id);



        //make header
        var header_text = ``;
        header_text += " ?????????????? " + point.contract_type + " : ";
        if (point.contract_type == '??????????') {
            _.each(point.product_contract_details, function (e, i, l) {
                if (e.attribute_id.toString() == '37') {
                    header_text += "???????? ??????????  " + e.value + " ";
                }
                if (e.attribute_id.toString() == '38') {
                    header_text += "???????? ??????????  " + e.value + " ";
                }
            })

        } else if (point.contract_type == '????????') {
            _.each(point.product_contract_details, function (e, i, l) {
                if (e.attribute_id.toString() == '40') {
                    header_text += " ???????? ????????  " + e.value + " ";
                }
            })
        }
        var content = $("<div class=' alert-primary header-sidebar-element'>");
        content.append($("<strong>").text(header_text));

        //make image
        var image = $("<div>");
        if (point.products[0].banner != null) {
            var url_second_part = storage + "/" + point.products[0].banner.split("/storage/")[1];
        } else {
            var url_second_part = base_url + "/assets/images/th.jpeg"
        }
        image.append("<img class='image-size' src='" + url_second_part + "' alt=''>");


        //make body properties
        let properties_card = $("<div>").css({ "margin-right": "9px" });
        _.each(point.products[0].product_details, function (e, i, l) {
            if (e.attribute_id.toString() == "19") {
                properties_card.append($("<div>").text("   ?????? ???????? ?????? :   " + e.value));
            }
            else if (e.attribute_id.toString() == "104") {
                properties_card.append($("<div>").text("?????????? ???????? :??? " + e.value));
            }
            else if (e.attribute_id.toString() == "25") {
                properties_card.append($("<div>").text(" ?????????? ???? ?????? :??? " + e.value));
            }
            else if (e.attribute_id.toString() == "80") {
                properties_card.append($("<div>").text("?????????????? : " + e.value));
            }
            else if (e.attribute_id.toString() == "89") {
                properties_card.append($("<div>").text("?????????????? :" + e.value));
            }
            else if (e.attribute_id.toString() == "87") {
                properties_card.append($("<div>").text("???????????? :" + e.value));
            }
        })

        var body_content = $("<div>").text(properties_card);

        var footer = $("<div class=' alert-warning header-sidebar-element'>");
        footer.append($("<strong>").text("?????? ?????????????? : " + point.provider[0].display_name));

        var body_container = $("<div>").addClass('d-flex justify-content');
        body_container.append(properties_card).append(image);
        box.append(content);
        box.append(body_container);
        box.append(footer);

        sidebar.append(box);
        box.on('mouseover', function () {
            var pontid = $(this).closest('.sidebar-el').attr("data-marker");
            const marker = fg.getLayer(pontid);
            const getLatLong = marker.getLatLng();

            // marker.bindPopup("<a  style='display:block;width:300px;' target='_blank' href='https://time.ir'><center >My Photo </center>" + "</br>" + "<img class='image-size2' src='" + testimage + "' alt='Italian Trulli'>" + getLatLong.toString() + "</a>").openPopup();
            marker.bindPopup("<a target='_blank' href='" + base_url + "/product/view/" + point.mls_code + "'>" + box.html() + "</a>").openPopup();

            //set center marker to map
            // map.panTo(getLatLong);
        });
        return box;
    }

    function getimage() {
        var rand = Math.floor(Math.random() * 6 + 1)
        var testimage = `http://localhost:8000/images/${rand}.png`;
        return testimage;
    }


    function getRandomLatLng() {
        return [29.5 + 0.2 * Math.random(), 52.5 + 0.2 * Math.random()];
    }

    function deletemarkers() {
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





    $(document).on('mouseenter', '.sidebar-el', function () {
        $("#sidebar .sidebar-el").removeClass('bgred');
        $(this).addClass('bgred');
    });
});
