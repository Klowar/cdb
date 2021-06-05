name                [A-Za-z][A-Za-z0-9_]*
int_num             [0-9]+|[0-9]+"."[0-9]* |"."[0-9]*
approx_num          [0-9]+[eE][+-]?[0-9]+|[0-9]+"."[0-9]*[eE][+-]?[0-9]+|"."[0-9]*[eE][+-]?[0-9]+
strings             ['\w']
white_space         [ \t\r\n]+
comment             "--".*$	
comparators         "=="|"<>"|"<"|">"|"<="|">="
special_symbols     "*"|","|";"|"."|"("|")"|"="

%%

// Agg functions
"AVG"               return 'AMMSC';
"MIN"               return 'AMMSC';
"MAX"               return 'AMMSC';
"SUM"               return 'AMMSC';
"COUNT"             return 'AMMSC';
// Operators
"AND"               return 'AND';
"OR"		        return 'OR';
"BETWEEN"		    return 'BETWEEN';
"NOT"		        return 'NOT';
"SET"		        return 'SET';
// Sorters
"ASC"               return 'ASC';
"DESC"		        return 'DESC';
"ORDER"		        return 'ORDER';
// Grouping
"GROUP"		        return 'GROUP';
"BY"		        return 'BY';
// Types
"SMALLINT"	        return 'SMALLINT';
"INTEGER"	        return 'INTEGER';
"FLOAT"		        return 'FLOAT';
"DOUBLE"		    return 'DOUBLE';
"CHARACTER"	        return 'CHARACTER';
"VARCHAR"	        return 'VARCHAR';
"CREATE"		    return 'CREATE';
"DATETIME"          return 'DATETIME';
"TIME"              return 'TIME';
// CRUD
"INSERT"            return 'INSERT';
"SELECT"		    return 'SELECT';
"UPDATE"		    return 'UPDATE';
"DELETE"		    return 'DELETE';
// Filters
"WHERE"		        return 'WHERE';
"DISTINCT"	        return 'DISTINCT';
"HAVING"		    return 'HAVING';
// Entityes
"SCHEMA"		    return 'SCHEMA';
"TABLE"		        return 'TABLE';
// Entity options
"UNIQUE"            return 'UNIQUE';
"LINKED"            return 'LINKED';
// Other
"VALUES"		    return 'VALUES';
"FROM"		        return 'FROM';
"INTO"		        return 'INTO';
"ALL"               return 'ALL';
"AS"                return 'AS';
"TO"		        return 'TO';
{white_space}       /* ignore white spaces */
{comment}           /* ignore comments */
{comparators}       return 'COMPARISON';
{special_symbols}   return yytext;
{name}+             return 'NAME';
{int_num}           return 'INTNUM';
{approx_num}        return 'APPROXNUM';
{strings}+          return 'STRING';