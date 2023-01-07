var pieChartObject = document.getElementById("pieChart");
var pieParagraph = document.getElementById("paragraphPie");

//DATA FOR PIE CHART
let todayDataPie = JSON.parse(document.currentScript.getAttribute("todayDataPie")).todayDataPie
let todayLabelPie = JSON.parse(document.currentScript.getAttribute("todayLabelPie")).todayLabelPie
let weekDataPie = JSON.parse(document.currentScript.getAttribute("weekDataPie")).weekDataPie
let weekLabelPie = JSON.parse(document.currentScript.getAttribute("weekLabelPie")).weekLabelPie
let monthDataPie = JSON.parse(document.currentScript.getAttribute("monthDataPie")).monthDataPie
let monthLabelPie = JSON.parse(document.currentScript.getAttribute("monthLabelPie")).monthLabelPie

//DATA FOR PIE PARAGRAPH
let pieToday = JSON.parse(document.currentScript.getAttribute("pieToday")).pieToday
let pieWeekAgo = JSON.parse(document.currentScript.getAttribute("pieWeekAgo")).pieWeekAgo
let pieMonthAgo = JSON.parse(document.currentScript.getAttribute("pieMonthAgo")).pieMonthAgo
let pieUserCountWeek = JSON.parse(document.currentScript.getAttribute("pieUserCountWeek")).pieUserCountWeek
let pieUserCountMonth = JSON.parse(document.currentScript.getAttribute("pieUserCountMonth")).pieUserCountMonth

//CHART LAYOUT
var pieChart = new Chart(pieChartObject, {
    type: "doughnut",
    data: {
        labels: Array.from(todayLabelPie),
        datasets: [{
            label: "Nutzer-Nachrichten",
            borderColor: "#1E1E1E",
            backgroundColor: ["rgba(0, 255, 0, 0.5)","rgba(0, 240, 0, 0.5)","rgba(0, 225, 0, 0.5)","rgba(0, 210, 0, 0.5)","rgba(0, 195, 0, 0.5)","rgba(0, 180, 0, 0.5)","rgba(0, 165, 0, 0.5)","rgba(0, 150, 0, 0.5)","rgba(0, 135, 0, 0.5)","rgba(0, 120, 0, 0.5)","rgba(0, 105, 0, 0.5)","rgba(0, 90, 0, 0.5)","rgba(0, 75, 0, 0.5)","rgba(0, 60, 0, 0.5)"],
            data: Array.from(todayDataPie), 
        }]
    },
    overrides:{
        doughnut: {
            plugins: {
                legend: {

                },
            },
        },
    },
    options: {
        maintainAspectRatio: false,
        responsive: true,
        aspectRatio: 1|1,
        legend: {
            position: "top",
            labels: {
                usePointStyle: true,
            },
        },
        title: {
            display: true,
            text: `Nutzerdaten vom ${pieToday}`,
            fontSize: 20,
        },
        scales: {
            yAxes: [{
                display: false,
                gridLines: {
                    display:false
                }
            }],
            yAxes: [{
                display: false,
                ticks: {
                    beginAtZero: true
                },
                gridLines: {
                    display:false
                }
            }]
        }
    }
})