document.addEventListener('DOMContentLoaded', function() {
    const resultElement = document.getElementById('result');

    function startScanner() {
        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: document.querySelector('#interactive'),
                constraints: {
                    width: 640,
                    height: 480,
                    facingMode: "environment" // or "user" for front camera
                },
            },
            decoder: {
                readers: ["code_128_reader"]
            }
        }, function(err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log("Initialization finished. Ready to start");
            Quagga.start();
        });

        Quagga.onDetected(onDetectedHandler);
    }

    function onDetectedHandler(result) {
        const code = result.codeResult.code;
        console.log('Barcode detected and processed: [' + code + ']');
        resultElement.innerHTML = 'Detected Barcode: ' + code;
/*
        // Gửi mã code đến API
        fetch('https://yourapi.example.com/barcode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ barcode: code })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Barcode data sent to API: ' + JSON.stringify(data));

            // Tiếp tục quét sau khi hiển thị thông báo thành công
            setTimeout(() => {
                resultElement.innerHTML = '';
                Quagga.start(); // Bắt đầu lại quá trình quét
            }, 2000); // Hiển thị thông báo trong 2 giây trước khi tiếp tục quét
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Failed to send barcode data to API.');
        });
*/
        // Tạm dừng Quagga sau khi quét xong để tránh quét lại liên tục
        Quagga.stop();
    }

    startScanner();
});
