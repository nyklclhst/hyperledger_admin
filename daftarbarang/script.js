const request = new XMLHttpRequest();

function getDataBarang() {
    request.open('GET','http://172.16.10.48:3001/api/DataBarang', true);
    request.withCredentials = true;
    request.onload = function (){
        var data = JSON.parse(this.response);

        const tbody = document.getElementById('tbl_body');
        if(data.length == 0){
            const root = document.getElementById('root');
            root.hidden = false;
            const table = document.getElementById('tbl_id');
            table.hidden = true;
            const h2 = document.createElement('h2');            
            h2.setAttribute('class','text-danger');
            h2.setAttribute('style','text-align: center');
            h2.textContent = 'Data Kosong!';
            root.appendChild(h2);
        } else {
            var count = 1;
            data.forEach(barang => {
                const tr = tbody.appendChild(document.createElement('tr'));
                tr.appendChild(document.createElement('td')).textContent=barang.IDBarang;
                tr.appendChild(document.createElement('td')).textContent=barang.NamaBarang;
                tr.appendChild(document.createElement('td')).textContent=barang.JumlahBarang;
                const td = tr.appendChild(document.createElement('td'));
                td.style.textAlign = 'center';
                const i = td.appendChild(document.createElement('i'));
                i.classList.add('fa','fa-pencil-square-o', 'fa-2x');
                i.style.marginRight = '20px';
                i.style.cursor = 'pointer';
                i.setAttribute('onclick','getTableData('+count+')');
                const i1 = td.appendChild(document.createElement('i'));
                i1.classList.add('fa','fa-times','fa-2x');
                i1.style.color = 'red';
                i1.style.cursor = 'pointer';
                i1.setAttribute('onclick','deleteBarang('+count+')');
                count++;
            });
        }
        
    };
    request.send();
}

function sendTambahBarang(){
    var data = '';
    request.onreadystatechange = function(){
       var idbarang = document.getElementById('idbarang').value;
       var name = document.getElementById('namaBarang').value;
       var jumlah = document.getElementById('jumlahBarang').value;
       const temp = '{ \
            "$class": "model.DataBarang",\
            "IDBarang": "'+idbarang+'",\
            "NamaBarang": "'+name+'",\
            "JumlahBarang": '+jumlah+'\
        }';
       data = temp;
    };
    request.open('POST','http://172.16.10.48:3001/api/DataBarang', true);
    request.setRequestHeader('Content-type','application/json');
    request.withCredentials = true;
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      }).then((result) => {
        if (result.value) {
            request.send(data);
            document.getElementById("loader").style.display = "block";
            document.getElementById("body").style.display = "none";
            request.onreadystatechange = function(){
                if(request.readyState === 4 && request.status === 200){
                    Swal.fire(
                        'Edited!',
                        'Your data has been edited.',
                        'success'
                    )
                    document.getElementById("loader").style.display = "none";
                    document.getElementById("body").style.display = "block";
                    setTimeout(function(){
                        location.reload();
                    }, 3000);
                }
                if(request.readyState === 4 && request.status !== 200){
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                        footer: '<a href>Why do I have this issue?</a>'
                    })
                    document.getElementById("loader").style.display = "none";
                    document.getElementById("body").style.display = "block";
                }
            }
        }
    })
}

function getTableData(id){
    const form_edit = document.getElementById('form-edit');
    form_edit.hidden = false;
    const table = document.getElementById('tbl_id');
    const rows = table.getElementsByTagName('tr');
    rows[id].id = id;
    const data = table.rows[id].cells[0].innerHTML;
    console.log('cells 0: '+data);
    const data1 = table.rows[id].cells[1].innerHTML;
    console.log('cells 1: '+data1);
    const data2 = table.rows[id].cells[2].innerHTML;
    console.log('cells 2: '+data2);
    const idbar = document.getElementById('idbar');
    const namabar = document.getElementById('namabar');
    const jumbar = document.getElementById('jumbar');
    idbar.value = data;
    namabar.value = data1;
    jumbar.value = data2;
}

function updateBarang(){
    var data = '';
    const link = document.getElementById('idbar').value;
    request.onreadystatechange = function(){
       var idbarang = document.getElementById('idbar').value;
       var name = document.getElementById('namabar').value;
       var jumlah = document.getElementById('jumbar').value;
       const temp = '{ \
            "$class": "model.DataBarang",\
            "IDBarang": "'+idbarang+'",\
            "NamaBarang": "'+name+'",\
            "JumlahBarang": '+jumlah+'\
        }';
       data = temp;
    };
    request.open('PUT','http://172.16.10.48:3001/api/DataBarang/'+link, true);
    request.setRequestHeader('Content-type','application/json');
    request.withCredentials = true;
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      }).then((result) => {
        if (result.value) {
            request.send(data);
            document.getElementById('close_mdl').click();
            document.getElementById("loader").style.display = "block";
            document.getElementById("body").style.display = "none";
            request.onreadystatechange = function(){
                if(request.readyState === 4 && request.status === 200){
                    Swal.fire(
                        'Edited!',
                        'Your data has been edited.',
                        'success'
                    )
                    document.getElementById("loader").style.display = "none";
                    document.getElementById("body").style.display = "block";
                    setTimeout(function(){
                        location.reload();
                    }, 3000);
                }
                if(request.readyState === 4 && request.status !== 200){
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                        footer: '<a href>Why do I have this issue?</a>'
                    })
                    document.getElementById("loader").style.display = "none";
                    document.getElementById("body").style.display = "block";
                }
            }
        }
    })
}

function deleteBarang(id){
    const table = document.getElementById('tbl_id');
    const rows = table.getElementsByTagName('tr');
    rows[id].id = id;
    const idBar = table.rows[id].cells[0].innerHTML;
    console.log(idBar);
    request.open('DELETE','http://172.16.10.48:3001/api/DataBarang/'+idBar,true);
    request.setRequestHeader('Content-type','application/json');
    request.withCredentials = true;
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
            request.send();
            document.getElementById("loader").style.display = "block";
            document.getElementById("body").style.display = "none";
            request.onreadystatechange = function(){
                if(request.readyState === 4 && request.status === 204){
                    Swal.fire(
                        'Deleted!',
                        'Your data has been deleted.',
                        'success'
                    )
                    document.getElementById("loader").style.display = "none";
                    document.getElementById("body").style.display = "block";
                    setTimeout(function(){
                        location.reload();
                    }, 3000);
                }
                if(request.readyState === 4 && request.status !== 204){
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                        footer: '<a href>Why do I have this issue?</a>'
                    })
                    document.getElementById("loader").style.display = "none";
                    document.getElementById("body").style.display = "block";
                }
            }
        }
    })
}