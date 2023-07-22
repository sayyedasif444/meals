//storigin the data for local references
var dataSet = [];

//trigger function onload of page
document.addEventListener('DOMContentLoaded', function (event) {
  getMeals('');
});

//trigger when user types on search box
document.getElementById('search').addEventListener('input', (e) => {
  getMeals(e.currentTarget.value);
});

document.getElementById('searchbtn').addEventListener('click', (e) => {
  getMeals(document.getElementById('search').value);
});

function getMeals(search) {
  const xhr = new XMLHttpRequest();
  xhr.open(
    'get',
    'https://www.themealdb.com/api/json/v1/1/search.php?s=' + search
  );
  xhr.responseType = 'json';
  xhr.onload = async () => {
    if (xhr.status === 200) {
      if (xhr.response.meals !== null) {
        var result = xhr.response.meals.map((ele) => {
          var fav = false;
          if (localStorage.getItem('favourite_list')) {
            var favouriteList = JSON.parse(
              localStorage.getItem('favourite_list')
            );
            favouriteList.forEach((element) => {
              if (element.id === ele.idMeal) {
                fav = true;
              }
            });
          }
          return {
            id: ele.idMeal,
            name: ele.strMeal,
            desc: ele.strInstructions,
            image: ele.strMealThumb,
            favourite: fav,
            area: ele.strArea,
            category: ele.strCategory,
          };
        });
        populateMeal(result);
      } else {
        populateMeal([]);
      }
    }
  };
  xhr.send();
}

function populateMeal(result) {
  // localStorage.setItem('meal_data', JSON.stringify(result));
  dataSet = result;
  var innerhtml = '';
  var div = document.getElementById('mealData');
  if (result.length > 0) {
    result.forEach((element) => {
      var icon = '<i class="fa fa-plus"></i>';
      innerhtml +=
        `<tr ><td class="text-left pl-4  clickable"  onclick='getMealDetails(` +
        element.id +
        `)' colspan='1'>` +
        element.name +
        `</td><td class="text-left pl-4 " colspan='1'>` +
        (!element.favourite
          ? '<a href="#!" title="Add" onclick="addFavourite(' +
            element.id +
            ')"><i class="fa fa-plus text-white"></i></a>'
          : '<i class="fa fa-check text-success"></i> <a href="#!" onclick="removeFavourite(' +
            element.id +
            ')" title="Remove"><i class="fa fa-close text-danger"></i></a>') +
        `</td></tr>`;
    });
  } else {
    innerhtml += `<tr><td class="text-center" colspan='2'>No result found</td></tr>`;
  }
  div.innerHTML = innerhtml;
  countFavourite();
}

function getMealDetails(id) {
  window.location.href = './details.html?id=' + id;
}

function addFavourite(id) {
  if (localStorage.getItem('favourite_list')) {
    var favouriteList = JSON.parse(localStorage.getItem('favourite_list'));
    var newFav = dataSet.filter((ele) => String(ele.id) === String(id));
    if (newFav.length > 0) {
      favouriteList.push(newFav[0]);
    }
    localStorage.setItem('favourite_list', JSON.stringify(favouriteList));
  } else {
    var favouriteList = [];
    var newFav = dataSet.filter((ele) => String(ele.id) === String(id));
    if (newFav.length > 0) {
      favouriteList.push(newFav[0]);
    }
    localStorage.setItem('favourite_list', JSON.stringify(favouriteList));
  }
  dataSet = dataSet.map((ele) => {
    if (String(ele.id) === String(id)) {
      return { ...ele, favourite: true };
    }
    return ele;
  });
  populateMeal(dataSet);
}

function removeFavourite(id) {
  var favouriteList = JSON.parse(localStorage.getItem('favourite_list'));
  favouriteList = favouriteList.filter((ele) => String(ele.id) !== String(id));
  localStorage.setItem('favourite_list', JSON.stringify(favouriteList));
  dataSet = dataSet.map((ele) => {
    if (String(ele.id) === String(id)) {
      return { ...ele, favourite: false };
    }
    return ele;
  });
  populateMeal(dataSet);
}

function countFavourite() {
  var count = 0;
  if (localStorage.getItem('favourite_list')) {
    count = JSON.parse(localStorage.getItem('favourite_list')).length;
  }
  document.getElementById('circleBg').innerHTML = count;
}
