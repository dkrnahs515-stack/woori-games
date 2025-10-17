// 동물 소리 맞추기 게임
let score = 0;
let currentAnimal = null;

const animals = [
    { name: '강아지', emoji: '🐶', sound: '멍멍!', description: '멍멍 짖어요' },
    { name: '고양이', emoji: '🐱', sound: '야옹~', description: '야옹 하고 울어요' },
    { name: '소', emoji: '🐮', sound: '음메~', description: '음메 하고 울어요' },
    { name: '돼지', emoji: '🐷', sound: '꿀꿀!', description: '꿀꿀 거려요' },
    { name: '양', emoji: '🐑', sound: '메에~', description: '메에 하고 울어요' },
    { name: '오리', emoji: '🦆', sound: '꽥꽥!', description: '꽥꽥 거려요' },
    { name: '닭', emoji: '🐔', sound: '꼬끼오!', description: '꼬끼오 하고 울어요' },
    { name: '사자', emoji: '🦁', sound: '어흥!', description: '어흥 하고 으르렁거려요' },
    { name: '코끼리', emoji: '🐘', sound: '빠오~', description: '빠오 하고 울어요' },
    { name: '개구리', emoji: '🐸', sound: '개굴개굴!', description: '개굴개굴 울어요' }
];

function startGame() {
    // 랜덤하게 정답 동물 선택
    const randomIndex = Math.floor(Math.random() * animals.length);
    currentAnimal = animals[randomIndex];
    
    // 소리 텍스트 초기화
    document.getElementById('soundText').textContent = '어떤 동물 소리일까요?';
    document.getElementById('soundButton').style.transform = 'scale(1)';
    
    // 옵션 생성
    createOptions();
}

function playSound() {
    // 소리 텍스트 표시
    const soundTextDiv = document.getElementById('soundText');
    soundTextDiv.textContent = currentAnimal.sound;
    soundTextDiv.style.fontSize = '3rem';
    soundTextDiv.style.color = '#FF6B6B';
    
    // 버튼 애니메이션
    const button = document.getElementById('soundButton');
    button.style.transform = 'scale(1.1)';
    
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);
    
    // 3초 후 텍스트 다시 숨기기
    setTimeout(() => {
        soundTextDiv.textContent = '어떤 동물 소리일까요?';
        soundTextDiv.style.fontSize = '1.5rem';
        soundTextDiv.style.color = '#666';
    }, 3000);
}

function createOptions() {
    const optionsDiv = document.getElementById('animalOptions');
    optionsDiv.innerHTML = '';
    
    // 정답과 랜덤 동물 3개 선택
    const options = [currentAnimal];
    const availableAnimals = animals.filter(a => a.name !== currentAnimal.name);
    
    // 랜덤하게 3개 더 추가
    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * availableAnimals.length);
        options.push(availableAnimals[randomIndex]);
        availableAnimals.splice(randomIndex, 1);
    }
    
    // 섞기
    options.sort(() => Math.random() - 0.5);
    
    // 옵션 버튼 생성
    options.forEach(animal => {
        const button = document.createElement('button');
        button.className = 'animal-option';
        button.innerHTML = `
            <div class="animal-emoji">${animal.emoji}</div>
            <div class="animal-name">${animal.name}</div>
            <div class="animal-desc">${animal.description}</div>
        `;
        
        // 터치 최적화: 터치와 클릭 모두 지원
        button.addEventListener('touchstart', (e) => {
            e.preventDefault();
            checkAnswer(animal);
        });
        button.onclick = () => checkAnswer(animal);
        
        optionsDiv.appendChild(button);
    });
}

function checkAnswer(selectedAnimal) {
    const feedbackDiv = document.getElementById('feedback');
    
    if (selectedAnimal.name === currentAnimal.name) {
        // 정답!
        score += 10;
        document.getElementById('score').textContent = score;
        feedbackDiv.innerHTML = `🎉 정답이에요! ${currentAnimal.emoji} ${currentAnimal.name}의 소리예요! 🎉`;
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
        feedbackDiv.innerHTML = `😢 ${selectedAnimal.emoji}${selectedAnimal.name}는 ${selectedAnimal.sound} 하고 울어요. 다시 들어볼까요?`;
        feedbackDiv.className = 'feedback incorrect';
        
        setTimeout(() => {
            feedbackDiv.innerHTML = '';
            feedbackDiv.className = 'feedback';
        }, 2000);
    }
}

function celebrateCorrect() {
    const button = document.getElementById('soundButton');
    button.style.transform = 'scale(1.2) rotate(10deg)';
    setTimeout(() => {
        button.style.transform = 'scale(1) rotate(0deg)';
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
