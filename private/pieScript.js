const sumMessagesOfEveryUser = (days, data) => {
    
    userObj = {}
    days > data.length ? days = data.length : days

    for (let i = 0; i < days; i++) {
        //SUMS UP ALL MESSAGES FROM USER AND THEN MOVES TO THE NEXT USER 
        for (const [key, value] of data[i].messages.user) {

            userObj[`${key}`] === undefined ? userObj[`${key}`] = value : userObj[`${key}`] += value

          }
      }

    //SORT USERS BY SIZE
    const sortedUserObj = Object.fromEntries(
        Object.entries(userObj).sort(([,a],[,b]) => b-a)
        );

    return sortedUserObj

}

pieChartArrays = {
    label: [],
    data: [],
    labelToday: [],
    dataToday: [],
}

const sumMessagesOfEveryUserToday = (data) =>{
    
    for (const [key, value] of Object.entries(sumMessagesOfEveryUser(1, data))) {
        pieChartArrays.labelToday.push(key)
        pieChartArrays.dataToday.push(value)
    }

}

const sumsUpLast10Percent = (days, data) => {

    let valueSum = 0
    let currentValueSum = 0
    let diplayedUser = []
    let diplayedNum = []
    let remainingNum = 0

    for (const [key, value] of Object.entries(sumMessagesOfEveryUser(days, data))) {
        valueSum += value
    }

    for (const [key, value] of Object.entries(sumMessagesOfEveryUser(days, data))) {

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

const objectResetter = () => {
    pieChartArrays.dataToday = []
    pieChartArrays.labelToday = []
    pieChartArrays.label = []
    pieChartArrays.data = []
}

const todayDataPie = (data) => {
    objectResetter()
    sumMessagesOfEveryUserToday(data);
    return pieChartArrays.dataToday;
};

const todayLabelPie = (data) => {
    objectResetter()
    sumMessagesOfEveryUserToday(data);
    return pieChartArrays.labelToday;
};

const weekOrMonthDataPie = (data, days) => {
    objectResetter()
    sumsUpLast10Percent(days, data)
    return pieChartArrays.data
};

const weekOrMonthLabelPie = (data, days) => {
    objectResetter()
    sumsUpLast10Percent(days, data)
    return pieChartArrays.label
};

const weekOrMonthParagraphPie = (data, days) => {
    objectResetter()
    return Object.keys(sumMessagesOfEveryUser(days, data)).length
};

module.exports = { todayDataPie, todayLabelPie, weekOrMonthDataPie, weekOrMonthLabelPie, weekOrMonthParagraphPie }
