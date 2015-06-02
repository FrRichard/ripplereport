var React = require('react');
var subcomponentselector = require('SubcomponentSelector');

/** @jsx React.DOM */
var Topbar = React.createClass({

  render: function(){
    return (
      <div className="top_bar">
        <div className="container-fluid expanded-panel">
          <div className="">
            <div id="logo" className="main-search">
              <a href="/app">Ledger Monitor</a>
            </div>
            <div id="top-panel" >
              <div className="row" className="top_sidebar">
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
