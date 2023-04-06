
var arrNhanVien = [];

document.querySelector('#btnThemNV').onclick = function(event){
    event.preventDefault();

    var nv = new NhanVien();

    nv.taiKhoan = document.querySelector('#tknv').value;
    nv.tenNhanVien = document.querySelector('#name').value;
    nv.email = document.querySelector('#email').value;
    nv.password = document.querySelector('#password').value;
    nv.ngayLam = document.querySelector('#datepicker').value;
    nv.luongCoBan = document.querySelector('#luongCB').value;
    nv.chucVu = document.querySelector('#chucvu').value;
    nv.soGioLam = +document.querySelector('#gioLam').value;


    //Validation 
    valid = kiemTraRong(nv.taiKhoan,'tknv')&
            kiemTraDoDai(nv.taiKhoan,'tknv',4,6)&
            kiemTraRong(nv.email,'email')&
            kiemTraEmail(nv.email,'email')&
            kiemTraRong(nv.password,'password')&
            kiemTraPassword(nv.password,'password')&
            kiemTraLuongCB(nv.luongCoBan,'luongCB')&
            kiemTraDateFormat(nv.ngayLam,'datepicker')&
            kiemTraGioLam(nv.soGioLam,'gioLam')&
            kiemTraChucVu(nv.chucVu,'chucvu')&
            kiemTraKyTu(nv.tenNhanVien,'name')&
            kiemTraRong(nv.tenNhanVien,'name');

    if(!valid){
        return;
    }

    arrNhanVien.push(nv);
    console.log('arrNhanVien', arrNhanVien);
    renderNhanVien(arrNhanVien)
}

function renderNhanVien(arrNV) {
    let htmlContent = '';
    for (var index = 0; index < arrNV.length; index++) {
        var nvNew = new NhanVien();
        var nv = arrNV[index]; 
        Object.assign(nvNew,nv);
        htmlContent += `
            <tr>
                <td>${nvNew.taiKhoan}</td>
                <td>${nvNew.tenNhanVien}</td>
                <td>${nvNew.email}</td>
                <td>${nvNew.ngayLam}</td>
                <td>${nvNew.chucVu}</td>
                <td>${nvNew.tinhLuong()}</td>
                <td>${nvNew.xepLoai()}</td>
                <td>
                <button class="btn btn-danger mx-2" onclick="xoaNhanVien('${nv.taiKhoan}')">Xoá</button>
                <button class="btn btn-primary mx-2" onclick="suaNhanVien('${nvNew.taiKhoan}')" data-toggle="modal" data-target="#myModal">Chỉnh sửa</button>
                </td>
                
            </tr>
        `
    }
    
    document.querySelector('#tableDanhSach').innerHTML = htmlContent;
    return htmlContent;
}


function xoaNhanVien(taiKhoan) { 
    var indexDel = -1;
    for(var index = 0 ; index < arrNhanVien.length;index++) {
        var nhanVien = arrNhanVien[index];
        if(nhanVien.taiKhoan === taiKhoan) {
            indexDel = index;
            break;
        }
    }
    if(indexDel !== -1) {
        arrNhanVien.splice(indexDel,1);
        renderNhanVien(arrNhanVien);
    }
}

function suaNhanVien(taiKhoan) {

    var indexEdit = -1;
    for (var index = 0; index < arrNhanVien.length; index++) {
        if (taiKhoan === arrNhanVien[index].maNhanVien) {
            indexEdit = index;
            break;
        }
    }
    //Tìm thấy sinh viên object trong mảng ở vị trí edit => load lên input form
    if (indexEdit !== -1) {
        document.querySelector('#tknv').value = arrNhanVien[indexEdit].taiKhoan;
        document.querySelector('#name').value = arrNhanVien[indexEdit].tenNhanVien;
        document.querySelector('#email').value = arrNhanVien[indexEdit].email;
        document.querySelector('#password').value = arrNhanVien[indexEdit].password;
        document.querySelector('#datepicker').value = arrNhanVien[indexEdit].ngayLam;
        document.querySelector('#luongCB').value = arrNhanVien[indexEdit].luongCoBan;
        document.querySelector('#chucvu').value = arrNhanVien[indexEdit].chucVu;
        document.querySelector('#gioLam').value = arrNhanVien[indexEdit].soGioLam;
    }
//AS2a@a
    document.querySelector('#btnThemNV').disabled = true;
    renderSinhVien(arrSinhVien);

}

document.querySelector('#btnCapNhat').onclick = function () {
    //Lấy thông tin sau khi người dùng edit giao diện
    var nhanVienEdit = new NhanVien();
    nhanVienEdit.taiKhoan = document.querySelector('#tknv').value;
    nhanVienEdit.tenNhanVien = document.querySelector('#name').value;
    nhanVienEdit.email = document.querySelector('#email').value;
    nhanVienEdit.password = document.querySelector('#password').value;
    nhanVienEdit.ngayLam = document.querySelector('#datepicker').value;
    nhanVienEdit.luongCoBan = document.querySelector('#luongCB').value;
    nhanVienEdit.chucVu = document.querySelector('#chucvu').value;
    nhanVienEdit.soGioLam = document.querySelector('#gioLam').value;
    console.log('nhanVienEdit', nhanVienEdit);
    for (var index = 0; index < arrNhanVien.length; index++) {
        if(arrNhanVien[index].maNhanVien === nhanVienEdit.maNhanVien) {
            //Tại vị trí sinh viên trong mảng trùng mã với sinh vien edit => lấy giá trị trong mảng gán = edit
            var svMang = arrNhanVien[index];
            svMang.taiKhoan = nhanVienEdit.taiKhoan;
            svMang.tenNhanVien = nhanVienEdit.tenNhanVien;
            svMang.email = nhanVienEdit.email;
            svMang.password = nhanVienEdit.password;
            svMang.ngayLam = nhanVienEdit.ngayLam;
            svMang.luongCoBan = nhanVienEdit.luongCoBan;
            svMang.chucVu = nhanVienEdit.chucVu;
            svMang.soGioLam = nhanVienEdit.soGioLam;
            break;
        }
    }
    //Sau khi thay đổi xong render lại bảng mới
    renderNhanVien(arrNhanVien);

    //reset tất cả input của thẻ form
    document.querySelector('form').reset();
}

document.querySelector('#searchName').oninput = function (){
    var tuKhoa = document.querySelector('#searchName').value.trim();
    tuKhoa = stringToSlug(tuKhoa);
    var arrTuKhoa = [];
    for(var index = 0; index < arrNhanVien.length; index++){
        var nv = arrNhanVien[index];
        var newNV = new NhanVien();
        Object.assign(newNV,nv);
        if(stringToSlug(newNV.xepLoai().trim()).search(tuKhoa) !== -1){
            arrTuKhoa.push(nv);
        }
    }

    renderNhanVien(arrTuKhoa);
}

renderNhanVien(arrNhanVien)