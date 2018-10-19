function element(coord) {
    return $(`#board .row.${coord[1]} .cell.${coord[0]}`);
}

function getValue(element) {
    return parseInt(element.attr('data-val'));
}

function getCoords(element) {
    return element.attr('data-coords').split(',')
        .map((coord) => parseInt(coord));
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function togglePlay() {
    if($('#play').hasClass('play')) {
        // Let's play a game!
        playing = true;
        $('#play')
            .removeClass('play')
            .addClass('stop')
            .html('STOP');
        play();
    } else {
        // Shut it all down!
        playing = false;
        $('#play')
            .removeClass('stop')
            .addClass('play')
            .html('PLAY');
    }
}

function makeRule(ruleId) {
    let decide;
    let action;
    // If number is less than 2 then do nothing and go forward
    switch($('#decider').val()) {
        case 'less':
            decide = decider.ifValLessThan($('#deciderNum').val());
            break;
        case 'equal':
            decide = decider.ifValIs($('#deciderNum').val());
            break;
        case 'greater':
            decide = decider.ifValGreaterThan($('#deciderNum').val());
            break;
    }

    let transformNum = $('#transformerNum').val();
    switch($('#transformation').val()) {
        case 'nothing':
            transform = transformer.doNothing();
            break;
        case 'increment':
            transform = transformer.add(transformNum);
            break;
        case 'decrement':
            transform = transformer.subtract(transformNum);
            break;
        case 'set':
            transform = transformer.make(transformNum);
            break;
    }

    switch($('#action').val()) {
        case 'forward':
            action = mover.goForward();
            break;
        case 'right':
            action = mover.goRight();
            break;
        case 'left':
            action = mover.goLeft();
            break;
        case 'backward':
            action = mover.goBack();
            break;
    }

    return new MoveRule(ruleId, board, decide, transform, action);
}

const modalText = {
    makeRules: "<h1>You Make the Rules!</h1> \
    But you do have to make them. Add a new rule that tells PAC-MAN where to go\
    using the control panel to the right",
    stuck: "<h1>Your PAC-MAN is stuck!</h1> \
    The definition of insanity is doing the same thing over and over again and expecting \
    different results. <br>Your PAC-MAN is stuck in the same state, with the same rules, \
    and can't move, no matter how many times you press that button!\
    <br>Why not change things up a little? You can move your PAC-MAN using the control panel to the right",
}

function makeModal(text) {
    const modal = new tingle.modal({
        footer: false,
        closeMethods: ['overlay', 'button', 'escape'],
        closeLabel: "Close",
        cssClass: ['custom-class-1', 'custom-class-2'],
    });
    modal.setContent(text);
    modal.open();
}




