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
                i.setAttribute('onclick','#');
                const i1 = td.appendChild(document.createElement('i'));
                i1.classList.add('fa','fa-times','fa-2x');
                i1.style.color = 'red';
                i1.style.cursor = 'pointer';
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
            "IDBarang": '+idbarang+',\
            "NamaBarang": '+name+',\
            "JumlahBarang": '+jumlah+'\
        }';
       data = temp;
    };
    request.open('POST','http://172.16.10.48:3001/api/DataBarang', true);
    request.setRequestHeader('Content-type','application/json');
    request.withCredentials = true;
    var corm = confirm("Yakin isinya sudah benar?");
    if(corm){
        request.send(data);
        alert("Terima Kasih. Jangan Lupa Dikembalikan yaa XD");
        return true;
    } else {
        return false;
    }
}
