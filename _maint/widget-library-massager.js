// Used to take real widget library data and change the api.endpoint to a fake chart 

let fs = require('fs')

let json = require('../src/Components/Dashboard/Wizard/widget-library.json')

console.log("json", json.length)

json.forEach(function(item, ndx){

    let fakeEndpoint = ""

    if(item.type === "LineChart") {
        fakeEndpoint = "/api/line-chart"
    }
    else if(item.type === "PieChart") {
        fakeEndpoint = "/api/pie-chart"
    }
    else if(item.type === "BarChartVertical") {
        fakeEndpoint = "/api/bar-chart-v"
    }
    else if(item.type === "BarChartHorizontal") {
        fakeEndpoint = "/api/bar-chart-h"
    }
    else if(item.type === "DoughnutChart") {
        fakeEndpoint = "/api/doughnut-chart"
    }
    else if(item.type.startsWith("Table")) {
        fakeEndpoint = "/api/table-chart"
    }
    else if(item.type.startsWith("BarLineMixed")) {
        fakeEndpoint = "/api/line-chart"
    }

    item.api.endpoint = fakeEndpoint;
})

fs.writeFile('../src/Components/Dashboard/Wizard/widget-library-hybrid.json', JSON.stringify(json, null, 2), function(err){
    if(err) {
    console.log("err:", err)
    process.exit()
    }
    else {
    console.log("success! wrote results")
    process.exit()
    }
});




