angular.module('udemyAdmin')

  .value('pageSize', 1)

  .factory('availableCategories', function($http) {
    // 1
    return $http.get('/categories').then(function(response) {
      return response.data;
    });
  })

  .factory('calculateCategoryPercentage', function(availableCategories) {
    // 2
    return function calculate(articles) {
      var uniqueCategories = [];

      articles.forEach(function(article) {
        article.categories.forEach(function(category) {
          if (uniqueCategories.indexOf(category) == -1) {
            uniqueCategories.push(category);
          }
        });
      });

      // 4
      return availableCategories.then(function(categories) {
        // 5
        return Math.floor(100 * (uniqueCategories.length / categories.length));
      });
    };
  });        