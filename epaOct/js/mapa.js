/* Author(s) = Manuel Maroto (@manuelgmaroto), Luis Sevillano (@SepirData)
 * Date: 2014 Oct
 */
var obj = document.getElementById('control');
var uA = navigator.userAgent;
if (uA.indexOf('Trident') != -1 && uA.indexOf('rv:11') != -1) {
    obj.setAttribute("type", "hidden");
}
if (uA.indexOf('Trident') != -1 && uA.indexOf('MSIE 10.0') != -1) {
    obj.setAttribute("type", "hidden");
}
window.onload = search();
var dispositivo;
var trimestres = new Array('2014TIII', '2014TII', '2014TI', '2013TIV', '2013TIII', '2013TII', '2013TI', '2012TIV', '2012TIII', '2012TII', '2012TI', '2011TIV', '2011TIII', '2011TII', '2011TI', '2010TIV', '2010TIII', '2010TII', '2010TI', '2009TIV', '2009TIII', '2009TII', '2009TI', '2008TIV', '2008TIII', '2008TII', '2008TI', '2007TIV', '2007TIII', '2007TII', '2007TI', '2006TIV', '2006TIII', '2006TII', '2006TI', '2005TIV', '2005TIII', '2005TII', '2005TI');
trimestres.reverse();
function addComas(n) {
    var formatValue = d3.format("0,000");
    return formatValue(n).replace('.', ',').replace('.', ',');
}

var colores = new Array("#ECC5B4", "#E3A78F", "#D9886C", "#D0694C", "#A55036");
//var colores = new Array("#E6F6F4", "#88D7CF", "#ABCEAB", "#D8C47D", "#F4A45F", "#F6624D", "#BD294B", "#90062A", "#421E2A");
function getColor(d) {
    return d > 40 ? colores[4] :
            d > 30 ? colores[3] :
            d > 20 ? colores[2] :
            d > 10 ? colores[1] :
            colores[0];
}
var wmap = 600;
var hmap = 520;
var hCan = 100;
var wCan = 260;
var projection = d3.geo.mercator()
        .translate([410, 2150])
        .scale(2500);
var path = d3.geo.path()
        .projection(projection);
var map = d3.select("#mapa")
        .append("svg")
        .attr("width", wmap)
        .attr("height", hmap);
var projectionCan = d3.geo.mercator()
        .translate([800, 1350])
        .scale(2500);
var pathCan = d3.geo.path()
        .projection(projectionCan);
var mapCan = d3.select("#canarias")
        .append("svg")
        .attr("width", wCan)
        .attr("height", hCan);
var inp = document.getElementById('control');
inp.max = trimestres.length - 1;
inp.value = trimestres.length - 1;
d3.select('#tasa').html("Trimestre " + trimestres[trimestres.length - 1].substring(5));
d3.select('#year').html(trimestres[trimestres.length - 1].substring(0, 4));

var div = d3.select("body")
        .append("div")
        .attr("class", "tooltip")

function search() {
    var tipoDispositivo = navigator.userAgent.toLowerCase();
    if (tipoDispositivo.search(/iphone|ipod|ipad|android/) > -1) {
        dispositivo = "click";
    }
    else {
        dispositivo = "mouseover";
    }
}
var height = 330, width = 885, trans = 60;
var w = 950, h = 380;
d3.csv("historicoProvincias.csv", function(data) {
    d3.json("Provincias.json", function(json) {
        d3.json("canarian.json", function(can) {
            for (var i = 0; i < data.length; i++) {
                var codeState = data[i].code;
                var dataValue = data[i][trimestres[trimestres.length - 1]];
                for (var j = 0; j < json.features.length; j++) {
                    var jsonState = json.features[j].properties.code;
                    if (codeState == jsonState) {
                        json.features[j].properties.value = dataValue;
                        break;
                    }
                }
                //canarias
                for (var z = 0; z < can.features.length; z++) {
                    var canState = can.features[z].properties.code;
                    if (codeState == canState) {
                        can.features[z].properties.value = dataValue;
                        break;
                    }
                }
            }
            var state = map.selectAll("#mapa path")
                    .data(json.features)
                    .enter()
                    .append("path")
                    .attr("class", "path")
                    .attr("d", path)
                    .style("fill", function(d) {
                        //Get data value
                        var value = d.properties.value;

                        if (value) {
                            //If value exists…
                            return getColor(value);
                        } else {
                            //If value is undefined…
                            return "#ccc";
                        }
                    })
                    .attr("stroke", "black")
                    .attr("stroke-width", 0.4)
                    .on("mousemove", function(d) {

                        div.style("opacity", 1);
                        div.html("<b>" + d.properties.name + "</b></br>Tasa paro: " + addComas(data[d.properties.code][trimestres[inp.value]]) + "% <br>" + d.properties.comunidad)
                                .style("left", d3.event.pageX + 10 + "px")
                                .style("top", d3.event.pageY + 10 + "px");
                    })
                    .on("mouseout", function() {
                        return div
                                .style("opacity", 0);
                    });
            //canarias
            var state2 = mapCan.selectAll("#canarias path")
                    .data(can.features)
                    .enter()
                    .append("path")
                    .attr("class", "path")
                    .attr("d", pathCan)
                    .style("fill", function(d) {
                        var value = d.properties.value;
                        if (value) {
                            return getColor(value);
                        } else {
                            return "#ccc";
                        }
                    })
                    .attr("stroke", "black")
                    .attr("stroke-width", 0.4)
                    .on("mousemove", function(d) {
                        div.style("opacity", 1);
                        div.html("<b>" + d.properties.name + "</b></br>Tasa paro: " + addComas(data[d.properties.code][trimestres[inp.value]]) + "% <br>" + d.properties.comunidad)
                                .style("left", d3.event.pageX + 10 + "px")
                                .style("top", d3.event.pageY + 10 + "px");
                    })
                    .on("mouseout", function() {
                        return div
                                .style("opacity", 0);
                    });
            maxMin(data);
            d3.select("#control")
                    .on("input", function() {
                        d3.select('#tasa').html("Trimestre " + trimestres[inp.value].substring(5));
                        d3.select('#year').html(trimestres[inp.value].substring(0, 4));
                        state
                                .style("fill", function(d) {
                                    for (var i = 0; i < data.length; i++) {
                                        var codeState = data[i].code;
                                        var dataValue = data[i][trimestres[inp.value]];
                                        for (var j = 0; j < json.features.length; j++) {

                                            var jsonState = json.features[j].properties.code;
                                            if (codeState == jsonState) {
                                                json.features[j].properties.value = dataValue;

                                                //Stop looking through the JSON
                                                break;
                                            }

                                        }
                                    }
                                    var value = d.properties.value;
                                    if (value) {
                                        //If value exists…
                                        return getColor(value);
                                    } else {
                                        //If value is undefined…
                                        return "#ccc";
                                    }
                                })
                                .attr("stroke", "black")
                                .attr("stroke-width", 0.4)
                                .on(dispositivo, function(d) {

                                    div.style("opacity", 1);
                                    div.html("<b>" + d.properties.name + "</b></br>Tasa de paro: " + addComas(data[d.properties.code][trimestres[inp.value]]) + "% <br>" + d.properties.comunidad)
                                            .style("left", d3.event.pageX + 10 + "px")
                                            .style("top", d3.event.pageY + 10 + "px");
                                })
                                .on("mouseout", function() {
                                    return div
                                            .style("opacity", 0);
                                });
                        state2
                                .style("fill", function(d) {
                                    //Get data value
                                    // var value = d.properties.value;
                                    for (var i = 0; i < data.length; i++) {
                                        var codeState = data[i].code;
                                        var dataValue = data[i][trimestres[inp.value]];
                                        for (var j = 0; j < can.features.length; j++) {

                                            var jsonState = can.features[j].properties.code;
                                            if (codeState == jsonState) {
                                                can.features[j].properties.value = dataValue;
                                                break;
                                            }

                                        }
                                    }
                                    var value = d.properties.value;
                                    if (value) {
                                        //If value exists…
                                        return getColor(value);
                                    } else {
                                        //If value is undefined…
                                        return "#ccc";
                                    }
                                })
                                .attr("stroke", "black")
                                .attr("stroke-width", 0.4)
                                .on(dispositivo, function(d) {

                                    div.style("opacity", 1);
                                    div.html("<b>" + d.properties.name + "</b></br>Tasa de paro: " + addComas(data[d.properties.code][trimestres[inp.value]]) + "% <br>" + d.properties.comunidad)
                                            .style("left", d3.event.pageX + 10 + "px")
                                            .style("top", d3.event.pageY + 10 + "px");
                                })
                                .on("mouseout", function() {
                                    return div
                                            .style("opacity", 0);
                                });
                        maxMin(data);
                    });

        });
    });

    function maxMin(d) {
        d3.select("#minimoParo").html("");
        d3.select("#maximoParo").html("");
        d3.select("#mediaParo").html("");

        var datos = [];
        var provincia = [];
        for (var i = 0; i < data.length - 1; i++) {//-1 para que no cargue Nacional
            datos.push(d[i][trimestres[inp.value]]);
            provincia.push(d[i].state);
        }
        var max = Math.max.apply(Math, datos);
        var min = Math.min.apply(Math, datos);
        var provinciaMax;
        var provinciaMin;
        for (var j = 0; j < data.length - 1; j++) {
            if (max == datos[j]) {
                provinciaMax = provincia[j];
            }
            if (min == datos[j]) {
                provinciaMin = provincia[j];
            }
        }
        var nombreMediaParo = d3.select("#mediaParo").append("text").html(addComas(datos[datos.length - 1]) + "%");
        var nombreProvinciaMax = d3.select("#maximoParo").append("text").html(addComas(max) + "%<br>" + "<span id='provincia'>" + provinciaMax + "</span>");
        var nombreProvinciaMin = d3.select("#minimoParo").append("text").html(addComas(min) + "%<br>" + "<span id='provincia'>" + provinciaMin + "</span");


    }
});

function addPuntos(numero) {
    var formatValue = d3.format("0,000");
    return formatValue(numero).replace(',', '.').replace(',', '.');
}
var numeros = new Array(0, 5, 10, 15, 20, 25, 30, 35, 40, 45);
var trimestres = new Array('2014TIII', '2014TII', '2014TI', '2013TIV', '2013TIII', '2013TII', '2013TI', '2012TIV', '2012TIII', '2012TII', '2012TI', '2011TIV', '2011TIII', '2011TII', '2011TI', '2010TIV', '2010TIII', '2010TII', '2010TI', '2009TIV', '2009TIII', '2009TII', '2009TI', '2008TIV', '2008TIII', '2008TII', '2008TI', '2007TIV', '2007TIII', '2007TII', '2007TI', '2006TIV', '2006TIII', '2006TII', '2006TI', '2005TIV', '2005TIII', '2005TII', '2005TI');
trimestres.reverse();
function addComas(n) {
    var formatValue = d3.format("0,000");
    return formatValue(n).replace('.', ',').replace('.', ',');
}
//var years = new Array("2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014")
var div = d3.select("#wrapper")
        .append("div")
        .attr("class", "tooltip");