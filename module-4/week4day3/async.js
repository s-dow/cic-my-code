function convertNumbers(arr, callback) {
  setTimeout(function () {
    callback([parseInt(arr[0]), parseInt(arr[1])]);
  }, 1000);
}

function addNumbers(arr) {
  setTimeout(function () {
    console.log(arr[0] + arr[1]);
  }, 1000);
}

function calculateAverage(sum) {}
convertNumbers(["1", "5"], function (convertResult) {
  addNumbers(convertResult, function (sum) {});
});
