import './build/jquery.min.js';

let handleNon200 = (jqXHR, textStatus, errorThrow) => {
  let errorStr = '';

  if (errorThrow) {
    errorStr = errorThrow;
  } else if (textStatus) {
    errorStr = textStatus;
  } else {
    errorStr = 'There was an error.';
  }

  return new Error(errorStr);
};

export function doApi(options) {
  options = options || {};

  return $.ajax({
    url: options.url,
    timeout: options.timeout || 12000,
    success: options.success,
    error: options.error || handleNon200,
    complete: options.complete,
    contentType: options.contentType,
    data: options.data,
    dataType: options.dataType || 'json',
    headers: options.headers,
    method: options.method,
    statusCode: options.statusCode,
  });
}

export function doApis(optionsArr) {
  if (Array.isArray(optionsArr)) {
    return $.when(...optionsArr.map((options) => doApi(options)));
  } else {
    return new Error('The optionsArr must be an array');
  }
}
