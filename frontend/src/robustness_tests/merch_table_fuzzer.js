/*
    findNonTerminals(expr)

    INPUTS:
    ------
    expr = expression to be analyzed for nonterminals

    OUTPUTS:
    ------
    String[]: nonterminals found in expression
*/
function findNonTerminals(expr) {
    const eq = [...expr.matchAll(/(<[^<> ]*>)/g)];
    const out = [];
    eq.forEach((entry) => {
        if (entry === "<>") return;
        out.push(entry[0]);
    })
    return out;
}

/*
    tryString(gram, st, max_nt, max_et)

    INPUTS:
    ------
    gram = grammar to be used in fuzzing
    st = starting term
    maxNt = maximum nonterminals; max size the term can grow up to
    maxEt = maximum expansion trials; max amount of times the function can expand the term to try to get it under the maximum nonterminals

    OUTPUTS:
    ------
    String: random equation
*/
function tryString(gram, st, maxNt, maxEt) {
    var res = st;
    var currEt = 0;

    while (findNonTerminals(res).length > 0 && currEt < maxEt) {
        const nt = findNonTerminals(res);
        const candidate = nt[Math.floor(Math.random() * nt.length)];
        const choices = gram[candidate];
        if (!choices) return "<S>";
        const choice = choices[Math.floor(Math.random() * choices.length)];

        const replaced = res.replace(candidate, choice, 1);
        if (findNonTerminals(res).length < maxNt) {
            res = replaced;
            currEt = 0;
        } else {
            currEt += 1;
        }
    }
    return res;
}

/*
    generateString(args)

    INPUTS:
    ------
    args = object such as the following:
    {
        grammar: Expression grammar for the fuzzer, default is what is given by question 3's specifications,
        startTerm: Starting term, default is '<S>',
        maxNonTerminals: Maximum non terminals that can exist in the expression at once, default is 25,
        maxExpansionTrials: Maximum times the function can attempt to reduce the non terminals to under maxNonTerminals, default is 10,
        numberOfEquations: Number of equations generated, default is 10,
    }
    ++ if some of the objects are not given, then the defaults are used.
    ++ args may be a blank object.

    OUTPUTS:
    ------
    Object: {
        equations: An array of the generated equations,
        avg: Average number of attempts taken per equation,
        total: Total number of attempts across all equations,
        time: Time taken to complete generation of equations in seconds
    }
*/
function generateString(args) {
    const grammar = args.grammar || GRAMMAR;
    const startTerm = args.startTerm || '<S>';
    const maxNonTerminals = args.maxNonTerminals || 25;
    const maxExpansionTrials = args.maxExpansionTrials || 10;
    const numberOfEquations = args.numberOfEquations || 50;
    const maxLength = args.maxLength || 50;

    var totalAttempts = 0;
    var eqs = [];

    const start = Date.now();
    for (var i=1; i < numberOfEquations; i++) {
        var attempts = 1;
        var eq = tryString(grammar, startTerm, maxNonTerminals, maxExpansionTrials);
        while (findNonTerminals(eq).length > 0 || eq.length > maxLength) {
            eq = tryString(grammar, startTerm, maxNonTerminals, maxExpansionTrials);
            attempts +=1;
        }
        eqs.push(eq);
        totalAttempts += attempts;
    }

    const averageAttempts = totalAttempts/numberOfEquations;
    const time = (Date.now() - start)/1000;
    
    return {
        strings: eqs,
        avg: averageAttempts,
        total: totalAttempts,
        time: time
    }
}




/*
    DEMONSTRATION:
    generates 50 random equations with the fuzzer (by default)
    change this number to any desired number
    it takes about 2-3 attempts to generate one valid equation with this function on average on default settings (based on 50000 trials, which took about 60 seconds)

    change maxNonTerminals for longer/shorter equations (which will in turn take longer/shorter to generate)
*/

// grammar

function getString(period=100){
    const chars = [];
    for (let i = 33; i <= 126; i++) {
        chars.push(String.fromCharCode(i));
    }

    const GRAMMAR = {
        '<S>': ['<Str>'],
        '<Str>': ['<Str><Char>', '<Str><Space><Str>', '<Char>'],
        '<Char>': chars,
        '<Space>': [' ']
    }
    
    const settings = {
        grammar: GRAMMAR,
        maxNonTerminals: 300,
        maxExpansionTrials: 100,
        startTerm: '<S>',
        numberOfStrings: period || 100,
        maxLength: 100
    }
    
    return generateString(settings);
}

export default getString;