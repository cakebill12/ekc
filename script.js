let eCount = 0;
let ePerSecond = 0;
let rebirthCost = 1000;
let upgradeMultiplier = 1.5;

const eButton = document.getElementById('eButton');
const eCountDisplay = document.getElementById('eCount');
const upgradeBtn = document.getElementById('upgradeBtn');
const upgradeMenu = document.getElementById('upgradeMenu');
const closeBtn = document.getElementById('closeBtn');
const upgradesContainer = document.getElementById('upgrades');
const clickSound = document.getElementById('clickSound');
const errorSound = document.getElementById('errorSound');

// Function to handle clicking the "E" button
function handleEButtonClick() {
  eCount++;
  updateECount();
  eButton.classList.add('ePressAnimation'); // Add animation class
  clickSound.play(); // Play click sound
  eButton.addEventListener('animationend', () => {
    eButton.classList.remove('ePressAnimation'); // Remove animation class after animation ends
  });
}

// Add event listener for clicking the "E" button
eButton.addEventListener('click', () => {
  handleEButtonClick();
  if (eCount < rebirthCost) {
    // Play error sound if not enough currency
    errorSound.play();
    // Screen shake effect
    document.body.classList.add('shake-effect');
    setTimeout(() => {
      document.body.classList.remove('shake-effect');
    }, 500);
  }
});

// Add event listener to detect keydown events
document.addEventListener('keydown', (event) => {
  if ((event.key === 'e' || event.key === 'E') && eCount < rebirthCost) {
    handleEButtonClick();
    // Play error sound if not enough currency
    errorSound.play();
    // Screen shake effect
    document.body.classList.add('shake-effect');
    setTimeout(() => {
      document.body.classList.remove('shake-effect');
    }, 500);
  } else if (event.key === 'e' || event.key === 'E') {
    handleEButtonClick();
  }
});

function createUpgradeButton(cost, increase, description) {
  const upgradeBtn = document.createElement('button');
  upgradeBtn.textContent = `${description} (Cost: ${cost} E)`;
  upgradeBtn.className = 'upgradeBtn';
  upgradeBtn.addEventListener('click', () => {
    if (eCount >= cost) {
      eCount -= cost;
      ePerSecond += increase;
      cost *= upgradeMultiplier;
      cost = Math.round(cost); // Round to the nearest integer
      upgradeBtn.textContent = `${description} (Cost: ${cost} E)`;
      updateECount();
    } else {
      // You can remove the popup and add a different effect here
      // For example, screen shake
      document.body.classList.add('shake-effect');
      errorSound.play(); // Play error sound
      setTimeout(() => {
        document.body.classList.remove('shake-effect');
      }, 500);
    }
  });
  return upgradeBtn;
}

// Create 10 upgrades with specified effects
upgrades = [
  { cost: 1, increase: 1, description: 'Homeless Person: +1 E/s' },
  { cost: 10, increase: 10, description: 'Friend: +10 E/s' },
  { cost: 50, increase: 50, description: 'Auto Clicker: +50 E/s' },
  { cost: 75, increase: 1.5, description: 'Better Keyboard: +50% E/s' }, // Updated description
  { cost: 100, increase: 100, description: 'Another Computer: +100 E/s' },
  { cost: 250, increase: 2, description: 'ETech: x2 E/s' },
  { cost: 500, increase: 500, description: 'Factory: +500 E/s' },
  { cost: 1000, increase: 1000, description: 'RUSH E: +1000 E/s' },
  { cost: 2500, increase: 2500, description: 'GOLDEN E: +2500 E/s' },
  { cost: 10000, increase: 10000, description: 'MARKIPLIER: +10000 E/s' }
];

upgrades.forEach((upgrade, index) => {
  const upgradeBtn = createUpgradeButton(upgrade.cost, upgrade.increase, upgrade.description);
  upgradesContainer.appendChild(upgradeBtn);
});

upgradeBtn.addEventListener('click', () => {
  upgradeMenu.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  upgradeMenu.style.display = 'none';
});

function updateECount() {
  eCountDisplay.textContent = `E Count: ${eCount} (E/s: ${ePerSecond.toFixed(1)})`;
}

// Add E per second functionality
setInterval(() => {
  eCount += ePerSecond;
  updateECount();
}, 1000);
