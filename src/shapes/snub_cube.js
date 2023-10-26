
export const shapeObject = (() => {
  const t = (1 + Math.cbrt(19 - 3 * Math.sqrt(33)) + Math.cbrt(19 + 3 * Math.sqrt(33))) / 3;
  const u = 1 / t;
  const vertices = [
    { x : u, y : 1, z : t },
    { x : 1, y :-u, z : t },
    { x :-u, y :-1, z : t },
    { x :-1, y : u, z : t },

    { x : 1, y : u, z :-t },
    { x :-u, y : 1, z :-t },
    { x :-1, y :-u, z :-t },
    { x : u, y :-1, z :-t },

    { x : 1, y : t, z : u },
    { x :-u, y : t, z : 1 },
    { x :-1, y : t, z :-u },
    { x : u, y : t, z :-1 },

    { x : u, y :-t, z : 1 },
    { x : 1, y :-t, z :-u },
    { x :-u, y :-t, z :-1 },
    { x :-1, y :-t, z : u },

    { x : t, y : u, z : 1 },
    { x : t, y : 1, z :-u },
    { x : t, y :-u, z :-1 },
    { x : t, y :-1, z : u },

    { x :-t, y : 1, z : u },
    { x :-t, y :-u, z : 1 },
    { x :-t, y :-1, z :-u },
    { x :-t, y : u, z :-1 },
  ];
  const faces = [
    // cube faces
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [16, 17, 18, 19],
    [20, 21, 22, 23],

    // octahedron faces
    [0, 8, 16],
    [3, 20, 9],
    [6, 22, 14],
    [4, 17, 11],
    [5, 10, 23],
    [7, 13, 18],
    [1, 19, 12],
    [15, 21, 2],

    // "edges"
    [0, 3, 9],
    [0, 9, 8],
    [16, 19, 1],
    [16, 1, 0],
    [8, 11, 17],
    [8, 17, 16],
    [11, 10, 5],
    [11, 5, 4],
    [10, 9, 20],
    [10, 20, 23],
    [3, 2, 21],
    [3, 21, 20],
    [6, 5, 23],
    [6, 23, 22],
    [4, 7, 18],
    [4, 18, 17],
    [13, 12, 19],
    [13, 19, 18],
    [7, 6, 14],
    [7, 14, 13],
    [2, 1, 12],
    [2, 12, 15],
    [15, 14, 22],
    [15, 22, 21],
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
      <h1> Snub Cube </h1>
      <h2> <a href="https://en.wikipedia.org/wiki/Snub_cube"> Wikipedia page </a> </h2>
      <p> I really like this one because it's like a twisted rhombicuboctahedron. </p>
      <table>
        <tbody>
          <tr>
            <th> Type </th>
            <td> Archimedean Solid </td>
          </tr>
          <tr>
            <th> Faces </th>
            <td> 38 </td>
          </tr>
          <tr>
            <th> Edges </th>
            <td> 60 </td>
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
