// 메모리 카드 게임
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let canFlip = true;
let difficulty = 'easy';

const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔'];

function setDifficulty(level) {
    difficulty = level;
    
    // 버튼 활성화 상태 변경
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    restartGame();
}

function startGame() {
    // 난이도에 따라 카드 쌍 수 결정
    let pairCount;
    switch(difficulty) {
        case 'easy':
            pairCount = 4;
            break;
        case 'medium':
            pairCount = 6;
            break;
        case 'hard':
            pairCount = 8;
            break;
    }
    
    // 카드 생성 (각 이모지 2개씩)
    const selectedEmojis = emojis.slice(0, pairCount);
    cards = [...selectedEmojis, ...selectedEmojis];
    
    // 카드 섞기
    cards.sort(() => Math.random() - 0.5);
    
    // 카드 HTML 생성
    renderCards();
}

function renderCards() {
    const cardsContainer = document.getElementById('memoryCards');
    cardsContainer.innerHTML = '';
    
    // 난이도에 따라 그리드 클래스 변경
    cardsContainer.className = 'memory-cards';
    if (difficulty === 'easy') {
        cardsContainer.classList.add('grid-easy');
    } else if (difficulty === 'medium') {
        cardsContainer.classList.add('grid-medium');
    } else {
        cardsContainer.classList.add('grid-hard');
    }
    
    cards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.index = index;
        card.dataset.emoji = emoji;
        
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">❓</div>
                <div class="card-back">${emoji}</div>
            </div>
        `;
        
        // 터치 최적화: 터치와 클릭 모두 지원
        card.addEventListener('touchstart', (e) => {
            e.preventDefault();
            flipCard(index);
        });
        card.onclick = () => flipCard(index);
        
        cardsContainer.appendChild(card);
    });
}

function flipCard(index) {
    if (!canFlip) return;
    
    const card = document.querySelector(`[data-index="${index}"]`);
    
    // 이미 뒤집힌 카드는 무시
    if (card.classList.contains('flipped') || card.classList.contains('matched')) {
        return;
    }
    
    // 카드 뒤집기
    card.classList.add('flipped');
    flippedCards.push({ index, emoji: card.dataset.emoji, element: card });
    
    // 2장이 뒤집혔을 때
    if (flippedCards.length === 2) {
        moves++;
        document.getElementById('moves').textContent = moves;
        checkMatch();
    }
}

function checkMatch() {
    canFlip = false;
    
    const [card1, card2] = flippedCards;
    
    if (card1.emoji === card2.emoji) {
        // 짝 맞음!
        setTimeout(() => {
            card1.element.classList.add('matched');
            card2.element.classList.add('matched');
            
            matchedPairs++;
            document.getElementById('pairs').textContent = matchedPairs;
            
            // 축하 메시지
            showFeedback('🎉 우리야 잘했어!', 'correct');
            
            flippedCards = [];
            canFlip = true;
            
            // 모든 카드를 맞췄을 때
            if (matchedPairs === cards.length / 2) {
                setTimeout(() => {
                    showFeedback(`🎊 우리야 최고! 모든 짝을 찾았어요! (${moves}번 만에 성공!)`, 'win');
                }, 500);
            }
        }, 500);
    } else {
        // 짝이 안 맞음
        setTimeout(() => {
            card1.element.classList.remove('flipped');
            card2.element.classList.remove('flipped');
            
            showFeedback('😊 우리야 다시 도전!', 'incorrect');
            
            flippedCards = [];
            canFlip = true;
        }, 1000);
    }
}

function showFeedback(message, type) {
    const feedbackDiv = document.getElementById('feedback');
    feedbackDiv.textContent = message;
    feedbackDiv.className = `feedback ${type}`;
    
    setTimeout(() => {
        if (type !== 'win') {
            feedbackDiv.textContent = '';
            feedbackDiv.className = 'feedback';
        }
    }, 1500);
}

function restartGame() {
    cards = [];
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    canFlip = true;
    
    document.getElementById('pairs').textContent = '0';
    document.getElementById('moves').textContent = '0';
    document.getElementById('feedback').textContent = '';
    document.getElementById('feedback').className = 'feedback';
    
    startGame();
}

// 게임 시작
startGame();
