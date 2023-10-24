import { Cube_Truncate } from "./ShapeInterpolaters.js";

export const shapeObject = Cube_Truncate(1.0);

export function Info() {
  return (
    <>
      <h1> Cuboctahedron </h1>
      <h2> <a href="https://en.wikipedia.org/wiki/Cuboctahedron"> Wikipedia page </a> </h2>
      <p> What happens when a cube and an octahedron love each other very much. </p>
      <table>
        <tbody>
          <tr>
            <th> Type </th>
            <td> Archimedean Solid </td>
          </tr>
          <tr>
            <th> Faces </th>
            <td> 14 </td>
          </tr>
          <tr>
            <th> Edges </th>
            <td> 24 </td>
          </tr>
          <tr>
            <th> Vertices </th>
            <td> 12 </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default shapeObject;
