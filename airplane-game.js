// 비행기 종류 맞추기 게임
let score = 0;
let currentAirplane = null;

const airplanes = [
    { name: '여객기', emoji: '✈️', description: '사람들을 태우고 하늘을 날아요', hint: '공항에서 볼 수 있어요' },
    { name: '전투기', emoji: '🛩️', description: '빠르게 날아가는 군용 비행기예요', hint: '군대에서 사용해요' },
    { name: '헬리콥터', emoji: '🚁', description: '날개가 빙글빙글 돌아요', hint: '한 곳에서 멈춰 있을 수 있어요' },
    { name: '화물기', emoji: '🛫', description: '짐을 실어 나르는 큰 비행기예요', hint: '물건을 운반해요' },
    { name: '소형비행기', emoji: '🛩️', description: '작은 비행기예요', hint: '개인이 조종할 수 있어요' },
    { name: '드론', emoji: '🚁', description: '작은 무인 비행기예요', hint: '조종기로 날려요' },
    { name: '우주선', emoji: '🚀', description: '우주로 날아가요', hint: '별나라로 가요' },
    { name: '열기구', emoji: '🎈', description: '따뜻한 공기로 날아요', hint: '천천히 둥둥 떠다녀요' }
];

function startGame() {
    // 랜덤하게 비행기 선택
    const randomIndex = Math.floor(Math.random() * airplanes.length);
    currentAirplane = airplanes[randomIndex];
    
    // 비행기 이미지와 힌트 표시
    const airplaneDiv = document.getElementById('airplaneImage');
    airplaneDiv.innerHTML = `
        <div class="airplane-icon">${currentAirplane.emoji}</div>
        <p class="airplane-hint">${currentAirplane.hint}</p>
        <p class="airplane-description">${currentAirplane.description}</p>
    `;
    
    // 옵션 생성
    createOptions();
}

function createOptions() {
    const optionsDiv = document.getElementById('airplaneOptions');
    optionsDiv.innerHTML = '';
    
    // 정답 + 랜덤 3개
    const options = [currentAirplane];
    const availableAirplanes = airplanes.filter(a => a.name !== currentAirplane.name);
    
    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * availableAirplanes.length);
        options.push(availableAirplanes[randomIndex]);
        availableAirplanes.splice(randomIndex, 1);
    }
    
    // 섞기
    options.sort(() => Math.random() - 0.5);
    
    // 옵션 버튼 생성
    options.forEach(airplane => {
        const button = document.createElement('button');
        button.className = 'airplane-option';
        button.innerHTML = `
            <div class="airplane-emoji">${airplane.emoji}</div>
            <div class="airplane-name">${airplane.name}</div>
        `;
        
        // 터치 최적화
        button.addEventListener('touchstart', (e) => {
            e.preventDefault();
            checkAnswer(airplane);
        });
        button.onclick = () => checkAnswer(airplane);
        
        optionsDiv.appendChild(button);
    });
}

function checkAnswer(selectedAirplane) {
    const feedbackDiv = document.getElementById('feedback');
    
    if (selectedAirplane.name === currentAirplane.name) {
        // 정답!
        score += 10;
        document.getElementById('score').textContent = score;
        feedbackDiv.innerHTML = `🎉 우리야 대단해! ${currentAirplane.emoji} ${currentAirplane.name} 정답이에요! 🎉`;
        feedbackDiv.className = 'feedback correct';
        
        // 축하 애니메이션
        celebrateCorrect();
        
        // 2초 후 다음 문제
        setTimeout(() => {
            feedbackDiv.innerHTML = '';
            feedbackDiv.className = 'feedback';
            startGame();
        }, 2000);
    } else {
        // 오답
        feedbackDiv.innerHTML = `😊 ${selectedAirplane.emoji} ${selectedAirplane.name}는(은) ${selectedAirplane.description}. 다시 생각해봐요!`;
        feedbackDiv.className = 'feedback incorrect';
        
        setTimeout(() => {
            feedbackDiv.innerHTML = '';
            feedbackDiv.className = 'feedback';
        }, 2500);
    }
}

function celebrateCorrect() {
    const airplaneDiv = document.getElementById('airplaneImage');
    airplaneDiv.style.transform = 'scale(1.15) rotate(-5deg)';
    setTimeout(() => {
        airplaneDiv.style.transform = 'scale(1) rotate(0deg)';
    }, 300);
}

function restartGame() {
    score = 0;
    document.getElementById('score').textContent = score;
    document.getElementById('feedback').innerHTML = '';
    document.getElementById('feedback').className = 'feedback';
    startGame();
}

// 게임 시작
startGame();
