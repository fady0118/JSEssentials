const Navlinks = document.querySelectorAll('ul a');
Navlinks.forEach(item=>{
    item.classList.add('roboto-medium');
});

document.addEventListener('DOMContentLoaded',()=>{
    fetch('travel_recommendation_api.json')
    .then(Response=>Response.json())
    .then(data=>{
        console.log(data);
    })
})