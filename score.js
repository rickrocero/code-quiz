//get the local scoreList data
var scoreList = JSON.parse(localStorage.getItem("scoreList"));

//construct a template literal
var template = "";

for (var i = 0; i < scoreList.length; i++) {
    template += `
        <li class="score-item">
            <span>Player: ${scoreList[i].user}</span>
            <span>Score: ${scoreList[i].score}</span>
        </li>
    `;
}

//conver the template into html and insert into page
document.querySelector(".score-list").innerHTML = template;