const EMPTY = '*=*=*TU_WYPEŁNIĆ*=*=*';

let sellerData = [];
let acquirerData = [];
let logoSrc = '';

const serviceData = {
    'invoice-id': EMPTY,
    'date-of-realization': EMPTY,
    'date-of-selling': EMPTY,
    'date-of-payment': EMPTY,
};

const moneyData = {
    'money-external-currency': 0,
    'money-spelled-out': EMPTY,
    'currency-symbol': '£',
    'currency-date': EMPTY,
    'currency-table-number': EMPTY,
};

function inputValue(id) {
    id = 'input-' + id;
    return document.getElementById(id).value;
}

function updateObject(obj) {
    for (let key of _.keys(obj)) {
        let val = inputValue(key);
        if (val) { obj[key] = val; }
    }
}

function updateData() {
    updateObject(serviceData);
    updateObject(moneyData);
    sellerData = inputValue('seller-data').split('\n');
    acquirerData = inputValue('acquirer-data').split('\n');
}

function renderDataObj(obj) {
    for (let [key, value] of _.entries(obj)) {
        let e = document.getElementById(key);
        let elements;
        if (e) {
            elements = [e];
        } else {
            elements = Array.from(document.getElementsByClassName(key))
        }

        for (let element of elements) {
            element.value = value;
        }
    }
}

function renderArray(data, id) {
    let element = document.getElementById(id);
    for (let p of element.getElementsByTagName('p')) {
        p.remove();
    }

    for (let line of data) {
        let newEl = document.createElement('p');
        let text = document.createTextNode(line);
        newEl.append(text);
        element.append(newEl);
    }
}

function renderData() {
    updateData();

    renderDataObj(serviceData);
    renderDataObj(moneyData);
    renderArray(sellerData, 'seller-data');
    renderArray(acquirerData, 'acquirer-data');
}

function main() {
    let button = document.getElementById('reload-button');
    button.addEventListener('mousedown', renderData);
}

main();
