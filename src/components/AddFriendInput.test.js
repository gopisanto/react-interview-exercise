import React from 'react';
import renderer from 'react-test-renderer';
import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import sinon from 'sinon';
import AddFriendInput from './AddFriendInput';
import styles from './AddFriendInput.css';

configure({ adapter: new Adapter() });

describe('<AddFriendInput />', () => {
    it('should render', () => {
        const wrapper = renderer.create(<AddFriendInput addFriend={() => null} />).toJSON();

        expect(wrapper).toMatchSnapshot();
    });
    it('should say provide name, gender error when no data entered and submitted', () => {
        const wrapper = mount(<AddFriendInput addFriend={() => null} />);
        const errorMessage = 'Please provide name, gender';
        wrapper.instance().handleSubmit({which: 13});
        wrapper.update();
        expect(wrapper.find('.error').text()).toBe(errorMessage);
    });
    it('should say provide name error when no data entered and submitted', () => {
        const wrapper = mount(<AddFriendInput addFriend={() => null} />);
        const errorMessage = 'Please provide name';
        wrapper.setState({gender: 'male'});
        wrapper.instance().handleSubmit({which: 13});
        wrapper.update();
        expect(wrapper.find('.error').text()).toBe(errorMessage);
    });
    it('should say provide gender error when no data entered and submitted', () => {
        const wrapper = mount(<AddFriendInput addFriend={() => null} />);
        const errorMessage = 'Please provide gender';
        wrapper.setState({name: 'Santosh'});
        wrapper.instance().handleSubmit({which: 13});
        wrapper.update();
        expect(wrapper.find('.error').text()).toBe(errorMessage);
    });
    it('should call addFriend action on enter', () => {
        const spy = sinon.spy();
        const wrapper = mount(<AddFriendInput addFriend={spy} />);
        wrapper.setState({name: 'Santosh', gender: 'male'});
        wrapper.instance().handleSubmit({which: 13});
        expect(spy.calledOnce);
    });
});