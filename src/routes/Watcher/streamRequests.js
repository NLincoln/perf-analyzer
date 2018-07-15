import { Observable } from "rxjs";

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

export function streamRequests(params) {
  return Observable.create(observer => {
    let isCancelled = false;
    function schedule() {
      if (isCancelled) {
        return;
      }
      setTimeout(() => {
        run(params)
          .then(result => {
            observer.next(result);
            schedule();
          })
          .catch(err => {
            observer.error(err);
          });
      }, 100);
    }
    schedule();
    return () => {
      isCancelled = true;
    };
  });
}
