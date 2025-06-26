const sheet1CSV =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vR92joYVUckkwpG1sFV4uXkfwmrclhao3nHW-r8z4mYKvYhVsQ4rnLUET_IXgtB2aRgH4k-si7X3IV2/pub?gid=0&single=true&output=csv";

let routes = [];
let selectedRoute = null;

Papa.parse(sheet1CSV, {
  download: true,
  header: true,
  complete: function (results) {
    routes = results.data.map((route) => {
      route.stops = route.stops.split(",").map((s) => s.trim());
      route.interval = Number(route["interval (mins)"] || route.interval);
      return route;
    });
    initRoutes(routes);
  },
});

function initRoutes(data) {
  const buttonContainer = document.getElementById("route-buttons");
  buttonContainer.innerHTML = "";

  data.forEach((route) => {
    const btn = document.createElement("button");
    btn.textContent = route["route id"];
    btn.onclick = () => {
      if (route["route id"] === "ML4") {
        selectedRoute = route;
        showDirectionAlert();
      } else {
        generateSchedule(route);
      }
    };
    buttonContainer.appendChild(btn);
  });
}

function parseTime(timeStr) {
  if (!timeStr) return 0;
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);
  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

function formatTime(totalMinutes) {
  let hours = Math.floor(totalMinutes / 60);
  let minutes = totalMinutes % 60;
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
}

function generateSchedule(route) {
  const container = document.getElementById("output");
  container.innerHTML = "";
  const start = parseTime(route["start time"]);
  const end = parseTime(route["end time"]);
  const interval = route.interval;
  const stopDelay = 3; // 3 minutes delay at each stop

  const title = document.createElement("h2");
  title.textContent = `Route ${route["route id"]}: ${route.origin} → ${route.destination}`;
  container.appendChild(title);

  let currentTime = start;
  let busNumber = 1;
  while (currentTime <= end) {
    const busBlock = document.createElement("div");
    busBlock.className = "bus-block";

    const busStart = document.createElement("div");
    busStart.className = "bus-start";
    busStart.innerHTML = `<strong><i class="fa-solid fa-bus"></i> Bus ${busNumber} starting at ${formatTime(
      currentTime
    )}</strong>`;
    busBlock.appendChild(busStart);
    busNumber++;

    route.stops.forEach((stop, i) => {
      const stopTime = formatTime(currentTime + i * stopDelay);
      const stopDiv = document.createElement("div");
      stopDiv.className = "station";
      stopDiv.innerHTML = `<i class="fa-solid fa-location-crosshairs"></i> ${stop} — ${stopTime}`;
      busBlock.appendChild(stopDiv);
    });

    container.appendChild(busBlock);
    currentTime += interval;
  }
}

function showDirectionAlert() {
  document.getElementById("directionAlert").style.display = "flex";
}

function hideDirectionAlert() {
  document.getElementById("directionAlert").style.display = "none";
}

function handleDirection(direction) {
  if (!selectedRoute) return;

  selectedDirection = direction;

  const isBT = direction === "BT";
  const routeCopy = { ...selectedRoute };

  routeCopy.stops = isBT
    ? [...selectedRoute.stops]
    : [...selectedRoute.stops].reverse();

  routeCopy.origin = isBT ? selectedRoute.origin : selectedRoute.destination;
  routeCopy.destination = isBT
    ? selectedRoute.destination
    : selectedRoute.origin;

  hideDirectionAlert();
  generateSchedule(routeCopy);
}


// Search Functionality
document.getElementById("searchInput").addEventListener("input", function () {
  const keyword = this.value.trim().toLowerCase();
  const container = document.getElementById("output");
  container.innerHTML = "";


  const isBT = selectedDirection === "BT";

  const routeCopy = { ...selectedRoute };
  routeCopy.stops = isBT
    ? [...selectedRoute.stops]
    : [...selectedRoute.stops].reverse();
  routeCopy.origin = isBT ? selectedRoute.origin : selectedRoute.destination;
  routeCopy.destination = isBT
    ? selectedRoute.destination
    : selectedRoute.origin;

  const start = parseTime(routeCopy["start time"]);
  const end = parseTime(routeCopy["end time"]);
  const interval = routeCopy.interval;
  const stopDelay = 3;

  let currentTime = start;
  let busNumber = 1;
  let routeBlock = null;
  let hasMatch = false;

  while (currentTime <= end) {
    let matchedStops = [];

    routeCopy.stops.forEach((stop, i) => {
      if (
        stop.toLowerCase().includes(keyword) ||
        routeCopy["route id"].toLowerCase().includes(keyword)
      ) {
        matchedStops.push({
          stop,
          time: formatTime(currentTime + i * stopDelay),
        });
      }
    });

    if (matchedStops.length > 0) {
      if (!routeBlock) {
        routeBlock = document.createElement("div");
        routeBlock.className = "bus-block";
        const title = document.createElement("h2");
        title.textContent = `Route ${routeCopy["route id"]}: ${routeCopy.origin} → ${routeCopy.destination}`;
        routeBlock.appendChild(title);
      }

      const busStart = document.createElement("div");
      busStart.className = "bus-start";
      busStart.innerHTML = `<strong><i class="fa-solid fa-bus"></i> Bus ${busNumber} starting at ${formatTime(
        currentTime
      )}</strong>`;
      routeBlock.appendChild(busStart);

      matchedStops.forEach(({ stop, time }) => {
        const stopDiv = document.createElement("div");
        stopDiv.className = "station";
        stopDiv.innerHTML = `<i class="fa-solid fa-location-crosshairs"></i> ${stop} — ${time}`;
        routeBlock.appendChild(stopDiv);
      });

      hasMatch = true;
    }

    busNumber++;
    currentTime += interval;
  }

  if (hasMatch && routeBlock) {
    container.appendChild(routeBlock);
  }
});


