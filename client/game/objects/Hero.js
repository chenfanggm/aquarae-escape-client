import timeManager from '../managers/timeManager';
import shaderManager from '../managers/shaderManager';
import resourceManager from '../managers/resourceManager';
import GameObject from '../entities/GameObject';
import MeshRenderer from '../entities/MeshRenderer';


class Hero extends GameObject {
  constructor(opts) {
    super(opts);
    this.material = {
      program: shaderManager.get('simpleDiffuseShader')
    };
    this.mesh = {
      ...this.mesh,
      vertices: [
        -0.5, 0.5, -0.5,
        -0.5, 0.5, 0.5,
        0.5, 0.5, 0.5,
        0.5, 0.5, -0.5,
        -0.5, 0.5, 0.5,
        -0.5, -0.5, 0.5,
        -0.5, -0.5, -0.5,
        -0.5, 0.5, -0.5,
        0.5, 0.5, 0.5,
        0.5, -0.5, 0.5,
        0.5, -0.5, -0.5,
        0.5, 0.5, -0.5,
        0.5, 0.5, 0.5,
        0.5, -0.5, 0.5,
        -0.5, -0.5, 0.5,
        -0.5, 0.5, 0.5,
        0.5, 0.5, -0.5,
        0.5, -0.5, -0.5,
        -0.5, -0.5, -0.5,
        -0.5, 0.5, -0.5,
        -0.5, -0.5, -0.5,
        -0.5, -0.5, 0.5,
        0.5, -0.5, 0.5,
        0.5, -0.5, -0.5,
      ],
      indices: [
        // Top
        0, 1, 2,
        0, 2, 3,
        // Left
        5, 4, 6,
        6, 4, 7,
        // Right
        8, 9, 10,
        8, 10, 11,
        // Front
        13, 12, 14,
        15, 14, 12,
        // Back
        16, 17, 18,
        16, 18, 19,
        // Bottom
        21, 20, 22,
        22, 20, 23
      ],
      uvs: [
        0, 0,
        0, 1,
        1, 1,
        1, 0,
        0, 0,
        1, 0,
        1, 1,
        0, 1,
        1, 1,
        0, 1,
        0, 0,
        1, 0,
        1, 1,
        1, 0,
        0, 0,
        0, 1,
        0, 0,
        0, 1,
        1, 1,
        1, 0,
        1, 1,
        1, 0,
        0, 0,
        0, 1,
      ],
      normals: [
        // Top
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        // Left
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        // Right
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        // Forward
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        // Back
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        // Bottom
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0
      ]
    };

    this.addComponent(new MeshRenderer(this));
  }

  init() {
    this.preload().then(() => { super.init(); });
  }

  preload() {
    this.isReady = false;
    const promises = [
      resourceManager.loadAndApplyTexture('/textures/cube/wood_crate.png', this)
    ];
    return Promise.all(promises);
  }

}

export default Hero;