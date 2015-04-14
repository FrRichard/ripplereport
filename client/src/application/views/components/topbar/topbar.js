var React = require('react');
// var Searchbar = require('Searchbar');
var subcomponentselector = require('SubcomponentSelector');

/** @jsx React.DOM */
var Topbar = React.createClass({

  render: function(){
     var Searchbar = this.props.searchbar;
    return (
      <div className="toptop">
        <div className="container-fluid expanded-panel">
          <div className="row col-sm-11 ">
            <div id="logo" className="col-sm-2 main-search">
              <a href="/app">Ledger Monitor</a>
            </div>
            <div id="top-panel" >
              <div className="row" className="col-sm-7">
                <div >
                  <a href="#" className="show-sidebar">
                    <i className="fa fa-bars"></i>
                  </a>
                    <Searchbar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Topbar;
              // <div className="col-xs-4 col-sm-8 top-panel-right">
              //   <ul className="nav navbar-nav pull-right panel-menu">
              //     <li className="hidden-xs">
              //       <a href="#" className="modal-link">
              //         <i className="fa fa-plus"></i>
              //       </a>
              //     </li>
              //     <li className="hidden-xs">
              //       <a href="#" className="modal-link">
              //         <i className="fa fa-lock"></i>
              //       </a>
              //     </li>
              //     <li className="hidden-xs">
              //       <a href="index.html" className="modal-link">
              //         <i className="fa fa-bell"></i>
              //         <span className="badge">0</span>
              //       </a>
              //     </li>
              //     <li className="dropdown">
              //       <a href="#" className="dropdown-toggle account" data-toggle="dropdown">
              //         <div className="avatar">
              //           <img src="./img/avatar.jpg" className="img-rounded" alt="avatar" />
              //         </div>
              //         <i className="fa fa-angle-down pull-right"></i>
              //         <div className="user-mini pull-right">
              //           <span className="welcome">Welcome,</span>
              //           <span>mysterious user</span>
              //         </div>
              //       </a>
              //       <ul className="dropdown-menu">
              //         <li>
              //           <a href="#">
              //             <i className="fa fa-user"></i>
              //             <span>Profile</span>
              //           </a>
              //         </li>
              //         <li>
              //           <a href="#">
              //             <i className="fa fa-cog"></i>
              //             <span>Settings</span>
              //           </a>
              //         </li>
              //         <li>
              //           <a href="#">
              //             <i className="fa fa-power-off"></i>
              //             <span>Logout</span>
              //           </a>
              //         </li>
              //       </ul>
              //     </li>
              //   </ul>
              // </div>