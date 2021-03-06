/**
Template Controllers

@module Templates
**/

/**
The view1 template

@class [template] views_view1
@constructor
**/

Template['views_home'].helpers({
  /**
  Get the name

  @method (name)
  **/

  'name': function() {
    return this.name || TAPi18n.__('dapp.views.home.defaultName');
  },


  /**
  Get most recent campaigns.

  @method (campaigns)
  **/

  'campaigns': function() {
    return Campaigns.find({}, {
      limit: 4,
      sort: {
        created: -1
      }
    });
  },


  /**
  Get most recent campaigns.

  @method (campaigns)
  **/

  'isCampaigns': function() {
    return Campaigns.find({}, {
      limit: 4,
      sort: {
        id: -1
      }
    }).fetch().length > 0;
  },


  /**
  Get most recent campaigns.

  @method (picks)
  **/

  'picks': function() {
    /*var picks = Picks.find({}, {limit: 4, sort: {id: -1}}).fetch(),
        pickedCampaigns = [];

    _.each(picks, function(pick, pickIndex){
         pickedCampaigns.push(Campaigns.findOne({id: pick.cid}));
    });

    return pickedCampaigns;*/
  }
});

Template['views_home'].rendered = function() {
  Meta.setSuffix(TAPi18n.__("dapp.views.home.title"));

    objects.contracts.WeiFund.totalCampaigns(function(err, numCampaigns) {
      if (err) return;

      numCampaigns = numCampaigns.toNumber(10);

      if (numCampaigns == 0) {
        Campaigns.remove({});
        Contributions.remove({});
      }

      for (var campaignID = numCampaigns - 1; campaignID > (numCampaigns - 5 && numCampaigns - 5 || 0); campaignID --)
        objects.helpers.importCampaign(campaignID, function(err, campaign) {});
    });
};
