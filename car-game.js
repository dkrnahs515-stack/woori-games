// 자동차 종류 맞추기 게임 (건설기계, 특수차량)
let score = 0;
let currentCar = null;

const cars = [
    { name: '굴착기', emoji: '🚜', type: '건설', description: '땅을 파요', hint: '긴 팔로 땅을 파요' },
    { name: '불도저', emoji: '🚜', type: '건설', description: '땅을 밀어내요', hint: '앞에 큰 삽이 있어요' },
    { name: '덤프트럭', emoji: '🚛', type: '건설', description: '흙을 실어 나르고 쏟아요', hint: '뒤로 짐칸이 올라가요' },
    { name: '크레인', emoji: '🏗️', type: '건설', description: '무거운 것을 들어올려요', hint: '아주 높이 올릴 수 있어요' },
    { name: '콘크리트믹서', emoji: '🚚', type: '건설', description: '콘크리트를 섞어요', hint: '동그란 통이 빙글빙글 돌아요' },
    { name: '로드롤러', emoji: '🚜', type: '건설', description: '땅을 평평하게 눌러요', hint: '큰 바퀴로 땅을 눌러요' },
    { name: '지게차', emoji: '🏗️', type: '특수', description: '짐을 들어 옮겨요', hint: '앞에 포크가 있어요' },
    { name: '제설차', emoji: '🚜', type: '특수', description: '눈을 치워요', hint: '겨울에 눈을 치워요' },
    { name: '쓰레기차', emoji: '🚚', type: '특수', description: '쓰레기를 실어가요', hint: '아침에 쓰레기를 가져가요' },
    { name: '청소차', emoji: '🚛', type: '특수', description: '길을 청소해요', hint: '물을 뿌리며 길을 닦아요' },
    { name: '견인차', emoji: '🚙', type: '특수', description: '고장난 차를 끌어요', hint: '다른 차를 끌고 가요' },
    { name: '사다리차', emoji: '🚒', type: '특수', description: '높은 곳에 올라가요', hint: '긴 사다리가 있어요' }
];

function startGame() {
    // 랜덤하게 차량 선택
    const randomIndex = Math.floor(Math.random() * cars.length);
    currentCar = cars[randomIndex];
    
    // 차량 이미지와 힌트 표시
    const carDiv = document.getElementById('carImage');
    carDiv.innerHTML = `
        <div class="car-icon">${currentCar.emoji}</div>
        <p class="car-hint">${currentCar.hint}</p>
        <p class="car-description">${currentCar.description}</p>
    `;
    
    // 옵션 생성
    createOptions();
}

function createOptions() {
    const optionsDiv = document.getElementById('carOptions');
    optionsDiv.innerHTML = '';
    
    // 정답 + 랜덤 3개
    const options = [currentCar];
    const availableCars = cars.filter(c => c.name !== currentCar.name);
    
    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * availableCars.length);
        options.push(availableCars[randomIndex]);
        availableCars.splice(randomIndex, 1);
    }
    
    // 섞기
    options.sort(() => Math.random() - 0.5);
    
    // 옵션 버튼 생성
    options.forEach(car => {
        const button = document.createElement('button');
        button.className = 'car-option';
        button.innerHTML = `
            <div class="car-emoji">${car.emoji}</div>
            <div class="car-name">${car.name}</div>
            <div class="car-type">${car.type === '건설' ? '🏗️ 건설기계' : '🚛 특수차량'}</div>
        `;
        
        // 터치 최적화
        button.addEventListener('touchstart', (e) => {
            e.preventDefault();
            checkAnswer(car);
        });
        button.onclick = () => checkAnswer(car);
        
        optionsDiv.appendChild(button);
    });
}

function checkAnswer(selectedCar) {
    const feedbackDiv = document.getElementById('feedback');
    
    if (selectedCar.name === currentCar.name) {
        // 정답!
        score += 10;
        document.getElementById('score').textContent = score;
        feedbackDiv.innerHTML = `🎉 우리야 최고! ${currentCar.emoji} ${currentCar.name} 정답! 🎉`;
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
        feedbackDiv.innerHTML = `😊 ${selectedCar.emoji} ${selectedCar.name}는(은) ${selectedCar.description}. 다시 생각해봐요!`;
        feedbackDiv.className = 'feedback incorrect';
        
        setTimeout(() => {
            feedbackDiv.innerHTML = '';
            feedbackDiv.className = 'feedback';
        }, 2500);
    }
}

function celebrateCorrect() {
    const carDiv = document.getElementById('carImage');
    carDiv.style.transform = 'scale(1.15) rotate(5deg)';
    setTimeout(() => {
        carDiv.style.transform = 'scale(1) rotate(0deg)';
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
