// 游戏状态
let gameState = {
    confidence: 20,  // 信心值
    relationship: 20, // 关系值
    gameEnded: false,
    isProcessing: false,
    // 添加等级跟踪
    confidenceLevel: 'low',
    relationshipLevel: 'low'
};

// 技术总监话题库
const techTopics = [
    "我们的技术架构采用了最新的微服务设计，可以支持千万级并发访问。",
    "我们的AI算法在行业内处于领先地位，准确率达到了98%以上。",
    "我们拥有自主研发的核心技术，已经申请了多项发明专利。",
    "我们的系统采用云原生架构，具备极强的扩展性和稳定性。",
    "我们的技术团队都是清华北大的博士，在各自领域都有深厚的技术积累。",
    "我们的产品在性能测试中表现优异，响应时间控制在毫秒级别。",
    "我们建立了完善的DevOps体系，代码部署效率提升了10倍。",
    "我们的数据安全方案通过了国际最高级别的认证。"
];

// 商务总监话题库
const businessTopics = [
    "来，我敬您一杯，感谢您今天抽出宝贵时间和我们交流。",
    "这酒真是不错，听说是茅台的特供版，平时很难买到呢。",
    "您的公司在行业内声誉卓著，我们早就仰慕已久了。",
    "来来来，大家一起干一杯，为今天的相遇干杯！",
    "您今天气色真好，一看就是事业有成的成功人士。",
    "这个菜是这家餐厅的招牌，您尝尝看，特别有特色。",
    "您对红酒有研究吗？这瓶是法国波尔多的珍藏版。",
    "难得有机会和您这样的行业专家交流，真是受益匪浅。"
];

// 总经理话题库
const managerTopics = [
    "我觉得我们两家公司有很大的合作空间，不如我们正式建立战略合作关系？",
    "您看我们是否可以签署一个合作协议，共同开发市场？",
    "我提议我们成立一个联合项目组，深度合作。您觉得怎么样？",
    "不如我们今天就确定合作意向，我可以给您最优惠的条件。",
    "我们愿意投入更多资源与您合作，您考虑一下我们的提议如何？"
];

// 对方回复内容
const responses = {
    tech: {
        low: [
            "嗯，听起来不错。",
            "是的，技术确实很重要。",
            "嗯嗯，了解了。",
            "好的，我知道了。"
        ],
        medium: [
            "技术固然重要，但是市场接受度也很关键啊。",
            "听起来挺先进的，不过实际应用效果如何呢？",
            "理论上是这样，但实际落地会不会有困难？",
            "技术领先是好事，但成本控制也要考虑吧。"
        ],
        high: [
            "这个技术方案确实很有前瞻性，我们也在关注这个方向。",
            "您的技术实力确实让人印象深刻，很有合作价值。",
            "看得出来你们在技术上下了很大功夫，这点我很认同。",
            "这样的技术优势确实能在市场上形成竞争力。"
        ],
        veryHigh: [
            "太棒了！这正是我们一直在寻找的技术解决方案！",
            "您的技术团队真是太厉害了，我们非常希望能深入合作！",
            "这个技术如果能应用到我们的业务中，一定会产生巨大价值！",
            "我对您的技术实力完全信服，我们一定要找机会合作！"
        ]
    },
    business: {
        low: [
            "谢谢，您客气了。",
            "好的，谢谢。",
            "嗯，这酒确实不错。",
            "您太客气了。"
        ],
        medium: [
            "您太客气了，我们也就是普通企业而已。",
            "哪里哪里，我们还有很多不足的地方。",
            "过奖了，我们还在学习阶段。",
            "谢谢夸奖，我们会继续努力的。"
        ],
        high: [
            "谢谢您的认可，能认识您这样的朋友真是太好了！",
            "您说得太好了，我们确实应该多交流合作！",
            "和您聊天真是愉快，希望我们能成为长期的合作伙伴！",
            "您的话让我很受用，我们的合作一定会很愉快！"
        ],
        veryHigh: [
            "哈哈，您真是太有意思了！我们一见如故啊！",
            "和您这样的朋友合作，我一百个放心！来，我们再干一杯！",
            "您真是我见过最有魅力的企业家！我们一定要深度合作！",
            "今天认识您真是我的荣幸！我们马上就可以开始合作！"
        ]
    },
    manager: {
        accept: [
            "您的提议很有吸引力，我们确实可以考虑合作！",
            "我觉得这是个双赢的好机会，我们可以进一步详谈！",
            "太好了！我们早就希望能找到像您这样的合作伙伴！",
            "这个合作提议正合我意，我们什么时候可以签约？"
        ],
        reject: [
            "抱歉，我们暂时还没有这方面的计划。",
            "合作的事情还需要我回去和董事会商量一下。",
            "这个提议确实不错，但我们现在的重心在其他项目上。",
            "感谢您的诚意，但我们可能需要更多时间考虑。"
        ]
    }
};

// 等级提示文本
const levelHints = {
    confidence: {
        low: "对方面无表情，似乎对技术能力存疑",
        medium: "对方微微坐正了身子",
        high: "对方眼中闪过一丝赞许的光芒",
        veryHigh: "对方明显被技术实力所折服"
    },
    relationship: {
        low: {
            up: "对方开始收起冷漠，稍微放松了戒备",
            down: "气氛变得尴尬，对方明显保持着距离"
        },
        medium: {
            up: "对方开始放松下来，话语中多了些亲近",
            down: "对方重新变得客套，之前的亲近感在消退"
        },
        high: {
            up: "对方脸上浮现出真诚的笑容",
            down: "对方的笑容变得勉强，热情在减退"
        },
        veryHigh: {
            up: "对方完全放下戒备，如老友般畅谈",
            down: "对方收敛了过度的热情，重新审视起来"
        }
    }
};

// 获取数值对应的等级
function getLevel(value) {
    if (value <= 30) return 'low';
    else if (value <= 50) return 'medium';
    else if (value <= 80) return 'high';
    else return 'veryHigh';
}

// 显示等级变化提示
async function showLevelHint(type, newLevel, direction = 'up') {
    const hintElement = document.getElementById('level-hint');
    let hintText;
    
    if (type === 'confidence') {
        hintText = levelHints[type][newLevel];
    } else {
        hintText = levelHints[type][newLevel][direction];
    }
    
    hintElement.textContent = hintText;
    hintElement.style.display = 'block';
    
    console.log(`💡 等级提示: ${hintText}`);
    
    await sleep(2500); // 显示2.5秒
    
    hintElement.style.display = 'none';
    await sleep(500); // 短暂间隔
}

// 检查并显示等级变化提示
async function checkAndShowLevelChanges() {
    const newConfidenceLevel = getLevel(gameState.confidence);
    const newRelationshipLevel = getLevel(gameState.relationship);
    
    // 检查信心等级变化
    if (newConfidenceLevel !== gameState.confidenceLevel) {
        console.log(`📊 信心等级变化: ${gameState.confidenceLevel} → ${newConfidenceLevel}`);
        await showLevelHint('confidence', newConfidenceLevel);
        gameState.confidenceLevel = newConfidenceLevel;
    }
    
    // 检查关系等级变化
    if (newRelationshipLevel !== gameState.relationshipLevel) {
        console.log(`📊 关系等级变化: ${gameState.relationshipLevel} → ${newRelationshipLevel}`);
        
        // 确定是升级还是降级
        const levelOrder = ['low', 'medium', 'high', 'veryHigh'];
        const oldIndex = levelOrder.indexOf(gameState.relationshipLevel);
        const newIndex = levelOrder.indexOf(newRelationshipLevel);
        const direction = newIndex > oldIndex ? 'up' : 'down';
        
        await showLevelHint('relationship', newRelationshipLevel, direction);
        gameState.relationshipLevel = newRelationshipLevel;
    }
}

// 检查游戏失败条件
function checkGameFailure() {
    if (gameState.confidence <= 0 || gameState.relationship <= 0) {
        console.log('💀 游戏失败！信心或关系降至0！');
        let reason = '';
        if (gameState.confidence <= 0 && gameState.relationship <= 0) {
            reason = '信心和关系都降至0，对方彻底失去兴趣...';
        } else if (gameState.confidence <= 0) {
            reason = '对方对您的技术实力失去信心...';
        } else {
            reason = '双方关系恶化，对方不愿继续交流...';
        }
        showGameEnd(false, "合作失败！", reason);
        return true;
    }
    return false;
}

// 初始化游戏
function initGame() {
    gameState = {
        confidence: 20,
        relationship: 20,
        gameEnded: false,
        isProcessing: false,
        confidenceLevel: getLevel(20),
        relationshipLevel: getLevel(20)
    };
    updateDisplay();
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('level-hint').style.display = 'none';
    document.getElementById('speaker-label').textContent = '选择发言人';
    hideDialogs();
    
    // 控制台输出初始状态
    console.log('=== 游戏初始化 ===');
    console.log(`信心: ${gameState.confidence}% (${gameState.confidenceLevel})`);
    console.log(`关系: ${gameState.relationship}% (${gameState.relationshipLevel})`);
    console.log('==================');
}

// 更新显示
function updateDisplay() {
    document.getElementById('confidence-value').textContent = gameState.confidence;
    document.getElementById('relationship-value').textContent = gameState.relationship;
}

// 隐藏对话
function hideDialogs() {
    document.getElementById('opponent-dialog').style.display = 'none';
    document.getElementById('our-dialog').style.display = 'none';
    document.getElementById('click-hint').style.display = 'none';
    document.getElementById('our-speech').style.display = 'none';
    // 隐藏我方发言区域，显示角色选择
    document.getElementById('our-speech-area').style.display = 'none';
    document.getElementById('role-selection').style.display = 'flex';
}

// 等待玩家点击继续
function waitForClick() {
    return new Promise((resolve) => {
        // 显示点击提示
        document.getElementById('click-hint').style.display = 'block';
        
        const clickHandler = (event) => {
            // 避免点击角色按钮时触发
            if (event.target.classList.contains('role-btn') || 
                event.target.classList.contains('restart-btn') ||
                event.target.closest('.role-btn') ||
                event.target.closest('.restart-btn')) {
                return;
            }
            
            // 隐藏点击提示
            document.getElementById('click-hint').style.display = 'none';
            
            document.removeEventListener('click', clickHandler);
            document.removeEventListener('touchstart', clickHandler);
            resolve();
        };
        
        document.addEventListener('click', clickHandler);
        document.addEventListener('touchstart', clickHandler);
    });
}

// 选择角色
async function selectRole(role) {
    if (gameState.isProcessing || gameState.gameEnded) return;
    
    gameState.isProcessing = true;
    hideDialogs();
    
    // 隐藏角色选择，显示我方发言区域
    document.getElementById('role-selection').style.display = 'none';
    document.getElementById('our-speech-area').style.display = 'block';
    
    // 触发对应人物图片的说话动画
    const roleToImageMap = {
        'tech': 'img-man1',      // 技术总监
        'manager': 'img-man2',   // 总经理  
        'business': 'img-man3'   // 商务总监
    };
    
    const imageId = roleToImageMap[role];
    const imageElement = document.getElementById(imageId);
    
    if (imageElement) {
        // 添加说话动画类
        imageElement.classList.add('speaking');
        
        // 1秒后移除动画类
        setTimeout(() => {
            imageElement.classList.remove('speaking');
        }, 1000);
    }
    
    // 更新发言人标签
    const roleNames = {
        'tech': '技术总监',
        'manager': '总经理', 
        'business': '商务总监'
    };
    document.getElementById('speaker-label').textContent = roleNames[role];
    
    console.log(`\n--- ${roleNames[role]}发言 ---`);
    console.log(`发言前 - 信心: ${gameState.confidence}%, 关系: ${gameState.relationship}%`);
    
    // 获取我方话题
    let ourTopic;
    if (role === 'tech') {
        ourTopic = techTopics[Math.floor(Math.random() * techTopics.length)];
    } else if (role === 'business') {
        ourTopic = businessTopics[Math.floor(Math.random() * businessTopics.length)];
    } else if (role === 'manager') {
        ourTopic = managerTopics[Math.floor(Math.random() * managerTopics.length)];
    }
    
    console.log(`我方话题: ${ourTopic}`);
    
    // 更新属性
    const oldConfidence = gameState.confidence;
    const oldRelationship = gameState.relationship;
    
    if (role === 'tech') {
        gameState.confidence = Math.min(100, gameState.confidence + Math.floor(Math.random() * 5) + 5);
        gameState.relationship = Math.max(0, gameState.relationship - Math.floor(Math.random() * 5) - 5);
    } else if (role === 'business') {
        gameState.relationship = Math.min(100, gameState.relationship + Math.floor(Math.random() * 5) + 10);
    }
    
    // 输出数值变化
    if (role === 'tech') {
        console.log(`数值变化: 信心 ${oldConfidence}% → ${gameState.confidence}% (+${gameState.confidence - oldConfidence})`);
        console.log(`数值变化: 关系 ${oldRelationship}% → ${gameState.relationship}% (${gameState.relationship - oldRelationship})`);
    } else if (role === 'business') {
        console.log(`数值变化: 关系 ${oldRelationship}% → ${gameState.relationship}% (+${gameState.relationship - oldRelationship})`);
    } else {
        console.log('总经理发言不直接影响数值');
    }
    
    // 显示我方发言在角色按钮位置
    document.getElementById('our-speech').textContent = ourTopic;
    document.getElementById('our-speech').style.display = 'block';
    
    await sleep(2000);
    
    // 生成对方回复（不隐藏我方发言）
    let opponentResponse;
    if (role === 'manager') {
        // 总经理的特殊逻辑
        console.log('总经理提出合作邀请...');
        console.log(`当前状态 - 信心: ${gameState.confidence}%, 关系: ${gameState.relationship}%`);
        
        if (gameState.confidence > 80 && gameState.relationship > 80) {
            opponentResponse = responses.manager.accept[Math.floor(Math.random() * responses.manager.accept.length)];
            console.log('✅ 合作成功！对方接受了合作邀请！');
            
            // 显示对方回复
            document.getElementById('opponent-dialog').textContent = opponentResponse;
            document.getElementById('opponent-dialog').style.display = 'block';
            updateDisplay();
            
            // 等待玩家点击
            console.log('👆 点击屏幕继续...');
            await waitForClick();
            
            showGameEnd(true, "合作成功！", "对方欣然接受了您的合作提议！");
            return;
        } else {
            opponentResponse = responses.manager.reject[Math.floor(Math.random() * responses.manager.reject.length)];
            console.log('❌ 合作被拒绝，数值将大幅下降...');
            
            const preConfidence = gameState.confidence;
            const preRelationship = gameState.relationship;
            
            gameState.confidence = Math.max(0, gameState.confidence - 30);
            gameState.relationship = Math.max(0, gameState.relationship - 30);
            
            console.log(`惩罚: 信心 ${preConfidence}% → ${gameState.confidence}% (-30)`);
            console.log(`惩罚: 关系 ${preRelationship}% → ${gameState.relationship}% (-30)`);
        }
    } else {
        // 技术总监和商务总监的回复逻辑
        const targetValue = role === 'tech' ? gameState.confidence : gameState.relationship;
        const targetName = role === 'tech' ? '信心' : '关系';
        
        let level;
        if (targetValue <= 30) level = 'low';
        else if (targetValue <= 50) level = 'medium';
        else if (targetValue <= 80) level = 'high';
        else level = 'veryHigh';
        
        console.log(`对方基于${targetName}值(${targetValue}%)的回复等级: ${level}`);
        
        opponentResponse = responses[role][level][Math.floor(Math.random() * responses[role][level].length)];
    }
    
    console.log(`对方回复: ${opponentResponse}`);
    console.log(`发言后 - 信心: ${gameState.confidence}%, 关系: ${gameState.relationship}%`);
    
    // 显示对方回复
    document.getElementById('opponent-dialog').textContent = opponentResponse;
    document.getElementById('opponent-dialog').style.display = 'block';
    
    updateDisplay();
    
    // 等待玩家点击继续
    console.log('👆 点击屏幕继续...');
    await waitForClick();
    
    // 隐藏对话，准备下一轮
    hideDialogs();
    
    // 在对话消失后检查等级变化并显示提示
    await checkAndShowLevelChanges();
    
    // 检查游戏失败条件
    if (checkGameFailure()) {
        // 如果游戏失败，不需要继续后续流程
        return;
    }
    
    // 等级提示完全消失后，重新显示角色选择区域
    document.getElementById('our-speech-area').style.display = 'none';
    document.getElementById('role-selection').style.display = 'flex';
    document.getElementById('speaker-label').textContent = '选择发言人';
    gameState.isProcessing = false;
}

// 显示游戏结束
function showGameEnd(success, title, message) {
    gameState.gameEnded = true;
    document.getElementById('game-result').textContent = title;
    document.getElementById('game-result').style.color = success ? '#28a745' : '#dc3545';
    document.getElementById('game-message').textContent = message;
    document.getElementById('game-over').style.display = 'block';
}

// 重新开始游戏
function restartGame() {
    initGame();
}

// 延时函数
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 初始化游戏
document.addEventListener('DOMContentLoaded', function() {
    initGame();
});

// 调试功能（按F12显示隐藏数值）
document.addEventListener('keydown', function(e) {
    if (e.key === 'F12') {
        e.preventDefault();
        const stats = document.getElementById('stats');
        stats.style.display = stats.style.display === 'none' ? 'block' : 'none';
    }
    
    // 按 C 键在控制台输出当前状态
    if (e.key === 'c' || e.key === 'C') {
        console.log('--- 当前游戏状态 ---');
        console.log(`信心: ${gameState.confidence}% (${gameState.confidenceLevel})`);
        console.log(`关系: ${gameState.relationship}% (${gameState.relationshipLevel})`);
        console.log(`游戏是否结束: ${gameState.gameEnded}`);
        console.log(`是否正在处理: ${gameState.isProcessing}`);
        console.log('------------------');
    }
    
    // 按 H 键显示帮助信息
    if (e.key === 'h' || e.key === 'H') {
        console.log('=== 调试帮助 ===');
        console.log('F12: 显示/隐藏数值面板');
        console.log('C: 输出当前游戏状态');
        console.log('H: 显示此帮助信息');
        console.log('================');
    }
});

// 游戏开始时输出调试说明
window.addEventListener('load', function() {
    console.log('🎮 商务饭局模拟器调试模式已启用');
    console.log('📝 快捷键说明:');
    console.log('   F12: 显示/隐藏数值面板');
    console.log('   C: 查看当前状态');
    console.log('   H: 显示帮助');
    console.log('🔍 游戏过程中所有数值变化都会在控制台输出');
    console.log('💡 新增: 等级变化时会显示视觉提示');
    console.log('====================================');
});