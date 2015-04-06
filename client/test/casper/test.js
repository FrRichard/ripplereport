if (!casper) {
	var casper = require('casper').create();
}

casper.start('http://casperjs.org/', function() {
	this.echo(this.getTitle());
});

casper.thenOpen('http://phantomjs.org', function() {
	this.echo(this.getTitle());
});

casper.test.begin('Cow can moo', 2, function suite(test) {
	function Cow() {
		this.mowed = false;
		this.moo = function moo() {
			this.mowed = true; // mootable state: don't do that at home
			return 'moo!';
		};
	}

	var cow = new Cow();
	test.assertEquals(cow.moo(), 'moo!');
	test.assert(cow.mowed);
	test.done();
});

casper.run();