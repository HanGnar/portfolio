/* 헝그리한정민 포트폴리오 v7 — 화면 그리기와 동작 (데이터는 content.js) */
(function () {
  'use strict';
  var D = window.PORTFOLIO;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ── 주소 규칙 ───────────────────────────────────────
   * path 모드: /projects/korail/ (웹 서버로 열 때. projects/<slug>/index.html이 같은 앱을 띄움)
   * hash 모드: #/projects/korail (파일로 바로 열거나 한 파일 미리보기일 때)
   */
  var ROOT = new URL('.', document.baseURI).href;
  var PATH_MODE = /^https?:$/.test(location.protocol) && document.documentElement.dataset.routes === 'path';
  function projectUrl(slug) { return PATH_MODE ? ROOT + 'projects/' + slug + '/' : '#/projects/' + slug; }
  function homeUrl() { return PATH_MODE ? ROOT : location.pathname + location.search; }
  function slugFromLocation() {
    var m = PATH_MODE ? location.href.replace(ROOT, '').match(/^projects\/([\w-]+)\/?/) : location.hash.match(/^#\/projects\/([\w-]+)/);
    return m ? m[1] : null;
  }
  function asset(p) { return p ? new URL(p, ROOT).href : ''; }

  /* ── 작은 도우미 ─────────────────────────────────── */
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function has(v) { return Array.isArray(v) ? v.filter(Boolean).length > 0 : !!(v && String(v).trim()); }
  function list(arr, cls) { return '<ul' + (cls ? ' class="' + cls + '"' : '') + '>' + arr.filter(Boolean).map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>'; }
  function byId(id) { return D.projects.filter(function (p) { return p.id === id || p.slug === id; })[0]; }

  var toastTimer;
  function toast(msg) {
    var t = $('#toast');
    t.textContent = msg;
    t.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('is-on'); }, 2400);
  }

  /* ── 이미지 컴포넌트: src가 있으면 실제 이미지(확대 가능), 없으면 용도가 적힌 플레이스홀더 ── */
  function media(img, opts) {
    opts = opts || {};
    if (!img) return '';
    var ratio = img.ratio || '16:9';
    var original = ratio === 'original';
    var style = original ? '' : ' style="--ratio:' + ratio.replace(':', ' / ') + '"';
    var ratioText = original ? '원본 비율 유지' : '권장 비율 ' + ratio;
    var inner;
    if (has(img.src)) {
      var alt = img.alt || img.purpose || '';
      inner = '<button type="button" class="media-zoom" data-zoom="' + esc(asset(img.src)) + '" data-caption="' + esc(img.caption || alt) + '" aria-label="확대해서 보기: ' + esc(alt) + '">' +
        '<img src="' + esc(asset(img.src)) + '" alt="' + esc(alt) + '" loading="lazy" decoding="async"></button>';
    } else {
      inner = '<div class="ph" role="img" aria-label="이미지 준비 중: ' + esc(img.purpose) + '"><span class="ph-purpose">' + esc(img.purpose) + '</span><span class="ph-ratio">' + ratioText + '</span></div>';
    }
    var cap = opts.caption !== false && has(img.caption) ? '<figcaption>' + esc(img.caption) + '</figcaption>' : '';
    return '<figure class="media' + (opts.cls ? ' ' + opts.cls : '') + '"><div class="media-box' + (original ? ' is-original' : '') + '"' + style + '>' + inner + '</div>' + cap + '</figure>';
  }

  /* ── 문서 버튼: href가 없으면 "준비 중" ───────────── */
  function docButton(doc, opts) {
    opts = opts || {};
    var label = opts.label || doc.label;
    var cls = 'btn' + (opts.cls ? ' ' + opts.cls : '');
    if (has(doc.href)) {
      return '<a class="' + cls + '" href="' + esc(asset(doc.href)) + '" target="_blank" rel="noopener">' + esc(label) + '<span aria-hidden="true">↗</span></a>';
    }
    return '<span class="' + cls + ' is-pending" role="link" aria-disabled="true" tabindex="0" data-pending="' + esc(doc.label) + '">' + esc(label) + ' <span class="tag">준비 중</span></span>';
  }

  /* ── 메인 페이지 그리기 ─────────────────────────── */
  /* ── 분류 태그 · 분류 버튼 ─────────────────────── */
  var TAG_TONE = { 'UX 개선': 'blue', '서비스 기획': 'pink', 'AI 서비스': 'purple', '프로토타입': 'orange' };
  function tags(cats) {
    if (!has(cats)) return '';
    return '<ul class="tags" aria-label="분류">' + cats.map(function (c) {
      return '<li class="tag-chip" data-tone="' + (TAG_TONE[c] || 'gray') + '">' + esc(c) + '</li>';
    }).join('') + '</ul>';
  }
  var ICONS = {
    grid: '<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="1.5" y="2" width="5.5" height="5" rx="1"/><rect x="9" y="2" width="5.5" height="5" rx="1"/><rect x="1.5" y="9" width="5.5" height="5" rx="1"/><rect x="9" y="9" width="5.5" height="5" rx="1"/></svg>',
    star: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.6l1.95 4.1 4.45.55-3.3 3.05.85 4.4L8 11.5l-3.95 2.2.85-4.4-3.3-3.05 4.45-.55z"/></svg>',
    doc: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 1.5h5.6l3.4 3.4v9.6h-9z"/></svg>',
    book: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M1.5 3c2.2-.6 4.3-.4 6 .8v10c-1.7-1.1-3.8-1.3-6-.7z"/><path d="M14.5 3c-2.2-.6-4.3-.4-6 .8v10c1.7-1.1 3.8-1.3 6-.7z"/></svg>',
    cursor: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 1.8l9.6 6.1-4.2.9 2.3 4.6-1.7.8-2.3-4.6L3.6 12.6z"/></svg>',
    spark: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.2c.5 3.3 1.5 4.3 4.8 4.8-3.3.5-4.3 1.5-4.8 4.8-.5-3.3-1.5-4.3-4.8-4.8C6.5 5.5 7.5 4.5 8 1.2z"/><path d="M12.6 9.6c.3 1.7.8 2.2 2.4 2.4-1.6.3-2.1.8-2.4 2.4-.3-1.6-.8-2.1-2.4-2.4 1.6-.2 2.1-.7 2.4-2.4z"/></svg>',
    proto: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4.5 1.5h7a1.5 1.5 0 0 1 1.5 1.5v10a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 13V3a1.5 1.5 0 0 1 1.5-1.5zm.5 2v8.5h6V3.5z"/></svg>',
    proposal: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5.5 1.5h6.2l2.8 2.8v8.2h-9z"/><path d="M1.5 5h3v9.5h7v-1H2.5z"/></svg>'
  };
  function applyFilter(id, silent) {
    var match = function (el) { return id === 'all' || el.dataset.cats.split('|').indexOf(id) > -1; };
    // 프로젝트는 태그가 여러 개여도 한 번만 센다. 자료(산출물)는 따로 센다.
    var projects = 0, docs = 0;
    [['#group-featured', '#count-featured'], ['#group-more', '#count-more']].forEach(function (g) {
      var box = $(g[0]), n = 0, d = 0;
      $$(g[0] + ' [data-cats]').forEach(function (el) {
        var on = match(el); el.hidden = !on;
        if (on) { n++; d += Number(el.dataset.docs || 0); }
      });
      if ($$(g[0] + ' [data-cats]').length) box.hidden = n === 0;
      var c = $(g[1]); if (c) c.textContent = n + '개' + (d ? ' · 자료 ' + d + '개' : '');
      projects += n; docs += d;
    });
    var other = $('#group-other');
    if (other) { other.hidden = id !== 'all' || !(D.otherWorks || []).length; if (!other.hidden) docs += (D.otherWorks || []).length; }
    $$('#filters .filter').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.filter === id)); });
    $('#filter-empty').hidden = projects > 0;
    $('#filter-count').textContent = '프로젝트 ' + projects + '개' + (docs ? ' · 자료 ' + docs + '개' : '');
    if (silent) return;
    state.filter = id;
    // 아래까지 내려와서 분류를 바꾸면 목록 처음(분류 버튼 바로 아래)으로 올림
    var head = $('#projects .section-head');
    var y = head.getBoundingClientRect().bottom + window.scrollY - $('.site-header').offsetHeight;
    if (window.scrollY > y) window.scrollTo({ top: y, behavior: 'instant' });
  }

  /* ── 홈 카드 대표 이미지 넘겨 보기 ─────────────── */
  function slidesOf(p) {
    if (has(p.slides)) return p.slides.filter(Boolean);
    var d = p.design || {}, c = d.compare || {};
    var all = [p.cover, c.before, c.after].concat((p.decisions || {}).images || [], d.images || []).filter(Boolean);
    var seen = {};
    return all.filter(function (m) { var k = m.src || m.purpose; if (seen[k]) return false; seen[k] = 1; return true; }).slice(0, 6);
  }
  function slider(p) {
    var list = slidesOf(p);
    // 비율이 다른 이미지도 같은 16:9 틀 안에 맞춰 보여 줌(원본은 잘리지 않고 안에 들어감)
    var slides = list.map(function (m, i) {
      return '<div class="slide" role="group" aria-roledescription="슬라이드" aria-label="' + (i + 1) + ' / ' + list.length + '">' +
        media(Object.assign({}, m, { ratio: '16:9' }), { caption: false }) + '</div>';
    }).join('');
    if (list.length < 2) return '<div class="slider is-single">' + slides + '</div>';
    return '<div class="slider" role="region" aria-roledescription="이미지 넘겨 보기" aria-label="' + esc(p.title) + ' 대표 이미지">' +
      '<div class="slider-track" tabindex="0" aria-label="좌우로 넘겨 보기">' + slides + '</div>' +
      '<button type="button" class="slider-btn slider-prev" data-slide="-1" aria-label="이전 이미지" disabled><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3 5 8l5 5"/></svg></button>' +
      '<button type="button" class="slider-btn slider-next" data-slide="1" aria-label="다음 이미지"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3 5 5-5 5"/></svg></button>' +
      '<p class="slider-count" aria-live="polite"><b>1</b> / ' + list.length + '</p></div>';
  }
  function sliderState(track) {
    var box = track.closest('.slider'), n = track.children.length;
    var i = Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
    var max = track.scrollWidth - track.clientWidth;
    box.querySelector('.slider-prev').disabled = track.scrollLeft <= 2;
    box.querySelector('.slider-next').disabled = track.scrollLeft >= max - 2;
    box.querySelector('.slider-count b').textContent = Math.min(n, i + 1);
  }

  /* ── 역량 키워드: 접혀 있다가 눌러서 펼침 ─────── */
  function skillFold(list, title) {
    list = (list || []).filter(has);
    if (!list.length) return '';
    return '<details class="skills"><summary>사용한 역량 키워드 <span class="skills-n">' + list.length + '</span>' +
      '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4"/></svg></summary>' +
      '<ul class="skills-list" aria-label="' + esc(title) + ' 역량 키워드">' + list.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></details>';
  }
  // 자기소개 문단: **두 별표**로 감싼 말을 굵게(역량 키워드)
  function strongText(t) { return esc(t).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'); }

  function hypTag(sm) { return sm && sm.problemType === 'hypothesis' ? ' <span class="hyp">가설</span>' : ''; }

  function renderHome() {
    var h = D.hero;
    $('#hero-title').innerHTML = h.title.map(function (t, i) {
      var last = i === h.title.length - 1;
      return '<span class="line" data-i="' + i + '">' + (last ? '<span class="brand">' + esc(t) + '</span>' : esc(t)) + '</span>';
    }).join('');
    $('#hero-sub').innerHTML = h.sub.map(esc).join('<br>');
    $('#hero-role').textContent = h.role || '';
    $$('[data-doc="resume"]').forEach(function (el) {
      el.outerHTML = docButton(D.documents.resume, { label: el.dataset.label || '이력서 다운로드', cls: el.dataset.cls || '' });
    });

    $('#project-list').innerHTML = D.projects.map(function (p, i) {
      // 세 프로젝트 모두 같은 항목: 핵심 문제 · 내 역할 · 주요 결정 · 확인된 결과(없으면 외부 성과). 빈 항목은 숨김
      var facts = '', sm = p.summary || {}, role = (p.role || {}).mine || [];
      function f(k, v, cls) { if (has(v)) facts += '<div' + (cls ? ' class="' + cls + '"' : '') + '><dt>' + k + '</dt><dd>' + v + '</dd></div>'; }
      f('핵심 문제', has(sm.problem) ? esc(sm.problem) + hypTag(sm) : '', 'problem');
      f('내 역할', has(role) ? esc(role.join(' · ')) : '');
      f('주요 결정', esc(sm.decision));
      if (has(sm.result)) f('확인된 결과', esc(sm.result));
      else f('외부 성과', esc((p.awards || []).join(' · ')));
      return '<article class="card" id="card-' + p.id + '" data-cats="' + esc((p.categories || []).join('|')) + '" data-docs="0">' +
        slider(p) +
        '<div class="card-body"><p class="card-index">프로젝트 ' + String(i + 1).padStart(2, '0') + '</p>' + tags(p.categories) +
        '<h3>' + esc(p.title) + (p.titleEn ? '<span class="en">' + esc(p.titleEn) + '</span>' : '') + '</h3>' +
        '<p class="desc">' + esc(p.description) + '</p>' +
        (facts ? '<dl class="facts">' + facts + '</dl>' : '') + skillFold(p.skills, p.title) +
        '<a class="card-link link-arrow" href="' + projectUrl(p.slug) + '" data-open="' + p.id + '">' + esc(p.title) + ' 상세 보기</a>' +
        '</div></article>';
    }).join('');

    // 추가 프로젝트: 프로젝트 하나에 산출물을 묶어서. 열리지 않는 버튼은 만들지 않음
    var more = D.moreProjects || [];
    $('#more-list').innerHTML = more.map(function (m) {
      var outs = (m.outputs || []).filter(function (o) { return has(o.label); });
      var title = (m.icon ? '<span class="tile-icon" aria-hidden="true">' + esc(m.icon) + '</span>' : '') + '<span>' + esc(m.title) + '</span>';
      // 산출물 목록은 카드에 보이지 않음(사용자 지시). outputs는 자료 수 · '자료 정리 중' 표시에만 씀
      var ready = has(m.url) || outs.some(function (o) { return has(o.href); });
      return '<article class="tile" data-cats="' + esc((m.categories || []).join('|')) + '" data-docs="' + outs.length + '">' +
        media(m.cover, { caption: false }) +
        '<div class="tile-body"><h4 class="tile-title">' + title + '</h4>' + tags(m.categories) +
        (has(m.summary) ? '<p class="tile-sum">' + esc(m.summary) + '</p>' : '') + skillFold(m.skills, m.title) +
        (ready ? '' : '<p class="tile-state">자료 정리 중</p>') + '</div>' +
        (has(m.url) ? '<a class="tile-hit" href="' + esc(m.url) + '" target="_blank" rel="noopener" aria-label="' + esc(m.title) + ' 보기 (새 탭)"></a>' : '') +
        '</article>';
    }).join('');
    if (!more.length) $('#group-more').hidden = true;
    var others = D.otherWorks || [];
    $('#other-list').innerHTML = others.map(function (o) {
      return '<li><span class="name">' + esc(o.label) + '</span>' + (has(o.href) ? '<a class="link-arrow" href="' + esc(asset(o.href)) + '" target="_blank" rel="noopener">열기</a>' : '<span class="state">준비 중</span>') + '</li>';
    }).join('');

    // 분류 버튼
    var filters = D.filters || [];
    if (filters.length) {
      $('#filters').innerHTML = filters.map(function (f, i) {
        return '<button type="button" class="filter" data-filter="' + esc(f.id) + '" aria-pressed="' + (i === 0) + '">' + (ICONS[f.icon] || '') + '<span>' + esc(f.label) + '</span></button>';
      }).join('');
      applyFilter(filters[0].id, true);
    } else $('.filter-bar').hidden = true;

    function capLink(t, label) {
      t = t || {};
      var href = t.project ? projectUrl(byId(t.project).slug) : '#' + t.anchor;
      var data = t.project ? ' data-open="' + t.project + '" data-section="' + (t.section || '') + '"' : '';
      return '<a class="link-arrow" href="' + href + '"' + data + '>' + esc(label) + '</a>';
    }
    $('#cap-list').innerHTML = D.capabilities.map(function (c, i) {
      var body = has(c.parts)
        // AI 역량은 두 갈래: 서비스 안의 AI 기획 / AI 도구로 직접 구현
        ? '<div class="cap-parts">' + c.parts.map(function (pt) {
            return '<div class="cap-part"><h4>' + esc(pt.label) + '</h4><p>' + esc(pt.desc) + '</p>' + capLink(pt.target, pt.linkLabel) + '</div>';
          }).join('') + '</div>'
        : '<p>' + esc(c.desc) + '</p>' + capLink(c.target, c.linkLabel);
      return '<article class="cap"><p class="n">' + String(i + 1).padStart(2, '0') + '</p><h3>' + esc(c.title) + '</h3>' + body + '</article>';
    }).join('');

    var a = D.about;
    // 자기소개: 묶음마다 제목 한 줄(본문 크기 굵게) + 문단. 글자 크기는 모두 본문과 같음. 사진은 이력 섹션에
    $('#resume-photo').innerHTML = media(a.photo, { caption: false });
    $('#about-text').innerHTML = (a.intro || []).map(function (b, i) {
      return '<div class="intro-block"><h3><span>' + String(i + 1).padStart(2, '0') + ' ' + esc(b.label) + '</span>' + esc(b.title) + '</h3>' +
        (b.paras || []).filter(has).map(function (t) { return '<p>' + strongText(t) + '</p>'; }).join('') + '</div>';
    }).join('');

    function rec(id, title, items, fn, cls) {
      var box = $('#' + id);
      if (!has(items)) { box.hidden = true; return; }
      box.className = 'record' + (cls ? ' ' + cls : '');
      box.innerHTML = '<h3>' + title + '</h3><ul>' + items.map(fn).join('') + '</ul>';
    }
    // 날짜 | 이름 · 직책 | 한 줄 설명(프로젝트가 있으면 상세 링크)
    function row(it) {
      var note = has(it.note) ? (it.project ? '<a href="' + projectUrl(byId(it.project).slug) + '" data-open="' + it.project + '">' + esc(it.note) + '</a>' : esc(it.note)) : '';
      return '<li><span class="when">' + esc(it.when || '') + '</span><span class="body"><span class="what">' + esc(it.what) + '</span>' +
        (note ? '<span class="note">' + note + '</span>' : '') + '</span></li>';
    }
    rec('rec-edu', '학력', a.education, row);
    rec('rec-awards', '수상', a.awards, row);
    rec('rec-pt', '발표 · 선정', a.presentations, row);
    rec('activities', '교내활동', a.activities, row);
    rec('rec-career', '경력', a.career, row);
    rec('rec-methods', '기획 방법', a.methods, function (it) {
      return '<li><span class="when">' + esc(it.stage) + '</span><span class="body"><span class="what">' + esc(it.items.join(' · ')) + '</span></span></li>';
    }, 'methods');
    rec('rec-tools', '툴과 활용 업무', a.tools, function (it) {
      // 로고는 이름 옆 장식이라 대체 텍스트를 비움(이름 글자가 바로 옆에 있음)
      // 로고가 없는 툴도 같은 자리를 비워 둬서 이름이 한 줄에 맞게 시작
      var logos = '<span class="logos" aria-hidden="true">' + (it.logos || []).map(function (l) {
        return '<img src="' + esc(asset(l.src)) + '" alt=""' + (l.invert ? ' class="invert"' : '') + ' width="22" height="22" loading="lazy" decoding="async">';
      }).join('') + '</span>';
      return '<li><span class="what">' + logos + '<span>' + esc(it.name) + '</span></span><span class="note">' + esc(it.use) + '</span></li>';
    }, 'tools');
    var r = D.documents.resume;
    $('#records-note').innerHTML = has(r.href) ? '자세한 이력은 <a class="link-arrow" href="' + esc(asset(r.href)) + '" target="_blank" rel="noopener">이력서 PDF</a>에서 확인할 수 있습니다.' : '자세한 이력은 이력서 PDF로 정리하고 있습니다(준비 중).';

    var mail = D.site.email;
    $('#mail').textContent = mail;
    $('#mail').href = 'mailto:' + mail;
    $('#mail-write').href = 'mailto:' + mail;
    $('#docs').innerHTML = docButton(D.documents.resume, { label: '이력서 PDF' }) + docButton(D.documents.coverLetter, { label: '자기소개서 PDF' });
    $('#footer-updated').textContent = '마지막 수정 ' + D.site.updated;
  }

  /* ── 상세 그리기 ─────────────────────────────────── */
  var SECTIONS = [
    { id: 'overview', n: '01', name: '개요', title: '이 프로젝트에서 한 일', en: 'Overview' },
    { id: 'discovery', n: '02', name: '발견', title: '무엇을 근거로 문제를 정의했나', en: 'Discovery' },
    { id: 'decisions', n: '03', name: '판단', title: '왜 이 방향을 선택했나', en: 'Decisions' },
    { id: 'design', n: '04', name: '설계', title: '무엇을 어떻게 바꿨나', en: 'Design' },
    { id: 'validation', n: '05', name: '검증', title: '무엇을 확인했고 무엇이 남았나', en: 'Validation' },
    { id: 'outputs', n: '06', name: '산출물', title: '설명을 뒷받침하는 자료', en: 'Outputs' }
  ];

  function rows(pairs) {
    var out = pairs.filter(function (r) { return has(r[1]); }).map(function (r) {
      var v = Array.isArray(r[1]) ? list(r[1], 'dots') : '<p>' + esc(r[1]) + '</p>';
      return '<div class="row"><h3>' + r[0] + '</h3><div>' + v + '</div></div>';
    }).join('');
    return out ? '<div class="rows">' + out + '</div>' : '';
  }
  /* 핵심 장표: 애플 제품 페이지식 옆으로 넘기는 갤러리, 이미지 아래에 "굵은 제목. 설명" */
  function capText(m) {
    var head = m.caption || m.purpose || '';
    if (!has(head) && !has(m.desc)) return '';
    return '<p class="sg-cap">' + (has(head) ? '<b>' + esc(head.replace(/[.。]$/, '')) + '.</b> ' : '') + esc(m.desc || '') + '</p>';
  }
  function gallery(imgs, label) {
    imgs = (imgs || []).filter(Boolean);
    if (!imgs.length) return '';
    var items = imgs.map(function (m) {
      // 비율이 다른 이미지도 같은 높이의 16:9 틀에 맞춤(원본은 잘리지 않고 안에 들어감)
      return '<li class="sg-item">' + media(Object.assign({}, m, { ratio: '16:9' }), { caption: false }) + capText(m) + '</li>';
    }).join('');
    if (imgs.length === 1) return '<ul class="sg sg--single">' + items + '</ul>';
    return '<div class="sg-wrap" role="region" aria-roledescription="옆으로 넘기는 갤러리" aria-label="' + esc(label || '이미지') + '">' +
      '<ul class="sg" tabindex="0">' + items + '</ul>' +
      '<div class="sg-nav"><button type="button" class="sg-btn" data-sg="-1" aria-label="이전 항목, ' + esc(label || '이미지') + '" disabled>' +
      '<svg viewBox="0 0 36 36" aria-hidden="true"><path d="M20.5 12 14.5 18l6 6"/></svg></button>' +
      '<button type="button" class="sg-btn" data-sg="1" aria-label="다음 항목, ' + esc(label || '이미지') + '">' +
      '<svg viewBox="0 0 36 36" aria-hidden="true"><path d="m15.5 12 6 6-6 6"/></svg></button></div></div>';
  }
  function sgState(track) {
    var nav = track.parentNode.querySelector('.sg-nav'); if (!nav) return;
    var max = track.scrollWidth - track.clientWidth, b = nav.querySelectorAll('.sg-btn');
    nav.hidden = max < 4;
    b[0].disabled = track.scrollLeft <= 2; b[1].disabled = track.scrollLeft >= max - 2;
  }
  function sgStep(track, dir) {
    var items = track.querySelectorAll('.sg-item'), x = track.scrollLeft, target = null;
    for (var i = 0; i < items.length; i++) {
      var l = items[i].offsetLeft - track.offsetLeft;
      if (dir > 0 && l > x + 4) { target = l; break; }
      if (dir < 0 && l < x - 4) target = l;
    }
    if (target === null) target = dir > 0 ? track.scrollWidth : 0;
    track.scrollTo({ left: target, behavior: reduce.matches ? 'auto' : 'smooth' });
  }

  /* 구역 끝 관련 자료: 파일 · 주소가 있는 문서만 링크로(준비 중 버튼을 반복해서 두지 않음) */
  function docRefs(p, section) {
    var ds = (p.documents || []).filter(function (d) { return d.section === section && has(d.href); });
    if (!ds.length) return '';
    return '<p class="d-refs">' + ds.map(function (d) { return '<a class="link-arrow" href="' + esc(asset(d.href)) + '" target="_blank" rel="noopener">' + esc(d.label) + '</a>'; }).join('') + '</p>';
  }

  /* 01 개요 — 결론: 무엇을 했고 어떻게 끝났나 */
  function secOverview(p) {
    var s = '<h1 class="d-title" id="detail-title" tabindex="-1">' + esc(p.title) + (p.titleEn ? '<span class="en">' + esc(p.titleEn) + '</span>' : '') + '</h1>';
    s += '<p class="d-desc">' + esc(p.description) + '</p>';
    var r = p.role || {};
    var info = [['기간', p.period], ['팀 구성', p.team], ['대상 사용자', p.targetUser],
      ['내 역할', has(r.mine) ? r.mine.join(' · ') : '', 'key'], ['팀과 함께 한 일', has(r.shared) ? r.shared.join(' · ') : ''], ['프로젝트 전체 작업', p.scope]];
    var dl = info.filter(function (x) { return has(x[1]); }).map(function (x) {
      var v = Array.isArray(x[1]) ? list(x[1], 'dots') : esc(x[1]);
      return '<div' + (x[2] ? ' class="' + x[2] + '"' : '') + '><dt>' + x[0] + '</dt><dd>' + v + '</dd></div>';
    }).join('');
    if (dl) s += '<dl class="summary">' + dl + '</dl>';
    // 핵심 요약: 문제 → 결정 → 결과 (외부 성과는 결과와 따로)
    var sm = p.summary || {}, steps = [['핵심 문제', has(sm.problem) ? esc(sm.problem) + hypTag(sm) : ''], ['주요 결정', esc(sm.decision || '')], ['확인된 결과', esc(sm.result || '')]];
    var chain = steps.filter(function (x) { return has(x[1]); }).map(function (x) { return '<li><span class="k">' + x[0] + '</span><p>' + x[1] + '</p></li>'; }).join('');
    if (has(p.awards)) chain += '<li class="extra"><span class="k">외부 성과</span><p>' + esc(p.awards.join(' · ')) + '</p></li>';
    if (chain) s += '<ol class="chain" aria-label="핵심 요약">' + chain + '</ol>';
    s += '<div class="d-cover">' + media(p.cover) + '</div>';
    var links = '';
    if (has(p.prototypeUrl)) links += '<a class="link-arrow" href="' + esc(p.prototypeUrl) + '" target="_blank" rel="noopener">프로토타입 체험</a>';
    (p.documents || []).forEach(function (d) { if (has(d.href)) links += '<a class="link-arrow" href="' + esc(asset(d.href)) + '" target="_blank" rel="noopener">' + esc(d.label) + '</a>'; });
    s += '<p class="d-refs"><span class="lbl">관련 자료</span>' + (links || '<span class="muted">기획서 · 화면설계서 준비 중</span>') +
      '<a class="link-arrow" href="#d-outputs" data-jump="outputs">산출물 전체 보기</a></p>';
    return s;
  }

  /* 02 발견 — 근거: 확인한 사실과 해석 · 가설을 나눔 */
  function secDiscovery(p) {
    var d = p.discovery || {};
    var s = rows([['처음 확인하려던 질문', d.question], ['조사 · 관찰 목적', d.purpose], ['방법', d.method], ['대상 · 조건', d.target],
      ['확인한 사실', d.observations], ['해석', d.interpretation], ['가설 (검증 전)', d.hypothesis]]);
    s += gallery(d.evidence, '발견 근거 자료');
    if (has(d.problemDefinition)) s += '<div class="define"><small>최종 문제 정의</small><p>' + esc(d.problemDefinition) + '</p></div>';
    return s + (s ? docRefs(p, 'discovery') : '');
  }

  /* 03 판단 — 결정마다 사실 → 검토한 방향 → 선택 → 이유 */
  function secDecisions(p) {
    var d = p.decisions || {};
    var s = (d.items || []).filter(function (it) { return has(it.choice); }).map(function (it, i) {
      return '<div class="decision"><h3 class="dec-title"><span>결정 ' + (i + 1) + '</span>' + esc(it.title || '') + '</h3>' +
        rows([['발견한 사실', it.fact], ['검토한 방향', it.options], ['선택', it.choice], ['이유 · 우선순위', it.reason]]) + '</div>';
    }).join('');
    s += gallery(d.images, '판단 근거 자료');
    return s + (s ? docRefs(p, 'decisions') : '');
  }

  /* 04 설계 — 실제로 바꾼 것: 기존 어려움 → 변경 → 이유 */
  function secDesign(p) {
    var d = p.design || {};
    var s = has(d.intro) ? '<p class="d-desc" style="margin-top:0">' + esc(d.intro) + '</p>' : '';
    if (d.ai) {
      var a = d.ai;
      var chips = has(a.inputs) ? '<span class="chips">' + a.inputs.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</span>' : '';
      var st = [['사용자 상황', esc(a.situation || '')], ['입력 정보', chips], ['조정 기준', has(a.criteria) ? list(a.criteria, 'dots') : ''],
        ['제안하는 행동', esc(a.action || '')], ['사용자 피드백', esc(a.feedback || '')], ['사용자가 확인 · 수정하는 지점', esc(a.userControl || '')]];
      s += '<div class="ai-chain" id="design-ai"><p class="ai-kicker">서비스 안의 AI 기획</p><ol class="steps">' +
        st.filter(function (x) { return has(x[1]); }).map(function (x) { return '<li><span class="k">' + x[0] + '</span><div>' + x[1] + '</div></li>'; }).join('') + '</ol></div>';
    }
    if (d.compare && (d.compare.before || d.compare.after)) {
      s += '<div class="compare"><div class="before"><span class="tag">기존</span>' + media(d.compare.before) + '</div>' +
        '<div class="after"><span class="tag">개선</span>' + media(d.compare.after) + '</div>' +
        (has(d.compare.caption) ? '<p class="compare-cap">' + esc(d.compare.caption) + '</p>' : '') + '</div>';
    }
    var ch = (d.changes || []).filter(function (c) { return has(c.change); });
    if (ch.length) {
      s += '<ul class="changes">' + ch.map(function (c) {
        var parts = [['기존 어려움', c.before], ['변경한 내용', c.change], ['필요한 이유', c.why]].filter(function (x) { return has(x[1]); });
        return '<li><h3>' + esc(c.title || '') + '</h3><dl>' + parts.map(function (x) { return '<div><dt>' + x[0] + '</dt><dd>' + esc(x[1]) + '</dd></div>'; }).join('') + '</dl></li>';
      }).join('') + '</ul>';
    }
    s += gallery(d.images, '설계 장표');
    return s + (s ? docRefs(p, 'design') : '');
  }

  /* 05 검증 — 방법 · 결과 · 한계 · 계획을 나누고, 수상은 외부 성과로 따로 */
  function secValidation(p) {
    var v = p.validation || {};
    var s = rows([['검증 목적', v.purpose], ['방법과 조건', v.method], ['확인한 결과', v.results], ['반영한 수정', v.changes],
      ['아직 확인하지 못한 점', p.limitations], ['다음 계획', p.nextSteps]]);
    if (!has(v.results) && has(v.status)) s += '<p class="d-note">' + esc(v.status) + '</p>';
    s += gallery(v.images, '검증 자료');
    if (!s) s = '<p class="d-note">사용자 검증 자료는 정리 중입니다.</p>';
    if (has(p.awards)) s += '<div class="awards-block"><h3>외부 성과</h3>' + list(p.awards) + '</div>';
    return s + docRefs(p, 'validation');
  }

  /* 06 산출물 — 전체 자료 모음 */
  function secOutputs(p) {
    var items = [];
    items.push(['프로토타입', has(p.prototypeUrl) ? '<a class="btn btn--sm" href="' + esc(p.prototypeUrl) + '" target="_blank" rel="noopener">새 탭에서 열기<span aria-hidden="true">↗</span></a>' : '<span class="state">준비 중</span>']);
    (p.documents || []).forEach(function (d) {
      items.push([esc(d.label), has(d.href) ? '<a class="btn btn--sm" href="' + esc(asset(d.href)) + '" target="_blank" rel="noopener">열기<span aria-hidden="true">↗</span></a>' : '<span class="state">준비 중</span>']);
    });
    return '<ul class="outputs">' + items.map(function (it) { return '<li><span class="name">' + it[0] + '</span>' + it[1] + '</li>'; }).join('') + '</ul>';
  }
  var BUILDERS = { overview: secOverview, discovery: secDiscovery, decisions: secDecisions, design: secDesign, validation: secValidation, outputs: secOutputs };

  // 이 구역이 근거인 핵심 역량 이름
  function capChip(p, sec) {
    var names = [];
    D.capabilities.forEach(function (c) {
      [c.target].concat((c.parts || []).map(function (pt) { return pt.target; })).forEach(function (t) {
        if (t && t.project === p.id && t.section === sec) names.push(c.parts ? (c.parts.filter(function (pt) { return pt.target === t; })[0] || {}).label || c.title : c.title);
      });
    });
    return names.length ? '<span class="d-cap">핵심 역량 · ' + esc(names.join(' · ')) + '</span>' : '';
  }

  function renderDetail(p) {
    var idx = D.projects.indexOf(p);
    var next = D.projects[(idx + 1) % D.projects.length];
    var secs = SECTIONS.map(function (S) { return { S: S, html: BUILDERS[S.id](p) }; }).filter(function (x) { return has(x.html); });
    $('#toc').innerHTML = secs.map(function (x) {
      return '<a href="#d-' + x.S.id + '" data-jump="' + x.S.id + '"><span>' + x.S.n + '</span>' + x.S.name + '</a>';
    }).join('');
    var body = secs.map(function (x) {
      var head = x.S.id === 'overview' ? '<div class="d-head"><span class="n">' + x.S.n + ' · 프로젝트 개요</span></div>'
        : '<div class="d-head"><span class="n">' + x.S.n + capChip(p, x.S.id) + '</span><h2>' + x.S.title + '</h2><span class="en">' + x.S.en + '</span></div>';
      return '<section class="d-sec" id="d-' + x.S.id + '" aria-label="' + x.S.title + '">' + head + x.html + '</section>';
    }).join('');
    body += '<div class="d-foot"><button type="button" class="next" data-open="' + next.id + '" data-next="1"><small>다음 프로젝트</small><b>' + esc(next.title) + '</b></button>' +
      '<button type="button" class="back" data-close>목록으로 돌아가기</button></div>';
    $('#detail').innerHTML = body;
    requestAnimationFrame(function () { $$('#detail .sg-wrap .sg').forEach(sgState); });
    $('#crumb').innerHTML = '프로젝트 ' + String(idx + 1).padStart(2, '0') + ' · <b>' + esc(p.title) + '</b>';
    document.title = p.title + ' · ' + D.site.brand;
  }

  /* ── 상세 패널 열기 · 닫기 ───────────────────────── */
  var layer, panelScroll;
  var state = { open: null, scrollY: 0, trigger: null, pushed: 0, standalone: false };

  function lockPage() { document.documentElement.classList.add('is-locked'); $('#page').setAttribute('inert', ''); $('#page').setAttribute('aria-hidden', 'true'); }
  function unlockPage() { document.documentElement.classList.remove('is-locked'); $('#page').removeAttribute('inert'); $('#page').removeAttribute('aria-hidden'); }

  function jumpTo(section, smooth) {
    var el = section ? $('#d-' + section) : null;
    if (section === 'design' && $('#design-ai')) el = $('#d-design');
    if (!el) { setScroll(0); return; }
    // 구역 위 구분선이 상단 막대 바로 밑에 겹쳐 보이지 않게 조금 더 내려 멈춤
    var top = el.offsetTop + (el.previousElementSibling ? 16 : 0) - (window.innerWidth <= 1024 ? 64 : 0);
    if (smooth && !reduce.matches) panelScroll.scrollTo({ top: top, behavior: 'smooth' }); else setScroll(top);
  }
  function setScroll(top) {
    panelScroll.style.scrollBehavior = 'auto';
    panelScroll.scrollTop = top;
    panelScroll.style.scrollBehavior = '';
  }

  function openProject(id, opts) {
    opts = opts || {};
    var p = byId(id);
    if (!p) return;
    var wasOpen = !!state.open;
    if (!wasOpen) {
      state.scrollY = window.scrollY;
      state.trigger = opts.trigger || document.activeElement;
      state.standalone = !!opts.standalone;
    }
    renderDetail(p);
    state.open = p.id;
    layer.hidden = false;
    layer.classList.toggle('is-standalone', state.standalone);
    lockPage();
    requestAnimationFrame(function () {
      layer.classList.add('is-open');
      jumpTo(opts.section, false);
      spy();
      var t = $('#detail-title');
      if (opts.section) { var sec = $('#d-' + opts.section); if (sec) { sec.setAttribute('tabindex', '-1'); sec.focus({ preventScroll: true }); } }
      else if (t) t.focus({ preventScroll: true });
    });
    if (opts.push) {
      history.pushState({ project: p.id, section: opts.section || '' }, '', projectUrl(p.slug));
      state.pushed++;
    }
  }

  function closeProject(fromPop) {
    if (!state.open) return;
    var id = state.open;
    state.open = null;
    layer.classList.remove('is-open');
    unlockPage();
    var finish = function () { layer.hidden = true; };
    if (reduce.matches) finish(); else setTimeout(finish, 260);
    document.title = D.site.brand + ' · ' + D.site.name + ' 포트폴리오';
    if (state.standalone) {
      // 주소로 바로 들어온 상세를 닫으면 메인의 그 카드 자리로
      state.standalone = false;
      if (!fromPop) history.replaceState({}, '', homeUrl());
      var card = $('#card-' + id);
      window.scrollTo(0, card ? card.getBoundingClientRect().top + window.scrollY - 80 : 0);
      var link = card && $('.card-link', card);
      if (link) link.focus({ preventScroll: true });
      return;
    }
    window.scrollTo(0, state.scrollY);
    var trg = state.trigger;
    if (trg && document.contains(trg) && !trg.closest('#layer')) trg.focus({ preventScroll: true });
    else { var c = $('#card-' + id + ' .card-link'); if (c) c.focus({ preventScroll: true }); }
  }

  function requestClose() {
    if (state.standalone) { state.pushed = 0; closeProject(false); return; }
    if (state.pushed > 0) { history.go(-state.pushed); }
    else closeProject(false);
  }

  window.addEventListener('popstate', function () {
    var slug = slugFromLocation();
    if (slug && byId(slug)) {
      var st = history.state || {};
      state.pushed = Math.max(0, state.pushed - 1);
      openProject(slug, { section: st.section || '' });
    } else {
      state.pushed = 0;
      closeProject(true);
    }
  });

  /* 목차: 지금 읽는 구역 표시 */
  function spy() {
    if (!state.open) return;
    var links = $$('#toc a');
    var cur = null, offset = panelScroll.scrollTop + panelScroll.clientHeight * 0.3;
    $$('.d-sec').forEach(function (s) { if (s.offsetTop <= offset) cur = s.id.slice(2); });
    if (panelScroll.scrollTop + panelScroll.clientHeight >= panelScroll.scrollHeight - 4) { var all = $$('.d-sec'); cur = all[all.length - 1].id.slice(2); }
    links.forEach(function (a) {
      var on = a.dataset.jump === cur;
      a.classList.toggle('is-current', on);
      if (on) {
        a.setAttribute('aria-current', 'location');
        var bar = a.parentNode; // 좁은 화면의 가로 목차: 패널 스크롤을 건드리지 않고 목차 줄만 옮김
        if (bar.scrollWidth > bar.clientWidth) {
          var l = a.offsetLeft - bar.offsetLeft, r = l + a.offsetWidth;
          if (l < bar.scrollLeft) bar.scrollLeft = l - 8; else if (r > bar.scrollLeft + bar.clientWidth) bar.scrollLeft = r - bar.clientWidth + 8;
        }
      }
      else a.removeAttribute('aria-current');
    });
  }

  /* 패널 안 포커스 가두기 */
  function trap(e) {
    if (e.key !== 'Tab' || !state.open) return;
    var f = $$('a[href], button:not([disabled]), [tabindex="0"], summary', $('#panel')).filter(function (el) { return el.offsetParent !== null; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && (document.activeElement === first || !$('#panel').contains(document.activeElement))) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ── 확대 보기 ─────────────────────────────────── */
  var lbTrigger = null;
  function openLightbox(src, cap, trigger) {
    var lb = $('#lightbox');
    $('#lb-img').src = src;
    $('#lb-img').alt = cap || '';
    $('#lb-cap').textContent = cap || '';
    lbTrigger = trigger;
    if (lb.showModal) lb.showModal(); else lb.setAttribute('open', '');
    $('#lb-close').focus();
  }
  function closeLightbox() {
    var lb = $('#lightbox');
    if (lb.close) lb.close(); else lb.removeAttribute('open');
  }

  /* ── 복사 ─────────────────────────────────────── */
  function copyText(text) {
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      var ok = false; try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      return ok;
    }
    var done = function (ok) { toast(ok ? '이메일 주소를 복사했습니다' : '복사하지 못했습니다. 주소를 직접 선택해 주세요'); };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(fallback()); });
    else done(fallback());
  }

  /* ── 첫 화면 반응 ─────────────────────── */
  function heroMotion() {
    var hero = $('.hero');
    var lines = $$('#hero-title .line');
    hero.addEventListener('pointermove', function (e) {
      if (reduce.matches || e.pointerType !== 'mouse') return;
      var r = hero.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      lines.forEach(function (l, i) { l.style.setProperty('--dx', (x * (i + 1) * 6).toFixed(1) + 'px'); });
    });
    hero.addEventListener('pointerleave', function () { lines.forEach(function (l) { l.style.setProperty('--dx', '0px'); }); });
    var brand = $('#hero-title .brand');
    if (brand) setTimeout(function () { brand.classList.add('is-on'); }, reduce.matches ? 0 : 500);
  }

  /* 상단 메뉴: 지금 보는 섹션 표시 */
  function navSpy() {
    var links = $$('.nav a');
    var secs = links.map(function (a) { return $(a.getAttribute('href')); });
    function run() {
      $('.site-header').classList.toggle('is-scrolled', window.scrollY > 8);
      var y = window.scrollY + window.innerHeight * 0.35, cur = -1;
      secs.forEach(function (s, i) { if (s && s.offsetTop <= y) cur = i; });
      links.forEach(function (a, i) { a.classList.toggle('is-current', i === cur); if (i === cur) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
    }
    window.addEventListener('scroll', run, { passive: true });
    run();
  }

  /* ── 클릭 · 키보드 연결 ─────────────────────────── */
  function bind() {
    layer = $('#layer');
    panelScroll = $('#panel-scroll');
    panelScroll.addEventListener('scroll', spy, { passive: true });
    // 상세 갤러리: 스크롤 이벤트는 위로 전달되지 않아 capture로 받음
    var sgTick = null;
    document.addEventListener('scroll', function (e) {
      var t = e.target;
      if (t.classList && t.classList.contains('sg') && !sgTick) sgTick = requestAnimationFrame(function () { sgTick = null; sgState(t); });
    }, true);
    window.addEventListener('resize', function () { $$('#detail .sg-wrap .sg').forEach(sgState); });
    $$('.slider-track').forEach(function (t) {
      var tick = null;
      t.addEventListener('scroll', function () { if (!tick) tick = requestAnimationFrame(function () { tick = null; sliderState(t); }); }, { passive: true });
    });

    document.addEventListener('click', function (e) {
      var el = e.target.closest('[data-open], [data-close], [data-jump], [data-zoom], [data-pending], [data-sg], [data-slide], [data-filter], [data-soon], #copy-mail, .wordmark, .nav a, .menu-btn');
      if (!el) return;
      if (el.matches('[data-open]')) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return; // 새 탭 열기는 그대로
        e.preventDefault();
        if (el.dataset.next) { openProject(el.dataset.open, { push: true }); }
        else openProject(el.dataset.open, { push: true, section: el.dataset.section || '', trigger: el });
      } else if (el.matches('[data-close]')) {
        e.preventDefault(); requestClose();
      } else if (el.matches('[data-jump]')) {
        e.preventDefault(); jumpTo(el.dataset.jump, true);
        var sec = $('#d-' + el.dataset.jump); if (sec) { sec.setAttribute('tabindex', '-1'); sec.focus({ preventScroll: true }); }
      } else if (el.matches('[data-zoom]')) {
        openLightbox(el.dataset.zoom, el.dataset.caption, el);
      } else if (el.matches('[data-sg]')) {
        sgStep(el.closest('.sg-wrap').querySelector('.sg'), Number(el.dataset.sg));
      } else if (el.matches('[data-slide]')) {
        var tr = el.closest('.slider').querySelector('.slider-track');
        tr.scrollBy({ left: Number(el.dataset.slide) * tr.clientWidth, behavior: reduce.matches ? 'auto' : 'smooth' });
      } else if (el.matches('[data-filter]')) {
        applyFilter(el.dataset.filter);
      } else if (el.matches('[data-soon]')) {
        toast(el.dataset.soon + ' 상세는 준비 중입니다');
      } else if (el.matches('[data-pending]')) {
        e.preventDefault(); toast(el.dataset.pending + ' 파일은 준비 중입니다');
      } else if (el.id === 'copy-mail') {
        copyText(D.site.email);
      } else if (el.matches('.wordmark')) {
        e.preventDefault();
        if (state.open) requestClose();
        window.scrollTo({ top: 0, behavior: reduce.matches ? 'auto' : 'smooth' });
        $('#main').focus({ preventScroll: true });
      } else if (el.matches('.nav a')) {
        $('.nav').classList.remove('is-open'); $('.menu-btn').setAttribute('aria-expanded', 'false');
      } else if (el.matches('.menu-btn')) {
        var open = !$('.nav').classList.contains('is-open');
        $('.nav').classList.toggle('is-open', open); el.setAttribute('aria-expanded', String(open));
      }
    });
    layer.addEventListener('click', function (e) { if (e.target.classList.contains('layer-shade')) requestClose(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if ($('#lightbox').open) return; // dialog가 직접 닫음
        if (state.open) { e.preventDefault(); requestClose(); }
        else if ($('.nav').classList.contains('is-open')) { $('.nav').classList.remove('is-open'); $('.menu-btn').setAttribute('aria-expanded', 'false'); $('.menu-btn').focus(); }
      }
      if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[data-pending]')) { e.preventDefault(); toast(e.target.dataset.pending + ' 파일은 준비 중입니다'); }
      trap(e);
    });
    $('#lb-close').addEventListener('click', closeLightbox);
    $('#lightbox').addEventListener('close', function () { if (lbTrigger) lbTrigger.focus(); });
    $('#lightbox').addEventListener('click', function (e) { if (e.target.id === 'lightbox' || e.target.id === 'lb-img') closeLightbox(); });
  }

  /* ── 시작 ─────────────────────────────────────── */
  renderHome();
  bind();
  heroMotion();
  navSpy();
  var first = slugFromLocation();
  if (first && byId(first)) {
    history.replaceState({ project: byId(first).id, section: '' }, '', location.href);
    openProject(first, { standalone: true });
  }
})();
