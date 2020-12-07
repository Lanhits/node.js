module.exports = {
  test () {
    console.log('this is a test')
  }
}

exports.test = function () {
  console.log('this is not a test')
}