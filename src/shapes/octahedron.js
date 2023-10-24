
export const shapeObject = (() => {
  const vertices = [
    { x : 1, y : 0, z : 0 },
    { x :-1, y : 0, z : 0 },
    { x : 0, y : 1, z : 0 },
    { x : 0, y :-1, z : 0 },
    { x : 0, y : 0, z : 1 },
    { x : 0, y : 0, z :-1 },
  ]; 
  const faces = [
    [0, 5, 3],
    [0, 3, 4],
    [0, 4, 2],
    [0, 2, 5],
    [1, 3, 5],
    [1, 4, 3],
    [1, 2, 4],
    [1, 5, 2],
  ];
  return {
    Vertices:vertices,
    Faces:faces,
  };
})();

export function Info() {
  return (
    <>
      <h1> Octahedron </h1>
      <h2> <a href="https://en.wikipedia.org/wiki/Octahedron"> Wikipedia page </a> </h2>
      <p> If you squint you'll see it's also a triangular antiprism. </p>
      <table>
        <tbody>
          <tr>
            <th> Type </th>
            <td> Platonic Solid </td>
          </tr>
          <tr>
            <th> Faces </th>
            <td> 8 </td>
          </tr>
          <tr>
            <th> Edges </th>
            <td> 12 </td>
          </tr>
          <tr>
            <th> Vertices </th>
            <td> 6 </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default shapeObject;
