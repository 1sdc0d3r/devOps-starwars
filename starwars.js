const starships = [];
const pilots = {};

async function fetch_starships(url = "https://swapi.dev/api/starships") {
    try {
        const response = await fetch(url);
        const data = await response.json();

        starships.push(...data.results);

        if (data.next) await fetch_starships(data.next);
    } catch (err) {
        console.error("error in fetch_starships(): ", err);
    }
    // await fetch(url)
    //     .then(response => response.json())
    //     .then(data => {
    //         // console.log(data)
    //         url = data.next;
    //         starships.push(...data.results);
    //     })
    //     .catch(error => console.error('Error:', error));
    // console.log(url)
    //! if (url) await fetch_starships(url);
}

async function fetch_pilot(pilot) {
    //! if (pilots[pilot]) return; // prev duplicate fetches - redundant due to Set
    // console.log({pilot})
    try {
        const response = await fetch(`https://swapi.dev/api/people/${pilot}`);
        pilots[pilot] = await response.json();
    } catch (err) {
        console.error(`error fetching pilot ${pilot}: `, err)
    }
    // await fetch(`https://swapi.dev/api/people/${pilot}`)
    //     .then(response => response.json())
    //     .then(data => {
    //         // console.log(data)
    //         pilots[pilot] = data;
    //     })
    //     .catch(error => console.error('Error:', error));
}

await fetch_starships();

// get a list of all pilots then fetch in parallel
const pilotNums = new Set();

// gets the pilot num from the url
const getPilotNum = url => url.match(/(\d+)/)[0];

// I choose to not use {} when only a single line of code needed, imo it looks cleaner for short sections
for (const ship of starships)
    for (const pil_url of ship.pilots)
         pilotNums.add(getPilotNum(pil_url));



await Promise.all([...pilotNums].map(fetch_pilot))

console.log("s len: ", starships.length)
console.log("p len: ", Object.keys(pilots).length)
// console.log("nums: ", pilotNums);
// console.log(pilots['1'])
// console.log(starships)
