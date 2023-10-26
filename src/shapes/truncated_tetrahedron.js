import Tetrahedron from "./tetrahedron.js";
import { Truncate } from "./ShapeInterpolaters.js";

export const shapeObject = Truncate(Tetrahedron);

export function Info() {
  return (
    <>
      <h1> Truncated Tetrahedron </h1>
      <h2> <a href="https://en.wikipedia.org/wiki/Truncated_tetrahedron"> Wikipedia page </a> </h2>
      <p> . </p>
      <table>
        <tbody>
          <tr>
            <th> Type </th>
            <td> Archimedean Solid </td>
          </tr>
          <tr>
            <th> Faces </th>
            <td> 8 </td>
          </tr>
          <tr>
            <th> Edges </th>
            <td> 18 </td>
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
