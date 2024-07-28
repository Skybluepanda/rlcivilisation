type Coordinates = [number, number];

class Territory {
    coordinates: Coordinates;
    earth: number;
    fire: number;
    water: number;
    nature: number;

    constructor(
        coordinates: Coordinates,
        earth: number,
        fire: number,
        water: number,
        nature: number,
    ) {
        this.coordinates = coordinates;
        this.earth = earth;
        this.fire = fire;
        this.water = water;
        this.nature = nature;
    }
}

const createZeroArray = (size: number): number[][] => {
    return Array.from({ length: size }, () => Array(size).fill(0));
};


function createTerritoryGrid(size: number): Territory[][] {
    const grid: Territory[][] = [];

    for (let x = 0; x < size; x++) {
        const row: Territory[] = [];
        for (let y = 0; y < size; y++) {
            const coordinates: Coordinates = [x, y];
            const earth = 0;
            const fire = 1;
            const water = 0;
            const nature = 0;
            row.push(new Territory(coordinates, earth, fire, water, nature));
        }
        grid.push(row);
    }

    // Create volcanoes
    for (let i = 0; i < size; i++) {
        const x = Math.floor(Math.random() * size);
        const y = Math.floor(Math.random() * size);
        grid[x][y].earth = 4;
    }
    //eruption cycles

    for (let c = 0; c < 7; c++) {
        const lavaGrid = createZeroArray(16)
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                
                if (grid[x][y].earth > 2) {
                    for (let i = -1; i < 2; i++) {
                        for (let j = -1; j < 2; j++) {
                            if (
                                x + i >= 0 &&
                                x + i < size &&
                                y + j >= 0 &&
                                y + j < size
                            ) {
                                lavaGrid[x + i][y + j] += 1;
                            }
                        }
                    }
                }
                
            }
        }

        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                
                for (let i = 0; i < lavaGrid[x][y]; i++) {
                    if (Math.random() < (25-grid[x][y].earth*4)/100) {
                        grid[x][y].earth += 1;
                        break;
                    }
                }
            }
        }
    }
    for (let i = 0; i < size; i++) {
        const x = Math.floor(Math.random() * size);
        const y = Math.floor(Math.random() * size);
        grid[x][y].earth += 1;
    }

    //Fire
    //Edge is 0, 1 away is 90% 0,
    for (let i = 0; i < size; i++) {
        grid[0][i].fire = 0;
        grid[1][i].fire = 0
        grid[size-1][i].fire = 0
        grid[size-2][i].fire = 0
    }
    for (let k = 0; k < 3; k++) {
        for (let j = 0; j < size; j++) {
            for (let i = 1; i < size/2; i++) {
                if (Math.random() < (i / (size))) {
                    if (grid[i][j].fire < 4) {
                        grid[i][j].fire += 1;
                    }
                    
                }
            }
            for (let i = size/2; i < size-1; i++) {
                if (Math.random() < ((size-i) / (size))) {
                    if (grid[i][j].fire < 4) {
                        grid[i][j].fire += 1;
                    }
                }
            }
        }
    }
    const coastalGrid = createZeroArray(16)
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            if (grid[x][y].earth == 0) {
                for (let i = -1; i < 2; i++) {
                    for (let j = -1; j < 2; j++) {
                        if (
                            x + i >= 0 &&
                            x + i < size &&
                            y + j >= 0 &&
                            y + j < size
                        ) {
                            coastalGrid[x + i][y + j] += 1;
                        }
                    }
                }
            }
            
        }
    }
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            if (grid[x][y].earth > 0) {
                grid[x][y].water += 0.5;
            }
            if (coastalGrid[x][y] > 0) {
                grid[x][y].water += 0.5;
            }
        }
    }
    
    for (let c = 7; c > 0; c--) {
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                if (grid[x][y].earth == c) {
                    for (let i = -1; i < 2; i++) {
                        for (let j = -1; j < 2; j++) {
                            if (
                                x + i >= 0 &&
                                x + i < size &&
                                y + j >= 0 &&
                                y + j < size
                            ) {
                                if (grid[x+i][y+j].earth < c) {
                                    grid[x + i][y + j].water += grid[x][y].water/2;
                                }
                                
                            }
                        }
                    }               
                }
            }
        }
    }
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            grid[x][y].water = Math.floor(grid[x][y].water)
            if (grid[x][y].earth == 0) {
                grid[x][y].water = 0
            }
        }
    }


    //Nature
    //Evolution!
    //Coast gets an advantage. High water and heat get an advantage.
    //Spill over from high nature areas.
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            if (grid[x][y].earth > 0) {
                if (Math.random() < 0.5) {
                    grid[x][y].nature = 0;
                } else {
                    grid[x][y].nature = 1;
                }
                if (grid[x][y].water > 0) {
                    if (Math.random() > 1/grid[x][y].water) {
                        grid[x][y].nature += 1;
                    }
                }
                if (grid[x][y].fire > 0) {
                    if (Math.random() > 1/grid[x][y].fire) {
                        grid[x][y].nature += 1;
                    }
                }
                let coast = 0
                for (let i = -1; i < 2; i++) {
                    for (let j = -1; j < 2; j++) {
                        if (
                            x + i >= 0 &&
                            x + i < size &&
                            y + j >= 0 &&
                            y + j < size
                        ) {
                            if (grid[x+i][y+j].earth == 0) {
                                coast += 1
                                
                            }
                        }
                    }
                }
                if (coast) {
                    if (Math.random() > 1/coast) {
                        grid[x][y].nature += 1;
                    }
                }
            }

        }
    }



    return grid;
}

const gridSize = 16;

function printWorldGrid(grid: Territory[][]): void {
    for (let x = 0; x < grid.length; x++) {
        let row = '';
        for (let y = 0; y < grid[x].length; y++) {
            row += grid[x][y].earth + ' ';
        }
        console.log(row);
    }
}

export { printWorldGrid, createTerritoryGrid, Territory}