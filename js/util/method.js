function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function stringToSlug(title) { 
    //Đổi chữ hoa thành chữ thường
    slug = title.toLowerCase();

    //Đổi ký tự có dấu thành không dấu
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/đ/gi, 'd');
    //Xóa các ký tự đặt biệt
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    //Đổi khoảng trắng thành ký tự gạch ngang
    slug = slug.replace(/ /gi, "-");
    //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
    //Xóa các ký tự gạch ngang ở đầu và cuối
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');

    return slug;
}


//Validation 
function kiemTraRong(value, name){

    if(value.trim() === '') {
        document.querySelector(`#error-required-${name}`).innerHTML = `${name} không được bỏ trống!`;
        return false;
    }



    document.querySelector(`#error-required-${name}`).innerHTML = '';
    return true;
}

function kiemTraEmail(value,name){
    var regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(regexEmail.test(value)){
        document.querySelector(`#error-regex-${name}`).innerHTML = '';
        return true;
    }
    document.querySelector(`#error-regex-${name}`).innerHTML = `${name} không hợp lệ !`;
    return false;

}

function kiemTraSo(value,name){
    var regex = /^[0-9]+$/;
    if(regex.test(value)){
        document.querySelector(`#error-regex-${name}`).innerHTML = '';
        return true;
    }
    document.querySelector(`#error-regex-${name}`).innerHTML = `${name} không hợp lệ !`;
    return false;

}

function kiemTraKyTu(value,name){
    var regex = /^[A-Z a-z]+$/;
    // name = stringToSlug(name);
    if(regex.test(value)){
        document.querySelector(`#error-regex-${name}`).innerHTML = '';
        return true;
    }
    document.querySelector(`#error-regex-${name}`).innerHTML = `${name} không hợp lệ !`;
    return false;

}

function kiemTraDoDai(value,name,minLength,maxLength) {

    if(value.trim().length < minLength || value.trim().length>maxLength) {
        document.querySelector(`#error-length-${name}`).innerHTML = `${name} từ ${minLength} - ${maxLength} ký tự !`;
        return false;
    }
    document.querySelector(`#error-length-${name}`).innerHTML = ``;
    return true;

}

function kiemTraGiaTri(value,name,minValue,maxValue){

    if(Number.isNaN(value) || value < minValue || value > maxValue) {
        document.querySelector(`#error-value-${name}`).innerHTML = `${name} giá trị từ ${minValue} - ${maxValue}`;
        return false;
    }

    document.querySelector(`#error-value-${name}`).innerHTML = ``;
    return true;

}

function kiemTraPassword(value,name){
    var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/;

    if(regex.test(value)){
        document.querySelector(`#error-regex-${name}`).innerHTML = '';
        return true;
    }
    document.querySelector(`#error-regex-${name}`).innerHTML = `${name} không hợp lệ !`;
    return false;
}

function kiemTraDateFormat(value,name){
    var regex = /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/;

    if(regex.test(value)){
        document.querySelector(`#error-regex-${name}`).innerHTML = '';
        return true;
    }
    document.querySelector(`#error-regex-${name}`).innerHTML = `${name} không hợp lệ !`;
    return false;
}

function kiemTraChucVu(value,name){
    if(value !== 'Sếp' && value !== 'Trưởng Phòng' && value !== 'Nhân viên'){
        document.querySelector(`#error-required-${name}`).innerHTML = `${name} không hợp lệ !`;
        return false;
    }
    document.querySelector(`#error-required-${name}`).innerHTML = '';
    return true;
}

function kiemTraLuongCB(value,name){
    if(!kiemTraRong(value, name)){
        // document.querySelector(`#error-required-${name}`).innerHTML = `${name} không được bỏ trống!`;
        return false;
    }

    if(value < 1000000 || value > 20000000){
        document.querySelector(`#error-required-${name}`).innerHTML = `${name} không hợp lệ !`;
        
        return false;
    }
    document.querySelector(`#error-required-${name}`).innerHTML = '';
    return true;
}

function kiemTraGioLam(value,name){
    if(value === 0){
        document.querySelector(`#error-required-${name}`).innerHTML = `${name} không được bỏ trống!`;
        return false;
    }

    if(value < 80 || value > 200){
        document.querySelector(`#error-required-${name}`).innerHTML = `${name} không hợp lệ !`;
        
        return false;
    }
    document.querySelector(`#error-required-${name}`).innerHTML = '';
    return true;
}