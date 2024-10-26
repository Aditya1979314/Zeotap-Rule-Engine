start
  = expression

expression
  = or_expr

or_expr
  = left:and_expr _ "OR" _ right:or_expr { return { type: "operator", value: "OR", left: left, right: right }; }
  / and_expr

and_expr
  = left:condition _ "AND" _ right:and_expr { return { type: "operator", value: "AND", left: left, right: right }; }
  / condition

condition
  = "(" _ expr:expression _ ")" { return expr; }
  / attribute:identifier _ operator:comparison_operator _ value:literal { return { type: "condition", attribute: attribute, operator: operator, value: value }; }

identifier
  = [a-zA-Z]+ { return text(); }

comparison_operator
  = ">" / "<" / "==" / "=" / "!="

literal
  = number / string

number
  = [0-9]+ { return parseInt(text(), 10); }

string
  = "'" chars:([^']*) "'" { return chars.join(''); }

_ "whitespace"
  = [ \t\n\r]*  // Ignore whitespace
