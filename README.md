Game Of Life Exercise

What is game of life?
Read the first and second sections in the Wikipedia article:
https://en.wikipedia.org/wiki/Conway's_Game_of_Life

This is a nodejs scripts simulating the game of life and
printing it to the terminal console or CLI based.

The script accepts two command line arguments:
state_file_path
Path to a file containing the initial state for the simulation. You may choose
the format of the file.
generations
The number of generations to run the simulation.

For example:

node gameoflife.js initial_state.txt 10

Will run the simulation 1000 generations, starting with the state encoded in
initial_state.txt

Game Of Life Exercise 2
Notes:
Print the new state every 100ms
Each time you print the new state, it should override the previous output in
the shell so as to create an animation.

Example Output
This is the last output of the script for some 5x5 board. " " blank space signifies living cells.
Output:
<pre>
$ node gameoflife.js initial_state.txt 10

Solving! 9
Printing! 10



   


</pre>
Note: after printing grid then clear console or overwrite current display with new state / new grid
Below is the final output if all generations are successful
Output:
<pre>
$ node gameoflife.js initial_state.txt 9

Done!
Printing! 9


 
 

</pre>

Time to complete:
1 hour

img src="https://github.com/fdc1010/gameoflife-nodejs/blob/master/gameoflife.gif" width="2400px" />

[Watch Video Demo](http://www.youtube.com/watch?v=zJiMsQc7ULY)
