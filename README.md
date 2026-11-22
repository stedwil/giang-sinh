# 🎄 Christmas Love Letter – Bản bố cục trung tâm

Đây là website Giáng sinh đã được chỉnh sửa từ `love-giang-sinh.rar` bạn gửi.

## Cách chạy

1. Giải nén file ZIP.
2. Mở thư mục `love-giang-sinh`.
3. Nhấn đúp `index.html` để chạy trong Chrome hoặc Edge. Không cần cài XAMPP.
4. Muốn chia sẻ qua đường link, tải **toàn bộ nội dung thư mục** lên hosting tĩnh (GitHub Pages, Netlify hoặc Render Static Site).

## Các hành động

- **Ở giữa:** câu hỏi, GIF `cat.gif`, lời nhắn và hai nút Yes/No luôn nằm trong lá thư trung tâm.
- **Nhấn NO:** mỗi lần nhấn, một ảnh meme ngẫu nhiên xuất hiện dưới dạng sticker ở vị trí ngẫu nhiên **bên trái hoặc bên phải** lá thư. Các vị trí được chia riêng, tránh đè lên chữ và nút bấm. Tối đa 8 meme xuất hiện cùng lúc; lần tiếp theo meme cũ nhất được thay bằng meme mới.
- **Ảnh:** sử dụng đúng **13 JPG thực tế trong thư mục `love-n`** của bản RAR mới nhất. Ảnh sẽ không lặp lại cho tới khi hết lượt qua cả 13 tấm, rồi mới trộn lại. Khi nhấn vào một sticker, ảnh mở lớn.
- **Điện thoại:** không có đủ chỗ ở hai bên nên meme tự xếp thành các sticker ở dưới lá thư. Đồng thời có ảnh xem nhanh ở góc dưới giúp người xem thấy meme mới mà không bị tự cuộn khỏi hai nút.
- **Nhấn YES:** trang hiện ngay lời chúc mừng và `love-n/yes.gif` ở giữa, đồng thời bắt đầu phát nhạc `nhac.m4a`. Việc đổi phần hiển thị ngay tại trang này giúp âm thanh không bị ngắt khi điều hướng.
- **Nhạc:** đã liên kết `nhac.m4a`, phát lặp sau khi người xem **nhấn YES**. Mở trang hay bấm NO hoàn toàn không bật nhạc. Sau khi YES, có nút tắt/bật lại ở góc dưới; nếu trình duyệt chặn âm thanh hoặc không hỗ trợ file, người xem có thể tự bật lại. Trang `thankyou.html` riêng vẫn tồn tại để mở trực tiếp, nhưng sẽ không tự phát nhạc.

## Chỉnh nhạc / chỉnh nội dung

Trong `js/config.js`, dòng mặc định là:

```js
window.LOVE_CONFIG = {
  musicFile: "nhac.m4a"
};
```

Muốn đổi nhạc, chép file mới (MP3/M4A) vào cùng thư mục với `index.html` rồi thay giá trị `musicFile` bằng đúng tên file. Để tắt chức năng nhạc, dùng `musicFile: ""`.

- Sửa câu hỏi và lời nhắn ở `index.html`. Lời chúc mừng của luồng YES cũng có sẵn trong `<template id="celebrationTemplate">` bên trong file này; nếu đổi nội dung chúc mừng, hãy đổi cả ở `thankyou.html` để đồng bộ.
- `thankyou.html` là trang chúc mừng dự phòng khi mở trực tiếp; trong luồng bình thường, nút YES hiển thị mẫu tương ứng ngay tại `index.html` để nhạc phát liền mạch.
- Sửa màu, kiểu sticker và hiệu ứng ở `css/style.css`.
- Sửa thông điệp khi bấm No, số sticker tối đa và danh sách meme ở `js/app.js`.
- Muốn thay GIF khi Yes, thay `love-n/yes.gif` bằng một GIF mới **cùng tên**.

## Cấu trúc

```text
love-giang-sinh/
├── index.html
├── thankyou.html
├── cat.gif
├── nhac.m4a
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   └── config.js
└── love-n/
    ├── yes.gif
    └── 13 ảnh meme .jpg
```

## Bản sửa lỗi font tiếng Việt

Đã thay **Georgia italic** và khoảng cách chữ âm ở các đoạn tiếng Việt bằng font hệ thống hỗ trợ dấu tiếng Việt (`Segoe UI`, `Tahoma`, `Arial`). Các thành phần chữ được sửa bao gồm tiêu đề, lời chúc (`.love-note`), lời dẫn và chú thích GIF. Hai trang dùng chung CSS. Giữ nguyên chức năng: nhấn No hiện meme, nhấn Yes phát `nhac.m4a` và hiện GIF.

**Để tránh thấy bản cũ**: giải nén ZIP mới, thay **toàn bộ thư mục** `love-giang-sinh` cũ bằng thư mục mới (không chỉ chép `index.html`). Mở lại `index.html`, nhấn Ctrl+F5 nếu trình duyệt đang giữ CSS cũ.

## Lời chúc theo yêu cầu mới

Trang chúc mừng (nút YES và trang `thankyou.html` trực tiếp) hiển thị:

- Gửi em, *Món quà Noel tuyệt nhất của anh*
- Cảm ơn em vì đã đồng ý
- Hi vọng chúng mình sẽ có một mùa đông không lạnh nhé
- *Anh thương em, nhiều hơn cả những điều anh có thể nói.*
- Chữ dưới GIF: **iu Nhã Uyên lắm**

Nội dung đã cập nhật đồng bộ ở cả `index.html` (template YES) và `thankyou.html`. Nhạc vẫn chỉ bật khi bấm YES.
