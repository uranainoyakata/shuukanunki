document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            renderPage(data);
        })
        .catch(error => console.error('Error loading data:', error));
});

function renderPage(data) {
    // Get current JST date
    const jstNow = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Tokyo" }));
    const year = jstNow.getFullYear();
    const month = jstNow.getMonth() + 1;
    const date = jstNow.getDate(); // 1 to 31
    const dowStrJa = ['日', '月', '火', '水', '木', '金', '土'][jstNow.getDay()];

    // 今日のささやき (Quote)
    // Find the quote matching today's date (1-31). If out of bounds/missing, default text.
    const quoteData = data.daily_quotes.find(q => q.date === date);
    const quoteText = quoteData ? quoteData.quote : "波の音に耳を澄ませ。";

    const dailySection = document.getElementById('daily-message');
    if (dailySection) {
        dailySection.innerHTML = `
            <div class="himekuri-wrapper">
                <div class="himekuri-calendar">
                    <div class="himekuri-top">
                        <div class="himekuri-rings">
                            <span class="ring"></span><span class="ring"></span><span class="ring"></span>
                            <span class="ring"></span><span class="ring"></span><span class="ring"></span>
                        </div>
                        <div class="himekuri-year-month">${year}年 ${month}月</div>
                    </div>
                    <div class="himekuri-body">
                        <div class="himekuri-date-wrapper">
                            <div class="himekuri-date">${date}</div>
                            <div class="himekuri-dow dow-${jstNow.getDay()}">${dowStrJa}曜</div>
                        </div>
                        <div class="himekuri-quote-wrapper">
                            <p class="himekuri-quote">「${quoteText}」</p>
                            <p class="himekuri-author">龍神接続者 しょうじ</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // 運勢
    const fortuneGrid = document.getElementById('fortune-grid');
    if (fortuneGrid) {
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
}
