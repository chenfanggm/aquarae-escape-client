import sceneManager from '../managers/sceneManager';
import modelManager from '../managers/modelManager';
import Camera from '../entities/Camera';
import Light from '../entities/Light';
import utils from "./utils";


class Scene {
  constructor(name) {
    if (!name) throw new Error('Name is required for creating scene.');
    this.name = name;
    this.gl = aquarae.gl;
    this.clearColor = this.createClearColor('0xC3C3C3');
    this.meta = {};
    this.children = [];
    this.lights = [];
    this.cameras = {};
    sceneManager.add(name, this);
  }

  preload() {
    console.log('[Scene] Pre loading...');
    // models
    if(this.meta && this.meta.models) {
      this.meta.models.forEach((model) => {
        modelManager.add(model.name, new model.clazz(model.opts));
      });
    }

    // objects
    if (this.meta && this.meta.objects) {
      this.meta.objects.forEach((obj) => {
        this.addChild(new obj.clazz(obj.opts));
      });
    }

    // gui
    if (this.meta && this.meta.guis) {
      this.meta.guis.forEach((gui) => {
        this.addChild(new gui.clazz(gui.opts));
      });
    }

    return Promise.all(this.children.map((obj) => {
      return obj.preload();
    }));
  }

  init() {
    this.children.forEach((obj) => {
      return obj.init();
    });
  }

  input() {
    this.children.forEach((obj) => {
      obj.input();
    });
  }

  enqueue() {
    this.children.forEach((obj) => {
      obj.enqueue();
    });
  }

  update(deltaTime) {
    this.children.forEach((obj) => {
      if (obj.isReady) {
        console.log('update here', obj);
        obj.update(deltaTime);
      }
    });
  }

  reset() {
    this.children.forEach((obj) => {
      obj.reset();
    });
    this.children = [];
  }

  setMeta(meta) {
    this.meta = meta;
  }

  addChild(obj) {
    if (obj instanceof Camera) {
      if (this.cameras[obj.name]) throw new Error(`Camera with name [${obj.name}] already exist in scene [${this.name}]`);
      this.cameras[obj.name] = obj;
    } else if (obj instanceof Light) {
      this.lights.push(obj);
    }
    this.children.push(obj);
  }

  getLights() {
    return this.lights;
  }

  getCamera(name) {
    if (!this.cameras[name]) throw new Error(`Camera with name [${name}] not exist in scene [${this.name}]`);
    return this.cameras[name];
  }

  setClearColor(color) {
    this.clearColor = color;
  }

  createClearColor(colorHex = '0xFFFFFF', alpha = 1.0) {
    const rgb = utils.hexToRGB(colorHex);
    const rgba = [...rgb, alpha];
    return [rgba[0] / 255, rgba[1] / 255, rgba[2] / 255];
  }

  remove(obj) {
    const objIndex = this.children.indexOf(obj);
    if (objIndex > -1) {
      this.children.splice(objIndex, 1);
    }
  }
}

export default Scene;
