import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './FriendList.css';
import FriendListItem from './FriendListItem';
import Pagination from './Pagination';

const NO_OF_ITEMS_PER_PAGE = 2;
const NO_OF_PAGE_LINKS_TO_DISPLAY = 4;

export class FriendList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
    }

    this.handlePageClick = this.handlePageClick.bind(this);
  }

  handlePageClick(activePage) {
    this.setState({activePage});
  }

  getPaginatedFriends = () => {
    const {activePage} = this.state;
    const {friends} = this.props;
    const startIndex = activePage === 1 ? 0 : (activePage - 1) * NO_OF_ITEMS_PER_PAGE;
    const endIndex = startIndex + NO_OF_ITEMS_PER_PAGE - 1;

    return {paginatedFriends: friends.slice(startIndex, endIndex + 1), startIndex};
  }

  render () {    
    const {paginatedFriends, startIndex} = this.getPaginatedFriends();

    return (
      <div>
        <ul className={styles.friendList}>
          {
            paginatedFriends.map((friend, index) => {
              return (
                <FriendListItem
                  key={index}
                  id={startIndex + index}
                  name={friend.name}
                  starred={friend.starred}
                  gender={friend.gender}
                  {...this.props.actions} />
              );
            })
          }
        </ul>
        <Pagination
          noOfItems={this.props.friends.length}
          noOfItemsPerPage={NO_OF_ITEMS_PER_PAGE}
          noOfPageLinksToDisplay={NO_OF_PAGE_LINKS_TO_DISPLAY}
          onPageChange={this.handlePageClick}
        />
      </div>
    );
  }

}

FriendList.propTypes = {
  friends: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

export default FriendList;