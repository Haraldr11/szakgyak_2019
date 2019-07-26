var searchManager;

class Coordinate {
    constructor(X, Y) {
        this.X = X;
        this.Y = Y;
    }
}

class Pushpin {
    constructor(coordinate, name, address) {
        this.coordinate = coordinate;
        this.name = name;
        this.address = address;
    }
}

function GetMap() {

    var map = new Microsoft.Maps.Map('#myMap', {
        credentials: 'Alhj2GkeAQqK_8AADcJhyopXKcbk2Mda5h7DSWrWOUIcheXb9JZP9ZKilXRZRrQY'
    });

    var file = "transfer.json";

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            //console.log(obj[0].coordinate.x);
            var tomb = [];
            for (var i = 0; i < obj.length; i++) {
                tomb[i] = new Pushpin( new Coordinate(obj[i].coordinate.x, obj[i].coordinate.y), obj[i].TARS_ROV_NEV, obj[i].CIM_EGYBEN);
            }

            var layer = new Microsoft.Maps.Layer();

            console.log(tomb.length);
            for (var i = 0; i < tomb.length; i++) {
                layer.add(new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(tomb[i].coordinate.X, tomb[i].coordinate.Y), {  title: tomb[i].name, subTitle: tomb[i].address } ));
            }
            map.layers.insert(layer);

        }
    };
    xmlhttp.open("GET", file, true);
    xmlhttp.send();
}
