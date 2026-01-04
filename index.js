

let viewPos = {
  x: 0,
  y: 0,
  z: 0,
}

let targetTime = 0
let targetPos = {
  x: 0,
  y: 0,
  z: 0,
}

let viewRot = {
  x: 0,
  y: 0,
  z: 0,
}

let mousePos = {
  x: 0,
  y: 0,
}

let time = 0

const cubeLines = [
  // BOTTOM
  {
    start: { x: -0.5, y: -0.5, z: -0.5 },
    end:   { x:  0.5, y: -0.5, z: -0.5 },
  },
  {
    start: { x:  0.5, y: -0.5, z: -0.5 },
    end:   { x:  0.5, y: -0.5, z:  0.5 },
  },
  {
    start: { x:  0.5, y: -0.5, z:  0.5 },
    end:   { x: -0.5, y: -0.5, z:  0.5 },
  },
  {
    start: { x: -0.5, y: -0.5, z:  0.5 },
    end:   { x: -0.5, y: -0.5, z: -0.5 },
  },

  // TOP
  {
    start: { x: -0.5, y:  0.5, z: -0.5 },
    end:   { x:  0.5, y:  0.5, z: -0.5 },
  },
  {
    start: { x:  0.5, y:  0.5, z: -0.5 },
    end:   { x:  0.5, y:  0.5, z:  0.5 },
  },
  {
    start: { x:  0.5, y:  0.5, z:  0.5 },
    end:   { x: -0.5, y:  0.5, z:  0.5 },
  },
  {
    start: { x: -0.5, y:  0.5, z:  0.5 },
    end:   { x: -0.5, y:  0.5, z: -0.5 },
  },

  // SIDES
  {
    start: { x: -0.5, y: -0.5, z: -0.5 },
    end:   { x: -0.5, y:  0.5, z: -0.5 },
  },
  {
    start: { x:  0.5, y: -0.5, z: -0.5 },
    end:   { x:  0.5, y:  0.5, z: -0.5 },
  },
  {
    start: { x:  0.5, y: -0.5, z:  0.5 },
    end:   { x:  0.5, y:  0.5, z:  0.5 },
  },
  {
    start: { x: -0.5, y: -0.5, z:  0.5 },
    end:   { x: -0.5, y:  0.5, z:  0.5 },
  },
]

const heartLines = [
  // Left top
  {
    start: { x: -0.4, y:  0.9, z:  0.0 },
    end:   { x: -0.8, y:  0.6, z:  0.0 },
  },
  {
    start: { x: -0.4, y:  0.9, z:  0.0 },
    end:   { x:  0.0, y:  0.7, z:  0.0 },
  },
  {
    start: { x: -0.4, y:  0.9, z:  0.0 },
    end:   { x: -0.4, y:  0.6, z:  0.3 },
  },
  {
    start: { x: -0.4, y:  0.9, z:  0.0 },
    end:   { x: -0.4, y:  0.6, z: -0.3 },
  },
  {
    start: { x: -0.4, y:  0.6, z:  0.3 },
    end:   { x: -0.8, y:  0.6, z:  0.0 },
  },
  {
    start: { x: -0.4, y:  0.6, z: -0.3 },
    end:   { x: -0.8, y:  0.6, z:  0.0 },
  },
  {
    start: { x: -0.4, y:  0.6, z:  0.3 },
    end:   { x:  0.0, y:  0.7, z:  0.0 },
  },
  {
    start: { x: -0.4, y:  0.6, z: -0.3 },
    end:   { x:  0.0, y:  0.7, z:  0.0 },
  },

  // Right top
  {
    start: { x:  0.4, y:  0.9, z:  0.0 },
    end:   { x:  0.8, y:  0.6, z:  0.0 },
  },
  {
    start: { x:  0.4, y:  0.9, z:  0.0 },
    end:   { x:  0.0, y:  0.7, z:  0.0 },
  },
  {
    start: { x:  0.4, y:  0.9, z:  0.0 },
    end:   { x:  0.4, y:  0.6, z:  0.3 },
  },
  {
    start: { x:  0.4, y:  0.9, z:  0.0 },
    end:   { x:  0.4, y:  0.6, z: -0.3 },
  },
  {
    start: { x:  0.4, y:  0.6, z:  0.3 },
    end:   { x:  0.8, y:  0.6, z:  0.0 },
  },
  {
    start: { x:  0.4, y:  0.6, z: -0.3 },
    end:   { x:  0.8, y:  0.6, z:  0.0 },
  },
  {
    start: { x:  0.4, y:  0.6, z:  0.3 },
    end:   { x:  0.0, y:  0.7, z:  0.0 },
  },
  {
    start: { x:  0.4, y:  0.6, z: -0.3 },
    end:   { x:  0.0, y:  0.7, z:  0.0 },
  },

  // Left bottom
  {
    start: { x: -0.8, y:  0.6, z:  0.0 },
    end:   { x:  0.0, y: -0.4, z:  0.0 },
  },
  {
    start: { x:  0.0, y:  0.7, z:  0.0 },
    end:   { x:  0.0, y: -0.4, z:  0.0 },
  },
  {
    start: { x: -0.4, y:  0.6, z:  0.3 },
    end:   { x:  0.0, y: -0.4, z:  0.0 },
  },
  {
    start: { x: -0.4, y:  0.6, z: -0.3 },
    end:   { x:  0.0, y: -0.4, z:  0.0 },
  },

  // Right bottom
  {
    start: { x:  0.8, y:  0.6, z:  0.0 },
    end:   { x:  0.0, y: -0.4, z:  0.0 },
  },
  {
    start: { x:  0.0, y:  0.7, z:  0.0 },
    end:   { x:  0.0, y: -0.4, z:  0.0 },
  },
  {
    start: { x:  0.4, y:  0.6, z:  0.3 },
    end:   { x:  0.0, y: -0.4, z:  0.0 },
  },
  {
    start: { x:  0.4, y:  0.6, z: -0.3 },
    end:   { x:  0.0, y: -0.4, z:  0.0 },
  },
]

const catLines = [
  // Left
  {
    start: { x:  0.0, y:  0.4, z:  0.0 },
    end:   { x:  0.5, y:  0.3, z:  0.0 },
  },
  {
    start: { x:  0.5, y:  0.3 , z:  0.0 },
    end:   { x:  0.7, y:  0.15, z:  0.0 },
  },
  {
    start: { x:  0.7, y:  0.15, z:  0.0 },
    end:   { x:  0.8, y:  0.0 , z:  0.0 },
  },
  {
    start: { x:  0.8, y:  0.0 , z:  0.0 },
    end:   { x:  0.7, y: -0.15, z:  0.0 },
  },
  {
    start: { x:  0.7, y: -0.15, z:  0.0 },
    end:   { x:  0.5, y: -0.3 , z:  0.0 },
  },
  {
    start: { x:  0.5, y: -0.3, z:  0.0 },
    end:   { x:  0.0, y: -0.4, z:  0.0 },
  },

  // Right
  {
    start: { x:  0.0, y:  0.4, z:  0.0 },
    end:   { x: -0.5, y:  0.3, z:  0.0 },
  },
  {
    start: { x: -0.5, y:  0.3 , z:  0.0 },
    end:   { x: -0.7, y:  0.15, z:  0.0 },
  },
  {
    start: { x: -0.7, y:  0.15, z:  0.0 },
    end:   { x: -0.8, y:  0.0 , z:  0.0 },
  },
  {
    start: { x: -0.8, y:  0.0 , z:  0.0 },
    end:   { x: -0.7, y: -0.15, z:  0.0 },
  },
  {
    start: { x: -0.7, y: -0.15, z:  0.0 },
    end:   { x: -0.5, y: -0.3 , z:  0.0 },
  },
  {
    start: { x: -0.5, y: -0.3, z:  0.0 },
    end:   { x:  0.0, y: -0.4, z:  0.0 },
  },

  // Face
  {
    start: { x: -0.2, y:  0.1, z:  0.0 },
    end:   { x: -0.4, y:  0.1, z:  0.0 },
  },
  {
    start: { x:  0.2, y:  0.1, z:  0.0 },
    end:   { x:  0.4, y:  0.1, z:  0.0 },
  },

  {
    start: { x:  0.05, y: -0.05, z:  0.0 },
    end:   { x:  0.3 , y:  0.0 , z:  0.0 },
  },
  {
    start: { x:  0.05, y: -0.1, z:  0.0 },
    end:   { x:  0.35, y: -0.1, z:  0.0 },
  },
  {
    start: { x:  0.05, y: -0.15 , z:  0.0 },
    end:   { x:  0.3 , y: -0.2 , z:  0.0 },
  },

  {
    start: { x: -0.05, y: -0.05, z:  0.0 },
    end:   { x: -0.3 , y:  0.0 , z:  0.0 },
  },
  {
    start: { x: -0.05, y: -0.1, z:  0.0 },
    end:   { x: -0.35, y: -0.1, z:  0.0 },
  },
  {
    start: { x: -0.05, y: -0.15 , z:  0.0 },
    end:   { x: -0.3 , y: -0.2 , z:  0.0 },
  },

  // Ears
  {
    start: { x:  0.0, y:  0.4, z:  0.0 },
    end:   { x:  0.3, y:  0.6, z:  0.0 },
  },
  {
    start: { x:  0.5, y:  0.3, z:  0.0 },
    end:   { x:  0.3, y:  0.6, z:  0.0 },
  },

  {
    start: { x:  0.0, y:  0.4, z:  0.0 },
    end:   { x: -0.3, y:  0.6, z:  0.0 },
  },
  {
    start: { x: -0.5, y:  0.3, z:  0.0 },
    end:   { x: -0.3, y:  0.6, z:  0.0 },
  },
]

const squareLines = [
  {
    start: { x: -0.5, y:  0.5, z:  0.0 },
    end:   { x:  0.5, y:  0.5, z:  0.0 },
  },
  {
    start: { x:  0.5, y:  0.5, z:  0.0 },
    end:   { x:  0.5, y: -0.5, z:  0.0 },
  },
  {
    start: { x:  0.5, y: -0.5, z:  0.0 },
    end:   { x: -0.5, y: -0.5, z:  0.0 },
  },
  {
    start: { x: -0.5, y: -0.5, z:  0.0 },
    end:   { x: -0.5, y:  0.5, z:  0.0 },
  },
]

let visObjs = [
  {
    lines: cubeLines,
    style: "green",
    position: { x: -5, y: -3, z: 4 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },

    onUpdate(delta) {
      this.scale.x = 1 + Math.sin(time * 4) * 0.05
      this.scale.y = this.scale.x
      this.scale.z = this.scale.x
    },

    onMouseOver(delta) {
      this.rotation.y += delta * 90
    }
  },
  {
    lines: cubeLines,
    style: "green",
    position: { x: 5, y: -1, z: 5 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },

    onUpdate(delta) {
      this.scale.x = 0.6 + Math.sin(time * 5) * 0.06
      this.scale.y = this.scale.x
      this.scale.z = this.scale.x
    },

    onMouseOver(delta) {
      this.rotation.y += delta * 90
    }
  },
  {
    lines: heartLines,
    style: "green",
    position: { x: -4, y: 2, z: 4 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },

    onUpdate(delta) {
      this.scale.x = 1 + Math.sin(time * 2) * 0.06
      this.scale.y = this.scale.x
      this.scale.z = this.scale.x
    },

    onMouseOver(delta) {
      this.rotation.y += delta * 90
    }
  },
  {
    lines: heartLines,
    style: "green",
    position: { x: 5, y: 2, z: 3 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },

    onUpdate(delta) {
      this.scale.x = 0.5 + Math.sin(time * 2) * 0.06
      this.scale.y = this.scale.x
      this.scale.z = this.scale.x
    },

    onMouseOver(delta) {
      this.rotation.y += delta * 90
    }
  },
  // Guy hand
  {
    lines: [
      {
        start: { x: -0.1, y:  0.0, z:  0.0 },
        end:   { x:  0.1, y:  0.0, z:  0.0 },
      },
      {
        start: { x:  0.1, y:  0.0, z:  0.0 },
        end:   { x:  0.0, y:  0.5, z:  0.0 },
      },
      {
        start: { x: -0.1, y:  0.0, z:  0.0 },
        end:   { x:  0.0, y:  0.5, z:  0.0 },
      },
    ],
    style: "green",
    position: { x: 0.83, y: -0.75, z: 1 },
    rotation: { x: 0, y: 0, z: -25 },
    scale: { x: 0.3, y: 0.3, z: 0.3 },

    onUpdate(delta) {
      
    },

    dir: 1,

    onMouseOver(delta) {
      if (this.rotation.z >= 10) {
        this.dir = -1
      }
      else if (this.rotation.z <= -35) {
        this.dir = 1
      }
      this.rotation.z += delta * this.dir * 360
    }
  },
  // GUY
  {
    lines: [
      {
        start: { x:  0.25, y:  0.8 , z:  0.0 },
        end:   { x:  0.0 , y:  0.95, z:  0.0 },
      },
      {
        start: { x: -0.25, y:  0.8 , z:  0.0 },
        end:   { x:  0.0 , y:  0.95, z:  0.0 },
      },
      {
        start: { x:  0.25, y:  0.8 , z:  0.0 },
        end:   { x:  0.0 , y:  0.65, z:  0.0 },
      },
      {
        start: { x: -0.25, y:  0.8 , z:  0.0 },
        end:   { x:  0.0 , y:  0.65, z:  0.0 },
      },

      {
        start: { x: -0.25, y:  0.65, z:  0.0 },
        end:   { x: -0.25, y: -0.5 , z:  0.0 },
      },
      {
        start: { x:  0.25, y:  0.65, z:  0.0 },
        end:   { x:  0.25, y: -0.5 , z:  0.0 },
      },
      {
        start: { x: -0.25, y:  0.65, z:  0.0 },
        end:   { x:  0.25, y: 0.65, z:  0.0 },
      },
      {
        start: { x: -0.25, y: -0.5, z:  0.0 },
        end:   { x:  0.25, y: -0.5, z:  0.0 },
      },
    ],
    style: "green",
    position: { x: 0.9, y: -0.9, z: 1 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 0.3, y: 0.3, z: 0.3 },

    onUpdate(delta) {
      
    },

    onMouseOver(delta) {
      visObjs[4].onMouseOver(delta)
    }
  },

  {
    lines: heartLines,
    style: "green",
    position: { x: 1, y: -1, z: 4 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 0.5, y: 0.5, z: 0.5 },

    onUpdate(delta) {
      this.rotation.y += delta * 45
    },

    time: 1,

    onMouseOver(delta) {
      this.time += delta
      this.scale.x = 0.6 + Math.sin(this.time * 2) * 0.06
      this.scale.y = this.scale.x
      this.scale.z = this.scale.x
    }
  },

  {
    lines: squareLines,
    style: "green",
    position: { x: 0, y: 0, z: 2 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 0.5, y: 0.2, z: 0.5 },

    onUpdate(delta) {
      this.scale.x = 0.5
    },

    onMouseOver(delta) {
      this.scale.x = 0.6
    },

    onMouseUp() {
      targetPos.x = 0
      targetPos.y = -8
      targetPos.z = 0

      targetTime = 0
    }
  },

  // Links
  // Github
  {
    lines: squareLines,
    style: "green",
    position: { x: -1, y: -1, z: 2 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 0.5, y: 0.2, z: 0.5 },

    onUpdate(delta) {
      this.scale.x = 0.5
    },

    onMouseOver(delta) {
      this.scale.x = 0.6
    },

    onMouseUp() {
      window.open("https://github.com/CodeForBeauty", '_blank').focus();
    }
  },
  // Email
  {
    lines: squareLines,
    style: "green",
    position: { x: 1, y: -1, z: 2 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 0.5, y: 0.2, z: 0.5 },

    onUpdate(delta) {
      this.scale.x = 0.5
    },

    onMouseOver(delta) {
      this.scale.x = 0.6
    },

    onMouseUp() {
      window.open("mailto:nursultanmamatov@proton.me", '_blank').focus();
    }
  },
  // Links ^

  {
    lines: heartLines,
    style: "green",
    position: { x: 5, y: -10, z: 4 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 0.5, y: 0.5, z: 0.5 },

    onUpdate(delta) {
      this.rotation.y += delta * 90
    },

    time: 1,

    onMouseOver(delta) {
      this.rotation.y += delta * 90
    }
  },
  {
    lines: heartLines,
    style: "green",
    position: { x: -5, y: -10, z: 5 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 0.3, y: 0.3, z: 0.3 },

    onUpdate(delta) {
      this.rotation.y += delta * 90
    },

    time: 1,

    onMouseOver(delta) {
      
    }
  },

  {
    lines: squareLines,
    style: "green",
    position: { x: 0, y: -7, z: 2 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 0.5, y: 0.2, z: 0.5 },

    onUpdate(delta) {
      this.scale.x = 0.5
    },

    onMouseOver(delta) {
      this.scale.x = 0.6
    },

    onMouseUp() {
      targetPos.x = 0
      targetPos.y = 0
      targetPos.z = 0

      targetTime = 0
    }
  },


  {
    lines: catLines,
    style: "green",
    position: { x: 3, y: -5, z: 4 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },

    onUpdate(delta) {
      this.rotation.z += delta * 90
    },

    onMouseOver(delta) {
      
    }
  },
  {
    lines: catLines,
    style: "green",
    position: { x: -5, y: -6, z: 5 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },

    onUpdate(delta) {
      this.rotation.y += delta * 45
      this.rotation.x += delta * 60
    },

    onMouseOver(delta) {
      
    }
  },
  {
    lines: heartLines,
    style: "green",
    position: { x: -2, y: -9.5, z: 2 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 0.5, y: 0.5, z: 0.5 },

    startPos: { x: -2, y: -9.5, z: 2 },

    onUpdate(delta) {
      this.position.y = this.startPos.y + Math.sin(time * 0.5) * 0.2
    },

    onMouseOver(delta) {
      this.rotation.z += delta * 45
    }
  },
]

let textObjs = [
  {
    text: "WELCOME",
    size: 56,
    position: { x: 0, y: 0.8 },
  },
  {
    text: "NURSULTAN MAMATOV",
    size: 32,
    position: { x: 0, y: 0.65 },
  },
  {
    text: "An ambitious Kyrgyzstan-based freelancer with",
    size: 24,
    position: { x: 0, y: 0.58 },
  },
  {
    text: "4 years of experience, specializing in game development.",
    size: 24,
    position: { x: 0, y: 0.5 },
  },

  {
    text: "Portfolio",
    size: 24,
    position: { x: 0, y: 0 },
  },

  {
    text: "Github",
    size: 24,
    position: { x: -0.5, y: -0.5 },
  },

  {
    text: "Email",
    size: 24,
    position: { x:  0.5, y: -0.5 },
  },

  {
    text: "Main",
    size: 24,
    position: { x: 0, y: -7.5 },
  },
]

let currProj = 0
let projBase = {
  lines: squareLines,
  style: "green",
  position: { x: -2, y: -8.2, z: 1.5 },
  rotation: { x: 0, y: 0, z: 0 },
  scale: { x: 1, y: 1, z: 1 },

  onUpdate(delta) {
    this.position.z = 1.5
  },

  onMouseOver(delta) {
    this.position.z = 1.55
  },

  onMouseUp() {
    if (portfolioProjs[currProj].link) {
      window.open(portfolioProjs[currProj].link, '_blank').focus();
    }
  }
}

let portfolioScroll = 0
let portfolioProjs = [
  {
    title: "Astronaut",
    desc: "3D game made from scratch with C++ and OpenGL",
    workedOn: "Rendering, Physics system",
    image: pAstronaut,
    link: "https://github.com/CodeForBeauty/AstronautGame",
  },
  {
    title: "Pirates",
    desc: "Multiplayer game made with Unity",
    workedOn: "Networking, Game Logic",
    image: pPirates,
  },
  {
    title: "Life timeline",
    desc: "Fullstack web app",
    workedOn: "React frontend, Nestjs backend",
    image: pTimeline,
    link: "https://github.com/CodeForBeauty/LifeTimeline",
  },
  {
    title: "Daily question",
    desc: "Fullstack web app",
    workedOn: "React frontend, Express backend",
    image: pQuestion,
    link: "https://github.com/CodeForBeauty/DailyQuestion",
  },
  {
    title: "Super Ping Pong",
    desc: "Super Ping Pong remake in Unity",
    workedOn: "Game logic, Graphics",
    image: pPingPong,
  },
  {
    title: "Indie Crate",
    desc: "Game catalogue",
    workedOn: "React frontend, Data scraping",
    image: pIndieCrate,
    link: "https://github.com/CodeForBeauty/IndieCrate",
  },
  {
    title: "Falling sand",
    desc: "Falling sand simulation",
    workedOn: "Rendering, Optimization",
    image: pFallingSand,
    link: "https://github.com/CodeForBeauty/FallingSand",
  },
  {
    title: "Conways game of life",
    desc: "Game of life simulation",
    workedOn: "Rendering, Optimization",
    image: pGameOfLife,
    link: "https://github.com/CodeForBeauty/GameOfLife",
  },
]

let selObj = null

// ----------------------------------------------

// Can only multiply square matrices of same size
function multMat(first, second) {
  let output = structuredClone(first)

  for (let i = 0; i < output.length; i++) {
    for (let j = 0; j < output.length; j++) {
      let sum = 0

      for (let k = 0; k < output.length; k++) {
        sum += first[i][k] * second[k][j]
      }

      output[i][j] = sum
    }
  }

  return output
}

const PI = 3.141592653589793
const PIrad = PI / 180
function getRotationMat(euler) {
  euler = structuredClone(euler)
  euler.x *= PIrad
  euler.y *= PIrad
  euler.z *= PIrad

  const thetaCos = { x: Math.cos(euler.x), y: Math.cos(euler.y), z: Math.cos(euler.z) }
  const thetaSin = { x: Math.sin(euler.x), y: Math.sin(euler.y), z: Math.sin(euler.z) }

  const x = [
    [ 1, 0, 0 ],
    [ 0, thetaCos.x, -thetaSin.x ],
    [ 0, thetaSin.x, thetaCos.x ],
  ]

  const y = [
    [ thetaCos.y, 0, thetaSin.y ],
    [ 0, 1, 0 ],
    [ -thetaSin.y, 0, thetaCos.y ],
  ]

  const z = [
    [ thetaCos.z, -thetaSin.z, 0 ],
    [ thetaSin.z, thetaCos.z, 0 ],
    [ 0, 0, 1 ],
  ]

  // YXZ axis order
  return multMat(multMat(y, x), z)
}

// Apply 3x3 matrix to 3d vector
function applyMatrix(matrix, vec) {
  return { 
    x: vec.x * matrix[0][0] + vec.y * matrix[1][0] + vec.z * matrix[2][0],
    y: vec.x * matrix[0][1] + vec.y * matrix[1][1] + vec.z * matrix[2][1],
    z: vec.x * matrix[0][2] + vec.y * matrix[1][2] + vec.z * matrix[2][2],
  }
}

function applyPos(vec, pos) {
  return {
    x: vec.x + pos.x,
    y: vec.y + pos.y,
    z: vec.z + pos.z,
  }
}

function applyTransform(vec, pos, rotMat, scale) {
  return applyPos(
    applyMatrix(rotMat, { 
      x: vec.x * scale.x, 
      y: vec.y * scale.y, 
      z: vec.z * scale.z 
    }),
    pos
  )
}

function clamp(number, min, max) {
  return Math.min( Math.max( number, min ), max )
}

// ----------------------------------------------

function draw() {
  const height = window.innerHeight
  const width = window.innerWidth

  mainCanvas.width = width
  mainCanvas.height = height

  const ctx = mainCanvas.getContext("2d")

  function project(pos) {
    if (pos.z <= 0) {
      return {
        x: ( pos.x * (height / width) + 1) / 2 * width,
        y: (-pos.y + 1) / 2 * height,
      }
    }
    return {
      x: ( pos.x * (height / width) / pos.z + 1) / 2 * width,
      y: (-pos.y / pos.z + 1) / 2 * height,
    }
  }

  function applyView(pos) {
    const tmp = {
      x: pos.x - viewPos.x,
      y: pos.y - viewPos.y,
      z: pos.z - viewPos.z,
    }

    return applyMatrix( getRotationMat({ x: -viewRot.x, y: -viewRot.y, z: -viewRot.z }), tmp )
  }

  function drawLine(start, end, style = "green") {
    const worldStart = applyView(start)
    const worldEnd = applyView(end)

    if ((worldStart.z <= 0 && worldEnd.z <= 0)) {
      return null
    }

    const startPos = project( worldStart )
    const endPos = project( worldEnd )

    ctx.strokeStyle = style

    ctx.moveTo(startPos.x, startPos.y)
    ctx.lineTo(endPos.x, endPos.y)

    ctx.stroke()

    return {
      start: {
        x: startPos.x,
        y: startPos.y,
        z: worldStart.z,
      },
      end: {
        x: endPos.x,
        y: endPos.y,
        z: worldEnd.z
      },
    }
  }

  function drawObject(obj) {
    const rotMatrix = getRotationMat(obj.rotation)
    let objStart = { x: width, y: height, z: 10000 }
    let objEnd = { x: 0, y: 0, z: 10000 }
    for (let i = 0; i < obj.lines.length; i++) {
      const line = drawLine(
        applyTransform(obj.lines[i].start, obj.position, rotMatrix, obj.scale),
        applyTransform(obj.lines[i].end, obj.position, rotMatrix, obj.scale),
        obj.style)

      if (line != null) {
        objStart.x = Math.min(objStart.x, line.start.x, line.end.x)
        objStart.y = Math.min(objStart.y, line.start.y, line.end.y)
        objStart.z = Math.min(objStart.z, line.start.z, line.end.z)

        objEnd.x = Math.max(objEnd.x, line.start.x, line.end.x)
        objEnd.y = Math.max(objEnd.y, line.start.y, line.end.y)
        objEnd.z = Math.max(objEnd.z, line.start.z, line.end.z)
      }
    }

    return {
      isOver: (mousePos.x < objEnd.x && mousePos.x > objStart.x
            && mousePos.y < objEnd.y && mousePos.y > objStart.y),
      z: objStart.z,
    }
  }

  function drawText(textObj, style = "green", maxWidth = width) {
    ctx.fillStyle = style
    ctx.font = `${textObj.size}px serif`
    ctx.textAlign = "center"

    ctx.fillText(textObj.text,
      ((textObj.position.x + viewPos.x) * (height / width) + 1) / 2 * width,
      (-textObj.position.y + viewPos.y + 1) / 2 * height,
      maxWidth
    )
  }

  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, width, height)

  let mouseOver = null
  let closest = 10000

  for (let i = 0; i < visObjs.length; i++) {
    const drawRes = drawObject(visObjs[i])

    if (drawRes.isOver && drawRes.z < closest) {
      closest = drawRes.z
      mouseOver = visObjs[i]
    }
  }

  if (mouseOver != null || selObj != projBase) {
    selObj = mouseOver
  }

  for (let i = 0; i < textObjs.length; i++) {
    drawText(textObjs[i])
  }


  // Drawing portfolio

  let tmpX = projBase.position.x
  let overCount = 0

  for (let i = 0; i < portfolioProjs.length; i++) {
    projBase.onUpdate(0)

    if (selObj == projBase && currProj == i) {
      projBase.onMouseOver(0)
    }

    projBase.position.x = tmpX + 1.5 * i + -portfolioScroll;
    const res = drawObject(projBase)
    drawText({
        text: portfolioProjs[i].title,
        size: 24,
        position: { x: projBase.position.x / 1.5, y: projBase.position.y - 0.1 },
      }, "green", 250)
    drawText({
        text: portfolioProjs[i].desc,
        size: 20,
        position: { x: projBase.position.x / 1.5, y: projBase.position.y - 0.17 },
      }, "green", 250)
    drawText({
        text: `Worked on: ${portfolioProjs[i].workedOn}`,
        size: 20,
        position: { x: projBase.position.x / 1.5, y: projBase.position.y - 0.25 },
      }, "green", 250)
    
    ctx.drawImage(portfolioProjs[i].image, 
      ((projBase.position.x + viewPos.x) * (height / width) / 1.5 - 0.15 + 1) / 2 * width,
      (-projBase.position.y + viewPos.y - 0.35 + 1) / 2 * height,
      280, 180
    )

    if (res.isOver) {
      selObj = projBase
      currProj = i
      overCount++
    }
  }
  if (overCount == 0 && selObj == projBase) {
    selObj = null
  }
  projBase.position.x = tmpX
}

function update(delta) {
  time += delta

  projBase.onUpdate(delta)

  for (let i = 0; i < visObjs.length; i++) {
    visObjs[i].onUpdate(delta)
  }

  if (selObj != null) {
    selObj.onMouseOver(delta)
  }

  viewPos.x = targetPos.x * targetTime + viewPos.x * (1 - targetTime)
  viewPos.y = targetPos.y * targetTime + viewPos.y * (1 - targetTime)
  viewPos.z = targetPos.z * targetTime + viewPos.z * (1 - targetTime)

  targetTime = Math.min(targetTime + delta / 5, 1)

  draw()
}

const deltaTime = 0.1
setInterval(() => update(deltaTime), deltaTime * 1000)

mainCanvas.addEventListener("mousemove", (event) => {
  mousePos.x = event.clientX - mainCanvas.offsetLeft
  mousePos.y = event.clientY - mainCanvas.offsetTop
})

mainCanvas.addEventListener("mouseup", (event) => {
  mousePos.x = event.clientX - mainCanvas.offsetLeft
  mousePos.y = event.clientY - mainCanvas.offsetTop

  if (selObj != null && selObj.onMouseUp) {
    selObj.onMouseUp()
  }
})

mainCanvas.addEventListener("wheel", (event) => {
  portfolioScroll = clamp(portfolioScroll + event.deltaY / 200, 0, portfolioProjs.length - 1)
})
