# browser-stack-round
It contains two machine coding questions.

----------First Question-----------
This problem requires you to implement a log watching solution (similar to the tail -f command in UNIX). However, in this case, the log file is hosted on a remote machine (same machine as your server code). The log file is in append-only mode.

You have to implement the following:

A server side program to monitor the given log file and capable of streaming updates that happen in it. This will run on the same machine as the log file. You may implement the server in any programming language.

A web based client (accessible via URL like http://localhost/log) that prints the updates in the file as and when they happen and NOT upon page refresh. The page should be loaded once and it should keep getting updated in real-time. The user sees the last 10 lines in the file when he lands on the page.

Problem Constraints
The server should push updates to the clients as we have to be as real time as possible.
Be aware that the log file may be several GB, how to optimise for retrieving the last 10 lines?
The server should not retransmit the entire file every time. It should only send the updates.
The server should be able to handle multiple clients at the same time.

The web page should not stay in loading state post the first load and it should not reload thereafter as well.
You may not use off-the-shelf external libraries or tools to read the file or provide tail-like functionalities.

We will be evaluating you for code quality, testability, modularity, corner cases, etc.



----------Second Question-----------
 Browser automation without using automation frameworks. let's say two browsers are installed in the system.
chrome and firefox.
3 APIs would be hit by specifying the browser name to which that action need to taken.

Task is to create these 4 apis and should work via any browser UI.

1. clear cache and history of the given browser.
ex -> /clear?app=firefox

2. to open a given URL in the given browser.
ex -> /open?app=firefox&url=https://www.google.com

3. to close the browser.
ex -> /close?app=chrome


‐---------------IMPORTANT NOTE-------------------
First question working fine in functionality. Although there may be some issues in this.
One that i remember is, when new client opens url in browser and then close it after that its related id is still accumulated in the array object which should be deleted.

In second browser automation question,
The first two apis are complete but others are incomplete.
