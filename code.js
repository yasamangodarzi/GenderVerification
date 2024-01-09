// define variable
const form = document.getElementById("formSubmitName");
let userName = document.getElementById("userName");
let regx_char = /^[a-zA-Z\s]*$/;
let resonseUserName = {}

// this function use for submit data
// first we search in local storge 
// if we can not find it we featch api 
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    document.getElementsByClassName("resulteCash")[0].value =''

    if (userName.value.length > 255) {
        showError(
            'flex',
             'اسم کاربر طولانی است'
            )
        return
    }

    let name = userName.value;

    if (!regx_char.test(name)) {
        showError(
            'flex',
            'لطفا تنها از حروف انگلیسی استفاده کنید'
            )
        return
       
    }

    let storedUserName = localStorage.getItem(name);

    console.log('storedUserName' , storedUserName)
    if (storedUserName) {
        let storedData = JSON.parse(storedUserName);
        document.getElementById("gender").innerHTML =storedData?.gender
        document.getElementById("probability").innerHTML =storedData?.probability
        document.getElementsByClassName("resulteCash")[0].value ='Saved Answer'
    } else {
    try {
        let urlApi = `https://api.genderize.io/?name=${name}`
        fetch(urlApi)
        .then(response => {
            if (!response?.ok) {
                showError(
                    'flex',
                     'اسم کاربر موجود نیست'
                    );
            }
            return response.json();
          })
          .then((resonse)=>{
              if (Object?.keys(resonse)) {
                  resonseUserName = resonse
                  document.getElementById("gender").innerHTML =resonse?.gender
                  document.getElementById("probability").innerHTML =resonse?.probability
              }
          })
 
    } catch {
        showError(
            'flex',
             'ارتباط با سرور ممکن نیست'
            );
    }
}

});
//we save name and gender in local storage
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


    let data = JSON.stringify({
        ...resonseUserName,
        gender:gender
    })

    localStorage.setItem(resonseUserName?.name, data);
}
// we clear local storage and result cash
const clearCash =() =>{
   
    localStorage.removeItem(userName.value);
    document.getElementsByClassName("resulteCash")[0].value =''
    document.getElementById("gender").innerHTML =''
    document.getElementById("probability").innerHTML =''
}
// we define error handler
function showError(display , textError){
    let elem  = document.getElementById('alertError')
    let elemText  = document.getElementById('textError')

     elem.style.display = display
     elemText.innerHTML = textError ? textError : ''

}
