import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';

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

function ShapeRenderer({ shape, wireframeMode }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [size, setSize] = useState(0);

  const glRef = useRef(0);

  const vertexBufferRef = useRef(0);
  const edgeIndexBufferRef = useRef(0);
  const faceIndexBufferRef = useRef(0);

  const faceShaderProgramRef = useRef(0);
  const edgeShaderProgramRef = useRef(0);

  const numFaceIndicesRef = useRef(0);
  const numEdgeIndicesRef = useRef(0);
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
    const fvs_code = 
      "attribute vec3 vertex_pos;" +
      "attribute vec3 normal;" +
      "uniform mat4 rotation_matrix;" +
      "uniform mat4 projection_matrix;" +
      "varying vec4 vColor;" +
      "void main(void) {" +
      "  gl_Position = projection_matrix * rotation_matrix * vec4(vertex_pos, 1.0);" +
      "  float x = 0.5 * (1.0 + dot(rotation_matrix * vec4(normal, 0.0), normalize(vec4(1.0, -2.0, 3.0, 0.0))));" +
      "  float y = 0.5 * (1.0 + dot(rotation_matrix * vec4(normal, 0.0), normalize(vec4(2.0, 1.0, -1.0, 0.0))));" +
      "  vColor = vec4(x, y, 1.0 - x, 0.8);" +
      "}";

    const evs_code = 
      "attribute vec3 vertex_pos;" +
      "uniform mat4 rotation_matrix;" +
      "uniform mat4 projection_matrix;" +
      "varying vec4 vColor;" +
      "void main(void) {" +
      "  gl_Position = projection_matrix * rotation_matrix * vec4(vertex_pos, 1.0);" +
      "  float x = 0.4 * (1.0 + dot(gl_Position, vec4(0.0, 0.0, 1.0, 0.0)));" +
      "  vColor = vec4(x, x, x, 1.0);" +
      "}";

    // Add and compile the vertex shaders.
    var faceVertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(faceVertexShader, fvs_code);
    gl.compileShader(faceVertexShader);

    var edgeVertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(edgeVertexShader, evs_code);
    gl.compileShader(edgeVertexShader);

    // Code for our fragment shaders.
    const ffs_code = 
      "precision mediump float;" +
      "varying vec4 vColor;" +
      "void main(void) {" +
      "  gl_FragColor = vColor;" + 
      "}";

    const efs_code = 
      "precision mediump float;" +
      "varying vec4 vColor;" +
      "void main(void) {" +
      "  gl_FragColor = vColor;" + 
      "}";

    // Add and compile the fragment shaders.
    var faceFragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(faceFragmentShader, ffs_code);
    gl.compileShader(faceFragmentShader);

    var edgeFragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(edgeFragmentShader, efs_code);
    gl.compileShader(edgeFragmentShader);

    // Create a shader program from the two shaders.
    var faceShaderProgram = gl.createProgram();
    gl.attachShader(faceShaderProgram, faceVertexShader);
    gl.attachShader(faceShaderProgram, faceFragmentShader);
    gl.linkProgram(faceShaderProgram);
    gl.useProgram(faceShaderProgram);

    var var_projection_matrix = gl.getUniformLocation(faceShaderProgram, "projection_matrix");
    gl.uniformMatrix4fv(var_projection_matrix, false, new Float32Array([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0.2,
      0, 0, 0, 1.2,
    ]));

    var edgeShaderProgram = gl.createProgram();
    gl.attachShader(edgeShaderProgram, edgeVertexShader);
    gl.attachShader(edgeShaderProgram, edgeFragmentShader);
    gl.linkProgram(edgeShaderProgram);
    gl.useProgram(edgeShaderProgram);

    var_projection_matrix = gl.getUniformLocation(edgeShaderProgram, "projection_matrix");
    gl.uniformMatrix4fv(var_projection_matrix, false, new Float32Array([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0.2,
      0, 0, 0, 1.2,
    ]));

    glRef.current = gl;
    faceShaderProgramRef.current = faceShaderProgram;
    edgeShaderProgramRef.current = edgeShaderProgram;
  }, []);

  // We run this code the first time this element is drawn, and every time the variables "Vertices" and "Faces" changes.
  useEffect(() => {
    var gl = glRef.current;
    var faceShaderProgram = faceShaderProgramRef.current;
    var edgeShaderProgram = edgeShaderProgramRef.current;
    var vertexBuffer = vertexBufferRef.current;
    var edgeIndexBuffer = edgeIndexBufferRef.current;
    var faceIndexBuffer = faceIndexBufferRef.current;

    if (vertexBuffer !== 0 && gl.isBuffer(vertexBuffer)) {
      gl.deleteBuffer(vertexBuffer);
    }
    if (edgeIndexBuffer !== 0 && gl.isBuffer(edgeIndexBuffer)) {
      gl.deleteBuffer(edgeIndexBuffer);
    }
    if (faceIndexBuffer !== 0 && gl.isBuffer(faceIndexBuffer)) {
      gl.deleteBuffer(faceIndexBuffer);
    }

    var vertices = [];
    var normals = [];
    var faceIndices = [];
    var edgeIndices = [];
    var numEdgeIndices = 0;

    var indexOf = new Array(shape.Vertices.length);

    var numFaceIndices = 0;
    for (let face of shape.Faces) {
      for (let j = 1; j < face.length - 1; j++) {
        for (let k of [face[0], face[j], face[j+1]]) {
          faceIndices.push(numFaceIndices);
          indexOf[k] = numFaceIndices;
          numFaceIndices++;
          vertices.push(shape.Vertices[k].x);
          vertices.push(shape.Vertices[k].y);
          vertices.push(shape.Vertices[k].z);
        }
        const n = normal(shape.Vertices[face[0]], shape.Vertices[face[j]], shape.Vertices[face[j+1]]);
        for (let k = 0; k < 3; k++) {
          normals.push(n.x);
          normals.push(n.y);
          normals.push(n.z);
        }
      }
      for (let j = 0; j < face.length; j++) {
        const [a, b] = [face[j], face[(j+1)%face.length]];
        edgeIndices.push(indexOf[a]);
        edgeIndices.push(indexOf[b]);
        numEdgeIndices++;
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

    // Create a index buffers.
    faceIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, faceIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(faceIndices), gl.STATIC_DRAW);

    edgeIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, edgeIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(edgeIndices), gl.STATIC_DRAW);

    // Associate vertex buffer object with "coordinates" attribute in shader program.
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    gl.useProgram(faceShaderProgram);
    var var_vertex_pos = gl.getAttribLocation(faceShaderProgram, "vertex_pos");
    gl.vertexAttribPointer(var_vertex_pos, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(var_vertex_pos);

    gl.useProgram(edgeShaderProgram);
    var_vertex_pos = gl.getAttribLocation(edgeShaderProgram, "vertex_pos");
    gl.vertexAttribPointer(var_vertex_pos, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(var_vertex_pos);

    // Associate normals buffer object with "normal" attribute in shader program."
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.useProgram(faceShaderProgram);
    var var_normal = gl.getAttribLocation(faceShaderProgram, "normal");
    gl.vertexAttribPointer(var_normal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(var_normal);

    glRef.current = gl;
    vertexBufferRef.current = vertexBuffer;
    edgeIndexBufferRef.current = edgeIndexBuffer;
    faceIndexBufferRef.current = faceIndexBuffer;
    numFaceIndicesRef.current = numFaceIndices;
    numEdgeIndicesRef.current = numEdgeIndices;
    faceShaderProgramRef.current = faceShaderProgram;
    edgeShaderProgramRef.current = edgeShaderProgram;
  }, [shape]);

  const handleTouchStart = (event) => {
    if (event.target === canvasRef.current && event.targetTouches.length > 0) {
      event.preventDefault();
      setClicked(true);
      setX(event.targetTouches[0].clientX);
      setY(event.targetTouches[0].clientY);
      setT(event.timeStamp);
    }
  };

  const handleTouchMove = (event) => {
    if (clicked && event.target === canvasRef.current && event.targetTouches.length > 0) {
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
    if (clicked && event.target === canvasRef.current) {
      event.preventDefault();
      setClicked(false);
      setDX(dx / dt * FRAME_TIME);
      setDY(dy / dt * FRAME_TIME);
      setDT(FRAME_TIME);
    }
  };

  const handleMouseDown = (event) => {
    if (event.target === canvasRef.current) {
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
    const { width, height } = containerRef.current.getBoundingClientRect();
    const newsize = Math.min(width, height);
    if (size != newsize) {
      setSize(newsize);
    }

    const canvas = canvasRef.current;
    var gl = glRef.current;

    const vertexBuffer = vertexBufferRef.current;
    const edgeIndexBuffer = edgeIndexBufferRef.current;
    const faceIndexBuffer = faceIndexBufferRef.current;

    const numFaceIndices = numFaceIndicesRef.current;
    const numEdgeIndices = numEdgeIndicesRef.current;

    const faceShaderProgram = faceShaderProgramRef.current;
    const edgeShaderProgram = edgeShaderProgramRef.current;

    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.viewport(0, 0, size, size);

    if (wireframeMode) {
      gl.useProgram(edgeShaderProgram);

      var var_rotation_matrix = gl.getUniformLocation(edgeShaderProgram, "rotation_matrix");
      gl.uniformMatrix4fv(var_rotation_matrix, false, rotationMatrix);

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, edgeIndexBuffer);
      gl.drawElements(gl.LINES, numEdgeIndices * 2, gl.UNSIGNED_SHORT, 0);
    } else {
      gl.useProgram(faceShaderProgram);

      var var_rotation_matrix = gl.getUniformLocation(faceShaderProgram, "rotation_matrix");
      gl.uniformMatrix4fv(var_rotation_matrix, false, rotationMatrix);

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, faceIndexBuffer);
      gl.drawElements(gl.TRIANGLES, numFaceIndices, gl.UNSIGNED_SHORT, 0);
    }

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchcancel', handleTouchEnd);

    const interval = setInterval(() => {
      if (dx < 0.1 && dy < 0.1) {
        clearInterval(interval);
      }
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
    <div className="shapeRenderer" ref={containerRef}>
      <canvas className="shapeCanvas" ref={canvasRef} width={size} height={size}></canvas>
    </div>
  );
}

export default ShapeRenderer;
