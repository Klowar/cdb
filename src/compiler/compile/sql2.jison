
%left OR
%left AND
%left NOT
%left COMPARISON 
%left '+' '-'
%left '*' '/'
%nonassoc UMINUS

%%

sql: 
        sql ';'
    |   statements ';' {
            {
                yy.ast.setStatement($1);
            }
        }
    ;

statements:
        ddl
    |   dml 
    ;

ddl:
        create_statement
    |   alter_statement
    ;

dml:
        select_statement
    |   insert_statement
    |   update_statement
    |   delete_statement
    ;

create_statement:
        CREATE SCHEMA simple_name_identifier {
            {
                $$ = new yy.scope.createStatement();
                $$.setObject($2);
                $$.setTarget($3);
            }
        }
    |   CREATE TABLE simple_name_identifier '(' multi_identifier ')' {
            {
                $$ = new yy.scope.createStatement();
                $$.setObject($2);
                $$.setTarget($3);
                $$.setColumns($5);
            }
        }
    |   CREATE TABLE simple_name_identifier '(' multi_identifier ')' AS table_kind {
            {
                $$ = new yy.scope.createStatement();
                $$.setObject($8);
                $$.setTarget($3);
                $$.setColumns($5);
            }
        }
    ;

table_kind:
        UNIQUE TABLE {
            {
                $$ = "UNIQUE TABLE"
            }
        }
    |   LINKED TABLE {
            {
                $$ = "LINKED TABLE"
            }
        }
    ;

alter_statement:
        ALTER alter_target simple_name_identifier SET multi_expression {
            {
                $$ = new yy.scope.alterStatement();
                $$.setTarget($3);
                $$.setExpressions($5);
            }
        }
    ;

alter_target:
        TABLE
    |   SCHEMA
    ;

select_statement:
        SELECT select_params FROM select_target { 
            {
                $$ = new yy.scope.selectStatement();
                $$.setColumns($2);
                $$.setTarget($4);
            }
        }
    |   SELECT select_params FROM select_target condition_clause { 
            {
                $$ = new yy.scope.selectStatement();
                $$.setColumns($2);
                $$.setTarget($4);
                $$.setWhere($5);
            }
        }
    ;

select_params:
        multi_identifier ',' multi_function {
            {
                for(const temp of $3)
                    temp.setIndex(temp.index + $1.length)
                $$ = $1.concat($3);
            }
        }
    |   multi_function ',' multi_identifier {
            {
                for(const temp of $3)
                    temp.setIndex(temp.index + $1.length)
                $$ = $1.concat($3);
            }
        }
    |   multi_identifier
    |   multi_function
    ;

select_target:
        identifier
    ;

insert_statement:
        INSERT INTO insert_target VALUES '(' multi_literal ')' {
            {
                $$ = new yy.scope.insertStatement();
                $$.setTarget($2);
                $$.setValues($5);
            }
        }
    |   INSERT INTO insert_target '(' multi_identifier ')' VALUES '(' multi_literal ')' {
            {
                $$ = new yy.scope.insertStatement();
                $$.setTarget($2);
                $$.setColumns($4);
                $$.setValues($8);
            }
        }
    ;

insert_target:
        identifier
    ;

update_statement:
        UPDATE update_target SET expression {
            {
                $$ = new yy.scope.updateStatement();
                $$.setTarget($2);
            }
        }
    |   UPDATE update_target SET expression condition_clause {
            {
                $$ = new yy.scope.updateStatement();
                $$.setTarget($2);
                $$.setWhere($5);
            }
        }
    ;

update_target:
        identifier
    ;

delete_statement:
        DELETE FROM delete_target {
            {
                $$ = new yy.scope.deleteStatement();
                $$.setTarget($3);
            }
        }
    |   DELETE FROM delete_target condition_clause {
            {
                $$ = new yy.scope.deleteStatement();
                $$.setTarget($3);
                $$.setWhere($4);
            }
        }
    ;

delete_target:
        identifier
    ;

condition_clause:
        WHERE condition_part {
            {
                $$ = $2;
            }
        }
    ;

condition_part:
        binary_expression
    |
        condition_part AND binary_expression {
            {
                $$ = new yy.scope.binaryExpression({
                    lParam: $1, rParam: $3, operator: $2
                });
            }
        }
    |   condition_part OR binary_expression {
            {
                $$ = new yy.scope.binaryExpression({
                    lParam: $1, rParam: $3, operator: $2
                });
            }
        }
    ;

expression:
        unary_expression
    |   binary_expression
    ;

binary_expression:
        simple_name_identifier '=' literal {
            {
                $$ = new yy.scope.binaryExpression({
                    lParam: $1, rParam: $3, operator: $2
                });
            }
        }
    |   simple_name_identifier COMPARISON literal {
            {
                $$ = new yy.scope.binaryExpression({
                    lParam: $1, rParam: $3, operator: $2
                });
            }
        }
    ;

unary_expression:
        NOT NAME
    |   '!' NAME
    |   '-' NAME
    ;

multi_expression:
        multi_expression ',' expression {
            {
                $$ = Array.isArray($1) ? $1 : [$1];
                $$.push($3);
            }
        }
    |   expression
    ;

function:
        AMMSC '(' multi_identifier ')' {
            {
                $$ = new yy.scope.ammsc({ name: $1, params: $3 }); 
            }
        }
    |   AMMSC '(' multi_identifier ')' AS NAME {
            {
                $$ = new yy.scope.ammsc({ name: $1, params: $3, alias: $6 }); 
            }
        }
    ;

multi_function:
        multi_function ',' function {
            {
                $$ = Array.isArray($1) ? $1 : [$1];
                $3.setIndex($$.length || 0);
                $$.push($3);
            }
        }
    |   function {
            {
                $$ = [$1];
            }
        }
    ;

identifier:
        ddl_identifier
    |   dml_identifier
    ;

simple_name_identifier:
        NAME {
            {
                $$ = new yy.scope.identifier({ name: $1 });
            }
        }
    ;

dml_identifier:
        '*' {
            {
                $$ = new yy.scope.identifier({ name: 'all', alias: '*' });
            }
        }
    |   alias_identifier
    |   dml_identifier '.' simple_name_identifier {
            {
                $$ = new yy.scope.identifier({ name: $3, scope: $1 })
            }
        }
    |   simple_name_identifier
    ;

alias_identifier:
        NAME AS NAME {
            {
                $$ = new yy.scope.identifier({ name: $1, alias: $3 });
            }
        }
    ;

ddl_identifier:
        NAME type {
            {
                $$ = new yy.scope.typedIdentifier({ name: $1, type: $2 })
            }
        }
    |   NAME sized_type '(' INTNUM ')' {
            {
                $$ = new yy.scope.typedIdentifier({ name: $1, type: $2, size: $4 })
            }
        }
    ;

multi_identifier:
        multi_identifier ',' identifier {
            {
                $$ = Array.isArray($1) ? $1 : [$1];
                $3.setIndex($$.length || 0);
                $$.push($3);
            }
        }
    |   identifier {
            {
                $$ = [$1];
            }
        }
    ;
    
type:
        INTEGER
    |   DOUBLE
    |   FLOAT
    |   DATETIME
    |   VARCHAR
    ;

sized_type:
        CHARACTER
    ;

multi_literal:
        multi_literal ',' literal {
            {
                $$ = Array.isArray($1) ? $1 : [$1];
                $$.push($3);
            }
        }
    |   literal
    ;

literal:
        STRING {
            {
                $$ = new yy.scope.literal($1.substring(1, $1.length - 1));
            }
        }
    |   INTNUM {
            {
                $$ = new yy.scope.literal($1);
            }
        }
    ;
// ../../node_modules/.bin/jison compile/sql2.jison compile/sql.jisonlex 
%%