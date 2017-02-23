angular.module('udemyAdmin', ['ngResource', 'esri.map', 'ngMockE2E']).run(function($httpBackend) {
  $httpBackend.whenGET('/categories').respond(['tutorial', 'hardware', 'graphics']);

var articles = [
    { title: "Arduino Tutorial", categories: ['tutorial', 'hardware'] },
    { title: "After Effects Tutorial", categories: ['tutorial', 'graphics'] },
    { title: "Django Tutorial", categories: ['tutorial'] }
  ];

  $httpBackend.whenGET('/articles').respond(articles);
  $httpBackend.whenPOST('/articles').respond(function(method, url, data) {
    var article = angular.fromJson(data);
    article.categories = article.categories || [];
    articles.push(article);
    return [200, article, {}];
  });

});  