function combineRules(rules, operators) {
    // Ensure the input arrays have valid lengths
    if (rules.length - 1 !== operators.length) {
        return 0;
    }

    // Initialize an empty array to hold the combined result
    let combinedString = '';

    // Loop through the rules and operators to combine them
    for (let i = 0; i < rules.length; i++) {
        combinedString += rules[i];  // Add the rule
        if (i < operators.length) {
            combinedString += ` ${operators[i]} `;  // Add the operator (only if one exists at this position)
        }
    }

    return combinedString;
}

function evaluateAst(ast, userData) {
    if (ast.type === "condition") {
      const { attribute, operator, value } = ast;
      const userValue = userData[attribute];
  
      switch (operator) {
        case ">":
          return userValue > value;
        case "<":
          return userValue < value;
        case "==":
          return userValue === value;
        case "=":  // Assuming "=" as equal to for convenience
          return userValue === value;
        case "!=":
          return userValue !== value;
        default:
          throw new Error(`Unknown operator: ${operator}`);
      }
    } else if (ast.type === "operator") {
      const { value: operator, left, right } = ast;
  
      switch (operator) {
        case "AND":
          return evaluateAst(left, userData) && evaluateAst(right, userData);
        case "OR":
          return evaluateAst(left, userData) || evaluateAst(right, userData);
        default:
          throw new Error(`Unknown logical operator: ${operator}`);
      }
    }
  
    throw new Error("Invalid AST node type");
  }

module.exports = {combineRules,evaluateAst};