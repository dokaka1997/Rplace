// Lấy các phần tử cần thiết từ DOM
const canvas = document.getElementById('pixelCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');

// Kích thước ô pixel
const pixelSize = 2;

// Tạo mảng lưu trữ trạng thái ô pixel (mặc định là màu trắng)
const pixelState = [];
const numRows = canvas.height / pixelSize;
const numCols = canvas.width / pixelSize;
for (let i = 0; i < numRows; i++) {
    pixelState[i] = [];
    for (let j = 0; j < numCols; j++) {
        pixelState[i][j] = "#ffffff"; // Màu trắng (#ffffff) là màu mặc định
    }
}


// Xử lý sự kiện khi người dùng chọn màu
colorPicker.addEventListener('change', function () {
    selectedColor = colorPicker.value;
});

// Xử lý sự kiện khi người dùng nhấp chuột vào ô pixel
canvas.addEventListener('click', function (event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const col = Math.floor(x / pixelSize);
    const row = Math.floor(y / pixelSize);

    pixelState[row][col] = selectedColor; // Gán màu cho ô pixel tại vị trí đã chọn
    drawPixel(row, col, selectedColor); // Tô màu ô pixel
});

// Vẽ lại các ô pixel đã được tô màu sau khi người dùng chọn màu mới
function redrawCanvas() {
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            drawPixel(i, j, pixelState[i][j]);
        }
    }
}
// ...

// Lấy phần tử hiển thị thông tin pixel
const pixelInfo = document.getElementById('pixelInfo');

// Hàm cập nhật thông tin pixel
function updatePixelInfo(row, col) {
    pixelInfo.textContent = `Tọa độ pixel: (${row}, ${col})`;
}

// Xử lý sự kiện khi người dùng nhấp chuột vào ô pixel
canvas.addEventListener('click', function (event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const col = Math.floor(x / pixelSize);
    const row = Math.floor(y / pixelSize);

    pixelState[row][col] = selectedColor; // Gán màu cho ô pixel tại vị trí đã chọn
    drawPixel(row, col, selectedColor); // Tô màu ô pixel

    updatePixelInfo(row, col); // Cập nhật thông tin tọa độ pixel
});

// ...

// Hàm tô màu ô pixel và vẽ viền
function drawPixel(row, col, color) {
    ctx.fillStyle = color;
    ctx.fillRect(col * pixelSize, row * pixelSize, pixelSize, pixelSize);

    // Vẽ viền
    ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
    ctx.strokeRect(col * pixelSize, row * pixelSize, pixelSize, pixelSize);
}

// Xử lý sự kiện khi người dùng nhấp chuột vào ô pixel
canvas.addEventListener('click', function (event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const col = Math.floor(x / pixelSize);
    const row = Math.floor(y / pixelSize);

    pixelState[row][col] = selectedColor; // Gán màu cho ô pixel tại vị trí đã chọn
    drawPixel(row, col, selectedColor); // Tô màu ô pixel
});

// Xử lý sự kiện khi người dùng di chuyển chuột trên canvas
canvas.addEventListener('mousemove', function (event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const col = Math.floor(x / pixelSize);
    const row = Math.floor(y / pixelSize);

    updatePixelInfo(row, col); // Cập nhật thông tin tọa độ pixel
});


canvas.addEventListener('click', function (event) {
    if (!isDelayed) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const col = Math.floor(x / pixelSize);
        const row = Math.floor(y / pixelSize);

        pixelState[row][col] = selectedColor; // Gán màu cho ô pixel tại vị trí đã chọn
        drawPixel(row, col, selectedColor); // Tô màu ô pixel

        isDelayed = true; // Đánh dấu đã trễ
        setTimeout(() => {
            isDelayed = false; // Cho phép tô màu lại sau 30 giây
        }, 30000); // Độ trễ là 30 giây (30000ms)
    }
});


// Gọi hàm vẽ lại canvas ban đầu
redrawCanvas();
