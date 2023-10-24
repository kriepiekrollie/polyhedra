
export const shapeObject = (() => {
  const phi = (1 + Math.sqrt(5)) / 2;
  const p = phi;
  const q = 1 / phi;

  var vertices = [
    { x : 0, y : 1, z : p },
    { x : 0, y :-1, z : p },
    { x : 0, y : 1, z :-p },
    { x : 0, y :-1, z :-p },

    { x : p, y : 0, z : 1 },
    { x : p, y : 0, z :-1 },
    { x :-p, y : 0, z : 1 },
    { x :-p, y : 0, z :-1 },
    
    { x : 1, y : p, z : 0 },
    { x :-1, y : p, z : 0 },
    { x : 1, y :-p, z : 0 },
    { x :-1, y :-p, z : 0 },

    { x : 1, y : 1, z : 1 },
    { x :-1, y : 1, z : 1 },
    { x : 1, y :-1, z : 1 },
    { x : 1, y : 1, z :-1 },
    { x : 1, y :-1, z :-1 },
    { x :-1, y : 1, z :-1 },
    { x :-1, y :-1, z : 1 },
    { x :-1, y :-1, z :-1 },

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
    [13, 9, 20, 0],
    [20, 8, 12, 0],
    [12, 4, 24, 0],
    [26, 6, 13, 0],
    [24, 1, 26, 0],
    [18, 6, 26, 1],
    [21, 11, 18, 1],
    [14, 10, 21, 1],
    [24, 4, 14, 1],
    [29, 9, 13, 6],
    [12, 8, 28, 4],
    [18, 11, 31, 6],
    [31, 7, 29, 6],
    [28, 5, 30, 4],
    [30, 10, 14, 4],
    [22, 8, 20, 9],
    [23, 11, 21, 10],
    [16, 10, 30, 5],
    [28, 8, 15, 5],
    [22, 2, 15, 8],
    [17, 2, 22, 9],
    [17, 9, 29, 7],
    [31, 11, 19, 7],
    [17, 7, 27, 2],
    [25, 5, 15, 2],
    [16, 5, 25, 3],
    [25, 2, 27, 3],
    [27, 7, 19, 3],
    [19, 11, 23, 3],
    [23, 10, 16, 3],
  ];
  var r = 0;
  for (let vertex of vertices) {
    r = Math.max(r, Math.sqrt(vertex.x * vertex.x + vertex.y * vertex.y + vertex.z * vertex.z));
  }
  for (let i = 0; i < vertices.length; i++) {
    vertices[i].x /= r;
    vertices[i].y /= r;
    vertices[i].z /= r;
  }

  return {
    Vertices:vertices,
    Faces:faces,
  };
})();

export function Info() {
  return (
    <>
      <h1> Rhombic Triacontahedron </h1>
      <h2> <a href="https://en.wikipedia.org/wiki/Rhombic_triacontahedron"> Wikipedia page </a> </h2>
      <p> Now this is epic. </p>
      <table>
        <tbody>
          <tr>
            <th> Type </th>
            <td> Catalan Solid </td>
          </tr>
          <tr>
            <th> Faces </th>
            <td> 30 </td>
          </tr>
          <tr>
            <th> Edges </th>
            <td> 60 </td>
          </tr>
          <tr>
            <th> Vertices </th>
            <td> 32 </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default shapeObject;
