function makeRule(ruleId) {

    let decider;
    let action;
    let ruleText = 'If number is';
    // If number is less than 2 then do nothing and go forward
    switch($('#decider').val()) {
        case 'less':
            decider = Decider.ifValLessThan($('#deciderNum').val());
            ruleText += ' less than';
            break;
        case 'equal':
            decider = Decider.ifValIs($('#deciderNum').val());
            ruleText += ' equal to';
            break;
        case 'greater':
            decider = Decider.ifValGreaterThan($('#deciderNum').val());
            ruleText += ' greater than';
            break;
    }

    ruleText += ` ${$('#deciderNum').val()}`

    let transformNum = $('#transformerNum').val();
    switch($('#transformation').val()) {
        case 'nothing':
            transform = transformer.doNothing();
            ruleText += ' then do nothing'
            break;
        case 'increment':
            transform = transformer.add(transformNum);
            ruleText += ` then add ${transformNum}`;
            break;
        case 'decrement':
            transform = transformer.subtract(transformNum);
            ruleText += ` then subtract ${transformNum}`;
            break;
        case 'set':
            transform = transformer.make(transformNum);
            ruleText += ` then make ${transformNum}`;
            break;
    }

    switch($('#action').val()) {
        case 'forward':
            action = mover.goForward.bind(mover);
            ruleText += ' and go forward';
            break;
        case 'right':
            action = mover.goRight.bind(mover);
            ruleText += ' and turn right';
            break;
        case 'left':
            action = mover.goLeft.bind(mover);
            ruleText += ' and turn left';
            break;
        case 'backward':
            action = mover.goBack.bind(mover);
            ruleText += ' and turn backward';
            break;
    }

    return [new MoveRule(ruleId, decider, transform, action), ruleText];
}