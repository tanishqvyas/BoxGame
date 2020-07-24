// Get reference to the canvas
var myCanvas = document.getElementById('gameboard');

// Setting the canvas height
myCanvas.height = 600;
myCanvas.width = 600;

// Bounds
var lowerBoundX = 0;
var lowerBoundY = 0;
var upperBoundX = 500;
var upperBoundY = 500;


// Getting the canvas context
var context = myCanvas.getContext('2d');

// Drawing two random squares
var coordinates = initialize_square();



// Variable to hold current states of squares
var state = {
	curActive : null,
	boxOneColor : "#9569dd",
	boxTwoColor : "#9569dd"

}

// Function to get mouse position
function getMousePos(canvas, event) 
{
    var rect = canvas.getBoundingClientRect();
    return {
          	x: event.clientX - rect.left,
          	y: event.clientY - rect.top
        };
}

// Function to check if mouse click is inside square
function isInsideBox(posx, posy, x, y) 
{
	if((posx >= x && posx <= x+100) && (posy >= y && posy <= y+100))
	{
		return true;
	}
	else
	{
		return false;
	}
}

// Function to check overlapping of boxes
function isOverlapping(x1, y1, x2, y2) 
{
	if(x1 >= x2+100 || y1 >= y2+100 || x1+100 <= x2 || y1+100 <= y2)
	{
		return false;
	}

	else
	{
		return true;
	}
}

// Event Listner for changing player
myCanvas.addEventListener("click", function(event) 
{
	var mousePos = getMousePos(myCanvas, event);

	// Checking if inside box 1
	if(isInsideBox(mousePos.x, mousePos.y, coordinates.x1, coordinates.y1))
	{
		state.curActive = 1;
		state.boxOneColor = "#82f1d5";
		state.boxTwoColor = "#9569dd";
	}

	// Check if inside box 2
	else if(isInsideBox(mousePos.x, mousePos.y, coordinates.x2, coordinates.y2))
	{
		state.curActive = 2;
		state.boxTwoColor = "#82f1d5";
		state.boxOneColor = "#9569dd";
	}

	draw_squares(coordinates);


});

// Event listner for user input
window.addEventListener("keydown", function(event) 
{

	// Creating a backup in case of overlap after change
	var backupCoordinates = {
		
		x1 : coordinates.x1,
		x2 : coordinates.x2,
		y1 : coordinates.y1,
		y2 : coordinates.y2

	}

	if (event.keyCode == 37)
	{
		if(state.curActive === 1)
		{
			coordinates.x1 -= 1;
			if(coordinates.x1 <= lowerBoundX)
			{
				coordinates.x1 = lowerBoundX;
			}
		}

		else if(state.curActive === 2)
		{
			coordinates.x2 -= 1
			if(coordinates.x2 <= lowerBoundX)
			{
				coordinates.x2 = lowerBoundX;
			}
		}
	}

	else if(event.keyCode == 38)
	{
		if(state.curActive === 1)
		{
			coordinates.y1 -= 1;
			if(coordinates.y1 <= lowerBoundY)
			{
				coordinates.y1 = lowerBoundY;
			}
		}

		else if(state.curActive === 2)
		{
			coordinates.y2 -= 1;
			if(coordinates.y2 <= lowerBoundY)
			{
				coordinates.y2 = lowerBoundY;
			}
		}
	}

	else if (event.keyCode == 39)
	{
		if(state.curActive === 1)
		{
			coordinates.x1 += 1;
			if(coordinates.x1 >= upperBoundX)
			{
				coordinates.x1 = upperBoundX;
			}
		}

		else if(state.curActive === 2)
		{
			coordinates.x2 += 1;
			if(coordinates.x2 >= upperBoundX)
			{
				coordinates.x2 = upperBoundX;
			}
		}
	}

	else if(event.keyCode == 40)
	{
		if(state.curActive === 1)
		{
			coordinates.y1 += 1;
			if(coordinates.y1 >= upperBoundY)
			{
				coordinates.y1 = upperBoundY;
			}
		}

		else if(state.curActive === 2)
		{
			coordinates.y2 += 1;
			if(coordinates.y2 >= upperBoundY)
			{
				coordinates.y2 = upperBoundY;
			}

		}
	}

	var m = isOverlapping(coordinates.x1, coordinates.y1, coordinates.x2, coordinates.y2);
	
	// Overlapping check
	if(m)
	{
		console.log("overlappping");
		coordinates.x1 = backupCoordinates.x1;
		coordinates.x2 = backupCoordinates.x2;
		coordinates.y1 = backupCoordinates.y1;
		coordinates.y2 = backupCoordinates.y2;
	}

  	draw_squares(coordinates);

});


// Function to get a random number in a given range
function randomNumber(min, max) 
{  
    return Math.random() * (max - min) + min; 
}


function draw_squares(obj) 
{
	context.clearRect(0, 0, 600, 600)
	
	context.fillStyle = state.boxOneColor;
	context.fillRect(obj.x1, obj.y1, 100, 100);

	context.fillStyle = state.boxTwoColor;
	context.fillRect(obj.x2, obj.y2, 100, 100);
}


// Function to draw two squares randomly
function initialize_square() 
{
	var x1 = randomNumber(0, 500);
	var y1 = randomNumber(0, 500);

	var x2 = randomNumber(0, 500);
	var y2 = randomNumber(0, 500);

	while(isOverlapping(x1, y1, x2, y2))
	{
		var x1 = randomNumber(0, 500);
		var y1 = randomNumber(0, 500);

		var x2 = randomNumber(0, 500);
		var y2 = randomNumber(0, 500);
	}



	// Drawing the first square
	context.fillStyle = "#9569dd";
	context.fillRect(x1, y1, 100, 100);

	// drawing the second square
	context.fillRect(x2, y2, 100, 100);

	// Return the coordinates of squares
	var coordinates = {

		x1: x1,
		x2: x2,
		y1: y1,
		y2: y2
	}

	return coordinates;

}