
// I could reuse this code for an animation.
export const shapeObject = (() => {
  const l = 1 + Math.sqrt(2);
  const vertices = [
    { x : 1, y : 1, z : l },
    { x : 1, y :-1, z : l },
    { x :-1, y :-1, z : l },
    { x :-1, y : 1, z : l },

    { x : 1, y : 1, z :-l },
    { x :-1, y : 1, z :-l },
    { x :-1, y :-1, z :-l },
    { x : 1, y :-1, z :-l },

    { x : 1, y : l, z : 1 },
    { x :-1, y : l, z : 1 },
    { x :-1, y : l, z :-1 },
    { x : 1, y : l, z :-1 },

    { x : 1, y :-l, z : 1 },
    { x : 1, y :-l, z :-1 },
    { x :-1, y :-l, z :-1 },
    { x :-1, y :-l, z : 1 },

    { x : l, y : 1, z : 1 },
    { x : l, y : 1, z :-1 },
    { x : l, y :-1, z :-1 },
    { x : l, y :-1, z : 1 },

    { x :-l, y : 1, z : 1 },
    { x :-l, y :-1, z : 1 },
    { x :-l, y :-1, z :-1 },
    { x :-l, y : 1, z :-1 },
  ];
  const faces = [
    // cube faces
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [16, 17, 18, 19],
    [20, 21, 22, 23],

    // edges
    [0, 8, 16],
    [3, 20, 9],
    [6, 22, 14],
    [4, 17, 11],
    [5, 10, 23],
    [7, 13, 18],
    [1, 19, 12],
    [15, 21, 2],

    // octahedron faces
    [0, 3, 9, 8],
    [0, 16, 19, 1],
    [16, 8, 11, 17],
    [4, 11, 10, 5],
    [23, 10, 9, 20],
    [20, 3, 2, 21],
    [6, 5, 23, 22],
    [4, 7, 18, 17],
    [13, 12, 19, 18],
    [7, 6, 14, 13],
    [2, 1, 12, 15],
    [15, 14, 22, 21],
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
    Vertices: vertices,
    Faces: faces,
  };
})();

export function Info() {
  return (
    <>
      <h1> Rhombicuboctahedron </h1>
      <h2> <a href="https://en.wikipedia.org/wiki/Rhombicuboctahedron"> Wikipedia page </a> </h2>
      <p> Have you ever played with a Rubik's snake? this is like that </p>
      <table>
        <tbody>
          <tr>
            <th> Type </th>
            <td> Archimedean Solid </td>
          </tr>
          <tr>
            <th> Faces </th>
            <td> 26 </td>
          </tr>
          <tr>
            <th> Edges </th>
            <td> 48 </td>
          </tr>
          <tr>
            <th> Vertices </th>
            <td> 24 </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default shapeObject;
