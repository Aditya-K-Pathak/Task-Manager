const heroHeading = "Task Manager".toUpperCase();
const heroDescription = "Manage your tasks with ease".toUpperCase();
const speed = 100;
var i = 0, j = 0;

const username = localStorage.getItem("username");
const password = localStorage.getItem("password");

const getAllTasks = () => {
  fetch(
    `http://localhost:8080/get-all-tasks/?username=${username}&password=${password}`,
    
  )
   .then((response) => {
      return response.json();
    })
}
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
      var xValues = ["Received Tasks", "Complete Tasks", "Incomplete Tasks"];
      var yValues = [
        res.totalReceivedTasks,
        res.totalCompleteTasks,
        res.totalIncompleteTasks,
      ];
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
      var xValues = ["Complete Tasks", "Incomplete Tasks"];
      var yValues = [
        res.totalHighPriorityCompleteTasks,
        res.totalHighPriorityIncompleteTasks,
      ];
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
      var yValues = [
        res.totalLowPriorityCompleteTasks,
        res.totalLowPriorityIncompleteTasks,
      ];
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
  var lineChart = document.getElementById("line-chart").getContext("2d");

  // line chart options
  var options = {
    borderWidth: 2,
    cubicInterpolationMode: "monotone", // make the line curvy over zigzag
    pointRadius: 2,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: "#fff",
    pointHoverBorderWidth: 4,
  };

  // create linear gradients for line chart
  var gradientOne = lineChart.createLinearGradient(
    0,
    0,
    0,
    lineChart.canvas.clientHeight
  );
  gradientOne.addColorStop(0, "rgba(51, 169, 247, 0.3)");
  gradientOne.addColorStop(1, "rgba(0, 0, 0, 0)");

  var gradientTwo = lineChart.createLinearGradient(
    0,
    0,
    0,
    lineChart.canvas.clientHeight
  );
  gradientTwo.addColorStop(0, "rgba(195, 113, 239, 0.15)");
  gradientTwo.addColorStop(1, "rgba(0, 0, 0, 0)");

  new Chart(lineChart, {
    type: "line",
    data: {
      labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Spending",
          data: [310, 300, 370, 295, 350, 300, 230, 290],
          ...options,
          borderColor: "#c371ef",
          fill: "start",
          backgroundColor: gradientTwo,
        },
        {
          label: "Emergency",
          data: [150, 230, 195, 260, 220, 300, 320, 490],
          ...options,
          borderColor: "#33a9f7",
          fill: "start",
          backgroundColor: gradientOne,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false, // hide display data about the dataset
        },
        tooltip: {
          // modify graph tooltip
          backgroundColor: "rgba(53, 27, 92, 0.8)",
          caretPadding: 5,
          boxWidth: 5,
          usePointStyle: "triangle",
          boxPadding: 3,
        },
      },
      scales: {
        x: {
          grid: {
            display: false, // set display to false to hide the x-axis grid
          },
          beginAtZero: true,
        },
        y: {
          ticks: {
            callback: function (value, index, values) {
              return "$ " + value; // prefix '$' to the dataset values
            },
            stepSize: 100,
          },
        },
      },
    },
  });
};

writeHeading();
writeDescription();
getSummary();

// var cc = {
//   count: 0,
//   function () {
//     this.count++;
//     console.log(this.count);
//   }
// }

// cc.function();
// cc.function();