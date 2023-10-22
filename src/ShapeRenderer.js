import React, { useRef, useState, useEffect } from 'react';

function cross(p, q) {
  // Returns the cross product of the vectors p and q.
  return { 
    x : p.y * q.z - p.z * q.y,
    y : p.z * q.x - p.x * q.z,
    z : p.x * q.y - p.y * q.x,
  };
}

function dot(p, q) {
  // Returns the dot product of the vectors p and q.
  return p.x * q.x + p.y * q.y + p.z * q.z;
}

function abs2(p) {
  // Returns the square of the length of a vector p.
  return dot(p, p);
}

function abs(p) {
  // Returns the length of a vector p.
  return Math.sqrt(abs2(p));
}

function norm(p) {
  // Returns the norm of the vector p.
  var d = abs(p);
  return { x : p.x / d, y : p.y / d, z : p.z / d };
}

function normal(A, B, C) {
  // Returns the normalized normal vector perpendicular to the triangle (A-B-C).
  // Remember right-hand rule!
  var p = { x : B.x - A.x, y : B.y - A.y, z : B.z - A.z };
  var q = { x : C.x - A.x, y : C.y - A.y, z : C.z - A.z };
  return norm(cross(p, q));
}

function matmul(X, Y) {
  // this feels wrong but the way that feels right didn't work.
  var temp = [
    0.0, 0.0, 0.0, 0.0,
    0.0, 0.0, 0.0, 0.0,
    0.0, 0.0, 0.0, 0.0,
    0.0, 0.0, 0.0, 0.0,
  ];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      for (let k = 0; k < 4; k++) {
        temp[4 * i + j] += X[4 * k + j] * Y[4 * i + k];
      }
    }
  }
  return temp;
}

const FRAME_TIME = 10;

function ShapeRenderer({ width, height, Vertices, Faces }) {
  const canvasRef = useRef(null);

  const glRef = useRef(0);
  const vertexBufferRef = useRef(0);
  const indexBufferRef = useRef(0);
  const shaderProgramRef = useRef(0);
  const varRotationMatrixRef = useRef(0);
  const numIndicesRef = useRef(0);

  const [clicked, setClicked] = useState(false);

  const [t, setT] = useState(Date.now());
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const [dt, setDT] = useState(1);
  const [dx, setDX] = useState(0);
  const [dy, setDY] = useState(0);

  const [rotationMatrix, setRotationMatrix] = useState([
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0,
  ]);

  // We run this code the first time this element is drawn.
  useEffect(() => {
    const canvas = canvasRef.current;

    // Get the WebGL context from the canvas.
    var gl = canvas.getContext('webgl', { Alpha:true, antialias:true });

    // Code for our vertex shader.
    // I literally have no idea how to write these shaders properly.
    const vs_code = 
      "attribute vec3 vertex_pos;" +
      "attribute vec3 normal;" +
      "uniform mat4 rotation_matrix;" +
      "uniform mat4 projection_matrix;" +
      "varying vec4 vColor;" +
      "void main(void) {" +
      "  gl_Position = projection_matrix * rotation_matrix * vec4(vertex_pos, 1.0);" +
      "  vec4 light_dir = rotation_matrix * vec4(1.0, 0.0, 0.0, 1.0);" +
      "  float x = 0.5 * (1.0 + dot(rotation_matrix * vec4(normal, 0.0), normalize(vec4(1.0, -2.0, 3.0, 0.0))));" +
      "  float y = 0.5 * (1.0 + dot(rotation_matrix * vec4(normal, 0.0), normalize(vec4(2.0, 1.0, -1.0, 0.0))));" +
      "  vColor = vec4(x, y, 1.0 - x, 0.8);" +
      "  gl_PointSize = 10.0;" +
      "}";

    // Add and compile the vertex shader.
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vs_code);
    gl.compileShader(vertexShader);

    // Code for our fragment shader.
    const fs_code = 
      "precision mediump float;" +
      "varying vec4 vColor;" +
      "void main(void) {" +
      "  gl_FragColor = vColor;" + 
      "}";

    // Add and compile the fragment shader.
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fs_code);
    gl.compileShader(fragmentShader);

    // Create a shader program from the two shaders.
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    var var_rotation_matrix = gl.getUniformLocation(shaderProgram, "rotation_matrix");

    var var_projection_matrix = gl.getUniformLocation(shaderProgram, "projection_matrix");

    gl.uniformMatrix4fv(var_projection_matrix, false, new Float32Array([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0.2,
      0, 0, 0, 1.2,
    ]));

    glRef.current = gl;
    varRotationMatrixRef.current = var_rotation_matrix;
    shaderProgramRef.current = shaderProgram;
  }, []);

  // We run this code the first time this element is drawn, and every time the variables "Vertices" and "Faces" changes.
  useEffect(() => {
    var gl = glRef.current;
    var shaderProgram = shaderProgramRef.current;
    var vertexBuffer = vertexBufferRef.current;
    var indexBuffer = indexBufferRef.current;

    if (vertexBuffer !== 0 && gl.isBuffer(vertexBuffer)) {
      gl.deleteBuffer(vertexBuffer);
    }
    if (indexBuffer !== 0 && gl.isBuffer(indexBuffer)) {
      gl.deleteBuffer(indexBuffer);
    }

    var vertices = [];
    var normals = [];
    var indices = [];

    var numIndices = 0;
    for (let i = 0; i < Faces.length; i++) {
      for (let j = 1; j < Faces[i].length - 1; j++) {
        for (let k of [Faces[i][0], Faces[i][j], Faces[i][j+1]]) {
          indices.push(numIndices);
          numIndices++;
          vertices.push(Vertices[k].x);
          vertices.push(Vertices[k].y);
          vertices.push(Vertices[k].z);
        }
        const n = normal(Vertices[Faces[i][0]], Vertices[Faces[i][j]], Vertices[Faces[i][j+1]]);
        for (let k = 0; k < 3; k++) {
          normals.push(n.x);
          normals.push(n.y);
          normals.push(n.z);
        }
      }
    }

    // Create a vertex buffer.
    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Create a normal buffer.
    var normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);

    // Create an index buffer.
    indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    // Associate vertex buffer object with "coordinates" attribute in shader program.
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    var var_vertex_pos = gl.getAttribLocation(shaderProgram, "vertex_pos");
    gl.vertexAttribPointer(var_vertex_pos, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(var_vertex_pos);

    // Associate normals buffer object with "normal" attribute in shader program."
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    var var_normal = gl.getAttribLocation(shaderProgram, "normal");
    gl.vertexAttribPointer(var_normal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(var_normal);

    glRef.current = gl;
    vertexBufferRef.current = vertexBuffer;
    indexBufferRef.current = indexBuffer;
    numIndicesRef.current = numIndices;
    shaderProgramRef.current = shaderProgram;
  }, [Vertices, Faces]);

  const handleTouchStart = (event) => {
    if (event.target == canvasRef.current && event.targetTouches.length > 0) {
      event.preventDefault();
      setClicked(true);
      setX(event.targetTouches[0].clientX);
      setY(event.targetTouches[0].clientY);
      setT(event.timeStamp);
    }
  };

  const handleTouchMove = (event) => {
    if (clicked && event.target == canvasRef.current && event.targetTouches.length > 0) {
      event.preventDefault();
      setDX(event.targetTouches[0].clientX - x);
      setDY(event.targetTouches[0].clientY - y);
      setDT(Math.max(1, event.timeStamp - t));

      setX(event.targetTouches[0].clientX);
      setY(event.targetTouches[0].clientY);
      setT(event.timeStamp);

      updateRotation();
    }
  };

  const handleTouchEnd = (event) => {
    if (clicked && event.target == canvasRef.current) {
      event.preventDefault();
      setClicked(false);
      setDX(dx / dt * FRAME_TIME);
      setDY(dy / dt * FRAME_TIME);
      setDT(FRAME_TIME);
    }
  };

  const handleMouseDown = (event) => {
    if (event.target == canvasRef.current) {
      setClicked(true);
      setX(event.clientX);
      setY(event.clientY);
      setT(Date.now());
    }
  };

  const handleMouseUp = (event) => {
    setClicked(false);
    setDX(dx / dt * FRAME_TIME);
    setDY(dy / dt * FRAME_TIME);
    setDT(FRAME_TIME);
  };

  const handleMouseMove = (event) => {
    if (clicked) {
      const now = Date.now();

      setDX(event.clientX - x);
      setDY(event.clientY - y);
      setDT(now - t);

      setX(event.clientX);
      setY(event.clientY);
      setT(now);

      updateRotation();
    }
  };

  const updateRotation = () => {
    const ry = dx / 100;
    const rx = dy / 100;
    const mx = [
      1.0, 0.0, 0.0, 0.0,
      0.0, Math.cos(rx), -Math.sin(rx), 0.0,
      0.0, Math.sin(rx), Math.cos(rx), 0.0,
      0.0, 0.0, 0.0, 1.0,
    ];
    const my = [
      Math.cos(ry), 0.0, Math.sin(ry), 0.0,
      0.0, 1.0, 0.0, 0.0,
      -Math.sin(ry), 0.0, Math.cos(ry), 0.0,
      0.0, 0.0, 0.0, 1.0,
    ];
    setRotationMatrix(matmul(my, matmul(mx, rotationMatrix)));
  }

  // We run this code every time the element is redrawn.
  useEffect(() => {
    const canvas = canvasRef.current;
    var gl = glRef.current;
    const vertexBuffer = vertexBufferRef.current;
    const indexBuffer = indexBufferRef.current;
    const numIndices = numIndicesRef.current;
    const varRotationMatrix = varRotationMatrixRef.current;

    gl.uniformMatrix4fv(varRotationMatrix, false, rotationMatrix);

    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.viewport(0, 0, canvas.width, canvas.height);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.drawElements(gl.TRIANGLES, numIndices, gl.UNSIGNED_SHORT, 0);

    glRef.current = gl;

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchcancel', handleTouchEnd);

    const interval = setInterval(() => {
      if (!clicked) {
        setDX(dx * 0.95);
        setDY(dy * 0.95);
        updateRotation();
      }
    }, FRAME_TIME);

    return (() => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);

      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);

      clearInterval(interval);
    });
  });

  return (
    <div className="shapeContainer" style={{ width:width, height:height }}>
      <canvas className="shape" ref={canvasRef} width={width} height={height}></canvas>
    </div>
  );
}

export default ShapeRenderer;
