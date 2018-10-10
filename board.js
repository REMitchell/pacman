class Board {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    setup() {
        for(let i = 0; i < this.height; i++ ) {
            $('#board').append(`<div class="row ${i}"></div>`)
        }
        
        for(let i = 0; i < this.height; i++) {
            let cells = '';
            for(let j = 0; j < this.width; j++) {
                cells += `<div class="cell ${j} wall" data-val="-1" data-coords="${j},${i}"></div>`
            }
            $(`#board .row.${i}`).append(cells);
        }

        this.initializeState({
            0: [],
            1: [
                [2,1], [3,1], [4,1], [6,1], [7,1], [8,1],
                [1, 2], [5, 2], [9, 2],
                [1, 3], [5, 3], [9, 3],
                [1, 4], [5, 4], [9, 4],
                [2,5], [3,5], [4,5], [6,5], [7,5], [8,5],
            ],
            2: [[1,1], [5,1], [9, 1],
                [1, 5], [5,5], [9,5]],
        });
    }

    initializeState(state) {
        const numStates = 10;
        for(let val = 1; val < numStates; val++) {
            if(state[val]) {
                state[val].forEach((coord) => {
                    setValue(element(coord), val);
                });
            }
        }
    }
}


