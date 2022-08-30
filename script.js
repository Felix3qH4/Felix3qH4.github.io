
MAP_CENTER_COORDINATES = [49.8142371307, 6.098083879];
MAP_ZOOM = 10;
BUS_LAYERS_DATA = {};
BUS_LAYERS = [ // Names of the geoJSON objects in the files
    RUFFBUS_MAMER,
    BUMMELBUS,
    BUS_AT_STROOSSEN,
    K_BUS,
    KOBRIBUS,
    PROXIBUS,
    RUFFBUS_BERTI,
    WALFY_FLEXIBUS,
    RUFFBUS_STEESEL,
    FRISIBUS
    ];

POLYGONS_GEOJSON = []
POLYGONS = []
BUS_CONNECTIONS = 0



MAP = L.map("map").setView(MAP_CENTER_COORDINATES, MAP_ZOOM);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                minZoom: 1,
                zoomControl: true,
                id: 'mapbox/streets-v11',
                tileSize: 512,
                zoomOffset: -1,
                accessToken: 'pk.eyJ1IjoiM3FoNCIsImEiOiJja3NqYW53NXQxc2l2Mm5vZmF0cGVydnYxIn0.TF0GeHY58O9gdLTT88Sb0g'
            }).addTo(MAP);



// Styles //
polygon_style = {
    fillColor: "#ffff00",
    color: "#000000",
    opacity: 0.4,
    fillOpacity: 0.8,
}


// Load the polygons representing the operating areas of the different busses
function load_geojson_polygons(data, index) {
    if (index == 0) {
        RUFFBUS_MAMER_GEOJSON = L.geoJSON(data, {
            style: function(feature) {
                POLYGONS.push(feature);
                return {color: BUS_INFO[feature.properties.Bus].Couleur, fillOpacity: .4}
                }
        }).addTo(MAP);
        POLYGONS_GEOJSON.push(RUFFBUS_MAMER_GEOJSON);
    }
    else if (index == 1) {
        BUMMELBUS_GEOJSON = L.geoJSON(data, {
            style: function(feature) {
                POLYGONS.push(feature);
                return {color: BUS_INFO[feature.properties.Bus].Couleur, fillOpacity: .4}
                }
            }).addTo(MAP);
        POLYGONS_GEOJSON.push(BUMMELBUS_GEOJSON);
    }
    else if (index == 2) {
        BUS_AT_STROOSSEN_GEOJSON = L.geoJSON(data, {
            style: function(feature) {
                POLYGONS.push(feature);
                return {color: BUS_INFO[feature.properties.Bus].Couleur}
                }
        }).addTo(MAP);
        POLYGONS_GEOJSON.push(BUS_AT_STROOSSEN_GEOJSON);
    }
    else if (index == 3) {
        K_BUS_GEOJSON = L.geoJSON(data, {
            style: function(feature) {
                POLYGONS.push(feature);
                return {color: BUS_INFO[feature.properties.Bus].Couleur}
                }
        }).addTo(MAP);
        POLYGONS_GEOJSON.push(K_BUS_GEOJSON);
    }
    else if (index == 4) {
        KOBRIBUS_GEOJSON = L.geoJSON(data, {
            style: function(feature) {
                POLYGONS.push(feature);
                return {color: BUS_INFO[feature.properties.Bus].Couleur}
                }
        }).addTo(MAP);
        POLYGONS_GEOJSON.push(KOBRIBUS_GEOJSON);
    }
    else if (index == 5) {
        PROXIBUS_GEOJSON = L.geoJSON(data, {
            style: function(feature) {
                POLYGONS.push(feature);
                return {color: BUS_INFO[feature.properties.Bus].Couleur}
                }
        }).addTo(MAP);
        POLYGONS_GEOJSON.push(PROXIBUS_GEOJSON);
    }
    else if (index == 6) {
        RUFFBUS_BERTI_GEOJSON = L.geoJSON(data, {
            style: function(feature) {
                POLYGONS.push(feature);
                return {color: BUS_INFO[feature.properties.Bus].Couleur}
                }
        }).addTo(MAP);
        POLYGONS_GEOJSON.push(RUFFBUS_BERTI_GEOJSON);
    }
    else if (index == 7) {
        WALFY_FLEXIBUS_GEOJSON = L.geoJSON(data, {
            style: function(feature) {
                POLYGONS.push(feature);
                return {color: BUS_INFO[feature.properties.Bus].Couleur}
                }
            }).addTo(MAP);
        POLYGONS_GEOJSON.push(WALFY_FLEXIBUS_GEOJSON);
    }
    else if (index == 8) {
        RUFFBUS_STEESEL_GEOJSON = L.geoJSON(data, {
            style: function(feature) {
                POLYGONS.push(feature);
                return {color: BUS_INFO[feature.properties.Bus].Couleur}
                }
            }).addTo(MAP);
        POLYGONS_GEOJSON.push(RUFFBUS_STEESEL_GEOJSON);
    }
    else if (index == 9) {
        FRISIBUS_GEOJSON = L.geoJSON(data, {
            style: function(feature) {
                POLYGONS.push(feature);
                return {color: BUS_INFO[feature.properties.Bus].Couleur}
                }
            }).addTo(MAP);
        POLYGONS_GEOJSON.push(FRISIBUS_GEOJSON);
    };

    POLYGONS_GEOJSON.forEach(function (item, position) {
        item.eachLayer(function (layer) {
            bus_name = layer.feature.properties.Bus;
            layer.bindTooltip(bus_name);
        });
    });
        
};


function onEachFeature(feature, layer) {
    var Bus = feature.properties.Bus;
    var Bus_stop = feature.properties.Arrêt;
    layer.bindTooltip("Bus: " + Bus + "<br>Arrêt: " + Bus_stop);
}


BUS_LAYERS.forEach(function (item, index) {
    load_geojson_polygons(item, index);
});


// Draw markers //
user_markers = new L.LayerGroup();
user_markers.addTo(MAP);

function draw_marker_on_event(e) {
    //MAP.removeLayer(user_markers);
    user_markers.clearLayers();
    marker = L.marker(e.latlng).addTo(user_markers);
    result = is_point_in_polygon(marker);
    //console.log(result[0]);
    //console.log(result[1]);
    //console.log(is_point_in_polygon(marker))
}

function draw_markers(latlng) {
    marker = L.marker(latlng).addTo(user_markers);
    result = is_point_in_polygon(marker);
    console.log(result[0]);
    console.log(result[1]);
}


function draw_markers_with_line_between(latlng_point_1, latlng_point_2) {
    marker_1 = L.marker(latlng_point_1).addTo(user_markers);
    marker_2 = L.marker(latlng_point_2).addTo(user_markers);

    connection_line = L.polyline(marker1, marker_2).addTo(user_markers);

    result_1 = is_point_in_polygon(marker_1);
    result_2 = is_point_in_polygon(marker_2);

    //console.log(result_1);
    //console.log(result_2);
}




// Check if a point is in a polygon //
/* @param point: Lat/Lng of the point
 * @param polygon: The polygon feature (L.polygon()), is set to NaN in case we
 *            only want to check with the polygons of the territories the
 *            different busses cover
 * @param is_geojson_layer: tells us that we have to do 'geojson_layer.eachLayer()' to
 *                     access the information we need
*/
function is_point_in_polygon(point, polygon=NaN, is_geojson_layer=true, is_point_latlng=false) {
    result = false;
    Bus_name = [];
    feature = NaN;
    if (is_geojson_layer) {
        POLYGONS_GEOJSON.forEach(function (item) {
            item.eachLayer(function(layer) {
                if (is_point_latlng == false) {
                    if (layer.contains(point.getLatLng())) {
                        result = true;
                        Bus_name.push(layer.feature.properties.Bus);
                        feature = layer;
                    }
                }
                else if (is_point_latlng == true) {
                    if (layer.contains(point)) {
                        result = true;
                        Bus_name.push(layer.feature.properties.Bus);
                        feature = layer;
                    }
                }
            })
        })
    }

    else if (is_geojson_layer != true) {
        result = polygon.contains(point.getLatLng());
        Bus_name = polygon;
    };

    return [result, Bus_name, feature];
}



function search_connections() {
    starting_point = document.getElementById("Input-Starting-Point").value;
    destination_point = document.getElementById("Input-Destination-Point").value;
    arrival_date_time = document.getElementById("Input-Arrival-Date-Time").value;

    console.log(starting_point);
    console.log(destination_point);
    console.log(arrival_date_time);

    lookup_address(starting_point).then(starting_point_latlng => wait_for_second_marker_to_draw_line_between([starting_point_latlng.features[0].center[1], starting_point_latlng.features[0].center[0]], "1"));
    lookup_address(destination_point).then(destination_point_latlng => wait_for_second_marker_to_draw_line_between([destination_point_latlng.features[0].center[1], destination_point_latlng.features[0].center[0]], "2"));

    
    async function lookup_address(address) {
        url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?types=place%2Cpostcode%2Caddress&access_token=pk.eyJ1IjoiM3FoNCIsImEiOiJja3NqYW53NXQxc2l2Mm5vZmF0cGVydnYxIn0.TF0GeHY58O9gdLTT88Sb0g"
        let response = await fetch(url);
        let data = await response.json();

        return data
    };


    TWO_POINTS = {}
    function wait_for_second_marker_to_draw_line_between(point, position) {
        if (Object.keys(TWO_POINTS).length == 0 || Object.keys(TWO_POINTS).length == 2) {
            TWO_POINTS = {};
            marker = L.marker(point).addTo(user_markers);
            TWO_POINTS[position] = marker;
        }  
        else if (Object.keys(TWO_POINTS).length == 1) {
            marker = L.marker(point).addTo(user_markers);
            TWO_POINTS[position] = marker;
            connection_line = L.polyline([TWO_POINTS["1"].getLatLng(), TWO_POINTS["2"].getLatLng()], {color:'black', weight:3, dashArray:[6,6]}).addTo(user_markers);
            result_1 = is_point_in_polygon(TWO_POINTS["1"]);
            result_2 = is_point_in_polygon(TWO_POINTS["2"]);
            console.log(result_1);
            console.log(result_2);
            
            check_if_same_bus(result_1, result_2);
        };
    };

    

    function check_if_same_bus(result_1, result_2) {
        busses_1 = result_1[1];
        busses_2 = result_2[1];

        let obj = {};
        matches = [];

        // Code copied from: https://www.geeksforgeeks.org/how-to-find-if-two-arrays-contain-any-common-item-in-javascript/
        for (let i = 0; i < busses_1.length; i++) {
            if (!obj[busses_1[i]]) {
                const element = busses_1[i];
                obj[element] = true;
            }
        }

        for (let j=0; j < busses_2.length; j++) {
            if (obj[busses_2[j]]) {
                matches.push(busses_2[j]);
            }
        }

        if (matches.length < 1) {
            return false; // CHECK FOR ROUTE
        }
        else if (matches.length > 0) {
            show_output_same_bus_start_stop(matches);
        }
    };


    function show_output_same_bus_start_stop(matches) {
        BUS_CONNECTIONS = 0;
        //matches.push("Proxibus");
        //matches.push("Ruffbus Berti");
        //matches.push("Bummelbus");
        matches.forEach(function (match, position) {
            bus = BUS_INFO[match];
            pos = position + 1;

            // display municipality names properly
            commune_str = create_nice_str(bus["Commune"]);
            price_str = create_nice_str(bus["Prix"]);

            function create_nice_str(json_content) {
                output_str = ""
                if (typeof json_content == "string") {
                    output_str = "<dd>" + json_content + "</dd>";
                }
                else if (typeof json_content == "object") {
                    console.log(bus);
                    console.log(typeof json_content);
                    // JSON differentiate between dict and array
                    json_content.forEach(function(value, index) {
                        output_str = output_str + "<dd>" + value + "<br></dd>"
                    });
                }
                else {
                    output_str = json_content;
                };
                return output_str
            };

            console.log(bus);
            //document.getElementById("journey-box-output-container").innerHTML = "<pre>" + JSON.stringify(bus, NaN, 4) + "</pre>";
            document.getElementById("Bus-Name-" + pos).innerHTML = "Nom du bus: <b>" + bus["Nom du Bus"] + "</b>";
            document.getElementById("Municipality-Name-" + pos).innerHTML = "<li><b>Commune: </b><dt>"+ commune_str  + "</dt></li>";
            document.getElementById("Phone-Number-" + pos).innerHTML = "<li><b>Tel.: </b>" + bus["Tel."] + "</li>";
            document.getElementById("Reservation-" + pos).innerHTML = "<li><b>Réservations: </b>" + bus["Réservations"] + "</li>";
            document.getElementById("Price-" + pos).innerHTML = "<li><b>Prix: </b><dt>" + price_str + "</dt></li>";
            document.getElementById("Website-" + pos).innerHTML = "<li><b>Site Internet:</b><br></li>" + bus["Site"];
            document.getElementById("Driving-Hours-" + pos).innerHTML = "<li><b>Heures de circulation: </b><pre>" + JSON.stringify(bus["Heures de circulation"], NaN, 4) + "</pre></li>";
            document.getElementById("Reservation-Hours-" + pos).innerHTML = "<li><b>Heures de réservation: </b><br><pre style='white-space: pre-line;'>" + JSON.stringify(bus["Heures de réservation"], NaN, 4) + "</pre></li>";
            document.getElementById("Driving-Places-" + pos).innerHTML = "<li><b>Lieux de circulation: </b><br><pre style='white-space: pre-line;'>" + JSON.stringify(bus["Lieux de circulation"], NaN, 4) + "</pre></li>";
            document.getElementById("Notices-" + pos).innerHTML = "<li><b>Remarques: </b><pre style='white-space: pre-line;'>" + JSON.stringify(bus["Remarques"], NaN, 4) + "</pre></li>";
            document.getElementById("Enterprise-" + pos).innerHTML = "<li><b>Entreprise effectuant le transport: </b>" + bus["Entreprise effectuant le transport"] + "</li>";
            document.getElementById("journey-box-output-" + pos).style.visibility = "visible";
            document.getElementById("journey-box-collapser-" + pos).style.visibility = "visible";
            //document.getElementById("" + pos).innerHTML = "<li>" + bus[""] + "</li>";
            BUS_CONNECTIONS = BUS_CONNECTIONS + 1;
        
            function json_replacer(i, val) {
                return val
            }
        
        })
        //document.getElementById("journey-box-output-container").innerText = BUS_INFO[matches];
        

    }
};


// Menu switch from 'Itinary' to 'Busses list'
function journey_box_menu_button(which) {
    console.log(which);
    // If left button pressed
    if (which == 1) {
        document.getElementById("journey-box-bus-list").style.visibility = "hidden";
        document.getElementById("journey-box-itinary").style.visibility = "visible";
        document.getElementById("journey-box-output-container").style.visiblity = "visible";
        for (var counter=1; counter < BUS_CONNECTIONS+1; counter++) {
            document.getElementById("journey-box-collapser-"+counter).style.visibility = "visible";
            document.getElementById("journey-box-output-box-"+counter).style.visibility = "visible";
            document.getElementById("journey-box-output-"+counter).style.visibility = "visible";
        }
    }
    // If right button pressed
    else if (which == 2) {
        document.getElementById("journey-box-itinary").style.visibility = "hidden";
        document.getElementById("journey-box-output-container").style.visibility = "hidden";
        document.getElementById("journey-box-bus-list").style.visibility = "visible";

        for (var counter=1; counter < BUS_CONNECTIONS+1; counter++) {
            document.getElementById("journey-box-collapser-"+counter).style.visibility = "hidden";
            document.getElementById("journey-box-output-box-"+counter).style.visibility = "hidden";
            document.getElementById("journey-box-output-"+counter).style.visibility = "hidden";
        }
        
    };
}


function on_click_show_area_information(e){
    result = is_point_in_polygon(e.latlng, NaN, true, true);
    console.log(result);
    if (result[0] == true) {
        bar_text = "Bus desservant cette zone: <br>"
        result[1].forEach(function(bus, position) {
            bar_text = bar_text + "<li>" + bus + "</li>"
        });
        show_msg_bar(bar_text);
    };
};


/* @param message: the message that will be displayed
 * @param level: changes the color for different levels like 'info' or 'warning'
 * @param timeout_seconds: after how many seconds should the message disappear
*/
function show_msg_bar(message="No message can be displayed", level="info", timeout_seconds=10) {
    // https://code-boxx.com/display-messages-html-javascript/
    var bar = document.createElement("div");
    bar.innerHTML = message;
    bar.classList.add("mbar");
    bar.classList.add(level);
    document.getElementById("mbar").appendChild(bar);
    // https://bobbyhadz.com/blog/javascript-hide-element-after-few-seconds
    setTimeout(() => {
        bar.remove();
    }, timeout_seconds*1000);
};

MAP.on('click', on_click_show_area_information)