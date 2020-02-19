import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Checkbox.scss';

const Checkbox = props => {
	return (
		<label className={classNames('checkbox--label', props.className)}>
			<input type="checkbox" value={props.value} onChange={e => props.onChange(e.target.checked)} />
			{props.children}
		</label>
	);
};

const { bool, func, string } = PropTypes;
Checkbox.propTypes = {
	value: bool.isRequired,
	onChange: func.isRequired,
	className: string,
};

Checkbox.defaultProps = {
	className: '',
};

export default Checkbox;
