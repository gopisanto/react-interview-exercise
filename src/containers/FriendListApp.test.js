import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

import FriendListApp from './FriendListApp';
import {store} from './App';

it('<FriendListApp /> should render', () => {
    const wrapper = renderer.create(<Provider store={store}><FriendListApp /></Provider>).toJSON();

    expect(wrapper).toMatchSnapshot();
});