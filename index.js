const { parse } = require("csv-parse");
const fs = require("fs");

const habitablePlanets = [];

function isHabitablePlanets(planet) {
  return planet["koi_disposition"] === "CONFIRMED" 
  && planet['koi_kepmag']==='15.660';
}

fs.createReadStream("kepler_data.csv")
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on("data", (data) => {
    if (isHabitablePlanets(data)) {
      habitablePlanets.push(data);
    }
  })
  .on("error", (error) => {
    console.log(error);
  })
  .on("end", () => {
    console.log(habitablePlanets.map((planet  )=>{
      return planet['kepler_name'];
    }))
  });
