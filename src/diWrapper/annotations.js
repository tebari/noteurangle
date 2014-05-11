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

export {
  Inject,
  Controller
};
