# Software Requirements

## Vision

Our vision for this project is to create a functioning clone of the classic game, Tetris. It will be presented on an attractive page, and will include the ability to save user game scores across sessions. The user can see a list of previous scores on a separate leaderboard page. This will represent the culmination of our learned skills in Code 201 and will serve as an example of a piece of software that we created that could be public-facing.

## Scope

#### In

- Our product will allow a user to play classic Tetris
- Our product will persist score data between sessions
- Our product will have separate game, leaderboard, and rules pages.
- Our product will provide an attractive user interface

#### Out

- Our product will NOT be responsive to mobile device screen sizes.
- Our product will NOT use a database to aggregate data of separate users.

### Minimum Viable Product

- Randomly generate pieces to fall from the top of the game window.
- Correctly stack falling pieces on top of existing pieces.
- Allow the user to move the falling pieces left and right.
- Clear each line that has been completely filled by blocks.
- End the game when the stack of pieces reaches above the game window.
- Track score.
- Record a user's score and store it in local storage.

### Stretch Goals

- Include progressive difficulty increase - pieces fall faster for every line successfully cleared.
- Allow a user to shortcut the falling piece, and instantly drop it down from its current position.
- Include game music that can be toggled on/off.
- Include a pause button.
- Score based not only on cleared lines, but also time.
- Include an additional game mode with an altered ruleset.
- Implement our own unique style to the pieces and board.

## Functional Requirements

1. A user can play the game, and the game will end if they meet losing criteria.
2. A user can exit the game early and restart, if desired.
3. A user can view past scores.
4. A user can view the rules on a separate page.
5. A user can navigate between the game page and the leaderboard.

### Data Flow

1. User enters the site and is presented with a home page with a blank game window centered.
2. User presses a button to begin the game.
3. User plays the game until they either quit or lose the game.
4. User is presented with an option to record a name to attach to their score.
5. User is presented with the same "play" button again.
