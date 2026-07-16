let skills = JSON.parse(localStorage.getItem('skills')) || [];
let goals = localStorage.getItem('goals') || '';

document.getElementById('goals').value = goals;
displaySkills();

document.getElementById('skill-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const skill = {
    dimension: document.getElementById('dimension').value,
    name: document.getElementById('skill-name').value,
    level: parseInt(document.getElementById('level').value),
    evidence: document.getElementById('evidence').value,
    date: new Date().toLocaleDateString()
  };
  skills.push(skill);
  localStorage.setItem('skills', JSON.stringify(skills));
  this.reset();
  displaySkills();
});

function displaySkills() {
  const list = document.getElementById('skill-list');
  list.innerHTML = '';
  if(skills.length === 0) {
    list.innerHTML = '<p>No skills added yet.</p>';
    return;
  }
  
  skills.forEach((s, i) => {
    list.innerHTML += `
      <div class="skill-card">
        <b>${s.dimension}</b>: ${s.name} <span class="level">Level: ${s.level}/5</span> <br>
        <small>Evidence: ${s.evidence} | Date: ${s.date}</small>
        <button onclick="deleteSkill(${i})" style="float:right; width:auto; padding:4px 8px; background:red;">X</button>
      </div>
    `;
  });
  updateScore();
}

function updateScore() {
  if(skills.length === 0) return;
  const avg = (skills.reduce((sum, s) => sum + s.level, 0) / skills.length).toFixed(1);
  document.getElementById('overall-score').innerText = `Overall Well-being Score: ${avg}/5`;
}

function deleteSkill(i) {
  skills.splice(i, 1);
  localStorage.setItem('skills', JSON.stringify(skills));
  displaySkills();
}

function saveGoals() {
  goals = document.getElementById('goals').value;
  localStorage.setItem('goals', goals);
  alert('Goals Saved!');
}
