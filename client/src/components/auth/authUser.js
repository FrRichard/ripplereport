var React = require('react/addons');

var AuthUser = React.createClass({

    render: function() {
        return (
            <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                    <i className="fa fa-angle-down pull-right"></i>
                    <span>Connection</span>
                    <ul className="dropdown-menu">
                        <li>
                            <a href="/login">
                                <span>Signin</span>
                            </a>
                        </li>
                        <li>
                            <a href="/register">
                                <span>Signup</span>
                            </a>
                        </li>
                    </ul>
                </a>
            </li>
        )
    }
});

module.exports = AuthUser;




                  