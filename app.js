var Dinos = [];
window.onload = async function () {
  let dinoData = await getDinosData();
  setDinosWithData(dinoData);
};

// Found slutionn on Knowledge hub:  https://knowledge.udacity.com/questions/456033
/**
 * @description Read dinos json file and setting the data to Dinos.
 * @returns {Array} Array of dions(json).
 */
const getDinosData = async function () {
  const res = await fetch("./dino.json");
  const jsonData = await res.json();
  return jsonData.Dinos;
};

/**
 * @description Creating Dino Objects and assiging to the array
 * @param {Array} dinoData
 * @returns {number} Array of Dino objects.
 */
const setDinosWithData = function (dinoData) {
  Dinos = dinoData.map(function (dino) {
    return new Dino(dino);
  });
};

// Create Dino Constructor
let Dino = function (dinoObj) {
  this.dino = dinoObj;
  return {
    getSpecies: () => this.dino.species,
    getHeight: () => this.dino.height,
    getWeight: () => this.dino.weight,
    getDiet: () => this.dino.diet,
    getFact: () => this.dino.fact,
  };
};

// Create Human Object
let human = {};

/**
 * @description Setting data entered in tho form to hte humann object.
 */
function setDataFromHtmlForm() {
  human.name = document.getElementById("name").value;
  human.heightFeet = parseInt(document.getElementById("feet").value);
  human.heightDeciInchs = parseInt(document.getElementById("inches").value);
  human.weight = parseInt(document.getElementById("weight").value);
  human.diet = document.getElementById("diet").value;
}

/**
 * @description Comparing Human height with dino.
 * @param {Object: Dino} dino
 * @returns {String} Comparison string regading height.
 */
function compareHeightWith(dino) {
  const humanheightInInches = human.heightFeet * 12 + human.heightDeciInchs;
  const diffrence = dino.getHeight() - humanheightInInches;
  const displayDiff = Math.abs((diffrence * 0.0833).toFixed(2));
  if (diffrence > 0) {
    return `Is ${displayDiff} feet Taller`;
  } else {
    return `Is ${displayDiff} feet Shoter`;
  }
}

/**
 * @description Comparing Human weight with dion in Lbs.
 * @param {Object: Dino} dino
 * @returns {String} Comparison string regading weight.
 */
function compareWeightWith(dino) {
  const humanWeight = human.weight;
  const diffrennce = dino.getWeight() - humanWeight;
  if (diffrennce > 0) {
    return `Weighs ${Math.abs(diffrennce)} lbs More`;
  } else {
    return `Weighs ${Math.abs(diffrennce)} lbs Less`;
  }
}

/**
 * @description Comparing Human Diet with dion.
 * @param {Object: Dino} dino
 * @returns {String} Comparison string regading diet.
 */
function compareDietWith(dino) {
  //   const humanDiet = ;
  if (human.diet.toUpperCase() === dino.getDiet().toUpperCase()) {
    return `Follows same diet, ${dino.getDiet()}`;
  } else {
    return `Follows another diet, ${dino.getDiet()}`;
  }
}

/**
 * @description Generate Tiles for each Dino in Array and add tiles to DOM or Hide the title
 * @param {boolean} display
 */
function displayGrid(display) {
  const grid = document.getElementById("grid");
  if (display) {
    Dinos.forEach((dino, index) => {
      compareHeightWith(dino);
      if (index === 4) {
        grid.innerHTML += `<div class="grid-item">
        <h3>${human.name}(You)</h3>
        <img src="./images/human.png" />
        <ul>
            <li>${human.heightFeet + "." + human.heightDeciInchs} Feet</li>
            <li>${human.weight + "lbs"}</li>
            <li>${human.diet}</li>
        </ul>
        <p>You</p>
      </div>`;
      }
      grid.innerHTML += `<div class="grid-item">
        <h3>${dino.getSpecies()}</h3>
        <img src="./images/${dino.getSpecies().toLowerCase()}.png" />
        <ul>
            <li>${compareHeightWith(dino)}</li>
            <li>${compareWeightWith(dino)}</li>
            <li>${compareDietWith(dino)}</li>
        </ul>
        <p>${dino.getFact()}</p>
      </div>`;
    });
  } else {
    grid.innerHTML = "";
  }
}

/**
 * @description hides/shows form from screen
 * @param {boolean} display
 */
function hideForm(hide) {
  let form = document.getElementById("dino-compare");
  form.style.display = hide ? "none" : "block";
}

/**
 * @description hides/shows back button (Compare another).
 * @param {boolean} display
 */
function showBackButton(shown) {
  document.getElementById("back").style.display = shown ? "inline" : "none";
}

/**
 * @description Event listener: On button click, prepare and display infographic
 */
document.getElementById("btn").addEventListener("click", function () {
  setDataFromHtmlForm();
  showBackButton(true);
  hideForm(true);
  displayGrid(true);
});

/**
 * @description Event listener: On button click compare another, go back to form.
 */
document.getElementById("back").addEventListener("click", function () {
  showBackButton(false);
  hideForm(false);
  displayGrid(false);
});
