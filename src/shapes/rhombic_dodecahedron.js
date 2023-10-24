
export const shapeObject = (() => {
  var vertices = [
    { x : 1, y : 1, z : 1 },
    { x :-1, y : 1, z : 1 },
    { x : 1, y :-1, z : 1 },
    { x : 1, y : 1, z :-1 },
    { x : 1, y :-1, z :-1 },
    { x :-1, y : 1, z :-1 },
    { x :-1, y :-1, z : 1 },
    { x :-1, y :-1, z :-1 },

    { x : 2, y : 0, z : 0 },
    { x :-2, y : 0, z : 0 },
    { x : 0, y : 2, z : 0 },
    { x : 0, y :-2, z : 0 },
    { x : 0, y : 0, z : 2 },
    { x : 0, y : 0, z :-2 },
  ];
  const faces = [
    [0, 12, 1, 10],
    [0, 8, 2, 12],
    [3, 8, 0, 10],
    [3, 10, 5, 13],
    [3, 13, 4, 8],
    [4, 13, 7, 11],
    [4, 11, 2, 8],
    [1, 12, 6, 9],
    [1, 9, 5, 10],
    [2, 11, 6, 12],
    [5, 9, 7, 13],
    [7, 9, 6, 11],
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
      <h1> Rhombic Dodecahedron </h1>
      <h2> <a href="https://en.wikipedia.org/wiki/Rhombic_dodecahedron"> Wikipedia page </a> </h2>
      <p> I love how clearly the cube and the octahedron are inbedded in this one. </p>
      <table>
        <tbody>
          <tr>
            <th> Type </th>
            <td> Catalan Solid </td>
          </tr>
          <tr>
            <th> Faces </th>
            <td> 12 </td>
          </tr>
          <tr>
            <th> Edges </th>
            <td> 24 </td>
          </tr>
          <tr>
            <th> Vertices </th>
            <td> 14 </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default shapeObject;
