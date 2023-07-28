export enum Endpoint{
    ADMIN_LOGIN = 'admin/login',
    USER_LOGIN = 'user/login',

    //pack 
    LOAD_PACK = 'pack/', //+id_parent
    LOAD_MY_PACK = 'mypack/', //+id_user
    LOAD_PACK_ADMIN = 'admin/packs',
    UPDATE_PACK = 'admin/update/pack',
    CREATE_PACK = 'admin/create/pack',
    UPDATE_PP_PACK = 'admin/pack/update/img/', //+ id_pp

    //user
    UPDATE_ACCOUNT = 'user/update/account',
    SAVE_USER_GENERATE = 'user/generate',
    SOUSCRIPTION_REQUEST = 'souscription/request/',  //+{id_pack}/{id_user}
    MY_GENERATION = 'user/souscription/generations/', //+{id_parent}/{id_pack}
    UPDATE_PP = 'user/update/profile/image', //+{blob}
    //admin
    LOAD_LIST_SOUSCR_REQUEST = 'admin/souscription/request',
    APPROUVE_SOUSCRIPTION = 'admin/souscription/approuve/', //+{id_souscription}/{id_user}/{id_admin}
    DELETE_SOUSCRITPION_REQUEST = 'admin/souscription/delete/', //+{id_souscr}
    UPDATE_ADMIN_ACCOUNT = 'admin/account/update',
    GENERATE_NEW_ADMIN ='admin/genenrate/new/admin',
    LIST_USER = 'admin/list/users',


    //formation
    GET_FORMATION = 'admin/formation',
    POST_FORMATION = 'admin/formation',
    UPDATE_FORMATION = 'admin/formation/', //+{id}
    
}