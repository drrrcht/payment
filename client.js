document.getElementById('pay-button').addEventListener('click', () => {
    const requestData = {
        amount: {
            value: '100.00',
            currency: 'RUB',
        },
        confirmation: {
            type: 'redirect',
            return_url: 'https://radarussia.ru/'
        },
        receipt: {
            items: [
                {
                    description: 'Товар 1',
                    quantity: '1',
                    amount: {
                    value: '100.00',
                    currency: 'RUB'
                    },
                    vat_code: 2
                }
            ],
            taxation_mode: 'osn',
            customer: {
                phone: '+79319573562'
                }
            }
        };

// Создаем платеж на сервере
    fetch('http://localhost:63342/create-payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    })
        .then(response => response.json())
        .then(data => {
            // Перенаправляем пользователя на страницу оплаты
            window.location.href = data.payment_url;
        })
        .catch(error => {
            console.error('Произошла ошибка при создании платежа:', error);
        });
});


