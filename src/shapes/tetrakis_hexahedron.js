import Hexahedron from "./hexahedron.js";
import { Kleetopify } from "./ShapeInterpolaters.js";

export const shapeObject = Kleetopify(Hexahedron, 1.5);

export function Info() {
  return (
    <>
      <h1> Tetrakis Hexahedron </h1>
      <h2> <a href="https://en.wikipedia.org/wiki/Tetrakis_hexahedron"> Wikipedia page </a> </h2>
      <p> This time it's actually not my decision to refer to it has a "hexahedron". </p>
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
            <td> 36 </td>
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
