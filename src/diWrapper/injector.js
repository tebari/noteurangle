import {Inject} from './annotations';

function decorateAddInjectToFunction(obj, method, pos) {
  return function () {
    var fn = arguments[pos];
    if (fn && typeof fn === 'function' && !fn.$inject) {
      Inject.setAngularAnnotation(fn);
    }
    var result = method.apply(this, arguments);
    return result;
  };
}

function decorateInjectorService($injector) {
  $injector.invoke = decorateAddInjectToFunction($injector, $injector.invoke, 0);
  $injector.instantiate = decorateAddInjectToFunction($injector, $injector.instantiate, 0);
  $injector.annotate = decorateAddInjectToFunction($injector, $injector.annotate, 0);
}

function decorateProvideService($provide) {
  $provide.provider = decorateAddInjectToFunction($provide, $provide.provider, 1);
  $provide.factory = decorateAddInjectToFunction($provide, $provide.factory, 1);
  $provide.service = decorateAddInjectToFunction($provide, $provide.service, 1);
  $provide.decorator = decorateAddInjectToFunction($provide, $provide.decorator, 1);
}

export function decorateInjector(module) {
  module.config(['$injector', '$provide', function ($injector, $provide) {
    decorateInjectorService($injector);
    decorateProvideService($provide);
  }]);
}
