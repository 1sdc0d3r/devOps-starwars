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

async function fetch_starship_async(cur_page, url = `https://swapi.dev/api/starships/?page=${cur_page}`) {
    try  {
        if(cur_page == 4) return true; //testing for 5 pages
        // url_page++
        // console.log(`fetching ${url}`)
        //* attempt to fetch next paginated url before prior fetch
        // await fetch_starships(url+`/?page=${url_page}`)

        const response = await fetch(url);
        // if (response.status !== 200) return false;
        const data = await response.json();
        //* Put this here to decrease fetch time needed
        // if (data.next) await fetch_starships(data.next);

        starships.push(...data.results);
        return true
    } catch (err) {
        console.error("error in fetching starship: ", err);
        return false
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
// await fetch_starships();

let max_page_fetch = 1; // arbitrary number not extremely high
let max_successful_fetch = 0;
// await fetch_starship_async(5);
// while(max_successful_fetch < max_page_fetch){
while (true){
    console.log("B", {max_page_fetch}, {max_successful_fetch})
    // if (await fetch_starship_async(max_page_fetch)){
//! 1,2,3 breaks , 5 breaking alg?
//? do I need to utilize another max_page_fetch for highest success (look at the max_page_fetch (true/false) when pages == 5 or 6) -- The max_page_fetch is higher than the prev max page fetch on a false. ISSUE!!
    if(max_page_fetch <= 6){
        console.log("***True***")
        max_successful_fetch = max_page_fetch
        max_page_fetch *= 2
    }else {
        console.log("***False***")
        if(max_page_fetch == max_successful_fetch + 1 && max_successful_fetch>1) break;
        max_page_fetch = Math.ceil((max_page_fetch - max_successful_fetch / 2 )+1) //? utilize 2/3 for larger sets up data? jump down by thirds to reduce excess calls in large pagination sets
        if ((max_page_fetch < max_successful_fetch || max_page_fetch == max_successful_fetch)) max_page_fetch = max_successful_fetch + 1; //* the || section is used for page's 6,9 sidecases
    }
    console.log("A", {max_page_fetch}, {max_successful_fetch})



}

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
/* //!
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
   //! */

//!console.log("starships:", starships.length) //36 -> 10
// console.log(pilot_count)

// console.log(pilots)
// console.log(starships[0].pilots)
