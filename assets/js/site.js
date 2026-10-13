(function () {
  "use strict";

  var root = document.documentElement;

  // ---------- Theme ----------

  function storedTheme() {
    try {
      var t = localStorage.getItem("theme");
      return t === "day" || t === "night" ? t : null;
    } catch (e) {
      return null;
    }
  }

  function syncToggle() {
    var night = root.getAttribute("data-theme") === "night";
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      btn.setAttribute("aria-label", night ? "Switch to day theme" : "Switch to night theme");
    });
  }

  function setTheme(theme, persist) {
    root.setAttribute("data-theme", theme);
    if (persist) {
      try { localStorage.setItem("theme", theme); } catch (e) {}
    }
    syncToggle();
  }

  document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setTheme(root.getAttribute("data-theme") === "night" ? "day" : "night", true);
    });
  });

  // Follow the system setting until the reader picks a theme themselves.
  if (window.matchMedia) {
    var dark = window.matchMedia("(prefers-color-scheme: dark)");
    var onChange = function (e) {
      if (!storedTheme()) setTheme(e.matches ? "night" : "day", false);
    };
    if (dark.addEventListener) dark.addEventListener("change", onChange);
    else if (dark.addListener) dark.addListener(onChange);
  }

  syncToggle();

  // ---------- Journal: topic filter + "Older entries" ----------

  var journal = document.querySelector("[data-journal]");
  if (!journal) return;

  var PAGE = 10;
  var filters = Array.prototype.slice.call(journal.querySelectorAll("[data-topic-filter]"));
  var entries = Array.prototype.slice.call(journal.querySelectorAll("[data-entry]"));
  var countLabel = journal.querySelector("[data-count]");
  var empty = journal.querySelector("[data-empty]");
  var more = journal.querySelector("[data-more]");
  var filterGroup = journal.querySelector("[data-filters]");
  var topic = "All";
  var limit = PAGE;

  function matching() {
    return entries.filter(function (li) {
      return topic === "All" || li.getAttribute("data-topic") === topic;
    });
  }

  function render() {
    var shown = matching();
    entries.forEach(function (li) { li.hidden = true; });
    shown.forEach(function (li, i) { li.hidden = i >= limit; });

    filters.forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-topic-filter") === topic));
    });

    if (countLabel) countLabel.textContent = shown.length + (shown.length === 1 ? " entry" : " entries");
    if (empty) empty.hidden = shown.length > 0;
    if (more) more.hidden = shown.length <= limit;
  }

  function topicFromUrl() {
    var match = /[?&]topic=([^&]+)/.exec(window.location.search);
    var wanted = match ? decodeURIComponent(match[1].replace(/\+/g, " ")) : "All";
    var known = filters.some(function (b) { return b.getAttribute("data-topic-filter") === wanted; });
    return known ? wanted : "All";
  }

  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      topic = btn.getAttribute("data-topic-filter");
      limit = PAGE;
      var url = window.location.pathname + (topic === "All" ? "" : "?topic=" + encodeURIComponent(topic));
      if (window.history && history.replaceState) history.replaceState(null, "", url);
      render();
    });
  });

  if (more) {
    more.querySelector("button").addEventListener("click", function () {
      var first = matching()[limit];
      limit += PAGE;
      render();
      if (first) {
        var link = first.querySelector("a");
        if (link) link.focus();
      }
    });
  }

  if (filterGroup) filterGroup.hidden = false;
  topic = topicFromUrl();
  render();
})();
