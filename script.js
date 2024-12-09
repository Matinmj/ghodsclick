let clicksLeft = 200;
let score = 0;
let pointsPerClick = 1; // تعداد امتیازهای دریافتی برای هر کلیک
let upgradeCount = 0; // شمارش تعداد ارتقاءها (تا ۱۰ بار)

function incrementScore() {
    // اگر محدودیت کلیلک‌ها بیشتر از 0 باشد
    if (clicksLeft > 0) {
        // کاهش محدودیت
        clicksLeft--;

        // افزایش امتیاز به اندازه تعداد امتیازهای هر کلیک
        score += pointsPerClick;

        // به‌روزرسانی تعداد کلیک‌های باقی‌مانده
        document.getElementById('clicksLeft').innerText = clicksLeft;

        // به‌روزرسانی امتیاز
        document.getElementById('score').innerText = score;

        // نمایش انیمیشن امتیاز
        showScorePopup(pointsPerClick);

        // به‌روزرسانی نوار پیشرفت
        updateProgress();
    }
}

function showScorePopup(value) {
    // ایجاد عنصر جدید برای نمایش امتیاز
    const popup = document.createElement('div');
    popup.classList.add('score-popup');
    popup.innerText = value;

    // اضافه کردن popup به صفحه
    document.body.appendChild(popup);

    // قرار دادن popup در دایره
    const circle = document.querySelector('.circle');
    const circleRect = circle.getBoundingClientRect();
    popup.style.left = `${circleRect.left + circleRect.width / 2 - popup.offsetWidth / 2}px`;
    popup.style.top = `${circleRect.top + circleRect.height / 2 - popup.offsetHeight / 2}px`;

    // حذف popup پس از پایان انیمیشن
    setTimeout(() => {
        popup.remove();
    }, 1000);
}

function updateProgress() {
    const progressBar = document.getElementById('progressBar');
    const progressPercentage = (clicksLeft / 200) * 100;
    progressBar.style.width = `${progressPercentage}%`;

    if (clicksLeft === 0) {
        progressBar.style.width = '0%';
    }
}

// هر ثانیه، شارژ کردن محدودیت
setInterval(() => {
    if (clicksLeft < 200) {
        clicksLeft++;
        document.getElementById('clicksLeft').innerText = clicksLeft;
        updateProgress();
    }
}, 1000);

// نمایش صفحه ارتقاء (مدال)
function openUpgradePage() {
    document.getElementById('upgradeModal').style.display = 'flex';
}

// بستن صفحه ارتقاء
function closeUpgradePage() {
    document.getElementById('upgradeModal').style.display = 'none';
}

// ارتقاء امتیاز (تا ۱۰ بار)
function upgradeClickPoints() {
    if (upgradeCount < 10) {
        pointsPerClick = 2; // هر کلیک دو امتیاز می‌دهد
        document.getElementById('currentUpgradePoints').innerText = pointsPerClick; // بروزرسانی متن نمایش‌دهنده امتیاز
        upgradeCount++; // افزایش شمارش ارتقاء
        closeUpgradePage(); // بستن مدال پس از ارتقاء
    } else {
        alert('شما نمی‌توانید بیشتر از ۱۰ بار ارتقاء دهید!');
    }
}
