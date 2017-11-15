import React from 'react';
import { connect } from 'react-redux';
import './Preloader.css';

const Preloader = ({ loading }) => {
    if (!loading) return null;
    return (
        <div className="preloader">
            {loading && <p>Loading &hellip;</p>}
        </div>
    );
};
export default connect((state) => ({
    loading: state.ajaxStatus > 0
}))(Preloader);
