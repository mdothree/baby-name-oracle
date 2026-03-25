const namesDatabase = [
  { name: 'Sophia', gender: 'girl', origin: 'Greek', meaning: 'Wisdom', number: 3, traits: 'Creative, expressive, social', popularity: 1, famous: ['Sophia Loren', 'Sophia Bush'] },
  { name: 'Emma', gender: 'girl', origin: 'Germanic', meaning: 'Whole, universal', number: 5, traits: 'Adventurous, versatile, curious', popularity: 2, famous: ['Emma Watson', 'Emma Stone'] },
  { name: 'Olivia', gender: 'girl', origin: 'Latin', meaning: 'Olive tree', number: 6, traits: 'Nurturing, responsible, peaceful', popularity: 3, famous: ['Olivia Wilde', 'Olivia Rodrigo'] },
  { name: 'Ava', gender: 'girl', origin: 'Latin', meaning: 'Like a bird', number: 1, traits: 'Independent, pioneering, creative', popularity: 4, famous: ['Ava Gardner', 'Ava DuVernay'] },
  { name: 'Isabella', gender: 'girl', origin: 'Hebrew', meaning: 'Devoted to God', number: 9, traits: 'Compassionate, wise, humanitarian', popularity: 5, famous: ['Isabella Rossellini'] },
  { name: 'Liam', gender: 'boy', origin: 'Irish', meaning: 'Strong protector', number: 3, traits: 'Creative, charismatic, optimistic', popularity: 1, famous: ['Liam Neeson', 'Liam Hemsworth'] },
  { name: 'Noah', gender: 'boy', origin: 'Hebrew', meaning: 'Rest, comfort', number: 7, traits: 'Analytical, spiritual, wise', popularity: 2, famous: ['Noah Centineo', 'Noah Schnapp'] },
  { name: 'Oliver', gender: 'boy', origin: 'Latin', meaning: 'Olive tree', number: 6, traits: 'Nurturing, kind, harmonious', popularity: 3, famous: ['Oliver Stone', 'Oliver Queen'] },
  { name: 'James', gender: 'boy', origin: 'Hebrew', meaning: 'Supplanter', number: 8, traits: 'Ambitious, authoritative, successful', popularity: 4, famous: ['James Bond', 'LeBron James'] },
  { name: 'William', gender: 'boy', origin: 'Germanic', meaning: 'Resolute protector', number: 8, traits: 'Leadership, discipline, loyalty', popularity: 5, famous: ['William Shakespeare', 'Prince William'] },
  { name: 'Mia', gender: 'girl', origin: 'Scandinavian', meaning: 'Mine, beloved', number: 5, traits: 'Freedom-loving, versatile, artistic', popularity: 6, famous: ['Mia Farrow', 'Mia Khalifa'] },
  { name: 'Charlotte', gender: 'girl', origin: 'French', meaning: 'Free woman', number: 8, traits: 'Ambitious, responsible, organized', popularity: 7, famous: ['Charlotte Brontë', 'Princess Charlotte'] },
  { name: 'Amelia', gender: 'girl', origin: 'Germanic', meaning: 'Industrious', number: 1, traits: 'Independent, innovative, brave', popularity: 8, famous: ['Amelia Earhart'] },
  { name: 'Harper', gender: 'girl', origin: 'English', meaning: 'Harp player', number: 8, traits: 'Creative, determined, confident', popularity: 9, famous: ['Harper Beckham'] },
  { name: 'Evelyn', gender: 'girl', origin: 'English', meaning: 'Wished for child', number: 5, traits: 'Adventurous, curious, freedom-loving', popularity: 10, famous: ['Evelyn Hall Smith'] },
  { name: 'Lucas', gender: 'boy', origin: 'Greek', meaning: 'Light', number: 3, traits: 'Optimistic, creative, joyful', popularity: 6, famous: ['Lucas Bravo', 'Lucas Hedges'] },
  { name: 'Henry', gender: 'boy', origin: 'Germanic', meaning: 'Ruler of home', number: 4, traits: 'Stable, practical, reliable', popularity: 7, famous: ['Prince Henry', 'Henry Cavill'] },
  { name: 'Alexander', gender: 'boy', origin: 'Greek', meaning: 'Defender of men', number: 1, traits: 'Leader, innovator, brave', popularity: 8, famous: ['Alexander the Great', 'Alexandra'] },
  { name: 'Benjamin', gender: 'boy', origin: 'Hebrew', meaning: 'Son of the right hand', number: 7, traits: 'Intuitive, spiritual, analytical', popularity: 9, famous: ['Benjamin Franklin'] },
  { name: 'Theodore', gender: 'boy', origin: 'Greek', meaning: 'Gift of God', number: 9, traits: 'Compassionate, wise, humanitarian', popularity: 10, famous: ['Theodore Roosevelt'] }
];

function calculateNameNumber(name) {
  const values = { 'A': 1, 'J': 1, 'S': 1, 'B': 2, 'K': 2, 'T': 2, 'C': 3, 'L': 3, 'U': 3, 'D': 4, 'M': 4, 'V': 4, 'E': 5, 'N': 5, 'W': 5, 'F': 6, 'O': 6, 'X': 6, 'G': 7, 'P': 7, 'Y': 7, 'H': 8, 'Q': 8, 'Z': 8, 'I': 9, 'R': 9 };
  const sum = name.toUpperCase().replace(/[^A-Z]/g, '').split('').reduce((total, letter) => total + (values[letter] || 0), 0);
  while (sum > 9 && ![11, 22, 33].includes(sum)) {
    return sum.toString().split('').reduce((s, d) => s + parseInt(d), 0);
  }
  return sum;
}

document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('search-btn');
  const nameInput = document.getElementById('name-input');
  const genderSelect = document.getElementById('gender-select');
  const originSelect = document.getElementById('origin-select');
  const resultsSection = document.getElementById('results-section');
  const newBtn = document.getElementById('new-btn');
  const shareBtn = document.getElementById('share-btn');
  
  populatePopularNames();
  
  searchBtn?.addEventListener('click', searchName);
  nameInput?.addEventListener('keypress', (e) => { if (e.key === 'Enter') searchName(); });
  newBtn?.addEventListener('click', () => { resultsSection.style.display = 'none'; nameInput.value = ''; });
  shareBtn?.addEventListener('click', shareName);
  
  document.querySelectorAll('.quick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      nameInput.value = btn.dataset.name;
      searchName();
    });
  });
});

function searchName() {
  const searchTerm = document.getElementById('name-input').value.trim().toLowerCase();
  const gender = document.getElementById('gender-select').value;
  const origin = document.getElementById('origin-select').value;
  
  let results = namesDatabase;
  
  if (searchTerm) {
    results = results.filter(n => n.name.toLowerCase().includes(searchTerm));
  }
  if (gender) {
    results = results.filter(n => n.gender === gender || n.gender === 'unisex');
  }
  if (origin) {
    results = results.filter(n => n.origin.toLowerCase() === origin);
  }
  
  if (results.length === 0) {
    const name = searchTerm || 'This';
    const genderVal = gender || 'unisex';
    const result = {
      name: searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1),
      gender: genderVal,
      origin: 'Various',
      meaning: 'Name awaiting discovery',
      number: calculateNameNumber(searchTerm),
      traits: 'Unique and meaningful',
      popularity: 'New'
    };
    displayResult(result);
  } else {
    displayResult(results[0]);
  }
}

function displayResult(result) {
  document.getElementById('result-name').textContent = result.name;
  document.getElementById('result-gender').textContent = result.gender;
  document.getElementById('result-origin').textContent = result.origin + ' origin';
  document.getElementById('result-meaning').textContent = `"${result.meaning}"`;
  document.getElementById('result-number').textContent = `#${result.number}`;
  document.getElementById('result-traits').textContent = result.traits;
  document.getElementById('result-popularity').textContent = result.popularity !== 'New' ? `#${result.popularity} in US` : 'Rising';
  
  const famousSection = document.getElementById('famous-section');
  const famousList = document.getElementById('famous-list');
  
  if (result.famous && result.famous.length > 0) {
    famousSection.style.display = 'block';
    famousList.innerHTML = result.famous.map(f => `<li>${f}</li>`).join('');
  } else {
    famousSection.style.display = 'none';
  }
  
  document.getElementById('results-section').style.display = 'block';
  document.getElementById('results-section').scrollIntoView({ behavior: 'smooth' });
}

function populatePopularNames() {
  const girls = namesDatabase.filter(n => n.gender === 'girl').slice(0, 5);
  const boys = namesDatabase.filter(n => n.gender === 'boy').slice(0, 5);
  
  document.getElementById('popular-girls').innerHTML = girls.map((n, i) => 
    `<li><span>${n.name}</span><span class="rank">#${i + 1}</span></li>`
  ).join('');
  
  document.getElementById('popular-boys').innerHTML = boys.map((n, i) => 
    `<li><span>${n.name}</span><span class="rank">#${i + 1}</span></li>`
  ).join('');
}

function shareName() {
  const name = document.getElementById('result-name').textContent;
  const meaning = document.getElementById('result-meaning').textContent;
  const text = `Check out the name ${name}! ${meaning}`;
  
  if (navigator.share) {
    navigator.share({ title: 'Baby Name', text: text, url: window.location.href });
  } else {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  }
}
