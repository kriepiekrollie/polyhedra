
function distance(A, B) {
  const dx = B.x - A.x;
  const dy = B.y - A.y;
  const dz = B.z - A.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

export const shapeObject = (() => {
  const a = Math.sqrt(2) / 2;
  const b = (2 * Math.sqrt(2) + 1) / 7;

  const vertices = [
    { x : b, y : b, z : b },
    { x : b, y : b, z :-b },
    { x : b, y :-b, z : b },
    { x : b, y :-b, z :-b },
    { x :-b, y : b, z : b },
    { x :-b, y : b, z :-b },
    { x :-b, y :-b, z : b },
    { x :-b, y :-b, z :-b },

    { x : 1, y : 0, z : 0 },
    { x :-1, y : 0, z : 0 },
    { x : 0, y : 1, z : 0 },
    { x : 0, y :-1, z : 0 },
    { x : 0, y : 0, z : 1 },
    { x : 0, y : 0, z :-1 },

    { x : 0, y : a, z : a },
    { x : 0, y : a, z :-a },
    { x : 0, y :-a, z : a },
    { x : 0, y :-a, z :-a },

    { x : a, y : 0, z : a },
    { x :-a, y : 0, z : a },
    { x : a, y : 0, z :-a },
    { x :-a, y : 0, z :-a },

    { x : a, y : a, z : 0 },
    { x : a, y :-a, z : 0 },
    { x :-a, y : a, z : 0 },
    { x :-a, y :-a, z : 0 },
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
  const faces = [
    [8, 18, 0, 22], // 0
    [8, 22, 1, 20], // 1
    [8, 20, 3, 23], // 2
    [8, 23, 2, 18], // 3
    [12, 14, 0, 18], // 4
    [12, 18, 2, 16], // 5
    [12, 16, 6, 19], // 6
    [12, 19, 4, 14], // 7
    [9, 24, 4, 19], // 8
    [9, 19, 6, 25], // 9
    [9, 25, 7, 21], // 10
    [9, 21, 5, 24], // 11
    [13, 15, 5, 21], // 12
    [13, 21, 7, 17], // 13
    [13, 17, 3, 20], // 14
    [13, 20, 1, 15], // 15
    [10, 22, 0, 14], // 16
    [10, 14, 4, 24], // 17
    [10, 24, 5, 15], // 18
    [10, 15, 1, 22], // 19
    [11, 16, 2, 23], // 20
    [11, 23, 3, 17], // 21
    [11, 17, 7, 25], // 22
    [11, 25, 6, 16], // 23
  ];
  /*
  // I should be embarrassed this might be the most cursed thing I've done.
  const cubeFaces = [
    [0, 1, 3, 2],
    [0, 2, 6, 4],
    [4, 6, 7, 5],
    [5, 7, 3, 1],
    [0, 4, 5, 1],
    [2, 3, 7, 6],
  ];
  for (let face of cubeFaces) {
    var mid = { x: 0, y: 0, z: 0 };
    for (let k of face) {
      mid.x += vertices[k].x;
      mid.y += vertices[k].y;
      mid.z += vertices[k].z;
    }
    mid.x /= face.length;
    mid.y /= face.length;
    mid.z /= face.length;
    // Find the closest point the midpoint of this face.
    var closestFaceMid = 0;
    for (let k = 0; k < 26; k++) {
      if (distance(vertices[k], mid) < distance(vertices[closestFaceMid], mid)) {
        closestFaceMid = k;
      }
    }
    for (let i = 0; i < face.length; i++) {
      const [a1, b1] = [face[i], face[(i+1)%face.length]];
      const [a2, b2] = [face[i], face[(i+face.length-1)%face.length]];
      const midEdge1 = { 
        x: (vertices[a1].x + vertices[b1].x) / 2, 
        y: (vertices[a1].y + vertices[b1].y) / 2, 
        z: (vertices[a1].z + vertices[b1].z) / 2,
      };
      const midEdge2 = { 
        x: (vertices[a2].x + vertices[b2].x) / 2, 
        y: (vertices[a2].y + vertices[b2].y) / 2, 
        z: (vertices[a2].z + vertices[b2].z) / 2,
      };
      var closestEdgeMid1 = 0;
      var closestEdgeMid2 = 0;
      for (let k = 0; k < 26; k++) {
        if (distance(vertices[k], midEdge1) < distance(vertices[closestEdgeMid1], midEdge1)) {
          closestEdgeMid1 = k;
        }
        if (distance(vertices[k], midEdge2) < distance(vertices[closestEdgeMid2], midEdge2)) {
          closestEdgeMid2 = k;
        }
      }
      faces.push([closestFaceMid, closestEdgeMid2, a1, closestEdgeMid1]);
    }
  }
  console.log("Faces:");
  for (let idx in faces) {
    console.log("[" + faces[idx][0] + ", " + faces[idx][1] + ", " + faces[idx][2] + ", " + faces[idx][3] + "], // " + idx);
  }
  */
  return {
    Vertices: vertices,
    Faces: faces,
  };
})();

export function Info() {
  return (
    <>
      <h1> Deltoidal Icositetrahedron </h1>
      <h2> <a href="https://en.wikipedia.org/wiki/Deltoidal_icositetrahedron"> Wikipedia page </a> </h2>
      <p> woah </p>
      <table>
        <tbody>
          <tr>
            <th> Type </th>
            <td> Catalan Solid </td>
          </tr>
          <tr>
            <th> Faces </th>
            <td> 24 </td>
          </tr>
          <tr>
            <th> Edges </th>
            <td> 48 </td>
          </tr>
          <tr>
            <th> Vertices </th>
            <td> 26 </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default shapeObject;
