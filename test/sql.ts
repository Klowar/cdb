import * as parser from '../src/compiler/sql';
import * as scope from './sqope';

parser.parser.yy.scope = scope;
// TODO: Use framework for testing, separate files for separate test's
// SELECT
parser.parse('SELECT * FROM t1;', scope);
parser.parse('SELECT name FROM t2;', scope);
parser.parse('SELECT name FROM t1 WHERE name > 0;', scope);

// Fails
parser.parse('SELECT a,b,c FROM t1 WHERE a > 0;', scope);
parser.parse('SELECT t1.foo FROM t1;', scope);
