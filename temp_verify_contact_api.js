const fetch = globalThis.fetch;

(async () => {
  try {
    const res = await fetch('http://localhost:3000/contacts');
    console.log('GET /contacts status', res.status);
    const body = await res.text();
    console.log(body);
  } catch (err) {
    console.error(err);
  }
})();
