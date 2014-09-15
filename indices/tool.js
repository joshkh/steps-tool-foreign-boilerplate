// main.js
require.config({
    baseUrl: 'js',
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        q: '../bower_components/q/q',
        underscore: '../bower_components/underscore/underscore',
        jschannel: '../bower_components/jschannel/src/jschannel',
        imjs: '../bower_components/imjs/js/im'
    },
    shim: {
        jschannel: {
          exports: 'Channel'
        },
        underscore: {
            deps: [
            ],
            exports: '_'
        }
    }
});

require([
    'underscore',
    'jquery',
    'imjs',
    'jschannel'], function (_, $, imjs, Channel) {
    'use strict';

    // Connect to the parent window.
    var chan = Channel.build({
      window: window.parent,
      origin: '*',
      scope: 'CurrentStep'
    });
    // Load the exporter with the given query.
    chan.bind('init', function (trans, params) {

      var myTemplate = "GeneriTool has been initialized with the following parameters:<pre> <%= value %> </pre>";
      myTemplate += '<button id="takeaction">Notify</button>'
      var compiled = _.template(myTemplate, {value: JSON.stringify(params, null, 2)});
      $('body').append(compiled);

      // Add an event handler...
      $('#takeaction').click(function() {
        notify("value")
      });

      // var list = {name: "I am a list name", type: "Genes"};

      // var params = {service: params.service};

      console.log("sending back parameter object", params);

      // chan.notify({method: "has-list", params: params});

      var notify = function(newData) {
        chan.notify({
          method: 'has-items',
          params: {
            type: "Unobtainium",
            ids: [1,2,3,4,5]
          }
        });
      }

      

      return "okay";

    
    });

});
