document.addEventListener('DOMContentLoaded', function () {
    // Cấu hình QuaggaJS
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#interactive'), // Thiết lập video stream
            constraints: {
                width: 640,
                height: 480,
                facingMode: "environment" // Sử dụng camera sau
            },
        },
        decoder: {
            readers: ["code_128_reader", "ean_reader", "ean_8_reader", "code_39_reader", "code_39_vin_reader", "codabar_reader", "upc_reader", "upc_e_reader", "i2of5_reader"]
        },
    }, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("QuaggaJS đã khởi tạo thành công");
        Quagga.start();
    });

    // Xử lý kết quả quét mã vạch
    Quagga.onDetected(function (data) {
        var resultElement = document.getElementById('result');
        resultElement.innerHTML = `Mã vạch được phát hiện: ${data.codeResult.code}`;
        console.log(data);
    });
});
