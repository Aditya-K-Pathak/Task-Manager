var signup = false;

const fetch_details = async () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;

  localStorage.setItem("username", username)
  localStorage.setItem("password",  password)
  localStorage.setItem("email",  email)

  document.getElementsByClassName("loader")[0].style.visibility = "visible";
  if (signup) {
    fetch(
      `http://localhost:8000/create-user/?username=${username}&password=${password}&email=${email}`,
      {
        method: "POST",
      }
    ).then((res) => {
      if (res.status == 200) {
        alert("User created successfully");

        fetch(
          `http://localhost:8080/create-task-file/?username=${username}&password=${password}`,
          {
            method: "GET",
          }
        ).then((res) => {
          if (res.status == 200) {
            alert("Task file created successfully");
          } else {
            alert("Task file creation failed");
          }
        });
      } else {
        alert("User creation failed");
      }
    });
  }
  document.getElementsByClassName("loader")[0].style.visibility = "hidden";

  const valid_user = await fetch(`http://localhost:8000/get-user/?username=${username}&password=${password}&email=${email}`, {
    method: "POST",
  })
  const isvalid = await valid_user.json()

  if (isvalid){
    const reponse = await fetch(`http://localhost:8080/get-all-task/?username=${username}&password=${password}`, {
        method: "GET",
      })
      const data = await reponse.json()
  } else{
    alert("Invalid Credentials!")
  }
};

const setSignUp = () => {
  signup = true;
  document.getElementsByTagName("h1")[0].innerText = "Sign up";
  document.getElementsByTagName("p")[0].innerHTML =
    "Already a Member? <button onclick='setLogin()'>Login</button>";
};

const setLogin = () => {
  signup = false;
  document.getElementsByTagName("h1")[0].innerText = "Login";
  document.getElementsByTagName("p")[0].innerHTML =
    "Not a Member? <button onclick='setSignUp()'>Sign up</button>";
};

const validateUsername = () => {
  let username = document.getElementById("username").value 
  if (username.length == 0) {
    document.getElementById("usernameErr").innerHTML = "Invalid Username"
  } else {
    document.getElementById("usernameErr").innerHTML = ""
  }
}

const validatePassword = () => {
  let password = document.getElementById("password").value 
  if (password.length <= 8) {
    document.getElementById("passwordErr").innerHTML = "Password it too short!"
  } else {
    document.getElementById("passwordErr").innerHTML = ""
  }
}