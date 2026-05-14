const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
console.log(process.cwd());
console.log(process.env.MONGODB_URI ? 'FOUND' : 'MISSING');
