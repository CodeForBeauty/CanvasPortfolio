

let viewPos = {
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

let testObj = {
  lines: [
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
  ],
  style: "green",
  position: { x: -2, y: -2, z: 5 },
  rotation: { x: 0, y: 0, z: 0 },
  scale: { x: 1, y: 1, z: 1 },
}

let selObj = null

// Can only multiply same size, square matrices
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

function draw() {
  const width = window.innerWidth
  const height = window.innerHeight

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
    ctx.strokeStyle = "red"
    ctx.strokeRect(objStart.x, objStart.y, objEnd.x - objStart.x, objEnd.y - objStart.y)

    return {
      isOver: (mousePos.x < objEnd.x && mousePos.x > objStart.x
            && mousePos.y < objEnd.y && mousePos.y > objStart.y),
      z: objStart.z,
    }
  }

  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, width, height)

  const drawRes = drawObject(testObj)

  if (drawRes.isOver) {
    selObj = testObj
  }
  else {
    selObj = null
  }
}

function update(delta) {
  time += delta
  // testObj.rotation.x += delta * 90
  // testObj.rotation.x %= 360

  if (selObj === testObj) {
    testObj.rotation.y += delta * 90
    testObj.rotation.y %= 360
  }
  
  testObj.position.y = Math.sin(time)

  // viewRot.y += delta * 45
  // viewRot.y %= 360

  draw()
}

const deltaTime = 0.05
setInterval(() => update(deltaTime), deltaTime * 1000)

mainCanvas.addEventListener("mousemove", (event) => {
  mousePos.x = event.clientX - mainCanvas.offsetLeft
  mousePos.y = event.clientY - mainCanvas.offsetTop
})
