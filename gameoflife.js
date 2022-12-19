const fs = require('fs');
const { resolve } = require('path');

// Init values
let counter = 0;

// Function to retrieve data from file
// state_file_path: e.g. 'initial_state.txt'
const retrieveDataFromFile = async (state_file_path) => {
    const data_grid = fs.readFileSync(state_file_path).toString().split("\n");
    return data_grid.map(item => {
        const inner_data = item.split(",")
        return inner_data.map(value => +value)
    })
}

// Function to check if
// index are not out of grid
const saveGrid = (grid, row, col) => {      
    return grid.length > row && grid[0].length > col && row >= 0 && col >= 0
}
 
// Function to get New Generation 
const solveGrid = async (grid) => {

    let p = grid.length
    let q = grid[0].length
    let u = [1, -1, 0, 1, -1, 0, 1, -1]
    let v = [0, 0, -1, -1, -1, 1, 1, 1]
    for(let i = 0; i < p; i++)
    {
        for(let j = 0; j < q; j++)
        {
         
            // IF the initial value
            // of the grid(i, j) is 1
            if (grid[i][j] > 0)
            {
                for(let k = 0; k < 8; k++)
                {
                    if (saveGrid(grid, i + u[k], j + v[k]) && grid[i + u[k]][j + v[k]] > 0){
                     
                        // If initial value > 0,
                        // just increment it by 1
                        grid[i][j] += 1                        
                    }
                }
            }
 
            // IF the initial value
            // of the grid(i, j) is 0
            else{
                for(let k = 0;k<8;k++){
                    if (saveGrid(grid, i + u[k], j + v[k]) && grid[i + u[k]][j + v[k]] > 0){
                        // If initial value <= 0
                        // just decrement it by 1
                        grid[i][j] -= 1 

                        
                    }
                }
            }
        }          
    }
     
    // Generating new Generation.
    // Now the magnitude of the
    // grid will represent number
    // of neighbors
    for(let i = 0; i < p; i++)
    {
        for(let j = 0; j < q; j++)
        {
         
            // If initial value was 1.
            if (grid[i][j] > 0){
                // Since Any live cell with
                // < 2 live neighbors dies
                if (grid[i][j] < 3)
                    grid[i][j] = 0
 
                // Since Any live cell with
                // 2 or 3 live neighbors live
                else if(grid[i][j] <= 4)
                    grid[i][j] = 1
 
                // Since Any live cell with
                // > 3 live neighbors dies
                else if(grid[i][j] > 4)
                    grid[i][j] = 0
            }
 
            else{
                // Since Any dead cell with
                // exactly 3 live neighbors
                // becomes a live cell
                if (grid[i][j] == -3)
                    grid[i][j] = 1
                else
                    grid[i][j] = 0
            }
        }  
    }
    
    return grid
}

// Function implementation of
// the above approach 
const getNewGrid = (grid) => {  
    let p = grid.length
    let q = grid[0].length    
    let res = "";
    for(let i=0;i<p;i++){
        for(let j=0;j<q;j++){
            if(grid[i][j] > 0) res += " "
            else if(grid[i][j] === 0) res += ""
        }
        res += "\n"
    }

    return new Promise(resolve => resolve(res))

}

const printGrid = async (grid,status = "Printing!") => {
    getNewGrid(grid)
        .then(res => {
            console.clear()
            console.log(status) 
            console.log(`Printing! ${counter}\n`)    
            console.log(res)       
        })
        .catch(err=>console.log(err))

    await sleep(1000)
}
 
// state_file_path: Path to a file containing the initial state for the simulation. You may choose the format of the file.
// generation: The number of generations to run the simulation.
const mainSolution = () => {
    const args = process.argv.slice(2);
    let state_file_path = "initial_state.txt", generations = 10

    // Get node arguments
    for(i in args){
        if(isNaN(args[i])) state_file_path = args[i]   
        else if(!isNaN(args[i])) generations = args[i]
    }

    retrieveDataFromFile(state_file_path)
        .then(async (data_grid) => {  

            await printGrid(data_grid,"Initializing!")

            let i = 0, final_grid = data_grid;  
            do{
                final_grid = await solveGrid(data_grid)
                            .then(async (result) => {
                                await printGrid(result,`Solving! ${counter++}`)      
                                return result 
                            })
                            .catch(err => console.log(err))
                i++
            }while(i < generations)
            
            await printGrid(final_grid,"Done...")
        })
        .catch(err=>console.log(err))
}
const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
} 

mainSolution()