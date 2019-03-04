import React from 'react';
import renderer from 'react-test-renderer';
import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import sinon from 'sinon';
import FriendListItem from './FriendListItem';

configure({ adapter: new Adapter() });

describe('<FriendListItem />', () => {
    let props = {
        gender: 'male',
        name: 'Santosh',
        id: 1,
        starred: true,
        starFriend: () => null,
        deleteFriend: () => null
    }
    it('should render', () => {
        const wrapper = renderer.create(<FriendListItem {...props} />).toJSON();

        expect(wrapper).toMatchSnapshot();
    });
    it('should call starFriend action when clicked on star of a particular friend', () => {
        const spy = sinon.spy();
        props.starFriend = spy;
        const wrapper = shallow(<FriendListItem {...props} />);
        wrapper.find('i').findWhere(node => node.hasClass('fa fa-star')).simulate('click');
        expect(spy.withArgs(props.id).calledOnce);
    });
    it('should call deleteFriend action when clicked on delete of a particular friend', () => {
        const spy = sinon.spy();
        props.deleteFriend = spy;
        const wrapper = shallow(<FriendListItem {...props} />);
        wrapper.find('i').findWhere(node => node.hasClass('fa fa-trash')).simulate('click');
        expect(spy.withArgs(props.id).calledOnce);
    });
});