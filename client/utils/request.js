/**
postData('https://example.com/answer', { answer: 42 }).then( data => {
  console.log(data); // JSON data parsed by `response.json()` call
});
*/

// Example POST method implementation:
export function postData(url = '', data = {}) {
  console.log(url);
  console.log(JSON.stringify(data));

  fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache', 
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'data': JSON.stringify(data)
    }
  })
  .then(response => cb(response))
  .catch(error => cb(error))
  .then(response => cb(response));
};


