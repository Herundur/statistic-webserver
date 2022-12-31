var pieChartObject = document.getElementById("pieChart");

const sortUserObj = (days) => {

    userObj = {}
    days > data.length ? days = data.length : days
 
    for (let i = 0; i < days; i++) {

        for (const [key, value] of Object.entries(data[i].messages.user)) {

            userObj[`${key}`] === undefined ? userObj[`${key}`] = value : userObj[`${key}`] += value

          }
      }

    const sortedUserObj = Object.fromEntries(
        Object.entries(userObj).sort(([,a],[,b]) => b-a)
        );

    return sortedUserObj
}

pieChartArrays = {
    label: undefined,
    data: undefined,
    labelToday: [],
    dataToday: [],
}

const userObjToArrayToday = () =>{

    for (const [key, value] of Object.entries(sortUserObj(1))) {
        pieChartArrays.labelToday.push(key)
        pieChartArrays.dataToday.push(value)
    }

}

const sortUserArray = (days) => {

    let valueSum = 0
    let currentValueSum = 0
    let diplayedUser = []
    let diplayedNum = []
    let remainingNum = 0

    for (const [key, value] of Object.entries(sortUserObj(days))) {
        valueSum += value
    }

    for (const [key, value] of Object.entries(sortUserObj(days))) {

        if (currentValueSum < (valueSum * 0.9)) {
            currentValueSum += value
            diplayedUser.push(key)
            diplayedNum.push(value)
        } else {
            remainingNum += value
        }
    }

    diplayedUser.push("Andere")
    diplayedNum.push(remainingNum)

    pieChartArrays.label = diplayedUser
    pieChartArrays.data = diplayedNum
}

const pieParagraphDateChanger = (time, numberOfDays) => {

    let timeSpan

    switch (time) {
        case "today":
            timeSpan = `Am <b>${data[0]._date}</b>`
            break;
        case "week":
            timeSpan = `Von <b>${data[0]._date}</b> bis <b>${data[6]._date}</b>`
            break;
        case "month":
            timeSpan = `Von <b>${data[0]._date}</b> bis <b>${data[13]._date}</b>`
            break;
    }

    document.getElementById("paragraphPie").innerHTML = `${timeSpan}\nwurden Daten von\n<b> insgesamt ${Object.keys(sortUserObj(numberOfDays)).length}</b> Nutzern\ngesammelt und ausgewertet.`;

}

userObjToArrayToday()
pieParagraphDateChanger("today", 1)
sortUserArray(1)
//CHART LAYOUT
var pieChart = new Chart(pieChartObject, {
    type: "doughnut",
    data: {
        labels: pieChartArrays.labelToday,
        datasets: [{
            label: "Nutzer-Nachrichten",
            borderColor: "#1E1E1E",
            backgroundColor: ["rgba(0, 255, 0, 0.5)","rgba(0, 240, 0, 0.5)","rgba(0, 225, 0, 0.5)","rgba(0, 210, 0, 0.5)","rgba(0, 195, 0, 0.5)","rgba(0, 180, 0, 0.5)","rgba(0, 165, 0, 0.5)","rgba(0, 150, 0, 0.5)","rgba(0, 135, 0, 0.5)","rgba(0, 120, 0, 0.5)","rgba(0, 105, 0, 0.5)","rgba(0, 90, 0, 0.5)","rgba(0, 75, 0, 0.5)","rgba(0, 60, 0, 0.5)"],
            data: pieChartArrays.dataToday, 
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
            text: `Nutzerdaten vom ${data[0]._date}`,
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
            
            // First cleart Array
            pieChartArrays.labelToday = []
            pieChartArrays.dataToday = []
        
            userObjToArrayToday()

            pieChartArrays.labelToday.forEach(element => {
                pieChart.data.labels.push(element)
            })
            
            // update Datas
            pieChartArrays.dataToday.forEach(element => {
                pieChart.data.datasets.at(0).data.push(element)
            }) 

        } else if (numberOfDays !== 1) {
            sortUserArray(numberOfDays)

            // update Labels
            pieChartArrays.label.forEach(element => {
                pieChart.data.labels.push(element)
            })
            
            // update Datas
            pieChartArrays.data.forEach(element => {
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
        pieChart.options.title.text = `Nutzerdaten von ${data[0]._date} bis ${data[6]._date}`

    } else if (buttonPie.textContent == "Monat") {
        
        pieButtonClick("Heute", 31)
        pieParagraphDateChanger("month", 31)
        pieChart.options.title.text = `Nutzerdaten von ${data[0]._date} bis ${data[13]._date}`

    } else if (buttonPie.textContent == "Heute") {

        pieButtonClick("Woche", 1)
        pieParagraphDateChanger("today", 1)
        pieChart.options.title.text = `Nutzerdaten vom ${data[0]._date}`
    }


    pieChart.update()
}