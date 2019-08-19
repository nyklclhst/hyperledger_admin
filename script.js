const request = new XMLHttpRequest();

let uname = [];
let issued = [];

function getAllUser(){
    request.open('GET','http://172.16.10.48:3001/api/userData',true);
    request.onload = function(){
        const data = JSON.parse(this.response);
        if(data.length == 0){
            console.log('data kosong');
        } else {
            data.forEach(user => {
                console.log(user.userID);
                checkUser();
                uname.push(user.userID);
                const ul = document.getElementById('ul_id');
                const li = ul.appendChild(document.createElement('li'));
                li.classList.add('list-group-item');
                let asUser = user.userID;
                asUser = asUser.split("@",1);
                li.textContent = asUser;
            })
        }
    }
    request.send();
}

function checkUser(){
    request.open('GET','http://172.16.10.48:3001/api/system/identities',true);
    request.onload = function(){
        const data = JSON.parse(this.response);
        if(data.length == 0 || data.filter(username => username.name) === 'admin'){
            console.log('data kosong');
        } else {
            data.forEach(userData => {
                if(userData.name === 'admin'){
                    return;
                }
                if(userData.state === 'ISSUED'){
                    console.log('ISSUED:'+userData.name);
                    issued.push(userData.name);
                    return;
                }
                if(userData.state === 'ACTIVATED'){
                    console.log('ACTIVATED:'+userData.name);
                    issued.push(userData.name);
                    return;
                }
            })
            checking()
        }
    }
    request.send();
}

function checking(){
    const tbody = document.getElementById('tbl_body');
    let bool = false;
    if(uname.length !== 0){
        for(i=0;i<uname.length;i++){
            for(j=0;j<issued.length;j++){
                if(uname[i] == issued[j]){
                    bool = true;
                    break;
                } else {
                    bool = false;
                }
            }
            if(bool){
                console.log("true "+uname[i]);
                const tr = tbody.appendChild(document.createElement('tr'));
                tr.appendChild(document.createElement('td')).textContent=uname[i];
                tr.appendChild(document.createElement('td')).textContent="tgl dibuat";
                const td = tr.appendChild(document.createElement('td'));
                const i1 = td.appendChild(document.createElement('i'));
                i1.classList.add('fa','fa-check-circle');
                i1.style.color = "aqua";
                i1.textContent = " APPROVED";
            } else {
                console.log('false '+uname[i]);
                const tr = tbody.appendChild(document.createElement('tr'));
                tr.appendChild(document.createElement('td')).textContent=uname[i];
                tr.appendChild(document.createElement('td')).textContent="tgl dibuat";
                const td = tr.appendChild(document.createElement('td'));
                const i1 = td.appendChild(document.createElement('i'));
                i1.classList.add('fa','fa-times-circle');
                i1.style.color = "red";
                i1.textContent = " WAITING";
            }
        }
    }
}

function issuedUser(userID){
    const data = {
        "participant":"model.userData#"+userID,
        "userID": userID,
        "options": {}
    };

    document.getElementById("loader").style.display = "block";
    document.getElementById("form").style.display = "none";

    request.onreadystatechange = function(){
        var a;
        if (request.readyState === 4 && request.status === 200) {
            // Trick for making downloadable link
            a = document.createElement('a');
            Swal.fire("Congratulation", "You just registered! We will contact you soon for confirmation", "success");
            a.href = window.URL.createObjectURL(request.response);
            // Give filename you wish to download
            a.download = userID+'.card';
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.getElementById("loader").style.display = "none";
            document.getElementById("form").style.display = "block";
        }
        if(request.readyState === 4 && request.status !== 200){
            Swal.fire({ type: 'error', title: 'Oops...', text: 'Something went wrong!', footer: '<a href="#">Why do I have this issue?</a>'});
            document.getElementById("loader").style.display = "none";
            document.getElementById("form").style.display = "block";
        }
    }
    request.open('POST','http://172.16.10.48:3001/api/system/identities/issue',true);
    request.setRequestHeader('Content-type','application/json');
    request.setRequestHeader('Accept','application/octet-stream');
    request.responseType = "blob";
    request.send(JSON.stringify(data));
    return true;
}

getAllUser();
