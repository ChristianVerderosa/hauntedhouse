/* script.js — $Haunted site logic */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  /* ========= 1) Config ========= */
  // Paste your Solana token mint here:
  const CONTRACT = 'EYqi4PtxF3uE6NB3AmjnEJTy3gKxoy4VCiSfh5vapump'; // e.g., "So11111111111111111111111111111111111111112"

  /* ========= 2) DOM helpers ========= */
  const $ = (id) => document.getElementById(id);
  const yearEl = $('year');
  const caSpan = $('contractAddress');
  const copyBtn = $('copyCaBtn');

  /* ========= 3) Footer year ========= */
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ========= 4) Contract display ========= */
  // If CONTRACT is set, show it in the CA line
  if (CONTRACT && CONTRACT !== 'TBD' && caSpan) {
    caSpan.textContent = 'CA: ' + CONTRACT;
  }

  /* ========= 5) Robust clipboard copy ========= */
  async function copyToClipboard(text) {
    // Try modern Clipboard API first (works on HTTPS or localhost)
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // Fallback for http/file contexts
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.top = '-1000px';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      // Prefer the configured constant; otherwise read from the DOM
      const text = (CONTRACT && CONTRACT !== 'TBD')
        ? CONTRACT
        : (caSpan?.textContent?.replace(/^CA:\s*/,'') || '');

      if (!text) {
        alert('No contract set yet. Edit script.js and set CONTRACT.');
        return;
      }

      const ok = await copyToClipboard(text);
      copyBtn.textContent = ok ? 'Copied!' : 'Copy failed';
      setTimeout(() => (copyBtn.textContent = 'Copy Contract'), 1500);
    });
  }

  /* ========= 6) Countdown to Halloween (Oct 31 @ 00:00 local) ========= */
  // Targets Oct 31 at 00:00 (midnight) of the current year; if already passed, targets next year.
  function getHalloweenTarget() {
    const now = new Date();
    const y = now.getFullYear();
    const t = new Date(y, 9, 31, 0, 0, 0); // Month is 0-indexed (9 = October)
    return now > t ? new Date(y + 1, 9, 31, 0, 0, 0) : t;
  }

  const target = getHalloweenTarget();
  const dd = $('dd'), hh = $('hh'), mm = $('mm'), ss = $('ss');
  const countdownSection = $('countdown');
  const timer = document.querySelector('.timer');

  function pad(n){ return String(n).padStart(2, '0'); }

  function tick() {
    const now = new Date();
    const diff = target - now;

    // If we’ve reached or passed midnight Halloween
    if (diff <= 0) {
      if (timer) timer.style.display = 'none';
      if (countdownSection) {
        countdownSection.innerHTML = "<h3>It's Halloween! 🎃👻</h3>";
      }
      return;
    }

    const s = Math.floor(diff / 1000);
    const d = Math.floor(s / 86400);
    const h = Math.floor((s % 86400) / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;

    if (dd) dd.textContent = pad(d);
    if (hh) hh.textContent = pad(h);
    if (mm) mm.textContent = pad(m);
    if (ss) ss.textContent = pad(sec);
  }

  tick();
  setInterval(tick, 1000);
});
