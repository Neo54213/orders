var headers = ['Номер', 'Название', 'Количество', 'Цена'];
var orders = [
    [
        {
            id: 1,
            name: "Book",
            count: 3,
            price: "157",
            moneySign: '$'
        },
        {
            id: 2,
            name: "Pen",
            count: 4,
            price: "85",
            moneySign: '$'
        },
        {
            id: 3,
            name: "Phone",
            count: 1,
            price: "464",
            moneySign: '$'
        },
        {
            id: 4,
            name: "Pencil Red",
            count: 65,
            price: "314",
            moneySign: '$'
        },
        {
            id: 5,
            name: "Sharpener",
            count: 6,
            price: "96",
            moneySign: '$'
        },
        "London"
    ],
    [
        {
            id: 1,
            name: "Tape",
            count: 5,
            price: "543",
            moneySign: '$'
        },
        {
            id: 2,
            name: "Textbook",
            count: 65,
            price: "314",
            moneySign: '$'
        },
        {
            id: 3,
            name: "Pencil case",
            count: 35,
            price: "346",
            moneySign: '$'
        },
        {
            id: 4,
            name: "Desk",
            count: 5,
            price: "4314",
            moneySign: '$'
        },
        {
            id: 5,
            name: "Marker",
            count: 5,
            price: "145",
            moneySign: '$'
        },
        "Paris"
    ],
    [
        {
            id: 1,
            name: "Paper",
            count: 5,
            price: "87",
            moneySign: '$'
        },
        {
            id: 2,
            name: "Chalk",
            count: 6,
            price: "435",
            moneySign: '$'
        },
        {
            id: 3,
            name: "Clock",
            count: 8,
            price: "563",
            moneySign: '$'
        },
        {
            id: 4,
            name: "Ruler",
            count: 22,
            price: "457",
            moneySign: '$'
        },
        {
            id: 5,
            name: "Globe",
            count: 7,
            price: "789",
            moneySign: '$'
        },
        "New-York"
    ],
    [
        {
            id: 1,
            name: "Chair",
            count: 2,
            price: "54",
            moneySign: '$'
        },
        {
            id: 2,
            name: "Eraser",
            count: 56,
            price: "2445",
            moneySign: '$'
        },
        {
            id: 3,
            name: "Map",
            count: 11,
            price: "345",
            moneySign: '$'
        },
        {
            id: 4,
            name: "Scissors",
            count: 24,
            price: "451",
            moneySign: '$'
        },
        {
            id: 5,
            name: "Notebook",
            count: 32,
            price: "654",
            moneySign: '$'
        },
        "Paris"
    ]
];
var needToDrawTHs;
var filteredOrder;
var keys = Object.keys(orders[0][0]);

$(document).ready(function() {
    drawTabs();
    needToDrawTHs = true;

    $('.button').on('click', onButtonClick);

    $('#ordertabs').find('.order2').click();
    needToDrawTHs = false;

    $('#search').on('input', onSearchInput);

    $('th').on('click', onHeaderClick);

    $('#orderstable').find('.name').click();
});

function clearSortImage() {
    $('th').removeClass('asc desc').find('.indicator-image').hide();
}

function drawTabs() {
    for (var i = 0; i < orders.length; i++) {
        $('<div>', {
            text: 'Заказ ' +(i+1),
            class: 'button order' +(i+1),
            data: {
                id: i
            }
        }).appendTo($('#ordertabs'));
    }
}

function drawTHs() {
    var $thead = $('#orderstable').find('thead');

    for (var i in headers) {
        var $th = $('<th>', {
            text: headers[i],
            class: keys[i],
            data: {
                id: i
            }
        });

        var $indicatorImage = $('<img>', {
            alt: 'индикатор сортировки',
            class: 'indicator-image'
        });

        $th.prepend($indicatorImage);
        $thead.append($th);
    }
}

function changeSort(order, headerIndex) {
    var $header = $('#orderstable th:nth-child(' +(headerIndex + 1) + ')');

    if($header.hasClass('asc')) {
        sortDESC(order, headerIndex);
        $header.addClass('desc').removeClass('asc').find('.indicator-image').attr('src', 'img/desc.png');
    }else{
        sortASC(order, headerIndex);
        $header.addClass('asc').removeClass('desc').find('.indicator-image').attr('src', 'img/asc.png');
    }
    $header.find('.indicator-image').show();

    drawOrder(order);
}

function drawOrder(order) {
    var $tbody = $('#orderstable').find('tbody');
    $tbody.empty();

    for (var i = 0; i < order.length; i++) {
        var $tr = $('<tr>');
        var item = order[i];
        if(typeof item !== 'object'){
            continue;
        }

        if(i === 0 && needToDrawTHs){
            drawTHs();
        }

        for (var column in item) {
            if(column === 'moneySign'){
                continue;
            }
            var text = item[column];
            if(column === 'price'){
                text += item['moneySign'];
            }
            var $td = $('<td>', {
                text: text
            }).appendTo($tr);
        }

        $tbody.append($tr);
    }
}

function onButtonClick() {
    if($(this).hasClass('selected')){
        return;
    }
    $(this).addClass('selected');
    $('.button').not($(this)).removeClass('selected');

    filteredOrder = '';
    $('#search').val('');
    clearSortImage();

    var orderIdx = $(this).data('id');

    var order = orders[orderIdx];
    drawOrder(order);
}

function onHeaderClick() {
    if(!$(this).hasClass('asc') && !$(this).hasClass('desc')){
        clearSortImage();
    }
    var $divSelected = $('div.selected');
    var headerIdx = $(this).index();
    var orderIdx = $divSelected.index();
    var order;
    if(filteredOrder){
        order = filteredOrder;
    }else{
        order = orders[orderIdx];
    }
    changeSort(order, headerIdx);
}

function onSearchInput() {
    var $divSelected = $('div.selected');
    var orderIdx = $divSelected.data('id');
    var order = orders[orderIdx];

    var $search =  $('#search');
    var text = $search.val();
    text = text.replace(/ {2,}/g, ' ');

    if (text == ' '){
        return;
    }

    var re = new RegExp("^" + text, 'i');

    filteredOrder = order.filter(function(item) {
        if (typeof item != 'object'){
            return;
        }
        return re.test(item['name']);
    });

    if(filteredOrder.length > 0){
        if($('th').hasClass('asc')){
            sortASC(filteredOrder, $('th.asc').data('id'));
        }else if($('th').hasClass('desc')){
            sortDESC(filteredOrder, $('th.desc').data('id'))
        }
    }
    drawOrder(filteredOrder);
}

function sortASC(order, headerIndex) {
    var fieldName = keys[headerIndex];
    if ( !isNaN( parseInt(order[0][fieldName]) ) ) {
        order.sort(function(a, b) {
            return parseInt(a[fieldName])-parseInt(b[fieldName]);
        });
    }else{
        order.sort(function(a, b) {
            if (a[fieldName] < b[fieldName]) {
                return -1;
            }
            if (a[fieldName] > b[fieldName]) {
                return 1;
            }
            return 0;
        });
    }
}

function sortDESC(order, headerIndex) {
    var fieldName = keys[headerIndex];

    if ( !isNaN( parseInt(order[0][fieldName]) ) ) {
        order.sort(function(a, b) {
            return parseInt(b[fieldName])-parseInt(a[fieldName]);
        });
    }else{
        order.sort(function(a, b) {
            if (a[fieldName] > b[fieldName]) {
                return -1;
            }
            if (a[fieldName] < b[fieldName]) {
                return 1;
            }
            return 0;
        });
    }
}