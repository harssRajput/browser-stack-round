var fs = require('fs');
// var path = require('path');

const filePath = './test.txt';
let timer= 1;
var fileStream;

async function readFile(start, end) {
    console.log('inside readFile');
    fileStream.on('data', function(data) {
        console.log('read file op: ', data.toString());
    //   callback(null, data, unsubscribe);
    });
    fileStream.on('error', function(err) {
        console.log('read err op', err);
    //   if (follow) {
    //     unsubscribe();
    //   }
    //   callback(err, null, null);
    });
}

watchFileListener = async function(curr, prev) {
    console.log('inside watchFileListener');
    var start, end;
    var sizeCurr = curr.size;
    var sizePrev = prev.size;
    var sizeDiff = sizeCurr - sizePrev;

    if (sizeDiff == 0) { return; }
    else {
      start = sizePrev;
      end = sizeCurr;
    }
    await readFile(start, end);
}

async function watch(){
    fileStream = await fs.createReadStream(filePath);//{start, end}
    await fs.watchFile(filePath, watchFileListener);
}

watch();


setInterval(() => {
    fs.writeFileSync(filePath, `new data: ${timer}\n`);
    timer++;
    console.log(`modified ${filePath}`);
}, 2000);