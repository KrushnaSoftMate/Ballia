async function post(api, headers, body, multipart) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body)
  };
  const options2 = {
    method: 'POST',
    headers: { ...headers },
    body: body
  }
  if (multipart) {
    const response = await fetch(`${backend}${api}`, options2);
    return await response.json();
  }
  const response = await fetch(`${backend}${api}`, options);
  return await response.json();
}
exports = { post }