export function isCalculation(query: string): boolean {
  // Check if the query looks like a math expression
  const mathPattern = /^[\d\s\+\-\*\/\(\)\.\^%]+$/;
  const hasMathOperator = /[\+\-\*\/\^%]/.test(query);
  return mathPattern.test(query.trim()) && hasMathOperator;
}

export function evaluateExpression(expression: string): string | null {
  try {
    // Sanitize and prepare the expression
    let sanitized = expression
      .replace(/\^/g, '**') // Convert ^ to ** for exponentiation
      .replace(/\s+/g, ''); // Remove whitespace

    // Validate the expression contains only allowed characters
    if (!/^[\d\+\-\*\/\(\)\.\%]+$/.test(sanitized)) {
      return null;
    }

    // Handle percentage
    sanitized = sanitized.replace(/(\d+)%/g, '($1/100)');

    // Use Function constructor for safe evaluation
    const result = new Function(`return ${sanitized}`)();

    if (typeof result === 'number' && !isNaN(result) && isFinite(result)) {
      // Format the result nicely
      if (Number.isInteger(result)) {
        return result.toLocaleString();
      }
      // Round to 10 decimal places to avoid floating point issues
      const rounded = Math.round(result * 10000000000) / 10000000000;
      return rounded.toLocaleString(undefined, { maximumFractionDigits: 10 });
    }
    return null;
  } catch {
    return null;
  }
}
