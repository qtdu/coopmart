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
        Quagga.stop();
        let code = result.codeResult.code;
        document.getElementById('result').innerText = `Scanned code: ${code}`;
        alert(`Scanned code: ${code}`)
        askForContinue();
    });
}

function askForContinue() {
    let continueScanning = confirm("Do you want to scan another barcode?");
    if (continueScanning) {
        startScanning();
    } else {
        document.getElementById('interactive').innerHTML = "";
        document.getElementById('result').innerText = "Scanning stopped.";
    }
}
