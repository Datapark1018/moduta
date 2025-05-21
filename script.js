// 페이지 로드 시 초기 로딩 화면 표시
window.onload = function() {
    showScreen('loading-screen');
    // 2초 후 로그인 화면으로 전환
    setTimeout(() => {
        showScreen('login-screen');
    }, 2000);
}

// 화면 전환 함수들
function showScreen(screenId) {
    // 모든 화면 숨기기
    document.querySelectorAll('.screen').forEach(screen => {
        screen.style.display = 'none';
    });
    // 선택한 화면 보이기
    document.getElementById(screenId).style.display = 'block';
}

// 로그인 함수
function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        alert('이메일과 비밀번호를 모두 입력해주세요.');
        return;
    }

    // 실제로는 서버에 로그인 요청을 보내고 응답을 처리해야 합니다.
    // 여기서는 간단히 메인 화면으로 전환합니다.
    showScreen('main-screen');
}

// 회원가입 함수
function signup() {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const passwordConfirm = document.getElementById('signup-password-confirm').value;

    if (!name || !email || !password || !passwordConfirm) {
        alert('모든 필드를 입력해주세요.');
        return;
    }

    if (password !== passwordConfirm) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
    }

    // 실제로는 서버에 회원가입 요청을 보내고 응답을 처리해야 합니다.
    // 여기서는 간단히 로그인 화면으로 전환합니다.
    alert('회원가입이 완료되었습니다. 로그인해주세요.');
    showScreen('login-screen');
}

// 현재 선택된 택시 호출 방식
let selectedCallType = 'all';

// 택시 호출 방식 선택 함수
function selectCallType(type) {
    selectedCallType = type;
    
    // 모든 버튼에서 active 클래스 제거
    document.querySelectorAll('.call-type-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // 선택된 버튼에 active 클래스 추가
    event.currentTarget.classList.add('active');
    
    // 예약 시간 입력 필드 표시/숨김 처리
    const reservationTime = document.getElementById('reservation-time');
    reservationTime.style.display = type === 'reserve' ? 'block' : 'none';
}

// 택시 호출 함수
function callTaxi() {
    const startLocation = document.getElementById('start-location').value;
    const endLocation = document.getElementById('end-location').value;
    const selectedCallType = document.querySelector('.call-type-btn.active').getAttribute('data-type');

    if (!startLocation || !endLocation) {
        alert('출발지와 도착지를 모두 입력해주세요.');
        return;
    }

    if (selectedCallType === '모두콜') {
        showWaitingScreen();
    } else if (selectedCallType === '즉시콜') {
        showInstantWaitingScreen();
    } else if (selectedCallType === '예약콜') {
        showScreen('reservation-screen');
    }
}

// 모두콜 대기 화면 표시
function showWaitingScreen() {
    const waitingScreen = document.getElementById('waiting-screen');
    const waitingTimer = waitingScreen.querySelector('.waiting-timer');
    const waitingCount = waitingScreen.querySelector('.waiting-count');
    
    // 타이머 초기화
    let seconds = 0;
    const timerInterval = setInterval(() => {
        seconds++;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        waitingTimer.textContent = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }, 1000);

    // 대기 중인 승객 수 업데이트
    let count = 0;
    const countInterval = setInterval(() => {
        count = Math.floor(Math.random() * 5) + 1;
        waitingCount.textContent = count;
    }, 3000);

    // 화면 표시
    showScreen('waiting-screen');

    // 5초 후에 매칭 성공 화면으로 전환
    setTimeout(() => {
        clearInterval(timerInterval);
        clearInterval(countInterval);
        showScreen('match-found-screen');
    }, 5000);
}

// 즉시콜 대기 화면 표시
function showInstantWaitingScreen() {
    const waitingScreen = document.getElementById('waiting-screen');
    const waitingTimer = waitingScreen.querySelector('.waiting-timer');
    const waitingHeader = waitingScreen.querySelector('.waiting-header h2');
    const waitingStatus = waitingScreen.querySelector('.waiting-status');
    
    // 헤더 텍스트 변경
    waitingHeader.textContent = '택시를 찾는 중입니다';
    
    // 대기 중인 승객 수 표시 숨기기
    waitingStatus.style.display = 'none';
    
    // 타이머 초기화 (5분부터 시작)
    let seconds = 300; // 5분
    const timerInterval = setInterval(() => {
        seconds++;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        waitingTimer.textContent = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }, 1000);

    // 화면 표시
    showScreen('waiting-screen');

    // 8초 후에 배차 완료 화면으로 전환
    setTimeout(() => {
        clearInterval(timerInterval);
        showScreen('success-screen');
    }, 8000);
}

// 모두콜 버튼 클릭 이벤트
document.querySelector('.call-type-btn[data-type="모두콜"]').addEventListener('click', function() {
    selectCallType('all');
});

// 즉시콜 버튼 클릭 이벤트
document.querySelector('.call-type-btn[data-type="즉시콜"]').addEventListener('click', function() {
    selectCallType('instant');
});

// 예약콜 버튼 클릭 이벤트
document.querySelector('.call-type-btn[data-type="예약콜"]').addEventListener('click', function() {
    showScreen('reservation-screen');
});

// 대기 취소
function cancelWaiting() {
    if (waitingTimer) {
        clearInterval(waitingTimer);
    }
    showScreen('main-screen');
}

// 대기 취소 버튼 클릭 이벤트
document.querySelector('.waiting-actions .cancel-btn').addEventListener('click', cancelWaiting);

// 확인 버튼 클릭 이벤트
document.querySelector('.confirm-btn').addEventListener('click', function() {
    showScreen('success-screen');
});

// 홈으로 돌아가기 함수
function goToHome() {
    // 입력 필드 초기화
    document.getElementById('start-location').value = '';
    document.getElementById('end-location').value = '';
    
    // 메인 화면으로 전환
    showScreen('main-screen');
}

// 네비게이션 아이템 클릭 이벤트 처리
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        // 모든 아이템에서 active 클래스 제거
        document.querySelectorAll('.nav-item').forEach(navItem => {
            navItem.classList.remove('active');
        });
        // 클릭된 아이템에 active 클래스 추가
        this.classList.add('active');
    });
});

// 네비게이션 바 아이템 클릭 이벤트
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        // 모든 네비게이션 아이템에서 active 클래스 제거
        document.querySelectorAll('.nav-item').forEach(navItem => {
            navItem.classList.remove('active');
        });
        
        // 클릭한 아이템에 active 클래스 추가
        this.classList.add('active');
        
        // 아이템에 따라 화면 전환
        const icon = this.querySelector('.icon').textContent;
        switch(icon) {
            case '🚕':
                showScreen('main-screen');
                break;
            case '📋':
                showScreen('history-screen');
                break;
            case '💳':
                showScreen('payment-screen');
                break;
            case '👤':
                showScreen('profile-screen');
                break;
        }
    });
});

// 결제 수단 선택
document.querySelectorAll('.payment-option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('.payment-option').forEach(opt => {
            opt.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// 카드 선택
document.querySelectorAll('.card-item').forEach(card => {
    card.addEventListener('click', function() {
        document.querySelectorAll('.card-check').forEach(check => {
            check.textContent = '';
        });
        this.querySelector('.card-check').textContent = '✓';
    });
});

// 필터 버튼 클릭
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(filterBtn => {
            filterBtn.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// 메뉴 아이템 클릭
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function() {
        const label = this.querySelector('.label').textContent;
        // 여기에 각 메뉴 아이템 클릭 시 동작 추가
        console.log(`${label} 메뉴 클릭됨`);
    });
});

// 로그아웃 버튼 클릭
document.querySelector('.logout-btn').addEventListener('click', function() {
    if(confirm('로그아웃 하시겠습니까?')) {
        showScreen('login-screen');
    }
});

// 예약 제출 함수
function submitReservation() {
    const startLocation = document.getElementById('reserve-start-location').value;
    const endLocation = document.getElementById('reserve-end-location').value;
    const date = document.getElementById('reserve-date').value;
    const time = document.getElementById('reserve-time').value;
    const passengers = document.getElementById('reserve-passengers').value;

    console.log('Time value:', time); // 디버깅을 위한 로그 추가

    // 입력값 검증
    if (!startLocation) {
        alert('출발지를 입력해주세요.');
        return;
    }
    if (!endLocation) {
        alert('도착지를 입력해주세요.');
        return;
    }
    if (!date) {
        alert('예약 날짜를 선택해주세요.');
        return;
    }
    if (!time) {
        alert('예약 시간을 선택해주세요.');
        return;
    }

    // 예약 정보를 완료 화면에 표시
    document.getElementById('complete-start').textContent = startLocation;
    document.getElementById('complete-end').textContent = endLocation;
    document.getElementById('complete-date').textContent = formatDate(date);
    document.getElementById('complete-time').textContent = time;
    document.getElementById('complete-passengers').textContent = passengers + '명';

    // 예약 완료 화면으로 전환
    showScreen('reservation-complete-screen');
}

// 날짜 포맷 함수
function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
} 