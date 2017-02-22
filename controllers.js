angular.module('udemyAdmin').controller('articleCtrl', function($scope, calculateCategoryPercentage, pageSize, availableCategories, $resource) {

  var Article = $resource('/articles');

  $scope.categories = [];

  availableCategories.then(function(categories) {
    Array.prototype.splice.apply(
      $scope.categories,
      [$scope.categories.length, 0].concat(categories)
    );
  });  

  $scope.articles = Article.query();

  $scope.$watch('articles', function(articles) {
    calculateCategoryPercentage(articles).then(function(percentage) {
      $scope.categoryPercentage = percentage;
    });
  }, true);

  $scope.containsCategory = function(article, category) {
    return article.categories.indexOf(category) >= 0;
  };

  $scope.toggleCategory = function(article, category) {
    var index = article.categories.indexOf(category);

    if (index == -1) {
      article.categories.push(category);
    } else {
      article.categories.splice(index, 1);
    }
  };

  $scope.newTitle = '';

  $scope.addArticle = function() {
   var newArticle = new Article({ title: $scope.newTitle });
    newArticle.$save().then(function(article) {
      $scope.articles.push(article);
    });
  };

  $scope.numArticles = pageSize;
});  