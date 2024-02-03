function mySort(arr) {
    return [...arr,'me'];
}

function showHello(name) {
    console.log("Hello "+name);
}

module.exports = {
    mySort: mySort,
    showHello: showHello
}