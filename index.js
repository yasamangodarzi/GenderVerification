const form = document.getElementById("formSubmitName");
let userName = document.getElementById("userName");
let regx_char = /^[a-zA-Z\s]*$/;
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    document.getElementsByClassName("resulteCash").innerHTML.value =''

    if (userName.length > 255) {
        alert('اسم کاربر طولانی است')
        return
    }
    console.log(userName.length)

    let name = userName.value;

    if (!regx_char.test(name)) {
        alert('لطفا تنها از حروف انگلیسی استفاده کنید')
        return
    }
    let storedUserName = localStorage.getItem(name);
    if (storedUserName) {
        let storedData = JSON.parse(storedUserName);
        document.getElementById("name").innerHTML =storedData?.name
        document.getElementById("probability").innerHTML =storedData?.probability
        document.getElementsByClassName("resulteCash").innerHTML.value ='Saved Answer'
    } else {
    try {
        let urlApi = `https://api.genderize.io/?name=${name}`
        fetch(urlApi)
        .then(response => {
            if (!response.ok) {
                alert('Network response was not ok');
            }
            return response.json();
          })
 
        if (Object?.keys(resonse)) {
            resonseUserName = resonse
            document.getElementById("name").innerHTML =resonse?.name
            document.getElementById("probability").innerHTML =resonse?.probability
        }

    } catch {
        alert('error server')
    }
}

});

const saveUserName =()=>{
    let gender 
    var male_checked = document.getElementById('Male').checked;
    var female_checked = document.getElementById('Female').checked;
    if (male_checked) {
       gender = 'Male'
    } else if (female_checked) {
       gender = 'Female'
    } else {
      gender = resonseUserName?.gender
    } 
    resonseUserName.gender = gender
    let data = JSON.stringify(resonseUserName)
    localStorage.setItem(resonseUserName?.name, data);
}
const ClearCash =() =>{
    userName = document.getElementById("name").innerHTML
    localStorage.removeItem(userName);
    document.getElementsByClassName("resulteCash").innerHTML.value =''
}