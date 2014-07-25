var checkAuthorization = function (req, res, next) {
    if (!req.user) {
        return res.send(401,{ error: 'The user can not do this action witout login.' });
    }
    next();
};

function setup(app) {
	//Routes
	var politicians = require('./lib/routes/politicians.js'),
		proposals = require('./lib/routes/proposals.js'),
		political_parties = require('./lib/routes/political_parties'),
		users = require('./lib/routes/users'),
		comments = require('./lib/routes/comments'),
		rating = require('./lib/routes/ratings'),
		goods = require('./lib/routes/goods'),
		curriculum = require('./lib/routes/curriculum');

	

	//Local login routes
	app.post('/v1/user/register', users.register);
	app.post('/v1/user/login', users.login);
	app.get('/v1/user/logout', users.logout);
	app.get('/v1/user/validadeMail/:username/:comfirmationPass', users.validadeMail);

	app.get('/v1/profile', users.findById); 
	
	//Login Twitter:
	//app.get('/v1/connect/twitter', users.loginTwitter);
	//app.get('/v1/connect/twitter/callback', users.loginTwitterCallback);

	//Login Facebook:
	//app.get('/v1/auth/facebook', users.loginFacebook);
	//app.get('/v1/auth/facebook/callback', users.loginFacebookCallback);

	//Login Google:
	//app.get('/v1/auth/google', users.loginGoogle);
	//app.get('/v1/auth/google/return', users.loginGoogleCallback);

	//Login Linkedin:
	//app.get('/v1/auth/linkedin', users.loginLinkedin);
	//app.get('/v1/auth/linkedin/callback', users.loginLinkedinCalback);

	//Politicians routes
	app.get('/v1/politicians', politicians.findAll);
	app.get('/v1/politician/:id', politicians.findById);
	app.get('/v1/politician/:id/proposals', politicians.findProposalsById);
	app.get('/v1/politician/:id/goods', politicians.findGoodsById);
	app.get('/v1/politician/:id/curriculum', politicians.findCurriculumById);
	app.post('/v1/politician', checkAuthorization, politicians.add);
	app.put('/v1/politician/:id', checkAuthorization, politicians.update);
	app.delete('/v1/politician/:id', checkAuthorization, politicians.delete);

	//Proposals routes
	app.get('/v1/proposals', proposals.findAll);
	app.get('/v1/proposal/:id', proposals.findById);
	app.post('/v1/proposal', checkAuthorization, proposals.add);
	app.put('/v1/proposal/:id', checkAuthorization, proposals.update);
	app.delete('/v1/proposal/:id', checkAuthorization, proposals.delete); 

	//Goods routes
	app.get('/v1/goods', goods.findAll);
	app.get('/v1/good/:id', goods.findById);
	app.post('/v1/good', checkAuthorization, goods.add);
	app.put('/v1/good/:id', checkAuthorization, goods.update);
	app.delete('/v1/good/:id', checkAuthorization, goods.delete); 

	//Curriculum routes
	app.get('/v1/curriculums', curriculum.findAll);
	app.get('/v1/curriculum/:id', curriculum.findById);
	app.post('/v1/curriculum', checkAuthorization, curriculum.add);
	app.put('/v1/curriculum/:id', checkAuthorization, curriculum.update);
	app.delete('/v1/curriculum/:id', checkAuthorization, curriculum.delete); 

	//Political Parties routes
	app.get('/v1/political_parties', political_parties.findAll);
	app.get('/v1/political_parties/:sigla', political_parties.findById);
	app.post('/v1/political_parties', checkAuthorization, political_parties.add);
	app.put('/v1/political_parties/:sigla', checkAuthorization, political_parties.update);
	app.delete('/v1/political_parties/:sigla', checkAuthorization, political_parties.delete);

	//Comments routes
	app.get('/v1/comments', comments.findAll);
	app.get('/v1/comments/:id', comments.findById);
	app.post('/v1/comment', checkAuthorization, comments.add);
	app.delete('/v1/comment/:id', checkAuthorization, comments.delete);

	app.get('/v1/rating/:id', rating.findById);
	app.post('/v1/rating/:id', checkAuthorization, rating.update);
};

exports.setup = setup;