const sucessOrError = (result, onSuccess, onError) => {
  if (result.error) {
    onError(result.error);
  } else {
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
  return fetch(url,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then((result) => result.json())
    .then((result) => {
      sucessOrError(result, onSuccess, onError);
    }).catch((e) => {
      onError();
    });
};

export { get, post };
