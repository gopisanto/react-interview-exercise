import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';

it('<App /> should render', () => {
    const wrapper = renderer.create(<App />).toJSON();

    expect(wrapper).toMatchSnapshot();
});