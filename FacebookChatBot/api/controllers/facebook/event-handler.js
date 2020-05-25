
module.exports = async function(req, res){
  let body = req.body;
  if (body.object === 'page'){
      res.status(200).send('EVENT_RECEIVED');
      for (let i = 0; i < body.entry.length; i++){
          sails.log('messages: ');
          sails.log(body.entry[i].messaging[0])
          await sails.helpers.facebook.eventHandler(body.entry[i].messaging[0]);
      }
  }else{
      res.status(403).send();
  }
}
