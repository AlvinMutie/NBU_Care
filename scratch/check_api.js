const fetch = require('node-fetch');

async function testApi() {
  try {
    const res = await fetch('http://localhost:5000/api/health');
    const data = await res.json();
    console.log('API Health:', data);
    
    const resFlash = await fetch('http://localhost:5000/api/flashcards');
    console.log('Flashcards Status:', resFlash.status);
    const dataFlash = await resFlash.json();
    console.log('Flashcards Data:', dataFlash);
  } catch (err) {
    console.error('API Error:', err.message);
  }
}

testApi();
