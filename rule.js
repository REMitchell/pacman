class MoveRule {
    // deciders, transformers, and actions have the format of:
    // [<function>, <string representation>] for easy execution
    // and printing!
    constructor(id, board, decider, transform, action) {
        this.id = id;
        this.board = board;
        this.decider = decider;
        this.transform = transform;
        this.action = action;
    }

    // Returns the state and whether or not an action has been taken
    execute() {
        if(this.decider[0](this.board.state.coords)) {
            this.transform[0](this.board.state.coords);
            this.action[0](this.board.state);
            return true;
        }
        return false;
    }

    toString() {
        return `If number is ${this.decider[1]}, then ${this.transform[1]} and ${this.action[1]}`;
    }
}

class Decider {

    constructor(board) {
        this.board = board;
    }

    ifValIs(val) {
        return [() => getValue(element(this.board.state.coords)) == val, `equal to ${val}`];
    }

    ifValLessThan(val) {
        return [() => getValue(element(this.board.state.coords)) < val, `less than ${val}`];
    }

    ifValGreaterThan(val) {
        return [() => getValue(element(this.board.state.coords)) > val, `greater than ${val}`];
    }
}

class Transformer {
    constructor(board) {
        this.board = board;
    }

    doNothing() {
        return [() => null, `do nothing`];
    }

    make(val) {
        return [() => {
            const score = Math.abs(getValue(element(this.board.state.coords)) - val);
            this.board.updateCountScore(score);
            this.board.setValue(element(this.board.state.coords), val);
        }, `set equal to ${val}`]
    }

    add(val) {
        return [() => {
            this.board.updateCountScore(val);
            this.board.setValue(element(this.board.state.coords), getValue(element(this.board.state.coords)) + val);
        }, `add ${val}`];
    }

    subtract(val) {
        return [() => {
            this.board.updateCountScore(val);
            this.board.setValue(element(this.board.state.coords), getValue(element(this.board.state.coords)) - val);
        }, `subtract ${val}`];
    }

}

class Mover {
    constructor(board) {
        this.board = board;
    }
    // These next four methods could really be put in an object like
    // {forward: {'LEFT': this.moveAbsLeft(), 'RIGHT': this.moveAbsRight()...}}
    // but we're using a lot of switch statements already, so we might as well
    // keep the trend going
    goForward() {
        return [() => {
            switch (this.board.state.direction) {
                case 'LEFT':
                    this.moveAbsLeft();
                    break;
                case 'RIGHT':
                    this.moveAbsRight();
                    break;
                case 'UP':
                    this.moveAbsUp();
                    break;
                case 'DOWN':
                    this.moveAbsDown();
                    break;
            }
        }, 'go forwards'];

    }

    goBack() {
        return [() => {
                switch (this.board.state.direction) {
                    case 'LEFT':
                        this.moveAbsRight();
                        break;
                    case 'RIGHT':
                        this.moveAbsLeft();
                        break;
                    case 'UP':
                        return this.moveAbsDown();
                        break;
                    case 'DOWN':
                        this.moveAbsUp();
                        break;
                }
            }, 'go backwards'];
    }

    goRight() {
        return [() => {
            switch (this.board.state.direction) {
                case 'LEFT':
                    this.moveAbsUp();
                    break;
                case 'RIGHT':
                    this.moveAbsDown();
                    break;
                case 'UP':
                    this.moveAbsRight();
                    break;
                case 'DOWN':
                    this.moveAbsLeft();
                    break;
            }
        }, 'go right'];
    }

    goLeft() {
        return [() => {
            switch (this.board.state.direction) {
                case 'LEFT':
                    this.moveAbsDown();
                    break;
                case 'RIGHT':
                    this.moveAbsUp();
                    break;
                case 'UP':
                    this.moveAbsLeft();
                    break;
                case 'DOWN':
                    this.moveAbsRight();
                    break;
            }
        }, 'go left'];
    }

    rotatePacman() {
        if($('.pacman').hasClass('pacman-UP')) {
            this.board.state.direction = 'RIGHT';
        } else if($('.pacman').hasClass('pacman-RIGHT')) {
            this.board.state.direction = 'DOWN';
        } else if($('.pacman').hasClass('pacman-DOWN')) {
            this.board.state.direction = 'LEFT';
        } else if($('.pacman').hasClass('pacman-LEFT')) {
            this.board.state.direction = 'UP';
        }

        $('.pacman').removeClass('pacman-UP pacman-DOWN pacman-LEFT pacman-RIGHT')
            .addClass(`pacman-${this.board.state.direction}`);
    }

    movePacman() {
        $('.pacman').removeClass('pacman pacman-UP pacman-DOWN pacman-LEFT pacman-RIGHT');
        element(this.board.state.coords).addClass('pacman').addClass(`pacman-${this.board.state.direction}`);
        // Update the score
        this.board.updateTraverseScore();
    }

    isWall(coords) {
        return element(coords).hasClass('wall');
    }

    moveAbsUp() {
        this.board.state.direction = 'UP';
        if(this.board.state.coords[1] > 0 
            && !this.isWall([this.board.state.coords[0], this.board.state.coords[1] - 1])) {
            this.board.state.coords[1] -= 1;
        }
        this.movePacman(state);
    }

    moveAbsDown() {
        this.board.state.direction = 'DOWN';
        if(this.board.state.coords[1] < this.board.height - 1 
            && !this.isWall([this.board.state.coords[0], this.board.state.coords[1] + 1])) {
            this.board.state.coords[1] += 1;
        }
        this.movePacman(state);
    }

    moveAbsRight() {
        this.board.state.direction = 'RIGHT';
        if(this.board.state.coords[0] < this.board.width - 1 
            && !this.isWall([this.board.state.coords[0] + 1, this.board.state.coords[1]])) {
                this.board.state.coords[0] += 1;
        }
        this.movePacman(this.board.state);
    }

    moveAbsLeft() {
        this.board.state.direction = 'LEFT';
        if(this.board.state.coords[0] > 0 
            && !this.isWall([this.board.state.coords[0] - 1, this.board.state.coords[1]])) {
                this.board.state.coords[0] -= 1;
        }
        this.movePacman(this.board.state);
    }
}
