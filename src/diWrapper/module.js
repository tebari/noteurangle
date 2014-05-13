import {
  Controller,
  Inject,
  Scope,
  getAnnotation,
  getAnnotations
} from './annotations';
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
      var scopeAttrName =
        (scopeAnnotation.name) ? scopeAnnotation.name : attrName;

      if (typeof attr === 'function') {
        scope[scopeAttrName] = angular.bind(controllerInstance, attr);
      } else {
        scope[scopeAttrName] = attr;
      }
    }
  }
}

function decorateControllerService($controller) {
  return function decoratedControllerService(constructor, locals) {
    var instance = $controller(constructor, locals);

    if (locals.$scope) {
      autowireControllerMethods(instance, locals.$scope);
    }

    return instance;
  };
}

function decorateModuleServices(module) {
  module.config(['$provide', function getProvide($provide) {
    $provide.decorator('$controller', ['$delegate', decorateControllerService]);
  }]);
}

export class Module {
  constructor(module) {
    decorateModuleServices(module);
    this.module = module;
  }

  register (obj) {
    var ctrlAnotation = getAnnotation(obj, Controller);
    var dependencies = listDependencies(obj);

    if (ctrlAnotation) {
      obj.$inject = dependencies;
      this.module.controller(ctrlAnotation.controllerName, obj);
    }
  }

}
