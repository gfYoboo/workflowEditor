
export function getQueryString(key) {
  const re = new RegExp('[&,?]' + key + '=([^\\&]*)', 'i');
  const a = re.exec(document.location.search);
  if (a == null) return '';
  return a[1];
}
