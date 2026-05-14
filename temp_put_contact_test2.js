const fetch = globalThis.fetch;

(async () => {
  try {
    const result = await fetch('http://localhost:3000/contacts/6a058966f92feaf9224ab8a2', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'TestB',
        lastName: 'Smith',
        email: 'test.b@example.com',
        favoriteColor: 'Green',
        birthday: '1991-02-02'
      })
    });
    console.log('status', result.status);
    console.log(await result.text());
  } catch (err) {
    console.error(err);
  }
})();
