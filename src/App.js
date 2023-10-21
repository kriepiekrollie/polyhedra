import React, {useRef, useState, useEffect} from 'react';
import "./App.css"

function cross(p, q) {
  return { 
    x : p.y * q.z - p.z * q.y,
    y : p.z * q.x - p.x * q.z,
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

  const [dt, setDT] = useState(1);
  const [dx, setDX] = useState(0);
  const [dy, setDY] = useState(0);

  const [rotationMatrix, setRotationMatrix] = useState([
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0,
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;

    // Get the WebGL context from the canvas.
    var gl = canvas.getContext('webgl', { Alpha:true, antialias:true });

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
    // I literally have no idea how to write these shaders properly.
    const vs_code = 
      "attribute vec3 vertex_pos;" +
      "attribute vec3 normal;" +
      "uniform mat4 rotation_matrix;" +
      "varying vec4 vColor;" +
      "void main(void) {" +
      "  gl_Position = rotation_matrix * vec4(vertex_pos, 1.0);" +
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

    gl.clearColor(0.0, 0.0, 0.0, 0.0);
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
  const r = 1 / Math.sqrt(3);
  const vertices = [
    { x : r, y : r, z : r },
    { x :-r, y : r, z : r },
    { x : r, y :-r, z : r },
    { x : r, y : r, z :-r },
    { x : r, y :-r, z :-r },
    { x :-r, y : r, z :-r },
    { x :-r, y :-r, z : r },
    { x :-r, y :-r, z :-r },
  ];
  const faces = [
    [0, 2, 6, 1],
    [3, 5, 7, 4],
    [0, 3, 4, 2],
    [1, 6, 7, 5],
    [0, 1, 5, 3],
    [2, 4, 7, 6],
  ];
  return (
      <Shape width={width} height={height} Vertices={vertices} Faces={faces} />
  );
}

function Tetrahedron({width, height}) {
  const r = 1 / Math.sqrt(3);
  const vertices = [
    { x : r, y : r, z : r },
    { x : r, y :-r, z :-r },
    { x :-r, y : r, z :-r },
    { x :-r, y :-r, z : r },
  ];
  const faces = [
    [0, 2, 1],
    [0, 1, 3],
    [0, 3, 2],
    [1, 2, 3],
  ];
  return (
    <Shape width={width} height={height} Vertices={vertices} Faces={faces} />
  );
}

function Octahedron({width, height}) {
  const vertices = [
    { x : 1, y : 0, z : 0 },
    { x :-1, y : 0, z : 0 },
    { x : 0, y : 1, z : 0 },
    { x : 0, y :-1, z : 0 },
    { x : 0, y : 0, z : 1 },
    { x : 0, y : 0, z :-1 },
  ]; 
  const faces = [
    [0, 5, 3],
    [0, 3, 4],
    [0, 4, 2],
    [0, 2, 5],
    [1, 3, 5],
    [1, 4, 3],
    [1, 2, 4],
    [1, 5, 2],
  ];
  return (
    <Shape width={width} height={height} Vertices={vertices} Faces={faces} />
  );
}

function Dodecahedron({width, height}) {
  const phi = (1 + Math.sqrt(5)) / 2;
  const r = 1 / Math.sqrt(3);
  const p = phi * r
  const q = r / phi;
  const vertices = [
    { x : r, y : r, z : r },
    { x :-r, y : r, z : r },
    { x : r, y :-r, z : r },
    { x : r, y : r, z :-r },
    { x : r, y :-r, z :-r },
    { x :-r, y : r, z :-r },
    { x :-r, y :-r, z : r },
    { x :-r, y :-r, z :-r },

    { x : 0, y : p, z : q },
    { x : 0, y :-p, z : q },
    { x : 0, y : p, z :-q },
    { x : 0, y :-p, z :-q },

    { x : q, y : 0, z : p },
    { x : q, y : 0, z :-p },
    { x :-q, y : 0, z : p },
    { x :-q, y : 0, z :-p },

    { x : p, y : q, z : 0 },
    { x :-p, y : q, z : 0 },
    { x : p, y :-q, z : 0 },
    { x :-p, y :-q, z : 0 },
  ];
  const faces = [
    [0, 16, 18, 2, 12],
    [2, 18, 4, 11, 9],
    [2, 9, 6, 14, 12],
    [6, 9, 11, 7, 19],
    [7, 11, 4, 13, 15],
    [3, 13, 4, 18, 16],
    [3, 10, 5, 15, 13],
    [1, 17, 5, 10, 8],
    [5, 17, 19, 7, 15],
    [1, 8, 0, 12, 14],
    [1, 14, 6, 19, 17],
    [0, 8, 10, 3, 16],
  ];
  return (
    <Shape width={width} height={height} Vertices={vertices} Faces={faces} />
  );
}

function Icosahedron({width, height}) {
  const phi = (1 + Math.sqrt(5)) / 2;
  const r = Math.sqrt(phi * phi + 1);
  const p = phi / r;
  const q = 1 / r;
  const vertices = [
    { x : 0, y : p, z : q },
    { x : 0, y :-p, z : q },
    { x : 0, y : p, z :-q },
    { x : 0, y :-p, z :-q },

    { x : q, y : 0, z : p },
    { x : q, y : 0, z :-p },
    { x :-q, y : 0, z : p },
    { x :-q, y : 0, z :-p },
    
    { x : p, y : q, z : 0 },
    { x :-p, y : q, z : 0 },
    { x : p, y :-q, z : 0 },
    { x :-p, y :-q, z : 0 },
  ];
  const faces = [
    [0, 2, 8],
    [0, 8, 4],
    [0, 4, 6],
    [0, 6, 9],
    [0, 9, 2],

    [2, 5, 8],
    [10, 8, 5],
    [8, 10, 4],
    [10, 1, 4],
    [4, 1, 6],
    [1, 11, 6],
    [6, 11, 9],
    [11, 7, 9],
    [9, 7, 2],
    [2, 7, 5],

    [3, 1, 10],
    [3, 10, 5],
    [3, 5, 7],
    [3, 7, 11],
    [3, 11, 1],
  ];
  return (
    <Shape width={width} height={height} Vertices={vertices} Faces={faces} />
  );
}

function ShapeFactory({shp, width, height}) {
  switch (shp) {
    case 0:
      return <Cube width={width} height={height} />
    case 1:
      return <Tetrahedron width={width} height={height} />
    case 2:
      return <Octahedron width={width} height={height} />
    case 3:
      return <Dodecahedron width={width} height={height} />
    default:
      return <Icosahedron width={width} height={height} />
  }
}

/*
function App() {
  const [size, setSize] = useState(Math.min(window.innerWidth, window.innerHeight));
  const [currentShape, setCurrentShape] = useState(0);

  const handleResize = () => {
    setSize(Math.min(window.innerWidth, window.innerHeight));
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return (() => {
      window.removeEventListener('resize', handleResize);
    });
  });

  return (
    <div className="container">
      <button onClick={() => {setCurrentShape((currentShape + 1) % 5);}}> Next </button>
      <ShapeFactory shp={currentShape} width={size} height={size} />
    </div>
  );
}
*/
function App() {
  return (
    <div className="container">
      <ShapeFactory shp={0} width={500} height={500} />
      <ShapeFactory shp={1} width={500} height={500} />
      <ShapeFactory shp={2} width={500} height={500} />
      <ShapeFactory shp={3} width={500} height={500} />
      <ShapeFactory shp={4} width={500} height={500} />
    </div>
  );
}

export default App;
