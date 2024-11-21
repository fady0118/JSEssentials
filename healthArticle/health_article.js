// 1. Defining object and variables for XMLHttpRequest 
// create a new XMLHttpRequest object 
var xhr = new XMLHttpRequest();
// define the URL of the JSON file
var url = './health_article.json';

// 2. URL definition and request set up
// prepare a GET request to the specified URL
xhr.open('GET', url, true);

// 3. Response type specification
// inform the XMLHttpRequest object that the expected response from the server should be in JSON format.
// set the expected response type to JSON format
xhr.responseType = 'json';

// 4. Handling the 'onload' event
// define what should happen when the data is successfully loaded
xhr.onload = function() {
    // retrieve the articles array from the JSON response.
    var articles = xhr.response.articles;
    // retrieve the HTML element with the ID 'articles' where the fetched content will be displayed.
    var articlesDiv = document.getElementById('articles'); 

    // Iterating through articles and constructing HTML
    articles.forEach(function(article) {
        var articleDiv = document.createElement('div');
        articleDiv.classList.add('article');
        var title = document.createElement('h2');
        title.textContent = article.title;
        var description = document.createElement('p');
        description.textContent = article.description;
        var waysHeader = document.createElement('h3');
        waysHeader.textContent = 'Ways to Achieve:';
        var waysList = document.createElement('ul');
        article.ways_to_achieve.forEach(function(way) {
          var listItem = document.createElement('li');
          listItem.textContent = way;
          waysList.appendChild(listItem);
        });
        var benefitsHeader = document.createElement('h3');
        benefitsHeader.textContent = 'Benefits:';
        var benefitsList = document.createElement('ul');
        article.benefits.forEach(function(benefit) {
          var listItem = document.createElement('li');
          listItem.textContent = benefit;
          benefitsList.appendChild(listItem);
        });
        articleDiv.appendChild(title);
        articleDiv.appendChild(description);
        articleDiv.appendChild(waysHeader);
        articleDiv.appendChild(waysList);
        articleDiv.appendChild(benefitsHeader);
        articleDiv.appendChild(benefitsList);
        articlesDiv.appendChild(articleDiv);
      });
}

// 5. Sending the request
xhr.send();