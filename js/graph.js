/* ============================================================================
   LLM BODHI — Graph rendering & interaction (Cytoscape.js)
   ============================================================================ */

(function () {
  'use strict';

  // Register the fcose layout extension if present (falls back to built-in cose otherwise)
  var HAS_FCOSE = false;
  try {
    if (window.cytoscapeFcose) { cytoscape.use(window.cytoscapeFcose); HAS_FCOSE = true; }
  } catch (e) { /* already registered or unavailable */ }

  // ---- Build Cytoscape elements from GRAPH ----------------------------------
  const elements = [];

  // Cluster compound parent nodes
  Object.entries(CLUSTERS).forEach(([id, c]) => {
    elements.push({ data: { id: 'cluster::' + id, label: c.label, isCluster: true, color: c.color } });
  });

  // Concept nodes
  const RELEASE_VERSION = (typeof RELEASE !== 'undefined' && RELEASE) ? RELEASE.version : null;
  GRAPH.nodes.forEach((n) => {
    elements.push({
      data: {
        id: n.id,
        label: n.label,
        parent: 'cluster::' + n.cluster,
        cluster: n.cluster,
        level: n.level,
        color: CLUSTERS[n.cluster].color,
        isNew: !!(RELEASE_VERSION && n.added === RELEASE_VERSION),
      },
    });
  });

  // Edges
  GRAPH.edges.forEach((e, i) => {
    const rel = RELATIONS[e.r] || RELATIONS['is-a'];
    elements.push({
      data: {
        id: 'e' + i,
        source: e.s,
        target: e.t,
        rel: e.r,
        relLabel: rel.label,
        color: rel.color,
        lineStyle: rel.style,
        isPath: e.r === 'path',
      },
    });
  });

  // ---- Cytoscape instance ---------------------------------------------------
  const cy = cytoscape({
    container: document.getElementById('cy'),
    elements: elements,
    wheelSensitivity: 0.25,
    minZoom: 0.15,
    maxZoom: 3,
    style: [
      {
        selector: 'node[!isCluster]',
        style: {
          'background-color': 'data(color)',
          'label': 'data(label)',
          // white text + dark halo reads on any node colour, in either page theme
          'color': '#ffffff',
          'font-family': 'Manrope, sans-serif',
          'text-outline-color': '#0b1120',
          'text-outline-width': 2.8,
          'font-size': '13.5px',
          'font-weight': 700,
          'text-valign': 'center',
          'text-halign': 'center',
          'text-wrap': 'wrap',
          'text-max-width': '120px',
          'width': 'label',
          'height': 'label',
          'padding': '12px',
          'shape': 'round-rectangle',
          'border-width': 2,
          'border-color': 'rgba(13,19,34,0.55)',
          'transition-property': 'opacity, border-color, border-width',
          'transition-duration': '0.2s',
        },
      },
      // "New this release" — green ring + soft glow so additions stand out
      { selector: 'node[?isNew]', style: {
          'border-width': 3.5, 'border-color': '#4fe08a',
          'overlay-color': '#4fe08a', 'overlay-opacity': 0.1, 'overlay-padding': 5 } },
      {
        selector: 'node[?isCluster]',
        style: {
          'label': 'data(label)',
          'background-color': 'data(color)',
          'background-opacity': 0.09,
          'border-width': 2,
          'border-color': 'data(color)',
          'border-opacity': 0.65,
          'shape': 'round-rectangle',
          'text-valign': 'top',
          'text-halign': 'center',
          'font-family': 'Manrope, sans-serif',
          'font-size': '15px',
          'font-weight': 800,
          'color': 'data(color)', // overridden per-theme by applyGraphTheme()
          'text-margin-y': -8,
          'padding': '26px',
          'text-transform': 'uppercase',
          'letter-spacing': '1px',
        },
      },
      {
        selector: 'edge',
        style: {
          'width': 1.5,
          'line-color': 'data(color)',
          'line-style': 'data(lineStyle)',
          'target-arrow-color': 'data(color)',
          'target-arrow-shape': 'triangle',
          'arrow-scale': 0.9,
          'curve-style': 'bezier',
          'opacity': 0.55,
          'transition-property': 'opacity, width',
          'transition-duration': '0.2s',
        },
      },
      { selector: 'edge[?isPath]', style: { 'width': 3, 'opacity': 0.9, 'line-color': '#fbbf24', 'target-arrow-color': '#fbbf24' } },
      // states — faint dimmed context + strong glowing spotlight on the selection
      { selector: '.faded', style: { 'opacity': 0.2, 'z-index': 1 } },
      { selector: '.faded-edge', style: { 'opacity': 0.1, 'z-index': 1 } },
      { selector: 'node.highlight', style: {
        'border-color': '#fbbf24', 'border-width': 3.5, 'font-size': '14.5px',
        'color': '#ffffff', 'text-outline-width': 0,
        'text-background-color': '#0b1322', 'text-background-opacity': 0.82, 'text-background-shape': 'roundrectangle', 'text-background-padding': 4,
        'overlay-color': '#fbbf24', 'overlay-opacity': 0.07, 'overlay-padding': 4, 'z-index': 10 } },
      { selector: 'edge.highlight', style: { 'opacity': 1, 'width': 4.5, 'z-index': 10 } },
      { selector: 'node.path-active', style: {
        'border-color': '#fbbf24', 'border-width': 5, 'font-size': '20px', 'font-weight': 800,
        'color': '#ffffff', 'text-outline-width': 0, 'text-max-width': '200px',
        'text-background-color': '#0b1322', 'text-background-opacity': 0.95, 'text-background-shape': 'roundrectangle', 'text-background-padding': 7,
        'overlay-color': '#fbbf24', 'overlay-opacity': 0.1, 'overlay-padding': 7, 'z-index': 20 } },
      { selector: 'node.dim', style: { 'opacity': 0.12 } },
    ],
    layout: { name: 'preset' }, // we set positions manually below
  });

  // ---- Layout: fcose (clean cluster separation) with cose fallback -----------
  var fcoseOpts = {
    name: 'fcose',
    quality: 'proof',
    animate: false,
    randomize: true,
    packComponents: true,
    nodeRepulsion: 7000,
    idealEdgeLength: function (edge) { return edge.data('isPath') ? 70 : 90; },
    edgeElasticity: 0.45,
    nodeSeparation: 90,
    gravity: 0.3,
    gravityRange: 3.0,
    gravityCompound: 1.2,
    gravityRangeCompound: 1.5,
    numIter: 2500,
    tile: true,
    padding: 40,
  };
  var coseOpts = {
    name: 'cose', animate: false, nodeRepulsion: 9000, idealEdgeLength: 95,
    edgeElasticity: 120, nestingFactor: 1.1, gravity: 0.6, numIter: 1200,
    randomize: false, componentSpacing: 90, padding: 40,
  };
  function runLayout() {
    cy.layout(HAS_FCOSE ? fcoseOpts : coseOpts).run();
    cy.fit(undefined, 60);
  }
  runLayout();

  // ---- Detail panel ----------------------------------------------------------
  const panel = document.getElementById('panel');
  const nodeById = Object.fromEntries(GRAPH.nodes.map((n) => [n.id, n]));

  function neighborsHtml(id) {
    const out = [];
    GRAPH.edges.forEach((e) => {
      if (e.s === id && nodeById[e.t]) out.push({ dir: '→', other: e.t, rel: e.r });
      else if (e.t === id && nodeById[e.s]) out.push({ dir: '←', other: e.s, rel: e.r });
    });
    if (!out.length) return '';
    const items = out.map((o) => {
      const relLabel = (RELATIONS[o.rel] || {}).label || o.rel;
      const arrowTxt = o.dir === '→' ? relLabel : relLabel + ' (incoming)';
      return `<li><span class="rel-tag">${arrowTxt}</span> <a href="#" data-goto="${o.other}">${nodeById[o.other].label}</a></li>`;
    });
    return `<h4>Connections</h4><ul class="conn-list">${items.join('')}</ul>`;
  }

  // which comparison set (if any) contains this concept
  function compareSetIndexFor(id) {
    const cs = GRAPH.comparisons || [];
    for (let i = 0; i < cs.length; i++) if (cs[i].rows.some((r) => r.id === id)) return i;
    return -1;
  }
  const TABLE_IC = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>';

  function showNode(id) {
    const n = nodeById[id];
    if (!n) return;
    const c = CLUSTERS[n.cluster];
    const cmpIdxFor = compareSetIndexFor(id);
    panel.innerHTML = `
      <button class="panel-close" id="panelClose">×</button>
      <div class="panel-tag" style="--c:${c.color}">${c.label} · Level ${n.level} — ${LEVELS[n.level]}${RELEASE_VERSION && n.added === RELEASE_VERSION ? ` <span class="new-badge">✦ New in ${RELEASE_VERSION}</span>` : ''}</div>
      <h2 style="--c:${c.color}">${n.label}</h2>
      <p class="summary">${n.summary}</p>
      ${cmpIdxFor !== -1 ? `<button class="panel-action" data-compare="${cmpIdxFor}">${TABLE_IC} Compare ${GRAPH.comparisons[cmpIdxFor].title}</button>` : ''}
      ${n.detail ? `<h4>Detail</h4><p>${n.detail}</p>` : ''}
      ${n.whenToUse ? `<h4>When to use</h4><p class="when">${n.whenToUse}</p>` : ''}
      ${n.code ? `<h4>Example</h4><pre><code>${escapeHtml(n.code)}</code></pre>` : ''}
      ${neighborsHtml(id)}
      ${n.refs && n.refs.length ? `<h4>References</h4><ul class="refs">${n.refs.map((r) => `<li><a href="${r.u}" target="_blank" rel="noopener">${r.t} ↗</a></li>`).join('')}</ul>` : ''}
    `;
    panel.classList.add('open');
    document.getElementById('minimap').classList.add('panel-open');
    document.getElementById('panelClose').onclick = closePanel;
    panel.querySelectorAll('[data-goto]').forEach((a) => {
      a.onclick = (ev) => { ev.preventDefault(); focusNode(a.getAttribute('data-goto')); };
    });
    const cmpA = panel.querySelector('[data-compare]');
    if (cmpA) cmpA.onclick = () => openCompare(parseInt(cmpA.getAttribute('data-compare'), 10));
    highlightNeighborhood(id);
    updateHash('concept=' + id);
  }

  function closePanel() {
    const was = panel.classList.contains('open');
    panel.classList.remove('open');
    var mm = document.getElementById('minimap'); if (mm) mm.classList.remove('panel-open');
    clearHighlight();
    if (was) updateHash('');
  }

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // ---- Highlight neighborhood ------------------------------------------------
  function highlightNeighborhood(id) {
    cy.elements().removeClass('faded faded-edge highlight path-active');  // clear any prior selection first
    const node = cy.getElementById(id);
    const hood = node.closedNeighborhood();
    cy.elements().not(hood).addClass('faded');
    cy.edges().not(hood.edges()).addClass('faded-edge');
    hood.nodes().addClass('highlight');
    hood.edges().addClass('highlight');
    node.removeClass('highlight').addClass('path-active');
  }
  function clearHighlight() {
    cy.elements().removeClass('faded faded-edge highlight path-active dim');
  }

  function focusNode(id) {
    const node = cy.getElementById(id);
    cy.animate({ center: { eles: node }, zoom: 1.1 }, { duration: 350 });
    showNode(id);
  }

  // ---- Events ----------------------------------------------------------------
  cy.on('tap', 'node[!isCluster]', (evt) => showNode(evt.target.id()));
  cy.on('tap', (evt) => { if (evt.target === cy) closePanel(); });

  // ---- Search (fuzzy + keyboard navigation) ----------------------------------
  const searchInput = document.getElementById('search');
  const searchResults = document.getElementById('searchResults');
  let srActive = -1; // index of keyboard-highlighted result

  // Subsequence fuzzy score: rewards contiguous runs, early matches, and exact substrings.
  function fuzzyScore(q, text) {
    text = text.toLowerCase();
    const sub = text.indexOf(q);
    let score = sub === -1 ? 0 : (sub === 0 ? 130 : 90 - Math.min(sub, 40));
    let ti = 0, qi = 0, streak = 0, acc = 0;
    while (ti < text.length && qi < q.length) {
      if (text[ti] === q[qi]) { qi++; streak++; acc += 1 + streak * 2; } else streak = 0;
      ti++;
    }
    if (qi === q.length) score += acc; else if (sub === -1) return -1;
    return score;
  }
  function scoreNode(q, n) {
    const l = fuzzyScore(q, n.label);
    if (l > 0) return l + 60;                                  // label matches rank highest
    if (n.summary.toLowerCase().includes(q)) return 3;         // fall back to summary substring
    return -1;
  }

  function renderSearch() {
    const q = searchInput.value.trim().toLowerCase();
    if (!q) { searchResults.classList.remove('open'); searchResults.innerHTML = ''; return; }
    const matches = GRAPH.nodes
      .map((n) => ({ n, s: scoreNode(q, n) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s || a.n.label.length - b.n.label.length)
      .slice(0, 8);
    searchResults.innerHTML = matches.length
      ? matches.map((r, i) =>
          `<div class="sr-item${i === 0 ? ' active' : ''}" role="option" data-goto="${r.n.id}">
             <b>${r.n.label}</b><span>${CLUSTERS[r.n.cluster].label}</span></div>`).join('')
      : '<div class="sr-empty">No matches</div>';
    srActive = matches.length ? 0 : -1;
    searchResults.classList.add('open');
    searchResults.querySelectorAll('[data-goto]').forEach((el) => {
      el.onclick = () => selectSearch(el.getAttribute('data-goto'));
    });
  }
  function selectSearch(id) {
    focusNode(id);
    searchResults.classList.remove('open');
    searchInput.value = '';
    searchInput.blur();
  }
  function moveActive(delta) {
    const items = [...searchResults.querySelectorAll('.sr-item')];
    if (!items.length) return;
    srActive = (srActive + delta + items.length) % items.length;
    items.forEach((el, i) => el.classList.toggle('active', i === srActive));
    items[srActive].scrollIntoView({ block: 'nearest' });
  }
  searchInput.addEventListener('input', renderSearch);
  searchInput.addEventListener('keydown', (e) => {
    if (!searchResults.classList.contains('open')) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); moveActive(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); moveActive(-1); }
    else if (e.key === 'Enter') {
      const items = [...searchResults.querySelectorAll('.sr-item[data-goto]')];
      if (items[srActive]) { e.preventDefault(); selectSearch(items[srActive].getAttribute('data-goto')); }
    }
  });
  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) searchResults.classList.remove('open');
  });

  // ---- Filters: level + cluster + "new only" (one combined predicate) --------
  const activeLevels = new Set([1, 2, 3, 4, 5]);
  const activeClusters = new Set(Object.keys(CLUSTERS));
  let newOnly = false;

  // "New" focus set = the new concepts + their direct neighbours, so additions
  // are shown wired into the existing graph rather than as floating islands.
  const newIds = new Set();
  GRAPH.nodes.forEach((n) => { if (RELEASE_VERSION && n.added === RELEASE_VERSION) newIds.add(n.id); });
  const newFocusIds = new Set(newIds);
  GRAPH.edges.forEach((e) => { if (newIds.has(e.s)) newFocusIds.add(e.t); if (newIds.has(e.t)) newFocusIds.add(e.s); });

  function nodeVisible(n) {
    if (newOnly) return newFocusIds.has(n.id());
    if (!activeLevels.has(n.data('level'))) return false;
    if (!activeClusters.has(n.data('cluster'))) return false;
    return true;
  }
  function applyFilters() {
    cy.batch(() => {
      cy.nodes('[!isCluster]').forEach((n) => {
        if (nodeVisible(n)) n.removeClass('dim').style('display', 'element');
        else { n.addClass('dim'); n.style('display', 'none'); }
      });
      // hide cluster parents that have no visible children
      cy.nodes('[?isCluster]').forEach((p) => {
        const shown = p.children('[!isCluster]').filter((k) => k.style('display') !== 'none');
        p.style('display', shown.length ? 'element' : 'none');
      });
    });
  }

  document.querySelectorAll('.level-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const lvl = parseInt(chip.dataset.level, 10);
      if (activeLevels.has(lvl)) { activeLevels.delete(lvl); chip.classList.remove('active'); }
      else { activeLevels.add(lvl); chip.classList.add('active'); }
      applyFilters();
    });
  });

  // "New this release" chip — toggles showing only newly-added concepts
  const newChip = document.getElementById('newChip');
  if (newChip) {
    const newCount = cy.nodes('[?isNew]').length;
    if (!newCount) { newChip.style.display = 'none'; }
    else {
      newChip.querySelector('.new-count').textContent = newCount;
      newChip.addEventListener('click', () => {
        newOnly = !newOnly;
        newChip.classList.toggle('active', newOnly);
        applyFilters();
        if (newOnly) { const ns = cy.nodes('[!isCluster]').filter((el) => newFocusIds.has(el.id())); if (ns.length) cy.animate({ fit: { eles: ns, padding: 70 } }, { duration: 420 }); }
        else cy.animate({ fit: { eles: cy.elements(':visible'), padding: 40 } }, { duration: 420 });
      });
    }
  }

  // ---- Cluster legend: grouped by learning phase, collapsible, with counts ---
  // The 9 clusters map onto the three phases of the learning arc.
  const CLUSTER_GROUPS = [
    { title: 'Fundamentals',             clusters: ['foundations', 'architecture', 'modeltypes'] },
    { title: 'Multimodal',               clusters: ['multimodal'] },
    { title: 'Adaptation & Fine-Tuning', clusters: ['adaptation', 'peft', 'sft'] },
    { title: 'Alignment & Reasoning',    clusters: ['alignment', 'reasoning'] },
    { title: 'Agents & Retrieval',       clusters: ['agents'] },
    { title: 'Efficiency & Data',        clusters: ['efficiency', 'dataeval'] },
  ];
  const clusterCount = {};
  GRAPH.nodes.forEach((n) => { clusterCount[n.cluster] = (clusterCount[n.cluster] || 0) + 1; });
  const CHEV = '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>';

  const legend = document.getElementById('legend');
  legend.innerHTML = CLUSTER_GROUPS.map((g) => `
    <div class="legend-group">
      <button class="legend-group-head" aria-expanded="true">${CHEV}<span>${g.title}</span></button>
      <div class="legend-group-body">
        ${g.clusters.map((id) => {
          const c = CLUSTERS[id];
          return `<div class="legend-item" data-cluster="${id}">
            <button class="legend-toggle" aria-pressed="true" title="Show / hide ${c.label}"><span class="dot" style="background:${c.color}"></span></button>
            <span class="li-label" title="Zoom to ${c.label}">${c.label}</span>
            <span class="legend-count">${clusterCount[id] || 0}</span>
          </div>`;
        }).join('')}
      </div>
    </div>`).join('');

  // collapse / expand a group
  legend.querySelectorAll('.legend-group-head').forEach((head) => {
    head.onclick = () => {
      const grp = head.parentElement;
      const collapsed = grp.classList.toggle('collapsed');
      head.setAttribute('aria-expanded', String(!collapsed));
    };
  });
  // click a cluster label -> zoom to it
  legend.querySelectorAll('.legend-item .li-label').forEach((el) => {
    el.onclick = () => {
      const cid = el.closest('.legend-item').getAttribute('data-cluster');
      const nodes = cy.nodes(`[cluster = "${cid}"]`);
      if (nodes.length) cy.animate({ fit: { eles: nodes, padding: 80 } }, { duration: 400 });
    };
  });
  // toggle a cluster's swatch -> show / hide that cluster
  legend.querySelectorAll('.legend-toggle').forEach((btn) => {
    btn.onclick = (ev) => {
      ev.stopPropagation();
      const item = btn.closest('.legend-item');
      const cid = item.getAttribute('data-cluster');
      const on = activeClusters.has(cid);
      if (on) { activeClusters.delete(cid); }
      else { activeClusters.add(cid); }
      item.classList.toggle('off', on);
      btn.setAttribute('aria-pressed', String(!on));
      applyFilters();
    };
  });

  // ---- Relation legend -------------------------------------------------------
  const relLegend = document.getElementById('relLegend');
  relLegend.innerHTML = Object.entries(RELATIONS).map(([id, r]) =>
    `<div class="legend-item"><span class="line" style="border-top:2px ${r.style} ${r.color}"></span>${r.label}</div>`
  ).join('');

  // ---- Guided Path walkthrough ----------------------------------------------
  const gp = GRAPH.guidedPath;
  let gpIndex = -1;
  const gpBox = document.getElementById('guidedBox');
  const startBtn = document.getElementById('startPath');

  function startGuided() {
    closePanel();
    if (typeof endDecision === 'function') endDecision();
    gpIndex = 0;
    gpBox.classList.add('open');
    renderGuidedStep();
  }
  function renderGuidedStep() {
    const step = gp.steps[gpIndex];
    clearHighlight();
    // dim all, light the path so far
    cy.elements().addClass('faded');
    cy.edges().addClass('faded-edge');
    gp.steps.forEach((s, i) => {
      if (i <= gpIndex) {
        const node = cy.getElementById(s.id);
        node.removeClass('faded').addClass(i === gpIndex ? 'path-active' : 'highlight');
      }
    });
    cy.edges('[?isPath]').forEach((e) => {
      const si = gp.steps.findIndex((s) => s.id === e.data('source'));
      const ti = gp.steps.findIndex((s) => s.id === e.data('target'));
      if (si > -1 && ti > -1 && ti <= gpIndex) e.removeClass('faded-edge').addClass('highlight');
    });
    const node = cy.getElementById(step.id);
    cy.animate({ center: { eles: node }, zoom: 1.0 }, { duration: 400 });
    gpBox.innerHTML = `
      <div class="fb-head">${gp.title}
        <button class="fb-close" id="gpClose" aria-label="Close">×</button></div>
      <div class="fb-progress">Step ${gpIndex + 1} / ${gp.steps.length}</div>
      <div class="fb-title">${nodeById[step.id].label}</div>
      <p class="fb-note">${step.note}</p>
      <div class="fb-controls">
        <button id="gpPrev" ${gpIndex === 0 ? 'disabled' : ''}>← Prev</button>
        <button id="gpDetail">Open detail</button>
        <button class="accent" id="gpNext">${gpIndex === gp.steps.length - 1 ? 'Finish' : 'Next →'}</button>
      </div>`;
    document.getElementById('gpClose').onclick = endGuided;
    document.getElementById('gpPrev').onclick = () => { if (gpIndex > 0) { gpIndex--; renderGuidedStep(); } };
    document.getElementById('gpDetail').onclick = () => showNode(step.id);
    document.getElementById('gpNext').onclick = () => {
      if (gpIndex === gp.steps.length - 1) { endGuided(); }
      else { gpIndex++; renderGuidedStep(); }
    };
  }
  function endGuided() {
    gpBox.classList.remove('open');
    clearHighlight();
    cy.animate({ fit: { padding: 60 } }, { duration: 400 });
  }
  startBtn.onclick = startGuided;

  // ---- Decision wizard: "Which technique should I use?" ----------------------
  const tree = GRAPH.decisionTree;
  const decisionBox = document.getElementById('decisionBox');
  let dHistory = []; // stack of step keys for back-navigation

  function startDecision() {
    closePanel(); endGuided();
    dHistory = [tree.start];
    renderDecision();
    decisionBox.classList.add('open');
  }
  function renderDecision() {
    const key = dHistory[dHistory.length - 1];
    const step = tree.steps[key];
    const crumbs = dHistory.length > 1 ? `<div class="fb-crumbs">${dHistory.length} question${dHistory.length > 1 ? 's' : ''} in</div>` : '';
    decisionBox.innerHTML = `
      <div class="fb-head">Which technique should I use?
        <button class="fb-close" id="dClose" aria-label="Close">×</button></div>
      <div class="fb-progress">Answer to get a recommendation on the adaptation ladder</div>
      ${crumbs}
      <p class="fb-q">${step.q}</p>
      <div class="fb-answers">
        ${step.a.map((ans, i) => `<button class="fb-answer" data-i="${i}">${ans.label}</button>`).join('')}
      </div>
      <div class="fb-controls" style="margin-top:14px">
        <button id="dBack" ${dHistory.length === 1 ? 'disabled' : ''}>← Back</button>
        <button id="dRestart">Restart</button>
      </div>`;
    decisionBox.querySelectorAll('.fb-answer').forEach((b) => {
      b.onclick = () => chooseAnswer(step.a[parseInt(b.dataset.i, 10)]);
    });
    document.getElementById('dClose').onclick = endDecision;
    document.getElementById('dRestart').onclick = () => { dHistory = [tree.start]; renderDecision(); };
    document.getElementById('dBack').onclick = () => { if (dHistory.length > 1) { dHistory.pop(); renderDecision(); } };
  }
  function chooseAnswer(ans) {
    if (ans.next) { dHistory.push(ans.next); renderDecision(); }
    else if (ans.rec) { renderRecommendation(ans); }
  }
  function renderRecommendation(ans) {
    const n = nodeById[ans.rec];
    const c = CLUSTERS[n.cluster];
    const hasThen = ans.then && tree.steps[ans.then];
    decisionBox.innerHTML = `
      <div class="fb-head">Recommendation
        <button class="fb-close" id="dClose" aria-label="Close">×</button></div>
      <div class="fb-rec" style="--c:${c.color}">
        <div class="rec-label" style="color:${c.color}">${c.label} · Level ${n.level}</div>
        <div class="rec-name">${n.label}</div>
        <div class="rec-why">${ans.why || n.summary}</div>
      </div>
      <div class="fb-controls">
        <button id="dBack">← Back</button>
        <button class="accent" id="dOpen">Open in graph →</button>
        ${hasThen ? `<button id="dThen">Next question →</button>` : `<button id="dRestart">Start over</button>`}
      </div>`;
    document.getElementById('dClose').onclick = endDecision;
    document.getElementById('dBack').onclick = () => renderDecision();
    document.getElementById('dOpen').onclick = () => { endDecision(); focusNode(ans.rec); };
    if (hasThen) document.getElementById('dThen').onclick = () => { dHistory.push(ans.then); renderDecision(); };
    else document.getElementById('dRestart').onclick = () => { dHistory = [tree.start]; renderDecision(); };
    // soft-highlight the recommended node behind the box
    clearHighlight();
    cy.elements().addClass('faded'); cy.edges().addClass('faded-edge');
    cy.getElementById(ans.rec).removeClass('faded').addClass('path-active');
    cy.animate({ center: { eles: cy.getElementById(ans.rec) }, zoom: 0.9 }, { duration: 400 });
  }
  function endDecision() { decisionBox.classList.remove('open'); clearHighlight(); }
  document.getElementById('startDecision').onclick = startDecision;

  // ---- Theme toggle ----------------------------------------------------------
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  const SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  const MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';

  // darken a #rrggbb colour toward black by factor f (0..1) — for readable labels on light bg
  function darken(hex, f) {
    const m = /^#?([0-9a-f]{6})$/i.exec(hex || '');
    if (!m) return hex;
    const n = parseInt(m[1], 16);
    const r = Math.round(((n >> 16) & 255) * f), g = Math.round(((n >> 8) & 255) * f), b = Math.round((n & 255) * f);
    return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
  }

  // Cytoscape canvas can't read CSS vars — restyle theme-sensitive graph elements here.
  function applyGraphTheme(t) {
    const light = t === 'light';
    cy.batch(() => {
      cy.nodes('[?isCluster]').forEach((n) => {
        n.style('color', light ? darken(n.data('color'), 0.62) : n.data('color'));
      });
      cy.nodes('[!isCluster]').style('text-outline-color', light ? '#0f1b33' : '#0b1120');
      const pathCol = light ? '#c2740a' : '#fbbf24';
      cy.edges('[?isPath]').style({ 'line-color': pathCol, 'target-arrow-color': pathCol });
    });
  }

  function setTheme(t) {
    root.setAttribute('data-theme', t);
    try { localStorage.setItem('bodhi-theme', t); } catch (e) {}
    themeBtn.innerHTML = t === 'dark' ? SUN : MOON;
    applyGraphTheme(t);
  }
  setTheme(root.getAttribute('data-theme') || 'dark');
  themeBtn.onclick = () => setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');

  // ---- Collapsible legend dock ----------------------------------------------
  const dockEl = document.getElementById('dock');
  const dockToggleBtn = document.getElementById('dockToggle');   // floating "show" button
  function setDock(collapsed) {
    dockEl.classList.toggle('collapsed', collapsed);
    dockToggleBtn.classList.toggle('show', collapsed);           // show only while collapsed
    try { localStorage.setItem('bodhi-dock', collapsed ? '1' : '0'); } catch (e) { /* ignore */ }
  }
  document.getElementById('dockCollapse').onclick = () => setDock(true);
  dockToggleBtn.onclick = () => setDock(false);
  let dockCollapsed = false;
  try { dockCollapsed = localStorage.getItem('bodhi-dock') === '1'; } catch (e) { /* ignore */ }
  setDock(dockCollapsed);

  // ---- Toast -----------------------------------------------------------------
  const toastEl = document.getElementById('toast');
  let toastTimer = null;
  function toast(msg) {
    toastEl.textContent = msg; toastEl.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2400);
  }

  // ---- Export for agents: whole graph -> one LLM-ready OKF context file -------
  function outgoingEdges(id) { return GRAPH.edges.filter((e) => e.s === id && e.r !== 'path' && nodeById[e.t]); }

  function buildAgentBundle() {
    const order = Object.keys(CLUSTERS);
    const nodes = GRAPH.nodes.slice().sort((a, b) =>
      (a.level - b.level) || (order.indexOf(a.cluster) - order.indexOf(b.cluster)) || a.id.localeCompare(b.id));
    const rel = (r) => (RELATIONS[r] || {}).label || r;

    const out = [];
    out.push('# LLM Bodhi — Knowledge Bundle (Open Knowledge Format, single-file export)');
    out.push('');
    out.push(`> Curated knowledge graph of LLM & fine-tuning concepts. ${nodes.length} concepts, ` +
             `${GRAPH.edges.filter((e) => e.r !== 'path').length} typed relations. Conforms to the spirit of ` +
             'Google Open Knowledge Format v0.1 — each concept has a `type`; relations are typed links.');
    out.push('> Use this as grounding context for an LLM/agent. Concept IDs are stable anchors.');
    out.push('');
    out.push('## Index');
    out.push('');
    nodes.forEach((n) => out.push(`- **${n.label}** (\`${n.id}\`) — ${CLUSTERS[n.cluster].label} · L${n.level} — ${n.summary}`));
    out.push('');

    nodes.forEach((n) => {
      out.push('---');
      out.push('');
      out.push('```yaml');
      out.push(`id: ${n.id}`);
      if (n.type) out.push(`type: ${n.type}`);
      out.push(`title: ${n.label}`);
      out.push(`cluster: ${CLUSTERS[n.cluster].label}`);
      out.push(`level: ${n.level}  # ${LEVELS[n.level]}`);
      out.push('```');
      out.push('');
      out.push(`## ${n.label}`);
      out.push('');
      out.push(`**Summary:** ${n.summary}`);
      out.push('');
      if (n.detail) { out.push(n.detail); out.push(''); }
      if (n.whenToUse) { out.push(`**When to use:** ${n.whenToUse}`); out.push(''); }
      if (n.code) { out.push('**Example:**'); out.push('```python'); out.push(n.code); out.push('```'); out.push(''); }
      const oe = outgoingEdges(n.id);
      if (oe.length) {
        out.push('**Relations:**');
        oe.forEach((e) => out.push(`- ${rel(e.r)} → ${nodeById[e.t].label} (\`${e.t}\`)`));
        out.push('');
      }
      if (n.refs && n.refs.length) {
        out.push('**References:**');
        n.refs.forEach((r) => out.push(`- ${r.t} — ${r.u}`));
        out.push('');
      }
    });
    return out.join('\n');
  }

  function downloadText(filename, text) {
    const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  document.getElementById('exportBtn').onclick = () => {
    const md = buildAgentBundle();
    downloadText('llm-bodhi-knowledge.md', md);
    toast(`Exported ${GRAPH.nodes.length} concepts → llm-bodhi-knowledge.md`);
  };

  // ---- Compare modal: techniques side-by-side across dimensions --------------
  const comparisons = GRAPH.comparisons || [];
  const compareModal = document.getElementById('compareModal');
  const compareCard = document.getElementById('compareCard');
  let cmpIdx = 0;

  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  function renderCompare(idx) {
    cmpIdx = idx;
    const set = comparisons[idx];
    const headCells = set.dimensions.map((d) => `<th>${esc(d.label)}</th>`).join('');
    const bodyRows = set.rows.map((r) => {
      const n = nodeById[r.id];
      const c = n ? CLUSTERS[n.cluster] : { color: '#888' };
      const label = n ? n.label : r.id;
      const cells = set.dimensions.map((d) => `<td>${esc(r[d.key]) || '—'}</td>`).join('');
      return `<tr><th class="cmp-tech" data-goto="${r.id}" tabindex="0">
          <span class="tech-inner"><span class="dot" style="background:${c.color}"></span>${esc(label)}</span></th>${cells}</tr>`;
    }).join('');
    compareCard.innerHTML = `
      <div class="modal-head">
        <div class="cmp-tabs">${comparisons.map((s, i) =>
          `<button class="cmp-tab ${i === idx ? 'active' : ''}" data-i="${i}">${esc(s.title)}</button>`).join('')}</div>
        <button class="fb-close" id="cmpClose" aria-label="Close">×</button>
      </div>
      <p class="cmp-blurb">${esc(set.blurb)}</p>
      <div class="cmp-table-wrap">
        <table class="cmp-table">
          <thead><tr><th class="cmp-corner">Technique</th>${headCells}</tr></thead>
          <tbody>${bodyRows}</tbody>
        </table>
      </div>
      <p class="cmp-foot">Click a technique to open it in the graph.</p>`;
    compareCard.querySelectorAll('.cmp-tab').forEach((t) => {
      t.onclick = () => renderCompare(parseInt(t.dataset.i, 10));
    });
    document.getElementById('cmpClose').onclick = closeCompare;
    compareCard.querySelectorAll('[data-goto]').forEach((el) => {
      const go = () => { closeCompare(); focusNode(el.getAttribute('data-goto')); };
      el.onclick = go;
      el.onkeydown = (e) => { if (e.key === 'Enter') go(); };
    });
    updateHash('compare=' + set.id);
  }
  function openCompare(idx) {
    closePanel(); endGuided(); endDecision();
    if (!comparisons.length) { toast('No comparison data'); return; }
    renderCompare(typeof idx === 'number' && comparisons[idx] ? idx : cmpIdx);
    compareModal.classList.add('open');
  }
  function closeCompare() {
    const was = compareModal.classList.contains('open');
    compareModal.classList.remove('open');
    if (was) updateHash('');
  }
  document.getElementById('compareBtn').onclick = () => openCompare();
  compareModal.onclick = (e) => { if (e.target === compareModal) closeCompare(); };

  // ---- Welcome / onboarding -------------------------------------------------
  const welcomeModal = document.getElementById('welcomeModal');
  const welcomeCard = document.getElementById('welcomeCard');
  const WELCOME_FEATURES = [
    { ic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>',
      t: 'Which technique?', d: 'A wizard that recommends the right adaptation method for your case.' },
    { ic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/></svg>',
      t: 'Guided Path', d: 'Walk a real workflow: base model → SFT → LoRA → DPO → eval → quantize.' },
    { ic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>',
      t: 'Compare', d: 'Side-by-side tables: PEFT, preference optimization, attention, architectures…' },
    { ic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3-3"/></svg>',
      t: 'Search <kbd>f</kbd>', d: 'Fuzzy search; navigate results with <kbd>↑</kbd><kbd>↓</kbd><kbd>↵</kbd>.' },
    { ic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18"/></svg>',
      t: 'Click any node', d: 'Open a detail panel: explanation, when-to-use, code, links, references.' },
    { ic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
      t: 'Light / dark <kbd>t</kbd>', d: 'Toggle theme (top-right). Links are shareable via the URL.' },
  ];
  function renderWelcome() {
    welcomeCard.innerHTML = `
      <div class="modal-head" style="margin-bottom:2px">
        <div class="welcome-head"><span class="om" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M12 6.2C10.4 4.5 6.7 4.6 5.1 7.6 3.3 10.9 5.7 15.9 12 22c6.3-6.1 8.7-11.1 6.9-14.4C17.3 4.6 13.6 4.5 12 6.2Z" fill="currentColor"/><path d="M12 6.2V2.6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><g stroke="#0a3f24" stroke-opacity=".5" stroke-width=".9" stroke-linecap="round"><path d="M12 7.3V20"/><path d="M12 10.1 8.9 8.3"/><path d="M12 10.1 15.1 8.3"/><path d="M12 12.9 8.6 11.3"/><path d="M12 12.9 15.4 11.3"/><path d="M12 15.6 9.2 14.5"/><path d="M12 15.6 14.8 14.5"/></g></svg></span><h2>Welcome to Bodhi Map</h2><span class="wbadge">Innovate with Sanjeev</span></div>
        <button class="fb-close" id="welClose" aria-label="Close">×</button>
      </div>
      <p class="welcome-sub">An interactive map of <b>${GRAPH.nodes.length} concepts</b> from LLM basics to advanced fine-tuning, reasoning, and agents — clusters are colour-coded, and edges show how techniques relate. Here's how to explore:</p>
      <div class="welcome-features">
        ${WELCOME_FEATURES.map((f) => `<div class="welcome-feature"><span class="wf-ic">${f.ic}</span><div><b>${f.t}</b><span>${f.d}</span></div></div>`).join('')}
      </div>
      <div class="welcome-cta">
        <button class="accent" id="welStart">▶ Start the Guided Path</button>
        <button id="welExplore">Explore on my own</button>
      </div>`;
    document.getElementById('welClose').onclick = closeWelcome;
    document.getElementById('welExplore').onclick = closeWelcome;
    document.getElementById('welStart').onclick = () => { closeWelcome(); startGuided(); };
  }
  function openWelcome() {
    closePanel(); endGuided(); endDecision(); closeCompare();
    renderWelcome();
    welcomeModal.classList.add('open');
  }
  function closeWelcome() {
    welcomeModal.classList.remove('open');
    try { localStorage.setItem('bodhi-welcomed', '1'); } catch (e) { /* ignore */ }
  }
  welcomeModal.onclick = (e) => { if (e.target === welcomeModal) closeWelcome(); };
  document.getElementById('helpBtn').onclick = openWelcome;
  // show automatically on first visit (unless arriving via a shared deep link)
  function maybeShowWelcome() {
    let seen = false;
    try { seen = !!localStorage.getItem('bodhi-welcomed'); } catch (e) { /* ignore */ }
    if (!seen && !location.hash) welcomeModal.classList.add('open'), renderWelcome();
  }

  // ---- Deep linking (shareable URL hash: #concept=lora / #compare=peft) ------
  let suppressHash = false;
  function updateHash(frag) {
    if (suppressHash) return;
    try { history.replaceState(null, '', frag ? '#' + frag : location.pathname + location.search); }
    catch (e) { try { location.hash = frag || ''; } catch (_) { /* ignore */ } }
  }
  function applyHash() {
    const h = decodeURIComponent((location.hash || '').replace(/^#/, ''));
    const m = h.match(/^(concept|compare|map)=(.+)$/);
    if (!m) return;
    suppressHash = true;
    if (m[1] === 'concept' && nodeById[m[2]]) focusNode(m[2]);
    else if (m[1] === 'compare') { const i = comparisons.findIndex((c) => c.id === m[2]); if (i !== -1) openCompare(i); }
    else if (m[1] === 'map') applyMap(m[2].split(','), { hash: false });
    suppressHash = false;
  }
  window.addEventListener('hashchange', applyHash);

  // ---- My Map: build your own learning map (pick topics -> saved + shareable) -
  const mapModal = document.getElementById('mapModal');
  const mapCard = document.getElementById('mapCard');
  const mapBtn = document.getElementById('mapBtn');
  const ALL_CLUSTERS = Object.keys(CLUSTERS);
  function syncLegend() {
    document.querySelectorAll('#legend .legend-item').forEach((item) => {
      const cid = item.getAttribute('data-cluster');
      const off = !activeClusters.has(cid);
      item.classList.toggle('off', off);
      const b = item.querySelector('.legend-toggle'); if (b) b.setAttribute('aria-pressed', String(!off));
    });
  }
  function applyMap(clusters, opts) {
    opts = opts || {};
    const set = new Set((clusters || []).filter((c) => CLUSTERS[c]));
    if (!set.size) return;
    activeClusters.clear();
    ALL_CLUSTERS.forEach((c) => { if (set.has(c)) activeClusters.add(c); });
    syncLegend(); applyFilters();
    if (opts.save !== false) { try { localStorage.setItem('bodhi-mymap', [...set].join(',')); } catch (e) {} }
    if (opts.hash !== false) updateHash('map=' + [...set].join(','));
    if (opts.fit !== false) { const vis = cy.nodes('[!isCluster]').filter((n) => set.has(n.data('cluster'))); if (vis.length) cy.animate({ fit: { eles: vis, padding: 55 } }, { duration: 450 }); }
  }
  function clearMap() {
    activeClusters.clear(); ALL_CLUSTERS.forEach((c) => activeClusters.add(c));
    syncLegend(); applyFilters();
    try { localStorage.removeItem('bodhi-mymap'); } catch (e) {}
    updateHash('');
  }
  function copyMapLink(sel) {
    const url = location.origin + location.pathname + '#map=' + sel.join(',');
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(() => toast('Map link copied')).catch(() => prompt('Copy your map link:', url));
    else prompt('Copy your map link:', url);
  }
  function selectedInMap() { return [...mapCard.querySelectorAll('input:checked')].map((i) => i.value); }
  function openMap() {
    let saved = [];
    try { const s = localStorage.getItem('bodhi-mymap'); if (s) saved = s.split(','); } catch (e) {}
    const isOn = (c) => saved.length ? saved.indexOf(c) !== -1 : activeClusters.has(c);
    const rows = ALL_CLUSTERS.map((c) => {
      const cl = CLUSTERS[c], cnt = GRAPH.nodes.filter((n) => n.cluster === c).length;
      return '<label class="mm-row"><input type="checkbox" value="' + c + '"' + (isOn(c) ? ' checked' : '') + '><span class="mm-dot" style="background:' + cl.color + '"></span><span class="mm-name">' + cl.label + '</span><span class="mm-cnt">' + cnt + '</span></label>';
    }).join('');
    mapCard.innerHTML =
      '<button class="mm-close" id="mmClose" aria-label="Close">×</button>' +
      '<h2 class="mm-title">★ Build your learning map</h2>' +
      '<p class="mm-sub">Pick the topics you want to focus on — the graph filters to just your selection. Your map is saved on this device and shareable as a link.</p>' +
      '<div class="mm-list">' + rows + '</div>' +
      '<div class="mm-actions"><button class="btn ghost" id="mmClear" type="button">Clear</button><button class="btn ghost" id="mmShare" type="button">🔗 Share</button><button class="btn primary" id="mmSave" type="button">Save &amp; view</button></div>';
    mapModal.classList.add('open');
  }
  function closeMap() { mapModal.classList.remove('open'); }
  if (mapBtn) mapBtn.onclick = openMap;
  mapModal.onclick = (e) => {
    if (e.target === mapModal || e.target.id === 'mmClose') { closeMap(); return; }
    if (e.target.id === 'mmSave') {
      const sel = selectedInMap();
      if (!sel.length) { toast('Pick at least one topic'); return; }
      applyMap(sel); closeMap(); toast('Saved your map');
    } else if (e.target.id === 'mmShare') {
      const sel = selectedInMap();
      if (!sel.length) { toast('Pick at least one topic'); return; }
      copyMapLink(sel);
    } else if (e.target.id === 'mmClear') {
      clearMap(); closeMap(); toast('Map cleared');
    }
  };

  // ---- Toolbar buttons -------------------------------------------------------
  document.getElementById('fitBtn').onclick = () => cy.animate({ fit: { padding: 60 } }, { duration: 350 });
  document.getElementById('relayoutBtn').onclick = () => { runLayout(); toast('Layout recomputed'); };

  // ---- Minimap (custom canvas overview) --------------------------------------
  const mini = document.getElementById('minimap');
  const miniCanvas = document.getElementById('minimapCanvas');
  const mctx = miniCanvas.getContext('2d');
  const DPR = window.devicePixelRatio || 1;
  let miniT = null;       // {s, ox, oy} model→minimap transform
  let miniRAF = null;

  function sizeMini() {
    const r = mini.getBoundingClientRect();
    miniCanvas.width = Math.max(1, Math.round(r.width * DPR));
    miniCanvas.height = Math.max(1, Math.round(r.height * DPR));
  }
  function accentColor() {
    return getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#fbbf24';
  }
  function drawMini() {
    if (mini.classList.contains('hidden')) return;
    const W = miniCanvas.width, H = miniCanvas.height, pad = 8 * DPR;
    mctx.clearRect(0, 0, W, H);
    const bb = cy.elements().boundingBox();
    if (!isFinite(bb.w) || bb.w === 0 || bb.h === 0) return;
    const s = Math.min((W - 2 * pad) / bb.w, (H - 2 * pad) / bb.h);
    const ox = pad + ((W - 2 * pad) - bb.w * s) / 2 - bb.x1 * s;
    const oy = pad + ((H - 2 * pad) - bb.h * s) / 2 - bb.y1 * s;
    miniT = { s, ox, oy };
    // concept nodes as colour dots
    cy.nodes('[!isCluster]').forEach((n) => {
      if (n.style('display') === 'none') return;
      const p = n.position();
      mctx.fillStyle = n.data('color') || '#888';
      mctx.beginPath();
      mctx.arc(p.x * s + ox, p.y * s + oy, 2.1 * DPR, 0, Math.PI * 2);
      mctx.fill();
    });
    // current viewport rectangle
    const e = cy.extent();
    const rx = e.x1 * s + ox, ry = e.y1 * s + oy, rw = (e.x2 - e.x1) * s, rh = (e.y2 - e.y1) * s;
    const acc = accentColor();
    mctx.fillStyle = 'rgba(251,191,36,0.12)';
    mctx.fillRect(rx, ry, rw, rh);
    mctx.strokeStyle = acc;
    mctx.lineWidth = 1.5 * DPR;
    mctx.strokeRect(rx, ry, rw, rh);
  }
  function scheduleMini() { if (miniRAF) return; miniRAF = requestAnimationFrame(() => { miniRAF = null; drawMini(); }); }
  function miniToModel(clientX, clientY) {
    const r = mini.getBoundingClientRect();
    const px = (clientX - r.left) * DPR, py = (clientY - r.top) * DPR;
    return { x: (px - miniT.ox) / miniT.s, y: (py - miniT.oy) / miniT.s };
  }
  function panMiniTo(model) {
    const z = cy.zoom();
    cy.pan({ x: cy.width() / 2 - model.x * z, y: cy.height() / 2 - model.y * z });
    drawMini();
  }
  let miniDrag = false;
  mini.addEventListener('mousedown', (e) => { if (!miniT) return; miniDrag = true; panMiniTo(miniToModel(e.clientX, e.clientY)); e.preventDefault(); });
  window.addEventListener('mousemove', (e) => { if (miniDrag && miniT) panMiniTo(miniToModel(e.clientX, e.clientY)); });
  window.addEventListener('mouseup', () => { miniDrag = false; });
  cy.on('pan zoom render', scheduleMini);
  window.addEventListener('resize', () => { sizeMini(); drawMini(); });
  function toggleMini() { mini.classList.toggle('hidden'); if (!mini.classList.contains('hidden')) { sizeMini(); drawMini(); } }
  sizeMini(); drawMini();

  // keyboard
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closePanel(); endGuided(); endDecision(); closeCompare(); closeWelcome(); closeMap(); searchResults.classList.remove('open'); }
    if (document.activeElement === searchInput) return;
    if (e.key === 'f') { searchInput.focus(); e.preventDefault(); }
    if (e.key === 't') { setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'); }
    if (e.key === '?' || e.key === 'h') { openWelcome(); }
    if (e.key === 'm') { toggleMini(); }
  });

  // restore state from a shared deep link (#concept=... / #compare=... / #map=...)
  applyHash();
  // restore a saved "My Map" topic filter when not arriving via a deep link
  if (!location.hash) { try { const svMap = localStorage.getItem('bodhi-mymap'); if (svMap) applyMap(svMap.split(','), { save: false, hash: false, fit: false }); } catch (e) {} }
  // first-visit onboarding (skipped when arriving via a shared deep link)
  maybeShowWelcome();

  // expose for debugging
  window._cy = cy;
})();
