const validate_fname = () => {
    const fname = document.getElementById("fname").value;
    if (fname.includes(" ")){
        document.getElementById("fnameErr").
        innerText = "Spaces are not allowed!"
    } else if (parseInt(fname) == NaN){
        document.getElementById("fnameErr").
        innerText = "Numbers are not allowed!"
    } else{
        document.getElementById("fnameErr").innerText = ""
    }
}

const validate_lname = () => {
    const lname = document.getElementById("lname").value;
    if (lname.includes(" ")){
        document.getElementById("lnameErr").
        innerText = "Spaces are not allowed!"
    } else if (parseInt(lname) == NaN){
        document.getElementById("fnameErr").
        innerText = "Numbers are not allowed!"
    } else{
        document.getElementById("lnameErr").innerText = ""
    }
}

const validate_phone = () => {
    const phone = document.getElementById("phone").value;
    if (parseInt(phone).length != phone.length){
        console.log(parseInt(phone).toString().length + phone.length)
        document.getElementById("phoneErr").
        innerText = "Only Integers are Allowed"
    } else if(phone.length != 10){
        document.getElementById("phoneErr").
        innerText = "Only 10 Digits are Allowed"
    } else{
        document.getElementById("phoneErr").innerText = ""
    }
}