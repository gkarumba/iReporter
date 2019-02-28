const registerBtn = document.getElementById("registerButton");

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
            output = `<p style="background: #004e00;color: white;text-align: center;padding: 20px;font-size: 1.3em;font-family: 'Boogaloo', cursive;">${data.message}</p>`;
            return document.getElementById("registrationResponse").innerHTML = output;
        }
        if (res.status == 400){
            const data_1 = await res.json();
            output = `<p style="background: #004e00;color: white;text-align: center;padding: 20px;font-size: 1.3em;font-family: 'Boogaloo', cursive;">${data_1.message}</p>`;
            return document.getElementById("registrationResponse").innerHTML = output;
        }
    });
}

if(registerBtn){
    registerBtn.addEventListener('click', registerUser)
}