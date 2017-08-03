var map;

function initMap(orderId) {
    var city = orders[orderId][orders[orderId].length - 1];
    var myLatlng = findLatlng(city);

    map = new google.maps.Map(document.getElementById('ordersMap'), {
        center: myLatlng,
        zoom: 8
    });

    var markers = {};

    for (var i in orders) {
        city = orders[i][orders[i].length - 1];
        if(!markers[city]){
            markers[city] = [];
        }
        markers[city].push(orders[i]);
    }

    // Цикл для создания маркеров и всплывающих подсказок
    for (city in markers) {
        myLatlng = findLatlng(city);

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map
        });

        var text = '';

        // Цикл для создания маркеров
        for (var currentOrder in markers[city]) {
            if(currentOrder > 0){
                text += '<hr>';
            }

            for (var key in orders) {
                if(orders[key] !== markers[city][currentOrder]){
                    continue;
                }
                var orderId = key;
                break;
            }

            text += 'Заказ №' + (+orderId + 1);
            text += '<br>';

            // Цикл с формированием текста для подсказки над маркером
            for (i = 1; i < markers[city][currentOrder].length; i++) {
                for (var j = 0; markers[city][currentOrder][j]['id'] !== i; j++) {

                }

                if(i !== 1){
                    text += '<br>';
                }

                text += markers[city][currentOrder][j]['id'] + ". " + markers[city][currentOrder][j]['name'] + ", " + markers[city][currentOrder][j]['count'] + " штук, " + markers[city][currentOrder][j]['price'] + markers[city][currentOrder][j]['moneySign'];
            }
        }

        var infoWindow = new google.maps.InfoWindow({
            content: '<div>' + text + '</div>'
        });

        google.maps.event.addListener(marker, 'click', function(currentMarker, currentInfoWindow) {
            return function() {
                currentInfoWindow.open(map, currentMarker);
            }
        }(marker, infoWindow));
    }
}

function showMap() {
    $('#ordersMap').show();
    var orderId = $('.button.selected').data('id');

    initMap(orderId);
}

function showOrderOnTheMap() {
    var orderId = $('.button.selected').data('id');
    var city = orders[orderId][orders[orderId].length - 1];

    var myLatlng = findLatlng(city);
    map.setCenter(myLatlng);
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