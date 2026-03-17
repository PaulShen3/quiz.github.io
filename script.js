document.getElementById('workForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 获取表单数据
    const name = document.getElementById('name').value;
    const jobType = document.getElementById('jobType').value;
    const workYears = document.getElementById('workYears').value;
    const monthlyIncome = parseInt(document.getElementById('monthlyIncome').value) || 0;
    const satisfaction = parseInt(document.getElementById('workSatisfaction').value);
    
    // 获取选中的技能
    const skills = [];
    document.querySelectorAll('input[name="skills"]:checked').forEach(checkbox => {
        skills.push(checkbox.value);
    });
    
    // 计算评分 (1-100分)
    let score = 0;
    
    // 根据工作年限评分 (最高25分)
    const yearScores = {
        '0-1': 10,
        '1-3': 15,
        '3-5': 20,
        '5-10': 23,
        '10+': 25
    };
    score += yearScores[workYears] || 0;
    
    // 根据收入评分 (最高25分)
    if (monthlyIncome >= 20000) score += 25;
    else if (monthlyIncome >= 15000) score += 20;
    else if (monthlyIncome >= 10000) score += 15;
    else if (monthlyIncome >= 5000) score += 10;
    else score += 5;
    
    // 根据满意度评分 (最高25分)
    score += satisfaction * 2.5;
    
    // 根据技能数量评分 (最高25分)
    score += Math.min(skills.length * 5, 25);
    
    // 四舍五入到整数
    score = Math.round(score);
    
    // 生成评语
    let comment = '';
    let suggestions = '';
    
    if (score >= 90) {
        comment = `${name}，您的职业发展非常优秀！`;
        suggestions = '继续保持，可以考虑向管理岗位发展或开拓新的业务领域。';
    } else if (score >= 75) {
        comment = `${name}，您的职业发展良好，有很大潜力！`;
        suggestions = '建议在专业技能上继续深造，可以考虑考取相关证书。';
    } else if (score >= 60) {
        comment = `${name}，您的职业发展处于中等水平。`;
        suggestions = '可以考虑提升技能水平，关注行业发展趋势，寻找更好的发展机会。';
    } else if (score >= 40) {
        comment = `${name}，您的职业发展还有提升空间。`;
        suggestions = '建议制定职业规划，加强学习和技能提升，考虑换一个更适合的岗位。';
    } else {
        comment = `${name}，您需要认真考虑职业发展方向。`;
        suggestions = '建议进行职业咨询，重新规划职业道路，或者考虑转行到更有前景的行业。';
    }
    
    // 显示结果
    document.getElementById('score').textContent = score;
    document.getElementById('comment').textContent = comment;
    document.getElementById('suggestions').textContent = suggestions;
    
    // 隐藏表单，显示结果
    document.getElementById('workForm').style.display = 'none';
    document.getElementById('result').style.display = 'block';
});

// 满意度滑块显示
document.getElementById('workSatisfaction').addEventListener('input', function(e) {
    document.getElementById('satisfactionValue').textContent = e.target.value + '分';
});

// 重置表单
function resetForm() {
    document.getElementById('workForm').style.display = 'block';
    document.getElementById('result').style.display = 'none';
    document.getElementById('workForm').reset();
    document.getElementById('satisfactionValue').textContent = '5分';
}