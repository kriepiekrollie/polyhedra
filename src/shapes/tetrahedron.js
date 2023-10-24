
export const shapeObject = (() => {
  const r = 1 / Math.sqrt(3);
  const vertices = [
    { x : r, y : r, z : r },
    { x : r, y :-r, z :-r },
    { x :-r, y : r, z :-r },
    { x :-r, y :-r, z : r },
  ];
  const faces = [
    [0, 2, 1],
    [0, 1, 3],
    [0, 3, 2],
    [1, 2, 3],
  ];
  return {
    Vertices:vertices,
    Faces:faces,
  };
})();

export function Info() {
  return (
    <>
      <h1> Tetrahedron </h1>
      <h2> <a href="https://en.wikipedia.org/wiki/Tetrahedron"> Wikipedia page </a> </h2>
      <p> Pretty much a triangular pyramid made from equilateral triangles. </p>
      <table>
        <tbody>
          <tr>
            <th> Type </th>
            <td> Platonic Solid </td>
          </tr>
          <tr>
            <th> Faces </th>
            <td> 4 </td>
          </tr>
          <tr>
            <th> Edges </th>
            <td> 6 </td>
          </tr>
          <tr>
            <th> Vertices </th>
            <td> 4 </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default shapeObject;
