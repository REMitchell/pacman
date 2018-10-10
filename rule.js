class MoveRule {
    constructor(id, decider, transform, action){
        this.id = id;
        this.decider = decider;
        this.transform = transform;
        this.action = action;
    }

    execute(state) {
        if(this.decider(state.coords)) {
            this.transform(state.coords);
            return [this.action(state), true]
        }
        return [state, false];
    }
}

class Transform {

    static doNothing() {
        return (coords) => {
            return;
        }
    }

    static make(val) {
        return (coords) => {
            setValue(element(coords), val);
        }
    }

    static increment() {
        return (coords) => {
            setValue(element(coords), getValue(element(coords)) + 1);
        }
    }

    static decrement() {
        return (coords) => {
            setValue(element(coords), getValue(element(coords)) - 1);
        }
    }

}

class Decider {

    static ifValIs(val) {
        return (coords) => {
            return getValue(element(coords)) == val;
        }
    }

    static ifValLessThan(val) {
        return (coords) => {
            return getValue(element(coords)) < val;
        }
    }

    static ifValGreaterThan(val) {
        return (coords) => {
            return getValue(element(coords)) > val;
        }
    }
}

class Mover {
    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.directions = ['LEFT', 'RIGHT', 'UP', 'DOWN']
    }

    goForward(state) {
        switch (state.direction) {
            case 'LEFT':
                return this.moveAbsLeft(state);
            case 'RIGHT':
                return this.moveAbsRight(state);
            case 'UP':
                return this.moveAbsUp(state);
            case 'DOWN':
                return this.moveAbsDown(state);
        }
    }

    goBack(state) {
        switch (state.direction) {
            case 'LEFT':
                return this.moveAbsRight(state);
            case 'RIGHT':
                return this.moveAbsLeft(state);
            case 'UP':
                return this.moveAbsDown(state);
            case 'DOWN':
                return this.moveAbsUp(state);
        }
    }

    goRight(state) {
        switch (state.direction) {
            case 'LEFT':
                return this.moveAbsUp(state);
            case 'RIGHT':
                return this.moveAbsDown(state);
            case 'UP':
                return this.moveAbsRight(state);
            case 'DOWN':
                return this.moveAbsLeft(state);
        }
    }

    goLeft(state) {
        switch (state.direction) {
            case 'LEFT':
                return this.moveAbsDown(state);
            case 'RIGHT':
                return this.moveAbsUp(state);
            case 'UP':
                return this.moveAbsLeft(state);
            case 'DOWN':
                return this.moveAbsRight(state);
        }
    }

    rotatePacman(state) {
        if($('.pacman').hasClass('pacman-UP')) {
            state.direction = 'RIGHT';
        } else if($('.pacman').hasClass('pacman-RIGHT')) {
            state.direction = 'DOWN';
        } else if($('.pacman').hasClass('pacman-DOWN')) {
            state.direction = 'LEFT';
        } else if($('.pacman').hasClass('pacman-LEFT')) {
            state.direction = 'UP';
        }

        $('.pacman').removeClass('pacman-UP pacman-DOWN pacman-LEFT pacman-RIGHT')
            .addClass(`pacman-${state.direction}`);
    }

    movePacman(state) {
        $('.pacman').removeClass('pacman pacman-UP pacman-DOWN pacman-LEFT pacman-RIGHT');
        element(state.coords).addClass('pacman').addClass(`pacman-${state.direction}`);
    }

    isWall(coords) {
        return element(coords).hasClass('wall');
    }

    moveAbsUp(state) {
        state.direction = 'UP';
        if(state.coords[1] > 0 && !this.isWall([state.coords[0], state.coords[1] - 1])) {
            state.coords[1] -= 1;
        }
        this.movePacman(state);
        return state;
    }

    moveAbsDown(state) {
        state.direction = 'DOWN';
        if(state.coords[1] < height - 1 && !this.isWall([state.coords[0], state.coords[1] + 1])) {
            state.coords[1] += 1;
        }
        this.movePacman(state);
        return state;
    }

    moveAbsRight(state) {
        state.direction = 'RIGHT';
        if(state.coords[0] < width - 1 && !this.isWall([state.coords[0] + 1, state.coords[1]])) {
            state.coords[0] += 1;
        }
        this.movePacman(state);
        return state;
    }

    moveAbsLeft(state) {
        state.direction = 'LEFT';
        if(state.coords[0] > 0 && !this.isWall([state.coords[0] - 1, state.coords[1]])) {
            state.coords[0] -= 1;
        }
        this.movePacman(state);
        return state;
    }
}