
//LABELS

//MONTH LABEL & DATA BEGINNING
const extractMonthFromDate = (string) => {

    let month = string.substring(string.indexOf(".") + 1, string.lastIndexOf("."))

    return month
}

months = {
    names: undefined,
    count: undefined
}

const yearDataLine = (data, userOrBot) => {

    let monthsNumName = []
    let monthsNumMsg = []
    let monthCount = -1 

    let currentMonth = undefined

    for (i in data) {
        if (currentMonth === extractMonthFromDate(data[i]._date)) {
            
            monthsNumMsg[monthCount] += data[i].messages[userOrBot]

        } else {
            monthsNumName.push(extractMonthFromDate(data[i]._date))
            monthsNumMsg.push(data[i].messages[userOrBot])
            currentMonth = (extractMonthFromDate(data[i]._date))
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
        months.names = monthsFullName.reverse();
    }

    return monthsNumMsg.reverse();

}

const yearLabelLine = () => {
    return months.names
}

// MONTH LABEL & DATA END

// WEEK LABEL BEGINNING
const weekLabelLine = (data) => {
    let dates = []

    for (let i = 0; i < 31; i++) {
        dates.unshift(data[i]._date.slice(0, -5))
      }

    return dates
}
// WEEK LABEL END

// WEEK DATA BEGINNING
const weekDataLine = (data, userOrBot) => {
    let array = []

    for (let i = 0; i < 31; i++) {
        userOrBot === "user" ? array.unshift(data[i].messages.userMsgCount) : array.unshift(data[i].messages.bot);
      }

    return array
}
// WEEK DATA END

module.exports = { yearDataLine, yearLabelLine, weekDataLine, weekLabelLine };
