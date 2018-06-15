import win from "./window"

export default function curl( request, curlUrl ){
  let curlified = []
  let type = ""
  let headers = request.get("headers")
  curlified.push( "curl" )
  curlified.push( "-X", request.get("method") )
  curlified.push( `"${request.get("url")}"`)

  if ( headers && headers.size ) {
    for( let p of request.get("headers").entries() ){
      let [ h,v ] = p
      type = v
      curlified.push( "-H " )
      curlified.push( `"${h}: ${v}"` )
    }
  }

  if ( request.get("body") ){

    if(type === "multipart/form-data" && request.get("method") === "POST") {
      for( let [ k,v ] of request.get("body").entrySeq()) {
        curlified.push( "-F" )
        if (v instanceof win.File) {
          curlified.push( `"${k}=@${v.name};type=${v.type}"` )
        } else {
          curlified.push( `"${k}=${v}"` )
        }
      }
    } else {
      curlified.push( "-d" )
      curlified.push( JSON.stringify( request.get("body") ).replace(/\\n/g, "") )
    }
  }

  let url = curlified.join( " " )
  console.log(curlUrl, '??')
  if (curlUrl) {
    url = url.replace(/https?:\/\/[0-9a-z-.:]+\/(api\/|pdp\/|pep\/)/i, curlUrl)
  }
  return url;
}
