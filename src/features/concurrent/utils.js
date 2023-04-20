export function wrapFunction (promise) {
  let result ;
  let status = "pending";

  let suspender = promise.then(
    value => {
      result = value;
      status = "success"
    },
    reason => {
      result = reason;
      status = "error"
    }
  )

  return {
    read() {
      if (status === 'pending') {
        throw suspender
      } else if(status === 'error') {
        throw result
      } else {
        return result
      }
    }
  }
}