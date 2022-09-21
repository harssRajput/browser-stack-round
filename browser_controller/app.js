const { platform } = require('os');
const { exec } = require('child_process');

var url = 'https://www.wikipedia.com';
var browser = 'Firefox';//'Google Chrome';
var pids={};

function open_browser(browser_input, url){
    let status='', browser;
    if(browser_input == 'chrome') browser= 'Google Chrome';
    else if(browser_input == 'firefox') browser= 'Firefox';
    else{
        status= 'browser param invalid. Taking firefox as a default browser.';
        console.log(status);
        browser= 'Firefox';
    }

    if (url === undefined) {
        console.error('Please enter a URL, e.g. "http://www.browserstack.com"');
        status+= '  invalid url';
        return {code:0, status};//failed
        // process.exit(0);
    }
    let command;
        
    if (process.platform === 'win32') {
        status+= '  I used macbook. So, It may not work in windows as i am not able to test it in window machine.';
        console.log(status);
        command = `start ${browser}:${url}`;
    } else if (process.platform === 'darwin') {
        command = `open -a "${browser}" ${url}`;
    } else {
        status+= '  No platform detected';
        console.log(status);
        command = `google-chrome --no-sandbox ${url}`;
    }
    console.log(`exec command: ${command}`); 
    pids[browser_input] = exec(command).pid;
    console.log(pids, 'process ids');
    return {code:1, status};//success exec
}

function kill_browser(browser_input){
    let status='browser killed', browser, pid;
    if(browser_input == 'chrome') browser= 'Google Chrome';
    else if(browser_input == 'firefox') browser= 'firefox';
    else{
        status= 'browser param invalid.';
        console.log(status);
        browser= 'Firefox';
        return {status};
    }
    console.log(`:test: ${browser} kill`);
    exec(`pkill ${browser}`);
    return {status};
}

function cleanUp(){
    let status='browser killed', browser, pid;
    if(browser_input == 'chrome') browser= 'Google Chrome';
    else if(browser_input == 'firefox'){
        browser= 'firefox';
        exec(`rm ~/.mozilla/firefox/*.default/*.sqlite ~/.mozilla/firefox/*default/sessionstore.js`);
        exec(`rm -r ~/.cache/mozilla/firefox/*.default/*`);  
    }
    else{
        status= 'browser param invalid.';
        console.log(status);
        browser= 'Firefox';
        return {status};
    }
    console.log(`:test: ${browser} kill`);  
    return {status};
}

module.exports= {
    open_browser,
    kill_browser,
    cleanUp
}