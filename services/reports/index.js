'use strict';

/* eslint max-len: ["error", { "ignoreComments": true }] */
// server-key: AAAAGwZ_-c8:APA91bEaKvpn1HC9kR6-8raR47x5mC4MHRidhBOYCihYvhT1yaJ85FJ5PgVReEBtFVQdMBq4wfTbaIGetUGguNg7mpiJsqhGzjWzlxSVuPePj0f4MYnC9dDW-gigWax6ktbYWR3u6OK8
// server-id: 116073167311

/**
 * koa-body - example.js
 * Copyright(c) 2017
 * MIT Licensed
 *
 * @author  Dann Vitaliy (@vdann)
 * @api private
 */
const Koa = require('koa');
const router = require('koa-router')();
const koaBody = require('koa-body')({ multipart: true });
// const fs = require('fs');

const renderDocx = require('./source/render-docx');
const renderPdf = require('./source/render-pdf');
const renderXlsx = require('./source/render-xlsx');

const app = new Koa();

router.post('/docx', koaBody, async (ctx, next) => {
  const tmplFile = ctx.request.body.files.tmpl_file.path;
  const tmplData = JSON.parse(ctx.request.body.fields.tmpl_data);

  const buf = await renderDocx(tmplFile, tmplData);

  ctx.status = 200;
  ctx.body = buf;
  next();
  // for test
  // fs.writeFileSync(`${__dirname}/temp/result.docx`, buf);
});

router.post('/pdf', koaBody, async (ctx, next) => {
  const tmplFile = ctx.request.body.files.tmpl_file.path;
  const tmplData = JSON.parse(ctx.request.body.fields.tmpl_data);

  const buf = await renderPdf(tmplFile, tmplData);

  ctx.status = 200;
  ctx.body = buf;
  next();
  // for test
  // fs.writeFileSync(`${__dirname}/temp/result.pdf`, buf);
});

router.post('/xlsx', koaBody, async (ctx, next) => {
  const body1 = ctx.request.body;
  // const tmplFile = ctx.request.body.files.tmpl_file.path;
  // const tmplData = JSON.parse(ctx.request.body.fields.tmpl_data);

  const buf = renderXlsx(body1);

  ctx.status = 200;
  ctx.body = buf;
  next();
  // for test
  // fs.writeFileSync(`${__dirname}/temp/result.pdf`, buf);
});

app.use(router.routes());

const PORT = process.env.PORT || 3333;

app.listen(PORT, 'localhost', () => {
  /* eslint no-console:0 max-len:0 */
  console.log(`Service reports started at port: ${PORT}. Environment: ${process.env.NODE_ENV}`);
});
