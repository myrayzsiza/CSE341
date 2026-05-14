const fetch = globalThis.fetch;

(async () => {
  try {
    const result = await fetch('http://localhost:3000/contacts/69fc78bd9e4d9f573c38027d', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'TestA',
        lastName: 'Doe',
        email: 'test.a@example.com',
        favoriteColor: 'Red',
        birthday: '1990-01-01'
      })
    });
    console.log('status', result.status);
    console.log(await result.text());
  } catch (err) {
    console.error(err);
  }
})();
