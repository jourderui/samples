import * as graphql from 'graphql';
import _ from 'lodash';
import log4js from 'log4js';
import { basename } from 'path';

import Database from '../modules/database';

// import UserType from './types/user';
import OrganisationsType from './types/organisations';
import SentFormsType from './types/sent_forms';
import FormsType from './types/forms';
import ComponentType from './types/components';

const log = log4js.getLogger(basename(__filename));

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
 } = graphql;

import {app_configuration as config} from '../../config';
import BoughtFormsType from './types/forms';

const db = new Database(config.modules.database);

const query = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        organisation: {
            type: OrganisationsType,
            args: { id_organisations: {type: GraphQLString},
                    slug: {type: GraphQLString}
            },
            async resolve(parentValue: any, args: any) {
                const query = `SELECT * FROM public.organisations WHERE id_organisations='${args.id_organisations}'`;
                const resp = await db.query(query).then((result: any) => { return result; });
                return resp.rows[0];
            }
        },
        orgforms: {
            type: OrganisationsType,
            args: { id_organisations: {type: GraphQLString},
                    slug: {type: GraphQLString}
            },
            async resolve(parentValue: any, args: any) {
                const query = `SELECT * FROM public.organisations WHERE slug='${args.slug}'`;
                const resp = await db.query(query).then((result: any) => { return result; });
                return resp.rows[0];
            }
        },
        organisations: {
            type: new GraphQLList(OrganisationsType),
            args: {},
            async resolve() {
                const query = `SELECT * FROM public.organisations`;
                const resp = await db.query(query).then((result: any) => { return result; });
                return resp.rows;
            }
        },
        sent_forms: {
            type: SentFormsType,
            args: { id_sent_forms: {type: GraphQLString}},
            async resolve(parentValue: any, args: any) {
                const query = `SELECT * FROM public.sent_forms WHERE id_sent_forms='${args.id_sent_forms}'`;
                const values = [args.id];
                const resp = await db.query(query).then((result: any) => { return result; });
                return resp.rows[0];
            }
        },
        bought_form: {
            type: BoughtFormsType,
            args: { slug_organisation: {type: GraphQLString},
                    slug_forms: {type: GraphQLString}
            },
            async resolve(parentValue: any, args: any) {
                const query = `SELECT z.*, f.* FROM bought_forms AS z
                JOIN organisations AS o ON z.id_organisations = o.id_organisations     
                JOIN forms AS f ON z.id_forms = f.id_forms
                WHERE o.slug = '${args.slug_organisation}' AND
                f.slug = '${args.slug_forms}'`;
                const resp = await db.query(query).then((result: any) => { return result; });
                return resp.rows[0];
            }
        },
        form: {
            type: FormsType,
            args: { id: {type: GraphQLString},
                    slug: {type: GraphQLString}
            },
            async resolve(parentValue: any, args: any) {
                const query = `SELECT * FROM forms WHERE slug='${args.slug}'`;
                const resp = await db.query(query).then((result: any) => { return result; });
                return resp.rows[0];
            }
        },
        component: {
            type: ComponentType,
            args: { id: {type: GraphQLString} },
            async resolve(parentValue: any, args: any) {
                const query = `SELECT * FROM components WHERE id_components='${args.id}'`;
                const resp = await db.query(query).then((result: any) => { return result; });
                return resp.rows[0];
            }
        },
    }
});

export default query;