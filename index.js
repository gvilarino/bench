const Curl = require( 'node-libcurl' ).Curl;
const time_interval = process.env.BENCH_INTERVAL || 1000;
const colors = require('colors');

let count = 0;
let fail = 0;
let ok = 0;
let t_ping = 0;

const runs = 0;

console.log('working...')

setInterval(function run() {
  const curl = new Curl();

  curl.setOpt('URL', generateUrl());

  curl.on('error', curl.close.bind(curl));

  curl.on('end', function( code, body, headers) {
    count++;
    if(code && ((code===200) || (code===301)) || code===302) ok++;

    if((code!==200) && (code!==301) && (code!==302)) fail ++;

    const post = new Date();
    const time = (post.getTime()) - pre.getTime() ;

    t_ping += time;
    const payload = `200 or 301: ${ok}  -   !200: ${fail} - time: ${time}`;

    if (time>2000) return console.log(payload.red);
    if (time>1000) return console.log(payload.yellow);

    console.log(payload.grey);

    this.close();
  });

  const pre = new Date();
  curl.perform();
}, time_interval);

function finish() {
  console.log(`-------------------------------`);
  console.log(`FINISHED: `);
  console.log(`Total requests: ${count}`);
  console.log(`Request interval: ${time_interval}ms`)
  console.log(`Avg. reqs/sec: ${count / time_interval * 1000}`)
  console.log(`OK: ${ok}   -   Failed: ${fail} - Avg. response time: ${t_ping/count}`);

  process.exit();
};

process.on('SIGINT', finish);


function generateUrl() {
  // set your custom URL generation logic here
  return process.env.BENCH_URL || `http://www.ekoparty.org`;
};
