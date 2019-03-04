import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { range } from 'lodash';
import classnames from 'classnames';
import styles from './Pagination.css';

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startPage: 1,
            endPage: props.noOfPageLinksToDisplay - 1,
            activePage: props.defaultActivePage
        }

        this.totalPages = this.totalPages.bind(this);
        this.calculateStartPage = this.calculateStartPage.bind(this);
        this.setSelectedPage = this.setSelectedPage.bind(this);
        this.firstPage = this.firstPage.bind(this);
        this.lastPage = this.lastPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.generatePageLinks = this.generatePageLinks.bind(this);
    }

    totalPages() {
        return Math.ceil(this.props.noOfItems / this.props.noOfItemsPerPage);
    }

    calculateStartPage(selectedPage) {
        const {startPage} = this.state;
        const {noOfPageLinksToDisplay} = this.props;
        const totalPages = this.totalPages();
        const endPage = Math.min(startPage + noOfPageLinksToDisplay - 1, totalPages);

        if (selectedPage < startPage) {
            return selectedPage === 1 ? selectedPage : selectedPage - 1;
        } else if (selectedPage > endPage) {
            return startPage + selectedPage - endPage; 
        } else if (selectedPage === totalPages) {
            return startPage;
        } else if (startPage + noOfPageLinksToDisplay - 1 === selectedPage && selectedPage < totalPages) {
            return startPage + 1;
        } else if (selectedPage === startPage && startPage !== 1) {
            return startPage - 1;
        }
        return startPage;
    }

    setSelectedPage(selectedPage) {
        this.setState({activePage: selectedPage, startPage: this.calculateStartPage(selectedPage)});
        this.props.onPageChange(selectedPage);
    }

    firstPage() {
        this.setSelectedPage(1);
    }

    lastPage() {
        this.setSelectedPage(this.totalPages());
    }

    nextPage() {
        this.setSelectedPage(this.state.activePage + 1);
    }

    prevPage() {
        this.setSelectedPage(this.state.activePage - 1);
    }

    handlePageClick(selectedPage) {
        return () => {
            this.setSelectedPage(selectedPage);
        }
    }

    generatePageLinks() {
        const {activePage, startPage} = this.state;
        const {noOfPageLinksToDisplay, showStatus, noOfItems} = this.props;
        const totalPages = this.totalPages();
        const endPage = Math.min(startPage + noOfPageLinksToDisplay - 1, totalPages);
        const pageLinks = range(startPage, endPage + 1)
            .map(pageNum => (
                    <span
                        className={classnames({[styles.disabled]: pageNum === activePage})}
                        key={pageNum}
                        onClick={this.handlePageClick(pageNum)}>
                            {pageNum}
                    </span>
                )
            );
        const firstAndPrevLinkDisabled = activePage === 1;
        const lastAndNextLinkDisabled = activePage === totalPages;

        if (totalPages === 1 || noOfItems === 0) {
            return null;
        }
        
        return (
            <div className={styles.pagination}>
                <span
                    className={classnames({[styles.disabled]: firstAndPrevLinkDisabled})}
                    disabled={firstAndPrevLinkDisabled}
                    onClick={this.firstPage}>
                        {'<<'}
                    </span>
                <span
                    className={classnames({[styles.disabled]: firstAndPrevLinkDisabled})}
                    disabled={firstAndPrevLinkDisabled}
                    onClick={this.prevPage}>
                        {'<'}
                    </span>
                {pageLinks}
                <span
                    className={classnames({[styles.disabled]: lastAndNextLinkDisabled})}
                    disabled={lastAndNextLinkDisabled}
                    onClick={this.nextPage}>
                        {'>'}
                    </span>
                <span
                    className={classnames({[styles.disabled]: lastAndNextLinkDisabled})}
                    disabled={lastAndNextLinkDisabled}
                    onClick={this.lastPage}>
                        {'>>'}
                </span>
                {showStatus && <span className={styles.paginationStatus}>{`${activePage} of ${totalPages}`}</span>}
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.generatePageLinks()}
            </div>
        );
    }
};

Pagination.PropTypes = {
    noOfItems: PropTypes.number.isRequired,
    noOfItemsPerPage: PropTypes.number,
    noOfPageLinksToDisplay: PropTypes.number,
    defaultActivePage: PropTypes.number,
    onPageChange: PropTypes.func.isRequired,
    showStatus: PropTypes.bool
};

Pagination.defaultProps = {
    noOfItemsPerPage: 10,
    noOfPageLinksToDisplay: 5,
    defaultActivePage: 1,
    showStatus: true
}

export default Pagination;