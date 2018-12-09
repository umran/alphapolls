exports.exists = function(arr, lambda) {
  for (var i = 0; i < arr.length; i++) {
    if (lambda(arr[i]) === true) {
      return true
    }
  }

  return false
}

exports.find = function(arr, lambda) {
  for (var i = 0; i < arr.length; i++) {
    if (lambda(arr[i]) === true) {
      return arr[i]
    }
  }

  return null
}

exports.isObject = function(obj) {
  return obj === Object(obj)
}
