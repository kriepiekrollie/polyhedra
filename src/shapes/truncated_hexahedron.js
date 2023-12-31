import Hexahedron from "./hexahedron.js";
import { Truncate } from "./ShapeInterpolaters.js";

export const shapeObject = Truncate(Hexahedron);

export function Info() {
  return (
    <>
      <h1> Truncated Hexahedron </h1>
      <h2> <a href="https://en.wikipedia.org/wiki/Truncated_cube"> Wikipedia page </a> </h2>
      <p> Sometimes I like cutting corners. </p>
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
            <td> 36 </td>
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
