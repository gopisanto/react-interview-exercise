import * as types from '../constants/ActionTypes';

export const initialState = {
  friendsById: [
    {
      name: 'Theodore Roosevelt',
      starred: true,
      gender: 'female'
    },
    {
      name: 'Abraham Lincoln',
      starred: false,
      gender: 'male'
    },
    {
      name: 'George Washington',
      starred: false,
      gender: 'male'
    }
  ]
};

export default function friends(state = initialState, action) {
  switch (action.type) {
    case types.ADD_FRIEND:
      const { name, gender } = action.payload;
      return {
        ...state,
        friendsById: [
          ...state.friendsById,
          {
            name,
            gender,
            starred: false
          }
        ],
      };
    case types.DELETE_FRIEND:
      return {
        ...state,
        friendsById: state.friendsById.filter((item, index) => index !== action.id)
      };
    case types.STAR_FRIEND:
      let friends = [...state.friendsById];
      let friend = friends.find((item, index) => index === action.id);
      friend.starred = !friend.starred;
      return {
        ...state,
        friendsById: friends
      };

    default:
      return state;
  }
}