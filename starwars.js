let starships = [];
let pilots = {};

async function fetch_starships(url = "https://swapi.dev/api/starships") {
    await fetch(url)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            url = data.next;
            starships.push(...data.results);
        })
        .catch(error => console.error('Error:', error));
    // console.log(url)
    //! if (url) await fetch_starships(url);
}

async function fetch_pilot(pilot) {
    // console.log({pilot})
    await fetch(`https://swapi.dev/api/people/${pilot}`)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            pilots[pilot] = data;
        })
        .catch(error => console.error('Error:', error));
}

await fetch_starships();


for (const ship of starships) {
    if (ship.pilots.length) {
        for (const pil_url of ship.pilots) {
            const pilot_num = pil_url.match(/(\d+)/)[0];
            if (!(pilot_num in pilots)) {
                await fetch_pilot(pilot_num);
            }
        }
    }
}

console.log("s len: ", starships.length)
console.log("p len: ", Object.keys(pilots).length)

// console.log(pilots)
