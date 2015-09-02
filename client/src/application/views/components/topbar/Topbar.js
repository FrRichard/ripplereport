var React = require('react');
var subcomponentselector = require('SubcomponentSelector');

/** @jsx React.DOM */
var Topbar = React.createClass({

  render: function(){
    
    if(this.props.tool == "transaction") {
      var title = "Transaction viewer";
    } else {
      var title = "Ledger Monitor";
    }

    return (
      <div className="top_bar">
        <div className="container-fluid expanded-panel">
          <div className="">
            <div id="logo" className="main-search">
              <a href="/app">{title}</a>
            </div>
            <div id="top-panel" >
              <div className="row" className="top_sidebar">
                <div >
                  <div className="top_bar_search">
                    <this.props.searchbar/>
                  </div>
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
