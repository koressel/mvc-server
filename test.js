

let testData = [
    {
        'position': 'Web Developer',
        'company': 'Google',
        'filenames': 'img_1.jpg,img_2.jpg,img_3.jpg'
    },
    {
        'position': 'Software Engineer',
        'company': 'Facebook',
        'filenames': 'img_4.jpg,img_5.jpg,img_6.jpg'
    }
]

testData.forEach(app => {
    let fileNames = stringToArray(app.filenames);
    console.log(fileNames)

});

function stringToArray(str) {
    let array = [];
    let parsed = false;

    while(!parsed) {
        let nextStopChar = str.indexOf(',');

        if (nextStopChar !== -1) {
            console.log(str.substr(0, nextStopChar))
            array.push(str.substr(0, nextStopChar));
            str = str.substr(nextStopChar + 1);
        }
        else {
            array.push(str);
            parsed = true;
        }
    }
    return array;
}