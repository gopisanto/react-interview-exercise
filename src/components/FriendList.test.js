import React from 'react';
import renderer from 'react-test-renderer';
import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import sinon from 'sinon';
import {FriendList} from './FriendList';
import {initialState} from '../reducers/friendlist';

configure({ adapter: new Adapter() });

describe('<FriendList />', () => {
    it('should render always same', () => {
        const friends = initialState.friendsById;
        const actions = {
            starFriend: () => null,
            deleteFriend: () => null
        };
        const wrapper = renderer.create(<FriendList friends={friends} actions={actions}  />).toJSON();

        expect(wrapper).toMatchSnapshot();
    });
    it('should handle page change', () => {
        const friends = initialState.friendsById;
        const actions = {
            starFriend: () => null,
            deleteFriend: () => null
        };
        const spy = sinon.spy(FriendList.prototype, 'handlePageClick');
        const wrapper = mount(<FriendList friends={friends} actions={actions}  />);
        wrapper.update();
        wrapper.find('span').findWhere(node => node.text() == '2').simulate('click');
        expect(spy.callCount).toBe(1);
        expect(spy.withArgs(2).calledOnce);
    });
});