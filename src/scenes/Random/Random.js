import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';

import InputBox from '../../components/InputBox';
import Loader from '../../components/Loader';

import './Random.css';

class Random extends Component {

  componentDidMount() {
    this.props.startTimer();
  }

  componentWillUnmount() {
    this.props.stopTimer();
  }

  render() {
    return (
      <div className="random">
        {this.props.loading ? <Loader /> : ''}

        <InputBox clazz="delay" label="Interval" type="number"
          value={this.props.interval}
          button="Save" onButtonClick={this.props.onIntervalChange} />

        {this.props.item ?
          <div>
            <img src={this.props.item.image_url} alt={this.props.item.caption} />
          </div>
          : ''}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.random.item,
  interval: state.random.interval,
  loading: state.random.loading,
  error: state.random.error
});

const mapDispatchToProps = dispatch => ({
  loadRandom: () => dispatch(actions.loadRandom()),
  startTimer: () => dispatch(actions.startTimer()),
  stopTimer: () => dispatch(actions.stopTimer()),
  onIntervalChange: interval => dispatch(actions.changeInterval(interval))
});

export default connect(mapStateToProps, mapDispatchToProps)(Random)
