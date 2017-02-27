var squareDiv = document.getElementById("square_one");

//Input Buttons
var shapeButton = document.getElementById("shape_button");
var sizeButton = document.getElementById("size_button");
var startButton = document.getElementById("start_button");
var pauseButton = document.getElementById("pause_button");
var resetButton = document.getElementById("reset_button");
var slidersButton = document.getElementById("sliders_button");

//Input Radio Buttons
var redRadio = document.getElementById("red_radio");
var orangeRadio = document.getElementById("orange_radio");
var yellowRadio = document.getElementById("yellow_radio");
var greenRadio = document.getElementById("green_radio");
var tealRadio = document.getElementById("teal_radio");
var blueRadio = document.getElementById("blue_radio");
var purpleRadio = document.getElementById("purple_radio");
var pinkRadio = document.getElementById("pink_radio");

//Input Range Sliders
var shapeSlider = document.getElementById("shape_slider");
var shapeSpeedSlider = document.getElementById("shape_speed_slider");
var sizeSpeedSlider = document.getElementById("size_speed_slider");
var colorSpeedSlider = document.getElementById("color_speed_slider");
var sizeSlider = document.getElementById("size_slider");
var rSlider = document.getElementById("r_slider");
var gSlider = document.getElementById("g_slider");
var bSlider = document.getElementById("b_slider");

//RBG slider values in "<p>"
var rSliderPara = document.getElementById("r_slider_value");
var gSliderPara = document.getElementById("g_slider_value");
var bSliderPara = document.getElementById("b_slider_value");

//Togglers for buttons
var toggleStartButton = true;
var togglePauseButton = true;
var toggleButton = true;

//For clearing Intervals
var colorChangeRepeat;
var resetSlidersRepeat;

//Start change Function
function startChange() {
    if(toggleStartButton == true) {
        colorChangeRepeat = setInterval(autoChangeColors, colorSpeedInterval);
        startButton.value = "Stop"; 
        toggleStartButton = false;
        uncheckRadio();
        disableRadio();
        pauseButton.disabled = false;
        enableDisableSliders();
    } else if(toggleStartButton == false) {
        resetAutoColor();
    }
}

function resetAutoColor(){
        clearInterval(colorChangeRepeat);
        startButton.value = "Start"; 
        toggleStartButton = true;
        resetRgbSliders();
        enableRadio();
        pauseButton.disabled = true;
        enableDisableSliders();
}

//Auto changes background color
function autoChangeColors() {
    
        if(rSlider.value <= 255 && gSlider.value < 255 && bSlider.value == 0) {
                matchRgbSliders();
                gSlider.stepUp(5);
            } else if(rSlider.value > 0 && gSlider.value <= 255 && bSlider.value == 0) {
                matchRgbSliders();
                rSlider.stepDown(5);
            } else if (rSlider.value == 0 && gSlider.value <= 255 && bSlider.value < 255) {
                matchRgbSliders();
                bSlider.stepUp(5);
            } else if(rSlider.value == 0 && gSlider.value > 0 && bSlider.value <= 255) {
                matchRgbSliders();
                gSlider.stepDown(5);       
            } else if(rSlider.value < 255 && gSlider.value == 0 && bSlider.value <= 255) {
                matchRgbSliders();
                rSlider.stepUp(5);        
            } else if(rSlider.value <= 255 && gSlider.value == 0 && bSlider.value > 0) {
                matchRgbSliders();
                bSlider.stepDown(5);        
            } else {
                matchRgbSliders();
                bSlider.stepDown(5);
            }
        
    //console.log(rSlider.value);
    //console.log(gSlider.value);
    //console.log(bSlider.value);
    
}

//Updates background color for div
function updateBackground() {
    squareDiv.style.backgroundColor = "rgb(" + rSlider.value +", " + gSlider.value + ", " + bSlider.value + ")";
}

//Matches number  in "<p>" with RGB range sliders value
function matchRgbSliders() {
    rSliderPara.innerHTML = rSlider.value;  
    gSliderPara.innerHTML = gSlider.value;  
    bSliderPara.innerHTML = bSlider.value;
    updateBackground();
}

//resets RGB sliders
function resetRgbSliders() {
    var reset = new rgbSlidersAuto(255, 255, 255);
    reset.startMoving();
}

//Pauses background changing
function pauseChange() {
    if(togglePauseButton == true) {
        clearInterval(colorChangeRepeat);
        pauseButton.value = "Resume"; 
        togglePauseButton = false;
    } else if(togglePauseButton == false) {
        clearInterval(colorChangeRepeat);
        pauseButton.value = "Pause"; 
        togglePauseButton = true;
        toggleStartButton = true;
        startChange();
    }
}

var toggleRgbSlidders = true;
//Enables and disables sliders
function enableDisableSliders() {
    if(startButton.value == "Stop") {
        rSlider.disabled = true;
        gSlider.disabled = true;
        bSlider.disabled = true;
        colorSpeedSlider.disabled = true;
        toggleRgbSlidders = false;
    } else {
        rSlider.disabled = false;
        gSlider.disabled = false;
        bSlider.disabled = false;
        colorSpeedSlider.disabled = false;
        toggleRgbSlidders = true;
    }
}

//Adds tranition for background color on select
function addTransition(){
    squareDiv.style.transition = "background-color 0.5s";
}

//Removes transition for background color
function removeTransition(){
    squareDiv.style.transition = "background-color 0s";
}

/* Color radio button controls */
var radioButtons = document.getElementsByClassName("radio-button");
var disabledRadio;
//Uncheck color radio buttons
function uncheckRadio() {
    for (var i = 0; i < radioButtons.length; i++) {
        radioButtons[i].checked = false;
    }
}

//Disable color radio buttons
function disableRadio() {
    for (var i = 0; i < radioButtons.length; i++) {
        disabledRadio = radioButtons[i].disabled = true;
        //console.log(disableRadio);
    }
}

//Disable color radio buttons
function enableRadio() {
    for (var i = 0; i < radioButtons.length; i++) {
        disabledRadio = radioButtons[i].disabled = false;
        //console.log(disableRadio);
    }
}



/*-----------------------------------------------*/
//Class for updating RGB sliders with color values
function rgbSlidersAuto(red, green, blue) {
    var colorSliderTimer;
    this.startMoving = function() {
        colorSliderTimer = setInterval(this.rgbColorSliderMove, 8);
    }
    this.rgbColorSliderMove = function() {
        if(rSlider.value != red || gSlider.value != green || bSlider.value != blue) {
        if(rSlider.value > red) {
            rSlider.stepDown(5);
            if(rSlider.value != red || rSlider.value > red) {
                rSlider.value--;
            }
        } else if(rSlider.value < red) {
            rSlider.stepUp(5);
        }
        
        if(gSlider.value > green) {
            gSlider.stepDown(5);
            if(gSlider.value != green || gSlider.value > green) {
                gSlider.value--;
            }
        } else if(gSlider.value < green) {
            gSlider.stepUp(5);
        }
        
        if(bSlider.value > blue) {
            bSlider.stepDown(5);
            if(bSlider.value != blue || bSlider.value > blue) {
                bSlider.value--;
            }
        } else if(bSlider.value < blue) {
            bSlider.stepUp(5);
        }
    }else if(rSlider.value == red && gSlider.value == green && bSlider.value == blue) {
        clearInterval(colorSliderTimer);
    }
        matchRgbSliders();
    }
}

/*-----------------------------------------------*/

//Functions with values of RGB for "rgbSlidersAuto" class
function rgbChange(red, green, blue) {
    var redGreenBlue = new rgbSlidersAuto(red, green, blue);
    redGreenBlue.startMoving();       
}


/*--------------------------*/
//Real time RGB, Size, Shape and Speed sliders Control
var redSlider = document.getElementById("r_slider");
var greenSlider = document.getElementById("g_slider");
var blueSlider = document.getElementById("b_slider");

var allSlidersArray = [redSlider, greenSlider, blueSlider, shapeSlider, sizeSlider, shapeSpeedSlider, sizeSpeedSlider, colorSpeedSlider];

var allSlidersListener = function() {
window.requestAnimationFrame(function() {
    matchRgbSliders();
    matchShapeSliders();
    squareDiv.style.height = sizeSlider.value + "px";
    squareDiv.style.width = sizeSlider.value + "px";
    squareDiv.style.borderRadius = shapeSlider.value + "%";
    shapeSpeedInterval = shapeSpeedSlider.value;
    sizeSpeedInterval = sizeSpeedSlider.value;
    colorSpeedInterval = colorSpeedSlider.value;
    //console.log(shapeSpeedInterval);
  });
};

for(var i = 0; i < allSlidersArray.length; i++) {
    addListenerToSlider(i);
}

function addListenerToSlider(sliderSelector){
    allSlidersArray[sliderSelector].addEventListener("mousedown", function() {
        allSlidersListener();
        uncheckRadio();//When changing on sliders to uncheck color selection
        allSlidersArray[sliderSelector].addEventListener("mousemove", allSlidersListener);
    });
    allSlidersArray[sliderSelector].addEventListener("mouseup", function() {
        enableRadio();//Enables Color Radio 
        allSlidersArray[sliderSelector].removeEventListener("mousemove", allSlidersListener);
    });
}



/*----------------------------*/
//Auto Shape Controls
//Variables
var autoShapeToggle = true;
var autoShapeBool = true;
var autoShapeInterval;
var autoSizeToggle = true;
var autoSizeBool = true;
var autoSizeInterval;
var shapeSpeedInterval = shapeSpeedSlider.value;
var sizeSpeedInterval = sizeSpeedSlider.value;
var colorSpeedInterval = colorSpeedSlider.value;


//Auto Changing BorderRadius
function autoShape() {
    if(autoShapeToggle == true){
        shapeButton.value = "Stop";
        autoShapeInterval = setInterval(intervalShape, shapeSpeedInterval);
        autoShapeToggle = false;
        shapeSlider.disabled = true;
        disableSpeedSlider();
    } else {
        shapeButton.value = "Start";
        clearInterval(autoShapeInterval);
        autoShapeToggle = true;
        shapeSlider.disabled = false;
        disableSpeedSlider();
    }
}

function resetAutoShape(){
        shapeButton.value = "Start";
        clearInterval(autoShapeInterval);
        autoShapeToggle = true;
        shapeSlider.disabled = false;
        disableSpeedSlider();
}

function intervalShape() {
    if(autoShapeBool == true && shapeSlider.value < 50) {
        shapeSlider.stepUp(1);
        if(shapeSlider.value == 50){
            autoShapeBool = false;    
        }
    } else if(autoShapeBool == false && shapeSlider.value > 0){
        shapeSlider.stepDown(1);
        if(shapeSlider.value == 0){
            autoShapeBool = true;    
        }
        }
    allSlidersListener();
}


//Auto Changing Size W & H
function autoSize(){
    if(autoSizeToggle == true){
        autoSizeInterval = setInterval(intervalSize, sizeSpeedInterval);
        autoSizeToggle = false;
        sizeSlider.disabled = true;
        sizeButton.value = "Stop";
        disableSpeedSlider();
    } else {
        resetAutoSize();
    }
}

function resetAutoSize(){
        clearInterval(autoSizeInterval);
        autoSizeToggle = true;
        sizeSlider.disabled = false;
        sizeButton.value = "Start";
        disableSpeedSlider();
}

function intervalSize() {
    if(autoSizeBool == true && sizeSlider.value <= 500) {
        sizeSlider.stepUp(6);
        if(sizeSlider.value == 500){
            autoSizeBool = false;    
        }
    } else if(autoSizeBool == false && sizeSlider.value > 0){
        sizeSlider.stepDown(6);
        if(sizeSlider.value == 200){
            autoSizeBool = true;    
        }
        }
    allSlidersListener();
    //console.log(sizeSlider.value);
}

function matchShapeSliders() {
    shapeSpeedInterval = shapeSpeedSlider.value;
}

//Disables Speed Range Slider when Shape or Size are active
function disableSpeedSlider() {
    if(autoShapeToggle == false) {
        shapeSpeedSlider.disabled = true;
    } else if(autoShapeToggle != false) {
        shapeSpeedSlider.disabled = false;
    } 
    
    if(autoSizeToggle == false) {
        sizeSpeedSlider.disabled = true;
    } else if(autoSizeToggle != false) {
        sizeSpeedSlider.disabled = false;
    }
}

var resetIntervalTimer;

function resetChange() {
        clearInterval(autoShapeInterval);
        clearInterval(autoSizeInterval);
        resetIntervalTimer = setInterval(intervalReset, 5);
        allSlidersListener();
        enableDisableSliders();
}

function intervalReset() {

    if(shapeSlider.value != 0 || sizeSlider.value != 500 || 
       rSlider.value != 255 || gSlider.value != 255 || bSlider.value != 255
       || shapeSpeedSlider.value != 16 || sizeSpeedSlider.value != 16 || colorSpeedSlider.value != 6) {
        shapeSlider.stepDown(1);
        sizeSlider.stepUp(5);
        resetRgbSliders();
        if(shapeSpeedSlider.value > 16) {
            shapeSpeedSlider.stepDown(1);
        } else if(shapeSpeedSlider.value < 16) {
            shapeSpeedSlider.stepUp(1);
        }
        if(sizeSpeedSlider.value > 16) {
            sizeSpeedSlider.stepDown(1);
        } else if(sizeSpeedSlider.value < 16) {
            sizeSpeedSlider.stepUp(1);
        }
        if(colorSpeedSlider.value > 6) {
            colorSpeedSlider.stepDown(1);
        } else if(colorSpeedSlider.value < 6) {
            colorSpeedSlider.stepUp(1);
        }
        allSlidersListener();
        console.log(shapeSpeedSlider.value);
        console.log(sizeSpeedSlider.value);
    } else if(shapeSlider.value == 0 || sizeSlider == 500 ||
              rSlider.value == 255 || gSlider.value == 255 || bSlider.value == 255 || 
              shapeSpeedSlider.value == 16 || sizeSpeedSlider.value != 16 || colorSpeedSlider.value == 6) {
        clearInterval(resetIntervalTimer);
        resetAutoColor();
        resetAutoSize();
        resetAutoShape()
    }
}