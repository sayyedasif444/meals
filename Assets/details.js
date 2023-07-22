//trigger function onload of page
document.addEventListener('DOMContentLoaded', function (event) {
  var id = window.location.search.split('id=')[1];
  mealDetails(id);
  countFavourite();
});

function mealDetails(id) {
  const xhr = new XMLHttpRequest();
  xhr.open('get', 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id);
  xhr.responseType = 'json';
  xhr.onload = async () => {
    if (xhr.status === 200) {
      if (xhr.response.meals !== null) {
        var data = xhr.response.meals[0];
        document.getElementById('mealName').innerHTML = data.strMeal;
        document.getElementById('mealDescription').innerHTML =
          data.strInstructions;
        document.getElementById('mealArea').innerHTML = data.strArea;
        document.getElementById('mealCategory').innerHTML = data.strCategory;
        document
          .getElementById('mealImage')
          .setAttribute('src', data.strMealThumb);
      } else {
        alert('!!! No Data Found !!!');
        window.location.href = './index.html';
      }
    }
  };
  xhr.send();
}

function countFavourite() {
  var count = 0;
  if (localStorage.getItem('favourite_list')) {
    count = JSON.parse(localStorage.getItem('favourite_list')).length;
  }
  document.getElementById('circleBg').innerHTML = count;
}
