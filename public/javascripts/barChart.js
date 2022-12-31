var barChartObject = document.getElementById("lineChart");

let data = JSON.parse(document.currentScript.getAttribute("data")).data

const getMonth = (string) => {

    let month = string.substring(string.indexOf(".") + 1, string.lastIndexOf("."))

    return month
}

months = {
    names: undefined,
    count: undefined
}

const msgPerMonth = (userOrBot) => {

    let monthsNumName = []
    let monthsNumMsg = []
    let monthCount = -1 

    let currentMonth = undefined

    for (i in data) {

        if (currentMonth === getMonth(data[i]._date)) {

            monthsNumMsg[monthCount] += data[i].messages[userOrBot]

        } else {
            monthsNumName.unshift(getMonth(data[i]._date))
            monthsNumMsg.unshift(data[i].messages[userOrBot])
            currentMonth = (getMonth(data[i]._date))
            monthCount++
        }

        if (monthsNumName.length > 12) {
            monthsNumName.shift()
            break;
        }

    }
    
    if (months.names === undefined) {
        let monthsFullName = []

        for (i in monthsNumName) {
            switch(monthsNumName[i]) {
                case "1": monthsFullName.push("Januar"); break;
                case "2": monthsFullName.push("Februar"); break;
                case "3": monthsFullName.push("März"); break;
                case "4": monthsFullName.push("April"); break;
                case "5": monthsFullName.push("Mai"); break;
                case "6": monthsFullName.push("Juni"); break;
                case "7": monthsFullName.push("Juli"); break;
                case "8": monthsFullName.push("August"); break;
                case "9": monthsFullName.push("September"); break;
                case "10": monthsFullName.push("Oktober"); break;
                case "11": monthsFullName.push("November"); break;
                case "12": monthsFullName.push("Dezember"); break;
            }
        }
        months.names = monthsFullName
    }

    return monthsNumMsg

}

const removeYear = () => {
    let dates = []

    for (let i = 0; i < 7; i++) {
        dates.unshift(data[i]._date.slice(0, -5))
      }

    return dates
}

const msgCountArray = (userOrBot) => {
    let array = []

    for (let i = 0; i < 7; i++) {
        userOrBot === "user" ? array.unshift(data[i].messages.userMsgCount) : array.unshift(data[i].messages.bot);
      }

    return array
}

let lineDate = JSON.parse(document.currentScript.getAttribute("lineDate")).lineDate
let lineCount = JSON.parse(document.currentScript.getAttribute("lineCount")).lineCount

const lineParagraphDateChanger = (time, UserMsgArray) => {

    let text

    switch (time) {
        case "week":
            text = `Am <b>${lineDate}</b> wurde mit\n<b>${lineCount}</b> Nutzer-Nachrichten\nam meisten versendet.`
            break;
        case "year":
            text = `Im <b>${months.names.at(UserMsgArray.indexOf(UserMsgArray.reduce((a, b) => Math.max(a, b), -Infinity)))}</b> wurden mit\n<b>${UserMsgArray.reduce((a, b) => Math.max(a, b), -Infinity)}</b> Nutzer-Nachrichten\nam meisten versendet.`
            break;
    }

    document.getElementById("paragraphLine").innerHTML = text;

}

lineParagraphDateChanger("week")

//CHART LAYOUT
var barChart = new Chart(barChartObject, {
    type: "line",
    data: {
        labels: removeYear(),
        datasets: [
        {
            label: "Bot-Nachrichten",
            backgroundColor: "rgba(128,36,193,0.25)",
            borderColor: "rgba(128,36,193,1)",
            pointBackgroundColor: "rgba(128,36,193,1)",
            pointBorderColor: "rgba(30,30,30,1)",
            pointBorderWidth: 1.25,
            data: msgCountArray("bot"), 
        },
        {
            label: "Nutzer-Nachrichten",
            backgroundColor: "rgba(66,136,8,0.25)",
            borderColor: "rgba(66,136,8,1)",
            pointBackgroundColor: "rgba(66,136,8,1)",
            pointBorderColor: "rgba(30,30,30,1)",
            pointBorderWidth: 1.25,
            data: msgCountArray("user"), 
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
                    fontSize: 15,
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

//BUTTON INTERACTION
var buttonLine = document.getElementById("timeScaleLine");

buttonLine.onclick = function(){

    barChart.data.labels.splice(0, barChart.data.labels.length)
    barChart.data.datasets.at(0).data.splice(0, barChart.data.datasets.at(0).data.length)
    barChart.data.datasets.at(1).data.splice(0, barChart.data.datasets.at(1).data.length)

    if (buttonLine.textContent == "Jahr") {

        buttonLine.textContent = "Woche"

        const userMsgArray = msgPerMonth("userMsgCount")
        const botMsgArray = msgPerMonth("bot")

        lineParagraphDateChanger("year", userMsgArray)

        months.names.forEach(element => {
            barChart.data.labels.push(element)
        })

        userMsgArray.forEach(element => {
            barChart.data.datasets.at(1).data.push(element)
        })

        botMsgArray.forEach(element => {
            barChart.data.datasets.at(0).data.push(element)
        }) 

    } else if (buttonLine.textContent == "Woche") {

        buttonLine.textContent = "Jahr"

        lineParagraphDateChanger("week")

        removeYear().forEach(element => {
            barChart.data.labels.push(element)
        })

        msgCountArray("user").forEach(element => {
            barChart.data.datasets.at(1).data.push(element)
        })

        msgCountArray("bot").forEach(element => {
            barChart.data.datasets.at(0).data.push(element)
        }) 

    }

    barChart.update()
}