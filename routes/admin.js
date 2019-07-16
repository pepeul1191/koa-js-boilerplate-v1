const Router = require('koa-trie-router');
var constants = require('../configs/constants');
var helpers = require('../configs/helpers');
var contents = require('../configs/contents');
var middlewares = require('../configs/middlewares');
var adminHelper = require('../helpers/admin_helper');
var models = require('../configs/models');

let router = new Router();

router.get('/admin/login', [
  middlewares.sessionAdminRequiredFalse, 
  async (ctx, next) => {
    ctx.status = 200;
    var lang = 'sp';
    var locals = {
      constants: constants.data,
      title: contents.titles()[lang]['admin_login'],
      helpers: helpers,
      csss: adminHelper.loginCss(),
      jss: adminHelper.loginJs(),
      message: '',
      contents: contents.get('admin')[lang],
      lang: lang,
    };
    await ctx.render('admin/login', locals);
  }
]);

router.post('/admin/login', [ 
  async (ctx, next) => {
    var message = '';
    var lang = 'sp';
    var message_status = '';
    ctx.status = 200;
    if(middlewares.CSRFValidateForm(ctx) != true){
      ctx.status = 500;
      message = contents.get('error')[lang].csrf.message_form;
      message_status = 'color-error';
    }
    if(constants.admin.user == ctx.request.body.user && 
      constants.admin.pass == ctx.request.body.pass){
      // vamos a /admin
      return await ctx.redirect('/admin');
    }else{
      ctx.status = 500;
      message = contents.get('admin')[lang].login.login_user_not_found;
      message_status = 'color-error';
    }
    var locals = {
      constants: constants.data,
      title: contents.titles()[lang]['admin_login'],
      helpers: helpers,
      csss: adminHelper.loginCss(),
      jss: adminHelper.loginJs(),
      message: message,
      message_status: message_status,
      contents: contents.get('admin')[lang],
      lang: lang,
    };
    await ctx.render('admin/login', locals);
  }
]);

exports.routes = router.middleware();