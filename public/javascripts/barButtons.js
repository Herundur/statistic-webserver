const yearBarButton = document.getElementById("yearBarButton");
const monthBarButton = document.getElementById("monthBarButton");

monthBarButton.disabled = true;

const clearBarChart = () => {
    barChart.data.labels.splice(0, barChart.data.labels.length)
    barChart.data.datasets.at(0).data.splice(0, barChart.data.datasets.at(0).data.length)
    barChart.data.datasets.at(1).data.splice(0, barChart.data.datasets.at(1).data.length)
}

const addContentBarChart = (labelArray, userDataArray, botDataArray) => {
    
    labelArray.forEach(element => {
        barChart.data.labels.push(element)
    })

    userDataArray.forEach(element => {
        barChart.data.datasets.at(0).data.push(element)
    })

    botDataArray.forEach(element => {
        barChart.data.datasets.at(1).data.push(element)
    }) 
}

const lineParagraphDateChanger = (time, UserMsgArray) => {

    let text

    switch (time) {
        case "month":
            text = `Am <b>${lineDate}</b> wurde mit\n<b>${lineCount}</b> Nutzer-Nachrichten\nam meisten versendet.`
            break;
        case "year":
            text = `Im <b>${yearLabelLine.at(UserMsgArray.indexOf(UserMsgArray.reduce((a, b) => Math.max(a, b), -Infinity)))}</b> wurden mit\n<b>${UserMsgArray.reduce((a, b) => Math.max(a, b), -Infinity)}</b> Nutzer-Nachrichten\nam meisten versendet.`
            break;
    }

    barParagraph.innerHTML = text;
    
}
lineParagraphDateChanger("month")

const blurAndChangeBarParagraph = (time) => {

    const animationDuration = 0.75 * 1000;

    barParagraph.classList.add("blur");
    lineParagraphDateChanger(time, yearUserDataLine);
    setTimeout(function() {barParagraph.classList.remove("blur")}, animationDuration);

}

monthBarButton.onclick = function(){

    monthBarButton.disabled = true;
    yearBarButton.disabled = false;

    clearBarChart();

    addContentBarChart(weekLabelLine, weekUserDataLine, weekBotDataLine);

    barChart.update();

    blurAndChangeBarParagraph("month");
}

yearBarButton.onclick = function(){


    monthBarButton.disabled = false;
    yearBarButton.disabled = true;

    clearBarChart();

    addContentBarChart(yearLabelLine, yearUserDataLine, yearBotDataLine);

    barChart.update();

    blurAndChangeBarParagraph("year");
}