const heroHeading = "Task Manager".toUpperCase();
const heroDescription = "Manage your tasks with ease".toUpperCase();
const speed = 100;
var i = 0,
  j = 0;

const username = localStorage.getItem("username");
const password = localStorage.getItem("password");
var allTask = [];
const getAllTasks = () => {
  fetch(
    `http://localhost:8080/get-all-task/?username=${username}&password=${password}`
  )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      return (allTask = response);
    });
};
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
            text: "Low Priority Tasks",
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
getAllTasks();
getSummary();

var object = {};
setTimeout(() => {
  for (let i = 0; i < allTask.length; i++) {
    document.getElementById("tasklist").innerHTML += `
    <div class="task" id=${allTask[i].id}>
      <h2 id='${allTask[i].id}name'>${allTask[i].name}</h2>
      <h4 id='${allTask[i].id}timeline'>${allTask[i].id.slice(0, 10)} | ${
      allTask[i].deadline
    }</h4>
    `;
    if (allTask[i].priority)
      document.getElementById(
        allTask[i].id
      ).innerHTML += `<p id='${allTask[i].id}priority'>Priority: High</p>`;
    else
      document.getElementById(
        allTask[i].id
      ).innerHTML += `<p id='${allTask[i].id}priority'>Priority: Low</p>`;
    if (allTask[i].status)
      document.getElementById(
        allTask[i].id
      ).innerHTML += `<p id='${allTask[i].id}status'>Status: Completed</p>`;
    else
      document.getElementById(
        allTask[i].id
      ).innerHTML += `<p id='${allTask[i].id}status'>Status: Incomplete</p>`;
    document.getElementById(allTask[i].id).innerHTML += `
      <p id='${allTask[i].id}desc'>${allTask[i].desc}</p>
    </div>
    `;
    allTask[i].id = allTask[i].id.slice(0, 10);
    if (allTask[i].id in object == false) {
      object[allTask[i].id] = [0, 0];
    }
    object[allTask[i].id][0]++;
    if (allTask[i].status) object[allTask[i].id][1]++;
  }

  var taskdiv = document.getElementsByClassName("task");
  for (let i = 0; i < taskdiv.length; i++) {
    taskdiv[i].addEventListener("click", () => {
      document.getElementById("overlay").style.display = "block";
      if (i != 0) {
        document.getElementById("id").value = taskdiv[i].id;
        document.getElementById("taskname").value = document.getElementById(
          `${taskdiv[i].id}name`
        ).innerText;
        document.getElementById("deadline").value = document
          .getElementById(`${taskdiv[i].id}timeline`)
          .innerText.split(" | ")[1];
        document
          .getElementById(`${taskdiv[i].id}priority`)
          .innerText.includes("High") == true
          ? (document.getElementById("selectPriority").value = true)
          : (document.getElementById("selectPriority").value = false);
        document
          .getElementById(`${taskdiv[i].id}status`)
          .innerText.includes("Completed") == true
          ? (document.getElementById("selectStatus").value = true)
          : (document.getElementById("selectStatus").value = false);
        document.getElementById("taskdesc").value = document.getElementById(
          `${taskdiv[i].id}desc`
        ).innerText;
        document.getElementById("overlay").style.display = "flex";
      }
    });
  }
}, 100);

const disappear = () => {
  document.getElementById("overlay").style.display = "none";
};

const updateData = () => {
  var id = document.getElementById("id").value;
  var name = document.getElementById("taskname").value;
  var deadline = document.getElementById("deadline").value;
  var priority = document.getElementById("selectPriority").value;
  var status = document.getElementById("selectStatus").value;
  var desc = document.getElementById("taskdesc").value;

  fetch(
    `http://localhost:8080/update-task/id/?username=${localStorage.getItem(
      "username"
    )}&password=${localStorage.getItem(
      "password"
    )}&id=${id}&name=${name}&priority=${priority}&status=${status}&desc=${desc}&deadline=${deadline}`,
    {
      method: "POST",
    }
  ).then((res) => {
    if (res.ok) {
      alert("Database Updated!");
    }
    return res.json();
  });
};

const addData = () => {
  var id = document.getElementById("id").value;
  var name = document.getElementById("taskname").value;
  var deadline = document.getElementById("deadline").value;
  var priority = document.getElementById("selectPriority").value;
  var status = document.getElementById("selectStatus").value;
  var desc = document.getElementById("taskdesc").value;

  if (id != "") {
    return alert("Invalid Request!");
  }

  fetch(
    `http://localhost:8080/add-task/?username=${localStorage.getItem(
      "username"
    )}&password=${localStorage.getItem(
      "password"
    )}&name=${name}&priority=${priority}&status=${status}&desc=${desc}&deadline=${deadline}`,
    {
      method: "POST",
    }
  ).then((res) => {
    if (res.ok) {
      alert("Database Updated!");
    }
    return res.json();
  });
};

const deleteData = () => {
  document.getElementById("id").disabled = false;
  var id = document.getElementById("id").value;

  fetch(
    `http://localhost:8080/delete-task/id/?username=${localStorage.getItem(
      "username"
    )}&password=${localStorage.getItem("password")}&id=${id}`,
    {
      method: "POST",
    }
  ).then((res) => {
    if (res.ok) {
      alert("Database Updated!");
    }
    return res.json();
  });
};

// const reArrange = () => {
//   let high = [], low = [];
//   for (let i = 0; i < document.getElementsByClassName('task').length; i++) {
//     if (i == 0) continue
//     document.getElementsByClassName('task')[i].priority ? high.push(document.getElementsByClassName('task')[i]) : low.push(document.getElementsByClassName('task')[i]);
//   }
  
//   for (let i = 0; i < low.length; i ++){
//     console.log(low[i][0])
//   }
//   for (let i = 0; i < allTask.length; i++) {
//     if (i == 0) continue
//     high.length > 0 ? document.getElementsByClassName('task')[i] = high.pop(): document.getElementsByClassName('task')[i].innerHTML = low.pop();
//   }
// };
// setTimeout(() => {
//   reArrange()
// }, 1000)