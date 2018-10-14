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
    if(!ms) {
        console.log("MS IS UNDEFINED");
        ms = 1000;
    }
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

// Yeah, this is gross right now. Still playing around with it
function makeModal() {
    const modal = new tingle.modal({
        footer: false,
        closeMethods: ['overlay', 'button', 'escape'],
        closeLabel: "Close",
        cssClass: ['custom-class-1', 'custom-class-2'],
    });
    
    const makeRules = "<h1>You Make the Rules!</h1> \
    But you do have to make them. Add a new rule that tells PAC-MAN where to go\
    using the control panel to the right"
    modal.setContent(makeRules);

    
    modal.open();
}

function stuckModal() {

    const modal = new tingle.modal({
        footer: false,
        closeMethods: ['overlay', 'button', 'escape'],
        closeLabel: "Close",
        cssClass: ['custom-class-1', 'custom-class-2'],
    });
    const stuck = "<h1>Your PAC-MAN is stuck!</h1> \
    The definition of insanity is doing the same thing over and over again and expecting \
    different results. <br>Your PAC-MAN is stuck in the same state, with the same rules, \
    and can't move, no matter how many times you press that button!\
    <br>Why not change things up a little? You can move your PAC-MAN using the control panel to the right";
    modal.setContent(stuck);
    modal.open();
}




