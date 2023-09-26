const http = require('http');
const axios = require('axios');

const shopId = '231956';
const secretKey = 'live_Tt4_AZ63s7FtFpOey61kqhO5U2tW9NymwQEcqPNRsew';

const server = http.createServer((req, res) => {
    // Обработка запросов к вашему серверу
    if (req.method === 'POST' && req.url === '/create-payment') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            // Разбор JSON-данных из тела запроса
            const requestData = JSON.parse(body);

            // Создание платежа в YooKassa
            axios
                .post('https://api.yookassa.ru/v3/payments', requestData, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Basic ${Buffer.from(`${shopId}:${secretKey}`).toString('base64')}`,
                    },
                })
                .then((response) => {
                    const paymentUrl = response.data.confirmation.confirmation_url;
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ payment_url: paymentUrl }));
                })
                .catch((error) => {
                    console.error('Произошла ошибка при создании платежа:', error);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Internal Server Error' }));
                });
        });
    } else {
        // Обработка других запросов, если необходимо
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const port = 63342;

server.listen(port, () => {
    console.log(`Сервер слушает порт ${port}`);
});
