document.addEventListener('DOMContentLoaded', () => {
  const storageKey = 'theme';
  const media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  const getSaved = () => {
    let saved = null;
    try {
      saved = localStorage.getItem(storageKey);
    } catch {}
    if (saved === 'system') {
      try {
        localStorage.removeItem(storageKey);
      } catch {}
      return null;
    }
    return saved === 'dark' || saved === 'light' ? saved : null;
  };

  const getSystemTheme = () => (media && media.matches ? 'dark' : 'light');

  const applyTheme = (theme, persist) => {
    const next = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    document.documentElement.dataset.themePref = next;
    if (persist) {
      try {
        localStorage.setItem(storageKey, next);
      } catch {}
    }
  };

  const applySystem = () => {
    const theme = getSystemTheme();
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.themePref = 'system';
  };

  const updateThemeToggle = () => {
    const button = document.getElementById('theme-toggle');
    if (!button) return;
    const current = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    const isDark = current === 'dark';
    /* Icon visibility is handled in CSS via html[data-theme] */
    button.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    button.setAttribute('aria-label', `Theme: ${current} (click to switch)`);
  };

  const toggleButton = document.getElementById('theme-toggle');
  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      const current = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next, true);
      updateThemeToggle();
    });
  }

  if (media) {
    const onChange = () => {
      if (getSaved()) return;
      applySystem();
      updateThemeToggle();
    };
    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', onChange);
    } else if (typeof media.addListener === 'function') {
      media.addListener(onChange);
    }
  }

  const saved = getSaved();
  if (saved) {
    applyTheme(saved, false);
  } else {
    applySystem();
  }
  updateThemeToggle();

  document.querySelectorAll('img').forEach((img) => {
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
    img.setAttribute('decoding', 'async');
  });

  const copyText = (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(() => legacyCopy(text));
    }
    return legacyCopy(text);
  };

  const legacyCopy = (text) =>
    new Promise((resolve, reject) => {
      const area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(area);
      ok ? resolve() : reject(new Error('copy failed'));
    });

  /* Plain <pre> blocks need a positioned wrapper so the button doesn't scroll with the code */
  document.querySelectorAll('.post .post-content pre:not(.chroma)').forEach((pre) => {
    if (pre.closest('.highlight')) return;
    const wrap = document.createElement('div');
    wrap.className = 'code-wrap';
    pre.parentNode.insertBefore(wrap, pre);
    wrap.appendChild(pre);
  });

  document.querySelectorAll('.post .highlight, .post .code-wrap').forEach((block) => {
    const code = block.querySelector('pre code') || block.querySelector('pre');
    if (!code) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'code-copy';
    button.textContent = '复制';
    button.setAttribute('aria-label', '复制代码');
    let timer = null;
    button.addEventListener('click', () => {
      copyText(code.innerText.replace(/\n$/, ''))
        .then(() => { button.textContent = '已复制'; })
        .catch(() => { button.textContent = '复制失败'; })
        .finally(() => {
          clearTimeout(timer);
          timer = setTimeout(() => { button.textContent = '复制'; }, 1500);
        });
    });
    block.appendChild(button);
  });

  document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    if (!link.hasAttribute('rel')) {
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
});
