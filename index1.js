let startTime, endTime;
let imageSize = "";
let image = new Image();
let bitSpeed = document.getElementById("bits"),
    kbSpeed = document.getElementById("kbs"),
    mbSpeed = document.getElementById("mbs"),
    info = document.getElementById("info");

let totalBitSpeed = 0;
let totalKbSpeed = 0;
let totalMbSpeed = 0;
let numTests = 1;
let testCompleted = 0;

let imageApi = "https://source.unsplash.com/random?topic=nature";


image.onload = async function() {
    endTime = new Date().getTime();

    //get image size
    await fetch(imageApi).then((response) => {
        imageSize = response.headers.get("content-length");
        calculateSpeed();
    });
};

//calculate speed function
function calculateSpeed(){ 
    //time taken in seconds
    let timeDuration = (endTime - startTime)/1000;
    //total bits
    let loadedBits = imageSize * 8;
    let speedInBts = loadedBits / timeDuration;
    let speedInKbs = speedInBts / 1024;
    let speedinMbs = speedInKbs / 1024;

    totalBitSpeed += speedInBts;
    totalKbSpeed += speedInKbs;
    totalMbSpeed += speedinMbs;

    testCompleted++;

    //if all tests completed, I'll get 5 images and then
    //calculate averge of them
    if(testCompleted === numTests) {
        let averageSpeedInBps = (totalBitSpeed / numTests).toFixed(2);
        let averageSpeedInKbps = (totalKbSpeed / numTests).toFixed(2);
        let averageSpeedInMbps = (totalMbSpeed / numTests).toFixed(2);
    
        //display average speed
        bitSpeed.innerHTML += `${averageSpeedInBps}`;
        kbSpeed.innerHTML += `${averageSpeedInKbps}`;
        mbSpeed.innerHTML += `${averageSpeedInMbps}`;
        info.innerHTML = "Test Completed!";
    } else{
        //run the next test
        startTime = new Date().getTime();
        image.src = imageApi;
    }
};


//initial function to start tests

const init = async () =>{
    info.innerHTML = "Testing...";
    startTime = new Date().getTime();
    image.src = imageApi;
};

//run the tests when windows loads
window.onload = () =>{
    for(let i = 0; i < numTests; i++) {
        init();
    }
};