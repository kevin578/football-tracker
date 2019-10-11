import React from "react"
import PropTypes from "prop-types"
class App extends React.Component {
  render () {
    return (
      <React.Fragment>
        Games: {this.props.games}
      </React.Fragment>
    );
  }
}

App.propTypes = {
  games: PropTypes.string
};
export default App
