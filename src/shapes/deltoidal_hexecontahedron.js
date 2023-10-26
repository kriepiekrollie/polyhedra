import Dodecahedron from "./dodecahedron.js";
import Icosahedron from "./icosahedron.js";
import Icosidodecahedron from "./icosidodecahedron.js";

function distance(A, B) {
  const dx = B.x - A.x;
  const dy = B.y - A.y;
  const dz = B.z - A.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

export const shapeObject = (() => {
  const vertices = [];
  for (let vertex of Icosahedron.Vertices) {
    vertices.push(vertex);
  }
  const scalar_dodecahedron = 3 / 11 * Math.sqrt(15 - 6 / Math.sqrt(5));
  for (let vertex of Dodecahedron.Vertices) {
    vertices.push({
      x: vertex.x * scalar_dodecahedron,
      y: vertex.y * scalar_dodecahedron,
      z: vertex.z * scalar_dodecahedron,
    });
  }
  const scalar_icosidodecahedron = 3 * Math.sqrt(1 - 2 / Math.sqrt(5));
  for (let vertex of Icosidodecahedron.Vertices) {
    vertices.push({
      x: vertex.x * scalar_icosidodecahedron,
      y: vertex.y * scalar_icosidodecahedron,
      z: vertex.z * scalar_icosidodecahedron,
    });
  }
  const faces = [
    [28, 36, 0, 35], // 0
    [28, 35, 8, 44], // 1
    [28, 44, 2, 36], // 2
    [12, 35, 0, 34], // 3
    [12, 34, 4, 51], // 4
    [12, 51, 8, 35], // 5
    [24, 34, 0, 33], // 6
    [24, 33, 6, 52], // 7
    [24, 52, 4, 34], // 8
    [14, 33, 0, 32], // 9
    [14, 32, 9, 57], // 10
    [14, 57, 6, 33], // 11
    [30, 32, 0, 36], // 12
    [30, 36, 2, 43], // 13
    [30, 43, 9, 32], // 14
    [15, 45, 2, 44], // 15
    [15, 44, 8, 54], // 16
    [15, 54, 5, 45], // 17
    [22, 60, 10, 55], // 18
    [22, 55, 5, 54], // 19
    [22, 54, 8, 60], // 20
    [20, 60, 8, 51], // 21
    [20, 51, 4, 50], // 22
    [20, 50, 10, 60], // 23
    [13, 38, 10, 50], // 24
    [13, 50, 4, 39], // 25
    [13, 39, 1, 38], // 26
    [26, 39, 4, 52], // 27
    [26, 52, 6, 40], // 28
    [26, 40, 1, 39], // 29
    [18, 41, 1, 40], // 30
    [18, 40, 6, 56], // 31
    [18, 56, 11, 41], // 32
    [21, 56, 6, 57], // 33
    [21, 57, 9, 61], // 34
    [21, 61, 11, 56], // 35
    [23, 58, 11, 61], // 36
    [23, 61, 9, 59], // 37
    [23, 59, 7, 58], // 38
    [16, 59, 9, 43], // 39
    [16, 43, 2, 42], // 40
    [16, 42, 7, 59], // 41
    [25, 42, 2, 45], // 42
    [25, 45, 5, 53], // 43
    [25, 53, 7, 42], // 44
    [29, 37, 3, 49], // 45
    [29, 49, 10, 38], // 46
    [29, 38, 1, 37], // 47
    [17, 49, 3, 48], // 48
    [17, 48, 5, 55], // 49
    [17, 55, 10, 49], // 50
    [27, 48, 3, 47], // 51
    [27, 47, 7, 53], // 52
    [27, 53, 5, 48], // 53
    [19, 47, 3, 46], // 54
    [19, 46, 11, 58], // 55
    [19, 58, 7, 47], // 56
    [31, 46, 3, 37], // 57
    [31, 37, 1, 41], // 58
    [31, 41, 11, 46], // 59
  ];
  /*
  // I should be embarrassed this might be the most cursed thing I've done.
  for (let face of Icosahedron.Faces) {
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
    for (let k = 0; k < 62; k++) {
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
      for (let k = 0; k < 62; k++) {
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
      <h1> Deltoidal Hexecontahedron </h1>
      <h2> <a href="https://en.wikipedia.org/wiki/Deltoidal_hexecontahedron"> Wikipedia page </a> </h2>
      <p> woah </p>
      <table>
        <tbody>
          <tr>
            <th> Type </th>
            <td> Catalan Solid </td>
          </tr>
          <tr>
            <th> Faces </th>
            <td> 60 </td>
          </tr>
          <tr>
            <th> Edges </th>
            <td> 120 </td>
          </tr>
          <tr>
            <th> Vertices </th>
            <td> 62 </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default shapeObject;
