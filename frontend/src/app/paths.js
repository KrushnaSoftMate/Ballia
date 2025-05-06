"use client";
var apiurl;
if (typeof window !== "undefined") {
  apiurl = `${window.location.hostname}:1154`;
}

//FOR server
// const frontend = "http://103.89.45.196:3003"
// const backend = "http://103.89.45.196:1157"

//FOR local
const frontend = "http://localhost:3000"
const backend = "http://localhost:1154"



// FOR LOCAL
const HASHKEY="2PBP7IABZ2"
const ENV="test"

// FOR PRODUCTION
// const HASHKEY="8LHKR0FVCO"
// const ENV="prod"



// "http://softmategroup.com:1154/"


export { apiurl, frontend, backend,HASHKEY,ENV };
