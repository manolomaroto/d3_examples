/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var column = new Array('CCAA', 'Nombre', 'Vinculado al partido (FILTRO)', 'Cargos ejercidos', 'Caso', 'Grado de implicación', 'Ingresó en prisión');
Array.prototype.unique = function(a) {
    return function() {
        return this.filter(a);
    };
}(function(a, b, c) {
    return c.indexOf(a, b + 1) < 0
});

function removeClass(d) {
    var hidden = document.getElementsByTagName('table')[1];
    $(hidden).removeClass('hidden');
    if (d.value == '') {
        $(hidden).addClass('hidden');
    }
}
var colorBusqueda;
function buscar(d, item) {
    var selects = document.getElementsByTagName('select');
    for (i = 0; i < selects.length; i++) {
        if (selects[i].value == d) {
            selects[i].value == d;
        } else {
            selects[i].selectedIndex = 0;
        }
    }
    var hidden = document.getElementsByTagName('table')[1];
    d3.select('#cajaTextoLeyenda').attr('class', 'hidden');
    d3.select('#colorLeyenda').attr('class', 'hidden');
    d3.select(hidden).classed('hidden', false);
    var tabla = document.getElementById('tabla');
    tabla.innerHTML = "";
    var color = new Array();
    d3.json("comunidadesData.json", function(json) {
        d3.json("canarian.json", function(can) {
            d3.csv("corruptos.csv", function(csv) {
                for (i = 0; i < csv.length; i++) {
                    if (csv[i][item] === d) {
                        //fila-partido o caso
                        var fila = document.createElement("tr");
                        for (j = 0; j < column.length; j++) {
                            var columna = document.createElement("td");
                            if (j == 1) {
                                columna.setAttribute('class', 'name');
                                var linkNombre = document.createElement('a');
                                var enlace = csv[i]['ENLACES (EN NOMBRE)'];
                                linkNombre.setAttribute('href', enlace);
                                linkNombre.setAttribute('target', '_blank');
                                var text = document.createTextNode(csv[i][column[j]]);
                                linkNombre.appendChild(text);
                                columna.appendChild(linkNombre);
                            } else {
                                var campo = document.createTextNode(csv[i][column[j]]);
                                columna.appendChild(campo);
                            }
                            if (j == 4) {
                                var linkCaso = document.createElement('a');
                                var linkDoc = document.createElement('a');
                                var desCaso = csv[i]['Lea más sobre el caso'];
                                var desDoc = csv[i]['Documento'];
                                if (desDoc != '') {
                                    linkDoc.setAttribute('href', desDoc);
                                    linkDoc.setAttribute('target', '_blank');
                                    var icono3 = document.createElement('img');
                                    icono3.setAttribute('src', 'img/logo_pdf.png');
                                    linkDoc.appendChild(icono3);
                                    columna.appendChild(linkDoc);
                                }
                                if (desCaso != '') {
                                    linkCaso.setAttribute('href', desCaso);
                                    linkCaso.setAttribute('target', '_blank');
                                    var icono2 = document.createElement('img');
                                    icono2.setAttribute('src', 'img/logo_enl.png');
                                    linkCaso.appendChild(icono2);
                                    columna.appendChild(linkCaso);
                                }
                                var icono1 = document.createElement('img');
                                icono1.setAttribute('src', 'img/logo_inf.png');
                                var caso = csv[i]['Descripción del caso'];
                                icono1.setAttribute('title', caso);
                                columna.appendChild(icono1);

                            }
                            fila.appendChild(columna);
                        }
                        tabla.appendChild(fila);
                        color.push(csv[i][column[0]]);
                    }
                }
                color = color.unique();
                for (var i = 0; i < color.length; i++) {
                    var comunidad = color[i];
                    for (var j = 0; j < json.features.length; j++) {
                        var jsonState = json.features[j].properties.name;
                        if (comunidad == jsonState) {
                            json.features[j].properties.pintar = true;
                            break;
                        }
                    }
                    for (var j = 0; j < can.features.length; j++) {
                        var jsonStateC = can.features[j].properties.name;
                        if (comunidad == jsonStateC) {
                            can.features[j].properties.pintar = true;
                            break;
                        }
                    }
                }
                d3.select('#mapa').selectAll('path')
                        .data(json.features)
                        .style('fill', function(d) {
                            if (d.properties.pintar) {
                                return '#D18242';
                            } else {
                                return '#E2B084';
                            }
                        });
                d3.select('#canarias').selectAll('path')
                        .data(can.features)
                        .style('fill', function(d) {
                            if (d.properties.pintar) {
                                return '#D18242';
                            } else {
                                return '#E2B084';
                            }
                        });
            });
        });
    });
}
var options = {
    valueNames: ['name']
};
var userList = new List('users', options);
var comunidades = ["Andalucía", "Aragón", "Asturias", "Baleares", "Canarias", "Cantabria", "Castilla y León",
    "Castilla La Mancha", "Cataluña", "Comunidad Valenciana", "Extremadura", "Galicia", "Madrid", "Murcia", "Navarra",
    "País Vasco", "Rioja", "Ceuta", "Melilla", "Nacional"];
var casosComunidades = {"Andalucía": 0, "Aragón": 0, "Asturias": 0, "Baleares": 0, "Canarias": 0, "Cantabria": 0, "Castilla y León": 0,
    "Castilla La Mancha": 0, "Cataluña": 0, "Comunidad Valenciana": 0, "Extremadura": 0, "Galicia": 0, "Madrid": 0, "Murcia": 0, "Navarra": 0,
    "País Vasco": 0, "Rioja": 0, "Ceuta": 0, "Melilla": 0};
d3.select('#cajaCondenados h3')
        .on('click', function() {
            buscar('Condenado', 'Grado de implicación');
        });
d3.select('#cajaEncarcelados h3')
        .on('click', function() {
            buscar('Sí', 'Ingresó en prisión');
        });
d3.json("comunidadesData.json", function(json) {
    d3.json("canarian.json", function(can) {
        d3.csv("corruptos.csv", function(data) {
            var colores = new Array("#E2B084", "#D18242", "#AF5E1E", "#954119", "#5A3015");
            function getColor(d) {
                return d > 60 ? colores[4] :
                        d > 45 ? colores[3] :
                        d > 30 ? colores[2] :
                        d > 15 ? colores[1] :
                        colores[0];
            }
            ;
            var totalCondenados = calculoCondenados(20);
            var totalEncarcelados = totalPrision(20);
            var totalCorruptos = total(20);
            var cambioCondenados = d3.select("#condenados").append("text").html(totalCondenados);
            var cambioEncarcelados = d3.select("#encarcelados").append("text").html(totalEncarcelados);
            var cambioTotal = d3.select("#total").append("text").html(totalCorruptos);
            function total(n) {
                var total = [];
                if (n == 20) {
                    for (var i in data) {
                        total.push(data[i]["Nombre"]);
                    }
                    return total.unique().length;
                } else {
                    for (var j in data) {
                        if (data[j].CCAA == comunidades[n]) {
                            total.push(data[j]["Nombre"])
                        }
                    }
                    cambioTotal.html("");
                    cambioTotal.append("text").html(total.unique().length);

                }
            }

            function totalComunidades(n) {
                var total = [];
                if (n == 20) {
                    for (var i in data) {
                        total.push(data[i]["Nombre"]);
                    }
                    return total.unique().length;
                } else {
                    for (var j in data) {
                        if (data[j].CCAA == comunidades[n]) {
                            total.push(data[j]["Nombre"])
                        }
                    }

                    return total.unique().length;
                }
            }
            function calculoCondenados(n) {
                var condenados = [];
                if (n == 20) {
                    for (var i in data) {
                        if (data[i]["Grado de implicación"] == "Condenado") {
                            condenados.push(data[i]["Nombre"]);
                        }
                    }
                    return condenados.unique().length;
                } else {
                    for (var j in data) {
                        if ((data[j]["Grado de implicación"] == "Condenado") && data[j].CCAA == comunidades[n]) {

                            condenados.push(data[j]["Nombre"]);
                        }
                    }
                    cambioCondenados.html("");
                    cambioCondenados.append("text").html(condenados.unique().length);
                }
            }



            function totalPrision(n) {
                var prision = [];
                if (n == 20) {
                    for (var i in data) {
                        if (data[i]["Ingresó en prisión"] == "Sí") {
                            prision.push(data[i]["Nombre"]);
                        }
                    }
                    return prision.unique().length;
                } else {
                    for (var j in data) {
                        if ((data[j]["Ingresó en prisión"] == "Sí") && data[j].CCAA == comunidades[n]) {

                            prision.push(data[j]["Nombre"]);
                        }
                    }
                    cambioEncarcelados.html("");
                    cambioEncarcelados.append("text").html(prision.unique().length);
                }
            }
            for (var i = 0; i < comunidades.length - 1; i++) {
                casosComunidades[comunidades[i]] = totalComunidades(i);
            }
            function getColor(d) {
                return d > 40 ? colores[4] :
                        d > 30 ? colores[3] :
                        d > 20 ? colores[2] :
                        d > 10 ? colores[1] :
                        colores[0];
            }
            var wmap = 485;
            var hmap = 410;
            var hCan = 80;
            var wCan = 190;
            var projection = d3.geo.mercator()
                    .translate([330, 1710])
                    .scale(2000);
            var path = d3.geo.path()
                    .projection(projection);
            var map = d3.select("#mapa")
                    .append("svg")
                    .attr("width", wmap)
                    .attr("height", hmap);
            var projectionCan = d3.geo.mercator()
                    .translate([650, 1080])
                    .scale(2000);
            var pathCan = d3.geo.path()
                    .projection(projectionCan);
            var mapCan = d3.select("#canarias")
                    .append("svg")
                    .attr("width", wCan)
                    .attr("height", hCan);
            var div = d3.select("body")
                    .append("div")
                    .attr("class", "tooltip")
                    .attr("opacity", 0);
            function search() {
                var tipoDispositivo = navigator.userAgent.toLowerCase();
                if (tipoDispositivo.search(/iphone|ipod|ipad|android/) > -1) {
                    dispositivo = "click";
                }
                else {
                    dispositivo = "mouseover";
                }
            }
            var state = map.selectAll("#mapa path")
                    .data(json.features)
                    .enter()
                    .append("path")
                    .attr("class", "path")
                    .attr("d", path)
                    .attr("id", function(d, i) {
                        return i;
                    })
                    .style("fill", function(d, i) {
                        //Get data value
                        var value = casosComunidades[comunidades[i]];
                        if (value) {
                            return getColor(value);
                        } else {
                            return "#EEDBBB";
                        }
                    })
                    .attr("stroke", "black")
                    .attr("stroke-width", .4)
                    .on("mousemove", function(d) {
                        div.style("opacity", 1);
                        div.html("Implicados en casos de corrupción en " + comunidades[this.id] + ": " + casosComunidades[comunidades[this.id]])
                                .style("left", function() {
                                    if (d3.event.pageX > 800) {
                                        return d3.event.pageX - 170 + "px";
                                    } else {
                                        return d3.event.pageX + 10 + "px";
                                    }
                                })
                                .style("top", d3.event.pageY + 10 + "px");
                        // cambioNombre.html("");
                        //cambioNombre.append("text").html(data[this.id].CCAA);

                        total(this.id);
                        calculoCondenados(this.id);
                        totalPrision(this.id);
                    })
                    .on("click", function() {
                        buscar(comunidades[this.id], 'CCAA');
                    })
                    .on("mouseout", function() {
                        cambioTotal.html("");
                        cambioCondenados.html("");
                        cambioEncarcelados.html("");
                        cambioTotal.append("text").html(total(20));
                        cambioCondenados.append("text").html(calculoCondenados(20));
                        cambioEncarcelados.append("text").html(totalPrision(20));
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
                    .style("fill", function(d, i) {
                        //Get data value
                        var value = casosComunidades[comunidades[4]];
                        if (value) {
                            //If value exists…
                            return getColor(value);
                        } else {
                            //If value is undefined…
                            return "#EEDBBB";
                        }
                    })
                    .attr("stroke", "black")
                    .attr("stroke-width", 0.4)
                    .attr("id", "4")
                    .on("click", function() {
                        buscar(comunidades[this.id], 'CCAA');
                    })
                    .on("mousemove", function(d) {

                        div.style("opacity", 1);
                        div.html("Casos de corrupción en " + comunidades[this.id] + ": " + casosComunidades[comunidades[this.id]])
                                .style("left", function() {
                                    if (d3.event.pageX > 800) {
                                        return d3.event.pageX - 170 + "px";
                                    } else {
                                        return d3.event.pageX + 10 + "px";
                                    }
                                })
                                .style("top", d3.event.pageY + 10 + "px");
                        total(this.id);
                        calculoCondenados(this.id);
                        totalPrision(this.id);
                    })
                    .on("mouseout", function() {
                        cambioTotal.html("");
                        cambioCondenados.html("");
                        cambioEncarcelados.html("");
                        cambioTotal.append("text").html(total(20));
                        cambioCondenados.append("text").html(calculoCondenados(20));
                        cambioEncarcelados.append("text").html(totalPrision(20));
                        return div
                                .style("opacity", 0);

                    });
        });
    }); //fin funcion datos

}); //fin funcion datos corrupcion


