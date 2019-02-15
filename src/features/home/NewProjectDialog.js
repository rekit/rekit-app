import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Icon } from 'antd';
import { hideNewProjectDialog } from './redux/actions';

export class NewProjectDialog extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {
    selected: null,
  };

  handleSelect = key => {
    this.setState({ selected: key });
  };

  render() {
    return (
      <Modal
        visible
        title="Create a new project"
        onCancel={this.props.actions.hideNewProjectDialog}
        className="home-new-project-dialog"
        maskClosable={false}
        width="800px"
        okText="Next"
      >
        <h2>Which type of the project to create?</h2>
        <div
          className="icon-block-container"
          style={{ marginBottom: this.state.selected ? '110px' : '0px' }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(i => (
            <div
              key={i}
              className={'icon-block' + (i === this.state.selected ? ' selected' : '')}
              onClick={() => this.handleSelect(i)}
            >
              <Icon type="html5" />
              <label>React</label>
            </div>
          ))}
        </div>
        {this.state.selected && (
          <div className="description">
            Rekit React template provides feature based SPA boilerplate with React Router, Redux
            outof box.
          </div>
        )}
      </Modal>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ hideNewProjectDialog }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewProjectDialog);
