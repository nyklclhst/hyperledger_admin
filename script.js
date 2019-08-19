const request = new XMLHttpRequest();

let uname = [];
let Notissued = [];
let issued = [];

function getAllUser(){
    request.open('GET','http://localhost:3001/api/userData',true);
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
    request.open('GET','http://localhost:3001/api/system/identities',true);
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
                if(userData.state != 'ISSUED' || userData.state != 'ACTIVATED'){
                    console.log('NOT ISSUED or ACTIVATED:'+userData.name);
                    Notissued.push(userData.name);
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
    if(Notissued.length !== 0){
        for(let i=0;i<uname.length;i++){
            if(uname[i] == Notissued[i]){
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
    } else {
        console.log('ALL USER ISSUED');
        for(let i=0;i<uname.length;i++){
            const tr = tbody.appendChild(document.createElement('tr'));
            tr.appendChild(document.createElement('td')).textContent=uname[i];
            tr.appendChild(document.createElement('td')).textContent="tgl dibuat";
            const td = tr.appendChild(document.createElement('td'));
            const i1 = td.appendChild(document.createElement('i'));
            i1.classList.add('fa','fa-check-circle');
            i1.style.color = "aqua";
            i1.textContent = " APPROVED";
        }
    }
}

getAllUser();