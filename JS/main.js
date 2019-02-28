const registerBtn = document.getElementById("registerButton");
const loginBtn = document.getElementById("loginButton");

function registerUser(){
    let output;
    let email = document.getElementById("email").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let phonenumber = document.getElementById("phonenumber").value;

    fetch('https://i-reporter-v2-gkarumba.herokuapp.com/users/v2/registration',{
        mode:'cors',
        method:'POST',
        headers: {
            Accept:'application/json',
            'Content-Type':'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            username:username,email:email,password:password,firstname:firstname,
            lastname:lastname,phonenumber:phonenumber
        })
    })
    .then(async (res) => {
        if (res.ok){
            const data = await res.json();
            redirect: window.location.assign("./login.html")
            output = `<p style="background: #004e00;color: white;text-align: center;padding: 20px;font-size: 1.3em;font-family: 'Boogaloo', cursive;">${data.message}</p>`;
            return document.getElementById("registrationResponse").innerHTML = output
            
        }
        if (res.status == 400){
            const data_1 = await res.json();
            output = `<p style="background: #004e00;color: white;text-align: center;padding: 20px;font-size: 1.3em;font-family: 'Boogaloo', cursive;">${data_1.message}</p>`;
            return document.getElementById("registrationResponse").innerHTML = output;
        }
    });
}

function decodeJwt (token){
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
}

function logInResponse(){
    let response = sessionStorage.getItem("logInResponse");
    let output = `<p style="background: #004e00;color: white;text-align: center;padding: 20px;font-family: 'Boogaloo', cursive;" >${response}</p>`;
    return document.getElementById("redirectedLogIn").innerHTML = output;
}

function loginUser(){
    let output;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    fetch('https://i-reporter-v2-gkarumba.herokuapp.com/users/v2/login',{
        mode:'cors',
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json;charset=UTF-8'
        },
        body:JSON.stringify({
            email:email,password:password
        })
    })
    .then((res) => {
        if (res.ok){
            return res.json().then((myJson) => {
                sessionStorage.setItem("token", myJson.token);
                sessionStorage.setItem("logInResponse",myJson.message);

                let token = sessionStorage.getItem("token").replace("'","");
                token = token.substr(0, token.length-1);
                let decodeToken = decodeJwt(token);
                decodeTokenId = Object.values(decodeToken)[2];
                if(decodeTokenId === 1){
                    redirect: window.location.assign("./admin.html");
                }else{
                    redirect: window.location.assign("./profile.html");
                }
            });
        }
        if (res.status == 400){
            return res.json().then((myJson) => {
                output = `<p style="background: #004e00;color: white;text-align: center;padding: 20px;font-family: 'Boogaloo', cursive;" >${myJson.message}</p>`;
                return document.getElementById("loginResponse").innerHTML = output;
            });
        }
        if (res.status == 401){
            return res.json().then((myJson) => {
                output = `<p style="background: #004e00;color: white;text-align: center;padding: 20px;font-family: 'Boogaloo', cursive;" >${myJson.message}</p>`;
                return document.getElementById("loginResponse").innerHTML = output;
            });
        }
    });
}

if(registerBtn){
    registerBtn.addEventListener('click', registerUser)
}
if(loginBtn){
    loginBtn.addEventListener('click', loginUser)
}