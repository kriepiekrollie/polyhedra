import React, {useRef, useState, useEffect} from 'react';
import "./App.css"

function Canvas({rotationMatrix}) {
  const canvasRef = useRef(null);
  const glRef = useRef(0);
  const vbRef = useRef(0);
  const ibRef = useRef(0);
  const spRef = useRef(0);
  const rmRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;

    // Get the WebGL context from the canvas.
    var gl = canvas.getContext('experimental-webgl', { Alpha:true });

    // Define the vertices
    const vertices = [
      0.5, 0.5, 0.5,
      -0.5, 0.5, 0.5,
      0.5, -0.5, 0.5,
      0.5, 0.5, -0.5,
      0.5, -0.5, -0.5,
      -0.5, 0.5, -0.5,
      -0.5, -0.5, 0.5,
      -0.5, -0.5, -0.5,
    ];

    // Create a vertex buffer.
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    // Define the indices
    const indices = [
      0, 1,
      0, 2,
      0, 3,
      1, 5,
      1, 6,
      2, 4,
      2, 6,
      3, 4,
      3, 5,
      4, 7,
      5, 7,
      6, 7,
    ];

    // Create an index buffer.
    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    // Code for our vertex shader.
    const vs_code = 
      "attribute vec3 coordinates;" +
      "uniform mat4 Rmatrix;" +
      "void main(void) {" +
      "  gl_Position = Rmatrix * vec4(coordinates, 1.0);" +
      "  gl_PointSize = 10.0;" +
      "}";

    // Add and compile the vertex shader.
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vs_code);
    gl.compileShader(vertexShader);

    // Code for our fragment shader.
    const fs_code = 
      "void main(void) {" +
      "  gl_FragColor = vec4(0.0, 0.0, 0.0, 0.3);" + 
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
    var coord = gl.getAttribLocation(shaderProgram, "coordinates");
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);
    var mat = gl.getUniformLocation(shaderProgram, "Rmatrix");

    glRef.current = gl;
    vbRef.current = vertexBuffer;
    ibRef.current = indexBuffer;
    spRef.current = shaderProgram;
    rmRef.current = mat;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    var gl = glRef.current;
    const vertexBuffer = vbRef.current;
    const indexBuffer = ibRef.current;
    var shaderProgram = spRef.current;
    const mat = rmRef.current;

    gl.uniformMatrix4fv(mat, false, rotationMatrix);

    gl.clearColor(1.0, 1.0, 1.0, 0.0);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.viewport(0, 0, canvas.width, canvas.height);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.drawArrays(gl.POINTS, 0, 8);

    gl.lineWidth(5);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.drawElements(gl.LINES, 24, gl.UNSIGNED_SHORT, 0);

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
        temp[4 * i + j] += X[4 * i + k] * Y[4 * k + j];
      }
    }
  }
  return temp;
}

function Container() {
  const [clicked, setClicked] = useState(false);
  const [prev, setPrev] = useState({ x: 0, y: 0 });
  const [rm, setRM] = useState([
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0,
  ]);

  const handleMouseDown = (event) => {
    setClicked(true);
    setPrev({ x: event.clientX, y: event.clientY });
  }

  const handleMouseUp = (event) => {
    setClicked(false);
  }

  const handleMouseMove = (event) => {
    if (clicked) {
      const dx = event.clientX - prev.x;
      const dy = event.clientY - prev.y;
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
      setPrev({ x: event.clientX, y: event.clientY });
    }
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return (() => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    });
  });
  
  return (
    <div className="container" onMouseDownCapture={handleMouseDown}>
      <Canvas rotationMatrix={rm} />
    </div>
  );
}

export default Container;
