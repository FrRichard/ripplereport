var React = require('react/addons');

var UserTopbar = React.createClass({
    
    getInitialState: function() {
        return {
            user: {
                name: 'bug',
                img: './img/profile.png'
            }
        };
    },

    render: function() {
        return (
            <li className="dropdown">
                <a href="#" className="dropdown-toggle account" data-toggle="dropdown">
                    <div className="avatar">
                        <img src={this.state.user && this.state.user.img ? this.state.user.img : "./img/avatar.jpg"} className="img-rounded" alt="avatar" />
                    </div>
                    <i className="fa fa-angle-down pull-right"></i>
                    <div className="user-mini pull-right">
                        <span className="welcome">Hello,</span>
                        <span>{this.state.user && this.state.user.name ? this.state.user.name : "test"}</span>
                    </div>
                </a>
                <ul className="dropdown-menu">
                    <li>
                        <a href="#">
                            <i className="fa fa-user"></i>
                            <span>Profile</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="fa fa-cog"></i>
                            <span>Settings</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="fa fa-power-off"></i>
                            <span>Logout</span>
                        </a>
                    </li>
                </ul>
            </li>
        )
    }
});

module.exports = UserTopbar;




                  