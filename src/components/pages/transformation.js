import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Config from '../../config';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';

const styles = () => ({
  input: {
    width: '100%',
  },
});

class Transformation extends React.Component {
  onChange = (e, i) => {
    const newVerbs = {
      ...this.props.transformationVerbs,
      [i]: e.target.value,
    };
    this.props.onChange({transformationVerbs: newVerbs});
  };

  render() {
    const {classes} = this.props;
    const placeholder = Config.pages.transformation.inputText;
    const verbItems = this.props.verbs.map(([verb, i]) => (
      <div key={verb}>
        <ListItem>
          <Input
            className={classes.input}
            placeholder={placeholder.replace('$', verb)}
            onChange={e => this.onChange(e, i)}
            value={this.props.transformationVerbs[i] || ''}
          />
        </ListItem>
      </div>
    ));
    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <List>{verbItems}</List>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Transformation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Transformation);
