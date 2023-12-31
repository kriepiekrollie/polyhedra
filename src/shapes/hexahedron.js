
export const shapeObject = (() => {
  const r = 1 / Math.sqrt(3);
  const vertices = [
    { x : r, y : r, z : r },
    { x : r, y : r, z :-r },
    { x : r, y :-r, z : r },
    { x : r, y :-r, z :-r },
    { x :-r, y : r, z : r },
    { x :-r, y : r, z :-r },
    { x :-r, y :-r, z : r },
    { x :-r, y :-r, z :-r },
  ];
  const faces = [
    [0, 1, 3, 2],
    [0, 2, 6, 4],
    [4, 6, 7, 5],
    [5, 7, 3, 1],
    [0, 4, 5, 1],
    [2, 3, 7, 6],
  ];
  return {
    Vertices:vertices,
    Faces:faces,
  };
})();

export function Info() {
  return (
    <>
      <h1> Hexahedron </h1>
      <h2> <a href="https://en.wikipedia.org/wiki/Cube"> Wikipedia page </a> </h2>
      <p> Sometimes people refer to this one as "a cube". </p>
      <table>
        <tbody>
          <tr>
            <th> Type </th>
            <td> Platonic Solid </td>
          </tr>
          <tr>
            <th> Faces </th>
            <td> 6 </td>
          </tr>
          <tr>
            <th> Edges </th>
            <td> 12 </td>
          </tr>
          <tr>
            <th> Vertices </th>
            <td> 8 </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default shapeObject;
