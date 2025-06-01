import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
function Loading() {
    return (
        <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    );
}

export default Loading;