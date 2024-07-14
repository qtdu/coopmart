let lastScannedCode = null;
document.getElementById('start-scan').addEventListener('click', function() {
    startScanning();
});

function startScanning() {
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#interactive')    // Or '#yourElement' (optional)
        },
        decoder: {
            readers: ["code_128_reader", "ean_reader", "ean_8_reader", "code_39_reader", "code_39_vin_reader", "codabar_reader", "upc_reader", "upc_e_reader", "i2of5_reader"]
        }
    }, function(err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
    });

    Quagga.onDetected(function(result) {
        
        let code = result.codeResult.code;
        if (code !== lastScannedCode) {
            lastScannedCode = code; // Cập nhật mã đã quét
            document.getElementById('result').innerText = `Scanned code: ${code}`;

            Quagga.stop(); // Dừng Quagga
            Quagga.offDetected(); // Loại bỏ sự kiện phát hiện để tránh quét lại cùng mã

            document.getElementById('result').innerText = `Scanned code: ${code}`;
            askForContinue(`Scanned code: ${code}`);
        }
        //Quagga.offDetected(); // Loại bỏ sự kiện để tránh quét nhiều lần

        //Quagga.onProcessed(function() {
            //document.getElementById('result').innerText = `Scanned code: ${code}`;
            //askForContinue(`Scanned code: ${code}`);
        //});
        
        
    });
}

function askForContinue(ketqua) {
    let continueScanning = confirm(ketqua + " - Do you want to scan another barcode?");
    if (continueScanning) {
        lastScannedCode = null; // Reset mã đã quét
        startScanning();
    } else {
        document.getElementById('interactive').innerHTML = "";
        document.getElementById('result').innerText = "Scanning stopped.";
    }
}
