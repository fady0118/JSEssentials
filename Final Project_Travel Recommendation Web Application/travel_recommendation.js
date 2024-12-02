console.log('JavaScript file loaded');

const Navlinks = document.querySelectorAll('ul a');
Navlinks.forEach(item=>{
    item.classList.add('roboto-medium');
});
// search handling function
async function searchKeyword() {
     const userInput = document.getElementById('search').value.toLowerCase();
    if(userInput.length < 3){
        alert('Search input must be at least 3-characters long');
        return;
    }
    try{
            const response = await fetch('travel_recommendation_api.json');
            const data = await response.json();
            const searchResults = searchInData(data,userInput);
            if(searchResults.length > 0){
                console.log(searchResults);
                createRecommendations(searchResults);
            }else{
                alert('No matches found');
            }
    }
    catch(error){
            console.log('Error fetching data',error);
    }
}
// data search function
function searchInData(data,userInput){
    if(userInput.includes('beach')){
        return data.beaches;
    }
    if(userInput.includes('temple')){
        return data.temples;
    }

    let searchCities = data.countries.flatMap(country=>country.cities.filter(city=>city.name.toLowerCase().includes(userInput)));
    let searchTemples = data.temples.filter(temple=>temple.name.toLowerCase().includes(userInput));
    let searchBeaches = data.beaches.filter(beach=>beach.name.toLowerCase().includes(userInput));
    return [...searchCities, ...searchTemples, ...searchBeaches];
}
// Add event listeners
const searchbtn = document.getElementById('searchbtn');
if(searchbtn){
    searchbtn.addEventListener('click',searchKeyword);
}
const searchinput = document.getElementById('search');
if(searchinput){
    searchinput.addEventListener('keydown',(event)=>{
        if(event.key === 'Enter'){
            event.preventDefault();
            searchKeyword();
        }
    })
}


function createRecommendations(searchResults){
    // container element
    const Recommendation_container = document.getElementById('Recommendations');
    // clear old recommendations
    Recommendation_container.innerHTML='';
    // loop through results
    searchResults.forEach(SearchItem=>{
        // create card
        const recommendationCard = document.createElement('div');
        recommendationCard.classList.add('recommendationCard');
        Recommendation_container.appendChild(recommendationCard);
        // image container
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('imgcontainer');
        recommendationCard.append(imgContainer);
        // image
        const image = document.createElement('img');
        image.src=SearchItem.imageUrl;
        image.alt='image';
        imgContainer.appendChild(image);
        // text container
        const titleDiv = document.createElement('div');
        recommendationCard.appendChild(titleDiv);
        // title
        const Title = document.createElement('span');
        Title.classList.add("cardTitle");
        Title.textContent = `${SearchItem.name}`;
        titleDiv.appendChild(Title);
        // description
        const Description = document.createElement('div');
        Description.classList.add("cardDesc");
        Description.textContent = `${SearchItem.description}`;
        titleDiv.appendChild(Description);
        // visitButton
        const visitButton = document.createElement('button');
        visitButton.classList.add("cardVisit");
        visitButton.textContent = 'Visit';
        titleDiv.appendChild(visitButton);
    })
}

// clear search function
const clearbtn = document.getElementById('search');
if(clearbtn){
    clearbtn.addEventListener('click',()=>{
        clearbtn.value="";
    });
}

// form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();// prevent form from submitting the traditional way
        console.log('Form submit event triggered');

        // get the form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // object to store the data
        let formdata = { name: name, email: email, message: message };

        // Retrieve existing data in an array
        let Storageitems = JSON.parse(localStorage.getItem('Storageitems')) || [];
        // push new data to the array
        Storageitems.push(formdata);
        // saving updated array to local storage
        localStorage.setItem('Storageitems', JSON.stringify(Storageitems));

        // display the data
        displayData();
    });
}

// display data function
function displayData(){
    // fetch the stored data
    const storedData = JSON.parse(localStorage.getItem('Storageitems')) || [];
    console.log('fetching stored data', storedData);
    if (storedData){
        console.log('stored data exists');
        // get & clear the displayDiv
        const displayDiv = document.getElementById('displaydata');
        displayDiv.innerHTML="";
        // iterate for all stored data items and display them in the displayDiv
        storedData.forEach(item => {
            const divItem = document.createElement('div');
            divItem.classList.add('dataItem');
            displayDiv.appendChild(divItem);
            divItem.innerHTML = `<p class="userName">${item.name}</p><p class="userEmail">${item.email}</p><p class="userMessage">${item.message}</p>`
        })
    }
}

// call displayData function on page load to display any existing data
if(document.getElementById('displaydata')){
    window.onload = displayData;     
}
