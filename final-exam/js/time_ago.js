
function updateTimeAgo(startDate) {
    const currentDate = new Date();
    const diff = startDate - currentDate;

    // Количество миллисекунд в различных временных единицах
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Вычисление количества дней, часов, минут и секунд
    let days = Math.floor(diff / day);
    let hours = Math.floor((diff % day) / hour);
    let minutes = Math.floor((diff % hour) / minute);
    let seconds = Math.floor((diff % minute) / second);

    // Форматирование отчета о времени
    let report = '';

    if (days > 0) {
        report += `${days}d `;
    }
    if (hours > 0 || report !== '') {
        report += `${hours}h `;
    }
    if (minutes > 0 || report !== '') {
        report += `${minutes}m `;
    }
    report += `${seconds}s`;

    // Обновление значения на странице
    document.getElementById('time-ago').innerText = report;
}

// Установка начальной даты
const startDate = new Date();
startDate.setDate(startDate.getDate() + 22);
startDate.setHours(startDate.getHours() + 13);
startDate.setMinutes(startDate.getMinutes() + 46);
startDate.setSeconds(startDate.getSeconds() + 18);

// Обновление значения каждую секунду
setInterval(() => {
    updateTimeAgo(startDate);
}, 1000);