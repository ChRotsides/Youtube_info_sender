let fs=require('fs')
let rawdata=fs.readFileSync('data.json');
let data=JSON.parse(rawdata);
let socket=require('socket.io');
const requestIp = require('request-ip');


console.log("Started");
let express=require('express');
let app=express();
let server=app.listen(60024,listening);
let io=socket(server);
function listening(){
  console.log('listening...');
}


io.sockets.on('connection',(socket)=>{
  console.log("New connection id:",socket.id);
  socket.on('data_new',(data_new)=>{
    data=data_new;
  });
  });

app.use(requestIp.mw());

app.get('/getData',(request,response)=>{  
    console.log('worked:',request.clientIp);
    data['music_url']=Remove_range_parammeter(data['music_url']);
    response.send(data);
    });

function Remove_range_parammeter(str){
  let counter=0;
  let end_index;
  let start_index;
  // console.log(str);
  for (let i=str.length-1; i>2; i--){
    if (str[i]=='&'){
      counter++;
      if (counter==2){
        end_index=i-1;
      }
      if (counter==3){
        start_index=i;
      }
    }
  }

  for (let i=end_index; i>=start_index; i--){
    str[i]='';
    // console.log(str[i]);
  }
  remove_word=str.slice(start_index,end_index);
  // console.log(remove_word);
  let new_str=str.replace(remove_word,'');
  // console.log(new_str);
return new_str;

}