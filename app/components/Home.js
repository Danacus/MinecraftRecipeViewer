// @flow
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styles from './Home.css'
import Main from '../main'
import Tree from '../tree'
import { STATUS } from '../utils/Constants'


export default class Home extends Component {

  componentDidMount() {
    this.props.clearRecipeFiles()
    this.props.setStatus(STATUS.LOADING('Loading recipes ...'))
    this.props.readRecipeFiles("/home/daan/Documents/Development/JEIExporter/run/config/jeiexporter/exports/recipes/").then(() => {
      this.props.setStatus(STATUS.LOADING('Loading maps ...'))

      let promises = [
        this.props.readMap("/home/daan/Documents/Development/JEIExporter/run/config/jeiexporter/exports/lookupMap.json", "lookupMap"),
        this.props.readMap("/home/daan/Documents/Development/JEIExporter/run/config/jeiexporter/exports/tooltipMap.json", "tooltipMap")
      ]

      Promise.all(promises).then(() => {
        this.props.setStatus(STATUS.IDLE)
        let tree = new Tree(this.props.settings, this.props.recipes)
        tree.generate("actuallyadditions:block_grinder_double:0", this.props)
      })
    })

  }

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
