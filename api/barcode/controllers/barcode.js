//'use strict'; //? Do I need this?
var qs = require('qs');
const { sanitizeEntity } = require('strapi-utils');


module.exports = {

    async userbarcodes(ctx) {

        let entities;
        let finalArray;
        const userID = ctx.state.user.id;
        const start = ctx.query.start;
        const limit = ctx.query.limit;

        ctx.state.query = qs.parse(ctx.state.querystring = `users_permissions_user.id=${userID}&_start=${start}&_limit=${limit}&_sort=submission_date:desc`);

        if (ctx.query._q) { //? not sure if I even need to put code here, repeating the code just in case
            entities = await strapi.services.barcode.search(ctx.state.query);
            finalArray = entities.map(item => {
                let newItem = ({
                    ...item
                });
                delete newItem.users_permissions_user;
                return newItem;
            });
            console.log("ctx.query._q is true");
        } else {
            entities = await strapi.services.barcode.find(ctx.state.query); //TODO Look at http://knexjs.org/#Builder
            finalArray = entities.map(item => {
                let newItem = ({
                    ...item
                });
                delete newItem.users_permissions_user;
                return newItem;
            });
        }

        return finalArray.map(entity => sanitizeEntity(entity, { model: strapi.models.barcode }));

    },

    countuserbarcodes(ctx) {

        const userID = ctx.state.user.id;
        ctx.state.query = qs.parse(ctx.state.querystring = `users_permissions_user.id=${userID}`);

        if (ctx.query._q) {
            return strapi.services.barcode.countSearch(ctx.state.query);
        }

        return strapi.services.barcode.count(ctx.state.query);

    },

    async createbarcode(ctx) { //the same as the create api, except adding the userID from ctx

        let entity;
        const userID = ctx.state.user.id;

        if (ctx.is('multipart')) { //? have no idea what this does, probably not useful in this usecase
            const { data, files } = parseMultipartData(ctx);
            entity = await strapi.services.barcode.create(data, { files });
        } else {
            ctx.request.body['users_permissions_user'] = { id: userID }; //append the userID to the object
            entity = await strapi.services.barcode.create(ctx.request.body);
        }

        return sanitizeEntity(entity, { model: strapi.models.barcode });
        
    },

};
