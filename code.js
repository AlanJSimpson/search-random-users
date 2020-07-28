let tabPerson = null;
let textInput = null;
let allPersons = [];
let filterList = [];
let tabStatistic = null;
let countPerson = 0;
let botao = document.querySelector("#botao-buscar");
window.addEventListener("load", () => {
  tabPerson = document.querySelector("#persons");
  countPersons = document.querySelector("#persons");
  textInput = document.querySelector("#name");
  tabStatistic = document.querySelector("#statistic");

  fetchPersons();
  alterInput();
});

//Requisição em uma api que gera usuários randomicos.
async function fetchPersons() {
  const res = await fetch(
    "https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo"
  );
  const json = await res.json();
  allPersons = json.results.map((person) => {
    return {
      name: `${person.name.first} ${person.name.last}`,
      age: person.dob.age,
      picture: person.picture.thumbnail,
      gender: person.gender,
    };
  });
  render();
}

function alterInput() {
  textInput.addEventListener("input", (e) => {
    let nameSearch = e.target.value;
    filterList = allPersons
      .filter((person) => {
        if (person.name.toLowerCase().includes(nameSearch.toLowerCase())) {
          return true;
        } else {
          return false;
        }
      })
      .sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    if (e.target.value != 0) {
      return botao.removeAttribute("disabled");
    } else {
      return botao.setAttribute("disabled", "disabled");
    }
  });

  render();
}

function render() {
  renderFilterList();
}

function renderFilterList() {
  textInput.addEventListener("keydown", (e) => {
    var key = e.which;
    if (key == 13 && textInput.value.length != 0) {
      e.preventDefault();
      filtered();
    } else {
      return;
    }
  });
  botao.addEventListener("click", filtered);

  function filtered() {
    let personsHTML = "<div>";
    let textFilter = document.querySelector("#p-filter");
    filterList.forEach((person) => {
      const { name, age, picture } = person;

      const personHTML = `    
                <div class = 'person'>
                <img src="${person.picture}" class="thumbmail"> 
                <p>${person.name}, ${person.age} anos</p>
                </div>
                `;
      personsHTML += personHTML;
    });
    countPerson = filterList.length;
    textFilter.innerHTML = `<p> ${countPerson} usuário(s) encontrado(s)</p>`;
    personsHTML += "</div>";
    tabPerson.innerHTML = personsHTML;
    renderStatistic();
  }
}

function renderStatistic() {
  let male = 0;
  let female = 0;
  let ageSum = 0;
  let textStatistics = document.querySelector("#p-statistic");
  filterList.forEach((person) => {
    if (person.gender === "male") {
      male++;
    } else {
      female++;
    }
    ageSum += person.age;
  });
  tabStatistic.innerHTML = `<ul class = "statistic-list">
        <li>Sexo masculino: ${male}</li>
        <li>Sexo feminino: ${female}</li>
        <li>Soma das idades: ${ageSum}</li>
        <li>Média das idades ${(ageSum / (male + female)).toFixed(2)}</li>
    </ul>`;
  textStatistics.innerHTML = "Estatística";
}
