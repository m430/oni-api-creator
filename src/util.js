export function getPathParams(url) {
  let regex = /{([^}]+)}/g;
  let pathParams = [];
  let currentMatch;
  while (currentMatch = regex.exec(url)) {
    pathParams.push(currentMatch[1]);
  }
  return pathParams;
}

export function getMethodType(url) {
  let urls = url.split(/\s+/);
  return {
    method: urls[0],
    url: urls[1]
  }
};