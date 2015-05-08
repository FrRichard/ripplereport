var React = require('react');
var subcomponentselector = require('SubcomponentSelector');

/** @jsx React.DOM */
var Topbar = React.createClass({

  render: function(){
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
                    <this.props.searchbar/>
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
