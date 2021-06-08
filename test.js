

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
    let array = str.split(',');
    return array;
}