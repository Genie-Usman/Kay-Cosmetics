fetch('http://127.0.0.1:9292/')
  .then(r => r.text())
  .then(html => {
    const match = html.match(/href="([^"]*kay-cosmetics\.css[^"]*)"/);
    if (!match) {
      console.log('kay-cosmetics.css link not found');
      return;
    }
    const cssUrl = new URL(match[1], 'http://127.0.0.1:9292/').href;
    console.log('Found CSS URL:', cssUrl);
    return fetch(cssUrl).then(r => r.text()).then(css => {
      console.log('Contains transform 0.6s:', css.includes('transform 0.6s'));
      console.log('Contains opacity 0.6s:', css.includes('opacity 0.6s'));
      console.log('Contains left 1.2s:', css.includes('left 1.2s'));
      console.log('Contains background-color 0.4s:', css.includes('background-color 0.4s'));
      console.log('Contains opacity 0.45s:', css.includes('opacity 0.45s'));
    });
  })
  .catch(console.error);
