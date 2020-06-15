
module.exports = async function(req, res){
  let body = req.body;

  console.log('body');
  console.log(body);
  if (body.object === 'page'){
        res.status(200).send('EVENT_RECEIVED');
        //message event
        for (let i = 0; i < body.entry.length; i++){
          let entry = body.entry[i];
          if ('messaging' in entry){
            await sails.helpers.facebook.eventHandler(entry.messaging[0]);
          }else if ('changes' in entry){
            //post event
            for (let i = 0; i < entry.changes.length; i++){
              await sails.helpers.facebook.changeHandler.with({ change: entry.changes[i] });
            }
          }
        }
  }else{
      res.status(403).send();
  }
}
