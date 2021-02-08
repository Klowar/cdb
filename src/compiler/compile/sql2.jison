
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
        select_keyword identifier FROM select_target
    |   select_keyword identifier FROM select_target condition_clause
    ;

select_keyword:
        SELECT
    |   FETCH
    ;

select_target:
        identifier
    ;

insert_statement:
        insert_keyword insert_target VALUES '(' identifier ')'
    |   insert_keyword insert_target '(' identifier ')' VALUES '(' identifier ')'
    ;

insert_keyword:
        INSERT
    |   INSERT INTO
    ;

insert_target:
        identifier
    ;

update_statement:
        update_keyword update_target SET expression
    |   update_keyword update_target SET expression condition_clause
    ;

update_keyword:
        UPDATE
    ;

update_target:
        identifier
    ;

delete_statement:
        delete_keyword FROM delete_target condition_clause
    ;

delete_keyword:
        DELETE
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

identifier:
        identifier ','
    |   ddl_identifier
    |   dml_identifier
    |   NAME
    ;

dml_identifier:
    |   alias_identifier
    |   dml_identifier '.' NAME
    |   NAME '.' NAME
    ;

alias_identifier:
        NAME AS NAME
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

literal:
        STRING
    |   INTNUM
    ;

%%