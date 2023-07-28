export class User{
    constructor(
        public id?: any,
        public username?: string,
        public surname?: string,
        public email?: any,
        public tel?: any,
        public role?: string,
        public password?: any,
        public profilImgUrl?: any,
        public create_at?: string,
        public hasSuscribed?: any,

        public token?: any,
        public parent_ID?: number,
        public grandParent1_ID?: number,
        public grandParent2_ID?: number,
        public tmp_parent_ID?: number
    ){}
}