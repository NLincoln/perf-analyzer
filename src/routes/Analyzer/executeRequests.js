import { Observable } from "rxjs";
import { each } from "bluebird";

function run({ url, headers }) {
  let start = performance.now();

  return fetch(url, {
    headers: new Headers(headers)
  }).then(response => {
    let end = performance.now();
    return {
      response,
      time: end - start
    };
  });
}
const ofLength = length => Array.from({ length }).map((_, i) => i + 1);

export function executeRequests({ url, samples, headers = {} }) {
  return Observable.create(observer => {
    let isCanceled = false;
    each(ofLength(samples), index => {
      if (isCanceled) {
        return;
      }
      return run({ url, headers })
        .then(results => {
          if (isCanceled) {
            return;
          }
          observer.next({
            run: index,
            ...results
          });
        })
        .catch(err => {
          observer.error(err);
        });
    }).then(() => {
      observer.complete();
    });
    return () => {
      isCanceled = true;
    };
  });
}
