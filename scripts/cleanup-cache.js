// scripts/cleanup-cache.js
const fs = require('fs');
const path = require('path');

const notesDir = path.join(process.cwd(), 'public', 'notes-content');
const cacheDir = path.join(process.cwd(), 'public', 'themes-cache');

if (!fs.existsSync(cacheDir)) {
  console.log('No cache directory found');
  process.exit(0);
}

const markdownFiles = fs.readdirSync(notesDir).filter(f => f.endsWith('.md'));
const validSlugs = markdownFiles.map(f => f.replace(/\.md$/, ''));

const cachedFiles = fs.readdirSync(cacheDir).filter(f => f.endsWith('.html'));

let deleted = 0;
cachedFiles.forEach(file => {
  const slug = file.replace(/\.html$/, '');
  if (!validSlugs.includes(slug)) {
    fs.unlinkSync(path.join(cacheDir, file));
    console.log(`🗑️ Deleted: ${file}`);
    deleted++;
  }
});

console.log(`✅ Cleanup complete. Deleted ${deleted} orphaned cache files.`);