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
    /* Dark mode shows sun (click to switch to light), light mode shows moon (click to switch to dark) */
    button.textContent = isDark ? '☀️' : '🌙';
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

  document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    if (!link.hasAttribute('rel')) {
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
});
