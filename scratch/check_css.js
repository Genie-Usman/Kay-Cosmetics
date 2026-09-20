async function verify() {
  const res = await fetch('http://127.0.0.1:9292/');
  const html = await res.text();
  const match = html.match(/href="([^"]*kay-cosmetics\.css[^"]*)"/);
  if (match) {
    const cssUrl = match[1].startsWith('http') ? match[1] : 'http://127.0.0.1:9292' + match[1];
    const cssRes = await fetch(cssUrl);
    const cssText = await cssRes.text();
    console.log('Crossfade CSS present:', cssText.includes('slide-stack'));
    console.log('Slide 2 opacity transition present:', cssText.includes('opacity 1.3s'));
    console.log('Card gallery after 2.6s present:', cssText.includes('2.6s'));
    console.log('Store status:', res.status);
  }
}
verify().catch(console.error);
