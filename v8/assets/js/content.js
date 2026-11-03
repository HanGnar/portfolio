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
// 설계 탭 기본 자리(그림 파일을 넣으면 src를 채움)
function DESIGN() {
  return [
    { src: '', ratio: '16:9', purpose: '정보구조도' },
    { src: '', ratio: '16:9', purpose: '유저 플로우' }
  ];
}
window.PORTFOLIO = {
  site: {
    name: '한정민',
    brand: '헝그리한정민',
    role: 'UI/UX Service Planner',
    email: 'jungmin2209@naver.com',
    updated: '2026.11',
    draft: true // 내용 채우는 중: 빈 칸을 '내용 준비 중'으로 보임. 공개 전 false
  },

  hero: {
    role: 'UI/UX 서비스 기획자',
    title: ['더 나은 결과를 찾는', '배부르지 않은 기획자,', '헝그리한정민.'],
    sub: ['사용자의 문제를 묻고, 근거로 설계하고,', 'AI와 함께 직접 만들어 확인합니다.']
  },

  /* 문서 다운로드: href가 비어 있으면 "준비 중" */
  documents: {
    // 이력서는 웹 공개용으로 따로: 휴대전화 · 생년월일 · 주소 · 병역 · 면허를 뺀 PDF
    resume: { label: '이력서', href: '' },        // TODO(확인 필요): assets/docs/resume-public.pdf
    portfolio: { label: '포트폴리오', href: '' }, // TODO(확인 필요): 넣을지 정하기. assets/docs/portfolio.pdf
    coverLetter: { label: '자기소개서', href: '' } // 연락처에는 안 보임(내용이 소개 칸과 같음)
  },

  /* 연락처(페이지 맨 아래, 푸터처럼): 마무리 한 줄 → 이메일 · 이력서 · 포트폴리오 PDF
   *   closing: 비면 숨김 */
  contact: {
    closing: '더 나은 결과를 찾는\n배부르지 않은 기획자', // \n 자리에서 줄바꿈
    phone: '' // 연락처(휴대전화). 공개해도 되는지 본인 확인 후에만 채움. 비면 초안에선 '준비 중', 공개 땐 숨김
  },

  /* 핵심 역량: target.project + target.section 으로 상세의 근거 구역을 연다 */
  capabilities: [
    {
      id: 'observe',
      title: '사용자 관찰과 문제 정의',
      desc: '개인적인 불편을 사용자 과제와 관찰로 확인합니다.',
      linkLabel: '코레일톡 · 문제',
      target: { project: 'korail', section: 'problem' }
    },
    {
      id: 'screen-doc',
      title: '화면설계서',
      desc: '화면마다 구성과 인터랙션을 정리해, 디자인 · 개발과 같은 기준으로 맞춥니다.',
      linkLabel: '플로레터 · 핵심',
      target: { project: 'flo-letter', section: 'core' }
    },
    {
      // AI 역량은 두 종류로 나눈다: 서비스 안의 AI를 기획한 일 / AI 도구로 직접 만든 일
      id: 'ai',
      title: 'AI 기획과 프로토타이핑',
      parts: [
        { label: '서비스 안의 AI 기획', desc: 'AI가 참고할 정보, 맡길 판단, 사용자에게 제안할 행동을 정합니다.', linkLabel: '유지 · 핵심', target: { project: 'uuji', section: 'core' } },
        { label: 'AI 도구로 직접 구현', desc: 'AI 코딩 도구로 웹 · 프로토타입을 만들고, 생성 결과를 기획 의도에 맞게 검토 · 수정합니다.', linkLabel: 'PARALLAX · 핵심', target: { project: 'parallax', section: 'core' } } // TODO(확인 필요): AI 도구로 만든 프로토타입 근거
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


  /* 홈 프로젝트 분류 버튼: 누르면 tags에 그 id가 있는 프로젝트만 보임('all'은 전부, 첫 버튼이 처음에 눌린 상태)
   *   한 프로젝트가 여러 분류에 들어가도 됨 */
  filters: [
    { id: 'all', label: '전체' }, // 전체: 모든 프로젝트
    { id: 'featured', label: '대표' },
    { id: 'collab', label: '협업' }, // 디자인 전공 친구들과 함께 한 프로젝트
    { id: 'plan', label: '기획' }
  ],

  /*
   * 대표 프로젝트 — 상세는 면접관이 물을 순서대로 (다섯 프로젝트 모두 같은 구조)
   *   머리    oneLine · type(프로젝트 유형: 교내 프로젝트 · 공모전 · 산학협력 …) · period · teamSize(참여 인원) · awards · mine(담당 업무) · covers[](대표 이미지, 여러 장이면 넘겨 보기)
   *   문제    problem(문제 정의 한 문장) · target(타깃 사용자) · insights[{ method(조사 방법), text, image }](최대 3)
   *   해결    direction(기획 방향 한 문장) · features[{ name, desc, insight(근거 인사이트 번호 1–3), image, before }](최대 3, before가 있으면 기존 → 개선)
   *           decision{ options[](검토안), final(최종안), reason(선택 이유) }
   *   설계    design[](탭: 정보구조도 · 유저 플로우 — 완성 화면은 핵심 기능에) · prototypeUrl
   *   검증    validation{ method(테스트 방법), result, stats[{ label, before, after }](숫자가 있을 때만) }
   *   회고    retro{ regret(아쉬운 점), learned(배운 점) }
   *   산출물  outputs[{ label, href }] — 모든 프로젝트 기획서 · 화면설계서
   * 값이 비어 있으면: site.draft 가 true면 "준비 중" 자리, false면 숨김(구역째 비면 구역도 숨김). 확인되지 않은 내용은 채우지 않는다.
   */
  projects: [
    {
      tags: ['featured', 'collab'], // 대표 · 협업 · 기획
      id: 'parallax', slug: 'parallax', title: 'PARALLAX', titleEn: '',
      oneLine: '',
      type: '', period: '', teamSize: '', mine: [], awards: [],
      covers: [ // 대표 이미지: 여러 장이면 넘겨 보기. 이미지 수만큼 두고 src를 채움
        { src: '', ratio: '16:9', purpose: 'PARALLAX 대표 이미지 1' },
        { src: '', ratio: '16:9', purpose: 'PARALLAX 대표 이미지 2' },
        { src: '', ratio: '16:9', purpose: 'PARALLAX 대표 이미지 3' }
      ],
      problem: '', target: '', insights: [],
      direction: '', features: [], decision: { options: [], final: '', reason: '' },
      design: DESIGN(), prototypeUrl: '',
      validation: { method: '', result: '', stats: [] },
      retro: { regret: '', learned: '' },
      outputs: [{ label: '기획서', href: '' }, { label: '화면설계서', href: '' }]
    },
    {
      tags: ['collab'], // 대표 · 협업 · 기획
      id: 'uuji', slug: 'uuji', title: '유지', titleEn: 'Uuji',
      oneLine: '목표 실천을 이어가기 어려운 자기계발 사용자를 위한 AI 기반 목표 관리 앱 기획',
      type: '', period: '', teamSize: '', mine: [], awards: ['제32회 커뮤니케이션 디자인 국제 어워드 디자인 부문 입선'],
      covers: [ // 대표 이미지: 여러 장이면 넘겨 보기. 이미지 수만큼 두고 src를 채움
        { src: '', ratio: '16:9', purpose: '유지 대표 이미지 1' },
        { src: '', ratio: '16:9', purpose: '유지 대표 이미지 2' },
        { src: '', ratio: '16:9', purpose: '유지 대표 이미지 3' }
      ],
      problem: '', target: '', insights: [],
      direction: '', features: [], decision: { options: [], final: '', reason: '' },
      design: DESIGN(), prototypeUrl: '',
      validation: { method: '', result: '', stats: [] },
      retro: { regret: '', learned: '' },
      outputs: [{ label: '기획서', href: '' }, { label: '화면설계서', href: '' }]
    },
    {
      tags: ['featured', 'plan'], // 대표 · 협업 · 기획
      id: 'lotte', slug: 'lotte-cinema', title: '롯데시네마', titleEn: '',
      oneLine: '',
      type: '', period: '', teamSize: '', mine: [], awards: [],
      covers: [ // 대표 이미지: 여러 장이면 넘겨 보기. 이미지 수만큼 두고 src를 채움
        { src: '', ratio: '16:9', purpose: '롯데시네마 대표 이미지 1' },
        { src: '', ratio: '16:9', purpose: '롯데시네마 대표 이미지 2' },
        { src: '', ratio: '16:9', purpose: '롯데시네마 대표 이미지 3' }
      ],
      problem: '', target: '', insights: [],
      direction: '', features: [], decision: { options: [], final: '', reason: '' },
      design: DESIGN(), prototypeUrl: '',
      validation: { method: '', result: '', stats: [] },
      retro: { regret: '', learned: '' },
      outputs: [{ label: '기획서', href: '' }, { label: '화면설계서', href: '' }]
    },
    {
      tags: ['plan'], // 대표 · 협업 · 기획
      id: 'korail', slug: 'korail', title: '코레일톡 UX 개선', titleEn: '',
      oneLine: '코레일톡 앱에서 예약한 승차권을 조회하는 과정의 탐색 혼란을 개선한 UX 프로젝트',
      type: '', period: '', teamSize: '', mine: ['템플릿 제작', '사용성 평가 계획 작성'], awards: [],
      covers: [ // 대표 이미지: 여러 장이면 넘겨 보기. 이미지 수만큼 두고 src를 채움
        { src: '', ratio: '16:9', purpose: '코레일톡 UX 개선 대표 이미지 1' },
        { src: '', ratio: '16:9', purpose: '코레일톡 UX 개선 대표 이미지 2' },
        { src: '', ratio: '16:9', purpose: '코레일톡 UX 개선 대표 이미지 3' }
      ],
      problem: '', target: '', insights: [],
      direction: '', features: [], decision: { options: [], final: '', reason: '' },
      design: DESIGN(), prototypeUrl: '',
      validation: { method: '', result: '', stats: [] },
      retro: { regret: '', learned: '' },
      outputs: [{ label: '기획서', href: '' }, { label: '화면설계서', href: '' }]
    },
    {
      tags: ['plan'], // 대표 · 협업 · 기획
      id: 'flo-letter', slug: 'flo-letter', title: '플로레터', titleEn: 'Flo-Letter',
      oneLine: '과천의 꽃으로 마음을 전하는, 과천 공무원 대상 분재 선물 플랫폼 앱 기획',
      type: '', period: '', teamSize: '', mine: ['템플릿 제작', '서비스 아이디어 도출'], awards: ['제32회 커뮤니케이션 디자인 국제 어워드 기획 부문 회장상', '학과 연합 PT 우수작 선정 · 발표'],
      covers: [ // 대표 이미지: 여러 장이면 넘겨 보기. 이미지 수만큼 두고 src를 채움
        { src: '', ratio: '16:9', purpose: '플로레터 대표 이미지 1' },
        { src: '', ratio: '16:9', purpose: '플로레터 대표 이미지 2' },
        { src: '', ratio: '16:9', purpose: '플로레터 대표 이미지 3' }
      ],
      problem: '', target: '', insights: [],
      direction: '', features: [], decision: { options: [], final: '', reason: '' },
      design: DESIGN(), prototypeUrl: '',
      validation: { method: '', result: '', stats: [] },
      retro: { regret: '', learned: '' },
      outputs: [{ label: '기획서', href: '' }, { label: '화면설계서', href: '' }]
    }
  ]
};
