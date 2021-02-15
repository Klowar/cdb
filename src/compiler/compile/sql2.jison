
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
    |   statements ';'
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
        create_keyword create_target NAME
    |   create_keyword create_target NAME '(' identifier ')'
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
        alter_keyword alter_target NAME SET expression
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
        select_keyword multi_identifier FROM select_target
    |   select_keyword multi_identifier FROM select_target condition_clause
    ;

select_keyword:
        SELECT {
            {
                const a = new yy.scope.selectStatement();
				yy.ast.setStatement(a);
            }
        }
    |   FETCH
    ;

select_target:
        identifier
    ;

insert_statement:
        insert_keyword insert_target VALUES '(' multi_literal ')'
    |   insert_keyword insert_target '(' multi_identifier ')' VALUES '(' multi_literal ')'
    ;

insert_keyword:
        INSERT
    |   INSERT INTO {
        {
            const a = new yy.scope.insertStatement();
            yy.ast.setStatement(a);
        }
    }
    ;

insert_target:
        identifier
    ;

update_statement:
        update_keyword update_target SET expression
    |   update_keyword update_target SET expression condition_clause
    ;

update_keyword:
        UPDATE {
            {
                const a = new yy.scope.updateStatement();
				yy.ast.setStatement(a);
            }
        }
    ;

update_target:
        identifier
    ;

delete_statement:
        delete_keyword FROM delete_target
    |   delete_keyword FROM delete_target condition_clause
    ;

delete_keyword:
        DELETE {
            {
                const a = new yy.scope.deleteStatement();
				yy.ast.setStatement(a);
            }
        }
    ;

delete_target:
        identifier
    ;

condition_clause:
        WHERE identifier COMPARISON identifier
    |   WHERE identifier COMPARISON literal
    ;

expression:
        expression ','
    |   unary_expression
    |   binary_expression
    ;

binary_expression:
        NAME '=' literal
    ;

unary_expression:
        NOT NAME
    |   '!' NAME
    |   '-' NAME
    ;

multi_identifier:
        multi_identifier ',' identifier
    |   identifier
    ;

identifier:
        ddl_identifier
    |   dml_identifier
    ;

dml_identifier:
        '*' {
            {
                const a = new yy.scope.identifier({ name: 'all', alias: '*' });
				yy.ast.statement.addColumn(a);
            }
        }
    |   alias_identifier
    |   dml_identifier '.' NAME
    |   NAME {
            {
                const a = new yy.scope.identifier({ name: $1 });
				yy.ast.statement.addColumn(a);
            }
        }
    ;

alias_identifier:
        NAME AS NAME {
            {
                const a = new yy.scope.identifier({ name: $1, alias: $2 });
				yy.ast.statement.addColumn(a);
            }
        }
    ;

ddl_identifier:
        NAME type
    |   NAME type constraint
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
        multi_literal ',' literal
    |   literal
    ;

literal:
        STRING
    |   INTNUM
    ;
// ../../node_modules/.bin/jison compile/sql2.jison compile/sql.jisonlex 
%%