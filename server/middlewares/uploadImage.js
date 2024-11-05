const multer = require('multer');
const path = require('path');

// Định nghĩa cách lưu trữ file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Kiểm tra loại file và chỉ định thư mục lưu trữ
    if (file.mimetype.startsWith('image/')) {
      cb(null, path.join(__dirname, '../../client/public/images')); // Thư mục lưu trữ ảnh
    } else if (file.mimetype === 'application/pdf') {
      cb(null, path.join(__dirname, '../../client/public/pdfs')); // Thư mục lưu trữ PDF
    } else {
      cb(new Error('File type not supported'), false); // Trả về lỗi nếu file không được hỗ trợ
    }
  },
  filename: (req, file, cb) => {
    // Đặt tên file là timestamp + phần mở rộng
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Khởi tạo multer với cấu hình lưu trữ
const upload = multer({ storage });

// Xuất đối tượng upload để sử dụng
module.exports = upload;
