import { Pack } from "./pack.model";

export class Souscription{
    constructor(
        public id?: any,
        public id_user?: any,
        public state?: string,
        public create_at?: string,
        public dateApprouved?: string,

        public id_pack?: any,
        public username?: any,
        public surname?: any,
        public tel?: any,
        public intitule?: any,
        public profilImgUrl?: any,
    ){}
}