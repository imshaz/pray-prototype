/* ============================================================================
   Pray Charleston prototype — interaction layer (simulation only)
   All actions are faked client-side. No network, no persistence.
   ========================================================================= */
(function () {
  'use strict';

  /* ---- Notes toggle (client explainer annotations) --------------------- */
  var NOTES_KEY = 'pc_notes_on';
  function applyNotes(on) {
    document.body.classList.toggle('notes-on', on);
    var t = document.querySelector('[data-notes-toggle]');
    if (t) t.setAttribute('aria-pressed', on ? 'true' : 'false');
    try { localStorage.setItem(NOTES_KEY, on ? '1' : '0'); } catch (e) {}
  }
  function initNotes() {
    var stored = '1';
    try { var s = localStorage.getItem(NOTES_KEY); if (s !== null) stored = s; } catch (e) {}
    applyNotes(stored === '1');
    var t = document.querySelector('[data-notes-toggle]');
    if (t) t.addEventListener('click', function () {
      applyNotes(!document.body.classList.contains('notes-on'));
    });
  }

  /* ---- Persona switcher ------------------------------------------------ */
  // Each persona maps to its home page. Selecting one navigates there.
  var PERSONA_HOME = {
    'public':   'public-request.html',
    'admin':    'admin-dashboard.html',
    'leader':   'leader.html',
    'recorder': 'recorder.html',
    'prayer':   'prayer.html'
  };
  function initPersona() {
    var sel = document.querySelector('[data-persona]');
    if (!sel) return;
    sel.addEventListener('change', function () {
      var dest = PERSONA_HOME[sel.value];
      if (dest) window.location.href = dest;
    });
  }

  /* ---- Mobile sidebar -------------------------------------------------- */
  function initMenu() {
    var btn = document.querySelector('[data-menu-btn]');
    var sb = document.querySelector('.sidebar');
    if (!btn || !sb) return;
    btn.addEventListener('click', function () { sb.classList.toggle('is-open'); });
    document.addEventListener('click', function (e) {
      if (window.innerWidth > 860) return;
      if (sb.classList.contains('is-open') && !sb.contains(e.target) && !btn.contains(e.target))
        sb.classList.remove('is-open');
    });
  }

  /* ---- Drawer (open by id) --------------------------------------------- */
  function openDrawer(id) {
    var d = document.getElementById(id);
    var scrim = document.querySelector('[data-scrim]');
    if (!d) return;
    d.classList.add('is-open');
    if (scrim) scrim.classList.add('is-open');
  }
  function closeDrawers() {
    document.querySelectorAll('.drawer.is-open').forEach(function (d) { d.classList.remove('is-open'); });
    var scrim = document.querySelector('[data-scrim]');
    if (scrim) scrim.classList.remove('is-open');
  }

  /* ---- Modal (open by id) ---------------------------------------------- */
  function openModal(id) { var m = document.getElementById(id); if (m) m.classList.add('is-open'); }
  function closeModals() { document.querySelectorAll('.modal.is-open').forEach(function (m) { m.classList.remove('is-open'); }); }

  /* ---- Toast ----------------------------------------------------------- */
  var CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';
  function toast(msg) {
    var wrap = document.querySelector('.toast-wrap');
    if (!wrap) { wrap = document.createElement('div'); wrap.className = 'toast-wrap'; document.body.appendChild(wrap); }
    var el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = CHECK + '<span>' + msg + '</span>';
    wrap.appendChild(el);
    setTimeout(function () { el.style.transition = 'opacity .3s, transform .3s'; el.style.opacity = '0'; el.style.transform = 'translateY(10px)'; }, 2600);
    setTimeout(function () { el.remove(); }, 2950);
  }

  /* ---- Tabs (data-tab-group / data-tab / data-panel) ------------------- */
  function initTabs() {
    document.querySelectorAll('[data-tab-group]').forEach(function (group) {
      var tabs = group.querySelectorAll('[data-tab]');
      tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          var target = tab.getAttribute('data-tab');
          tabs.forEach(function (t) { t.classList.toggle('is-on', t === tab); });
          var scope = group.getAttribute('data-tab-scope');
          var root = scope ? document.querySelector(scope) : document;
          root.querySelectorAll('[data-panel]').forEach(function (p) {
            p.style.display = (p.getAttribute('data-panel') === target) ? '' : 'none';
          });
        });
      });
    });
    // Plain tab bars (no data-tab-group). Switch active state, and — when the bar
    // declares data-filter-target — actually filter rows by their data-stage.
    document.querySelectorAll('.tabs:not([data-tab-group])').forEach(function (bar) {
      var tabs = bar.querySelectorAll('.tab');
      var targetSel = bar.getAttribute('data-filter-target');
      tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          tabs.forEach(function (t) { t.classList.toggle('is-on', t === tab); });
          if (!targetSel) return;
          var target = document.querySelector(targetSel);
          if (!target) return;
          var want = tab.getAttribute('data-filter') || 'all';
          target.querySelectorAll('[data-stage]').forEach(function (row) {
            var stage = row.getAttribute('data-stage');
            row.style.display = (want === 'all' || stage === want) ? '' : 'none';
          });
        });
      });
    });
  }

  /* ---- Segmented / sub-filter (visual only) ---------------------------- */
  function initSeg() {
    document.querySelectorAll('.seg').forEach(function (seg) {
      seg.querySelectorAll('button').forEach(function (b) {
        b.addEventListener('click', function () {
          seg.querySelectorAll('button').forEach(function (x) { x.classList.toggle('is-on', x === b); });
        });
      });
    });
  }

  /* ---- Checkbox card visual state -------------------------------------- */
  function initCheckCards() {
    document.querySelectorAll('.check input[type=checkbox]').forEach(function (i) {
      var card = i.closest('.check');
      var sync = function () { if (card) card.classList.toggle('is-on', i.checked); };
      i.addEventListener('change', sync); sync();
    });
  }

  /* ---- Generic data-action dispatch ------------------------------------ */
  // data-action="drawer:ID" | "modal:ID" | "close" | "toast:Message text"
  function initActions() {
    document.addEventListener('click', function (e) {
      var el = e.target.closest('[data-action]');
      if (!el) return;
      var raw = el.getAttribute('data-action');
      var parts = raw.split(':');
      var verb = parts.shift();
      var arg = parts.join(':');
      if (verb === 'drawer') { openDrawer(arg); }
      else if (verb === 'modal') { openModal(arg); }
      else if (verb === 'close') { closeModals(); closeDrawers(); }
      else if (verb === 'toast') { e.preventDefault(); toast(arg || 'Done'); }
      else if (verb === 'toast-close') { e.preventDefault(); toast(arg || 'Done'); closeModals(); closeDrawers(); }
      else if (verb === 'nav') { window.location.href = arg; }
    });
    var scrim = document.querySelector('[data-scrim]');
    if (scrim) scrim.addEventListener('click', function () { closeDrawers(); });
    document.querySelectorAll('.modal').forEach(function (m) {
      m.addEventListener('click', function (e) { if (e.target === m) closeModals(); });
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeModals(); closeDrawers(); } });
  }

  /* ---- Public prayer request form simulation --------------------------- */
  function initPublicForm() {
    var form = document.querySelector('[data-prayer-form]');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var formView = document.querySelector('[data-form-view]');
      var doneView = document.querySelector('[data-done-view]');
      if (formView && doneView) {
        formView.style.display = 'none';
        doneView.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
    var again = document.querySelector('[data-form-reset]');
    if (again) again.addEventListener('click', function () {
      var formView = document.querySelector('[data-form-view]');
      var doneView = document.querySelector('[data-done-view]');
      form.reset();
      if (formView && doneView) { doneView.style.display = 'none'; formView.style.display = 'block'; }
    });
  }

  /* ---- In-page sidebar nav (single-page persona views) ----------------- */
  // Sidebar items that link to an on-page anchor set themselves active on click.
  function initAnchorNav() {
    var items = document.querySelectorAll('.nav__item[href^="#"]');
    items.forEach(function (a) {
      a.addEventListener('click', function () {
        items.forEach(function (x) { x.classList.toggle('is-active', x === a); });
        var sb = document.querySelector('.sidebar');
        if (sb && window.innerWidth <= 860) sb.classList.remove('is-open');
      });
    });
  }

  /* ---- Print ----------------------------------------------------------- */
  function initPrint() {
    document.querySelectorAll('[data-print]').forEach(function (b) {
      b.addEventListener('click', function (e) { e.preventDefault(); window.print(); });
    });
  }

  /* ---- Boot ------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', function () {
    initNotes(); initPersona(); initMenu(); initTabs(); initSeg();
    initCheckCards(); initActions(); initPublicForm(); initAnchorNav(); initPrint();
  });

  // expose a couple for inline use if ever needed
  window.PC = { toast: toast, openModal: openModal, openDrawer: openDrawer };
})();
