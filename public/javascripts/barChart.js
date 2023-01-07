var barChartObject = document.getElementById("lineChart");
let barParagraph = document.getElementById("paragraphLine");

//DATA FOR LINE CHART
let weekUserDataLine = JSON.parse(document.currentScript.getAttribute("weekUserDataLine")).weekUserDataLine
let weekBotDataLine = JSON.parse(document.currentScript.getAttribute("weekBotDataLine")).weekBotDataLine
let weekLabelLine = JSON.parse(document.currentScript.getAttribute("weekLabelLine")).weekLabelLine
let yearUserDataLine = JSON.parse(document.currentScript.getAttribute("yearUserDataLine")).yearUserDataLine
let yearBotDataLine = JSON.parse(document.currentScript.getAttribute("yearBotDataLine")).yearBotDataLine
let yearLabelLine = JSON.parse(document.currentScript.getAttribute("yearLabelLine")).yearLabelLine

//DATA FOR LINE PARAGRAPH
let lineDate = JSON.parse(document.currentScript.getAttribute("lineDate")).lineDate
let lineCount = JSON.parse(document.currentScript.getAttribute("lineCount")).lineCount

//CHART LAYOUT
var barChart = new Chart(barChartObject, {
    type: "bar",
    data: {
        labels: Array.from(weekLabelLine),
        datasets: [
        {
            label: "Nutzer-Nachrichten",
            backgroundColor: "rgba(0, 225, 0, 0.5)",
            borderColor: "rgba(66,136,8,1)",
            pointBackgroundColor: "rgba(66,136,8,1)",
            pointBorderColor: "rgba(30,30,30,1)",
            pointBorderWidth: 1.25,
            data: Array.from(weekUserDataLine), 
        },
        {
            label: "Bot-Nachrichten",
            backgroundColor: "rgba(128,36,193,0.80)",
            borderColor: "rgba(128,36,193,1)",
            pointBackgroundColor: "rgba(128,36,193,1)",
            pointBorderColor: "rgba(30,30,30,1)",
            pointBorderWidth: 1.25,
            data: Array.from(weekBotDataLine), 
            hidden: true,
        },]
    },
    options: {
        maintainAspectRatio: false,
        responsive: true,
        aspectRatio: 1|1,
        elements: {
            line: {
                borderWidth: 4,
            },
            point: {
                radius: 7,
                pointStyle: "circle",
                backgroundColor: "rgba(66,136,8,1)",
                borderColor: "rgba(0,0,0,0)",
                borderWidth: 2,
            },
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    fontSize: 14,
                },
                gridLines: {
                    display:true
                }
            }],
            xAxes: [{
                ticks: {
                    fontSize: 13,
                },
                display: true,
                color: "rgba(66,136,8,1)",
                gridLines: {
                    display:false
                }
            }]
        },
        legend: {
            labels: {
                fontSize: 14,
                pointStyle: "circle",
                usePointStyle: true,
            }
        },
        title: {
            display: true,
            text: 'Verschickte Nachrichten pro Tag',
            fontSize: 20,
        }
    }      
})