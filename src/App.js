import React, {useRef, useState, useEffect} from 'react';
import "./App.css"

function cross(p, q) {
  return { 
    x : p.y * q.z - p.z * q.y,
    y : p.x * q.z - p.z * q.x,
    z : p.x * q.y - p.y * q.x,
  };
}

function normalize(p) {
  var d = Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z);
  return { x : p.x / d, y : p.y / d, z : p.z / d };
}

function norm(A, B, C) {
  var p = { x : B.x - A.x, y : B.y - A.y, z : B.z - A.z };
  var q = { x : C.x - A.x, y : C.y - A.y, z : C.z - A.z };
  return normalize(cross(p, q));
}

function matmul(X, Y) {
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

function Shape({width, height, Vertices, Faces}) {
  const canvasRef = useRef(null);

  const glRef = useRef(0);
  const vbRef = useRef(0);
  const ibRef = useRef(0);
  const rmRef = useRef(0);
  const niRef = useRef(0);

  const [clicked, setClicked] = useState(false);

  const [t, setT] = useState(Date.now());
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const [dt, setDT] = useState(0);
  const [dx, setDX] = useState(0);
  const [dy, setDY] = useState(0);

  const [rotationMatrix, setRotationMatrix] = useState([
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0,
  ]);

  /*
  // Define the vertices
  const vertices = [
    -0.5,-0.5,-0.5, +0.5,-0.5,-0.5, +0.5,+0.5,-0.5, -0.5,+0.5,-0.5,
    -0.5,-0.5,+0.5, +0.5,-0.5,+0.5, +0.5,+0.5,+0.5, -0.5,+0.5,+0.5,
    -0.5,-0.5,-0.5, -0.5,+0.5,-0.5, -0.5,+0.5,+0.5, -0.5,-0.5,+0.5,
    +0.5,-0.5,-0.5, +0.5,+0.5,-0.5, +0.5,+0.5,+0.5, +0.5,-0.5,+0.5,
    -0.5,-0.5,-0.5, -0.5,-0.5,+0.5, +0.5,-0.5,+0.5, +0.5,-0.5,-0.5,
    -0.5,+0.5,-0.5, -0.5,+0.5,+0.5, +0.5,+0.5,+0.5, +0.5,+0.5,-0.5, 
  ];

  const normals = [
     0, 0,-1,  0, 0,-1,  0, 0,-1,  0, 0,-1,
     0, 0,+1,  0, 0,+1,  0, 0,+1,  0, 0,+1,
    -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
    +1, 0, 0, +1, 0, 0, +1, 0, 0, +1, 0, 0,
     0,-1, 0,  0,-1, 0,  0,-1, 0,  0,-1, 0,
     0,+1, 0,  0,+1, 0,  0,+1, 0,  0,+1, 0,
  ];

  // Define the indices
  const indices = [
    0,1,2, 0,2,3, 4,5,6, 4,6,7,
    8,9,10, 8,10,11, 12,13,14, 12,14,15,
    16,17,18, 16,18,19, 20,21,22, 20,22,23 
  ];
  */

  useEffect(() => {
    const canvas = canvasRef.current;

    // Get the WebGL context from the canvas.
    var gl = canvas.getContext('experimental-webgl', { Alpha:true });

    var vertices = [
    ];
    var normals = [
    ];
    var indices = [
    ];

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
        const normal = norm(Vertices[Faces[i][0]], Vertices[Faces[i][j]], Vertices[Faces[i][j+1]]);
        for (let k = 0; k < 3; k++) {
          normals.push(normal.x);
          normals.push(normal.y);
          normals.push(normal.z);
        }
      }
    }

    // Create a vertex buffer.
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Create a normal buffer.
    var normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);

    // Create an index buffer.
    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    // Code for our vertex shader.
    const vs_code = 
      "attribute vec3 vertex_pos;" +
      "attribute vec3 normal;" +
      "uniform mat4 rotation_matrix;" +
      "varying vec4 vColor;" +
      "void main(void) {" +
      "  gl_Position = rotation_matrix * vec4(vertex_pos, 1.0);" +
      "  vec4 light_dir = rotation_matrix * vec4(1.0, 0.0, 0.0, 1.0);" +
      "  float x = 0.5 * (1.0 + dot(rotation_matrix * vec4(normal, 0.0), normalize(vec4(1.0, -1.0, 3.0, 0.0))));" +
      "  vColor = vec4(x, 0.2 * x, 0.4 * x, 1.0);" +
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

    // Associate vertex buffer object with "coordinates" attribute in shader program.
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    var var_vertex_pos = gl.getAttribLocation(shaderProgram, "vertex_pos");
    gl.vertexAttribPointer(var_vertex_pos, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(var_vertex_pos);

    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    var var_normal = gl.getAttribLocation(shaderProgram, "normal");
    gl.vertexAttribPointer(var_normal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(var_normal);

    var var_rotation_matrix = gl.getUniformLocation(shaderProgram, "rotation_matrix");

    glRef.current = gl;
    vbRef.current = vertexBuffer;
    ibRef.current = indexBuffer;
    rmRef.current = var_rotation_matrix;
    niRef.current = numIndices;
  }, []);

  const handleMouseDown = (event) => {
    setClicked(true);
    setX(event.clientX);
    setY(event.clientY);
    setT(Date.now());
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

  useEffect(() => {
    const canvas = canvasRef.current;
    var gl = glRef.current;
    const vertexBuffer = vbRef.current;
    const indexBuffer = ibRef.current;
    const numIndices = niRef.current;
    const mat = rmRef.current;

    gl.uniformMatrix4fv(mat, false, rotationMatrix);

    gl.clearColor(1.0, 1.0, 1.0, 0.0);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.viewport(0, 0, canvas.width, canvas.height);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.drawElements(gl.TRIANGLES, numIndices, gl.UNSIGNED_SHORT, 0);

    glRef.current = gl;

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    const interval = setInterval(() => {
      if (!clicked) {
        setDX(dx * 0.95);
        setDY(dy * 0.95);
        updateRotation();
      }
    }, FRAME_TIME);

    return (() => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      clearInterval(interval);
    });
  });

  return <canvas className="shape" ref={canvasRef} onMouseDownCapture={handleMouseDown} width={width} height={height}></canvas>;
};


function Cube({width, height}) {
  const vertices = [
    { x : 0.5, y : 0.5, z : 0.5},
    { x :-0.5, y : 0.5, z : 0.5},
    { x : 0.5, y :-0.5, z : 0.5},
    { x : 0.5, y : 0.5, z :-0.5},
    { x : 0.5, y :-0.5, z :-0.5},
    { x :-0.5, y : 0.5, z :-0.5},
    { x :-0.5, y :-0.5, z : 0.5},
    { x :-0.5, y :-0.5, z :-0.5},
  ];
  const faces = [
    [0, 2, 6, 1],
    [3, 5, 7, 4],
    [0, 3, 4, 2],
    [1, 6, 7, 5],
    [0, 3, 5, 1],
    [2, 6, 7, 4],
  ];
  return (
      <Shape width={width} height={height} Vertices={vertices} Faces={faces} />
  );
}

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const handleResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return (() => {
      window.removeEventListener('resize', handleResize);
    });
  });
  return (
    <div className="container">
      <Cube width={Math.min(width, height)} height={Math.min(width, height)} />
    </div>
  );
}

export default App;
