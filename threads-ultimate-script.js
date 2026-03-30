// ============================================
// LOADING SCREEN
// ============================================
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const progress = document.querySelector('.loading-progress');
    
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => loadingScreen.remove(), 800);
    }, 800);
}

// ============================================
// CUSTOM CURSOR WITH PARTICLES
// ============================================
let cursorX = 0, cursorY = 0;
let trailX = 0, trailY = 0;

function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    const trail = document.getElementById('cursor-trail');
    let lastParticleTime = 0;
    
    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        // Create particles
        const now = Date.now();
        if (now - lastParticleTime > 50) {
            createParticle(cursorX, cursorY);
            lastParticleTime = now;
        }
    });
    
    // Smooth trail
    function animateTrail() {
        trailX += (cursorX - trailX) * 0.15;
        trailY += (cursorY - trailY) * 0.15;
        
        trail.style.left = trailX + 'px';
        trail.style.top = trailY + 'px';
        
        requestAnimationFrame(animateTrail);
    }
    animateTrail();
    
    // Hover effects
    document.querySelectorAll('button, a, .cursor-interactive').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
}

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'cursor-particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    
    const tx = (Math.random() - 0.5) * 50;
    const ty = (Math.random() - 0.5) * 50;
    particle.style.setProperty('--tx', tx + 'px');
    particle.style.setProperty('--ty', ty + 'px');
    
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 1000);
}

// ============================================
// PARALLAX SCROLLING
// ============================================
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.parallax) || 0.5;
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ============================================
// SPACE BACKGROUND WITH ASTEROIDS
// ============================================
function initSpaceBackground() {
    const canvas = document.getElementById('space-bg');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const stars = [];
    for (let i = 0; i < 200; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2,
            opacity: Math.random()
        });
    }
    
    const asteroids = [];
    for (let i = 0; i < 10; i++) {
        asteroids.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 30 + 10,
            speedX: (Math.random() - 0.5) * 2,
            speedY: (Math.random() - 0.5) * 2,
            rotation: 0
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            ctx.fill();
            
            star.opacity += (Math.random() - 0.5) * 0.05;
            star.opacity = Math.max(0.1, Math.min(1, star.opacity));
        });
        
        asteroids.forEach(asteroid => {
            ctx.save();
            ctx.translate(asteroid.x, asteroid.y);
            ctx.rotate(asteroid.rotation);
            
            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, asteroid.radius);
            gradient.addColorStop(0, 'rgba(102, 126, 234, 0.8)');
            gradient.addColorStop(0.5, 'rgba(118, 75, 162, 0.6)');
            gradient.addColorStop(1, 'rgba(240, 147, 251, 0.3)');
            
            ctx.beginPath();
            ctx.arc(0, 0, asteroid.radius, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
            
            ctx.restore();
            
            asteroid.x += asteroid.speedX;
            asteroid.y += asteroid.speedY;
            asteroid.rotation += 0.01;
            
            if (asteroid.x < -50) asteroid.x = canvas.width + 50;
            if (asteroid.x > canvas.width + 50) asteroid.x = -50;
            if (asteroid.y < -50) asteroid.y = canvas.height + 50;
            if (asteroid.y > canvas.height + 50) asteroid.y = -50;
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ============================================
// ROBOT MOUSE TRACKING
// ============================================
function initRobot() {
    const robot = document.getElementById('robot');
    const robotHead = robot.querySelector('.robot-head');
    
    document.addEventListener('mousemove', (e) => {
        const robotRect = robot.getBoundingClientRect();
        const robotCenterX = robotRect.left + robotRect.width / 2;
        const robotCenterY = robotRect.top + robotRect.height / 4;
        
        const angle = Math.atan2(e.clientY - robotCenterY, e.clientX - robotCenterX);
        const degrees = angle * (180 / Math.PI);
        
        const maxRotation = 20;
        const clampedRotation = Math.max(-maxRotation, Math.min(maxRotation, degrees / 5));
        
        robotHead.style.transform = `rotate(${clampedRotation}deg)`;
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in, .slide-left, .slide-right, .scale-in').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// SCROLL PROGRESS BAR
// ============================================
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    const progressCircle = document.getElementById('progress-circle');
    const progressPercent = document.getElementById('progress-percent');
    
    if (!progressBar) return;
    
    const circumference = 2 * Math.PI * 20; // radius = 20
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        
        // Update top bar
        progressBar.style.width = scrolled + '%';
        
        // Update circular progress
        if (progressCircle && progressPercent) {
            const offset = circumference - (scrolled / 100) * circumference;
            progressCircle.style.strokeDashoffset = offset;
            progressPercent.textContent = Math.round(scrolled) + '%';
        }
    });
}

// ============================================
// COUNTDOWN TIMER
// ============================================
function initCountdownTimer() {
    const hoursEl = document.getElementById('timer-hours');
    const minutesEl = document.getElementById('timer-minutes');
    const secondsEl = document.getElementById('timer-seconds');
    
    if (!hoursEl || !minutesEl || !secondsEl) return;
    
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);
    
    function updateTimer() {
        const now = new Date();
        const diff = endDate - now;
        
        if (diff <= 0) {
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
        
        // Add pulse effect when time is running out
        if (hours < 1) {
            hoursEl.parentElement.classList.add('animate-pulse');
            minutesEl.parentElement.classList.add('animate-pulse');
            secondsEl.parentElement.classList.add('animate-pulse');
        }
    }
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

// ============================================
// SCALING CALCULATOR
// ============================================
function initScalingCalculator() {
    const accountsInput = document.getElementById('accounts-count');
    const avgDealInput = document.getElementById('avg-deal-input');
    const accountsDisplay = document.getElementById('accounts-display');
    const revenueOutput = document.getElementById('potential-revenue');
    const leadsOutput = document.getElementById('potential-leads');
    const roiOutput = document.getElementById('scaling-roi');
    const costAccountsEl = document.getElementById('cost-accounts');
    const costAccountsTotalEl = document.getElementById('cost-accounts-total');
    const costProxiesEl = document.getElementById('cost-proxies');
    const costProxiesTotalEl = document.getElementById('cost-proxies-total');
    const totalCostEl = document.getElementById('total-cost');
    const grossRevenueEl = document.getElementById('gross-revenue');
    const minusCostEl = document.getElementById('minus-cost');
    const netProfitEl = document.getElementById('net-profit');
    const scaleExampleAccounts = document.getElementById('scale-example-accounts');
    const scaleExampleRevenue = document.getElementById('scale-example-revenue');
    
    if (!accountsInput) return;
    
    function calculate() {
        const accounts = parseFloat(accountsInput.value) || 1;
        const avgDeal = parseFloat(avgDealInput?.value) || 500;
        const leadsPerAccount = 50;
        const conversion = 0.1;
        const accountCost = 8;
        const proxyCost = 10;
        const subscriptionCost = 50;
        
        // Расчеты
        const totalLeads = accounts * leadsPerAccount;
        const grossRevenue = totalLeads * conversion * avgDeal;
        const accountsCost = accounts * accountCost;
        const proxiesCost = accounts * proxyCost;
        const totalCost = subscriptionCost + accountsCost + proxiesCost;
        const netProfit = grossRevenue - totalCost;
        const roi = Math.round((netProfit / totalCost) * 100);
        
        // Обновление UI без анимации для мгновенного обновления
        if (accountsDisplay) accountsDisplay.textContent = accounts;
        if (leadsOutput) leadsOutput.textContent = totalLeads.toLocaleString();
        if (revenueOutput) revenueOutput.textContent = Math.round(grossRevenue).toLocaleString();
        if (roiOutput) roiOutput.textContent = Math.max(0, roi).toLocaleString() + '%';
        
        if (costAccountsEl) costAccountsEl.textContent = accounts;
        if (costAccountsTotalEl) costAccountsTotalEl.textContent = '$' + accountsCost.toLocaleString();
        if (costProxiesEl) costProxiesEl.textContent = accounts;
        if (costProxiesTotalEl) costProxiesTotalEl.textContent = '$' + proxiesCost.toLocaleString();
        if (totalCostEl) totalCostEl.textContent = '$' + totalCost.toLocaleString();
        if (grossRevenueEl) grossRevenueEl.textContent = '$' + Math.round(grossRevenue).toLocaleString();
        if (minusCostEl) minusCostEl.textContent = '$' + totalCost.toLocaleString();
        if (netProfitEl) netProfitEl.textContent = '$' + Math.round(netProfit).toLocaleString();
        
        // Обновление примера внизу
        if (scaleExampleAccounts) scaleExampleAccounts.textContent = accounts;
        if (scaleExampleRevenue) scaleExampleRevenue.textContent = Math.round(grossRevenue).toLocaleString();
    }
    
    accountsInput.addEventListener('input', calculate);
    if (avgDealInput) avgDealInput.addEventListener('input', calculate);
    calculate();
}

// ============================================
// COMPETITOR COMPARISON
// ============================================
function initCompetitorComparison() {
    const features = document.querySelectorAll('.feature-row');
    
    features.forEach((feature, index) => {
        setTimeout(() => {
            feature.style.opacity = '1';
            feature.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ============================================
// DEMO AI COMMENTING
// ============================================
function initDemo() {
    const demoPost = document.getElementById('demo-post');
    if (!demoPost) return;
    
    const comments = [
        { 
            name: "Елена Соколова",
            role: "Маркетолог",
            company: "Digital Agency",
            avatar: "ЕС",
            color: "#4ECDC4",
            text: "Андрей, отличный вопрос! Мы недавно начали тестировать Threads для строительной ниши - результаты впечатляют. Стоимость лида упала в 3 раза по сравнению с контекстом 🚀",
            delay: 2000,
            tone: "профессиональный"
        },
        { 
            name: "Дмитрий Волков",
            role: "CEO",
            company: "PropTech Startup",
            avatar: "ДВ",
            color: "#FF6B6B",
            text: "Привет! У нас похожая ситуация была. Переключились на органику в соцсетях + автоматизацию. Сейчас лид стоит $80 вместо $300. Могу поделиться опытом, если интересно 😊",
            delay: 3500,
            tone: "дружелюбный"
        },
        { 
            name: "Ольга Петренко",
            role: "Директор по продажам",
            company: "СтройИнвест",
            avatar: "ОП",
            color: "#A8E6CF",
            text: "Андрей, в строительстве сейчас работает контент-маркетинг + таргетинг на теплую аудиторию. Но главное - нужна система лидогенерации, которая работает 24/7. Вы пробовали AI-инструменты?",
            delay: 5000,
            tone: "экспертный"
        },
        { 
            name: "Максим Орлов",
            role: "Архитектор",
            company: "Freelance",
            avatar: "МО",
            color: "#FFD93D",
            text: "Коллега, я бы посоветовал обратить внимание на новые платформы типа Threads. Там конкуренции пока мало, а аудитория платежеспособная. Плюс можно автоматизировать через AI 💡",
            delay: 6500,
            tone: "советующий"
        },
        { 
            name: "Виктория Белова",
            role: "Маркетинг-консультант",
            company: "MarketPro",
            avatar: "ВБ",
            color: "#C77DFF",
            text: "Андрей, понимаю вашу боль! Работала с 5 строительными компаниями - у всех одна проблема: дорогие лиды. Решение: комбо из органики + AI-автоматизация. Результат: -60% к стоимости лида ✨",
            delay: 8000,
            tone: "эмпатичный"
        },
        { 
            name: "Сергей Ковалев",
            role: "Инвестор",
            company: "RealEstate Fund",
            avatar: "СК",
            color: "#06FFA5",
            text: "Интересная тема! Мы в фонде инвестируем в PropTech. Сейчас тренд - автоматизация лидогенерации через AI. Threads показывает ROI 300%+ для строительного сегмента. Есть кейсы, могу скинуть 📊",
            delay: 9500,
            tone: "деловой"
        },
        { 
            name: "Анна Морозова",
            role: "SMM-специалист",
            company: "BuildMedia",
            avatar: "АМ",
            color: "#FF9ECD",
            text: "Привет, Андрей! Мы специализируемся на строительной нише. Секрет: нужно быть там, где конкурентов еще нет. Threads + AI-комментирование = золотая жила сейчас 🎯",
            delay: 11000,
            tone: "энергичный"
        },
        { 
            name: "Игорь Смирнов",
            role: "Руководитель отдела продаж",
            company: "ЭлитСтрой",
            avatar: "ИС",
            color: "#7B68EE",
            text: "Коллега, у нас была та же проблема. Решили через автоматизацию комментариев в Threads. За месяц получили 67 квалифицированных лидов по $45. Рекомендую попробовать 👍",
            delay: 12500,
            tone: "практичный"
        },
        { 
            name: "Мария Кузнецова",
            role: "Основатель",
            company: "SmartHome Solutions",
            avatar: "МК",
            color: "#00D9FF",
            text: "Андрей, отличный вопрос! Мы тоже в строительной сфере (умные дома). Перешли на AI-автоматизацию 2 месяца назад - лучшее решение за последний год. Лиды качественные и дешевые 🏠",
            delay: 14000,
            tone: "вдохновляющий"
        },
        { 
            name: "Алексей Новиков",
            role: "Digital-стратег",
            company: "GrowthLab",
            avatar: "АН",
            color: "#F72585",
            text: "Андрей, вижу вы в строительстве. Есть проверенная стратегия: Threads + AI-комментинг + автоматизация чатов = стабильный поток лидов. Работает для 15+ наших клиентов. Могу показать цифры 📈",
            delay: 15500,
            tone: "стратегический"
        }
    ];
    
    const commentsContainer = document.getElementById('demo-comments');
    const commentCount = document.getElementById('comment-count');
    let currentCount = 0;
    
    comments.forEach((comment, index) => {
        setTimeout(() => {
            currentCount++;
            commentCount.textContent = currentCount;
            
            const commentEl = document.createElement('div');
            commentEl.className = 'glass rounded-2xl p-6 fade-in visible hover:scale-[1.02] transition cursor-interactive';
            commentEl.style.borderLeft = `4px solid ${comment.color}`;
            commentEl.innerHTML = `
                <div class="flex items-start gap-4">
                    <div class="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center text-xl font-black" style="background: ${comment.color};">
                        ${comment.avatar}
                    </div>
                    <div class="flex-1">
                        <div class="flex items-center gap-3 mb-1">
                            <h4 class="font-bold text-lg">${comment.name}</h4>
                            <span class="px-2 py-1 bg-white/10 rounded text-xs">${comment.tone}</span>
                        </div>
                        <p class="text-sm text-gray-400 mb-3">${comment.role} • ${comment.company}</p>
                        <p class="text-gray-200 leading-relaxed">${comment.text}</p>
                        <div class="flex gap-4 mt-4 text-sm text-gray-500">
                            <button class="hover:text-purple-400 transition">❤️ Нравится</button>
                            <button class="hover:text-purple-400 transition">💬 Ответить</button>
                        </div>
                    </div>
                </div>
            `;
            commentsContainer.appendChild(commentEl);
            
            // Remove loading message on first comment
            if (index === 0) {
                const loadingMsg = commentsContainer.querySelector('.text-center');
                if (loadingMsg) loadingMsg.remove();
            }
        }, comment.delay);
    });
}

// ============================================
// ROI CALCULATOR
// ============================================
function initROICalculator() {
    const inputs = {
        monthlyBudget: document.getElementById('monthly-budget'),
        currentCost: document.getElementById('current-cost'),
        currentLeads: document.getElementById('current-leads')
    };
    
    const outputs = {
        newCost: document.getElementById('new-cost'),
        newLeads: document.getElementById('new-leads'),
        totalSavings: document.getElementById('total-savings'),
        roi: document.getElementById('roi')
    };
    
    function calculateROI() {
        const monthlyBudget = parseFloat(inputs.monthlyBudget.value) || 5000;
        const currentCost = parseFloat(inputs.currentCost.value) || 50;
        const currentLeads = parseFloat(inputs.currentLeads.value) || 100;
        
        // С PLAZMA: стоимость лида снижается на 60%
        const newCostPerLead = currentCost * 0.4;
        
        // С тем же бюджетом получаем больше лидов
        const newLeadsCount = Math.round(monthlyBudget / newCostPerLead);
        
        // Экономия = разница в количестве лидов * новая стоимость
        const currentTotal = currentCost * currentLeads;
        const newTotal = newCostPerLead * newLeadsCount;
        const monthlySavings = currentTotal - (newCostPerLead * currentLeads);
        
        // ROI = (экономия - стоимость подписки) / стоимость подписки * 100
        const subscriptionCost = 50;
        const roiPercent = Math.round(((monthlySavings - subscriptionCost) / subscriptionCost) * 100);
        
        animateCounter(outputs.newCost, newCostPerLead.toFixed(0));
        animateCounter(outputs.newLeads, newLeadsCount);
        animateCounter(outputs.totalSavings, Math.round(monthlySavings));
        animateCounter(outputs.roi, Math.max(0, roiPercent));
    }
    
    Object.values(inputs).forEach(input => {
        if (input) input.addEventListener('input', calculateROI);
    });
    
    calculateROI();
}

function animateCounter(element, target) {
    if (!element) return;
    
    const duration = 1500;
    const start = parseFloat(element.textContent.replace(/[^0-9.-]/g, '')) || 0;
    const end = parseFloat(target);
    const startTime = Date.now();
    
    function update() {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = start + (end - start) * easeProgress;
        
        if (end > 100) {
            element.textContent = Math.round(current).toLocaleString();
        } else {
            element.textContent = Math.round(current);
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    update();
}

// ============================================
// DASHBOARD CHARTS
// ============================================
function initDashboard() {
    // Comments Chart
    const commentsCtx = document.getElementById('comments-chart');
    if (commentsCtx) {
        new Chart(commentsCtx, {
            type: 'line',
            data: {
                labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
                datasets: [{
                    label: 'Комментарии',
                    data: [120, 190, 300, 500, 420, 650, 890],
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    y: { 
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: '#fff' }
                    },
                    x: { 
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: '#fff' }
                    }
                }
            }
        });
    }
    
    // Leads Chart
    const leadsCtx = document.getElementById('leads-chart');
    if (leadsCtx) {
        new Chart(leadsCtx, {
            type: 'bar',
            data: {
                labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
                datasets: [{
                    label: 'Лиды',
                    data: [12, 19, 25, 38, 42, 55, 67],
                    backgroundColor: 'rgba(118, 75, 162, 0.8)',
                    borderColor: '#764ba2',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    y: { 
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: '#fff' }
                    },
                    x: { 
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: '#fff' }
                    }
                }
            }
        });
    }
    
    // Conversion Chart
    const conversionCtx = document.getElementById('conversion-chart');
    if (conversionCtx) {
        new Chart(conversionCtx, {
            type: 'doughnut',
            data: {
                labels: ['Конверсия', 'Не конвертировано'],
                datasets: [{
                    data: [35, 65],
                    backgroundColor: ['#667eea', 'rgba(255, 255, 255, 0.1)'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { 
                        display: true,
                        labels: { color: '#fff' }
                    }
                }
            }
        });
    }
    
    // Animate stats
    animateCounter(document.getElementById('stat-comments'), 8547);
    animateCounter(document.getElementById('stat-users'), 3421);
    animateCounter(document.getElementById('stat-leads'), 892);
    animateCounter(document.getElementById('stat-growth'), 347);
}

// ============================================
// AI PERSONA CONFIGURATOR
// ============================================
function initPersonaConfig() {
    const toneButtons = document.querySelectorAll('.tone-btn');
    const styleButtons = document.querySelectorAll('.style-btn');
    const goalButtons = document.querySelectorAll('.goal-btn');
    
    toneButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            toneButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            showToast('Тон голоса обновлен: ' + btn.textContent, 'success');
        });
    });
    
    styleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            styleButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            showToast('Стиль общения обновлен: ' + btn.textContent, 'success');
        });
    });
    
    goalButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            goalButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            showToast('Цель обновлена: ' + btn.textContent, 'success');
        });
    });
    
    const saveBtn = document.getElementById('save-persona');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            showToast('AI-персона сохранена успешно!', 'success');
        });
    }
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('open');
            mobileMenu.classList.toggle('open');
        });
        
        // Close on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('open');
                mobileMenu.classList.remove('open');
            });
        });
        
        // Close on outside click
        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('open') && 
                !mobileMenu.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('open');
                mobileMenu.classList.remove('open');
            }
        });
    }
}

// ============================================
// MOBILE OPTIMIZATIONS
// ============================================
function initMobileOptimizations() {
    // Disable custom cursor on mobile
    if ('ontouchstart' in window) {
        const cursor = document.getElementById('custom-cursor');
        const trail = document.getElementById('cursor-trail');
        if (cursor) cursor.style.display = 'none';
        if (trail) trail.style.display = 'none';
        document.body.style.cursor = 'auto';
    }
    
    // Add touch feedback to buttons
    document.querySelectorAll('button, .btn-primary, .cursor-interactive').forEach(el => {
        el.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        el.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
    
    // Prevent zoom on double tap for specific elements
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}

// ============================================
// CONTACT FORM
// ============================================
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: form.name.value,
            email: form.email.value,
            message: form.message.value
        };
        
        if (!formData.name || !formData.email || !formData.message) {
            showToast('Пожалуйста, заполните все поля', 'error');
            return;
        }
        
        if (!isValidEmail(formData.email)) {
            showToast('Пожалуйста, введите корректный email', 'error');
            return;
        }
        
        showToast('Отправка...', 'info');
        
        setTimeout(() => {
            showToast('Спасибо! Мы свяжемся с вами в течение 24 часов', 'success');
            form.reset();
        }, 1500);
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 px-6 py-4 rounded-xl font-semibold z-50 fade-in visible`;
    
    const colors = {
        success: 'bg-green-600',
        error: 'bg-red-600',
        info: 'bg-blue-600'
    };
    
    toast.classList.add(colors[type] || colors.info);
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ============================================
// ONLINE COUNTER
// ============================================
function initOnlineCounter() {
    const onlineCount = document.getElementById('online-count');
    if (!onlineCount) return;
    
    function updateCount() {
        const baseCount = 47;
        const variation = Math.floor(Math.random() * 10) - 5;
        const newCount = Math.max(30, baseCount + variation);
        onlineCount.textContent = newCount;
    }
    
    setInterval(updateCount, 5000);
}

// ============================================
// ACTIVITY FEED
// ============================================
function initActivityFeed() {
    const feed = document.getElementById('activity-feed');
    if (!feed) return;
    
    const activities = [
        { icon: '🎯', text: 'Новый лид из Москвы', color: 'green' },
        { icon: '💬', text: 'AI ответил на 3 комментария', color: 'blue' },
        { icon: '👤', text: 'Пользователь подписался', color: 'purple' },
        { icon: '📊', text: 'Конверсия выросла до 38%', color: 'pink' },
        { icon: '🚀', text: 'Запущен новый аккаунт', color: 'orange' },
        { icon: '💰', text: 'Получен платеж $500', color: 'green' }
    ];
    
    function showActivity() {
        const activity = activities[Math.floor(Math.random() * activities.length)];
        
        const notification = document.createElement('div');
        notification.className = `glass rounded-lg p-2 mb-1.5 border-l-2 border-${activity.color}-500 cursor-pointer hover:scale-105 transition`;
        notification.style.animation = 'slideInLeft 0.5s ease-out';
        notification.style.opacity = '0.7';
        notification.innerHTML = `
            <div class="flex items-center gap-2">
                <div class="text-base">${activity.icon}</div>
                <div class="text-xs text-gray-400">${activity.text}</div>
            </div>
        `;
        
        feed.insertBefore(notification, feed.firstChild);
        
        if (feed.children.length > 4) {
            const last = feed.lastChild;
            last.style.animation = 'slideOutLeft 0.5s ease-out';
            setTimeout(() => last.remove(), 500);
        }
    }
    
    setInterval(showActivity, 4000);
    showActivity();
}

// ============================================
// CHATBOT
// ============================================
function initChatbot() {
    const chatbotButton = document.getElementById('chatbot-button');
    const chatbotWindow = document.getElementById('chatbot-window');
    const closeChatbot = document.getElementById('close-chatbot');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotMessages = document.getElementById('chatbot-messages');
    
    if (!chatbotButton || !chatbotWindow) return;
    
    const responses = [
        'Отличный вопрос! PLAZMA работает на базе GPT-4 и анализирует контекст постов.',
        'Да, у нас есть бесплатный пробный период на 7 дней!',
        'Стоимость начинается от $50/месяц. Окупается за 1-2 лида.',
        'Мы поддерживаем интеграцию с Telegram, CRM системами и email.',
        'AI работает 24/7 и может обрабатывать до 1000 постов в день.',
        'Да, вы можете настроить тон и стиль общения AI под вашу нишу.',
        'Средняя конверсия наших клиентов - 35% от комментариев в лиды.',
        'Безопасность на первом месте - используем прокси и ротацию аккаунтов.'
    ];
    
    chatbotButton.addEventListener('click', () => {
        chatbotWindow.style.display = 'block';
        chatbotWindow.style.animation = 'slideInLeft 0.3s ease-out';
        
        if (chatbotMessages.children.length === 0) {
            addBotMessage('Привет! Я AI-ассистент PLAZMA. Чем могу помочь?');
        }
    });
    
    closeChatbot.addEventListener('click', () => {
        chatbotWindow.style.animation = 'slideOutLeft 0.3s ease-out';
        setTimeout(() => chatbotWindow.style.display = 'none', 300);
    });
    
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (!message) return;
        
        addUserMessage(message);
        chatbotInput.value = '';
        
        setTimeout(() => {
            const response = responses[Math.floor(Math.random() * responses.length)];
            addBotMessage(response);
        }, 1000);
    }
    
    chatbotSend.addEventListener('click', sendMessage);
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    
    function addUserMessage(text) {
        const msg = document.createElement('div');
        msg.className = 'mb-3 text-right';
        msg.innerHTML = `<div class="inline-block bg-purple-600 rounded-xl px-4 py-2 max-w-xs">${text}</div>`;
        chatbotMessages.appendChild(msg);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    function addBotMessage(text) {
        const msg = document.createElement('div');
        msg.className = 'mb-3';
        msg.innerHTML = `<div class="inline-block bg-black/50 rounded-xl px-4 py-2 max-w-xs border border-purple-500/30">${text}</div>`;
        chatbotMessages.appendChild(msg);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
}

// ============================================
// AI PLAYGROUND
// ============================================
function initAIPlayground() {
    const generateBtn = document.getElementById('generate-ai-comment');
    const postInput = document.getElementById('playground-post');
    const resultDiv = document.getElementById('playground-result');
    
    if (!generateBtn || !postInput || !resultDiv) return;
    
    generateBtn.addEventListener('click', () => {
        const post = postInput.value.trim();
        if (!post) {
            showToast('Введите текст поста', 'error');
            return;
        }
        
        generateBtn.textContent = '⏳ Генерация...';
        generateBtn.disabled = true;
        
        setTimeout(() => {
            const comments = [
                'Отличная идея! Мы тоже работаем в этой нише и видим огромный потенциал. Как планируете масштабироваться?',
                'Интересный подход! У нас был похожий опыт. Главное - правильно настроить автоматизацию. Могу поделиться кейсом.',
                'Круто! Это именно то, что сейчас нужно рынку. Какие результаты уже есть?',
                'Звучит перспективно! Мы как раз ищем решение для этой задачи. Можно узнать подробнее?'
            ];
            
            const comment = comments[Math.floor(Math.random() * comments.length)];
            
            resultDiv.innerHTML = `
                <div class="glass rounded-xl p-6 border-l-4 border-green-500">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold">AI</div>
                        <div>
                            <div class="font-bold">PLAZMA AI</div>
                            <div class="text-xs text-gray-400">Сгенерировано за 2 секунды</div>
                        </div>
                    </div>
                    <p class="text-gray-200 leading-relaxed">${comment}</p>
                    <div class="mt-4 flex gap-3">
                        <button class="px-4 py-2 bg-green-600 rounded-lg text-sm font-semibold hover:bg-green-700 transition">✓ Использовать</button>
                        <button class="px-4 py-2 glass rounded-lg text-sm font-semibold hover:bg-white/10 transition" onclick="document.getElementById('generate-ai-comment').click()">🔄 Другой вариант</button>
                    </div>
                </div>
            `;
            
            generateBtn.textContent = '🤖 Сгенерировать AI комментарий →';
            generateBtn.disabled = false;
        }, 2000);
    });
}

// ============================================
// LIVE DASHBOARD
// ============================================
function initLiveDashboard() {
    const elements = {
        comments: document.getElementById('live-comments'),
        engaged: document.getElementById('live-engaged'),
        leads: document.getElementById('live-leads'),
        revenue: document.getElementById('live-revenue')
    };
    
    if (!elements.comments) return;
    
    function updateStats() {
        if (elements.comments) {
            const current = parseInt(elements.comments.textContent.replace(/,/g, ''));
            elements.comments.textContent = (current + Math.floor(Math.random() * 5)).toLocaleString();
        }
        
        if (elements.engaged) {
            const current = parseInt(elements.engaged.textContent.replace(/,/g, ''));
            elements.engaged.textContent = (current + Math.floor(Math.random() * 10)).toLocaleString();
        }
        
        if (elements.leads) {
            const current = parseInt(elements.leads.textContent.replace(/,/g, ''));
            elements.leads.textContent = (current + Math.floor(Math.random() * 3)).toLocaleString();
        }
        
        if (elements.revenue) {
            const current = parseInt(elements.revenue.textContent.replace(/,/g, ''));
            elements.revenue.textContent = (current + Math.floor(Math.random() * 200)).toLocaleString();
        }
    }
    
    setInterval(updateStats, 5000);
}

// ============================================
// QUIZ
// ============================================
function initQuiz() {
    const quizOptions = document.querySelectorAll('.quiz-option');
    const quizContainer = document.getElementById('quiz-container');
    const quizResult = document.getElementById('quiz-result');
    
    if (!quizOptions.length) return;
    
    quizOptions.forEach(option => {
        option.addEventListener('click', () => {
            const answer = option.dataset.answer;
            
            quizContainer.classList.add('hidden');
            quizResult.classList.remove('hidden');
            
            const results = {
                saas: {
                    title: 'PLAZMA идеально подходит для SaaS!',
                    text: 'Ваша целевая аудитория активна в Threads. AI поможет находить потенциальных клиентов и вести их к демо.',
                    discount: '20%'
                },
                agency: {
                    title: 'Отличный выбор для агентств!',
                    text: 'Threads - идеальная площадка для поиска клиентов для услуг. AI автоматизирует лидогенерацию.',
                    discount: '15%'
                },
                ecommerce: {
                    title: 'E-commerce может взлететь с PLAZMA!',
                    text: 'Threads дает доступ к платежеспособной аудитории. AI найдет покупателей для ваших товаров.',
                    discount: '15%'
                },
                infobiz: {
                    title: 'Инфобизнес + PLAZMA = 🚀',
                    text: 'Ваша аудитория уже в Threads. AI поможет собрать подписчиков и продавать курсы.',
                    discount: '20%'
                }
            };
            
            const result = results[answer] || results.saas;
            
            quizResult.innerHTML = `
                <div class="text-center">
                    <div class="text-6xl mb-6">🎉</div>
                    <h3 class="text-3xl font-bold mb-4 gradient-text">${result.title}</h3>
                    <p class="text-lg text-gray-300 mb-6">${result.text}</p>
                    <div class="p-6 bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-xl border border-green-500/30 mb-6">
                        <p class="text-2xl font-bold text-green-400">Ваша персональная скидка: ${result.discount}</p>
                        <p class="text-sm text-gray-400 mt-2">Используйте код: QUIZ${result.discount.replace('%', '')}</p>
                    </div>
                    <button class="btn-primary text-lg" onclick="scrollToSection('pricing')">
                        Получить скидку →
                    </button>
                </div>
            `;
        });
    });
}

// ============================================
// PAYBACK CALCULATOR
// ============================================
function initPaybackCalculator() {
    const avgCheckInput = document.getElementById('payback-avg-check');
    const conversionInput = document.getElementById('payback-conversion');
    const paybackDaysEl = document.getElementById('payback-days');
    const paybackDaysCopyEl = document.getElementById('payback-days-copy');
    const paybackDaysTextEl = document.getElementById('payback-days-text');
    const paybackDaysTextCopyEl = document.getElementById('payback-days-text-copy');
    const leadsPerDayEl = document.getElementById('payback-leads-per-day');
    const salesPerDayEl = document.getElementById('payback-sales-per-day');
    const revenuePerDayEl = document.getElementById('payback-revenue-per-day');
    const totalRevenueEl = document.getElementById('payback-total-revenue');
    const netProfitEl = document.getElementById('payback-net-profit');
    const roiEl = document.getElementById('payback-roi');
    
    if (!avgCheckInput || !paybackDaysEl) return;
    
    function getDaysText(days) {
        if (days === 1) return 'день';
        if (days >= 2 && days <= 4) return 'дня';
        return 'дней';
    }
    
    function calculate() {
        const avgCheck = parseFloat(avgCheckInput.value) || 500;
        const conversion = (parseFloat(conversionInput.value) || 10) / 100;
        const subscriptionCost = 50;
        const leadsPerDay = 3; // PLAZMA генерирует ~3 лида в день
        
        // Расчеты
        const salesPerDay = leadsPerDay * conversion;
        const revenuePerDay = salesPerDay * avgCheck;
        const daysToPayback = Math.ceil(subscriptionCost / revenuePerDay);
        const totalRevenue = revenuePerDay * daysToPayback;
        const netProfit = totalRevenue - subscriptionCost;
        const roi = Math.round((netProfit / subscriptionCost) * 100);
        
        // Обновление UI
        if (paybackDaysEl) paybackDaysEl.textContent = daysToPayback;
        if (paybackDaysCopyEl) paybackDaysCopyEl.textContent = daysToPayback;
        if (paybackDaysTextEl) paybackDaysTextEl.textContent = getDaysText(daysToPayback);
        if (paybackDaysTextCopyEl) paybackDaysTextCopyEl.textContent = getDaysText(daysToPayback);
        if (leadsPerDayEl) leadsPerDayEl.textContent = leadsPerDay;
        if (salesPerDayEl) salesPerDayEl.textContent = salesPerDay.toFixed(1);
        if (revenuePerDayEl) revenuePerDayEl.textContent = Math.round(revenuePerDay);
        if (totalRevenueEl) totalRevenueEl.textContent = Math.round(totalRevenue);
        if (netProfitEl) netProfitEl.textContent = Math.round(netProfit);
        if (roiEl) roiEl.textContent = Math.max(0, roi);
    }
    
    avgCheckInput.addEventListener('input', calculate);
    if (conversionInput) conversionInput.addEventListener('input', calculate);
    calculate();
}

// ============================================
// RECENT PURCHASES
// ============================================
function initRecentPurchases() {
    const purchasesContainer = document.getElementById('recent-purchases');
    if (!purchasesContainer) return;
    
    const purchases = [
        { name: 'Дмитрий из Москвы', plan: 'PRO (6 месяцев)', time: '2 минуты назад' },
        { name: 'Елена из Санкт-Петербурга', plan: 'STARTER (1 месяц)', time: '5 минут назад' },
        { name: 'Максим из Казани', plan: 'BUSINESS (3 месяца)', time: '8 минут назад' },
        { name: 'Ольга из Новосибирска', plan: 'ENTERPRISE (12 месяцев)', time: '12 минут назад' },
        { name: 'Сергей из Екатеринбурга', plan: 'PRO (6 месяцев)', time: '15 минут назад' }
    ];
    
    function showPurchase() {
        const purchase = purchases[Math.floor(Math.random() * purchases.length)];
        
        const notification = document.createElement('div');
        notification.className = 'glass rounded-xl p-4 mb-3 border-l-4 border-green-500';
        notification.style.animation = 'slideInRight 0.5s ease-out';
        notification.innerHTML = `
            <div class="flex items-center gap-3">
                <div class="text-2xl">✓</div>
                <div class="flex-1">
                    <div class="font-bold text-sm">${purchase.name}</div>
                    <div class="text-xs text-gray-400">купил ${purchase.plan}</div>
                </div>
                <div class="text-xs text-gray-500">${purchase.time}</div>
            </div>
        `;
        
        purchasesContainer.insertBefore(notification, purchasesContainer.firstChild);
        
        if (purchasesContainer.children.length > 4) {
            const last = purchasesContainer.lastChild;
            last.style.animation = 'slideOutRight 0.5s ease-out';
            setTimeout(() => last.remove(), 500);
        }
    }
    
    setInterval(showPurchase, 8000);
    showPurchase();
}

// ============================================
// AFFILIATE CALCULATOR
// ============================================
function initAffiliateCalculator() {
    const clientsSlider = document.getElementById('affiliate-clients');
    const planSelect = document.getElementById('affiliate-plan');
    const clientsDisplay = document.getElementById('affiliate-clients-display');
    const clientsCopy = document.getElementById('affiliate-clients-copy');
    const perClientEl = document.getElementById('affiliate-per-client');
    const monthlyEl = document.getElementById('affiliate-monthly');
    const yearlyEl = document.getElementById('affiliate-yearly');
    const totalEl = document.getElementById('affiliate-total');
    
    if (!clientsSlider || !planSelect) return;
    
    function calculate() {
        const clients = parseInt(clientsSlider.value);
        const planPrice = parseInt(planSelect.value);
        const commission = 0.30; // 30%
        
        const perClient = Math.round(planPrice * commission);
        const monthly = perClient * clients;
        const yearly = monthly * 12;
        
        if (clientsDisplay) clientsDisplay.textContent = clients;
        if (clientsCopy) clientsCopy.textContent = clients;
        if (perClientEl) perClientEl.textContent = perClient;
        if (monthlyEl) monthlyEl.textContent = monthly.toLocaleString();
        if (yearlyEl) yearlyEl.textContent = yearly.toLocaleString();
        if (totalEl) totalEl.textContent = yearly.toLocaleString();
    }
    
    clientsSlider.addEventListener('input', calculate);
    planSelect.addEventListener('change', calculate);
    calculate();
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initLoadingScreen();
    initMobileOptimizations();
    initCustomCursor();
    initParallax();
    initSpaceBackground();
    initRobot();
    initScrollAnimations();
    initScrollProgress();
    initCountdownTimer();
    initScalingCalculator();
    initCompetitorComparison();
    initDemo();
    initROICalculator();
    initDashboard();
    initPersonaConfig();
    initMobileMenu();
    initContactForm();
    initOnlineCounter();
    initActivityFeed();
    initChatbot();
    initAIPlayground();
    initLiveDashboard();
    initQuiz();
    initPaybackCalculator();
    initRecentPurchases();
    initAffiliateCalculator();
});
