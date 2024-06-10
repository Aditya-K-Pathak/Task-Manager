const heroHeading = "Task Manager".toUpperCase();
const heroDescription = "Manage your tasks with ease".toUpperCase();
const speed = 100;
var i = 0,
  j = 0;

const username = localStorage.getItem("username");
const password = localStorage.getItem("password");

const writeHeading = () => {
  if (i < heroHeading.length) {
    document.getElementById("heading").innerHTML += heroHeading[i];
    i++;
    setTimeout(writeHeading, speed);
  }
};

const writeDescription = () => {
  if (j < heroDescription.length) {
    document.getElementById("heading-description").innerHTML +=
      heroDescription.charAt(j);
    j++;
    setTimeout(writeDescription, speed);
  }
};

const getSummary = async () => {
  await fetch(
    `http://localhost:8080/get-task-summary/?username=${username}&password=${password}`,
    {
      method: "POST",
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      var xValues = [
        "Received Tasks",
        "Complete Tasks",
        "Incomplete Tasks",
      ];
      var yValues = [res.totalReceivedTasks, res.totalCompleteTasks, res.totalIncompleteTasks];
      var barColors = ["#b91d47", "#00aba9", "#2b5797", "#e8c3b9", "#1e7145"];

      new Chart("myChart", {
        type: "doughnut",
        data: {
          labels: xValues,
          datasets: [
            {
              backgroundColor: barColors,
              data: yValues,
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: "Completion/ Incompletion Ratio",
          },
        },
      });
      var xValues = [
        "Complete Tasks",
        "Incomplete Tasks",
      ];
      var yValues = [res.totalHighPriorityCompleteTasks, res.totalHighPriorityIncompleteTasks];
      var barColors = ["#b91d47", "#00aba9", "#2b5797", "#e8c3b9", "#1e7145"];

      new Chart("myChart1", {
        type: "doughnut",
        data: {
          labels: xValues,
          datasets: [
            {
              backgroundColor: barColors,
              data: yValues,
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: "High Priority Tasks",
          },
        },
      });
      var yValues = [res.totalLowPriorityCompleteTasks, res.totalLowPriorityIncompleteTasks];
      var barColors = ["#b91d47", "#00aba9", "#2b5797", "#e8c3b9", "#1e7145"];

      new Chart("myChart2", {
        type: "doughnut",
        data: {
          labels: xValues,
          datasets: [
            {
              backgroundColor: barColors,
              data: yValues,
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: "High Priority Tasks",
          },
        },
      });
    });
};

writeHeading();
writeDescription();
getSummary();
