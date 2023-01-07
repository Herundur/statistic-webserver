const todayPieButton = document.getElementById("todayPieButton");
const weekPieButton = document.getElementById("weekPieButton");
const monthPieButton = document.getElementById("monthPieButton");

todayPieButton.disabled = true;

const clearPieChart = () => {
    pieChart.data.labels.splice(0, pieChart.data.labels.length)
    pieChart.data.datasets.at(0).data.splice(0, pieChart.data.datasets.at(0).data.length)
}

const addContentPieChart = (labelArray, userDataArray) => {
    
    labelArray.forEach(element => {
        pieChart.data.labels.push(element)
    })
    
    userDataArray.forEach(element => {
        pieChart.data.datasets.at(0).data.push(element)
    }) 

}

const pieParagraphDateChanger = (time) => {

    let timeSpan
    let userCount

    switch (time) {
        case "today":
            timeSpan = `Am <b>${pieToday}</b>`;
            userCount = todayLabelPie.length
            break;
        case "week":
            timeSpan = `Von <b>${pieToday}</b> bis <b>${pieWeekAgo}</b>`
            userCount = pieUserCountWeek;
            break;
        case "month":
            timeSpan = `Von <b>${pieToday}</b> bis <b>${pieMonthAgo}</b>`
            userCount = pieUserCountMonth;
            break;
    }

    pieParagraph.innerHTML = `${timeSpan}\nwurden Daten von\n<b> insgesamt ${userCount}</b> Nutzern\ngesammelt und ausgewertet.`;

}
pieParagraphDateChanger("today")

const blurAndChangePieParagraph = (time) => {

    const animationDuration = 0.75 * 1000;

    pieParagraph.classList.add("blur");
    pieParagraphDateChanger(time);
    setTimeout(function() {pieParagraph.classList.remove("blur")}, animationDuration);

}

todayPieButton.onclick = function(){

    todayPieButton.disabled = true;
    weekPieButton.disabled = false;
    monthPieButton.disabled = false;

    clearPieChart();

    addContentPieChart(todayLabelPie, todayDataPie);
    pieChart.options.title.text = `Nutzerdaten vom ${pieToday}`

    pieChart.update();

    blurAndChangePieParagraph("today");
}

weekPieButton.onclick = function(){

    todayPieButton.disabled = false;
    weekPieButton.disabled = true;
    monthPieButton.disabled = false;

    clearPieChart();

    addContentPieChart(weekLabelPie, weekDataPie);
    pieChart.options.title.text = `Nutzerdaten von ${pieToday} bis ${pieWeekAgo}`

    pieChart.update();

    blurAndChangePieParagraph("week");
}

monthPieButton.onclick = function(){

    todayPieButton.disabled = false;
    weekPieButton.disabled = false;
    monthPieButton.disabled = true;

    clearPieChart();

    addContentPieChart(monthLabelPie, monthDataPie);
    pieChart.options.title.text = `Nutzerdaten von ${pieToday} bis ${pieMonthAgo}`

    pieChart.update();

    blurAndChangePieParagraph("month");
}