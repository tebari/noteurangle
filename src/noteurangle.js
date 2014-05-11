import angular from 'angular';
import {Module} from 'diWrapper/module';

import {notesController} from './notesController';

var angularModule = angular.module('noteurangle', []).run(function () {
  console.log('noteurangle executing!');
});

var app = new Module(angularModule);
app.register(notesController);

export default app;
