var React = require('react/addons');
var store = require('localstorage');

var Register = React.createClass({
	getInitialState: function() {
		return { email: "david@qunb.com", password: "blatte"};
	},
	handleChange: function(event) {
    	this.setState({value: event.target.value});
  	},
	submit: function(event){
		event.stopPropagation();
		var data = {
			email: this.state.email,
			password: this.state.password
		};
		$.ajax({
			data: data,
			crossDomain: true,
			type: 'POST',
			url: '/user/register',
			success: function(response) {
				store.set('auth', response);
				console.log(store.get('auth'));
				window.location.href = "/app";
			},
			error: function(response){
				console.log(response);
			}
		});
	},
	render: function(){
		return (
			<form className="form-signin" accept-charset="UTF-8" role="form">
				<fieldset>
					<label className="panel-login">
						<div className="login_result"></div>
					</label>
					<input className="form-control" id="email" placeholder="Email" type="text" />
					<input className="form-control" id="password1" placeholder="Password" type="password" />
					<input className="form-control" id="password2" placeholder="Check password" type="password" />
					<hr className="star-primary"/>
					<input className="btn btn-lg btn-success btn-block" id="register" value="Signup" onClick={this.submit} />
				</fieldset>
			</form>
		)
	}
});

module.exports = Register;