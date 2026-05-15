const fs = require('fs');
const path = require('path');

const seedFile = path.join(__dirname, '../sanity/seed.ndjson');
const lines = fs.readFileSync(seedFile, 'utf-8').split('\n');

// Map team members to placeholder images
const teamImages = {
  'team-1': '/images/why-3.png',   // Dr. Arvind Kumar
  'team-2': '/images/why-1.png',   // Priya Sharma
  'team-3': '/images/why-3.png',   // Rahul Desai
  'team-4': '/images/why-1.png',   // Meera Reddy
  'team-5': '/images/why-3.png',   // Vikram Singh
  'team-6': '/images/why-1.png',   // Anjali Gupta
};

// Map market pages to hero images
const marketImages = {
  'marketPage-defence': '/images/defence.png',
  'marketPage-intercity': '/images/civilian.png',
  'marketPage-medical': '/images/hero.png',
  'marketPage-remote': '/images/hero.png',
};

const newLines = lines.map(line => {
  if (!line.trim()) return line;
  try {
    const doc = JSON.parse(line);

    // Patch products
    if (doc._type === 'product' && doc.name === 'Enlite R2') {
      doc.externalImageUrl = '/images/r2-main.png';
      doc.externalGalleryUrls = ['/images/r2-main.png', '/images/solution.png', '/images/aircraft.png'];
    } else if (doc._type === 'product' && doc.name === 'Enlite R3') {
      doc.externalImageUrl = '/images/r3-main.png';
      doc.externalGalleryUrls = ['/images/r3-main.png', '/images/solution.png', '/images/aircraft.png'];
    }

    // Patch team
    if (doc._type === 'team' && teamImages[doc._id]) {
      doc.externalImageUrl = teamImages[doc._id];
    }

    // Patch markets
    if (doc._type === 'marketPage' && marketImages[doc._id]) {
      doc.externalHeroImageUrl = marketImages[doc._id];
    }

    return JSON.stringify(doc);
  } catch {
    return line;
  }
});

fs.writeFileSync(seedFile, newLines.join('\n'));
console.log('Seed patched with external images for products, team, and markets.');
