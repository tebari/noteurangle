import {
  Controller,
  Inject,
  Scope,
  getAnnotation,
  getAnnotations
} from './annotations';

function listDependencies (obj) {
  return getAnnotations(obj, Inject).map(
    annotation => annotation.dependencies
  ).reduce(
    (previousValue, currentValue) => previousValue.concat(currentValue)
  );
}

function registerController(module, name, dependencies, Controller) {
  var scopeIndex = dependencies.indexOf('$scope');
  module.controller(name, dependencies.concat( (...deps) => {
        var controller = new Controller(...deps);
        var scope = (scopeIndex >= 0) ? deps[scopeIndex] : null;

        for (var attrName in controller) {
          var attr = controller[attrName];
          var scopeAnnotation = getAnnotation(attr, Scope);
          if (scope && scopeAnnotation) {
            var scopeAttrName =
              (scopeAnnotation.name) ? scopeAnnotation.name : attrName;

            scope[scopeAttrName] = () => {
              return attr.apply(controller, arguments);
            };
          }
        }
  }));
}

export class Module {
  constructor(module) {
    this.module = module;
  }

  register (obj) {
    var ctrlAnotation = getAnnotation(obj, Controller);
    var dependencies = listDependencies(obj);

    if (ctrlAnotation) {
      registerController(this.module, ctrlAnotation.controllerName, dependencies, obj);
    }
  }

}
