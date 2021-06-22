//'use strict';
//import qs from 'qs';
//TODO Create custom controller for 
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
var qs = require('qs');

const { sanitizeEntity } = require('strapi-utils');

//! https://koajs.com/#request

module.exports = {



    /**
    * Retrieve records.
    *
    * @return {Array}
    */

    //! CUSTOM CODE IN HERE: async {custom name}(ctx) { custom code }
    async custom(ctx) {

        //ctx.headers['authorization']
        

        // ctx.state.query = await qs.parse(ctx.querystring)

        //console.log(ctx.query);

        
        //console.log(ctx.state.query={id:1});

        let entities;

        if (ctx.query._q) {
            entities = await strapi.services.barcodescan.search(ctx.query);
            console.log("ctx.query._q is true");
        } 
        
        else {

            //ctx.state.query = qs.parse(ctx.querystring);
            //let data = qs.parse(ctx.querystring);

            ctx.state.query = qs.parse(ctx.querystring)
            console.log(ctx.state.query={id:1});
            
            entities = await strapi.services.barcodescan.find(ctx.state.query);

            //console.log("entities", entities);
            // const newArray = entities.filter(function (barcode) {
            //     return (barcode.users_permissions_user.id == 2);
            // });
            //console.log(newArray);
        }

        return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.barcodescan }));
    },
    // async custom(ctx) {
    //     return 'Hello World from custom!';
    //   },


};
