/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var sql2 = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,32],$V1=[1,31],$V2=[1,33],$V3=[1,4],$V4=[1,41],$V5=[20,31,34],$V6=[31,34],$V7=[4,18,20,27,31,34,40,47],$V8=[4,18,20,27,31,34,40,47,66],$V9=[2,54],$Va=[1,80],$Vb=[1,81],$Vc=[1,82],$Vd=[1,85],$Ve=[4,47],$Vf=[1,91],$Vg=[4,34,47],$Vh=[4,34],$Vi=[1,111],$Vj=[1,110],$Vk=[4,50,51],$Vl=[1,121],$Vm=[20,34],$Vn=[4,20,34,47,50,51],$Vo=[4,34,47,50,51];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"sql":3,";":4,"statements":5,"ddl":6,"dml":7,"create_statement":8,"alter_statement":9,"select_statement":10,"insert_statement":11,"update_statement":12,"delete_statement":13,"CREATE":14,"SCHEMA":15,"simple_name_identifier":16,"TABLE":17,"(":18,"multi_identifier":19,")":20,"AS":21,"table_kind":22,"UNIQUE":23,"LINKED":24,"ALTER":25,"alter_target":26,"SET":27,"multi_expression":28,"SELECT":29,"select_params":30,"FROM":31,"select_target":32,"condition_clause":33,",":34,"multi_function":35,"identifier":36,"INSERT":37,"INTO":38,"insert_target":39,"VALUES":40,"multi_literal":41,"UPDATE":42,"update_target":43,"expression":44,"DELETE":45,"delete_target":46,"WHERE":47,"condition_part":48,"binary_expression":49,"AND":50,"OR":51,"unary_expression":52,"=":53,"literal":54,"COMPARISON":55,"NOT":56,"NAME":57,"!":58,"-":59,"function":60,"AMMSC":61,"ddl_identifier":62,"dml_identifier":63,"*":64,"alias_identifier":65,".":66,"type":67,"sized_type":68,"INTNUM":69,"INTEGER":70,"DOUBLE":71,"FLOAT":72,"DATETIME":73,"VARCHAR":74,"CHARACTER":75,"STRING":76,"$accept":0,"$end":1},
terminals_: {2:"error",4:";",14:"CREATE",15:"SCHEMA",17:"TABLE",18:"(",20:")",21:"AS",23:"UNIQUE",24:"LINKED",25:"ALTER",27:"SET",29:"SELECT",31:"FROM",34:",",37:"INSERT",38:"INTO",40:"VALUES",42:"UPDATE",45:"DELETE",47:"WHERE",50:"AND",51:"OR",53:"=",55:"COMPARISON",56:"NOT",57:"NAME",58:"!",59:"-",61:"AMMSC",64:"*",66:".",69:"INTNUM",70:"INTEGER",71:"DOUBLE",72:"FLOAT",73:"DATETIME",74:"VARCHAR",75:"CHARACTER",76:"STRING"},
productions_: [0,[3,2],[3,2],[5,1],[5,1],[6,1],[6,1],[7,1],[7,1],[7,1],[7,1],[8,3],[8,6],[8,8],[22,2],[22,2],[9,5],[26,1],[26,1],[10,4],[10,5],[30,3],[30,3],[30,1],[30,1],[32,1],[11,7],[11,10],[39,1],[12,4],[12,5],[43,1],[13,3],[13,4],[46,1],[33,2],[48,1],[48,3],[48,3],[44,1],[44,1],[49,3],[49,3],[52,2],[52,2],[52,2],[28,3],[28,1],[60,4],[60,6],[35,3],[35,1],[36,1],[36,1],[16,1],[63,1],[63,1],[63,3],[63,1],[65,3],[62,2],[62,5],[19,3],[19,1],[67,1],[67,1],[67,1],[67,1],[67,1],[68,1],[41,3],[41,1],[54,1],[54,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 2:

            {
                yy.ast.setStatement($$[$0-1]);
            }
        
break;
case 11:

            {
                this.$ = new yy.scope.createStatement();
                this.$.setObject($$[$0-1]);
                this.$.setTarget($$[$0]);
            }
        
break;
case 12:

            {
                this.$ = new yy.scope.createStatement();
                this.$.setObject($$[$0-4]);
                this.$.setTarget($$[$0-3]);
                this.$.setColumns($$[$0-1]);
            }
        
break;
case 13:

            {
                this.$ = new yy.scope.createStatement();
                this.$.setObject($$[$0]);
                this.$.setTarget($$[$0-5]);
                this.$.setColumns($$[$0-3]);
            }
        
break;
case 14:

            {
                this.$ = "UNIQUE TABLE"
            }
        
break;
case 15:

            {
                this.$ = "LINKED TABLE"
            }
        
break;
case 16:

            {
                this.$ = new yy.scope.alterStatement();
                this.$.setTarget($$[$0-2]);
                this.$.setExpressions($$[$0]);
            }
        
break;
case 19:
 
            {
                this.$ = new yy.scope.selectStatement();
                this.$.setColumns($$[$0-2]);
                this.$.setTarget($$[$0]);
            }
        
break;
case 20:
 
            {
                this.$ = new yy.scope.selectStatement();
                this.$.setColumns($$[$0-3]);
                this.$.setTarget($$[$0-1]);
                this.$.setWhere($$[$0]);
            }
        
break;
case 21: case 22:

            {
                for(const temp of $$[$0])
                    temp.setIndex(temp.index + $$[$0-2].length)
                this.$ = $$[$0-2].concat($$[$0]);
            }
        
break;
case 26:

            {
                this.$ = new yy.scope.insertStatement();
                this.$.setTarget($$[$0-4]);
                this.$.setValues($$[$0-1]);
            }
        
break;
case 27:

            {
                this.$ = new yy.scope.insertStatement();
                this.$.setTarget($$[$0-7]);
                this.$.setColumns($$[$0-5]);
                this.$.setValues($$[$0-1]);
            }
        
break;
case 29:

            {
                this.$ = new yy.scope.updateStatement();
                this.$.setTarget($$[$0-2]);
            }
        
break;
case 30:

            {
                this.$ = new yy.scope.updateStatement();
                this.$.setTarget($$[$0-3]);
                this.$.setWhere($$[$0]);
            }
        
break;
case 32:

            {
                this.$ = new yy.scope.deleteStatement();
                this.$.setTarget($$[$0]);
            }
        
break;
case 33:

            {
                this.$ = new yy.scope.deleteStatement();
                this.$.setTarget($$[$0-1]);
                this.$.setWhere($$[$0]);
            }
        
break;
case 35:

            {
                this.$ = $$[$0];
            }
        
break;
case 37: case 38: case 41: case 42:

            {
                this.$ = new yy.scope.binaryExpression({
                    lParam: $$[$0-2], rParam: $$[$0], operator: $$[$0-1]
                });
            }
        
break;
case 46: case 70:

            {
                this.$ = Array.isArray($$[$0-2]) ? $$[$0-2] : [$$[$0-2]];
                this.$.push($$[$0]);
            }
        
break;
case 48:

            {
                this.$ = new yy.scope.ammsc({ name: $$[$0-3], params: $$[$0-1] }); 
            }
        
break;
case 49:

            {
                this.$ = new yy.scope.ammsc({ name: $$[$0-5], params: $$[$0-3], alias: $$[$0] }); 
            }
        
break;
case 50: case 62:

            {
                this.$ = Array.isArray($$[$0-2]) ? $$[$0-2] : [$$[$0-2]];
                $$[$0].setIndex(this.$.length || 0);
                this.$.push($$[$0]);
            }
        
break;
case 51: case 63: case 71:

            {
                this.$ = [$$[$0]];
            }
        
break;
case 54:

            {
                this.$ = new yy.scope.identifier({ name: $$[$0] });
            }
        
break;
case 55:

            {
                this.$ = new yy.scope.identifier({ name: 'all', alias: '*' });
            }
        
break;
case 57:

            {
                this.$ = new yy.scope.identifier({ name: $$[$0], scope: $$[$0-2] })
            }
        
break;
case 59:

            {
                this.$ = new yy.scope.identifier({ name: $$[$0-2], alias: $$[$0] });
            }
        
break;
case 60:

            {
                this.$ = new yy.scope.typedIdentifier({ name: $$[$0-1], type: $$[$0] })
            }
        
break;
case 61:

            {
                this.$ = new yy.scope.typedIdentifier({ name: $$[$0-4], type: $$[$0-3], size: $$[$0-1] })
            }
        
break;
case 72:

            {
                this.$ = new yy.scope.literal($$[$0].substring(1, $$[$0].length - 1));
            }
        
break;
case 73:

            {
                this.$ = new yy.scope.literal($$[$0]);
            }
        
break;
}
},
table: [{3:1,5:2,6:3,7:4,8:5,9:6,10:7,11:8,12:9,13:10,14:[1,11],25:[1,12],29:[1,13],37:[1,14],42:[1,15],45:[1,16]},{1:[3],4:[1,17]},{4:[1,18]},{4:[2,3]},{4:[2,4]},{4:[2,5]},{4:[2,6]},{4:[2,7]},{4:[2,8]},{4:[2,9]},{4:[2,10]},{15:[1,19],17:[1,20]},{15:[1,23],17:[1,22],26:21},{16:35,19:25,30:24,35:26,36:27,57:$V0,60:28,61:$V1,62:29,63:30,64:$V2,65:34},{38:[1,36]},{16:35,36:38,43:37,57:$V0,62:29,63:30,64:$V2,65:34},{31:[1,39]},o($V3,[2,1]),o($V3,[2,2]),{16:40,57:$V4},{16:42,57:$V4},{16:43,57:$V4},{57:[2,17]},{57:[2,18]},{31:[1,44]},{31:[2,23],34:[1,45]},{31:[2,24],34:[1,46]},o($V5,[2,63]),o($V6,[2,51]),o($V7,[2,52]),o($V7,[2,53],{66:[1,47]}),{18:[1,48]},o($V8,$V9,{67:49,68:50,21:[1,51],70:[1,52],71:[1,53],72:[1,54],73:[1,55],74:[1,56],75:[1,57]}),o($V8,[2,55]),o($V8,[2,56]),o($V8,[2,58]),{16:35,36:59,39:58,57:$V0,62:29,63:30,64:$V2,65:34},{27:[1,60]},{27:[2,31]},{16:35,36:62,46:61,57:$V0,62:29,63:30,64:$V2,65:34},{4:[2,11]},o([4,18,20,27,31,34,40,47,53,55,66],$V9),{18:[1,63]},{27:[1,64]},{16:35,32:65,36:66,57:$V0,62:29,63:30,64:$V2,65:34},{16:35,35:67,36:68,57:$V0,60:28,61:$V1,62:29,63:30,64:$V2,65:34},{16:35,19:69,36:27,57:$V0,60:70,61:$V1,62:29,63:30,64:$V2,65:34},{16:71,57:$V4},{16:35,19:72,36:27,57:$V0,62:29,63:30,64:$V2,65:34},o($V7,[2,60]),{18:[1,73]},{57:[1,74]},o($V7,[2,64]),o($V7,[2,65]),o($V7,[2,66]),o($V7,[2,67]),o($V7,[2,68]),{18:[2,69]},{18:[1,76],40:[1,75]},o([18,40],[2,28]),{16:83,44:77,49:79,52:78,56:$Va,57:$V4,58:$Vb,59:$Vc},{4:[2,32],33:84,47:$Vd},o($Ve,[2,34]),{16:35,19:86,36:27,57:$V0,62:29,63:30,64:$V2,65:34},{16:83,28:87,44:88,49:79,52:78,56:$Va,57:$V4,58:$Vb,59:$Vc},{4:[2,19],33:89,47:$Vd},o($Ve,[2,25]),{31:[2,21],34:[1,90]},o($V5,[2,62]),{31:[2,22],34:$Vf},o($V6,[2,50]),o($V8,[2,57]),{20:[1,92],34:$Vf},{69:[1,93]},o($V8,[2,59]),{18:[1,94]},{16:35,19:95,36:27,57:$V0,62:29,63:30,64:$V2,65:34},{4:[2,29],33:96,47:$Vd},o($Vg,[2,39]),o($Vg,[2,40]),{57:[1,97]},{57:[1,98]},{57:[1,99]},{53:[1,100],55:[1,101]},{4:[2,33]},{16:83,48:102,49:103,57:$V4},{20:[1,104],34:$Vf},{4:[2,16],34:[1,105]},o($Vh,[2,47]),{4:[2,20]},{60:70,61:$V1},{16:35,36:68,57:$V0,62:29,63:30,64:$V2,65:34},o($V6,[2,48],{21:[1,106]}),{20:[1,107]},{41:108,54:109,69:$Vi,76:$Vj},{20:[1,112],34:$Vf},{4:[2,30]},o($Vg,[2,43]),o($Vg,[2,44]),o($Vg,[2,45]),{54:113,69:$Vi,76:$Vj},{54:114,69:$Vi,76:$Vj},{4:[2,35],50:[1,115],51:[1,116]},o($Vk,[2,36]),{4:[2,12],21:[1,117]},{16:83,44:118,49:79,52:78,56:$Va,57:$V4,58:$Vb,59:$Vc},{57:[1,119]},o($V7,[2,61]),{20:[1,120],34:$Vl},o($Vm,[2,71]),o($Vn,[2,72]),o($Vn,[2,73]),{40:[1,122]},o($Vo,[2,41]),o($Vo,[2,42]),{16:83,49:123,57:$V4},{16:83,49:124,57:$V4},{22:125,23:[1,126],24:[1,127]},o($Vh,[2,46]),o($V6,[2,49]),{4:[2,26]},{54:128,69:$Vi,76:$Vj},{18:[1,129]},o($Vk,[2,37]),o($Vk,[2,38]),{4:[2,13]},{17:[1,130]},{17:[1,131]},o($Vm,[2,70]),{41:132,54:109,69:$Vi,76:$Vj},{4:[2,14]},{4:[2,15]},{20:[1,133],34:$Vl},{4:[2,27]}],
defaultActions: {3:[2,3],4:[2,4],5:[2,5],6:[2,6],7:[2,7],8:[2,8],9:[2,9],10:[2,10],22:[2,17],23:[2,18],38:[2,31],40:[2,11],57:[2,69],84:[2,33],89:[2,20],96:[2,30],120:[2,26],125:[2,13],130:[2,14],131:[2,15],133:[2,27]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:return 61;
break;
case 1:return 61;
break;
case 2:return 61;
break;
case 3:return 61;
break;
case 4:return 61;
break;
case 5:return 50;
break;
case 6:return 51;
break;
case 7:return 'BETWEEN';
break;
case 8:return 56;
break;
case 9:return 27;
break;
case 10:return 'ASC';
break;
case 11:return 'DESC';
break;
case 12:return 'ORDER';
break;
case 13:return 'GROUP';
break;
case 14:return 'BY';
break;
case 15:return 'SMALLINT';
break;
case 16:return 70;
break;
case 17:return 72;
break;
case 18:return 71;
break;
case 19:return 75;
break;
case 20:return 74;
break;
case 21:return 14;
break;
case 22:return 73;
break;
case 23:return 'TIME';
break;
case 24:return 37;
break;
case 25:return 29;
break;
case 26:return 42;
break;
case 27:return 45;
break;
case 28:return 47;
break;
case 29:return 'DISTINCT';
break;
case 30:return 'HAVING';
break;
case 31:return 15;
break;
case 32:return 17;
break;
case 33:return 23;
break;
case 34:return 24;
break;
case 35:return 40;
break;
case 36:return 31;
break;
case 37:return 38;
break;
case 38:return 'ALL';
break;
case 39:return 21;
break;
case 40:return 'TO';
break;
case 41:/* ignore white spaces */
break;
case 42:/* ignore comments */
break;
case 43:return 55;
break;
case 44:return yy_.yytext;
break;
case 45:return 57;
break;
case 46:return 69;
break;
case 47:return 'APPROXNUM';
break;
case 48:return 76;
break;
}
},
rules: [/^(?:AVG\b)/,/^(?:MIN\b)/,/^(?:MAX\b)/,/^(?:SUM\b)/,/^(?:COUNT\b)/,/^(?:AND\b)/,/^(?:OR\b)/,/^(?:BETWEEN\b)/,/^(?:NOT\b)/,/^(?:SET\b)/,/^(?:ASC\b)/,/^(?:DESC\b)/,/^(?:ORDER\b)/,/^(?:GROUP\b)/,/^(?:BY\b)/,/^(?:SMALLINT\b)/,/^(?:INTEGER\b)/,/^(?:FLOAT\b)/,/^(?:DOUBLE\b)/,/^(?:CHARACTER\b)/,/^(?:VARCHAR\b)/,/^(?:CREATE\b)/,/^(?:DATETIME\b)/,/^(?:TIME\b)/,/^(?:INSERT\b)/,/^(?:SELECT\b)/,/^(?:UPDATE\b)/,/^(?:DELETE\b)/,/^(?:WHERE\b)/,/^(?:DISTINCT\b)/,/^(?:HAVING\b)/,/^(?:SCHEMA\b)/,/^(?:TABLE\b)/,/^(?:UNIQUE\b)/,/^(?:LINKED\b)/,/^(?:VALUES\b)/,/^(?:FROM\b)/,/^(?:INTO\b)/,/^(?:ALL\b)/,/^(?:AS\b)/,/^(?:TO\b)/,/^(?:([ \t\r\n]+))/,/^(?:(--.*$))/,/^(?:(==|<>|<|>|<=|>=))/,/^(?:(\*|,|;|\.|\(|\)|=))/,/^(?:([A-Za-z][A-Za-z0-9_]*)+)/,/^(?:([0-9]+|[0-9]+\.[0-9]*|\.[0-9]*))/,/^(?:([0-9]+[eE][+-]?[0-9]+|[0-9]+\.[0-9]*[eE][+-]?[0-9]+|\.[0-9]*[eE][+-]?[0-9]+))/,/^(?:(['\w'])+)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = sql2;
exports.Parser = sql2.Parser;
exports.parse = function () { return sql2.parse.apply(sql2, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}