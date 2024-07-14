document.getElementById('start-scan').addEventListener('click', function() {
    startScanner();
});

function startScanner() {
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#scanner-container'), // Trỏ tới vùng chứa video
            constraints: {
                width: 640,
                height: 480,
                facingMode: "environment" // Sử dụng camera sau
            },
        },
        decoder: {
            readers: ["code_128_reader", "ean_reader", "ean_8_reader", "code_39_reader", "code_39_vin_reader", "codabar_reader", "upc_reader", "upc_e_reader", "i2of5_reader"]
        },
    }, function(err) {
        if (err) {
            console.error(err);
            return;
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
    });

    Quagga.onDetected(function(result) {
        Quagga.stop(); // Dừng quét sau khi phát hiện mã vạch
        let code = result.codeResult.code;
        document.getElementById('result').innerText = "Scanned code: " + code;
        
        let continueScanning = confirm("Scanned code: " + code + "\nDo you want to scan again?");
        if (continueScanning) {
            startScanner(); // Tiếp tục quét
        } else {
            alert("Scanning stopped.");
        }
    });
}
