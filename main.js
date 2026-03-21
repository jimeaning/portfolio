document.addEventListener('DOMContentLoaded', () => {
    // 1. 스크롤 애니메이션 (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // 모바일에서 조금 더 빨리 나타나도록 설정
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // 한 번 나타난 요소는 감시 해제하여 성능 최적화
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 2. 부드러운 스크롤
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            // [체크 1] href가 그냥 "#" 이거나 비어있으면 무시 (GitHub 링크 등 예외 처리)
            if (targetId === '#' || targetId === '') return;

            // [체크 2] 내부 링크인 경우에만 스크롤 기능 작동
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault(); // 유효한 타겟이 있을 때만 기본 동작 막기
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. 모달 외부 클릭 시 닫기 (window.onclick 대신 이벤트 리스너 사용)
    const modal = document.getElementById('licenseModal');
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
});

// 4. 자격증 모달 제어 함수 (전역 유지)
/**
 * @param {string} name - 자격증/어학 명
 * @param {string} org  - 발급 기관
 * @param {string} date - 발급 일자
 * @param {string} val  - 자격번호 또는 성적/등급 값
 */
function showLicense(name, org, date, val) {
    const modal = document.getElementById('licenseModal');
    const label = document.getElementById('m-label');
    const rowNum = document.getElementById('m-row-num'); // 번호가 들어가는 줄 전체

    // 1. 기본 데이터 삽입
    document.getElementById('m-name').innerText = name;
    document.getElementById('m-org').innerText = org;
    document.getElementById('m-date').innerText = date;

    // 2. 자격번호/성적 값이 없을 경우 처리
    if (!val || val === '') {
        rowNum.style.display = "none"; // 값이 없으면 줄 전체를 숨김
    } else {
        rowNum.style.display = "block"; // 값이 있으면 다시 보여줌
        document.getElementById('m-num').innerText = val;

        // 어학 성적일 경우 레이블 변경
        if (name.includes('TOEIC') || name.includes('OPIc') || name.includes('영어')) {
            label.innerText = "성적/등급: ";
        } else {
            label.innerText = "자격번호: ";
        }
    }

    modal.style.display = "block";
    document.body.classList.add('no-scroll');
}

function closeModal() {
    const modal = document.getElementById('licenseModal');
    modal.style.display = "none";
    // 모달 닫을 때 스크롤 복원
    document.body.classList.add('no-scroll');
}

// 기존 window.onclick에 프로젝트 모달 닫기 추가
window.addEventListener('click', (event) => {
    const pModal = document.getElementById('projectModal');
    const lModal = document.getElementById('licenseModal');
    if (event.target === pModal) closeProjectModal();
    if (event.target === lModal) closeModal();
});

// 프로젝트 데이터를 객체 형태로 저장
const projectData = {
    hils: {
        title: "차량용 게이트웨이 통신 시스템 검증",
        date: "2024.04.01 - (재직중)",
        role: "유라코퍼레이션 / 선임연구원",
        env: "Vector CANoe, VT System, ES95486-02",
        details: `
            <div class="list-item">&bull; <strong>게이트웨이 제어기 검증</strong></div>
            <div class="list-item indent">&circ; 차량 네트워크 통신 분석 및 Fault Injection 테스트 수행</div>
            <div class="list-item">&bull; <strong>사이버보안 ASK 검증</strong></div>
            <div class="list-item indent">&circ; ES95486-02 기반 보안 요구사항 준수 여부 확인</div>
            <div class="list-item">&bull; <strong>테스트 자동화</strong></div>
            <div class="list-item indent">&circ; Python 및 CAPL을 활용한 자동화 테스트 시나리오 개발</div>
            <b>1. CANoe 활용 게이트웨이 검증 & 통신 분석</b>
            <img src='images/bts/설명1.png' style='width:100%; margin:15px 0;'>
            <div class="list-item">&bull; Step Motor로 카메라를 회전시킨다.<br></div>
            <div class="list-item">&bull; 영상 frame을 Raspberry Pi로부터 받아 와 GUI에 출력한다.<br></div>
            <div class="list-item indent">\u25E6 동시성을 갖기 위해 Thread 사용 (Video Thread)</div>
            <br>
            <b>2. Fault Injection 테스트</b>
            <img src='images/bts/설명2.png' style='width:100%; margin:15px 0;'>
            <div class="list-item">&bull; 객체가 탐지되면 콘솔에 ‘타겟 포착’ 메세지를 출력한다.<br></div>
            <div class="list-item">&bull; 직접 수집한 900여 장의 데이터를 CVAT으로 라벨링 후 Intel OpenVINO 모델을 활용해 객체 탐지 및 분류를 진행한다.<br></div>
            <div class="list-item">&bull; 영상처리 후 타겟의 Category와 Type을 받아 온다.<br></div>
            <div class="list-item indent">\u25E6 Category</div>
            <div class="list-item indent">0 : Car, 1 : Plane, 2 : Human</div>
            <div class="list-item indent">\u25E6 Type</div>
            <div class="list-item indent">0 : Tank, 1 : Two-Half Truck, 2 : Retona, 3 : Plane, 4 : Fighter-jet, 5 : Hellicopter, 6 : Human</div>
            <img src='images/bts/설명2-영상처리.png' style='width:100%; margin:15px 0;'>
            <br>
            <b>3. 사이버보안 ASK 검증</b>
            <img src='images/bts/설명3.png' style='width:100%; margin:15px 0;'>
            <div class="list-item">&bull; 분류된 객체를 바탕으로 타겟의 특성에 맞는 무기를 선택한다.<br></div>
            <div class="list-item indent">\u25E6 탱크나 두돈반과 같은 대전차: 파괴력 강화</div>
            <div class="list-item indent">\u25E6 전투기나 헬기와 같은 대공(對空): 속도 강화</div>
            <div class="list-item indent">\u25E6 대인(對人): 대량살상무기</div>
            <div class="list-item">&bull; 무기가 선택되면 LED가 점등되고 계산된 각도값으로 Servo Motor를 제어한다.<br></div>
            <br>
            <b>4. Python & CAPL 활용 자동화 테스트 개발</b>
            <img src='images/bts/설명4.png' style='width:100%; margin:15px 0;'>
            <div class="list-item">&bull; 카메라 화면(640*480) 내 물체가 위치한 곳을 ROI 영역으로 구분한다.<br></div>
            <div class="list-item">&bull; ROI 영역의 중심점 위치를 비례제어식에 넣어 포 각도를 계산한다.<br></div>
            <div class="list-item">&bull; 각도 결괏값으로 Servo Motor 제어한다.<br></div>
            <br>
            <b>5. </b>
            <br>
            <b>6. 특허 및 해외 협업 (베트남 연구소 대응)</b>
            <img src='images/bts/설명5.png' style='width:100%; margin:15px 0;'>
            <div class="list-item">&bull; Servo Motor가 제어되면 발사 완료 LED(붉은색)가 점등된다.<br></div>
            <div class="list-item">&bull; 5초 카운트다운을 시작한다.<br></div>
            <div class="list-item">&bull; 5초가 지난 이후 ‘발사’ 버튼이 활성화된다.<br></div>
            <div class="list-item indent">\u25E6 남은 탄 개수가 0이면 카운트다운과 ‘발사’ 버튼 활성화가 진행되지 않는다.</div>
            <div class="list-item">&bull; ‘발사’ 버튼이 눌리고 탄을 사용하면, 탄 개수를 감소시키고 HW에 발사 완료 sign을 전달한다.<br></div>
            <div class="list-item">&bull; HW에서 ‘발사 완료’ signal을 받으면 Servo Motor를 초기화하고 시스템을 재개한다.<br></div>
        `,
        trouble: `
            <strong>[문제 상황]</strong> 하드웨어와 시뮬레이션 환경 간의 타이밍 오차 발생<br>
            <strong>[해결 방안]</strong> CAPL 스크립트 최적화 및 실시간 동기화 파라미터 튜닝을 통해 검증 신뢰도 15% 향상
        `,
        conclusion: "체계적인 HILS 환경 운영을 통해 제어기 양산 전 단계의 소프트웨어 신뢰성을 확보하였습니다.",
    },
    target_system: {
        title: "실시간 표적 탐지 및 미사일 자동화 시스템",
        subtitle: "표적을 감지하여 특성에 맞게 분류한 후 해당 무기에 알맞은 미사일 선택해 격파하는 시스템",
        date: "2023.12.18 - 2024.01.16",
        role: "4명 / UI제작 및 HW와의 통신과 실시간 스트리밍 구현",
        github: "https://github.com/jimeaning/BTS",
        image: "images/bts/메인.png", // 이미지 경로
        motive: "&bull; 국방에서도 기계화되는 움직임이 늘어나고 있다. 최근 인구 감소로 인해 군 병력 인원이 줄었고, 기술의 발전이 원인이다. 기계화를 통해 CCTV 등 인원을 효율적으로 간소화시킬 수 있으며 사람이 놓친 정보를 기계가 포착하는 등 협업이 가능해진다.<br>&bull; 자동화 격추 시스템을 통해 출동할 인원이 부족하거나 제약이 있을 때, 통제실에서 감시, 탐지, 결정, 준비, 발사 모든 과정을 수행할 수 있다.",
        arch: "<img src='images/bts/시스템아키텍처.png' style='width:100%; margin:15px 0;'>",
        details: `
            <b>1. 카메라가 회전하며 타겟을 감시한다.</b>
            <img src='images/bts/설명1.png' style='width:100%; margin:15px 0;'>
            <div class="list-item">&bull; Step Motor로 카메라를 회전시킨다.<br></div>
            <div class="list-item">&bull; 영상 frame을 Raspberry Pi로부터 받아 와 GUI에 출력한다.<br></div>
            <div class="list-item indent">\u25E6 동시성을 갖기 위해 Thread 사용 (Video Thread)</div>
            <br>
            <b>2. 표적이 탐지되면 구체적 종류로 분류한다.</b>
            <img src='images/bts/설명2.png' style='width:100%; margin:15px 0;'>
            <div class="list-item">&bull; 객체가 탐지되면 콘솔에 ‘타겟 포착’ 메세지를 출력한다.<br></div>
            <div class="list-item">&bull; 직접 수집한 900여 장의 데이터를 CVAT으로 라벨링 후 Intel OpenVINO 모델을 활용해 객체 탐지 및 분류를 진행한다.<br></div>
            <div class="list-item">&bull; 영상처리 후 타겟의 Category와 Type을 받아 온다.<br></div>
            <div class="list-item indent">\u25E6 Category</div>
            <div class="list-item indent">0 : Car, 1 : Plane, 2 : Human</div>
            <div class="list-item indent">\u25E6 Type</div>
            <div class="list-item indent">0 : Tank, 1 : Two-Half Truck, 2 : Retona, 3 : Plane, 4 : Fighter-jet, 5 : Hellicopter, 6 : Human</div>
            <img src='images/bts/설명2-영상처리.png' style='width:100%; margin:15px 0;'>
            <br>
            <b>3. 표적의 특성에 맞는 무기를 선택한다.</b>
            <img src='images/bts/설명3.png' style='width:100%; margin:15px 0;'>
            <div class="list-item">&bull; 분류된 객체를 바탕으로 타겟의 특성에 맞는 무기를 선택한다.<br></div>
            <div class="list-item indent">\u25E6 탱크나 두돈반과 같은 대전차: 파괴력 강화</div>
            <div class="list-item indent">\u25E6 전투기나 헬기와 같은 대공(對空): 속도 강화</div>
            <div class="list-item indent">\u25E6 대인(對人): 대량살상무기</div>
            <div class="list-item">&bull; 무기가 선택되면 LED가 점등되고 계산된 각도값으로 Servo Motor를 제어한다.<br></div>
            <br>
            <b>4. P제어식을 활용해 포 각도를 조절한다.</b>
            <img src='images/bts/설명4.png' style='width:100%; margin:15px 0;'>
            <div class="list-item">&bull; 카메라 화면(640*480) 내 물체가 위치한 곳을 ROI 영역으로 구분한다.<br></div>
            <div class="list-item">&bull; ROI 영역의 중심점 위치를 비례제어식에 넣어 포 각도를 계산한다.<br></div>
            <div class="list-item">&bull; 각도 결괏값으로 Servo Motor 제어한다.<br></div>
            <br>
            <b>5. 발사 준비 완료 후 Raspberry Pi에 시그널을 전송한다.</b>
            <img src='images/bts/설명5.png' style='width:100%; margin:15px 0;'>
            <div class="list-item">&bull; Servo Motor가 제어되면 발사 완료 LED(붉은색)가 점등된다.<br></div>
            <div class="list-item">&bull; 5초 카운트다운을 시작한다.<br></div>
            <div class="list-item">&bull; 5초가 지난 이후 ‘발사’ 버튼이 활성화된다.<br></div>
            <div class="list-item indent">\u25E6 남은 탄 개수가 0이면 카운트다운과 ‘발사’ 버튼 활성화가 진행되지 않는다.</div>
            <div class="list-item">&bull; ‘발사’ 버튼이 눌리고 탄을 사용하면, 탄 개수를 감소시키고 HW에 발사 완료 sign을 전달한다.<br></div>
            <div class="list-item">&bull; HW에서 ‘발사 완료’ signal을 받으면 Servo Motor를 초기화하고 시스템을 재개한다.<br></div>
        `,
        trouble: `
            <strong>문제:</strong> PyQt에서 영상 frame을 가져오지 못하고 OpenCV로 영상처리도 불가능한 현상<br>
            <strong>해결:</strong> opencv-python은 메인 모듈과 GUI 기능이 탑재된 패키지로 GUI 프로그램인 PyQt와 사용하려니 오류가 났다. GUI 기능이 탑재되지 않은 서버 환경용 패키지인 opencv-python-headless를 사용해 해결했다.<br>
            <strong>문제:</strong> 데이터 수집할 때, Kaggle의 데이터셋을 추가했는데 CVAT에 이미지가 들어가지 않는 현상<br>
            <strong>해결:</strong> 이미지 형식이 아닌 확장자가 있어 오류가 났다. .a~z*, .0~9*를 검색하면서 알 수 없는 확장자 파일을 직접 삭제했다.
        `,
        conclusion: `
            <div class="list-item">&bull; 표적 탐지 및 격추 시스템이 사람의 개입이 있는 부분적 자동화와 없는 완전 자동화 중 어떤 것이 더 효율적이고 정확한지 궁금해서 시작하게 되었다. 아직 많은 보완이 필요하지만, 미사일 체계의 감시부터 발사까지 로직을 이해할 수 있는 경험이었다.<br></div>
            <div class="list-item">&bull; 현재 설계상 정적인 물체만 가능하지만, 프로젝트를 발전시켜 동적인 객체도 트래킹하며 명중하는 기능을 넣고 싶다<br></div>
        `
    },
    ros: {
        title: "신호등 인식을 통한 자율주행 차량 구동",
        subtitle: "좌표를 설정하면 교통법규를 준수하여 목표 지점에 도착하는 자율주행차 프로젝트",
        date: "2023.11.11 - 2023.12.05",
        role: "5명 / 신호등 영상처리, 차선 인식 및 정지선 검출",
        github: "https://github.com/jimeaning/Autonomous",
        image: "images/ros/메인.png", // 이미지 경로
        motive: "&bull; 자율주행 기술은 운전자에게 안전성과 편의성을 증대시킨다. 자율주행차는 운전으로 낭비하는 시간과 교통사고 발생의 원인을 줄여준다. 한국은 자가용 차량의 주행거리가 국토 면적에 비해 긴 편이다. 또한, 교통사고의 94%가 ‘운전자의 중대한 귀책 사유’로 유능하고 경험이 풍부한 운전자일지라도 피로한 상태거나 차량 외부 상황, 동승자 등의 방해 요소에 취약하다. 자율주행차는 운전자의 안정성을 향상시키고 교통 체증 문제를 완화하는 등 사회적 이점을 창출할 수 있다.",
        arch: "<img src='images/ros/아키텍처.png' style='width:100%; margin:15px 0;'>",
        details: `
            <b>1. 신호등 색상에 따라 flag를 설정한다</b>
            <img src='images/ros/설명1.png' style='width:100%; margin:15px 0;'>
            <div class="list-item">&bull; <b>GreenLightFlag</b> : 차량 출발/진행<br></div>
            <div class="list-item">&bull; <b>RedLightFlag</b> : 차량 멈춤<br></div>
            <div class="list-item indent">\u25E6 0 : 정지선이 시야에서 사라진 경우</div>
            <div class="list-item indent">\u25E6 1 : 정지선이 시야에 있는 경우</div>
            <div class="list-item indent">예외) 빨간불 && 정지선이 시야에 없는 경우(0)는 멈추지 않고 차량을 진행시킨다.</div>
            <br>
            <b>2. MIL(Multiple Instance Learning) 알고리즘으로 ROI 객체 위치를 추적한다</b>
            <img src='images/ros/설명2.png' style='width:100%; margin:15px 0;'>
            <div class="list-item">&bull; MIL(Multiple Instance Learning)은 인스턴스 그룹에 할당되는 지도 학습 문제를 다뤄 배경과 객체를 빠르게 구분할 수 있다.<br></div>
            <div class="list-item indent">\u25E6 도로 위 장애 요소(자동차의 붉은 브레이크 등, 가로등 불빛 등)를 최소화하기 위함이다.</div>
            <div class="list-item">&bull; ROI가 지정되면 MIL 알고리즘으로 해당 영역을 학습한다.<br></div>
            <div class="list-item">&bull; 프레임마다 신호등의 유무를 파악해 계속 객체의 위치를 추적한다.<br></div>
            <br>
            <b>3. 신호등을 실제와 유사하게 제어한다.</b>
            <img src='images/ros/설명3.png' style='width:100%; margin:15px 0;'>
            <div class="list-item">&bull; STM32와 연결해 일정 시간이 지나면 자동으로 색이 전환되도록 하였다.<br></div>
            <br>
            <b>4. OpenCV를 활용해 신호등 색상을 검출한다</b>
            <img src='images/ros/설명4.png' style='width:100%; margin:15px 0;'>
            <div class="list-item">&bull; Preprocessing : RGB 영상을 HSV로 변환 후 Morphology를 수행한다.<br></div>
            <div class="list-item indent">\u25E6 Open(열기) & Dilation(팽창)</div>
            <div class="list-item indent">\u25E6 빛 등 방해 요인으로 인해 색상이 작게 잡히는 것을 극복하기 위해 Open과 Dilation convolution을 수행하였다.</div>
            <div class="list-item">&bull; 색상이 Lower~Higher range 내에 들어오는지 판단해 터틀봇에 신호를 전달하였다.<br></div>
            <br>
            <b>5. 차선 인식 및 정지선을 검출한다</b>
            <img src='images/ros/설명5.png' style='width:100%; margin:15px 0;'>
            <div class="list-item">&bull; Gaussian Filter와 Canny Edge로 윤곽선을 검출한다.<br></div>
            <div class="list-item">&bull; 검출된 윤곽선을 바탕으로 차선 면적을 계산한다.<br></div>
            <div class="list-item">&bull; 가장 큰 면적과 ConvexHull을 활용해 중심점을 추출한다.<br></div>
            <div class="list-item">&bull; 추출된 영역을 색으로 구분해서 차선을 표시한다.<br></div>
            <br>
            <b>6. YOLO로 도로 위 객체를 인식한다</b>
            <img src='images/ros/설명6.png' style='width:100%; margin:15px 0;'>
            <div class="list-item">&bull; YOLO 사용 이유 : 실제 주행 영상의 다양한 변수로 인해 신호등 불빛 외의 장애 요소가 많다.<br></div>
            <div class="list-item indent">\u25E6 신호등 객체 인식을 위해 YOLO를 사용하였다.</div>
            <div class="list-item">&bull; YOLO의 활용 : coco 클래스의 0, 9번 id는 각각 person과 traffic light로 필요한 부분만 사용하였다.<br></div>
            <div class="list-item indent">\u25E6 class_id가 0(person)일 때, 차량 멈춤</div>
            <div class="list-item indent">\u25E6 class_id가 9(traffic light)일 때, 신호등 객체 처리</div>
        `,
        trouble: `
            <strong>문제:</strong> 터틀봇의 거리에 따라 신호등 ROI가 많이 흔들리는 현상<br>
            <strong>해결:</strong> MIL(Multiple Instance Learning) 알고리즘을 활용했다. 신호등 객체의 ROI가 잡힌 순간부터 MIL 알고리즘이 해당 영역을 학습하고 트래킹해 신호등을 판단했다.<br>
            <strong>문제:</strong> 신호등이 점등할 때 빛이 너무 강해 색상이 하얀색으로 인식되는 현상<br>
            <strong>해결:</strong> LED 주변부를 어둡게 해 색상이 포커싱 될 수 있도록 하고, 영상처리 Morphology의 Open과 팽창 기법을 사용해 사라지는 색상을 최소화했다.
        `,
        conclusion: `
            <div class="list-item">&bull; 팀원 모두 ROS를 처음 다뤄 어려운 점이 많았다. 특히 개발환경을 세팅하기 위한 시간이 많이 소모되었다. 시행착오로 인해 navigation으로 turtlebot을 제어하는 부분이 완성되지 못해 아쉽다.<br></div>
            <div class="list-item">&bull; YOLO가 객체를 탐지하고 분류하는 과정에서 영상 속도가 많이 느려졌다. GPU로 속도를 높여 RTS(Real-Time Service)가 이루어질 수 있도록 발전시키고 싶다.<br></div>
        `
    },
    songs: {
        title: "딥러닝 기반 동요 자동 작사 작곡 프로그램",
        subtitle: "사용자가 그림을 그리면 키워드가 추출되어 동요를 자동 작사, 작곡해주는 프로그램",
        date: "2022.01.02 - 2022.11.17",
        role: "4명 / 메타버스 전시회 구현 및 그림으로 멜로디 추출",
        github: "https://github.com/jimeaning/meta4music_final",
        image: "images/songs/메인.png", // 이미지 경로
        motive: "&bull; 딥러닝 기반 동요 자동 작사/작곡 프로그램인 ‘그;그림’은 동요를 통한 아이들의 언어⋅심리적 발달을 위해 기획되었다. 어린이가 그린 그림이 나만의 동요가 되는 모습을 보며 호기심을 유발하고, 서정적인 가사로 언어 발달 효과를 얻을 수 있다. 사용자는 직접 그림을 그리고 동요를 만들어 메타버스 전시회에서 공유함으로써 창작 활동 문화 형성에 기여하고, 다양한 운율과 표현을 익힐 수 있다. ",
        arch: "<img src='images/songs/아키텍처.png' style='width:100%; margin:15px 0;'>",
        details: `
            <b>1. 사용자가 그림을 그리면 인식되어 키워드를 추출한다</b>
            <img src='images/songs/설명1.png' style='width:100%; margin:15px 0;'>
            <div class="list-item">&bull; Google Creativelab의 Quickdraw dataset을 활용해 그림 인식과 판단을 한다.<br></div>
            <div class="list-item">&bull; ml5.js의 doodlenet API를 이용하여 캔버스에서 사용자가 그림을 그릴 수 있도록 구현하였다.<br></div>
            <br>
            <b>2. KoGPT2를 이용해 키워드 관련 자동 작사를 한다</b>
            <img src='images/songs/설명2.png' style='width:100%; margin:15px 0;'>
            <div class="list-item">&bull; 추출된 키워드를 바탕으로 연관된 가사를 생성한다.<br></div>
            <div class="list-item">&bull; KoGPT2 모델로 300개의 동요 가사 데이터를 fine-tuning하였다.<br></div>
            <div class="list-item">&bull; 사용자는 추천된 첫 소절이나 원하는 가사를 넣어 만들 수 있다. <br></div>
            <br>
            <b>3. GAN으로 키워드 분위기에 맞게 자동 작곡된다</b>
            <img src='images/songs/설명3.png' style='width:100%; margin:15px 0;'>
            <div class="list-item">&bull; GAN 알고리즘을 이용해 키워드 분위기에 맞는 멜로디를 생성하였다.<br></div>
            <div class="list-item">&bull; 200개의 멜로디 데이터를 7개의 카테고리로 분류하였다.<br></div>
            <div class="list-item indent">\u25E6 friendship, family, love, plant, animal, nature, etc</div>
            <br>
            <b>4. 그림 + 동요의 최종 결과물을 볼 수 있다</b>
            <img src='images/songs/설명4.png' style='width:100%; margin:15px 0;'>
            <div class="list-item">&bull; 그림, 작곡, 작사 결과물을 한 눈에 확인할 수 있는 페이지이다.<br></div>
            <div class="list-item">&bull; 작사의 결과물은 사용자가 직접 수정할 수 있다.<br></div>
            <div class="list-item indent">\u25E6 언어 발달 촉진 / 매끄러운 문맥 수정 가능</div>
            <br>
            <b>5. 가상공간 전시회에서 그림과 동요를 공유할 수 있다</b>
            <img src='images/songs/설명5.png' style='width:100%; margin:15px 0;'>
            <div class="list-item">&bull; Three.js로 3차원 구 형태의 전시회를 구현하였다.<br></div>
            <div class="list-item">&bull; 브랜드의 이미지와 통일성을 높이기 위해 Blender로 3차원 캐릭터를 제작하였다.<br></div>
            <div class="list-item">&bull; 사용자는 자신의 그림과 동요를 다른 사용자들과 공유할 수 있다. <br></div>
        `,
        trouble: `
            <strong>문제:</strong> 메타버스 전시회에서 특정 줄의 이미지가 겹쳐 다른 데이터가 출력되는 현상<br>
            <strong>해결:</strong> 겹치는 줄의 규칙을 파악해 그림이 배치되는 좌표값을 수정하는 알고리즘을 만들었다.<br>
            <div class="list-item indent">&bull; 구의 바닥은 이미지 하나만 제외하고 삭제<br></div>
            <div class="list-item indent">&bull; 구의 시작과 끝줄은 같은 이미지가 겹치도록 수정<br></div>
            <strong>문제:</strong> 작곡에 쓰이는 Magenta 라이브러리와 그림 캔버스 ml5가 충돌하는 현상<br>
            <strong>해결:</strong> React로 Front를 개발중이었으나 라이브러리가 npm으로 설치되면 충돌이 일어나는 것을 알게 되었다. CDN을 불러와 라이브러리를 사용하고 Django Framework를 이용해 테스트해보니 각각 페이지에서 잘 작동하였다.
        `,
        conclusion: `
            <div class="list-item">&bull; 처음 프로젝트 주제를 기획했을 때 교수님께서 많이 우려하셨다. 학사 수준에서 정해진 시간 내에 다 끝내기 어려울 것이 이유였다. 이전 선배님도 비슷한 목표로 시작했으나 한 기능(작곡)밖에 못하고 종료되었다고 말씀해주셨다. 그럼에도 팀원 모두 즐겁게 개발할 수 있을 것이란 자신이 있어 시작하게 되었다. 실력도 마음도 멋진 팀원들 덕에 무사히 목표한 기능을 모두 구현할 수 있었다. <br></div>
            <div class="list-item">&bull; 캔버스에서 그림의 위치로 멜로디를 표현하도록 기획, 구현하였으나 프로젝트의 목표와 약간 부합하지 않다는 멘토님의 피드백을 받아 기능을 뺐다. 열심히 개발한 부분이라 아쉽긴 했지만 프로젝트의 방향성에 따라 발전시켜 좋은 결과로 이어져서 좋았다.<br></div>
            <strong>기대효과</strong><br>
            <div class="list-item">&bull; 그림 그리기는 창의력과 자기표현 발달 향상에 기여하고, 동요는 정서적 언어적 자아 발달에 도움을 줄 수 있다.<br></div>
            <div class="list-item">&bull; 교육자에게 그림과 동요를 활용한 미디어 학습 콘텐츠를 제공해 양질의 교보재로 활용할 수 있다.<br></div>
            <strong>특허 출원</strong><br>
            <img src='images/songs/특허.png' style='width:100%; margin:15px 0;'>
        `
    }
};

function showProjectDetails(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    // [1] 상단 고정 항목
    document.getElementById('p-title').innerText = data.title;
    document.getElementById('p-date').innerText = data.date;
    document.getElementById('p-role').innerText = data.role;

    // [2] 선택적 항목 리스트
    const optionalFields = {
        'p-subtitle': data.subtitle,
        'p-github': data.github,
        'p-image': data.image, // 이미지 필드
        'p-motive': data.motive,
        'p-arch': data.arch,
        'p-details': data.details,
        'p-trouble': data.trouble,
        'p-conclusion': data.conclusion
    };

    for (let id in optionalFields) {
        const el = document.getElementById(id);
        if (!el) continue;

        const val = optionalFields[id];
        let wrapper;

        // 특정 영역(GitHub, 이미지)은 ID로 직접 부모를 찾고, 나머지는 클래스로 찾음
        if (id === 'p-github') {
            wrapper = document.getElementById('p-github-area');
        } else if (id === 'p-image') {
            wrapper = document.getElementById('p-image-area'); // 이미지 부모 ID 추가
        } else {
            wrapper = el.closest('.project-section');
        }

        if (val) {
            if (id === 'p-github') {
                el.href = val;
            } else if (id === 'p-image') {
                el.src = val;
                el.style.display = "block"; // 이미지 자체 표시
            } else {
                el.innerHTML = val;
            }
            if (wrapper) wrapper.style.display = "block"; // 부모 영역 표시
        } else {
            if (wrapper) wrapper.style.display = "none"; // 부모 영역 숨김
        }
    }

    document.getElementById('projectModal').style.display = "block";
    document.body.classList.add('no-scroll');
}

// 프로젝트 모달 닫기
function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    
    modal.style.display = "none";
    document.body.classList.remove('no-scroll'); // 뒷배경 스크롤 다시 허용
}

const expData = {
    hils_specialist: {
        title: "자동차 제어기 HILS 검증",
        period: "2024.04.01 - ",
        company: "유라코퍼레이션 / 전자제어검증팀 선임연구원",
        techStack: ["Vector CANoe", "CAPL", "Python", "VT System", "CAN/LIN"],
        
        // 1. 핵심 업무 상세
        tasks: `
            <div class="exp-sub-section">
                <h5><span class="emoji">⚙️</span> 제어기 통신 및 보안 검증</h5>
                <ul>
                    <li><strong>차량 게이트웨이 시스템 검증:</strong> CANoe 기반 메시지 라우팅 정밀도 및 통신 무결성 분석</li>
                    <li><strong>사이버보안 ASK 검증:</strong> ES95486-02 및 ISO/SAE 21434 기반 보안 요구사항 준수 테스트</li>
                    <li><strong>결함 주입(Fault Injection):</strong> 강제 통신 장애 상황 시나리오 설계 및 제어기 대응 로직 안정성 확보</li>
                    <li><strong>글로벌 협업:</strong> 베트남 연구소 기술 대응 및 요구사양 분석/결과 리뷰 리딩</li>
                </ul>
            </div>
        `,
        
        // 2. 업무 효율화 성과
        efficiency: `
            <div class="exp-sub-section highlight-box">
                <h5><span class="emoji">🚀</span> 업무 자동화 및 AI 도입 성과</h5>
                <ul>
                    <li><strong>테스트 자동화:</strong> Python 및 CAPL 스크립트 최적화를 통한 검증 프로세스 효율 개선</li>
                    <li><strong>AI 지식 관리 시스템:</strong> 실무 에러 로그 및 해결법을 자산화한 '문제 해결 정리 사이트' 자체 개발</li>
                </ul>
            </div>
        `,
        
        // 3. 특허 및 기타 성과
        achievements: `
            <div class="exp-sub-section">
                <h5><span class="emoji">🏆</span> 주요 성과</h5>
                <p><strong>[특허 출원]</strong> 차량 주정차 시 오염 위험 알림 시스템 및 방법</p>
                <img src='images/patent.jpg' style='width:50%; margin:15px 0;'>
                <img src='images/순서도.png' style='width:50%; margin:15px 0;'>
                <img src='images/도면.png' style='width:50%; margin:15px 0;'>
            </div>
        `
    }
};

// 경력 상세 모달 표시 함수
function showExperienceDetails(id) {
    const data = expData[id];
    if (!data) return;

    // 헤더 정보
    document.getElementById('exp-title').innerText = data.title;
    document.getElementById('exp-company').innerText = data.company;
    document.getElementById('exp-period').innerText = data.period;

    // 기술 스택 (태그 생성)
    const techContainer = document.getElementById('exp-tech-tags');
    techContainer.innerHTML = data.techStack.map(tag => `<span class="tech-tag">${tag}</span>`).join('');

    // 본문 주입
    document.getElementById('exp-tasks').innerHTML = data.tasks;
    document.getElementById('exp-efficiency').innerHTML = data.efficiency;
    document.getElementById('exp-achievements').innerHTML = data.achievements;

    // 모달 표시
    document.getElementById('expModal').style.display = "block";
    document.body.classList.add('no-scroll');
}

function closeExpModal() {
    document.getElementById('expModal').style.display = "none";
    document.body.classList.remove('no-scroll');
}