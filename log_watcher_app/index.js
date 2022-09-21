/*
*/
const fsPromises= require('fs').promises;
const fs= require('fs')

const abortController = new AbortController();
const { signal } = abortController;
const path = './test.txt';
var timer=1;
var subs=0;
var pool={}, reqIds=[];
var last_10=[];

function saveLines(line){
    if(last_10.length >= 10){
        last_10.shift();
    }
    last_10.push(line);
}

function emitLastLines(res){
    for(let i=0;i<last_10.length;i++){
        emitSSE(res, last_10[i]);
    }
}

const watchEventAsyncIterator = fsPromises.watch(path, { signal });
setInterval(() => {
    fs.writeFileSync(path, `new data: ${timer}\n`);
    timer++;
    // console.log(`modified ${path}`);
}, 1000);

async function watcher(){
    for await (const event of watchEventAsyncIterator) {
        let data= await fsPromises.readFile(path);
        data= data.toString();
        // console.log(`'${event.eventType}' watch event was raised for ${event.filename}`);
        // console.log('read file op: ', data);
        saveLines(data);
        for(let i=0;i<reqIds.length;i++){
            emitSSE(pool[reqIds[i]], data);
        }
    }
}
watcher();

const emitSSE= (res, data) => {res.write("data: " + data + '\n\n');}

const handleSSE = (req, res) =>{
    //client closed
    req.on('close', () => {
        console.log('sse client disconnected.', req.id);
        for(let i=0;i<reqIds.length;i++){
            if(reqIds[i] === req.id){
                reqIds.splice(req.id, 1);
                break;
            }
        }
        subs--;
        res.end();
        return;
    });

    //new client request
    console.log('got new /log request', subs);
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });
    emitLastLines(res);
    req.id=  Date.now();
    reqIds.push(req.id);
    pool[req.id]= res;
    subs++;
    console.log('total requests:', subs, 'req Ids: ', reqIds);
}

module.exports= {handleSSE};