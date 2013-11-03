if (Meteor.isClient) {



  // ITEM TEMPLATE
  Template.mainTemplate.showEach = function(){
    return Session.get('showEach');
  };
  Template.mainTemplate.events({
    'click .show': function(e){
      Session.set('showEach', true);
    },
    'click .hide': function(e){
      Session.set('showEach', false);
    },
    'click .start': function () {
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
    if(MyModels.myCollection.find().count() === 0) {
      console.log('fill collection with 20 items');

      for (var i = 20 - 1; i >= 0; i--) {
        MyModels.myCollection.insert({
          text: 'My Item #'+ i,
          id: i
        });
      };
    }
  };
  Template.eachTemplate.destroyed = function() {
    console.log('Each template hidden');

    // clear collection
    _.each(MyModels.myOtherCollection.find().fetch(), function(item){
      MyModels.myOtherCollection.remove({_id: item._id});
    });
    _.each(MyModels.myCollection.find().fetch(), function(item){
      MyModels.myCollection.remove({_id: item._id});
    });
  };
  Template.eachTemplate.myCollectionListing = function(){
    return MyModels.myCollection.find().fetch();
  };



  // WRAPPER TEMPLATE
  Template.WrapperTemplate.placeItemTemplate = function(){
    return Template['itemTemplate'];
  };



  // ITEM TEMPLATE
  Template.itemTemplate.rendered = function(){
    console.log('Item rendered');

    if(!MyModels.myOtherCollection.findOne({itemId: this.data.id})) {
      MyModels.myOtherCollection.insert({
        itemContent: 'My Items Content',
        itemId: this.data.id
      });
    }

  };
  Template.itemTemplate.itemData = function(){
    return MyModels.myOtherCollection.findOne({itemId: this.id});
  };



  var MyModels = {
    myCollection: new Meteor.Collection('myCollection',{connection: null}),
    myOtherCollection: new Meteor.Collection('myOtherCollection',{connection: null})
  };


}