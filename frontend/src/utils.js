export function isValid(value) {
  return value !== undefined && value !== null && value.length !== 0;
}

export function convertToArray(json, allowedFields, tooltipField) {
  const result = [];
  let toolTip = '';
  Object.keys(json).forEach(key => {
    if (allowedFields.includes(key)) result.push(json[key]);
  });
  if (isValid(tooltipField)) {
    json[tooltipField].forEach(key => {
      toolTip += Object.values(key).join(' : ') + '\n';
    });
    result.push(toolTip);
  }
  return result;
}
