// @flow
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styles from './Home.css'
import Main from '../main'
import Tree from '../tree2'
import { STATUS } from '../utils/Constants'


export default class Home extends Component {
  render() {
    return (
      <div>
        <p>{this.props.status.title}</p>
        <div className={styles.container} data-tid="container">
          <div id='tree'>

          </div>
        </div>
      </div>
    );
  }
}

/*
<div className={styles.itemList}>
  <div className={styles.gridItem}></div>
</div>
*/
