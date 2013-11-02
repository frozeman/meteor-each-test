if (Meteor.isClient) {



  // ITEM TEMPLATE
  Template.mainTemplate.showEach = function(){
    return Session.get('showEach');
  };
  Template.mainTemplate.events({
    // 'click .show': function(e){
    //   Session.set('showEach', true);
    // },
    // 'click .hide': function(e){
    //   Session.set('showEach', false);
    // },
    'click button': function () {
      var startTime = +new Date;
      // switch back and forth for 60 seconds.
      setInterval(function () {
        if ((+new Date) - startTime > 60 * 1000)
          return;

        Session.set('showEach', true);
        setTimeout(function () {
          Session.set('showEach', false);
        }, 200);
      }, 500);
    }
  });




  // EACH TEMPLATE
  Template.eachTemplate.created = function() {

    // fill collection (from an API for example)
    // but only fill, if not empty
    if(myCollection.find().count() === 0) {
      console.log('fill collection with 20 items');

      for (var i = 20 - 1; i >= 0; i--) {
        myCollection.insert({
          text: 'My Item #'+ i
        });
      };
    }
  };
  Template.eachTemplate.destroyed = function() {
    console.log('Each template hidden');

    // clear collection
    _.each(myCollection.find().fetch(), function(item){
      myCollection.remove({_id: item._id});
    });
  };
  Template.eachTemplate.myCollectionListing = function(){
    return myCollection.find().fetch();
  };



  // ITEM TEMPLATE
  Template.itemTemplate.rendered = function(){
    console.log('Item rendered');
  };



  var myCollection = new Meteor.Collection('myCollection',{connection: null});

}