/**
 * Created by hemkaran on 04/07/16.
 */
var fs = require('fs'),
    path = require('path'),
    nodemailer = require('nodemailer'); //Load the filesystem module

var JSLIB_REPO_PATH = '/Users/hemkaran1/Documents/Projects/jslib_untouched/1.0';

function getFilesizeInKB(filename) {
    filename = path.join(JSLIB_REPO_PATH, filename + '.gz');
    var stats = fs.statSync(filename);
    var fileSizeInBytes = stats['size'];
    return (fileSizeInBytes / 1024).toFixed(2);
}

function getFilesizeinBytes(filename){
    filename = path.join(JSLIB_REPO_PATH, filename + '.gz');
    var stats = fs.statSync(filename);
    var fileSizeInBytes = stats['size'];
    return (fileSizeInBytes)
}

var fileList = [
    'va.js',
    'vanj.js',
    'va_debug.js',
    'va_heatmap.js',
    'vanj_debug.js',
    'vanj_heatmap.js',
    'vis_opt.js',
    'vis_opt_no_jquery.js',
    'debugger.js',
    'heatmap.helper.js'
];

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://example%40gmail.com:examplePassword@smtp.gmail.com');

module.exports = function () {

    var output = '<table border="1" cellspacing="0" cellpadding="10px"> <tr><th>File Name</th><th>Size</th></tr>';
    for(var i = 0; i < fileList.length; i++) {
        output += '<tr><td>' + fileList[i] + ' </td><td> ' + getFilesizeInKB(fileList[i]) + ' KB </td></tr>';
    }
    output += '</table>';

    console.log(output);
    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: '"JsLib Notifier" <hemkaran.raghav@wingify.com>', // sender address
        to: 'hemkaran.raghav@wingify.com', // list of receivers
        subject: 'jsLib new release', // Subject line
        //text: output, // plaintext body
        html: output
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info) {
        if(error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
};
