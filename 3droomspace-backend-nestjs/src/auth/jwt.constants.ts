export const jwtConstants = {
    jwtSecret : "ObiWanIsYourOnlyHope",
    duration  : "2h",
    deviceDuration: "7d",
    digest    : "RSA-SHA256",
    iss       : "3DRoomspace",
    aud       : "api.3droomspace.net",
    validLoginTypes : [
        'SUPER-ADMIN',
        'SYS-ADMIN',
        'ADMIN',
        'RENTER',
        'HOST',
        'LANDLORD'
    ],
    notUserTypes : ['SUPER-ADMIN', 'SYS-ADMIN'],
    adminTypes: ['SUPER-ADMIN', 'SYS-ADMIN'],
    validScopeTypes: ['create','read','update','delete']
};
