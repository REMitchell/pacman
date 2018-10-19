class Board {
    constructor(width, height, mode, state) {
        this.mode = mode;
        this.width = width;
        this.height = height;
        this.state = state;
    }

    setup() {
        for(let i = 0; i < this.height; i++ ) {
            $('#board').append(`<div class="row ${i}"></div>`)
        }
        
        for(let i = 0; i < this.height; i++) {
            let cells = '';
            for(let j = 0; j < this.width; j++) {
                cells += `<div class="cell ${j}" data-val="-1" data-coords="${j},${i}"></div>`
            }
            $(`#board .row.${i}`).append(cells);
        }

        this.setLayout({
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

    setLayout(layout) {
        // Set all cells to walls first
        $('.cell').each((i, cell) => {
            this.setValue($(cell), -1);
        });

        const numStates = 10;
        for(let val = 1; val < numStates; val++) {
            if(layout[val]) {
                layout[val].forEach((coord) => {
                    this.setValue(element(coord), val);
                });
            }
        }
    }

    emptyLayout() {
        return {0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6:[], 7: [], 8: [], 9: []};
    }

    allSquares() {
        const layout = this.emptyLayout();
        for(let x = 0; x < this.width; x++) {
            for(let y = 0; y < this.height; y++) {
                if(x === 0 && y!== 0) {
                    layout[3].push([x, y]);
                }
                else if(x === this.width-1) {
                    layout[2].push([x, y]);
                } else {
                    layout[1].push([x, y]);
                }
                
            }
        }
        return layout;

    }

    roundabout() {
        const layout = this.emptyLayout();
        for(let x = 0; x < this.width; x++) {
            for(let y = 0; y < this.height; y++) {
                if(x === 0 || y === this.height-1) {
                    layout[4].push([x, y]);
                }
                else if(y === 0 ||  x === this.width-1) {
                    layout[9].push([x, y]);
                } else {
                    layout[1].push([x, y]);
                }
                
            }
        }
        return layout;

    }

    halfandhalf() {
        const layout = this.emptyLayout();
        for(let x = 0; x < this.width; x++) {
            for(let y = 0; y < this.height; y++) {
                if(x > y) {
                    layout[3].push([x, y]);
                } else if(y > x) {
                    layout[2].push([x, y])
                } else if(x === y) {
                    layout[4].push([x, y])
                }
            }
        }
        return layout;
    }

    getLayout() {
        const layout = this.emptyLayout();
        $('#board .row .cell').each((i, cell) => {
            const val = getValue($(cell));
            if(val !== -1) {
                layout[val].push(getCoords($(cell)));
            }
        });
        console.log(JSON.stringify(layout));
        return layout;
    }

    setValue(element, val) {
        val = val > 8 ? 9 : val;
        val = val < -1 ? -1 : val;
    
        // Remove old class and HTML
        element.removeClass("wall val0 val1 val2 val3 val4 val5 val6 val7 val8 val9");
        element.html('');

        // Set the data val
        element.attr('data-val', val);
        // Set new class
        if(val === -1) {
            // Don't add HTML content if call
            element.addClass(`wall`);
            return;
        } else {
            element.addClass(`val${val}`);
        }
        // Add new HTML content
        if(this.mode === 'numbers') {
            element.html(val);
        } else {
            if(val == 0) {
                element.html('');
            } else if(val == 1) {
                element.html('&centerdot;');
            } else if(val == 2) {
                element.html('&bull;');
            } 
        }
    }

    updateCountScore(updateVal) {
        let score = parseInt($('#scores .count').html());
        score = score + parseInt(updateVal);
        $('#scores .count').html(score);
    }

    updateTraverseScore() {
        let score = parseInt($('#scores .traversed').html());
        score++;
        $('#scores .traversed').html(score);
    }
}


