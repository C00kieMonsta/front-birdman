/**
 *
 * All ids received from the DB are formed as hashes and are all called hash!
 *
 * For the rest, we keep using dockId, tileId, appId... but these take hashes that
 * are then being converted into their db id inside the backend
 *
 * Notice: this is not true for userId
 *
 */


/******************************************************
 *
 *                  Internal Model
 *
 ******************************************************/

export class UserCreateDto {
    public readonly clientHash: string;
    public readonly username: string;
    public readonly role: string;
}


export type Dtos = UserCreateDto;

