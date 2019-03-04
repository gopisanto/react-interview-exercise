import reducer, {initialState} from './friendlist';
import * as types from '../constants/ActionTypes';

describe('reducer', () => {
    it('should equal initialState on @@init action', () => {
        expect(reducer(undefined, {type: '@@init'})).toEqual(initialState);
    });
    it('should add a friend', () => {
        const friend = {name: 'Santosh', gender: 'male', starred: false};

        expect(reducer(initialState, {type: types.ADD_FRIEND, payload: friend}))
            .toEqual({...initialState, friendsById: initialState.friendsById.concat(friend)});
    });
    it('should toggle a star on friend', () => {
        let friends = [...initialState.friendsById];
        let idToStar = 0;
        let friend = friends.find((item, index) => index === idToStar);
        friend.starred = !friend.starred;

        expect(reducer(initialState, {type: types.STAR_FRIEND, id: idToStar}))
            .toEqual({...initialState, friendsById: friends});
        
        friend = friends.find((item, index) => index === idToStar);
        friend.starred = !friend.starred;

        expect(reducer(initialState, {type: types.STAR_FRIEND, id: idToStar}))
            .toEqual({...initialState, friendsById: friends});
    });
    it('should delete a friend', () => {
        let friends = [...initialState.friendsById];
        let idToDelete = 0;

        expect(reducer(initialState, {type: types.DELETE_FRIEND, id: idToDelete}))
            .toEqual({...initialState, friendsById: friends.filter((friend, index) => index !== idToDelete)});
    });
});