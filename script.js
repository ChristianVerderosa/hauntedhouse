// $Haunted site interactivity
(function () {
  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Contract address (paste your token mint here)
  const CONTRACT = 'EYqi4PtxF3uE6NB3AmjnEJTy3gKxoy4VCiSfh5vapump'; 
  const caSpan = document.getElementById('contractAddress');
  if (CONTRACT !== 'TBD' && caSpan) caSpan.textContent = 'CA: ' + CONTRACT;

  // Copy button
  const copyBtn = document.getElementById('copyCaBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        const text = (CONTRACT !== 'TBD') ? CONTRACT : (caSpan?.textContent?.replace('CA: ','') || '');
        if (!text) { alert('No contract set yet. Edit script.js.'); return; }
        await navigator.clipboard.writeText(text);
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = 'Copy Contract', 1500);
      } catch {
        alert('Copy failed. Copy manually.');
      }
    });
  }

  // Countdown to Halloween: Oct 31 @ 00:00 (midnight local time)
  const target = (() => {
    const now = new Date();
    const year = now.getFullYear();
    // Month is 0-indexed: 9 = October
    const t = new Date(year, 9, 31, 0, 0, 0); // Oct 31, midnight local
    return (now > t) ? new Date(year + 1, 9, 31, 0, 0, 0) : t;
  })();

  const id = (x) => document.getElementById(x);
  const dd = id('dd'), hh = id('hh'), mm = id('mm'), ss = id('ss');
  const countdownSection = document.getElementById('countdown');
  const timer = document.querySelector('.timer');

  function pad(n){ return String(n).padStart(2, '0'); }
  function tick(){
    const now = new Date();
    const diff = target - now;

    if (diff <= 0) {
      // Countdown finished
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
})();
