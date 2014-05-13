class Inject {
  constructor(...dependencies) {
    this.dependencies = dependencies;
  }
}

class Controller {
  constructor(name) {
    this.controllerName = name;
  }
}

class Scope {
  constructor(name) {
    this.name = name;
  }
}

function getAnnotation(fn, annotationClass) {
  if (!fn || typeof fn !== 'function' || !fn.annotations) {
    return null;
  }

  var annotations = getAnnotations(fn, annotationClass);
  return (annotations.length > 0) ? annotations[0] : null;
}

function getAnnotations(fn, annotationClass) {
  if (!fn || typeof fn !== 'function' || !fn.annotations) {
    return [];
  }

  return fn.annotations.filter( (annotation) =>
    annotation instanceof annotationClass
  );
}

export {
  Inject,
  Controller,
  Scope,
  getAnnotation,
  getAnnotations
};
