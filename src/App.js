import React, {useRef, useState, useEffect} from 'react';
import "./App.css"

function Canvas({rotationMatrix, width, height}) {
  const canvasRef = useRef(null);

  const glRef = useRef(0);
  const vbRef = useRef(0);
  const ibRef = useRef(0);
  const rmRef = useRef(0);

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

  useEffect(() => {
    const canvas = canvasRef.current;

    // Get the WebGL context from the canvas.
    var gl = canvas.getContext('experimental-webgl', { Alpha:true });

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
      "  float x = 0.5 * (1.0 + dot(rotation_matrix * vec4(normal, 0.0), normalize(vec4(-1.0, 1.0, -3.0, 0.0))));" +
      "  vColor = vec4(0.2 + 0.8 * x, 0.0, 0.0, 1.0);" +
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
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    var gl = glRef.current;
    const vertexBuffer = vbRef.current;
    const indexBuffer = ibRef.current;
    const mat = rmRef.current;

    gl.uniformMatrix4fv(mat, false, rotationMatrix);

    gl.clearColor(1.0, 1.0, 1.0, 0.0);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.viewport(0, 0, canvas.width, canvas.height);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

    glRef.current = gl;
  });

  return <canvas ref={canvasRef} width="900" height="900"></canvas>;
};

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

function Container() {
  const [clicked, setClicked] = useState(false);
  const [prev, setPrev] = useState({ x: 0, y: 0 });
  const [dx, setDX] = useState(0);
  const [dy, setDY] = useState(0);
  const [rm, setRM] = useState([
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0,
  ]);

  const handleMouseDown = (event) => {
    setClicked(true);
    setPrev({ x: event.clientX, y: event.clientY });
  };

  const handleMouseUp = (event) => {
    setClicked(false);
  };

  const handleMouseMove = (event) => {
    if (clicked) {
      setDX(event.clientX - prev.x);
      setDY(event.clientY - prev.y);
      setPrev({ x: event.clientX, y: event.clientY });
      updateRotation();
    }
  };

  const updateRotation = () => {
    const ty = dx / 100;
    const tx = dy / 100;
    const mx = [
      1.0, 0.0, 0.0, 0.0,
      0.0, Math.cos(tx), -Math.sin(tx), 0.0,
      0.0, Math.sin(tx), Math.cos(tx), 0.0,
      0.0, 0.0, 0.0, 1.0,
    ];
    const my = [
      Math.cos(ty), 0.0, Math.sin(ty), 0.0,
      0.0, 1.0, 0.0, 0.0,
      -Math.sin(ty), 0.0, Math.cos(ty), 0.0,
      0.0, 0.0, 0.0, 1.0,
    ];
    setRM(matmul(my, matmul(mx, rm)));
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    const interval = setInterval(() => {
      if (!clicked && Math.abs(dx) > 0.1 && Math.abs(dy) > 0.1) {
        setDX(dx * 0.95);
        setDY(dy * 0.95);
        updateRotation();
      }
    }, 16);

    return (() => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      clearInterval(interval);
    });

  });
  
  return (
    <div className="container" onMouseDownCapture={handleMouseDown}>
      <Canvas rotationMatrix={rm} />
    </div>
  );
}

export default Container;
