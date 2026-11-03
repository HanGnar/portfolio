/* 헝그리한정민 포트폴리오 v8 — 화면 그리기와 동작 (데이터는 content.js)
 *
 * 화면 흐름
 *   홈: 첫 화면 → 프로젝트(이미지 카드) → 소개(사진 · 자기소개 · 하는 일 · 이력 · 툴) → 연락처
 *   상세: 카드를 누르면 전체 화면 케이스 페이지. 면접관이 물을 순서대로
 *         머리(무슨 프로젝트 · 담당 업무) → 문제 → 해결(+의사결정) → 설계 → 검증 → 회고 → 산출물 → 다음 프로젝트
 */
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
  function nn(i) { return String(i + 1).padStart(2, '0'); }
  // 자기소개 문단: **두 별표**로 감싼 말을 굵게
  function strongText(t) { return esc(t).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'); }

  /* 초안: site.draft가 true면 빈 칸을 회색 글씨(칸 이름 —)로 보이고, false면 숨김 */
  var DRAFT = !!(D.site && D.site.draft);
  function slot(label) { return DRAFT ? '<span class="slot">' + (label ? esc(label) + ' ' : '') + '—</span>' : ''; }

  var toastTimer;
  function toast(msg) {
    var t = $('#toast');
    t.textContent = msg;
    t.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('is-on'); }, 2400);
  }

  /* ── 이미지: src가 있으면 실제 이미지, 없으면 용도가 적힌 이미지 박스
   *   opts.zoom: 눌러서 확대(카드 안처럼 이미 링크인 곳에서는 끔) */
  function media(img, opts) {
    opts = opts || {};
    if (!img) return '';
    var ratio = opts.ratio || img.ratio || '16:9';
    var style = ' style="--ratio:' + ratio.replace(':', ' / ') + '"';
    var inner;
    if (has(img.src)) {
      var alt = img.alt || img.purpose || '';
      var tag = '<img src="' + esc(asset(img.src)) + '" alt="' + esc(alt) + '" loading="lazy" decoding="async">';
      inner = opts.zoom ? '<button type="button" class="zoom" data-zoom="' + esc(asset(img.src)) + '" data-caption="' + esc(img.caption || alt) + '" aria-label="확대해서 보기: ' + esc(alt) + '">' + tag + '</button>' : tag;
    } else {
      inner = '<div class="ph" role="img" aria-label="이미지 준비 중: ' + esc(img.purpose) + '"><span>' + esc(img.purpose) + '</span><small>' + esc(ratio) + '</small></div>';
    }
    return '<div class="media' + (opts.cls ? ' ' + opts.cls : '') + '"' + style + '>' + inner + '</div>';
  }

  /* ── 문서 버튼: href가 없으면 "준비 중" ───────────── */
  function docButton(doc, opts) {
    opts = opts || {};
    var label = opts.label || doc.label;
    var cls = 'btn' + (opts.cls ? ' ' + opts.cls : '');
    if (has(doc.href)) return '<a class="' + cls + '" href="' + esc(asset(doc.href)) + '" target="_blank" rel="noopener">' + esc(label) + '<span aria-hidden="true">↗</span></a>';
    return '<span class="' + cls + ' is-pending" role="link" aria-disabled="true" tabindex="0" data-pending="' + esc(doc.label) + '">' + esc(label) + '</span>';
  }

  /* 대표 이미지 목록: 빈 이미지는 초안일 때만 이미지 박스로 */
  function coversOf(p) {
    return (p.covers || (p.cover ? [p.cover] : [])).filter(function (m) { return m && (has(m.src) || DRAFT); });
  }

  /* 상세 맨 위 대표 이미지: 한 장이면 그대로, 여러 장이면 옆으로 넘겨 보기
   *   이미지 아래쪽 가운데에 유리 점(지금 장만 진하게, 누르면 그 장으로). 점 위에 마우스를 올리면 양옆으로 이전/다음 버튼이
   *   물방울처럼 떨어져 나옴. 밀기 · 포커스 후 좌우 키로도 넘김 */
  function cover(p) {
    var cs = coversOf(p);
    if (!cs.length) return '';
    if (cs.length === 1) return '<div class="c-cover wrap">' + media(cs[0], { zoom: true }) + '</div>';
    var n = cs.length;
    return '<div class="c-cover wrap"><div class="cv" role="region" aria-roledescription="이미지 넘겨 보기" aria-label="' + esc(p.title) + ' 대표 이미지">' +
      '<div class="cv-track" tabindex="0" aria-label="좌우로 넘겨 보기">' + cs.map(function (m, i) {
        return '<div class="cv-slide" role="group" aria-roledescription="슬라이드" aria-label="' + (i + 1) + ' / ' + n + '">' + media(m, { zoom: true }) + '</div>';
      }).join('') + '</div>' +
      '<div class="cv-ctl">' +
        '<button type="button" class="cv-btn cv-prev" data-cvstep="-1" aria-label="이전 이미지" disabled><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3.5 5.5 8l4.5 4.5"/></svg></button>' +
        '<div class="cv-dots">' + cs.map(function (m, i) { return '<button type="button" data-cv="' + i + '" aria-label="' + (i + 1) + '번째 이미지"' + (i ? '' : ' class="is-on" aria-current="true"') + '></button>'; }).join('') + '</div>' +
        '<button type="button" class="cv-btn cv-next" data-cvstep="1" aria-label="다음 이미지"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3.5 4.5 4.5L6 12.5"/></svg></button>' +
      '</div>' +
      '</div></div>';
  }
  function cvIndex(track) { return Math.round(track.scrollLeft / Math.max(1, track.clientWidth)); }
  function cvGo(track, i) {
    var n = track.children.length;
    i = Math.max(0, Math.min(n - 1, i));
    track.scrollTo({ left: i * track.clientWidth, behavior: reduce.matches ? 'auto' : 'smooth' });
  }
  function cvState(track) {
    var box = track.closest('.cv'), i = Math.min(track.children.length - 1, cvIndex(track));
    $$('.cv-dots button', box).forEach(function (b, k) { b.classList.toggle('is-on', k === i); if (k === i) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current'); });
    $('.cv-prev', box).disabled = i === 0; $('.cv-next', box).disabled = i === track.children.length - 1;
  }

  /* 분류 버튼: 고른 분류 카드만 보임. 카드는 모두 같은 크기로 두 개씩 */
  function inFilter(p, id) { return !id || id === 'all' || (p.tags || []).indexOf(id) > -1; }
  function applyFilter(id, animate) {
    $$('#work-filter [data-filter]').forEach(function (b) { b.setAttribute('aria-selected', String(b.dataset.filter === id)); });
    var shown = D.projects.filter(function (p) { return inFilter(p, id); });
    D.projects.forEach(function (p) {
      var el = $('#card-' + p.id), k = shown.indexOf(p);
      el.hidden = k < 0;
      if (animate && k > -1 && !reduce.matches) { el.classList.remove('is-show'); void el.offsetWidth; el.style.setProperty('--d', k * 60 + 'ms'); el.classList.add('is-show'); }
    });
  }

  /* ════════════════ 홈 ════════════════ */
  function renderHome() {
    var h = D.hero;
    $('#hero-role').textContent = h.role || '';
    $('#hero-title').innerHTML = h.title.map(function (t, i) {
      var last = i === h.title.length - 1;
      return '<span class="line" style="--i:' + i + '"><span>' + (last ? '<em>' + esc(t) + '</em>' : esc(t)) + '</span></span>';
    }).join('');
    $('#hero-sub').innerHTML = h.sub.map(esc).join('<br>');
    $$('[data-doc="resume"]').forEach(function (el) {
      el.outerHTML = docButton(D.documents.resume, { label: el.dataset.label || '이력서', cls: el.dataset.cls || '' });
    });

    // 프로젝트 카드: 대표 이미지 · 번호 · 이름 · 한 줄 소개 · 기간/팀/수상(있을 때만)
    function card(p, wide) {
      var i = D.projects.indexOf(p);
      var meta = [p.period, p.teamSize].filter(has).map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('');
      var award = has(p.awards) ? '<p class="award">' + esc(p.awards[0]) + '</p>' : '';
      return '<a class="work' + (wide ? ' is-wide' : '') + '" id="card-' + p.id + '" href="' + projectUrl(p.slug) + '" data-open="' + p.id + '">' +
        media(coversOf(p)[0] || {}, { ratio: wide ? '2:1' : '16:10', cls: 'work-img' }) +
        '<div class="work-info">' +
          '<p class="work-n">' + nn(i) + '</p>' +
          '<h3>' + esc(p.title) + (p.titleEn ? ' <span class="en">' + esc(p.titleEn) + '</span>' : '') + '</h3>' +
          (has(p.oneLine) ? '<p class="work-line">' + esc(p.oneLine) + '</p>' : (DRAFT ? '<p class="work-line">' + slot('한 줄 소개') + '</p>' : '')) +
          (meta ? '<ul class="work-meta">' + meta + '</ul>' : '') + award +
        '</div></a>';
    }
    // 분류 버튼(대표 · 협업 · 기획) + 카드 한 묶음. 버튼을 누르면 그 분류 카드만 보임
    var fs = D.filters || [];
    $('#work-filter').innerHTML = fs.map(function (f, k) {
      return '<button type="button" role="tab" aria-selected="' + (k === 0) + '" data-filter="' + esc(f.id) + '">' + esc(f.label) + '</button>';
    }).join('');
    $('#work-list').innerHTML = D.projects.map(function (p) { return card(p, false); }).join('');
    applyFilter(fs.length ? fs[0].id : '', false);

    var a = D.about;
    $('#about-photo').innerHTML = media(a.photo, { ratio: '3:4' });
    $('#about-name').textContent = D.site.name;
    $('#about-role').textContent = h.role || '';

    // 자기소개: 제목을 누르면 펼쳐짐. 첫 묶음은 펼친 채로
    $('#intro').innerHTML = (a.intro || []).map(function (b, i) {
      var open = i === 0;
      return '<div class="acc' + (open ? ' is-open' : '') + '">' +
        '<h3><button type="button" class="acc-btn" aria-expanded="' + open + '" aria-controls="acc-' + i + '" id="acc-b-' + i + '">' +
          '<small>' + esc(b.label) + '</small><span>' + esc(b.title) + '</span><i aria-hidden="true"></i></button></h3>' +
        '<div class="acc-body" id="acc-' + i + '" role="region" aria-labelledby="acc-b-' + i + '"><div>' +
          (b.paras || []).filter(has).map(function (t) { return '<p>' + strongText(t) + '</p>'; }).join('') +
        '</div></div></div>';
    }).join('');

    // 하는 일: 역량 이름 + 한 줄. AI는 두 갈래를 한 칸 안에
    $('#caps').innerHTML = D.capabilities.map(function (c) {
      var body = has(c.parts)
        ? c.parts.map(function (pt) { return '<p><b>' + esc(pt.label) + '</b>' + esc(pt.desc) + '</p>'; }).join('')
        : '<p>' + esc(c.desc) + '</p>';
      return '<div class="cap"><h4>' + esc(c.title) + '</h4>' + body + '</div>';
    }).join('');

    // 이력: 묶음마다 날짜 | 이름 · 한 줄 설명(프로젝트가 있으면 상세 링크)
    function row(it) {
      var note = has(it.note) ? (it.project ? '<a href="' + projectUrl(byId(it.project).slug) + '" data-open="' + it.project + '">' + esc(it.note) + '</a>' : esc(it.note)) : '';
      return '<li><span class="when">' + esc(it.when || '') + '</span><span class="what">' + esc(it.what) + (note ? '<small>' + note + '</small>' : '') + '</span></li>';
    }
    $('#history').innerHTML = [['학력', a.education], ['수상', a.awards], ['발표 · 선정', a.presentations], ['교내활동', a.activities], ['경력', a.career]]
      .filter(function (g) { return has(g[1]); })
      .map(function (g) { return '<div class="hist"><h4>' + g[0] + '</h4><ul>' + g[1].map(row).join('') + '</ul></div>'; }).join('');

    // 툴: 로고 + 이름, 아래에 쓰는 일
    $('#tools').innerHTML = (a.tools || []).map(function (it) {
      var logo = (it.logos || [])[0];
      return '<li>' + (logo ? '<img src="' + esc(asset(logo.src)) + '" alt=""' + (logo.invert ? ' class="invert"' : '') + ' width="28" height="28" loading="lazy" decoding="async">' : '') +
        '<b>' + esc(it.name) + '</b><small>' + esc(it.use) + '</small></li>';
    }).join('');
    $('#methods').innerHTML = (a.methods || []).map(function (m) {
      return '<div><dt>' + esc(m.stage) + '</dt><dd>' + m.items.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</dd></div>';
    }).join('');
    var r = D.documents.resume;
    $('#records-note').innerHTML = has(r.href) ? '상세 이력은 <a href="' + esc(asset(r.href)) + '" target="_blank" rel="noopener">이력서 PDF</a>에서 볼 수 있습니다.' : '상세 이력은 이력서 PDF로 준비 중입니다.';

    // 연락처: 이메일 · 연락처 · 이력서 · 포트폴리오를 나란히. 칸마다 이름(작게) + 내용. 빈 칸은 초안이면 '준비 중', 아니면 숨김
    var ct = D.contact || {}, mail = D.site.email;
    var cl = $('#closing');
    // 마무리 한 줄: \n 자리와 문장 끝에서 줄을 나눔(어중간한 자리에서 끊기지 않게)
    if (has(ct.closing)) { cl.innerHTML = esc(ct.closing).replace(/\n/g, '<br>').replace(/([.!?])\s+/g, '$1<br>'); cl.hidden = false; }
    else if (DRAFT) { cl.innerHTML = slot('마무리 한 줄'); cl.hidden = false; }
    function citem(k, v) { return '<div><dt>' + k + '</dt><dd>' + v + '</dd></div>'; }
    function go(href, label, ext) { return '<a class="row-link" href="' + esc(href) + '"' + (ext ? ' target="_blank" rel="noopener"' : '') + '>' + label + '<span class="arr" aria-hidden="true">↗</span></a>'; }
    var rows = citem('이메일', '<button type="button" class="mail" id="copy-mail" aria-label="이메일 주소 복사: ' + esc(mail) + '">' + esc(mail) + '</button>' + go('mailto:' + mail, '메일 보내기'));
    if (has(ct.phone)) rows += citem('연락처', '<a class="mail" href="tel:' + esc(ct.phone.replace(/[^0-9+]/g, '')) + '">' + esc(ct.phone) + '</a>');
    else if (DRAFT) rows += citem('연락처', '<span class="slot">준비 중</span>');
    [D.documents.resume, D.documents.portfolio].filter(Boolean).forEach(function (d) {
      if (has(d.href)) rows += citem(esc(d.label), go(asset(d.href), 'PDF 다운로드', true));
      else if (DRAFT) rows += citem(esc(d.label), '<span class="slot">준비 중</span>');
    });
    $('#contact-list').innerHTML = rows;
  }

  /* ════════════════ 상세(케이스 페이지) ════════════════ */
  // 이름 | 값 줄. 값이 비면 초안 자리 또는 숨김. raw가 true면 값이 이미 HTML
  function kv(pairs) {
    var out = pairs.map(function (r) {
      var v = r[1];
      if (!has(v)) return DRAFT ? '<div><dt>' + r[0] + '</dt><dd>' + slot('') + '</dd></div>' : '';
      return '<div><dt>' + r[0] + '</dt><dd>' + (r[2] ? v : (Array.isArray(v) ? list(v) : esc(v))) + '</dd></div>';
    }).join('');
    return out ? '<dl class="kv">' + out + '</dl>' : '';
  }
  function headline(text, label) {
    return has(text) ? '<p class="c-head">' + esc(text) + '</p>' : (DRAFT ? '<p class="c-head">' + slot(label) + '</p>' : '');
  }
  // 최대 3개 묶음: 채운 항목이 있으면 그것만, 없으면 초안 자리 3개
  function three(items, ok) {
    var got = (items || []).filter(ok).slice(0, 3);
    return got.length ? got : (DRAFT ? [null, null, null] : []);
  }
  function txt(v, label) { return has(v) ? esc(v) : slot(label || ''); }

  /* 문제: 문제 정의(크게) · 타깃 사용자 → 인사이트 01–03(카드 위에 조사 방법) */
  function secProblem(p) {
    var s = headline(p.problem, '문제 정의');
    if (has(p.target) || DRAFT) s += '<p class="target"><b>타깃 사용자</b>' + txt(p.target) + '</p>';
    var ins = three(p.insights, function (r) { return has(r.text); });
    if (ins.length) s += '<ol class="insights">' + ins.map(function (r, i) {
      var k = '<div class="ins-k">인사이트 ' + (i + 1) + (r && has(r.method) ? '<br>' + esc(r.method) : (r ? '' : '<br>' + slot('조사 방법'))) + '</div>';
      if (!r) return '<li id="ins-' + (i + 1) + '">' + k + '<div class="ins-v">' + slot('') + '</div></li>';
      return '<li id="ins-' + (i + 1) + '">' + k + '<div class="ins-v"><p>' + esc(r.text) + '</p>' + (r.image && has(r.image.src) ? media(r.image, { zoom: true }) : '') + '</div></li>';
    }).join('') + '</ol>';
    return s;
  }

  /* 해결: 기획 방향(크게) → 핵심 기능(글 · 화면 좌우로 번갈아) → 의사결정(검토안 · 최종안 · 선택 이유) */
  function secSolution(p) {
    var s = headline(p.direction, '기획 방향');
    var fs = three(p.features, function (f) { return has(f.name); });
    if (fs.length) s += '<h3 class="c-sub">핵심 기능</h3><ol class="feats">' + fs.map(function (f, i) {
      if (!f) return '<li><div class="feat-text"><span class="fn">' + nn(i) + '</span><b>' + slot('기능 이름') + '</b><p>' + slot('설명') + '</p></div>' + media({ src: '', ratio: '4:3', purpose: '기능 화면' }) + '</li>';
      var pic;
      if (f.before && has(f.before.src)) pic = '<div class="compare"><figure><span class="tag">기존</span>' + media(f.before, { zoom: true }) + '</figure><figure><span class="tag tag--on">개선</span>' + media(f.image || {}, { zoom: true }) + '</figure></div>';
      else pic = f.image && (has(f.image.src) || DRAFT) ? media(f.image, { zoom: true }) : '';
      var chip = f.insight ? '<button type="button" class="ins-link" data-ins="' + Number(f.insight) + '">근거: 인사이트 ' + Number(f.insight) + '</button>' : '';
      return '<li' + (pic ? '' : ' class="no-pic"') + '><div class="feat-text"><span class="fn">' + nn(i) + '</span><b>' + esc(f.name) + '</b>' +
        (has(f.desc) ? '<p>' + esc(f.desc) + '</p>' : '') + chip + '</div>' + pic + '</li>';
    }).join('') + '</ol>';
    var d = p.decision || {};
    var opts = (d.options || []).filter(has);
    if (has(d.final) || DRAFT) {
      s += '<h3 class="c-sub">의사결정</h3><table class="decision"><tbody>' +
        (opts.length ? opts : [null]).map(function (o) { return '<tr><th scope="row">검토안</th><td>' + (o ? esc(o) : slot('')) + '</td></tr>'; }).join('') +
        '<tr class="is-final"><th scope="row">최종안</th><td>' + txt(d.final) + '</td></tr></tbody></table>' +
        '<p class="dec-why"><span>선택 이유</span>' + txt(d.reason) + '</p>';
    }
    return s;
  }

  /* 설계: 정보구조도 · 유저 플로우를 탭으로 바꿔 봄 + 프로토타입 (완성 화면은 핵심 기능에) */
  function secDesign(p) {
    var ds = (p.design || []).filter(function (m) { return m && (has(m.src) || DRAFT); });
    var s = '';
    if (ds.length) {
      s += '<div class="tabs" role="tablist" aria-label="설계 자료">' + ds.map(function (m, i) {
        return '<button type="button" role="tab" id="tab-' + i + '" aria-controls="tp-' + i + '" aria-selected="' + (i === 0) + '"' + (i ? ' tabindex="-1"' : '') + ' data-tab="' + i + '">' + esc(m.purpose) + '</button>';
      }).join('') + '</div>' + ds.map(function (m, i) {
        return '<div class="tab-panel" role="tabpanel" id="tp-' + i + '" aria-labelledby="tab-' + i + '"' + (i ? ' hidden' : '') + '>' + media(m, { zoom: true }) +
          (has(m.caption) ? '<p class="cap">' + esc(m.caption) + '</p>' : '') + '</div>';
      }).join('');
    }
    if (has(p.prototypeUrl)) s += '<a class="btn btn--primary" href="' + esc(p.prototypeUrl) + '" target="_blank" rel="noopener">프로토타입 열기<span aria-hidden="true">↗</span></a>';
    else if (DRAFT) s += '<span class="btn is-pending" role="link" aria-disabled="true" tabindex="0" data-pending="프로토타입">프로토타입</span>';
    return s;
  }

  /* 검증: 테스트 방법 · 결과. 숫자가 있으면 바뀌기 전 → 후를 크게 */
  function secValidation(p) {
    var v = p.validation || {};
    var stats = (v.stats || []).filter(function (x) { return has(x.after); });
    var s = kv([['테스트 방법', v.method], ['결과', v.result]]);
    if (stats.length) s += '<div class="stats">' + stats.map(function (x) {
      return '<div><b>' + (has(x.before) ? '<span>' + esc(x.before) + '</span> → ' : '') + esc(x.after) + '</b><small>' + esc(x.label || '') + '</small></div>';
    }).join('') + '</div>';
    return s;
  }

  /* 회고: 아쉬운 점 · 배운 점 한 문장씩 */
  function secRetro(p) {
    var r = p.retro || {};
    if (!has(r.regret) && !has(r.learned) && !DRAFT) return '';
    return '<div class="retro">' + [['아쉬운 점', r.regret], ['배운 점', r.learned]].filter(function (x) { return has(x[1]) || DRAFT; }).map(function (x) {
      return '<div><small>' + x[0] + '</small><p>' + txt(x[1]) + '</p></div>';
    }).join('') + '</div>';
  }

  function secOutputs(p) {
    var items = [];
    (p.outputs || []).forEach(function (d) {
      if (has(d.href)) items.push('<a class="btn" href="' + esc(asset(d.href)) + '" target="_blank" rel="noopener">' + esc(d.label) + '<span aria-hidden="true">↗</span></a>');
      else if (DRAFT) items.push(docButton(d));
    });
    return items.length ? '<div class="outputs">' + items.join('') + '</div>' : '';
  }
  var SECTIONS = [
    { id: 'problem', name: '문제', fn: secProblem },
    { id: 'solution', name: '해결', fn: secSolution },
    { id: 'design', name: '설계', fn: secDesign },
    { id: 'validation', name: '검증', fn: secValidation },
    { id: 'retro', name: '회고', fn: secRetro },
    { id: 'outputs', name: '산출물', fn: secOutputs }
  ];

  function renderDetail(p) {
    var idx = D.projects.indexOf(p);
    var next = D.projects[(idx + 1) % D.projects.length];

    // 머리: 이름 · 한 줄 소개 / 프로젝트 유형 · 기간 · 참여 인원 · 담당 업무 · 수상 / 대표 이미지
    var meta = [['프로젝트 유형', p.type], ['기간', p.period], ['참여 인원', p.teamSize]].map(function (x) {
      if (!has(x[1])) return DRAFT ? '<div><dt>' + x[0] + '</dt><dd>' + slot('') + '</dd></div>' : '';
      return '<div><dt>' + x[0] + '</dt><dd>' + esc(x[1]) + '</dd></div>';
    }).join('');
    meta += has(p.mine) ? '<div><dt>담당 업무</dt><dd>' + list(p.mine) + '</dd></div>' : (DRAFT ? '<div><dt>담당 업무</dt><dd>' + slot('') + '</dd></div>' : '');
    if (has(p.awards)) meta += '<div class="is-wide"><dt>수상</dt><dd>' + list(p.awards) + '</dd></div>';
    var s = '<header class="c-hero"><div class="wrap">' +
      '<h1 id="detail-title" tabindex="-1">' + esc(p.title) + (p.titleEn ? ' <span class="en">' + esc(p.titleEn) + '</span>' : '') + '</h1>' +
      (has(p.oneLine) ? '<p class="c-lead">' + esc(p.oneLine) + '</p>' : (DRAFT ? '<p class="c-lead">' + slot('한 줄 소개') + '</p>' : '')) +
      (meta ? '<dl class="c-meta">' + meta + '</dl>' : '') +
      '</div></header>' +
      cover(p);

    // 본문: 왼쪽에 구역 이름(따라 내려옴), 오른쪽에 내용
    s += SECTIONS.map(function (S) {
      var html = S.fn(p);
      if (!has(html)) return '';
      return '<section class="c-sec" id="d-' + S.id + '" aria-labelledby="h-' + S.id + '"><div class="wrap c-grid">' +
        '<h2 class="c-label" id="h-' + S.id + '">' + S.name + '</h2><div class="c-body">' + html + '</div></div></section>';
    }).join('');

    // 다음 프로젝트: 왼쪽 이름 · 한 줄 소개, 오른쪽 대표 이미지(첫 장)
    s += '<a class="c-next" href="' + projectUrl(next.slug) + '" data-open="' + next.id + '" data-next="1"><div class="wrap c-next-in">' +
      '<div class="c-next-text"><small>다음 프로젝트</small><b>' + esc(next.title) + '</b>' +
      (has(next.oneLine) ? '<p>' + esc(next.oneLine) + '</p>' : (DRAFT ? '<p>' + slot('한 줄 소개') + '</p>' : '')) + '</div>' +
      (coversOf(next)[0] ? media(coversOf(next)[0], { ratio: '16:10', cls: 'c-next-img' }) : '') +
      '</div></a>';

    $('#detail').innerHTML = s;
    $('#crumb').textContent = p.title;
    document.title = p.title + ' · ' + D.site.brand;
    revealIn($('#detail'), panelScroll);
  }

  // 핵심 기능의 '인사이트 02' → 위의 그 인사이트로 올라가 잠깐 표시
  function goInsight(n) {
    var el = $('#ins-' + n, $('#detail'));
    if (!el) return;
    var top = el.getBoundingClientRect().top - panelScroll.getBoundingClientRect().top + panelScroll.scrollTop - 120;
    panelScroll.scrollTo({ top: top, behavior: reduce.matches ? 'auto' : 'smooth' });
    el.classList.remove('is-flash'); void el.offsetWidth; el.classList.add('is-flash');
  }
  // 설계 탭 바꾸기
  function selectTab(btn) {
    var list = btn.parentNode, tabs = $$('[role="tab"]', list);
    tabs.forEach(function (t) {
      var on = t === btn;
      t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1;
      $('#' + t.getAttribute('aria-controls')).hidden = !on;
    });
  }

  /* ── 상세 열기 · 닫기 ───────────────────────── */
  var layer, panelScroll;
  var state = { open: null, scrollY: 0, trigger: null, pushed: 0, standalone: false };

  function lockPage() { document.documentElement.classList.add('is-locked'); $('#page').setAttribute('inert', ''); $('#page').setAttribute('aria-hidden', 'true'); }
  function unlockPage() { document.documentElement.classList.remove('is-locked'); $('#page').removeAttribute('inert'); $('#page').removeAttribute('aria-hidden'); }
  function setScroll(top) { panelScroll.style.scrollBehavior = 'auto'; panelScroll.scrollTop = top; panelScroll.style.scrollBehavior = ''; }

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
    var draw = function () {
      renderDetail(p);
      setScroll(0);
      progress();
      var t = $('#detail-title'); if (t) t.focus({ preventScroll: true });
    };
    state.open = p.id;
    layer.hidden = false;
    lockPage();
    if (wasOpen && !reduce.matches) {
      // 다음 프로젝트로 넘어갈 때: 살짝 사라졌다가 새 내용으로
      layer.classList.add('is-swap');
      setTimeout(function () { draw(); layer.classList.remove('is-swap'); }, 220);
    } else {
      draw();
      requestAnimationFrame(function () { layer.classList.add('is-open'); });
    }
    if (opts.push) {
      history.pushState({ project: p.id }, '', projectUrl(p.slug));
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
    if (reduce.matches) finish(); else setTimeout(finish, 360);
    document.title = D.site.brand + ' · ' + D.site.name + ' 포트폴리오';
    var card = $('#card-' + id);
    if (state.standalone) {
      // 주소로 바로 들어온 상세를 닫으면 홈의 그 카드 자리로
      state.standalone = false;
      if (!fromPop) history.replaceState({}, '', homeUrl());
      window.scrollTo(0, card ? card.getBoundingClientRect().top + window.scrollY - 100 : 0);
      if (card) card.focus({ preventScroll: true });
      return;
    }
    window.scrollTo(0, state.scrollY);
    var trg = state.trigger;
    if (trg && document.contains(trg) && !trg.closest('#layer')) trg.focus({ preventScroll: true });
    else if (card) card.focus({ preventScroll: true });
  }

  function requestClose() {
    if (state.standalone) { state.pushed = 0; closeProject(false); return; }
    if (state.pushed > 0) history.go(-state.pushed);
    else closeProject(false);
  }

  window.addEventListener('popstate', function () {
    var slug = slugFromLocation();
    if (slug && byId(slug)) { state.pushed = Math.max(0, state.pushed - 1); openProject(slug); }
    else { state.pushed = 0; closeProject(true); }
  });

  /* 상세 위쪽 막대의 읽은 만큼 표시 */
  function progress() {
    var s = panelScroll;
    var v = s.scrollTop / Math.max(1, s.scrollHeight - s.clientHeight);
    $('#case-progress').style.transform = 'scaleX(' + Math.min(1, Math.max(0, v)).toFixed(4) + ')';
    $('.case-bar').classList.toggle('is-scrolled', s.scrollTop > 8);
  }

  /* 상세 안 포커스 가두기 */
  function trap(e) {
    if (e.key !== 'Tab' || !state.open) return;
    var f = $$('a[href], button:not([disabled]), [tabindex="0"]', $('#panel')).filter(function (el) { return el.offsetParent !== null; });
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
  function closeLightbox() { var lb = $('#lightbox'); if (lb.close) lb.close(); else lb.removeAttribute('open'); }

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
    // 복사되면 누른 자리 글자가 잠깐 '복사했어요'로 바뀌었다 돌아옴. 못 하면 알림
    var done = function (ok) {
      var b = $('#copy-mail');
      if (!ok || !b) { toast(ok ? '이메일 주소를 복사했습니다' : '복사하지 못했습니다. 주소를 직접 선택해 주세요'); return; }
      clearTimeout(b._t); b.classList.add('is-done'); b.textContent = '복사했어요';
      b._t = setTimeout(function () { b.classList.remove('is-done'); b.textContent = text; }, 1600);
    };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(fallback()); });
    else done(fallback());
  }

  /* ════════════════ 인터랙션 ════════════════ */

  // 스크롤하면 아래에서 떠오름. 홈은 지금 화면 밖에 있는 것에만 붙여서 첫 화면은 그대로
  var SEL_REVEAL = '.sec-head, .work, .acc, .cap, .hist, .tools li, .methods > div, .closing, .ct-side, .c-body > *, .c-cover, .c-next';
  function revealIn(root, scroller) {
    if (reduce.matches || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { root: scroller || null, rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
    $$(SEL_REVEAL, root).forEach(function (el) {
      if (!scroller && el.getBoundingClientRect().top < window.innerHeight) return;
      var i = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
      el.style.setProperty('--d', Math.min(i, 3) * 70 + 'ms');
      el.classList.add('reveal');
      io.observe(el);
    });
  }

  // 상단 머리: 내리면 숨고 올리면 나타남. 지금 보는 섹션 표시
  function header() {
    var hd = $('.hd'), last = window.scrollY;
    var links = $$('.nav a'), secs = links.map(function (a) { return $(a.getAttribute('href')); });
    function run() {
      var y = window.scrollY;
      hd.classList.toggle('is-scrolled', y > 8);
      if (!$('.nav').classList.contains('is-open')) {
        if (y > 320 && y > last + 4) hd.classList.add('is-hidden');
        else if (y < last - 4 || y < 320) hd.classList.remove('is-hidden');
      }
      last = y;
      var mark = y + window.innerHeight * 0.4, cur = -1;
      secs.forEach(function (s, i) { if (s && s.offsetTop <= mark) cur = i; });
      links.forEach(function (a, i) { a.classList.toggle('is-current', i === cur); if (i === cur) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
    }
    window.addEventListener('scroll', run, { passive: true });
    run();
  }

  // 첫 화면: 제목이 줄마다 올라옴 · 포인터를 따라 은은한 빛
  function hero() {
    var h = $('.hero');
    requestAnimationFrame(function () { h.classList.add('is-ready'); });
    h.addEventListener('pointermove', function (e) {
      if (reduce.matches || e.pointerType !== 'mouse') return;
      var r = h.getBoundingClientRect();
      h.style.setProperty('--lx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
      h.style.setProperty('--ly', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
    });
  }

  // 유리 버튼: 포인터 자리에 빛이 맺히고(--mx --my), 버튼이 포인터 쪽으로 살짝 끌려옴(최대 3px). 떼면 튕기며 제자리
  function glass() {
    var SEL = '.btn, .back-btn, .close-btn, .menu-btn';
    var last = null;
    document.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse' || reduce.matches) return;
      var el = e.target.closest && e.target.closest(SEL);
      if (last && last !== el) { last.style.translate = ''; last = null; }
      if (!el || el.disabled) return;
      var r = el.getBoundingClientRect();
      var x = e.clientX - r.left, y = e.clientY - r.top;
      el.style.setProperty('--mx', x.toFixed(0) + 'px');
      el.style.setProperty('--my', y.toFixed(0) + 'px');
      el.style.translate = ((x / r.width - 0.5) * 6).toFixed(1) + 'px ' + ((y / r.height - 0.5) * 4).toFixed(1) + 'px';
      last = el;
    }, { passive: true });
    document.documentElement.addEventListener('pointerleave', function () { if (last) { last.style.translate = ''; last = null; } });
  }

  /* ── 클릭 · 키보드 연결 ─────────────────────────── */
  function closeMenu() { $('.nav').classList.remove('is-open'); $('.hd').classList.remove('menu-open'); $('.menu-btn').setAttribute('aria-expanded', 'false'); $('.menu-btn').setAttribute('aria-label', '메뉴 열기'); }
  function bind() {
    layer = $('#layer');
    panelScroll = $('#panel-scroll');
    panelScroll.addEventListener('scroll', progress, { passive: true });
    // 대표 이미지 넘겨 보기: 가로 스크롤은 위로 전달되지 않아 capture로 받음
    var cvTick = null;
    document.addEventListener('scroll', function (e) {
      var t = e.target;
      if (t.classList && t.classList.contains('cv-track') && !cvTick) cvTick = requestAnimationFrame(function () { cvTick = null; cvState(t); });
    }, true);
    window.addEventListener('resize', function () { $$('.cv-track').forEach(function (t) { t.scrollLeft = cvIndex(t) * t.clientWidth; }); });

    document.addEventListener('click', function (e) {
      var el = e.target.closest('[data-open], [data-close], [data-zoom], [data-pending], [data-ins], [data-tab], [data-cv], [data-cvstep], [data-filter], .acc-btn, #copy-mail, .wordmark, .nav a, .menu-btn');
      if (!el) return;
      if (el.matches('[data-open]')) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return; // 새 탭 열기는 그대로
        e.preventDefault();
        openProject(el.dataset.open, { push: true, trigger: el });
      } else if (el.matches('[data-close]')) {
        e.preventDefault(); requestClose();
      } else if (el.matches('[data-ins]')) {
        e.preventDefault(); goInsight(el.dataset.ins);
      } else if (el.matches('[data-tab]')) {
        selectTab(el);
      } else if (el.matches('[data-filter]')) {
        if (el.getAttribute('aria-selected') !== 'true') applyFilter(el.dataset.filter, true);
      } else if (el.matches('[data-cv]')) {
        cvGo(el.closest('.cv').querySelector('.cv-track'), Number(el.dataset.cv));
      } else if (el.matches('[data-cvstep]')) {
        var tr = el.closest('.cv').querySelector('.cv-track');
        cvGo(tr, cvIndex(tr) + Number(el.dataset.cvstep));

      } else if (el.matches('[data-zoom]')) {
        openLightbox(el.dataset.zoom, el.dataset.caption, el);
      } else if (el.matches('[data-pending]')) {
        e.preventDefault(); toast(el.dataset.pending + ' 파일은 준비 중입니다');
      } else if (el.matches('.acc-btn')) {
        var acc = el.closest('.acc'), open = !acc.classList.contains('is-open');
        acc.classList.toggle('is-open', open); el.setAttribute('aria-expanded', String(open));
      } else if (el.id === 'copy-mail') {
        copyText(D.site.email);
      } else if (el.matches('.wordmark')) {
        e.preventDefault();
        if (state.open) requestClose();
        window.scrollTo({ top: 0, behavior: reduce.matches ? 'auto' : 'smooth' });
        $('#main').focus({ preventScroll: true });
      } else if (el.matches('.nav a')) {
        closeMenu();
      } else if (el.matches('.menu-btn')) {
        var o = !$('.nav').classList.contains('is-open');
        $('.nav').classList.toggle('is-open', o); $('.hd').classList.toggle('menu-open', o);
        el.setAttribute('aria-expanded', String(o)); el.setAttribute('aria-label', o ? '메뉴 닫기' : '메뉴 열기');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if ($('#lightbox').open) return; // dialog가 직접 닫음
        if (state.open) { e.preventDefault(); requestClose(); }
        else if ($('.nav').classList.contains('is-open')) { closeMenu(); $('.menu-btn').focus(); }
      }
      // 대표 이미지: 넘겨 보기 칸에 포커스가 있으면 좌우 화살표로 넘김
      if ((e.key === 'ArrowRight' || e.key === 'ArrowLeft') && e.target.matches('.cv-track')) {
        e.preventDefault(); cvGo(e.target, cvIndex(e.target) + (e.key === 'ArrowRight' ? 1 : -1));
      }
      // 설계 탭: 좌우 화살표로 옆 탭
      if ((e.key === 'ArrowRight' || e.key === 'ArrowLeft') && e.target.matches('[data-tab]')) {
        var ts = $$('[data-tab]', e.target.parentNode), k = ts.indexOf(e.target) + (e.key === 'ArrowRight' ? 1 : -1);
        var t = ts[(k + ts.length) % ts.length]; selectTab(t); t.focus();
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
  hero();
  header();
  glass();
  revealIn($('#main'));
  var first = slugFromLocation();
  if (first && byId(first)) {
    history.replaceState({ project: byId(first).id }, '', location.href);
    openProject(first, { standalone: true });
  }
})();
