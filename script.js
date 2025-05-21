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

// 택시 호출 함수 수정
function callTaxi() {
    const startLocation = document.getElementById('start-location').value;
    const endLocation = document.getElementById('end-location').value;
    const reserveTime = document.getElementById('reserve-time').value;

    if (!startLocation || !endLocation) {
        alert('출발지와 도착지를 모두 입력해주세요.');
        return;
    }

    if (selectedCallType === 'reserve' && !reserveTime) {
        alert('예약 시간을 선택해주세요.');
        return;
    }

    // 대기 화면으로 전환
    showScreen('waiting-screen');

    // 3초 후에 배차 완료 화면으로 전환
    setTimeout(() => {
        showScreen('success-screen');
    }, 3000);
}

// 택시 호출 취소 함수
function cancelCall() {
    showScreen('main-screen');
}

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