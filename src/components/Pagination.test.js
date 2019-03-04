import React from 'react';
import renderer from 'react-test-renderer';
import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import sinon from 'sinon';
import Pagination from './Pagination';
import styles from './Pagination.css';

configure({ adapter: new Adapter() });

describe('<Pagination /> using snapshot', () => {
    it('renders nothing when no of pages is 1', () => {
        const tree = renderer.create(<Pagination noOfItems={10} />).toJSON();
    
        expect(tree).toMatchSnapshot();
    });
    it('renders with page links when more than one page', () => {
        const tree = renderer.create(<Pagination noOfItems={30} />).toJSON();
    
        expect(tree).toMatchSnapshot();
    });
});
describe('<Pagination /> using enzyme and sinon', () => {
    const noOfItems = 30;
    const noOfItemsPerPage = 3;

    it('sits on page 1 when defaultActivePage is not passed', () => {
        const wrapper = shallow(<Pagination noOfItems={noOfItems} />);
        const state = wrapper.state().activePage;
        expect(state).toEqual(1);
    });
    it('sits on page no which is passed as defaultActivePage', () => {
        const wrapper = shallow(<Pagination noOfItems={noOfItems} defaultActivePage={3} />);
        const state = wrapper.state().activePage;
        expect(state).toEqual(3);
    });
    it('active page is disabled for selection', () => {
        const wrapper = shallow(<Pagination noOfItems={noOfItems} defaultActivePage={2} />);
        const state = wrapper.state().activePage;
        expect(state).toEqual(2);
        expect(wrapper.find('span').findWhere(node => node.hasClass(styles.disabled)).length).toEqual(1);
    });
    it('active page, next (>), last (>>) are disabled for selection when activePage is last page', () => {
        const wrapper = shallow(
            <Pagination
                noOfItems={noOfItems}
                noOfItemsPerPage={noOfItemsPerPage}
                onPageChange={() => null}
            />
        );
        wrapper.instance().lastPage();
        expect(wrapper.find('span').findWhere(node => node.hasClass(styles.disabled)).length).toEqual(3);
    });
    it('last page is selected when >> is clicked', () => {
        const wrapper = shallow(
            <Pagination
                noOfItems={noOfItems}
                noOfItemsPerPage={noOfItemsPerPage}
                onPageChange={() => null}
            />
        );
        wrapper.instance().lastPage();
        expect(wrapper.state().activePage).toEqual(Math.ceil(30 / 3));
    });
    it('first page is selected when << is clicked', () => {        
        const wrapper = shallow(
            <Pagination
                noOfItems={noOfItems}
                noOfItemsPerPage={noOfItemsPerPage}
                onPageChange={() => null}
                defaultActivePage={4}
            />
        );
        wrapper.instance().firstPage();
        expect(wrapper.state().activePage).toEqual(1);
    });
    it('next page is selected when > is clicked', () => {        
        const wrapper = shallow(
            <Pagination
                noOfItems={noOfItems}
                noOfItemsPerPage={noOfItemsPerPage}
                onPageChange={() => null}
                defaultActivePage={2}
            />
        );
        wrapper.instance().nextPage();
        expect(wrapper.state().activePage).toEqual(3);
    });
    it('prev page is selected when < is clicked', () => {        
        const wrapper = shallow(
            <Pagination
                noOfItems={noOfItems}
                noOfItemsPerPage={noOfItemsPerPage}
                onPageChange={() => null}
                defaultActivePage={2}
            />
        );
        wrapper.instance().prevPage();
        expect(wrapper.state().activePage).toEqual(1);
    });
    it('when a page is selected, it should become the activePage', () => {        
        const wrapper = shallow(
            <Pagination
                noOfItems={noOfItems}
                noOfItemsPerPage={noOfItemsPerPage}
                onPageChange={() => null}
                defaultActivePage={2}
            />
        );
        wrapper.instance().handlePageClick(3)();
        expect(wrapper.state().activePage).toEqual(3);
    });
    it('calls onPageChange when page is selected', () => {
        const spyFunc = sinon.spy();
        const wrapper = mount(
            <Pagination
                noOfItems={noOfItems}
                noOfItemsPerPage={noOfItemsPerPage}
                onPageChange={spyFunc}
            />
        );
        wrapper.instance().lastPage();
        expect(spyFunc.callCount).toEqual(1);
    });
});