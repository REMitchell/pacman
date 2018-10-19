# PAC-MAN

Teaching computer science through 80's arcade games!

## Important Installation Instructions

Clone/download and open up index.html locally in your browser.
Or, navigate to <a href="http://haltornot.com">the internet page where this project lives!</a>

## How it Works

Set your PAC-MAN wherever you want, click on it to change direction. <br>Modify the cells to set up your board (or use the preset buttons for inspiration).<br>
Create rules that decide, transform, and move. 
<br>The cell values (in "number" mode -- radio buttons in the control panel to change from dots) range from 0 to 9.
<br>Walls can be thought of as "-1" although they can't be moved into, so they're kind of a special case.

### index.html
Contains all HTML for board and control layout, as well as event handlers for user actions, and the main "play" function. There's some setup at top as well (More of this could probably be moved to board.js)

### rule.js
This is where a lot of the slick magic happens. Four classes are contained in this file:
- Decider: A set of functions that define whether the transformer and action functions should be executed or not.
- Transformer: A set of functions that change the value of PAC-MAN's current cell
- Mover: A set of functions that move PAC-MAN forward, backward, left, or right
- MoveRule: Consists of a decider, transformer, and mover object. Also, some utilities for executing and printing itself

As currently designed, these objects are not "stateful," although they do use the board object, which is. In theory, you should be able to create new ones whenever and as long as you're passing in the same board object, you're fine.

### board.js
The Board class is global and should be thought of as a singleton (although this is not enforced). It contains height, width, and the current "mode" (dots or numbers).

Also contains some utility functions for setup and updating scores. Could probably stand to have more stuff moved in here.

### utils.js
Basic utility functions, like "get element from coordinate," "get coordinates from element," as well as functions for moving PAC-MAN, updating board values, making the modals, etc.

## Ideas for improvement
### Detecting infinite loops
Right now, the program detects when the PAC-MAN is "stuck" (state does not change even though the rules have been executed, or no rules are executed in a pass) but does not detect infinite loops.

An infinite loop occurs if the current state (direction + location) AND board layout (coordinates + values) is the same as it has been at some point in the past. That is, if you're applying the same rules to the same situation, you can expect the same results!

This would require saving all board information as well as the direction and location information at every step in play. For easy comparisons, this data could be stored in a "previous states" array as a hashed value. Although there are a large number of possible states on the board, the set of states involved in any one game is much smaller and a hash could be easily designed that would make collision unlikely.

### Better support for "dot mode"
Right now, all "dot mode" does is print out a small dot in squares with the value '1' and a large dot in squares with the number '2'. Obviously, part of this exercise is showing that these dots can be thought of as number values, which opens up <a href="https://www.youtube.com/watch?v=sVxUUotm1P4" target="_blank">a whole world of numerical logic and transformations</a> but things like rule and option text could also be changed, and many of the options could be limited in dot mode.

### Clean up the setup
Setup of the grid (and the storage/application of different grid/value setups) is a little ad-hoc. One could do some cool things with loading data from CSV or JSON, maybe store initial starting states in a database...

### Adjust board size
I've tried to write this such that the board height and width is easily configurable. For looking at large scale patterns of your PAC-MAN's movement, viewing dozens (or even... hundreds?) of cells across may be useful!

### Playing around!
I've been focusing on writing this for so long, I haven't really gotten a chance to use it! This game is essentially a <a href="https://en.wikipedia.org/wiki/Turing_machine">Turing Machine</a> with a single state, and raises (I think) some interesting computer science questions and methods of thinking.
- Are we defining sets of rules to work with a given board, or are we designing boards to work with a set of rules? How do the two variables (the board, and the rule set) interact with each other?
- PAC-MAN is always guaranteed to either get "stuck" or go into an infinite loop. Why is this the case? Could you design a system (maybe some imaginary system) in which this would not be the case?
- What if the possible values in the cells were unbounded, instead of being limited to 1-9? Could you use this to trigger different "states" for your ruleset? Does this mean that it's equivalent to a Turing Machine?
- What defines the set of boards where PAC-MAN is capable of crossing all the cells and ones where some cells are unreachable? How can you tell? What kinds of constraints do the rule formats and cell values place on us?

