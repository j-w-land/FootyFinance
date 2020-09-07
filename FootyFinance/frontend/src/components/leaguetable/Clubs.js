import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getClubs, deleteClub } from "../../actions/clubs";

export class Clubs extends Component {
  static propTypes = {
    clubs: PropTypes.array.isRequired,
    getClubs: PropTypes.func.isRequired,
    deleteClub: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getClubs();
  }

  render() {
    return (
      <Fragment>
        <h2>Clubs</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Nickname</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.clubs.map((club) => (
              <tr key={club.id}>
                <td> {club.id} </td>
                <td> {club.name} </td>
                <td> {club.nickname} </td>
                {/*<td>
                  <button
                    onClick={this.props.deleteClub.bind(this, club.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>*/}
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  clubs: state.clubs.clubs,
});

export default connect(mapStateToProps, { getClubs, deleteClub })(Clubs);
