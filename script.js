// 存储所有维度的值
const dimensionValues = {
    workHours: 8,
    commute: 30,
    colleagues: 6,
    pressure: 6,
    development: 6,
    salary: 0,
    balance: 6,
    environment: 6,
    teamwork: 6,
    overtime: 6
};

// 初始化所有交互
document.addEventListener('DOMContentLoaded', function() {
    // 1. 工作时长滑动条
    const workHoursSlider = document.getElementById('workHours');
    const workHoursValue = document.getElementById('workHoursValue');
    workHoursSlider.addEventListener('input', function() {
        workHoursValue.textContent = this.value + 'h';
        dimensionValues.workHours = parseFloat(this.value);
    });

    // 2. 通勤时间选择
    const timeOptions = document.querySelectorAll('.time-option');
    timeOptions.forEach(option => {
        option.addEventListener('click', function() {
            timeOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            const value = parseInt(this.dataset.value);
            document.getElementById('commute').value = value;
            dimensionValues.commute = value;
        });
    });

    // 3. 同事关系表情选择
    const emojiOptions = document.querySelectorAll('.emoji-option');
    emojiOptions.forEach(option => {
        option.addEventListener('click', function() {
            emojiOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            dimensionValues.colleagues = parseInt(this.dataset.value);
        });
    });

    // 4. 简化版压力选择
    const pressureOpts = document.querySelectorAll('.pressure-opt');
    const pressureBarFill = document.getElementById('pressureBarFill');

    pressureOpts.forEach(opt => {
        opt.addEventListener('click', function() {
            // 移除所有选中状态
            pressureOpts.forEach(o => o.classList.remove('active'));
            // 添加当前选中状态
            this.classList.add('active');
            
            // 获取分值
            const value = parseInt(this.dataset.value);
            dimensionValues.pressure = value;
            
            // 更新进度条 (10分=100%, 2分=20%)
            const percent = (value / 10) * 100;
            pressureBarFill.style.width = percent + '%';
        });
    });

// 默认选中"有点大"(6分)
document.querySelector('.pressure-opt[data-value="6"]').classList.add('active');
pressureBarFill.style.width = '60%';

    // 5. 职业发展卡片选择
    const cardOptions = document.querySelectorAll('.card-option');
    cardOptions.forEach(option => {
        option.addEventListener('click', function() {
            cardOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            dimensionValues.development = parseInt(this.dataset.value);
        });
    });

    // 6. 星星评分
    const stars = document.querySelectorAll('.stars i');
    const salaryText = document.getElementById('salaryText');
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const value = parseInt(this.dataset.value);
            dimensionValues.salary = value;
            
            // 更新星星显示
            stars.forEach(s => s.classList.remove('active', 'fas'));
            stars.forEach(s => s.classList.add('far'));
            
            for (let i = 0; i < stars.length; i++) {
                if (parseInt(stars[i].dataset.value) <= value) {
                    stars[i].classList.remove('far');
                    stars[i].classList.add('fas', 'active');
                }
            }
            
            // 更新文字
            const texts = ['不太满意', '及格', '中等', '满意', '非常满意'];
            salaryText.textContent = texts[value/2 - 1] || '点击星星评分';
        });
    });

    // 7. 平衡开关
    const toggleOptions = document.querySelectorAll('.toggle-option');
    toggleOptions.forEach(option => {
        option.addEventListener('click', function() {
            toggleOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            dimensionValues.balance = parseInt(this.dataset.value);
        });
    });

    // 8. 办公环境图标
    const iconOptions = document.querySelectorAll('.icon-option');
    iconOptions.forEach(option => {
        option.addEventListener('click', function() {
            iconOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            dimensionValues.environment = parseInt(this.dataset.value);
        });
    });

    // 9. 团队气泡
    const bubbleOptions = document.querySelectorAll('.bubble');
    bubbleOptions.forEach(option => {
        option.addEventListener('click', function() {
            bubbleOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            dimensionValues.teamwork = parseInt(this.dataset.value);
        });
    });

    // 10. 加班饼图
    const pieOptions = document.querySelectorAll('.pie-option');
    pieOptions.forEach(option => {
        option.addEventListener('click', function() {
            pieOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            dimensionValues.overtime = parseInt(this.dataset.value);
        });
    });

    // 默认选中一些选项
    document.querySelector('.time-option[data-value="30"]').click();
    document.querySelector('.emoji-option[data-value="6"]').click();
    document.querySelector('.level-option[data-value="6"]').click();
    document.querySelector('.card-option[data-value="6"]').click();
    document.querySelector('.toggle-option[data-value="6"]').click();
    document.querySelector('.icon-option[data-value="6"]').click();
    document.querySelector('.bubble[data-value="6"]').click();
    document.querySelector('.pie-option[data-value="6"]').click();
});

// 表单提交
document.getElementById('workForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 计算每个维度的标准化分数
    const dimensionScores = {
        workHours: calculateWorkHoursScore(dimensionValues.workHours),
        commute: calculateCommuteScore(dimensionValues.commute),
        colleagues: dimensionValues.colleagues,
        pressure: dimensionValues.pressure,
        development: dimensionValues.development,
        salary: dimensionValues.salary,
        balance: dimensionValues.balance,
        environment: dimensionValues.environment,
        teamwork: dimensionValues.teamwork,
        overtime: dimensionValues.overtime
    };

    // 计算总分
    const totalScore = Object.values(dimensionScores).reduce((a, b) => a + b, 0) * 10;

    // 生成报告
    generateReport(dimensionScores, totalScore);
    
    // 隐藏表单，显示结果
    document.getElementById('workForm').style.display = 'none';
    document.getElementById('result').style.display = 'block';
});

// 工作时长评分计算
function calculateWorkHoursScore(hours) {
    if (hours <= 8) return 10;
    if (hours <= 9) return 8;
    if (hours <= 10) return 6;
    if (hours <= 11) return 4;
    return 2;
}

// 通勤时间评分计算
function calculateCommuteScore(minutes) {
    if (minutes <= 15) return 10;
    if (minutes <= 30) return 8;
    if (minutes <= 45) return 6;
    if (minutes <= 60) return 4;
    return 2;
}

// 生成报告
function generateReport(scores, totalScore) {
    // 更新总分显示
    document.getElementById('totalScore').textContent = totalScore;
    
    // 更新环形进度条
    const ring = document.getElementById('scoreRing');
    const circumference = 2 * Math.PI * 80;
    const offset = circumference - (totalScore / 1000) * circumference;
    ring.style.strokeDasharray = circumference;
    ring.style.strokeDashoffset = offset;
    
    // 设置能量等级表情
    const energyLevel = document.getElementById('energyLevel');
    if (totalScore >= 800) energyLevel.textContent = '⚡⚡⚡';
    else if (totalScore >= 600) energyLevel.textContent = '⚡⚡';
    else if (totalScore >= 400) energyLevel.textContent = '⚡';
    else energyLevel.textContent = '🔋';
    
    // 生成评分信息
    let message = '';
    if (totalScore >= 800) message = '职场元气爆棚！你是团队的小太阳！';
    else if (totalScore >= 600) message = '元气充足，继续保持！';
    else if (totalScore >= 400) message = '有点疲惫，需要充能了～';
    else message = '能量告急，建议好好调整！';
    document.getElementById('scoreMessage').textContent = message;
    
    // 生成维度仪表盘
    renderDashboard(scores);
    
    // 分析优势和待改进
    const strengths = [];
    const improvements = [];
    const dimensionNames = {
        workHours: '工作时长', commute: '通勤时间', colleagues: '同事关系',
        pressure: '工作压力', development: '职业发展', salary: '薪资满意',
        balance: '生活平衡', environment: '办公环境', teamwork: '团队氛围',
        overtime: '加班情况'
    };
    
    Object.entries(scores).forEach(([key, value]) => {
        if (value >= 8) strengths.push(dimensionNames[key]);
        else if (value <= 4) improvements.push(dimensionNames[key]);
    });
    
    document.getElementById('strengths').innerHTML = strengths.length > 0
        ? strengths.map(s => `✨ ${s}`).join(' · ')
        : '暂时没有特别优势的维度，但没关系，继续努力！';
    
    document.getElementById('improvements').innerHTML = improvements.length > 0
        ? improvements.map(s => `⚡ ${s}`).join(' · ')
        : '所有维度都表现不错，太棒了！';
    
    // 生成行动卡片
    generateActionCards(improvements, scores);
}

// 渲染仪表盘
function renderDashboard(scores) {
    const dashboard = document.getElementById('dimensionDashboard');
    dashboard.innerHTML = '';
    
    const dimensionNames = {
        workHours: '工作时长', commute: '通勤', colleagues: '同事',
        pressure: '压力', development: '发展', salary: '薪资',
        balance: '平衡', environment: '环境', teamwork: '团队',
        overtime: '加班'
    };
    
    Object.entries(scores).forEach(([key, value]) => {
        const percentage = (value / 10) * 100;
        const item = document.createElement('div');
        item.className = 'dimension-item';
        item.innerHTML = `
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                <span style="font-size: 14px; color: #666;">${dimensionNames[key]}</span>
                <span style="font-size: 14px; font-weight: 600; color: #667eea;">${value}/10</span>
            </div>
            <div style="height: 8px; background: #f0f0f0; border-radius: 4px; overflow: hidden;">
                <div style="height: 100%; width: ${percentage}%; background: linear-gradient(90deg, #667eea, #764ba2); border-radius: 4px;"></div>
            </div>
        `;
        dashboard.appendChild(item);
    });
}

// 生成行动卡片
function generateActionCards(improvements, scores) {
    const container = document.getElementById('actionCards');
    container.innerHTML = '';
    
    const actions = {
        workHours: { emoji: '⏰', tip: '试试番茄工作法，提高效率' },
        commute: { emoji: '🚗', tip: '听播客/音频课，利用通勤时间' },
        colleagues: { emoji: '🤝', tip: '主动约同事喝杯咖啡聊聊' },
        pressure: { emoji: '🧘', tip: '每天冥想10分钟，缓解压力' },
        development: { emoji: '📚', tip: '制定学习计划，每周进步一点点' },
        salary: { emoji: '💰', tip: '提升技能，准备下次谈薪' },
        balance: { emoji: '🏃', tip: '培养一个工作外的爱好' },
        environment: { emoji: '🌿', tip: '在工位放盆绿植，心情会变好' },
        teamwork: { emoji: '🎯', tip: '组织一次团队建设活动' },
        overtime: { emoji: '😴', tip: '学会说"不"，保护个人时间' }
    };
    
    // 如果改进维度少于3个，随机推荐一些
    let targets = improvements.length > 0 ? improvements : ['balance', 'pressure', 'environment'];
    
    targets.slice(0, 3).forEach(dim => {
        const dimKey = Object.keys(actions).find(key => {
            const names = {workHours: '工作时长', commute: '通勤时间', colleagues: '同事关系',
                pressure: '工作压力', development: '职业发展', salary: '薪资满意',
                balance: '生活平衡', environment: '办公环境', teamwork: '团队氛围',
                overtime: '加班情况'};
            return names[key] === dim;
        });
        
        if (dimKey && actions[dimKey]) {
            const card = document.createElement('div');
            card.className = 'action-card';
            card.innerHTML = `
                <span class="emoji">${actions[dimKey].emoji}</span>
                <span style="font-size: 14px;">${actions[dimKey].tip}</span>
            `;
            container.appendChild(card);
        }
    });
}

// 重置表单
function resetForm() {
    document.getElementById('workForm').style.display = 'block';
    document.getElementById('result').style.display = 'none';
    document.getElementById('workForm').reset();
    
    // 重置所有选中状态
    location.reload(); // 简单粗暴，重新加载页面
}
