import React from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

export default class AddLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      isOpen: false,
      error: ''
    };
  }
  onSubmit(e) {
    const { url } = this.state;
    e.preventDefault();

    Meteor.call('links.insert', url, (err, res) => {
      if (!err) {
        this.handleModalClose();
      } else {
        this.setState({
          error: err.reason
        });
      }
    });
  }
  onChange(e) {
    this.setState({
      url: e.target.value.trim()
    })
  }
  handleModalClose() {
    this.setState({
      url: '',
      isOpen: false,
       error: ''
     });
  }
  render() {
    return (
      <div>
        <button onClick={() => this.setState({isOpen: true}) } className="button">+ Add Link</button>
        <Modal
        isOpen={this.state.isOpen}
        contentLabel="Add link"
        onAfterOpen={() => this.refs.url.focus()}
        onRequestClose={this.handleModalClose.bind(this)}
        className="boxed-view__box"
        overlayClassName="boxed-view boxed-view--modal">
          <h1>Add link</h1>
          {this.state.error ? <p>{this.state.error}</p> : ''}
          <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
            <input
              type="text"
              ref="url"
              placeholder="url"
              value={this.state.url}
              onChange={this.onChange.bind(this)}/>
            <button className="button">Add Link</button>
            <button type="button" className="button button--secondary" onClick={this.handleModalClose.bind(this)}>Cancel</button>
          </form>
        </Modal>
      </div>
    );
  }
}
