import React, { Component } from 'react'


const status = {
  HOVERED: 'hovered',
  NORMAL: 'normal',
}

class Link extends Component{
  constructor(props){
    super(props);
  
    this._onMouseEnter = this._onMouseEnter.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);

  }
}
