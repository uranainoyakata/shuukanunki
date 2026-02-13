document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            renderPage(data);
        })
        .catch(error => console.error('Error loading data:', error));
});

function renderPage(data) {
    // 期間
    document.getElementById('display-period').textContent = data.period;

    // 今週のテーマ
    const themeSection = document.getElementById('weekly-theme');
    themeSection.innerHTML = `
        <div class="theme-content">
            <h2 class="section-label">${data.weekly_theme.label}</h2>
            <p class="theme-message">${data.weekly_theme.message}</p>
        </div>
    `;

    // カレンダー
    const calendarGrid = document.getElementById('calendar-grid');
    calendarGrid.innerHTML = data.calendar.map(day => {
        const luckyHtml = day.lucky.map(l => {
            let className = 'badge';
            if (l.includes('一粒万倍')) className += ' ichiryu';
            if (l.includes('大安')) className += ' taian';
            if (l.includes('寅')) className += ' tora';
            return `<span class="${className}">${l}</span>`;
        }).join('');

        return `
            <div class="day-col ${day.lucky.length > 0 ? 'lucky' : ''}">
                <span class="date">${day.date}</span>
                <span class="dow">${day.dow}</span>
                <div class="lucky-days">${luckyHtml}</div>
            </div>
        `;
    }).join('');

    // 運勢
    const fortuneGrid = document.getElementById('fortune-grid');
    fortuneGrid.innerHTML = data.fortunes.map(f => `
        <article class="fortune-card">
            <div class="month">${f.month}生まれ</div>
            <div class="card-body">
                <h3 class="fortune-word">${f.word}</h3>
                <p class="fortune-text">${f.text}</p>
                <div class="lucky-item"><span>鍵</span>${f.item}</div>
            </div>
        </article>
    `).join('');
}
