# User Stories

## User stories are a device commonly used in software development to identify what the functionality and design of a product should be by considering the interests and motivations of people with varied multiple points of view

### As a user, I would like to see tetris pieces come down the screen, so that I can see it's shape to decide where it will go

    - Create an algorithm that will randomly generate tetris pieces that fall down the page at a constant rate

### As a user, I would like to be able to rotate the pieces as they fall and move them across the game board, so that I can alter the pieces to better fit my needs on the game board

    - Add an event listener to allow the user to rotate pieces as they fall and move them side to side to give them better control of each piece
    - Terminate the event listener once the piece has been "caught"

### As a user, I would like to be able to catch the piece once it interacts with another piece or the bottom of the game board, so that I can stack pieces on the game board

    - Build a 2d view representing pieces already place and assign them coordinates to check for hit detection

### As a user, I would like to see a row dissapear when it is filled with pieces without any breaks, so that I can build up my score

    - Create an algorithm that can loop through an array (that repersents the row) and check for certain properties, once it does it needs to be able to iterate over the array and delete it

### As a user, I would like the game to end when the pieces reach the top of the game board, so that the game can be competitive

    - Terminate the pogram, including the event listeners, once the pieces reach the top of the game board

### As a user, I would like to be able to keep track of my score and display it through multiple play throughs, so that I can see whether or not I'm improving

    - Store the score in local storage and display it on the scoreboard so the user can compare their score