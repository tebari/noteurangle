import angular from 'angular';
import {Module} from 'diWrap';

import NotesController from './NotesController';

var angularModule = angular.module('noteurangle', []).run(function () {
  console.log('noteurangle executing!');
});

var app = new Module(angularModule);
app.register(NotesController);

export default app;
