
export const shapeObject = (() => {
  const phi = (1 + Math.sqrt(5)) / 2;
  const p = phi * 1
  const q = 1 / phi;
  const vertices = [
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
      <h1> Dodecahedron </h1>
      <h2> <a href="https://en.wikipedia.org/wiki/Dodecahedron"> Wikipedia page </a> </h2>
      <p> Who would have thought that pentagons could be so sexy? </p>
      <table>
        <tbody>
          <tr>
            <th> Type </th>
            <td> Platonic Solid </td>
          </tr>
          <tr>
            <th> Faces </th>
            <td> 12 </td>
          </tr>
          <tr>
            <th> Edges </th>
            <td> 30 </td>
          </tr>
          <tr>
            <th> Vertices </th>
            <td> 20 </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default shapeObject;
