
function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  }

  let socket;

  
  (()=>{
    socket=io.connect('http://localhost:60024');
    // console.log(socket);
    getinfo();

  })();




function getinfo(){
    console.log('getinfostarted');
    let title=null;
    let uploader=null;
    let video=null;
    let id;
    let musicurl=get_music_url();

    let url='';


    let repeat=setInterval(()=>{
        if (url!=window.location.href){
        id=uniqueId();
        }
        do {
            try{
                title=getElementByXpath("/html/body/ytd-app/div[1]/ytd-page-manager/ytd-watch-flexy/div[3]/div[1]/div/div[5]/div[2]/ytd-video-primary-info-renderer/div/h1/yt-formatted-string").innerHTML;
                uploader=getElementByXpath("/html/body/ytd-app/div[1]/ytd-page-manager/ytd-watch-flexy/div[3]/div[1]/div/div[7]/div[3]/ytd-video-secondary-info-renderer/div/div[2]/ytd-video-owner-renderer/div[1]/div/yt-formatted-string/a").innerHTML;
                video=getElementByXpath("/html/body/ytd-app/div[1]/ytd-page-manager/ytd-watch-flexy/div[3]/div[1]/div/div[1]/div/div/div/div/div[1]/video");
                time_duration=getElementByXpath("/html/body/ytd-app/div[1]/ytd-page-manager/ytd-watch-flexy/div[3]/div[1]/div/div[1]/div/div/div/div/div[26]/div[2]/div[1]/div/span[3]").innerHTML;
                }
                catch{
                    // console.log('Again..');
                }
            }while(title==null);
            url=window.location.href;
            url_bytes=stringToBytes(url);
            url_bytes_string=url_bytes.toString();
            // console.log(url_bytes_string);
            if (video.paused==false){
                musicurl=get_music_url();
                music_url_bytes=stringToBytes(musicurl);
                music_url_bytes_string=music_url_bytes.toString();
                let full_data={
                    "id" : id,
                "title" : title,
                "uploader": uploader,
                    "currentTime": video.currentTime,
                    "duration": video.duration,
                    "paused" : video.paused,
                "terminate": false,
                "url":url,
                "music_url":musicurl
                };
                sendData_post(full_data);
            }
    },500);


}


function sendData_post(full_data){
    socket.emit('data_new',full_data);
    
}

function uniqueId () {
    // desired length of Id
    var idStrLen = 32;
    // always start with a letter -- base 36 makes for a nice shortcut
    var idStr = (Math.floor((Math.random() * 25)) + 10).toString(36) + "";
    // add a timestamp in milliseconds (base 36 again) as the base
    idStr += (new Date()).getTime().toString(36) + "";
    // similar to above, complete the Id using random, alphanumeric characters
    do {
        idStr += (Math.floor((Math.random() * 35))).toString(36);
    } while (idStr.length < idStrLen);

    return (idStr);
}



function get_music_url(){
    let network=performance.getEntries();
    let url=""
    for(let i=0; i<network.length; i++){
        if (network[i].name.includes("mime=audio")){
            url=network[i].name;
            break;
        }
    }
    // console.log(url);
    return url;
}
