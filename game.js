// 游戏状态
let gameState = {
    confidence: 20,  // 信心值
    relationship: 35, // 关系值
    gameEnded: false,
    isProcessing: false,
    // 添加等级跟踪
    confidenceLevel: 'low',
    relationshipLevel: 'low'
};

// 商业鸡汤语录库
const motivationalQuotes = [
    "成功的商务谈判不在于一次决定，而在于每一个细节的积累。",
    "每一次失败都是通往成功路上的垫脚石，坚持下去就是胜利。",
    "商场如战场，但真正的智者懂得在合作中寻找共赢。",
    "沟通是商务合作的桥梁，耐心是通往成功的钥匙。",
    "在商务谈判中，倾听往往比说话更加重要。",
    "成功不是偶然，而是在正确的时间做出正确的选择。",
    "每一个'不'的背后，都隐藏着一个更好的'是'。",
    "真正的成功来自于对细节的把控和对时机的洞察。",
    "商务合作如同艺术，需要的是平衡、节奏与创造力。",
    "机会总是留给那些有准备、懂沟通、会坚持的人。",
    "失败只是暂时的，但放弃就是永久的。继续前进吧！",
    "每一次谈判都是一次学习，每一次挫折都是一次成长。"
];

// 技术总监话题库
const techTopics = [
    "我们的技术架构采用了最新的微服务设计，可以支持千万级并发访问。",
    "我们的AI算法在行业内处于领先地位，准确率达到了98%以上。",
    "我们拥有自主研发的核心技术，已经申请了多项发明专利。",
    "我们的系统采用云原生架构，具备极强的扩展性和稳定性。",
    "我们的技术团队都是清华北大的博士，在各自领域都有深厚的技术积累。",
    "我们的产品在性能测试中表现优异，响应时间控制在毫秒级别。",
    "我们建立了完善的DevOps体系，代码部署效率提升了10倍。",
    "我们的数据安全方案通过了国际最高级别的认证。",
    "我们的分布式数据库采用最新的分片技术，查询性能提升了50倍。",
    "我们自研的容器编排平台已经在生产环境稳定运行两年多。",
    "我们的机器学习模型采用了深度神经网络，预测精度行业领先。",
    "我们实现了零停机时间的热更新，服务可用性达到99.99%。",
    "我们的区块链技术方案已经为多家银行提供了可信数据服务。",
    "我们建立了完整的监控告警体系，能够预测并避免99%的系统故障。",
    "我们的边缘计算框架大幅降低了网络延迟，用户体验提升显著。",
    "我们采用了最新的量子加密算法，确保数据传输的绝对安全。",
    "我们的智能调度算法能够自动优化资源配置，成本节省了30%。",
    "我们搭建了业界最先进的大数据处理平台，支持PB级数据实时分析。",
    "我们的API网关采用了自适应限流技术，有效防止了各种攻击。",
    "我们开发的低代码平台让业务人员也能快速搭建应用系统。"
];

// 商务总监话题库（按类型分组）
const businessTopics = {
    toast: [
        "来，我敬您一杯，感谢您今天抽出宝贵时间和我们交流。",
        "来来来，大家一起干一杯，为今天的相遇干杯！",
        "来，我们为双方的友谊干杯，希望今后多多合作！"
    ],
    wine: [
        "这酒真是不错，听说是茅台的特供版，平时很难买到呢。",
        "您对红酒有研究吗？这瓶是法国波尔多的珍藏版。",
        "这瓶酒是我珍藏多年的，今天特意拿出来和您分享。"
    ],
    compliment: [
        "您的公司在行业内声誉卓著，我们早就仰慕已久了。",
        "您今天气色真好，一看就是事业有成的成功人士。",
        "您这身西装真是不错，一看就是定制的，很有品味。",
        "您真是年轻有为啊，这么年轻就有如此成就，令人佩服。",
        "您的眼光真是独到，一眼就看出了市场的关键点。"
    ],
    food: [
        "这个菜是这家餐厅的招牌，您尝尝看，特别有特色。",
        "这道海鲜是从澳洲空运来的，新鲜得很，您一定要尝尝。"
    ],
    environment: [
        "这家餐厅的环境真优雅，我特意选的这个包间，希望您满意。",
        "这次能请到您来，我们全公司都感到非常荣幸！"
    ],
    relationship: [
        "难得有机会和您这样的行业专家交流，真是受益匪浅。",
        "听说您最近的项目进展得很顺利，真是恭喜恭喜啊！",
        "我听朋友说您的高尔夫球技很棒，改天我们一起切磋切磋。",
        "能和您这样的企业家交朋友，真是我的荣幸啊！",
        "您对市场的分析真是精准，我们应该向您多学习。"
    ]
};

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
        toast: {
            low: [
                "谢谢，我也敬您一杯。",
                "好的，谢谢您的盛情。",
                "客气了，干杯。"
            ],
            medium: [
                "您太客气了，我们共同举杯！",
                "感谢您的安排，这次交流很有意义。",
                "能有机会和您交流，我也很高兴！"
            ],
            high: [
                "太好了！和您这样的朋友喝酒真是愉快！",
                "您的热情让我很感动，来，我们干杯！",
                "能认识您这样的朋友，真是我的荣幸！干杯！"
            ],
            veryHigh: [
                "哈哈，您真是太有意思了！来，我们不醉不归！",
                "和您喝酒真是太开心了！我们是真正的朋友！",
                "您的豪爽我很欣赏！今天一定要尽兴！"
            ]
        },
        wine: {
            low: [
                "嗯，这酒确实不错。",
                "好酒，谢谢您的介绍。",
                "确实是好酒，品质很高。"
            ],
            medium: [
                "您真是有心了，这酒我很喜欢。",
                "看得出您对酒很有研究，受教了。",
                "您的收藏确实不错，很有品味。"
            ],
            high: [
                "您的品味真是太好了！这酒我很少喝到！",
                "能品尝到您的珍藏，真是太感谢了！",
                "您真是太用心了，这么好的酒都拿出来分享！"
            ],
            veryHigh: [
                "天哪！这酒太棒了！您真是太有心了！",
                "您的收藏让我大开眼界！我们以后要经常交流！",
                "这种级别的酒您都愿意分享，我们真是知音啊！"
            ]
        },
        compliment: {
            low: [
                "您过奖了。",
                "哪里哪里，谢谢夸奖。",
                "您太客气了。"
            ],
            medium: [
                "谢谢您的认可，我们还在努力。",
                "您的夸奖让我很受用，谢谢。",
                "过奖了，我们还有很多要学习的。"
            ],
            high: [
                "谢谢您的赞美！您的眼光真是独到！",
                "能得到您这样专家的认可，我很高兴！",
                "您的话让我很受鼓舞，谢谢！"
            ],
            veryHigh: [
                "您真是太会说话了！我们一见如故啊！",
                "哈哈，您的赞美让我都不好意思了！",
                "您真是我见过最有眼光的企业家！"
            ]
        },
        food: {
            low: [
                "好的，我尝尝看。",
                "谢谢推荐。",
                "确实看起来不错。"
            ],
            medium: [
                "您真是太用心了，这菜确实很特别。",
                "看得出您经常来这里，很有经验。",
                "您的推荐很不错，味道确实很好。"
            ],
            high: [
                "太好吃了！您的推荐真是太棒了！",
                "这菜确实是招牌，您真是内行！",
                "能在这里品尝到这么好的菜，谢谢您的安排！"
            ],
            veryHigh: [
                "这简直是人间美味！您真是太会享受生活了！",
                "您的品味让我佩服！以后吃饭一定要请教您！",
                "和您一起用餐真是享受！您真是美食专家！"
            ]
        },
        environment: {
            low: [
                "环境确实不错。",
                "谢谢您的安排。",
                "这里很好。"
            ],
            medium: [
                "您选择的地方真不错，很有品味。",
                "这个包间确实很优雅，谢谢您的用心。",
                "能在这样的环境中交流，确实很愉快。"
            ],
            high: [
                "您真是太用心了！这个地方选得太好了！",
                "这种级别的安排，看得出您的诚意！",
                "在这样的环境中谈合作，真是太棒了！"
            ],
            veryHigh: [
                "您的安排让我感动！这真是顶级的享受！",
                "和您这样有品味的朋友合作，我完全放心！",
                "您的诚意我完全感受到了！这次合作一定成功！"
            ]
        },
        relationship: {
            low: [
                "谢谢您的关心。",
                "您太客气了。",
                "哪里哪里。"
            ],
            medium: [
                "谢谢您的关注，确实进展不错。",
                "您消息真灵通，谢谢关心。",
                "能得到您的关注，我很高兴。"
            ],
            high: [
                "谢谢您的关心！希望我们能多交流！",
                "您真是有心人！我们确实应该多合作！",
                "能认识您这样的朋友，真是太好了！"
            ],
            veryHigh: [
                "您真是我的知音啊！我们一定要深入合作！",
                "和您这样的朋友在一起，什么都好商量！",
                "您真是太了解我了！我们马上就可以开始合作！"
            ]
        }
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
        low: "对方漫不经心地转动着茶杯",
        medium: "对方放下了手机，略微前倾身子",
        high: "对方停下了筷子，聚精会神地注视着你",
        veryHigh: "对方双眼发亮，不由自主地点头称赞"
    },
    relationship: {
        low: {
            up: "双方的对话开始有了些许默契",
            down: "双方的交流变得磕磕绊绊"
        },
        medium: {
            up: "双方开始频繁地碰杯，气氛渐趋融洽",
            down: "双方的举杯变得客套，桌上多了静默"
        },
        high: {
            up: "双方谈笑风生，酒菜都成了次要",
            down: "双方的笑声渐少，重新专注于用餐"
        },
        veryHigh: {
            up: "双方相视而笑，仿佛多年老友重逢",
            down: "双方保持着微笑，但话题变得谨慎"
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
            reason = '谈判氛围急转直下，对方决定终止会谈...';
        } else if (gameState.confidence <= 0) {
            reason = '对方对提议缺乏信心，选择了更保守的合作伙伴...';
        } else {
            reason = '双方沟通出现分歧，商务合作暂时搁浅...';
        }
        showGameEnd(false, "合作暂未达成", reason);
        return true;
    }
    return false;
}

// 初始化游戏
function initGame() {
    gameState = {
        confidence: 20,
        relationship: 35,
        gameEnded: false,
        isProcessing: false,
        confidenceLevel: getLevel(20),
        relationshipLevel: getLevel(35)
    };
    updateDisplay();
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('level-hint').style.display = 'none';
    document.getElementById('speaker-label').textContent = '该由谁来发起话题？';
    hideDialogs();
    
    // 显示开始界面
    showStartScreen();
    
    // 控制台输出初始状态
    console.log('=== 游戏初始化 ===');
    console.log(`信心: ${gameState.confidence}% (${gameState.confidenceLevel})`);
    console.log(`关系: ${gameState.relationship}% (${gameState.relationshipLevel})`);
    console.log('==================');
}

// 显示开始界面
function showStartScreen() {
    const startScreen = document.getElementById('start-screen');
    startScreen.classList.remove('hidden');
    startScreen.style.display = 'flex';
}

// 隐藏开始界面，开始游戏
function hideStartScreen() {
    const startScreen = document.getElementById('start-screen');
    startScreen.classList.add('hidden');
    
    // 1秒后完全隐藏元素
    setTimeout(() => {
        startScreen.style.display = 'none';
    }, 1000);
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
    let businessTopicType; // 商务话题类型
    if (role === 'tech') {
        ourTopic = techTopics[Math.floor(Math.random() * techTopics.length)];
    } else if (role === 'business') {
        businessTopicType = Object.keys(businessTopics)[Math.floor(Math.random() * Object.keys(businessTopics).length)];
        const topicIndex = Math.floor(Math.random() * businessTopics[businessTopicType].length);
        ourTopic = businessTopics[businessTopicType][topicIndex];
    } else if (role === 'manager') {
        ourTopic = managerTopics[Math.floor(Math.random() * managerTopics.length)];
    }
    
    console.log(`我方话题: ${ourTopic}`);
    
    // 更新属性
    const oldConfidence = gameState.confidence;
    const oldRelationship = gameState.relationship;
    
    if (role === 'tech') {
        gameState.confidence = Math.min(100, gameState.confidence + Math.floor(Math.random() * 7) + 7);
        gameState.relationship = Math.max(0, gameState.relationship - Math.floor(Math.random() * 5) - 5);
    } else if (role === 'business') {
        gameState.relationship = Math.min(100, gameState.relationship + Math.floor(Math.random() * 5) + 10);
    } else {
        console.log('总经理发言不直接影响数值');
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
            
            showGameEnd(true, "合作达成！", "经过精彩的商务谈判，双方达成了重要的战略合作协议！");
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
        
        if (role === 'business') {
            opponentResponse = responses[role][businessTopicType][level][Math.floor(Math.random() * responses[role][businessTopicType][level].length)];
        } else {
            opponentResponse = responses[role][level][Math.floor(Math.random() * responses[role][level].length)];
        }
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
    document.getElementById('speaker-label').textContent = '该由谁来发起话题？';
    gameState.isProcessing = false;
}

// 显示游戏结束
function showGameEnd(success, title, message) {
    gameState.gameEnded = true;
    
    // 获取DOM元素
    const gameOverElement = document.getElementById('game-over');
    const gameOverOverlay = document.getElementById('game-over-overlay');
    const resultIcon = document.getElementById('result-icon');
    const resultTitle = document.getElementById('game-result');
    const resultMessage = document.getElementById('game-message');
    const quoteText = document.getElementById('quote-text');
    
    // 根据成功/失败设置不同的图标和样式
    if (success) {
        resultIcon.textContent = '🎉';
        gameOverElement.className = 'game-over success';
        resultTitle.textContent = title;
    } else {
        resultIcon.textContent = '💼';
        gameOverElement.className = 'game-over failure';
        resultTitle.textContent = title;
    }
    
    // 设置消息内容
    resultMessage.textContent = message;
    
    // 随机选择一条鸡汤语录
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    quoteText.textContent = randomQuote;
    
    // 显示遮罩层和结算界面
    gameOverOverlay.style.display = 'block';
    gameOverElement.style.display = 'block';
    
    // 控制台输出（保留调试信息）
    if (success) {
        console.log('🎉 游戏成功！');
    } else {
        console.log('💼 游戏结束');
    }
}

// 重新开始游戏
function restartGame() {
    // 隐藏游戏结束界面和遮罩层，并清除样式类
    const gameOverElement = document.getElementById('game-over');
    const gameOverOverlay = document.getElementById('game-over-overlay');
    
    gameOverElement.style.display = 'none';
    gameOverOverlay.style.display = 'none';
    gameOverElement.className = 'game-over'; // 重置为默认类名
    
    // 重新初始化游戏（包括显示开始界面）
    initGame();
}

// 延时函数
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 初始化游戏
document.addEventListener('DOMContentLoaded', function() {
    initGame();
    
    // 绑定开始游戏按钮事件
    const startGameBtn = document.getElementById('start-game-btn');
    startGameBtn.addEventListener('click', function() {
        hideStartScreen();
        console.log('🚀 游戏开始！');
    });
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