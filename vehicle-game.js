// 탱크 찾기 게임
let score = 0;
let currentVehicle = null;

const vehicles = [
    { name: '탱크', emoji: '🪖', type: '군용', description: '전투할 때 사용해요' },
    { name: '군용트럭', emoji: '🚚', type: '군용', description: '군인들이 타고 다녀요' },
    { name: '장갑차', emoji: '🚐', type: '군용', description: '튼튼한 군용 차량이에요' },
    { name: '헬리콥터', emoji: '🚁', type: '군용', description: '하늘을 나는 군용기예요' },
    { name: '경찰차', emoji: '🚓', type: '특수', description: '나쁜 사람을 잡아요' },
    { name: '소방차', emoji: '🚒', type: '특수', description: '불을 꺼요' },
    { name: '구급차', emoji: '🚑', type: '특수', description: '아픈 사람을 도와줘요' },
    { name: '버스', emoji: '🚌', type: '일반', description: '많은 사람이 타요' },
    { name: '택시', emoji: '🚕', type: '일반', description: '손님을 태워요' },
    { name: '트럭', emoji: '🚛', type: '일반', description: '짐을 실어요' }
];

function startGame() {
    // 군용 차량 중에서 랜덤 선택
    const militaryVehicles = vehicles.filter(v => v.type === '군용');
    const randomIndex = Math.floor(Math.random() * militaryVehicles.length);
    currentVehicle = militaryVehicles[randomIndex];
    
    // 질문 차량 표시
    const questionDiv = document.getElementById('questionVehicle');
    questionDiv.innerHTML = `
        <div class="vehicle-icon">${currentVehicle.emoji}</div>
        <p class="vehicle-question">${currentVehicle.name}을(를) 찾아주세요!</p>
    `;
    
    // 옵션 생성
    createOptions();
}

function createOptions() {
    const optionsDiv = document.getElementById('vehicleOptions');
    optionsDiv.innerHTML = '';
    
    // 정답 + 다른 타입 차량 5개
    const options = [currentVehicle];
    
    // 특수 차량 2개
    const specialVehicles = vehicles.filter(v => v.type === '특수');
    for (let i = 0; i < 2; i++) {
        const randomIndex = Math.floor(Math.random() * specialVehicles.length);
        if (!options.find(o => o.name === specialVehicles[randomIndex].name)) {
            options.push(specialVehicles[randomIndex]);
        }
    }
    
    // 일반 차량 3개
    const normalVehicles = vehicles.filter(v => v.type === '일반');
    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * normalVehicles.length);
        if (!options.find(o => o.name === normalVehicles[randomIndex].name)) {
            options.push(normalVehicles[randomIndex]);
        }
    }
    
    // 6개가 안되면 채우기
    while (options.length < 6) {
        const randomIndex = Math.floor(Math.random() * vehicles.length);
        if (!options.find(o => o.name === vehicles[randomIndex].name)) {
            options.push(vehicles[randomIndex]);
        }
    }
    
    // 섞기
    options.sort(() => Math.random() - 0.5);
    
    // 옵션 버튼 생성
    options.forEach(vehicle => {
        const button = document.createElement('button');
        button.className = 'vehicle-option';
        button.innerHTML = `
            <div class="vehicle-emoji">${vehicle.emoji}</div>
            <div class="vehicle-name">${vehicle.name}</div>
            <div class="vehicle-desc">${vehicle.description}</div>
        `;
        
        // 터치 최적화
        button.addEventListener('touchstart', (e) => {
            e.preventDefault();
            checkAnswer(vehicle);
        });
        button.onclick = () => checkAnswer(vehicle);
        
        optionsDiv.appendChild(button);
    });
}

function checkAnswer(selectedVehicle) {
    const feedbackDiv = document.getElementById('feedback');
    
    if (selectedVehicle.name === currentVehicle.name) {
        // 정답!
        score += 10;
        document.getElementById('score').textContent = score;
        feedbackDiv.innerHTML = `🎉 우리야 정답이에요! ${currentVehicle.emoji} ${currentVehicle.name}! 잘했어요! 🎉`;
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
        feedbackDiv.innerHTML = `😊 ${selectedVehicle.emoji} ${selectedVehicle.name}는(은) ${selectedVehicle.description}. 다시 찾아볼까요?`;
        feedbackDiv.className = 'feedback incorrect';
        
        setTimeout(() => {
            feedbackDiv.innerHTML = '';
            feedbackDiv.className = 'feedback';
        }, 2000);
    }
}

function celebrateCorrect() {
    const questionDiv = document.getElementById('questionVehicle');
    questionDiv.style.transform = 'scale(1.1) rotate(5deg)';
    setTimeout(() => {
        questionDiv.style.transform = 'scale(1) rotate(0deg)';
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
