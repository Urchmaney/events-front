const sucessOrError = (result, onSuccess, onError) => {
  console.log(result);
  if (result.error) {
    console.log('error here');
    onError();
  } else {
    console.log('sucess here');
    onSuccess(result.token);
  }
};

const get = (url, onSuccess, onError) => {
  fetch(url, { method: 'GET' }).then((result) => result.json())
    .then((result) => {
      sucessOrError(result, onSuccess, onError);
    }).catch(() => onError());
};

const post = (url, payload, onSuccess, onError) => {
  fetch(url,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then((result) => result.json())
    .then((result) => {
      sucessOrError(result, onSuccess, onError);
    }).catch(() => {});
};

export { get, post };
