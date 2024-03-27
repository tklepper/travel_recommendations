const btnSearch = document.getElementById('btnSearch');
const btnReset = document.getElementById('btnReset');

function searchLocations() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const resultDiv = document.getElementById('searchResults');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        /* const locations = data.find(item => item.name.toLowerCase() === input); */
        let keys = Object.keys(data);
        let types = keys.filter(e => e.includes(input.toLowerCase()))
        
        types.forEach(type => {
            var locations = data[type];
            console.log(data[type])
            if(type == 'countries') {
                locations = [];
                //resultDiv.innerHTML += '<h2>Countries</h1>';
                data[type].forEach(e => {
                    e.cities.forEach(loc => {
                        locations.push(loc)
                    })
                    
                })
            }
            locations.forEach(loc => {
                console.log(loc)
                let newLocation = `<div class="location-wrapper">`;
                newLocation += `<div class="location-image"><img src="${loc.imageUrl}" /></div>`;
                newLocation += `<div class="location-info">`;
                newLocation += `<div class="location-title">${loc.name}</div>`;
                newLocation += `<div class="location-description">${loc.description}</div>`;
                newLocation += `<button class="location-button">Book Now</button>`;

                newLocation += `</div>`;
                newLocation += `</div>`;
                resultDiv.innerHTML += newLocation;
            })
            
        })

      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
}

function clearResults() {
    const input = document.getElementById('searchInput').value = "";
    const resultDiv = document.getElementById('searchResults');
    resultDiv.innerHTML = '';
}

btnSearch.addEventListener('click', searchLocations);
btnReset.addEventListener('click', clearResults);