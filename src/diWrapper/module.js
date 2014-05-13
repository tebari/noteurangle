import {
  Controller,
  Inject,
  Scope,
  getAnnotation,
  getAnnotations
} from './annotations';
import {decorateInjector} from './injector';
import angular from 'angular';

function listDependencies (obj) {
  return getAnnotations(obj, Inject).map(
    annotation => annotation.dependencies
  ).reduce(
    (previousValue, currentValue) => previousValue.concat(currentValue)
  );
}

function autowireControllerMethods(controllerInstance, scope) {
  for (var attrName in controllerInstance) {
    var attr = controllerInstance[attrName];
    var scopeAnnotation = getAnnotation(attr, Scope);

    if (scopeAnnotation) {
      var scopeAttrName = (scopeAnnotation.name) ? scopeAnnotation.name : attrName;
      scope[scopeAttrName] = angular.bind(controllerInstance, attr);
    }

  }
}

@Inject('$delegate')
function decorateControllerService($controller) {
  return function decoratedControllerService(constructor, locals) {
    var instance = $controller(constructor, locals);

    if (locals.$scope) {
      autowireControllerMethods(instance, locals.$scope);
    }

    return instance;
  };
}

@Inject('$provide')
function decorateModuleServices($provide) {
  $provide.decorator('$controller', decorateControllerService);
}

export class Module {
  constructor(module) {
    decorateInjector(module);
    module.config(decorateModuleServices);

    this.module = module;
  }

  register (obj) {
    var ctrlAnotation = getAnnotation(obj, Controller);

    if (ctrlAnotation) {
      this.module.controller(ctrlAnotation.controllerName, obj);
    }
  }

}
