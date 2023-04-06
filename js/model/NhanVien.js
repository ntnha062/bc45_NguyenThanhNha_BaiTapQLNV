function NhanVien(){
    this.taiKhoan = '';
    this.hoVaTen = '';
    this.email = '';
    this.matKhau = '';
    this.ngayLam = '';
    this.luongCoBan = 0;
    this.chucVu = '';
    this.soGioLam = 0;
    
    this.tinhLuong = function(){
        if(this.chucVu === 'Sếp'){
            this.heSoLuong = 3;
        }else if(this.chucVu === 'Trưởng phòng'){
            this.heSoLuong = 2;
        }else if(this.chucVu === 'Nhân viên'){
            this.heSoLuong = 1;
        }
        var luong = this.luongCoBan * this.heSoLuong * this.soGioLam;
        return luong;
    }

    this.xepLoai = function(){
        var xepLoai = '';
        if(this.soGioLam >= 176 && this.soGioLam < 192){
            xepLoai = 'Giỏi';
        }else if(this.soGioLam >= 192){
            xepLoai = 'Xuất sắc';
        }else if(this.soGioLam >= 160 && this.soGioLam < 176){
            xepLoai = 'Khá';
        }else if(this.soGioLam < 160){
            xepLoai = 'Trung bình';
        }

        return xepLoai;
    }
}