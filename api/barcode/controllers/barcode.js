//'use strict';

var qs = require('qs');

const { sanitizeEntity } = require('strapi-utils');

//! https://koajs.com/#request look at this after everything else is done

//TODO Add custom routes here and in routes.json for create, update, and delete barcodes

module.exports = {

    async userbarcodes(ctx) {

        //const jwt = ctx.header="Authorization";

        let entities;
        let newArray; //!change name

        if (ctx.query._q) {
            entities = await strapi.services.barcode.search(ctx.query);
            console.log("ctx.query._q is true");
        }

        else {

            const userID = ctx.state.user.id; //TODO try and filter out the extra information

            const start = ctx.query.start;
            const limit = ctx.query.limit;

            ctx.state.query = qs.parse(ctx.state.querystring = `users_permissions_user.id=${userID}&_start=${start}&_limit=${limit}`);
            //console.log(ctx.query);

            //TODO Look at http://knexjs.org/#Builder

            
            entities = await strapi.services.barcode.find(ctx.state.query);

            //console.log("%c this should be the header:",  ctx.header)            
            //console.log("%c this should be a user:",  ctx.state.user);
            //console.log("entities:", entities);
            newArray = entities.map(item => {

                let newItem = ({
                    ...item
                });
                delete newItem.users_permissions_user;
                return newItem;
            })

        }

        const finalArray = newArray.map(entity => sanitizeEntity(entity, { model: strapi.models.barcode }));
        //finalArray.push([ctx.header]);


        //console.log(finalArray);
        return (finalArray);
    },

    async createbarcode(ctx) { //the same as the create api

        let entity;
        const userID = ctx.state.user.id;
        //console.log(ctx.request.body);
        if (ctx.is('multipart')) {
            const { data, files } = parseMultipartData(ctx);
            entity = await strapi.services.barcode.create(data, { files });

        } else {
            ctx.request.body['users_permissions_user'] = { id: userID };
            entity = await strapi.services.barcode.create(ctx.request.body);
        }

        const finalBarcode = sanitizeEntity(entity, { model: strapi.models.barcode });

        return finalBarcode;

    },




};
