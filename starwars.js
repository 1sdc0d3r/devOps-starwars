import fetch from 'node-fetch';
const starships = [];
const pilots = {};


async function fetch_starships(url = "https://swapi.dev/api/starships") {
    try  {
        // url_page++
        // console.log(`fetching ${url}`)
        //* attempt to fetch next paginated url before prior fetch
        // await fetch_starships(url+`/?page=${url_page}`)

        const response = await fetch(url);
        const data = await response.json();

        //* Put this here to decrease fetch time needed
        if (data.next) await fetch_starships(data.next);

        starships.push(...data.results);


    } catch (err) {
        console.error("error in fetching starships: ", err);
    }
}

async function fetch_pilot(pilot) {
    // console.log(`fetching pilot: ${pilot}`)
    try {
        const response = await fetch(`https://swapi.dev/api/people/${pilot}`);
        pilots[pilot] = await response.json();
    } catch (err) {
        console.error(`error fetching pilot ${pilot}: `, err)
    }
}


console.log("Fetching Starships...")
await fetch_starships();

// get a list of all pilots then fetch in parallel - this is done to decrease the time needed to fetch starships
const pilotNums = new Set();

// gets the pilot num from the url
const getPilotNum = url => url.match(/(\d+)/)[0];

for (const ship of starships){
    for (const pil_url of ship.pilots){
        pilotNums.add(getPilotNum(pil_url))
    }
}


console.log("Fetching Pilots... ")
await Promise.all([...pilotNums].map(fetch_pilot))

// console.log("s len: ", starships.length)
// console.log("p len: ", Object.keys(pilots).length)

// let pilot_count = new Set() -- Just confirming ALL pilots were accounted for at least 1 starship

starships.forEach(ship=>{
    console.log("\nStarship:", ship.name)
    if (!ship.pilots.length){
        return console.log("    No Pilots...");
    }
    for(const pilot of ship.pilots){
        const pilNum = getPilotNum(pilot);
        // pilot_count.add(pilNum)
        console.log("    ",pilots[pilNum]['name'])
    }
})

// console.log(pilot_count)

// console.log(pilots)
// console.log(starships[0].pilots)
