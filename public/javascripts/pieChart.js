var pieChartObject = document.getElementById("pieChart");

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

const pieParagraphDateChanger = (time, numberOfDays) => {

    let timeSpan

    switch (time) {
        case "today":
            timeSpan = `Am <b>${pieToday}</b>`
            break;
        case "week":
            timeSpan = `Von <b>${pieToday}</b> bis <b>${pieWeekAgo}</b>`
            break;
        case "month":
            timeSpan = `Von <b>${pieToday}</b> bis <b>${pieMonthAgo}</b>`
            break;
    }

    let userCount

    switch (numberOfDays) {
        case 1:
            userCount = todayLabelPie.length
            break;
        case 7:
            userCount = pieUserCountWeek
            break;
        case 31:
            userCount = pieUserCountMonth
            break;
    }

    document.getElementById("paragraphPie").innerHTML = `${timeSpan}\nwurden Daten von\n<b> insgesamt ${userCount}</b> Nutzern\ngesammelt und ausgewertet.`;

}

pieParagraphDateChanger("today", 1)

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
    options: {
        maintainAspectRatio: false,
        responsive: true,
        aspectRatio: 1|1,
        legend: {
            position: "right",
        },
        title: {
            display: true,
            text: `Nutzerdaten vom ${pieToday}`,
            fontSize: 20,
            padding: -50,
            fullWidth: false,
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

//BUTTON INTERACTION

const pieButtonClick = (label, numberOfDays) => {

        if (numberOfDays === 1) {
            
            todayLabelPie.forEach(element => {
                pieChart.data.labels.push(element)
            })
            
            // update Datas
            todayDataPie.forEach(element => {
                pieChart.data.datasets.at(0).data.push(element)
            }) 

        } else if (numberOfDays === 7) {

            // update Labels
            weekLabelPie.forEach(element => {
                pieChart.data.labels.push(element)
            })
            
            // update Datas
            weekDataPie.forEach(element => {
                pieChart.data.datasets.at(0).data.push(element)
            }) 
        } else if (numberOfDays === 31) {
            // update Labels
            monthLabelPie.forEach(element => {
                pieChart.data.labels.push(element)
            })
            
            // update Datas
            monthDataPie.forEach(element => {
                pieChart.data.datasets.at(0).data.push(element)
            }) 
        }
        // Change Text on Button
        buttonPie.textContent = label

}

var buttonPie = document.getElementById("timeScalePie");
buttonPie.onclick = function(){

    pieChart.data.labels.splice(0, pieChart.data.labels.length)
    pieChart.data.datasets.at(0).data.splice(0, pieChart.data.datasets.at(0).data.length)

    if (buttonPie.textContent == "Woche") {

        pieButtonClick("Monat", 7)
        pieParagraphDateChanger("week", 7)
        pieChart.options.title.text = `Nutzerdaten von ${pieToday} bis ${pieWeekAgo}`

    } else if (buttonPie.textContent == "Monat") {
        
        pieButtonClick("Heute", 31)
        pieParagraphDateChanger("month", 31)
        pieChart.options.title.text = `Nutzerdaten von ${pieToday} bis ${pieMonthAgo}`

    } else if (buttonPie.textContent == "Heute") {

        pieButtonClick("Woche", 1)
        pieParagraphDateChanger("today", 1)
        pieChart.options.title.text = `Nutzerdaten vom ${pieToday}`
    }


    pieChart.update()
}