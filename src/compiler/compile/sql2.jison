
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
        create_keyword create_target simple_name_identifier {
            {
                $$ = new yy.scope.createStatement();
                $$.setTarget($3);
            }
        }
    |   create_keyword create_target simple_name_identifier '(' multi_identifier ')' {
            {
                $$ = new yy.scope.createStatement();
                $$.setTarget($3);
                $$.setColumns($5);
            }
        }
    ;

create_keyword:
        CREATE
    |   DEFINE
    |   DECLARE
    ;

create_target:
        TABLE
    |   SCHEMA
    ;

alter_statement:
        alter_keyword alter_target simple_name_identifier SET multi_expression {
            {
                $$ = new yy.scope.alterStatement();
                $$.setTarget($3);
                $$.setExpressions($5);
            }
        }
    ;

alter_keyword:
        ALTER
    |   CHANGE
    ;

alter_target:
        TABLE
    |   SCHEMA
    ;

select_statement:
        select_keyword multi_identifier FROM select_target { 
            {
                $$ = new yy.scope.selectStatement();
                $$.setColumns($2);
                $$.setTarget($4);
            }
        }
    |   select_keyword multi_identifier FROM select_target condition_clause { 
            {
                $$ = new yy.scope.selectStatement();
                $$.setColumns($2);
                $$.setTarget($4);
                $$.setWhere($5);
            }
        }
    ;

select_keyword:
        SELECT
    |   FETCH
    ;

select_target:
        identifier
    ;

insert_statement:
        insert_keyword insert_target VALUES '(' multi_literal ')' {
            {
                $$ = new yy.scope.insertStatement();
                $$.setTarget($2);
                $$.setValues($5);
            }
        }
    |   insert_keyword insert_target '(' multi_identifier ')' VALUES '(' multi_literal ')' {
            {
                $$ = new yy.scope.insertStatement();
                $$.setTarget($2);
                $$.setColumns($4);
                $$.setValues($8);
            }
        }
    ;

insert_keyword:
        INSERT
    |   INSERT INTO
    ;

insert_target:
        identifier
    ;

update_statement:
        update_keyword update_target SET expression {
            {
                $$ = new yy.scope.updateStatement();
                $$.setTarget($2);
            }
        }
    |   update_keyword update_target SET expression condition_clause {
            {
                $$ = new yy.scope.updateStatement();
                $$.setTarget($2);
                $$.setWhere($5);
            }
        }
    ;

update_keyword:
        UPDATE
    ;

update_target:
        identifier
    ;

delete_statement:
        delete_keyword FROM delete_target {
            {
                $$ = new yy.scope.deleteStatement();
                $$.setTarget($3);
            }
        }
    |   delete_keyword FROM delete_target condition_clause {
            {
                $$ = new yy.scope.deleteStatement();
                $$.setTarget($3);
                $$.setWhere($4);
            }
        }
    ;

delete_keyword:
        DELETE
    ;

delete_target:
        identifier
    ;

condition_clause:
        WHERE simple_name_identifier COMPARISON simple_name_identifier {
            {
                $$ = new yy.scope.binaryExpression({
                    lParam: $2, rParam: $4, operator: $3
                });
            }
        }
    |   WHERE simple_name_identifier COMPARISON literal {
            {
                $$ = new yy.scope.binaryExpression({
                    lParam: $2, rParam: $4, operator: $3
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

multi_identifier:
        multi_identifier ',' identifier {
            {
                $$ = Array.isArray($1) ? $1 : [$1];
                $$.push($3.setIndex($$.length));
            }
        }
    |   identifier
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
    |   NAME type constraint {
            {
                $$ = new yy.scope.typedIdentifier({ name: $1, type: $2 });
            }
        }
    ;

constraint:
        UNIQUE
    |   BETWEEN
    ;
    
type:
        INTEGER
    |   DOUBLE
    |   CHARACTER
    |   DECIMAL
    |   FLOAT
    |   DATETIME
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
                $$ = new yy.scope.literal($1);
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