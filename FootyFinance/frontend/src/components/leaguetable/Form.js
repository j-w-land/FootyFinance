import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addClub } from "../../actions/clubs";

export class Form extends Component {
  state = {
    name: "",
    nickname: "",
  };

  static propTypes = {
    addClub: PropTypes.func.isRequired,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const { name, nickname } = this.state;
    const club = { name, nickname };
    this.props.addClub(club);
  };

  render() {
    const { name, nickname } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Add Club</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              onChange={this.onChange}
              value={name}
            />
          </div>
          <div className="form-group">
            <label>NicknameX</label>
            <input
              className="form-control"
              type="text"
              name="nickname"
              onChange={this.onChange}
              value={nickname}
            />
          </div>
          {/* <div className="form-group">
            <label>Message</label>
            <textarea
              className="form-control"
              type="text"
              name="message"
              onChange={this.onChange}
              value={message}
            />
          </div> */}
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { addClub })(Form);
