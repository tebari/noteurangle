import {Controller, Inject} from './annotations';

function listDependencies (obj) {
  return obj.annotations.filter(
    (annotation) => annotation instanceof Inject
  ).map(annotation => annotation.dependencies).reduce(
    (previousValue, currentValue) => previousValue.concat(currentValue)
  );
}

export class Module {
  constructor(module) {
    this.module = module;
  }

  register (obj) {
    var ctrlAnotations = obj.annotations.filter( (annotation) =>
      annotation instanceof Controller
    );
    var objWithDependencies = listDependencies(obj).concat(obj);

    if (ctrlAnotations.length > 0) {
      this.module.controller(ctrlAnotations[0].controllerName, objWithDependencies);
    }
  }

}
