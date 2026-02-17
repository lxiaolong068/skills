import path from 'path';

const targetDir = '/Users/user/project';
const filePath = '/Users/user/project/src/pages/index.html';
const destFile = '/Users/user/project/public/images/unsplash/nature/123.jpg';

const relPath = path.relative(path.dirname(filePath), destFile);
console.log('Relative path:', relPath);
