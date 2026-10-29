/*
 * 헝그리한정민 포트폴리오 콘텐츠 데이터
 * ─────────────────────────────────────────────
 * 화면에 보이는 글 · 이미지 · 문서 경로는 모두 이 파일에서 고친다.
 *
 * 규칙
 * - 확인되지 않은 값은 빈 문자열("") 또는 빈 배열([])로 둔다. 빈 항목은 화면에서 숨겨진다.
 * - 이미지: src에 경로를 넣으면 실제 이미지가 보이고, 비어 있으면 용도가 적힌 플레이스홀더가 보인다.
 *   경로는 사이트 루트 기준(예: "assets/images/korail/flow-compare.png").
 * - 문서: href에 경로를 넣으면 새 탭으로 열리고, 비어 있으면 "준비 중"으로 보인다.
 *   경로는 사이트 루트 기준(예: "assets/docs/resume.pdf").
 * - TODO(확인 필요) 주석이 붙은 항목은 공개 전에 본인이 확인할 값이다.
 */
window.PORTFOLIO = {
  site: {
    name: '한정민',
    brand: '헝그리한정민',
    role: 'UI/UX Service Planner',
    email: 'jungmin2209@naver.com',
    updated: '2026.10'
  },

  hero: {
    role: 'UI/UX 서비스 기획자',
    title: ['더 나은 결과를 찾는', '배부르지 않은 기획자,', '헝그리한정민.'],
    sub: ['사용자의 문제를 묻고, 근거로 설계하고,', 'AI와 함께 직접 만들어 확인합니다.']
  },

  /* 문서 다운로드: href가 비어 있으면 "준비 중" */
  documents: {
    resume: { label: '이력서', href: '' },        // TODO(확인 필요): assets/docs/resume.pdf
    coverLetter: { label: '자기소개서', href: '' } // TODO(확인 필요): assets/docs/cover-letter.pdf
  },

  /* 핵심 역량: target.project + target.section 으로 상세의 근거 구역을 연다 */
  capabilities: [
    {
      id: 'observe',
      title: '사용자 관찰과 문제 정의',
      desc: '개인적인 불편을 사용자 과제와 관찰로 확인합니다.',
      linkLabel: '코레일톡 · 발견과 문제 정의',
      target: { project: 'korail', section: 'discovery' }
    },
    {
      id: 'strategy',
      title: '서비스 전략과 UX 구조 설계',
      desc: '사용자 맥락과 조사 결과를 이용 시나리오와 서비스 구조로 구체화합니다.',
      linkLabel: '플로레터 · 판단과 설계',
      target: { project: 'flo-letter', section: 'decisions' }
    },
    {
      // AI 역량은 두 종류로 나눈다: 서비스 안의 AI를 기획한 일 / AI 도구로 직접 만든 일
      id: 'ai',
      title: 'AI 기획과 프로토타이핑',
      parts: [
        { label: '서비스 안의 AI 기획', desc: 'AI가 참고할 정보, 맡길 판단, 사용자에게 제안할 행동을 정합니다.', linkLabel: '유지 · 설계', target: { project: 'uuji', section: 'design' } },
        { label: 'AI 도구로 직접 구현', desc: 'AI 코딩 도구로 웹 · 프로토타입을 만들고, 생성 결과를 기획 의도에 맞게 검토 · 수정합니다.', linkLabel: '추가 프로젝트 · 프로토타입', target: { anchor: 'group-more' } }
      ]
    },
    {
      id: 'collab',
      title: '협업과 기획 전달',
      desc: '프로젝트 목적을 기준으로 의견을 정리하고 문서와 발표로 전달합니다.',
      linkLabel: '이력 · 교내활동',
      target: { anchor: 'activities' }
    }
  ],

  /*
   * 자기소개 — 이력서와 함께 낸 자기소개서의 세 주제를 따름. 묶음마다 제목 한 줄 + 짧은 문단
   *   **두 별표**로 감싼 말은 역량 키워드라 굵게 보인다
   * 이력 — 날짜 | 이름 · 직책 | 한 줄 설명
   * 공개하지 않는 정보: 휴대전화 · 생년월일 · 주소 · 병역 · 면허 (이력서 PDF에만)
   */
  about: {
    // 프로필 사진: 증명사진 비율(3:4). 이력 섹션 왼쪽에 보인다. 이력서 PDF에 들어간 사진과 같은 파일
    photo: { src: 'assets/images/profile.jpg', alt: '한정민 프로필 사진', ratio: '3:4', purpose: '프로필 사진' },
    intro: [
      {
        label: '기획관',
        title: '화면보다 먼저, 이유를 고민합니다',
        paras: [
          '처음에는 시각적으로 보기 좋은 결과물을 만드는 일이 좋아 디자인을 공부했습니다. 프로젝트를 거듭할수록 화면을 완성하는 일보다, **사용자가 왜 특정 단계에서 멈추는지** 살피고 그 문제를 **해결할 구조를 설계**하는 과정에 더 끌렸고, 그렇게 서비스 기획에 관심을 갖게 되었습니다.',
          '좋은 서비스는 화려한 화면보다 사용자가 원하는 목적을 쉽고 자연스럽게 달성할 수 있는 구조에서 시작한다고 생각합니다. 그래서 해결안을 먼저 정하기보다 상황을 살피고 **문제를 구체화**한 뒤, **근거를 바탕으로 방향**을 정합니다. “형태는 기능을 따른다”는 말처럼 사용자의 목적을 먼저 이해하고, 그에 맞춰 **정보의 순서와 화면의 흐름, 인터랙션**을 설계합니다.'
        ]
      },
      {
        label: '기획 역량',
        title: '사용자 맥락을 읽고, AI로 경험을 구체화합니다',
        paras: [
          '프로젝트를 시작할 때 먼저 **사용자와 환경을 살피고**, **표면적인 요청 뒤에 있는 문제**를 찾습니다. 주제가 달라도 행동을 어렵게 만드는 조건을 찾아 **서비스 방향으로 연결**하는 일을 중요하게 생각합니다.',
          'AI는 사용자의 상황에 맞는 다음 행동을 설계하는 **기획 요소**로 다룹니다. ‘맞춤 추천’이라는 말에 머물지 않고 **입력 맥락 – 판단 기준 – 사용자에게 제안되는 행동**이 이어지는 **서비스 시나리오**로 구체화하며, 실제 모델 성능을 주장하기보다 AI가 맡을 판단과 사용자 경험의 연결을 분명히 하는 데 집중합니다.',
          'AI 코딩 도구로는 기획한 인터랙션과 사용자 흐름을 **웹 · 프로토타입으로 직접 구현**해, 문서와 화면 시안만으로는 알기 어려운 실제 동작을 확인합니다. 예상한 흐름과 다르거나 사용 과정이 복잡해지는 지점을 발견하면 다시 기획으로 돌아가 수정하고, **AI가 생성한 결과도 사용자 목적과 기획 의도에 맞는지 검토**합니다.'
        ]
      },
      {
        label: '협업과 성장',
        title: '더 나은 근거를 찾는 기획자',
        paras: [
          '팀 프로젝트에서는 개인의 취향보다 **사용자 목표와 프로젝트 목적을 판단 기준**으로 삼습니다. **서로 다른 생각을 정리해 합의점**을 찾고, 기획 의도와 조사 결과를 팀이 이해하고 활용할 수 있도록 **회의록과 발표 자료**로 정리해 전달합니다.',
          '앞으로는 에스노그라피, 심층 인터뷰(FGI), 타운워칭처럼 실제 환경을 살피는 방법을 더 익혀 기획의 근거를 탄탄하게 만들고 싶습니다. 제게 ‘배고픔’은 무조건 더 많이 하는 욕심이 아니라, 지금의 답에 안주하지 않고 **근거를 다시 살피며** 더 나은 결과를 찾는 태도입니다.'
        ]
      }
    ],

    // 이력: when(날짜) · what(이름 · 직책) · note(한 줄 설명). project가 있으면 note가 프로젝트 상세 링크가 됨
    education: [
      { when: '2027.02', what: '계원예술대학교 디지털미디어디자인과', note: '기획 세부전공 졸업 예정' },
      { when: '2026.03', what: '계원예술대학교 디지털미디어디자인과', note: '기획 세부전공 선택' },
      { when: '2023.03', what: '계원예술대학교 디지털미디어디자인과', note: '입학' }
    ],
    awards: [
      { when: '2026.07', what: '제32회 커뮤니케이션 디자인 국제 어워드 · 회장상 (기획 부문)', note: '플로레터', project: 'flo-letter' },
      { when: '2026.07', what: '제32회 커뮤니케이션 디자인 국제 어워드 · 입선 (디자인 부문)', note: '유지', project: 'uuji' }
    ],
    presentations: [
      { when: '2026.06.26', what: '학과 연합 PT 우수작 선정 · 발표', note: '플로레터', project: 'flo-letter' }
    ],
    activities: [
      { when: '2026.09 – 12', what: '툴 멘토링 · 멘토', note: '바이브 코딩 및 기획, Figma 활용 멘토링' },
      { when: '2026.09 – 12', what: 'AI 동아리 AIM · AI 교육팀 팀장', note: '바이브 코딩 기반 웹 앱 제작 교육' },
      { when: '2026.06 – 09', what: 'ESG 거버넌스 · 영상팀 팀장', note: '책임감 있는 AI 사용을 주제로 영상 제작' },
      { when: '2026.03 – 12', what: '기획동아리 초안 · 카드뉴스팀 팀장', note: '학과 생활 팁 카드뉴스 제작' }
    ],
    // 기획과 관련 있는 경력만 공개. 다른 아르바이트 · 병역 · 면허는 이력서 PDF에만
    career: [
      { when: '2026.02 – 현재', what: '바이칼 휘트니스 · 파트타이머', note: '사내 인수인계 시스템 제작, 사무 업무, 고객 응대, 인포데스크 관리' }
    ],
    // 기획 방법: 자기소개서에 적은 방법을 단계별로 묶음(특정 프로젝트에 썼다고 연결하지 않음)
    methods: [
      { stage: '조사 · 분석', items: ['요구분석', 'RFP 분석', '트렌드 분석', '벤치마킹', 'SWOT 분석', '3Cs', '포지셔닝'] },
      { stage: '아이디어', items: ['마인드맵핑', '브레인스토밍', '브레인라이팅', '소셜 매트릭스 분석'] },
      { stage: '사용자 정의', items: ['니즈 · 원츠 도출', '페르소나 분석', '유저 저니맵', '카드소팅', '사용 시나리오'] },
      { stage: '구조 · 표현', items: ['정보구조도', '레이블링', '플로우차트', '와이어프레임', '스토리보드', '프로토타이핑', '조사보고서 작성'] }
    ],
    // logos: 툴 이름 앞 실제 로고(assets/images/tools/). invert: true면 다크 모드에서 색을 뒤집음(검은 단색 로고)
    // 출처: Wikimedia Commons (퍼블릭 도메인 · CC0). Midjourney · 한글은 이력서 PDF에 들어간 로고를 꺼내 씀
    tools: [
      { name: 'ChatGPT', use: '리서치 · 아이디어 정리', logos: [{ src: 'assets/images/tools/chatgpt.svg' }] },
      { name: 'Claude', use: '바이브 코딩 · 논리 고도화', logos: [{ src: 'assets/images/tools/claude.svg' }] },
      { name: 'Gemini', use: '자료 조사', logos: [{ src: 'assets/images/tools/gemini.svg' }] },
      { name: 'NotebookLM', use: '자료 종합 · 근거 기반 기획 인사이트', logos: [{ src: 'assets/images/tools/notebooklm.svg', invert: true }] },
      { name: 'Midjourney', use: '이미지 시안', logos: [{ src: 'assets/images/tools/midjourney.svg', invert: true }] },
      { name: 'Figma', use: '와이어프레임 · 화면 설계', logos: [{ src: 'assets/images/tools/figma.svg' }] },
      { name: 'Notion', use: '문서 · 일정 · 회의록', logos: [{ src: 'assets/images/tools/notion.png' }] },
      { name: 'PowerPoint', use: '기획서 · 발표 자료', logos: [{ src: 'assets/images/tools/powerpoint.svg' }] },
      { name: 'Excel', use: '데이터 정리', logos: [{ src: 'assets/images/tools/excel.svg' }] },
      { name: 'Word', use: '문서 · 회의록', logos: [{ src: 'assets/images/tools/word.svg' }] },
      { name: '한글', use: '문서 · 회의록', logos: [{ src: 'assets/images/tools/hangul.png' }] },
      { name: 'Visual Studio Code', use: '코드 작성 · 프로토타이핑', logos: [{ src: 'assets/images/tools/vscode.svg' }] }
    ]
  },


  /*
   * 홈 분류 버튼
   * 프로젝트 성격으로만 나눈다(산출물 종류로 나누지 않음). id가 'all'이면 전체.
   * 프로젝트 categories에 같은 이름이 있으면 보이고, 태그가 여러 개여도 프로젝트는 한 번만 센다.
   * icon: grid · cursor · doc · spark · proto
   */
  filters: [
    { id: 'all', label: '전체', icon: 'grid' },
    { id: 'UX 개선', label: 'UX 개선', icon: 'cursor' },
    { id: '서비스 기획', label: '서비스 기획', icon: 'doc' },
    { id: 'AI 서비스', label: 'AI 서비스', icon: 'spark' },
    { id: '프로토타입', label: '프로토타입', icon: 'proto' }
  ],

  /*
   * 추가 프로젝트: 상세 페이지 없이 자료를 묶어 보여 주는 프로젝트
   * outputs: 이 프로젝트의 산출물. href가 있으면 링크로 열리고, 없으면 이름만 보인다(버튼을 만들지 않음).
   * url: 프로젝트 상세나 소개 페이지가 생기면 주소를 넣는다.
   * summary: 한 문장 소개 — TODO(확인 필요): 확인된 문장이 없어 비워 둠
   * skills: 이 프로젝트에 쓴 역량 키워드. 카드에서 접혀 있다가 눌러 펼친다 — TODO(확인 필요): 산출물 이름에서 뽑은 것, 실제와 다르면 고칠 것
   */
  moreProjects: [
    {
      id: 'lotte', title: '롯데시네마', categories: ['UX 개선'], summary: '', url: '',
      skills: ['사용성 평가', '벤치마킹', '정보구조도', '유저 플로우', '기능정의서', '화면설계서'],
      cover: { src: '', ratio: '16:10', purpose: '롯데시네마 대표 이미지' },
      outputs: [
        { label: '사용성 평가', href: '' },
        { label: '벤치마킹', href: '' },
        { label: '정보구조 · 유저 플로우', href: '' },
        { label: '화면설계서', href: '' }
      ]
    },
    {
      id: 'parallax', title: 'PARALLAX', categories: ['프로토타입'], summary: '', url: '',
      skills: ['정보구조도', '플로우차트', '유저 저니맵', '프로토타이핑', '발표 자료 제작', '화면설계서'],
      cover: { src: '', ratio: '16:10', purpose: 'PARALLAX 대표 이미지' },
      outputs: [
        { label: '통제실 UX 프로토타입', href: '' },
        { label: '발표 자료', href: '' }
      ]
    },
    {
      id: 'portfolio', title: '포트폴리오', categories: ['프로토타입'], summary: '', url: '',
      skills: ['정보구조도', '화면설계서', '바이브 코딩', '반응형 웹 구현', '디자인 시스템 적용'],
      cover: { src: '', ratio: '16:10', purpose: '포트폴리오 웹 대표 이미지' },
      outputs: [
        { label: '포트폴리오 웹', href: '' },
        { label: '포트폴리오 웹 화면설계서', href: '' }
      ]
    }
  ],

  /* 기타 제작물: 프로젝트로 세지 않는 단독 제작물 */
  // 포트폴리오 웹 화면설계서는 추가 프로젝트 '포트폴리오'로 옮김
  otherWorks: [],

  /*
   * 대표 프로젝트 (상세 페이지가 있는 프로젝트)
   *
   * 구역별 역할 — 같은 문장을 두 구역에 쓰지 않는다
   *   summary   개요 · 홈 카드: 결론만 1~2문장 (problem → decision → result)
   *   discovery 발견: 근거. observations(조사 · 관찰에서 확인한 사실)와 interpretation(기획자의 해석), hypothesis(검증 전 가설)를 나눈다
   *   decisions 판단: 결정 2~3개. 각 결정은 fact(발견한 사실) → options(실제로 검토한 방향) → choice(선택) → reason(이유 · 우선순위)
   *   design    설계: 실제 바꾼 것. changes는 before(기존 어려움) → change(변경) → why(필요한 이유)
   *   validation 검증: purpose · method · results · changes · limitations · nextSteps. 수상은 awards(외부 성과)로 따로
   *
   * role.mine 직접 담당 / role.shared 팀과 함께 한 일 / scope 프로젝트 전체 작업(팀 전체)
   * images: { src, alt, ratio, purpose, desc } — purpose는 이미지에 들어갈 자료의 용도, desc는 실제 이미지가 들어오면 "이 자료에서 볼 것"을 쓴다
   *   ratio: '16:9' · '4:3' · '1:1' · 'original'(원본 비율)
   * documents: { label, href, section } — section을 적으면 그 구역 끝에도 링크가 붙는다(href가 있을 때만)
   * slides: 홈 카드에서 넘겨 보는 이미지(선택). 비우면 cover → 설계 비교 → 판단 · 설계 이미지 순서로 채운다
   * skills: 이 프로젝트에 쓴 역량 키워드. 홈 카드에서 접혀 있다가 눌러 펼친다 — TODO(확인 필요): 역할 · 작업 범위에서 뽑은 것
   */
  projects: [
    {
      id: 'korail',
      slug: 'korail',
      categories: ['UX 개선'],
      title: '코레일톡 UX 개선',
      description: '코레일톡 앱에서 예약한 승차권을 조회하는 과정의 탐색 혼란을 개선한 UX 프로젝트',
      targetUser: '', // TODO(확인 필요): 대상 사용자
      period: '',     // TODO(확인 필요)
      team: '',       // TODO(확인 필요): 예) 4인 팀
      role: {
        mine: ['템플릿 제작', '사용성 평가 계획 작성'], // TODO(확인 필요): 어떤 템플릿인지 적으면 더 구체적
        shared: []                                    // TODO(확인 필요): 팀원과 함께 한 일
      },
      scope: ['사용자 과제 기반 사용성테스트 · 아이트래킹 관찰', '정보 분류와 기능 위치 재구성', '개선안 재평가'],
      summary: {
        problem: '예약 승차권 조회 기능이 여러 영역에 흩어져 있어, 사용자가 같은 탐색을 반복하고 기능 위치를 예측하지 못했습니다.',
        problemType: '', // 'hypothesis'면 "가설"로 표시
        decision: '버튼을 강조하기보다 정보 분류와 기능 위치를 먼저 고쳐, 조회 관련 기능을 사용자 목적 기준으로 다시 묶었습니다.',
        result: '' // TODO(확인 필요): 재평가에서 실제로 확인한 결과 한 문장
      },
      awards: [],
      cover: { src: '', alt: '', ratio: '16:9', purpose: '코레일톡 UX 개선 대표 이미지' },
      discovery: {
        question: '',  // TODO(확인 필요): 처음 확인하려던 질문
        purpose: '',   // TODO(확인 필요)
        method: '사용자에게 과제를 제시하고 사용성테스트와 아이트래킹으로 탐색 행동을 관찰했습니다.',
        target: '',    // TODO(확인 필요): 참여자 수 · 조건
        // TODO(확인 필요): 어떤 과제에서 어떤 행동이 나왔는지(예: 어느 화면을 몇 번 오갔는지) 실제 기록으로 보강
        observations: [
          '예약 승차권 조회와 관련된 기능을 찾는 과정에서 여러 영역을 오가며 같은 탐색을 반복했습니다.',
          '찾는 기능이 어디에 있을지 예측하기 어려워했습니다.'
        ],
        interpretation: ['기능을 이해하지 못한 것보다, 기능이 놓인 위치를 예측하지 못한 것이 더 큰 문제라고 보았습니다.'],
        hypothesis: [],
        evidence: [
          { src: '', alt: '', ratio: '16:9', purpose: '코레일톡 기존 예약 승차권 조회 경로', desc: '' },
          { src: '', alt: '', ratio: 'original', purpose: '사용자 과제와 관찰 기록', desc: '' },
          { src: '', alt: '', ratio: '16:9', purpose: '아이트래킹 결과', desc: '' }
        ],
        problemDefinition: '예약 승차권 조회 기능이 여러 영역에 흩어져 있어, 사용자는 기능의 위치를 예측하지 못하고 같은 탐색을 반복한다.'
      },
      decisions: {
        items: [
          {
            title: '강조보다 정보 구조를 먼저 고친다',
            fact: '조회 관련 기능이 여러 영역에 흩어져 있었고, 사용자는 위치를 예측하지 못해 같은 탐색을 반복했습니다.',
            // TODO(확인 필요): 검토한 방향은 지시문 기준 — 실제로 검토했는지 확인
            options: ['버튼 등 시각적 강조로 기능을 눈에 띄게 하기', '정보 분류와 탐색 구조를 다시 짜기'],
            choice: '정보 분류와 탐색 구조를 먼저 개선했습니다.',
            reason: '관찰된 문제는 기능을 알아보지 못한 것이 아니라 위치를 예측하지 못한 것이어서, 강조보다 분류와 배치를 먼저 바꿔야 한다고 판단했습니다.'
          }
          // TODO(확인 필요): 두 번째 · 세 번째 결정이 있으면 같은 형식으로 추가
        ],
        images: []
      },
      design: {
        intro: '',
        compare: {
          before: { src: '', alt: '', ratio: '16:9', purpose: '코레일톡 기존 조회 흐름 · 정보구조' },
          after: { src: '', alt: '', ratio: '16:9', purpose: '코레일톡 개선 조회 흐름 · 정보구조' },
          caption: '코레일톡 기존 · 개선 조회 흐름 비교'
        },
        // TODO(확인 필요): 어떤 기능을 어디로 묶었는지, 조회 단계가 어떻게 달라졌는지 실제 내용으로 보강
        changes: [
          { title: '조회 관련 기능 묶기', before: '예약 승차권 조회와 관련된 기능이 여러 영역에 흩어져 있었습니다.', change: '사용자 목적을 기준으로 관련 기능과 정보 순서를 다시 묶었습니다.', why: '사용자가 기능 위치를 예측할 수 있게 하기 위해서입니다.' },
          { title: '조회 흐름', before: '', change: '조회 흐름을 단순화했습니다.', why: '' }
        ],
        images: [
          { src: '', alt: '', ratio: '16:9', purpose: '코레일톡 주요 개선 화면', desc: '' }
        ]
      },
      validation: {
        purpose: '',  // TODO(확인 필요)
        method: '개선안을 대상으로 다시 평가했습니다.', // TODO(확인 필요): 참여자 · 과제 · 조건
        results: [],  // TODO(확인 필요): 실제로 관찰한 결과만
        changes: [],
        status: '재평가에서 확인한 결과는 자료를 정리해 추가합니다.',
        images: [
          { src: '', alt: '', ratio: '16:9', purpose: '코레일톡 개선안 재평가 결과', desc: '' }
        ]
      },
      limitations: [],
      nextSteps: [],
      documents: [
        { label: '전체 기획서 PDF', href: '' },
        { label: '화면설계서 · 스토리보드', href: '', section: 'design' }
      ],
      prototypeUrl: '',
      skills: ['사용성 테스트', '아이트래킹', '사용성 평가 계획', '정보구조 재설계', '사용자 흐름 개선', '개선안 재평가', '화면설계서'],
      relatedCapabilities: ['observe']
    },

    {
      id: 'flo-letter',
      slug: 'flo-letter',
      categories: ['서비스 기획'],
      title: '플로레터',
      titleEn: 'Flo-Letter',
      description: '과천의 꽃으로 마음을 전하는, 과천 공무원 대상 분재 선물 플랫폼 앱 기획',
      targetUser: '과천 공무원',
      period: '', // TODO(확인 필요)
      team: '',   // TODO(확인 필요)
      role: {
        mine: ['템플릿 제작', '서비스 아이디어 도출'],
        shared: [] // TODO(확인 필요)
      },
      scope: ['지역 자원과 선물 상황 조사', '사용자 맥락 분석', '서비스 전략 · 이용 시나리오 작성'],
      summary: {
        problem: '',  // TODO(확인 필요): 핵심 문제 한 문장
        problemType: '',
        decision: '과천 공무원을 대상으로 한 분재 선물 플랫폼으로 서비스 방향을 정했습니다.',
        result: ''    // 사용자 검증 결과가 있으면 입력. 수상은 awards에
      },
      awards: ['제32회 커뮤니케이션 디자인 국제 어워드 기획 부문 회장상', '학과 연합 PT 우수작 선정 · 발표'],
      cover: { src: '', alt: '', ratio: '16:9', purpose: '플로레터 대표 이미지' },
      discovery: {
        question: '',  // TODO(확인 필요)
        purpose: '',
        method: '지역 자원과 선물 상황을 조사하고 사용자 맥락을 분석했습니다.',
        target: '',
        observations: [],   // TODO(확인 필요): 조사에서 실제로 확인한 내용
        interpretation: [],
        hypothesis: [],
        evidence: [
          { src: '', alt: '', ratio: 'original', purpose: '플로레터 지역 자원 · 선물 상황 조사 자료', desc: '' },
          { src: '', alt: '', ratio: 'original', purpose: '과천 공무원 사용자 맥락 분석', desc: '' }
        ],
        problemDefinition: '' // TODO(확인 필요)
      },
      decisions: {
        items: [
          {
            title: '누구를 위한 서비스인가',
            fact: '',     // TODO(확인 필요): 대상 선정 근거가 된 조사 내용
            options: [],  // TODO(확인 필요): 실제로 검토한 다른 대상이 있었다면
            choice: '과천 공무원을 대상으로 정했습니다.',
            reason: ''    // TODO(확인 필요): 왜 과천 공무원인지
          },
          {
            title: '무엇을 제공하는가',
            fact: '',     // TODO(확인 필요): 조사 결과가 서비스 가치 · 기능 선택에 준 영향
            options: [],
            choice: '과천의 꽃으로 마음을 전하는 분재 선물 플랫폼 앱으로 정했습니다.',
            reason: ''
          }
        ],
        images: [
          { src: '', alt: '', ratio: '16:9', purpose: '플로레터 타깃 선정 근거', desc: '' },
          { src: '', alt: '', ratio: '16:9', purpose: '플로레터 서비스 가치와 기능 선택', desc: '' }
        ]
      },
      design: {
        intro: '',
        compare: null,
        changes: [], // TODO(확인 필요): 핵심 기능 · 정책과 그 목적
        images: [
          { src: '', alt: '', ratio: '16:9', purpose: '플로레터 이용 시나리오', desc: '' },
          { src: '', alt: '', ratio: '16:9', purpose: '플로레터 정보구조 · 사용자 흐름', desc: '' },
          { src: '', alt: '', ratio: 'original', purpose: '플로레터 주요 화면', desc: '' }
        ]
      },
      validation: {
        purpose: '',
        method: '',   // TODO(확인 필요): 실제 사용자 검증을 했는지
        results: [],
        changes: [],
        status: '',
        images: []
      },
      limitations: [],
      nextSteps: [],
      documents: [
        { label: '전체 기획서 PDF', href: '' },
        { label: '화면설계서 · 스토리보드', href: '', section: 'design' }
      ],
      prototypeUrl: '',
      skills: ['지역 자원 조사', '사용자 맥락 분석', '서비스 아이디어 도출', '서비스 전략', '이용 시나리오', '화면설계서'],
      relatedCapabilities: ['strategy']
    },

    {
      id: 'uuji',
      slug: 'uuji',
      categories: ['AI 서비스', '서비스 기획'],
      title: '유지',
      titleEn: 'Uuji',
      description: '목표 실천을 이어가기 어려운 자기계발 사용자를 위한 AI 기반 목표 관리 앱 기획',
      targetUser: '목표 실천을 지속하기 어려운 자기계발 사용자',
      period: '', // TODO(확인 필요)
      team: '',   // TODO(확인 필요)
      role: {
        mine: [],   // TODO(확인 필요): 직접 담당한 일 — 임의로 쓰지 않음
        shared: []
      },
      scope: ['AI가 참고할 정보와 조정 기준 기획', '추천 → 실행 → 피드백 → 조정 흐름 설계', '중단 후 회복 흐름 설계'],
      summary: {
        problem: '일정 · 컨디션과 맞지 않는 계획의 분량과 속도가 실천 중단에 영향을 줄 수 있다고 보았습니다.',
        problemType: 'hypothesis', // TODO(확인 필요): 조사로 확인했다면 '' 로 바꾸고 discovery.observations에 근거 입력
        decision: 'AI가 목표 · 일정 밀도 · 컨디션 · 수행 기록 · 난이도 피드백을 참고해 다음 실천 분량과 페이스를 조정하도록 기획했습니다.',
        result: ''
      },
      awards: ['제32회 커뮤니케이션 디자인 국제 어워드 디자인 부문 입선'],
      cover: { src: '', alt: '', ratio: '16:9', purpose: '유지 대표 이미지' },
      discovery: {
        question: '',
        purpose: '',
        method: '',   // TODO(확인 필요): 조사 · 관찰을 했다면
        target: '',
        observations: [],
        interpretation: [],
        hypothesis: ['실천이 끊기는 이유는 의지 부족만이 아니라, 일정 · 컨디션과 맞지 않는 계획의 분량과 속도일 수 있습니다.'],
        evidence: [
          { src: '', alt: '', ratio: '16:9', purpose: '유지 목표 실천 중단 상황 분석', desc: '' }
        ],
        problemDefinition: '' // TODO(확인 필요)
      },
      decisions: {
        items: [
          {
            title: 'AI에게 맡길 판단',
            fact: '',     // TODO(확인 필요): 가설을 뒷받침한 자료
            options: [],
            choice: '사용자 맥락을 바탕으로 다음 실천 분량과 페이스를 AI가 조정하도록 했습니다.',
            reason: ''    // TODO(확인 필요): 다른 방식(예: 사용자가 직접 조정) 대신 AI 조정을 고른 이유
          }
        ],
        images: []
      },
      design: {
        intro: '',
        // 서비스 안의 AI 기획: 사용자 상황 → 입력 정보 → 조정 기준 → 제안하는 행동 → 사용자 피드백
        ai: {
          situation: '목표를 세웠지만 실천을 이어가기 어려운 상황',
          inputs: ['목표', '일정 밀도', '컨디션', '수행 기록', '난이도 피드백'],
          // 자기소개서에 적은 기준. TODO(확인 필요): 늘리는 조건 등 다른 기준이 있으면 추가
          criteria: ['일정이 빡빡하거나 컨디션이 낮을 때는 실행 단위를 줄입니다.', '실천 결과를 다음 계획에 반영합니다.'],
          action: '다음 실천 분량과 페이스 조정',
          feedback: '실행 후 난이도 피드백을 받아 다음 조정에 반영 (추천 → 실행 → 피드백 → 조정)',
          userControl: '' // TODO(확인 필요): 사용자가 AI 제안을 확인하거나 수정하는 지점
        },
        compare: null,
        changes: [
          { title: '중단 후 회복', before: '', change: '실천을 멈춘 뒤에도 다시 시작할 수 있는 회복 흐름을 설계했습니다.', why: '' }
        ],
        images: [
          { src: '', alt: '', ratio: '16:9', purpose: '유지 AI 조정 기준과 사용자 시나리오', desc: '' },
          { src: '', alt: '', ratio: '16:9', purpose: '유지 추천 · 실행 · 피드백 순환 구조', desc: '' },
          { src: '', alt: '', ratio: '16:9', purpose: '유지 중단 후 회복 흐름', desc: '' },
          { src: '', alt: '', ratio: 'original', purpose: '유지 주요 화면', desc: '' }
        ]
      },
      validation: {
        purpose: '',
        method: '',
        results: [],
        changes: [],
        status: '',
        images: [
          { src: '', alt: '', ratio: '16:9', purpose: '유지 프로토타입 · 검증 자료', desc: '' }
        ]
      },
      // TODO(확인 필요): 실제 진행 범위에 맞게 고칠 것
      limitations: ['서비스 안의 AI 역할은 기획 단계에서 설계한 것으로, 실제 AI 모델 배포나 성능 검증은 하지 않았습니다.'],
      nextSteps: [],
      documents: [
        { label: '전체 기획서 PDF', href: '' },
        { label: '화면설계서 · 스토리보드', href: '', section: 'design' }
      ],
      prototypeUrl: '',
      skills: ['AI 서비스 기획', 'AI 조정 기준 설계', '추천 · 피드백 순환 설계', '중단 후 회복 흐름', '사용자 시나리오', '화면설계서'],
      relatedCapabilities: ['ai']
    }
  ]
};
