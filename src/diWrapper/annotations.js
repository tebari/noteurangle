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

function getAnnotation(obj, clazz) {
  var annotations = getAnnotations(obj, clazz);
  return (annotations.length > 0) ? annotations[0] : null;
}

function getAnnotations(obj, clazz) {
  if (!obj.annotations) {
    return [];
  }

  return obj.annotations.filter( (annotation) =>
    annotation instanceof clazz
  );
}

export {
  Inject,
  Controller,
  Scope,
  getAnnotation,
  getAnnotations
};
