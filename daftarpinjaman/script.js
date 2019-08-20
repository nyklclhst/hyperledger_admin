const request = new XMLHttpRequest();

function getDataPinjam() {
    request.open('GET','http://172.16.10.48:3001/api/DataPeminjaman', true);
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
                tr.appendChild(document.createElement('td')).textContent=barang.IDPeminjaman;
                tr.appendChild(document.createElement('td')).textContent=barang.NamaPeminjam;
                tr.appendChild(document.createElement('td')).textContent=barang.JumlahBarang;
                const dataBarang = barang.Barang.substr(26);
                tr.appendChild(document.createElement('td')).textContent=dataBarang;
                tr.appendChild(document.createElement('td')).textContent=barang.Status;
                const waktu = barang.WaktuPengembalian.slice(0,-14);
                tr.appendChild(document.createElement('td')).textContent=waktu;
                tr.appendChild(document.createElement('td')).textContent=barang.KontakPeminjam;
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
