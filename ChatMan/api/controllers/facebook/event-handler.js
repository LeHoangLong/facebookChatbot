
module.exports = async function(req, res){
  let body = req.body;
  console.log('body');
  console.log(body);
  if (body.object === 'page'){
        res.status(200).send('EVENT_RECEIVED');
        //message event
        for (let i = 0; i < body.entry.length; i++){
          let entry = body.entry[i];
          console.log('entry');
          console.log(entry);
          if ('messaging' in entry){
            console.log('messages: ');
            console.log(entry.messaging[0])
            await sails.helpers.facebook.eventHandler(entry.messaging[0]);
          }
        }
  }else{
      res.status(403).send();
  }
}
