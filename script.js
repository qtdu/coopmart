document.addEventListener('DOMContentLoaded', function () {
    var scannerContainer = document.getElementById('scanner-container');
    var resultContainer = document.getElementById('result');
    var scanAgainButton = document.getElementById('scan-again');
    var cancelButton = document.getElementById('cancel');

    function startScanner() {
        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: scannerContainer, // Thẻ div chứa video
                constraints: {
                    width: 640,
                    height: 480,
                    facingMode: "environment" // Sử dụng camera sau nếu có
                },
            },
            decoder: {
                readers: ["code_128_reader", "ean_reader", "ean_8_reader", "code_39_reader", "code_39_vin_reader", "codabar_reader", "upc_reader", "upc_e_reader", "i2of5_reader"] // Loại mã vạch muốn quét
            },
        }, function (err) {
            if (err) {
                console.error(err);
                return;
            }
            Quagga.start();
        });

        Quagga.onDetected(function (data) {
            var code = data.codeResult.code;
            resultContainer.innerText = `Scanned code: ${code}`;

            Quagga.stop(); // Dừng sau khi quét xong

            // Hiển thị các nút để người dùng quyết định
            scanAgainButton.style.display = 'inline';
            cancelButton.style.display = 'inline';
        });
    }

    // Bắt đầu quét khi tải trang
    startScanner();

    // Xử lý sự kiện khi người dùng chọn quét tiếp
    scanAgainButton.addEventListener('click', function () {
        resultContainer.innerText = ''; // Xóa kết quả trước đó
        scanAgainButton.style.display = 'none'; // Ẩn nút
        cancelButton.style.display = 'none'; // Ẩn nút
        startScanner(); // Bắt đầu quét lại
    });

    // Xử lý sự kiện khi người dùng chọn hủy
    cancelButton.addEventListener('click', function () {
        resultContainer.innerText = 'Scanning cancelled';
        scanAgainButton.style.display = 'none'; // Ẩn nút
        cancelButton.style.display = 'none'; // Ẩn nút
    });
});
