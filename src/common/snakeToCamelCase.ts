function snakeToCamel(obj: Record<string, any>): Record<string, any> {
  const camelObj: Record<string, any> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelKey = key.replace(/_([a-z])/g, (_, match) => match.toUpperCase());
      const value = obj[key];

      if (value !== null && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date)) {
        const recursionValue: Record<string, any> = value;
        camelObj[camelKey] = snakeToCamel(recursionValue);
      } else {
        camelObj[camelKey] = value;
      }
    }
  }

  return camelObj;
}

export default snakeToCamel;
