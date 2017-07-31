var map;

function initMap() {
    var myLatlng = new google.maps.LatLng(-34.397, 150.644);

    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatlng,
        zoom: 8
    });
    var markers = {};

    for (var i in orders) {
        var city = orders[i][orders[i].length - 1];
        if(!markers[city]){
            markers[city] = [];
        }
        markers[city].push(orders[i]);
    }

    for (city in markers) {
        myLatlng = findLatlng(city);

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map
        });

        var text = '';

        for (var currentOrder in markers[city]) {
            if(currentOrder > 0){
                text += '<hr>';
            }

            /*for (var j in orders) {
                if(orders[j] !== markers[city][currentOrder]){
                    continue;
                }
                var orderId = j;
                break;
            }

            text += 'Заказ №' +(orderId+1) + '<br>';*/

            for (var item in markers[city][currentOrder]) {
                if(typeof markers[city][currentOrder][item] !== 'object'){
                    continue;
                }

                if(markers[city][currentOrder][item]['id'] !== 1){
                    text += '<br>';
                }

                text += markers[city][currentOrder][item]['id'] + ". " + markers[city][currentOrder][item]['name'] + ", " + markers[city][currentOrder][item]['count'] + " штук, " + markers[city][currentOrder][item]['price'] + markers[city][currentOrder][item]['moneySign'];
            }
        }

        var infoWindow = new google.maps.InfoWindow({
            content: '<div>' + text + '</div>'
        });

        google.maps.event.addListener(marker, 'click', function(x) {
            return function() {
                infoWindow.open(map, marker);
            }
        });
    }
}

function showMap() {
    $('#map').show();
    initMap();
}

function showOrderOnMap() {
    var orderId = $('.button.selected').data('id');
    city = orders[orderId][1];
    var myLatlng = findLatlng(city);
    console.log(myLatlng);

    map.center = myLatlng;
}

function findLatlng(city) {
    var myLatlng;

    $.ajax({
        url: 'http://maps.googleapis.com/maps/api/geocode/json?address='+ city +'&sensor=false&language=en',
        async: false,
        success: function(data) {
            myLatlng = new google.maps.LatLng(data['results'][0]['geometry']['location']['lat'], data['results'][0]['geometry']['location']['lng']);
        }
    });

    return myLatlng;
}