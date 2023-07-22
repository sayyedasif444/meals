document.addEventListener('DOMContentLoaded', function (event) {
  var favouriteList = [];
  if (localStorage.getItem('favourite_list')) {
    favouriteList = JSON.parse(localStorage.getItem('favourite_list'));
  }
  populateMeal(favouriteList);
});

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
        `</td><td class="text-left pl-4 " colspan='1'> <a href="#!" onclick="removeFavourite(` +
        element.id +
        `)" title="Remove"><i class="fa fa-close text-danger"></i></a></td></tr>`;
    });
  } else {
    innerhtml += `<tr><td class="text-center" colspan='2'>No result found</td></tr>`;
  }
  div.innerHTML = innerhtml;
}

function getMealDetails(id) {
  window.location.href = './details.html?id=' + id;
}

function removeFavourite(id) {
  var favouriteList = JSON.parse(localStorage.getItem('favourite_list'));
  favouriteList = favouriteList.filter((ele) => String(ele.id) !== String(id));
  localStorage.setItem('favourite_list', JSON.stringify(favouriteList));
  populateMeal(favouriteList);
}
