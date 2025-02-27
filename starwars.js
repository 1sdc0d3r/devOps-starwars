const starships = [];
const pilots = {};
// let url_page = 0;
// let req_fail = 0;

async function fetch_starships(url = "https://swapi.dev/api/starships") {
    try  {
        // url_page++
        console.log(`fetching ${url}`)
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
    //! if (pilots[pilot]) return; // prev duplicate fetches - redundant due to Set
    console.log(`fetching pilot: ${pilot}`)
    try {
        const response = await fetch(`https://swapi.dev/api/people/${pilot}`);
        pilots[pilot] = await response.json();
    } catch (err) {
        console.error("pil-err- ", {response})
        console.error(`error fetching pilot ${pilot}: `, err)
    }
}

await fetch_starships();
console.log("starships fetched")

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
