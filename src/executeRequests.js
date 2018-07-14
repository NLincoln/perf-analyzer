import { Observable } from "rxjs";
import { each } from "bluebird";

function run({ url }) {
  let start = performance.now();
  return fetch(url).then(() => {
    let end = performance.now();
    return {
      time: end - start
    };
  });
}
const ofLength = length => Array.from({ length }).map((_, i) => i + 1);

export function executeRequests({ url, samples }) {
  return Observable.create(observer => {
    let isCanceled = false;
    each(ofLength(samples), index => {
      if (isCanceled) {
        return;
      }
      return run({ url }).then(results => {
        if (isCanceled) {
          return;
        }
        observer.next({
          run: index,
          ...results
        });
      });
    }).then(() => {
      observer.complete();
    });
    return () => {
      isCanceled = true;
    };
  });
}
