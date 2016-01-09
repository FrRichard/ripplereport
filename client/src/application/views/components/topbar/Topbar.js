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
      <nav className="navbar navbar-default top_bar">
        <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a id="bar_brand"className="navbar-brand" href="/"> Home </a>
        </div>
        <div className="container-fluid ">
           <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li> <a href="http://heartbit.io/app" id="realtime"> Real Time </a> </li>
                <li> <a href="http://heartbit.io/marketmakers" id="marketmakers"> Market Makers </a> </li>
                <li className="dropdown">
                  <a id="ledgermonitor" href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> Ledgermonitor <span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li>
                      <a id="ledgermonitor_account" href="http://ledgermonitor.heartbit.io/app"> Account Analytics </a>
                    </li>
                    <li>
                      <a id="ledgermonitor_transaction" href="http://ledgermonitor.heartbit.io/transaction"> Transaction Viewer </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
        </div>
      </nav>
    )
  }
});

module.exports = Topbar;


      // <div className="top_bar">
      //   <div className="expanded-panel">
      //     <div className="">
      //       <div id="logo" className="main-search">
      //         <a href="/app">{title}</a>
      //       </div>
      //       <div id="top-panel" >
      //         <div className="row" className="top_sidebar">
      //           <div >
      //             <div className="top_bar_search">
      //               <this.props.searchbar/>
      //             </div>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>